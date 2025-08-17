"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  FileText,
  GraduationCap,
  Clock,
  Calendar,
  Award,
  TrendingUp,
  Users,
  Bell,
  Target,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  Download,
  Eye,
} from "lucide-react";
import KPICard from "@/components/admin_dashboard/KpiCard";
import { cn } from "@/lib/utils";

interface DashboardData {
  kpi: {
    todayClasses: number;
    pendingHomework: number;
    averageGrade: string;
    nextClass: {
      subject: string;
      time: string;
      room: string;
    };
  };
  weekSchedule: Array<{
    date: string;
    day: string;
    classes: Array<{
      time: string;
      subject: string;
      teacher: string;
      room: string;
    }>;
    homework: Array<{
      subject: string;
      title: string;
      dueDate: string;
      priority: "high" | "medium" | "low";
    }>;
  }>;
  recentGrades: Array<{
    subject: string;
    assignment: string;
    grade: string;
    average: string;
    date: string;
    trend: "up" | "down" | "stable";
  }>;
  upcomingEvents: Array<{
    title: string;
    date: string;
    type: "exam" | "homework" | "event";
    subject?: string;
  }>;
}

const simulateLoading = (delay: number = 1000): Promise<DashboardData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        kpi: {
          todayClasses: 5,
          pendingHomework: 3,
          averageGrade: "15.2/20",
          nextClass: {
            subject: "Mathématiques",
            time: "14h30",
            room: "Salle 204",
          },
        },
        weekSchedule: [
          {
            date: "2024-03-11",
            day: "Lundi",
            classes: [
              {
                time: "08h00",
                subject: "Mathématiques",
                teacher: "M. Diallo",
                room: "204",
              },
              {
                time: "10h00",
                subject: "Physique",
                teacher: "Mme Traoré",
                room: "Lab 1",
              },
              {
                time: "14h00",
                subject: "Français",
                teacher: "M. Konaté",
                room: "301",
              },
            ],
            homework: [
              {
                subject: "Mathématiques",
                title: "Exercices sur les dérivées",
                dueDate: "12/03",
                priority: "high",
              },
            ],
          },
          {
            date: "2024-03-12",
            day: "Mardi",
            classes: [
              {
                time: "08h00",
                subject: "Histoire",
                teacher: "Mme Bah",
                room: "105",
              },
              {
                time: "10h00",
                subject: "Anglais",
                teacher: "M. Johnson",
                room: "201",
              },
              {
                time: "15h00",
                subject: "SVT",
                teacher: "Dr. Keita",
                room: "Lab 2",
              },
            ],
            homework: [
              {
                subject: "Anglais",
                title: "Essay: My Future Plans",
                dueDate: "14/03",
                priority: "medium",
              },
            ],
          },
        ],
        recentGrades: [
          {
            subject: "Mathématiques",
            assignment: "Contrôle Dérivées",
            grade: "16/20",
            average: "13.5/20",
            date: "08/03/2024",
            trend: "up",
          },
          {
            subject: "Physique",
            assignment: "TP Optique",
            grade: "14/20",
            average: "14.2/20",
            date: "06/03/2024",
            trend: "stable",
          },
          {
            subject: "Français",
            assignment: "Dissertation",
            grade: "15/20",
            average: "12.8/20",
            date: "05/03/2024",
            trend: "up",
          },
        ],
        upcomingEvents: [
          {
            title: "Contrôle de Mathématiques",
            date: "15/03",
            type: "exam",
            subject: "Mathématiques",
          },
          {
            title: "Remise dissertation Français",
            date: "18/03",
            type: "homework",
            subject: "Français",
          },
          {
            title: "Réunion parents-professeurs",
            date: "22/03",
            type: "event",
          },
          {
            title: "Sortie pédagogique SVT",
            date: "25/03",
            type: "event",
            subject: "SVT",
          },
        ],
      });
    }, delay);
  });
};

