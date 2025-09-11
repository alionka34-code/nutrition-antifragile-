from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from django.conf import settings
from .models import Article


class StaticViewSitemap(Sitemap):
    """Sitemap pour les pages statiques du site"""
    priority = 0.5
    changefreq = 'monthly'
    protocol = 'https'

    def items(self):
        return [
            'home',
            'livre', 
            'articles',
            'abonnement',
            'contact',
            'connexion',
            'mentions-legales',
            'cgv',
            'cgu',
            'rgpd'
        ]

    def location(self, item):
        # Retourne l'URL relative pour chaque page
        if item == 'home':
            return '/'
        return f'/{item}'

    def priority(self, item):
        # Page d'accueil plus importante
        if item == 'home':
            return 1.0
        elif item in ['articles', 'abonnement']:
            return 0.8
        return 0.5

    def changefreq(self, item):
        if item == 'home':
            return 'daily'
        elif item == 'articles':
            return 'weekly'
        return 'monthly'


class ArticleSitemap(Sitemap):
    """Sitemap pour tous les articles"""
    changefreq = 'weekly'
    priority = 0.7
    protocol = 'https'

    def items(self):
        # Retourne tous les articles publiés
        return Article.objects.all().order_by('-published_at')

    def lastmod(self, obj):
        # Date de dernière modification
        return obj.published_at

    def location(self, obj):
        # URL de l'article avec le slug
        return f'/articles/{obj.slug}'

    def priority(self, obj):
        # Articles plus récents ont une priorité plus élevée
        import datetime
        from django.utils import timezone
        
        if obj.published_at:
            days_old = (timezone.now() - obj.published_at).days
            if days_old < 30:  # Articles récents (moins de 30 jours)
                return 0.9
            elif days_old < 90:  # Articles moyennement récents
                return 0.7
        return 0.5
