"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  Filter,
  Search,
  Upload,
  Download,
  Eye,
  Award,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Homework {
  id: string;
  subject: string;
  title: string;
  description: string;
  dueDate: string;
  dueTime: string;
  status: "pending" | "submitted" | "graded" | "late";
  priority: "high" | "medium" | "low";
  grade?: string;
  maxGrade: string;
  submissionDate?: string;
  feedback?: string;
  attachments: string[];
  estimatedTime: string;
  subjectColor: string;
}

const homeworkData: Homework[] = [
  {
    id: "1",
    subject: "Mathématiques",
    title: "Exercices sur les dérivées",
    description:
      "Résoudre les exercices 15 à 25 page 142. Démonstrations détaillées requises.",
    dueDate: "12/03/2024",
    dueTime: "23h59",
    status: "pending",
    priority: "high",
    maxGrade: "20",
    attachments: ["exercices_derivees.pdf"],
    estimatedTime: "2h",
    subjectColor: "from-blue-500 to-blue-600",
  },
  {
    id: "2",
    subject: "Physique-Chimie",
    title: "Rapport de TP - Optique",
    description:
      "Rédiger un rapport complet sur l'expérience d'optique géométrique réalisée en classe.",
    dueDate: "15/03/2024",
    dueTime: "17h00",
    status: "pending",
    priority: "medium",
    maxGrade: "20",
    attachments: ["protocole_tp.pdf", "resultats.xlsx"],
    estimatedTime: "3h",
    subjectColor: "from-purple-500 to-purple-600",
  },
  {
    id: "3",
    subject: "Français",
    title: "Dissertation - Le romantisme",
    description:
      "Dissertation sur le thème : 'Le romantisme, une révolution littéraire ?'",
    dueDate: "18/03/2024",
    dueTime: "12h00",
    status: "submitted",
    priority: "high",
    maxGrade: "20",
    submissionDate: "16/03/2024 14h30",
    attachments: ["dissertation_romantisme.docx"],
    estimatedTime: "4h",
    subjectColor: "from-green-500 to-green-600",
  },
  {
    id: "4",
    subject: "Histoire-Géographie",
    title: "Analyse de documents - 1ère GM",
    description:
      "Analyser les documents fournis sur les causes de la Première Guerre mondiale.",
    dueDate: "10/03/2024",
    dueTime: "23h59",
    status: "graded",
    priority: "medium",
    grade: "16",
    maxGrade: "20",
    submissionDate: "09/03/2024 20h15",
    feedback:
      "Très bonne analyse des documents. Argumentation solide et bien structurée.",
    attachments: ["analyse_documents.pdf"],
    estimatedTime: "2h30",
    subjectColor: "from-orange-500 to-orange-600",
  },
  {
    id: "5",
    subject: "Anglais",
    title: "Essay - My Future Plans",
    description:
      "Write a 300-word essay about your future career plans and aspirations.",
    dueDate: "08/03/2024",
    dueTime: "16h00",
    status: "late",
    priority: "medium",
    maxGrade: "20",
    attachments: ["essay_guidelines.pdf"],
    estimatedTime: "1h30",
    subjectColor: "from-red-500 to-red-600",
  },
];

