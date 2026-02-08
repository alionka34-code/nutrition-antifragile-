import React from "react";
import ThemeForm from "../components/admin/ThemeForm.jsx";
import ChapterForm from "../components/admin/ChapterForm.jsx";

function DashboardAdmin() {
  return (
    <>
    <div>
      <h1>Dashboard Admin</h1>
    </div>
    <ThemeForm />
    <div className="mt-8">
      <h2 className="text-xl font-semibold">Chapitres</h2>
      <ChapterForm />
    </div>
    </>
    
  );
}

export default DashboardAdmin;