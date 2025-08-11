import React, { useContext } from 'react';
import { AuthContext } from "../contexts/AuthContextDefinition";
import { Link } from 'react-router-dom';

export default function SubscriptionSuccess() {
  const { username } = useContext(AuthContext);

  return (
    <>
    <header className='pt-10 bg-linear-to-t from-white to-gray-200'></header>
    <div className="border-2 border-marron rounded-2xl mx-4 md:mx-auto md:max-w-5xl p-6 text-center my-10">
      <h1 className = "font-SFBold text-marron text-4xl md:text-6xl">PAIEMENT REUSSI ! 🎉</h1>
      <p className = "font-SF text-xl md:text-2xl mt-2">Merci pour votre abonnement !</p>
      {username && <p>Bienvenue, {username} !</p>}
      <Link to="/articles" className='font-SF text-xl md:text-2xl mt-2'>Tu peux explorer l’ensemble de nos articles : enquêtes, réflexions et analyses exclusives.</Link>
    </div>
    </>
  );
}