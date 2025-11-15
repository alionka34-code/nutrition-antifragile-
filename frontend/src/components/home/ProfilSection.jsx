import React from 'react';
import alionka from '../../assets/images/alionka.jpg';
import { useNavigate } from 'react-router-dom';

function ProfilSection() {
    const navigate = useNavigate();
    const handleLoginClick = () => {  
        navigate('/connexion');
    };

    return (
        <section className ="mt-5">
        
        
            <div className='flex flex-col mx-auto md:gap-30 justify-center md:flex-row'>
                <div className="text-center mt-8 mx-4 md:mt-10  md:max-w-xl ">
                <img src= {alionka} alt="Alionka Houl" className="mx-auto h-auto mt-4 md:w-full shadow-xl/50 rounded-4xl"/>
                <h3 className="font-SFBold mt-4 text-marron text-xl md:text-2xl">Alionka</h3>
                <p className="p-4 font-SF text-lg md:text-xl border-l-4 border-marron rounded-4xl shadow-lg  dark:text-white">Auteure & Conférencière</p>
                </div>
                <div className='max-w-2xl mx-4 mt-8'>
                    <p className="text-center font-SFBoltItalic text-xl mt-4 mx-4 md:text-2xl border-b-2 border-marron  dark:text-white">J'ai quitté les laboratoires de l'agro-industrie pour réapprendre à me nourrir comme un être humain.</p>
                <p className="text-center mt-6 mx-4 font-SF text-lg md:text-xl  dark:text-white">Diplômée d'un Master de Sciences en nutrition, je pensais pouvoir créer des produits bons pour la santé. En réalité, j'ai vu de l'intérieur comment l'industrie manipule notre assiette : prix de revient, durée de vie, marketing, packaging… la nutrition réelle n'entre jamais en compte.</p>
                <p className="text-center mt-6 mx-4 font-SF text-lg bg-degrade-marron text-white rounded-4xl p-4 md:text-xl">J'ai tout quitté et je suis partie plusieurs mois dans les campagnes cambodgiennes, et me suis nourrie d'une simplicité déconcertante : riz, poisson séché, eau de coco, jus de canne, fruits gorgés de soleil. J'y ai puisé une énergie illimitée, une clarté mentale et un calme intérieur profond.</p>
                <p className="text-center mt-6 mx-4 font-SF text-lg md:text-xl  dark:text-white"> <span className ="font-SFBold dark:text-white">J'ai compris la mécanique :</span>Elle exploite nos circuits de récompense avec du faux sucre, du faux gras, du faux goût. Le corps crie alors famine en stockant des calories vides. Nous avons perdue notre attirance instinctive pour les produits bruts.</p>
                <p className="text-center mt-6 mx-4 font-SFBold text-lg rounded-4xl p-4 border-2 border-marron md:text-xl  dark:text-white">Aujourd'hui, animée par une soif de vérité et de transmission, je guide chacun vers une alimentation qui nourrit le corps et l'esprit, loin des dogmes et des vices industriels.</p>
            </div>
                
                
            </div>
            
        </section>
    );

}
export default ProfilSection;
