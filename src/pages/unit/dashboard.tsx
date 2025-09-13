"use client";

import { useState, useEffect } from "react";
import { Unit } from "@/types/unit";
import {
  dashboardStatsData,
  dashboardActivitiesData,
  DashboardStats,
  DashboardActivity,
} from "@/examples/dashboardData";
import {
  Users,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

interface UnitDashboardProps {
  unit: Unit;
}

export default function UnitDashboard({ unit }: UnitDashboardProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<DashboardActivity[]>([]);

  useEffect(() => {
    // Charger les statistiques de l'unité
    const unitStats = dashboardStatsData[unit.id];
    setStats(unitStats || null);

    // Charger les activités récentes
    const unitActivities = dashboardActivitiesData[unit.id] || [];
    setActivities(unitActivities);
  }, [unit.id]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "inscription":
        return <Users size={16} className="text-blue-500" />;
      case "evaluation":
        return <GraduationCap size={16} className="text-purple-500" />;
      case "reunion":
        return <Calendar size={16} className="text-green-500" />;
      case "evenement":
        return <Calendar size={16} className="text-orange-500" />;
      default:
        return <Calendar size={16} className="text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={16} className="text-green-500" />;
      case "in_progress":
        return <Clock size={16} className="text-yellow-500" />;
      case "planned":
        return <AlertCircle size={16} className="text-blue-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="bg-[rgba(255,255,255,0.06)] rounded-lg shadow-sm border border-[rgba(255,255,255,0.14)] p-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          Dashboard - {unit.name}
        </h1>
        <p className="text-[rgba(255,255,255,0.70)]">
          Vue d&apos;ensemble des activités et statistiques
        </p>
      </div>

      {/* Statistiques principales */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.totalStudents && (
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-90">Étudiants/Élèves</p>
                  <p className="text-2xl font-bold">
                    {stats.totalStudents.toLocaleString()}
                  </p>
                </div>
                <Users size={24} className="opacity-80" />
              </div>
            </div>
          )}

          {stats.totalTeachers && (
            <div className="bg-green-500 text-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-90">Enseignants</p>
                  <p className="text-2xl font-bold">
                    {stats.totalTeachers.toLocaleString()}
                  </p>
                </div>
                <GraduationCap size={24} className="opacity-80" />
              </div>
            </div>
          )}

          {stats.totalClasses && (
            <div className="bg-purple-500 text-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-90">Classes/Cours</p>
                  <p className="text-2xl font-bold">{stats.totalClasses}</p>
                </div>
                <BookOpen size={24} className="opacity-80" />
              </div>
            </div>
          )}

          {stats.totalSubUnits !== undefined && (
            <div className="bg-orange-500 text-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-90">Sous-unités</p>
                  <p className="text-2xl font-bold">{stats.totalSubUnits}</p>
                </div>
                <TrendingUp size={24} className="opacity-80" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Indicateurs de performance */}
      {stats && (stats.performance || stats.attendance || stats.budget) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.performance && (
            <div className="bg-[rgba(255,255,255,0.06)] rounded-lg shadow-sm border border-[rgba(255,255,255,0.14)] p-4">
              <h3 className="text-sm font-medium text-white mb-2">
                Performance
              </h3>
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${stats.performance}%` }}
                    ></div>
                  </div>
                </div>
                <span className="ml-2 text-sm font-medium text-white">
                  {stats.performance}%
                </span>
              </div>
            </div>
          )}

          {stats.attendance && (
            <div className="bg-[rgba(255,255,255,0.06)] rounded-lg shadow-sm border border-[rgba(255,255,255,0.14)] p-4">
              <h3 className="text-sm font-medium text-white mb-2">Assiduité</h3>
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${stats.attendance}%` }}
                    ></div>
                  </div>
                </div>
                <span className="ml-2 text-sm font-medium text-white">
                  {stats.attendance}%
                </span>
              </div>
            </div>
          )}

          {stats.budget && (
            <div className="bg-[rgba(255,255,255,0.06)] rounded-lg shadow-sm border border-[rgba(255,255,255,0.14)] p-4">
              <h3 className="text-sm font-medium text-white mb-2">Budget</h3>
              <p className="text-lg font-bold text-white">
                {formatCurrency(stats.budget)}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Activités récentes */}
      <div className="bg-[rgba(255,255,255,0.06)] rounded-lg shadow-sm border border-[rgba(255,255,255,0.14)] p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Activités Récentes
        </h2>
        {activities.length > 0 ? (
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 bg-[rgba(255,255,255,0.05)] rounded-lg"
              >
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-white">
                      {activity.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(activity.status)}
                      <span className="text-xs text-[rgba(255,255,255,0.70)]">
                        {activity.date}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[rgba(255,255,255,0.70)] mt-1">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[rgba(255,255,255,0.70)] text-center py-8">
            Aucune activité récente
          </p>
        )}
      </div>
    </div>
  );
}
