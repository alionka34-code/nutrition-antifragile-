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
        <p className="font-SF mb-4">Les présentes CGV régissent les conditions d’abonnement au blog premium proposé par Symbiose Audiovisuelle.</p>
        <h1 className="text-2xl font-SFBold mb-4">Article 2 : Abonnements</h1>
        <p className="font-SF mb-4">Formules disponibles :</p>
        <li className="font-SF mb-2">Gratuit</li>
        <li className="font-SF mb-2">Payant mensuel</li>
        <li className="font-SF mb-2">Payant annuel</li>
        <p className="font-SF mb-4">L’abonnement payant ouvre droit à l’accès complet au contenu premium.</p>
        <h1 className="text-2xl font-SFBold mb-4">Article 3 : Prix et paiement</h1>
        <p className="font-SF mb-4">Les prix sont indiqués en euros toutes taxes comprises (TTC).Le paiement est géré de manière sécurisée via **Stripe**. Aucune donnée bancaire n’est conservée par Symbiose Audiovisuelle.</p>
        <h1 className="text-2xl font-SFBold mb-4">Article 4: Durée et résiliation</h1>
        <li className="font-SF mb-2">L’abonnement est reconduit automatiquement (mensuel ou annuel).</li>
        <li className="font-SF mb-2">L’utilisateur peut résilier à tout moment depuis son compte.</li>
        <li className="font-SF mb-2">Aucun remboursement n’est effectué pour une période déjà entamée.</li>
        <h1 className="text-2xl font-SFBold mb-4">Article 5: Droit de  rétractation</h1>
        <p className="font-SF mb-4">Conformément à l’article L221-28 du Code de la consommation, le droit de rétractation ne s’applique pas aux contenus numériques fournis immédiatement après l’achat. En validant son abonnement, l’utilisateur accepte expressément de renoncer à ce droit.</p>
        <h1 className="text-2xl font-SFBold mb-4">Article 6: Service client</h1>
        <p className="font-SF mb-4">Toute demande ou réclamation peut être adressée à : rgpd@symbiose-audiovisuelle.fr</p>


    </div>
    </>

);
}

export default cgv;