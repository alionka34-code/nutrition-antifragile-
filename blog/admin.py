from django.contrib import admin
from .models import Article
from .models import Profile
from .models import StripeWebhookLog
import json

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_premium', 'published_at')
    list_filter = ('is_premium', 'published_at')
    search_fields = ('title',)


@admin.register(StripeWebhookLog)
class StripeWebhookLogAdmin(admin.ModelAdmin):
    list_display = ('event_type', 'received_at', 'short_payload')
    list_filter = ('event_type', 'received_at')
    date_hierarchy = 'received_at'
    search_fields = ('event_type',)
    readonly_fields = ('event_type', 'payload', 'received_at')

    def short_payload(self, obj):
        try:
            text = json.dumps(obj.payload)
        except Exception:
            text = str(obj.payload)
        return (text or '')[:120] + ('…' if text and len(text) > 120 else '')


class ProfileInline(admin.StackedInline):
    model = Profile

from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline,)
    
    # Ajouter is_subscribed dans la liste des colonnes affichées
    list_display = BaseUserAdmin.list_display + ('is_subscribed_status',)
    
    # Permettre de filtrer par statut d'abonnement
    list_filter = BaseUserAdmin.list_filter + ('profile__is_subscribed',)
    
    # Optimiser les requêtes en utilisant select_related pour éviter les requêtes N+1
    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset.select_related('profile')
    
    def is_subscribed_status(self, obj):
        """Affiche le statut d'abonnement de l'utilisateur"""
        try:
            profile = obj.profile
            if profile.is_subscribed:
                return "✅ Abonné"
            else:
                return "❌ Non abonné"
        except Profile.DoesNotExist:
            # Créer automatiquement un profil si il n'existe pas
            Profile.objects.create(user=obj, is_subscribed=False)
            return "⚠️ Profil créé"
    
    is_subscribed_status.short_description = "Statut d'abonnement"
    is_subscribed_status.admin_order_field = 'profile__is_subscribed'

# Dé-enregistre l'ancien UserAdmin puis enregistre le nouveau
admin.site.unregister(User)
admin.site.register(User, UserAdmin)



