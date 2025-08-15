"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/admin_dashboard/AdminSidebar";
import type { Metadata } from "next";

// Note: metadata ne peut pas être exporté dans un composant client
// Il faut le déplacer dans un fichier séparé si nécessaire

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1d8b93] via-[#0d5a61] to-[#1d8b93] flex">
      <AdminSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="p-6">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
