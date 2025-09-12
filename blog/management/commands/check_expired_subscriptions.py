from django.core.management.base import BaseCommand
from blog.views import check_expired_subscriptions
import logging

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Vérifie et met à jour les abonnements expirés'

    def handle(self, *args, **options):
        self.stdout.write('Vérification des abonnements expirés...')
        try:
            check_expired_subscriptions()
            self.stdout.write(
                self.style.SUCCESS('✅ Vérification des abonnements terminée avec succès')
            )
        except Exception as e:
            logger.error(f"Erreur lors de la vérification des abonnements: {e}")
            self.stdout.write(
                self.style.ERROR(f'❌ Erreur: {e}')
            )
