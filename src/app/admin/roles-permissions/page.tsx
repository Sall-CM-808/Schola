"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdvancedDataTable, {
  AdvancedDataTableSkeleton,
} from "@/components/admin_dashboard/AdvancedDataTable";
import {
  roles,
  rolesStats,
  permissionCategories,
  generateRoleDetail,
  simulateLoading,
  type Role,
  type RoleDetail,
  type PermissionCategory,
} from "@/lib/mocks/adminRoles";
import {
  Shield,
  Users,
  Settings,
  Plus,
  Download,
  Upload,
  Crown,
  UserCheck,
  FileText,
  Calendar,
  ChevronRight,
  ChevronDown,
  Check,
  X,
  Eye,
  Edit3,
  Trash2,
  UserPlus,
} from "lucide-react";

const AdminRolesPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [rolesData, setRolesData] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [roleDetail, setRoleDetail] = useState<RoleDetail | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const [localPermissions, setLocalPermissions] = useState<
    Record<string, string[]>
  >({});

  useEffect(() => {
    const loadData = async () => {
      await simulateLoading(500);
      setRolesData(roles);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleRoleClick = async (role: Role) => {
    setSelectedRole(role);
    setIsLoadingDetail(true);
    setRoleDetail(null);

    // Simuler le chargement des détails
    await simulateLoading(300);
    const detail = generateRoleDetail(role.id);
    setRoleDetail(detail);
    setLocalPermissions(detail.permissionsByCategory);
    setIsLoadingDetail(false);

    // Expand all categories by default
    setExpandedCategories(new Set(permissionCategories.map((cat) => cat.id)));
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const togglePermission = (categoryId: string, permissionAction: string) => {
    setLocalPermissions((prev) => {
      const categoryPermissions = prev[categoryId] || [];
      const hasPermission = categoryPermissions.includes(permissionAction);

      return {
        ...prev,
        [categoryId]: hasPermission
          ? categoryPermissions.filter((p) => p !== permissionAction)
          : [...categoryPermissions, permissionAction],
      };
    });
  };

  const hasPermission = (
    categoryId: string,
    permissionAction: string
  ): boolean => {
    return localPermissions[categoryId]?.includes(permissionAction) || false;
  };

  // Configuration des colonnes
  const columns = [
    {
      key: "name",
      header: "Rôle",
      render: (role: Role) => (
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/10">
            <Shield className="w-4 h-4 text-white/70" />
          </div>
          <div>
            <div className="font-medium text-white">{role.name}</div>
            <div className="text-sm text-white/60">{role.description}</div>
          </div>
        </div>
      ),
    },
    {
      key: "membersCount",
      header: "Membres",
      render: (role: Role) => (
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-white/60" />
          <span className="text-white/90 font-medium">{role.membersCount}</span>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (role: Role) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium border ${
            role.isSystem
              ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
              : "bg-purple-500/20 text-purple-300 border-purple-500/30"
          }`}
        >
          {role.isSystem ? "Système" : "Personnalisé"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Créé le",
      render: (role: Role) => (
        <span className="text-white/70">
          {new Date(role.createdAt).toLocaleDateString("fr-FR", {
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
      render: (role: Role) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRoleClick(role);
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
          {!role.isSystem && (
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
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
      placeholder: "Nom ou description du rôle...",
    },
    {
      key: "isSystem",
      label: "Type de rôle",
      type: "select" as const,
      options: [
        { value: "true", label: "Système" },
        { value: "false", label: "Personnalisé" },
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
          <AdvancedDataTableSkeleton rows={10} columns={5} />
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg p-6 animate-pulse">
            <div className="h-6 bg-white/20 rounded w-48 mb-6"></div>
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-16 bg-white/20 rounded"></div>
              ))}
            </div>
          </div>
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
            Rôles & Permissions
          </h1>
          <p className="text-white/70">
            Gestion des rôles utilisateurs et de leurs permissions
          </p>
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
            <Plus className="w-4 h-4" />
            Nouveau rôle
          </button>
        </div>
      </div>

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
                Total Rôles
              </h3>
              <div className="text-3xl font-bold text-white">
                {rolesStats.total}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-blue-500/20">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="text-sm text-blue-300">
            {rolesStats.system} système, {rolesStats.custom} personnalisés
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
                Total Membres
              </h3>
              <div className="text-3xl font-bold text-white">
                {rolesStats.totalMembers}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-green-500/20">
              <Users className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="text-sm text-green-300">
            Moyenne {rolesStats.averageMembers} par rôle
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
                Catégories
              </h3>
              <div className="text-3xl font-bold text-white">
                {permissionCategories.length}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-purple-500/20">
              <Settings className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <div className="text-sm text-purple-300">
            {permissionCategories.reduce(
              (sum, cat) => sum + cat.permissions.length,
              0
            )}{" "}
            permissions
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
              <h3 className="text-sm font-medium text-white/70 mb-1">Admins</h3>
              <div className="text-3xl font-bold text-white">
                {rolesData
                  .filter((r) => r.name.toLowerCase().includes("admin"))
                  .reduce((sum, r) => sum + r.membersCount, 0)}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-orange-500/20">
              <Crown className="w-6 h-6 text-orange-400" />
            </div>
          </div>
          <div className="text-sm text-orange-300">Privilèges élevés</div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Roles Table */}
        <div>
          <AdvancedDataTable
            title="Liste des Rôles"
            columns={columns}
            rows={rolesData}
            filters={filters}
            pageSize={10}
            emptyMessage="Aucun rôle trouvé"
            onRowClick={handleRoleClick}
          />
        </div>

        {/* Role Details */}
        <div className="space-y-6">
          {/* Role Info */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Détails du Rôle
              </h3>
            </div>

            <div className="p-6">
              {selectedRole && roleDetail && !isLoadingDetail ? (
                <motion.div
                  key={selectedRole.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-white/70" />
                      <h4 className="text-xl font-bold text-white">
                        {selectedRole.name}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${
                          selectedRole.isSystem
                            ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                            : "bg-purple-500/20 text-purple-300 border-purple-500/30"
                        }`}
                      >
                        {selectedRole.isSystem ? "Système" : "Personnalisé"}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-white/70">
                        <Users className="w-4 h-4" />
                        <span>{selectedRole.membersCount} membres</span>
                      </div>
                    </div>

                    <p className="text-sm text-white/70">
                      {selectedRole.description}
                    </p>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {Object.values(localPermissions).flat().length}
                      </div>
                      <div className="text-xs text-white/60">Permissions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {roleDetail.elementsLinked.length}
                      </div>
                      <div className="text-xs text-white/60">Éléments</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {
                          roleDetail.attributions.filter((a) => a.isActive)
                            .length
                        }
                      </div>
                      <div className="text-xs text-white/60">Actifs</div>
                    </div>
                  </div>
                </motion.div>
              ) : isLoadingDetail ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-6 bg-white/20 rounded w-48"></div>
                  <div className="h-4 bg-white/20 rounded w-32"></div>
                  <div className="h-16 bg-white/20 rounded"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-12 bg-white/20 rounded"></div>
                    <div className="h-12 bg-white/20 rounded"></div>
                    <div className="h-12 bg-white/20 rounded"></div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Shield className="w-12 h-12 text-white/30 mx-auto mb-4" />
                  <p className="text-white/60 mb-2">Aucun rôle sélectionné</p>
                  <p className="text-sm text-white/40">
                    Cliquez sur un rôle pour voir ses détails
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Permissions Management */}
          {selectedRole && roleDetail && !isLoadingDetail && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Gestion des Permissions
                </h3>
                <p className="text-sm text-white/60 mt-1">
                  Modifier les permissions en temps réel (démo locale)
                </p>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {permissionCategories.map((category) => (
                  <div
                    key={category.id}
                    className="border-b border-white/5 last:border-b-0"
                  >
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full p-4 text-left hover:bg-white/5 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <motion.div
                            animate={{
                              rotate: expandedCategories.has(category.id)
                                ? 90
                                : 0,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="w-4 h-4 text-white/60" />
                          </motion.div>
                          <div>
                            <h4 className="font-medium text-white">
                              {category.name}
                            </h4>
                            <p className="text-xs text-white/60">
                              {category.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm text-white/60">
                          {localPermissions[category.id]?.length || 0}/
                          {category.permissions.length}
                        </div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {expandedCategories.has(category.id) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 space-y-2">
                            {category.permissions.map((permission) => (
                              <div
                                key={permission.id}
                                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                              >
                                <div className="flex-1">
                                  <div className="font-medium text-white text-sm">
                                    {permission.action}
                                  </div>
                                  <div className="text-xs text-white/60">
                                    {permission.description}
                                  </div>
                                </div>
                                <button
                                  onClick={() =>
                                    togglePermission(
                                      category.id,
                                      permission.action
                                    )
                                  }
                                  className={`p-2 rounded-lg transition-all duration-200 ${
                                    hasPermission(
                                      category.id,
                                      permission.action
                                    )
                                      ? "bg-[#b8d070]/20 text-[#b8d070] hover:bg-[#b8d070]/30"
                                      : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
                                  }`}
                                >
                                  {hasPermission(
                                    category.id,
                                    permission.action
                                  ) ? (
                                    <Check className="w-4 h-4" />
                                  ) : (
                                    <X className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminRolesPage;
