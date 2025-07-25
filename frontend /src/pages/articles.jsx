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
    <header className=" text-center pt-10 bg-linear-to-t from-white to-gray-200"></header>
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl text-marron font-SFBold mb-6">Tous les articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link to={`/articles/${article.id}`} key={article.id} className="bg-white shadow-lg rounded-lg border-1 border-gray-400 overflow-hidden hover:shadow-xl transition-shadow">
            <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-SFBold">{article.title}</h2>
              <p className='font-SF text-gray-600'>{new Date(article.published_at).toLocaleDateString("fr-FR")}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
}

export default Articles;
