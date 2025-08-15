"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdvancedDataTable from "@/components/admin_dashboard/AdvancedDataTable";
import {
  getTeacherAssignments,
  getAvailableActions,
  performAssignmentAction,
  requestNewRole,
  type TeacherAssignmentRow,
} from "@/lib/mocks/teacherAssignments";
import {
  Shield,
  Clock,
  Users,
  Building,
  GraduationCap,
  FolderOpen,
  Plus,
  Check,
  X,
  Pause,
  Play,
  RefreshCw,
  Edit,
  Zap,
  Star,
  AlertCircle,
} from "lucide-react";

const TeacherAssignmentsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [assignments, setAssignments] = useState<TeacherAssignmentRow[]>([]);
  const [isActionLoading, setIsActionLoading] = useState<string | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getTeacherAssignments();
        setAssignments(data);
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAction = async (assignmentId: string, actionId: string) => {
    setIsActionLoading(`${assignmentId}-${actionId}`);
    try {
      const updatedAssignment = await performAssignmentAction(
        assignmentId,
        actionId
      );
      setAssignments((prev) =>
        prev.map((a) => (a.id === assignmentId ? updatedAssignment : a))
      );
    } catch (error) {
      console.error("Erreur lors de l'action:", error);
    } finally {
      setIsActionLoading(null);
    }
  };

  const handleRequestRole = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsRequestLoading(true);

    const formData = new FormData(e.currentTarget);
    const roleData = {
      roleName: formData.get("roleName") as string,
      scopeType: formData.get("scopeType") as string,
      scopeName: formData.get("scopeName") as string,
      justification: formData.get("justification") as string,
    };

    try {
      const newAssignment = await requestNewRole(roleData);
      setAssignments((prev) => [newAssignment, ...prev]);
      setShowRequestModal(false);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Erreur lors de la demande:", error);
    } finally {
      setIsRequestLoading(false);
    }
  };

  const getScopeIcon = (scopeType: string) => {
    switch (scopeType) {
      case "class":
        return <GraduationCap className="w-4 h-4" />;
      case "department":
        return <Building className="w-4 h-4" />;
      case "university":
        return <Users className="w-4 h-4" />;
      case "project":
        return <FolderOpen className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const getScopeLabel = (scopeType: string) => {
    switch (scopeType) {
      case "class":
        return "Classe";
      case "department":
        return "Département";
      case "university":
        return "Université";
      case "project":
        return "Projet";
      default:
        return scopeType;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Actif":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "En attente":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case "Expiré":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "Suspendu":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
      default:
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    }
  };

  const getActionIcon = (iconName: string) => {
    const icons = {
      Check,
      X,
      Pause,
      Play,
      RefreshCw,
      Edit,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Shield;
    return <IconComponent className="w-3 h-3" />;
  };

  const columns = [
    {
      key: "roleName",
      header: "Rôle",
      render: (assignment: TeacherAssignmentRow) => (
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="font-medium text-white">{assignment.roleName}</div>
            {assignment.description && (
              <div className="text-sm text-white/60 truncate max-w-xs">
                {assignment.description}
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "scope",
      header: "Portée",
      render: (assignment: TeacherAssignmentRow) => (
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-white/10 text-white/70">
            {getScopeIcon(assignment.scopeType)}
          </div>
          <div>
            <div className="text-sm font-medium text-white">
              {assignment.scopeName}
            </div>
            <div className="text-xs text-white/60">
              {getScopeLabel(assignment.scopeType)}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "duration",
      header: "Période",
      render: (assignment: TeacherAssignmentRow) => (
        <div className="text-sm text-white/70">
          <div className="flex items-center gap-1 mb-1">
            <Clock className="w-3 h-3" />
            <span>
              Début:{" "}
              {new Date(assignment.startDate).toLocaleDateString("fr-FR")}
            </span>
          </div>
          <div className="text-white/50">
            Fin: {new Date(assignment.endDate).toLocaleDateString("fr-FR")}
          </div>
        </div>
      ),
    },
    {
      key: "workload",
      header: "Charge",
      render: (assignment: TeacherAssignmentRow) => (
        <div className="text-center">
          <div className="text-lg font-bold text-white">
            {assignment.workload || 0}h
          </div>
          <div className="text-xs text-white/60">par semaine</div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Statut",
      render: (assignment: TeacherAssignmentRow) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            assignment.status
          )}`}
        >
          {assignment.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (assignment: TeacherAssignmentRow) => {
        const actions = getAvailableActions(assignment);
        return (
          <div className="flex items-center gap-2">
            {actions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleAction(assignment.id, action.id)}
                disabled={isActionLoading === `${assignment.id}-${action.id}`}
                className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
                  action.type === "primary"
                    ? "bg-green-500/20 text-green-300 hover:bg-green-500/30"
                    : action.type === "danger"
                    ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                    : "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                } disabled:opacity-50`}
              >
                {isActionLoading === `${assignment.id}-${action.id}` ? (
                  <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  getActionIcon(action.icon)
                )}
                {action.label}
              </button>
            ))}
          </div>
        );
      },
      sortable: false,
    },
  ];

  const stats = {
    total: assignments.length,
    active: assignments.filter((a) => a.status === "Actif").length,
    pending: assignments.filter((a) => a.status === "En attente").length,
    totalWorkload: assignments
      .filter((a) => a.status === "Actif")
      .reduce((sum, a) => sum + (a.workload || 0), 0),
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="h-8 bg-white/20 rounded w-64 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-6 animate-pulse">
              <div className="h-6 bg-white/20 rounded w-16 mb-4"></div>
              <div className="h-8 bg-white/20 rounded w-12"></div>
            </div>
          ))}
        </div>
        <div className="bg-white/5 rounded-xl p-6 animate-pulse">
          <div className="h-96 bg-white/20 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Mes attributions
          </h1>
          <p className="text-white/70">
            Gérez vos rôles et responsabilités pédagogiques
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowRequestModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93] font-medium rounded-xl hover:shadow-lg transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Demander un rôle
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6 relative overflow-hidden"
        >
          <div className="absolute top-2 right-2">
            <Shield className="w-5 h-5 text-blue-400 opacity-50" />
          </div>
          <div className="text-blue-300 text-sm font-medium mb-2">Total</div>
          <div className="text-3xl font-bold text-white">{stats.total}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-xl border border-green-500/30 p-6 relative overflow-hidden"
        >
          <div className="absolute top-2 right-2">
            <Zap className="w-5 h-5 text-green-400 opacity-50" />
          </div>
          <div className="text-green-300 text-sm font-medium mb-2">Actifs</div>
          <div className="text-3xl font-bold text-white">{stats.active}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm rounded-xl border border-orange-500/30 p-6 relative overflow-hidden"
        >
          <div className="absolute top-2 right-2">
            <AlertCircle className="w-5 h-5 text-orange-400 opacity-50" />
          </div>
          <div className="text-orange-300 text-sm font-medium mb-2">
            En attente
          </div>
          <div className="text-3xl font-bold text-white">{stats.pending}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6 relative overflow-hidden"
        >
          <div className="absolute top-2 right-2">
            <Clock className="w-5 h-5 text-purple-400 opacity-50" />
          </div>
          <div className="text-purple-300 text-sm font-medium mb-2">
            Charge totale
          </div>
          <div className="text-3xl font-bold text-white">
            {stats.totalWorkload}h
          </div>
        </motion.div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <AdvancedDataTable
          columns={columns}
          rows={assignments}
          emptyMessage="Aucune attribution trouvée"
          pageSize={10}
          filters={[
            {
              key: "status",
              label: "Statut",
              options: [
                { value: "", label: "Tous les statuts" },
                { value: "Actif", label: "Actif" },
                { value: "En attente", label: "En attente" },
                { value: "Expiré", label: "Expiré" },
                { value: "Suspendu", label: "Suspendu" },
              ],
            },
            {
              key: "scopeType",
              label: "Type de portée",
              options: [
                { value: "", label: "Tous les types" },
                { value: "class", label: "Classe" },
                { value: "department", label: "Département" },
                { value: "university", label: "Université" },
                { value: "project", label: "Projet" },
              ],
            },
          ]}
        />
      </motion.div>

      {/* Request Role Modal */}
      <AnimatePresence>
        {showRequestModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowRequestModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-gradient-to-b from-[#1d8b93] to-[#0d5a61] rounded-xl border border-white/10 shadow-2xl p-6 w-full max-w-md">
                <h3 className="text-xl font-bold text-white mb-4">
                  Demander un nouveau rôle
                </h3>

                <form onSubmit={handleRequestRole} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Nom du rôle
                    </label>
                    <input
                      name="roleName"
                      type="text"
                      required
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent"
                      placeholder="Ex: Chargé de TD"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Type de portée
                    </label>
                    <select
                      name="scopeType"
                      required
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent"
                    >
                      <option value="">Sélectionner un type</option>
                      <option value="class">Classe</option>
                      <option value="department">Département</option>
                      <option value="university">Université</option>
                      <option value="project">Projet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Nom de la portée
                    </label>
                    <input
                      name="scopeName"
                      type="text"
                      required
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent"
                      placeholder="Ex: L1 Mathématiques - Groupe C"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Justification
                    </label>
                    <textarea
                      name="justification"
                      required
                      rows={3}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent resize-none"
                      placeholder="Expliquez pourquoi vous souhaitez ce rôle..."
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={isRequestLoading}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#b8d070] text-[#1d8b93] font-medium rounded-lg hover:bg-[#a2c65e] transition-colors duration-200 disabled:opacity-50"
                    >
                      {isRequestLoading ? (
                        <div className="w-4 h-4 border-2 border-[#1d8b93]/30 border-t-[#1d8b93] rounded-full animate-spin" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                      {isRequestLoading ? "Envoi..." : "Envoyer la demande"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowRequestModal(false)}
                      className="px-4 py-2 text-white/70 hover:text-white transition-colors duration-200"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TeacherAssignmentsPage;
