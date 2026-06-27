import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticles, fetchVideos } from '../utils/api';
import { Helmet } from 'react-helmet';
import NavCommunity from '../components/NavCommunity';

function Articles() {
    const [articles, setArticles] = useState([]);
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);
    const [articlesCurrentIndex, setArticlesCurrentIndex] = useState(0);
    const [videosCurrentIndex, setVideosCurrentIndex] = useState(0);

    useEffect(() => {
    Promise.all([fetchArticles(), fetchVideos()])
      .then(([articlesData, videosData]) => {
        setArticles(articlesData);
        setVideos(videosData);
      })
      .catch(err => setError(err.message));
  }, []);

  if (error) return <p>{error}</p>;

  // Fonctions pour naviguer dans les carousels
  const getItemsPerView = () => {
    if (window.innerWidth >= 1024) return 3; // 3 par ligne sur desktop = 6 total sur 2 lignes
    if (window.innerWidth >= 640) return 2; // 2 par ligne sur tablet = 4 total sur 2 lignes
    return 1; // 1 par ligne sur mobile = 2 total sur 2 lignes
  };

  const nextArticles = () => {
    const itemsPerView = getItemsPerView();
    const totalItemsPerPage = itemsPerView * 2; // 2 lignes
    if (articlesCurrentIndex + totalItemsPerPage < articles.length) {
      setArticlesCurrentIndex(articlesCurrentIndex + totalItemsPerPage);
    }
  };

  const prevArticles = () => {
    const itemsPerView = getItemsPerView();
    const totalItemsPerPage = itemsPerView * 2; // 2 lignes
    if (articlesCurrentIndex - totalItemsPerPage >= 0) {
      setArticlesCurrentIndex(articlesCurrentIndex - totalItemsPerPage);
    } else {
      setArticlesCurrentIndex(0);
    }
  };

  const nextVideos = () => {
    const itemsPerView = getItemsPerView();
    const totalItemsPerPage = itemsPerView * 2; // 2 lignes
    if (videosCurrentIndex + totalItemsPerPage < videos.length) {
      setVideosCurrentIndex(videosCurrentIndex + totalItemsPerPage);
    }
  };

  const prevVideos = () => {
    const itemsPerView = getItemsPerView();
    const totalItemsPerPage = itemsPerView * 2; // 2 lignes
    if (videosCurrentIndex - totalItemsPerPage >= 0) {
      setVideosCurrentIndex(videosCurrentIndex - totalItemsPerPage);
    } else {
      setVideosCurrentIndex(0);
    }
  };


  return (
    <>
    <Helmet>
        <title>Articles Nutrition Antifragile | Santé durable & alimentation consciente</title>
        <meta name="description" content="Découvrez des articles approfondis sur la nutrition antifragile, la santé durable et l'alimentation consciente. Des conseils pratiques pour renforcer votre bien-être et comprendre les enjeux alimentaires." />
    </Helmet>
    <NavCommunity />
    <header className="text-center pt-12 px-4 max-w-3xl mx-auto">
      <p className="font-SFBold text-marron tracking-[0.25em] text-sm md:text-base mb-3">ANALYSES</p>
      <h1 className="font-SFBold text-3xl md:text-5xl text-gray-900 dark:text-white tracking-tight leading-[1.1]">Ici, la nutrition prend tout son sens.</h1>
      <p className="mt-5 font-SF text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">Loin des fausses promesses et des étiquettes trompeuses, entrez dans le cercle de ceux qui veulent comprendre, pas juste consommer.</p>
    </header>

    {/* Section Articles */}
    <div className="mx-4 md:mx-20 py-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-SFBold text-marron">Analyses</h2>
        <div className="flex gap-2">
          <button 
            onClick={prevArticles}
            className="bg-[#6e4f24] dark:bg-beige1 text-white dark:text-[#6e4f24] px-3.5 py-2 rounded-full hover:bg-[#5a4020] dark:hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
            disabled={articlesCurrentIndex === 0}
          >
            ←
          </button>
          <button 
            onClick={nextArticles}
            className="bg-[#6e4f24] dark:bg-beige1 text-white dark:text-[#6e4f24] px-3.5 py-2 rounded-full hover:bg-[#5a4020] dark:hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
            disabled={articlesCurrentIndex + (getItemsPerView() * 2) >= articles.length}
          >
            →
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Première ligne */}
        <div className="contents">
          {articles.slice(articlesCurrentIndex, articlesCurrentIndex + getItemsPerView()).map((article) => (
            <Link 
              key={`row1-${article.id}`} 
              to={`/articles/${article.slug}`} 
              className="group rounded-2xl overflow-hidden border border-white/40 dark:border-white/15 bg-white/20 dark:bg-white/10 backdrop-blur-xl ring-1 ring-black/5 shadow-lg hover:shadow-xl hover:border-marron/60 transition-all w-full block"
            >
              <img src={article.image} alt={article.title} className="w-full h-48 md:h-60 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-SFBold text-gray-900 dark:text-white group-hover:text-marron transition-colors">{article.title}</h3>
                <p className='font-SF text-sm text-gray-500 dark:text-gray-400 mt-1'>{new Date(article.published_at).toLocaleDateString("fr-FR")}</p>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Deuxième ligne */}
        <div className="contents">
          {articles.slice(articlesCurrentIndex + getItemsPerView(), articlesCurrentIndex + (getItemsPerView() * 2)).map((article) => (
            <Link 
              key={`row2-${article.id}`} 
              to={`/articles/${article.slug}`} 
              className="group rounded-2xl overflow-hidden border border-white/40 dark:border-white/15 bg-white/20 dark:bg-white/10 backdrop-blur-xl ring-1 ring-black/5 shadow-lg hover:shadow-xl hover:border-marron/60 transition-all w-full block"
            >
              <img src={article.image} alt={article.title} className="w-full h-48 md:h-60 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-SFBold text-gray-900 dark:text-white group-hover:text-marron transition-colors">{article.title}</h3>
                <p className='font-SF text-sm text-gray-500 dark:text-gray-400 mt-1'>{new Date(article.published_at).toLocaleDateString("fr-FR")}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>

    {/* Section Vidéos */}

    {/*
    
    <div className="mx-4 md:mx-20 py-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-SFBold text-marron">Vidéos</h2>
        <div className="flex gap-2">
          <button 
            onClick={prevVideos}
            className="bg-[#6e4f24] dark:bg-beige1 text-white dark:text-[#6e4f24] px-3.5 py-2 rounded-full hover:bg-[#5a4020] dark:hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
            disabled={videosCurrentIndex === 0}
          >
            
          </button>
          <button 
            onClick={nextVideos}
            className="bg-[#6e4f24] dark:bg-beige1 text-white dark:text-[#6e4f24] px-3.5 py-2 rounded-full hover:bg-[#5a4020] dark:hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
            disabled={videosCurrentIndex + (getItemsPerView() * 2) >= videos.length}
          >
            
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        <div className="contents">
          {videos.slice(videosCurrentIndex, videosCurrentIndex + getItemsPerView()).map((video) => (
            <Link 
              key={`row1-${video.id}`} 
              to={`/videos/${video.slug}`} 
              className="bg-white shadow-lg rounded-4xl overflow-hidden hover:shadow-xl transition-shadow dark:bg-neutral-800 dark:border-neutral-500 w-full block"
            >
              <img src={video.image} alt={video.title} className="w-full h-48 md:h-60 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-SFBold dark:text-marron">{video.title}</h3>
                <p className="font-SF text-gray-600 dark:text-white">{new Date(video.published_at).toLocaleDateString("fr-FR")}</p>
              </div>
            </Link>
          ))}
        </div>
        
        
        <div className="contents">
          {videos.slice(videosCurrentIndex + getItemsPerView(), videosCurrentIndex + (getItemsPerView() * 2)).map((video) => (
            <Link 
              key={`row2-${video.id}`} 
              to={`/videos/${video.slug}`} 
              className="bg-white shadow-lg rounded-4xl overflow-hidden hover:shadow-xl transition-shadow dark:bg-neutral-800 dark:border-neutral-500 w-full block">
              <img src={video.image} alt={video.title} className="w-full h-48 md:h-60 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-SFBold dark:text-marron">{video.title}</h3>
                <p className="font-SF text-gray-600 dark:text-white">{new Date(video.published_at).toLocaleDateString("fr-FR")}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    */}
    </>
  );
}

export default Articles;
