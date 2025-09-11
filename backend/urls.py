"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from blog.views import CustomTokenObtainPairView, upload_image
from django.conf import settings
from django.conf.urls.static import static
from blog.views import StripeWebhookView
from django.contrib.sitemaps.views import sitemap
from blog.sitemaps import StaticViewSitemap, ArticleSitemap

# Configuration des sitemaps
sitemaps = {
    'static': StaticViewSitemap,
    'articles': ArticleSitemap,
}



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('blog.urls')),  # Include blog app URLs under the 'api/' path
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # Route pour rafraîchir un token (optionnel)
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('ckeditor/', include('ckeditor_uploader.urls')),  # CKEditor URLs
    path("api/upload-image/", upload_image, name="upload_image"),
    path('stripe/webhook/', StripeWebhookView.as_view(), name='stripe-webhook-direct'),  # Stripe webhook endpoint
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
]

# Servir les fichiers media en développement
if settings.DEBUG or True:  # Force le service des media en développement
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)