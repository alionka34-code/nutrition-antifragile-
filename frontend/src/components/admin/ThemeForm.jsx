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

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="p-4 border rounded">
        <div className="flex flex-col gap-2">
          <label>Thème :</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2" />

          <label>Description :</label>
          <CKEditor
            editor={ClassicEditor}
            data={description}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDescription(data);
            }}
          />

          <label>Image :</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

          <label>Durée (minutes) :</label>
          <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} className="border p-2" />

          <div className="pt-2">
            <button type="submit" className="btn">
              {editingId ? "Mettre à jour" : "Ajouter le thème"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="ml-2 btn-secondary">
                Annuler
              </button>
            )}
          </div>
        </div>
      </form>

      <div>
        <h3 className="text-lg font-bold">Thèmes existants</h3>
        <ul className="space-y-3">
          {themes.map((t) => (
            <li key={t.id} className="p-3 border rounded flex justify-between items-start">
              <div>
                <div className="font-semibold">{t.title}</div>
                <div className="text-sm text-gray-600">Durée: {t.duration} minutes</div>
                {t.description && (
                  <div className="mt-2 text-sm text-gray-700" title={stripHtml(t.description)}>
                    {expanded[t.id] ? (
                      <div dangerouslySetInnerHTML={{ __html: t.description }} />
                    ) : (
                      <div>{truncate(stripHtml(t.description), 200)}</div>
                    )}
                    <button type="button" onClick={() => toggleExpanded(t.id)} className="text-blue-600 text-sm mt-1">
                      {expanded[t.id] ? 'Voir moins' : 'Voir plus'}
                    </button>
                  </div>
                )}
                {t.image_url && (
                  <img src={t.image_url} alt={t.title} className="mt-2 max-h-24 object-contain" />
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(t)} className="btn small">Éditer</button>
                {localIsAdmin && <button onClick={() => handleDelete(t.id)} className="btn-danger small">Supprimer</button>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ThemeForm;