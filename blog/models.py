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

    def __str__(self):
        return self.user.username

class Comment(models.Model):
    article = models.ForeignKey('Article', on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(help_text="Contenu du commentaire")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Commentaire de {self.user.username} sur {self.article.title}"

