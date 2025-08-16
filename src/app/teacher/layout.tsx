"use client";

import React, { useState } from "react";
import TeacherSidebar from "@/components/teacher_dashboard/TeacherSidebar";

interface TeacherLayoutProps {
  children: React.ReactNode;
}

const TeacherLayout: React.FC<TeacherLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1d8b93] via-[#0d5a61] to-[#1d8b93]">
      {/* Sidebar fixe */}
      <TeacherSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main content avec margin pour la sidebar */}
      <main
        className={`min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? "ml-[80px]" : "ml-[280px]"
        }`}
      >
        <div className="h-screen overflow-y-auto">
          <div className="p-6">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default TeacherLayout;
