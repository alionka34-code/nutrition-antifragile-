// src/pages/VideoDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchVideoDetail } from "../utils/api";
import { Helmet } from "react-helmet";
import VideoCommentSection from "../components/VideoCommentSection";

function VideoDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = sessionStorage.getItem("access_token");
  
  // Décodage token pour savoir si admin et si abonné
  let isAdmin = false;
  let isSubscribed = false;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      isAdmin = payload.is_staff === true;
      isSubscribed = payload.is_subscribed === true;
    } catch {
      // Token invalide
    }
  }

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const data = await fetchVideoDetail(slug, token);
        setVideo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadVideo();
  }, [slug, token]);

  // Charger l'URL de la vidéo seulement pour les utilisateurs abonnés/admin
  useEffect(() => {
    if (!video || (!isSubscribed && !isAdmin)) return;
    
    const iframe = document.getElementById('bunny-stream-embed');
    if (!iframe) return;

    // URL complète avec token pour les abonnés
    const baseUrl = 'https://iframe.mediadelivery.net/embed/515846/';
    const videoId = video.bunny_id;
    const tokenParam = video.security_token ? `?token=${video.security_token}` : '';
    
    iframe.src = baseUrl + videoId + tokenParam;
    
  }, [video, isSubscribed, isAdmin]);

  // Initialiser Bunny Player.js seulement pour les utilisateurs abonnés/admin
  useEffect(() => {
    if (!video || (!isSubscribed && !isAdmin)) return;

    const script = document.createElement("script");
    script.src = "//assets.mediadelivery.net/playerjs/playerjs-latest.min.js";
    script.async = true;
    script.onload = () => {
      try {
        new window.playerjs.Player("bunny-stream-embed");
      } catch (error) {
        console.error("Erreur initialisation Bunny Player.js", error);
      }
    };
    
    const existingScript = document.querySelector(`script[src="${script.src}"]`);
    if (!existingScript) {
      document.body.appendChild(script);
    }

    return () => {
      const scriptToRemove = document.querySelector(`script[src="${script.src}"]`);
      if (scriptToRemove) {
        document.body.removeChild(scriptToRemove);
      }
    };
  }, [video, isSubscribed, isAdmin]);

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!video) return <p className="text-center mt-10">Vidéo non trouvée.</p>;

  return (
    <>
      <Helmet>
        <title>{`${video.title} | Nutrition Antifragile`}</title>
        <meta
          name="description"
          content={video.description || "Découvrez cette vidéo exclusive sur Nutrition Antifragile."}
        />
      </Helmet>

      <header className="text-center pt-10">
        <h1 className="text-3xl md:text-6xl font-SFBold mb-4 text-marron">{video.title}</h1>
        
        <p className="text-gray-500 mb-6 font-SF dark:text-white">
          Publié le {new Date(video.published_at).toLocaleDateString("fr-FR")}
        </p>
      </header>

      <div className="md:mx-40 m-10">
        {/* Video */}
        <div className="w-full aspect-video mb-10 relative rounded-2xl overflow-hidden shadow-lg bg-gray-800">
          {/* Affichage conditionnel : iframe pour abonnés, thumbnail pour non-abonnés */}
          {(isSubscribed || isAdmin) ? (
            // Iframe vidéo pour les utilisateurs abonnés/admin
            <iframe
              id="bunny-stream-embed"
              allow="fullscreen; picture-in-picture"
              allowFullScreen
              frameBorder="0"
              className="w-full h-full"
              title={video.title}
            ></iframe>
          ) : (
            // Thumbnail avec overlay pour les non-abonnés
            <div className="w-full h-full relative">
              {/* Thumbnail de la vidéo */}
              <img
                src={video.thumbnail || `https://vz-515846c6-860.b-cdn.net/${video.bunny_id}/thumbnail.jpg`}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay avec message d'abonnement */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-center  p-2 md:p-8 bg-white rounded-xl shadow-2xl max-w-xs md:max-w-xl mx-3 md:mx-4">
                  <div className="mb-3 md:mb-6">
                    <svg className="w-8 h-8 md:w-16 md:h-16 text-marron mx-auto mb-2 md:mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <h3 className="text-lg md:text-2xl font-SFBold text-marron mb-1 md:mb-2">Contenu Premium</h3>
                    <p className="text-gray-600 font-SF mb-3 md:mb-6 text-sm md:text-base">
                      Abonnez-vous pour voir cette vidéo exclusive.
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/abonnement')}
                    className="bg-marron text-white px-4 py-2 md:px-8 md:py-3 rounded-lg font-SFBold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg text-sm md:text-base"
                  >
                    S'abonner maintenant
                  </button>
                  <p className="text-xs md:text-sm text-gray-500 mt-2 md:mt-4 font-SF">
                    Accès immédiat à toutes les vidéos
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="text-gray-700 dark:text-white mb-10">
          <p>{video.description}</p>
        </div>
        
        {/* Section commentaires */}
        {video && <VideoCommentSection token={token} isAdmin={isAdmin} videoId={video.id} />}
      </div>
    </>
  );
}

export default VideoDetail;
