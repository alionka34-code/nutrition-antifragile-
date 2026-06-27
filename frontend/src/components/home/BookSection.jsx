import { useNavigate } from 'react-router-dom';
import livre from '../../assets/images/livre.png';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../../styles/swiper-custom.css";

const StarRating = () => (
    <div className="flex justify-center gap-0.5 py-4">
        {[...Array(5)].map((_, i) => (
            <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-400">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
        ))}
    </div>
);

const reviews = [
    "Nutrition Antifragile est un livre à la fois complet, accessible et passionnant. Il réussit le pari de mêler rigueur scientifique et clarté, sans jamais devenir trop technique. Les encadrés scientifiques rythment la lecture de manière intelligente, apportant des éclairages utiles sans alourdir le propos. La partie sur les aliments à privilégier est particulièrement intéressante : on y découvre des produits souvent oubliés ou mal compris, comme le kombucha, le riz noir, le pain au levain ou encore le bouillon d'os. C'est un ouvrage cohérent, bien ancré dans les préoccupations actuelles autour de l'alimentation, que je recommande sans hésiter.",
    "Des révélations qui ont enfin mis de la clarté sur tous mes échecs alimentaires passés. Je cherchais des solutions sans voir le vrai problème. « Je portais des œillères », comme le dit si justement l'auteure. Ce livre m'a offert une vraie prise de conscience. Merci.",
    "Avant de penser régime ou végétarisme, il faut remonter à la source de cette grande mascarade alimentaire. Ce livre révèle des vérités que beaucoup ignorent, non pas par négligence, mais parce qu'on les a soigneusement passées sous silence.",
    "Un déclic immédiat. Ce livre ne donne pas des conseils en plus, il change complètement la façon de voir l'alimentation.",
    "Nutrition Antifragile est un livre vraiment complet, accessible et passionnant. Je l'ai dévoré en 2 jours. Une mine d'or d'infos sans filtre, que je recommande sans hésiter.",
];

