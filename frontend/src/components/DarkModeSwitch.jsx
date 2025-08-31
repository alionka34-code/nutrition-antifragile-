import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function DarkModeSwitch({ side = 'left', top = 12, portal = true }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Initialize from localStorage or OS preference
    try {
      const stored = localStorage.getItem('theme');
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const dark = stored ? stored === 'dark' : prefersDark;
      setIsDark(dark);
      document.documentElement.classList.toggle('dark', dark);
    } catch (e) { console.warn('Theme init failed', e); }
  }, []);

  // Mark mounted so we can safely access document
  useEffect(() => { setMounted(true); }, []);

  // Create a dedicated fixed container in body so nothing affects the switch (only when portal)
  const [container, setContainer] = useState(null);
  useEffect(() => {
    if (!mounted || !portal) return;
    const c = document.createElement('div');
    c.setAttribute('id', 'darkmode-switch-container');
    c.style.position = 'fixed';
    c.style.top = `calc(env(safe-area-inset-top, 0px) + ${top}px)`;
    if (side === 'right') {
      c.style.right = 'calc(env(safe-area-inset-right, 0px) + 12px)';
      c.style.left = '';
    } else {
      c.style.left = 'calc(env(safe-area-inset-left, 0px) + 12px)';
      c.style.right = '';
    }
    c.style.zIndex = '2147483647';
    c.style.pointerEvents = 'none'; // inner will re-enable
    c.style.willChange = 'auto';
    c.style.contain = 'layout paint';
    document.body.appendChild(c);
    setContainer(c);
    return () => {
      try { document.body.removeChild(c); } catch (e) { console.warn('Remove container failed', e); }
    };
  }, [mounted, side, top, portal]);

  // Guard against transforms on html/body that can break fixed positioning (only when portal)
  useEffect(() => {
    if (!mounted || !portal) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlTransform = html.style.transform;
    const prevBodyTransform = body.style.transform;
    html.style.transform = 'none';
    body.style.transform = 'none';
    return () => {
      html.style.transform = prevHtmlTransform;
      body.style.transform = prevBodyTransform;
    };
  }, [mounted, portal]);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
  try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch (e) { console.warn('Theme persist failed', e); }
  };

  if (!mounted) return null;

  const ButtonEl = (
    <button
      onClick={toggle}
      onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
      onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
      onTouchMove={(e) => { e.preventDefault(); e.stopPropagation(); }}
      onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
      onDragStart={(e) => e.preventDefault()}
      type="button"
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      aria-pressed={isDark}
      className="pointer-events-auto inline-flex items-center w-16 h-9 rounded-full transition-colors duration-300 bg-gray-300 dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 shadow-sm select-none"
      style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none', WebkitTransform: 'translateZ(0)' }}
      draggable={false}
    >
      <span
        className="absolute top-1 left-1 h-7 w-7 rounded-full bg-white dark:bg-neutral-200 shadow transition-transform duration-300"
        style={{ transform: isDark ? 'translateX(28px)' : 'translateX(0)' }}
        draggable={false}
      />
      <span className="absolute left-2 text-yellow-500 text-sm select-none" draggable={false}>☀️</span>
      <span className="absolute right-2 text-blue-200 text-sm select-none" draggable={false}>🌙</span>
    </button>
  );

  return portal ? (container ? createPortal(ButtonEl, container) : null) : ButtonEl;
}

export default DarkModeSwitch;
