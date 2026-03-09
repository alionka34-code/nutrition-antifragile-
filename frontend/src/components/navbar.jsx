import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { Menu, X } from 'lucide-react';
import DarkModeSwitch from './DarkModeSwitch.jsx';
import { AuthContext } from "../contexts/AuthContextDefinition";
import { useRef, useEffect } from "react";
import NotificationBell from './NotificationBell.jsx';

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
    <nav className="w-full top-0 left-0 z-50 bg-white dark:bg-neutral-900 border-b-2 border-beige2 dark:border-neutral-700 shadow-sm">
      <div className="flex justify-between items-center px-6 md:px-12 py-4">

        {/* Gauche : utilisateur (desktop) */}
        <div className="relative hidden md:block" ref={userMenuRef}>
          {username ? (
            <div className="flex items-center gap-3">
              <button
                onClick={toggleUserMenu}
                className="flex items-center gap-2 font-SF text-gray-700 dark:text-gray-300 hover:text-marron transition-colors"
              >
                <span className="font-SFBold">{username}</span>
                {isAdmin ? (
                  <span className="px-2 py-0.5 text-xs rounded-full font-SFBold bg-red-500 text-white">ADMIN</span>
                ) : (
                  <span className={`px-2 py-0.5 text-xs rounded-full font-SFBold ${isSubscribed ? 'bg-gradient-to-tr from-peach to-yellow-700 text-white' : 'bg-gray-200 dark:bg-neutral-700 text-gray-600 dark:text-gray-300'}`}>
                    {isSubscribed ? 'PREMIUM' : 'FREE'}
                  </span>
                )}
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isAdmin && <NotificationBell />}
              {!isAdmin && isSubscribed && <NotificationBell filterType="reply" />}
            </div>
          ) : (
            <Link to="/connexion" className="font-SF text-sm text-gray-500 hover:text-marron transition-colors">Connexion</Link>
          )}

          {/* Dropdown utilisateur */}
          {userMenuOpen && username && (
            <div className="absolute top-full mt-2 w-48 bg-white dark:bg-neutral-800 border-2 border-beige2 dark:border-neutral-600 rounded-2xl shadow-lg overflow-hidden z-50">
              {isSubscribed ? (
                <>
                  <a
                    href="https://billing.stripe.com/p/login/7sYaEW2Rx2AQd0h5QQbZe00"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2.5 font-SF text-sm text-gray-700 dark:text-gray-200 hover:bg-beige1 dark:hover:bg-neutral-700 hover:text-marron transition-colors"
                  >
                    Gérer mon abonnement
                  </a>
                  <Link to='/community' onClick={() => setUserMenuOpen(false)} className="block px-4 py-2.5 font-SF text-sm text-gray-700 dark:text-gray-200 hover:bg-beige1 dark:hover:bg-neutral-700 hover:text-marron transition-colors">
                    Communauté
                  </Link>
                </>
              ) : (
                <Link to="/abonnement" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2.5 font-SF text-sm text-gray-700 dark:text-gray-200 hover:bg-beige1 dark:hover:bg-neutral-700 hover:text-marron transition-colors">
                  S'abonner
                </Link>
              )}
              {isAdmin && (
                <a
                  href="https://web-production-a7977.up.railway.app/admin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2.5 font-SF text-sm text-gray-700 dark:text-gray-200 hover:bg-beige1 dark:hover:bg-neutral-700 hover:text-marron transition-colors border-t border-beige2 dark:border-neutral-600"
                >
                  Espace admin
                </a>
              )}
              {isAdmin && (
                <Link to="/dashboard" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2.5 font-SF text-sm text-gray-700 dark:text-gray-200 hover:bg-beige1 dark:hover:bg-neutral-700 hover:text-marron transition-colors">
                  Dashboard
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Centre : titre */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link to="/" className="flex flex-col items-center">
            <span className="font-SFBold text-marron text-md md:text-xl whitespace-nowrap tracking-wide">ALIONKA HOUL — NOURRIR AVEC L'INSTINCT</span>
            <span className="font-SF text-gray-400 dark:text-gray-500 text-xs whitespace-nowrap">ISNI 0000 0005 1675 5683</span>
          </Link>
        </div>

        {/* Droite : burger */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMenu}
            className="text-gray-600 dark:text-gray-300 hover:text-marron transition-colors focus:outline-none"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Menu déroulant */}
      {isOpen && (
        <div ref={menuRef} className="border-t-2 border-beige2 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-6 pb-6 pt-4">

          {/* Section utilisateur — mobile uniquement */}
          {username && (
            <div className="md:hidden mb-5 pb-5 border-b border-beige2 dark:border-neutral-700">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="font-SFBold text-marron">{username}</span>
                {isAdmin ? (
                  <span className="px-2 py-0.5 text-xs rounded-full font-SFBold bg-red-500 text-white">ADMIN</span>
                ) : (
                  <span className={`px-2 py-0.5 text-xs rounded-full font-SFBold ${isSubscribed ? 'bg-gradient-to-tr from-peach to-yellow-700 text-white' : 'bg-gray-200 dark:bg-neutral-700 text-gray-600 dark:text-gray-300'}`}>
                    {isSubscribed ? 'PREMIUM' : 'FREE'}
                  </span>
                )}
                {isAdmin && <NotificationBell />}
                {!isAdmin && isSubscribed && <NotificationBell filterType="reply" />}
              </div>
              <div className="flex flex-col gap-2">
                {isSubscribed ? (
                  <a href="https://billing.stripe.com/p/login/7sYaEW2Rx2AQd0h5QQbZe00" target="_blank" rel="noopener noreferrer" className="font-SF text-sm text-gray-600 dark:text-gray-300 hover:text-marron transition-colors">
                    Gérer mon abonnement
                  </a>
                ) : (
                  <Link to="/abonnement" onClick={toggleMenu} className="font-SF text-sm text-gray-600 dark:text-gray-300 hover:text-marron transition-colors">
                    S'abonner
                  </Link>
                )}
                {(isAdmin || isSubscribed) && (
                  <Link to="/community" onClick={toggleMenu} className="font-SF text-sm text-gray-600 dark:text-gray-300 hover:text-marron transition-colors">
                    Communauté
                  </Link>
                )}
                {isAdmin && (
                  <a href="https://web-production-a7977.up.railway.app/admin/" target="_blank" rel="noopener noreferrer" className="font-SF text-sm text-gray-600 dark:text-gray-300 hover:text-marron transition-colors">
                    Espace admin
                  </a>
                )}
                {isAdmin && (
                  <Link to="/dashboard" onClick={toggleMenu} className="font-SF text-sm text-gray-600 dark:text-gray-300 hover:text-marron transition-colors">
                    Dashboard
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Liens principaux */}
          <ul className="flex flex-col md:flex-row md:items-center md:justify-center md:gap-10 gap-3">
            <li><Link to="/" onClick={toggleMenu} className="font-SF text-lg md:text-xl text-gray-700 dark:text-gray-200 hover:text-marron transition-colors">Accueil</Link></li>
            <li><Link to="/articles" onClick={toggleMenu} className="font-SF text-lg md:text-xl text-gray-700 dark:text-gray-200 hover:text-marron transition-colors">Analyses</Link></li>
            <li><Link to="/abonnement" onClick={toggleMenu} className="font-SF text-lg md:text-xl text-gray-700 dark:text-gray-200 hover:text-marron transition-colors">Abonnement</Link></li>
            <li><Link to="/contact" onClick={toggleMenu} className="font-SF text-lg md:text-xl text-gray-700 dark:text-gray-200 hover:text-marron transition-colors">Contact</Link></li>
            {username ? (
              <li>
                <button onClick={() => { toggleMenu(); handleLogout(); }} className="font-SF text-lg md:text-xl text-gray-700 dark:text-gray-200 hover:text-marron transition-colors">
                  Déconnexion
                </button>
              </li>
            ) : (
              <li><Link to="/connexion" onClick={toggleMenu} className="font-SF text-lg md:text-xl text-gray-700 dark:text-gray-200 hover:text-marron transition-colors">Connexion</Link></li>
            )}
            <li className="flex items-center">
              <DarkModeSwitch portal={false} />
            </li>
          </ul>
        </div>
      )}
    </nav>
    </>
  );
}

export default Navbar;
