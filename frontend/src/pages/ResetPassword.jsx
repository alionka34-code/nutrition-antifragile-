import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import API_URL from '../utils/api';
import { Helmet } from "react-helmet";

function ResetPassword() {
  const { uidb64, token } = useParams();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${API_URL}/password-reset-confirm/${uidb64}/${token}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: data.password }),
      });
      const json = await res.json();

      if (res.ok) {
        setMessage(json.message);
        setSuccess(true);
      } else {
        setMessage(json.error || 'Une erreur est survenue.');
        setSuccess(false);
      }
    } catch (err) {
      console.error('Erreur:', err);
      setMessage('Erreur lors de la réinitialisation. Vérifiez votre connexion.');
      setSuccess(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Réinitialisation du mot de passe | Nutrition Antifragile</title>
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          <h1 className="font-SFBold text-3xl md:text-4xl text-marron text-center mb-2">
            Nouveau mot de passe
          </h1>

          <p className="font-SF text-gray-600 dark:text-white text-base text-center mb-8">
            Choisissez un nouveau mot de passe pour votre compte.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1 font-SFBold text-base dark:text-white">
              Nouveau mot de passe
              <input
                type="password"
                placeholder="Au moins 6 caractères"
                {...register('password', {
                  required: 'Mot de passe requis',
                  minLength: { value: 6, message: 'Au moins 6 caractères' }
                })}
                className="w-full p-3 border border-beige2 rounded-xl font-SF dark:bg-neutral-700 dark:border-neutral-600 dark:text-white focus:outline-none focus:border-marron transition-colors"
              />
              {errors.password && <p className="text-red-500 text-sm font-SF">{errors.password.message}</p>}
            </label>

            <label className="flex flex-col gap-1 font-SFBold text-base dark:text-white">
              Confirmer le mot de passe
              <input
                type="password"
                placeholder="Répétez votre mot de passe"
                {...register('confirmPassword', {
                  required: 'Confirmation requise',
                  validate: (value) => value === watch('password') || 'Les mots de passe ne correspondent pas'
                })}
                className="w-full p-3 border border-beige2 rounded-xl font-SF dark:bg-neutral-700 dark:border-neutral-600 dark:text-white focus:outline-none focus:border-marron transition-colors"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm font-SF">{errors.confirmPassword.message}</p>}
            </label>

            <button
              type="submit"
              className="font-SFBold text-white text-base px-8 py-3 rounded-full bg-gradient-to-tr from-peach to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 shadow-md mt-2"
            >
              Réinitialiser
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

        </div>
      </div>
    </>
  );
}

export default ResetPassword;
