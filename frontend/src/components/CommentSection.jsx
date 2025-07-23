import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CommentSection = ({ token, isAdmin }) => {
  const { id } = useParams();  // ID de l'article
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Récupération des commentaires au chargement
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/articles/${id}/comments/`);
        if (!res.ok) throw new Error("Erreur lors du chargement des commentaires");
        const data = await res.json();
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [id]);

  // 2. Publication d'un nouveau commentaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await fetch(`http://localhost:8000/api/articles/${id}/comments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: newComment,
          article: id,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Détails de l'erreur :", data);
        throw new Error("Erreur lors de l'envoi du commentaire");
      }

      setComments([...comments, data]);
      setNewComment('');
    } catch (err) {
      setError(err.message);
    }
  };

  // 3. Suppression d'un commentaire (admin uniquement)
  const handleDelete = async (commentId) => {
    if (!window.confirm("Supprimer ce commentaire ?")) return;

    try {
      const res = await fetch(`http://localhost:8000/api/comments/${commentId}/delete/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Échec de la suppression");

      // Supprime localement le commentaire du state
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error("Erreur suppression :", err.message);
      alert("Une erreur est survenue lors de la suppression.");
    }
  };

  return (
    <div className=" flex flex-col mt-10 mx-4 md:max-w-6xl md:mx-auto">
      <h3 className="text-4xl font-SFBold mb-4">Commentaires</h3>

      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <ul className="mb-4 space-y-5">
            {comments.map((comment) => (
              <li key={comment.id} className="bg-gray-100 font-SF text-xl p-3 rounded-xl shadow-lg">
                <div className="flex justify-between">
                  <p className="font-SFBold text-marron text-2xl">{comment.user_username}</p>
                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
                <p>{comment.content}</p>
              </li>                
            ))}
          </ul>

          {token ? (
            <form onSubmit={handleSubmit} className="mt-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Écrivez un commentaire..."
                className="w-full border rounded-2xl p-2"
                rows="3"
              />
              <button
                type="submit"
                className="mt-2 px-8 py-2 bg-marron text-white text-xl rounded-4xl font-SFBold hover:bg-black"
              >
                Publier
              </button>
            </form>
          ) : (
            <div><p className="text-gray-500 font-SFBoltItalic ">Connectez-vous pour commenter</p>
            <button
              onClick={() => window.location.href = '/connexion'}
              className="mt-2 px-4 py-2 bg-marron text-white font-SFBold text-xl rounded-4xl hover:bg-black"
            >
              Se connecter
            </button>
            </div>
            
          )}
        </>
      )}
    </div>
  );
};

export default CommentSection;
