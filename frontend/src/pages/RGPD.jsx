import React from "react";
import { Helmet } from "react-helmet";
function RGPD(){
    return(
        <>
        <Helmet>
  <title>Politique de confidentialité / RGPD | Nutrition Antifragile</title>
  <meta 
    name="description" 
    content="Découvrez la politique de confidentialité de Nutrition Antifragile et comment nous protégeons vos données personnelles conformément au RGPD." 
  />
</Helmet>

        <header>
            <h1 className="text-center text-4xl md:text-6xl font-SFBold pt-10  dark:text-white">Politique de confidentialité et RGPD</h1>
        </header>
        <div className="md:mx-40 mx-4 py-8  dark:text-white">
            <h1 className="text-2xl font-SFBold mb-4">Collecte et utilisation des données personnelles</h1>
            <p className="font-SF mb-4">Nous collectons des données personnelles telles que votre nom, adresse e-mail, et informations de paiement lorsque vous vous inscrivez à un abonnement ou contactez notre service client. Ces données sont utilisées pour gérer votre compte, traiter vos paiements, et améliorer nos services.</p>
            <h1 className="text-2xl font-SFBold mt-8 mb-4">Partage des données</h1>
            <p className="font-SF mb-4">Nous ne partageons pas vos données personnelles avec des tiers, sauf si cela est nécessaire pour fournir nos services (par exemple, avec des processeurs de paiement) ou si la loi l'exige.</p>
            <h1 className="text-2xl font-SFBold mt-8 mb-4">Sécurité des données</h1>
            <p className="font-SF mb-4">Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre l'accès non autorisé, la divulgation, ou la destruction.</p>
            <h1 className="text-2xl font-SFBold mt-8 mb-4">Vos droits</h1>
            <p className="font-SF mb-4">Conformément au RGPD, vous avez le droit d'accéder à vos données personnelles, de les rectifier, de demander leur suppression, et de vous opposer à leur traitement. Pour exercer ces droits, veuillez nous contacter à l'adresse suivante :  editions@symbiose-audiovisuelle.fr </p>         
            <h1 className="text-2xl font-SFBold mt-8 mb-4">Cookies</h1>
            <p className="font-SF mb-4">Ce site utilise des cookies pour gérer les sessions et les abonnements utilisateurs. Ces cookies sont nécessaires au fonctionnement du site.</p>      
            <h1 className="text-2xl font-SFBold mt-8 mb-4">Public mineur</h1>
            <p className="font-SF mb-4">Les services sont réservés aux personnes majeures. Les mineurs doivent obtenir l’autorisation de leurs parents ou tuteurs légaux.</p> 
            <h1 className="text-2xl font-SFBold mt-8 mb-4">Accès et partage</h1>
            <p className="font-SF mb-4">Nous ne vendons ni ne louons vos données personnelles à des tiers. Nous pouvons partager des données agrégées et anonymisées à des fins analytiques.</p>
        </div>
        </>
    
    );
}

export default RGPD;