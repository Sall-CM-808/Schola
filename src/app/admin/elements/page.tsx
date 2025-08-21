"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdvancedDataTable, {
  AdvancedDataTableSkeleton,
} from "@/components/admin_dashboard/AdvancedDataTable";
import {
  elements,
  elementsStats,
  elementTypes,
  elementStatuses,
  generateElementDetail,
  simulateLoading,
  type Element,
  type ElementDetail,
} from "@/lib/mocks/adminElements";
import {
  FileText,
  Archive,
  Plus,
  Download,
  Upload,
  Calendar,
  User,
  Building2,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit3,
  Trash2,
  History,
  Shield,
  UserPlus,
  Tag,
  BookOpen,
} from "lucide-react";

const AdminElementsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [elementsData, setElementsData] = useState<Element[]>([]);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [elementDetail, setElementDetail] = useState<ElementDetail | null>(
    null
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      await simulateLoading(500);
      setElementsData(elements);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleElementClick = async (element: Element) => {
    setSelectedElement(element);
    setIsDrawerOpen(true);
    setIsLoadingDetail(true);
    setElementDetail(null);

    // Simuler le chargement des détails
    await simulateLoading(300);
    const detail = generateElementDetail(element.id);
    setElementDetail(detail);
    setIsLoadingDetail(false);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedElement(null);
    setElementDetail(null);
  };

  // Configuration des colonnes
  const columns = [
    {
      key: "title",
      header: "Titre",
      render: (element: Element) => (
        <div className="flex items-center gap-3">
          <div className="text-2xl">
            {(() => {
              const Icon = elementTypes[element.type].icon;
              return <Icon className="w-5 h-5" />;
            })()}
          </div>
          <div>
            <div className="font-medium text-white">{element.title}</div>
            <div className="text-sm text-white/60">
              {element.description?.substring(0, 60)}...
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (element: Element) => {
        const typeConfig = elementTypes[element.type];
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium border ${typeConfig.color}`}
          >
            {typeConfig.label}
          </span>
        );
      },
    },
    {
      key: "ownerName",
      header: "Propriétaire",
      render: (element: Element) => (
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-white/60" />
          <span className="text-white/90">{element.ownerName}</span>
        </div>
      ),
    },
    {
      key: "unitName",
      header: "Unité",
      render: (element: Element) => (
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-white/60" />
          <span className="text-white/90">{element.unitName}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Statut",
      render: (element: Element) => {
        const statusConfig = elementStatuses[element.status];
        return (
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}
          >
            {element.status === "active" && <CheckCircle className="w-3 h-3" />}
            {element.status === "inactive" && <XCircle className="w-3 h-3" />}
            {element.status === "draft" && <Clock className="w-3 h-3" />}
            {element.status === "archived" && <Archive className="w-3 h-3" />}
            {statusConfig.label}
          </span>
        );
      },
    },
    {
      key: "createdAt",
      header: "Créé le",
      render: (element: Element) => (
        <span className="text-white/70">
          {new Date(element.createdAt).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      render: (element: Element) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleElementClick(element);
            }}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors duration-200"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors duration-200"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  // Configuration des filtres
  const filters = [
    {
      key: "search",
      label: "Recherche",
      type: "search" as const,
      placeholder: "Titre, propriétaire ou unité...",
    },
    {
      key: "type",
      label: "Type d'élément",
      type: "select" as const,
      options: Object.entries(elementTypes).map(([key, value]) => ({
        value: key,
        label: value.label,
      })),
    },
    {
      key: "status",
      label: "Statut",
      type: "select" as const,
      options: Object.entries(elementStatuses).map(([key, value]) => ({
        value: key,
        label: value.label,
      })),
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div>
          <div className="h-8 bg-white/20 rounded w-64 mb-2 animate-pulse"></div>
          <div className="h-4 bg-white/20 rounded w-96 animate-pulse"></div>
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 animate-pulse"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="h-4 bg-white/20 rounded w-24 mb-2"></div>
                  <div className="h-8 bg-white/20 rounded w-16"></div>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Table Skeleton */}
        <AdvancedDataTableSkeleton rows={15} columns={7} />
      </div>
    );
  }

  return (
    <>
      {/* Header avec titre principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <FileText className="w-7 h-7 text-[#b8d070]" />
              Gestion des Éléments
            </h1>
            <p className="text-white/70">
              Gérez tous les éléments pédagogiques de la plateforme
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-white/60 text-sm">Total éléments</p>
            <p className="text-3xl font-bold text-[#b8d070]">
              {elementsStats.total}
            </p>
            <p className="text-white/60 text-sm">éléments actifs</p>
          </div>
        </div>
      </motion.div>

      {/* Actions rapides */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center"
      >
        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/20">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm transition-colors duration-200">
            <Upload className="w-4 h-4" />
            Importer
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm transition-colors duration-200">
            <Download className="w-4 h-4" />
            Exporter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93] font-bold rounded-lg hover:from-[#a2c65e] hover:to-[#b8d070] transition-all duration-300 shadow-lg hover:shadow-xl">
            <Plus className="w-4 h-4" />
            Nouvel élément
          </button>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-white/70 mb-1">
                Total Éléments
              </h3>
              <div className="text-3xl font-bold text-white">
                {elementsStats.total}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-blue-500/20">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="text-sm text-blue-300">
            +{Math.floor(elementsStats.total * 0.08)} ce mois
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-white/70 mb-1">
                Éléments Actifs
              </h3>
              <div className="text-3xl font-bold text-white">
                {elementsStats.active}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-green-500/20">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="text-sm text-green-300">
            {((elementsStats.active / elementsStats.total) * 100).toFixed(1)}%
            du total
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-white/70 mb-1">
                Brouillons
              </h3>
              <div className="text-3xl font-bold text-white">
                {elementsStats.draft}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-yellow-500/20">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          <div className="text-sm text-yellow-300">En cours de rédaction</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-white/70 mb-1">Cours</h3>
              <div className="text-3xl font-bold text-white">
                {elementsStats.byType.course}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-purple-500/20">
              <BookOpen className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <div className="text-sm text-purple-300">
            {elementsStats.byType.assignment} devoirs
          </div>
        </motion.div>
      </div>

      {/* Elements Table */}
      <AdvancedDataTable
        title="Liste des Éléments"
        columns={columns}
        rows={elementsData}
        filters={filters}
        pageSize={15}
        emptyMessage="Aucun élément trouvé"
        onRowClick={handleElementClick}
      />

      {/* Element Detail Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={handleCloseDrawer}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-4xl bg-gradient-to-b from-[#1d8b93] to-[#0d5a61] border-l border-white/10 shadow-2xl z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#1d8b93]/95 to-[#0d5a61]/95 backdrop-blur-xl border-b border-white/10 p-6 z-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">
                    Détails de l&apos;Élément
                  </h2>
                  <button
                    onClick={handleCloseDrawer}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-8">
                {isLoadingDetail ? (
                  <ElementDetailSkeleton />
                ) : selectedElement && elementDetail ? (
                  <>
                    {/* Element Info */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
                    >
                      <div className="flex items-start gap-4 mb-6">
                        <div className="text-4xl">
                          {(() => {
                            const Icon =
                              elementTypes[selectedElement.type].icon;
                            return <Icon className="w-6 h-6" />;
                          })()}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {selectedElement.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium border ${
                                elementTypes[selectedElement.type].color
                              }`}
                            >
                              {elementTypes[selectedElement.type].label}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium border ${
                                elementStatuses[selectedElement.status].color
                              }`}
                            >
                              {elementStatuses[selectedElement.status].label}
                            </span>
                          </div>
                          <p className="text-white/70 mb-4">
                            {selectedElement.description}
                          </p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-white/60" />
                              <span className="text-white/80">
                                {selectedElement.ownerName}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-white/60" />
                              <span className="text-white/80">
                                {selectedElement.unitName}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-white/60" />
                              <span className="text-white/80">
                                Créé le{" "}
                                {new Date(
                                  selectedElement.createdAt
                                ).toLocaleDateString("fr-FR")}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-white/60" />
                              <span className="text-white/80">
                                Modifié le{" "}
                                {new Date(
                                  selectedElement.updatedAt
                                ).toLocaleDateString("fr-FR")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      {selectedElement.tags &&
                        selectedElement.tags.length > 0 && (
                          <div className="flex items-center gap-2 flex-wrap">
                            <Tag className="w-4 h-4 text-white/60" />
                            {selectedElement.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-white/10 text-white/70 rounded text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                    </motion.div>

                    {/* Historique */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
                    >
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <History className="w-5 h-5" />
                        Historique
                      </h4>
                      <div className="space-y-4">
                        {elementDetail.history.map((event) => (
                          <div
                            key={event.id}
                            className="flex items-start gap-4"
                          >
                            <div className="w-2 h-2 bg-[#b8d070] rounded-full mt-2 flex-shrink-0"></div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-white font-medium">
                                  {event.description}
                                </span>
                                <span className="text-xs text-white/50">
                                  {new Date(
                                    event.performedAt
                                  ).toLocaleDateString("fr-FR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                              <p className="text-sm text-white/70">
                                Par {event.performedBy}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Permissions */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
                    >
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Permissions
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {elementDetail.permissions.map((permission) => (
                          <span
                            key={permission.id}
                            className="px-3 py-2 bg-[#b8d070]/20 text-[#b8d070] rounded-lg text-sm font-medium"
                          >
                            {permission.label}
                          </span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Attributions */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
                    >
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <UserPlus className="w-5 h-5" />
                        Attributions
                      </h4>
                      <div className="space-y-3">
                        {elementDetail.attributions.map((attribution) => (
                          <div
                            key={attribution.id}
                            className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#b8d070] to-[#a2c65e] flex items-center justify-center">
                                <span className="text-[#1d8b93] font-bold text-sm">
                                  {attribution.userName.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium text-white">
                                  {attribution.userName}
                                </div>
                                <div className="text-sm text-white/60">
                                  {attribution.role} • {attribution.userEmail}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  attribution.isActive
                                    ? "bg-green-500/20 text-green-300"
                                    : "bg-red-500/20 text-red-300"
                                }`}
                              >
                                {attribution.isActive ? "Actif" : "Inactif"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-white/60">Aucune donnée disponible</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Composant skeleton pour le loading des détails
const ElementDetailSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Element Info Skeleton */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded"></div>
          <div className="flex-1 space-y-3">
            <div className="h-8 bg-white/20 rounded w-3/4"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-white/20 rounded w-20"></div>
              <div className="h-6 bg-white/20 rounded w-16"></div>
            </div>
            <div className="h-16 bg-white/20 rounded"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-4 bg-white/20 rounded"></div>
              <div className="h-4 bg-white/20 rounded"></div>
              <div className="h-4 bg-white/20 rounded"></div>
              <div className="h-4 bg-white/20 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sections Skeleton */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
        >
          <div className="h-6 bg-white/20 rounded w-48 mb-4"></div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="h-16 bg-white/20 rounded"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminElementsPage;
