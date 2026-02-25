import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContextDefinition";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

function AnnexeForm() {
  const { isAdmin } = useContext(AuthContext) || {};
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [duration, setDuration] = useState(0);
  const [fichierPdf, setFichierPdf] = useState(null);
  const [annexes, setAnnexes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [token] = useState(() => sessionStorage.getItem("access_token"));
  const [localIsAdmin, setLocalIsAdmin] = useState(isAdmin || false);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    fetchAnnexes();
  }, []);

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setLocalIsAdmin(Boolean(payload.is_staff) || Boolean(isAdmin));
      } catch {
        setLocalIsAdmin(Boolean(isAdmin));
      }
    } else {
      setLocalIsAdmin(Boolean(isAdmin));
    }
  }, [token, isAdmin]);

  async function fetchAnnexes() {
    try {
      const res = await fetch(`${API_URL}/annexes/`);
      const data = await res.json();
      setAnnexes(data || []);
    } catch (err) {
      console.error(err);
    }
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setImage(null);
    setDuration(0);
    setFichierPdf(null);
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
      alert("Vous devez être connecté en tant qu'admin pour ajouter une annexe.");
      return;
    }
    if (!localIsAdmin) {
      alert("Seuls les admins peuvent créer ou modifier des annexes.");
      return;
    }

    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    if (image) fd.append("image", image);
    fd.append("duration", duration || 0);
    if (fichierPdf) fd.append("fichier_pdf", fichierPdf);

    const url = editingId ? `${API_URL}/annexes/${editingId}/` : `${API_URL}/annexes/`;
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

      await fetchAnnexes();
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'enregistrement de l'annexe.");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Supprimer cette annexe ?")) return;
    const currentToken = sessionStorage.getItem("access_token");
    const previous = annexes;
    setAnnexes((a) => a.filter((item) => item.id !== id));
    try {
      const res = await fetch(`${API_URL}/annexes/${id}/`, {
        method: "DELETE",
        headers: currentToken ? { Authorization: `Bearer ${currentToken}` } : {},
      });
      if (!res.ok) {
        throw new Error("Erreur suppression");
      }
    } catch (err) {
      console.error(err);
      setAnnexes(previous);
      alert("Impossible de supprimer.");
    }
  }

  function startEdit(annexe) {
    setEditingId(annexe.id);
    setTitle(annexe.title || "");
    setDescription(annexe.description || "");
    setDuration(annexe.duration || 0);
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="p-4 border rounded">
        <div className="flex flex-col gap-2">
          <label>Titre :</label>
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

          <label>Durée de lecture (minutes) :</label>
          <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} className="border p-2" />

          <label>Fichier PDF :</label>
          <input type="file" accept=".pdf" onChange={(e) => setFichierPdf(e.target.files[0])} />

          <div className="pt-2">
            <button type="submit" className="btn">
              {editingId ? "Mettre à jour" : "Ajouter l'annexe"}
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
        <h3 className="text-lg font-bold">Annexes existantes</h3>
        <ul className="space-y-3">
          {annexes.map((a) => (
            <li key={a.id} className="p-3 border rounded flex justify-between items-start">
              <div>
                <div className="font-semibold">{a.title}</div>
                <div className="text-sm text-gray-600">Durée de lecture : {a.duration} minutes</div>
                {a.description && (
                  <div className="mt-2 text-sm text-gray-700" title={stripHtml(a.description)}>
                    {expanded[a.id] ? (
                      <div dangerouslySetInnerHTML={{ __html: a.description }} />
                    ) : (
                      <div>{truncate(stripHtml(a.description), 200)}</div>
                    )}
                    <button type="button" onClick={() => toggleExpanded(a.id)} className="text-blue-600 text-sm mt-1">
                      {expanded[a.id] ? 'Voir moins' : 'Voir plus'}
                    </button>
                  </div>
                )}
                {a.image_url && (
                  <img src={a.image_url} alt={a.title} className="mt-2 max-h-24 object-contain" />
                )}
                {a.fichier_pdf_url && (
                  <div className="mt-2">
                    <a href={a.fichier_pdf_url} target="_blank" rel="noreferrer" className="text-blue-600 text-sm underline">
                      Télécharger le PDF
                    </a>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(a)} className="btn small">Éditer</button>
                {localIsAdmin && <button onClick={() => handleDelete(a.id)} className="btn-danger small">Supprimer</button>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AnnexeForm;
