import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchThemeDetail, fetchChaptersByTheme, fetchChapterComments, postChapterComment, deleteChapterComment, postChapterReply } from "../utils/api";
import  "../styles/ckText.css";
import { Helmet } from "react-helmet";
import CommentSection from "../components/CommentSection";

function ThemeDetail() {
    const { slug } = useParams();
    const [theme, setTheme] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect( () => {
        const loadTheme = async () => {
            try {
                const token = sessionStorage.getItem("access_token");
                const data = await fetchThemeDetail(slug, token);
                setTheme(data);
                const chaptersData = await fetchChaptersByTheme(data.id);
                setChapters(chaptersData);
                if (chaptersData.length > 0) setSelectedChapter(chaptersData[0]);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadTheme();
    }, [slug]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;
    if (!theme) return <p>Thème non trouvé.</p>;

    const token = sessionStorage.getItem("access_token");
    let isAdmin = false;
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            isAdmin = payload.is_staff === true;
        } catch { /* token invalide */ }
    }

    return (
        <>
        <header className="pt-10 border-b-1 border-gray-300 dark:border-neutral-700">
            <div className="text-left mx-4 md:mx-auto md:max-w-6xl">
                <h1 className="text-4xl font-SFBold mb-4 text-marron">{theme.title}</h1>
                <div className="article-content font-SF text-xl" dangerouslySetInnerHTML={{ __html: theme.description }} />
                <button
                    onClick={() => document.getElementById('chapitres-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="my-8 border-1 border-marron rounded-xl p-4 font-SFBold flex items-center gap-2 hover:bg-marron hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    COMMENCER
                </button>
            </div>
        </header>
        <main id="chapitres-section" className="mt-10 flex flex-col md:flex-rows md:gap-40 mx-4 md:mx-auto md:max-w-6xl">
                <div className="w-full md:w-1/3">
                    <h2 className="text-marron text-4xl font-SFBold mb-4">Chapitres</h2>
                    <div className="border-1 border-marron rounded-2xl mb-8">
                        <ul>
                            {chapters.length === 0 && <p className="text-gray-500">Aucun chapitre disponible.</p>}
                            {chapters.map((chapter) => (
                                <li
                                    key={chapter.id}
                                    onClick={() => setSelectedChapter(chapter)}
                                    className={`font-SF flex items-center gap-3 p-3 rounded-2xl hover:bg-marron hover:text-white ${selectedChapter?.id === chapter.id ? "bg-marron text-white dark:bg-neutral-700" : ""}`}
                                >
                                    <span className="text-marron font-SFBold">{chapter.order}-</span>
                                    <span className="font-SF text-xl">{chapter.title}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
                <div className="w-full">
                    <h2 className="text-marron text-4xl font-SFBold">{selectedChapter?.title || "Présentation"}</h2>
                    {selectedChapter ? (
                        <div className="mt-4">
                            {selectedChapter.video_bunny && (
                                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
                                    <iframe
                                        src={`https://iframe.mediadelivery.net/embed/515846/${selectedChapter.video_bunny}`}
                                        className="absolute inset-0 w-full h-full"
                                        allow="accelerometer; gyroscope; encrypted-media; picture-in-picture"
                                        allowFullScreen
                                        title={selectedChapter.title} />
                                </div>
                            )}
                            <div
                                className="article-content mt-4 font-SF text-lg"
                                dangerouslySetInnerHTML={{ __html: selectedChapter.content }} />
                        </div>
                    ) : (
                        <p className="text-gray-500 mt-4">Aucune présentation disponible.</p>
                    )}
                </div>
            </main>
            <CommentSection
            articleId={selectedChapter?.id}
            token={token}
            isAdmin={isAdmin}
            fetchCommentsFn={(id) => fetchChapterComments(id)}
            postCommentFn={(id, content, tok) => postChapterComment(id, content, tok)}
            deleteCommentFn={(id, tok) => deleteChapterComment(id, tok)}
            postReplyFn={(id, parentId, content, tok) => postChapterReply(id, parentId, content, tok)}
        />
        </>
    );
}

export default ThemeDetail;
