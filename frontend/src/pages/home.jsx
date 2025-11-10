import React from 'react';
import HomeHeader from '../components/home/HomeHeader';
import BookSection from '../components/home/BookSection';
import ProfilSection from '../components/home/ProfilSection'; 
import MemberSection from '../components/home/MemberSection'; 
import{ Helmet } from "react-helmet";


function Home() {
    return (
        <>
        <Helmet>
            <title> Entreprise | Nutrition Antifragile | Santé durable & bien-être</title>
            <meta name="description" content="Découvrez Nutrition Antifragile : des conseils et ressources pour une santé durable et un corps antifragile." />
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
