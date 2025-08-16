"use client";

import React, { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  ChevronRight,
  Home,
  Shield,
  X,
  HelpCircle,
  Menu,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
  sidebarCollapsed?: boolean;
}

interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export default function AdminHeader({
  onToggleSidebar,
  sidebarCollapsed = false,
}: AdminHeaderProps) {
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Generate admin-specific breadcrumbs
  const generateBreadcrumbs = useCallback((): BreadcrumbItem[] => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "Accueil", href: "/", icon: Home },
    ];

    const adminSegmentLabels: Record<
      string,
      { label: string; icon?: React.ComponentType<{ className?: string }> }
    > = {
      admin: { label: "Administration", icon: Shield },
      dashboard: { label: "Tableau de bord" },
      users: { label: "Utilisateurs", icon: User },
      units: { label: "Unités structurelles" },
      "roles-permissions": { label: "Rôles & Permissions" },
      elements: { label: "Éléments" },
      attributions: { label: "Attributions" },
      search: { label: "Recherche avancée" },
      reports: { label: "Rapports & Export" },
      settings: { label: "Paramètres", icon: Settings },
    };

    let currentPath = "";
    segments.forEach((segment) => {
      currentPath += `/${segment}`;
      const segmentInfo = adminSegmentLabels[segment];
      if (segmentInfo) {
        breadcrumbs.push({
          label: segmentInfo.label,
          href: currentPath,
          icon: segmentInfo.icon,
        });
      }
    });

    return breadcrumbs;
  }, [pathname]);

  const breadcrumbs = generateBreadcrumbs();
  const pageTitle =
    breadcrumbs[breadcrumbs.length - 1]?.label || "Administration";

  // Admin user info avec nom guinéen
  const adminInfo = {
    name: "Amadou Diallo",
    email: "amadou.diallo@schola.gn",
    role: "Super Administrateur",
    avatar: "/images/admin-avatar.jpg", // Image d'un homme guinéen
    initials: "AD",
    department: "Direction Générale",
    lastLogin: "Aujourd'hui à 14:30",
  };

  // Admin notifications
  const adminNotifications = [
    {
      id: 1,
      type: "warning",
      message: "7 nouvelles connexions suspectes détectées",
      time: "Il y a 5 min",
      priority: "high",
    },
    {
      id: 2,
      type: "info",
      message: "Mise à jour système programmée pour demain",
      time: "Il y a 15 min",
      priority: "medium",
    },
    {
      id: 3,
      type: "success",
      message: "Sauvegarde automatique terminée avec succès",
      time: "Il y a 1h",
      priority: "low",
    },
    {
      id: 4,
      type: "warning",
      message: "Espace de stockage à 87% - Action requise",
      time: "Il y a 2h",
      priority: "high",
    },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 right-0 z-40 h-20 transition-all duration-300 ${
        sidebarCollapsed ? "left-[80px]" : "left-[280px]"
      }`}
    >
      {/* Glassmorphism background */}
      <div className="h-full backdrop-blur-xl bg-white/8 border-b border-white/10 shadow-2xl">
        <div className="h-full px-6 py-4 flex items-center">
          <div className="w-full flex items-center justify-between">
            {/* Left section - Breadcrumbs & Title */}
            <div className="flex items-center gap-6 min-w-0 flex-1">
              {/* Mobile menu toggle */}
              <button
                onClick={onToggleSidebar}
                className="lg:hidden p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200 group"
                aria-label="Toggle sidebar"
              >
                <Menu className="h-5 w-5 text-white/80 group-hover:text-white transition-colors" />
              </button>

              {/* Breadcrumbs - Hidden on mobile */}
              <nav className="hidden md:flex items-center space-x-2 text-sm">
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={crumb.href}>
                    {index > 0 && (
                      <ChevronRight className="h-4 w-4 text-white/30" />
                    )}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer"
                    >
                      {crumb.icon && (
                        <crumb.icon className="h-4 w-4 text-white/50" />
                      )}
                      <span
                        className={cn(
                          "truncate transition-colors",
                          index === breadcrumbs.length - 1
                            ? "text-white font-medium"
                            : "text-white/60 hover:text-white/80"
                        )}
                      >
                        {crumb.label}
                      </span>
                    </motion.div>
                  </React.Fragment>
                ))}
              </nav>

              {/* Page Title */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-semibold text-white truncate md:hidden"
              >
                {pageTitle}
              </motion.h1>
            </div>

            {/* Right section - Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative hidden lg:block"
              >
                <div
                  className={cn(
                    "relative transition-all duration-300",
                    searchFocused ? "w-80" : "w-64"
                  )}
                >
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                  <input
                    type="text"
                    placeholder="Recherche admin..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070]/50 focus:border-[#b8d070]/50 focus:bg-white/15 transition-all duration-200"
                  />
                  {searchValue && (
                    <button
                      onClick={() => setSearchValue("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <X className="h-3 w-3 text-white/60" />
                    </button>
                  )}
                </div>
              </motion.div>

              {/* Theme Toggle */}
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200 group"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-white/70 group-hover:text-[#b8d070] transition-colors" />
                ) : (
                  <Moon className="h-5 w-5 text-white/70 group-hover:text-[#b8d070] transition-colors" />
                )}
              </motion.button>

              {/* Notifications */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="relative"
              >
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200 group"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5 text-white/70 group-hover:text-[#b8d070] transition-colors" />
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, delay: 0.8 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 rounded-full text-xs flex items-center justify-center text-white font-bold shadow-lg"
                  >
                    {
                      adminNotifications.filter((n) => n.priority === "high")
                        .length
                    }
                  </motion.span>
                </button>

                {/* Notifications dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-white/20 bg-gradient-to-r from-[#1d8b93]/10 to-[#b8d070]/10">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                          <Shield className="h-5 w-5 text-[#1d8b93]" />
                          Notifications Admin
                          <span className="ml-auto text-xs bg-[#1d8b93]/20 text-[#1d8b93] px-2 py-1 rounded-full">
                            {adminNotifications.length}
                          </span>
                        </h3>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {adminNotifications.map((notification, index) => (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 hover:bg-white/50 transition-colors border-b border-white/10 last:border-b-0"
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={cn(
                                  "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                                  notification.type === "warning" &&
                                    "bg-orange-500",
                                  notification.type === "info" && "bg-blue-500",
                                  notification.type === "success" &&
                                    "bg-green-500"
                                )}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 mb-1">
                                  {notification.message}
                                </p>
                                <div className="flex items-center justify-between">
                                  <p className="text-xs text-gray-500">
                                    {notification.time}
                                  </p>
                                  <span
                                    className={cn(
                                      "text-xs px-2 py-1 rounded-full font-medium",
                                      notification.priority === "high" &&
                                        "bg-red-100 text-red-700",
                                      notification.priority === "medium" &&
                                        "bg-yellow-100 text-yellow-700",
                                      notification.priority === "low" &&
                                        "bg-green-100 text-green-700"
                                    )}
                                  >
                                    {notification.priority === "high" &&
                                      "Urgent"}
                                    {notification.priority === "medium" &&
                                      "Important"}
                                    {notification.priority === "low" && "Info"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="p-3 bg-gray-50/50 text-center">
                        <button className="text-sm text-[#1d8b93] hover:underline font-medium">
                          Voir toutes les notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Help */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200 group"
                aria-label="Aide"
              >
                <HelpCircle className="h-5 w-5 text-white/70 group-hover:text-[#b8d070] transition-colors" />
              </motion.button>

              {/* User Profile */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="relative"
              >
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 p-2 pl-3 hover:bg-white/10 rounded-2xl transition-all duration-200 group border border-white/10 hover:border-white/20"
                  aria-label="Menu utilisateur"
                >
                  {/* Avatar avec image */}
                  <div className="relative">
                    <div className="w-9 h-9 rounded-xl overflow-hidden bg-gradient-to-br from-[#b8d070] to-[#a2c65e] shadow-lg">
                      <div className="w-full h-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {adminInfo.initials}
                        </span>
                      </div>
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white/20 rounded-full"></div>
                  </div>

                  {/* User info */}
                  <div className="hidden xl:block text-left">
                    <div className="text-white font-medium text-sm leading-tight">
                      {adminInfo.name}
                    </div>
                    <div className="text-white/50 text-xs">
                      {adminInfo.role}
                    </div>
                  </div>

                  <ChevronRight
                    className={cn(
                      "h-4 w-4 text-white/60 transition-transform duration-200",
                      showUserMenu && "rotate-90"
                    )}
                  />
                </button>

                {/* User dropdown */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-50"
                    >
                      {/* Profile Header */}
                      <div className="p-5 bg-gradient-to-r from-[#1d8b93]/10 to-[#b8d070]/10 border-b border-white/20">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gradient-to-br from-[#b8d070] to-[#a2c65e] shadow-lg">
                            <div className="w-full h-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                {adminInfo.initials}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-gray-900 font-semibold text-lg">
                              {adminInfo.name}
                            </h3>
                            <p className="text-[#1d8b93] text-sm font-medium">
                              {adminInfo.role}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {adminInfo.email}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-white/20">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">
                              Dernière connexion
                            </span>
                            <span className="text-gray-900 font-medium">
                              {adminInfo.lastLogin}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/50 rounded-xl transition-colors">
                          <User className="h-5 w-5 text-gray-600" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              Mon profil
                            </div>
                            <div className="text-xs text-gray-500">
                              Gérer mes informations
                            </div>
                          </div>
                        </button>

                        <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/50 rounded-xl transition-colors">
                          <Settings className="h-5 w-5 text-gray-600" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              Paramètres système
                            </div>
                            <div className="text-xs text-gray-500">
                              Configuration avancée
                            </div>
                          </div>
                        </button>

                        <div className="my-2 h-px bg-white/20"></div>

                        <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 rounded-xl transition-colors group">
                          <LogOut className="h-5 w-5 text-gray-600 group-hover:text-red-500 transition-colors" />
                          <div>
                            <div className="text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                              Se déconnecter
                            </div>
                            <div className="text-xs text-gray-500">
                              Fermer la session admin
                            </div>
                          </div>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
