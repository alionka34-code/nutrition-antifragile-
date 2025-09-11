import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import API_URL from "../utils/api";
import { Helmet } from "react-helmet";

function PasswordLost() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      console.log('Using API URL:', API_URL); // Debug temporaire
      const response = await fetch(`${API_URL}/password-lost/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      });
      
      const json = await response.json();
      
      if (response.ok) {
        setMessage(json.message);
      } else {
        setMessage(json.error || 'Une erreur est survenue.');
      }
    } catch (err) {
      console.error('Erreur de réseau:', err);
      setMessage('Erreur de connexion. Vérifiez votre connexion internet et réessayez.');
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

    <div className="border-2 border-marron rounded-4xl mx-4 md:mx-auto md:max-w-5xl p-6 my-10">
      
    <h1 className='font-SFBold text-4xl text-marron text-center pt-8'>MOT DE PASSE OUBLIÉ</h1>
    <p className='font-SF text-2xl text-center pt-4 max-w-5xl mx-auto dark:text-white'>Après avoir envoyé ce formulaire vous recevrez un email avec un lien vers une page vous permettant de réinitialiser votre mot de passe.</p>
      <form className="mt-8 text-center" onSubmit={handleSubmit(onSubmit)}>
        <p className="font-SF text-xl dark:text-white">Veuillez inserer votre adresse email</p>
        <input
          type="email"
          placeholder="Votre email" 
          {...register('email', { required: 'Ce champ est requis' })}
          className='border border-marron p-2 rounded-4xl mb-4 w-full max-w-2xl mx-auto'/>
           {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          <br/>
        <button type="submit" className='font-SFBold rounded-full text-white w-40 py-3 bg-gradient-to-tr from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 md:px-6'>Envoyer</button>
      </form>
       {message && <p className="mt-4 text-center">{message}</p>}

      
    </div>
  
    
    </>

  );
}

 export default PasswordLost;
