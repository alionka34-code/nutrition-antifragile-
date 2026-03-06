import React, { useState, useEffect, useRef, useContext } from 'react';
import { Helmet } from "react-helmet";
import { createCheckoutSession } from '../utils/api';
import { AuthContext } from "../contexts/AuthContextDefinition";
import ConnexionForm from '../components/connexion/ConnexionForm';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/swiper-custom.css";
import avis1 from  '../assets/images/avis1.jpg'
import avis2 from  '../assets/images/avis2.jpg'
import avis3 from  '../assets/images/avis3.jpg'
import avis4 from  '../assets/images/avis4.jpg'
import avis5 from  '../assets/images/avis5.jpg'
import avis6 from  '../assets/images/avis6.jpg'
import avis7 from  '../assets/images/avis7.jpg'
import avis8 from  '../assets/images/avis8.jpg'
import avis9 from  '../assets/images/avis9.jpg'
import avis10 from  '../assets/images/avis10.jpg'
import avis11 from  '../assets/images/avis11.jpg'
import avis12 from  '../assets/images/avis12.jpg'
import avis13 from  '../assets/images/avis13.jpg'
import avis14 from  '../assets/images/avis14.jpg'
import avis15 from  '../assets/images/avis15.jpg'
import miniature from '../assets/images/miniature.png';


  

function Abonnement() {
    const { username } = useContext(AuthContext);
    const [selectedPlan, setSelectedPlan] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showLoginForm, setShowLoginForm] = useState(false);

    const errorRef = useRef(null);
    const loginFormRef = useRef(null);

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
        <header >
            <h1 className="text-center mx-4 text-2xl md:text-5xl font-SFBold text-marron pt-10 ">Rejoignez la Communauté Antifragile !</h1>
            <p className="text-center text-lg md:text-xl text-gray-600 mt-2  dark:text-white">Accédez à tout le contenu premium</p>
        </header>
            <form className="pt-8" onSubmit={handleSubmit}>
            <div className='bg-white  dark:bg-neutral-800 flex flex-col border-2 rounded-lg shadow-lg shadow-black/50 p-10 mx-2 md:mx-auto md:max-w-4xl border-marron'>
            <iframe className="w-full h-64 md:h-112 rounded-xl" src="https://www.youtube.com/embed/Gu-g8FRG4Zs" title="Vidéo de présentation de l'abonnement" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            <div className='flex flex-row md:gap-4 gap-1 mt-6 overflow-x-auto snap-x snap-mandatory md:overflow-visible'>
                <img src={miniature} alt="Miniature de la vidéo" className="min-w-[70%] md:min-w-0 md:w-60 h-25 md:h-40 rounded-xl object-cover snap-start" />
                <img src={miniature} alt="Miniature de la vidéo" className="min-w-[70%] md:min-w-0 md:w-60 h-25 md:h-40 rounded-xl object-cover snap-start" />
                <img src={miniature} alt="Miniature de la vidéo" className="min-w-[70%] md:min-w-0 md:w-60 h-25 md:h-40 rounded-xl object-cover snap-start" />
            </div>
            <div>
                <h2 className='font-SFBold text-xl md:text-2xl mt-8 mb-4  dark:text-white'>Pour qui ?</h2>
                <p className='font-SF text-lg md:text-xl text-gray-600  dark:text-white'>Pour ceux qui en ont marre d'entendre tout et son contraire.<br/>Pour ceux qui veulent comprendre, pas juste appliquer bêtement.<br/>Pour ceux qui veulent (vraiment) prendre leur santé en main et devenir acteurs de leur vie.</p>
                <h2 className='font-SFBold text-xl md:text-2xl mt-8 mb-4  dark:text-white'>Ce que tu vas trouver dans la communauté</h2>
                <p className='font-SF text-lg md:text-xl text-gray-600  dark:text-white'>Trois dossiers. Tout ce qu’il faut, au même endroit.<br/>P

🗂 <strong>Déconstruire<strong>Tous les mythes démontés un par un. Tu comprends pourquoi avant de passer à l'action. Fini les règles qu'on applique sans savoir pourquoi.<br/>

