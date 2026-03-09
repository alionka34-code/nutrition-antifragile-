import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

export default function SubscriptionCancel() {
  return (
    <>
      <Helmet>
        <title>Abonnement échoué | Nutrition Antifragile</title>
        <meta
          name="description"
          content="Votre tentative d'abonnement à Nutrition Antifragile n'a pas abouti. Veuillez réessayer ou contacter notre support pour assistance."
        />
      </Helmet>

      <header />

      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="bg-white dark:bg-neutral-800 border-2 border-marron rounded-2xl shadow-lg shadow-black/30 p-10 md:p-14 mx-auto max-w-2xl w-full text-center">

          {/* Icône annulation */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-neutral-400 to-neutral-600 flex items-center justify-center shadow-md">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>

          {/* Titre */}
          <h1 className="font-SFBold text-marron text-4xl md:text-5xl mb-2">
            Paiement annulé
          </h1>

          <p className="font-SF text-lg md:text-xl text-gray-600 dark:text-white mt-4">
            Votre paiement n'a pas été finalisé. Aucun montant n'a été débité.
          </p>

          {/* Séparateur */}
          <div className="border-t border-beige2 dark:border-neutral-600 my-8" />

          <p className="font-SF text-gray-600 dark:text-white text-base md:text-lg mb-8">
            Vous pouvez réessayer à tout moment ou nous contacter si vous rencontrez un problème.
          </p>

          {/* CTA principal */}
          <Link
            to="/abonnement"
            className="inline-block font-SFBold text-white text-lg px-8 py-4 rounded-full bg-gradient-to-tr from-peach to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 shadow-md"
          >
            Réessayer
          </Link>

          {/* Lien secondaire */}
          <div className="mt-6">
            <Link
              to="/contact"
              className="font-SF text-sm text-gray-500 dark:text-gray-400 underline hover:text-marron transition-colors"
            >
              Contacter le support
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
