import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchThemes } from '../utils/api';
import { Helmet } from 'react-helmet';

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
        <div>
            <header className="text-center pt-8">
                <h1 className="font SF-Bold text-marron text-2xl md:text-4xl my-4">Thèmes</h1>
            </header>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch mx-4 md:mx-20">
            {themes.map((theme) => (
                <Link
                    key={theme.id}
                    to={`/themes/${theme.slug || theme.id}`}
                    className="bg-white shadow-lg rounded-4xl border-1 border-gray-400 overflow-hidden hover:shadow-xl transition-shadow dark:bg-neutral-800 dark:border-neutral-500 h-full flex flex-col"
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
                        <h2 className="text-2xl font-SFBold dark:text-marron">{theme.title}</h2>
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
                            {stripHtml(theme.description)}
                        </p>
                      </div>
                      <p className='pt-4 text-right font-SF'>{theme.duration} min</p>
                    </div>
                </Link>
            ))}
        </div>
        </>         
        
    );
}
export default Themes;
