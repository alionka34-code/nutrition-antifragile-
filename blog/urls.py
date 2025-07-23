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
from . import views
from.views import user_status
from blog.views import CustomTokenObtainPairView



urlpatterns = [
    path('articles/', ArticleList.as_view(), name='article-list'),
    path('register/', RegisterView.as_view(), name='register'),
    path('create-checkout-session/', CreateCheckoutSession.as_view(), name='create-checkout-session'),
    path('webhook/stripe/', StripeWebhookView.as_view(), name='stripe-webhook'),
    path('login/', LoginView.as_view(), name='login'),
    path('articles/<int:pk>/', ArticleDetailView.as_view(), name='article-detail'),
    path('articles/<int:article_id>/comments/', CommentListCreateView.as_view(), name='comment-list-create'),
    path('comments/<int:pk>/delete/', CommentDeleteView.as_view(), name='comment-delete'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('articles/<int:article_id>/comments/', CommentListCreateView.as_view(), name='comment-list-create'),
    path('comments/<int:pk>/delete/', CommentDeleteView.as_view(), name='comment-delete'),
    path('api/articles/<int:pk>/comments/', CommentCreateAPIView.as_view(), name='comment-create'),
    path('api/comments/<int:comment_id>/delete/', views.delete_comment, name='delete_comment'),
    path("user-status/", user_status, name="user-status"),

]
   