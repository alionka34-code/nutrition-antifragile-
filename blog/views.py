import stripe
from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Article
from .models import Profile
from .models import Comment
from.models import StripeWebhookLog
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
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.views import View
import cloudinary.uploader
import logging
import json


logger = logging.getLogger(__name__)

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
            
            # Sauvegarder le customer_id dans le profil
            profile = Profile.objects.get(user=user)
            profile.stripe_customer_id = customer.id
            profile.save()
            
            # ID des prix dans Stripe
            items = [
                {"price": "price_1RqfRUBthRAmBImU3VDSFmui"},
                {"price": "price_1RrJzWBthRAmBImUlq8k1UfL"}, 
            ]

            # Créer un abonnement Stripe
            subscription = stripe.Subscription.create(
                customer=customer.id,
                items=items,
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

@permission_classes([IsAuthenticated])
class CreateCheckoutSession(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        domain_url = settings.FRONTEND_URL  # Frontend Vite
        selected_plan = request.data.get("plan")  # "launch" ou "monthly"

        print("=== DEBUG STRIPE CHECKOUT ===")
        print("Utilisateur :", user)
        print("Plan sélectionné :", selected_plan)
        print("Domain URL :", domain_url)


        price_map = {
            "monthly": "price_1RqfRUBthRAmBImU3VDSFmui",
            "launch": "price_1RrJzWBthRAmBImUlq8k1UfL"
        }

        try:
            if selected_plan not in price_map:
                raise ValueError(f"Plan invalide : {selected_plan}")
            # Vérifier si l'utilisateur a déjà un customer Stripe
            profile = Profile.objects.get(user=user)
            if profile.stripe_customer_id:
                customer_id = profile.stripe_customer_id
            else:
                # Créer un nouveau customer si besoin
                customer = stripe.Customer.create(
                    email=user.email,
                    metadata={"django_user_id": user.id}
                )
                profile.stripe_customer_id = customer.id
                profile.save()
                customer_id = customer.id

            # Créer une session de checkout
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                mode='subscription',
                line_items=[{
                    'price': price_map.get(selected_plan),
                    'quantity': 1,
                }],
                success_url=domain_url + 'subscription/success?session_id={CHECKOUT_SESSION_ID}',
                cancel_url=domain_url + 'subscription/cancel',
                customer=customer_id,  # Utiliser le customer déjà lié
                client_reference_id=str(user.id),
            )
            return Response({'checkout_url': checkout_session.url})
        except Exception as e:
            print("=== ERREUR STRIPE ===")
            print(str(e))
            return Response({'error': str(e)}, status=400)

class StripeWebhookView(APIView):
    def post(self, request):
        payload = request.body
        sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
        endpoint_secret = settings.STRIPE_WEBHOOK_SECRET

        try:
            event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
        except ValueError as e:
            logger.error(f"Invalid payload: {e}")
            return HttpResponse(status=400)
        except stripe.error.SignatureVerificationError as e:
            logger.error(f"Invalid signature: {e}")
            return HttpResponse(status=400)
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            return HttpResponse(status=500)

        event_type = event.get('type', 'unknown')
        logger.info(f"Stripe webhook received: {event_type}")

        # --- Sauvegarde sécurisée du log ---
        try:
            from .models import StripeWebhookLog
            StripeWebhookLog.objects.create(
                event_type=event_type,
                payload=json.dumps(event['data']['object'])
            )
        except Exception as e:
            logger.warning(f"Could not save webhook log: {e}")

        # --- Paiement réussi ---
        if event_type == 'invoice.payment_succeeded':
            customer_id = event['data']['object'].get('customer')
            if not customer_id:
                logger.warning("No customer_id in invoice.payment_succeeded event.")
            else:
                profile = Profile.objects.filter(stripe_customer_id=customer_id).first()
                if profile:
                    profile.is_subscribed = True
                    profile.save()
                    logger.info(f"Profile {profile.user.id} set to subscribed.")
                else:
                    logger.warning(f"No profile found for customer_id {customer_id}.")

        # --- Abonnement annulé / paiement échoué ---
        elif event_type in ['customer.subscription.deleted', 'invoice.payment_failed']:
            customer_id = event['data']['object'].get('customer')
            if not customer_id:
                logger.warning(f"No customer_id in {event_type} event.")
            else:
                profile = Profile.objects.filter(stripe_customer_id=customer_id).first()
                if profile:
                    profile.is_subscribed = False
                    profile.save()
                    logger.info(f"Profile {profile.user.id} unsubscribed.")
                else:
                    logger.warning(f"No profile found for customer_id {customer_id}.")

        return HttpResponse(status=200)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class LoginView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer


class ArticleDetailView(RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [AllowAny]


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
    # Récupérer ou créer le profil utilisateur
    profile, created = Profile.objects.get_or_create(user=request.user)
    
    return Response({
        "username": request.user.username,
        "is_admin": request.user.is_staff,
        "is_subscribed": profile.is_subscribed
    })
def subscription_status(request):
    profile = Profile.objects.get(user=request.user)
    return Response({
        "is_subscribed": profile.is_subscribed,
        "email": request.user.email,
    })

def test_db(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            one = cursor.fetchone()
        return JsonResponse({"result": one})
    except Exception as e:
        return JsonResponse({"error": str(e)})
    
@method_decorator(csrf_exempt, name='dispatch')
class CKEditorImageUploadView(View):
    def post(self, request, *args, **kwargs):
        try:
            file = request.FILES.get('upload')
            func_num = request.GET.get('CKEditorFuncNum')
            if not file:
                return HttpResponse(
                    f"<script>window.parent.CKEDITOR.tools.callFunction({func_num}, '', 'Aucun fichier envoyé.');</script>"
                )

            # Upload vers Cloudinary
            upload_result = cloudinary.uploader.upload(file, folder="ckeditor_uploads")
            url = upload_result.get('secure_url')

            # CKEditor veut un script JS qui appelle sa fonction
            return HttpResponse(
                f"<script>window.parent.CKEDITOR.tools.callFunction({func_num}, '{url}', '');</script>"
            )
        except Exception as e:
            func_num = request.GET.get('CKEditorFuncNum', 1)
            return HttpResponse(
                f"<script>window.parent.CKEDITOR.tools.callFunction({func_num}, '', 'Erreur : {str(e)}');</script>"
            )

# === Fonction indépendante pour upload depuis CKEditor ou autre ===
@csrf_exempt
def upload_image(request):
    if request.method == "POST" and request.FILES.get("upload"):
        image = request.FILES["upload"]
        try:
            result = cloudinary.uploader.upload(image, folder="ckeditor_uploads")
            url = result.get("secure_url")
            return JsonResponse({
                "uploaded": 1,
                "fileName": image.name,
                "url": url
            })
        except Exception as e:
            return JsonResponse({"uploaded": 0, "error": {"message": str(e)}})
    return JsonResponse({"uploaded": 0, "error": {"message": "No file uploaded"}})