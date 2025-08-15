"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getReportAggregates,
  exportReport,
  getReportTypeLabel,
  getPeriodLabel,
  getFormatLabel,
  type ReportAggregates,
  type ExportOptions,
} from "@/lib/mocks/teacherReports";
import {
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  Download,
  Calendar,
  Activity,
  PieChart,
  Zap,
  Clock,
} from "lucide-react";

const TeacherReportsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState<ReportAggregates | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getReportAggregates();
        setReports(data);
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleExport = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsExporting(true);

    const formData = new FormData(e.currentTarget);
    const options: ExportOptions = {
      format: formData.get("format") as "pdf" | "excel" | "csv",
      period: selectedPeriod,
      reportType: selectedReportType,
    };

    try {
      const result = await exportReport(selectedReportType, options);
      if (result.success) {
        // Simulate toast notification
        const toast = document.createElement("div");
        toast.className =
          "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
        toast.textContent = `Rapport exporté : ${result.filename}`;
        document.body.appendChild(toast);
        setTimeout(() => document.body.removeChild(toast), 3000);
      }
      setShowExportModal(false);
    } catch (error) {
      console.error("Erreur lors de l'export:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const reportCards = [
    {
      id: "activity",
      title: "Activité récente",
      description: "Éléments créés et interactions étudiants",
      icon: Activity,
      color: "blue",
      stats: reports?.activityByWeek.reduce(
        (acc, week) => ({
          created: acc.created + week.elementsCreated,
          published: acc.published + week.elementsPublished,
          interactions: acc.interactions + week.studentsInteractions,
        }),
        { created: 0, published: 0, interactions: 0 }
      ),
    },
    {
      id: "status",
      title: "Éléments par statut",
      description: "Répartition de vos contenus pédagogiques",
      icon: PieChart,
      color: "green",
      stats: reports?.elementsByStatus.reduce(
        (acc, status) => acc + status.count,
        0
      ),
    },
    {
      id: "classes",
      title: "Classes & effectifs",
      description: "Performances et statistiques des classes",
      icon: Users,
      color: "purple",
      stats: reports?.classesSummary.reduce(
        (acc, cls) => ({
          totalStudents: acc.totalStudents + cls.studentsCount,
          averageGrade: (acc.averageGrade + cls.averageGrade) / 2,
          averageAttendance: (acc.averageAttendance + cls.attendanceRate) / 2,
        }),
        { totalStudents: 0, averageGrade: 0, averageAttendance: 0 }
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="h-8 bg-white/20 rounded w-64 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white/5 rounded-xl p-6 h-64 animate-pulse"
            >
              <div className="h-6 bg-white/20 rounded w-32 mb-4"></div>
              <div className="h-4 bg-white/20 rounded w-full mb-6"></div>
              <div className="space-y-2">
                <div className="h-4 bg-white/20 rounded w-3/4"></div>
                <div className="h-4 bg-white/20 rounded w-1/2"></div>
              </div>
            </div>
          ))}
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
            Rapports & Analyses
          </h1>
          <p className="text-white/70">
            Analysez vos performances pédagogiques et exportez vos données
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-white/70">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Période :</span>
          </div>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent"
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`bg-gradient-to-br from-${card.color}-500/20 to-${card.color}-600/20 backdrop-blur-sm rounded-xl border border-${card.color}-500/30 p-6 cursor-pointer hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}
              onClick={() => {
                setSelectedReportType(card.id);
                setShowExportModal(true);
              }}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-${card.color}-500/20`}>
                    <Icon className={`w-6 h-6 text-${card.color}-400`} />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-white/60">
                      Période actuelle
                    </div>
                    <div className="text-sm font-medium text-white">
                      {getPeriodLabel(selectedPeriod)}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-white/60 text-sm mb-4">{card.description}</p>

                {/* Stats Preview */}
                <div className="space-y-2">
                  {card.id === "activity" && card.stats && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Éléments créés</span>
                        <span className="font-medium text-white">
                          {card.stats.created}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Publiés</span>
                        <span className="font-medium text-white">
                          {card.stats.published}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Interactions</span>
                        <span className="font-medium text-white">
                          {card.stats.interactions}
                        </span>
                      </div>
                    </>
                  )}

                  {card.id === "status" && card.stats && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Total éléments</span>
                      <span className="font-medium text-white">
                        {card.stats}
                      </span>
                    </div>
                  )}

                  {card.id === "classes" && card.stats && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Total étudiants</span>
                        <span className="font-medium text-white">
                          {card.stats.totalStudents}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Moyenne générale</span>
                        <span className="font-medium text-white">
                          {card.stats.averageGrade.toFixed(1)}/20
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">
                      Cliquer pour exporter
                    </span>
                    <Download className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors duration-200" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <FileText className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-white/70 text-sm">Éléments totaux</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {reports?.elementsByStatus.reduce(
              (acc, status) => acc + status.count,
              0
            )}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <Users className="w-4 h-4 text-green-400" />
            </div>
            <span className="text-white/70 text-sm">Classes gérées</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {reports?.classesSummary.length}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <TrendingUp className="w-4 h-4 text-purple-400" />
            </div>
            <span className="text-white/70 text-sm">Moyenne générale</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {reports?.classesSummary
              .reduce((acc, cls) => acc + cls.averageGrade, 0)
              .toFixed(1) || 0}
            /20
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-orange-500/20">
              <Zap className="w-4 h-4 text-orange-400" />
            </div>
            <span className="text-white/70 text-sm">Taux présence</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {Math.round(
              reports?.classesSummary.reduce(
                (acc, cls) => acc + cls.attendanceRate,
                0
              ) || 0 / (reports?.classesSummary.length || 1)
            )}
            %
          </div>
        </div>
      </motion.div>

      {/* Export Modal */}
      <AnimatePresence>
        {showExportModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowExportModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-gradient-to-b from-[#1d8b93] to-[#0d5a61] rounded-xl border border-white/10 shadow-2xl p-6 w-full max-w-md">
                <h3 className="text-xl font-bold text-white mb-4">
                  Exporter le rapport
                </h3>
                <p className="text-white/70 mb-6">
                  {getReportTypeLabel(selectedReportType)}
                </p>

                <form onSubmit={handleExport} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Format d'export
                    </label>
                    <select
                      name="format"
                      required
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent"
                    >
                      <option value="pdf">PDF</option>
                      <option value="excel">Excel (XLSX)</option>
                      <option value="csv">CSV</option>
                    </select>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-sm text-white/70 mb-2">
                      Période sélectionnée :
                    </div>
                    <div className="font-medium text-white">
                      {getPeriodLabel(selectedPeriod)}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={isExporting}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#b8d070] text-[#1d8b93] font-medium rounded-lg hover:bg-[#a2c65e] transition-colors duration-200 disabled:opacity-50"
                    >
                      {isExporting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#1d8b93]/30 border-t-[#1d8b93] rounded-full animate-spin" />
                          Export en cours...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Exporter
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowExportModal(false)}
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

export default TeacherReportsPage;
