import react from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';

function SectionForm() {
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
        <section id="contact-form" className="mt-40 bg-degrade-marron py-10">
            <h2 className='text-center font-SFBold text-4xl text-white'>Prêt à faire de la nutrition votre levier de performance ?</h2>
            <p className='text-center font-SF text-2xl mt-4 text-white'>Échangeons sur vos enjeux et trouvons le format idéal pour vos équipes.e</p>
            <div className="mt-10 max-w-4xl mx-auto">
                <form className=" bg-white dark:bg-neutral-900 p-10 font-SF rounded-3xl shadow-lg mx-4" onSubmit={handleSubmit(onSubmit)}>
                    <label>Votre prenom</label>
                    <input type="text" className="block mt-2 mb-6 p-3 rounded-2xl w-full border border-gray-300" placeholder="John" {...register('name', {required: true })}/> {errors.name && <p className="text-red-500">Ce champ est requis</p>}
                    <label>Votre email</label>
                    <input type="email" className="block mt-2 mb-6 p-3 rounded-2xl w-full border border-gray-300" placeholder="John@mail.com" {...register('email', {required: true, pattern: /^\S+@\S+$/i})}/> {errors.email && <p className="text-red-500">Email valide requis</p>}
                    <label>Telephone</label>
                    <input type="tel" className="block mt-2 mb-6 p-3 rounded-2xl w-full border border-gray-300" placeholder="0754345678" {...register('phone', {required: true})}/> {errors.phone && <p className="text-red-500">Ce champ est requis</p>}
                    <label>Votre entreprise</label>
                    <input type="text" className="block mt-2 mb-6 p-3 rounded-2xl w-full border border-gray-300" placeholder="Google" {...register('company', {required: true})}/> {errors.company && <p className="text-red-500">Ce champ est requis</p>}
                    <label>Nombre de collaborateurs</label>
                    <input type="number" className="block mt-2 mb-6 p-3 rounded-2xl w-full border border-gray-300" placeholder="30" {...register('employees', {required: true, min: 1})}/> {errors.employees && <p className="text-red-500">Nombre valide requis</p>}
                    <label>Racontez moi en 2 mots votre situation</label>
                    <textarea className="block mt-2 mb-6 p-3 rounded-2xl w-full h-40 border border-gray-300" placeholder="Ecrire message..." {...register('message', {required: true, minLength: 10})}></textarea> {errors.message && <p className="text-red-500">Message de 10 caractères minimum requis</p>}
                    <button type="submit" className=" text-white font-SFBold px-20 py-3 rounded-full bg-gradient-to-tr from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 block mx-auto">Envoyer</button>
                      {isSubmitSuccessful && (
                        <p className="text-green-600 text-center">Message envoyé avec succès !</p>)}
                </form>
            </div>
        </section>

    );
}
export default SectionForm;
