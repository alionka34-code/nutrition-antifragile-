import alionka from '../../assets/images/alionka.jpg';

function ProfilSection() {
    return (
        <section className="mt-28 px-6 max-w-6xl mx-auto">

            {/* En-tête de section */}
            <div className="text-center max-w-4xl mx-auto mb-16">
                <p className="font-SFBold text-marron tracking-[0.25em] text-sm md:text-base mb-3">QUI JE SUIS</p>
                <h2 className="font-SFBold text-3xl md:text-5xl text-gray-900 dark:text-white leading-[1.1] tracking-tight md:whitespace-nowrap">
                    De l'agro-industrie à une nutrition
                    <br /> qui a enfin du <span className="text-marron">sens</span>.
                </h2>
            </div>

            <div className="grid md:grid-cols-12 gap-14 md:gap-24 items-start">

                {/* Photo + nom */}
                <div className="md:col-span-5">
                    <div className="md:sticky md:top-24">
                        <img
                            src={alionka}
                            alt="Alionka Houl"
                            className="w-3/4 mx-auto md:w-full rounded-3xl object-cover shadow-xl shadow-black/10 ring-1 ring-black/5"
                        />
                        <div className="mt-5 text-center md:text-left">
                            <h3 className="font-SFBold text-gray-900 dark:text-white text-lg">Alionka Houl</h3>
                            <p className="font-SF text-marron text-sm mt-0.5">Nutritionniste &amp; Auteure</p>
                        </div>
                    </div>
                </div>

                {/* Texte */}
                <div className="md:col-span-7 space-y-10">
                    <p className="font-SFBold text-2xl md:text-3xl text-gray-900 dark:text-white leading-snug tracking-tight">
                        J'ai quitté les laboratoires de l'agro-industrie pour réapprendre à me nourrir comme un être humain.
                    </p>

                    <p className="font-SF text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        Diplômée d'un Master de Sciences en nutrition, je pensais pouvoir créer des produits bons pour la santé. En réalité, j'ai vu de l'intérieur comment l'industrie manipule notre assiette : prix de revient, durée de vie, marketing, packaging… la nutrition réelle n'entre jamais en compte.
                    </p>

                    <blockquote className="border-l-2 border-marron/60 pl-6 font-SFItalic text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed">
                        J'ai tout quitté et je suis partie plusieurs mois dans les campagnes cambodgiennes, et me suis nourrie d'une simplicité déconcertante : riz, poisson séché, eau de coco, jus de canne, fruits gorgés de soleil. J'y ai puisé une énergie illimitée, une clarté mentale et un calme intérieur profond.
                    </blockquote>

                    <p className="font-SF text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        <span className="font-SFBold text-gray-900 dark:text-white">J'ai compris la mécanique :</span> elle exploite nos circuits de récompense avec du faux sucre, du faux gras, du faux goût. Le corps crie alors famine en stockant des calories vides. Nous avons perdu notre attirance instinctive pour les produits bruts.
                    </p>

                    <p className="pt-8 border-t border-beige2 dark:border-neutral-700 font-SFBold text-xl md:text-2xl text-gray-900 dark:text-white leading-snug tracking-tight">
                        Aujourd'hui, animée par une soif de vérité et de transmission, je guide chacun vers une alimentation qui nourrit le corps et l'esprit,{' '}
                        <span className="text-marron">loin des dogmes et des vices industriels.</span>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default ProfilSection;
