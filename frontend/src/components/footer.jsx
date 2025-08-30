import { Link } from 'react-router-dom';
import EditionOeuvres from '../assets/images/EditionsOeuvres.png';


function Footer() {
  return (
    <footer className="bg-black py-6 mt-20">

      <div className="px-4 text-center">
        <p className="text-white font-SF text-lg">© 2025 . Tous droits réservés.</p>
        <div className="mt-4">
          <Link to="/mentions-legales" className="text-gray-600 hover:text-yellow-600 font-SF text-lg">Mentions légales</Link>
          <Link to="/cgv" className="ml-4 text-gray-600 hover:text-yellow-600 font-SF text-lg">CGV</Link>
          <Link to="/cgu" className="ml-4 text-gray-600 hover:text-yellow-600 font-SF text-lg">CGU</Link>
          <Link to="/rgpd" className="ml-4 text-gray-600 hover:text-yellow-600 font-SF text-lg">RGPD</Link>
        </div>
      </div>
    </footer>
  );
}
export default Footer;