import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import API_URL from "../utils/api";
import { Helmet } from "react-helmet";

function PasswordLost() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${API_URL}/password-lost/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      });

      const json = await response.json();

      if (response.ok) {
        setMessage(json.message);
        setSuccess(true);
        if (json.username) setUsername(json.username);
      } else {
        setMessage(json.error || 'Une erreur est survenue.');
        setSuccess(false);
      }
    } catch (err) {
      console.error('Erreur de réseau:', err);
      setMessage('Erreur de connexion. Vérifiez votre connexion internet et réessayez.');
      setSuccess(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Mot de passe oublié | Nutrition Antifragile</title>
        <meta
          name="description"
          content="Réinitialisez votre mot de passe pour accéder à votre compte Nutrition Antifragile et continuer à profiter de nos contenus et ressources exclusives."
        />
      </Helmet>

      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="bg-white dark:bg-neutral-800 border-2 border-marron rounded-2xl shadow-lg shadow-black/30 p-10 md:p-14 mx-auto max-w-xl w-full">

          {/* Icône */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-peach to-yellow-700 flex items-center justify-center shadow-md">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
          </div>

          <h1 className="font-SFBold text-3xl md:text-4xl text-marron text-center mb-2">
            Mot de passe oublié
          </h1>

          <p className="font-SF text-gray-600 dark:text-white text-base text-center mb-8">
            Renseignez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <label className="flex flex-col gap-1 font-SFBold text-base dark:text-white">
              Adresse email
              <input
                type="email"
                placeholder="votre@email.com"
                {...register('email', { required: 'Ce champ est requis' })}
                className="w-full p-3 border border-beige2 rounded-xl font-SF dark:bg-neutral-700 dark:border-neutral-600 dark:text-white focus:outline-none focus:border-marron transition-colors"
              />
              {errors.email && <p className="text-red-500 text-sm font-SF">{errors.email.message}</p>}
            </label>

            <button
              type="submit"
              className="font-SFBold text-white text-base px-8 py-3 rounded-full bg-gradient-to-tr from-peach to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 shadow-md mt-2"
            >
              Envoyer le lien
            </button>
          </form>

          {message && (
            <div className={`mt-6 inline-flex items-center gap-2 border rounded-full px-4 py-2 w-full justify-center ${
              success
                ? 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-600'
                : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-600'
            }`}>
              <span className={`w-2 h-2 rounded-full inline-block ${success ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`font-SF text-sm ${success ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                {message}
              </span>
            </div>
          )}

          {username && (
            <p className="mt-3 text-center font-SF text-sm text-gray-600 dark:text-white">
              Nom d'utilisateur : <span className="font-SFBold">{username}</span>
            </p>
          )}

        </div>
      </div>
    </>
  );
}

export default PasswordLost;
