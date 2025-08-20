"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Play,
  FileText,
  Calendar,
  ChevronRight,
  Filter,
  Search,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Course {
  id: string;
  title: string;
  teacher: string;
  subject: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  nextLesson: {
    title: string;
    date: string;
    time: string;
  };
  rating: number;
  students: number;
  color: string;
  description: string;
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Mathématiques Avancées",
    teacher: "Prof. Amadou Diallo",
    subject: "Mathématiques",
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
    nextLesson: {
      title: "Intégrales par parties",
      date: "2024-01-15",
      time: "14:30",
    },
    rating: 4.8,
    students: 32,
    color: "from-blue-500 to-blue-600",
    description:
      "Cours avancé de mathématiques couvrant l'analyse, l'algèbre et la géométrie pour la terminale S.",
  },
  {
    id: "2",
    title: "Physique-Chimie",
    teacher: "Prof. Fatoumata Camara",
    subject: "Sciences",
    progress: 60,
    totalLessons: 28,
    completedLessons: 17,
    nextLesson: {
      title: "Électricité - Lois de Kirchhoff",
      date: "2024-01-16",
      time: "10:00",
    },
    rating: 4.6,
    students: 28,
    color: "from-green-500 to-green-600",
    description:
      "Exploration des concepts fondamentaux de la physique et de la chimie avec des expériences pratiques.",
  },
  {
    id: "3",
    title: "Français & Littérature",
    teacher: "Prof. Mariama Touré",
    subject: "Lettres",
    progress: 85,
    totalLessons: 20,
    completedLessons: 17,
    nextLesson: {
      title: "Analyse de 'L'Étranger' de Camus",
      date: "2024-01-17",
      time: "08:30",
    },
    rating: 4.9,
    students: 35,
    color: "from-purple-500 to-purple-600",
    description:
      "Étude approfondie de la littérature française et francophone avec analyse d'œuvres majeures.",
  },
  {
    id: "4",
    title: "Histoire-Géographie",
    teacher: "Prof. Ibrahima Sow",
    subject: "Sciences Humaines",
    progress: 45,
    totalLessons: 22,
    completedLessons: 10,
    nextLesson: {
      title: "La Guerre Froide",
      date: "2024-01-18",
      time: "15:00",
    },
    rating: 4.4,
    students: 30,
    color: "from-orange-500 to-orange-600",
    description:
      "Découverte des grands événements historiques et des enjeux géopolitiques contemporains.",
  },
  {
    id: "5",
    title: "Anglais",
    teacher: "Prof. Aissatou Barry",
    subject: "Langues",
    progress: 70,
    totalLessons: 18,
    completedLessons: 13,
    nextLesson: {
      title: "Advanced Grammar - Conditional Sentences",
      date: "2024-01-19",
      time: "11:30",
    },
    rating: 4.7,
    students: 33,
    color: "from-red-500 to-red-600",
    description:
      "Perfectionnement de l'anglais avec focus sur la communication orale et écrite avancée.",
  },
  {
    id: "6",
    title: "Sciences de la Vie et de la Terre",
    teacher: "Prof. Mamadou Baldé",
    subject: "Sciences",
    progress: 55,
    totalLessons: 25,
    completedLessons: 14,
    nextLesson: {
      title: "Génétique et hérédité",
      date: "2024-01-20",
      time: "09:00",
    },
    rating: 4.5,
    students: 29,
    color: "from-teal-500 to-teal-600",
    description:
      "Exploration du vivant : biologie cellulaire, génétique, écologie et évolution.",
  },
];

