#!/usr/bin/env python3
"""
Script de test pour vérifier les validations d'inscription
"""
import requests
import json
import random
import string

# Configuration
API_BASE = "http://127.0.0.1:8000/api"

def generate_unique_string(length=8):
    """Génère une chaîne unique"""
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))

def test_registration_validation():
    """Teste les différentes validations d'inscription"""
    
    print("🧪 Test des validations d'inscription\n")
    
    # Test 1: Nom d'utilisateur trop court
    print("1. Test nom d'utilisateur trop court...")
    response = requests.post(f"{API_BASE}/register/", json={
        "username": "ab",
        "email": f"test{generate_unique_string()}@example.com",
        "password": "TestPass123"
    })
    print(f"   Statut: {response.status_code}")
    if response.status_code == 400:
        print(f"   ✅ Erreur attendue: {response.json().get('username', ['Erreur non spécifiée'])[0]}")
    else:
        print("   ❌ Erreur non détectée")
    
    # Test 2: Email invalide
    print("\n2. Test email invalide...")
    response = requests.post(f"{API_BASE}/register/", json={
        "username": f"testuser{generate_unique_string()}",
        "email": "email-invalide",
        "password": "TestPass123"
    })
    print(f"   Statut: {response.status_code}")
    if response.status_code == 400:
        print(f"   ✅ Erreur attendue: Email invalide détecté")
    else:
        print("   ❌ Erreur non détectée")
    
    # Test 3: Mot de passe faible
    print("\n3. Test mot de passe faible...")
    response = requests.post(f"{API_BASE}/register/", json={
        "username": f"testuser{generate_unique_string()}",
        "email": f"test{generate_unique_string()}@example.com",
        "password": "faible"
    })
    print(f"   Statut: {response.status_code}")
    if response.status_code == 400:
        error_data = response.json()
        if 'password' in error_data:
            print(f"   ✅ Erreur attendue: {error_data['password'][0]}")
        else:
            print(f"   ✅ Erreur détectée: {error_data}")
    else:
        print("   ❌ Erreur non détectée")
    
    # Test 4: Inscription valide
    unique_name = f"user{generate_unique_string()}"
    unique_email = f"valid{generate_unique_string()}@example.com"
    print(f"\n4. Test inscription valide ({unique_name})...")
    response = requests.post(f"{API_BASE}/register/", json={
        "username": unique_name,
        "email": unique_email,
        "password": "ValidPass123"
    })
    print(f"   Statut: {response.status_code}")
    if response.status_code == 201:
        print("   ✅ Inscription réussie")
        
        # Test 5: Tentative de duplication d'email avec le même email
        print(f"\n5. Test duplication d'email ({unique_email})...")
        response = requests.post(f"{API_BASE}/register/", json={
            "username": f"duplicate{generate_unique_string()}",
            "email": unique_email,  # Same email
            "password": "ValidPass123"
        })
        print(f"   Statut: {response.status_code}")
        if response.status_code == 400:
            error_data = response.json()
            if 'email' in error_data:
                print(f"   ✅ Erreur attendue: {error_data['email'][0]}")
            else:
                print(f"   ✅ Erreur détectée: {error_data}")
        else:
            print("   ❌ Erreur non détectée")
    else:
        print(f"   ❌ Inscription échouée: {response.json()}")

if __name__ == "__main__":
    try:
        test_registration_validation()
    except requests.exceptions.ConnectionError:
        print("❌ Erreur: Impossible de se connecter au serveur Django")
        print("   Assurez-vous que le serveur est démarré sur http://127.0.0.1:8000")
    except Exception as e:
        print(f"❌ Erreur inattendue: {e}")
