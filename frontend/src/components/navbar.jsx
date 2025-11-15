import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { Menu, X } from 'lucide-react';
import DarkModeSwitch from './DarkModeSwitch.jsx';
import { AuthContext } from "../contexts/AuthContextDefinition";
import { useRef, useEffect } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();
  const userMenuRef = useRef();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);
  
  // Utilisation du contexte d'authentification
  const { username, isSubscribed, isAdmin, logout } = useContext(AuthContext); 
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  return (
    <>
    <nav className="w-full top-0 left-0 z-50 mx-auto">
      <div className="flex md:mr-10 justify-between items-center md:mx-20 px-6 py-4">
        <div className="text-2xl font-bold font-SF relative hidden md:block" ref={userMenuRef}>
          {username ? (
            <span 
              className="cursor-pointer hover:text-yellow-600 flex items-center gap-2 dark:text-gray-300" 
              onClick={toggleUserMenu}
            >
              {username} 👋
              {isAdmin ? (
                <span className="px-2 py-1 text-xs rounded-full font-SFBold bg-red-500 text-white">
                  ADMIN
                </span>
              ) : (
                <span className={`px-2 py-1  text-xs rounded-full font-SFBold ${isSubscribed ? 'bg-yellow-400 text-black' : 'bg-gray-400 text-white'}`}>
                  {isSubscribed ? 'PREMIUM' : 'FREE'}
                </span>
              )}
            </span>
          ) : (
            <Link to="/connexion"></Link>
          )}
          {userMenuOpen && username && (
            <div className="absolute mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200">
              {isSubscribed ? (
                <a
                  href="https://billing.stripe.com/p/login/7sYaEW2Rx2AQd0h5QQbZe00"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:text-marron rounded-xl font-SF bg-gray-100 text-sm dark:text-black"
                >
                  Gerer mon abonnement
                </a>
              ) : (
                <Link
                  to="/abonnement"
                  className="block px-4 py-2 hover:text-marron rounded-xl font-SF bg-gray-100 text-sm  dark:text-black"
                  onClick={() => setUserMenuOpen(false)}
                >
                  S'abonner
                </Link>
              )}
              {/* Lien admin visible uniquement pour les admins */}
              {isAdmin && (
                <a
                  href="https://web-production-a7977.up.railway.app/admin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 mt-1 hover:text-marron rounded-xl font-SF bg-gray-100 text-sm dark:text-black"
                >
                  Espace admin
                </a>
              )}
            </div>
          )}
        </div>
        
        {/* Titre */}
        <div className="absolute left-1/2 transform -translate-x-1/2 md:left-1/2 md:transform md:-translate-x-1/2">
          <h1 className="font-SF text-gray-600 dark:text-white text-sm md:text-2xl whitespace-nowrap">ALIONKA HOUL - NOURRIR AVEC L'INSTINCT</h1>
        </div>
       
        <div className="flex items-center gap-4">
          {/* Burger toujours visible */}
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none  dark:text-white"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Menu déroulant commun mobile + desktop */}
      {isOpen && (
        <ul className="flex flex-col items-start justify-center md:items-center md:flex-row md:gap-15 gap-4 px-6 pb-6  dark:text-white">
          {/* Section utilisateur mobile uniquement */}
          {username && (
            <li className="md:hidden text-lg font-SF mb-4 pb-4 border-b border-gray-300 dark:border-gray-600 w-full">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-yellow-600 font-bold">{username} 👋</span>
                {isAdmin ? (
                  <span className="px-2 py-1 text-xs rounded-full font-SFBold bg-red-500 text-white">
                    ADMIN
                  </span>
                ) : (
                  <span className={`px-2 py-1 text-xs rounded-full font-SFBold ${isSubscribed ? 'bg-yellow-400 text-black' : 'bg-gray-400 text-white'}`}>
                    {isSubscribed ? 'PREMIUM' : 'FREE'}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 text-sm">
                {isSubscribed ? (
                  <a
                    href="https://billing.stripe.com/p/login/7sYaEW2Rx2AQd0h5QQbZe00"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-yellow-600"
                  >
                    Gérer mon abonnement
                  </a>
                ) : (
                  <Link
                    to="/abonnement"
                    className="hover:text-yellow-600"
                    onClick={toggleMenu}
                  >
                    S'abonner
                  </Link>
                )}
                {isAdmin && (
                  <a
                    href="https://web-production-a7977.up.railway.app/admin/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-yellow-600"
                  >
                    Espace admin
                  </a>
                )}
              </div>
            </li>
          )}
          <li className="text-lg md:text-2xl font-SF hover:text-yellow-600">
            <Link to="/" onClick={toggleMenu}>Accueil</Link>
          </li>
          <li className="text-lg md:text-2xl font-SF hover:text-yellow-600">
            <Link to="/articles" onClick={toggleMenu}>Articles</Link>
          </li>
          <li className="text-lg md:text-2xl font-SF hover:text-yellow-600">
            <Link to="/abonnement" onClick={toggleMenu}>Abonnement</Link>
          </li>
          <li className="text-lg md:text-2xl font-SF hover:text-yellow-600">
            <Link to="/Landing" onClick={toggleMenu}>Entreprise</Link>
          </li>
          <li className="text-lg md:text-2xl font-SF hover:text-yellow-600">
            <Link to="/contact" onClick={toggleMenu}>Contact</Link>
          </li>
          
          {username ? (
            <li className="text-lg md:text-2xl font-SF hover:text-yellow-600 cursor-pointer" onClick={() => { toggleMenu(); handleLogout(); }}>
              Déconnexion
            </li>
          ) : (
            <li className="text-lg md:text-2xl font-SF hover:text-yellow-600">
              <Link to="/connexion" onClick={toggleMenu}>Connexion</Link>
            </li>
          )}
          <li className="flex items-center gap-2 text-lg md:text-2xl font-SF">
            <DarkModeSwitch portal={false} />
          </li>
        </ul>
      )}
    </nav>
    </>
    
  );
}

export default Navbar;
