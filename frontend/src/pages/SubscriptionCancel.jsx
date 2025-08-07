import React from 'react';

export default function SubscriptionCancel() {
  return (
    <div className="container">
      <h1>Paiement annulé ❌</h1>
      <p>Votre paiement n’a pas été finalisé. Vous pouvez réessayer.</p>
      <a href="/abonnement">Réessayer</a>
    </div>
  );
}
