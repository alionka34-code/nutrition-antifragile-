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
            <p className="font-SF mb-4">Des données personnelles telles que le nom, l’adresse e-mail et les informations de paiement sont collectées lors de l’inscription à un abonnement ou d’une prise de contact avec notre service.<br/>Ces données sont utilisées exclusivement pour la gestion des comptes utilisateurs, le traitement des paiements et l’amélioration des services proposés.</p>
            <h1 className="text-2xl font-SFBold mt-8 mb-4">Responsable du traitement</h1>
            <p className="font-SF mb-4">Le responsable du traitement des données personnelles est l’association Symbiose Audiovisuelle, sise à Montpellier (France).</p>
            <h1 className="text-2xl font-SFBold mt-8 mb-4">Données collectées</h1>
            <li className="font-SF mb-2">Dans le cadre de l’utilisation du site et des abonnements ;</li>
            <li className="font-SF mb-2">Données de paiement : traitées exclusivement par Stripe (aucune donnée bancaire n’est stockée par Symbiose Audiovisuelle) ;</li>
            <li className="font-SF mb-2">Données fournies via nos formulaires en ligne.</li>
            <p className="font-SF mb-4">Aucun cookie ni tracker publicitaire (Google Analytics, Meta Pixel) n’est utilisé sur le site.</p>
            <h1 className="text-2xl font-SFBold mt-8 mb-4">Finalités du traitement</h1>
            <p className="font-SF mb-4">Les données collectées sont utilisées pour :</p>     
            <li className="font-SF mb-2">Gérer les abonnements et paiements ;</li>
            <li className="font-SF mb-2">Permettre l’accès au contenu premium du blog ;</li>
            <li className="font-SF mb-2">Communiquer avec les membres qui sollicitent ce service ;</li>
            <li className="font-SF mb-2">Organiser des sessions individuelles (via le formulaire en ligne).</li>
                
            <h1 className="text-2xl font-SFBold mt-8 mb-4">Base légale</h1>
            <p className="font-SF mb-4">le traitement repose sur:</p>
            <li className="font-SF mb-2">L’exécution d’un contrat (abonnement aux contenus du site) ;
</li>
            <li className="font-SF mb-2">Le consentement (inscription volontaire aux sessions individuelles).</li>
            <li className="font-SF mb-2">L’obligation légale (facturation, obligations comptables).</li>
            <h1 className="text-2xl font-SFBold mt-8 mb-4">Durée de conservation</h1>
            <li className="font-SF mb-2">Données liées au compte utilisateur : conservées tant que l’abonnement est actif, puis jusqu’à 3 ans après sa résiliation ;</li>
            <li className="font-SF mb-2">Données de facturation : 10 ans (obligation légale).</li>
            <li className="font-SF mb-2">Données des formulaires : 3 ans après la fin du dernier contact.</li>
            <h1 className="text-2xl font-SFBold mt-8 mb-4">Destinataires</h1>
            <li className="font-SF mb-2">Stripe pour les paimennts</li>
            <li className="font-SF mb-2">Les prestataires techniques indispensables au fonctionnement du site (hébergement Vercel, formulaires: Tally).</li>
            <h1 className="text-2xl font-SFBold mt-8 mb-4">Droits des utilisateurs</h1>
            <p className="font-SF mb-4">Conformément au Règlement (UE) 2016/679 (RGPD), chaque utilisateur dispose de :</p>
            <li className="font-SF mb-2">Droit d’accès, de rectification, de suppression des données.</li>
            <li className="font-SF mb-2">Droit à la limitation du traitement et opposition.</li>
            <li className="font-SF mb-2">Droit à la portabilité des données.</li>
            <p className="font-SF mb-4">Ces droits peuvent être exercés en contactant : rgpd@symbiose-audiovisuelle.fr.</p>
            <p className="font-SF mb-4">Conformément à la réglementation, toute réclamation auprès de la CNIL ne peut être introduite qu’après avoir préalablement contacté le responsable du traitement à l’adresse : rgpd@symbiose-audiovisuelle.fr, afin d’exercer ses droits ou de tenter une résolution amiable.</p>
            <h1 className="text-2xl font-SFBold mt-8 mb-4">Sécurité</h1>
            <p className="font-SF mb-4">Toutes les données sont protégées par des mesures techniques et organisationnelles conformes au RGPD. Les paiements sont sécurisés via Stripe.</p>
        </div>
        </>
    
    );
}

export default RGPD;