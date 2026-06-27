import React from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import tiktok from '../assets/images/tiktok.png';
import instagram from '../assets/images/instagram.png';
import { Helmet } from 'react-helmet';


function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm();

  const onSubmit = (data) => {
    emailjs.send(
      'service_3481wnr',
      'template_ndgo59d',
      data,
      '83hSlOwetgdnqPlXK'
    ).then(() => {
      reset();
    }).catch((error) => {
      console.error('Erreur envoi:', error);
    });
  };

  return (
    <>
      <Helmet>
        <title>Contactez-nous | Nutrition Antifragile - Nutrition et Bien-être</title>
        <meta name="description" content="Contactez l'équipe de Nutrition Antifragile pour toute question ou suggestion sur la nutrition et le bien-être. Nous sommes là pour vous accompagner et échanger avec vous." />
      </Helmet>

      <header className="pt-16 px-4">
        <div className="text-center max-w-2xl mx-auto">
          <p className="font-SFBold text-marron tracking-[0.25em] text-sm md:text-base mb-3">CONTACT</p>
          <h1 className="font-SFBold text-4xl md:text-6xl text-gray-900 dark:text-white tracking-tight leading-[1.1]">
            Une question ? <span className="text-marron">Écrivons-nous.</span>
          </h1>
          <p className="mt-5 font-SF text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Que vous ayez des questions, souhaitiez partager votre expérience ou cherchiez des conseils, n'hésitez pas à nous écrire.
          </p>
        </div>
      </header>

      <main className="px-4 py-14">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/40 dark:border-white/15 bg-white/20 dark:bg-white/10 backdrop-blur-xl ring-1 ring-black/5 shadow-lg p-8 md:p-12 flex flex-col md:flex-row gap-12">

          {/* Formulaire */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col gap-6">
            <h2 className="text-2xl md:text-3xl font-SFBold text-gray-900 dark:text-white tracking-tight">Envoyez-nous un message</h2>

            <label className="flex flex-col gap-1.5 font-SFBold text-sm text-gray-700 dark:text-gray-200">
              Votre nom
              <input
                type="text"
                placeholder="Entrez votre nom"
                {...register('name', { required: true })}
                className="w-full p-3 rounded-xl font-SF bg-white/60 dark:bg-neutral-800/60 border border-beige2 dark:border-neutral-700 dark:text-white focus:outline-none focus:border-marron focus:ring-2 focus:ring-marron/20 transition-colors"
              />
              {errors.name && <p className="text-red-500 text-sm font-SF">Ce champ est requis</p>}
            </label>

            <label className="flex flex-col gap-1.5 font-SFBold text-sm text-gray-700 dark:text-gray-200">
              Votre email
              <input
                type="email"
                placeholder="votre@email.com"
                {...register('email', { required: true })}
                className="w-full p-3 rounded-xl font-SF bg-white/60 dark:bg-neutral-800/60 border border-beige2 dark:border-neutral-700 dark:text-white focus:outline-none focus:border-marron focus:ring-2 focus:ring-marron/20 transition-colors"
              />
              {errors.email && <p className="text-red-500 text-sm font-SF">Ce champ est requis</p>}
            </label>

            <label className="flex flex-col gap-1.5 font-SFBold text-sm text-gray-700 dark:text-gray-200">
              Sujet
              <input
                type="text"
                placeholder="Objet du message"
                {...register('objet', { required: true })}
                className="w-full p-3 rounded-xl font-SF bg-white/60 dark:bg-neutral-800/60 border border-beige2 dark:border-neutral-700 dark:text-white focus:outline-none focus:border-marron focus:ring-2 focus:ring-marron/20 transition-colors"
              />
              {errors.objet && <p className="text-red-500 text-sm font-SF">Ce champ est requis</p>}
            </label>

            <label className="flex flex-col gap-1.5 font-SFBold text-sm text-gray-700 dark:text-gray-200">
              Votre message
              <textarea
                placeholder="De quoi souhaitez-vous parler ?"
                {...register('message', { required: true })}
                className="w-full p-3 rounded-xl font-SF h-36 resize-none bg-white/60 dark:bg-neutral-800/60 border border-beige2 dark:border-neutral-700 dark:text-white focus:outline-none focus:border-marron focus:ring-2 focus:ring-marron/20 transition-colors"
              />
              {errors.message && <p className="text-red-500 text-sm font-SF">Ce champ est requis</p>}
            </label>

            <button
              type="submit"
              className="self-start font-SFBold text-white dark:text-[#6e4f24] text-base px-8 py-3.5 rounded-full bg-[#6e4f24] dark:bg-beige1 hover:bg-[#5a4020] dark:hover:bg-white transition-colors duration-300 shadow-md"
            >
              Envoyer
            </button>

            {isSubmitSuccessful && (
              <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/30 border border-green-300 dark:border-green-600 rounded-full px-4 py-2 self-start">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                <span className="font-SF text-green-700 dark:text-green-400 text-sm">Message envoyé avec succès !</span>
              </div>
            )}

            {/* Réseaux sociaux */}
            <div className="border-t border-beige2 dark:border-neutral-700 pt-6 mt-2">
              <p className="font-SFBold text-sm text-gray-700 dark:text-gray-200 mb-4">
                Rejoignez la communauté antifragile sur les réseaux sociaux — plus de 60 000 abonnés :
              </p>
              <div className="flex gap-4">
                <a href="https://www.tiktok.com/@nut_antifragile" target="_blank" rel="noopener noreferrer">
                  <img src={tiktok} alt="TikTok" className="w-10 h-10 hover:opacity-75 transition-opacity" />
                </a>
                <a href="https://www.instagram.com/nutrition_antifragile/" target="_blank" rel="noopener noreferrer">
                  <img src={instagram} alt="Instagram" className="w-10 h-10 hover:opacity-75 transition-opacity" />
                </a>
              </div>
            </div>
          </form>

          {/* Séparateur vertical */}
          <div className="hidden md:block w-px bg-beige2 dark:bg-neutral-700" />

          {/* Bouton Stripe */}
          <div className="flex flex-col items-center justify-center md:w-72">
            <h2 className="text-xl md:text-2xl font-SFBold text-gray-900 dark:text-white mb-2 text-center tracking-tight">Rejoindre la communauté</h2>
            <p className="font-SF text-sm text-gray-600 dark:text-gray-300 text-center mb-6">Accède à tous les contenus exclusifs.</p>
            <script async src="https://js.stripe.com/v3/buy-button.js" />
            <stripe-buy-button
              buy-button-id="buy_btn_1S1n1ABthRAmBImUOeE0dzv0"
              publishable-key="pk_live_51RqKy7BthRAmBImU2KV37i8gu6iRV9wk44IqENdZcsC28HIwGrRm0L4K4QvrD76a2AyHC19bs76hcEY5tij2Iosf00M86EKP4s"
            />
          </div>

        </div>
      </main>
    </>
  );
}

export default ContactForm;
