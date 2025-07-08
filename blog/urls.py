from django.urls import path
from .views import ArticleList, RegisterView
from.views import CreateSubscriptionView
from .views import CreateCheckoutSession
from .views import StripeWebhookView

urlpatterns = [
    path('articles/', ArticleList.as_view(), name='article-list'),
    path('register/', RegisterView.as_view(), name='register'),
    path('create-checkout-session/', CreateCheckoutSession.as_view(), name='create-checkout-session'),
    path('webhook/stripe/', StripeWebhookView.as_view(), name='stripe-webhook'),
]
   