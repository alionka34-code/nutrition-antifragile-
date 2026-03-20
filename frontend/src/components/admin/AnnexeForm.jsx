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

  const inputCls = "w-full p-3 border border-beige2 rounded-xl font-SF dark:bg-neutral-700 dark:border-neutral-600 dark:text-white focus:outline-none focus:border-marron transition-colors";

  return (
    <div className="space-y-6">
      {/* Formulaire */}
      <div className="bg-white dark:bg-neutral-800 border-2 border-beige2 dark:border-neutral-700 rounded-2xl p-6 shadow-sm">
        <h3 className="font-SFBold text-marron text-lg mb-5">{editingId ? "Modifier l'annexe" : "Ajouter une annexe"}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 font-SFBold text-sm dark:text-white">
            Titre
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
            Durée de lecture (minutes)
            <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} className={inputCls} />
          </label>

          <label className="flex flex-col gap-1 font-SFBold text-sm dark:text-white">
            Fichier PDF
            <input type="file" accept=".pdf" onChange={(e) => setFichierPdf(e.target.files[0])} className="font-SF text-sm text-gray-600 dark:text-white" />
          </label>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="font-SFBold text-white text-sm px-6 py-2.5 rounded-full bg-gradient-to-tr from-peach to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 shadow-md">
              {editingId ? "Mettre à jour" : "Ajouter l'annexe"}
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
        <h3 className="font-SFBold text-marron text-lg mb-4">Annexes existantes</h3>
        <ul className="space-y-3">
          {annexes.map((a) => (
            <li key={a.id} className="p-4 border border-beige2 dark:border-neutral-600 rounded-xl flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="font-SFBold text-gray-800 dark:text-white">{a.title}</div>
                <div className="font-SF text-xs text-gray-500 dark:text-gray-400 mt-0.5">Durée de lecture : {a.duration} min</div>
                {a.description && (
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 font-SF">
                    {expanded[a.id] ? (
                      <div dangerouslySetInnerHTML={{ __html: a.description }} />
                    ) : (
                      <div>{truncate(stripHtml(a.description), 200)}</div>
                    )}
                    <button type="button" onClick={() => toggleExpanded(a.id)} className="font-SF text-marron text-xs mt-1 hover:underline">
                      {expanded[a.id] ? 'Voir moins' : 'Voir plus'}
                    </button>
                  </div>
                )}
                {a.image_url && (
                  <img src={a.image_url} alt={a.title} className="mt-2 max-h-20 object-contain rounded-lg" />
                )}
                {a.fichier_pdf_url && (
                  <div className="mt-2">
                    <a href={a.fichier_pdf_url} target="_blank" rel="noreferrer" className="font-SF text-xs text-marron hover:underline">
                      Télécharger le PDF
                    </a>
                  </div>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(a)} className="font-SF text-xs px-4 py-1.5 rounded-full border-2 border-marron text-marron hover:bg-marron hover:text-white transition-colors">Éditer</button>
                {localIsAdmin && (
                  <button onClick={() => handleDelete(a.id)} className="font-SF text-xs px-4 py-1.5 rounded-full border-2 border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition-colors">Supprimer</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AnnexeForm;
