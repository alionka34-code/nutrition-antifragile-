import React from "react";
import { Helmet } from "react-helmet";

function ExtraitPage() {
  return (
    <>
      <Helmet>
        <title>Extrait | NUTRITION ANTIFRAGILE | Alionka Houl</title>
        <meta name="description" content="Découvrez un extrait du livre NUTRITION ANTIFRAGILE : Reprendre le pouvoir sur votre assiette." />
        <link rel="canonical" href="https://alionka-houl.eo.symbiose-audiovisuelle.fr/extrait" />
      </Helmet>

      <main className="min-h-screen bg-white dark:bg-neutral-900 ">
        {/* Hero Section */}
        <section className="pt-20 pb-12 px-6 md:px-20 text-center bg-white dark:bg-neutral-900">
          <h1 className="font-SF font-bold text-3xl md:text-5xl text-gray-900 dark:text-white mb-4">
            NUTRITION ANTIFRAGILE
          </h1>
          <p className="font-SF text-lg md:text-2xl text-gray-700 dark:text-gray-300 mb-2">
            Reprendre le pouvoir sur votre assiette dans un monde qui vous empoisonne
          </p>
          <div className="flex justify-center gap-8 mt-8 text-sm md:text-base text-gray-600 dark:text-gray-400">
            <span className="font-SF">Auteure : <span className="font-bold text-gray-900 dark:text-white">HOUL Alionka</span></span>
            <span className="font-SF">ISBN : <span className="font-bold text-gray-900 dark:text-white">978-2-487226-92-0</span></span>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 px-6 md:px-20 max-w-4xl mx-auto">
          <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
            <p className="font-SF text-sm md:text-base text-yellow-600 dark:text-yellow-400 font-bold">
              Texte de l'extrait - Novembre 2025
            </p>
          </div>

          <article className="space-y-6 text-gray-700 dark:text-gray-300">
            <p className="font-SF text-base md:text-lg leading-relaxed">
              <span className="text-2xl text-yellow-600 dark:text-yellow-400 font-bold">(…)</span> Si nous sommes aussi dépendants de cette alimentation, ce n'est pas uniquement à cause des ingrédients qu'elle contient, mais surtout en raison du conditionnement mental que nous subissons depuis l'enfance. On ne naît pas « accro » aux aliments ultra-transformés, on le devient.
            </p>

            <p className="font-SF text-base md:text-lg leading-relaxed">
              De l'école aux médias, la désinformation alimentaire est omniprésente, souvent discrète, mais pourtant profondément ancrée dans notre quotidien. Nous avons été éduqués à mal manger par un système qui valorise les produits ultra-transformés et qui nous pousse à adopter des habitudes alimentaires délétères. L'impact de cette mauvaise éducation alimentaire ne se limite pas seulement à des kilos superflus ou à des maladies chroniques, il touche directement notre développement cognitif, en altérant notre capacité à penser clairement, à nous concentrer et à nous éveiller aux enjeux qui nous entourent.
            </p>

            <p className="font-SF text-base md:text-lg leading-relaxed">
              Une alimentation déséquilibrée empêche le bon développement du cerveau, essentiel à l'apprentissage, à la concentration et à une cognition fluide. Les troubles neurologiques, comme le brouillard mental, l'incapacité de se concentrer, voire des troubles plus graves tels que le TDAH, peuvent être exacerbés par une mauvaise alimentation. Une étude a révélé que des carences alimentaires et une mauvaise nutrition influencent négativement l'attention, la mémoire et le comportement, augmentant ainsi le risque de troubles neurodéveloppementaux comme le TDAH (Millichap et Yee, 2012) <span className="text-xs bg-yellow-100 dark:bg-yellow-900 px-1 rounded">[1.7]</span>.
            </p>

            <p className="font-SF text-base md:text-lg leading-relaxed">
              Quel en est l'impact ? Un futur adulte moins éveillé, moins apte à comprendre les enjeux sociaux, environnementaux et politiques qui façonnent son monde. Un citoyen plus facilement manipulable, qui confond confort immédiat et véritable liberté. Un individu qui consomme sans questionner, obéit sans résister, et s'éloigne peu à peu de toute pensée critique. Ce manque de clarté mentale découle directement d'une alimentation déséquilibrée, saturée de calories vides. Ces calories remplissent l'estomac, mais sont dépourvues des nutriments essentiels nécessaires à un équilibre physique et mental optimal. <span className="text-2xl text-yellow-600 dark:text-yellow-400 font-bold">(…)</span>
            </p>

            <div className="py-4">
              <p className="font-SF text-center text-gray-600 dark:text-gray-400 text-sm">
                ……….Fin de l'extrait
              </p>
            </div>
          </article>

          {/* Publication Info */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 space-y-4">
            <p className="font-SF text-sm text-gray-700 dark:text-gray-300">
              © 2025 Editions Oeuvres — Symbiose Audiovisuelle — Tous droits réservés.<br />Editions Oeuvres — https://www.eo.symbiose-audiovisuelle.fr/
            </p>
          

            {/* CTA */}
            <div className="mt-8 p-6 bg-yellow-50 dark:bg-gray-800 rounded-lg border border-yellow-200 dark:border-gray-700">
              <p className="font-SF text-base text-gray-900 dark:text-white mb-4">
                👉 <span className="font-bold">Pour toute demande concernant les séries limitées</span> — accompagnées de leur porte-clé en résine, façonné à la main et incrusté de grains de riz porte-bonheur — merci de vous adresser directement à l'éditeur.
              </p>
              <a 
                href="https://www.eo.symbiose-audiovisuelle.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-SF font-bold text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 underline transition"
              >
                Cliquez-ici
              </a>
            </div>
        </section>
      </main>
    </>
  );
}

export default ExtraitPage;
