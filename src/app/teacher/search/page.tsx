"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdvancedDataTable from "@/components/admin_dashboard/AdvancedDataTable";
import { getTeacherElements } from "@/lib/mocks/teacherElements";
import { getTeacherClasses } from "@/lib/mocks/teacherClasses";
import { getTeacherAssignments } from "@/lib/mocks/teacherAssignments";
import {
  Search,
  FileText,
  Users,
  Shield,
  BookOpen,
  GraduationCap,
  Clock,
  Filter,
  Zap,
} from "lucide-react";

type SearchTab = "elements" | "classes" | "assignments";

const TeacherSearchPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<SearchTab>("elements");
  const [searchTerm, setSearchTerm] = useState("");
  const [allData, setAllData] = useState<{
    elements: any[];
    classes: any[];
    assignments: any[];
  }>({
    elements: [],
    classes: [],
    assignments: [],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [elements, classes, assignments] = await Promise.all([
          getTeacherElements(),
          getTeacherClasses(),
          getTeacherAssignments(),
        ]);

        setAllData({
          elements,
          classes,
          assignments,
        });
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const tabs = [
    {
      id: "elements" as SearchTab,
      label: "Éléments",
      icon: FileText,
      count: allData.elements.length,
      color: "blue",
    },
    {
      id: "classes" as SearchTab,
      label: "Classes",
      icon: Users,
      count: allData.classes.length,
      color: "green",
    },
    {
      id: "assignments" as SearchTab,
      label: "Attributions",
      icon: Shield,
      count: allData.assignments.length,
      color: "purple",
    },
  ];

  const getFilteredData = () => {
    const data = allData[activeTab];
    if (!searchTerm) return data;

    return data.filter((item: any) => {
      const searchFields = getSearchFields(item);
      return searchFields.some((field) =>
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  const getSearchFields = (item: any) => {
    switch (activeTab) {
      case "elements":
        return [
          item.title,
          item.description,
          item.unitName,
          item.type,
          item.status,
        ];
      case "classes":
        return [item.className, item.description, item.level, item.semester];
      case "assignments":
        return [item.roleName, item.scopeName, item.description, item.status];
      default:
        return [];
    }
  };

  const getColumns = () => {
    switch (activeTab) {
      case "elements":
        return [
          {
            key: "title",
            header: "Titre",
            render: (element: any) => (
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-300">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium text-white">{element.title}</div>
                  <div className="text-sm text-white/60">{element.type}</div>
                </div>
              </div>
            ),
          },
          {
            key: "status",
            header: "Statut",
            render: (element: any) => (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                {element.status}
              </span>
            ),
          },
          { key: "unitName", header: "Unité" },
          { key: "updatedAt", header: "Modifié le" },
        ];

      case "classes":
        return [
          {
            key: "className",
            header: "Classe",
            render: (classItem: any) => (
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/20 text-green-300">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium text-white">
                    {classItem.className}
                  </div>
                  <div className="text-sm text-white/60">{classItem.level}</div>
                </div>
              </div>
            ),
          },
          {
            key: "studentsCount",
            header: "Étudiants",
            render: (classItem: any) => (
              <div className="text-center">
                <div className="font-bold text-white">
                  {classItem.studentsCount}
                </div>
              </div>
            ),
          },
          {
            key: "averageGrade",
            header: "Moyenne",
            render: (classItem: any) => (
              <div className="text-center">
                <div className="font-bold text-white">
                  {classItem.averageGrade}/20
                </div>
              </div>
            ),
          },
          { key: "semester", header: "Semestre" },
        ];

      case "assignments":
        return [
          {
            key: "roleName",
            header: "Rôle",
            render: (assignment: any) => (
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium text-white">
                    {assignment.roleName}
                  </div>
                  <div className="text-sm text-white/60">
                    {assignment.scopeType}
                  </div>
                </div>
              </div>
            ),
          },
          { key: "scopeName", header: "Portée" },
          {
            key: "status",
            header: "Statut",
            render: (assignment: any) => (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                {assignment.status}
              </span>
            ),
          },
          { key: "startDate", header: "Date début" },
        ];

      default:
        return [];
    }
  };

  const filteredData = getFilteredData();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="h-8 bg-white/20 rounded w-64 animate-pulse"></div>
        <div className="bg-white/5 rounded-xl p-6 animate-pulse">
          <div className="h-96 bg-white/20 rounded"></div>
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
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Recherche transversale
        </h1>
        <p className="text-white/70">
          Recherchez dans tous vos contenus pédagogiques
        </p>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
      >
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher dans vos éléments, classes et attributions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent text-lg"
          />
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-2"
      >
        <div className="flex space-x-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-lg text-sm font-medium transition-all duration-200 flex-1 ${
                  isActive
                    ? "bg-[#b8d070] text-[#1d8b93] shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold ${
                    isActive
                      ? "bg-[#1d8b93]/20 text-[#1d8b93]"
                      : "bg-white/20 text-white/60"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Results */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {searchTerm && (
            <div className="mb-4 text-white/70">
              <span className="font-medium">{filteredData.length}</span>{" "}
              résultat
              {filteredData.length !== 1 ? "s" : ""} trouvé
              {filteredData.length !== 1 ? "s" : ""} pour "
              <span className="text-[#b8d070] font-medium">{searchTerm}</span>"
            </div>
          )}

          <AdvancedDataTable
            columns={getColumns()}
            rows={filteredData}
            emptyMessage={
              searchTerm
                ? `Aucun résultat trouvé pour "${searchTerm}"`
                : `Aucun ${
                    activeTab === "elements"
                      ? "élément"
                      : activeTab === "classes"
                      ? "classe"
                      : "attribution"
                  } disponible`
            }
            pageSize={10}
          />
        </motion.div>
      </AnimatePresence>

      {/* Quick Stats */}
      {!searchTerm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <div
                key={tab.id}
                className={`bg-gradient-to-br from-${tab.color}-500/20 to-${tab.color}-600/20 backdrop-blur-sm rounded-xl border border-${tab.color}-500/30 p-6 relative overflow-hidden`}
              >
                <div className="absolute top-2 right-2">
                  <Icon
                    className={`w-5 h-5 text-${tab.color}-400 opacity-50`}
                  />
                </div>
                <div
                  className={`text-${tab.color}-300 text-sm font-medium mb-2`}
                >
                  {tab.label}
                </div>
                <div className="text-3xl font-bold text-white">{tab.count}</div>
                <div className="text-xs text-white/60 mt-1">
                  {tab.id === "elements" && "Cours, devoirs, ressources"}
                  {tab.id === "classes" && "Groupes d'étudiants"}
                  {tab.id === "assignments" && "Rôles et responsabilités"}
                </div>
              </div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
};

export default TeacherSearchPage;
