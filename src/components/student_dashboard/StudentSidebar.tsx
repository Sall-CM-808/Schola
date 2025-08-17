"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  FileText,
  GraduationCap,
  FolderOpen,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  Clock,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StudentSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

interface MenuItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  color?: string;
}

const menuItems: MenuItem[] = [
  {
    label: "Tableau de bord",
    href: "/student/dashboard",
    icon: LayoutDashboard,
    color: "text-blue-400",
  },
  {
    label: "Mes cours",
    href: "/student/courses",
    icon: BookOpen,
    color: "text-green-400",
    badge: 6,
  },
  {
    label: "Emploi du temps",
    href: "/student/schedule",
    icon: Calendar,
    color: "text-purple-400",
  },
  {
    label: "Devoirs",
    href: "/student/homework",
    icon: FileText,
    color: "text-orange-400",
    badge: 3,
  },
  {
    label: "Notes",
    href: "/student/grades",
    icon: GraduationCap,
    color: "text-yellow-400",
  },
  {
    label: "Ressources",
    href: "/student/resources",
    icon: FolderOpen,
    color: "text-cyan-400",
  },
];

const bottomMenuItems: MenuItem[] = [
  {
    label: "Paramètres",
    href: "/student/settings",
    icon: Settings,
    color: "text-gray-400",
  },
  {
    label: "Aide & Support",
    href: "/student/help",
    icon: HelpCircle,
    color: "text-indigo-400",
  },
];

export default function StudentSidebar({
  isCollapsed,
  onToggle,
}: StudentSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/student/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "fixed left-0 top-0 h-screen bg-white/10 backdrop-blur-xl border-r border-white/20 transition-all duration-300 z-30",
        isCollapsed ? "w-[80px]" : "w-[280px]"
      )}
    >
      {/* Header avec logo et toggle */}
      <div className="h-20 flex items-center justify-between px-4 border-b border-white/20">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#b8d070] to-[#a2c65e] rounded-lg flex items-center justify-center shadow-lg">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-white font-semibold text-sm">
                Espace Étudiant
              </h2>
              <p className="text-white/60 text-xs">Schola Learning</p>
            </div>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggle}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label={
            isCollapsed ? "Développer la sidebar" : "Réduire la sidebar"
          }
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-white/70" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-white/70" />
          )}
        </motion.button>
      </div>

      {/* Navigation principale */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1 px-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <Link href={item.href}>
                  <div
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                      active
                        ? "bg-white/20 text-white shadow-lg border border-white/30"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5 transition-colors",
                        active ? "text-[#b8d070]" : item.color
                      )}
                    />

                    {!isCollapsed && (
                      <>
                        <span className="font-medium text-sm flex-1 truncate">
                          {item.label}
                        </span>

                        {item.badge && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-lg"
                          >
                            {item.badge}
                          </motion.span>
                        )}
                      </>
                    )}

                    {/* Indicateur actif */}
                    {active && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-[#b8d070] rounded-r-full"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Section bottom */}
        <div className="mt-8 pt-4 border-t border-white/20">
          <div className="space-y-1 px-3">
            {bottomMenuItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index + menuItems.length) * 0.1 + 0.3 }}
                >
                  <Link href={item.href}>
                    <div
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                        active
                          ? "bg-white/20 text-white shadow-lg border border-white/30"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-5 h-5 transition-colors",
                          active ? "text-[#b8d070]" : item.color
                        )}
                      />

                      {!isCollapsed && (
                        <span className="font-medium text-sm flex-1 truncate">
                          {item.label}
                        </span>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}

            {/* Bouton de déconnexion */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: (bottomMenuItems.length + menuItems.length) * 0.1 + 0.3,
              }}
            >
              <button
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                  "text-red-400 hover:text-red-300 hover:bg-red-500/20"
                )}
              >
                <LogOut className="w-5 h-5" />
                {!isCollapsed && (
                  <span className="font-medium text-sm flex-1 text-left">
                    Déconnexion
                  </span>
                )}
              </button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Footer avec infos étudiant */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-4 border-t border-white/20"
        >
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">
                Marie Camara
              </p>
              <p className="text-white/60 text-xs">Terminale S • Promo 2024</p>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg"></div>
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
}

