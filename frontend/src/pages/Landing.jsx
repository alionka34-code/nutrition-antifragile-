import React from "react";
import LandingHeader from "../components/landing/LandingHeader";
import SectionService from "../components/landing/SectionService";
import SectionTestimonial from "../components/landing/SectionTestimonial";
import SectionPrice from "../components/landing/SectionPrice";
import SectionForm from "../components/landing/SectionForm";
import SectionFaq from "../components/landing/SectionFaq";
import { Helmet } from "react-helmet";

function Landing() {
    return (
<>
<Helmet>
    <title>Entreprise | Nutrition Antifragile | Santé durable & bien-être</title>
    <meta name="description" content="Découvrez Nutrition Antifragile : des conseils et ressources pour une santé durable et un corps antifragile." />
</Helmet>
<main>
    <LandingHeader />
    <SectionService />
    <SectionTestimonial />
    <SectionPrice />
    <SectionForm />
    <SectionFaq />
</main>


</>
);
}

export default Landing;