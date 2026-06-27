import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import headerImage from '../../assets/images/headerimage.png';
import '../../styles/hero-motion.css';

function HomeHeader() {
    const navigate = useNavigate();

    return (
        <header className="relative -mt-16 overflow-hidden">

            {/* Marque (alignée sur la ligne de nav) */}
            <Link
                to="/"
                className="hero-reveal absolute top-0 left-5 md:left-10 h-16 z-30 flex flex-col justify-center items-start text-left"
            >
                <span className="font-SFBold text-marron text-xs md:text-base tracking-wide whitespace-nowrap">
                    ALIONKA HOUL — NOURRIR AVEC L'INSTINCT
                </span>
                <span className="font-SF text-gray-400 dark:text-gray-500 text-[10px] md:text-xs whitespace-nowrap">
                    ISSN 3098-7113
                </span>
            </Link>

            {/* Mouvement de fond ambiant */}
            <div className="hero-motion">
                <div className="hero-orb hero-orb--1" />
                <div className="hero-orb hero-orb--2" />
                <div className="hero-orb hero-orb--3" />
            </div>

            <section className="relative z-10 px-4 pt-28 pb-16 text-center">
                <div className="mx-auto max-w-5xl flex flex-col items-center gap-7 sm:gap-9">

                    {/* Badge */}
                    <button
                        onClick={() => navigate('/livre')}
                        className="hero-reveal hero-reveal-1 inline-flex items-center gap-2 rounded-full border border-marron/30 bg-white/40 dark:bg-white/10 backdrop-blur px-4 py-1.5 shadow-sm hover:border-marron/60 transition-colors"
                    >
                        <span className="font-SFBold text-marron tracking-[0.2em] text-xs">0 FILTRE · 0 DOGME · 0 BULLSHIT</span>
                        <ArrowRight className="h-3 w-3 text-marron" />
                    </button>

                    {/* Titre */}
                    <h1 className="hero-reveal hero-reveal-2 font-SFBold text-4xl sm:text-6xl md:text-7xl leading-[1.1] tracking-tight text-neutral-900 dark:text-white max-w-4xl">
                        Reprenez le pouvoir sur votre{' '}
                        <span className="text-[#e07b39] dark:text-[#f0915a]">alimentation</span>
                    </h1>

                    {/* Description */}
                    <p className="hero-reveal hero-reveal-3 max-w-2xl font-SF text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        Un livre et une communauté pour réapprendre à vous nourrir
                        selon votre instinct, loin de l'industrie — sans dogme ni marketing.
                    </p>

                    {/* Actions */}
                    <div className="hero-reveal hero-reveal-4 flex flex-col sm:flex-row items-center gap-3">
                        <button
                            onClick={() => navigate('/abonnement')}
                            className="font-SFBold text-white dark:text-[#6e4f24] text-base md:text-lg px-8 py-3.5 rounded-full bg-[#6e4f24] dark:bg-beige1 hover:bg-[#5a4020] dark:hover:bg-white transition-colors duration-300 shadow-md inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                        >
                            Rejoindre la communauté
                            <ArrowRight className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => navigate('/livre')}
                            className="font-SFBold text-[#6e4f24] dark:text-beige1 text-base md:text-lg px-8 py-3.5 rounded-full border-2 border-[#6e4f24] dark:border-beige1 hover:bg-[#6e4f24] hover:text-white dark:hover:bg-beige1 dark:hover:text-[#6e4f24] transition-colors duration-300 w-full sm:w-auto text-center"
                        >
                            Voir le livre
                        </button>
                    </div>

                    {/* Image dans un cadre « mockup » + glow */}
                    <div className="hero-reveal hero-reveal-5 relative w-full pt-10">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 w-[70%] h-48 rounded-full bg-peach/40 blur-3xl"
                        />
                        <div className="relative mx-auto w-full max-w-5xl rounded-xl border border-white/40 dark:border-white/15 bg-white/30 dark:bg-white/5 backdrop-blur-xl ring-1 ring-black/5 shadow-2xl overflow-hidden">
                            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/30 dark:border-white/10">
                                <span className="w-3 h-3 rounded-full bg-red-400/70" />
                                <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                                <span className="w-3 h-3 rounded-full bg-green-400/70" />
                            </div>
                            <img
                                src={headerImage}
                                alt="Aperçu de la plateforme Nutrition Antifragile"
                                className="w-full h-auto block"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </header>
    );
}

export default HomeHeader;
