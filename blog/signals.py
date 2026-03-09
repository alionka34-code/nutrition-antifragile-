from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Profile, Article, Comment, VideoComment, ChapterComment, Notification
from django.conf import settings
from django.core.mail import send_mail
from .utils.brevo_email import send_brevo_email

try:
    import sib_api_v3_sdk
    from sib_api_v3_sdk.rest import ApiException
    BREVO_SDK_AVAILABLE = True
except ImportError:
    print("⚠️ Warning: sib_api_v3_sdk not available. Brevo contact sync will be disabled.")
    BREVO_SDK_AVAILABLE = False


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
    print(f"🔄 Signal add_user_to_brevo déclenché - User: {instance.username}, Created: {created}")
    
    if not BREVO_SDK_AVAILABLE:
        print("⚠️ Brevo SDK not available, skipping contact sync")
        return
        
    if not created:
        print("⚠️ User not newly created, skipping Brevo sync")
        return
        
    if not instance.email:
        print("⚠️ User has no email, skipping Brevo sync")
        return
        
    print(f"📧 Tentative d'ajout de {instance.email} à Brevo...")
    
    try:
        configuration = sib_api_v3_sdk.Configuration()
        configuration.api_key['api-key'] = settings.BREVO_API_KEY

        api_instance = sib_api_v3_sdk.ContactsApi(sib_api_v3_sdk.ApiClient(configuration))

        contact = sib_api_v3_sdk.CreateContact(
            email=instance.email,
            attributes={
                "FIRSTNAME": instance.first_name or "",
                "LASTNAME": instance.last_name or "",
            },
            list_ids=[6]  # 🔁 Remplace 1 par ton vrai ID de liste Brevo
        )

        api_instance.create_contact(contact)
        print(f"✅ {instance.email} ajouté à Brevo avec succès.")
    except ApiException as e:
        print(f"⚠️ Erreur lors de l'ajout à Brevo pour {instance.email}: {e}")
    except Exception as e:
        print(f"❌ Erreur inattendue lors de l'ajout à Brevo: {e}")


def _create_comment_notifications(instance, comment_type, content_title, content_slug):
    """Create notifications for a new comment or reply."""
    preview = instance.content[:150]

    if instance.parent_comment is not None:
        # It's a reply — notify the parent comment author if admin or subscribed
        parent_author = instance.parent_comment.user
        # Don't notify yourself
        if parent_author == instance.user:
            return
        # Only notify admin or subscribed users
        is_admin = parent_author.is_staff
        is_subscribed = hasattr(parent_author, 'profile') and parent_author.profile.is_subscribed
        if is_admin or is_subscribed:
            Notification.objects.create(
                recipient=parent_author,
                notification_type='reply',
                comment_type=comment_type,
                actor_username=instance.user.username,
                content_preview=preview,
                content_title=content_title,
                content_slug=content_slug,
            )
    else:
        # It's a top-level comment — notify all admin users
        admin_users = User.objects.filter(is_staff=True).exclude(pk=instance.user.pk)
        notifications = [
            Notification(
                recipient=admin,
                notification_type='new_comment',
                comment_type=comment_type,
                actor_username=instance.user.username,
                content_preview=preview,
                content_title=content_title,
                content_slug=content_slug,
            )
            for admin in admin_users
        ]
        if notifications:
            Notification.objects.bulk_create(notifications)


@receiver(post_save, sender=Comment)
def notify_article_comment(sender, instance, created, **kwargs):
    if created:
        _create_comment_notifications(instance, 'article', instance.article.title, instance.article.slug or '')


@receiver(post_save, sender=VideoComment)
def notify_video_comment(sender, instance, created, **kwargs):
    if created:
        _create_comment_notifications(instance, 'video', instance.video.title, instance.video.slug or '')


@receiver(post_save, sender=ChapterComment)
def notify_chapter_comment(sender, instance, created, **kwargs):
    if created:
        theme_slug = instance.chapter.theme.slug or '' if instance.chapter.theme else ''
        _create_comment_notifications(instance, 'chapter', instance.chapter.title, theme_slug)