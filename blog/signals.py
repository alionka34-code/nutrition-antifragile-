from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Profile
from .models import Article
from django.conf import settings
from .utils.brevo_email import send_brevo_email
import threading

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




@receiver(post_save, sender=Article)
def send_new_article_email(sender, instance, created, **kwargs):
    if created:  
        article_url = f"{settings.FRONTEND_URL}articles/{instance.id}"
        # si nouvel article
        for user in User.objects.all():
            send_brevo_email(
                to_email=user.email,
                to_name=user.username,
                template_id=4,  # ID du template "Nouvel article"
                params={
                    "USERNAME": user.username,
                    "ARTICLE_TITLE": instance.title,
                    "ARTICLE_URL": article_url
                }
            )