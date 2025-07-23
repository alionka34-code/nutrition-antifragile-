import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-black text-center py-6 mt-20">
      <div className="px-4">
        <p className="text-white font-SF text-lg">© 2025 Alionka Houl. Tous droits réservés.</p>
        <div className="mt-4">
          <Link to="/mentions-legales" className="text-gray-600 hover:text-yellow-600 font-SF text-lg">Mentions légales</Link>
        </div>
      </div>
    </footer>
  );
}
export default Footer;