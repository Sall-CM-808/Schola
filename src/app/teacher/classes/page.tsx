"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClassDetailDrawer from "@/components/teacher_dashboard/ClassDetailDrawer";
import {
  getTeacherClasses,
  getClassDetail,
  type ClassRow,
  type ClassDetail,
} from "@/lib/mocks/teacherClasses";
import {
  Users,
  Calendar,
  TrendingUp,
  UserCheck,
  Clock,
  MapPin,
  Grid3X3,
  List,
  Filter,
  Search,
  GraduationCap,
  Star,
  Zap,
  BookOpen,
} from "lucide-react";

const TeacherClassesPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [classes, setClasses] = useState<ClassRow[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<ClassRow[]>([]);
  const [selectedClass, setSelectedClass] = useState<ClassDetail | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerLoading, setIsDrawerLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getTeacherClasses();
        setClasses(data);
        setFilteredClasses(data);
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = classes;

    if (searchTerm) {
      filtered = filtered.filter((cls) =>
        cls.className.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (levelFilter !== "all") {
      filtered = filtered.filter((cls) => cls.level === levelFilter);
    }

    setFilteredClasses(filtered);
  }, [classes, searchTerm, levelFilter]);

  const handleClassClick = async (classId: string) => {
    setIsDrawerLoading(true);
    setIsDrawerOpen(true);

    try {
      const detail = await getClassDetail(classId);
      setSelectedClass(detail);
    } catch (error) {
      console.error("Erreur lors du chargement des détails:", error);
    } finally {
      setIsDrawerLoading(false);
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "course":
        return "bg-blue-500/20 text-blue-300";
      case "td":
        return "bg-green-500/20 text-green-300";
      case "exam":
        return "bg-red-500/20 text-red-300";
      case "meeting":
        return "bg-purple-500/20 text-purple-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 16) return "text-green-300";
    if (grade >= 14) return "text-blue-300";
    if (grade >= 12) return "text-orange-300";
    return "text-red-300";
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "L1":
        return <Star className="w-4 h-4" />;
      case "L2":
        return <BookOpen className="w-4 h-4" />;
      case "L3":
        return <GraduationCap className="w-4 h-4" />;
      case "M1":
        return <Zap className="w-4 h-4" />;
      case "Prépa":
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const stats = {
    total: classes.length,
    totalStudents: classes.reduce((sum, cls) => sum + cls.studentsCount, 0),
    averageGrade:
      classes.reduce((sum, cls) => sum + cls.averageGrade, 0) / classes.length,
    averageAttendance:
      classes.reduce((sum, cls) => sum + cls.attendanceRate, 0) /
      classes.length,
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="h-8 bg-white/20 rounded w-64 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-6 animate-pulse">
              <div className="h-6 bg-white/20 rounded w-16 mb-4"></div>
              <div className="h-8 bg-white/20 rounded w-12"></div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white/5 rounded-xl p-6 h-64 animate-pulse"
            >
              <div className="h-6 bg-white/20 rounded w-32 mb-4"></div>
              <div className="h-4 bg-white/20 rounded w-20 mb-6"></div>
              <div className="space-y-2">
                <div className="h-4 bg-white/20 rounded w-full"></div>
                <div className="h-4 bg-white/20 rounded w-3/4"></div>
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
            Mes classes & groupes
          </h1>
          <p className="text-white/70">
            Gérez vos classes et suivez les performances de vos étudiants
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setViewMode("cards")}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === "cards"
                  ? "bg-[#b8d070] text-[#1d8b93]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === "list"
                  ? "bg-[#b8d070] text-[#1d8b93]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6 relative overflow-hidden"
        >
          <div className="absolute top-2 right-2">
            <GraduationCap className="w-5 h-5 text-blue-400 opacity-50" />
          </div>
          <div className="text-blue-300 text-sm font-medium mb-2">
            Classes totales
          </div>
          <div className="text-3xl font-bold text-white">{stats.total}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-xl border border-green-500/30 p-6 relative overflow-hidden"
        >
          <div className="absolute top-2 right-2">
            <Users className="w-5 h-5 text-green-400 opacity-50" />
          </div>
          <div className="text-green-300 text-sm font-medium mb-2">
            Étudiants totaux
          </div>
          <div className="text-3xl font-bold text-white">
            {stats.totalStudents}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6 relative overflow-hidden"
        >
          <div className="absolute top-2 right-2">
            <TrendingUp className="w-5 h-5 text-purple-400 opacity-50" />
          </div>
          <div className="text-purple-300 text-sm font-medium mb-2">
            Moyenne générale
          </div>
          <div className="text-3xl font-bold text-white">
            {stats.averageGrade.toFixed(1)}/20
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm rounded-xl border border-orange-500/30 p-6 relative overflow-hidden"
        >
          <div className="absolute top-2 right-2">
            <UserCheck className="w-5 h-5 text-orange-400 opacity-50" />
          </div>
          <div className="text-orange-300 text-sm font-medium mb-2">
            Taux présence
          </div>
          <div className="text-3xl font-bold text-white">
            {stats.averageAttendance.toFixed(0)}%
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
      >
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-white/70">
            <Filter className="w-4 h-4" />
            <span className="font-medium">Filtres</span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher une classe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent"
            />
          </div>

          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent"
          >
            <option value="all">Tous les niveaux</option>
            <option value="L1">L1</option>
            <option value="L2">L2</option>
            <option value="L3">L3</option>
            <option value="M1">M1</option>
            <option value="Prépa">Prépa</option>
          </select>

          <div className="ml-auto text-sm text-white/60">
            {filteredClasses.length} classe
            {filteredClasses.length !== 1 ? "s" : ""}
          </div>
        </div>
      </motion.div>

      {/* Classes Grid/List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {viewMode === "cards" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((classItem, index) => (
              <motion.div
                key={classItem.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 cursor-pointer hover:bg-white/10 transition-all duration-300 relative overflow-hidden group"
                onClick={() => handleClassClick(classItem.id)}
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#b8d070]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-[#b8d070]/20 text-[#b8d070]">
                        {getLevelIcon(classItem.level)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-lg">
                          {classItem.className}
                        </h3>
                        <p className="text-white/60 text-sm">
                          {classItem.level} • {classItem.semester}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-white/70 text-sm mb-4 line-clamp-2">
                    {classItem.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {classItem.studentsCount}
                      </div>
                      <div className="text-xs text-white/60">Étudiants</div>
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-2xl font-bold ${getGradeColor(
                          classItem.averageGrade
                        )}`}
                      >
                        {classItem.averageGrade}/20
                      </div>
                      <div className="text-xs text-white/60">Moyenne</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-white/60">
                      <UserCheck className="w-3 h-3" />
                      <span className="text-xs">
                        {classItem.attendanceRate}% présence
                      </span>
                    </div>

                    {classItem.nextEvent && (
                      <div className="flex items-center gap-1 text-white/60">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs">
                          {new Date(
                            classItem.nextEvent.date
                          ).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                    )}
                  </div>

                  {classItem.nextEvent && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-white">
                            Prochain cours
                          </div>
                          <div className="text-xs text-white/60">
                            {classItem.nextEvent.title}
                          </div>
                        </div>
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(
                            classItem.nextEvent.type
                          )}`}
                        >
                          {classItem.nextEvent.time}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Liste des classes
              </h3>
            </div>
            <div className="divide-y divide-white/10">
              {filteredClasses.map((classItem, index) => (
                <motion.div
                  key={classItem.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 hover:bg-white/5 cursor-pointer transition-colors duration-200"
                  onClick={() => handleClassClick(classItem.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-[#b8d070]/20 text-[#b8d070]">
                        {getLevelIcon(classItem.level)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">
                          {classItem.className}
                        </h4>
                        <p className="text-white/60 text-sm">
                          {classItem.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">
                          {classItem.studentsCount}
                        </div>
                        <div className="text-xs text-white/60">Étudiants</div>
                      </div>
                      <div className="text-center">
                        <div
                          className={`text-lg font-bold ${getGradeColor(
                            classItem.averageGrade
                          )}`}
                        >
                          {classItem.averageGrade}/20
                        </div>
                        <div className="text-xs text-white/60">Moyenne</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">
                          {classItem.attendanceRate}%
                        </div>
                        <div className="text-xs text-white/60">Présence</div>
                      </div>
                      {classItem.nextEvent && (
                        <div className="text-right">
                          <div className="text-sm font-medium text-white">
                            {classItem.nextEvent.title}
                          </div>
                          <div className="text-xs text-white/60">
                            {new Date(
                              classItem.nextEvent.date
                            ).toLocaleDateString("fr-FR")}{" "}
                            • {classItem.nextEvent.time}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Class Detail Drawer */}
      <ClassDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        classDetail={selectedClass}
        isLoading={isDrawerLoading}
      />
    </motion.div>
  );
};

export default TeacherClassesPage;
