import React from 'react';
import livre from '../../assets/images/livre.png';
import { useEffect, useState } from 'react';

function HomeHeader() { 
    const [visible, setVisible] = useState(false);
    
    useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);
    return (
        <header className="px-4">
                    <div className={`text-center transition-transform duration-1500 ease-out ${visible ? 'translate-y-0' : 'translate-y-50'}`}>
                        <h1 className="font-SF text-gray-600 dark:text-white">ALIONKA HOUL - RÉDACTRICE SCIENTIFIQUE INDEPENDANTE SPECIALISÉE EN NUTRITION</h1>
                          
                        
                    
                        <h2 className={`dark: text-marron text-center text-5xl font-SFBold transition-transform duration-1500 ease-out md:text-8xl ${visible ? 'translate-y-0' : 'translate-y-10'}`}>NUTRITION<br/>ANTIFRAGILE</h2>
                        <p className="text-center text-gray-600 dark:text-white text-xl font-SF md:text-2xl mb-10">Reprendre le pouvoir sur votre assiette dans un monde qui vous empoisonne</p>
                        <img src = {livre} alt="Livre Nutrition Antifragile" className=" w-80 md:w-100 h-auto  shadow-xl/50 mx-auto md:hidden " />
                    <p className="text-xl font-SFBold  text-center mt-8 shadow-lg border-marron border-l-4 rounded-4xl p-10 mx-auto md:text-2xl max-w-4xl dark:text-white">Vos grands-parents n'avaient pas besoin de nutritionniste pour être en forme. Vous, vous passez 10 minutes a décrypter l'étiquette d'un yaourt.</p>
                    <div className='flex flex-row  mx-auto justify-center gap-5'><button onClick = {() => window.location.href = "https://amzn.eu/d/2ZR5MMo"} className="mt-8 text-lg font-SFBold rounded-full text-white px-8 py-4 bg-gradient-to-tr from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 md:text-3xl">ACHETER LE LIVRE</button>
                        <button onClick={() => window.location.href="/Extrait.pdf"} className="mt-8 text-lg font-SFBold rounded-full text-white px-8 py-4 bg-gradient-to-tr from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 md:text-3xl">LIRE UN EXTRAIT</button></div>
                    </div>      
                </header>

    );
}

export default HomeHeader;