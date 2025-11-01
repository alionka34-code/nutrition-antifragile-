import React from "react";
import { Helmet } from "react-helmet";

function cgv(){
return(
    <>
    <Helmet>
  <title>Conditions générales de vente | Nutrition Antifragile</title>
  <meta 
    name="description" 
    content="Consultez les conditions générales de vente de Nutrition Antifragile pour connaître vos droits, obligations et les modalités de nos services et abonnements." 
  />
</Helmet>
    <header>
        <h1 className="text-center text-4xl md:text-6xl font-SFBold pt-10  dark:text-white">Conditions générales de vente</h1>
    </header>
    <div className="md:mx-40 mx-4 py-8  dark:text-white">
        <h1 className="text-2xl font-SFBold mb-4">Article 1 : Objet</h1>
        <p className="font-SF mb-4">Les présentes conditions générales de vente (CGV) ont pour objet de définir les modalités d’abonnement au  <strong>blog premium</strong> proposé par <strong>Symbiose Audiovisuelle — SIREN 891 180 093</strong>.<br/><br/> Toute souscription à un abonnement implique l’acceptation pleine et entière des présentes CGV, CGU, consultables à tout moment sur le site https://alionka-houl.eo.symbiose-audiovisuelle.fr.<br/><br/>Avant tout règlement, l’utilisateur confirme avoir lu et accepté les Conditions générales de vente et les Conditions générales d’utilisation. <br/>En validant son abonnement, il reconnaît également vouloir accéder immédiatement au contenu numérique et renonce expressément à son droit de rétractation, conformément à l’article L221-28 du Code de la consommation.</p>
        <h1 className="text-2xl font-SFBold mb-4">Article 2 : Abonnements</h1>
        <p className="font-SF mb-4">FPlusieurs formules d'abonnement sont proposées :</p>
        <li className="font-SF mb-2">Gratuit: accès partiel au contenu du site/blog ;</li>
        <li className="font-SF mb-2">Payant mensuel</li>
        <li className="font-SF mb-2">Payant annuel</li>
        <p className="font-SF mb-4">L’abonnement payant donne accès à l’intégralité du contenu premium tant que le compte de l’utilisateur demeure actif.</p>
        <h1 className="text-2xl font-SFBold mb-4">Article 3 : Prix et paiement</h1>
        <p className="font-SF mb-4">Les prix sont indiqués en euros toutes taxes comprises (TTC).Le paiement est sécurisé et effectué exclusivement via la plateforme <strong>Stripe</strong>. Aucune donnée bancaire n’est stockée ni conservée par <strong>Symbiose Audiovisuelle</strong>. Toute modification tarifaire ultérieure ne s’appliquera qu’aux abonnements souscrits après son entrée en vigueur.</p>
        <h1 className="text-2xl font-SFBold mb-4">Article 4: Durée, reconduction et résiliation</h1>
        <p className="font-SF mb-4">Les abonnements mensuels et annuels sont reconduits automatiquement à leur échéance. L’utilisateur peut résilier à tout moment depuis son espace personnel. La résiliation prend effet à la fin de la période en cours. Aucun remboursement n’est effectué pour une période déjà entamée.</p>
        <h1 className="text-2xl font-SFBold mb-4">Article 5: Droit de  rétractation</h1>
        <p className="font-SF mb-4">Conformément à l’article L221-28 du Code de la consommation, le droit de rétractation ne s’applique pas aux contenus numériques fournis immédiatement après paiement. En validant son abonnement, l’utilisateur accepte expressément de renoncer à ce droit.</p>
        <h1 className="text-2xl font-SFBold mb-4">Article 6: Service client</h1>
        <p className="font-SF mb-4">Toute demande, question ou réclamation peut être adressée via le formulaire de contact :https://www.symbiose-audiovisuelle.fr/contacts</p>
        <h1 className="text-2xl font-SFBold mb-4">Article 7: Droit applicable et juridiction compétente</h1>
        <p className="font-SF mb-4">Les présentes conditions générales de vente sont régies par le droit français.En cas de litige et après tentative de résolution amiable, les tribunaux de Montpellier (France) seront seuls compétents.</p>
    </div>
    </>

);
}

export default cgv;