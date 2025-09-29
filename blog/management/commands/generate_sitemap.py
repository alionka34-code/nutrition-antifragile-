from django.core.management.base import BaseCommand
from django.contrib.sitemaps.views import sitemap
from django.test import RequestFactory
from django.conf import settings
from blog.sitemaps import StaticViewSitemap, ArticleSitemap
from blog.models import Article
import xml.etree.ElementTree as ET
import os


class Command(BaseCommand):
    help = 'Génère le fichier sitemap.xml statique'

    def add_arguments(self, parser):
        parser.add_argument(
            '--output',
            type=str,
            default='sitemap.xml',
            help='Nom du fichier de sortie (défaut: sitemap.xml)'
        )

    def handle(self, *args, **options):
        output_file = options['output']
        
        self.stdout.write(
            self.style.SUCCESS('🚀 Génération du sitemap...')
        )
        
        # Compter les éléments
        static_pages = 10
        articles_count = Article.objects.count()
        total = static_pages + articles_count
        
        self.stdout.write(f'📊 Pages statiques: {static_pages}')
        self.stdout.write(f'📊 Articles: {articles_count}') 
        self.stdout.write(f'📊 Total URLs: {total}')
        
        # Configuration des sitemaps
        sitemaps = {
            'static': StaticViewSitemap,
            'articles': ArticleSitemap,
        }
        
        # Créer une fausse requête
        factory = RequestFactory()
        request = factory.get('/sitemap.xml')
        request.META['HTTP_HOST'] = 'alionka-houl.eo.symbiose-audiovisuelle.fr'
        request.is_secure = lambda: True  # HTTPS
        
        try:
            # Générer le sitemap
            response = sitemap(request, sitemaps=sitemaps)
            
            # Rendre la réponse si nécessaire
            if hasattr(response, 'render'):
                response.render()
            
            # Obtenir le contenu XML
            xml_content = response.content.decode('utf-8')
            
            # Parser et formater le XML
            try:
                root = ET.fromstring(xml_content)
                ET.indent(root, space="  ", level=0)
                formatted_xml = ET.tostring(root, encoding='unicode', xml_declaration=True)
            except:
                formatted_xml = xml_content
            
            # Sauvegarder le fichier
            sitemap_path = os.path.join(settings.BASE_DIR, output_file)
            with open(sitemap_path, 'w', encoding='utf-8') as f:
                f.write(formatted_xml)
            
            # Vérifier la taille du fichier
            file_size = os.path.getsize(sitemap_path)
            
            self.stdout.write(
                self.style.SUCCESS(f'✅ Sitemap généré avec succès!')
            )
            self.stdout.write(f'📄 Fichier: {sitemap_path}')
            self.stdout.write(f'📏 Taille: {file_size} bytes')
            self.stdout.write(f'🌐 URL dynamique: /sitemap.xml')
            
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'❌ Erreur lors de la génération: {e}')
            )
