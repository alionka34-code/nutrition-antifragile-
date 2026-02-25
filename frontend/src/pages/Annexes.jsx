import { useEffect, useState } from 'react';
import { fetchAnnexes } from '../utils/api';
import { Helmet } from 'react-helmet';

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
            <div>
                <header className="text-center pt-8">
                    <h1 className="font SF-Bold text-marron text-2xl md:text-4xl my-4">Fiches Annexes</h1>
                </header>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch mx-4 md:mx-20">
                {annexes.map((annexe) => (
                    <div
                        key={annexe.id}
                        className="bg-white shadow-lg rounded-4xl border-1 border-gray-400 overflow-hidden hover:shadow-xl transition-shadow dark:bg-neutral-800 dark:border-neutral-500 h-full flex flex-col"
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
                                <h2 className="text-2xl font-SFBold dark:text-marron">{annexe.title}</h2>
                                <p
                                    className="text-gray-600 font-SF text-xl mt-2"
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
                            <div className="flex items-center justify-between pt-4">
                                <p className="font-SF">{annexe.duration} min de lecture</p>
                                {annexe.fichier_pdf_url && (
                                    <a
                                        href={annexe.fichier_pdf_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-white bg-marron hover:bg-opacity-80 font-SFBold rounded-full px-4 py-2 text-sm transition-colors"
                                    >
                                        Télécharger PDF
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Annexes;
