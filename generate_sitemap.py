#!/usr/bin/env python
"""
Script pour générer automatiquement le fichier sitemap.xml
Usage: python generate_sitemap.py
"""

import os
import sys
import django
from django.conf import settings

# Configurer Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.sitemaps.views import sitemap
from django.test import RequestFactory
from blog.sitemaps import StaticViewSitemap, ArticleSitemap
import xml.etree.ElementTree as ET

def generate_sitemap():
    """Génère le fichier sitemap.xml"""
    
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
        # Formater le XML avec indentation
        ET.indent(root, space="  ", level=0)
        formatted_xml = ET.tostring(root, encoding='unicode', xml_declaration=True)
    except:
        # Si le formatage échoue, utiliser le contenu brut
        formatted_xml = xml_content
    
    # Sauvegarder le fichier
    sitemap_path = os.path.join(settings.BASE_DIR, 'sitemap.xml')
    with open(sitemap_path, 'w', encoding='utf-8') as f:
        f.write(formatted_xml)
    
    return sitemap_path

def count_urls_in_sitemap():
    """Compte le nombre d'URLs dans le sitemap"""
    from blog.models import Article
    
    static_pages = 10  # Pages statiques définies dans StaticViewSitemap
    articles_count = Article.objects.count()
    total = static_pages + articles_count
    
    return {
        'static_pages': static_pages,
        'articles': articles_count,
        'total': total
    }

if __name__ == '__main__':
    try:
        print("🚀 Génération du sitemap...")
        
        # Compter les URLs
        counts = count_urls_in_sitemap()
        print(f"📊 Pages statiques: {counts['static_pages']}")
        print(f"📊 Articles: {counts['articles']}")
        print(f"📊 Total URLs: {counts['total']}")
        
        # Générer le sitemap
        sitemap_path = generate_sitemap()
        
        print(f"✅ Sitemap généré avec succès!")
        print(f"📄 Fichier: {sitemap_path}")
        print(f"🌐 URL: http://127.0.0.1:8000/sitemap.xml")
        
        # Vérifier la taille du fichier
        file_size = os.path.getsize(sitemap_path)
        print(f"📏 Taille: {file_size} bytes")
        
    except Exception as e:
        print(f"❌ Erreur lors de la génération: {e}")
        sys.exit(1)
