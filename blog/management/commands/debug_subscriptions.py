from django.core.management.base import BaseCommand
from blog.models import Profile
import stripe
from django.conf import settings
import logging

logger = logging.getLogger(__name__)
stripe.api_key = settings.STRIPE_SECRET_KEY

class Command(BaseCommand):
    help = 'Debug les abonnements Stripe'

    def add_arguments(self, parser):
        parser.add_argument('--user-id', type=int, help='ID de l\'utilisateur à débugger')

    def handle(self, *args, **options):
        user_id = options.get('user_id')
        
        if user_id:
            try:
                profile = Profile.objects.get(user_id=user_id)
                self.debug_user_subscription(profile)
            except Profile.DoesNotExist:
                self.stdout.write(self.style.ERROR(f'Profil pour user_id {user_id} introuvable'))
        else:
            # Debug tous les profils abonnés
            profiles = Profile.objects.filter(is_subscribed=True, stripe_customer_id__isnull=False)
            for profile in profiles:
                self.debug_user_subscription(profile)

    def debug_user_subscription(self, profile):
        self.stdout.write(f'\n=== PROFIL {profile.user.id} ({profile.user.email}) ===')
        self.stdout.write(f'Is subscribed: {profile.is_subscribed}')
        self.stdout.write(f'Stripe customer ID: {profile.stripe_customer_id}')
        
        if profile.stripe_customer_id:
            try:
                # Récupère les abonnements
                subscriptions = stripe.Subscription.list(
                    customer=profile.stripe_customer_id,
                    status='all',
                    limit=10
                )
                
                if subscriptions.data:
                    for sub in subscriptions.data:
                        self.stdout.write(f'\n--- Abonnement {sub.id} ---')
                        self.stdout.write(f'Status: {sub.status}')
                        self.stdout.write(f'Cancel at period end: {sub.cancel_at_period_end}')
                        
                        current_period_end = getattr(sub, 'current_period_end', None)
                        self.stdout.write(f'Current period end: {current_period_end}')
                        
                        import time
                        if current_period_end:
                            end_date = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(current_period_end))
                            now = time.strftime('%Y-%m-%d %H:%M:%S')
                            self.stdout.write(f'End date: {end_date}')
                            self.stdout.write(f'Now: {now}')
                            self.stdout.write(f'Expired: {current_period_end < int(time.time())}')
                        else:
                            self.stdout.write('No current_period_end (abonnement immédiatement annulé)')
                            
                        # Logique de notre application
                        import time
                        now_timestamp = int(time.time())
                        should_be_active = False
                        
                        if sub.status in ['active', 'trialing']:
                            if sub.cancel_at_period_end and current_period_end:
                                should_be_active = current_period_end > now_timestamp
                            else:
                                should_be_active = True
                        elif sub.status == 'canceled' and current_period_end:
                            should_be_active = current_period_end > now_timestamp
                            
                        self.stdout.write(f'Should be active according to our logic: {should_be_active}')
                    
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Erreur Stripe: {e}'))