export default function StudentCoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("Tous");

  const subjects = [
    "Tous",
    "Mathématiques",
    "Sciences",
    "Lettres",
    "Sciences Humaines",
    "Langues",
  ];

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject =
      selectedSubject === "Tous" || course.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

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
              <BookOpen className="w-7 h-7 text-[#1d8b93]" />
              📘 Mes Cours
            </h1>
            <p className="text-white/70">
              Suivez votre progression et accédez à tous vos cours.
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-white/60 text-sm">Cours actifs</p>
            <p className="text-3xl font-bold text-[#1d8b93]">
              {filteredCourses.length}
            </p>
            <p className="text-white/60 text-sm">
              sur {mockCourses.length} total
            </p>
          </div>
        </div>
      </motion.div>

      {/* Filtres et recherche */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4"
      >
        {/* Recherche */}
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher un cours ou un professeur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#1d8b93]/50"
          />
        </div>

        {/* Filtre par matière */}
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#1d8b93]/50"
        >
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Grille des cours */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 overflow-hidden cursor-pointer hover:scale-[1.02]"
            onClick={() => setSelectedCourse(course)}
          >
            {/* Header avec gradient */}
            <div
              className={cn(
                "h-32 bg-gradient-to-br",
                course.color,
                "relative overflow-hidden"
              )}
            >
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-4 left-4 right-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-white/80 text-sm">{course.teacher}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                    <Star className="w-3 h-3 text-yellow-300 fill-current" />
                    <span className="text-white text-xs font-medium">
                      {course.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenu */}
            <div className="p-6">
              {/* Progression */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">
                    Progression
                  </span>
                  <span className="text-sm text-white/70">
                    {course.completedLessons}/{course.totalLessons} leçons
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    className={cn(
                      "h-2 rounded-full bg-gradient-to-r",
                      course.color
                    )}
                  />
                </div>
                <div className="text-right mt-1">
                  <span className="text-sm font-semibold text-white">
                    {course.progress}%
                  </span>
                </div>
              </div>

              {/* Prochaine leçon */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Play className="w-4 h-4 text-[#b8d070]" />
                  <span className="text-sm font-medium text-white">
                    Prochaine leçon
                  </span>
                </div>
                <p className="text-sm text-white/80 mb-2">
                  {course.nextLesson.title}
                </p>
                <div className="flex items-center gap-4 text-xs text-white/60">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(course.nextLesson.date).toLocaleDateString(
                      "fr-FR"
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.nextLesson.time}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-white/70">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {course.students} étudiants
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {course.subject}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal de détail du cours */}
      {selectedCourse && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCourse(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-[#0a0f1c]/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className={cn(
                "h-48 bg-gradient-to-br",
                selectedCourse.color,
                "relative overflow-hidden"
              )}
            >
              <div className="absolute inset-0 bg-black/20"></div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-white font-bold text-2xl mb-2">
                  {selectedCourse.title}
                </h2>
                <p className="text-white/90 text-lg">
                  {selectedCourse.teacher}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <Star className="w-4 h-4 text-yellow-300 fill-current" />
                    <span className="text-white font-medium">
                      {selectedCourse.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <Users className="w-4 h-4 text-white" />
                    <span className="text-white font-medium">
                      {selectedCourse.students} étudiants
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenu */}
            <div className="p-6">
              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Description du cours
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {selectedCourse.description}
                </p>
              </div>

              {/* Progression détaillée */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Progression
                </h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-white">
                      {selectedCourse.completedLessons} sur{" "}
                      {selectedCourse.totalLessons} leçons terminées
                    </span>
                    <span className="text-lg font-bold text-[#b8d070]">
                      {selectedCourse.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div
                      className={cn(
                        "h-3 rounded-full bg-gradient-to-r",
                        selectedCourse.color
                      )}
                      style={{ width: `${selectedCourse.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Prochaine leçon */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Prochaine leçon
                </h3>
                <div className="border border-white/20 rounded-xl p-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl bg-gradient-to-br",
                        selectedCourse.color,
                        "flex items-center justify-center flex-shrink-0"
                      )}
                    >
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-2">
                        {selectedCourse.nextLesson.title}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-white/70">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(
                            selectedCourse.nextLesson.date
                          ).toLocaleDateString("fr-FR", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {selectedCourse.nextLesson.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex-1 bg-gradient-to-r",
                    selectedCourse.color,
                    "text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  )}
                >
                  <Play className="w-5 h-5" />
                  Continuer le cours
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Ressources
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
