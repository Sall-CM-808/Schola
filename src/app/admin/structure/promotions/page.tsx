"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  GraduationCap,
  BookOpen,
  Award,
  TrendingUp,
  Calendar,
  MapPin,
  Plus,
  Search,
  Filter,
  Grid,
  List,
  X,
  BarChart3,
  Clock,
  FileText,
  CheckSquare,
  UserPlus,
  Settings,
  Download,
  Upload,
  Calculator,
  AlertCircle,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  ChevronRight,
  Home,
  School,
  Crown,
  Star,
  Target,
} from "lucide-react";

interface Promotion {
  id: string;
  name: string;
  code: string;
  description: string;
  students: number;
  faculty: number;
  established: string;
  graduationYear: string;
  status: "active" | "graduated" | "pending";
  color: string;
  icon: React.ReactNode;
  level: string;
  department: string;
  averageGrade: number;
  successRate: number;
  topStudent: string;
}

interface PromotionStats {
  totalPromotions: number;
  activePromotions: number;
  graduatedPromotions: number;
  totalStudents: number;
  averageSuccessRate: number;
  topPerformingPromotion: string;
}

const promotionsData: Promotion[] = [
  {
    id: "1",
    name: "Promotion 2024 - L1 Info",
    code: "PROM-2024-L1-INFO",
    description: "Promotion 2024 de Licence 1 Informatique",
    students: 45,
    faculty: 8,
    established: "2024-09-01",
    graduationYear: "2027",
    status: "active",
    color: "from-blue-500 to-blue-600",
    icon: <GraduationCap className="w-6 h-6" />,
    level: "Licence 1",
    department: "Département d'Informatique",
    averageGrade: 14.2,
    successRate: 92.5,
    topStudent: "Alice Martin",
  },
  {
    id: "2",
    name: "Promotion 2023 - M1 GL",
    code: "PROM-2023-M1-GL",
    description: "Promotion 2023 de Master 1 Génie Logiciel",
    students: 28,
    faculty: 6,
    established: "2023-09-01",
    graduationYear: "2025",
    status: "active",
    color: "from-purple-500 to-purple-600",
    icon: <Award className="w-6 h-6" />,
    level: "Master 1",
    department: "Département d'Informatique",
    averageGrade: 15.8,
    successRate: 96.4,
    topStudent: "Bob Dupont",
  },
  {
    id: "3",
    name: "Promotion 2022 - L3 Math",
    code: "PROM-2022-L3-MATH",
    description: "Promotion 2022 de Licence 3 Mathématiques",
    students: 32,
    faculty: 5,
    established: "2022-09-01",
    graduationYear: "2023",
    status: "graduated",
    color: "from-green-500 to-green-600",
    icon: <BookOpen className="w-6 h-6" />,
    level: "Licence 3",
    department: "Département de Mathématiques",
    averageGrade: 16.1,
    successRate: 98.1,
    topStudent: "Claire Bernard",
  },
  {
    id: "4",
    name: "Promotion 2021 - D Physique",
    code: "PROM-2021-D-PHYS",
    description: "Promotion 2021 de Doctorat Physique",
    students: 15,
    faculty: 12,
    established: "2021-09-01",
    graduationYear: "2024",
    status: "graduated",
    color: "from-red-500 to-red-600",
    icon: <Award className="w-6 h-6" />,
    level: "Doctorat",
    department: "Département de Physique",
    averageGrade: 17.3,
    successRate: 100,
    topStudent: "David Leroy",
  },
  {
    id: "5",
    name: "Promotion 2024 - L2 Bio",
    code: "PROM-2024-L2-BIO",
    description: "Promotion 2024 de Licence 2 Biologie",
    students: 38,
    faculty: 7,
    established: "2024-09-01",
    graduationYear: "2026",
    status: "active",
    color: "from-emerald-500 to-emerald-600",
    icon: <GraduationCap className="w-6 h-6" />,
    level: "Licence 2",
    department: "Département de Biologie",
    averageGrade: 13.9,
    successRate: 89.5,
    topStudent: "Emma Rousseau",
  },
  {
    id: "6",
    name: "Promotion 2020 - L3 Info",
    code: "PROM-2020-L3-INFO",
    description: "Promotion 2020 de Licence 3 Informatique",
    students: 42,
    faculty: 9,
    established: "2020-09-01",
    graduationYear: "2021",
    status: "graduated",
    color: "from-indigo-500 to-indigo-600",
    icon: <Crown className="w-6 h-6" />,
    level: "Licence 3",
    department: "Département d'Informatique",
    averageGrade: 15.7,
    successRate: 97.6,
    topStudent: "François Moreau",
  },
];

