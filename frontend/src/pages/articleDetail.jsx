// src/pages/ArticleDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommentSection  from "../components/CommentSection";
import { fetchArticleDetail } from "../utils/api";
import  "../styles/ckText.css";
import { Helmet } from "react-helmet";


function ArticleDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const token = sessionStorage.getItem("access_token");
        const data = await fetchArticleDetail(slug, token);
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);



  // ✅ Gérer le clic du bouton d'abonnement (si présent)
  useEffect(() => {
    const handleSubscribeClick = () => {
      navigate("/abonnement");
    };

    const btn = document.getElementById("subscribe-block");
    if (btn) {
      btn.addEventListener("click", handleSubscribeClick);
    }

    // Nettoyage pour éviter les doublons si le composant se remonte
    return () => {
      if (btn) {
        btn.removeEventListener("click", handleSubscribeClick);
      }
    };
  }, [article, navigate]);

  // Rendre toute la div du sommaire cliquable (redirige vers le lien interne)
  useEffect(() => {
    if (!article) return;

    const onClick = (e) => {
      // Cible un bloc d'item de sommaire contenant un lien d'ancre
      const block = e.target.closest('.toc-container > div, .article-content div');
      if (!block) return;
      const a = block.querySelector('a[href^="#"]');
      if (!a) return;

      // Si on clique déjà sur le lien, laisser le comportement du lien
      if (e.target.closest('a[href^="#"]')) return;

      const href = a.getAttribute('href') || '';
      if (!href.startsWith('#')) return;
      const id = decodeURIComponent(href.slice(1));
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', `#${id}`);
      }
    };

    const containers = document.querySelectorAll('.article-content');
    containers.forEach((c) => c.addEventListener('click', onClick));
    return () => containers.forEach((c) => c.removeEventListener('click', onClick));
  }, [article]);

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  const token = sessionStorage.getItem("access_token");

// Décodage du token pour savoir si l'utilisateur est admin
  let isAdmin = false;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Décode le token JWT
      isAdmin = payload.is_staff === true; // On récupère la valeur de is_staff dans le token
    } catch (error) {
      console.error("Erreur lors du décodage du token:", error);
    }
  }

  return (
    <>
    <Helmet>
  <title>{`${article.title} | Nutrition Antifragile`}</title>
  <meta 
    name="description" 
    content={
      article.excerpt 
        ? `${article.excerpt.replace(/<[^>]+>/g, '').split(' ').slice(0, 25).join(' ')}...` 
        : `Lisez "${article.title}" sur Nutrition Antifragile : découvrez des conseils pratiques pour une santé durable et une alimentation consciente.`
    } 
  />

  {/* Open Graph pour réseaux sociaux */}
  <meta property="og:title" content={`${article.title} | Nutrition Antifragile`} />
  <meta 
    property="og:description" 
    content={article.excerpt 
      ? article.excerpt.replace(/<[^>]+>/g, '').slice(0, 160) 
      : "Un article exclusif sur Nutrition Antifragile."} 
  />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={`https://alionka-houl.eo.symbiose-audiovisuelle.fr/articles/${article.slug}`} />
  <meta property="og:image" content={article.image || "https://alionka-houl.eo.symbiose-audiovisuelle.fr/images/default.jpg"} />
</Helmet>

    <header className=" text-center pt-10">
       <h1 className=" text-3xl mx-4 md:text-6xl md:mx-auto md:max-w-6xl font-SFBold mb-4 text-marron">{article.title}</h1>
      <p className="text-m text-gray-500 mb-6 font-SF dark:text-white">
        Publié le {new Date(article.published_at).toLocaleDateString("fr-FR")}
      </p>
    </header>
    <div className="md:mx-40 m-4">
      <div className="overflow-hidden md:w-full md:h-200">
        {article.image && (
        <img
          src={`${article.image}`}
          alt={article.title}
          className="w-full h-full object-cover object-center"
        />
      )}</div>
     
      
      <div className="article-content dark:text-white" dangerouslySetInnerHTML={{ __html: (article.excerpt) }} />
      
      <div className="article-content  dark:text-white" dangerouslySetInnerHTML={{ __html: (article.content) }} />

    </div>
    <CommentSection token={token} isAdmin={isAdmin} />
    </>
  );
}

export default ArticleDetail;
