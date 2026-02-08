import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContextDefinition';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import BunnyPlayer from '../BunnyPlayer';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export default function ChapterForm() {
  const { isAdmin } = useContext(AuthContext) || {};
  const [themeId, setThemeId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [videoId, setVideoId] = useState(null);
  const [order, setOrder] = useState(0);
  const [chapters, setChapters] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [themes, setThemes] = useState([]);
  const [videos, setVideos] = useState([]);
  const [videoMap, setVideoMap] = useState({});
  const [localIsAdmin, setLocalIsAdmin] = useState(isAdmin || false);

  useEffect(() => {
    fetchThemes();
    fetchVideos();
    fetchChapters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setLocalIsAdmin(Boolean(payload.is_staff) || Boolean(isAdmin));
      } catch (e) {
        setLocalIsAdmin(Boolean(isAdmin));
      }
    } else {
      setLocalIsAdmin(Boolean(isAdmin));
    }
  }, [isAdmin]);

  async function fetchThemes() {
    try {
      const res = await fetch(`${API_URL}/themes/`);
      const data = await res.json();
      setThemes(data || []);
      if (data && data.length && !themeId) setThemeId(data[0].id);
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchVideos() {
    try {
      const res = await fetch(`${API_URL}/videos/`);
      const data = await res.json();
      setVideos(data || []);
      const map = {};
      (data || []).forEach((v) => {
        map[v.id] = { bunny_id: v.bunny_id, thumbnail: v.thumbnail, image: v.image || null };
      });
      setVideoMap(map);
      if (data && data.length && !videoId) setVideoId(data[0].id);
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchChapters() {
    try {
      const res = await fetch(`${API_URL}/chapters/`);
      const data = await res.json();
      setChapters(data || []);
    } catch (e) {
      console.error(e);
    }
  }

  function resetForm() {
    setTitle('');
    setContent('');
    setVideoId(videos && videos[0] ? videos[0].id : null);
    setOrder(0);
  }

  const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
  };

  const truncate = (text, max = 200) => {
    if (!text) return '';
    return text.length > max ? text.slice(0, max) + '...' : text;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const token = sessionStorage.getItem('access_token');
    if (!token) return alert('Vous devez être connecté en tant qu\'admin.');
    if (!localIsAdmin) return alert('Seuls les admins peuvent créer des chapitres.');

    const payload = {
      theme: Number(themeId),
      title,
      content,
      order: Number(order || 0),
    };
    if (videoId) payload.video = Number(videoId);

    try {
      const url = editingId ? `${API_URL}/chapters/${editingId}/` : `${API_URL}/chapters/`;
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Erreur API');
      }
      await fetchChapters();
      resetForm();
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert('Erreur lors de l\'enregistrement du chapitre.');
    }
  }

  function startEdit(chapter) {
    setEditingId(chapter.id);
    setThemeId(chapter.theme || null);
    setTitle(chapter.title || '');
    setContent(chapter.content || '');
    setOrder(chapter.order || 0);
    // if API returned numeric video id
    if (chapter.video) setVideoId(chapter.video);
    else setVideoId(null);
  }

  async function handleDelete(id) {
    if (!confirm('Supprimer ce chapitre ?')) return;
    const token = sessionStorage.getItem('access_token');
    const previous = chapters;
    setChapters((c) => c.filter((ch) => ch.id !== id));
    try {
      const res = await fetch(`${API_URL}/chapters/${id}/`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Erreur suppression');
    } catch (err) {
      console.error(err);
      setChapters(previous);
      alert('Impossible de supprimer le chapitre.');
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="p-4 border rounded">
        <div className="flex flex-col gap-2">
          <label>Thème</label>
          <select value={themeId || ''} onChange={(e) => setThemeId(Number(e.target.value))} className="border p-2">
            {themes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>

          <label>Titre du chapitre</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2" />

          <label>Contenu</label>
          <CKEditor editor={ClassicEditor} data={content} onChange={(event, editor) => setContent(editor.getData())} />

          <label>Vidéo associée (optionnel)</label>
          <select value={videoId || ''} onChange={(e) => setVideoId(e.target.value ? Number(e.target.value) : null)} className="border p-2">
            <option value="">-- Aucun --</option>
            {videos.map((v) => (
              <option key={v.id} value={v.id}>
                {v.title} ({v.bunny_id})
              </option>
            ))}
          </select>

          <label>Ordre</label>
          <input type="number" value={order} onChange={(e) => setOrder(e.target.value)} className="border p-2" />

          <div className="pt-2">
            <button type="submit" className="btn">Ajouter le chapitre</button>
            <button type="button" onClick={resetForm} className="ml-2 btn-secondary">Annuler</button>
          </div>
        </div>
      </form>

      <div>
        <h3 className="text-lg font-bold">Chapitres existants</h3>
        <ul className="space-y-3">
          {chapters.map((c) => (
            <li key={c.id} className="p-3 border rounded">
              <div className="font-semibold">{c.title}</div>
              <div className="text-sm text-gray-600">Thème: {themes.find((t) => t.id === c.theme)?.title || c.theme}</div>
              <div className="text-sm text-gray-600">Ordre: {c.order}</div>
              <div className="mt-2 text-sm text-gray-700">{truncate(stripHtml(c.content), 200)}</div>
                  <div className="mt-2 flex items-center gap-4">
                    {(() => {
                      // prefer video thumbnail from fetched videos
                      const mapped = c.video && videoMap[c.video] ? videoMap[c.video] : null;
                      if (mapped) {
                        const src = mapped.thumbnail || `https://vz-9c188f1c-f51.b-cdn.net/${mapped.bunny_id}/thumbnail.jpg`;
                        // prefer direct `image` like in article.jsx, fallback to thumbnail or Bunny CDN
                        const directSrc = mapped.image || mapped.thumbnail || `https://vz-9c188f1c-f51.b-cdn.net/${mapped.bunny_id}/thumbnail.jpg`;
                        return (
                          <div className="flex flex-col">
                            <img
                              src={directSrc}
                              alt={`thumb-${c.id}`}
                              className="h-24 object-cover rounded"
                              width={320}
                              height={180}
                              loading="lazy"
                              onError={(e) => {
                                // no further fallback available here
                                e.target.onerror = null;
                              }}
                            />
                            <a href={directSrc} target="_blank" rel="noreferrer" className="text-xs break-words text-blue-600 mt-1">{directSrc}</a>
                          </div>
                        );
                      }

                      // fallback: try to find a video by bunny_id returned on chapter
                      if (c.video_bunny) {
                        const found = videos.find((v) => v.bunny_id === c.video_bunny);
                      if (found) {
                        const src = found.thumbnail || `https://vz-9c188f1c-f51.b-cdn.net/${found.bunny_id}/thumbnail.jpg`;
                        const directSrc = found.image || found.thumbnail || `https://vz-9c188f1c-f51.b-cdn.net/${found.bunny_id}/thumbnail.jpg`;
                        return (
                          <div className="flex flex-col">
                          <img
                            src={directSrc}
                              alt={`thumb-${c.id}`}
                              className="h-24 object-cover rounded"
                              width={320}
                              height={180}
                              loading="lazy"
                              onError={(e) => {
                                e.target.onerror = null;
                              }}
                            />
                          <a href={directSrc} target="_blank" rel="noreferrer" className="text-xs break-words text-blue-600 mt-1">{directSrc}</a>
                          </div>
                        );
                      }
                      }

                      return <div className="text-sm text-gray-500">Aucune vidéo associée</div>;
                    })()}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button onClick={() => startEdit(c)} className="btn small">Éditer</button>
                    {localIsAdmin && (
                      <button onClick={() => handleDelete(c.id)} className="btn-danger small">Supprimer</button>
                    )}
                  </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

