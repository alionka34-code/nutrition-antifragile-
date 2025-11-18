import React from 'react';
import livre from '../../assets/images/livre.png';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../../styles/swiper-custom.css";

function BookSection() {
    return (
        <section className="mt-10 md:mt-20">
            <div className='flex flex-col md:flex-row md:gap-30 justify-center text-center'>
                <div>
                    <img src={livre} alt="Livre Nutrition Antifragile" className="w-80 md:w-100 h-auto shadow-xl/50 mx-auto md:block" />
                </div>
                <div className='md:max-w-2xl mx-4 py-10'>
                    <h2 className='font-SFBold text-marron text-2xl md:text-4xl'>La pilule rouge de l'alimentation</h2>
                    <h3 className="mt-4 font-SF text-lg md:text-2xl mx-4 dark:text-white">Le seul livre qui dévoile comment l'industrie alimentaire a reprogrammé votre rapport à la nourriture, pour faire de vous un consommateur dépendant.</h3>
                    <p className="mt-4 font-SF text-lg mb-2 md:text-xl dark:text-white">Vous decouvrirez:</p>
                    <div className="flex flex-col justify-center gap-8 mx-4 md:mx-auto">
                        <div className="border-2 border-solid border-marron rounded-4xl flex-1 shadow-lg shadow-black/50">
                            <p className="font-SFBold p-4 text-lg justify-center md:text-2xl dark:text-white">Pourquoi les aliments "healthy" vous maintiennent faible</p>
                        </div>
                        <div className="border-2 border-solid border-marron rounded-4xl flex-1 shadow-lg shadow-black/50">
                            <p className="font-SFBold p-4 text-lg md:text-2xl dark:text-white">Les pièges mentaux intégrés dès l'enfance</p>
                        </div>
                        <div className="border-2 border-solid border-marron rounded-4xl flex-1 shadow-lg shadow-black/50">
                            <p className="font-SFBold p-4 text-lg md:text-2xl dark:text-white">Retrouver votre instinct le plus primaire</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <h2 className='mt-10 md:mt-20 text-center font-SFBold text-2xl text-marron md:mx-auto md:max-w-5xl md:text-4xl mx-4'>
                De chasseur-cueilleur a victime de l'industrie: il est temps de reprendre le controle.
            </h2>

            
            <div className='flex flex-row mx-auto justify-center gap-5'>
                <button onClick={() => window.location.href = "https://amzn.eu/d/2ZR5MMo"} className="mt-8 text-lg font-SFBold rounded-full text-white px-4 md:px-8 md:py-4 bg-gradient-to-tr from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 md:text-3xl">ACHETER LE LIVRE</button>
                <button onClick={() => window.location.href="/extrait2.pdf"} className="mt-8 text-lg font-SFBold rounded-full text-white px-8 py-4 bg-gradient-to-tr from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 md:text-3xl">LIRE UN EXTRAIT</button>
            </div> 

        
            <div className="mt-20 py-10 bg-degrade-marron">
                <h3 className="text-center font-SFBold text-white md:text-4xl text-2xl mx-4">Deux parties pour tout comprendre</h3>
                <div className='flex flex-col md:flex-row justify-center gap-20 mt-10 max-w-6xl md:mx-auto mx-4'>
                    <div className='border-4 border-marron p-10 rounded-4xl flex-1'>
                        <h4 className="font-SFBold text-yellow-300 text-xl md:text-2xl">PARTIE 1: CE QUI VOUS REND FAIBLE</h4>
                        <p className="font-SF text-white text-lg md:text-xl mt-4">Découvrez l'évolution alimentaire, les mensonges de l'industrie et les 11 aliments "santé" à éviter</p>
                        <div className="flex flex-col gap-6 mt-6">
                            <div className='border-yellow-500 border-l-4 rounded-4xl p-4 opacity-100 bg-peach flex-1 shadow-lg shadow-black/50'>
                                <h5 className="font-SFBold text-white text-lg md:text-xl">Chapitre 1: Evolution de l'alimentation</h5>
                                <p className="mt-2 font-SF text-gray-200 text-base md:text-lg">De chasseurs-cueilleurs à victimes de l'industrie : comment nous avons perdu notre instinct alimentaire.</p>
                            </div>
                            <div className="border-yellow-500 border-l-4 rounded-4xl p-4 opacity-100 bg-peach flex-1 shadow-lg shadow-black/50">
                                <h5 className="font-SFBold text-white text-lg md:text-xl">Chapitre 2: On vous ment depuis le début</h5>
                                <p className="mt-2 font-SF text-gray-200 text-base md:text-lg">Programmation dès 6 ans, supermarché, petit-déjeuner "essentiel", greenwashing : décryptage des manipulations quotidiennes de l'industrie.</p>
                            </div>
                            <div className="border-yellow-500 border-l-4 rounded-4xl p-4 opacity-100 bg-peach flex-1 shadow-lg shadow-black/50">
                                <h5 className="font-SFBold text-white text-lg md:text-xl">Chapitre 3: Aliments à éviter</h5>
                                <p className="mt-2 font-SF text-gray-200 text-base md:text-lg">Pain moderne, steaks végétaux, huiles de graines (...) : ce que l'industrie vous cache vraiment sur ces poisons.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className='border-4 border-marron p-10 rounded-4xl flex-1'>
                        <h4 className="font-SFBold text-yellow-300 text-xl md:text-2xl">PARTIE 2: CE QUI VOUS REND FORT</h4>
                        <p className="font-SF text-white text-lg md:text-xl mt-4">Redécouvrez les fondements d'une alimentation antifragile et naturelle</p>
                        <div className='flex flex-col gap-6 mt-6'>
                            <div className="border-yellow-500 border-l-4 rounded-4xl p-4 opacity-100 bg-peach flex-1 shadow-lg shadow-black/50">
                                <h5 className="font-SFBold text-white text-lg md:text-xl">Chapitre 4 : Comprendre pour mieux choisir</h5>
                                <p className="mt-2 font-SF text-gray-200 text-base md:text-lg">Corps-Esprit-Énergie : les fondements oubliés d'une alimentation antifragile et naturelle.</p>
                            </div>
                            <div className="border-yellow-500 border-l-4 rounded-4xl p-4 opacity-100 bg-peach flex-1 shadow-lg shadow-black/50">
                                <h5 className="font-SFBold text-white text-lg md:text-xl">Chapitre 5 : Aliments à privilégier</h5>
                                <p className="mt-2 font-SF text-gray-200 text-base md:text-lg">redécouvrir les vrais aliments diabolisés par l'industrie.</p>
                            </div>
                            <div className="border-yellow-500 border-l-4 rounded-4xl p-4 opacity-100 bg-peach flex-1 shadow-lg shadow-black/50">
                                <h5 className="font-SFBold text-white text-lg md:text-xl">Chapitre 6 : Le jeûne, l'art de se soigner à travers les siècles</h5>
                                <p className="mt-2 font-SF text-gray-200 text-base md:text-lg">Découvrez cette pratique millénaire pour retrouver votre force naturelle.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
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
                    className="mySwiper"
                >
                    <SwiperSlide className='flex justify-center items-center'>
                        <div className='bg-gray-200 rounded-4xl dark:bg-neutral-800 mx-4'>
                            <p className='text-center font-SF text-lg p-5 dark:text-white'>
                                Nutrition Antifragile est un livre à la fois complet, accessible et passionnant, il réussit le pari de mêler rigueur scientifique et clarté, sans jamais devenir trop technique. Les encadrés scientifiques rythment la lecture de manière intelligente, apportant des éclairages utiles sans alourdir le propos.<br/>
                                La partie sur les aliments à privilégier est particulièrement intéressante: on y découvre des produits souvent oubliés ou mal compris, comme le kombucha, le riz noir, le pain au levain ou encore le bouillon d'os.<br/> 
                                L'analyse est solide, bien documentée, et offre des recommandations à la fois concrètes, critiques et très pertinentes.<br/>
                                C'est un ouvrage cohérent, bien ancré dans les préoccupations acctuelles autour de l'alimentation, que je recommande sans hésiter.
                            </p>
                            <div className="grid place-items-center py-5">
                                <div className="inline-flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-300">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    
                    <SwiperSlide className='flex justify-center items-center'>
                        <div className='bg-gray-200 rounded-4xl dark:bg-neutral-800 mx-4'>
                            <p className='text-center font-SF text-lg p-5 dark:text-white'>
                                Des révélations qui ont enfin mis de la clarté sur tous mes échecs alimentaires passés. Je cherchais des solutions sans voir le vrai problème. " Je portais des œillères", comme le dit si justement l'auteure. Ce livre m'a offert une vraie prise de conscience. Merci
                            </p>
                            <div className="grid place-items-center py-5">
                                <div className="inline-flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-300">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    
                    <SwiperSlide className='flex justify-center items-center'>
                        <div className='bg-gray-200 rounded-4xl dark:bg-neutral-800 mx-4'>
                            <p className='text-center font-SF text-lg p-5 dark:text-white'>
                                Avant de penser régime ou végétarisme, il faut remonter à la source de cette grande mascarade alimentaire. Le vrai commencement. Un point de départ fondamental dont personne ne parle, et pourtant indispensable pour tout comprendre. Ce livre révèle des vérités que beaucoup ignorent, non pas par négligence, mais parce qu'on les a soigneusement passées sous silence.
                            </p>
                            <div className="grid place-items-center py-5">
                                <div className="inline-flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-300">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    
                    <SwiperSlide className='flex justify-center items-center'>
                        <div className='bg-gray-200 rounded-4xl dark:bg-neutral-800 mx-4'>
                            <p className='text-center font-SF text-lg p-5 dark:text-white'>
                                Un déclic immédiat. Ce livre ne donne pas des conseils en plus, il change complètement la façon de voir l'alimentation.
                            </p>
                            <div className="grid place-items-center py-5">
                                <div className="inline-flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-300">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    
                    <SwiperSlide className='flex justify-center items-center'>
                        <div className='bg-gray-200 rounded-4xl dark:bg-neutral-800 mx-4'>
                            <p className='text-center font-SF text-lg p-5 dark:text-white'>
                                Nutrition Antifragile est un livre vraiment complet, accessible et passionnant. Je l'ai dévoré en 2 jours. Les encadrés scientifiques permettent de creuser sans jamais devenir trop technique. J'ai découvert des produits souvent oubliés comme le bouillon d'os. Une mine d'or d'infos sans filtre, que je recommande sans hésiter.
                            </p>
                            <div className="grid place-items-center py-5">
                                <div className="inline-flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-300">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            
     
        </section>
    );
}

export default BookSection;
