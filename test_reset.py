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

def test_password_reset_flow():
    print("Testing password reset flow...")
    
    # Vérifier l'utilisateur
    try:
        user = User.objects.get(email="thongkhamdyjarod77@gmail.com")
        print(f"User found: {user.username}")
    except User.DoesNotExist:
        print("User not found!")
        return
    
    # Générer token et UID
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    
    # Construire le lien de reset
    reset_link = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}"
    
    print(f"FRONTEND_URL: {settings.FRONTEND_URL}")
    print(f"Reset link: {reset_link}")
    
    # Envoyer l'email
    from blog.views import send_reset_email_brevo
    success = send_reset_email_brevo("thongkhamdyjarod77@gmail.com", reset_link)
    
    print(f"Email sent: {success}")
    if success:
        print("✅ Check your email (including spam folder)!")
        print(f"🔗 Reset link: {reset_link}")

if __name__ == "__main__":
    test_password_reset_flow()
