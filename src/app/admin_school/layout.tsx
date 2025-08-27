"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin_dashboard/AdminHeader";
import AdminSchoolSidebar from "@/components/admin_school/AdminSchoolSidebar";

export default function AdminSchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#1d8b93] via-[#0d5a61] to-[#1d8b93]"
      style={{ "--header-h": "80px" } as React.CSSProperties}
    >
      <AdminSchoolSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <AdminHeader
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        sidebarCollapsed={sidebarCollapsed}
      />
      <main
        className={`min-h-screen transition-all duration-300 pt-[var(--header-h)] ${
          sidebarCollapsed ? "ml-[80px]" : "ml-[280px]"
        }`}
      >
        <div className="h-[calc(100vh-var(--header-h))] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
