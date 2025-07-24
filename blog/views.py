import stripe
from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Article
from .models import Profile
from .models import Comment
from .serializers import CommentSerializer
from .serializers import ArticleSerializer
from .serializers import RegisterSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.serializers import ModelSerializer
from django.conf import settings
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.permissions import IsAdminUser
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer 
from rest_framework.generics import RetrieveAPIView
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.db import connection
from django.http import JsonResponse
from .serializers import CustomTokenObtainPairSerializer



stripe.api_key = settings.STRIPE_SECRET_KEY

class CreateSubscriptionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        try:
            # Créer un client Stripe lié à l'email utilisateur
            customer = stripe.Customer.create(
                email=user.email,
                metadata={"django_user_id": user.id}
            )
            
            # ID du prix (Price ID) dans Stripe — à configurer dans ton dashboard Stripe
            price_id = 'price_1RgU75FiDmUzPzGDH3QskApe'

            # Créer un abonnement Stripe
            subscription = stripe.Subscription.create(
                customer=customer.id,
                items=[{"price": price_id}],
                payment_behavior='default_incomplete',
                expand=['latest_invoice.payment_intent'],
            )
            
            return Response({
                "subscription_id": subscription.id,
                "client_secret": subscription.latest_invoice.payment_intent.client_secret
            })
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ArticleList(generics.ListAPIView):
    queryset = Article.objects.all().order_by('-published_at')
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_context(self):
        # On passe le request au serializer pour qu’il sache si l’utilisateur est abonné ou pas
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context



class RegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


@permission_classes([IsAuthenticated])
class CreateCheckoutSession(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        domain_url = 'http://localhost:3000/'  # Ton frontend

        try:
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                mode='subscription',
                line_items=[{
                    'price': 'price_1RgU75FiDmUzPzGDH3QskApe',  # Remplace avec ton Price ID Stripe
                    'quantity': 1,
                }],
                success_url=domain_url + 'success?session_id={CHECKOUT_SESSION_ID}',
                cancel_url=domain_url + 'cancel',
                customer_email=request.user.email,
                client_reference_id=str(request.user.id),
            )
            return Response({'checkout_url': checkout_session.url})
        except Exception as e:
            return Response({'error': str(e)}, status=400)

class StripeWebhookView(APIView):
    def post(self, request):
        payload = request.body
        sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
        endpoint_secret = settings.STRIPE_WEBHOOK_SECRET

        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, endpoint_secret
            )
        except (ValueError, stripe.error.SignatureVerificationError):
            return HttpResponse(status=400)

        # 🎯 Ici, on cible l’événement “checkout.session.completed”
        if event['type'] == 'checkout.session.completed':
            session = event['data']['object']
            client_reference_id = session.get('client_reference_id')  # l'ID utilisateur
            if client_reference_id:
                try:
                    profile = Profile.objects.get(user__id=client_reference_id)
                    profile.is_subscribed = True
                    profile.save()
                except Profile.DoesNotExist:
                    pass

        return HttpResponse(status=200)   
    

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer  # Crée un profil associé à l'utilisateur

class LoginView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer


class ArticleDetailView(RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        article_id = self.kwargs['article_id']
        return Comment.objects.filter(article_id=article_id)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, article_id=self.kwargs['article_id'])

class CommentDeleteView(generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAdminUser]  # Seuls les admins peuvent supprimer


class CommentCreateAPIView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        article_id = self.kwargs['article_id']
        serializer.save(user=self.request.user, article_id=article_id)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])  # Seuls les admins peuvent accéder
def delete_comment(request, comment_id):
    try:
        comment = Comment.objects.get(id=comment_id)
    except Comment.DoesNotExist:
        return Response({"detail": "Commentaire non trouvé."}, status=status.HTTP_404_NOT_FOUND)

    comment.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_status(request):
    return Response({
        "username": request.user.username,
        "is_admin": request.user.is_staff  # ou is_superuser
    })

def test_db(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            one = cursor.fetchone()
        return JsonResponse({"result": one})
    except Exception as e:
        return JsonResponse({"error": str(e)})