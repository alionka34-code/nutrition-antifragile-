#!/usr/bin/env python3

import os
import sys
sys.path.append('/Users/jarod/Desktop/nutrition_blog')

# Configuration Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

import django
django.setup()

from brevo_python import Configuration, ApiClient, TransactionalEmailsApi
from brevo_python.models import SendSmtpEmail, SendSmtpEmailSender, SendSmtpEmailTo
from django.conf import settings

def test_brevo():
    print("Testing Brevo API...")
    print(f"BREVO_API_KEY exists: {bool(settings.BREVO_API_KEY)}")
    print(f"DEFAULT_FROM_EMAIL: {settings.DEFAULT_FROM_EMAIL}")
    
    configuration = Configuration()
    configuration.api_key['api-key'] = settings.BREVO_API_KEY
    
    api_instance = TransactionalEmailsApi(ApiClient(configuration))
    
    send_smtp_email = SendSmtpEmail(
        sender=SendSmtpEmailSender(name="Test Nutrition", email=settings.DEFAULT_FROM_EMAIL),
        to=[SendSmtpEmailTo(email="thongkhamdyjarod77@gmail.com")],
        subject="Test Brevo - Reset Password",
        html_content="""
            <p>Bonjour,</p>
            <p>Ceci est un test d'envoi d'email via Brevo.</p>
            <p>Si vous recevez cet email, Brevo fonctionne correctement.</p>
        """
    )

    try:
        response = api_instance.send_transac_email(send_smtp_email)
        print(f"Email sent successfully! Response: {response}")
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

if __name__ == "__main__":
    test_brevo()
