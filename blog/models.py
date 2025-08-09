from django.db import models
from django.contrib.auth.models import User
from ckeditor_uploader.fields import RichTextUploadingField
from cloudinary.models import CloudinaryField

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length = 255)
    excerpt = RichTextUploadingField(help_text="Apercu visible gratuitement")
    content = RichTextUploadingField(help_text="Contenu de l'article avec abonnement")
    is_premium = models.BooleanField(default=True, help_text="l'article est il reserve aux abonnés ?")
    published_at = models.DateTimeField(auto_now_add=True, help_text="Date de publication de l'article")
    image = CloudinaryField('image', null=True, blank=True)

    def __str__(self):
        return self.title
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_subscribed = models.BooleanField(default=False, help_text="L'utilisateur est-il abonné ?")
    stripe_customer_id = models.CharField(max_length=255, blank=True, null=True, help_text="ID du client Stripe pour les abonnements")

    def __str__(self):
        return self.user.username

class Comment(models.Model):
    article = models.ForeignKey('Article', on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(help_text="Contenu du commentaire")
    created_at = models.DateTimeField(auto_now_add=True)
    parent_comment = models.ForeignKey('self', null=True, blank=True, related_name='replies', on_delete=models.CASCADE)

    def __str__(self):
        return f"Commentaire de {self.user.username} sur {self.article.title}"

class StripeWebhookLog(models.Model):
    event_type = models.CharField(max_length=100)
    payload = models.JSONField()
    received_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.event_type} @ {self.received_at}"

