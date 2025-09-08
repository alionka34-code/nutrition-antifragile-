import React, { useState, useContext } from 'react';
import { Helmet } from "react-helmet";
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContextDefinition";
import "../styles/connexion-utils.css";
import API_URL from "../utils/api";
 // Assurez-vous que ce chemin est correct


function Connexion() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [loginError, setLoginError] = useState('');
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    // Fonction de validation email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Fonction de validation mot de passe
    const validatePassword = (password) => {
        return password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password);
    };

    // Fonction de validation nom d'utilisateur
    const validateUsername = (username) => {
        return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
    };

    // Fonction pour nettoyer les messages lors du changement de formulaire
    const clearMessages = () => {
        setSuccessMessage('');
        setLoginError('');
        setErrors({});
    };

    // Validation en temps réel
    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
        if (value && !validateUsername(value)) {
            setErrors(prev => ({
                ...prev, 
                name: "Le nom d'utilisateur doit contenir au moins 3 caractères (lettres, chiffres, _)"
            }));
        } else {
            setErrors(prev => ({ ...prev, name: null }));
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (value && !validateEmail(value)) {
            setErrors(prev => ({ ...prev, email: "Format d'email invalide" }));
        } else {
            setErrors(prev => ({ ...prev, email: null }));
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        if (value && !validatePassword(value)) {
            setErrors(prev => ({
                ...prev, 
                password: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre"
            }));
        } else {
            setErrors(prev => ({ ...prev, password: null }));
        }
        
        // Vérifier aussi la confirmation si elle existe
        if (confirmPassword && value !== confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: "Les mots de passe ne correspondent pas" }));
        } else if (confirmPassword && value === confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: null }));
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        if (value && value !== password) {
            setErrors(prev => ({ ...prev, confirmPassword: "Les mots de passe ne correspondent pas" }));
        } else {
            setErrors(prev => ({ ...prev, confirmPassword: null }));
        }
    };


    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});
        setSuccessMessage('');
        
        // Validation côté client
        const newErrors = {};
        
        if (!name.trim()) {
            newErrors.name = "Le nom d'utilisateur est requis";
        } else if (!validateUsername(name)) {
            newErrors.name = "Le nom d'utilisateur doit contenir au moins 3 caractères (lettres, chiffres, _)";
        }
        
        if (!email.trim()) {
            newErrors.email = "L'email est requis";
        } else if (!validateEmail(email)) {
            newErrors.email = "Format d'email invalide";
        }
        
        if (!password.trim()) {
            newErrors.password = "Le mot de passe est requis";
        } else if (!validatePassword(password)) {
            newErrors.password = "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre";
        }
        
        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = "La confirmation du mot de passe est requise";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }
        
        try {
            const response = await fetch(`${API_URL}/register/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: name.trim(),
                    email: email.trim().toLowerCase(),
                    password: password,
                }),
            });
                
            if (response.ok) {
                const data = await response.json();
                console.log("Inscription réussie :", data);
                setSuccessMessage("Inscription réussie ! Vous pouvez maintenant vous connecter.");
                setIsRegistering(false);
                // Réinitialiser les champs
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setErrors({});
                
                // Effacer le message de succès après 5 secondes
                setTimeout(() => setSuccessMessage(''), 5000);
            } else {
                const errorData = await response.json();
                console.error("Erreur d'inscription :", errorData);
                
                // Gestion des erreurs spécifiques du serveur
                const serverErrors = {};
                if (errorData.username) {
                    serverErrors.name = Array.isArray(errorData.username) ? errorData.username[0] : errorData.username;
                }
                if (errorData.email) {
                    serverErrors.email = Array.isArray(errorData.email) ? errorData.email[0] : errorData.email;
                }
                if (errorData.password) {
                    serverErrors.password = Array.isArray(errorData.password) ? errorData.password[0] : errorData.password;
                }
                
                if (Object.keys(serverErrors).length > 0) {
                    setErrors(serverErrors);
                } else {
                    setErrors({ general: errorData.detail || "Erreur d'inscription. Veuillez vérifier vos informations." });
                }
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
            setErrors({ general: "Erreur de réseau ! Veuillez réessayer." });
        } finally {
            setIsLoading(false);
        }
    };

   const handleLogin = async (e) => {
  e.preventDefault();
  setLoginError('');
  
  try {
    const response = await fetch(`${API_URL}/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: loginUsername,
        password: loginPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      // Personnaliser le message d'erreur
      let errorMessage = "Le nom d'utilisateur ou le mot de passe est incorrect.";
      
      if (errorData.detail && errorData.detail.includes("No active account found")) {
        errorMessage = "Le nom d'utilisateur ou le mot de passe est incorrect.";
      } else if (errorData.detail) {
        errorMessage = errorData.detail;
      }
      
      setLoginError(errorMessage);
      return;
    }

    const data = await response.json();
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    login(loginUsername); // MAJ du contexte
    
    // Redirection immédiate sans message
    navigate("/");
  } catch (error) {
    console.error("Erreur de connexion:", error);
    setLoginError("Erreur de réseau ! Veuillez réessayer.");
  }
};
    


    return (
        <>
        <Helmet>
            <title>Connexion à votre compte | Nutrition Antifragile</title>
            <meta name="description" content="Connectez-vous à votre compte Nutrition Antifragile pour accéder à vos articles exclusifs, ressources et avantages réservés aux membres.." />
        </Helmet>
        <header>
            <h1 className="text-center text-4xl md:text-6xl font-SFBold text-marron">CONNEXION</h1>
            <p className="text-center text-lg md:text-xl text-gray-500 mt-2 font-SF mx-4 dark:text-white">Accédez à votre espace personnel et découvrez les secrets d'une nutrition antifragile</p>
        </header>
        
        {/* Info block for mobile (shown above the auth container) */}
        <div className="md:hidden mx-4 mt-6 text-center">
           
            <p className="text-center font-SF text-base mb-2 dark:text-white">
                Rejoignez notre communauté et accédez aux contenus gratuits
            </p>
            <p className="font-SF  dark:text-white"><span className="text-green-600 text-lg">✓ </span>Recevez chaque mardi un extrait de notre analyse exclusive directement par e‑mail</p>
            <p className="font-SF  dark:text-white"><span className="text-green-600 text-lg">✓ </span>Commentez les articles et échangez avec d'autres lecteurs engagés</p>
            <p className="flex items-center justify-center font-SFBoltItalic mt-4 text-sm text-marron">
                <span className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-black  dark:text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                </span>
                L'accès complet aux articles est réservé aux membres ayant un abonnement
            </p>
        </div>

        <div className="flex items-center justify-center p-4 pt-10">
            <div className="bg-white  dark:bg-neutral-800 rounded-4xl shadow-2xl relative overflow-hidden w-full max-w-6xl min-h-[600px] flex flex-col md:flex-row border-1 border-marron">
                
                {/* Formulaire d'inscription */}
                <div className={`absolute md:absolute top-0 left-0 h-full w-full md:w-1/2 flex items-center justify-center transition-all duration-700 ease-in-out ${
                    isRegistering ? 'translate-y-0 md:translate-y-0 md:translate-x-full opacity-100 z-20' : '-translate-y-full md:translate-y-0 md:opacity-0 opacity-0 z-0'
                }`}>
                    <form onSubmit={handleRegister} className="flex flex-col items-center justify-center p-8 md:p-12 text-center w-full max-w-md">
                        <h1 className="font-SFBold text-2xl md:text-3xl mb-6 tracking-tight  dark:text-white">Inscrivez-vous ici</h1>
                        
                        {/* Messages de statut */}
                        {successMessage && (
                            <div className="w-full mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                                {successMessage}
                            </div>
                        )}
                        
                        {errors.general && (
                            <div className="w-full mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                                {errors.general}
                            </div>
                        )}
                        
                        <div className="w-full relative mb-6">
                            <input 
                                type="text" 
                                placeholder="Nom d'utilisateur"
                                value={name}
                                onChange={handleNameChange}
                                className={`w-full bg-transparent border-1 rounded-2xl py-3 px-1 focus:outline-none transition-colors duration-300 font-SF ${
                                    errors.name ? 'border-red-500' : 'border-gray-300 focus:border-marron'
                                }`}
                                disabled={isLoading}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1 text-left">{errors.name}</p>}
                            <span className="absolute bottom-0 left-0 h-0.5 bg-blue-500 w-0 transition-all duration-300 focus-within:w-full"></span>
                        </div>
                        
                        <div className="w-full relative mb-6">
                            <input 
                                type="email" 
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                                className={`w-full bg-transparent border-1 rounded-2xl py-3 px-1 focus:outline-none transition-colors duration-300 font-SF ${
                                    errors.email ? 'border-red-500' : 'border-gray-300 focus:border-marron'
                                }`}
                                disabled={isLoading}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1 text-left">{errors.email}</p>}
                            <span className="absolute bottom-0 left-0 h-0.5 bg-blue-500 w-0 transition-all duration-300 focus-within:w-full"></span>
                        </div>
                        
                        <div className="w-full relative mb-6">
                            <input 
                                type="password" 
                                placeholder="Mot de passe" 
                                value={password}
                                onChange={handlePasswordChange}
                                className={`w-full bg-transparent border-1 rounded-2xl py-3 px-1 focus:outline-none transition-colors duration-300 font-SF ${
                                    errors.password ? 'border-red-500' : 'border-gray-300 focus:border-marron'
                                }`}
                                disabled={isLoading}
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1 text-left">{errors.password}</p>}
                            {!errors.password && password && (
                                <div className="text-xs mt-1 text-left text-gray-600">
                                    <p className={validatePassword(password) ? 'text-green-600' : 'text-gray-600'}>
                                        ✓ Au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre
                                    </p>
                                </div>
                            )}
                            <span className="absolute bottom-0 left-0 h-0.5 bg-blue-500 w-0 transition-all duration-300 focus-within:w-full"></span>
                        </div>
                        
                        <div className="w-full relative mb-6">
                            <input 
                                type="password" 
                                placeholder="Confirmer le mot de passe" 
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                className={`w-full bg-transparent border-1 rounded-2xl py-3 px-1 focus:outline-none transition-colors duration-300 font-SF ${
                                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300 focus:border-marron'
                                }`}
                                disabled={isLoading}
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 text-left">{errors.confirmPassword}</p>}
                            {!errors.confirmPassword && confirmPassword && password === confirmPassword && (
                                <div className="text-xs mt-1 text-left text-green-600">
                                    ✓ Les mots de passe correspondent
                                </div>
                            )}
                            <span className="absolute bottom-0 left-0 h-0.5 bg-blue-500 w-0 transition-all duration-300 focus-within:w-full"></span>
                        </div>
                        
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className={`text-white font-SFbold py-3 px-16 md:px-20 rounded-full border transition-all duration-300 hover:tracking-widest active:scale-95 focus:outline-none mt-5 ${
                                isLoading 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-marron hover:bg-gray-700'
                            }`}
                        >
                            {isLoading ? 'Inscription...' : "S'inscrire"}
                        </button>
                    </form>
                </div>

                {/* Formulaire de connexion */}
                <div className={`absolute md:absolute top-0 left-0 h-full w-full md:w-1/2 flex items-center justify-center transition-all duration-700 ease-in-out ${
                    isRegistering ? 'translate-y-full md:translate-y-0 md:translate-x-full opacity-0 z-0' : 'translate-y-0 md:translate-y-0 md:translate-x-0 opacity-100 z-20'
                }`}>
                    <form onSubmit={handleLogin} className="flex flex-col items-center justify-center p-8 md:p-12 text-center w-full max-w-md">
                        <h1 className="font-SFBold text-2xl md:text-3xl mb-6 tracking-tight  dark:text-white">Se connecter</h1>
                        <p className="pb-4 font-SF text-lg  dark:text-white">Déjà membre ? Connectez-vous à votre espace</p>
                        
                        {/* Message de succès d'inscription */}
                        {successMessage && !isRegistering && (
                            <div className="w-full mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                                {successMessage}
                            </div>
                        )}
                        
                        {/* Message d'erreur de connexion */}
                        {loginError && (
                            <div className="w-full mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                                {loginError}
                            </div>
                        )}
                        
                        <div className="w-full relative mb-6">
                            <input 
                                type="text" 
                                placeholder="Nom d'utilisateur" 
                                value={loginUsername}
                                onChange={(e) => {
                                    setLoginUsername(e.target.value);
                                    if (loginError) setLoginError(''); // Effacer l'erreur quand l'utilisateur tape
                                }}
                                className="w-full bg-transparent border-1 rounded-2xl border-gray-300 py-3 px-1 focus:outline-none focus:border-marron transition-colors duration-300 font-SF"
                            />
                            <span className="absolute bottom-0 left-0 h-0.5 bg-blue-500 w-0 transition-all duration-300 focus-within:w-full"></span>
                        </div>
                        
                        <div className="w-full relative mb-6">
                            <input 
                                type="password" 
                                placeholder="Mot de passe" 
                                value={loginPassword}
                                onChange={(e) => {
                                    setLoginPassword(e.target.value);
                                    if (loginError) setLoginError(''); // Effacer l'erreur quand l'utilisateur tape
                                }}
                                className="w-full bg-transparent border-1 rounded-2xl border-gray-300 py-3 px-1 focus:outline-none focus:border-marron transition-colors duration-300"
                            />
                            <span className="absolute bottom-0 left-0 h-0.5 bg-blue-500 w-0 transition-all duration-300 focus-within:w-full"></span>
                        </div>
                        
                        <div className="w-full mb-4">
                            <Link to="/password-lost" className="text-sm text-gray-600 hover:text-marron transition-colors duration-300 SF-Bold  dark:text-white">
                                Mot de passe oublié ?
                            </Link>
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
                            <h1 className="font-SFBold text-4xl mb-4 text-shadow-lg ">Déjà membre ?</h1>
                            <p className="text-lg mb-8 text-shadow-md leading-relaxed">
                                Connectez-vous avec vos informations personnelles
                            </p>
                            <button 
                                onClick={() => {
                                    setIsRegistering(false);
                                    clearMessages();
                                }}
                                className="bg-transparent border-2 border-white text-white font-bold py-3 px-16 rounded-full hover:bg-white/20 transition-all duration-300 hover:tracking-widest active:scale-95 focus:outline-none relative "
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
                                onClick={() => {
                                    setIsRegistering(true);
                                    clearMessages();
                                }}
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
                        onClick={() => {
                            setIsRegistering(false);
                            clearMessages();
                        }}
                        className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                            !isRegistering 
                                ? 'bg-gray-600 text-white' 
                                : 'bg-transparent border border-gray-600 text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        Connexion
                    </button>
                    <button 
                        onClick={() => {
                            setIsRegistering(true);
                            clearMessages();
                        }}
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