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

     <header></header>
    <div className="border-2 border-marron rounded-2xl mx-4 md:mx-auto md:max-w-5xl p-6 text-center my-10">
      <h1 className = "font-SFBold text-marron text-4xl md:text-6xl">Paiement annulé ❌</h1>
      <p className = "font-SF text-xl md:text-2xl mt-2 dark:text-white">Votre paiement n’a pas été finalisé. Vous pouvez réessayer.</p>
      <Link to="/abonnement" className = "font-SF text-xl md:text-2xl mt-2 dark:text-white">Réessayer</Link>
    </div>
    </>
  );
}
