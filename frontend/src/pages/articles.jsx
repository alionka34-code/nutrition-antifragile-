import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticles } from '../utils/api';

function Articles() {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

   useEffect(() => {
        fetchArticles()
            .then(data => {
                console.log('Articles data:', data);
                setArticles(data);
            })
            .catch(err => setError(err.message));
    }, []);
    if (error) return <p>{error}</p>

   




  return (
    <>
    <header className=" text-center pt-10">
      <h1 className='font-SFBold text-marron text-2xl md:text-4xl'>Ici, la nutrition prend tout son sens.</h1> 
      <p className="font-SF md:text-2xl text-lg mx-4 md:mx-auto md:max-w-5xl  dark:text-white">Loin des fausses promesses et des étiquettes trompeuses, entrez dans le cercle de ceux qui  veulent comprendre, pas juste consommer.</p></header>
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link to={`/articles/${article.id}`} key={article.id} className="bg-white shadow-lg rounded-4xl border-1 border-gray-400 overflow-hidden hover:shadow-xl transition-shadow  dark:bg-neutral-800 dark:border-neutral-500 ">
            <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-SFBold  dark:text-marron">{article.title}</h2>
              <p className='font-SF text-gray-600  dark:text-white'>{new Date(article.published_at).toLocaleDateString("fr-FR")}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
}

export default Articles;
