import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { Menu, X } from 'lucide-react';
import { AuthContext } from "../contexts/AuthContextDefinition";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  // Utilisation du contexte d'authentification
  const { username, logout } = useContext(AuthContext); 
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="w-full bg-gray-200 top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo ou titre */}
        <div className="text-2xl font-bold font-SF">
          {username ? (
            <span>{username} 👋</span>
          ) : (
            <Link to="/connexion"></Link>
          )}
        </div>

        {/* Burger toujours visible */}
        <button
          onClick={toggleMenu}
          className="text-black focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu déroulant commun mobile + desktop */}
      {isOpen && (
        <ul className="flex flex-col items-start justify-center md:items-center md:flex-row gap-4 px-6 pb-6 bg-gray-200">
          <li className="text-lg md:text-xl font-SF hover:text-yellow-600">
            <Link to="/" onClick={toggleMenu}>Accueil</Link>
          </li>
          <li className="text-lg md:text-xl font-SF hover:text-yellow-600">
            <Link to="/livre" onClick={toggleMenu}>Livre</Link>
          </li>
          <li className="text-lg md:text-xl font-SF hover:text-yellow-600">
            <Link to="/articles" onClick={toggleMenu}>Articles</Link>
          </li>
          <li className="text-lg md:text-xl font-SF hover:text-yellow-600">
            <Link to="/abonnement" onClick={toggleMenu}>Abonnement</Link>
          </li>
          <li className="text-lg md:text-xl font-SF hover:text-yellow-600">
            <Link to="/contact" onClick={toggleMenu}>Contact</Link>
          </li>
          {username ? (
            <li className="text-lg md:text-xl font-SF hover:text-yellow-600 cursor-pointer" onClick={() => { toggleMenu(); handleLogout(); }}>
              Déconnexion
            </li>
          ) : (
            <li className="text-lg md:text-xl font-SF hover:text-yellow-600">
              <Link to="/connexion" onClick={toggleMenu}>Connexion</Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
