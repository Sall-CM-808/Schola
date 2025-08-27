"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AdvancedDataTable, {
  AdvancedDataTableSkeleton,
} from "@/components/admin_dashboard/AdvancedDataTable";
import UserDetailDrawer from "@/components/admin_dashboard/UserDetailDrawer";
import {
  users,
  generateUserDetail,
  simulateLoading,
  type User,
  type UserDetail,
} from "@/lib/mocks/adminUsers";
import {
  Users,
  UserCheck,
  UserX,
  Crown,
  GraduationCap,
  Briefcase,
  Plus,
  Download,
  Upload,
} from "lucide-react";
import CreateUserModal, {
  CreateUserData,
} from "@/components/admin_dashboard/CreateUserModal";

const AdminUsersPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [usersData, setUsersData] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      await simulateLoading(500);
      setUsersData(users);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleUserClick = async (user: User) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
    setIsLoadingDetail(true);
    setUserDetail(null);

    // Simuler le chargement des détails
    await simulateLoading(300);

    try {
      const detail = generateUserDetail(user.id);
      setUserDetail(detail);
    } catch {
      // Si l'utilisateur n'est pas trouvé dans les mocks (nouveau utilisateur),
      // générer des détails basiques
      console.log(
        "Utilisateur non trouvé dans les mocks, génération de détails basiques"
      );
      const basicDetail: UserDetail = {
        profile: user,
        roles: getDefaultRolesByType(user.type),
        lastLogins: [],
        stats: {
          totalSessions: 0,
          averageSessionDuration: "0 min",
          lastActiveDate: "Jamais connecté",
          accountAge: calculateAccountAge(user.createdAt),
        },
      };
      setUserDetail(basicDetail);
    }

    setIsLoadingDetail(false);
  };

  // Fonction helper pour obtenir les rôles par défaut selon le type
  const getDefaultRolesByType = (type: User["type"]) => {
    const defaultRoles = {
      admin: [
        {
          id: "role-admin-default",
          name: "Administrateur",
          description: "Accès administrateur",
          permissions: ["users.manage", "system.admin"],
          assignedAt: new Date().toISOString(),
        },
      ],
      teacher: [
        {
          id: "role-teacher-default",
          name: "Enseignant",
          description: "Accès enseignant",
          permissions: ["courses.manage", "students.view"],
          assignedAt: new Date().toISOString(),
        },
      ],
      student: [
        {
          id: "role-student-default",
          name: "Étudiant",
          description: "Accès étudiant",
          permissions: ["courses.view", "grades.view"],
          assignedAt: new Date().toISOString(),
        },
      ],
      staff: [
        {
          id: "role-staff-default",
          name: "Personnel",
          description: "Accès personnel",
          permissions: ["basic.access"],
          assignedAt: new Date().toISOString(),
        },
      ],
    };
    return defaultRoles[type] || [];
  };

  // Fonction helper pour calculer l'âge du compte
  const calculateAccountAge = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInMs = now.getTime() - created.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays < 1) {
      return "Aujourd'hui";
    } else if (diffInDays === 1) {
      return "1 jour";
    } else if (diffInDays < 30) {
      return `${diffInDays} jours`;
    } else if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `${months} mois`;
    } else {
      const years = Math.floor(diffInDays / 365);
      return `${years} an${years > 1 ? "s" : ""}`;
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedUser(null);
    setUserDetail(null);
  };

  const handleCreateUser = async (userData: CreateUserData) => {
    // Simuler la création d'un utilisateur
    await simulateLoading(1000);

    // Générer un nouvel utilisateur avec un ID unique
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name,
      username: userData.username,
      email: userData.email,
      type: userData.type,
      status: userData.status,
      createdAt: new Date().toISOString(),
      avatar: userData.avatar || undefined,
    };

    // Ajouter à la liste locale (en attendant l'intégration backend)
    setUsersData((prev) => [newUser, ...prev]);

    console.log("Nouvel utilisateur créé:", newUser);
  };

  // Configuration des colonnes
  const columns = [
    {
      key: "name",
      header: "Utilisateur",
      render: (user: User) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#b8d070] to-[#a2c65e] flex items-center justify-center">
            <span className="text-[#1d8b93] font-bold text-sm">
              {user.name.charAt(0)}
            </span>
          </div>
          <div>
            <div className="font-medium text-white">{user.name}</div>
            <div className="text-sm text-white/60">@{user.username}</div>
          </div>
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (user: User) => (
        <span className="text-white/90">{user.email}</span>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (user: User) => {
        const typeConfig = {
          admin: {
            color: "bg-red-500/20 text-red-300 border-red-500/30",
            icon: <Crown className="w-3 h-3" />,
            label: "Admin",
          },
          teacher: {
            color: "bg-green-500/20 text-green-300 border-green-500/30",
            icon: <GraduationCap className="w-3 h-3" />,
            label: "Enseignant",
          },
          student: {
            color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
            icon: <Users className="w-3 h-3" />,
            label: "Étudiant",
          },
          staff: {
            color: "bg-orange-500/20 text-orange-300 border-orange-500/30",
            icon: <Briefcase className="w-3 h-3" />,
            label: "Personnel",
          },
        };

        const config = typeConfig[user.type];
        return (
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}
          >
            {config.icon}
            {config.label}
          </span>
        );
      },
    },
    {
      key: "status",
      header: "Statut",
      render: (user: User) => (
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${
            user.status === "active"
              ? "bg-green-500/20 text-green-300 border-green-500/30"
              : "bg-red-500/20 text-red-300 border-red-500/30"
          }`}
        >
          {user.status === "active" ? (
            <UserCheck className="w-3 h-3" />
          ) : (
            <UserX className="w-3 h-3" />
          )}
          {user.status === "active" ? "Actif" : "Inactif"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Inscription",
      render: (user: User) => (
        <span className="text-white/70">
          {new Date(user.createdAt).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "lastLogin",
      header: "Dernière connexion",
      render: (user: User) => (
        <span className="text-white/70">
          {user.lastLogin
            ? new Date(user.lastLogin).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Jamais"}
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
      placeholder: "Nom, email ou nom d'utilisateur...",
    },
    {
      key: "type",
      label: "Type d'utilisateur",
      type: "select" as const,
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
      type: "select" as const,
      options: [
        { value: "active", label: "Actif" },
        { value: "inactive", label: "Inactif" },
      ],
    },
  ];

  // Calcul des statistiques
  const stats = {
    total: usersData.length,
    active: usersData.filter((u) => u.status === "active").length,
    inactive: usersData.filter((u) => u.status === "inactive").length,
    byType: {
      admin: usersData.filter((u) => u.type === "admin").length,
      teacher: usersData.filter((u) => u.type === "teacher").length,
      student: usersData.filter((u) => u.type === "student").length,
      staff: usersData.filter((u) => u.type === "staff").length,
    },
  };

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
              <Users className="w-7 h-7 text-[#b8d070]" />
              Gestion des Utilisateurs
            </h1>
            <p className="text-white/70">
              Gérez les comptes utilisateurs de votre plateforme Schola.
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-white/60 text-sm">Total utilisateurs</p>
            <p className="text-3xl font-bold text-[#b8d070]">
              {usersData.length}
            </p>
            <p className="text-white/60 text-sm">comptes actifs</p>
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
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93] font-bold rounded-lg hover:from-[#a2c65e] hover:to-[#b8d070] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-4 h-4" /> Nouvel utilisateur
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
                Total Utilisateurs
              </h3>
              <div className="text-3xl font-bold text-white">{stats.total}</div>
            </div>
            <div className="p-3 rounded-lg bg-blue-500/20">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="text-sm text-blue-300">
            +{Math.floor(stats.total * 0.12)} ce mois
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
                Utilisateurs Actifs
              </h3>
              <div className="text-3xl font-bold text-white">
                {stats.active}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-green-500/20">
              <UserCheck className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="text-sm text-green-300">
            {((stats.active / stats.total) * 100).toFixed(1)}% du total
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
                Enseignants
              </h3>
              <div className="text-3xl font-bold text-white">
                {stats.byType.teacher}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-purple-500/20">
              <GraduationCap className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <div className="text-sm text-purple-300">
            {((stats.byType.teacher / stats.total) * 100).toFixed(1)}% du total
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
                Étudiants
              </h3>
              <div className="text-3xl font-bold text-white">
                {stats.byType.student}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-orange-500/20">
              <Users className="w-6 h-6 text-orange-400" />
            </div>
          </div>
          <div className="text-sm text-orange-300">
            {((stats.byType.student / stats.total) * 100).toFixed(1)}% du total
          </div>
        </motion.div>
      </div>

      {/* Users Table */}
      <AdvancedDataTable
        title="Liste des Utilisateurs"
        columns={columns}
        rows={usersData}
        filters={filters}
        pageSize={15}
        emptyMessage="Aucun utilisateur trouvé"
        onRowClick={handleUserClick}
      />

      {/* User Detail Drawer */}
      <UserDetailDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        userDetail={userDetail}
        isLoading={isLoadingDetail}
      />

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateUser}
      />
    </div>
  );
};

export default AdminUsersPage;
