from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Profile
from .models import Article
from django.conf import settings
from django.core.mail import send_mail
from .utils.brevo_email import send_brevo_email
import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException


  # pas de slash supplémentaire
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created and not hasattr(instance, 'profile'):
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'profile'):
        instance.profile.save()
    else:
        # Créer le profil s'il n'existe pas encore
        Profile.objects.get_or_create(user=instance)

@receiver(post_save, sender=User)
def send_welcome_email(sender, instance, created, **kwargs):
    if created:  # si nouvel utilisateur créé
        send_brevo_email(
            to_email=instance.email,
            to_name=instance.username,
            template_id=5,  # ID du template "Confirmation d'inscription"
            params={"USERNAME": instance.username}
        )

# Auto mail to brevo 
@receiver(post_save, sender=User)
def add_user_to_brevo(sender, instance, created, **kwargs):
    """
    Ajoute automatiquement chaque nouvel utilisateur à Brevo lors de son inscription.
    """
    if created and instance.email:
        configuration = sib_api_v3_sdk.Configuration()
        configuration.api_key['api-key'] = settings.BREVO_API_KEY

        api_instance = sib_api_v3_sdk.ContactsApi(sib_api_v3_sdk.ApiClient(configuration))
        
        contact = sib_api_v3_sdk.CreateContact(
            email=instance.email,
            attributes={
                "FIRSTNAME": instance.first_name or "",
                "LASTNAME": instance.last_name or "",
            },
            list_ids=[1]  # 🟡 Remplace 1 par l’ID de ta liste Brevo
        )

        try:
            api_instance.create_contact(contact)
            print(f"✅ {instance.email} ajouté à Brevo avec succès.")
        except ApiException as e:
            print(f"⚠️ Erreur lors de l'ajout à Brevo pour {instance.email}: {e}")