from django.contrib import admin
from .models import Article
from .models import Profile

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_premium', 'published_at')
    list_filter = ('is_premium', 'published_at')
    search_fields = ('title',)

class ProfileInline(admin.StackedInline):
    model = Profile

from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline,)

# Dé-enregistre l'ancien UserAdmin puis enregistre le nouveau
admin.site.unregister(User)
admin.site.register(User, UserAdmin)