function BookSection() {
    const navigate = useNavigate();

    return (
        <section className="mt-16 md:mt-24">

            {/* En-tête de section */}
            <div className="text-center max-w-4xl mx-auto mb-16 px-6">
                <p className="font-SFBold text-marron tracking-[0.25em] text-sm md:text-base mb-3">LE LIVRE</p>
                <h2 className="font-SFBold text-3xl md:text-5xl text-gray-900 dark:text-white leading-[1.1] tracking-tight md:whitespace-nowrap">
                    Comprendre votre assiette,
                    <br /> une bonne fois pour <span className="text-marron">toutes</span>.
                </h2>
            </div>

            {/* Livre + présentation */}
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-14 md:gap-24 items-start">
                <div className="md:col-span-5">
                    <div className="md:sticky md:top-24">
                        <div className="w-2/3 mx-auto md:w-4/5 rounded-2xl border border-white/40 dark:border-white/15 bg-white/20 dark:bg-white/10 backdrop-blur-xl ring-1 ring-black/5 p-6 shadow-lg">
                            <img
                                src={livre}
                                alt="Livre Nutrition Antifragile"
                                className="w-full h-auto object-contain drop-shadow-xl"
                            />
                        </div>
                    </div>
                </div>

                <div className="md:col-span-7 space-y-8 text-center md:text-left">
                    <h3 className="font-SFBold text-2xl md:text-3xl text-gray-900 dark:text-white tracking-tight leading-snug">
                        La pilule rouge de l'alimentation
                    </h3>
                    <p className="font-SF text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        Le seul livre qui dévoile comment l'industrie alimentaire a reprogrammé votre rapport à la nourriture, pour faire de vous un consommateur dépendant.
                    </p>

                    <div>
                        <p className="font-SFBold text-gray-900 dark:text-white mb-4">Vous découvrirez :</p>
                        <ul className="space-y-4">
                            {[
                                "Pourquoi les aliments « healthy » vous maintiennent faible",
                                "Les pièges mentaux intégrés dès l'enfance",
                                "Retrouver votre instinct le plus primaire",
                            ].map((text, i) => (
                                <li key={i} className="flex items-start gap-3 justify-center md:justify-start">
                                    <span className="text-marron mt-1 shrink-0">→</span>
                                    <span className="font-SF text-lg text-gray-600 dark:text-gray-300 text-left">{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                        <button
                            onClick={() => window.location.href = "https://amzn.eu/d/2ZR5MMo"}
                            className="font-SFBold text-white dark:text-[#6e4f24] text-base md:text-lg px-8 py-3.5 rounded-full bg-[#6e4f24] dark:bg-beige1 hover:bg-[#5a4020] dark:hover:bg-white transition-colors duration-300 shadow-md"
                        >
                            Acheter le livre
                        </button>
                        <button
                            onClick={() => navigate("/Extrait")}
                            className="font-SFBold text-[#6e4f24] dark:text-beige1 text-base md:text-lg px-8 py-3.5 rounded-full border-2 border-[#6e4f24] dark:border-beige1 hover:bg-[#6e4f24] hover:text-white dark:hover:bg-beige1 dark:hover:text-[#6e4f24] transition-colors duration-300"
                        >
                            Lire un extrait
                        </button>
                    </div>
                </div>
            </div>

            {/* Citation centrale */}
            <div className="mt-16 mx-4 md:mx-auto md:max-w-4xl text-center">
                <p className="font-SFBold text-marron text-2xl md:text-4xl">
                    De chasseur-cueilleur à victime de l'industrie : il est temps de reprendre le contrôle.
                </p>
            </div>

            {/* Deux parties */}
            <div className="mt-24 max-w-6xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <p className="font-SFBold text-marron tracking-[0.25em] text-sm md:text-base mb-3">LE CONTENU</p>
                    <h3 className="font-SFBold text-3xl md:text-4xl text-gray-900 dark:text-white tracking-tight leading-[1.1]">Deux parties pour tout comprendre</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-12 md:gap-20">
                    {[
                        {
                            title: "PARTIE 1 : CE QUI VOUS REND FAIBLE",
                            subtitle: "Découvrez l'évolution alimentaire, les mensonges de l'industrie et les 11 aliments « santé » à éviter",
                            chapters: [
                                { title: "Chapitre 1 : Évolution de l'alimentation", desc: "De chasseurs-cueilleurs à victimes de l'industrie : comment nous avons perdu notre instinct alimentaire." },
                                { title: "Chapitre 2 : On vous ment depuis le début", desc: "Programmation dès 6 ans, supermarché, petit-déjeuner « essentiel », greenwashing : décryptage des manipulations quotidiennes." },
                                { title: "Chapitre 3 : Aliments à éviter", desc: "Pain moderne, steaks végétaux, huiles de graines… : ce que l'industrie vous cache vraiment sur ces poisons." },
                            ],
                        },
                        {
                            title: "PARTIE 2 : CE QUI VOUS REND FORT",
                            subtitle: "Redécouvrez les fondements d'une alimentation antifragile et naturelle",
                            chapters: [
                                { title: "Chapitre 4 : Comprendre pour mieux choisir", desc: "Corps-Esprit-Énergie : les fondements oubliés d'une alimentation antifragile et naturelle." },
                                { title: "Chapitre 5 : Aliments à privilégier", desc: "Redécouvrir les vrais aliments diabolisés par l'industrie." },
                                { title: "Chapitre 6 : Le jeûne, l'art de se soigner à travers les siècles", desc: "Découvrez cette pratique millénaire pour retrouver votre force naturelle." },
                            ],
                        },
                    ].map((part, pi) => (
                        <div key={pi} className="space-y-6">
                            <div>
                                <h4 className="font-SFBold text-marron text-lg md:text-xl">{part.title}</h4>
                                <p className="mt-2 font-SF text-gray-600 dark:text-gray-300 leading-relaxed">{part.subtitle}</p>
                            </div>
                            <div className="space-y-5">
                                {part.chapters.map((ch, ci) => (
                                    <div key={ci} className="border-l-2 border-marron/50 pl-5">
                                        <h5 className="font-SFBold text-gray-900 dark:text-white">{ch.title}</h5>
                                        <p className="mt-1 font-SF text-gray-600 dark:text-gray-300 leading-relaxed">{ch.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Avis lecteurs */}
            <div className="mt-24 px-4 max-w-6xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <p className="font-SFBold text-marron tracking-[0.25em] text-sm md:text-base mb-3">LES AVIS</p>
                    <h3 className="font-SFBold text-3xl md:text-4xl text-gray-900 dark:text-white tracking-tight leading-[1.1]">Ce qu'en pensent les lecteurs</h3>
                </div>
                <Swiper
                    rewind={true}
                    centeredSlides={true}
                    slidesPerView={1}
                    autoHeight={true}
                    autoplay={{ delay: 8000, disableOnInteraction: false }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    breakpoints={{ 768: { slidesPerView: 3, spaceBetween: 20 } }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper pb-10"
                >
                    {reviews.map((text, i) => (
                        <SwiperSlide key={i} className="flex justify-center items-center">
                            <div className="bg-white/20 dark:bg-white/10 backdrop-blur-xl border border-white/40 dark:border-white/15 ring-1 ring-black/5 rounded-2xl mx-2 px-6 pt-6 shadow-lg">
                                <p className="font-SF text-base text-gray-700 dark:text-gray-200 text-center leading-relaxed">{text}</p>
                                <StarRating />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </section>
    );
}

export default BookSection;
