# 🎯 LOGIQUE D'ABONNEMENT COMPLÈTE

## Comportements selon les événements Stripe :

### 📈 **ACTIVATION (Premium)** 
- ✅ Nouveau abonnement (`checkout.session.completed`)
- ✅ Abonnement actif (`status: active` sans annulation)
- ✅ Période d'essai (`status: trialing`)
- ✅ Paiement réussi (`invoice.payment_succeeded`)
- ✅ Abonnement annulé MAIS période pas encore expirée

### 📉 **DÉSACTIVATION (Free)**
- ❌ Échec de paiement (`invoice.payment_failed`)
- ❌ Abonnement supprimé (`customer.subscription.deleted`)
- ❌ Abonnement annulé immédiatement (sans `current_period_end`)
- ❌ Abonnement avec période expirée
- ❌ Statuts non-actifs (`incomplete`, `unpaid`, etc.)

## Cas d'usage spécifiques :

### 🔄 **Annulation en fin de période**
```
Status: active
Cancel at period end: true
Current period end: [date future]
→ Résultat: PREMIUM jusqu'à expiration
```

### ⚡ **Annulation immédiate**
```
Status: canceled
Current period end: null
→ Résultat: FREE immédiatement
```

### ⏰ **Annulation avec temps restant**
```
Status: canceled  
Current period end: [date future]
→ Résultat: PREMIUM jusqu'à expiration
```

### 💰 **Échec de paiement**
```
Event: invoice.payment_failed
→ Résultat: FREE immédiatement
```

## Vérifications automatiques :

1. **Webhooks en temps réel** : Mise à jour instantanée via Stripe
2. **Commande manuelle** : `python manage.py check_expired_subscriptions`
3. **API Admin** : `POST /api/check-expired-subscriptions/`
4. **Tâche cron recommandée** : Quotidienne pour rattraper les événements manqués
