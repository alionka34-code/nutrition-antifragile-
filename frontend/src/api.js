const API_URL = process.env.REACT_APP_API_URL; 

export async function fetchArticles() {
  const res = await fetch(`${API_URL}/articles/`);
  if (!res.ok) {
    throw new Error(`Erreur ${res.status}`);
  }
  return await res.json();
}
