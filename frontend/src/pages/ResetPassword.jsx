import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import API_URL from '../utils/api';
import { Helmet } from "react-helmet";

function ResetPassword() {
  const { uidb64, token } = useParams();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');

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
      } else {
        setMessage(json.error || 'Une erreur est survenue.');
      }
    } catch (err) {
      console.error('Erreur:', err);
      setMessage('Erreur lors de la réinitialisation. Vérifiez votre connexion.');
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


    <div className="border-2 border-marron rounded-4xl mx-4 md:mx-auto md:max-w-3xl p-6 my-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-marron">Réinitialiser le mot de passe</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            {...register('password', {
              required: 'Mot de passe requis',
              minLength: { value: 6, message: 'Au moins 6 caractères' }
            })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            {...register('confirmPassword', {
              required: 'Confirmation requise',
              validate: (value) => value === watch('password') || 'Les mots de passe ne correspondent pas'
            })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-marron text-white py-2 rounded hover:bg-green-700"
        >
          Réinitialiser
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
    </>
  );
}

export default ResetPassword;
