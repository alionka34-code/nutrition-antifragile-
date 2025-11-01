import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticles } from '../utils/api';
import livre from '../assets/images/livre.png';
import alionka from '../assets/images/alionka.jpg';
import{ Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';
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







function Home() {
    const [visible, setVisible] = useState(false);
    
    useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);
    const navigate = useNavigate();
    const handleLoginClick = () => {  
        navigate('/connexion');
    };
    const handleSubscribeClick = () => { 
        navigate('/abonnement');
    };
    const handleBookClick = () => {
        navigate('/livre');
    };

        const [articles, setArticles] = useState([]);
        const [error, setError] = useState(null);
    
       useEffect(() => {
            fetchArticles()
                .then(data => {
                    setArticles(data);
                })
                .catch(err => setError(err.message));
        }, []);
        if (error) return <p>{error}</p>
    return (
        <>
        <Helmet>
            <title>Nutrition Antifragile | Santé durable & bien-être</title>
            <meta name="description" content="Découvrez Nutrition Antifragile : des conseils et ressources pour une santé durable et un corps antifragile." />
            <link rel="canonical" href="https://alionka-houl.eo.symbiose-audiovisuelle.fr/" />
        </Helmet>
        <header className="px-4">
            <div className={`text-center transition-transform duration-1500 ease-out ${visible ? 'translate-y-0' : 'translate-y-50'}`}>
                <h1 className="font-SF text-gray-600 dark:text-white">ALIONKA HOUL - RÉDACTRICE SCIENTIFIQUE INDEPENDANTE SPECIALISÉE EN NUTRITION</h1>
                  
                
            
                <h2 className={`dark: text-marron text-center text-5xl font-SFBold transition-transform duration-1500 ease-out md:text-8xl ${visible ? 'translate-y-0' : 'translate-y-10'}`}>NUTRITION<br/>ANTIFRAGILE</h2>
                <p className="text-center text-gray-600 dark:text-white text-xl font-SF md:text-2xl mb-10">Reprendre le pouvoir sur votre assiette dans un monde qui vous empoisonne</p>
                <img src = {livre} alt="Livre Nutrition Antifragile" className=" w-80 md:w-100 h-auto  shadow-xl/50 mx-auto md:hidden " />
            <p className="text-xl font-SFBold  text-center mt-8 shadow-lg border-marron border-l-4 rounded-4xl p-10 mx-auto md:text-2xl max-w-4xl dark:text-white">Vos grands-parents n'avaient pas besoin de nutritionniste pour être en forme. Vous, vous passez 10 minutes a décrypter l'étiquette d'un yaourt.</p>
            <button onClick = {() => window.location.href = "https://amzn.eu/d/2ZR5MMo"} className="mt-8 block mx-auto text-lg font-SFBold rounded-full text-white px-8 py-4 bg-gradient-to-tr from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 md:text-3xl">DECOUVRIR LE LIVRE</button>
                <button onClick={() => window.location.href="/assets/Extrait.pdf"} className="mt-4 block mx-auto text-lg font-SFBold rounded-full text-white px-8 py-4 bg-gradient-to-tr from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 md:text-3xl">LIRE L’EXTRAIT</button>
</div>
                

        </header>
        <section className="mt-10 md:mt-20">
            <div className='flex flex-col md:flex-row md:gap-30 justify-center text-center'>
                <div>
                    <img src = {livre} alt="Livre Nutrition Antifragile" className=" w-80 md:w-100 h-auto  shadow-xl/50 mx-auto hidden md:block" />
                </div>
                <div className='md:max-w-2xl mx-4 py-10'>
                    <h1 className='font-SFBold text-marron text-2xl md:text-4xl'>La pilule rouge de l'alimentation</h1>
                    <h2 className="mt-4 font-SF text-lg md:text-2xl mx-4 dark:text-white">Le seul livre qui dévoile comment l’industrie alimentaire a reprogrammé votre rapport à la nourriture, pour faire de vous un consommateur dépendant.</h2>
                    <p className="mt-4 font-SF text-lg mb-2 md:text-xl dark:text-white">Vous decouvrirez:</p>
                    <div className="flex flex-col justify-center gap-8 mx-4 md:mx-auto">
                    <div className="border-2 border-solid border-marron rounded-4xl flex-1 shadow-lg shadow-black/50 ">
                        <p className="font-SFBold p-4 text-lg  justify-center md:text-2xl dark:text-white">Pourquoi les aliments "healthy" vous maintiennent faible</p>
                    </div>
                    <div className="border-2 border-solid border-marron rounded-4xl flex-1 shadow-lg shadow-black/50">
                        <p className="font-SFBold p-4 text-lg md:text-2xl  dark:text-white">Les pièges mentaux intégrés dès l’enfance</p>
                    </div>
                    <div className="border-2 border-solid border-marron rounded-4xl flex-1 shadow-lg shadow-black/50">
                        <p className="font-SFBold p-4 text-lg md:text-2xl  dark:text-white">Retrouver votre instinct le plus primaire</p>
                    </div>
                </div>
            </div>
        </div>
        <h2 className='mt-10 md:mt-20 text-center font-SFBold text-2xl text-marron 
        md:mx-auto md:max-w-5xl md:text-4xl mx-4'>De chasseur-cueilleur a victime de l'industrie: il est temps de reprendre le controle.</h2>
        <section className="mt-20 py-10 bg-gradient-to-tr from-yellow-700 to-marron">
            <h1 className="text-center font-SFBold text-white md:text-4xl text-2xl mx-4">Deux parties pour tout comprendre</h1>
            <div className='flex flex-col md:flex-row  justify-center gap-20 mt-10 max-w-6xl md:mx-auto mx-4'>
                <div className='border-4 border-marron p-10 rounded-4xl flex-1 '>
                    <h1 className="font-SFBold text-yellow-300 text-xl md:text-2xl ">PARTIE 1: CE QUI VOUS REND FAIBLE</h1>
                    <p className="font-SF text-white text-lg md:text-xl mt-4">Découvrez l'évolution alimentaire, les mensonges de l'industrie et les 11 aliments “santé” à éviter</p>
                    <div className="flex flex-col gap-6 mt-6">
                        <div className=' border-yellow-500 border-l-4 rounded-4xl p-4 opacity-100 bg-marron flex-1 shadow-lg shadow-black/50'>
                        <h1 className="font-SFBold text-white text-lg md:text-xl">Chapitre 1: Evolution de l'alimentation</h1>
                        <p className="mt-2 font-SF text-gray-200 text-base md:text-lg">De chasseurs-cueilleurs à victimes de l'industrie : comment nous avons perdu notre instinct alimentaire.</p>
                    </div>
                    <div className=" border-yellow-500 border-l-4 rounded-4xl p-4 opacity-100 bg-marron flex-1 shadow-lg shadow-black/50">
                        <h1 className="font-SFBold text-white text-lg md:text-xl">Chapitre 2: On vous ment depuis le début</h1>
                        <p className="mt-2 font-SF text-gray-200 text-base md:text-lg">Programmation dès 6 ans, supermarché, petit-déjeuner "essentiel", greenwashing : décryptage des manipulations quotidiennes de l'industrie.</p>
                    </div>
                    <div className=" border-yellow-500 border-l-4 rounded-4xl p-4 opacity-100 bg-marron flex-1 shadow-lg shadow-black/50">
                        <h1 className="font-SFBold text-white text-lg md:text-xl">Chapitre 3: Aliments à éviter</h1>
                        <p className="mt-2 font-SF text-gray-200 text-base md:text-lg">Pain moderne, steaks végétaux, huiles de graines (...) : ce que l'industrie vous cache vraiment sur ces poisons.</p>
                    </div>
                </div>
                    

            </div>
                <div className='border-4 border-marron p-10 rounded-4xl flex-1'>
                    <h1 className="font-SFBold text-yellow-300 text-xl md:text-2xl ">PARTIE 2: CE QUI VOUS REND FORT </h1>
                    <p className="font-SF text-white text-lg md:text-xl mt-4">Redécouvrez les fondements d'une alimentation antifragile et naturelle</p>
                    <div className='flex flex-col gap-6 mt-6'>
                        <div className=" border-yellow-500 border-l-4 rounded-4xl p-4 opacity-100 bg-marron flex-1 shadow-lg shadow-black/50">
                            <h1 className="font-SFBold text-white text-lg md:text-xl">Chapitre 4 : Comprendre pour mieux choisir </h1>
                            <p className="mt-2 font-SF text-gray-200 text-base md:text-lg">Corps-Esprit-Énergie : les fondements oubliés d'une alimentation antifragile et naturelle.</p>
                        </div>
                        <div className=" border-yellow-500 border-l-4 rounded-4xl p-4 opacity-100 bg-marron flex-1 shadow-lg shadow-black/50">
                            <h1 className="font-SFBold text-white text-lg md:text-xl">Chapitre 5 : Aliments à privilégier</h1>
                            <p className="mt-2 font-SF text-gray-200 text-base md:text-lg"> redécouvrir les vrais aliments diabolisés par l'industrie.</p>
                        </div>
                        <div className=" border-yellow-500 border-l-4 rounded-4xl p-4 opacity-100 bg-marron flex-1 shadow-lg shadow-black/50">
                            <h1 className="font-SFBold text-white text-lg md:text-xl">Chapitre 6 : Le jeûne, l’art de se soigner à travers les siècles</h1>
                            <p className="mt-2 font-SF text-gray-200 text-base md:text-lg">Découvrez cette pratique millénaire pour retrouver votre force naturelle.</p>
                        </div>
                    </div>

                </div>
            </div>
         
        </section>
         <div className='mt-10 md:mx-40'>
          <Swiper
        rewind={true}
        centeredSlides={true}
        slidesPerView={1}
        autoHeight={true}

        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
            768: {
                slidesPerView: 3,
                spaceBetween: 20, // Tablette et grands écrans
            }
        }}
       
        modules={[Autoplay, Pagination]}
        className="mySwiper ">
            <SwiperSlide className='flex justify-center items-center'><div className='bg-gray-200 rounded-4xl dark:bg-neutral-800 mx-4'><p className='text-center font-SF text-lg p-5  dark:text-white'>Nutrition Antifragile est un livre à la fois complet, accessible et passionnant, il réussit le pari de mêler rigueur scientifique et clarté, sans jamais devenir trop technique. Les encadrés scientifiques rythment la lecture de manière intelligente, apportant des éclairages utiles sans alourdir le propos.<br/>La partie sur les aliments à privilégier est particulièrement intéressante: on y découvre des produits souvent oubliés ou mal compris, comme le kombucha, le riz noir, le pain au levain ou encore le bouillon d'os.<br/> L'analyse est solide, bien documentée, et offre des recommandations à la fois concrètes, critiques et très pertinentes.<br/>C'est un ouvrage cohérent, bien ancré dans les préoccupations acctuelles autour de l'alimentation, que je recommande sans hésiter.
           <div class="grid place-items-center py-5">
  <div class="inline-flex items-center"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        fill="currentColor" class="w-6 h-6 text-yellow-300 ">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        class="w-6 h-6 text-yellow-300 ">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        class="w-6 h-6 text-yellow-300">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        class="w-6 h-6 text-yellow-300">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span></div>
