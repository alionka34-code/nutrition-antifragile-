// src/components/BunnyPlayer.jsx
import React, { useEffect } from "react";

const BunnyPlayer = ({ libraryId, videoId, accent = "#8B4513", background = "transparent" }) => {
  useEffect(() => {
    const initPlayer = () => {
      if (window.BunnySDK && window.BunnySDK.Player) {
        // Initialise le player Bunny
        new window.BunnySDK.Player("#bunny-player", {
          video: videoId,
          collection: libraryId,
          theme: {
            accent,
            background,
          },
          autoplay: false,
        });
      }
    };

    // Si le SDK n’est pas encore chargé, on l’ajoute au DOM
    if (!document.querySelector('script[src="https://player.bunny.net/bunny.player.js"]')) {
      const script = document.createElement("script");
      script.src = "https://player.bunny.net/bunny.player.js";
      script.async = true;
      script.onload = initPlayer;
      document.body.appendChild(script);
    } else {
      initPlayer();
    }
  }, [videoId, libraryId, accent, background]);

  return (
    <div
      id="bunny-player"
      className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg bg-transparent"
    ></div>
  );
};

export default BunnyPlayer;
