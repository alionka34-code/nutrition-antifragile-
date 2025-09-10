from django.core.management.base import BaseCommand
from django.utils.text import slugify
from blog.models import Article

class Command(BaseCommand):
    help = 'Génère des slugs pour tous les articles qui n’en ont pas'

    def handle(self, *args, **options):
        articles = Article.objects.filter(slug__isnull=True)
        for article in articles:
            base_slug = slugify(article.title)[:200]
            slug = base_slug
            counter = 1
            while Article.objects.filter(slug=slug).exists():
                slug = f"{base_slug[:200-len(str(counter))-1]}-{counter}"
                counter += 1
            article.slug = slug
            article.save()
            self.stdout.write(self.style.SUCCESS(f'Slug généré pour: {article.title} -> {article.slug}'))

        self.stdout.write(self.style.SUCCESS('Tous les slugs manquants ont été générés.'))
