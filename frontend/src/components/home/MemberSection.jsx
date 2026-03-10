import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../../styles/swiper-custom.css";
import { fetchArticles } from '../../utils/api';
import avis1 from  '../../assets/images/avis1.jpg';
import avis2 from  '../../assets/images/avis2.jpg';
import avis3 from  '../../assets/images/avis3.jpg';
import avis4 from  '../../assets/images/avis4.jpg';
import avis5 from  '../../assets/images/avis5.jpg';
import avis6 from  '../../assets/images/avis6.jpg';
import avis7 from  '../../assets/images/avis7.jpg';
import avis8 from  '../../assets/images/avis8.jpg';
import avis9 from  '../../assets/images/avis9.jpg';
import avis10 from  '../../assets/images/avis10.jpg';
import avis11 from  '../../assets/images/avis11.jpg';
import avis12 from  '../../assets/images/avis12.jpg';
import avis13 from  '../../assets/images/avis13.jpg';
import avis14 from  '../../assets/images/avis14.jpg';
import avis15 from  '../../assets/images/avis15.jpg';

const avisImages = [
    avis1, avis2, avis3, avis4, avis5, avis6, avis7, avis8,
    avis9, avis10, avis11, avis12, avis13, avis14, avis15,
    avis1, avis2, avis3, avis4, avis5, avis6, avis7, avis8,
    avis9, avis10, avis11, avis12, avis13, avis14, avis15,
];

function MemberSection() {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchArticles().then(setArticles).catch(() => {});
    }, []);

    return (
        <section className="mt-24">

            {/* Header */}
            <div className="text-center px-4">
                <h2 className="font-SFBold text-4xl md:text-7xl dark:text-white">DEVENIR MEMBRE</h2>
                <p className="font-SFBold text-xl md:text-2xl text-marron mt-3">La vérité sur ton assiette</p>
                <p className="font-SFBold text-marron mt-2 text-base md:text-lg tracking-widest">0 FILTRE · 0 DOGME · 0 BULLSHIT</p>
            </div>

            {/* Articles */}
            {articles.length > 0 && (
                <div className="mx-4 md:mx-20 mt-10">
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
                    className="font-SFBold text-white text-base md:text-xl px-10 py-4 rounded-full bg-gradient-to-tr from-peach to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 shadow-md"
                >
                    DEVENIR MEMBRE ANTIFRAGILE
                </button>
            </div>

            {/* Avis photos */}
            <div className="mx-4 md:mx-20 mt-14">
                <h3 className="text-center font-SFBold text-marron text-2xl md:text-3xl mb-8">Ils ont rejoint la communauté</h3>
                <Swiper
                    rewind={true}
                    slidesPerView={1}
                    grid={{ rows: 2 }}
                    spaceBetween={16}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    breakpoints={{
                        768: { slidesPerView: 3, spaceBetween: 16 },
                    }}
                    modules={[Grid, Pagination, Autoplay]}
                    className="mySwiper pb-10"
                >
                    {avisImages.map((src, i) => (
                        <SwiperSlide key={i}>
                            <img src={src} alt={`avis-${i + 1}`} className="rounded-xl w-full object-cover" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </section>
    );
}

export default MemberSection;
