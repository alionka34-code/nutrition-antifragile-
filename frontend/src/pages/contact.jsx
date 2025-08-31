import React from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import tiktok from '../assets/images/tiktok.png';
import instagram from '../assets/images/instagram.png';


function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm();

  const onSubmit = (data) => {
    emailjs.send(
      'service_3481wnr', // ID EmailJS
      'template_ndgo59d', // Template ID
      data,
      '83hSlOwetgdnqPlXK' // Public Key EmailJS
    ).then(() => {
      reset(); // Réinitialise le formulaire
    }).catch((error) => {
      console.error('Erreur envoi:', error);
    });
  };

  return (
    <>
    <header>
        <div className="flex flex-col mx-auto max-w-4xl"><h1 className="md:text-6xl text-4xl text-center text-marron font-SFBold">CONTACTEZ-NOUS</h1>
        <p className="md:text-xl text-center font-SF text-gray-600 m-2 dark:text-white">Que vous ayez des questions sur le livre, que vous souhaitiez partager votre expérience ou que vous cherchiez des conseils personnalisés, n'hésitez pas à nous écrire.</p></div>
       
    </header>
    <main>
      <div className='flex flex-col md:flex-row justify-center items-center border-3 border-marron rounded-4xl mx-4 md:mx-auto md:max-w-6xl md:px-20 md:py-10 text-center my-10 gap-10  shadow-xl'>
        <form onSubmit={handleSubmit(onSubmit)} className="mx-4 p-6 font-SFBold  space-y-10  ">
      <h2 className="text-4xl font-SFBold text-center text-marron">Envoyez nous un message</h2>


      <label className='font-SFBold text-lg dark:text-white'>Votre nom 
        <input
        type="text"
        placeholder="Entrez votre nom"
        {...register('name', { required: true })}
        className="w-full p-3 mb-6 border rounded-2xl font-SF"
      /> {errors.name && <p className="text-red-500">Ce champ est requis</p>}
     </label>

     <label className='font-SFBold text-lg dark:text-white'>Votre email
      <input
        type="email"
        placeholder="votre@email.com"
        {...register('email', { required: true })}
        className="w-full p-3 mb-6 border rounded-2xl font-SF"
      />
      {errors.email && <p className="text-red-500">Ce champ est requis</p>}
     </label>

     <label className='font-SFBold text-lg dark:text-white'>Sujet  
      <input 
        type="text"
        placeholder="Objet du message"
        {...register('objet', { required: true})}
        className="w-full p-3 mb-6 border rounded-2xl font-SF"/>
        {errors.objet && <p className="text-red-500">Ce champ est requis</p>}
     </label>   

     <label className='font-SFBold text-lg dark:text-white'>Votre message
      <textarea
        placeholder="De quoi souhaitez-vous parler ?"
        {...register('message', { required: true })}
        className="w-full p-3 border mb-6 rounded-2xl font-SF h-32"
      ></textarea>
      {errors.message && <p className="text-red-500">Ce champ est requis</p>}
      </label>

      <button type="submit" className="bg-marron text-white text-xl px-6 py-2 rounded-xl hover:bg-yellow-600 transition block mx-auto font-SFBold">
        ENVOYER
      </button>

      {isSubmitSuccessful && (
        <p className="text-green-600 text-center">Message envoyé avec succès !</p>
      )}
      <h1 className="text-center font-SFBold text-lg dark:text-white">Rejoignez la communauté antifragile sur mes reséaux sociaux qui comptent déjà plus de 60 000 abonnés :</h1>
        <div className="flex justify-center">
            <a href="https://www.tiktok.com/@nut_antifragile" target="_blank" rel="noopener noreferrer" className="mx-2">
            <img src={tiktok} alt="TikTok" className="w-10 h-10" />
            </a>
            <a href="https://www.instagram.com/nutrition_antifragile/" target="_blank" rel="noopener noreferrer" className="mx-2">
            <img src={instagram} alt="Instagram" className="w-10 h-10" />
            </a>
        </div>    
        
    </form>
  <div className='border-0 md:border-3 md:border-marron rounded-4xl p-6 max-w-sm h-fit mx-10 md:mx-auto md:shadow-xl mb-10'>
      <script async

src="https://js.stripe.com/v3/buy-button.js">

</script>

<stripe-buy-button

buy-button-id="buy_btn_1S1n1ABthRAmBImUOeE0dzv0"

publishable-key="pk_live_51RqKy7BthRAmBImU2KV37i8gu6iRV9wk44IqENdZcsC28HIwGrRm0L4K4QvrD76a2AyHC19bs76hcEY5tij2Iosf00M86EKP4s"

>

</stripe-buy-button>
    </div>
      </div>
      
   
    </main>
    </>
  );
}

export default ContactForm;
