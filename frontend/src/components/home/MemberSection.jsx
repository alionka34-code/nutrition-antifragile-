import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../../styles/swiper-custom.css";
import { PlayCircle, Brain, Leaf, MessagesSquare } from 'lucide-react';
import { fetchArticles } from '../../utils/api';
import TestimonialStack from '../landing/TestimonialStack';
import testimonials from '../../data/testimonials';

function MemberSection() {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchArticles().then(setArticles).catch(() => {});
    }, []);

    return (
        <section className="mt-24">

            {/* En-tête de section */}
            <div className="text-center max-w-3xl mx-auto px-4">
                <p className="font-SFBold text-marron tracking-[0.25em] text-sm md:text-base mb-3">L'ABONNEMENT</p>
                <h2 className="font-SFBold text-3xl md:text-5xl text-gray-900 dark:text-white leading-tight">
                    Rejoins la communauté <span className="text-marron">Antifragile</span>.
                </h2>
                <p className="font-SFBold text-marron mt-4 text-base md:text-lg tracking-widest">0 FILTRE · 0 DOGME · 0 BULLSHIT</p>
            </div>

            {/* Ce que comprend l'abonnement */}
            <div className="max-w-4xl mx-auto px-4 mt-14">
                <div className="rounded-3xl border border-white/40 dark:border-white/15 bg-white/20 dark:bg-white/10 backdrop-blur-xl ring-1 ring-black/5 shadow-lg p-8 md:p-10">
                    <h3 className="font-SFBold text-xl md:text-2xl text-gray-900 dark:text-white text-center md:text-left mb-8">
                        Ce que comprend l'abonnement
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7">
                        {[
                            { icon: PlayCircle, title: "Vidéos exclusives", desc: "Des analyses approfondies et des contenus réservés aux membres." },
                            { icon: Brain, title: "Croyances déconstruites", desc: "Les mythes nutritionnels passés au crible de la physiologie." },
                            { icon: Leaf, title: "Ressources concrètes", desc: "Pour une alimentation simple, cohérente et adaptée au vivant." },
                            { icon: MessagesSquare, title: "Groupe Telegram", desc: "Pose tes questions et échange directement avec la communauté." },
                        ].map((f, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <span className="shrink-0 w-10 h-10 rounded-xl bg-marron/10 text-marron flex items-center justify-center">
                                    <f.icon size={20} strokeWidth={2} />
                                </span>
                                <div>
                                    <p className="font-SFBold text-gray-900 dark:text-white">{f.title}</p>
                                    <p className="font-SF text-sm text-gray-600 dark:text-gray-300 mt-0.5 leading-relaxed">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-9 flex justify-center md:justify-start">
                        <button
                            onClick={() => navigate('/abonnement')}
                            className="font-SFBold text-white dark:text-[#6e4f24] text-base md:text-lg px-8 py-3.5 rounded-full bg-[#6e4f24] dark:bg-beige1 hover:bg-[#5a4020] dark:hover:bg-white transition-colors duration-300 shadow-md"
                        >
                            Découvrir l'abonnement
                        </button>
                    </div>
                </div>
            </div>

            {/* Articles */}
            {articles.length > 0 && (
                <div className="max-w-6xl mx-auto px-4 mt-12">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1}
                        rewind={true}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        breakpoints={{
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="pb-10"
                    >
                        {articles.map((article) => (
                            <SwiperSlide key={article.id}>
                                <Link
                                    to={`/articles/${article.slug}`}
                                    className="group bg-white dark:bg-neutral-800 border-2 border-beige2 dark:border-neutral-700 rounded-2xl overflow-hidden hover:border-marron hover:shadow-lg transition-all block my-6"
                                >
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-52 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="font-SFBold text-lg text-gray-800 dark:text-white group-hover:text-marron transition-colors">{article.title}</h3>
                                        <p className="font-SF text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            {new Date(article.published_at).toLocaleDateString("fr-FR")}
                                        </p>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}

            {/* CTA */}
            <div className="text-center mt-8 px-4">
                <button
                    onClick={() => navigate('/abonnement')}
                    className="font-SFBold text-white dark:text-[#6e4f24] text-base md:text-lg px-8 py-3.5 rounded-full bg-[#6e4f24] dark:bg-beige1 hover:bg-[#5a4020] dark:hover:bg-white transition-colors duration-300 shadow-md"
                >
                    DEVENIR MEMBRE ANTIFRAGILE
                </button>
            </div>

            {/* Avis de la communauté */}
            <div className="mx-4 md:mx-auto md:max-w-4xl mt-20">
                <h3 className="text-center font-SFBold text-marron text-2xl md:text-3xl mb-3">Ils ont rejoint la communauté</h3>
                <p className="text-center font-SF text-gray-500 dark:text-gray-400 mb-10">Glisse les cartes pour parcourir leurs messages</p>
                <TestimonialStack testimonials={testimonials} maxWidth="56rem" />
            </div>

        </section>
    );
}

export default MemberSection;
