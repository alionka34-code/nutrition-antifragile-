import React, { useState, useEffect } from 'react';
import { fetchComments, postComment, deleteComment, postReply } from '../utils/api';

const CommentSection = ({
  token,
  isAdmin,
  articleId,
  fetchCommentsFn,
  postCommentFn,
  deleteCommentFn,
  postReplyFn,
}) => {
  const _fetchComments = fetchCommentsFn || ((id) => fetchComments(id));
  const _postComment = postCommentFn || ((id, content, tok) => postComment(id, content, tok));
  const _deleteComment = deleteCommentFn || ((id, tok) => deleteComment(id, tok));
  const _postReply = postReplyFn || ((id, parentId, content, tok) => postReply(id, parentId, content, tok));
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null); // ID du commentaire en cours de réponse
  const [replyContent, setReplyContent] = useState(''); // Contenu de la réponse

  // Récupération des commentaires au chargement
  useEffect(() => {
    if (!articleId) return;
    
    async function loadComments() {
      setLoading(true);
      try {
        const data = await _fetchComments(articleId);
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadComments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId]);

  // Publication d'un nouveau commentaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const addedComment = await _postComment(articleId, newComment, token);
      if (!addedComment) throw new Error("Erreur lors de l'envoi du commentaire");
      setComments([...comments, addedComment]);
      setNewComment('');
    } catch (err) {
      setError(err.message);
    }
  };

  // Suppression d'un commentaire (supporte les réponses imbriquées)
  const handleDelete = async (commentId) => {
    if (!window.confirm("Supprimer ce commentaire ?")) return;
    const success = await _deleteComment(commentId, token);
    if (success) {
      setComments((prev) => {
        const topFiltered = prev.filter((c) => c.id !== commentId);
        if (topFiltered.length !== prev.length) return topFiltered;
        return removeNode(prev, commentId);
      });
    } else {
      alert("Erreur lors de la suppression");
    }
  };

  // Helpers: recherche et mise à jour immuable de l'arbre de commentaires
  const findNodeById = (nodes, nodeId) => {
    for (const n of nodes || []) {
      if (n.id === nodeId) return n;
      const found = findNodeById(n.replies || [], nodeId);
      if (found) return found;
    }
    return null;
  };

  const addChild = (nodes, parentId, child) => {
    return (nodes || []).map((n) => {
      if (n.id === parentId) {
        return { ...n, replies: [...(n.replies || []), child] };
      }
      if (n.replies && n.replies.length) {
        return { ...n, replies: addChild(n.replies, parentId, child) };
      }
      return n;
    });
  };

  const replaceNode = (nodes, matchId, newNode) => {
    return (nodes || []).map((n) => {
      if (n.id === matchId) {
        // Préserver d'éventuelles sous-réponses optimistes si non renvoyées par le backend
        const preservedReplies = n.replies || [];
        return { ...newNode, replies: newNode.replies ?? preservedReplies };
      }
      if (n.replies && n.replies.length) {
        return { ...n, replies: replaceNode(n.replies, matchId, newNode) };
      }
      return n;
    });
  };

  const removeNode = (nodes, matchId) => {
    return (nodes || []).map((n) => {
      let replies = n.replies || [];
      // Supprimer si enfant direct
      replies = replies.filter((r) => r.id !== matchId);
      // Propager récursivement
      replies = replies.length ? removeNode(replies, matchId) : replies;
      return { ...n, replies };
    });
  };

  // Répondre à un commentaire (multi-niveau) avec envoi optimiste
  const handleReply = async (parentCommentId) => {
    if (!replyContent.trim()) return;

    // Infos du parent (pour afficher un indicateur local du destinataire)
    const parentNode = findNodeById(comments, parentCommentId);

    // Créer une réponse optimiste
    const tempId = `temp-${Date.now()}`;
    const optimisticReply = {
      id: tempId,
      content: replyContent,
      user_username: 'Vous', // Indication locale, remplacée par la réponse réelle
      parent_comment_username: parentNode?.user_username || undefined,
      replies: [],
    };

    // MAJ optimiste de l'état
    setComments((prev) => addChild(prev, parentCommentId, optimisticReply));
    setReplyContent('');
    setReplyingTo(null);

    try {
      const created = await _postReply(articleId, parentCommentId, optimisticReply.content, token);
      if (!created) throw new Error("Erreur lors de l'envoi de la réponse");
      // Remplacer le noeud temporaire par la vraie réponse
      setComments((prev) => replaceNode(prev, tempId, created));
    } catch (err) {
      // Rollback si échec
      setComments((prev) => removeNode(prev, tempId));
      // Optionnel: ré-ouvrir le formulaire avec le contenu saisi
      setReplyingTo(parentCommentId);
      setReplyContent(optimisticReply.content);
      setError(err?.message || "Une erreur est survenue");
      console.error(err);
    }
  };

  // Élément de réponse récursif (multi-niveau)
  const ReplyItem = ({ reply, depth = 1 }) => (
    <div className={`mt-3 p-3 rounded-2xl border-l-4 border-marron bg-gray-50 dark:bg-neutral-700 ${depth > 0 ? 'ml-8' : ''}`}>
      <div className="flex justify-between">
        <p className="font-SFBold text-marron text-lg">
          {reply.user_username}
          {reply.parent_comment_username && (
            <span className="text-gray-600 text-sm dark:text-white "> → {reply.parent_comment_username}</span>
          )}
        </p>
        <div className="flex gap-2">
          {token && (
            <button
              onClick={() => setReplyingTo(reply.id)}
              className="text-sm text-marron hover:underline"
            >
              Répondre
            </button>
          )}
          {isAdmin && (
            <button
              onClick={() => handleDelete(reply.id)}
              className="text-sm text-red-600 hover:underline"
            >
              Supprimer
            </button>
          )}
        </div>
      </div>
      <p className="text-lg  dark:text-white">{reply.content}</p>

      {/* Formulaire de réponse pour cette réponse */}
      {replyingTo === reply.id && token && (
        <div className="mt-3 ml-2">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Écrivez votre réponse..."
            className="w-full border rounded-xl p-2 text-base"
            rows="2"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleReply(reply.id)}
              className="px-4 py-1 bg-marron text-white text-sm rounded-xl font-SFBold hover:bg-black"
            >
              Répondre
            </button>
            <button
              onClick={() => {
                setReplyingTo(null);
                setReplyContent('');
              }}
              className="px-4 py-1 bg-gray-400 text-white text-sm rounded-xl hover:bg-gray-600"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Rendu récursif des sous-réponses */}
      {reply.replies && reply.replies.map((child) => (
        <ReplyItem key={child.id} reply={child} depth={depth + 1} />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col mt-10 mx-4 md:max-w-6xl md:mx-auto">
      <h3 className="text-4xl font-SFBold mb-4 text-marron">Commentaires</h3>

      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <ul className="mb-4 space-y-5">
            {comments.map((comment) => (
              <li key={comment.id} className="bg-gray-100 font-SF text-xl p-5 rounded-4xl shadow-lg dark:bg-neutral-800 dark:border-neutral-500">
                <div className="flex justify-between">
                  <p className="font-SFBold text-marron text-2xl">{comment.user_username}</p>
                  <div className="flex gap-2">
                    {token && (
                      <button
                        onClick={() => setReplyingTo(comment.id)}
                        className="text-sm text-marron hover:underline"
                      >
                        Répondre
                      </button>
                    )}
                    {isAdmin && (
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Supprimer
                      </button>
                    )}
                  </div>
                </div>
                <p className=' dark:text-white'>{comment.content}</p>

                {/* Formulaire de réponse pour un commentaire de 1er niveau */}
                {replyingTo === comment.id && token && (
                  <div className="mt-3 ml-4">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Écrivez votre réponse..."
                      className="w-full border rounded-xl p-2 text-base"
                      rows="2"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleReply(comment.id)}
                        className="px-4 py-1 bg-marron text-white text-sm rounded-xl font-SFBold hover:bg-black"
                      >
                        Répondre
                      </button>
                      <button
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyContent('');
                        }}
                        className="px-4 py-1 bg-gray-400 text-white text-sm rounded-xl hover:bg-gray-600"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                )}

                {/* Afficher récursivement toutes les réponses */}
                {comment.replies && comment.replies.map((reply) => (
                  <ReplyItem key={reply.id} reply={reply} depth={1} />
                ))}
              </li>
            ))}
          </ul>

          {token ? (
            <form onSubmit={handleSubmit} className="mt-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Écrivez un commentaire..."
                className="w-full border rounded-4xl p-2  dark:text-white"
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
              <p className="text-gray-500 font-SFBoltItalic  dark:text-white">Connectez-vous pour commenter</p>
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