</div></p>
     </div></SwiperSlide>
     <SwiperSlide className='flex justify-center items-center'> <div className='bg-gray-200 rounded-4xl dark:bg-neutral-800 mx-4'><p className='text-center font-SF text-lg p-5  dark:text-white'>Des révélations qui ont enfin mis de la clarté sur tous mes échecs alimentaires passés. Je cherchais des solutions sans voir le vrai problème. “ Je portais des œillères”, comme le dit si justement l’auteure. Ce livre m’a offert une vraie prise de conscience.  Merci
        <div class="grid place-items-center py-5">
  <div class="inline-flex items-center"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        fill="currentColor" class="w-6 h-6 text-yellow-300 ">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        class="w-6 h-6 text-yellow-300 ">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        class="w-6 h-6 text-yellow-300">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        class="w-6 h-6 text-yellow-300">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span></div>
</div></p>
     </div>
          </SwiperSlide>
            <SwiperSlide className='flex justify-center items-center'> <div className='bg-gray-200 rounded-4xl dark:bg-neutral-800 mx-4'><p className='text-center font-SF text-lg p-5  dark:text-white'>
                Avant de penser régime ou végétarisme, il faut remonter à la source de cette grande mascarade alimentaire. Le vrai commencement. Un point de départ fondamental dont personne ne parle, et pourtant indispensable pour tout comprendre. Ce livre révèle des vérités que beaucoup ignorent, non pas par négligence, mais parce qu’on les a soigneusement passées sous silence.
                  <div class="grid place-items-center py-5">
  <div class="inline-flex items-center"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        fill="currentColor" class="w-6 h-6 text-yellow-300 ">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        class="w-6 h-6 text-yellow-300 ">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        class="w-6 h-6 text-yellow-300">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        class="w-6 h-6 text-yellow-300">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span></div>
