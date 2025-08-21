"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AdvancedDataTable, {
  AdvancedDataTableSkeleton,
} from "@/components/admin_dashboard/AdvancedDataTable";
import TreeView, {
  TreeViewSkeleton,
} from "@/components/admin_dashboard/TreeView";
import {
  unitsTree,
  unitsFlat,
  unitsStats,
  unitTypes,
  simulateLoading,
  type Unit,
} from "@/lib/mocks/adminUnits";
import {
  Building2,
  GraduationCap,
  Briefcase,
  FlaskConical,
  Target,
  School,
  Plus,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  TreePine,
  Table,
  MapPin,
  Mail,
  Phone,
  User,
} from "lucide-react";

const AdminUnitsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [unitsData, setUnitsData] = useState<Unit[]>([]);
  const [treeData, setTreeData] = useState<Unit[]>([]);
  const [viewMode, setViewMode] = useState<"tree" | "table">("tree");
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  useEffect(() => {
    const loadData = async () => {
      await simulateLoading(500);
      setUnitsData(unitsFlat);
      setTreeData(unitsTree);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleUnitClick = (unit: Unit) => {
    setSelectedUnit(unit);
  };

  // Configuration des colonnes pour la table
  const columns = [
    {
      key: "name",
      header: "Nom",
      render: (unit: Unit) => (
        <div className="flex items-center gap-3">
          <div className="text-white/70">
            {unit.type === "university" && <School className="w-4 h-4" />}
            {unit.type === "faculty" && <Building2 className="w-4 h-4" />}
            {unit.type === "department" && (
              <GraduationCap className="w-4 h-4" />
            )}
            {unit.type === "service" && <Briefcase className="w-4 h-4" />}
            {unit.type === "laboratory" && <FlaskConical className="w-4 h-4" />}
            {unit.type === "center" && <Target className="w-4 h-4" />}
          </div>
          <div>
            <div className="font-medium text-white">{unit.name}</div>
            <div className="text-sm text-white/60">{unit.code}</div>
          </div>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (unit: Unit) => {
        const typeConfig = unitTypes[unit.type];
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
      key: "level",
      header: "Niveau",
      render: (unit: Unit) => (
        <span className="text-white/90 font-mono">Niv. {unit.level}</span>
      ),
    },
    {
      key: "active",
      header: "Statut",
      render: (unit: Unit) => (
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${
            unit.active
              ? "bg-green-500/20 text-green-300 border-green-500/30"
              : "bg-red-500/20 text-red-300 border-red-500/30"
          }`}
        >
          {unit.active ? (
            <CheckCircle className="w-3 h-3" />
          ) : (
            <XCircle className="w-3 h-3" />
          )}
          {unit.active ? "Actif" : "Inactif"}
        </span>
      ),
    },
    {
      key: "head",
      header: "Responsable",
      render: (unit: Unit) => (
        <span className="text-white/90">{unit.head || "Non assigné"}</span>
      ),
    },
    {
      key: "createdAt",
      header: "Créé le",
      render: (unit: Unit) => (
        <span className="text-white/70">
          {new Date(unit.createdAt).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      ),
    },
  ];

  // Configuration des filtres
  const filters = [
    {
      key: "search",
      label: "Recherche",
      type: "search" as const,
      placeholder: "Nom, code ou responsable...",
    },
    {
      key: "type",
      label: "Type d'unité",
      type: "select" as const,
      options: Object.entries(unitTypes).map(([key, value]) => ({
        value: key,
        label: value.label,
      })),
    },
    {
      key: "active",
      label: "Statut",
      type: "select" as const,
      options: [
        { value: "true", label: "Actif" },
        { value: "false", label: "Inactif" },
      ],
    },
    {
      key: "level",
      label: "Niveau",
      type: "select" as const,
      options: [
        { value: "0", label: "Niveau 0" },
        { value: "1", label: "Niveau 1" },
        { value: "2", label: "Niveau 2" },
        { value: "3", label: "Niveau 3" },
      ],
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

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TreeViewSkeleton />
          <AdvancedDataTableSkeleton rows={10} columns={6} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header avec titre principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <Building2 className="w-7 h-7 text-[#b8d070]" />
               Unités Structurelles
            </h1>
            <p className="text-white/70">
              Gestion de la structure organisationnelle de l&apos;université.
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-white/60 text-sm">Total unités</p>
            <p className="text-3xl font-bold text-[#b8d070]">
              {unitsData.length}
            </p>
            <p className="text-white/60 text-sm">structures actives</p>
          </div>
        </div>
      </motion.div>

      {/* Contrôles et actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap items-center justify-between gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/20"
      >
        {/* View Mode Toggle */}
        <div className="flex items-center bg-white/10 rounded-lg p-1">
          <button
            onClick={() => setViewMode("tree")}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
              viewMode === "tree"
                ? "bg-[#b8d070] text-[#1d8b93] font-medium"
                : "text-white/70 hover:text-white"
            }`}
          >
            <TreePine className="w-4 h-4" />
             Arbre
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
              viewMode === "table"
                ? "bg-[#b8d070] text-[#1d8b93] font-medium"
                : "text-white/70 hover:text-white"
            }`}
          >
            <Table className="w-4 h-4" />
             Table
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm transition-colors duration-200">
            <Upload className="w-4 h-4" />
             Importer
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm transition-colors duration-200">
            <Download className="w-4 h-4" />
             Exporter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93] font-bold rounded-lg hover:from-[#a2c65e] hover:to-[#b8d070] transition-all duration-300 shadow-lg hover:shadow-xl">
            <Plus className="w-4 h-4" /> Nouvelle unité
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
                Total Unités
              </h3>
              <div className="text-3xl font-bold text-white">
                {unitsStats.total}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-blue-500/20">
              <Building2 className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="text-sm text-blue-300">
            {unitsStats.byLevel[0]} racine{unitsStats.byLevel[0] > 1 ? "s" : ""}
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
                Unités Actives
              </h3>
              <div className="text-3xl font-bold text-white">
                {unitsStats.active}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-green-500/20">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="text-sm text-green-300">
            {((unitsStats.active / unitsStats.total) * 100).toFixed(1)}% du
            total
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
                Départements
              </h3>
              <div className="text-3xl font-bold text-white">
                {unitsStats.byType.department}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-purple-500/20">
              <GraduationCap className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <div className="text-sm text-purple-300">
            {unitsStats.byType.laboratory} laboratoires
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-white/70 mb-1">
                Services
              </h3>
              <div className="text-3xl font-bold text-white">
                {unitsStats.byType.service}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-orange-500/20">
              <Briefcase className="w-6 h-6 text-orange-400" />
            </div>
          </div>
          <div className="text-sm text-orange-300">
            {unitsStats.byType.center} centres
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tree View or Table */}
        <div className="lg:col-span-2">
          {viewMode === "tree" ? (
            <TreeView units={treeData} onUnitClick={handleUnitClick} />
          ) : (
            <AdvancedDataTable
              title="Liste des Unités"
              columns={columns}
              rows={unitsData}
              filters={filters}
              pageSize={12}
              emptyMessage="Aucune unité trouvée"
              onRowClick={handleUnitClick}
            />
          )}
        </div>

        {/* Unit Details */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Détails de l&apos;Unité
              </h3>
            </div>

            <div className="p-6">
              {selectedUnit ? (
                <motion.div
                  key={selectedUnit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-white/70">
                        {selectedUnit.type === "university" && (
                          <School className="w-5 h-5" />
                        )}
                        {selectedUnit.type === "faculty" && (
                          <Building2 className="w-5 h-5" />
                        )}
                        {selectedUnit.type === "department" && (
                          <GraduationCap className="w-5 h-5" />
                        )}
                        {selectedUnit.type === "service" && (
                          <Briefcase className="w-5 h-5" />
                        )}
                        {selectedUnit.type === "laboratory" && (
                          <FlaskConical className="w-5 h-5" />
                        )}
                        {selectedUnit.type === "center" && (
                          <Target className="w-5 h-5" />
                        )}
                      </div>
                      <h4 className="text-xl font-bold text-white">
                        {selectedUnit.name}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-white/60 font-mono">
                        ({selectedUnit.code})
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${
                          unitTypes[selectedUnit.type].color
                        }`}
                      >
                        {unitTypes[selectedUnit.type].label}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${
                          selectedUnit.active
                            ? "bg-green-500/20 text-green-300 border-green-500/30"
                            : "bg-red-500/20 text-red-300 border-red-500/30"
                        }`}
                      >
                        {selectedUnit.active ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        {selectedUnit.active ? "Actif" : "Inactif"}
                      </span>
                    </div>

                    {selectedUnit.description && (
                      <p className="text-sm text-white/70">
                        {selectedUnit.description}
                      </p>
                    )}
                  </div>

                  {/* Info */}
                  <div className="space-y-3">
                    {selectedUnit.head && (
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-white/60" />
                        <span className="text-white/80">
                          {selectedUnit.head}
                        </span>
                      </div>
                    )}

                    {selectedUnit.location && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-white/60" />
                        <span className="text-white/80">
                          {selectedUnit.location}
                        </span>
                      </div>
                    )}

                    {selectedUnit.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-white/60" />
                        <a
                          href={`mailto:${selectedUnit.email}`}
                          className="text-[#b8d070] hover:underline"
                        >
                          {selectedUnit.email}
                        </a>
                      </div>
                    )}

                    {selectedUnit.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-white/60" />
                        <a
                          href={`tel:${selectedUnit.phone}`}
                          className="text-[#b8d070] hover:underline"
                        >
                          {selectedUnit.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-white/60">Niveau</span>
                        <div className="font-mono text-white">
                          {selectedUnit.level}
                        </div>
                      </div>
                      <div>
                        <span className="text-white/60">Créé le</span>
                        <div className="text-white">
                          {new Date(selectedUnit.createdAt).toLocaleDateString(
                            "fr-FR"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Children count */}
                  {selectedUnit.children &&
                    selectedUnit.children.length > 0 && (
                      <div className="pt-4 border-t border-white/10">
                        <span className="text-sm text-white/60">
                          Sous-unités
                        </span>
                        <div className="text-lg font-semibold text-white">
                          {selectedUnit.children.length} unité
                          {selectedUnit.children.length > 1 ? "s" : ""}
                        </div>
                      </div>
                    )}
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <Building2 className="w-12 h-12 text-white/30 mx-auto mb-4" />
                  <p className="text-white/60 mb-2">
                    Aucune unité sélectionnée
                  </p>
                  <p className="text-sm text-white/40">
                    Cliquez sur une unité pour voir ses détails
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminUnitsPage;
