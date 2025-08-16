"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/admin_dashboard/AdminSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1d8b93] via-[#0d5a61] to-[#1d8b93]">
      {/* Sidebar fixe */}
      <AdminSidebar
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

export default AdminLayout;
