from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField()
    is_subscribed = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ['id', 'title', 'excerpt', 'content', 'image', 'is_premium', 'published_at', 'is_subscribed']

    def get_content(self, obj):
        request = self.context.get('request')
        if not obj.is_premium:
            return obj.content
        
        if request and request.user.is_authenticated:
            if hasattr(request.user, 'profile') and request.user.profile.is_subscribed:
                return obj.content
        
        return "🔒 Cet article est réservé aux abonnés."

    def get_is_subscribed(self, obj):
        user = self.context['request'].user
        if not user.is_authenticated:
            return False
        return user.profile.is_subscribed
