import React from 'react';
import HomeHeader from '../components/home/HomeHeader';
import ProfilSection from '../components/home/ProfilSection'; 
import BookSection from '../components/home/BookSection';
import MemberSection from '../components/home/MemberSection'; 
import{ Helmet } from "react-helmet";


function Home() {
    return (
        <>
        <Helmet>
            <title> Accueil | Nutrition Antifragile | Santé durable & bien-être</title>
            <meta name="description" content="Découvrez Nutrition Antifragile : des conseils et ressources pour une santé durable et un corps antifragile." />
            <link rel="canonical" href="https://alionka-houl.eo.symbiose-audiovisuelle.fr/" />

        </Helmet>
        <div className="relative">
               <main>
                <HomeHeader />
                <ProfilSection />
                <BookSection />
                <MemberSection />
                </main> 
            {/* Effet de flou pour les sections en dessous du header 
            <div className="blur-sm pointer-events-none select-none">
             
            </div>
            */}
            
            {/* Overlay de maintenance - à activer en cas de besoin 
            <div className="fixed inset-0 flex items-start justify-center pt-20 bg-white/60 dark:bg-neutral-900/70 z-[100]">
                <div className="text-center p-8 md:p-12 bg-white rounded-2xl shadow-2xl max-w-lg mx-4 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700">
                    <svg className="w-16 h-16 text-marron mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.192-.14 1.743" />
                    </svg>
                    <h2 className="text-2xl md:text-3xl font-SFBold text-marron mb-3">Site en maintenance</h2>
                    <p className="text-gray-600 font-SF text-lg dark:text-gray-300">
                        Nous travaillons actuellement sur le site pour vous offrir une meilleure expérience. Revenez bientôt !
                    </p>
                </div>
            </div>
            */}
            
        </div>
    </>
    );
}
export default Home;