</div></p>
     </div>
          </SwiperSlide>
    
            <SwiperSlide className='flex justify-center items-center'> <div className='bg-gray-200 rounded-4xl dark:bg-neutral-800 mx-4'><p className='text-center font-SF text-lg p-5  dark:text-white'>Un déclic immédiat. Ce livre ne donne pas des conseils en plus, il change complètement la façon de voir l’alimentation. 
           <div class="grid place-items-center py-5">
  <div class="inline-flex items-center"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        fill="currentColor" class="w-6 h-6 text-yellow-300 ">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        class="w-6 h-6 text-yellow-300 ">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        class="w-6 h-6 text-yellow-300">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        class="w-6 h-6 text-yellow-300">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span></div>
</div></p>
     </div></SwiperSlide>
    
            <SwiperSlide className='flex justify-center items-center'> <div className='bg-gray-200 rounded-4xl dark:bg-neutral-800 mx-4'><p className='text-center font-SF text-lg p-5  dark:text-white'>Nutrition Antifragile est un livre vraiment complet, accessible et passionnant. Je l’ai dévoré en 2 jours. Les encadrés scientifiques permettent de creuser sans jamais devenir trop technique. J’ai découvert des produits souvent oublié comme le bouillon d’os. Une mine d’or d’infos sans filtre, que je recommande sans hésiter.
             <div class="grid place-items-center py-5">
  <div class="inline-flex items-center"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        fill="currentColor" class="w-6 h-6 text-yellow-300 ">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        class="w-6 h-6 text-yellow-300 ">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        class="w-6 h-6 text-yellow-300">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        class="w-6 h-6 text-yellow-300">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span></div>
