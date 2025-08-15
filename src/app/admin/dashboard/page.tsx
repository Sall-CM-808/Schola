"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import KpiCard, { KpiCardSkeleton } from "@/components/admin_dashboard/KpiCard";
import DataTable, {
  DataTableSkeleton,
} from "@/components/admin_dashboard/DataTable";
import UserTypeChart from "@/components/admin_dashboard/UserTypeChart";
import {
  kpi,
  recentUsers,
  recentElements,
  userTypeDistribution,
  simulateLoading,
  type UserRow,
  type ElementRow,
} from "@/lib/mocks/adminDashboard";
import {
  Users,
  UserCheck,
  UserX,
  Building2,
  Shield,
  Key,
  FileText,
  Eye,
  Calendar,
} from "lucide-react";

const AdminDashboardPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<{
    kpi: typeof kpi;
    users: UserRow[];
    elements: ElementRow[];
    distribution: typeof userTypeDistribution;
  } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      await simulateLoading(300);
      setData({
        kpi,
        users: recentUsers,
        elements: recentElements,
        distribution: userTypeDistribution,
      });
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Colonnes pour la table des utilisateurs
  const userColumns = [
    {
      key: "name",
      header: "Nom",
      render: (user: UserRow) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#b8d070] to-[#a2c65e] flex items-center justify-center">
            <span className="text-[#1d8b93] font-bold text-sm">
              {user.name.charAt(0)}
            </span>
          </div>
          <span className="font-medium">{user.name}</span>
        </div>
      ),
    },
    { key: "username", header: "Nom d'utilisateur" },
    { key: "email", header: "Email" },
    {
      key: "type",
      header: "Type",
      render: (user: UserRow) => {
        const typeColors = {
          admin: "bg-red-500/20 text-red-300 border-red-500/30",
          teacher: "bg-green-500/20 text-green-300 border-green-500/30",
          student: "bg-blue-500/20 text-blue-300 border-blue-500/30",
          staff: "bg-orange-500/20 text-orange-300 border-orange-500/30",
        };

        const typeLabels = {
          admin: "Admin",
          teacher: "Enseignant",
          student: "Étudiant",
          staff: "Personnel",
        };

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium border ${
              typeColors[user.type]
            }`}
          >
            {typeLabels[user.type]}
          </span>
        );
      },
    },
    { key: "createdAt", header: "Créé le" },
  ];

  // Colonnes pour la table des éléments
  const elementColumns = [
    {
      key: "title",
      header: "Titre",
      render: (element: ElementRow) => (
        <div className="max-w-xs">
          <div className="font-medium text-white truncate">{element.title}</div>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (element: ElementRow) => {
        const typeColors = {
          course: "bg-purple-500/20 text-purple-300 border-purple-500/30",
          assignment: "bg-blue-500/20 text-blue-300 border-blue-500/30",
          resource: "bg-green-500/20 text-green-300 border-green-500/30",
          announcement: "bg-orange-500/20 text-orange-300 border-orange-500/30",
        };

        const typeLabels = {
          course: "Cours",
          assignment: "Devoir",
          resource: "Ressource",
          announcement: "Annonce",
        };

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium border ${
              typeColors[element.type]
            }`}
          >
            {typeLabels[element.type]}
          </span>
        );
      },
    },
    { key: "ownerName", header: "Propriétaire" },
    { key: "unitName", header: "Unité" },
    { key: "createdAt", header: "Créé le" },
  ];

  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="h-8 bg-white/20 rounded w-64 mb-2 animate-pulse"></div>
          <div className="h-4 bg-white/20 rounded w-96 animate-pulse"></div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <KpiCardSkeleton key={i} />
          ))}
        </div>

        {/* Chart and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg p-6 animate-pulse">
            <div className="h-6 bg-white/20 rounded w-48 mb-6"></div>
            <div className="w-48 h-48 bg-white/20 rounded-full mx-auto"></div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <DataTableSkeleton rows={5} columns={4} />
            <DataTableSkeleton rows={5} columns={5} />
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

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
          Tableau de bord Admin
        </h1>
        <p className="text-white/70">
          Vue d'ensemble de la plateforme Schola -{" "}
          {new Date().toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <KpiCard
          label="Total Utilisateurs"
          value={data.kpi.usersTotal}
          caption="Tous les comptes créés"
          icon={<Users className="w-6 h-6" />}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <KpiCard
          label="Utilisateurs Actifs"
          value={data.kpi.usersActive}
          caption="Connectés récemment"
          icon={<UserCheck className="w-6 h-6" />}
          color="green"
          trend={{ value: 8, isPositive: true }}
        />
        <KpiCard
          label="Utilisateurs Inactifs"
          value={data.kpi.usersInactive}
          caption="Non connectés 30j+"
          icon={<UserX className="w-6 h-6" />}
          color="red"
          trend={{ value: 3, isPositive: false }}
        />
        <KpiCard
          label="Unités"
          value={data.kpi.unitsTotal}
          caption="Départements et services"
          icon={<Building2 className="w-6 h-6" />}
          color="purple"
        />
        <KpiCard
          label="Éléments"
          value={data.kpi.elementsTotal}
          caption="Cours, devoirs, ressources"
          icon={<FileText className="w-6 h-6" />}
          color="orange"
          trend={{ value: 24, isPositive: true }}
        />
      </div>

      {/* Chart and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Type Distribution Chart */}
        <UserTypeChart data={data.distribution} />

        {/* Tables */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Users Table */}
          <DataTable
            title="Derniers utilisateurs"
            columns={userColumns}
            rows={data.users}
            emptyMessage="Aucun utilisateur récent"
            searchable
          />

          {/* Recent Elements Table */}
          <DataTable
            title="Derniers éléments"
            columns={elementColumns}
            rows={data.elements}
            emptyMessage="Aucun élément récent"
            searchable
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg p-6 cursor-pointer hover:bg-white/10 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-500/20">
              <Eye className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">
                Voir tous les utilisateurs
              </h3>
              <p className="text-sm text-white/60">
                Gérer les comptes utilisateurs
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg p-6 cursor-pointer hover:bg-white/10 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-green-500/20">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Gérer les rôles</h3>
              <p className="text-sm text-white/60">
                Permissions et attributions
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg p-6 cursor-pointer hover:bg-white/10 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-500/20">
              <Calendar className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Rapports</h3>
              <p className="text-sm text-white/60">Générer et exporter</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboardPage;
