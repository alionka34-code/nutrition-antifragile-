import requests
from django.conf import settings

def send_brevo_email(to_email, to_name, template_id, params={}):
    brevo_key = getattr(settings, 'BREVO_API_KEY', None)
    if not brevo_key:
        print("⚠️ BREVO_API_KEY absent — envoi d'email Brevo ignoré")
        return None
    brevo_key = str(brevo_key).strip()
    print("🔑 Clé envoyée à Brevo :", brevo_key[:10], "...")  # juste les 10 premiers caractères
    url = "https://api.brevo.com/v3/smtp/email"
    headers = {
        "accept": "application/json",
        "api-key": brevo_key,
        "content-type": "application/json"
    }
    payload = {
        "sender": {"email": "alionka@symbiose-audiovisuelle.fr", "name": "Alionka"},
        "to": [{"email": to_email, "name": to_name}],
        "templateId": template_id,
        "params": params
    }
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=10)
        print("📩 Status code :", response.status_code)
        print("📩 Réponse :", response.text)
        return response
    except Exception as exc:
        print("❌ Erreur lors de l'envoi vers Brevo :", repr(exc))
        return None
