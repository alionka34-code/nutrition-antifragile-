from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from blog.models import Profile
import stripe
from django.conf import settings

stripe.api_key = settings.STRIPE_SECRET_KEY

class Command(BaseCommand):
    help = 'Synchronise les statuts d\'abonnement avec Stripe'

    def add_arguments(self, parser):
        parser.add_argument(
            '--check-all',
            action='store_true',
            help='Vérifier tous les utilisateurs avec customer_id',
        )
        parser.add_argument(
            '--email',
            type=str,
            help='Vérifier un utilisateur spécifique par email',
        )

    def handle(self, *args, **options):
        if options['email']:
            try:
                user = User.objects.get(email=options['email'])
                self.check_user_subscription(user)
            except User.DoesNotExist:
                self.stdout.write(f"❌ Utilisateur {options['email']} non trouvé")
        elif options['check_all']:
            profiles = Profile.objects.filter(stripe_customer_id__isnull=False)
            for profile in profiles:
                self.check_user_subscription(profile.user)
        else:
            # Par défaut, vérifier seulement ceux qui ont customer_id mais pas abonnés
            profiles = Profile.objects.filter(stripe_customer_id__isnull=False, is_subscribed=False)
            self.stdout.write(f"Vérification de {profiles.count()} utilisateurs non abonnés avec customer_id...")
            for profile in profiles:
                self.check_user_subscription(profile.user)

    def check_user_subscription(self, user):
        try:
            profile = Profile.objects.get(user=user)
            if not profile.stripe_customer_id:
                self.stdout.write(f"⚠️  {user.email}: Pas de customer_id")
                return

            # Vérifier les abonnements actifs
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
            has_successful_payment = any(charge.status == 'succeeded' for charge in charges.data)

            current_status = profile.is_subscribed
            should_be_subscribed = has_active_subscription or has_successful_payment

            self.stdout.write(f"\n📊 {user.email}:")
            self.stdout.write(f"   Customer ID: {profile.stripe_customer_id}")
            self.stdout.write(f"   Statut actuel: {'✅ Abonné' if current_status else '❌ Pas abonné'}")
            self.stdout.write(f"   Abonnements actifs: {len(subscriptions.data)}")
            self.stdout.write(f"   Paiements réussis: {sum(1 for c in charges.data if c.status == 'succeeded')}")

            if should_be_subscribed and not current_status:
                profile.is_subscribed = True
                profile.save()
                self.stdout.write(f"   ✅ Statut corrigé: utilisateur maintenant abonné")
            elif not should_be_subscribed and current_status:
                self.stdout.write(f"   ⚠️  Attention: utilisateur abonné mais pas de paiement/abonnement actif")
            else:
                self.stdout.write(f"   ✓ Statut correct")

        except Exception as e:
            self.stdout.write(f"❌ Erreur pour {user.email}: {str(e)}")
