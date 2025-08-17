"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Calendar,
  BookOpen,
  Target,
  Users,
  Filter,
  Download,
  Eye,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Grade {
  id: string;
  subject: string;
  subjectColor: string;
  assignment: string;
  type: "test" | "homework" | "participation" | "project";
  grade: number;
  maxGrade: number;
  classAverage: number;
  date: string;
  coefficient: number;
  teacher: string;
  comments?: string;
}

interface SubjectGrades {
  subject: string;
  subjectColor: string;
  average: number;
  classAverage: number;
  coefficient: number;
  trend: "up" | "down" | "stable";
  grades: Grade[];
  teacher: string;
}

const gradesData: SubjectGrades[] = [
  {
    subject: "Mathématiques",
    subjectColor: "from-blue-500 to-blue-600",
    average: 15.2,
    classAverage: 13.5,
    coefficient: 4,
    trend: "up",
    teacher: "M. Amadou Diallo",
    grades: [
      {
        id: "1",
        subject: "Mathématiques",
        subjectColor: "from-blue-500 to-blue-600",
        assignment: "Contrôle Dérivées",
        type: "test",
        grade: 16,
        maxGrade: 20,
        classAverage: 13.2,
        date: "08/03/2024",
        coefficient: 2,
        teacher: "M. Amadou Diallo",
        comments: "Très bonne maîtrise des concepts. Continuez ainsi !",
      },
      {
        id: "2",
        subject: "Mathématiques",
        subjectColor: "from-blue-500 to-blue-600",
        assignment: "DM Fonctions",
        type: "homework",
        grade: 14,
        maxGrade: 20,
        classAverage: 14.1,
        date: "02/03/2024",
        coefficient: 1,
        teacher: "M. Amadou Diallo",
      },
      {
        id: "3",
        subject: "Mathématiques",
        subjectColor: "from-blue-500 to-blue-600",
        assignment: "Interrogation Limites",
        type: "test",
        grade: 15.5,
        maxGrade: 20,
        classAverage: 12.8,
        date: "25/02/2024",
        coefficient: 1,
        teacher: "M. Amadou Diallo",
      },
    ],
  },
  {
    subject: "Physique-Chimie",
    subjectColor: "from-purple-500 to-purple-600",
    average: 14.8,
    classAverage: 14.2,
    coefficient: 3,
    trend: "stable",
    teacher: "Mme Fatoumata Traoré",
    grades: [
      {
        id: "4",
        subject: "Physique-Chimie",
        subjectColor: "from-purple-500 to-purple-600",
        assignment: "TP Optique",
        type: "project",
        grade: 14,
        maxGrade: 20,
        classAverage: 14.2,
        date: "06/03/2024",
        coefficient: 1,
        teacher: "Mme Fatoumata Traoré",
        comments: "Manipulation correcte, rapport bien structuré.",
      },
      {
        id: "5",
        subject: "Physique-Chimie",
        subjectColor: "from-purple-500 to-purple-600",
        assignment: "Contrôle Mécanique",
        type: "test",
        grade: 15.5,
        maxGrade: 20,
        classAverage: 13.9,
        date: "28/02/2024",
        coefficient: 2,
        teacher: "Mme Fatoumata Traoré",
      },
    ],
  },
  {
    subject: "Français",
    subjectColor: "from-green-500 to-green-600",
    average: 15.5,
    classAverage: 12.8,
    coefficient: 3,
    trend: "up",
    teacher: "M. Ibrahim Konaté",
    grades: [
      {
        id: "6",
        subject: "Français",
        subjectColor: "from-green-500 to-green-600",
        assignment: "Dissertation Romantisme",
        type: "homework",
        grade: 15,
        maxGrade: 20,
        classAverage: 12.1,
        date: "05/03/2024",
        coefficient: 2,
        teacher: "M. Ibrahim Konaté",
        comments:
          "Analyse pertinente, style fluide. Attention aux transitions.",
      },
      {
        id: "7",
        subject: "Français",
        subjectColor: "from-green-500 to-green-600",
        assignment: "Récitation Baudelaire",
        type: "participation",
        grade: 16,
        maxGrade: 20,
        classAverage: 13.5,
        date: "01/03/2024",
        coefficient: 1,
        teacher: "M. Ibrahim Konaté",
      },
    ],
  },
  {
    subject: "Histoire-Géographie",
    subjectColor: "from-orange-500 to-orange-600",
    average: 16.1,
    classAverage: 13.7,
    coefficient: 3,
    trend: "up",
    teacher: "Mme Mariama Bah",
    grades: [
      {
        id: "8",
        subject: "Histoire-Géographie",
        subjectColor: "from-orange-500 to-orange-600",
        assignment: "Composition 1ère GM",
        type: "test",
        grade: 17,
        maxGrade: 20,
        classAverage: 13.2,
        date: "02/03/2024",
        coefficient: 2,
        teacher: "Mme Mariama Bah",
        comments: "Excellente analyse historique, argumentation solide.",
      },
      {
        id: "9",
        subject: "Histoire-Géographie",
        subjectColor: "from-orange-500 to-orange-600",
        assignment: "Croquis Géographie",
        type: "homework",
        grade: 15,
        maxGrade: 20,
        classAverage: 14.3,
        date: "26/02/2024",
        coefficient: 1,
        teacher: "Mme Mariama Bah",
      },
    ],
  },
];

