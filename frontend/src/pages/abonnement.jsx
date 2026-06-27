import React, { useState, useEffect, useRef, useContext } from 'react';
import { Helmet } from "react-helmet";
import { createCheckoutSession, fetchAbonnementSettings } from '../utils/api';
import { AuthContext } from "../contexts/AuthContextDefinition";
import ConnexionForm from '../components/connexion/ConnexionForm';
import TestimonialStack from '../components/landing/TestimonialStack';
import testimonials from '../data/testimonials';
import miniature from '../assets/images/miniature.png';
import miniature2 from '../assets/images/miniature2.png';
import miniature3 from '../assets/images/miniature3.png';



  

function Abonnement() {
    const { username } = useContext(AuthContext);
    const [selectedPlan, setSelectedPlan] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showLoginForm, setShowLoginForm] = useState(false);

    const [zoomedImg, setZoomedImg] = useState(null);
    const [bunnyVideoId, setBunnyVideoId] = useState('d0b4ce3c-9cda-4de6-9d93-85af56700cfe');
    const errorRef = useRef(null);
    const loginFormRef = useRef(null);

    useEffect(() => {
        fetchAbonnementSettings().then(data => {
            if (data.bunny_video_id) setBunnyVideoId(data.bunny_video_id);
        }).catch(() => {});
    }, []);

    // Quand errorMessage change et n'est pas vide, on scroll vers lui
    useEffect(() => {
        if (errorMessage && errorRef.current) {
            errorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [errorMessage]);

    

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");  // Reset erreur à chaque soumission

        if (!selectedPlan) {
            setErrorMessage("Veuillez choisir un plan.");
            return;
        }

        const token = sessionStorage.getItem("access_token");
        if (!token) {
            setErrorMessage("Vous devez être connecté pour vous abonner. Redirection vers la page de connexion...");
            setTimeout(() => {
                window.location.href = "/connexion";
            }, 5000);
            return;
        }

        try {
    setLoading(true);
    const data = await createCheckoutSession(selectedPlan, token);
    if (data.checkout_url) {
        window.location.href = data.checkout_url;
    } else {
        throw new Error("URL de checkout non reçue");
    }
} catch (err) {
    console.error("Erreur complète:", err);
    alert(`Erreur lors de la création de la session de paiement: ${err.message}`);
} finally {
    setLoading(false);
}

    };

    return (
        <>
        <Helmet>
            <title>Abonnement Nutrition Antifragile | Santé durable & alimentation pratique</title>
            <meta name="description" content="Rejoignez la communauté Nutrition Antifragile et accédez à des contenus exclusifs pour améliorer votre santé durable et maîtriser votre alimentation au quotidien." />
        </Helmet>
        <header className="pt-16 px-4">
            <div className="text-center max-w-2xl mx-auto">
                <p className="font-SFBold text-marron tracking-[0.25em] text-sm md:text-base mb-3">L'ABONNEMENT</p>
                <h1 className="font-SFBold text-3xl md:text-5xl text-gray-900 dark:text-white tracking-tight leading-[1.1]">
                    Rejoins la communauté <span className="text-marron">Antifragile</span>.
                </h1>
            </div>
        </header>
            <form className="pt-12" onSubmit={handleSubmit}>
            <div className='flex flex-col rounded-3xl border border-white/40 dark:border-white/15 bg-white/20 dark:bg-white/10 backdrop-blur-xl ring-1 ring-black/5 shadow-lg p-8 md:p-10 mx-2 md:mx-auto md:max-w-4xl'>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                    src={`https://iframe.mediadelivery.net/embed/515846/${bunnyVideoId}`}
                    className="absolute inset-0 w-full h-full" allow="accelerometer; gyroscope; encrypted-media; picture-in-picture"
                    allowFullScreen
                />
            </div>
            <div className='flex flex-row md:gap-4 gap-1 mt-6 overflow-x-auto snap-x snap-mandatory md:overflow-visible'>
                <img src={miniature} alt="Miniature de la vidéo" className="min-w-[70%] md:min-w-0 md:w-60 h-25 md:h-40 rounded-xl object-cover snap-start cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setZoomedImg(miniature)} />
                <img src={miniature2} alt="Miniature de la vidéo" className="min-w-[70%] md:min-w-0 md:w-60 h-25 md:h-40 rounded-xl object-cover snap-start cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setZoomedImg(miniature2)} />
                <img src={miniature3} alt="Miniature de la vidéo" className="min-w-[70%] md:min-w-0 md:w-60 h-25 md:h-40 rounded-xl object-cover snap-start cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setZoomedImg(miniature3)} />
            </div>
            {zoomedImg && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setZoomedImg(null)}>
                    <img src={zoomedImg} alt="Zoom" className="max-w-full max-h-full rounded-xl shadow-2xl" />
                </div>
            )}
            <div>
          <h2 className='font-SFBold text-xl md:text-2xl mt-8 mb-4 text-gray-900 dark:text-white tracking-tight'>
  Aujourd’hui, l’alimentation est devenue une source de confusion permanente.
