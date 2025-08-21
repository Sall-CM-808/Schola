"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Bell,
  Search,
  User,
  ChevronDown,
  Mail,
  Settings,
  LogOut,
  Heart,
  X,
} from "lucide-react";

interface ParentHeaderProps {
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

const ParentHeader: React.FC<ParentHeaderProps> = ({
  onToggleSidebar,
  sidebarCollapsed,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Fermer le menu au clic en dehors
  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (
      !target.closest('[data-modal="user-menu"]') &&
      !target.closest('[data-trigger="user-menu"]')
    ) {
      setShowUserMenu(false);
    }
  }, []);

  React.useEffect(() => {
    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showUserMenu, handleClickOutside]);
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 right-0 h-20 bg-white/10 backdrop-blur-md border-b border-white/10 shadow-lg z-20 transition-all duration-300 ${
        sidebarCollapsed ? "left-[80px]" : "left-[280px]"
      }`}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Left side - Toggle and breadcrumb */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden md:flex items-center gap-2 text-white/70">
            <Heart className="w-4 h-4 text-[#b8d070]" />
            <span className="text-sm">Espace Parent</span>
            <span className="text-white/40">/</span>
            <span className="text-white text-sm font-medium">
              Tableau de bord
            </span>
          </div>
        </div>

        {/* Center - Search bar */}
        <div className="hidden md:flex items-center max-w-md flex-1 mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              type="text"
              placeholder="Rechercher un enfant, un message..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Right side - Actions and user */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
          >
            <Bell className="w-5 h-5" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center"
            >
              <span className="text-xs text-white font-bold">3</span>
            </motion.div>
          </motion.button>

          {/* Messages */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
          >
            <Mail className="w-5 h-5" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-[#b8d070] rounded-full flex items-center justify-center"
            >
              <span className="text-xs text-[#1d8b93] font-bold">2</span>
            </motion.div>
          </motion.button>

          {/* User menu */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200"
              data-trigger="user-menu"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#b8d070]/30 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
                  alt="Mme Camara"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    (
                      e.currentTarget.nextElementSibling as HTMLElement
                    ).style.display = "flex";
                  }}
                />
                <div
                  className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 hidden items-center justify-center text-white font-bold text-sm"
                  style={{ display: "none" }}
                >
                  FC
                </div>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-white text-sm font-medium">Mme Camara</p>
                <p className="text-white/60 text-xs">Parent</p>
              </div>
              <ChevronDown className="w-4 h-4 text-white/70" />
            </motion.button>

            {/* Dropdown menu */}
            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-72 bg-[#1d8b93] border border-[#2a9ba5] rounded-xl shadow-xl z-50"
                  data-modal="user-menu"
                >
                  <div className="p-4">
                    {/* Bouton de fermeture */}
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowUserMenu(false)}
                      className="absolute top-3 right-3 p-2 hover:bg-[#2a9ba5] rounded-full transition-all duration-200 group z-10"
                    >
                      <X className="w-4 h-4 text-white/90 group-hover:text-white" />
                    </motion.button>

                    {/* Profile Header */}
                    <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/20">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#b8d070]/50 shadow-xl">
                        <img
                          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
                          alt="Mme Camara"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            (
                              e.currentTarget.nextElementSibling as HTMLElement
                            ).style.display = "flex";
                          }}
                        />
                        <div
                          className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 hidden items-center justify-center text-white font-bold text-2xl"
                          style={{ display: "none" }}
                        >
                          FC
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">
                          Mme Fatoumata Camara
                        </h3>
                        <p className="text-white/90 text-sm">
                          parent@schola.edu
                        </p>
                        <p className="text-[#b8d070] text-xs">
                          Parent de 4 enfants
                        </p>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-[#2a9ba5] rounded-lg p-3 text-center">
                        <div className="text-[#b8d070] font-bold text-lg">
                          4
                        </div>
                        <div className="text-white/90 text-xs">Enfants</div>
                      </div>
                      <div className="bg-[#2a9ba5] rounded-lg p-3 text-center">
                        <div className="text-orange-400 font-bold text-lg">
                          7
                        </div>
                        <div className="text-white/90 text-xs">Devoirs</div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="space-y-1">
                      <button className="w-full flex items-center gap-3 px-3 py-2 text-white/90 hover:text-white hover:bg-[#2a9ba5] rounded-lg transition-colors duration-200">
                        <User className="w-4 h-4" />
                        <span className="text-sm">Mon profil</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2 text-white/90 hover:text-white hover:bg-[#2a9ba5] rounded-lg transition-colors duration-200">
                        <Settings className="w-4 h-4" />
                        <span className="text-sm">Paramètres</span>
                      </button>
                      <div className="border-t border-white/20 my-2"></div>
                      <button className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors duration-200">
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Déconnexion</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 0, height: 0 }}
        className="md:hidden px-6 pb-4 border-t border-white/10"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent"
          />
        </div>
      </motion.div>
    </motion.header>
  );
};

export default ParentHeader;