🗂 <strong>Construire<strong>Quoi acheter, où, pourquoi, en quelle quantité. Les réponses concrètes à toutes les questions que tu te poses depuis des années. Résultat : tu sais exactement quoi mettre dans ton caddie, sans te poser mille questions.<br/>

🗂 <strong>S'élever<strong>L'assiette c'est la base, mais pas l’unique pilier. Mouvement, soleil, jeûne, mode de vie. Résultat : une santé intestinale solide, un mental stable, une énergie constante. Tout est interconnecté.<br/>

Et aussi : 📄 Fiches listes de courses et guides PDF 🍽 Des recettes 💬 Un groupe Telegram pour me tes questions, partage d’adresses et recettes.<br/>

Nouveau contenu chaque mois.</p>
        

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
                    className="mt-4 text-lg font-SFBold rounded-full text-white px-8 py-4 bg-gradient-to-tr from-peach to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300"
                >
                    {loading ? "Redirection en cours..." : "S'abonner 37\u20AC/mois"}
                </button>
            </div>
            <div className=" mx-4 md:max-w-3xl" >
            <Swiper
        rewind={true}
        slidesPerView={1}
        grid={{
          rows: 2,
        }}
        spaceBetween={40}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
         autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
            768: {
                slidesPerView: 3,
                spaceBetween: 20, // Tablette et grands écrans
            }
        }}
        modules={[Grid, Pagination, Autoplay]}
        className="mySwiper mt-10"
      >
        <SwiperSlide><img src={avis1} className="rounded-xl"/></SwiperSlide>
        <SwiperSlide><img src={avis2} className="rounded-xl" /></SwiperSlide>
        <SwiperSlide><img src={avis3} className="rounded-xl"/></SwiperSlide>
        <SwiperSlide><img src={avis4} className="rounded-xl"/></SwiperSlide>
        <SwiperSlide><img src={avis5} className="rounded-xl"/></SwiperSlide>
        <SwiperSlide><img src={avis6} className="rounded-xl"/></SwiperSlide>
        <SwiperSlide><img src={avis7} className="rounded-xl"/></SwiperSlide>
        <SwiperSlide><img src={avis8} className="rounded-xl"/></SwiperSlide>
        <SwiperSlide><img src={avis9} className="rounded-xl"/></SwiperSlide>
        <SwiperSlide><img src={avis10} className="rounded-xl"/></SwiperSlide>
        <SwiperSlide><img src={avis11} className="rounded-xl"/></SwiperSlide>
        <SwiperSlide><img src={avis12} className="rounded-xl"/></SwiperSlide>
        <SwiperSlide><img src={avis13} className="rounded-xl"/></SwiperSlide>
         <SwiperSlide><img src={avis14} className="rounded-xl"/></SwiperSlide>
          <SwiperSlide><img src={avis15} className="rounded-xl"/></SwiperSlide>
         <SwiperSlide><img src={avis1} className="rounded-xl"/></SwiperSlide>
        <SwiperSlide><img src={avis2} className="rounded-xl" /></SwiperSlide>
        <SwiperSlide><img src={avis3} className="rounded-xl"/></SwiperSlide>
        <SwiperSlide><img src={avis4} className="rounded-xl"/></SwiperSlide>
        <SwiperSlide><img src={avis5} className="rounded-xl"/></SwiperSlide>
        <SwiperSlide><img src={avis6} className="rounded-xl"/></SwiperSlide>
        <SwiperSlide><img src={avis7} className="rounded-xl"/></SwiperSlide>
        <SwiperSlide><img src={avis8} className="rounded-xl"/></SwiperSlide>
        <SwiperSlide><img src={avis9} className="rounded-xl"/></SwiperSlide>
        <SwiperSlide><img src={avis10} className="rounded-xl"/></SwiperSlide>
        <SwiperSlide><img src={avis11} className="rounded-xl"/></SwiperSlide>
        <SwiperSlide><img src={avis12} className="rounded-xl"/></SwiperSlide>
        <SwiperSlide><img src={avis13} className="rounded-xl"/></SwiperSlide>
         <SwiperSlide><img src={avis14} className="rounded-xl"/></SwiperSlide>
          <SwiperSlide><img src={avis15} className="rounded-xl"/></SwiperSlide>
        
      
      </Swiper>
      </div>       

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
