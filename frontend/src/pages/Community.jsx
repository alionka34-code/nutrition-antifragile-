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
            <h1 className='font-SFBold text-2xl'>🔥 Bienvenue dans la Communauté Nutrition Antifragile ! 🔥</h1>
            <p className='font-SF text-xl mt-8'>Je suis ravi de t’accueillir ici.<br/>Tu viens d’entrer dans un espace dédié à la nutrition intelligente, durable et performante.</p>
            <p className='font-SF text-xl mt-4 '>Ici, tu vas apprendre:</p>
            <li className='font-SF text-xl mt-4 list-none'>🥗 Comprendre les bases réelles de la nutrition (sans bullshit marketing)</li>
            <li className='font-SF text-xl list-none'>🧠 Optimiser ton énergie, ta concentration et ta récupération</li>
            <li className='font-SF text-xl list-none'>💪 Améliorer ta composition corporelle durablement</li>
            <li className='font-SF text-xl list-none'>📊 Mettre en place un système simple et efficace adapté à TON mode de vie</li>
            <li className='font-SF text-xl list-none'>🚀 Développer une approche antifragile : devenir plus fort grâce aux bonnes stratégies alimentaires</li>
            <h2 className='font-SFBold text-2xl mt-8 list-none'>Ce que trouveras dans la Communauté</h2>
            <li className='font-SF text-xl mt-4 list-none'>📚 Des articles approfondis sur la nutrition antifragile, la santé durable et l'alimentation consciente</li>
            <li className='font-SF text-xl mt-4 list-none'>🎥 Des vidéos explicatives et inspirantes pour t’aider à comprendre les concepts clés</li>
            <li className='font-SF text-xl mt-4 list-none'>💬 Un espace d’échange pour poser tes questions, partager tes expériences et apprendre des autres membres</li>
            <p className='font-SF text-xl mt-8'>Rejoindre la communauté, c’est faire le choix de s’entourer de personnes qui partagent les mêmes valeurs et objectifs en matière de nutrition. C’est aussi s’engager à apprendre, à expérimenter et à progresser ensemble vers une santé optimale.</p>
            <h2 className='font-SFBold text-2xl mt-8'>Rejoins mon groupe Telegram !</h2>
            <p className='font-SF text-xl mt-4'>Pour rejoindre la communauté, clique sur le lien ci-dessous et rejoins mon groupe Telegram dédié à la nutrition antifragile. C’est là que se passent les échanges les plus riches, les discussions les plus passionnantes et où tu pourras poser toutes tes questions en direct !</p>
            <a href="https://t.me/joinchat/AAAAAEj8n9sXoQy7l3c5w" target="_blank" rel="noopener noreferrer" className='mt-4 inline-block bg-marron text-white px-6 py-3 rounded-xl hover:bg-opacity-80 transition-all'>Rejoindre le groupe Telegram</a>
            <p className='font-SF text-xl mt-8'>Commence par te présenter sur Telegram pour que tu puisses partager tes objectifs et discuter avec les autres membres du groupe.</p>
        </div>
        <aside className='md:w-2/3 p-4 border-1 border-gray-300 rounded-lg shadow-lg dark:bg-neutral-800 dark:border-neutral-500'>
            <div>
                <h2 className='font-SFBold text-xl mt-8'>
                    Mon livre Nutrition antifragile
                    toujours disponible sur Amazon
                </h2>
                    <img src= {livre} className='w-full max-w-sm mt-4 rounded-lg shadow-lg' />
            
                <h2 className='font-SFBold text-md mt-4 list-none'>Si tu veux aller plus loin, mon livre "Nutrition Antifragile" est disponible sur Amazon. C’est un guide complet pour comprendre les bases de la nutrition intelligente et mettre en place une alimentation qui te rendra plus fort, plus résilient et plus performant au quotidien.</h2>
                <button onClick={() => window.location.href = "https://amzn.eu/d/2ZR5MMo"} className='mt-4 inline-block bg-marron text-white px-6 py-3 rounded-xl hover:bg-opacity-80 transition-all'>Découvrir le livre sur Amazon</button>
                <h2 className='font-SFBold text-md mt-4 list-none'>Dans ce livre, tu trouveras des explications claires et accessibles sur les principes de la nutrition antifragile, des conseils pratiques pour améliorer ton alimentation et ta santé, ainsi que des stratégies pour devenir plus résilient face aux défis nutritionnels du quotidien.</h2>
                <p className='font-SF text-md mt-4'>N’attends plus pour découvrir comment la nutrition peut devenir un véritable levier de performance et de bien-être dans ta vie. Commande ton exemplaire dès maintenant et commence à nourrir ton corps avec l’instinct !</p>            
                
            </div>

        </aside>
        </main>
        </PremiumOverlay>
        </>
    )
}
export default Community;