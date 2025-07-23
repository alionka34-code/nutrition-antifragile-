import React, { useState, useContext } from 'react';
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContextDefinition";
import "../styles/connexion-utils.css";


function Connexion() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleRegister = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:8000/api/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: name,
                email: email,
                password: password,
            }),
        });
            
        if (response.ok) {
            const data = await response.json();
            console.log("Inscription réussie :", data);
            alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
            setIsRegistering(false); // Basculer vers le formulaire de connexion
        } else {
            const errorData = await response.json();
            console.error("Erreur d'inscription :", errorData);
            alert("Erreur d'inscription !");
        }
    } catch (error) {
        console.error("Erreur réseau :", error);
        alert("Erreur de réseau !");
    }
};

   const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:8000/api/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: loginUsername,
        password: loginPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.detail || "Erreur de connexion !");
      return;
    }

    const data = await response.json();
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    login(loginUsername); // MAJ du contexte
    alert("Connexion réussie !");
    navigate("/"); // Redirection vers l'accueil
  } catch (error) {
    console.error("Erreur de connexion:", error);
    alert("Erreur réseau ou serveur !");
  }
};
    


    return (
        <>
        <Helmet>
            <title>Connexion | Nutrition Antifragile</title>
            <meta name="description" content="Connectez-vous à votre compte Nutrition Antifragile pour accéder à des ressources exclusives et rejoindre notre communauté." />
        </Helmet>
        <header className="bg-gradient-to-t from-white to-gray-200">
            <h1 className="text-center text-4xl md:text-6xl font-SFBold">CONNEXION</h1>
            <p className="text-center text-lg md:text-xl text-gray-500 mt-2 font-SF">Accédez à votre espace personnel et découvrez les secrets d'une nutrition antifragile</p>
        </header>
        
        <div className="flex items-center justify-center p-4 pt-10">
            <div className="bg-white rounded-3xl shadow-2xl relative overflow-hidden w-full max-w-4xl min-h-[600px] flex flex-col md:flex-row border-1 border-marron">
                
                {/* Formulaire d'inscription */}
                <div className={`absolute md:absolute top-0 left-0 h-full w-full md:w-1/2 flex items-center justify-center transition-all duration-700 ease-in-out ${
                    isRegistering ? 'translate-y-0 md:translate-y-0 md:translate-x-full opacity-100 z-20' : '-translate-y-full md:translate-y-0 md:opacity-0 opacity-0 z-0'
                }`}>
                    <form onSubmit={handleRegister} className="flex flex-col items-center justify-center p-8 md:p-12 text-center w-full max-w-md">
                        <h1 className="font-SFBold text-2xl md:text-3xl mb-6 tracking-tight">Inscrivez-vous ici</h1>
                        
                        <div className="w-full relative mb-6">
                            <input 
                                type="text" 
                                placeholder="Nom"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
 
                                className="w-full bg-transparent border-1 rounded-2xl  border-gray-300 py-3 px-1 focus:outline-none focus:border-marron transition-colors duration-300 font-SF"
                            />
                            <span className="absolute bottom-0 left-0 h-0.5 bg-blue-500 w-0 transition-all duration-300 focus-within:w-full"></span>
                        </div>
                        
                        <div className="w-full relative mb-6">
                            <input 
                                type="email" 
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                className="w-full bg-transparent border-1 rounded-2xl  border-gray-300 py-3 px-1 focus:outline-none focus:border-marron transition-colors duration-300 font-SF"
                            />
                            <span className="absolute bottom-0 left-0 h-0.5 bg-blue-500 w-0 transition-all duration-300 focus-within:w-full"></span>
                        </div>
                        
                        <div className="w-full relative mb-6">
                            <input 
                                type="password" 
                                placeholder="Mot de passe" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent border-1 rounded-2xl border-gray-300 py-3 px-1 focus:outline-none focus:border-marron transition-colors duration-300 font-SF"
                            />
                            <span className="absolute bottom-0 left-0 h-0.5 bg-blue-500 w-0 transition-all duration-300 focus-within:w-full"></span>
                        </div>
                        
                        <button 
                            type="submit"
                            className="bg-marron hover:bg-gray-700 text-white font-SFbold py-3 px-16 md:px-20 rounded-full border transition-all duration-300 hover:tracking-widest active:scale-95 focus:outline-none mt-5"
                        >
                            S'inscrire
                        </button>
                    </form>
                </div>

                {/* Formulaire de connexion */}
                <div className={`absolute md:absolute top-0 left-0 h-full w-full md:w-1/2 flex items-center justify-center transition-all duration-700 ease-in-out ${
                    isRegistering ? 'translate-y-full md:translate-y-0 md:translate-x-full opacity-0 z-0' : 'translate-y-0 md:translate-y-0 md:translate-x-0 opacity-100 z-20'
                }`}>
                    <form onSubmit={handleLogin} className="flex flex-col items-center justify-center p-8 md:p-12 text-center w-full max-w-md">
                        <h1 className="font-SFBold text-2xl md:text-3xl mb-6 tracking-tight">Se connecter</h1>
                        <p className="pb-4 font-SF text-lg">Déjà membre ? Connectez-vous à votre espace</p>
                        
                        <div className="w-full relative mb-6">
                            <input 
                                type="text" 
                                placeholder="Nom d'utilisateur" 
                                value={loginUsername}
                                onChange={(e) => setLoginUsername(e.target.value)}
                                className="w-full bg-transparent border-1 rounded-2xl border-gray-300 py-3 px-1 focus:outline-none focus:border-marron transition-colors duration-300 font-SF"
                            />
                            <span className="absolute bottom-0 left-0 h-0.5 bg-blue-500 w-0 transition-all duration-300 focus-within:w-full"></span>
                        </div>
                        
                        <div className="w-full relative mb-6">
                            <input 
                                type="password" 
                                placeholder="Mot de passe" 
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                className="w-full bg-transparent border-1 rounded-2xl border-gray-300 py-3 px-1 focus:outline-none focus:border-marron transition-colors duration-300"
                            />
                            <span className="absolute bottom-0 left-0 h-0.5 bg-blue-500 w-0 transition-all duration-300 focus-within:w-full"></span>
                        </div>
                        
                        <div className="w-full mb-4">
                            <a href="#" className="text-sm text-gray-600 hover:text-marron transition-colors duration-300 SF-Bold">
                                Mot de passe oublié ?
                            </a>
                        </div>
                        
                        <button 
                            type="submit"
                            className="bg-marron hover:bg-gray-700 text-white font-SFBold py-3 px-16 md:px-20 rounded-full border transition-all duration-300 hover:tracking-widest active:scale-95 focus:outline-none mt-5"
                        >
                            Se connecter
                        </button>
                    </form>
                </div>

                {/* Overlay avec image de fond - masqué sur mobile */}
                <div className={`hidden md:block absolute top-0 right-0 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-30 ${
                    isRegistering ? '-translate-x-full' : 'translate-x-0'
                }`}>
                    <div 
                        className="relative w-[200%] h-full -left-full transition-transform duration-700 ease-in-out"
                        style={{
                            backgroundColor: "#b8860b",
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: '0 0',
                            transform: isRegistering ? 'translateX(50%)' : 'translateX(0)'
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
                        
                        {/* Panel gauche (visible quand on s'inscrit) */}
                        <div className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center px-10 text-center text-white transition-transform duration-700 ease-in-out ${
                            isRegistering ? 'translate-x-0' : '-translate-x-5'
                        }`}>
                            <h1 className="font-SFBold text-4xl mb-4 text-shadow-lg">Déjà membre ?</h1>
                            <p className="text-lg mb-8 text-shadow-md leading-relaxed">
                                Connectez-vous avec vos informations personnelles
                            </p>
                            <button 
                                onClick={() => setIsRegistering(false)}
                                className="bg-transparent border-2 border-white text-white font-bold py-3 px-16 rounded-full hover:bg-white/20 transition-all duration-300 hover:tracking-widest active:scale-95 focus:outline-none relative"
                            >
                                Se connecter
                                <i className="fa-solid fa-arrow-left absolute left-12 top-1/2 transform -translate-y-1/2 opacity-100 transition-all duration-300"></i>
                            </button>
                        </div>

                        {/* Panel droit (visible par défaut) */}
                        <div className={`absolute top-0 right-0 w-1/2 h-full flex flex-col items-center text-center justify-center px-10  text-white transition-transform duration-700 ease-in-out ${
                            isRegistering ? 'translate-x-5' : 'translate-x-0'
                        }`}>
                            <h1 className="font-SFBold text-4xl mb-4 text-shadow-lg">Inscription gratuite</h1>
                            <p className="text-center font-SF text-lg mb-4 text-shadow-md leading-relaxed">
                                Rejoignez notre communauté et accédez aux contenus gratuits               
                            </p>
                            <p className="font-SF mb-2"><span className="text-green-600 text-xl">✓ </span>Recevez chaque mardi un extrait de notre analyse exclusive directement par e‑mail</p>
                            <p className="font-SF my-2"><span className="text-green-600 text-xl">✓ </span>Commentez les articles et échangez avec d'autres lecteurs engagés</p>
                            <p className="flex items-center font-SFBoltItalic my-8"><span><svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-8 text-black">
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/>
    </svg> </span>L'accès complet aux articles est réservé aux membres ayant un abonnement</p>
        


                            <button 
                                onClick={() => setIsRegistering(true)}
                                className="bg-transparent border-2 border-white text-white font-bold py-3 px-16 rounded-full hover:bg-white/20 transition-all duration-300 hover:tracking-widest active:scale-95 focus:outline-none relative"
                            >
                                S'inscrire
                                <i className="fa-solid fa-arrow-right absolute right-12 top-1/2 transform -translate-y-1/2 opacity-100 transition-all duration-300"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Boutons de navigation mobile */}
                <div className="md:hidden absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4 z-40">
                    <button 
                        onClick={() => setIsRegistering(false)}
                        className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                            !isRegistering 
                                ? 'bg-gray-600 text-white' 
                                : 'bg-transparent border border-gray-600 text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        Connexion
                    </button>
                    <button 
                        onClick={() => setIsRegistering(true)}
                        className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                            isRegistering 
                                ? 'bg-gray-600 text-white' 
                                : 'bg-transparent border border-gray-600 text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        Inscription
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}

export default Connexion;