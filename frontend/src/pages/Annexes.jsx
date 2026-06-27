import { useEffect, useState } from 'react';
import { fetchAnnexes } from '../utils/api';
import { Helmet } from 'react-helmet';
import NavCommunity from '../components/NavCommunity';
import PremiumOverlay from '../components/PremiumOverlay';

function Annexes() {
    const [annexes, setAnnexes] = useState([]);
    const [error, setError] = useState(null);

    const stripHtml = (html) => {
        if (!html) return '';
        const tmp = html.replace(/&nbsp;/g, ' ').replace(/<[^>]*>/g, '');
        return tmp.replace(/\s+/g, ' ').trim();
    };

    useEffect(() => {
        fetchAnnexes()
            .then((data) => setAnnexes(data))
            .catch((err) => setError(err.message));
    }, []);

    if (error) return <p>{error}</p>;

    return (
        <>
            <Helmet>
                <title>Fiches Annexes | Nutrition Antifragile</title>
                <meta name="description" content="Téléchargez nos fiches annexes pratiques sur la nutrition et la santé durable." />
            </Helmet>
            <NavCommunity />
            <PremiumOverlay>
            <header className="text-center pt-12 px-4">
                <p className="font-SFBold text-marron tracking-[0.25em] text-sm md:text-base mb-3">COMMUNAUTÉ</p>
                <h1 className="font-SFBold text-3xl md:text-5xl text-gray-900 dark:text-white tracking-tight">Guides</h1>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto px-4 mt-12">
                {annexes.map((annexe) => (
                    <div
                        key={annexe.id}
                        className="group rounded-2xl overflow-hidden border border-white/40 dark:border-white/15 bg-white/20 dark:bg-white/10 backdrop-blur-xl ring-1 ring-black/5 shadow-lg hover:shadow-xl hover:border-marron/60 transition-all h-full flex flex-col"
                    >
                        {(annexe.image_url || annexe.image) && (
                            <img
                                src={annexe.image_url || annexe.image}
                                alt={annexe.title}
                                className="w-full h-48 md:h-60 object-cover"
                            />
                        )}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl font-SFBold text-gray-900 dark:text-white group-hover:text-marron transition-colors">{annexe.title}</h2>
                                <p
                                    className="text-gray-600 dark:text-gray-300 font-SF text-lg mt-2"
                                    style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {stripHtml(annexe.description)}
                                </p>
                            </div>
                            <div className="flex items-center justify-end pt-4">
                                {annexe.fichier_pdf_url && (
                                    <a
                                        href={annexe.fichier_pdf_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="font-SFBold text-white dark:text-[#6e4f24] bg-[#6e4f24] dark:bg-beige1 hover:bg-[#5a4020] dark:hover:bg-white rounded-full px-5 py-2 text-sm transition-colors shadow-sm"
                                    >
                                        Télécharger PDF
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            </PremiumOverlay>
        </>
    );
}

export default Annexes;
