from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from blog.models import Profile
import stripe
from django.conf import settings

stripe.api_key = settings.STRIPE_SECRET_KEY

class Command(BaseCommand):
    help = 'Fix user subscription status based on Stripe data'

    def add_arguments(self, parser):
        parser.add_argument('--email', type=str, help='Email of the user to fix')
        parser.add_argument('--user-id', type=int, help='ID of the user to fix')
        parser.add_argument('--all', action='store_true', help='Check all users')

    def handle(self, *args, **options):
        if options['email']:
            try:
                user = User.objects.get(email=options['email'])
                self.fix_user_subscription(user)
            except User.DoesNotExist:
                self.stdout.write(self.style.ERROR(f'User with email {options["email"]} not found'))
        
        elif options['user_id']:
            try:
                user = User.objects.get(id=options['user_id'])
                self.fix_user_subscription(user)
            except User.DoesNotExist:
                self.stdout.write(self.style.ERROR(f'User with ID {options["user_id"]} not found'))
        
        elif options['all']:
            users = User.objects.all()
            for user in users:
                self.fix_user_subscription(user)
        
        else:
            self.stdout.write(self.style.ERROR('Please provide --email, --user-id, or --all'))

    def fix_user_subscription(self, user):
        try:
            profile, created = Profile.objects.get_or_create(user=user)
            
            if not profile.stripe_customer_id:
                self.stdout.write(f'User {user.email} has no Stripe customer ID')
                return
            
            # Vérifier les abonnements actifs sur Stripe
            subscriptions = stripe.Subscription.list(
                customer=profile.stripe_customer_id,
                status='active'
            )
            
            # Vérifier les paiements réussis récents
            charges = stripe.Charge.list(
                customer=profile.stripe_customer_id,
                limit=10
            )
            
            has_active_subscription = len(subscriptions.data) > 0
            has_recent_payment = any(charge.status == 'succeeded' for charge in charges.data)
            
            if has_active_subscription or has_recent_payment:
                if not profile.is_subscribed:
                    profile.is_subscribed = True
                    profile.save()
                    self.stdout.write(
                        self.style.SUCCESS(f'✅ Fixed subscription for {user.email}')
                    )
                else:
                    self.stdout.write(f'✓ {user.email} already marked as subscribed')
            else:
                if profile.is_subscribed:
                    profile.is_subscribed = False
                    profile.save()
                    self.stdout.write(
                        self.style.WARNING(f'⚠️  Unsubscribed {user.email} (no active subscription)')
                    )
                else:
                    self.stdout.write(f'- {user.email} correctly marked as not subscribed')
                    
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error processing {user.email}: {str(e)}')
            )
