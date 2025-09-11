"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  Calendar,
  BarChart3,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  Settings,
  Bell,
  Star,
  TrendingUp,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  GraduationCap,
  Award,
  Target,
  Zap,
  Shield,
  Heart,
  Sparkles,
} from "lucide-react";

interface Class {
  id: string;
  name: string;
  level: number;
  students: number;
  teacher: string;
  room: string;
  status: "active" | "inactive" | "maintenance";
  performance: number;
  lastActivity: string;
  color: string;
  subjects: string[];
  nextClass: string;
  attendance: number;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  href: string;
}

const ClassPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const classes: Class[] = [
    {
      id: "1",
      name: "1ère Année",
      level: 1,
      students: 24,
      teacher: "Mme. Dubois",
      room: "Salle 101",
      status: "active",
      performance: 92,
      lastActivity: "Il y a 2h",
      color: "from-pink-500 to-rose-500",
      subjects: ["Français", "Mathématiques", "Éveil"],
      nextClass: "Français - 14h00",
      attendance: 96,
    },
    {
      id: "2",
      name: "2ème Année",
      level: 2,
      students: 26,
      teacher: "M. Leroy",
      room: "Salle 102",
      status: "active",
      performance: 88,
      lastActivity: "Il y a 1h",
      color: "from-blue-500 to-cyan-500",
      subjects: ["Français", "Mathématiques", "Éveil", "Arts"],
      nextClass: "Mathématiques - 15h30",
      attendance: 94,
    },
    {
      id: "3",
      name: "3ème Année",
      level: 3,
      students: 28,
      teacher: "Mme. Martin",
      room: "Salle 103",
      status: "active",
      performance: 95,
      lastActivity: "Maintenant",
      color: "from-green-500 to-emerald-500",
      subjects: ["Français", "Mathématiques", "Éveil", "Arts", "Sport"],
      nextClass: "Éveil - 16h00",
      attendance: 98,
    },
    {
      id: "4",
      name: "4ème Année",
      level: 4,
      students: 25,
      teacher: "M. Bernard",
      room: "Salle 104",
      status: "active",
      performance: 90,
      lastActivity: "Il y a 30min",
      color: "from-purple-500 to-violet-500",
      subjects: [
        "Français",
        "Mathématiques",
        "Sciences",
        "Histoire",
        "Anglais",
      ],
      nextClass: "Sciences - 14h30",
      attendance: 97,
    },
    {
      id: "5",
      name: "5ème Année",
      level: 5,
      students: 27,
      teacher: "Mme. Petit",
      room: "Salle 105",
      status: "active",
      performance: 87,
      lastActivity: "Il y a 45min",
      color: "from-orange-500 to-amber-500",
      subjects: [
        "Français",
        "Mathématiques",
        "Sciences",
        "Histoire",
        "Anglais",
        "Géographie",
      ],
      nextClass: "Histoire - 15h00",
      attendance: 93,
    },
    {
      id: "6",
      name: "6ème Année",
      level: 6,
      students: 29,
      teacher: "M. Moreau",
      room: "Salle 106",
      status: "active",
      performance: 91,
      lastActivity: "Il y a 1h30",
      color: "from-indigo-500 to-blue-500",
      subjects: [
        "Français",
        "Mathématiques",
        "Sciences",
        "Histoire",
        "Anglais",
        "Géographie",
        "Technologie",
      ],
      nextClass: "Anglais - 16h30",
      attendance: 95,
    },
  ];

  const quickActions: QuickAction[] = [
    {
      id: "1",
      title: "Nouvelle classe",
      description: "Créer une nouvelle classe",
      icon: <Plus className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      href: "/admin/education/primary/new",
    },
    {
      id: "2",
      title: "Importer élèves",
      description: "Importer une liste d'élèves",
      icon: <Upload className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      href: "/admin/education/primary/import",
    },
    {
      id: "3",
      title: "Rapports",
      description: "Générer des rapports",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "from-purple-500 to-violet-500",
      href: "/admin/education/primary/reports",
    },
    {
      id: "4",
      title: "Paramètres",
      description: "Configuration du primaire",
      icon: <Settings className="w-6 h-6" />,
      color: "from-gray-500 to-slate-500",
      href: "/admin/education/primary/settings",
    },
  ];

  const filteredClasses = classes.filter((cls) => {
    const matchesSearch = cls.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || cls.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalStudents = classes.reduce((sum, cls) => sum + cls.students, 0);
  const averagePerformance = Math.round(
    classes.reduce((sum, cls) => sum + cls.performance, 0) / classes.length
  );
  const averageAttendance = Math.round(
    classes.reduce((sum, cls) => sum + cls.attendance, 0) / classes.length
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Primaire
              </h1>
              <p className="text-gray-600 text-lg">
                Gestion des classes du primaire
              </p>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Total Classes
                  </p>
                  <p className="text-3xl font-bold text-[#1d8b93]">
                    {classes.length}
                  </p>
                </div>
                <BookOpen className="w-8 h-8 text-[#1d8b93]" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Total Élèves
                  </p>
                  <p className="text-3xl font-bold text-[#1d8b93]">
                    {totalStudents}
                  </p>
                </div>
                <Users className="w-8 h-8 text-[#1d8b93]" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Performance
                  </p>
                  <p className="text-3xl font-bold text-[#1d8b93]">
                    {averagePerformance}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-[#1d8b93]" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Présence</p>
                  <p className="text-3xl font-bold text-[#1d8b93]">
                    {averageAttendance}%
                  </p>
                </div>
                <Clock className="w-8 h-8 text-[#1d8b93]" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Actions rapides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.id}
                className="bg-white rounded-lg p-6 border border-gray-200 hover:border-[#1d8b93] transition-all duration-200 text-left group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#1d8b93] flex items-center justify-center mb-4 group-hover:bg-[#0d5a61] transition-colors">
                  {action.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {action.title}
                </h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher une classe..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d8b93] focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d8b93]"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
                <option value="maintenance">Maintenance</option>
              </select>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <BarChart3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Users className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Classes Grid/List */}
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {filteredClasses.map((cls, index) => (
            <div
              key={cls.id}
              className="bg-white rounded-lg p-6 border border-gray-200 hover:border-[#1d8b93] transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-[#1d8b93] flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {cls.level}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#1d8b93] transition-colors">
                      {cls.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{cls.teacher}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      cls.status === "active"
                        ? "bg-green-100 text-green-800"
                        : cls.status === "inactive"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {cls.status === "active"
                      ? "Actif"
                      : cls.status === "inactive"
                      ? "Inactif"
                      : "Maintenance"}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 text-sm">
                      {cls.students} élèves
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 text-sm">{cls.room}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 text-sm">
                      Performance: {cls.performance}%
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 text-sm">
                      Présence: {cls.attendance}%
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <p className="text-gray-600 text-sm mb-1">
                    Prochaine classe:
                  </p>
                  <p className="text-gray-900 font-medium text-sm">
                    {cls.nextClass}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3">
                  <div className="flex space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Download className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  <span className="text-gray-400 text-xs">
                    {cls.lastActivity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassPage;
