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

# Dé-enregistre l'ancien UserAdmin puis enregistre le nouveau
admin.site.unregister(User)
admin.site.register(User, UserAdmin)



