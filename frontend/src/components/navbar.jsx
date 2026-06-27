import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useContext, useRef, useEffect, useLayoutEffect } from 'react';
import { Home, Newspaper, Sparkles, Mail, Users, Menu, X } from 'lucide-react';
import DarkModeSwitch from './DarkModeSwitch.jsx';
import { AuthContext } from "../contexts/AuthContextDefinition";
import NotificationBell from './NotificationBell.jsx';

/* --- Pilule de navigation « tubelight » avec lampe qui glisse (desktop) --- */
function NavPill({ items }) {
  const location = useLocation();
  const itemRefs = useRef({});
  const [lamp, setLamp] = useState({ left: 0, width: 0 });

  const isItemActive = (url) =>
    url === '/' ? location.pathname === '/' : location.pathname.startsWith(url);
  const activeItem = items.find((i) => isItemActive(i.url)) || items[0];
  const activeName = activeItem?.name;

  useLayoutEffect(() => {
    const update = () => {
      const el = itemRefs.current[activeName];
      if (el) setLamp({ left: el.offsetLeft, width: el.offsetWidth });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [activeName, items]);

  return (
    <div className="hidden md:block">
      <div className="relative flex items-center gap-1 bg-white/20 dark:bg-white/10 border border-white/40 dark:border-white/15 backdrop-blur-xl py-1 px-1 rounded-full shadow-lg ring-1 ring-black/5">
        {/* Lampe qui glisse vers l'onglet actif */}
        <span
          className="absolute top-1 bottom-1 rounded-full bg-marron/10 transition-all duration-300 ease-out"
          style={{ left: lamp.left, width: lamp.width }}
        >
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-marron rounded-t-full">
            <span className="absolute w-12 h-6 bg-marron/20 rounded-full blur-md -top-2 -left-2" />
            <span className="absolute w-8 h-6 bg-marron/20 rounded-full blur-md -top-1" />
            <span className="absolute w-4 h-4 bg-marron/20 rounded-full blur-sm top-0 left-2" />
          </span>
        </span>

        {items.map((item) => {
          const isActive = activeName === item.name;
          return (
            <Link
              key={item.name}
              to={item.url}
              ref={(el) => (itemRefs.current[item.name] = el)}
              className={`relative z-10 cursor-pointer font-SFBold text-sm px-5 lg:px-6 py-2 rounded-full transition-colors ${
                isActive ? 'text-marron' : 'text-gray-600 dark:text-gray-300 hover:text-marron'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Navbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const userMenuRef = useRef();
  const mobileMenuRef = useRef();

  const { username, isSubscribed, isAdmin, logout } = useContext(AuthContext);

  const handleLogout = () => {
    setUserMenuOpen(false);
    setIsOpen(false);
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { name: 'Accueil', url: '/', icon: Home },
    { name: 'Analyses', url: '/articles', icon: Newspaper },
    { name: 'Abonnement', url: '/abonnement', icon: Sparkles },
    { name: 'Contact', url: '/contact', icon: Mail },
  ];
  if (isAdmin || isSubscribed) {
    navItems.push({ name: 'Communauté', url: '/community', icon: Users });
  }

  return (
    <nav className="relative w-full z-40 h-16">
      <div className="flex items-center h-full gap-4 px-5 md:px-10">

        {/* Spacer gauche (équilibre la pilule centrée) — laisse passer les clics vers la marque du hero */}
        <div className="flex-1 pointer-events-none" />

        {/* Centre : pilule de navigation (desktop) */}
        <NavPill items={navItems} />

        {/* Droite : dark mode + utilisateur (desktop) + burger (mobile) */}
        <div className="flex-1 flex items-center justify-end gap-3 shrink-0">
          <span className="hidden md:block">
            <DarkModeSwitch portal={false} />
          </span>

          {/* Utilisateur — desktop */}
          <div className="relative hidden md:block" ref={userMenuRef}>
            {username ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className="flex items-center gap-2 font-SF text-gray-700 dark:text-gray-300 hover:text-marron transition-colors"
                >
                  <span className="font-SFBold max-w-[6rem] truncate">{username}</span>
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
              <Link to="/connexion" className="font-SFBold text-sm text-gray-600 dark:text-gray-300 hover:text-marron transition-colors whitespace-nowrap">
                Connexion
              </Link>
            )}

            {/* Dropdown utilisateur (desktop) */}
            {userMenuOpen && username && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-neutral-800 border-2 border-beige2 dark:border-neutral-600 rounded-2xl shadow-lg overflow-hidden z-50">
                {isSubscribed ? (
                  <>
                    <a href="https://billing.stripe.com/p/login/7sYaEW2Rx2AQd0h5QQbZe00" target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 font-SF text-sm text-gray-700 dark:text-gray-200 hover:bg-beige1 dark:hover:bg-neutral-700 hover:text-marron transition-colors">
                      Gérer mon abonnement
                    </a>
                    <Link to="/community" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2.5 font-SF text-sm text-gray-700 dark:text-gray-200 hover:bg-beige1 dark:hover:bg-neutral-700 hover:text-marron transition-colors">
                      Communauté
                    </Link>
                  </>
                ) : (
                  <Link to="/abonnement" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2.5 font-SF text-sm text-gray-700 dark:text-gray-200 hover:bg-beige1 dark:hover:bg-neutral-700 hover:text-marron transition-colors">
                    S'abonner
                  </Link>
                )}
                {isAdmin && (
                  <a href="https://web-production-a7977.up.railway.app/admin/" target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 font-SF text-sm text-gray-700 dark:text-gray-200 hover:bg-beige1 dark:hover:bg-neutral-700 hover:text-marron transition-colors border-t border-beige2 dark:border-neutral-600">
                    Espace admin
                  </a>
                )}
                {isAdmin && (
                  <Link to="/dashboard" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2.5 font-SF text-sm text-gray-700 dark:text-gray-200 hover:bg-beige1 dark:hover:bg-neutral-700 hover:text-marron transition-colors">
                    Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2.5 font-SF text-sm text-gray-700 dark:text-gray-200 hover:bg-beige1 dark:hover:bg-neutral-700 hover:text-marron transition-colors border-t border-beige2 dark:border-neutral-600">
                  Déconnexion
                </button>
              </div>
            )}
          </div>

          {/* Burger — mobile */}
          <button
            onClick={() => setIsOpen((o) => !o)}
            aria-label="Menu"
            className="md:hidden text-gray-700 dark:text-gray-200 hover:text-marron transition-colors"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Panneau mobile (burger) */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute right-4 top-full mt-2 w-64 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-white/40 dark:border-neutral-700/50 rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden z-50"
        >
          {/* Liens de navigation */}
          <div className="py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.url}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 font-SFBold text-sm text-gray-700 dark:text-gray-200 hover:bg-beige1 dark:hover:bg-neutral-800 hover:text-marron transition-colors"
                >
                  <Icon size={18} strokeWidth={2.2} />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mode sombre */}
          <div className="border-t border-beige2 dark:border-neutral-700 px-4 py-2.5 flex items-center justify-between">
            <span className="font-SF text-sm text-gray-700 dark:text-gray-200">Mode sombre</span>
            <DarkModeSwitch portal={false} />
          </div>

          {/* Section utilisateur */}
          <div className="border-t border-beige2 dark:border-neutral-700 py-1">
            {username ? (
              <>
                <div className="flex items-center gap-2 px-4 py-2.5 flex-wrap">
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
                {isSubscribed ? (
                  <a href="https://billing.stripe.com/p/login/7sYaEW2Rx2AQd0h5QQbZe00" target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 font-SF text-sm text-gray-700 dark:text-gray-200 hover:bg-beige1 dark:hover:bg-neutral-800 hover:text-marron transition-colors">
                    Gérer mon abonnement
                  </a>
                ) : (
                  <Link to="/abonnement" onClick={() => setIsOpen(false)} className="block px-4 py-2.5 font-SF text-sm text-gray-700 dark:text-gray-200 hover:bg-beige1 dark:hover:bg-neutral-800 hover:text-marron transition-colors">
                    S'abonner
                  </Link>
                )}
                {isAdmin && (
                  <a href="https://web-production-a7977.up.railway.app/admin/" target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 font-SF text-sm text-gray-700 dark:text-gray-200 hover:bg-beige1 dark:hover:bg-neutral-800 hover:text-marron transition-colors">
                    Espace admin
                  </a>
                )}
                {isAdmin && (
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-2.5 font-SF text-sm text-gray-700 dark:text-gray-200 hover:bg-beige1 dark:hover:bg-neutral-800 hover:text-marron transition-colors">
                    Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2.5 font-SF text-sm text-gray-700 dark:text-gray-200 hover:bg-beige1 dark:hover:bg-neutral-800 hover:text-marron transition-colors">
                  Déconnexion
                </button>
              </>
            ) : (
              <Link to="/connexion" onClick={() => setIsOpen(false)} className="block px-4 py-2.5 font-SFBold text-sm text-gray-700 dark:text-gray-200 hover:bg-beige1 dark:hover:bg-neutral-800 hover:text-marron transition-colors">
                Connexion
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
