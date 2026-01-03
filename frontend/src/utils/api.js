const API_URL = import.meta.env.VITE_API_URL || 'https://web-production-a7977.up.railway.app/api';

async function parseJsonOrThrow(res) {
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const body = await res.text();
    const snippet = body ? body.slice(0, 200).replace(/\s+/g, ' ') : '';
    throw new Error(`Expected JSON response but got "${contentType}". Response starts with: ${snippet}`);
  }
  return res.json();
}

export async function fetchCombinedContent() {
  const res = await fetch(`${API_URL}/content/`);
  if (!res.ok) {
    throw new Error(`Erreur ${res.status}`);
  }
  return await parseJsonOrThrow(res);
}

export async function fetchArticles() {
  const res = await fetch(`${API_URL}/articles/`);
  if (!res.ok) {
    throw new Error(`Erreur ${res.status}`);
  }
  return await parseJsonOrThrow(res);
}

export async function fetchVideos() {
  const res = await fetch(`${API_URL}/videos/`);
  if (!res.ok) {
    throw new Error(`Erreur lors du chargement des videos ${res.status}`);
  }
  return await parseJsonOrThrow(res);
}

export async function fetchArticleDetail(slug, token = null) {
  const response = await fetch(`${API_URL}/articles/${slug}/`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new Error("Article non trouvé");
  }
  return await parseJsonOrThrow(response);
}

export async function fetchVideoDetail(slug, token = null) {
  const response = await fetch(`${API_URL}/video/${slug}/`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  
  if (!response.ok) {
    throw new Error("Vidéo non trouvée");
  }
  return await parseJsonOrThrow(response);
  
}

export async function fetchComments(articleId) {
  try {
    const res = await fetch(`${API_URL}/articles/${articleId}/comments/`);
    if (!res.ok) throw new Error("Erreur lors du chargement des commentaires");
    return await parseJsonOrThrow(res);
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Poster un commentaire
export async function postComment(articleId, content, token) {
  try {
    const res = await fetch(`${API_URL}/articles/${articleId}/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content, article: articleId }),
    });
    if (!res.ok) throw new Error("Erreur lors de l’envoi du commentaire");
    return await parseJsonOrThrow(res);
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Ajouter: Poster une réponse à un commentaire (admins et utilisateurs inscrits)
export async function postReply(articleId, parentCommentId, content, token) {
  try {
    const res = await fetch(`${API_URL}/articles/${articleId}/comments/${parentCommentId}/reply/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content, article: articleId, parent_comment: parentCommentId }),
    });
    if (!res.ok) throw new Error("Erreur lors de l'envoi de la réponse");
    return await parseJsonOrThrow(res);
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Supprimer un commentaire
export async function deleteComment(commentId, token) {
  try {
    const res = await fetch(`${API_URL}/comments/${commentId}/delete/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.ok;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function createCheckoutSession(plan, token) {
    const res = await fetch(`${API_URL}/create-checkout-session/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ plan }),
    });

    if (!res.ok) {
        throw new Error(`Erreur ${res.status} : ${res.statusText}`);
    }

    return await parseJsonOrThrow(res);
}

// =============================
// Video Comments API
// =============================
export async function fetchVideoComments(videoId) {
  try {
    const res = await fetch(`${API_URL}/videos/${videoId}/comments/`);
    if (!res.ok) throw new Error("Erreur lors du chargement des commentaires");
    return await parseJsonOrThrow(res);
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function postVideoComment(videoId, content, token) {
    try {
    const res = await fetch(`${API_URL}/videos/${videoId}/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content, video: videoId }),
    });
    if (!res.ok) throw new Error("Erreur lors de l'envoi du commentaire");
    return await parseJsonOrThrow(res);
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function postVideoReply(videoId, parentCommentId, content, token) {
    try {
    const res = await fetch(`${API_URL}/videos/${videoId}/comments/${parentCommentId}/reply/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });
    if (!res.ok) throw new Error("Erreur lors de l'envoi de la réponse");
    return await parseJsonOrThrow(res);
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function deleteVideoComment(commentId, token) {
    try {
    const res = await fetch(`${API_URL}/video-comments/${commentId}/delete/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.ok;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export default API_URL

