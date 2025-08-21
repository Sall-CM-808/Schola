"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AdvancedDataTable, {
  AdvancedDataTableSkeleton,
} from "@/components/admin_dashboard/AdvancedDataTable";
import {
  attributions,
  attributionsStats,
  attributionStatuses,
  scopeTypes,
  getAvailableActions,
  performAttributionAction,
  simulateLoading,
  type Attribution,
  type AttributionAction,
} from "@/lib/mocks/adminAttributions";
import {
  UserPlus,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Download,
  Upload,
  Shield,
  FileText,
  AlertCircle,
  Check,
  X,
} from "lucide-react";

const AdminAttributionsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [attributionsData, setAttributionsData] = useState<Attribution[]>([]);
  const [processingActions, setProcessingActions] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const loadData = async () => {
      await simulateLoading(500);
      setAttributionsData(attributions);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleAction = async (
    attribution: Attribution,
    actionType: AttributionAction["type"]
  ) => {
    const actionKey = `${attribution.id}-${actionType}`;
    setProcessingActions((prev) => new Set(prev).add(actionKey));

    try {
      const result = await performAttributionAction(attribution.id, actionType);

      if (result.success) {
        // Mettre à jour les données localement
        setAttributionsData((prev) =>
          prev.map((a) => (a.id === attribution.id ? { ...a } : a))
        );

        // Simuler une notification de succès
        console.log("✅", result.message);
      } else {
        // Simuler une notification d'erreur
        console.error("❌", result.message);
      }
    } catch {
      console.error("❌", "Erreur lors de l'exécution de l'action");
    } finally {
      setProcessingActions((prev) => {
        const newSet = new Set(prev);
        newSet.delete(actionKey);
        return newSet;
      });
    }
  };

  // Configuration des colonnes
  const columns = [
    {
      key: "userName",
      header: "Utilisateur",
      render: (attribution: Attribution) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#b8d070] to-[#a2c65e] flex items-center justify-center">
            <span className="text-[#1d8b93] font-bold text-sm">
              {attribution.userName.charAt(0)}
            </span>
          </div>
          <div>
            <div className="font-medium text-white">{attribution.userName}</div>
            <div className="text-sm text-white/60">{attribution.userEmail}</div>
          </div>
        </div>
      ),
    },
    {
      key: "roleName",
      header: "Rôle",
      render: (attribution: Attribution) => (
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-white/60" />
          <span className="text-white/90">{attribution.roleName}</span>
        </div>
      ),
    },
    {
      key: "scopeType",
      header: "Portée",
      render: (attribution: Attribution) => {
        const scopeConfig = scopeTypes[attribution.scopeType];
        return (
          <div className="flex items-center gap-2">
            <span className="text-xl">{scopeConfig.icon}</span>
            <div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium border ${scopeConfig.color}`}
              >
                {scopeConfig.label}
              </span>
              <div className="text-sm text-white/60 mt-1">
                {attribution.scopeName}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      key: "startDate",
      header: "Période",
      render: (attribution: Attribution) => (
        <div className="text-sm">
          <div className="text-white/90">
            Du {new Date(attribution.startDate).toLocaleDateString("fr-FR")}
          </div>
          {attribution.endDate && (
            <div className="text-white/60">
              Au {new Date(attribution.endDate).toLocaleDateString("fr-FR")}
            </div>
          )}
          {!attribution.endDate && (
            <div className="text-white/60">Permanente</div>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Statut",
      render: (attribution: Attribution) => {
        const statusConfig = attributionStatuses[attribution.status];
        return (
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}
          >
            {attribution.status === "active" && (
              <CheckCircle className="w-3 h-3" />
            )}
            {attribution.status === "pending" && <Clock className="w-3 h-3" />}
            {attribution.status === "expired" && (
              <XCircle className="w-3 h-3" />
            )}
            {attribution.status === "cancelled" && <X className="w-3 h-3" />}
            {statusConfig.label}
          </span>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      render: (attribution: Attribution) => {
        const availableActions = getAvailableActions(attribution.status);

        if (availableActions.length === 0) {
          return <span className="text-white/40 text-sm">Aucune action</span>;
        }

        return (
          <div className="flex items-center gap-2">
            {availableActions.map((action) => {
              const actionKey = `${attribution.id}-${action.type}`;
              const isProcessing = processingActions.has(actionKey);

              return (
                <button
                  key={action.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isProcessing) {
                      handleAction(attribution, action.type);
                    }
                  }}
                  disabled={isProcessing}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    action.type === "validate"
                      ? "bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30"
                      : action.type === "cancel"
                      ? "bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30"
                      : "bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30"
                  } ${
                    isProcessing
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:scale-105"
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"></div>
                      <span>...</span>
                    </div>
                  ) : (
                    <>
                      {action.type === "validate" && (
                        <Check className="w-3 h-3 inline mr-1" />
                      )}
                      {action.type === "cancel" && (
                        <X className="w-3 h-3 inline mr-1" />
                      )}
                      {action.label}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        );
      },
    },
  ];

  // Configuration des filtres
  const filters = [
    {
      key: "search",
      label: "Recherche",
      type: "search" as const,
      placeholder: "Nom d'utilisateur, rôle ou portée...",
    },
    {
      key: "status",
      label: "Statut",
      type: "select" as const,
      options: Object.entries(attributionStatuses).map(([key, value]) => ({
        value: key,
        label: value.label,
      })),
    },
    {
      key: "scopeType",
      label: "Type de portée",
      type: "select" as const,
      options: Object.entries(scopeTypes).map(([key, value]) => ({
        value: key,
        label: value.label,
      })),
    },
    {
      key: "userType",
      label: "Type d'utilisateur",
      type: "select" as const,
      options: [
        { value: "admin", label: "Administrateur" },
        { value: "teacher", label: "Enseignant" },
        { value: "student", label: "Étudiant" },
        { value: "staff", label: "Personnel" },
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

        {/* Table Skeleton */}
        <AdvancedDataTableSkeleton rows={15} columns={6} />
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
              <UserPlus className="w-7 h-7 text-[#b8d070]" />
              Gestion des Attributions
            </h1>
            <p className="text-white/70">
              Gérez les attributions de rôles et leurs validations
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-white/60 text-sm">Total attributions</p>
            <p className="text-3xl font-bold text-[#b8d070]">
              {attributionsStats.total}
            </p>
            <p className="text-white/60 text-sm">en attente</p>
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
            Nouvelle attribution
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
                Total Attributions
              </h3>
              <div className="text-3xl font-bold text-white">
                {attributionsStats.total}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-blue-500/20">
              <UserPlus className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="text-sm text-blue-300">
            {attributionsStats.active} actives
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
                En Attente
              </h3>
              <div className="text-3xl font-bold text-white">
                {attributionsStats.pending}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-yellow-500/20">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          <div className="text-sm text-yellow-300">
            Nécessitent une validation
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
                Expirées
              </h3>
              <div className="text-3xl font-bold text-white">
                {attributionsStats.expired}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-red-500/20">
              <XCircle className="w-6 h-6 text-red-400" />
            </div>
          </div>
          <div className="text-sm text-red-300">
            Nécessitent un renouvellement
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
                Éléments
              </h3>
              <div className="text-3xl font-bold text-white">
                {attributionsStats.byScopeType.Element}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-purple-500/20">
              <FileText className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <div className="text-sm text-purple-300">
            {attributionsStats.byScopeType.Unit} unités,{" "}
            {attributionsStats.byScopeType.Global} globales
          </div>
        </motion.div>
      </div>

      {/* Attributions Table */}
      <AdvancedDataTable
        title="Liste des Attributions"
        columns={columns}
        rows={attributionsData}
        filters={filters}
        pageSize={15}
        emptyMessage="Aucune attribution trouvée"
      />

      {/* Info Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
      >
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Actions Disponibles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/70">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-white">Valider</span>
                </div>
                <p>
                  Approuver une attribution en attente pour l&apos;activer
                  immédiatement.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="font-medium text-white">Annuler</span>
                </div>
                <p>Rejeter ou annuler une attribution existante.</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-white">Prolonger</span>
                </div>
                <p>
                  Étendre la période d&apos;une attribution expirée ou active.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="font-medium text-white">Modifier</span>
                </div>
                <p>Modifier les détails d&apos;une attribution active.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAttributionsPage;
