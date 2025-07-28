import React from 'react';
import livre from '../assets/images/livre.png';
import { Helmet } from "react-helmet";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/swiper-custom.css";

function Livre() {

    return (
        <>
        <Helmet>
            <title>Livre | Nutrition Antifragile </title>
            <meta name="description" content="Découvrez le livre 'Nutrition Antifragile' d'Alionka Houl, une exploration de la nutrition moderne et des pièges de l'industrie alimentaire." />
        </Helmet>
        <header className="px-4 bg-linear-to-t from-white to-gray-200 ">
                <h1 className="text-center text-2xl md:text-4xl font-SFBold max-w-4xl block mx-auto">Ce n’est pas un livre de régimes ni de recettes.  <br/>C’est le pourquoi du comment. Décortiqué, dérangeant, mais nécessaire. Vous méritez de savoir ce qu’on vous cache depuis 50 ans.</h1>
                <div className="flex flex-col md:flex-row md:gap-20 mt-10 max-w-5xl  mx-auto">
                    <div className="flex justify-center">
                        <img src = {livre} alt="Livre Nutrition Antifragile" className="  md:w-200 md:h-auto w-auto h-100 shadow-xl/50 mt-8" />
                    </div>
                    <div className='items-center justify-center flex flex-col'>
                         <p className="text-center text-xl md:text-2xl font-SF mt-8 shadow-lg border-marron border-l-4 rounded-l-xl p-10">Le seul livre qui relie votre assiette à votre âme, et qui expose les racines mentales et industrielles de la dépendance alimentaire.</p>
                         <p className="text-center text-xl 
                         shadow-lg border-marron border-r-4 rounded-r-xl p-10 md:text-2xl font-SF mt-8">Vos grands-parents n’avaient pas besoin de nutritionniste pour être en pleine santé. Vous, vous passez 10 minutes à décrypter l’étiquette d’un yaourt..</p>
                         <button className="mt-8 block mx-auto text-lg font-SFBold rounded-full text-white px-6 py-4 bg-gradient-to-tr from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 md:text-xl">ACHETER LE LIVRE</button>
                    </div> 
                </div>
        </header>
        <section className="mt-20">
            <div className="mx-4 flex flex-col md:flex-row md:max-w-6xl md:mx-auto gap-10">
                <div className='flex flex-col justify-center flex-1'>
                    <h1 className="font-SFBold text-3xl text-marron md:text-5xl">Le renversement des valeurs alimentaires</h1>
                    <p className="font-SF text-xl md:text-2xl mt-10">Nous avons remplacé le champ par l’usine, l’ingrédient par l’additif, le goût par l’arôme.</p>
                    <p className="font-SF text-xl md:text-2xl mt-10">Nous avons échangé la transmission culinaire contre l'emballage instructif, le geste ancestral contre le mode d'emploi, la cuisine de grand-mère contre les plats préparés industriels.</p>
                </div>
                <div className=" flex flex-col gap-10 flex-1">
                    <div className="border-2 border-marron p-4 rounded-2xl shadow-lg shadow-black/50">
                        <h1 className="text-center font-SFBold md:text-2xl text-marron">1/3 de poison quotidien</h1>
                        <p className="text-center font-SF md:text-xl my-4">Les aliments ultra-transformés représentent un tiers de nos calories journalières</p>
                    </div>
                        <div className="border-2 border-marron p-4 rounded-2xl shadow-lg shadow-black/50">
                            <h1 className="text-center font-SFBold md:text-2xl text-marron">320 codes chimiques autorisés</h1>
                            <p className="text-center font-SF md:text-xl my-4">320 additifs alimentaires sont aujourd'hui autorisés en Europe</p>
                        </div>
                        <div className="border-2 border-marron p-4 rounded-2xl shadow-lg shadow-black/50">
                            <h1 className="text-center font-SFBold md:text-2xl text-marron">50% du bio industrialisé </h1>
                            <p className="text-center font-SF md:text-xl my-4">50% des produits biologiques industriels sont ultra-transformés</p>
                        </div>
                    </div>
            </div>
        </section>
        <section className="mt-20 py-10 bg-gradient-to-tr from-yellow-700 to-marron">
            <h1 className="text-center font-SFBold text-white md:text-4xl text-2xl mx-4">Deux parties pour tout comprendre</h1>
            <div className='flex flex-col md:flex-row  justify-center gap-20 mt-10 max-w-6xl md:mx-auto mx-4'>
                <div className='border-4 border-marron p-10 rounded-2xl flex-1 '>
                    <h1 className="font-SFBold text-yellow-300 text-xl md:text-2xl ">PARTIE 1: CE QUI VOUS REND FAIBLE</h1>
                    <p className="font-SF text-white text-lg md:text-xl mt-4">Découvrez l'évolution alimentaire, les mensonges de l'industrie et les 11 aliments “santé” à éviter</p>
                    <div className="flex flex-col gap-6 mt-6">
                        <div className=' border-yellow-500 border-l-4 rounded-2xl p-4 opacity-100 bg-marron flex-1 shadow-lg shadow-black/50'>
                        <h1 className="font-SFBold text-white text-lg md:text-xl">Chapitre 1: Evolution de l'alimentation</h1>
                        <p className="mt-2 font-SF text-gray-200 text-base md:text-lg">De chasseurs-cueilleurs à victimes de l'industrie : comment nous avons perdu notre instinct alimentaire ancestral.</p>
                    </div>
                    <div className=" border-yellow-500 border-l-4 rounded-2xl p-4 opacity-100 bg-marron flex-1 shadow-lg shadow-black/50">
                        <h1 className="font-SFBold text-white text-lg md:text-xl">Chapitre 2: On vous ment depuis le début</h1>
                        <p className="mt-2 font-SF text-gray-200 text-base md:text-lg">Programmation dès 6 ans, supermarché, petit-déjeuner "essentiel", greenwashing : décryptage des manipulations quotidiennes de l'industrie.</p>
                    </div>
                    <div className=" border-yellow-500 border-l-4 rounded-2xl p-4 opacity-100 bg-marron flex-1 shadow-lg shadow-black/50">
                        <h1 className="font-SFBold text-white text-lg md:text-xl">Chapitre 3: Aliments à éviter</h1>
                        <p className="mt-2 font-SF text-gray-200 text-base md:text-lg">Pain moderne, steaks végétaux, huiles de graines (...) : ce que l'industrie vous cache vraiment sur ces poisons.</p>
                    </div>
                </div>
                    

            </div>
                <div className='border-4 border-marron p-10 rounded-2xl flex-1'>
                    <h1 className="font-SFBold text-yellow-300 text-xl md:text-2xl ">PARTIE 2: CE QUI VOUS REND FORT </h1>
                    <p className="font-SF text-white text-lg md:text-xl mt-4">Redécouvrez les fondements d'une alimentation antifragile et naturelle</p>
                    <div className='flex flex-col gap-6 mt-6'>
                        <div className=" border-yellow-500 border-l-4 rounded-2xl p-4 opacity-100 bg-marron flex-1 shadow-lg shadow-black/50">
                            <h1 className="font-SFBold text-white text-lg md:text-xl">Chapitre 4 : Comprendre pour mieux choisir </h1>
                            <p className="mt-2 font-SF text-gray-200 text-base md:text-lg">Corps-Esprit-Énergie : les fondements oubliés d'une alimentation antifragile et naturelle.</p>
                        </div>
                        <div className=" border-yellow-500 border-l-4 rounded-2xl p-4 opacity-100 bg-marron flex-1 shadow-lg shadow-black/50">
                            <h1 className="font-SFBold text-white text-lg md:text-xl">Chapitre 5 : Aliments à privilégier Œufs, abats, fromages au lait cru</h1>
                            <p className="mt-2 font-SF text-gray-200 text-base md:text-lg"> redécouvrir les vrais aliments diabolisés par l'industrie.</p>
                        </div>
                        <div className=" border-yellow-500 border-l-4 rounded-2xl p-4 opacity-100 bg-marron flex-1 shadow-lg shadow-black/50">
                            <h1 className="font-SFBold text-white text-lg md:text-xl">Chapitre 6 : Le jeûne, l’art de se soigner à travers les siècles</h1>
                            <p className="mt-2 font-SF text-gray-200 text-base md:text-lg">Découvrez cette pratique millénaire pour retrouver votre force naturelle.</p>
                        </div>
                    </div>

                </div>
            </div>
         
        </section>
        <section className='mt-10 md:max-w-6xl flex flex-col mx-auto'>
            <h1 className='text-center font-SFBold  text-3xl md:text-6xl text-marron mx-4'>Vous respectez-vous assez pour bien vous nourrir?</h1>
            <p className='text-center mt-4 font-SF text-2xl md:text-4x mx-4'>Rejoignez ceux qui ont choisi de reprendre le pouvoir sur leur assiette</p>
             <div className='mt-10'>
          <Swiper
          autoHeight={true}
          rewind={true}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className='flex justify-center items-center'> <div className='border-marron border-2 rounded-2xl mx-4 md:mx-20 shadow-lg shadow-black'><p className='text-center font-SF text-2xl p-10'>"Nutrition Antifragile est un livre à la fois complet, accessible et passionnant, il réussit le pari de mêler riguer scientifique et clarté, sans jamais devenir trop technique. Les encadrés scientifiques rythment la lecture de manière inteliligente, apportant des éclairages utiles sans alourdir le propos.<br/>La partie sur les aliments à privilégier est particulièrement intéressante: on y découvre des produits souvent oubliés ou mal compris, comme le kombucha, le riz noir, le pain au levain ou encore le bouillon d'os.<br/> L'analyse est solide, bien documentée, et offre des recommandations à la fois concrètes, critiques et très pertinentes.<br/>C'est un ouvrage cohérent, bien ancré dans les préoccupations acctuelles autour de l'alimentation, que je recommande sans hésiter."</p>
            </div></SwiperSlide>
        <SwiperSlide><div className='border-marron border-2 rounded-2xl mx-4 md:mx-20 shadow-lg shadow-black'><p className='text-center font-SF text-2xl p-10'>"Des révélations qui ont enfin mis de la clarté sur tous mes échecs alimentaires passés. Je cherchais des solutions sans voir le vrai problème. “ Je portais des œillères”, comme le dit si justement l’auteure. Ce livre m’a offert une vraie prise de conscience.  Merci "</p>
            </div></SwiperSlide>
        <SwiperSlide><div className='border-marron border-2 rounded-2xl mx-4 md:mx-20 shadow-lg shadow-black'><p className='text-center font-SF text-2xl p-10'>"Avant de penser régime ou végétarisme, il faut remonter à la source de cette grande mascarade alimentaire. Le vrai commencement. Un point de départ fondamental dont personne ne parle, et pourtant indispensable pour tout comprendre. Ce livre révèle des vérités que beaucoup ignorent, non pas par négligence, mais parce qu’on les a soigneusement passées sous silence."</p>
            </div></SwiperSlide>
        <SwiperSlide><div className='border-marron border-2 rounded-2xl mx-4 md:mx-20 shadow-lg shadow-black'><p className='text-center font-SF text-2xl p-10' >"Un déclic immédiat. Ce livre ne donne pas des conseils en plus, il change complètement la façon de voir l’alimentation. "</p>
        </div></SwiperSlide>
         
      </Swiper>
      </div>
            <button className="mt-8 block mx-auto text-lg font-SFBold rounded-full text-white px-6 py-4 bg-gradient-to-tr from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 md:text-xl">OUI, JE REPRENDS LE CONTROLE</button>
        
        </section>
           
        
        
        
        
        </>
    );
}

export default Livre;