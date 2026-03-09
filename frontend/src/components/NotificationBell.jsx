import { useState, useEffect, useRef, useCallback } from 'react';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'https://antifragilewebsite-production.up.railway.app/api';

const TYPE_LABELS = {
  article: 'article',
  video: 'vidéo',
  chapter: 'chapitre',
};

function getUrl(commentType, slug) {
  if (!slug) return null;
  if (commentType === 'article') return `/articles/${slug}`;
  if (commentType === 'video') return `/videos/${slug}`;
  if (commentType === 'chapter') return `/themes/${slug}`;
  return null;
}

function timeAgo(isoString) {
  const diff = Math.floor((Date.now() - new Date(isoString)) / 1000);
  if (diff < 60) return 'à l\'instant';
  if (diff < 3600) return `il y a ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `il y a ${Math.floor(diff / 3600)} h`;
  return `il y a ${Math.floor(diff / 86400)} j`;
}

export default function NotificationBell({ filterType }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const fetchNotifications = useCallback(async () => {
    const token = sessionStorage.getItem('access_token');
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/notifications/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const data = await res.json();
      const all = data.notifications || [];
      setNotifications(filterType ? all.filter(n => n.notification_type === filterType) : all);
    } catch {
      // silently ignore
    }
  }, [filterType]);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const markRead = async (ids) => {
    const token = sessionStorage.getItem('access_token');
    if (!token) return;
    await fetch(`${API_URL}/notifications/mark-read/`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
    });
  };

  const markAllRead = async () => {
    await markRead(notifications.map(n => n.id));
    setNotifications([]);
    setOpen(false);
  };

  const handleNotifClick = async (n) => {
    await markRead([n.id]);
    setNotifications(prev => prev.filter(x => x.id !== n.id));
    setOpen(false);
    const url = getUrl(n.comment_type, n.content_slug);
    if (url) navigate(url);
  };

  const count = notifications.length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(prev => !prev)}
        className="relative text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {count > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-0.5 text-[10px] font-bold rounded-full bg-red-500 text-white flex items-center justify-center leading-none">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:left-0 mt-2 w-72 md:w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <span className="text-sm font-SFBold text-gray-800 dark:text-gray-100">
              {filterType === 'reply' ? 'Réponses à vos commentaires' : 'Notifications'}
            </span>
            {count > 0 && (
              <button onClick={markAllRead} className="text-xs text-blue-500 hover:underline font-SF">
                Tout marquer lu
              </button>
            )}
          </div>

          <ul className="max-h-72 overflow-y-auto">
            {notifications.length === 0 ? (
              <li className="px-4 py-6 text-center text-sm text-gray-400 font-SF">
                Aucune notification
              </li>
            ) : (
              notifications.map(n => {
                const url = getUrl(n.comment_type, n.content_slug);
                return (
                  <li
                    key={n.id}
                    onClick={() => handleNotifClick(n)}
                    className={`px-4 py-3 border-b border-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50 hover:bg-gray-50 ${url ? 'cursor-pointer' : ''}`}
                  >
                    <p className="text-xs font-SF text-gray-800 dark:text-gray-200 leading-relaxed">
                      {n.notification_type === 'new_comment' ? (
                        <>
                          <span className="font-SFBold">{n.actor_username}</span> a commenté{' '}
                          {n.content_title && <span className="italic">« {n.content_title} »</span>}
                        </>
                      ) : (
                        <>
                          <span className="font-SFBold">{n.actor_username}</span> a répondu à votre commentaire
                          {n.content_title && <> sur <span className="italic">« {n.content_title} »</span></>}
                        </>
                      )}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">
                      "{n.content_preview}"
                    </p>
                    <p className="text-[10px] text-gray-300 dark:text-gray-500 mt-0.5">
                      {timeAgo(n.created_at)} · {TYPE_LABELS[n.comment_type] || n.comment_type}
                      {url && <span className="ml-1 text-yellow-500">→ voir</span>}
                    </p>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
