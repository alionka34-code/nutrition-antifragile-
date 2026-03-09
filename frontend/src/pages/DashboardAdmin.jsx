import React, { useState } from "react";
import ThemeForm from "../components/admin/ThemeForm.jsx";
import ChapterForm from "../components/admin/ChapterForm.jsx";
import AnnexeForm from "../components/admin/AnnexeForm.jsx";

const sections = [
  { key: "themes", label: "Thèmes", icon: "M4 6h16M4 12h16M4 18h16" },
  { key: "chapters", label: "Chapitres", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { key: "annexes", label: "Annexes", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
];

function DashboardAdmin() {
  const [active, setActive] = useState("themes");

  return (
    <div className="flex min-h-screen bg-beige1 dark:bg-neutral-950">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-neutral-900 border-r-2 border-beige2 dark:border-neutral-700 flex flex-col shrink-0 shadow-sm">
        <div className="p-6 border-b-2 border-beige2 dark:border-neutral-700">
          <h1 className="font-SFBold text-marron text-lg">Dashboard Admin</h1>
        </div>
        <nav className="flex-1 py-4 flex flex-col gap-1 px-3">
          {sections.map((s) => (
            <button
              key={s.key}
              onClick={() => setActive(s.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-SF transition-colors ${
                active === s.key
                  ? "bg-gradient-to-tr from-peach to-yellow-700 text-white font-SFBold shadow-md"
                  : "text-gray-600 dark:text-neutral-300 hover:bg-beige1 dark:hover:bg-neutral-800"
              }`}
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
              </svg>
              {s.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="font-SFBold text-2xl text-marron mb-6">
          {sections.find((s) => s.key === active)?.label}
        </h2>
        {active === "themes" && <ThemeForm />}
        {active === "chapters" && <ChapterForm />}
        {active === "annexes" && <AnnexeForm />}
      </main>
    </div>
  );
}

export default DashboardAdmin;
