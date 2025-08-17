"use client";

import React, { useState } from "react";
import StudentSidebar from "@/components/student_dashboard/StudentSidebar";
import StudentHeader from "@/components/student_dashboard/StudentHeader";

interface StudentLayoutProps {
  children: React.ReactNode;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#1d8b93] via-[#0d5a61] to-[#1d8b93]"
      style={{ "--header-h": "80px" } as React.CSSProperties}
    >
      {/* Sidebar fixe */}
      <StudentSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Header fixe */}
      <StudentHeader
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        sidebarCollapsed={sidebarCollapsed}
      />

      {/* Main content avec margin pour la sidebar et header */}
      <main
        className={`min-h-screen transition-all duration-300 pt-[var(--header-h)] ${
          sidebarCollapsed ? "ml-[80px]" : "ml-[280px]"
        }`}
      >
        <div className="h-[calc(100vh-var(--header-h))] overflow-y-auto">
          {/* Wrapper de page avec contraintes max-width */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;

