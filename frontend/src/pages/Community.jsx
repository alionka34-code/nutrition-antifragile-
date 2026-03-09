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
            <div className='bg-marron text-white p-6 md:p-8 rounded-2xl shadow-lg'>
                <h1 className='font-SFBold text-2xl md:text-3xl mb-4'>Bienvenue dans la Communauté Nutrition Antifragile !</h1>
                <p className='font-SF text-lg mb-6 opacity-90'>Tu es au bon endroit. Voilà comment naviguer :</p>
                <ul className='space-y-3 mb-8'>
                    <li className='font-SF text-lg flex items-center gap-3'>
                        <span className='text-xl'>🗂</span>
                        <span><strong>Les dossiers vidéos</strong> — commence par là</span>
                    </li>
                    <li className='font-SF text-lg flex items-center gap-3'>
                        <span className='text-xl'>📄</span>
                        <span><strong>Les guides</strong> — fiches PDF pratiques</span>
                    </li>
                    <li className='font-SF text-lg flex items-center gap-3'>
                        <span className='text-xl'>🔬</span>
                        <span><strong>Les analyses</strong> — pour aller plus loin</span>
                    </li>
                </ul>
                <div className='border-t border-white/30 pt-6'>
                    <p className='font-SF text-lg mb-4 opacity-90'>Une question ? Une adresse à partager ? Une recette ?</p>
                    <a
                        href="https://t.me/joinchat/AAAAAEj8n9sXoQy7l3c5w"
                        target="_blank"
                        rel="noopener noreferrer"
                        className='inline-block bg-white text-marron font-SFBold px-6 py-3 rounded-full transition-all duration-200 hover:bg-peach hover:text-white hover:scale-105 active:scale-95'
                    >
                        👉 Rejoindre le groupe Telegram
                    </a>
                </div>
            </div>

            {/* Carte livre */}
            <div className='bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-600 rounded-2xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center'>
                <img src={livre} alt="Livre Nutrition Antifragile" className='w-48 md:w-56 rounded-xl shadow-md flex-shrink-0' />
                <div className='flex flex-col gap-4'>
                    <h2 className='font-SFBold text-2xl dark:text-white'>Mon livre — disponible sur Amazon</h2>
                    <p className='font-SF text-lg text-gray-600 dark:text-gray-300'>
                        Un guide complet pour comprendre les bases de la nutrition intelligente et mettre en place une alimentation qui te rendra plus fort, plus résilient et plus performant au quotidien.
                    </p>
                    <p className='font-SF text-lg text-gray-600 dark:text-gray-300'>
                        Des explications claires, des conseils pratiques et des stratégies concrètes pour devenir plus résilient face aux défis nutritionnels du quotidien.
                    </p>
                    <button
                        onClick={() => window.location.href = "https://amzn.eu/d/2ZR5MMo"}
                        className='self-start mt-2 bg-marron text-white font-SFBold px-6 py-3 rounded-full transition-all duration-200 hover:bg-opacity-80 hover:scale-105 active:scale-95'
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
