"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Calendar,
  BookOpen,
  GraduationCap,
  Clock,
  MessageCircle,
  CreditCard,
  FolderOpen,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Heart,
  Baby,
} from "lucide-react";

interface SidebarItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

interface ParentSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const parentSidebar: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Tableau de bord",
    href: "/parent/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    id: "children",
    label: "Mes enfants",
    href: "/parent/children",
    icon: <Baby className="w-5 h-5" />,
    badge: "4",
  },
  {
    id: "schedule",
    label: "Emploi du temps",
    href: "/parent/schedule",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    id: "homework",
    label: "Devoirs",
    href: "/parent/homework",
    icon: <BookOpen className="w-5 h-5" />,
    badge: "7",
  },
  {
    id: "grades",
    label: "Notes & bulletins",
    href: "/parent/grades",
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    id: "attendance",
    label: "Présence & retards",
    href: "/parent/attendance",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    id: "messages",
    label: "Messages",
    href: "/parent/messages",
    icon: <MessageCircle className="w-5 h-5" />,
    badge: "3",
  },
  {
    id: "billing",
    label: "Paiements & factures",
    href: "/parent/billing",
    icon: <CreditCard className="w-5 h-5" />,
    badge: "1",
  },
  {
    id: "resources",
    label: "Ressources",
    href: "/parent/resources",
    icon: <FolderOpen className="w-5 h-5" />,
  },
  {
    id: "settings",
    label: "Paramètres",
    href: "/parent/settings",
    icon: <Settings className="w-5 h-5" />,
  },
  {
    id: "help",
    label: "Aide & Support",
    href: "/parent/help",
    icon: <HelpCircle className="w-5 h-5" />,
  },
];

const ParentSidebar: React.FC<ParentSidebarProps> = ({
  isCollapsed,
  onToggle,
}) => {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen bg-gradient-to-b from-[#1d8b93] to-[#0d5a61] border-r border-white/10 flex flex-col shadow-xl z-30"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#b8d070] to-[#a2c65e] shadow-lg">
                <Heart className="w-5 h-5 text-[#1d8b93]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Schola</h2>
                <p className="text-xs text-white/60">Espace Parent</p>
              </div>
            </motion.div>
          )}

          <button
            onClick={onToggle}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {parentSidebar.map((item, index) => {
            const isActive = pathname === item.href;

            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${
                    isActive
                      ? "bg-[#b8d070] text-[#1d8b93] shadow-lg"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span
                    className={isActive ? "text-[#1d8b93]" : "text-current"}
                  >
                    {item.icon}
                  </span>

                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex-1 flex items-center justify-between"
                    >
                      <span className="font-medium text-sm">{item.label}</span>
                      {item.badge && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring" }}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            isActive
                              ? "bg-[#1d8b93]/20 text-[#1d8b93]"
                              : "bg-white/20 text-white/80"
                          }`}
                        >
                          {item.badge}
                        </motion.span>
                      )}
                    </motion.div>
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                      {item.label}
                      {item.badge && (
                        <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Indicateur actif */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicatorParent"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#1d8b93] rounded-r-full"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Footer avec infos parent */}
      <div className="p-4 border-t border-white/10">
        <div
          className={`flex items-center gap-3 px-3 py-2 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#b8d070] to-[#a2c65e] flex items-center justify-center">
            <span className="text-[#1d8b93] font-bold text-sm">P</span>
          </div>

          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex-1"
            >
              <p className="text-sm font-medium text-white">Mme Camara</p>
              <p className="text-xs text-white/60">parent@schola.edu</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs text-green-400">4 enfants</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};

export default ParentSidebar;