const PromotionCard: React.FC<{ promotion: Promotion; index: number }> = ({
  promotion,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-3 rounded-xl bg-gradient-to-r ${promotion.color} text-white`}
        >
          {promotion.icon}
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              promotion.status === "active"
                ? "bg-green-100 text-green-800"
                : promotion.status === "graduated"
                ? "bg-blue-100 text-blue-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {promotion.status === "active"
              ? "Active"
              : promotion.status === "graduated"
              ? "Diplômée"
              : "En attente"}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
          {promotion.name}
        </h3>
        <p className="text-white/70 text-sm mb-2">{promotion.description}</p>
        <div className="flex items-center text-white/60 text-sm mb-1">
          <Calendar className="w-4 h-4 mr-2" />
          Année d'entrée: {promotion.established.split("-")[0]}
        </div>
        <div className="flex items-center text-white/60 text-sm">
          <Award className="w-4 h-4 mr-2" />
          Année de sortie: {promotion.graduationYear}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">
            {promotion.students}
          </div>
          <div className="text-white/60 text-sm">Étudiants</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">
            {promotion.successRate}%
          </div>
          <div className="text-white/60 text-sm">Réussite</div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Moyenne générale:</span>
          <span className="text-white font-semibold">
            {promotion.averageGrade}/20
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Meilleur étudiant:</span>
          <span className="text-white font-semibold">
            {promotion.topStudent}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-white/60 text-sm">
          {promotion.level} • {promotion.department}
        </div>
        <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
      </div>
    </motion.div>
  );
};

const PromotionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterLevel, setFilterLevel] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(
    null
  );

  const filteredPromotions = promotionsData.filter((promotion) => {
    const matchesSearch =
      promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotion.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotion.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || promotion.status === filterStatus;
    const matchesLevel =
      filterLevel === "all" ||
      promotion.level.toLowerCase().includes(filterLevel.toLowerCase());
    return matchesSearch && matchesStatus && matchesLevel;
  });

  const stats: PromotionStats = {
    totalPromotions: promotionsData.length,
    activePromotions: promotionsData.filter((p) => p.status === "active")
      .length,
    graduatedPromotions: promotionsData.filter((p) => p.status === "graduated")
      .length,
    totalStudents: promotionsData.reduce((sum, p) => sum + p.students, 0),
    averageSuccessRate:
      Math.round(
        (promotionsData.reduce((sum, p) => sum + p.successRate, 0) /
          promotionsData.length) *
          10
      ) / 10,
    topPerformingPromotion: promotionsData.reduce((top, p) =>
      p.successRate > top.successRate ? p : top
    ).name,
  };

  const levels = [...new Set(promotionsData.map((p) => p.level))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1d8b93] to-[#0d5a61] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-2 text-white/60 mb-2">
            <Home className="w-4 h-4" />
            <span>Admin</span>
            <ChevronRight className="w-4 h-4" />
            <School className="w-4 h-4" />
            <span>Structure</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Promotions</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Gestion des Promotions
          </h1>
          <p className="text-white/70">
            Gérez les promotions d'étudiants et leurs performances
          </p>
        </motion.div>

        {/* Global Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Promotions</p>
                <p className="text-3xl font-bold text-white">
                  {stats.totalPromotions}
                </p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Crown className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Promotions Actives</p>
                <p className="text-3xl font-bold text-white">
                  {stats.activePromotions}
                </p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Étudiants</p>
                <p className="text-3xl font-bold text-white">
                  {stats.totalStudents}
                </p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Taux de Réussite Moyen</p>
                <p className="text-3xl font-bold text-white">
                  {stats.averageSuccessRate}%
                </p>
              </div>
              <div className="p-3 bg-orange-500/20 rounded-xl">
                <Target className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top Performing Promotion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30 mb-8"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                Meilleure Performance
              </h3>
              <p className="text-white/70">{stats.topPerformingPromotion}</p>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher une promotion..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all" className="bg-gray-800">
                  Tous les statuts
                </option>
                <option value="active" className="bg-gray-800">
                  Active
                </option>
                <option value="graduated" className="bg-gray-800">
                  Diplômée
                </option>
                <option value="pending" className="bg-gray-800">
                  En attente
                </option>
              </select>
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all" className="bg-gray-800">
                  Tous les niveaux
                </option>
                {levels.map((level) => (
                  <option key={level} value={level} className="bg-gray-800">
                    {level}
                  </option>
                ))}
              </select>
              <div className="flex bg-white/20 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-white/30 text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-white/30 text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Promotions Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {filteredPromotions.map((promotion, index) => (
            <div
              key={promotion.id}
              onClick={() => setSelectedPromotion(promotion)}
            >
              <PromotionCard promotion={promotion} index={index} />
            </div>
          ))}
        </motion.div>

        {/* Add Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="w-6 h-6" />
        </motion.button>

        {/* Detail Modal */}
        {selectedPromotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedPromotion(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 w-full max-w-4xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedPromotion.name}
                    </h2>
                    <p className="text-white/70">
                      {selectedPromotion.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-white/60 text-sm">
                      <span>
                        Année d'entrée:{" "}
                        {selectedPromotion.established.split("-")[0]}
                      </span>
                      <span>•</span>
                      <span>
                        Année de sortie: {selectedPromotion.graduationYear}
                      </span>
                      <span>•</span>
                      <span>{selectedPromotion.students} étudiants</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPromotion(null)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-white/60" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">
                      Statistiques Générales
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/60">
                          Nombre d'étudiants:
                        </span>
                        <span className="text-white font-semibold">
                          {selectedPromotion.students}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">
                          Nombre d'enseignants:
                        </span>
                        <span className="text-white font-semibold">
                          {selectedPromotion.faculty}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Moyenne générale:</span>
                        <span className="text-white font-semibold">
                          {selectedPromotion.averageGrade}/20
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Taux de réussite:</span>
                        <span className="text-white font-semibold">
                          {selectedPromotion.successRate}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">
                      Informations Académiques
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/60">Niveau:</span>
                        <span className="text-white font-semibold">
                          {selectedPromotion.level}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Département:</span>
                        <span className="text-white font-semibold">
                          {selectedPromotion.department}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">
                          Meilleur étudiant:
                        </span>
                        <span className="text-white font-semibold">
                          {selectedPromotion.topStudent}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Statut:</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            selectedPromotion.status === "active"
                              ? "bg-green-100 text-green-800"
                              : selectedPromotion.status === "graduated"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {selectedPromotion.status === "active"
                            ? "Active"
                            : selectedPromotion.status === "graduated"
                            ? "Diplômée"
                            : "En attente"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>Voir les détails</span>
                  </button>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <Edit className="w-4 h-4" />
                    <span>Modifier</span>
                  </button>
                  <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Exporter</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PromotionsPage;
