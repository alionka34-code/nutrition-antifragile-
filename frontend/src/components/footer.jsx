import { Link } from 'react-router-dom';
import { Instagram, Mail } from 'lucide-react';
import tiktok from '../assets/images/tiktok.png';
import instagram from '../assets/images/instagram.png';

const navLinks = [
  { text: 'Accueil', to: '/' },
  { text: 'Le livre', to: '/livre' },
  { text: 'Abonnement', to: '/abonnement' },
  { text: 'Analyses', to: '/articles' },
  { text: 'Contact', to: '/contact' },
];

const legalLinks = [
  { text: 'Mentions légales', to: '/mentions-legales' },
  { text: 'CGV', to: '/cgv' },
  { text: 'CGU', to: '/cgu' },
  { text: 'RGPD', to: '/rgpd' },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/nutrition_antifragile/', img: instagram },
  { label: 'TikTok', href: 'https://www.tiktok.com/@nut_antifragile', img: tiktok },
];

function Footer() {
  return (
    <footer className="mt-20 w-full rounded-t-3xl bg-beige1 dark:bg-neutral-900 border-t-2 border-beige2 dark:border-neutral-700">
      <div className="mx-auto max-w-screen-xl px-6 pt-16 pb-6 lg:px-8 lg:pt-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">

          {/* Marque */}
          <div>
            <p className="font-SFBold text-marron text-2xl tracking-wide text-center sm:text-left">
              Nutrition Antifragile
            </p>
            <p className="mt-5 max-w-md text-center font-SF text-gray-600 dark:text-gray-400 leading-relaxed sm:max-w-xs sm:text-left">
              Réapprendre à se nourrir selon son instinct, loin des dogmes,
              du marketing et de l'industrie.
            </p>

            <ul className="mt-8 flex justify-center gap-5 sm:justify-start">
              {socialLinks.map(({ label, href, img }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <span className="sr-only">{label}</span>
                    <img src={img} alt={label} className="w-7 h-7" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonnes de liens */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-2">

            <div className="text-center sm:text-left">
              <p className="font-SFBold text-lg text-gray-800 dark:text-white">Navigation</p>
              <ul className="mt-6 space-y-3 text-sm">
                {navLinks.map(({ text, to }) => (
                  <li key={text}>
                    <Link to={to} className="font-SF text-gray-500 dark:text-gray-400 hover:text-marron transition-colors">
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="font-SFBold text-lg text-gray-800 dark:text-white">Légal</p>
              <ul className="mt-6 space-y-3 text-sm">
                {legalLinks.map(({ text, to }) => (
                  <li key={text}>
                    <Link to={to} className="font-SF text-gray-500 dark:text-gray-400 hover:text-marron transition-colors">
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="font-SFBold text-lg text-gray-800 dark:text-white">Me suivre</p>
              <ul className="mt-6 space-y-3 text-sm">
                <li>
                  <a href="https://www.instagram.com/nutrition_antifragile/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 sm:justify-start font-SF text-gray-500 dark:text-gray-400 hover:text-marron transition-colors">
                    <Instagram className="size-5 shrink-0 text-marron" />
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://www.tiktok.com/@nut_antifragile" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 sm:justify-start font-SF text-gray-500 dark:text-gray-400 hover:text-marron transition-colors">
                    <img src={tiktok} alt="" className="size-5 shrink-0" />
                    TikTok
                  </a>
                </li>
                <li>
                  <Link to="/contact" className="flex items-center justify-center gap-2 sm:justify-start font-SF text-gray-500 dark:text-gray-400 hover:text-marron transition-colors">
                    <Mail className="size-5 shrink-0 text-marron" />
                    Me contacter
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bas de page */}
        <div className="mt-12 border-t border-beige2 dark:border-neutral-700 pt-6">
          <div className="text-center sm:flex sm:items-center sm:justify-between sm:text-left">
            <p className="font-SF text-xs text-gray-400 dark:text-gray-500">
              Site créé par Nozomi — © 2025-2026 Alionka HOUL · Tous droits réservés
            </p>
            <a
              href="https://isni.oclc.org/cbs/DB=1.2/SET=1/TTL=1/CMD?ACT=SRCH&IKT=8006&SRT=LST_nd&TRM=houl+alionka"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 sm:mt-0 inline-block font-SF text-xs text-gray-400 dark:text-gray-500 hover:text-marron transition-colors"
            >
              Site professionnel — ISNI 0000 0005 1675 5683
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
