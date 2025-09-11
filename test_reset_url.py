#!/usr/bin/env python3

import os
import sys
sys.path.append('/Users/jarod/Desktop/nutrition_blog')

# Configuration Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

import django
django.setup()

from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.conf import settings
from blog.views import _frontend_base_url

def test_reset_url_generation():
    print("=== Test génération URL de reset ===")
    
    # Simuler une requête
    class MockRequest:
        def __init__(self):
            self.META = {
                'HTTP_ORIGIN': 'http://localhost:5173',
                'HTTP_REFERER': 'http://localhost:5173/password-lost'
            }
    
    mock_request = MockRequest()
    
    # Tester _frontend_base_url
    frontend_url = _frontend_base_url(mock_request)
    print(f"Frontend URL générée: {frontend_url}")
    print(f"FRONTEND_URL des settings: {settings.FRONTEND_URL}")
    print(f"DEBUG mode: {settings.DEBUG}")
    
    # Vérifier l'utilisateur
    try:
        user = User.objects.get(email="thongkhamdyjarod77@gmail.com")
        print(f"User trouvé: {user.username} (ID: {user.id})")
        
        # Générer token et UID
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        
        # Construire le lien de reset
        reset_link = f"{frontend_url}reset-password/{uid}/{token}"
        
        print(f"Reset link généré: {reset_link}")
        print(f"UID: {uid}")
        print(f"Token: {token}")
        
        # Tester la validité du token
        from django.utils.encoding import force_str
        from django.utils.http import urlsafe_base64_decode
        
        try:
            decoded_uid = force_str(urlsafe_base64_decode(uid))
            test_user = User.objects.get(pk=decoded_uid)
            token_valid = default_token_generator.check_token(test_user, token)
            print(f"Token valide: {token_valid}")
        except Exception as e:
            print(f"Erreur validation token: {e}")
            
    except User.DoesNotExist:
        print("User pas trouvé!")

if __name__ == "__main__":
    test_reset_url_generation()
