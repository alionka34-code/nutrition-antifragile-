import alionka from '../../assets/images/alionka.jpg';

function ProfilSection() {
    return (
        <section className="mt-10 px-4 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center md:items-start justify-center">

                {/* Photo + nom */}
                <div className="flex flex-col items-center w-full md:w-96 shrink-0">
                    <img
                        src={alionka}
                        alt="Alionka Houl"
                        className="w-4/5 md:w-full rounded-2xl shadow-lg shadow-black/30 object-cover"
                    />
                    <h3 className="font-SFBold text-marron text-xl mt-4">Alionka Houl</h3>
                    <p className="font-SF text-gray-500 dark:text-gray-400 text-sm mt-1">Nutritionniste & Auteure</p>
                </div>

                {/* Texte */}
                <div className="flex-1 flex flex-col gap-5">
                    <p className="font-SFBoltItalic text-xl md:text-2xl text-gray-800 dark:text-white border-l-4 border-marron pl-4">
                        J'ai quitté les laboratoires de l'agro-industrie pour réapprendre à me nourrir comme un être humain.
                    </p>

                    <p className="font-SF text-lg md:text-xl text-gray-600 dark:text-white">
                        Diplômée d'un Master de Sciences en nutrition, je pensais pouvoir créer des produits bons pour la santé. En réalité, j'ai vu de l'intérieur comment l'industrie manipule notre assiette : prix de revient, durée de vie, marketing, packaging… la nutrition réelle n'entre jamais en compte.
                    </p>

                    <div className="bg-gradient-to-tr from-peach to-yellow-700 rounded-2xl p-5 shadow-md">
                        <p className="font-SF text-white text-lg md:text-xl">
                            J'ai tout quitté et je suis partie plusieurs mois dans les campagnes cambodgiennes, et me suis nourrie d'une simplicité déconcertante : riz, poisson séché, eau de coco, jus de canne, fruits gorgés de soleil. J'y ai puisé une énergie illimitée, une clarté mentale et un calme intérieur profond.
                        </p>
                    </div>

                    <p className="font-SF text-lg md:text-xl text-gray-600 dark:text-white">
                        <span className="font-SFBold">J'ai compris la mécanique :</span> elle exploite nos circuits de récompense avec du faux sucre, du faux gras, du faux goût. Le corps crie alors famine en stockant des calories vides. Nous avons perdu notre attirance instinctive pour les produits bruts.
                    </p>

                    <div className="border-2 border-marron rounded-2xl p-5 bg-beige1 dark:bg-neutral-800">
                        <p className="font-SFBold text-lg md:text-xl text-gray-800 dark:text-white">
                            Aujourd'hui, animée par une soif de vérité et de transmission, je guide chacun vers une alimentation qui nourrit le corps et l'esprit, loin des dogmes et des vices industriels.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProfilSection;
