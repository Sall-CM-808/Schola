"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import KpiCard, { KpiCardSkeleton } from "@/components/admin_dashboard/KpiCard";
import DataTable, {
  DataTableSkeleton,
} from "@/components/admin_dashboard/DataTable";
import UserTypeChart from "@/components/admin_dashboard/UserTypeChart";
import DashboardGrid from "@/components/layout/DashboardGrid";
import { SectionCard, SectionHeader } from "@/components/ui/SectionCard";
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
  FileText,
  Eye,
  Calendar,
  Activity,
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
        <DashboardGrid>
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg p-6 animate-pulse">
              <div className="h-6 bg-white/20 rounded w-48 mb-6"></div>
              <div className="w-48 h-48 bg-white/20 rounded-full mx-auto"></div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 space-y-8">
            <DataTableSkeleton rows={5} columns={4} />
            <DataTableSkeleton rows={5} columns={5} />
          </div>
        </DashboardGrid>
      </div>
    );
  }

  if (!data) return null;

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
              <Shield className="w-7 h-7 text-[#b8d070]" />
              Tableau de bord Admin
            </h1>
            <p className="text-white/70">
              Vue d&apos;ensemble de la plateforme Schola -{" "}
              {new Date().toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-white/60 text-sm">Utilisateurs</p>
            <p className="text-3xl font-bold text-[#b8d070]">
              {data?.kpi.usersTotal || 0}
            </p>
            <p className="text-white/60 text-sm">dans l&apos;établissement</p>
          </div>
        </div>
      </motion.div>

      {/* Grille principale unique */}
      <DashboardGrid>
        {/* Section KPI - Première rangée */}
        <div className="col-span-12">
          <SectionCard>
            <SectionHeader title="Indicateurs clés" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <KpiCard
                title="Total Utilisateurs"
                value={data.kpi.usersTotal}
                subtitle="Tous les comptes créés"
                icon={Users}
                color="blue"
                trend="up"
                delta={12}
              />
              <KpiCard
                title="Utilisateurs Actifs"
                value={data.kpi.usersActive}
                subtitle="Connectés récemment"
                icon={UserCheck}
                color="green"
                trend="up"
                delta={8}
              />
              <KpiCard
                title="Utilisateurs Inactifs"
                value={data.kpi.usersInactive}
                subtitle="Non connectés 30j+"
                icon={UserX}
                color="red"
                trend="down"
                delta={-3}
              />
              <KpiCard
                title="Unités"
                value={data.kpi.unitsTotal}
                subtitle="Départements et services"
                icon={Building2}
                color="purple"
              />
              <KpiCard
                title="Éléments"
                value={data.kpi.elementsTotal}
                subtitle="Cours, devoirs, ressources"
                icon={FileText}
                color="orange"
                trend="up"
                delta={24}
              />
            </div>
          </SectionCard>
        </div>

        {/* Section Graphique - Deuxième rangée */}
        <div className="col-span-12 lg:col-span-6">
          <UserTypeChart data={data.distribution} />
        </div>

        {/* Section Statistiques détaillées - Deuxième rangée */}
        <div className="col-span-12 lg:col-span-6">
          <SectionCard>
            <SectionHeader title="Statistiques détaillées" />
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <Users className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-white/70 text-sm">Étudiants</span>
                  </div>
                  <div className="text-2xl font-bold text-white">1,234</div>
                  <div className="text-xs text-green-400 flex items-center gap-1">
                    <span>↗</span> +5.2% ce mois
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <Shield className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-white/70 text-sm">Enseignants</span>
                  </div>
                  <div className="text-2xl font-bold text-white">89</div>
                  <div className="text-xs text-green-400 flex items-center gap-1">
                    <span>↗</span> +2 cette semaine
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <Building2 className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-white/70 text-sm">Admins</span>
                  </div>
                  <div className="text-2xl font-bold text-white">12</div>
                  <div className="text-xs text-yellow-400 flex items-center gap-1">
                    <span>→</span> Stable
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-orange-500/20">
                      <FileText className="w-4 h-4 text-orange-400" />
                    </div>
                    <span className="text-white/70 text-sm">Personnel</span>
                  </div>
                  <div className="text-2xl font-bold text-white">45</div>
                  <div className="text-xs text-blue-400 flex items-center gap-1">
                    <span>↗</span> +1 cette semaine
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Section Utilisateurs récents - Troisième rangée */}
        <div className="col-span-12">
          <SectionCard>
            <SectionHeader
              title="Derniers utilisateurs"
              actions={
                <button className="text-[#b8d070] hover:text-[#a2c65e] text-sm font-medium">
                  Voir tous
                </button>
              }
            />
            <DataTable
              columns={userColumns}
              rows={data.users.slice(0, 8)}
              emptyMessage="Aucun utilisateur récent"
            />
          </SectionCard>
        </div>

        {/* Section Éléments récents - Quatrième rangée */}
        <div className="col-span-12">
          <SectionCard>
            <SectionHeader
              title="Derniers éléments"
              actions={
                <button className="text-[#b8d070] hover:text-[#a2c65e] text-sm font-medium">
                  Voir tous
                </button>
              }
            />
            <DataTable
              columns={elementColumns}
              rows={data.elements.slice(0, 8)}
              emptyMessage="Aucun élément récent"
            />
          </SectionCard>
        </div>

        {/* Section Activité récente - Cinquième rangée */}
        <div className="col-span-12">
          <SectionCard>
            <SectionHeader
              title="Activité récente"
              actions={
                <button className="text-[#b8d070] hover:text-[#a2c65e] text-sm font-medium">
                  Voir historique
                </button>
              }
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[
                {
                  action: "Nouvel utilisateur inscrit",
                  user: "Marie Diallo",
                  time: "Il y a 2 minutes",
                  type: "user",
                },
                {
                  action: "Cours créé",
                  user: "Prof. Camara",
                  time: "Il y a 15 minutes",
                  type: "course",
                },
                {
                  action: "Devoir soumis",
                  user: "Ahmed Bah",
                  time: "Il y a 1 heure",
                  type: "assignment",
                },
                {
                  action: "Nouvelle unité ajoutée",
                  user: "Admin System",
                  time: "Il y a 2 heures",
                  type: "unit",
                },
                {
                  action: "Utilisateur désactivé",
                  user: "Sys Admin",
                  time: "Il y a 3 heures",
                  type: "user",
                },
                {
                  action: "Rapport généré",
                  user: "Admin System",
                  time: "Il y a 4 heures",
                  type: "report",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-[#1d8b93]/20 flex-shrink-0">
                    <Activity className="w-4 h-4 text-[#b8d070]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium truncate">
                      {activity.action}
                    </div>
                    <div className="text-white/60 text-sm truncate">
                      par {activity.user}
                    </div>
                  </div>
                  <div className="text-white/40 text-xs flex-shrink-0">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Section Actions rapides - Sixième rangée */}
        <div className="col-span-12">
          <SectionCard>
            <SectionHeader title="Actions rapides" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/20 flex-shrink-0">
                    <Eye className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white truncate">
                      Gérer les utilisateurs
                    </h3>
                    <p className="text-sm text-white/60 truncate">
                      Comptes et permissions
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-green-500/20 flex-shrink-0">
                    <Shield className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white truncate">
                      Gérer les rôles
                    </h3>
                    <p className="text-sm text-white/60 truncate">
                      Permissions et attributions
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-purple-500/20 flex-shrink-0">
                    <Calendar className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white truncate">
                      Générer rapports
                    </h3>
                    <p className="text-sm text-white/60 truncate">
                      Statistiques et exports
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </SectionCard>
        </div>
      </DashboardGrid>
    </div>
  );
};

export default AdminDashboardPage;
