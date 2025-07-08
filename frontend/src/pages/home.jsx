import React from 'react';
import { useEffect, useState } from 'react';
import livre from '../assets/images/livre.png';

function Home() {
    const [visible, setVisible] = useState(false);
    
    useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);
    return (
        <>
        <header className="pt-20 px-4 bg-linear-to-t from-white to-gray-200">
            <div className="text-center">
                <h2 className="font-SF text-gray-600">ALIONKA HOUL - REDACTRICE SCIENTIFIQUE INDEPENDANTE SPECIALISE EN NUTRITION</h2>
                </div>
            <div className="text-center mt-4">
                <h1 className={` text-5xl font-SFBold transition-transform duration-1500 ease-out md:text-6xl ${visible ? 'translate-x-0' : 'translate-x-100'}`}>NUTRITION ANTIFRAGILE</h1>
            </div>
            <div className="text-center mt-4">
                <p className="text-xl font-SF ">Reprenez le pouvoir sur votre assiette dans un monde qui vous empoisonne</p>
            </div>
        </header>
        <section className="md:mx-80">
            <div className="text-center mt-8 shadow-lg border-yellow-500 border-l-4 rounded-l-lg mx-4 p-10">
            <p className="text-xl font-SF">Vos grands-parents n'avaient pas besoin de nutritionniste pour etre en forme. Vous, vous passez 10 minutes a decrypter l'etiquette d'un yaourt.</p>
            </div>
            <div>
                <img src = {livre} alt="Livre Nutrition Antifragile" className="mx-auto mt-10 w-70 h-auto shadow-xl/50 md:w-100" />
            </div>
            <div className="text-center mt-8 mx-4 ">
                <h2 className="text-yellow-500 font-SFBold text-lg">Le seul livre qui dévoile comment l’industrie alimentaire a reprogrammé votre rapport à la nourriture, pour faire de vous un consommateur dépendant.</h2>
                <p className="mt-4 font-SFBold text-xl mb-2">Vous decouvrirez:</p>
                <div className="flex flex-col md:flex-row justify-center gap-8 ">
                    <div className="border-2 border-solid border-yellow-500 rounded-2xl flex-1">
                        <p className="font-SFBold p-4 text-lg md:text-xl">Pourquoi les aliments "healthy" vous maintiennent faible</p>
                    </div>
                    <div className="border-2 border-solid border-yellow-500 rounded-2xl flex-1">
                        <p className="font-SFBold p-4 text-lg md:text-xl">Les pieges mentaux integres des l'enfance</p>
                    </div>
                    <div className="border-2 border-solid border-yellow-500 rounded-2xl flex-1">
                        <p className="font-SFBold p-4 text-lg md:text-xl">Retrouver notre instinct le plus primaire</p>
                    </div>
                </div>
            </div>
            <div className="text-center mt-8">
                <button className="text-lg font-SF rounded-full text-white px-5 py-3 bg-gradient-to-tr from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300">DECOUVRIR LE LIVRE</button>
            </div>
        </section> 
       
        </>
    );
}
export default Home;