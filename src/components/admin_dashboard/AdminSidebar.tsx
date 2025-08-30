"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Building2,
  Shield,
  FileText,
  UserCheck,
  Search,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  GraduationCap,
} from "lucide-react";

interface SidebarItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  hasDropdown?: boolean;
  subItems?: Array<{
    id: string;
    label: string;
    href: string;
    icon: React.ReactNode;
  }>;
}

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const sidebarItems: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    id: "users",
    label: "Utilisateurs",
    href: "/admin/users",
    icon: <Users className="w-5 h-5" />,
    badge: "1247",
  },
  {
    id: "units",
    label: "Unités structurelles",
    href: "/admin/units",
    icon: <Building2 className="w-5 h-5" />,
    hasDropdown: true,
    subItems: [
      {
        id: "primaire",
        label: "Primaire",
        href: "/admin/units/primaire",
        icon: <GraduationCap className="w-4 h-4" />,
      },
      {
        id: "college",
        label: "Collège",
        href: "/admin/units/college",
        icon: <GraduationCap className="w-4 h-4" />,
      },
      {
        id: "lycee",
        label: "Lycée",
        href: "/admin/units/lycee",
        icon: <GraduationCap className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "roles",
    label: "Rôles & Permissions",
    href: "/admin/roles-permissions",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: "elements",
    label: "Éléments",
    href: "/admin/elements",
    icon: <FileText className="w-5 h-5" />,
    badge: "3421",
  },
  {
    id: "attributions",
    label: "Attributions",
    href: "/admin/attributions",
    icon: <UserCheck className="w-5 h-5" />,
  },
  {
    id: "search",
    label: "Recherche avancée",
    href: "/admin/search",
    icon: <Search className="w-5 h-5" />,
  },
  {
    id: "reports",
    label: "Rapports & Export",
    href: "/admin/reports",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    id: "settings",
    label: "Paramètres",
    href: "/admin/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isCollapsed,
  onToggle,
}) => {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

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
                <span className="text-[#1d8b93] font-bold text-lg">S</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Schola</h2>
                <p className="text-xs text-white/60">Administration</p>
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
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            const isExpanded = expandedItems.has(item.id);
            const hasActiveSubItem = item.subItems?.some((subItem) =>
              pathname.startsWith(subItem.href)
            );

            return (
              <li key={item.id}>
                {/* Item principal */}
                {item.hasDropdown ? (
                  <div className="relative">
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${
                        isActive || hasActiveSubItem
                          ? "bg-[#b8d070] text-[#1d8b93] shadow-lg"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span
                        className={
                          isActive || hasActiveSubItem
                            ? "text-[#1d8b93]"
                            : "text-current"
                        }
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
                          <span className="font-medium text-sm">
                            {item.label}
                          </span>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleExpanded(item.id);
                            }}
                            className={`p-1 rounded transition-colors ${
                              isActive || hasActiveSubItem
                                ? "text-[#1d8b93] hover:bg-[#1d8b93]/10"
                                : "text-current hover:bg-white/10"
                            }`}
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </motion.div>
                      )}
                    </Link>
                  </div>
                ) : (
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
                        <span className="font-medium text-sm">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              isActive
                                ? "bg-[#1d8b93]/20 text-[#1d8b93]"
                                : "bg-white/20 text-white/80"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </motion.div>
                    )}
                  </Link>
                )}

                {/* Dropdown des sous-items */}
                {item.hasDropdown && item.subItems && !isCollapsed && (
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-6 mt-2 space-y-1 border-l border-white/20 pl-4"
                      >
                        {item.subItems.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          return (
                            <li key={subItem.id}>
                              <Link
                                href={subItem.href}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                                  isSubActive
                                    ? "bg-[#b8d070]/20 text-[#b8d070] font-medium"
                                    : "text-white/70 hover:text-white hover:bg-white/10"
                                }`}
                              >
                                <span className="text-current">
                                  {subItem.icon}
                                </span>
                                <span>{subItem.label}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
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
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Section Structure - Arbre dynamique des unités */}
      <div className="mt-8">
        <div className="px-4 mb-4">
          <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider">
            Structure
          </h3>
        </div>

        <nav className="px-4">
          <ul className="space-y-2">
            {/* Établissement racine */}
            <li>
              <div className="relative">
                <button
                  onClick={() => toggleExpanded("structure")}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${
                    expandedItems.has("structure")
                      ? "bg-white/20 text-white"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-[#b8d070] to-[#a2c65e] flex items-center justify-center">
                    <Building2 className="w-3 h-3 text-[#1d8b93]" />
                  </div>

                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex-1 flex items-center justify-between"
                    >
                      <span className="font-medium text-sm">
                        Groupe Scolaire Sylla Lamine
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleExpanded("structure");
                        }}
                        className={`p-1 rounded transition-colors ${
                          expandedItems.has("structure")
                            ? "text-white hover:bg-white/10"
                            : "text-current hover:bg-white/10"
                        }`}
                      >
                        {expandedItems.has("structure") ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </motion.div>
                  )}
                </button>

                {/* Sous-unités de l'établissement */}
                <AnimatePresence>
                  {expandedItems.has("structure") && !isCollapsed && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-6 mt-2 space-y-1 border-l border-white/20 pl-4"
                    >
                      {/* Primaire */}
                      <li>
                        <div className="relative">
                          <button
                            onClick={() => toggleExpanded("primaire")}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                              expandedItems.has("primaire")
                                ? "bg-white/20 text-white"
                                : "text-white/70 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            <GraduationCap className="w-4 h-4" />
                            <span>Primaire</span>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleExpanded("primaire");
                              }}
                              className="ml-auto p-1 rounded transition-colors hover:bg-white/10"
                            >
                              {expandedItems.has("primaire") ? (
                                <ChevronUp className="w-3 h-3" />
                              ) : (
                                <ChevronDown className="w-3 h-3" />
                              )}
                            </button>
                          </button>

                          {/* Classes du primaire */}
                          <AnimatePresence>
                            {expandedItems.has("primaire") && (
                              <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-6 mt-1 space-y-1 border-l border-white/20 pl-4"
                              >
                                {[
                                  { id: "1ere", nom: "1ère Année" },
                                  { id: "2eme", nom: "2ème Année" },
                                  { id: "3eme", nom: "3ème Année" },
                                  { id: "4eme", nom: "4ème Année" },
                                  { id: "5eme", nom: "5ème Année" },
                                  { id: "6eme", nom: "6ème Année" },
                                ].map((classe) => (
                                  <li key={classe.id}>
                                    <Link
                                      href={`/admin/units/${classe.id}`}
                                      className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm text-white/60 hover:text-white hover:bg-white/10"
                                    >
                                      <div className="w-2 h-2 rounded-full bg-[#b8d070]"></div>
                                      <span>{classe.nom}</span>
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      </li>

                      {/* Collège */}
                      <li>
                        <div className="relative">
                          <button
                            onClick={() => toggleExpanded("college")}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                              expandedItems.has("college")
                                ? "bg-white/20 text-white"
                                : "text-white/70 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            <GraduationCap className="w-4 h-4" />
                            <span>Collège</span>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleExpanded("college");
                              }}
                              className="ml-auto p-1 rounded transition-colors hover:bg-white/10"
                            >
                              {expandedItems.has("college") ? (
                                <ChevronUp className="w-3 h-3" />
                              ) : (
                                <ChevronDown className="w-3 h-3" />
                              )}
                            </button>
                          </button>

                          {/* Classes du collège */}
                          <AnimatePresence>
                            {expandedItems.has("college") && (
                              <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-6 mt-1 space-y-1 border-l border-white/20 pl-4"
                              >
                                {[
                                  { id: "6eme", nom: "6ème" },
                                  { id: "5eme", nom: "5ème" },
                                  { id: "4eme", nom: "4ème" },
                                  { id: "3eme", nom: "3ème" },
                                ].map((classe) => (
                                  <li key={classe.id}>
                                    <Link
                                      href={`/admin/units/${classe.id}`}
                                      className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm text-white/60 hover:text-white hover:bg-white/10"
                                    >
                                      <div className="w-2 h-2 rounded-full bg-[#b8d070]"></div>
                                      <span>{classe.nom}</span>
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      </li>

                      {/* Lycée */}
                      <li>
                        <div className="relative">
                          <button
                            onClick={() => toggleExpanded("lycee")}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                              expandedItems.has("lycee")
                                ? "bg-white/20 text-white"
                                : "text-white/70 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            <GraduationCap className="w-4 h-4" />
                            <span>Lycée</span>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleExpanded("lycee");
                              }}
                              className="ml-auto p-1 rounded transition-colors hover:bg-white/10"
                            >
                              {expandedItems.has("lycee") ? (
                                <ChevronUp className="w-3 h-3" />
                              ) : (
                                <ChevronDown className="w-3 h-3" />
                              )}
                            </button>
                          </button>

                          {/* Classes du lycée */}
                          <AnimatePresence>
                            {expandedItems.has("lycee") && (
                              <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-6 mt-1 space-y-1 border-l border-white/20 pl-4"
                              >
                                {[
                                  { id: "2nde", nom: "Seconde" },
                                  { id: "1ere", nom: "Première" },
                                  { id: "terminale", nom: "Terminale" },
                                ].map((classe) => (
                                  <li key={classe.id}>
                                    <Link
                                      href={`/admin/units/${classe.id}`}
                                      className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm text-white/60 hover:text-white hover:bg-white/10"
                                    >
                                      <div className="w-2 h-2 rounded-full bg-[#b8d070]"></div>
                                      <span>{classe.nom}</span>
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div
          className={`flex items-center gap-3 px-3 py-2 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#b8d070] to-[#a2c65e] flex items-center justify-center">
            <span className="text-[#1d8b93] font-bold text-sm">A</span>
          </div>

          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex-1"
            >
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-white/60">admin@schola.edu</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;
