import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchComments, postComment, deleteComment } from '../utils/api';

const CommentSection = ({ token, isAdmin }) => {
  const { id } = useParams(); // ID de l'article
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupération des commentaires au chargement
  useEffect(() => {
    async function loadComments() {
      setLoading(true);
      try {
        const data = await fetchComments(id);
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadComments();
  }, [id]);

  // Publication d'un nouveau commentaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const addedComment = await postComment(id, newComment, token);
      if (!addedComment) throw new Error("Erreur lors de l'envoi du commentaire");
      setComments([...comments, addedComment]);
      setNewComment('');
    } catch (err) {
      setError(err.message);
    }
  };

  // Suppression d'un commentaire
  const handleDelete = async (commentId) => {
    if (!window.confirm("Supprimer ce commentaire ?")) return;
    const success = await deleteComment(commentId, token);
    if (success) {
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } else {
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className="flex flex-col mt-10 mx-4 md:max-w-6xl md:mx-auto">
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
            <div>
              <p className="text-gray-500 font-SFBoltItalic">Connectez-vous pour commenter</p>
              <button
                onClick={() => (window.location.href = '/connexion')}
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

