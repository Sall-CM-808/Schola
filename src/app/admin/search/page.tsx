"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Users,
  FileText,
  Shield,
  UserPlus,
  Filter,
  X,
} from "lucide-react";

// Import des données mock
import { users } from "@/lib/mocks/adminUsers";
import { elements } from "@/lib/mocks/adminElements";
import { roles } from "@/lib/mocks/adminRoles";
import { attributions } from "@/lib/mocks/adminAttributions";

type SearchTab = "users" | "elements" | "roles" | "attributions";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  type: string;
  status?: string;
  metadata?: Record<string, any>;
}

const AdminSearchPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SearchTab>("users");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const pageSize = 10;

  const tabs = [
    {
      id: "users" as const,
      label: "Utilisateurs",
      icon: Users,
      count: users.length,
    },
    {
      id: "elements" as const,
      label: "Éléments",
      icon: FileText,
      count: elements.length,
    },
    { id: "roles" as const, label: "Rôles", icon: Shield, count: roles.length },
    {
      id: "attributions" as const,
      label: "Attributions",
      icon: UserPlus,
      count: attributions.length,
    },
  ];

  // Fonction de recherche
  const performSearch = (query: string, tab: SearchTab, page: number = 1) => {
    setIsLoading(true);
    setCurrentPage(page);

    // Simuler un délai de recherche
    setTimeout(() => {
      let results: SearchResult[] = [];

      switch (tab) {
        case "users":
          results = users
            .filter((user) => {
              const matchesQuery =
                query === "" ||
                user.name.toLowerCase().includes(query.toLowerCase()) ||
                user.email.toLowerCase().includes(query.toLowerCase()) ||
                user.username.toLowerCase().includes(query.toLowerCase());

              const matchesFilters = Object.entries(filters).every(
                ([key, value]) => {
                  if (!value) return true;
                  return user[key as keyof typeof user]?.toString() === value;
                }
              );

              return matchesQuery && matchesFilters;
            })
            .map((user) => ({
              id: user.id,
              title: user.name,
              subtitle: user.email,
              description: `@${user.username} • ${user.type} • ${user.status}`,
              type: user.type,
              status: user.status,
              metadata: {
                createdAt: user.createdAt,
                lastLogin: user.lastLogin,
              },
            }));
          break;

        case "elements":
          results = elements
            .filter((element) => {
              const matchesQuery =
                query === "" ||
                element.title.toLowerCase().includes(query.toLowerCase()) ||
                element.ownerName.toLowerCase().includes(query.toLowerCase()) ||
                element.unitName.toLowerCase().includes(query.toLowerCase());

              const matchesFilters = Object.entries(filters).every(
                ([key, value]) => {
                  if (!value) return true;
                  return (
                    element[key as keyof typeof element]?.toString() === value
                  );
                }
              );

              return matchesQuery && matchesFilters;
            })
            .map((element) => ({
              id: element.id,
              title: element.title,
              subtitle: `Par ${element.ownerName} • ${element.unitName}`,
              description:
                element.description || `${element.type} • ${element.status}`,
              type: element.type,
              status: element.status,
              metadata: {
                createdAt: element.createdAt,
                updatedAt: element.updatedAt,
              },
            }));
          break;

        case "roles":
          results = roles
            .filter((role) => {
              const matchesQuery =
                query === "" ||
                role.name.toLowerCase().includes(query.toLowerCase()) ||
                role.description.toLowerCase().includes(query.toLowerCase());

              const matchesFilters = Object.entries(filters).every(
                ([key, value]) => {
                  if (!value) return true;
                  if (key === "isSystem")
                    return role.isSystem.toString() === value;
                  return role[key as keyof typeof role]?.toString() === value;
                }
              );

              return matchesQuery && matchesFilters;
            })
            .map((role) => ({
              id: role.id,
              title: role.name,
              subtitle: `${role.membersCount} membres`,
              description: role.description,
              type: role.isSystem ? "system" : "custom",
              metadata: {
                createdAt: role.createdAt,
                membersCount: role.membersCount,
              },
            }));
          break;

        case "attributions":
          results = attributions
            .filter((attribution) => {
              const matchesQuery =
                query === "" ||
                attribution.userName
                  .toLowerCase()
                  .includes(query.toLowerCase()) ||
                attribution.roleName
                  .toLowerCase()
                  .includes(query.toLowerCase()) ||
                attribution.scopeName
                  .toLowerCase()
                  .includes(query.toLowerCase());

              const matchesFilters = Object.entries(filters).every(
                ([key, value]) => {
                  if (!value) return true;
                  return (
                    attribution[key as keyof typeof attribution]?.toString() ===
                    value
                  );
                }
              );

              return matchesQuery && matchesFilters;
            })
            .map((attribution) => ({
              id: attribution.id,
              title: `${attribution.userName} → ${attribution.roleName}`,
              subtitle: `${attribution.scopeType}: ${attribution.scopeName}`,
              description: `${attribution.status} • Demandé par ${attribution.requestedBy}`,
              type: attribution.scopeType,
              status: attribution.status,
              metadata: {
                requestedAt: attribution.requestedAt,
                startDate: attribution.startDate,
                endDate: attribution.endDate,
              },
            }));
          break;
      }

      setSearchResults(results);
      setIsLoading(false);
    }, 300);
  };

  // Effet pour effectuer la recherche
  useEffect(() => {
    performSearch(searchQuery, activeTab);
  }, [searchQuery, activeTab, filters]);

  // Pagination
  const totalPages = Math.ceil(searchResults.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedResults = searchResults.slice(
    startIndex,
    startIndex + pageSize
  );

  // Obtenir les filtres disponibles selon l'onglet
  const getAvailableFilters = (tab: SearchTab) => {
    switch (tab) {
      case "users":
        return [
          {
            key: "type",
            label: "Type",
            options: [
              { value: "admin", label: "Administrateur" },
              { value: "teacher", label: "Enseignant" },
              { value: "student", label: "Étudiant" },
              { value: "staff", label: "Personnel" },
            ],
          },
          {
            key: "status",
            label: "Statut",
            options: [
              { value: "active", label: "Actif" },
              { value: "inactive", label: "Inactif" },
            ],
          },
        ];
      case "elements":
        return [
          {
            key: "type",
            label: "Type",
            options: [
              { value: "course", label: "Cours" },
              { value: "assignment", label: "Devoir" },
              { value: "resource", label: "Ressource" },
              { value: "announcement", label: "Annonce" },
              { value: "exam", label: "Examen" },
              { value: "project", label: "Projet" },
            ],
          },
          {
            key: "status",
            label: "Statut",
            options: [
              { value: "active", label: "Actif" },
              { value: "inactive", label: "Inactif" },
              { value: "draft", label: "Brouillon" },
              { value: "archived", label: "Archivé" },
            ],
          },
        ];
      case "roles":
        return [
          {
            key: "isSystem",
            label: "Type",
            options: [
              { value: "true", label: "Système" },
              { value: "false", label: "Personnalisé" },
            ],
          },
        ];
      case "attributions":
        return [
          {
            key: "status",
            label: "Statut",
            options: [
              { value: "active", label: "Active" },
              { value: "pending", label: "En attente" },
              { value: "expired", label: "Expirée" },
              { value: "cancelled", label: "Annulée" },
            ],
          },
          {
            key: "scopeType",
            label: "Portée",
            options: [
              { value: "Element", label: "Élément" },
              { value: "Unit", label: "Unité" },
              { value: "Global", label: "Global" },
            ],
          },
        ];
      default:
        return [];
    }
  };

  const availableFilters = getAvailableFilters(activeTab);
  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Recherche Avancée
        </h1>
        <p className="text-white/70">
          Recherchez dans tous les éléments de la plateforme
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
            <input
              type="text"
              placeholder={`Rechercher dans ${tabs
                .find((t) => t.id === activeTab)
                ?.label.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent"
            />
          </div>

          {/* Filters Toggle */}
          {availableFilters.length > 0 && (
            <button
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors duration-200 ${
                activeFiltersCount > 0
                  ? "bg-[#b8d070]/20 border-[#b8d070]/30 text-[#b8d070]"
                  : "bg-white/10 hover:bg-white/20 border-white/20 text-white/70 hover:text-white"
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">
                Filtres {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </span>
            </button>
          )}
        </div>

        {/* Filters */}
        {availableFilters.length > 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {availableFilters.map((filter) => (
                <div key={filter.key}>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    {filter.label}
                  </label>
                  <select
                    value={filters[filter.key] || ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        [filter.key]: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent text-sm appearance-none"
                  >
                    <option value="" className="bg-[#1d8b93] text-white">
                      Tous
                    </option>
                    {filter.options.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-[#1d8b93] text-white"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-white/60">Filtres actifs:</span>
                {Object.entries(filters).map(([key, value]) => {
                  if (!value) return null;
                  const filter = availableFilters.find((f) => f.key === key);
                  const label =
                    filter?.options.find((o) => o.value === value)?.label ||
                    value;

                  return (
                    <span
                      key={key}
                      className="flex items-center gap-1 px-2 py-1 bg-[#b8d070]/20 text-[#b8d070] rounded text-xs font-medium"
                    >
                      {filter?.label}: {label}
                      <button
                        onClick={() =>
                          setFilters((prev) => {
                            const newFilters = { ...prev };
                            delete newFilters[key];
                            return newFilters;
                          })
                        }
                        className="hover:bg-[#b8d070]/30 rounded p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })}
                <button
                  onClick={() => setFilters({})}
                  className="text-xs text-white/60 hover:text-white underline"
                >
                  Tout effacer
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setFilters({});
              setCurrentPage(1);
            }}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 flex-1 ${
              activeTab === tab.id
                ? "bg-[#b8d070] text-[#1d8b93] font-medium shadow-lg"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="font-medium">{tab.label}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                activeTab === tab.id
                  ? "bg-[#1d8b93]/20 text-[#1d8b93]"
                  : "bg-white/20 text-white/60"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              Résultats de recherche
            </h3>
            <span className="text-sm text-white/60">
              {searchResults.length} résultat
              {searchResults.length !== 1 ? "s" : ""}
              {searchQuery && ` pour "${searchQuery}"`}
            </span>
          </div>
        </div>

        <div className="divide-y divide-white/5">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="p-6 animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-white/20 rounded w-3/4"></div>
                    <div className="h-4 bg-white/20 rounded w-1/2"></div>
                    <div className="h-3 bg-white/20 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))
          ) : paginatedResults.length > 0 ? (
            paginatedResults.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-6 hover:bg-white/5 transition-colors duration-200 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#b8d070] to-[#a2c65e] flex items-center justify-center">
                    <span className="text-[#1d8b93] font-bold text-lg">
                      {result.title.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-semibold text-white mb-1 truncate">
                      {result.title}
                    </h4>
                    <p className="text-white/70 mb-2 truncate">
                      {result.subtitle}
                    </p>
                    {result.description && (
                      <p className="text-sm text-white/60 mb-3 line-clamp-2">
                        {result.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-1 bg-white/10 text-white/70 rounded text-xs">
                        {result.type}
                      </span>
                      {result.status && (
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            result.status === "active"
                              ? "bg-green-500/20 text-green-300"
                              : result.status === "inactive" ||
                                result.status === "cancelled"
                              ? "bg-red-500/20 text-red-300"
                              : result.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : "bg-gray-500/20 text-gray-300"
                          }`}
                        >
                          {result.status}
                        </span>
                      )}
                      {result.metadata?.createdAt && (
                        <span className="text-xs text-white/50">
                          Créé le{" "}
                          {new Date(
                            result.metadata.createdAt
                          ).toLocaleDateString("fr-FR")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Aucun résultat trouvé
              </h3>
              <p className="text-white/60">
                {searchQuery
                  ? `Aucun résultat pour "${searchQuery}" dans ${tabs
                      .find((t) => t.id === activeTab)
                      ?.label.toLowerCase()}`
                  : `Aucun élément dans ${tabs
                      .find((t) => t.id === activeTab)
                      ?.label.toLowerCase()}`}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-6 border-t border-white/10 flex items-center justify-between">
            <div className="text-sm text-white/60">
              Page {currentPage} sur {totalPages} • {searchResults.length}{" "}
              résultat{searchResults.length !== 1 ? "s" : ""}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  performSearch(
                    searchQuery,
                    activeTab,
                    Math.max(1, currentPage - 1)
                  )
                }
                disabled={currentPage === 1}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 rounded-lg text-white text-sm transition-colors duration-200"
              >
                Précédent
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() =>
                        performSearch(searchQuery, activeTab, pageNum)
                      }
                      className={`w-8 h-8 rounded-lg text-sm transition-colors duration-200 ${
                        currentPage === pageNum
                          ? "bg-[#b8d070] text-[#1d8b93] font-medium"
                          : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() =>
                  performSearch(
                    searchQuery,
                    activeTab,
                    Math.min(totalPages, currentPage + 1)
                  )
                }
                disabled={currentPage === totalPages}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 rounded-lg text-white text-sm transition-colors duration-200"
              >
                Suivant
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminSearchPage;
