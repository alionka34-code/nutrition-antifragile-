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
        <main className='pt-8 flex flex-col md:flex-row gap-10 mx-4 md:mx-auto md:max-w-6xl'>
        <div className='text-white p-4 border-1 border-gray-300 rounded-lg bg-degrade-marron shadow-lg dark:bg-neutral-800 dark:border-neutral-500'>
            <h1 className='font-SFBold text-2xl'>🔥 Bienvenue dans la Communauté Antifragile !</h1>
            <p className='font-SF text-xl mt-8'>Tu es au bon endroit. Voilà comment naviguer :<br/>
🗂 Les dossiers vidéos : commence par là<br/>
📄 Les guides : fiches PDF pratiques<br/>
🔬 Les analyses : pour aller plus loin<br/>Une question ? Une adresse à partager ? Une recette ? 👉 [Rejoindre le groupe Telegram]</p>
        </div>
        <aside className='md:w-2/3 p-4 border-1 border-gray-300 rounded-lg shadow-lg dark:bg-neutral-800 dark:border-neutral-500'>
            <div>
                    <img src= {livre} className='w-full max-w-sm mt-4 rounded-lg shadow-lg' />
            
                <button onClick={() => window.location.href = "https://amzn.eu/d/2ZR5MMo"} className='mt-4 inline-block bg-marron text-white px-6 py-3 rounded-xl hover:bg-opacity-80 transition-all'>Découvrir le livre sur Amazon</button>            
                
            </div>

        </aside>
        </main>
        </PremiumOverlay>
        </>
    )
}
export default Community;
