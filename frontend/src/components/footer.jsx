import { Link } from 'react-router-dom';
import EditionOeuvres from '../assets/images/EditionsOeuvres.png';


function Footer() {
  return (
    <footer className="bg-black py-6 mt-20">

      <div className="px-4 text-center">
        <p className="text-white font-SF text-lg">© 2025 Alionka Houl. Créé par NOZOMI. Tous droits réservés.</p>
       
        <div className="mt-4">
          <Link to="/mentions-legales" className="text-gray-600  dark:text-white hover:text-yellow-600 font-SF text-lg">Mentions légales</Link>
          <Link to="/cgv" className="ml-4 text-gray-600  dark:text-white hover:text-yellow-600 font-SF text-lg">CGV</Link>
          <Link to="/cgu" className="ml-4 text-gray-600  dark:text-white hover:text-yellow-600 font-SF text-lg">CGU</Link>
          <Link to="/rgpd" className="ml-4 text-gray-600  dark:text-white hover:text-yellow-600 font-SF text-lg">RGPD</Link>
        </div>
         <p className='text-white font-SF text-lg mt-5 hover:text-marron'><a href='https://isni.oclc.org/cbs/DB=1.2/SET=1/TTL=1/CMD?ACT=SRCH&IKT=8006&SRT=LST_nd&TRM=houl+alionka'>N° ISNI : 0000 0005 1675 5683</a></p>
      </div>
    </footer>
  );
}
export default Footer;