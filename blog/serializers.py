from rest_framework import serializers
from .models import Article
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Comment 

class ArticleSerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField()
    is_subscribed = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ['id', 'title', 'excerpt', 'content', 'image', 'is_premium', 'published_at', 'is_subscribed', 'slug']

    def get_content(self, obj):
        request = self.context.get('request')
        if not obj.is_premium:
            return obj.content
        
        if request and request.user.is_authenticated:
            if hasattr(request.user, 'profile') and request.user.profile.is_subscribed:
                return obj.content
        
        return '<div class="py-10 mt-10"><h1 class="text-marron text-center font-SFBold">🔒 La suite de l\'article est réservé aux abonnés.</h1><button id="subscribe-block" class="mt-8 block mx-auto text-lg font-SFBold rounded-full text-white px-6 py-4 bg-gradient-to-tr from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 md:text-xl">ABONNEZ VOUS</button></div>'

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
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']
    
    def validate_username(self, value):
        """Validation du nom d'utilisateur"""
        if len(value) < 3:
            raise serializers.ValidationError("Le nom d'utilisateur doit contenir au moins 3 caractères.")
        
        if not value.replace('_', '').isalnum():
            raise serializers.ValidationError("Le nom d'utilisateur ne peut contenir que des lettres, chiffres et underscores.")
        
        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError("Ce nom d'utilisateur est déjà utilisé.")
        
        return value
    
    def validate_email(self, value):
        """Validation de l'email"""
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Cette adresse email est déjà utilisée.")
        
        return value.lower()
    
    def validate_password(self, value):
        """Validation du mot de passe"""
        if len(value) < 8:
            raise serializers.ValidationError("Le mot de passe doit contenir au moins 8 caractères.")
        
        if not any(c.islower() for c in value):
            raise serializers.ValidationError("Le mot de passe doit contenir au moins une lettre minuscule.")
        
        if not any(c.isupper() for c in value):
            raise serializers.ValidationError("Le mot de passe doit contenir au moins une lettre majuscule.")
        
        if not any(c.isdigit() for c in value):
            raise serializers.ValidationError("Le mot de passe doit contenir au moins un chiffre.")
        
        return value
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        """
        Allow case-insensitive login by resolving the provided username
        using an iexact lookup, then passing the canonical username to
        the parent validator (which calls authenticate).
        """
        username_field = self.username_field
        provided = attrs.get(username_field)
        if isinstance(provided, str) and provided:
            UserModel = get_user_model()
            try:
                user_obj = UserModel.objects.get(**{f"{username_field}__iexact": provided})
                # Replace with the exact stored username so authenticate succeeds
                attrs[username_field] = getattr(user_obj, username_field)
            except UserModel.DoesNotExist:
                # Fall back to provided value; parent will raise the usual error
                pass
        return super().validate(attrs)

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Ajout des infos personnalisées
        token['username'] = user.username
        token['is_staff'] = user.is_staff

        if hasattr(user, 'profile'):
            token['is_subscribed'] = user.profile.is_subscribed

        token['is_staff'] = user.is_staff

        return token
    
class RecursiveCommentSerializer(serializers.Serializer):
    def to_representation(self, value):
        serializer = CommentSerializer(value, context=self.context)
        return serializer.data

class CommentSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)
    replies = RecursiveCommentSerializer(many=True, read_only=True)
    parent_comment_username = serializers.CharField(source='parent_comment.user.username', read_only=True, default=None)

    class Meta:
        model = Comment
        fields = ['id', 'article', 'user', 'user_username', 'content', 'created_at', 'parent_comment', 'parent_comment_username', 'replies']
        read_only_fields = ['user', 'created_at']