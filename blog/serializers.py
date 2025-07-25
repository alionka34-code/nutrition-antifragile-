from rest_framework import serializers
from .models import Article
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Comment 

class ArticleSerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField()
    is_subscribed = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

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
        
        return '<div class="py-10 mt-10"><p class="text-marron text-center font-SFBold text-2xl md:text-4xl">🔒 La suite de l\'article est réservé aux abonnés.</p><button id="subscribe-block" class="mt-8 block mx-auto text-lg font-SFBold rounded-full text-white px-6 py-4 bg-gradient-to-tr from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 md:text-xl">ABONNEZ VOUS</button></div>'

    def get_is_subscribed(self, obj):
        user = self.context['request'].user
        if not user.is_authenticated:
            return False
        return user.profile.is_subscribed
    
    def get_image(self, obj):
        if obj.image:
            return obj.image.url  # <-- toujours l’URL complète
        return None

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Ajout des infos personnalisées
        token['username'] = user.username

        if hasattr(user, 'profile'):
            token['is_subscribed'] = user.profile.is_subscribed

        token['is_staff'] = user.is_staff

        return token
    
class CommentSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'article', 'user', 'user_username', 'content', 'created_at']
        read_only_fields = ['user', 'created_at']