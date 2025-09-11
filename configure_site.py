#!/usr/bin/env python3

import os
import sys
sys.path.append('/Users/jarod/Desktop/nutrition_blog')

# Configuration Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

import django
django.setup()

from django.contrib.sites.models import Site

def configure_site():
    """Configure le site pour le sitemap"""
    try:
        site = Site.objects.get(pk=1)
        site.domain = 'alionka-houl.eo.symbiose-audiovisuelle.fr'
        site.name = 'Nutrition Antifragile'
        site.save()
        print(f"Site configuré: {site.domain} - {site.name}")
    except Site.DoesNotExist:
        site = Site.objects.create(
            pk=1,
            domain='alionka-houl.eo.symbiose-audiovisuelle.fr',
            name='Nutrition Antifragile'
        )
        print(f"Site créé: {site.domain} - {site.name}")

if __name__ == "__main__":
    configure_site()