</h2>

<p className='font-SF text-lg md:text-xl text-gray-600 dark:text-gray-300'>
  Le gluten serait inflammatoire. Le sucre toxique. Le gras dangereux. Les légumes indispensables.<br/>
  Une vérité différente à chaque scroll.<br/><br/>

  Résultat : tu ne sais plus quoi manger sans culpabiliser ni te prendre la tête.<br/><br/>

  Le problème, ce n’est pas ton manque de volonté.<br/>
  Le problème, c’est qu’on t’a appris à voir la santé à travers des dogmes, du marketing et des solutions simplistes.<br/><br/>

  C’est exactement pour ça que j’ai créé la Communauté Antifragile : un espace pour enfin comprendre comment fonctionne réellement le corps humain et arrêter de te faire balader par les tendances nutritionnelles du moment.
</p>

<h2 className='font-SFBold text-xl md:text-2xl mt-8 mb-4 dark:text-white'>
  Ce que tu vas trouver dans la communauté
</h2>

<p className='font-SF text-lg md:text-xl text-gray-600 dark:text-gray-300'>
  - Des vidéos exclusives et analyses approfondies.<br/>
  - Des croyances nutritionnelles déconstruites avec logique, nuance et physiologie.<br/>
  - Des études de cas réels pour comprendre les causes profondes des symptômes.<br/>
  - Des ressources concrètes pour retrouver une alimentation plus simple, cohérente et adaptée au vivant.<br/>
  - Un groupe Telegram où tu peux poser tes questions directement.<br/><br/>


  Le but n’est pas de te rendre dépendant d’un protocole.<br/>
  Le but, c’est que tu comprennes enfin ton corps pour retrouver une vraie autonomie alimentaire.
</p>
        

            </div>
            {errorMessage && (
                <div ref={errorRef} className="mt-6 text-center text-red-700 bg-red-100 border border-red-400 rounded-2xl py-2 px-4 font-SF">
                    {errorMessage}
                </div>
            )}
            <div className="text-center mt-8">
                <button
                    type="button"
                    disabled={loading}
                    onClick={async () => {
                        if (!username) {
                            setShowLoginForm(true);
                            setErrorMessage("");
                            setTimeout(() => {
                                loginFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                            }, 100);
                            return;
                        }
                        const token = sessionStorage.getItem("access_token");
                        try {
                            setLoading(true);
                            const data = await createCheckoutSession("community", token);
                            if (data.checkout_url) {
                                window.location.href = data.checkout_url;
                            } else {
                                throw new Error("URL de checkout non reçue");
                            }
                        } catch (err) {
                            console.error("Erreur complète:", err);
                            alert(`Erreur lors de la création de la session de paiement: ${err.message}`);
                        } finally {
                            setLoading(false);
                        }
                    }}
                    className="mt-4 text-base md:text-lg font-SFBold rounded-full text-white dark:text-[#6e4f24] px-8 py-3.5 bg-[#6e4f24] dark:bg-beige1 hover:bg-[#5a4020] dark:hover:bg-white transition-colors duration-300 shadow-md"
                >
                    {loading ? "Redirection en cours..." : "S'abonner 37\u20AC/mois"}
                </button>
                <p className='mt-2 font-SF text-sm text-gray-600 '>Résiliable à tout moment</p>
            </div>

        </div>

        <div className="mx-4 md:mx-auto md:max-w-6xl mt-24 mb-10">
          <p className="text-center font-SFBold text-marron tracking-[0.25em] text-sm md:text-base mb-3">LES AVIS</p>
          <h3 className="text-center font-SFBold text-3xl md:text-4xl text-gray-900 dark:text-white tracking-tight mb-3">Ils en parlent mieux que nous</h3>
          <p className="text-center font-SF text-gray-500 dark:text-gray-400 mb-10">Glisse les cartes pour parcourir leurs messages</p>
          <TestimonialStack testimonials={testimonials} maxWidth="52rem" />
        </div>

        </form>
        {showLoginForm && !username && (
            <>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowLoginForm(false)} />
            <div ref={loginFormRef} className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto">
                    <button
                        onClick={() => setShowLoginForm(false)}
                        className="absolute top-4 right-4 z-60 bg-white dark:bg-neutral-700 rounded-full w-8 h-8 flex items-center justify-center shadow-lg text-gray-600 dark:text-white hover:text-black"
                    >
                        &times;
                    </button>
                    <ConnexionForm onLoginSuccess={() => setShowLoginForm(false)} />
                </div>
            </div>
            </>
        )}
        </>
    );

}

export default Abonnement;
