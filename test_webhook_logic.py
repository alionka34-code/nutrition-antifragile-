#!/usr/bin/env python3

import os
import sys
sys.path.append('/Users/jarod/Desktop/nutrition_blog')

# Configuration Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

import django
django.setup()

from blog.models import Profile
from django.contrib.auth.models import User
import time

def test_webhook_logic():
    """Test de la nouvelle logique webhook"""
    
    # Créer un utilisateur de test
    user, created = User.objects.get_or_create(
        email='test_webhook@example.com',
        defaults={'username': 'test_webhook'}
    )
    profile, created = Profile.objects.get_or_create(
        user=user,
        defaults={'stripe_customer_id': 'cus_test123'}
    )
    
    print(f"Test avec utilisateur {user.id} - Statut initial: {profile.is_subscribed}")
    
    # Test des différents cas
    now = int(time.time())
    future = now + 86400  # +24h
    
    test_cases = [
        {
            'name': '1. Abonnement actif normal',
            'status': 'active',
            'cancel_at_period_end': False,
            'current_period_end': future,
            'expected': True
        },
        {
            'name': '2. Abonnement actif mais annulé en fin de période',
            'status': 'active', 
            'cancel_at_period_end': True,
            'current_period_end': future,
            'expected': True
        },
        {
            'name': '3. Abonnement actif mais période expirée',
            'status': 'active',
            'cancel_at_period_end': True,
            'current_period_end': now - 3600,  # -1h
            'expected': False
        },
        {
            'name': '4. Abonnement annulé avec temps restant',
            'status': 'canceled',
            'cancel_at_period_end': False,
            'current_period_end': future,
            'expected': True
        },
        {
            'name': '5. Abonnement annulé immédiatement',
            'status': 'canceled',
            'cancel_at_period_end': False,
            'current_period_end': None,
            'expected': False
        },
        {
            'name': '6. Période d\'essai',
            'status': 'trialing',
            'cancel_at_period_end': False,
            'current_period_end': future,
            'expected': True
        }
    ]
    
    for test in test_cases:
        print(f"\n--- {test['name']} ---")
        
        # Simuler la logique du webhook
        status = test['status']
        cancel_at_period_end = test['cancel_at_period_end']
        current_period_end = test['current_period_end']
        
        should_be_premium = False
        reason = ""
        
        if status == 'active':
            if cancel_at_period_end:
                if current_period_end and current_period_end > now:
                    should_be_premium = True
                    reason = f"Active but will cancel at period end ({current_period_end})"
                else:
                    should_be_premium = False
                    reason = "Active but period already ended"
            else:
                should_be_premium = True
                reason = "Active subscription"
                
        elif status == 'trialing':
            should_be_premium = True
            reason = "Trial period"
            
        elif status == 'canceled':
            if current_period_end and current_period_end > now:
                should_be_premium = True
                reason = f"Canceled but valid until {current_period_end}"
            else:
                should_be_premium = False
                reason = "Canceled and expired"
        else:
            should_be_premium = False
            reason = f"Status {status} - not active"
        
        print(f"Statut: {status}, Cancel at end: {cancel_at_period_end}, Period end: {current_period_end}")
        print(f"Résultat: {should_be_premium} (attendu: {test['expected']})")
        print(f"Raison: {reason}")
        
        if should_be_premium == test['expected']:
            print("✅ PASS")
        else:
            print("❌ FAIL")

if __name__ == "__main__":
    test_webhook_logic()
