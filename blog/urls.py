from django.urls import path, include
from rest_framework.routers import DefaultRouter
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
from .views import VideoListView, VideoDetailView
from .views import VideoCommentListCreateView, VideoCommentReplyCreateView, VideoCommentDeleteView
from .views import combined_content_list
from .views import ThemeViewSet, ChapterViewSet

# Router for ViewSets
router = DefaultRouter()
router.register(r'themes', ThemeViewSet, basename='theme')
router.register(r'chapters', ChapterViewSet, basename='chapter')



urlpatterns = [
    # Include router URLs
    path('', include(router.urls)),

    path('content/', combined_content_list, name='combined-content-list'),
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
    
    # Video Comments
    path('videos/<int:video_id>/comments/', VideoCommentListCreateView.as_view(), name='video-comment-list-create'),
    path('videos/<int:video_id>/comments/<int:comment_id>/reply/', VideoCommentReplyCreateView.as_view(), name='video-comment-reply'),
    path('video-comments/<int:pk>/delete/', VideoCommentDeleteView.as_view(), name='video-comment-delete'),

    # Auth and misc
    path('user-status/', user_status, name='user-status'),
    path('test-db/', views.test_db),
    path('ckeditor/upload/', CKEditorImageUploadView.as_view(), name='ckeditor_upload'),
    path('password-lost/', PasswordResetRequestView.as_view(), name='password-lost'),
    path('debug-version/', views.debug_version, name='debug-version'),  # Debug temporaire
    path('password-reset-confirm/<str:uidb64>/<str:token>/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    path('verify-checkout-session/', VerifyCheckoutSessionView.as_view(), name='verify-checkout-session'),
    path('videos/', views.VideoListView.as_view(), name='video-list'),
    path('video/<slug:slug>/', VideoDetailView.as_view(), name="video-detail"),  # Liste des vidéos
    path('validate-video-token/', views.validate_video_token, name='validate-video-token')  # Validation des tokens vidéo
]