export default function StudentDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    simulateLoading().then((dashboardData) => {
      setData(dashboardData);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-[#b8d070] border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-white/70">
            Chargement de votre tableau de bord...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header de bienvenue */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Bonjour Marie ! 👋
            </h1>
            <p className="text-white/70">
              Voici un aperçu de votre journée. Vous avez{" "}
              {data.kpi.pendingHomework} devoirs à rendre.
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/60 text-sm">Prochain cours</p>
            <p className="text-white font-semibold">
              {data.kpi.nextClass.subject}
            </p>
            <p className="text-[#b8d070] text-sm">
              {data.kpi.nextClass.time} • {data.kpi.nextClass.room}
            </p>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <KPICard
            title="Cours du jour"
            value={data.kpi.todayClasses}
            subtitle="Matières programmées"
            icon={BookOpen}
            color="primary"
            delta={0}
            trend="stable"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <KPICard
            title="Devoirs à rendre"
            value={data.kpi.pendingHomework}
            subtitle="À terminer cette semaine"
            icon={FileText}
            color="warning"
            delta={-1}
            trend="down"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <KPICard
            title="Moyenne générale"
            value={data.kpi.averageGrade}
            subtitle="Toutes matières"
            icon={GraduationCap}
            color="success"
            delta={0.3}
            trend="up"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <KPICard
            title="Présence"
            value="96%"
            subtitle="Ce trimestre"
            icon={CheckCircle}
            color="brand"
            delta={2}
            trend="up"
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* À venir cette semaine */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#b8d070]" />À venir cette
              semaine
            </h2>
            <button className="text-[#b8d070] hover:text-white text-sm font-medium transition-colors">
              Voir tout
            </button>
          </div>

          <div className="space-y-4">
            {data.weekSchedule.map((day, index) => (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.6 }}
                className="bg-white/5 rounded-xl p-4 border border-white/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white">{day.day}</h3>
                  <span className="text-white/60 text-sm">{day.date}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Cours */}
                  <div>
                    <h4 className="text-[#b8d070] text-sm font-medium mb-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Cours ({day.classes.length})
                    </h4>
                    <div className="space-y-2">
                      {day.classes.map((classe, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm"
                        >
                          <span className="text-white/60 min-w-[50px]">
                            {classe.time}
                          </span>
                          <span className="text-white font-medium">
                            {classe.subject}
                          </span>
                          <span className="text-white/50 text-xs">
                            • {classe.room}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Devoirs */}
                  <div>
                    <h4 className="text-orange-400 text-sm font-medium mb-2 flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      Devoirs ({day.homework.length})
                    </h4>
                    <div className="space-y-2">
                      {day.homework.map((hw, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm"
                        >
                          <div
                            className={cn(
                              "w-2 h-2 rounded-full",
                              hw.priority === "high"
                                ? "bg-red-400"
                                : hw.priority === "medium"
                                ? "bg-yellow-400"
                                : "bg-green-400"
                            )}
                          />
                          <span className="text-white font-medium">
                            {hw.subject}
                          </span>
                          <span className="text-white/60 text-xs">
                            • {hw.dueDate}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Dernières notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-[#b8d070]" />
              Dernières notes
            </h2>
            <button className="text-[#b8d070] hover:text-white text-sm font-medium transition-colors">
              Voir tout
            </button>
          </div>

          <div className="space-y-4">
            {data.recentGrades.map((grade, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.8 }}
                className="bg-white/5 rounded-xl p-4 border border-white/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white text-sm">
                    {grade.subject}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[#b8d070] font-bold">
                      {grade.grade}
                    </span>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 1 }}
                    >
                      {grade.trend === "up" && (
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      )}
                      {grade.trend === "down" && (
                        <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />
                      )}
                      {grade.trend === "stable" && (
                        <div className="w-4 h-4 rounded-full bg-yellow-400" />
                      )}
                    </motion.div>
                  </div>
                </div>
                <p className="text-white/60 text-xs mb-1">{grade.assignment}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50">
                    Moy. classe: {grade.average}
                  </span>
                  <span className="text-white/50">{grade.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Événements importants */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#b8d070]" />
            Événements importants
          </h2>
          <button className="text-[#b8d070] hover:text-white text-sm font-medium transition-colors">
            Calendrier complet
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.upcomingEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 1 }}
              className={cn(
                "bg-white/5 rounded-xl p-4 border transition-all duration-200 hover:bg-white/10 cursor-pointer",
                event.type === "exam"
                  ? "border-red-500/30 hover:border-red-500/50"
                  : event.type === "homework"
                  ? "border-yellow-500/30 hover:border-yellow-500/50"
                  : "border-blue-500/30 hover:border-blue-500/50"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                {event.type === "exam" && (
                  <AlertCircle className="w-4 h-4 text-red-400" />
                )}
                {event.type === "homework" && (
                  <FileText className="w-4 h-4 text-yellow-400" />
                )}
                {event.type === "event" && (
                  <Calendar className="w-4 h-4 text-blue-400" />
                )}
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-1 rounded-full",
                    event.type === "exam"
                      ? "bg-red-500/20 text-red-300"
                      : event.type === "homework"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : "bg-blue-500/20 text-blue-300"
                  )}
                >
                  {event.type === "exam"
                    ? "Examen"
                    : event.type === "homework"
                    ? "Devoir"
                    : "Événement"}
                </span>
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">
                {event.title}
              </h3>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60">{event.date}</span>
                {event.subject && (
                  <span className="text-[#b8d070]">{event.subject}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

