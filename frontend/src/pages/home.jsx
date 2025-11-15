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
        <main>
        <HomeHeader />
        <BookSection />
        <ProfilSection />
        <MemberSection />
        </main>
        
    </>
    );
}
export default Home;
