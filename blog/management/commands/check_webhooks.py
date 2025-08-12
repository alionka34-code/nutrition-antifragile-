from django.core.management.base import BaseCommand
from blog.models import StripeWebhookLog
import json
from datetime import datetime, timedelta

class Command(BaseCommand):
    help = 'Check recent Stripe webhook logs'

    def add_arguments(self, parser):
        parser.add_argument('--hours', type=int, default=24, help='Hours to look back (default: 24)')
        parser.add_argument('--event-type', type=str, help='Filter by event type')

    def handle(self, *args, **options):
        since = datetime.now() - timedelta(hours=options['hours'])
        
        logs = StripeWebhookLog.objects.filter(
            received_at__gte=since
        ).order_by('-received_at')
        
        if options['event_type']:
            logs = logs.filter(event_type=options['event_type'])
        
        self.stdout.write(f'Webhook logs from the last {options["hours"]} hours:')
        self.stdout.write('-' * 60)
        
        for log in logs:
            self.stdout.write(f'[{log.received_at}] {log.event_type}')
            
            try:
                payload = json.loads(log.payload)
                if 'customer' in payload:
                    self.stdout.write(f'  Customer: {payload["customer"]}')
                if 'email' in payload:
                    self.stdout.write(f'  Email: {payload["email"]}')
                if log.event_type == 'checkout.session.completed':
                    customer_details = payload.get('customer_details', {})
                    if customer_details.get('email'):
                        self.stdout.write(f'  Customer Email: {customer_details["email"]}')
            except:
                pass
            
            self.stdout.write('')
        
        if not logs:
            self.stdout.write('No webhook logs found for the specified period.')
