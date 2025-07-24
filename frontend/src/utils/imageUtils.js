const MEDIA_URL = import.meta.env.VITE_MEDIA_URL || "http://localhost:8000/media/";

export function getImageUrl(imagePath) {
  if (!imagePath) return null;
  
  // Si l'URL commence déjà par http(s), on la retourne telle quelle
  if (imagePath.startsWith("http")) {
    return imagePath;
  }
  
  // Si le chemin commence par /media/, on l'enlève pour éviter la duplication
  const cleanPath = imagePath.replace(/^\/media\//, '');
  
  // Construire l'URL complète
  return `${MEDIA_URL}${cleanPath}`;
}

export function convertMediaUrls(html) {
  if (!html) return "";
  
  // Remplace les src="/media/..." par src="MEDIA_URL + chemin relatif"
  return html.replace(/src="(\/media\/[^"]+)"/g, (match, path) => {
    return `src="${getImageUrl(path)}"`;
  });
}
