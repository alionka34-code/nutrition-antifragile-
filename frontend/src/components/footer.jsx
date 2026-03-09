import { Link } from 'react-router-dom';
import tiktok from '../assets/images/tiktok.png';
import instagram from '../assets/images/instagram.png';

function Footer() {
  return (
    <footer className="bg-white dark:bg-neutral-900 border-t-2 border-beige2 dark:border-neutral-700 mt-20">

      <div className="mx-auto max-w-5xl px-6 py-10 flex flex-col items-center gap-6">

        {/* Nom du site */}
        <p className="font-SFBold text-marron text-lg tracking-wide">Nutrition Antifragile</p>

        {/* Réseaux sociaux */}
        <div className="flex gap-5">
          <a href="https://www.tiktok.com/@nut_antifragile" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
            <img src={tiktok} alt="TikTok" className="w-7 h-7" />
          </a>
          <a href="https://www.instagram.com/nutrition_antifragile/" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
            <img src={instagram} alt="Instagram" className="w-7 h-7" />
          </a>
        </div>

        {/* Liens légaux */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link to="/mentions-legales" className="font-SF text-sm text-gray-500 dark:text-gray-400 hover:text-marron transition-colors">Mentions légales</Link>
          <Link to="/cgv" className="font-SF text-sm text-gray-500 dark:text-gray-400 hover:text-marron transition-colors">CGV</Link>
          <Link to="/cgu" className="font-SF text-sm text-gray-500 dark:text-gray-400 hover:text-marron transition-colors">CGU</Link>
          <Link to="/rgpd" className="font-SF text-sm text-gray-500 dark:text-gray-400 hover:text-marron transition-colors">RGPD</Link>
        </div>

        {/* Séparateur */}
        <div className="w-full border-t border-beige2 dark:border-neutral-700" />

        {/* Copyright & ISNI */}
        <div className="flex flex-col items-center gap-1">
          <p className="font-SF text-xs text-gray-400 dark:text-gray-500">
            Site créé par Nozomi — © 2025-2026 Alionka HOUL - Tous droits réservés
          </p>
          <a
            href="https://isni.oclc.org/cbs/DB=1.2/SET=1/TTL=1/CMD?ACT=SRCH&IKT=8006&SRT=LST_nd&TRM=houl+alionka"
            target="_blank"
            rel="noopener noreferrer"
            className="font-SF text-xs text-gray-400 dark:text-gray-500 hover:text-marron transition-colors"
          >
            Site professionnel — ISNI 0000 0005 1675 5683
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
