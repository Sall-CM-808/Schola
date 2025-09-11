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

const MiddlePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const classes: Class[] = [
    {
      id: "7",
      name: "7ème Année",
      level: 7,
      students: 32,
      teacher: "Mme. Dubois",
      room: "Salle 201",
      status: "active",
      performance: 89,
      lastActivity: "Il y a 1h",
      color: "from-blue-500 to-cyan-500",
      subjects: [
        "Français",
        "Mathématiques",
        "Sciences",
        "Histoire",
        "Anglais",
      ],
      nextClass: "Sciences - 14h00",
      attendance: 94,
    },
    {
      id: "8",
      name: "8ème Année",
      level: 8,
      students: 30,
      teacher: "M. Leroy",
      room: "Salle 202",
      status: "active",
      performance: 92,
      lastActivity: "Il y a 30min",
      color: "from-green-500 to-emerald-500",
      subjects: [
        "Français",
        "Mathématiques",
        "Sciences",
        "Histoire",
        "Anglais",
        "Technologie",
      ],
      nextClass: "Mathématiques - 15h30",
      attendance: 96,
    },
    {
      id: "9",
      name: "9ème Année",
      level: 9,
      students: 28,
      teacher: "Mme. Martin",
      room: "Salle 203",
      status: "active",
      performance: 87,
      lastActivity: "Maintenant",
      color: "from-purple-500 to-violet-500",
      subjects: [
        "Français",
        "Mathématiques",
        "Sciences",
        "Histoire",
        "Anglais",
        "Technologie",
        "Arts",
      ],
      nextClass: "Histoire - 16h00",
      attendance: 93,
    },
    {
      id: "10",
      name: "10ème Année",
      level: 10,
      students: 26,
      teacher: "M. Bernard",
      room: "Salle 204",
      status: "active",
      performance: 94,
      lastActivity: "Il y a 45min",
      color: "from-orange-500 to-amber-500",
      subjects: [
        "Français",
        "Mathématiques",
        "Sciences",
        "Histoire",
        "Anglais",
        "Technologie",
        "Arts",
        "Musique",
      ],
      nextClass: "Anglais - 14h30",
      attendance: 97,
    },
  ];

  const quickActions: QuickAction[] = [
    {
      id: "1",
      title: "Nouvelle classe",
      description: "Créer une nouvelle classe",
      icon: <Plus className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      href: "/admin/education/middle/new",
    },
    {
      id: "2",
      title: "Importer élèves",
      description: "Importer une liste d'élèves",
      icon: <Upload className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      href: "/admin/education/middle/import",
    },
    {
      id: "3",
      title: "Rapports",
      description: "Générer des rapports",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "from-purple-500 to-violet-500",
      href: "/admin/education/middle/reports",
    },
    {
      id: "4",
      title: "Paramètres",
      description: "Configuration du collège",
      icon: <Settings className="w-6 h-6" />,
      color: "from-gray-500 to-slate-500",
      href: "/admin/education/middle/settings",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header moderne */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Collège
              </h1>
              <p className="text-slate-600 text-lg">
                Gestion des classes du collège (7ème à 10ème année)
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors">
                <Bell className="w-5 h-5 text-slate-600" />
              </button>
              <button className="p-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors">
                <Settings className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">
                    Total Classes
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    {classes.length}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-blue-100">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">
                    Total Élèves
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    {totalStudents}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-green-100">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">
                    Performance
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    {averagePerformance}%
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-purple-100">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Présence</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {averageAttendance}%
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-orange-100">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Actions rapides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <motion.button
                key={action.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 transition-all duration-200 text-left group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                >
                  {action.icon}
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  {action.title}
                </h3>
                <p className="text-slate-600 text-sm">{action.description}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher une classe..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
                <option value="maintenance">Maintenance</option>
              </select>
              <div className="flex bg-slate-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <BarChart3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
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
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 transition-all duration-200 shadow-sm hover:shadow-md group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${cls.color} flex items-center justify-center`}
                  >
                    <span className="text-white font-bold text-lg">
                      {cls.level}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {cls.name}
                    </h3>
                    <p className="text-slate-600 text-sm">{cls.teacher}</p>
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
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600 text-sm">
                      {cls.students} élèves
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600 text-sm">{cls.room}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600 text-sm">
                      Performance: {cls.performance}%
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600 text-sm">
                      Présence: {cls.attendance}%
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <p className="text-slate-600 text-sm mb-2">
                    Prochaine classe:
                  </p>
                  <p className="text-slate-900 font-medium">{cls.nextClass}</p>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="flex space-x-2">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-slate-400" />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-slate-400" />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <Download className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                  <span className="text-slate-400 text-xs">
                    {cls.lastActivity}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiddlePage;


