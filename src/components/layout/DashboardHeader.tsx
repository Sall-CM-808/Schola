"use client";

import React, { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  Home,
  School,
  Shield,
  X,
  HelpCircle,
  Menu,
  Sun,
  Moon,
  Calendar,
  RefreshCw,
  ChevronLeft,
} from "lucide-react";

interface FlexibleHeaderProps {
  title?: string;
  onBack?: () => void;
  onToggleSidebar?: () => void;
  sidebarCollapsed?: boolean;
  notificationsCount?: number;
  onNotificationsClick?: () => void;
  onRefresh?: () => void;
  onOpenCommandPalette?: () => void;
  user?: {
    name: string;
    role?: string;
    avatarUrl?: string;
    online?: boolean;
    email?: string;
    department?: string;
    lastLogin?: string;
  };
  rightActions?: React.ReactNode;
}

export default function FlexibleHeader({
  title = "Schola",
  onBack,
  onToggleSidebar,
  sidebarCollapsed = false,
  notificationsCount = 0,
  onNotificationsClick,
  onRefresh,
  onOpenCommandPalette,
  user = { 
    name: "Mamadou Diallo", 
    role: "Administrateur", 
    online: true,
    email: "mamadou.diallo@schola.gn",
    department: "Direction",
    lastLogin: "Aujourd'hui",
    avatarUrl: "/images/admin.jpg"
  },
  rightActions,
}: FlexibleHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();

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
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showNotifications, showUserMenu, handleClickOutside]);

  // Générer des notifications basées sur le rôle
  const getRoleBasedNotifications = () => {
    const isAdmin = user.role?.toLowerCase().includes('admin');
    const isTeacher = user.role?.toLowerCase().includes('professeur') || user.role?.toLowerCase().includes('enseignant');
    
    if (isAdmin) {
      return [
        { id: 1, type: "warning", message: "7 nouvelles connexions suspectes détectées", time: "Il y a 5 min", priority: "high" },
        { id: 2, type: "info", message: "Mise à jour système programmée pour demain", time: "Il y a 15 min", priority: "medium" },
        { id: 3, type: "success", message: "Sauvegarde automatique terminée", time: "Il y a 1h", priority: "low" },
      ];
    } else if (isTeacher) {
      return [
        { id: 1, type: "info", message: "3 nouveaux devoirs à corriger", time: "Il y a 10 min", priority: "medium" },
        { id: 2, type: "warning", message: "Réunion pédagogique dans 2h", time: "Il y a 30 min", priority: "high" },
        { id: 3, type: "success", message: "Notes du contrôle publiées", time: "Il y a 2h", priority: "low" },
      ];
    } else {
      return [
        { id: 1, type: "info", message: "Nouveau cours disponible", time: "Il y a 15 min", priority: "medium" },
        { id: 2, type: "success", message: "Note ajoutée: Mathématiques", time: "Il y a 1h", priority: "low" },
        { id: 3, type: "warning", message: "Absence non justifiée", time: "Il y a 3h", priority: "high" },
      ];
    }
  };

  const notifications = getRoleBasedNotifications();
  const getUserInitials = () => user.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-16 pl-[var(--sidebar-width,0px)]"
      role="banner"
    >
      {/* Surface avec palette de couleur stricte */}
      <div className="absolute inset-0 bg-[#1d8b93]/80 backdrop-blur-xl border-b border-[#4fa8b2]/20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#b8d070]/40 via-[#b8d070]/70 to-[#b8d070]/40" />

      <div className="relative h-full w-full flex items-center px-3 sm:px-5 gap-3">
        
        {/* Bouton retour + toggle sidebar */}
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="group flex items-center justify-center w-10 h-10 rounded-xl
                       bg-[#f0f9fa]/10 border border-[#87ccd3]/20 text-[#d9f0f2]
                       hover:bg-[#f0f9fa]/20 hover:text-white hover:border-[#87ccd3]/40
                       transition-all duration-300 hover:scale-105 hover:-translate-x-1"
              aria-label="Retour"
            >
              <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            </button>
          )}

          <button
            onClick={onToggleSidebar}
            className="lg:hidden group flex items-center justify-center w-10 h-10 rounded-xl
                     bg-[#f0f9fa]/10 border border-[#87ccd3]/20 text-[#d9f0f2]
                     hover:bg-[#f0f9fa]/20 hover:text-white hover:border-[#87ccd3]/40
                     transition-all duration-300 hover:scale-105"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180" />
          </button>
        </div>

        {/* Logo + Titre uniquement */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#b8d070] to-[#8ab445] 
                          flex items-center justify-center shadow-lg shadow-[#b8d070]/30
                          transition-all duration-300 group-hover:scale-105 group-hover:rotate-3
                          group-hover:shadow-xl group-hover:shadow-[#b8d070]/40">
              <School className="w-6 h-6 text-[#1d8b93] transition-transform duration-300 
                               group-hover:scale-110" />
            </div>
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#b8d070]/30 to-[#8ab445]/20 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
          </div>
          
          <div className="flex flex-col min-w-0">
            <h1 className="text-lg font-semibold text-white">{title}</h1>
          </div>
        </div>

        {/* Barre de recherche */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <div className="relative w-full max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#87ccd3]" />
            <input
              type="text"
              placeholder="Rechercher..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onOpenCommandPalette?.();
                }
              }}
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-[#f0f9fa]/10 border border-[#87ccd3]/20 text-base text-[#f0f9fa]
                       placeholder-[#b8e2e6] hover:bg-[#f0f9fa]/20 hover:border-[#87ccd3]/40
                       focus:outline-none focus:ring-2 focus:ring-[#87ccd3]/40 focus:border-[#87ccd3]/50
                       transition-all duration-300"
              aria-label="Rechercher"
            />
          </div>
        </div>

        

        {/* Actions droite */}
        <div className="ml-auto flex items-center gap-2">
          {rightActions}

          {/* Theme toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="group flex items-center justify-center w-10 h-10 rounded-xl 
                     bg-[#f0f9fa]/10 border border-[#87ccd3]/20 text-[#d9f0f2] 
                     hover:bg-[#f0f9fa]/20 hover:border-[#87ccd3]/40 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-[#b8d070]" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Refresh */}
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="group flex items-center justify-center w-10 h-10 rounded-xl 
                       bg-[#f0f9fa]/10 border border-[#87ccd3]/20 text-[#d9f0f2] 
                       hover:bg-[#f0f9fa]/20 hover:border-[#87ccd3]/40 transition-all duration-300"
              aria-label="Actualiser"
            >
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          )}

          {/* Notifications */}
          <div className="relative inline-block">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="group relative flex items-center justify-center w-10 h-10 rounded-xl 
                       bg-[#f0f9fa]/10 border border-[#87ccd3]/20 text-[#d9f0f2] 
                       hover:bg-[#f0f9fa]/20 hover:border-[#87ccd3]/40 transition-all duration-300"
              data-trigger="notifications"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
              {notificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-[#1d8b93]" />
              )}
            </button>

            {/* Dropdown notifications */}
            {showNotifications && (
              <div
                className="absolute right-0 top-[calc(100%+8px)] w-80 overflow-visible z-[60] rounded-2xl shadow-2xl 
                           backdrop-blur-xl border border-[#4fa8b2]/30 bg-[#1d8b93]/85"
                data-modal="notifications"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-[#b8d070]/10" />
                <div className="relative p-4 border-b border-[#4fa8b2]/30 flex items-center justify-between">
                  <h3 className="font-semibold text-white">Notifications</h3>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-[#b8e2e6]" />
                  </button>
                </div>
                <div className="relative max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0">
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          notification.type === "warning" ? "bg-[#b8d070]" :
                          notification.type === "info" ? "bg-[#4fa8b2]" : "bg-[#8ab445]"
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm text-white mb-1">{notification.message}</p>
                          <p className="text-xs text-[#d9f0f2] opacity-80">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Séparateur */}
          <div className="w-px h-6 bg-[#87ccd3]/30 mx-1" />

          {/* Profil utilisateur */}
          <div className="relative inline-block">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="group flex items-center gap-3 pl-3 pr-4 h-12 rounded-2xl 
                       bg-[#f0f9fa]/10 border border-[#87ccd3]/20 text-white 
                       hover:bg-[#f0f9fa]/20 hover:border-[#87ccd3]/40 transition-all duration-300 cursor-pointer"
              data-trigger="user-menu"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#186569] to-[#175356] 
                              flex items-center justify-center overflow-hidden 
                              border-2 border-[#87ccd3]/30 group-hover:border-[#b8d070]/50
                              transition-all duration-300">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white font-semibold text-sm">{getUserInitials()}</span>
                  )}
                </div>
                {user.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#8ab445] border-2 border-[#174548] rounded-full" />
                )}
              </div>
              
              <div className="hidden md:flex flex-col leading-tight min-w-0">
                <span className="text-sm font-medium text-[#f0f9fa] truncate group-hover:text-white transition-colors">
                  {user.name}
                </span>
                <span className="text-xs text-[#b8e2e6] truncate group-hover:text-[#d9f0f2] transition-colors">
                  {user.role}
                </span>
              </div>

              <Settings className="w-4 h-4 text-[#b8e2e6] group-hover:text-[#d9f0f2] 
                            transition-all duration-300 group-hover:rotate-90 ml-1" />
            </button>

            {/* Dropdown user menu */}
            {showUserMenu && (
              <div
                className="absolute right-0 top-[calc(100%+8px)] w-72 overflow-visible z-[60] rounded-2xl shadow-2xl 
                           backdrop-blur-xl border border-[#4fa8b2]/30 bg-[#1d8b93]/85"
                data-modal="user-menu"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-[#b8d070]/10" />
                {/* Profile header */}
                <div className="relative p-4 border-b border-[#4fa8b2]/30">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#186569] to-[#175356] 
                                  flex items-center justify-center overflow-hidden border-2 border-[#b8d070]/30">
                      {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white font-semibold">{getUserInitials()}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold">{user.name}</h3>
                      <p className="text-[#b8d070] text-sm">{user.role}</p>
                      <p className="text-[#b8e2e6] text-xs">{user.email}</p>
                    </div>
                  </div>
                </div>

                {/* Menu items */}
                <div className="relative p-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-white/10 rounded-lg transition-colors">
                    <User className="h-4 w-4 text-[#b8e2e6]" />
                    <span className="text-sm text-white">Mon profil</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-white/10 rounded-lg transition-colors">
                    <Settings className="h-4 w-4 text-[#b8e2e6]" />
                    <span className="text-sm text-white">Paramètres</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-white/10 rounded-lg transition-colors">
                    <HelpCircle className="h-4 w-4 text-[#b8e2e6]" />
                    <span className="text-sm text-white">Aide</span>
                  </button>
                  
                  <div className="my-2 h-px bg-white/10" />
                  
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-red-500/10 rounded-lg transition-colors">
                    <LogOut className="h-4 w-4 text-red-400" />
                    <span className="text-sm text-red-400">Se déconnecter</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#87ccd3]/30 to-transparent" />
    </header>
  );
}