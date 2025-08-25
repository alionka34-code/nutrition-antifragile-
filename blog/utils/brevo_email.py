import requests
from django.conf import settings

def send_brevo_email(to_email, to_name, template_id, params={}):
    print("🔑 Clé envoyée à Brevo :", settings.BREVO_API_KEY[:10], "...")  # juste les 10 premiers caractères
    url = "https://api.brevo.com/v3/smtp/email"
    headers = {
        "accept": "application/json",
        "api-key": settings.BREVO_API_KEY,
        "content-type": "application/json"
    }
    payload = {
        "sender": {"email": "alionka@symbiose-audiovisuelle.fr", "name": "Alionka"},
        "to": [{"email": to_email, "name": to_name}],
        "templateId": template_id,
        "params": params
    }
    response = requests.post(url, json=payload, headers=headers)
    print("📩 Status code :", response.status_code)
    print("📩 Réponse :", response.text)
