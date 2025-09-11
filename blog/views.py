import logging
import json

import stripe
import cloudinary.uploader
from urllib.parse import urlparse
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.db import connection
from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views import View

from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes

from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import (
    IsAuthenticated,
    AllowAny,
    IsAuthenticatedOrReadOnly,
    IsAdminUser,
)
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import default_token_generator

from .models import Article, Profile, Comment, StripeWebhookLog
from .serializers import (
    ArticleSerializer,
    CommentSerializer,
    RegisterSerializer,
    CustomTokenObtainPairSerializer,
)

logger = logging.getLogger(__name__)

stripe.api_key = settings.STRIPE_SECRET_KEY


def _frontend_base_url(request):
    """Resolve the frontend base URL.
    - Prefer FRONTEND_URL from settings.
    - In DEBUG, prefer request Origin/Referer (useful for local dev: localhost:5173).
    - Always return with a trailing slash.
    """
    frontend_env = (getattr(settings, 'FRONTEND_URL', '') or '').strip().rstrip('/')
    origin = (request.META.get('HTTP_ORIGIN') or '').strip().rstrip('/')
    referer = (request.META.get('HTTP_REFERER') or '').strip()

    chosen = frontend_env
    if getattr(settings, 'DEBUG', False):
        if origin:
            chosen = origin
        elif referer:
            p = urlparse(referer)
            if p.scheme and p.netloc:
                chosen = f"{p.scheme}://{p.netloc}"
    else:
        # In production, if Origin matches FRONTEND_URL host, keep Origin (keeps right scheme/port)
        if origin and frontend_env:
            try:
                o = urlparse(origin if '://' in origin else f'https://{origin}')
                e = urlparse(frontend_env if '://' in frontend_env else f'https://{frontend_env}')
                if o.netloc == e.netloc:
                    chosen = origin
            except Exception:
                pass

    base = (chosen or frontend_env).rstrip('/') + '/'
    return base


def _resolve_profile_from_stripe(customer_id=None, metadata=None):
    """Try to resolve a Profile from Stripe data.
    Order: by stripe_customer_id -> by metadata.django_user_id -> by customer email.
    Also persists stripe_customer_id on the profile when possible.
    """
    profile = None
    # 1) by stored customer id
    if customer_id:
        profile = Profile.objects.filter(stripe_customer_id=customer_id).first()
        if profile:
            return profile
    # 2) by metadata django_user_id
    dj_id = None
    if metadata and isinstance(metadata, dict):
        dj_id = metadata.get('django_user_id') or metadata.get('user_id')
        try:
            if dj_id:
                user = User.objects.filter(id=int(dj_id)).first()
                if user:
                    profile, _ = Profile.objects.get_or_create(user=user)
                    if customer_id and not profile.stripe_customer_id:
                        profile.stripe_customer_id = customer_id
                        profile.save()
                    return profile
        except Exception:
            pass
    # 3) by customer email
    if customer_id:
        try:
            cust = stripe.Customer.retrieve(customer_id)
            email = (cust.get('email') or '').strip()
            if email:
                user = User.objects.filter(email=email).first()
                if user:
                    profile, _ = Profile.objects.get_or_create(user=user)
                    if customer_id and not profile.stripe_customer_id:
                        profile.stripe_customer_id = customer_id
                        profile.save()
                    return profile
        except Exception:
            pass
    return None


