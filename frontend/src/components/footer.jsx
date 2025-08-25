import { Link } from 'react-router-dom';
import EditionOeuvres from '../assets/images/EditionsOeuvres.png';


function Footer() {
  return (
    <footer className="bg-black py-6 mt-20">
      <div className="flex flex-col md:flex-row justify-center items-center my-10 md:mx-20 gap-10 md:gap-50">
        <div> 
          <img src={EditionOeuvres} alt="Editions Oeuvres" className="w-60 h-30 md:w-100 md:h-40" />
          </div>
          <div className="px-10">
            <h1 className='text-white font-SFBold text-xl mb-4'>Informations éditoriales</h1>
            <p className='text-white font-SF '>Ce site est une publication de<span className='font-SFBold'>Éditions Œuvres</span>, sous la direction éditoriale de<span className='font-SFBold'>Symbiose Audiovisuelle</span>(RNA : W343028438).</p>
            <p className='text-white font-SF'>Pour toute demande professionnelle (partenariat, programmation, diffusion): <span className='font-SFBold'>editions@symbiose-audiovisuelle.fr</span></p>
            <p className='text-white font-SF'>@Editions oeuvres — Symbiose Audiovisuelle tout droits réservés</p>
            <p className='text-white font-SF'>Alionka Houl — ISNI 0000000516755683</p>
          </div>
       
      </div>
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