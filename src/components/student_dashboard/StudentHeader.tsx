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
  BookOpen,
  X,
  HelpCircle,
  Menu,
  Sun,
  Moon,
  Calendar,
  GraduationCap,
  Clock,
  Award,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StudentHeaderProps {
  onToggleSidebar?: () => void;
  sidebarCollapsed?: boolean;
}

interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export default function StudentHeader({
  onToggleSidebar,
  sidebarCollapsed = false,
}: StudentHeaderProps) {
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Fermer les modals au clic en dehors
  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (
      !target.closest('[data-modal="notifications"]') &&
      !target.closest('[data-trigger="notifications"]')
    ) {
      setShowNotifications(false);
    }
    if (
      !target.closest('[data-modal="user-menu"]') &&
      !target.closest('[data-trigger="user-menu"]')
    ) {
      setShowUserMenu(false);
    }
  }, []);

  React.useEffect(() => {
    if (showNotifications || showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showNotifications, showUserMenu, handleClickOutside]);

  // Generate student-specific breadcrumbs
  const generateBreadcrumbs = useCallback((): BreadcrumbItem[] => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "Accueil", href: "/", icon: Home },
    ];

    const studentSegmentLabels: Record<
      string,
      { label: string; icon?: React.ComponentType<{ className?: string }> }
    > = {
      student: { label: "Espace Étudiant", icon: GraduationCap },
      dashboard: { label: "Tableau de bord" },
      courses: { label: "Mes cours", icon: BookOpen },
      schedule: { label: "Emploi du temps", icon: Calendar },
      homework: { label: "Devoirs", icon: FileText },
      grades: { label: "Notes", icon: Award },
      resources: { label: "Ressources" },
      settings: { label: "Paramètres", icon: Settings },
      help: { label: "Aide & Support", icon: HelpCircle },
    };

    let currentPath = "";
    segments.forEach((segment) => {
      currentPath += `/${segment}`;
      const segmentInfo = studentSegmentLabels[segment];
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
    breadcrumbs[breadcrumbs.length - 1]?.label || "Espace Étudiant";

  // Student user info avec nom guinéen
  const studentInfo = {
    name: "Marie Camara",
    email: "marie.camara@schola.gn",
    role: "Étudiante",
    class: "Terminale S",
    promo: "Promo 2024",
    avatar: "/images/student-avatar.jpg",
    initials: "MC",
    average: "15.2/20",
    lastLogin: "Aujourd'hui à 08:15",
  };

  // Student notifications
  const studentNotifications = [
    {
      id: 1,
      type: "warning",
      message: "Devoir de Mathématiques à rendre demain",
      time: "Il y a 30 min",
      priority: "high",
    },
    {
      id: 2,
      type: "info",
      message: "Nouveau cours de Physique disponible",
      time: "Il y a 1h",
      priority: "medium",
    },
    {
      id: 3,
      type: "success",
      message: "Note de Français publiée: 16/20",
      time: "Il y a 2h",
      priority: "low",
    },
    {
      id: 4,
      type: "info",
      message: "Réunion parents-professeurs le 15 mars",
      time: "Il y a 3h",
      priority: "medium",
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
            {/* Left section - Breadcrumbs */}
            <div className="flex items-center gap-4 min-w-0">
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

            {/* Center section - Search */}
            <div className="flex-1 flex justify-center max-w-md mx-8">
              <div className="relative w-full hidden lg:block">
                <motion.div
                  initial={{ width: 300 }}
                  animate={{ width: searchFocused ? 380 : 300 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="relative w-full"
                >
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                  <input
                    type="text"
                    placeholder="Rechercher cours, devoirs, ressources..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className="w-full h-11 pl-10 pr-4 bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#b8d070]/60 focus:border-[#b8d070]/60 focus:bg-white/20 transition-all duration-300 shadow-lg"
                  />
                  {searchFocused && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#b8d070]/10 to-transparent pointer-events-none"></div>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Right section - Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.4 }}
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
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200 group"
                  data-trigger="notifications"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5 text-white/70 group-hover:text-[#b8d070] transition-colors" />
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, delay: 0.7 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 rounded-full text-xs flex items-center justify-center text-white font-bold shadow-lg"
                  >
                    {
                      studentNotifications.filter((n) => n.priority === "high")
                        .length
                    }
                  </motion.span>
                </motion.button>

                {/* Notifications dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-96 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50"
                      data-modal="notifications"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(29, 139, 147, 0.85) 0%, rgba(13, 90, 97, 0.9) 50%, rgba(29, 139, 147, 0.85) 100%)",
                        backdropFilter: "blur(24px) saturate(200%)",
                        boxShadow:
                          "0 32px 64px -12px rgba(29, 139, 147, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <div className="p-4 border-b border-white/20 bg-gradient-to-r from-white/5 to-transparent relative">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-white flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-[#b8d070]" />
                            Mes Notifications
                          </h3>
                          <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowNotifications(false)}
                            className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 group"
                          >
                            <X className="w-4 h-4 text-white/70 group-hover:text-white" />
                          </motion.button>
                        </div>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {studentNotifications.map((notification, index) => (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0 cursor-pointer"
                          >
                            <div className="flex items-start gap-3">
                              <div className="relative">
                                <div
                                  className={cn(
                                    "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                                    notification.type === "warning"
                                      ? "bg-yellow-400 shadow-lg shadow-yellow-400/50"
                                      : notification.type === "info"
                                      ? "bg-blue-400 shadow-lg shadow-blue-400/50"
                                      : "bg-green-400 shadow-lg shadow-green-400/50"
                                  )}
                                />
                                {index === 0 && (
                                  <div className="absolute inset-0 rounded-full animate-ping bg-current opacity-20"></div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white mb-1">
                                  {notification.message}
                                </p>
                                <div className="flex items-center justify-between">
                                  <p className="text-xs text-white/70 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {notification.time}
                                  </p>
                                  <span
                                    className={cn(
                                      "text-xs px-2 py-1 rounded-full font-medium",
                                      notification.priority === "high" &&
                                        "bg-red-500/20 text-red-300 border border-red-500/30",
                                      notification.priority === "medium" &&
                                        "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
                                      notification.priority === "low" &&
                                        "bg-green-500/20 text-green-300 border border-green-500/30"
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
                      <div className="p-3 border-t border-white/10 bg-gradient-to-r from-transparent to-white/5">
                        <button className="w-full text-xs text-[#b8d070] hover:text-white transition-colors text-center font-medium">
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
                transition={{ delay: 0.6 }}
                className="p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200 group"
                aria-label="Aide"
              >
                <HelpCircle className="h-5 w-5 text-white/70 group-hover:text-[#b8d070] transition-colors" />
              </motion.button>

              {/* User Profile */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="relative"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 p-2 pl-3 hover:bg-white/10 rounded-2xl transition-all duration-200 group border border-white/10 hover:border-white/20"
                  data-trigger="user-menu"
                  aria-label="Menu utilisateur"
                >
                  {/* Avatar réel avec fallback */}
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-white/20 group-hover:ring-[#b8d070]/50 transition-all duration-200">
                      <img
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
                        alt={studentInfo.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback en cas d'erreur de chargement
                          e.currentTarget.style.display = "none";
                          const nextElement = e.currentTarget
                            .nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = "flex";
                          }
                        }}
                      />
                      <div
                        className="w-full h-full bg-gradient-to-br from-purple-500 to-purple-700 hidden items-center justify-center text-white font-semibold text-sm"
                        style={{ display: "none" }}
                      >
                        {studentInfo.initials}
                      </div>
                    </div>
                    {/* Indicateur de statut en ligne */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white/20 rounded-full shadow-lg"></div>
                  </div>

                  {/* User info */}
                  <div className="hidden xl:block text-left">
                    <div className="text-white font-medium text-sm leading-tight group-hover:text-[#b8d070] transition-colors">
                      {studentInfo.name}
                    </div>
                    <div className="text-white/60 text-xs">
                      {studentInfo.class}
                    </div>
                  </div>

                  <ChevronRight
                    className={cn(
                      "h-4 w-4 text-white/60 transition-transform duration-200",
                      showUserMenu && "rotate-90"
                    )}
                  />
                </motion.button>

                {/* User dropdown */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-80 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50"
                      data-modal="user-menu"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(29, 139, 147, 0.85) 0%, rgba(13, 90, 97, 0.9) 50%, rgba(29, 139, 147, 0.85) 100%)",
                        backdropFilter: "blur(24px) saturate(200%)",
                        boxShadow:
                          "0 32px 64px -12px rgba(29, 139, 147, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {/* Profile Header */}
                      <div className="p-5 bg-gradient-to-r from-white/5 to-transparent border-b border-white/20 relative">
                        {/* Bouton de fermeture */}
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setShowUserMenu(false)}
                          className="absolute top-3 right-3 p-2 hover:bg-white/20 rounded-full transition-all duration-200 group z-10"
                        >
                          <X className="w-4 h-4 text-white/70 group-hover:text-white" />
                        </motion.button>

                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-14 h-14 rounded-xl overflow-hidden ring-2 ring-[#b8d070]/30">
                              <img
                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
                                alt={studentInfo.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                  const nextElement = e.currentTarget
                                    .nextElementSibling as HTMLElement;
                                  if (nextElement) {
                                    nextElement.style.display = "flex";
                                  }
                                }}
                              />
                              <div
                                className="w-full h-full bg-gradient-to-br from-purple-500 to-purple-700 hidden items-center justify-center text-white font-semibold"
                                style={{ display: "none" }}
                              >
                                {studentInfo.initials}
                              </div>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-slate-900 rounded-full shadow-lg"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-base">
                              {studentInfo.name}
                            </h3>
                            <p className="text-[#b8d070] text-sm font-medium">
                              {studentInfo.class} • {studentInfo.promo}
                            </p>
                            <p className="text-white/60 text-xs mt-1">
                              {studentInfo.email}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-white/60">
                              <span className="flex items-center gap-1">
                                <Award className="w-3 h-3" />
                                Moyenne: {studentInfo.average}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-white/20">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-white/60">
                              Dernière connexion
                            </span>
                            <span className="text-white font-medium">
                              {studentInfo.lastLogin}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        <motion.button
                          whileHover={{ x: 2 }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/15 rounded-xl transition-all duration-200 group"
                        >
                          <User className="h-5 w-5 text-white/70 group-hover:text-[#b8d070]" />
                          <div>
                            <div className="text-sm font-medium text-white">
                              Mon profil
                            </div>
                            <div className="text-xs text-white/60">
                              Gérer mes informations
                            </div>
                          </div>
                        </motion.button>

                        <motion.button
                          whileHover={{ x: 2 }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/15 rounded-xl transition-all duration-200 group"
                        >
                          <BookOpen className="h-5 w-5 text-white/70 group-hover:text-[#b8d070]" />
                          <div>
                            <div className="text-sm font-medium text-white">
                              Mes cours
                            </div>
                            <div className="text-xs text-white/60">
                              Accès rapide aux matières
                            </div>
                          </div>
                        </motion.button>

                        <motion.button
                          whileHover={{ x: 2 }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/15 rounded-xl transition-all duration-200 group"
                        >
                          <Settings className="h-5 w-5 text-white/70 group-hover:text-[#b8d070]" />
                          <div>
                            <div className="text-sm font-medium text-white">
                              Paramètres
                            </div>
                            <div className="text-xs text-white/60">
                              Notifications et préférences
                            </div>
                          </div>
                        </motion.button>

                        <div className="my-3 h-px bg-white/20"></div>

                        <motion.button
                          whileHover={{ x: 2 }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-500/20 rounded-xl transition-all duration-200 group"
                        >
                          <LogOut className="h-5 w-5 text-red-400 group-hover:text-red-300" />
                          <div>
                            <div className="text-sm font-medium text-red-400 group-hover:text-red-300">
                              Se déconnecter
                            </div>
                            <div className="text-xs text-red-400/70">
                              Fermer ma session
                            </div>
                          </div>
                        </motion.button>
                      </div>

                      {/* Footer avec statut */}
                      <div className="p-3 border-t border-white/10 bg-gradient-to-r from-transparent to-white/5">
                        <div className="text-xs text-white/60 text-center font-medium">
                          Session sécurisée • {studentInfo.class}
                        </div>
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

