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
  Users,
  FileText,
  Calendar,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TeacherHeaderProps {
  onToggleSidebar?: () => void;
  sidebarCollapsed?: boolean;
}

interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export default function TeacherHeader({
  onToggleSidebar,
  sidebarCollapsed = false,
}: TeacherHeaderProps) {
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

  // Generate teacher-specific breadcrumbs
  const generateBreadcrumbs = useCallback((): BreadcrumbItem[] => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "Accueil", href: "/", icon: Home },
    ];

    const teacherSegmentLabels: Record<
      string,
      { label: string; icon?: React.ComponentType<{ className?: string }> }
    > = {
      teacher: { label: "Enseignement", icon: GraduationCap },
      dashboard: { label: "Tableau de bord" },
      courses: { label: "Mes Cours", icon: BookOpen },
      assignments: { label: "Devoirs", icon: FileText },
      students: { label: "Mes Étudiants", icon: Users },
      grades: { label: "Notes & Évaluations" },
      schedule: { label: "Planning", icon: Calendar },
      resources: { label: "Ressources" },
      reports: { label: "Rapports" },
      settings: { label: "Paramètres", icon: Settings },
    };

    let currentPath = "";
    segments.forEach((segment) => {
      currentPath += `/${segment}`;
      const segmentInfo = teacherSegmentLabels[segment];
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
    breadcrumbs[breadcrumbs.length - 1]?.label || "Enseignement";

  // Teacher user info avec nom guinéen
  const teacherInfo = {
    name: "Fatoumata Camara",
    email: "fatoumata.camara@schola.gn",
    role: "Professeure de Mathématiques",
    avatar: "/images/teacher-avatar.jpg", // Image d'une femme guinéenne
    initials: "FC",
    department: "Département Sciences",
    lastLogin: "Aujourd'hui à 08:15",
    subjects: ["Mathématiques", "Statistiques"],
    classCount: 4,
    studentCount: 127,
  };

  // Teacher notifications
  const teacherNotifications = [
    {
      id: 1,
      type: "info",
      message: "3 nouveaux devoirs à corriger en Mathématiques",
      time: "Il y a 10 min",
      priority: "medium",
    },
    {
      id: 2,
      type: "warning",
      message: "Réunion pédagogique prévue demain à 14h",
      time: "Il y a 30 min",
      priority: "high",
    },
    {
      id: 3,
      type: "success",
      message: "Cours 'Algèbre Linéaire' publié avec succès",
      time: "Il y a 1h",
      priority: "low",
    },
    {
      id: 4,
      type: "info",
      message: "5 étudiants ont rendu leur devoir en retard",
      time: "Il y a 2h",
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
              >
                <Menu className="w-5 h-5 text-white group-hover:text-[#b8d070] transition-colors" />
              </button>

              {/* Breadcrumbs */}
              <nav className="hidden md:flex items-center gap-2 min-w-0">
                <div className="flex items-center gap-2 text-sm">
                  {breadcrumbs.map((item, index) => (
                    <React.Fragment key={item.href}>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        {item.icon && (
                          <item.icon className="w-4 h-4 text-white/60" />
                        )}
                        <span
                          className={cn(
                            "transition-colors duration-200 truncate",
                            index === breadcrumbs.length - 1
                              ? "text-white font-medium"
                              : "text-white/60 hover:text-white/80"
                          )}
                        >
                          {item.label}
                        </span>
                      </motion.div>
                      {index < breadcrumbs.length - 1 && (
                        <ChevronRight className="w-4 h-4 text-white/40 flex-shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </nav>

              {/* Mobile page title */}
              <div className="md:hidden">
                <h1 className="text-lg font-semibold text-white truncate">
                  {pageTitle}
                </h1>
              </div>
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
                    placeholder="Rechercher cours, étudiants, ressources..."
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

            {/* Right section - Notifications, User Menu */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200 group"
                  data-trigger="notifications"
                >
                  <Bell className="w-5 h-5 text-white group-hover:text-[#b8d070] transition-colors" />
                  {/* Notification badge */}
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {teacherNotifications.length}
                  </span>
                </motion.button>

                {/* Notifications dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-80 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50"
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
                            <Bell className="w-4 h-4 text-[#b8d070]" />
                            Notifications
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
                      <div className="max-h-64 overflow-y-auto">
                        {teacherNotifications.map((notification, index) => (
                          <div
                            key={notification.id}
                            className="p-4 border-b border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                          >
                            <div className="flex items-start gap-3">
                              <div className="relative">
                                <div
                                  className={cn(
                                    "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                                    notification.type === "warning"
                                      ? "bg-yellow-400 shadow-lg shadow-yellow-400/50"
                                      : notification.type === "success"
                                      ? "bg-green-400 shadow-lg shadow-green-400/50"
                                      : "bg-blue-400 shadow-lg shadow-blue-400/50"
                                  )}
                                />
                                {index === 0 && (
                                  <div className="absolute inset-0 rounded-full animate-ping bg-current opacity-20"></div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-white font-medium">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-white/70 mt-1 flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </div>
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
              </div>

              {/* User Menu */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-xl transition-all duration-200 group"
                  data-trigger="user-menu"
                >
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:block text-right">
                      <div className="text-sm font-medium text-white group-hover:text-[#b8d070] transition-colors">
                        {teacherInfo.name}
                      </div>
                      <div className="text-xs text-white/60">
                        {teacherInfo.role}
                      </div>
                    </div>
                    {/* Avatar réel avec fallback */}
                    <div className="relative">
                      <div className="w-11 h-11 rounded-xl overflow-hidden ring-2 ring-white/20 group-hover:ring-[#b8d070]/50 transition-all duration-200">
                        <img
                          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
                          alt={teacherInfo.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback en cas d'erreur de chargement
                            e.currentTarget.style.display = "none";
                            e.currentTarget.nextElementSibling.style.display =
                              "flex";
                          }}
                        />
                        <div
                          className="w-full h-full bg-gradient-to-br from-[#b8d070] to-[#9bb85f] hidden items-center justify-center text-white font-semibold text-sm"
                          style={{ display: "none" }}
                        >
                          {teacherInfo.initials}
                        </div>
                      </div>
                      {/* Indicateur de statut en ligne */}
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white/20 rounded-full shadow-lg"></div>
                    </div>
                  </div>
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
                      {/* User info */}
                      <div className="p-5 border-b border-white/20 bg-gradient-to-r from-white/5 to-transparent relative">
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
                                alt={teacherInfo.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                  e.currentTarget.nextElementSibling.style.display =
                                    "flex";
                                }}
                              />
                              <div
                                className="w-full h-full bg-gradient-to-br from-[#b8d070] to-[#9bb85f] hidden items-center justify-center text-white font-semibold"
                                style={{ display: "none" }}
                              >
                                {teacherInfo.initials}
                              </div>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-slate-900 rounded-full shadow-lg"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-white text-base">
                              {teacherInfo.name}
                            </div>
                            <div className="text-sm text-white/80 font-medium">
                              {teacherInfo.role}
                            </div>
                            <div className="text-xs text-white/60 mt-1">
                              {teacherInfo.email}
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-xs text-white/60">
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {teacherInfo.classCount} classes
                              </span>
                              <span className="flex items-center gap-1">
                                <GraduationCap className="w-3 h-3" />
                                {teacherInfo.studentCount} étudiants
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="p-2">
                        <motion.button
                          whileHover={{ x: 2 }}
                          className="w-full flex items-center gap-3 p-3 hover:bg-white/15 rounded-xl transition-all duration-200 text-left group"
                        >
                          <User className="w-4 h-4 text-white/70 group-hover:text-[#b8d070]" />
                          <span className="text-sm text-white font-medium">
                            Mon Profil
                          </span>
                        </motion.button>

                        <motion.button
                          whileHover={{ x: 2 }}
                          className="w-full flex items-center gap-3 p-3 hover:bg-white/15 rounded-xl transition-all duration-200 text-left group"
                        >
                          <BookOpen className="w-4 h-4 text-white/70 group-hover:text-[#b8d070]" />
                          <span className="text-sm text-white font-medium">
                            Mes Cours
                          </span>
                        </motion.button>

                        <motion.button
                          whileHover={{ x: 2 }}
                          className="w-full flex items-center gap-3 p-3 hover:bg-white/15 rounded-xl transition-all duration-200 text-left group"
                        >
                          <Settings className="w-4 h-4 text-white/70 group-hover:text-[#b8d070]" />
                          <span className="text-sm text-white font-medium">
                            Paramètres
                          </span>
                        </motion.button>

                        <motion.button
                          whileHover={{ x: 2 }}
                          className="w-full flex items-center gap-3 p-3 hover:bg-white/15 rounded-xl transition-all duration-200 text-left group"
                        >
                          <HelpCircle className="w-4 h-4 text-white/70 group-hover:text-[#b8d070]" />
                          <span className="text-sm text-white font-medium">
                            Aide & Support
                          </span>
                        </motion.button>

                        <div className="border-t border-white/20 my-3"></div>

                        <motion.button
                          whileHover={{ x: 2 }}
                          className="w-full flex items-center gap-3 p-3 hover:bg-red-500/20 rounded-xl transition-all duration-200 text-left group"
                        >
                          <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-300" />
                          <span className="text-sm text-red-400 group-hover:text-red-300 font-medium">
                            Déconnexion
                          </span>
                        </motion.button>
                      </div>

                      {/* Footer avec dernière connexion */}
                      <div className="p-3 border-t border-white/10 bg-gradient-to-r from-transparent to-white/5">
                        <div className="text-xs text-white/60 text-center font-medium">
                          Dernière connexion: {teacherInfo.lastLogin}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
