import React from "react";

function cgv(){
return(
    <>
    <header className="bg-linear-to-t from-white to-gray-200">
        <h1 className="text-center text-4xl md:text-6xl font-SFBold pt-10">Conditions générales de vente</h1>
    </header>
    <div className="md:mx-40 mx-4 py-8">
        <p className="font-SF mb-4">Les présentes CGV régissent la vente des abonnements et ebooks sur **\[Nom de ton site]**, sous-site de **Éditions Œuvre**.</p>
        <h1 className="text-2xl font-SFBold mb-4">1.Produits concernés</h1>
        <p className="font-SF mb-4">Abonnements mensuels ou annuels<br/>Ebooks numériques<br/>Liens redirigeant vers Amazon.fr (vente gérée par Amazon)</p>
        <h1 className="text-2xl font-SFBold mb-4">2. Prix et paiement</h1>
        <p className="font-SF mb-4">Les prix sont indiqués en euros, toutes taxes comprises (TTC).<br/>Le paiement s'effectue via Stripe pour les abonnements <br/>Pour les achats via Amazon, les conditions de paiement d'Amazon s'appliquent.</p>
        <h1 className="text-2xl font-SFBold mb-4">3. Rétractation</h1>
        <p className="font-SF mb-4">Conformément à l’article L221-28 du Code de la consommation, le droit de rétractation ne s’applique pas aux contenus numériques livrés immédiatement après achat.</p>
        <h1 className="text-2xl font-SFBold mb-4">4.Résiliation des abonnements</h1>
        <p className="font-SF mb-4">Conformément à l'article L215-1-1 du Code de la consommation, les abonnements peuvent être résiliés à tout moment en ligne via votre espace client ou par simple demande écrite avant reconduction.</p>
        <h1 className="text-2xl font-SFBold  mb-4">Propriété intellectuelle</h1>
        <p className="font-SF mb-4">Tous les contenus (ebooks, articles, publications) sont protégés par le droit d’auteur. Toute reproduction ou diffusion non autorisée est interdite.</p>
        <h1 className="text-2xl font-SFBold mb-4">6.Litiges</h1>
        <p className="font-SF mb-4">Les présentes CGV sont soumises au droit français. En cas de litige, le tribunal compétent sera celui du ressort du siège social de Symbiose Audiovisuelle.</p>


    </div>
    </>

);
}

export default cgv;