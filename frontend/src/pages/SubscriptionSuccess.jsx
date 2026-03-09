import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../contexts/AuthContextDefinition";
import { Link } from 'react-router-dom';
import API_URL from '../utils/api';
import { Helmet } from "react-helmet";

export default function SubscriptionSuccess() {
  const { username, fetchSubscriptionStatus } = useContext(AuthContext);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    const token = sessionStorage.getItem('access_token');

    if (!sessionId || !token) {
      setLoading(false);
      return;
    }

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
      } finally {
        setLoading(false);
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

      <header />

      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="bg-white dark:bg-neutral-800 border-2 border-marron rounded-2xl shadow-lg shadow-black/30 p-10 md:p-14 mx-auto max-w-2xl w-full text-center">

          {/* Icône succès */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-peach to-yellow-700 flex items-center justify-center shadow-md">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Titre */}
          <h1 className="font-SFBold text-marron text-4xl md:text-5xl mb-2">
            Paiement réussi !
          </h1>

          {/* Bienvenue */}
          {username && (
            <p className="font-SFBold text-xl md:text-2xl text-marron mt-1">
              Bienvenue, {username} !
            </p>
          )}

          <p className="font-SF text-lg md:text-xl text-gray-600 dark:text-white mt-4">
            Merci pour votre abonnement à la communauté Antifragile.
          </p>

          {/* Statut vérification */}
          <div className="mt-5">
            {loading && (
              <p className="font-SF text-gray-500 dark:text-gray-300 text-base animate-pulse">
                Activation de votre accès en cours...
              </p>
            )}
            {!loading && verified && (
              <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/30 border border-green-300 dark:border-green-600 rounded-full px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                <span className="font-SF text-green-700 dark:text-green-400 text-sm">Accès premium activé</span>
              </div>
            )}
            {!loading && error && (
              <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-600 rounded-full px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" />
                <span className="font-SF text-yellow-700 dark:text-yellow-400 text-sm">Activation en cours — votre accès sera disponible sous peu.</span>
              </div>
            )}
          </div>

          {/* Séparateur */}
          <div className="border-t border-beige2 dark:border-neutral-600 my-8" />

          {/* Description */}
          <p className="font-SF text-gray-600 dark:text-white text-base md:text-lg mb-8">
            Tu peux dès maintenant explorer l'ensemble des contenus exclusif.
          </p>

          {/* CTA */}
          <Link
            to="/community"
            className="inline-block font-SFBold text-white text-lg px-8 py-4 rounded-full bg-gradient-to-tr from-peach to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 shadow-md"
          >
            Explorer la Communauté
          </Link>
        </div>
      </div>
    </>
  );
}
