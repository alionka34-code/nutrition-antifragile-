import React from "react";
import houl from '../../assets/images/houl.png';

function LandingHeader() {
    return (
        <header>
    <div className="flex flex-col md:flex-row mx-4 md:mx-40 mt-10 gap-10">
        <div className=" mx-4 md:max-w-4xl md:mx-auto">
        <p className="font-SFBold text-marron mb-2 text-2xl">la nutriton pour performer</p>
        <h1 className="text-black font-SFBold text-4xl md:text-6xl mb-8 dark:text-white">Réduisez l’absentéisme et boostez la performance de vos équipes grâce à la <span className="text-marron">nutrition.</span>
        </h1>
        <p className="font-SFBold text-gray-600 text-2xl md:text-4xl dark:text-gray-300">Des conférences dynamiques et fondées sur la science, pour transformer l’alimentation en véritable levier d’énergie, d’engagement et de performance au travail.</p>
        <div className="flex flex-row gap-4">
            <button onClick={() => {
                const element = document.getElementById('contact-form');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }} className="mt-8 text-lg font-SFBold rounded-full text-white px-4 md:px-8 py-2 bg-gradient-to-tr shadow-2xl from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 md:text-2xl">Réserver un appel</button>
        </div>
        
        </div>
        <div className="md:max-w-2xl md:mx-auto mx-4">
        <img src={houl} alt="Alionka Houl" className="md:max-w-md h-auto rounded-3xl shadow-2xl"/>
        <div className="grid grid-cols-2 grid-rows-2 gap-2 mt-4">
            <div className="border-1 border-marron p-1 rounded-4xl shadow-2xl flex items-center justify-center">
                <h3 className="font-SF text-md text-center">MSc Nutrition</h3>
            </div>
            <div className="border-1 border-marron p-1 rounded-4xl shadow-2xl flex items-center justify-center">
                <h3 className="font-SF text-md text-center">Auteur d'un livre best-seller</h3>
            </div>
            <div className="border-1 border-marron p-1 rounded-4xl shadow-2xl flex items-center justify-center">
                <h3 className="font-SF text-md text-center">Suivie par +70 000 personnes</h3>
            </div>
            <div className="border-1 border-marron p-1 rounded-4xl shadow-2xl flex items-center justify-center">
                <h3 className="font-SF text-md text-center">conférencière en entreprise</h3>
            </div>
        </div>   
    </div>
    </div>
    <div className="bg-degrade-marron mt-20">
        <div className="flex flex-row  item-center justify-center md:gap-10 py-5">
            <div className="border-r-1 border-white p-5">
                <h2 className="font-SFBold text-white  text-2xl md:text-4xl text-center">+10%</h2>
                <p className="font-SF text-white text-center text-xl">De productivité</p>
            </div>
            <div className="p-5">
                <h2 className="font-SFBold text-white text-2xl md:text-4xl text-center">5/5</h2>
                <p className="font-SF text-white text-center text-xl">Satisfaction moyenne</p>
            </div>
            <div className="p-5 border-l-1 border-white">
                <h2 className="font-SFBold text-white text-2xl md:text-4xl text-center">-25%</h2>
                <p className="font-SF text-white text-center text-xl">D'absentéisme en moyenne</p>
            </div>
        </div>
    </div>
</header>
    );
}
export default LandingHeader;
