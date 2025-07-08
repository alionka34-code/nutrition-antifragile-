import { Link } from 'react-router-dom';
import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'


function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="w-full bg-gray fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo ou titre */}
        <div className="text-2xl font-bold font-SF"></div>

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
        <ul className="flex flex-col items-start md:items-center md:flex-col gap-4 px-6 pb-6 bg-gray-200">
          <li className="text-lg font-SF hover:text-yellow-600">
            <Link to="/" onClick={toggleMenu}>Accueil</Link>
          </li>
          <li className="text-lg font-SF hover:text-yellow-600">
            <Link to="/livre" onClick={toggleMenu}>Livre</Link>
          </li>
          <li className="text-lg font-SF hover:text-yellow-600">
            <Link to="/articles" onClick={toggleMenu}>Articles</Link>
          </li>
          <li className="text-lg font-SF hover:text-yellow-600">
            <Link to="/abonnement" onClick={toggleMenu}>Abonnement</Link>
          </li>
          <li className="text-lg font-SF hover:text-yellow-600">
            <Link to="/contact" onClick={toggleMenu}>Contact</Link>
          </li>
          <li className="text-lg font-SF hover:text-yellow-600">
            <Link to="/connexion" onClick={toggleMenu}>Connexion</Link>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Navbar
