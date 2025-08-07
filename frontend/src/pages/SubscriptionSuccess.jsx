import React, { useContext } from 'react';
import { AuthContext } from "../contexts/AuthContextDefinition";

export default function SubscriptionSuccess() {
  const { username } = useContext(AuthContext);

  return (
    <div className="container">
      <h1>Paiement réussi 🎉</h1>
      <p>Merci pour votre abonnement !</p>
      {username && <p>Bienvenue, {username} !</p>}
      <a href="/articles">Accéder aux articles premium</a>
    </div>
  );
}