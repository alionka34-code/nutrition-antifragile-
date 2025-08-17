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
                    console.log('Articles data:', data);
                    setArticles(data);
                })
                .catch(err => setError(err.message));
        }, []);
        if (error) return <p>{error}</p>
    return (
        <>
        <Helmet>
            <title>Accueil | Nutrition Antifragile</title>
            <meta name="description" content="Bienvenue sur Nutrition Antifragile : découvrez une nouvelle approche de la santé durable. Rejoignez notre communauté et accédez à des ressources exclusives pour renforcer votre corps et votre esprit." />
        </Helmet>
        <header className="px-4 bg-linear-to-t from-white to-gray-200">
            <div className={`text-center transition-transform duration-1500 ease-out ${visible ? 'translate-y-0' : 'translate-y-50'}`}>
                <h2 className="font-SF text-gray-600">ALIONKA HOUL - REDACTRICE SCIENTIFIQUE INDEPENDANTE SPECIALISÉE EN NUTRITION</h2>
                
            
                <h1 className={` text-center text-5xl font-SFBold transition-transform duration-1500 ease-out md:text-8xl ${visible ? 'translate-y-0' : 'translate-y-10'}`}>NUTRITION<br/>ANTIFRAGILE</h1>
                <p className="text-center text-gray-600 text-xl font-SF md:text-2xl">Reprendre le pouvoir sur votre assiette dans un monde qui vous empoisonne</p>
            <p className="text-xl font-SFBold  text-center mt-8 shadow-lg border-marron border-l-4 rounded-l-xl p-10 mx-auto md:text-2xl max-w-4xl">Vos grands-parents n'avaient pas besoin de nutritionniste pour etre en forme. Vous, vous passez 10 minutes a decrypter l'etiquette d'un yaourt.</p>
            <button onClick ={handleBookClick}className="mt-8 block mx-auto text-lg font-SFBold rounded-full text-white px-8 py-4 bg-gradient-to-tr from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 md:text-3xl">DECOUVRIR LE LIVRE</button>
            </div>
                

        </header>
        <section className="mt-20">
            <div className='flex flex-col md:flex-row gap-10 md:gap-30 justify-center text-center'>
                <div>
                    <img src = {livre} alt="Livre Nutrition Antifragile" className=" w-80 md:w-100 h-auto  shadow-xl/50 mx-auto" />
                </div>
                <div className='md:max-w-2xl mx-4 py-10'>
                    <h1 className='font-SFBold text-marron text-2xl md:text-4xl'>La pilule rouge de l'alimentation</h1>
                    <h2 className="mt-4 font-SF text-lg md:text-2xl mx-4">Le seul livre qui dévoile comment l’industrie alimentaire a reprogrammé votre rapport à la nourriture, pour faire de vous un consommateur dépendant.</h2>
                    <p className="mt-4 font-SF text-lg mb-2 md:text-xl">Vous decouvrirez:</p>
                    <div className="flex flex-col justify-center gap-8 mx-4 md:mx-auto">
                    <div className="border-2 border-solid border-marron rounded-2xl flex-1 shadow-lg shadow-black/50 ">
                        <p className="font-SFBold p-4 text-lg  justify-center md:text-2xl">Pourquoi les aliments "healthy" vous maintiennent faible</p>
                    </div>
                    <div className="border-2 border-solid border-marron rounded-2xl flex-1 shadow-lg shadow-black/50">
                        <p className="font-SFBold p-4 text-lg md:text-2xl">Les pièges mentaux intégrés dès l’enfance</p>
                    </div>
                    <div className="border-2 border-solid border-marron rounded-2xl flex-1 shadow-lg shadow-black/50">
                        <p className="font-SFBold p-4 text-lg md:text-2xl">Retrouver votre instinct le plus primaire</p>
                    </div>
                </div>
            </div>
        </div>
        <h2 className='mt-10 md:mt-20 text-center font-SFBold text-2xl text-marron 
        md:mx-auto md:max-w-5xl md:text-4xl mx-4'>De chasseur-cueilleur a victime de l'industrie: il est temps de reprendre le controle.</h2>
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
            <SwiperSlide className='flex justify-center items-center'> <div className='bg-gray-200 rounded-2xl mx-4'><p className='text-center font-SF text-m p-5'>"Nutrition Antifragile est un livre à la fois complet, accessible et passionnant, il réussit le pari de mêler riguer scientifique et clarté, sans jamais devenir trop technique. Les encadrés scientifiques rythment la lecture de manière inteliligente, apportant des éclairages utiles sans alourdir le propos.<br/>La partie sur les aliments à privilégier est particulièrement intéressante: on y découvre des produits souvent oubliés ou mal compris, comme le kombucha, le riz noir, le pain au levain ou encore le bouillon d'os.<br/> L'analyse est solide, bien documentée, et offre des recommandations à la fois concrètes, critiques et très pertinentes.<br/>C'est un ouvrage cohérent, bien ancré dans les préoccupations acctuelles autour de l'alimentation, que je recommande sans hésiter."
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
     <SwiperSlide className='flex justify-center items-center'> <div className='bg-gray-200 rounded-2xl mx-4'><p className='text-center font-SF text-m p-5'>Des révélations qui ont enfin mis de la clarté sur tous mes échecs alimentaires passés. Je cherchais des solutions sans voir le vrai problème. “ Je portais des œillères”, comme le dit si justement l’auteure. Ce livre m’a offert une vraie prise de conscience.  Merci
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
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
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
            <SwiperSlide className='flex justify-center items-center'> <div className='bg-gray-200 rounded-2xl mx-4'><p className='text-center font-SF text-m p-5'>
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
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
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
            <SwiperSlide className='flex justify-center items-center'> <div className='bg-gray-200 rounded-2xl mx-4'><p className='text-center font-SF text-m p-5'>Un déclic immédiat. Ce livre ne donne pas des conseils en plus, il change complètement la façon de voir l’alimentation. 
           <div class="grid place-items-center py-5">
  <div class="inline-flex items-center"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        fill="currentColor" class="w-6 h-6 text-yellow-300 ">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-yellow-300 ">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
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
            <SwiperSlide className='flex justify-center items-center'> <div className='bg-gray-200 rounded-2xl mx-4'><p className='text-center font-SF text-m p-5'>Nutrition Antifragile est un livre vraiment complet, accessible et passionnant. Je l’ai dévoré en 2 jours. Les encadrés scientifiques permettent de creuser sans jamais devenir trop technique. J’ai découvert des produits souvent oublié comme le bouillon d’os. Une mine d’or d’infos sans filtre, que je recommande sans hésiter.
           <div class="grid place-items-center py-5">
  <div class="inline-flex items-center"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        fill="currentColor" class="w-6 h-6 text-yellow-300 ">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-yellow-300 ">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-yellow-300">
        <path fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"></path>
      </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
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

        <button className="mt-8 block mx-auto text-lg font-SFBold rounded-full text-white px-8 py-4 bg-gradient-to-tr from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 md:text-2xl">ACHETER LE LIVRE</button>
        </section>
        <section className ="mt-20">
            <h1 className='text-center font-SFBold text-4xl md:text-8xl'>L'AUTEURE</h1>
        
            <div className='flex flex-col mx-auto md:gap-30 justify-center md:flex-row'>
                <div className="text-center mt-8 mx-4 md:mt-10  md:max-w-xl ">
                <img src= {alionka} alt="Alionka Houl" className="mx-auto h-auto mt-4 md:w-full shadow-xl/50 rounded-2xl"/>
                <h2 className="font-SFBold mt-4 text-marron text-xl md:text-2xl">Alionka</h2>
                <p className="p-4 font-SF text-lg md:text-xl border-l-4 border-marron rounded-xl shadow-lg">Auteure<br/>redactrice scientifique specialisée en nutrition</p>
                </div>
                <div className='max-w-2xl mx-4 mt-8'>
                    <p className="text-center font-SFBoltItalic text-xl mt-4 mx-4 md:text-2xl border-b-2 border-marron">J'ai quitté les laboratoires de l'agro-industrie pour réapprendre à me nourrir comme un être humain.</p>
                <p className="text-center mt-6 mx-4 font-SF text-lg md:text-xl">Diplômée d'un master en nutrition sportive, je pensais sincèrement pouvoir créer des produits bons pour la santé en R&D agroalimentaire.En réalité, j'ai vu de l'intérieur comment l'industrie manipule notre assiette. Prix de revient, durée de vie, marketing, packaging… en aucun cas la nutrition n'est prise en compte.</p>
                <p className="text-center mt-6 mx-4 font-SF text-lg bg-gradient-to-tr from-yellow-700 to-marron text-white rounded-2xl p-4 md:text-xl">Je suis partie plusieurs mois dans les campagnes cambodgiennes, et me suis nourrie d'une simplicité déconcertante : riz, poisson séché, eau de coco, jus de canne, fruits gorgés de soleil. J'y ai puisé une énergie illimitée, une clarté mentale et un calme intérieur profond.</p>
                <p className="text-center mt-6 mx-4 font-SF text-lg md:text-xl"> <span className ="font-SFBold" >J'ai compris la manipulation :</span> L'industrie a détruit notre attirance instinctive pour les produits bruts. Elle exploite nos circuits de récompense avec du faux sucre, du faux gras, du faux goût. Le corps crie alors famine en stockant des calories vides.</p>
                <p className="text-center mt-6 mx-4 font-SFBold text-lg rounded-2xl p-4 border-2 border-marron md:text-xl">Aujourd'hui, animée par une soif de vérité et de transmission, je vous guide vers une alimentation qui nourrit le corps et l'esprit, loin des dogmes et des vices industriels.</p>
                <button className=" mt-8 block mx-auto md:text-2xl font-SFBold rounded-full text-white px-8 py-4 bg-gradient-to-tr from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300" onClick={handleLoginClick}>REJOIGNEZ LA COMMUNAUTE ANTIFRAGILE</button>
            </div>
                
                
            </div>
            
        </section>
        <section className="mt-20">
            <h1 className="text-center mt-10 font-SFBold text-4xl md:text-8xl">DEVENIR MEMBRE</h1>
            <p className='text-center font-SFBold md:text-2xl text-xl text-marron mt-4'>La vérité sur ton assiette</p>
            <p className="text-center  font-SFBold md:text-lg text-marron border-2 rounded-2xl mx-4  md:max-w-100 md:block md:mx-auto">DEJA + DE 1000 MEMBRES ANTIFRAGILES</p>
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
              to={`/articles/${article.id}`}
              className="bg-white shadow-lg rounded-lg border border-gray-300 overflow-hidden hover:shadow-xl transition-shadow block my-10"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-SFBold">{article.title}</h2>
                <p className="font-SF text-gray-600">
                  {new Date(article.published_at).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
             
            <div className='mt-10 bg-gradient-to-tr from-yellow-700 to-marron py-10 '>
                    <h1 className="text-center font-SFBold text-4xl text-yellow-300 md:text-6xl">CE QUE TU VAS RECEVOIR</h1>
                    <h2 className="text-center font-SFBold text-white text-xl mt-4 mx-4 md:text-2xl">3 fois par mois dans ta boite mail un article pour :</h2>
                    <ul className="pl-10 text-center  md:px-10 md:py-10 border-2 border-marron rounded-2xl md:mx-40 md:my-10 mx-4">
                        <li className="font-SFBold text-2xl md:text-4xl text-white mb-8 pt-10 mr-10">Se libérer des dogmes nutritionnels</li>
                        <li className="font-SFBold text-2xl md:text-4xl text-white mb-8 mr-10">Comprendre la matrice agro-industrielle, point par point</li>
                        <li className="font-SFBold text-2xl md:text-4xl text-white mb-8 mr-10">Nourrir son corps et son esprit pour maximiser sa santé sur le long terme</li>
                    </ul>
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
        <SwiperSlide><img src={avis1} className="rounded-2xl"/></SwiperSlide>
        <SwiperSlide><img src={avis2} className="rounded-2xl" /></SwiperSlide>
        <SwiperSlide><img src={avis3} className="rounded-2xl"/></SwiperSlide>
        <SwiperSlide><img src={avis4} className="rounded-2xl"/></SwiperSlide>
        <SwiperSlide><img src={avis5} className="rounded-2xl"/></SwiperSlide>
        <SwiperSlide><img src={avis6} className="rounded-2xl"/></SwiperSlide>
        <SwiperSlide><img src={avis7} className="rounded-2xl"/></SwiperSlide>
        <SwiperSlide><img src={avis8} className="rounded-2xl"/></SwiperSlide>
        <SwiperSlide><img src={avis9} className="rounded-2xl"/></SwiperSlide>
        <SwiperSlide><img src={avis10} className="rounded-2xl"/></SwiperSlide>
        <SwiperSlide><img src={avis11} className="rounded-2xl"/></SwiperSlide>
        <SwiperSlide><img src={avis12} className="rounded-2xl"/></SwiperSlide>
        <SwiperSlide><img src={avis13} className="rounded-2xl"/></SwiperSlide>
         <SwiperSlide><img src={avis14} className="rounded-2xl"/></SwiperSlide>
          <SwiperSlide><img src={avis15} className="rounded-2xl"/></SwiperSlide>
         <SwiperSlide><img src={avis1} className="rounded-2xl"/></SwiperSlide>
        <SwiperSlide><img src={avis2} className="rounded-2xl" /></SwiperSlide>
        <SwiperSlide><img src={avis3} className="rounded-2xl"/></SwiperSlide>
        <SwiperSlide><img src={avis4} className="rounded-2xl"/></SwiperSlide>
        <SwiperSlide><img src={avis5} className="rounded-2xl"/></SwiperSlide>
        <SwiperSlide><img src={avis6} className="rounded-2xl"/></SwiperSlide>
        <SwiperSlide><img src={avis7} className="rounded-2xl"/></SwiperSlide>
        <SwiperSlide><img src={avis8} className="rounded-2xl"/></SwiperSlide>
        <SwiperSlide><img src={avis9} className="rounded-2xl"/></SwiperSlide>
        <SwiperSlide><img src={avis10} className="rounded-2xl"/></SwiperSlide>
        <SwiperSlide><img src={avis11} className="rounded-2xl"/></SwiperSlide>
        <SwiperSlide><img src={avis12} className="rounded-2xl"/></SwiperSlide>
        <SwiperSlide><img src={avis13} className="rounded-2xl"/></SwiperSlide>
         <SwiperSlide><img src={avis14} className="rounded-2xl"/></SwiperSlide>
          <SwiperSlide><img src={avis15} className="rounded-2xl"/></SwiperSlide>
        
      
      </Swiper>
      </div>

        </section>
       
    </>
    );
}
export default Home;