# =============================
# Abonnement - Stripe
# =============================
class CreateSubscriptionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        try:
            customer = stripe.Customer.create(
                email=user.email,
                metadata={"django_user_id": user.id},
            )
            profile, _ = Profile.objects.get_or_create(user=user)
            profile.stripe_customer_id = customer.id
            profile.save()

            items = [
                {"price": "price_1RrJzWBthRAmBImUlq8k1UfL"},  # launch
                {"price": "price_1RqfRUBthRAmBImU3VDSFmui"},  # monthly
            ]

            subscription = stripe.Subscription.create(
                customer=customer.id,
                items=items,
                payment_behavior='default_incomplete',
                expand=['latest_invoice.payment_intent'],
            )

            return Response(
                {
                    "subscription_id": subscription.id,
                    "client_secret": subscription.latest_invoice.payment_intent.client_secret,
                }
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class CreateCheckoutSession(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        # Utiliser une base URL front fiable (local en DEBUG, sinon FRONTEND_URL)
        base_url = _frontend_base_url(request)
        selected_plan = request.data.get("plan")  # "launch" ou "monthly"

        logger.info("=== DEBUG STRIPE CHECKOUT ===")
        logger.info(f"Utilisateur: {user}")
        logger.info(f"Plan sélectionné: {selected_plan}")
        logger.info(f"Base URL: {base_url}")

        price_map = {
            "monthly": "price_1RqfRUBthRAmBImU3VDSFmui",
            "launch": "price_1RrJzWBthRAmBImUlq8k1UfL",
        }

        try:
            if selected_plan not in price_map:
                raise ValueError(f"Plan invalide : {selected_plan}")

            profile, _ = Profile.objects.get_or_create(user=user)

            # Vérifier/Créer le customer Stripe
            customer_id = None
            if profile.stripe_customer_id:
                try:
                    stripe.Customer.retrieve(profile.stripe_customer_id)
                    customer_id = profile.stripe_customer_id
                    logger.info(f"Customer existant trouvé: {customer_id}")
                except stripe.error.InvalidRequestError:
                    logger.warning(
                        f"Customer {profile.stripe_customer_id} introuvable. Création d'un nouveau."
                    )
                    profile.stripe_customer_id = None

            if not customer_id:
                customer = stripe.Customer.create(
                    email=user.email,
                    metadata={"django_user_id": user.id},
                )
                profile.stripe_customer_id = customer.id
                profile.save()
                customer_id = customer.id
                logger.info(f"Nouveau customer créé: {customer_id}")

            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                mode='subscription',
                line_items=[{
                    'price': price_map[selected_plan],
                    'quantity': 1,
                }],
                subscription_data={
                    'metadata': {
                        'django_user_id': str(user.id),
                        'email': user.email,
                    }
                },
                success_url=f"{base_url}subscription/success?session_id={{CHECKOUT_SESSION_ID}}",
                cancel_url=f"{base_url}subscription/cancel",
                customer=customer_id,
                client_reference_id=str(user.id),
            )
            return Response({'checkout_url': checkout_session.url})
        except Exception as e:
            logger.exception("Erreur Stripe lors de la création de la session de checkout")
            return Response({'error': str(e)}, status=400)


@method_decorator(csrf_exempt, name='dispatch')
class StripeWebhookView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        payload = request.body
        sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
        endpoint_secret = (getattr(settings, 'STRIPE_WEBHOOK_SECRET', '') or '').strip()

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

        # Log du webhook
        try:
            StripeWebhookLog.objects.create(
                event_type=event_type,
                payload=event['data']['object'],
            )
        except Exception as e:
            logger.warning(f"Could not save webhook log: {e}")

        obj = event['data']['object']
        customer_id = obj.get('customer')
        metadata = obj.get('metadata') or {}

        # --- Désabonnement / échec paiement ---
        if event_type in ['customer.subscription.deleted', 'invoice.payment_failed']:
            if not customer_id and obj.get('id'):
                try:
                    sub = stripe.Subscription.retrieve(obj.get('id'))
                    customer_id = sub.get('customer')
                    metadata = metadata or sub.get('metadata') or {}
                except Exception:
                    pass
            if customer_id:
                profile = _resolve_profile_from_stripe(customer_id=customer_id, metadata=metadata)
                if profile:
                    old = profile.is_subscribed
                    profile.is_subscribed = False
                    profile.save()
                    logger.info(f"Profile {profile.user.id} unsubscribed. was {old}")
                else:
                    logger.warning(f"No profile resolved for customer_id {customer_id} on {event_type}.")

        # --- Subscription updated / created ---
        elif event_type in ['customer.subscription.updated', 'customer.subscription.created']:
            sub = obj
            status_sub = sub.get('status')
            cancel_at_period_end = bool(sub.get('cancel_at_period_end'))
            profile = _resolve_profile_from_stripe(customer_id=customer_id, metadata=metadata)
            if profile:
                should_be_active = (status_sub in ['active', 'trialing']) and not cancel_at_period_end
                old = profile.is_subscribed
                profile.is_subscribed = should_be_active
                profile.save()
                logger.info(
                    f"Subscription {status_sub} (cancel_at_period_end={cancel_at_period_end}) for profile {profile.user.id}. is_subscribed {old} -> {profile.is_subscribed}"
                )
            else:
                logger.warning(f"No profile resolved for customer_id {customer_id} (subscription {status_sub}).")

        # --- Checkout session succeeded ---
        elif event_type in ['checkout.session.completed', 'checkout.session.async_payment_succeeded']:
            session = obj
            customer_id = session.get('customer')
            customer_email = session.get('customer_details', {}).get('email')
            client_ref = session.get('client_reference_id')

            profile = None
            if customer_id:
                profile = Profile.objects.filter(stripe_customer_id=customer_id).first()
            if not profile and customer_email:
                try:
                    user = User.objects.get(email=customer_email)
                    profile, _ = Profile.objects.get_or_create(user=user)
                    if customer_id and not profile.stripe_customer_id:
                        profile.stripe_customer_id = customer_id
                except User.DoesNotExist:
                    logger.warning(f"No user found for email {customer_email}.")
            if not profile and client_ref:
                try:
                    user = User.objects.get(id=int(client_ref))
                    profile, _ = Profile.objects.get_or_create(user=user)
                    if customer_id and not profile.stripe_customer_id:
                        profile.stripe_customer_id = customer_id
                except Exception as e:
                    logger.warning(f"No user found for client_reference_id {client_ref}: {e}")

            if profile:
                profile.is_subscribed = True
                profile.save()
                logger.info(f"Profile {profile.user.id} set to subscribed (checkout session).")
            else:
                logger.warning("Unable to resolve profile in checkout session webhook.")

        # --- Invoice / Payment intent ---
        elif event_type == 'invoice.payment_succeeded':
            invoice = obj
            customer_id = invoice.get('customer')
            sub_id = invoice.get('subscription')
            should_be_active = True
            if sub_id:
                try:
                    sub = stripe.Subscription.retrieve(sub_id)
                    status_sub = sub.get('status')
                    cancel_at_period_end = bool(sub.get('cancel_at_period_end'))
                    should_be_active = (status_sub in ['active', 'trialing']) and not cancel_at_period_end
                except Exception as e:
                    logger.warning(f"Could not retrieve subscription {sub_id} on invoice.payment_succeeded: {e}")
            if customer_id:
                profile = _resolve_profile_from_stripe(customer_id=customer_id, metadata=invoice.get('metadata') or {})
                if profile:
                    old = profile.is_subscribed
                    profile.is_subscribed = should_be_active
                    profile.save()
                    logger.info(f"Profile {profile.user.id} set to {profile.is_subscribed} (invoice.payment_succeeded). was {old}")
                else:
                    logger.warning(f"No profile found for customer_id {customer_id}.")

        return HttpResponse(status=200)


class VerifyCheckoutSessionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        session_id = request.data.get('session_id') or request.query_params.get('session_id')
        if not session_id:
            return Response({'error': 'session_id requis'}, status=400)
        try:
            session = stripe.checkout.Session.retrieve(session_id)
            customer_id = session.get('customer')
            payment_status = session.get('payment_status')  # paid / unpaid
            s_status = session.get('status')  # complete / open
            mode = session.get('mode')  # subscription / payment

            profile, _ = Profile.objects.get_or_create(user=request.user)
            if customer_id and not profile.stripe_customer_id:
                profile.stripe_customer_id = customer_id

            should_activate = (payment_status == 'paid' and s_status == 'complete') or mode == 'subscription'
            if should_activate:
                profile.is_subscribed = True
                profile.save()
                return Response({'ok': True, 'is_subscribed': True})
            else:
                return Response({'ok': False, 'is_subscribed': profile.is_subscribed, 'session_status': s_status, 'payment_status': payment_status})
        except Exception as e:
            return Response({'error': str(e)}, status=400)


# =============================
# Articles
# =============================
class ArticleList(generics.ListAPIView):
    queryset = Article.objects.all().order_by('-published_at')
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context


class ArticleDetailView(RetrieveAPIView):
    serializer_class = ArticleSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        """Support both slug (preferred) and numeric id in the URL.

        Behaviour:
        - Try to resolve by slug first (most common, e.g. "mon-article").
        - If not found and the passed value is all digits, try to resolve by pk.
        - Raise Http404 if no object matches.
        """
        lookup = self.kwargs.get('slug') or self.kwargs.get('pk')
        if not lookup:
            from django.http import Http404
            raise Http404("Article non trouvé")

        # Try slug lookup first
        try:
            obj = Article.objects.get(slug=lookup)
            return obj
        except Article.DoesNotExist:
            # If lookup looks like an integer, try pk
            if str(lookup).isdigit():
                try:
                    return Article.objects.get(pk=int(lookup))
                except Article.DoesNotExist:
                    from django.http import Http404
                    raise Http404("Article non trouvé")
            from django.http import Http404
            raise Http404("Article non trouvé")

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

# =============================
# Auth
# =============================
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class LoginView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


# =============================
# Commentaires
# =============================
class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        article_id = self.kwargs['article_id']
        return Comment.objects.filter(
            article_id=article_id, parent_comment__isnull=True
        ).order_by('created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, article_id=self.kwargs['article_id'])


class CommentReplyCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, article_id, comment_id):
        content = request.data.get('content')
        if not content or not str(content).strip():
            return Response({"detail": "Contenu requis"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            parent = Comment.objects.get(id=comment_id, article_id=article_id)
        except Comment.DoesNotExist:
            return Response({"detail": "Commentaire parent introuvable"}, status=status.HTTP_404_NOT_FOUND)
        reply = Comment.objects.create(
            article_id=article_id,
            user=request.user,
            content=content,
            parent_comment=parent,
        )
        data = CommentSerializer(reply, context={'request': request}).data
        return Response(data, status=status.HTTP_201_CREATED)


class CommentDeleteView(generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAdminUser]


class CommentCreateAPIView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        article_id = self.kwargs['article_id']
        serializer.save(user=self.request.user, article_id=article_id)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_comment(request, comment_id):
    try:
        comment = Comment.objects.get(id=comment_id)
    except Comment.DoesNotExist:
        return Response({"detail": "Commentaire non trouvé."}, status=status.HTTP_404_NOT_FOUND)

    comment.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# =============================
# User status / util
# =============================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_status(request):
    profile, _ = Profile.objects.get_or_create(user=request.user)
    return Response({
        "username": request.user.username,
        "is_admin": request.user.is_staff,
        "is_subscribed": profile.is_subscribed,
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


def debug_version(request):
    """Debug temporaire pour vérifier le déploiement"""
    import datetime
    return JsonResponse({
        "timestamp": datetime.datetime.now().isoformat(),
        "commit": "1209fdf - debug log added",
        "api_working": True
    })


# =============================
# CKEditor upload (Cloudinary)
# =============================
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

            upload_result = cloudinary.uploader.upload(file, folder="ckeditor_uploads")
            url = upload_result.get('secure_url')

            return HttpResponse(
                f"<script>window.parent.CKEDITOR.tools.callFunction({func_num}, '{url}', '');</script>"
            )
        except Exception as e:
            func_num = request.GET.get('CKEditorFuncNum', 1)
            return HttpResponse(
                f"<script>window.parent.CKEDITOR.tools.callFunction({func_num}, '', 'Erreur : {str(e)}');</script>"
            )


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


# =============================
# Password reset
# =============================
class PasswordResetRequestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        logger.info(f"Password reset request for: {email}")  # Debug log temporaire
        if not email:
            return Response({'error': 'Email est requis.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'message': 'Si cette adresse email existe, vous recevrez un email de réinitialisation.'}, status=status.HTTP_200_OK)

        try:
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            base_url = _frontend_base_url(request)
            reset_link = f"{base_url}reset-password/{uid}/{token}"

            # Tentative d'envoi d'email avec gestion d'erreur robuste
            email_sent = False
            try:
                gmail_email = getattr(settings, 'GMAIL_EMAIL', None)
                gmail_password = getattr(settings, 'GMAIL_APP_PASSWORD', None)
                if gmail_email and gmail_password:
                    send_mail(
                        'Réinitialisation de mot de passe',
                        f'Cliquez sur ce lien pour réinitialiser votre mot de passe: {reset_link}',
                        settings.DEFAULT_FROM_EMAIL,
                        [email],
                        fail_silently=True,
                    )
                    email_sent = True
                else:
                    logger.warning("Email configuration missing - GMAIL_EMAIL or GMAIL_APP_PASSWORD not set")
            except Exception as email_error:
                logger.warning(f"Email sending failed: {email_error}")

            logger.info(f"Password reset for {email} - Link: {reset_link} - Email sent: {email_sent}")
            return Response({'message': 'Si cette adresse email existe, vous recevrez un email de réinitialisation.'}, status=status.HTTP_200_OK)

        except Exception as e:
            # Même en cas d'exception inattendue, ne pas retourner 500 afin
            # d'éviter des erreurs CORS côté navigateur. On journalise l'erreur.
            logger.error(f"Error during password reset flow: {str(e)}")
            return Response({'message': 'Si cette adresse email existe, vous recevrez un email de réinitialisation.'}, status=status.HTTP_200_OK)


class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, uidb64, token, *args, **kwargs):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({'error': 'Lien de réinitialisation invalide.'}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, token):
            return Response({'error': 'Lien de réinitialisation expiré ou invalide.'}, status=status.HTTP_400_BAD_REQUEST)

        password = request.data.get('password')
        if not password:
            return Response({'error': 'Mot de passe requis.'}, status=status.HTTP_400_BAD_REQUEST)
        if len(password) < 6:
            return Response({'error': 'Le mot de passe doit contenir au moins 6 caractères.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user.set_password(password)
            user.save()
            logger.info(f"Password reset successful for user {user.email}")
            return Response({'message': 'Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.'}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error resetting password: {str(e)}")
            return Response({'error': 'Erreur lors de la réinitialisation. Veuillez réessayer.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)