import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContextDefinition';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
  const [expanded, setExpanded] = useState({});

  function toggleExpanded(id) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

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

  const inputCls = "w-full p-3 border border-beige2 rounded-xl font-SF dark:bg-neutral-700 dark:border-neutral-600 dark:text-white focus:outline-none focus:border-marron transition-colors";
  const selectCls = "w-full p-3 border border-beige2 rounded-xl font-SF dark:bg-neutral-700 dark:border-neutral-600 dark:text-white focus:outline-none focus:border-marron transition-colors";

  return (
    <div className="space-y-6">
      {/* Formulaire */}
      <div className="bg-white dark:bg-neutral-800 border-2 border-beige2 dark:border-neutral-700 rounded-2xl p-6 shadow-sm">
        <h3 className="font-SFBold text-marron text-lg mb-5">{editingId ? "Modifier le chapitre" : "Ajouter un chapitre"}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 font-SFBold text-sm dark:text-white">
            Thème
            <select value={themeId || ''} onChange={(e) => setThemeId(Number(e.target.value))} className={selectCls}>
              {themes.map((t) => (
                <option key={t.id} value={t.id}>{t.title}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 font-SFBold text-sm dark:text-white">
            Titre du chapitre
            <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
          </label>

          <div className="flex flex-col gap-1 font-SFBold text-sm dark:text-white">
            Contenu
            <CKEditor editor={ClassicEditor} data={content} onChange={(_, editor) => setContent(editor.getData())} />
          </div>

          <label className="flex flex-col gap-1 font-SFBold text-sm dark:text-white">
            Vidéo associée (optionnel)
            <select value={videoId || ''} onChange={(e) => setVideoId(e.target.value ? Number(e.target.value) : null)} className={selectCls}>
              <option value="">-- Aucune --</option>
              {videos.map((v) => (
                <option key={v.id} value={v.id}>{v.title} ({v.bunny_id})</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 font-SFBold text-sm dark:text-white">
            Ordre
            <input type="number" value={order} onChange={(e) => setOrder(e.target.value)} className={inputCls} />
          </label>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="font-SFBold text-white text-sm px-6 py-2.5 rounded-full bg-gradient-to-tr from-peach to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 shadow-md">
              {editingId ? "Mettre à jour" : "Ajouter le chapitre"}
            </button>
            <button type="button" onClick={resetForm} className="font-SF text-sm px-6 py-2.5 rounded-full border-2 border-beige2 dark:border-neutral-600 text-gray-600 dark:text-white hover:border-marron transition-colors">
              Annuler
            </button>
          </div>
        </form>
      </div>

      {/* Liste */}
      <div className="bg-white dark:bg-neutral-800 border-2 border-beige2 dark:border-neutral-700 rounded-2xl p-6 shadow-sm">
        <h3 className="font-SFBold text-marron text-lg mb-4">Chapitres existants</h3>
        <ul className="space-y-3">
          {chapters.map((c) => (
            <li key={c.id} className="p-4 border border-beige2 dark:border-neutral-600 rounded-xl">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="font-SFBold text-gray-800 dark:text-white">{c.title}</div>
                  <div className="font-SF text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Thème : {themes.find((t) => t.id === c.theme)?.title || c.theme} · Ordre : {c.order}
                  </div>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 font-SF">
                    {expanded[c.id] ? (
                      <div dangerouslySetInnerHTML={{ __html: c.content }} />
                    ) : (
                      <div>{truncate(stripHtml(c.content), 200)}</div>
                    )}
                    <button type="button" onClick={() => toggleExpanded(c.id)} className="font-SF text-marron text-xs mt-1 hover:underline">
                      {expanded[c.id] ? 'Voir moins' : 'Voir plus'}
                    </button>
                  </div>
                  <div className="mt-3">
                    {(() => {
                      const mapped = c.video && videoMap[c.video] ? videoMap[c.video] : null;
                      if (mapped) {
                        const directSrc = mapped.image || mapped.thumbnail || `https://vz-9c188f1c-f51.b-cdn.net/${mapped.bunny_id}/thumbnail.jpg`;
                        return (
                          <div className="flex flex-col gap-1">
                            <img src={directSrc} alt={`thumb-${c.id}`} className="h-20 object-cover rounded-lg" width={320} height={180} loading="lazy" onError={(e) => { e.target.onerror = null; }} />
                            <a href={directSrc} target="_blank" rel="noreferrer" className="font-SF text-xs text-marron hover:underline break-words">{directSrc}</a>
                          </div>
                        );
                      }
                      if (c.video_bunny) {
                        const found = videos.find((v) => v.bunny_id === c.video_bunny);
                        if (found) {
                          const directSrc = found.image || found.thumbnail || `https://vz-9c188f1c-f51.b-cdn.net/${found.bunny_id}/thumbnail.jpg`;
                          return (
                            <div className="flex flex-col gap-1">
                              <img src={directSrc} alt={`thumb-${c.id}`} className="h-20 object-cover rounded-lg" width={320} height={180} loading="lazy" onError={(e) => { e.target.onerror = null; }} />
                              <a href={directSrc} target="_blank" rel="noreferrer" className="font-SF text-xs text-marron hover:underline break-words">{directSrc}</a>
                            </div>
                          );
                        }
                      }
                      return <span className="font-SF text-xs text-gray-400">Aucune vidéo associée</span>;
                    })()}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => startEdit(c)} className="font-SF text-xs px-4 py-1.5 rounded-full border-2 border-marron text-marron hover:bg-marron hover:text-white transition-colors">Éditer</button>
                  {localIsAdmin && (
                    <button onClick={() => handleDelete(c.id)} className="font-SF text-xs px-4 py-1.5 rounded-full border-2 border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition-colors">Supprimer</button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

