import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchThemes } from '../utils/api';
import { Helmet } from 'react-helmet';
import NavCommunity from '../components/NavCommunity';
import PremiumOverlay from '../components/PremiumOverlay';

function Themes() {
    const [themes, setThemes] = useState([]);
    const [error, setError] = useState(null);

    const stripHtml = (html) => {
        if (!html) return '';
        // Replace non-breaking spaces and remove tags
        const tmp = html.replace(/&nbsp;/g, ' ').replace(/<[^>]*>/g, '');
        // Collapse whitespace
        return tmp.replace(/\s+/g, ' ').trim();
    };

    useEffect(() => {
        Promise.all([fetchThemes()])
        .then(([themesData]) => {
            setThemes(themesData);
        })
        .catch(err => setError(err.message));
    }, []);

    if (error) return <p>{error}</p>;

    return (
        <>
        <Helmet>
            <title>Thèmes Nutrition Antifragile | Santé durable & alimentation consciente</title>
            <meta name="description" content="Découvrez les différents thèmes abordés sur notre blog de nutrition, allant de l'alimentation saine aux régimes spécifiques." />
        </Helmet>
        <NavCommunity />
        <PremiumOverlay>
        <header className="text-center pt-12 px-4">
            <p className="font-SFBold text-marron tracking-[0.25em] text-sm md:text-base mb-3">COMMUNAUTÉ</p>
            <h1 className="font-SFBold text-3xl md:text-5xl text-gray-900 dark:text-white tracking-tight">Dossiers</h1>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto px-4 mt-12">
            {themes.map((theme) => (
                <Link
                    key={theme.id}
                    to={`/themes/${theme.slug || theme.id}`}
                    className="group rounded-2xl overflow-hidden border border-white/40 dark:border-white/15 bg-white/20 dark:bg-white/10 backdrop-blur-xl ring-1 ring-black/5 shadow-lg hover:shadow-xl hover:border-marron/60 transition-all h-full flex flex-col"
                >
                    { (theme.image_url || theme.image) && (
                        <img
                            src={theme.image_url || theme.image}
                            alt={theme.title}
                            className="w-full h-48 md:h-60 object-cover"
                        />
                    )}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="text-2xl font-SFBold text-gray-900 dark:text-white group-hover:text-marron transition-colors">{theme.title}</h2>
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
                            {stripHtml(theme.description)}
                        </p>
                      </div>
                      <p className='pt-4 text-right font-SF text-sm text-marron'>{theme.duration} min</p>
                    </div>
                </Link>
            ))}
        </div>
        </PremiumOverlay>
        </>
        
    );
}
export default Themes;
