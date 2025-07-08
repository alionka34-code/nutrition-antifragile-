from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length = 255)
    excerpt = models.TextField(help_text="Apercu visible gratuitement")
    content = models.TextField(help_text="Contenu de l'article avec abonnement")
    is_premium = models.BooleanField(default=True, help_text="l'article est il reserve aux abonnés ?")
    published_at = models.DateTimeField(auto_now_add=True, help_text="Date de publication de l'article")
    image = models.ImageField(upload_to='articles_images/', null=True, blank=True)

    def __str__(self):
        return self.title
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_subscribed = models.BooleanField(default=True, help_text="L'utilisateur est-il abonné ?")

    def __str__(self):
        return self.user.username

