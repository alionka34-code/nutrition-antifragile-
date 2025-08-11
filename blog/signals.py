from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Profile
from django.conf import settings
from django.core.mail import send_mail


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
    if created:
        # Correction SSL temporaire pour macOS
        import ssl
        ssl._create_default_https_context = ssl._create_unverified_context
        
        subject = "Bienvenue sur Nutrition Antifragile"
        message = f"Bonjour {instance.username},\n\nTon inscription est confirmée !\n\nTu peux désormais lire une sélection d’articles et surtout, rejoindre la discussion.\n\nChaque lecteur compte : tes commentaires, tes questions et ton regard font partie de la richesse du contenu.\n\nCommencer la lecture: [Accéder aux articles].\n\n Bienvenue parmi ceux qui veulent comprendre, pas juste consommer.\n\nA bientôt,\n\nAlionka"
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = [instance.email]
        
        try:
            send_mail(subject, message, from_email, recipient_list)
            print(f"✅ Email de bienvenue envoyé à {instance.email}")
        except Exception as e:
            print(f"⚠️ Erreur lors de l'envoi de l'email de bienvenue à {instance.email}: {e}")
            # L'inscription continue même si l'email échoue 