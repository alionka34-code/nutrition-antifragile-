import React from "react";
import { Helmet } from "react-helmet";

function CGU(){
    return(
        <>
        <Helmet>
  <title>Conditions générales d'utilisations| Nutrition Antifragile</title>
  <meta name="description" content="Lisez les conditions générales d'utilisation de Nutrition Antifragile pour comprendre vos droits et responsabilités en tant qu'utilisateur." />
</Helmet>

        <header >
            <h1 className="text-center text-4xl md:text-6xl font-SFBold pt-10  dark:text-white">Conditions générales d'utilisation</h1>
        </header>
        
        <div className="md:mx-40 mx-4 py-8  dark:text-white">
        <h1 className="text-2xl font-SFBold mb-4">Article 1: Objet</h1>
        <p className="font-SF mb-4">Les présentes CGU ont pour objet de définir les modalités d’accès et d’utilisation du site https://alionka-houl.eo.symbiose-audiovisuelle.fr</p>
        <h1 className="text-2xl font-SFBold mb-4">Article 2: Acces au site</h1>
        <p className="font-SF mb-4">L’accès au site est libre. Certaines parties du site (blog premium) sont réservées aux abonnés disposant d’un compte actif.</p>
        <h1 className="text-2xl font-SFBold mb-4">Article 3: Compte utilisateur</h1>
        <p className="font-SF mb-4">La création d’un compte nécessite la fourniture d’informations exactes. L’utilisateur s’engage à garder confidentiels ses identifiants et à ne pas les partager avec des tiers.</p>
        <h1 className="text-2xl font-SFBold mb-4">Article 4: Contenu utilisateur</h1>
        <p className="font-SF mb-4">Les utilisateurs peuvent commenter les articles du blog. Symbiose Audiovisuelle se réserve le droit de modérer ou supprimer tout contenu contraire à la loi, à ses statuts, à l’éthique ou aux présentes CGU.</p>
        <h1 className="text-2xl font-SFBold mb-4">Article 5: Propriété intellectuelle</h1>
        <p className="font-SF mb-4">L’ensemble du contenu du site (textes, images, vidéos) est protégé par le droit d’auteur et demeure la propriété exclusive de l’auteure, sauf mention contraire. Toute reproduction, diffusion ou réutilisation non autorisée est interdite.La gestion des œuvres est confiée à son éditeur Éditions Œuvres, marque éditoriale de Symbiose Audiovisuelle.</p>
        <h1 className="text-2xl font-SFBold mb-4">Article 6: Responsabilité</h1>
        <p className="font-SF mb-4">Symbiose Audiovisuelle ne saurait être tenue responsable en cas d’interruption du site, de dysfonctionnement, ou de force majeure.</p>
        <h1 className="text-2xl font-SFBold mb-4">Article 7: Droit applicable et juridiction compétente</h1>
        <p>Les présentes conditions générales d’utilisation sont régies par le droit français.En cas de litige et après tentative de résolution amiable, les tribunaux de Montpellier (France) seront seuls compétents.</p>

        </div>
        </>
    );


}

export default CGU;