</div></p>
     </div></SwiperSlide>

     
         
      </Swiper>
      </div>

        <button onClick={() => window.location.href = "https://amzn.eu/d/2ZR5MMo"} className="mt-8 block mx-auto text-lg font-SFBold rounded-full text-white px-8 py-4 bg-gradient-to-tr from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 md:text-2xl">ACHETER LE LIVRE</button>
        </section>
        <section className ="mt-20">
            <h1 className='text-center font-SFBold text-4xl md:text-8xl dark:text-white'>L'AUTEURE</h1>
        
            <div className='flex flex-col mx-auto md:gap-30 justify-center md:flex-row'>
                <div className="text-center mt-8 mx-4 md:mt-10  md:max-w-xl ">
                <img src= {alionka} alt="Alionka Houl" className="mx-auto h-auto mt-4 md:w-full shadow-xl/50 rounded-4xl"/>
                <h2 className="font-SFBold mt-4 text-marron text-xl md:text-2xl">Alionka</h2>
                <p className="p-4 font-SF text-lg md:text-xl border-l-4 border-marron rounded-4xl shadow-lg  dark:text-white">Auteure<br/>Rédactrice scientifique specialisée en nutrition</p>
                </div>
                <div className='max-w-2xl mx-4 mt-8'>
                    <p className="text-center font-SFBoltItalic text-xl mt-4 mx-4 md:text-2xl border-b-2 border-marron  dark:text-white">J'ai quitté les laboratoires de l'agro-industrie pour réapprendre à me nourrir comme un être humain.</p>
                <p className="text-center mt-6 mx-4 font-SF text-lg md:text-xl  dark:text-white">Diplômée d'un master en nutrition sportive, je pensais sincèrement pouvoir créer des produits bons pour la santé en R&D agroalimentaire. En réalité, j'ai vu de l'intérieur comment l'industrie manipule notre assiette. Prix de revient, durée de vie, marketing, packaging… en aucun cas la nutrition n'est prise en compte.</p>
                <p className="text-center mt-6 mx-4 font-SF text-lg bg-gradient-to-tr from-yellow-700 to-marron text-white rounded-4xl p-4 md:text-xl">Je suis partie plusieurs mois dans les campagnes cambodgiennes, et me suis nourrie d'une simplicité déconcertante : riz, poisson séché, eau de coco, jus de canne, fruits gorgés de soleil. J'y ai puisé une énergie illimitée, une clarté mentale et un calme intérieur profond.</p>
                <p className="text-center mt-6 mx-4 font-SF text-lg md:text-xl  dark:text-white"> <span className ="font-SFBold dark:text-white">J'ai compris la manipulation :</span> L'industrie a détruit notre attirance instinctive pour les produits bruts. Elle exploite nos circuits de récompense avec du faux sucre, du faux gras, du faux goût. Le corps crie alors famine en stockant des calories vides.</p>
                <p className="text-center mt-6 mx-4 font-SFBold text-lg rounded-4xl p-4 border-2 border-marron md:text-xl  dark:text-white">Aujourd'hui, animée par une soif de vérité et de transmission, je vous guide vers une alimentation qui nourrit le corps et l'esprit, loin des dogmes et des vices industriels.</p>
                <button className=" mt-8 block mx-auto md:text-2xl font-SFBold rounded-full text-white px-8 py-4 bg-gradient-to-tr from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300" onClick={handleLoginClick}>REJOIGNEZ LA COMMUNAUTE ANTIFRAGILE</button>
            </div>
                
                
            </div>
            
        </section>
        <section className="mt-20">
            <h1 className="text-center mt-10 font-SFBold text-4xl md:text-8xl  dark:text-white">DEVENIR MEMBRE</h1>
            <p className='text-center font-SFBold md:text-2xl text-xl text-marron mt-4'>La vérité sur ton assiette</p>
            <p className="text-center  font-SFBold md:text-lg text-marron border-2 rounded-4xl mx-4  md:max-w-100 md:block md:mx-auto">DEJA + DE 1000 MEMBRES ANTIFRAGILES</p>
            <h2 className="text-center font-SFBold
            text-marron mt-8 text-lg md:text-xl">0 FILTRE . 0 DOGME. 0 BULLSHIT</h2>
                   <div id="article" className="mx-4 mt-4 md:mx-40">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        rewind={true}
        pagination={{ clickable: true,
           dynamicBullets: true,
         }}
        autoplay={{ delay: 5000 }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-10"
      >
        {articles.map((article) => (
          <SwiperSlide key={article.id}>
            <Link
              to={`/articles/${article.slug}`}
              className="bg-white shadow-lg rounded-4xl border border-gray-300 overflow-hidden hover:shadow-xl transition-shadow block my-10 dark:bg-neutral-800 dark:border-neutral-500"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-SFBold dark:text-marron">{article.title}</h2>
                <p className="font-SF text-gray-600  dark:text-white">
                  {new Date(article.published_at).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
             
            
            <button onClick= {handleSubscribeClick} className=" mt-10 block mx-auto  md:text-2xl font-SFBold rounded-full text-white px-4 py-4 bg-gradient-to-tr from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 md:px-8">DEVENIR MEMBRE ANTIFRAGILE</button>
            <div className=" mx-4 md:mx-40" >
            <Swiper
        rewind={true}
        slidesPerView={1}
        grid={{
          rows: 2,
        }}
        spaceBetween={50}
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
        <SwiperSlide><img src={avis1} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis2} className="rounded-4xl" /></SwiperSlide>
        <SwiperSlide><img src={avis3} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis4} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis5} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis6} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis7} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis8} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis9} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis10} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis11} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis12} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis13} className="rounded-4xl"/></SwiperSlide>
         <SwiperSlide><img src={avis14} className="rounded-4xl"/></SwiperSlide>
          <SwiperSlide><img src={avis15} className="rounded-4xl"/></SwiperSlide>
         <SwiperSlide><img src={avis1} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis2} className="rounded-4xl" /></SwiperSlide>
        <SwiperSlide><img src={avis3} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis4} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis5} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis6} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis7} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis8} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis9} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis10} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis11} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis12} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis13} className="rounded-4xl"/></SwiperSlide>
         <SwiperSlide><img src={avis14} className="rounded-4xl"/></SwiperSlide>
          <SwiperSlide><img src={avis15} className="rounded-4xl"/></SwiperSlide>
        
      
      </Swiper>
      </div>

        </section>
       
    </>
    );
}
export default Home;
