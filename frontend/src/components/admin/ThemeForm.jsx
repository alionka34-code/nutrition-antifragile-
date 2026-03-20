import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContextDefinition";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

function ThemeForm() {
  const { isAdmin } = useContext(AuthContext) || {};
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [duration, setDuration] = useState(0);
  const [themes, setThemes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [token, setToken] = useState(() => sessionStorage.getItem("access_token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [localIsAdmin, setLocalIsAdmin] = useState(isAdmin || false);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    // load themes once
    fetchThemes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // update admin/auth state when token or context changes
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setLocalIsAdmin(Boolean(payload.is_staff) || Boolean(isAdmin));
        setIsAuthenticated(true);
      } catch (e) {
        setIsAuthenticated(false);
        setLocalIsAdmin(Boolean(isAdmin));
      }
    } else {
      setIsAuthenticated(false);
      setLocalIsAdmin(Boolean(isAdmin));
    }
  }, [token, isAdmin]);

  async function fetchThemes() {
    try {
      const res = await fetch(`${API_URL}/themes/`);
      const data = await res.json();
      setThemes(data || []);
    } catch (err) {
      console.error(err);
    }
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setImage(null);
    setDuration(0);
    setEditingId(null);
  }

  const stripHtml = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "");
  };

  const truncate = (text, max = 200) => {
    if (!text) return "";
    return text.length > max ? text.slice(0, max) + "..." : text;
  };

  const toggleExpanded = (id) => {
    setExpanded((s) => ({ ...s, [id]: !s[id] }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const currentToken = sessionStorage.getItem("access_token");
    if (!currentToken) {
      alert("Vous devez être connecté en tant qu'admin pour ajouter un thème.");
      return;
    }
    if (!localIsAdmin) {
      alert("Seuls les admins peuvent créer ou modifier des thèmes.");
      return;
    }

    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    if (image) fd.append("image", image);
    fd.append("duration", duration || 0);

    const url = editingId ? `${API_URL}/themes/${editingId}/` : `${API_URL}/themes/`;
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: currentToken ? { Authorization: `Bearer ${currentToken}` } : {},
        body: fd,
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Erreur API");
      }

      await fetchThemes();
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'enregistrement du thème.");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Supprimer ce thème ?")) return;
    const currentToken = sessionStorage.getItem("access_token");
    // Optimistic removal from UI
    const previous = themes;
    setThemes((t) => t.filter((item) => item.id !== id));
    try {
      const res = await fetch(`${API_URL}/themes/${id}/`, {
        method: "DELETE",
        headers: currentToken ? { Authorization: `Bearer ${currentToken}` } : {},
      });
      if (!res.ok) {
        throw new Error("Erreur suppression");
      }
      // success: nothing to do (already removed)
    } catch (err) {
      console.error(err);
      // restore previous list on error
      setThemes(previous);
      alert("Impossible de supprimer.");
    }
  }

  function startEdit(theme) {
    setEditingId(theme.id);
    setTitle(theme.title || "");
    setDescription(theme.description || "");
    setDuration(theme.duration || 0);
  }

  const inputCls = "w-full p-3 border border-beige2 rounded-xl font-SF dark:bg-neutral-700 dark:border-neutral-600 dark:text-white focus:outline-none focus:border-marron transition-colors";

  return (
    <div className="space-y-6">
      {/* Formulaire */}
      <div className="bg-white dark:bg-neutral-800 border-2 border-beige2 dark:border-neutral-700 rounded-2xl p-6 shadow-sm">
        <h3 className="font-SFBold text-marron text-lg mb-5">{editingId ? "Modifier le thème" : "Ajouter un thème"}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 font-SFBold text-sm dark:text-white">
            Titre du thème
            <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
          </label>

          <div className="flex flex-col gap-1 font-SFBold text-sm dark:text-white">
            Description
            <CKEditor
              editor={ClassicEditor}
              data={description}
              onChange={(_, editor) => setDescription(editor.getData())}
            />
          </div>

          <label className="flex flex-col gap-1 font-SFBold text-sm dark:text-white">
            Image
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="font-SF text-sm text-gray-600 dark:text-white" />
          </label>

          <label className="flex flex-col gap-1 font-SFBold text-sm dark:text-white">
            Durée (minutes)
            <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} className={inputCls} />
          </label>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="font-SFBold text-white text-sm px-6 py-2.5 rounded-full bg-gradient-to-tr from-peach to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 shadow-md">
              {editingId ? "Mettre à jour" : "Ajouter le thème"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="font-SF text-sm px-6 py-2.5 rounded-full border-2 border-beige2 dark:border-neutral-600 text-gray-600 dark:text-white hover:border-marron transition-colors">
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Liste */}
      <div className="bg-white dark:bg-neutral-800 border-2 border-beige2 dark:border-neutral-700 rounded-2xl p-6 shadow-sm">
        <h3 className="font-SFBold text-marron text-lg mb-4">Thèmes existants</h3>
        <ul className="space-y-3">
          {themes.map((t) => (
            <li key={t.id} className="p-4 border border-beige2 dark:border-neutral-600 rounded-xl flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="font-SFBold text-gray-800 dark:text-white">{t.title}</div>
                <div className="font-SF text-xs text-gray-500 dark:text-gray-400 mt-0.5">Durée : {t.duration} min</div>
                {t.description && (
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 font-SF">
                    {expanded[t.id] ? (
                      <div dangerouslySetInnerHTML={{ __html: t.description }} />
                    ) : (
                      <div>{truncate(stripHtml(t.description), 200)}</div>
                    )}
                    <button type="button" onClick={() => toggleExpanded(t.id)} className="font-SF text-marron text-xs mt-1 hover:underline">
                      {expanded[t.id] ? 'Voir moins' : 'Voir plus'}
                    </button>
                  </div>
                )}
                {t.image_url && (
                  <img src={t.image_url} alt={t.title} className="mt-2 max-h-20 object-contain rounded-lg" />
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(t)} className="font-SF text-xs px-4 py-1.5 rounded-full border-2 border-marron text-marron hover:bg-marron hover:text-white transition-colors">Éditer</button>
                {localIsAdmin && (
                  <button onClick={() => handleDelete(t.id)} className="font-SF text-xs px-4 py-1.5 rounded-full border-2 border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition-colors">Supprimer</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ThemeForm;