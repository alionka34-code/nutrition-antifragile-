from django.urls import path
from .views import ArticleList, RegisterView
from .views import CreateSubscriptionView
from .views import CreateCheckoutSession
from .views import StripeWebhookView
from .views import RegisterView
from .views import LoginView
from .views import ArticleDetailView
from .views import CommentListCreateView
from .views import CommentDeleteView
from .views import CommentCreateAPIView
from .views import CommentReplyCreateView
from . import views
from.views import user_status
from blog.views import CustomTokenObtainPairView
from .views import test_db
from blog.views import CKEditorImageUploadView
from .views import PasswordResetRequestView
from .views import PasswordResetConfirmView
from .views import VerifyCheckoutSessionView



urlpatterns = [
    path('articles/', ArticleList.as_view(), name='article-list'),
    path('register/', RegisterView.as_view(), name='register'),
    path('create-checkout-session/', CreateCheckoutSession.as_view(), name='create-checkout-session'),
    path('webhook/stripe/', StripeWebhookView.as_view(), name='stripe-webhook'),
    path('login/', LoginView.as_view(), name='login'),
    path('articles/<slug:slug>/', ArticleDetailView.as_view(), name='article-detail'),

    # Comments
    path('articles/<int:article_id>/comments/', CommentListCreateView.as_view(), name='comment-list-create'),
    path('articles/<int:article_id>/comments/<int:comment_id>/reply/', CommentReplyCreateView.as_view(), name='comment-reply'),
    path('comments/<int:pk>/delete/', CommentDeleteView.as_view(), name='comment-delete'),

    # Auth and misc
    path('user-status/', user_status, name='user-status'),
    path('test-db/', views.test_db),
    path('ckeditor/upload/', CKEditorImageUploadView.as_view(), name='ckeditor_upload'),
    path('password-lost/', PasswordResetRequestView.as_view(), name='password-lost'),
    path('debug-version/', views.debug_version, name='debug-version'),  # Debug temporaire
    path('password-reset-confirm/<str:uidb64>/<str:token>/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    path('verify-checkout-session/', VerifyCheckoutSessionView.as_view(), name='verify-checkout-session'),
]
