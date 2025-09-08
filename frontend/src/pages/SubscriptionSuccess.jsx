import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../contexts/AuthContextDefinition";
import { Link } from 'react-router-dom';
import API_URL from '../utils/api';
import { Helmet } from "react-helmet";

export default function SubscriptionSuccess() {
  const { username, fetchSubscriptionStatus } = useContext(AuthContext);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    const token = localStorage.getItem('access_token');

    if (!sessionId || !token) return;

    const verify = async () => {
      try {
        const res = await fetch(`${API_URL}/verify-checkout-session/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ session_id: sessionId })
        });
        if (!res.ok) throw new Error('Vérification impossible');
        setVerified(true);
        fetchSubscriptionStatus && fetchSubscriptionStatus();
      } catch (e) {
        setError(e.message);
      }
    };

    verify();
  }, [fetchSubscriptionStatus]);

  return (
    <>
    <Helmet>
  <title>Abonnement effectué | Nutrition Antifragile</title>
  <meta 
    name="description" 
    content="Félicitations ! Votre abonnement à Nutrition Antifragile a été effectué avec succès. Accédez dès maintenant à tous nos contenus et ressources exclusives." 
  />
</Helmet>

    <header></header>
    <div className="border-2 border-marron rounded-2xl mx-4 md:mx-auto md:max-w-5xl p-6 text-center my-10">
      <h1 className = "font-SFBold text-marron text-4xl md:text-6xl">PAIEMENT REUSSI ! 🎉</h1>
      <p className = "font-SF text-xl md:text-2xl mt-2 dark:text-white">Merci pour votre abonnement !</p>
      {username && <p>Bienvenue, {username} !</p>}
      {verified && <p className='font-SF mt-2'>Votre accès premium est activé.</p>}
      {error && <p className='font-SF mt-2 text-red-600'>Vérification en attente. Votre accès sera activé sous peu.</p>}
      <Link to="/articles" className='font-SF text-xl md:text-2xl mt-2 dark:text-white'>Tu peux explorer l’ensemble de nos articles : enquêtes, réflexions et analyses exclusives.</Link>
    </div>
    </>
  );
}