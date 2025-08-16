"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import KpiCard, { KpiCardSkeleton } from "@/components/admin_dashboard/KpiCard";
import DataTable, {
  DataTableSkeleton,
} from "@/components/admin_dashboard/DataTable";
import ElementTypeChart from "@/components/teacher_dashboard/ElementTypeChart";
import {
  kpi,
  recentElements,
  recentAssignments,
  elementTypeDistribution,
  weeklyProgression,
  simulateLoading,
  type TeacherKPI,
  type ElementRow,
  type AssignmentRow,
} from "@/lib/mocks/teacherDashboard";
import {
  BookOpen,
  FileEdit,
  Archive,
  Users,
  Shield,
  TrendingUp,
  Calendar,
  Target,
} from "lucide-react";

const TeacherDashboardPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<{
    kpi: TeacherKPI;
    elements: ElementRow[];
    assignments: AssignmentRow[];
    distribution: typeof elementTypeDistribution;
  } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      await simulateLoading(300);
      setData({
        kpi,
        elements: recentElements,
        assignments: recentAssignments,
        distribution: elementTypeDistribution,
      });
      setIsLoading(false);
    };

    loadData();
  }, []);

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
        };

        const typeLabels = {
          course: "Cours",
          assignment: "Devoir",
          resource: "Ressource",
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
    {
      key: "status",
      header: "Statut",
      render: (element: ElementRow) => {
        const statusColors = {
          Publié: "bg-green-500/20 text-green-300 border-green-500/30",
          Brouillon: "bg-orange-500/20 text-orange-300 border-orange-500/30",
          Archivé: "bg-red-500/20 text-red-300 border-red-500/30",
        };

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium border ${
              statusColors[element.status]
            }`}
          >
            {element.status}
          </span>
        );
      },
    },
    { key: "unitName", header: "Unité" },
    { key: "updatedAt", header: "Modifié le" },
  ];

  // Colonnes pour la table des attributions
  const assignmentColumns = [
    {
      key: "scopeName",
      header: "Portée",
      render: (assignment: AssignmentRow) => (
        <div className="max-w-xs">
          <div className="font-medium text-white truncate">
            {assignment.scopeName}
          </div>
        </div>
      ),
    },
    { key: "roleName", header: "Rôle" },
    { key: "startDate", header: "Date début" },
    {
      key: "status",
      header: "Statut",
      render: (assignment: AssignmentRow) => {
        const statusColors = {
          Actif: "bg-green-500/20 text-green-300 border-green-500/30",
          "En attente": "bg-orange-500/20 text-orange-300 border-orange-500/30",
          Expiré: "bg-red-500/20 text-red-300 border-red-500/30",
        };

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium border ${
              statusColors[assignment.status]
            }`}
          >
            {assignment.status}
          </span>
        );
      },
    },
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
          Tableau de bord Enseignant
        </h1>
        <p className="text-white/70">
          Vue d&apos;ensemble de vos activités d&apos;enseignement -{" "}
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
          label="Éléments Publiés"
          value={data.kpi.published}
          caption="Cours, devoirs, ressources"
          icon={<BookOpen className="w-6 h-6" />}
          color="green"
          trend={{ value: 12, isPositive: true }}
        />
        <KpiCard
          label="En Brouillon"
          value={data.kpi.drafts}
          caption="En cours de préparation"
          icon={<FileEdit className="w-6 h-6" />}
          color="orange"
        />
        <KpiCard
          label="Archivés"
          value={data.kpi.archived}
          caption="Éléments passés"
          icon={<Archive className="w-6 h-6" />}
          color="red"
        />
        <KpiCard
          label="Classes/Groupes"
          value={data.kpi.groups}
          caption="Groupes gérés"
          icon={<Users className="w-6 h-6" />}
          color="blue"
        />
        <KpiCard
          label="Attributions Actives"
          value={data.kpi.activeAssignments}
          caption="Rôles en cours"
          icon={<Shield className="w-6 h-6" />}
          color="purple"
        />
      </div>

      {/* Chart and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Element Type Distribution Chart */}
        <ElementTypeChart data={data.distribution} />

        {/* Tables */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Elements Table */}
          <DataTable
            title="Derniers éléments"
            columns={elementColumns}
            rows={data.elements}
            emptyMessage="Aucun élément récent"
            searchable
          />

          {/* Recent Assignments Table */}
          <DataTable
            title="Dernières attributions"
            columns={assignmentColumns}
            rows={data.assignments}
            emptyMessage="Aucune attribution récente"
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
            <div className="p-3 rounded-xl bg-green-500/20">
              <Target className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">
                Créer un nouvel élément
              </h3>
              <p className="text-sm text-white/60">
                Cours, devoir ou ressource
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg p-6 cursor-pointer hover:bg-white/10 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-500/20">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Gérer mes classes</h3>
              <p className="text-sm text-white/60">
                Voir et organiser les groupes
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
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Voir les rapports</h3>
              <p className="text-sm text-white/60">Statistiques et analyses</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TeacherDashboardPage;
