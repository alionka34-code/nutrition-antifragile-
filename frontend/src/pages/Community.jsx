import React from 'react';
import { Helmet } from 'react-helmet';
import livre from '../assets/images/livre.png';
import NavCommunity from '../components/NavCommunity';
import PremiumOverlay from '../components/PremiumOverlay';

function Community() {
    return (
        <>
        <Helmet>
            <title>Communauté Nutrition Antifragile | notre communauté de passionnés de nutrition</title>
            <meta name="description" content="Découvrez notre communauté engagée autour de la nutrition antifragile. Partagez vos expériences, posez vos questions et échangez avec d'autres passionnés." />
        </Helmet>
        <NavCommunity />
        <PremiumOverlay>
        <main className='pt-8 pb-16 px-4 md:px-8 max-w-5xl mx-auto flex flex-col gap-8'>

            {/* Carte de bienvenue */}
            <div className='rounded-3xl border border-white/40 dark:border-white/15 bg-white/20 dark:bg-white/10 backdrop-blur-xl ring-1 ring-black/5 shadow-lg p-8 md:p-10'>
                <h1 className='font-SFBold text-2xl md:text-3xl text-gray-900 dark:text-white tracking-tight mb-4'>Bienvenue dans la Communauté Nutrition Antifragile !</h1>
                <p className='font-SF text-lg text-gray-600 dark:text-gray-300 mb-6'>Tu es au bon endroit. Voilà comment naviguer :</p>
                <ul className='space-y-3 mb-8'>
                    <li className='font-SF text-lg flex items-center gap-3 text-gray-700 dark:text-gray-200'>
                        <span className='text-xl'>🗂</span>
                        <span><strong>Les dossiers vidéos</strong> — commence par là</span>
                    </li>
                    <li className='font-SF text-lg flex items-center gap-3 text-gray-700 dark:text-gray-200'>
                        <span className='text-xl'>📄</span>
                        <span><strong>Les guides</strong> — fiches PDF pratiques</span>
                    </li>
                    <li className='font-SF text-lg flex items-center gap-3 text-gray-700 dark:text-gray-200'>
                        <span className='text-xl'>🔬</span>
                        <span><strong>Les analyses</strong> — pour aller plus loin</span>
                    </li>
                </ul>
                <div className='border-t border-beige2 dark:border-neutral-700 pt-6'>
                    <p className='font-SF text-lg text-gray-600 dark:text-gray-300 mb-4'>Une question ? Une adresse à partager ? Une recette ?</p>
                    <a
                        href="https://t.me/+V9qod5xicHM1ZDg0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className='inline-block font-SFBold text-white dark:text-[#6e4f24] px-8 py-3.5 rounded-full bg-[#6e4f24] dark:bg-beige1 hover:bg-[#5a4020] dark:hover:bg-white transition-colors duration-300 shadow-md'
                    >
                        👉 Rejoindre le groupe Telegram
                    </a>
                </div>
            </div>

            {/* Carte livre */}
            <div className='rounded-3xl border border-white/40 dark:border-white/15 bg-white/20 dark:bg-white/10 backdrop-blur-xl ring-1 ring-black/5 shadow-lg p-8 md:p-10 flex flex-col md:flex-row gap-10 items-center'>
                <div className='shrink-0 rounded-2xl border border-white/40 dark:border-white/15 bg-white/20 dark:bg-white/10 backdrop-blur-xl ring-1 ring-black/5 p-5 shadow-lg'>
                    <img src={livre} alt="Livre Nutrition Antifragile" className='w-40 md:w-48 h-auto object-contain drop-shadow-xl' />
                </div>
                <div className='flex flex-col gap-4'>
                    <h2 className='font-SFBold text-2xl md:text-3xl text-gray-900 dark:text-white tracking-tight'>Mon livre</h2>
                    <p className='font-SF text-lg text-gray-600 dark:text-gray-300 leading-relaxed'>
                        Une plongée lucide dans les coulisses du « bien manger » moderne. Et si votre intuition nutritionnelle avait été reconditionnée depuis l’enfance ? Ce que vous mettez dans votre assiette influence bien plus que votre corps : il façonne votre mental, vos habitudes et même vos envies. Nutrition Antifragile dévoile les dérives de l’alimentation moderne, les manipulations de l’industrie et les mythes qui ont transformé le « manger sain » en machine à sous.
                    </p>
                    <p className='font-SF text-lg text-gray-600 dark:text-gray-300 leading-relaxed'>
                        Reprenez le contrôle et transformez votre quotidien, un repas à la fois.
                    </p>
                    <button
                        onClick={() => window.location.href = "https://amzn.eu/d/2ZR5MMo"}
                        className='self-start mt-2 font-SFBold text-white dark:text-[#6e4f24] px-8 py-3.5 rounded-full bg-[#6e4f24] dark:bg-beige1 hover:bg-[#5a4020] dark:hover:bg-white transition-colors duration-300 shadow-md'
                    >
                        Découvrir le livre sur Amazon
                    </button>
                </div>
            </div>

        </main>
        </PremiumOverlay>
        </>
    )
}
export default Community;