export default function StudentHomeworkPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHomework, setSelectedHomework] = useState<Homework | null>(
    null
  );

  const filteredHomework = homeworkData.filter((hw) => {
    const matchesFilter =
      selectedFilter === "all" || hw.status === selectedFilter;
    const matchesSearch =
      hw.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hw.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return {
          label: "À rendre",
          color: "text-yellow-400",
          bgColor: "bg-yellow-500/20",
          icon: Clock,
        };
      case "submitted":
        return {
          label: "Rendu",
          color: "text-blue-400",
          bgColor: "bg-blue-500/20",
          icon: CheckCircle,
        };
      case "graded":
        return {
          label: "Noté",
          color: "text-green-400",
          bgColor: "bg-green-500/20",
          icon: Award,
        };
      case "late":
        return {
          label: "En retard",
          color: "text-red-400",
          bgColor: "bg-red-500/20",
          icon: AlertCircle,
        };
      default:
        return {
          label: "Inconnu",
          color: "text-gray-400",
          bgColor: "bg-gray-500/20",
          icon: FileText,
        };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500/50";
      case "medium":
        return "border-yellow-500/50";
      case "low":
        return "border-green-500/50";
      default:
        return "border-white/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header avec statistiques */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <FileText className="w-7 h-7 text-[#b8d070]" />
              Mes Devoirs
            </h1>
            <p className="text-white/70">
              Gérez vos devoirs et suivez vos soumissions.
            </p>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">
              {homeworkData.filter((hw) => hw.status === "pending").length}
            </p>
            <p className="text-white/60 text-sm">À rendre</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">
              {homeworkData.filter((hw) => hw.status === "submitted").length}
            </p>
            <p className="text-white/60 text-sm">Rendus</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-400">
              {homeworkData.filter((hw) => hw.status === "graded").length}
            </p>
            <p className="text-white/60 text-sm">Notés</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-red-400">
              {homeworkData.filter((hw) => hw.status === "late").length}
            </p>
            <p className="text-white/60 text-sm">En retard</p>
          </div>
        </div>
      </motion.div>

      {/* Filtres et recherche */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Barre de recherche */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              placeholder="Rechercher un devoir..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070]/50 focus:border-[#b8d070]/50"
            />
          </div>

          {/* Filtres */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-white/60" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#b8d070]/50"
            >
              <option value="all">Tous</option>
              <option value="pending">À rendre</option>
              <option value="submitted">Rendus</option>
              <option value="graded">Notés</option>
              <option value="late">En retard</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Liste des devoirs */}
      <div className="space-y-4">
        {filteredHomework.map((homework, index) => {
          const statusInfo = getStatusInfo(homework.status);
          const StatusIcon = statusInfo.icon;

          return (
            <motion.div
              key={homework.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className={cn(
                "bg-white/10 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 cursor-pointer hover:bg-white/15",
                getPriorityColor(homework.priority)
              )}
              onClick={() => setSelectedHomework(homework)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={cn(
                        "bg-gradient-to-r p-2 rounded-lg text-white text-xs font-medium",
                        homework.subjectColor
                      )}
                    >
                      {homework.subject}
                    </div>
                    <div
                      className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                        statusInfo.bgColor,
                        statusInfo.color
                      )}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {statusInfo.label}
                    </div>
                    {homework.priority === "high" && (
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium">
                        <AlertCircle className="w-3 h-3" />
                        Priorité haute
                      </div>
                    )}
                  </div>

                  {/* Titre et description */}
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {homework.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">
                    {homework.description}
                  </p>

                  {/* Informations */}
                  <div className="flex items-center gap-6 text-sm text-white/60">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        À rendre le {homework.dueDate} à {homework.dueTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>~{homework.estimatedTime}</span>
                    </div>
                    {homework.grade && (
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span className="text-[#b8d070] font-medium">
                          {homework.grade}/{homework.maxGrade}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 ml-4">
                  {homework.status === "pending" && (
                    <button className="px-4 py-2 bg-[#b8d070] text-white rounded-lg hover:bg-[#a2c65e] transition-colors text-sm font-medium">
                      Commencer
                    </button>
                  )}
                  {homework.status === "submitted" && (
                    <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm font-medium">
                      Voir soumission
                    </button>
                  )}
                  {homework.status === "graded" && (
                    <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors text-sm font-medium">
                      Voir note
                    </button>
                  )}
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Eye className="w-4 h-4 text-white/60" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal détail du devoir */}
      {selectedHomework && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedHomework(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className={cn(
                "bg-gradient-to-r p-6 text-white",
                selectedHomework.subjectColor
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedHomework.title}
                  </h2>
                  <p className="text-white/90">{selectedHomework.subject}</p>
                </div>
                <button
                  onClick={() => setSelectedHomework(null)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Contenu */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Informations principales */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-white font-semibold mb-3">
                      Description
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {selectedHomework.description}
                    </p>
                  </div>

                  {selectedHomework.feedback && (
                    <div>
                      <h3 className="text-white font-semibold mb-3">
                        Commentaire du professeur
                      </h3>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                        <p className="text-green-300">
                          {selectedHomework.feedback}
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-white font-semibold mb-3">
                      Pièces jointes
                    </h3>
                    <div className="space-y-2">
                      {selectedHomework.attachments.map((attachment, idx) => (
                        <div
                          key={idx}
                          className="bg-white/5 rounded-xl p-3 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4 text-blue-400" />
                            <span className="text-white text-sm">
                              {attachment}
                            </span>
                          </div>
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Download className="w-4 h-4 text-white/60" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar avec infos */}
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-3">
                      Informations
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">Échéance</span>
                        <span className="text-white">
                          {selectedHomework.dueDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Heure limite</span>
                        <span className="text-white">
                          {selectedHomework.dueTime}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Temps estimé</span>
                        <span className="text-white">
                          {selectedHomework.estimatedTime}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Note sur</span>
                        <span className="text-white">
                          {selectedHomework.maxGrade}
                        </span>
                      </div>
                      {selectedHomework.grade && (
                        <div className="flex justify-between">
                          <span className="text-white/60">Ma note</span>
                          <span className="text-[#b8d070] font-bold">
                            {selectedHomework.grade}/{selectedHomework.maxGrade}
                          </span>
                        </div>
                      )}
                      {selectedHomework.submissionDate && (
                        <div className="flex justify-between">
                          <span className="text-white/60">Rendu le</span>
                          <span className="text-white">
                            {selectedHomework.submissionDate}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    {selectedHomework.status === "pending" && (
                      <>
                        <button className="w-full px-4 py-3 bg-[#b8d070] text-white rounded-xl hover:bg-[#a2c65e] transition-colors font-medium">
                          Commencer le devoir
                        </button>
                        <button className="w-full px-4 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">
                          <Upload className="w-4 h-4 inline mr-2" />
                          Soumettre un fichier
                        </button>
                      </>
                    )}
                    {selectedHomework.status === "submitted" && (
                      <button className="w-full px-4 py-3 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-colors font-medium">
                        Modifier ma soumission
                      </button>
                    )}
                    <button className="w-full px-4 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">
                      Ajouter au calendrier
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Message si aucun devoir */}
      {filteredHomework.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FileText className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <p className="text-white/60 text-lg">Aucun devoir trouvé</p>
          <p className="text-white/40 text-sm">
            Essayez de modifier vos filtres de recherche
          </p>
        </motion.div>
      )}
    </div>
  );
}