export default function StudentGradesPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);

  // Calculer la moyenne générale
  const generalAverage =
    gradesData.reduce((acc, subject) => {
      return acc + subject.average * subject.coefficient;
    }, 0) / gradesData.reduce((acc, subject) => acc + subject.coefficient, 0);

  const classGeneralAverage =
    gradesData.reduce((acc, subject) => {
      return acc + subject.classAverage * subject.coefficient;
    }, 0) / gradesData.reduce((acc, subject) => acc + subject.coefficient, 0);

  const getTypeInfo = (type: string) => {
    switch (type) {
      case "test":
        return {
          label: "Contrôle",
          color: "text-red-400",
          bgColor: "bg-red-500/20",
        };
      case "homework":
        return {
          label: "Devoir",
          color: "text-blue-400",
          bgColor: "bg-blue-500/20",
        };
      case "participation":
        return {
          label: "Participation",
          color: "text-green-400",
          bgColor: "bg-green-500/20",
        };
      case "project":
        return {
          label: "Projet",
          color: "text-purple-400",
          bgColor: "bg-purple-500/20",
        };
      default:
        return {
          label: "Autre",
          color: "text-gray-400",
          bgColor: "bg-gray-500/20",
        };
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-yellow-400" />;
    }
  };

  const filteredSubjects =
    selectedSubject === "all"
      ? gradesData
      : gradesData.filter((s) => s.subject === selectedSubject);

  return (
    <div className="space-y-6">
      {/* Header avec moyenne générale */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <Award className="w-7 h-7 text-[#b8d070]" />
              Mes Notes
            </h1>
            <p className="text-white/70">
              Consultez vos résultats et suivez votre progression.
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/60 text-sm">Moyenne générale</p>
            <p className="text-4xl font-bold text-[#b8d070]">
              {generalAverage.toFixed(1)}/20
            </p>
            <p className="text-white/60 text-sm">
              Classe: {classGeneralAverage.toFixed(1)}/20
            </p>
            <p className="text-green-400 text-sm flex items-center gap-1 justify-end mt-1">
              <TrendingUp className="w-4 h-4" />
              +0.3 ce trimestre
            </p>
          </div>
        </div>
      </motion.div>

      {/* Filtre par matière */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-white/60" />
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#b8d070]/50"
          >
            <option value="all">Toutes les matières</option>
            {gradesData.map((subject) => (
              <option key={subject.subject} value={subject.subject}>
                {subject.subject}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Vue par matière */}
      <div className="space-y-6">
        {filteredSubjects.map((subjectData, index) => (
          <motion.div
            key={subjectData.subject}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden"
          >
            {/* Header de la matière */}
            <div
              className={cn(
                "bg-gradient-to-r p-6 text-white",
                subjectData.subjectColor
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-1">
                    {subjectData.subject}
                  </h2>
                  <p className="text-white/90 text-sm">{subjectData.teacher}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-center">
                      <p className="text-2xl font-bold">
                        {subjectData.average.toFixed(1)}
                      </p>
                      <p className="text-white/80 text-xs">Ma moyenne</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-semibold text-white/80">
                        {subjectData.classAverage.toFixed(1)}
                      </p>
                      <p className="text-white/60 text-xs">Classe</p>
                    </div>
                    <div className="flex flex-col items-center">
                      {getTrendIcon(subjectData.trend)}
                      <p className="text-white/60 text-xs">
                        Coeff. {subjectData.coefficient}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Liste des notes */}
            <div className="p-6">
              <div className="grid gap-4">
                {subjectData.grades.map((grade, gradeIndex) => {
                  const typeInfo = getTypeInfo(grade.type);
                  const gradePercentage = (grade.grade / grade.maxGrade) * 100;
                  const classPercentage =
                    (grade.classAverage / grade.maxGrade) * 100;

                  return (
                    <motion.div
                      key={grade.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: gradeIndex * 0.05 + 0.3 }}
                      className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer"
                      onClick={() => setSelectedGrade(grade)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className={cn(
                                "px-2 py-1 rounded-full text-xs font-medium",
                                typeInfo.bgColor,
                                typeInfo.color
                              )}
                            >
                              {typeInfo.label}
                            </div>
                            <h3 className="text-white font-medium">
                              {grade.assignment}
                            </h3>
                            <span className="text-white/50 text-sm">
                              Coeff. {grade.coefficient}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-white/60">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{grade.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              <span>
                                Moy. classe: {grade.classAverage.toFixed(1)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right ml-6">
                          <div className="flex items-center gap-4">
                            {/* Graphique de comparaison */}
                            <div className="w-24 space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-white/60">Moi</span>
                                <span className="text-[#b8d070] font-bold">
                                  {grade.grade}/{grade.maxGrade}
                                </span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-1.5">
                                <div
                                  className="bg-[#b8d070] h-1.5 rounded-full"
                                  style={{ width: `${gradePercentage}%` }}
                                />
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-white/60">Classe</span>
                                <span className="text-white/60">
                                  {grade.classAverage.toFixed(1)}
                                </span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-1">
                                <div
                                  className="bg-white/40 h-1 rounded-full"
                                  style={{ width: `${classPercentage}%` }}
                                />
                              </div>
                            </div>

                            {/* Note principale */}
                            <div className="text-center">
                              <p
                                className={cn(
                                  "text-2xl font-bold",
                                  gradePercentage >= 80
                                    ? "text-green-400"
                                    : gradePercentage >= 60
                                    ? "text-yellow-400"
                                    : gradePercentage >= 40
                                    ? "text-orange-400"
                                    : "text-red-400"
                                )}
                              >
                                {grade.grade.toFixed(1)}
                              </p>
                              <p className="text-white/60 text-xs">
                                /{grade.maxGrade}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal détail de la note */}
      {selectedGrade && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedGrade(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className={cn(
                "bg-gradient-to-r p-6 text-white",
                selectedGrade.subjectColor
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-1">
                    {selectedGrade.assignment}
                  </h2>
                  <p className="text-white/90">
                    {selectedGrade.subject} • {selectedGrade.teacher}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedGrade(null)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Contenu */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Informations de la note */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-white font-semibold mb-3">Détails</h3>
                    <div className="bg-white/5 rounded-xl p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/60">Type</span>
                        <span className="text-white">
                          {getTypeInfo(selectedGrade.type).label}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Date</span>
                        <span className="text-white">{selectedGrade.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Coefficient</span>
                        <span className="text-white">
                          {selectedGrade.coefficient}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Note max</span>
                        <span className="text-white">
                          {selectedGrade.maxGrade}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedGrade.comments && (
                    <div>
                      <h3 className="text-white font-semibold mb-3">
                        Commentaire
                      </h3>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                        <p className="text-blue-300 text-sm">
                          {selectedGrade.comments}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Statistiques et comparaison */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-white font-semibold mb-3">Résultat</h3>
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="text-center mb-4">
                        <p className="text-4xl font-bold text-[#b8d070] mb-1">
                          {selectedGrade.grade.toFixed(1)}
                        </p>
                        <p className="text-white/60">
                          sur {selectedGrade.maxGrade}
                        </p>
                        <p className="text-sm text-white/50 mt-2">
                          {(
                            (selectedGrade.grade / selectedGrade.maxGrade) *
                            100
                          ).toFixed(1)}
                          %
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white/60">Ma note</span>
                            <span className="text-[#b8d070]">
                              {selectedGrade.grade.toFixed(1)}
                            </span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div
                              className="bg-[#b8d070] h-2 rounded-full"
                              style={{
                                width: `${
                                  (selectedGrade.grade /
                                    selectedGrade.maxGrade) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white/60">
                              Moyenne classe
                            </span>
                            <span className="text-white/60">
                              {selectedGrade.classAverage.toFixed(1)}
                            </span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div
                              className="bg-white/40 h-2 rounded-full"
                              style={{
                                width: `${
                                  (selectedGrade.classAverage /
                                    selectedGrade.maxGrade) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/10">
                          <p className="text-sm text-white/60 text-center">
                            {selectedGrade.grade >= selectedGrade.classAverage
                              ? `+${(
                                  selectedGrade.grade -
                                  selectedGrade.classAverage
                                ).toFixed(1)} points au-dessus de la moyenne`
                              : `${(
                                  selectedGrade.classAverage -
                                  selectedGrade.grade
                                ).toFixed(1)} points en-dessous de la moyenne`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Graphique d'évolution (placeholder) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#b8d070]" />
            Évolution de mes moyennes
          </h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm">
              <Download className="w-4 h-4 inline mr-2" />
              Exporter
            </button>
            <button className="px-4 py-2 bg-[#b8d070] text-white rounded-lg hover:bg-[#a2c65e] transition-colors text-sm">
              <Eye className="w-4 h-4 inline mr-2" />
              Graphique détaillé
            </button>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-8 text-center">
          <BarChart3 className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <p className="text-white/60 mb-2">Graphique d'évolution</p>
          <p className="text-white/40 text-sm">
            Fonctionnalité en cours de développement
          </p>
        </div>
      </motion.div>
    </div>
  );
}

