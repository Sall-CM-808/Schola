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
  Phone,
  Mail,
  Globe,
  ChevronRight,
  Plus,
  Search,
  Filter,
  Grid,
  List,
  X,
  BarChart3,
} from "lucide-react";

// Types pour les données de l'université
interface UniversityUnit {
  id: string;
  name: string;
  type: "faculty" | "department" | "program" | "institute" | "school";
  description: string;
  students: number;
  faculty: number;
  established: string;
  location: string;
  status: "active" | "inactive" | "pending";
  color: string;
  icon: React.ReactNode;
}

// Données mockées réalistes pour l'université
const universityData: UniversityUnit[] = [
  // FACULTÉS
  {
    id: "fac-sciences",
    name: "Faculté des Sciences et Technologies",
    type: "faculty",
    description:
      "Formation et recherche en sciences fondamentales, mathématiques, physique, chimie et sciences de la terre. Centre d'excellence pour l'innovation technologique.",
    students: 3247,
    faculty: 186,
    established: "1965",
    location: "Campus Principal - Bâtiment A & B",
    status: "active",
    color: "blue",
    icon: <Building2 className="w-6 h-6" />,
  },
  {
    id: "fac-medecine",
    name: "Faculté de Médecine et Pharmacie",
    type: "faculty",
    description:
      "Formation médicale, pharmaceutique et recherche en santé publique. Partenaire des hôpitaux universitaires et centres de recherche biomédicale.",
    students: 2156,
    faculty: 124,
    established: "1972",
    location: "Campus Santé - Complexe Médical",
    status: "active",
    color: "red",
    icon: <Award className="w-6 h-6" />,
  },
  {
    id: "fac-lettres",
    name: "Faculté des Lettres et Sciences Humaines",
    type: "faculty",
    description:
      "Formation en littérature, histoire, philosophie, langues et sciences sociales. Centre de recherche en humanités et patrimoine culturel.",
    students: 1892,
    faculty: 98,
    established: "1968",
    location: "Campus Central - Bâtiment C",
    status: "active",
    color: "purple",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    id: "fac-droit",
    name: "Faculté de Droit et Sciences Politiques",
    type: "faculty",
    description:
      "Formation juridique, sciences politiques et administration publique. Partenaire des institutions judiciaires et administratives.",
    students: 1456,
    faculty: 67,
    established: "1975",
    location: "Campus Central - Bâtiment D",
    status: "active",
    color: "indigo",
    icon: <Award className="w-6 h-6" />,
  },
  {
    id: "fac-economie",
    name: "Faculté d'Économie et Gestion",
    type: "faculty",
    description:
      "Formation en économie, gestion d'entreprise, comptabilité et finance. Centre de recherche en développement économique.",
    students: 2234,
    faculty: 89,
    established: "1980",
    location: "Campus Central - Bâtiment E",
    status: "active",
    color: "green",
    icon: <TrendingUp className="w-6 h-6" />,
  },

  // DÉPARTEMENTS
  {
    id: "dept-informatique",
    name: "Département d'Informatique",
    type: "department",
    description:
      "Sciences informatiques, intelligence artificielle, cybersécurité et développement logiciel. Laboratoire de recherche en IA et big data.",
    students: 1245,
    faculty: 67,
    established: "1985",
    location: "Faculté des Sciences - 3ème étage",
    status: "active",
    color: "purple",
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    id: "dept-mathematiques",
    name: "Département de Mathématiques",
    type: "department",
    description:
      "Mathématiques pures et appliquées, statistiques et probabilités. Centre de recherche en mathématiques financières.",
    students: 892,
    faculty: 45,
    established: "1978",
    location: "Faculté des Sciences - 2ème étage",
    status: "active",
    color: "blue",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    id: "dept-physique",
    name: "Département de Physique",
    type: "department",
    description:
      "Physique fondamentale, physique appliquée et nanotechnologies. Laboratoire de physique des matériaux.",
    students: 678,
    faculty: 34,
    established: "1970",
    location: "Faculté des Sciences - 1er étage",
    status: "active",
    color: "cyan",
    icon: <Award className="w-6 h-6" />,
  },
  {
    id: "dept-chimie",
    name: "Département de Chimie",
    type: "department",
    description:
      "Chimie organique, inorganique, analytique et chimie verte. Laboratoire de recherche en chimie des matériaux.",
    students: 456,
    faculty: 28,
    established: "1972",
    location: "Faculté des Sciences - Rez-de-chaussée",
    status: "active",
    color: "orange",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    id: "dept-biologie",
    name: "Département de Biologie",
    type: "department",
    description:
      "Biologie moléculaire, génétique, écologie et biotechnologies. Centre de recherche en biodiversité.",
    students: 789,
    faculty: 42,
    established: "1978",
    location: "Faculté des Sciences - 4ème étage",
    status: "active",
    color: "green",
    icon: <BookOpen className="w-6 h-6" />,
  },

  // PROGRAMMES
  {
    id: "lic-info",
    name: "Licence Informatique",
    type: "program",
    description:
      "Formation de base en sciences informatiques, programmation, bases de données et systèmes d'information.",
    students: 456,
    faculty: 23,
    established: "1990",
    location: "Département d'Informatique",
    status: "active",
    color: "indigo",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    id: "lic-mathematiques",
    name: "Licence Mathématiques",
    type: "program",
    description:
      "Formation en mathématiques pures et appliquées, statistiques et modélisation mathématique.",
    students: 234,
    faculty: 18,
    established: "1988",
    location: "Département de Mathématiques",
    status: "active",
    color: "blue",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    id: "lic-physique",
    name: "Licence Physique",
    type: "program",
    description:
      "Formation en physique fondamentale et appliquée, électronique et optique.",
    students: 189,
    faculty: 15,
    established: "1985",
    location: "Département de Physique",
    status: "active",
    color: "cyan",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    id: "lic-chimie",
    name: "Licence Chimie",
    type: "program",
    description:
      "Formation en chimie fondamentale et appliquée, chimie analytique et chimie verte.",
    students: 156,
    faculty: 12,
    established: "1988",
    location: "Département de Chimie",
    status: "active",
    color: "orange",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    id: "lic-biologie",
    name: "Licence Biologie",
    type: "program",
    description:
      "Formation en sciences biologiques, biologie moléculaire et biotechnologies.",
    students: 267,
    faculty: 19,
    established: "1992",
    location: "Département de Biologie",
    status: "active",
    color: "green",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    id: "master-mba",
    name: "Master MBA International",
    type: "program",
    description:
      "Formation en management d'entreprise, stratégie et leadership. Programme bilingue français-anglais.",
    students: 89,
    faculty: 25,
    established: "2005",
    location: "Faculté d'Économie et Gestion",
    status: "active",
    color: "purple",
    icon: <TrendingUp className="w-6 h-6" />,
  },

  // INSTITUTS ET ÉCOLES
  {
    id: "ecole-doctorale",
    name: "École Doctorale",
    type: "school",
    description:
      "Formation doctorale et recherche avancée dans tous les domaines. Centre de formation des futurs chercheurs.",
    students: 567,
    faculty: 89,
    established: "1995",
    location: "Campus Recherche - Bâtiment C",
    status: "active",
    color: "teal",
    icon: <Award className="w-6 h-6" />,
  },
  {
    id: "institut-tech",
    name: "Institut de Technologie",
    type: "institute",
    description:
      "Formation technique et ingénierie, génie civil, génie électrique et génie mécanique.",
    students: 1234,
    faculty: 78,
    established: "2000",
    location: "Campus Technique - Bâtiment D",
    status: "active",
    color: "cyan",
    icon: <Building2 className="w-6 h-6" />,
  },
  {
    id: "institut-langues",
    name: "Institut des Langues",
    type: "institute",
    description:
      "Formation en langues étrangères, traduction et interprétation. Centre de certification linguistique.",
    students: 456,
    faculty: 34,
    established: "1998",
    location: "Campus Central - Bâtiment F",
    status: "active",
    color: "indigo",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    id: "institut-recherche",
    name: "Institut de Recherche",
    type: "institute",
    description:
      "Recherche interdisciplinaire, innovation et transfert de technologie. Partenariats industriels et internationaux.",
    students: 234,
    faculty: 156,
    established: "2010",
    location: "Campus Recherche - Complexe R&D",
    status: "active",
    color: "purple",
    icon: <Award className="w-6 h-6" />,
  },
  {
    id: "ecole-formation",
    name: "École de Formation Continue",
    type: "school",
    description:
      "Formation professionnelle, certification et développement des compétences pour les entreprises.",
    students: 1890,
    faculty: 67,
    established: "2008",
    location: "Campus Formation - Bâtiment G",
    status: "active",
    color: "green",
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    id: "institut-sport",
    name: "Institut des Sports",
    type: "institute",
    description:
      "Formation en sciences du sport, éducation physique et management sportif. Centre d'excellence sportive.",
    students: 345,
    faculty: 23,
    established: "2015",
    location: "Campus Sport - Complexe Olympique",
    status: "active",
    color: "orange",
    icon: <Award className="w-6 h-6" />,
  },
];

// Composant Card pour chaque unité
const UniversityUnitCard: React.FC<{ unit: UniversityUnit; index: number }> = ({
  unit,
  index,
}) => {
  const colorClasses = {
    blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
    red: "from-red-500/20 to-red-600/20 border-red-500/30",
    purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
    green: "from-green-500/20 to-green-600/20 border-green-500/30",
    indigo: "from-indigo-500/20 to-indigo-600/20 border-indigo-500/30",
    orange: "from-orange-500/20 to-orange-600/20 border-orange-500/30",
    teal: "from-teal-500/20 to-teal-600/20 border-teal-500/30",
    cyan: "from-cyan-500/20 to-cyan-600/20 border-cyan-500/30",
  };

  const iconColors = {
    blue: "text-blue-400",
    red: "text-red-400",
    purple: "text-purple-400",
    green: "text-green-400",
    indigo: "text-indigo-400",
    orange: "text-orange-400",
    teal: "text-teal-400",
    cyan: "text-cyan-400",
  };

  const typeLabels = {
    faculty: "Faculté",
    department: "Département",
    program: "Programme",
    institute: "Institut",
    school: "École",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`relative p-6 rounded-xl bg-gradient-to-br ${
        colorClasses[unit.color]
      } backdrop-blur-sm border ${
        colorClasses[unit.color].split(" ")[2]
      } shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group`}
    >
      {/* Header avec icône et type */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`p-3 rounded-lg bg-white/10 ${iconColors[unit.color]}`}
          >
            {unit.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-[#b8d070] transition-colors">
              {unit.name}
            </h3>
            <span className="text-xs px-2 py-1 rounded-full bg-white/20 text-white/80 font-medium">
              {typeLabels[unit.type]}
            </span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
      </div>

      {/* Description */}
      <p className="text-white/70 text-sm mb-4 line-clamp-2">
        {unit.description}
      </p>

      {/* Statistiques */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-white/60" />
          <div>
            <p className="text-xs text-white/60">Étudiants</p>
            <p className="text-sm font-semibold text-white">
              {unit.students.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-white/60" />
          <div>
            <p className="text-xs text-white/60">Enseignants</p>
            <p className="text-sm font-semibold text-white">{unit.faculty}</p>
          </div>
        </div>
      </div>

      {/* Informations supplémentaires */}
      <div className="space-y-2 text-xs text-white/60">
        <div className="flex items-center gap-2">
          <Calendar className="w-3 h-3" />
          <span>Créé en {unit.established}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{unit.location}</span>
        </div>
      </div>

      {/* Indicateur de statut */}
      <div className="absolute top-4 right-4">
        <div
          className={`w-3 h-3 rounded-full ${
            unit.status === "active"
              ? "bg-green-400 shadow-lg shadow-green-400/50"
              : unit.status === "inactive"
              ? "bg-red-400 shadow-lg shadow-red-400/50"
              : "bg-yellow-400 shadow-lg shadow-yellow-400/50"
          }`}
        />
      </div>
    </motion.div>
  );
};

// Composant principal de la page Université
const UniversityPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedUnit, setSelectedUnit] = useState<UniversityUnit | null>(null);

  // Filtrage des données
  const filteredData = universityData.filter((unit) => {
    const matchesSearch = unit.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || unit.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // Statistiques globales avancées
  const totalStudents = universityData.reduce(
    (sum, unit) => sum + unit.students,
    0
  );
  const totalFaculty = universityData.reduce(
    (sum, unit) => sum + unit.faculty,
    0
  );
  const activeUnits = universityData.filter(
    (unit) => unit.status === "active"
  ).length;

  // Statistiques par type
  const statsByType = universityData.reduce((acc, unit) => {
    if (!acc[unit.type]) {
      acc[unit.type] = { count: 0, students: 0, faculty: 0 };
    }
    acc[unit.type].count += 1;
    acc[unit.type].students += unit.students;
    acc[unit.type].faculty += unit.faculty;
    return acc;
  }, {} as Record<string, { count: number; students: number; faculty: number }>);

  // Ratio étudiants/enseignants
  const studentFacultyRatio =
    totalFaculty > 0 ? (totalStudents / totalFaculty).toFixed(1) : "0";

  // Unités les plus anciennes et récentes
  const oldestUnit = universityData.reduce((oldest, unit) =>
    parseInt(unit.established) < parseInt(oldest.established) ? unit : oldest
  );
  const newestUnit = universityData.reduce((newest, unit) =>
    parseInt(unit.established) > parseInt(newest.established) ? unit : newest
  );

  // Top 3 des unités par nombre d'étudiants
  const topUnitsByStudents = [...universityData]
    .sort((a, b) => b.students - a.students)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1d8b93] to-[#0d5a61] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header de la page */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-[#b8d070] to-[#a2c65e] shadow-lg">
              <Building2 className="w-8 h-8 text-[#1d8b93]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Structure Universitaire
              </h1>
              <p className="text-white/70">
                Gestion et organisation des unités académiques
              </p>
            </div>
          </div>

          {/* Statistiques globales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-500/20">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Total Étudiants</p>
                  <p className="text-2xl font-bold text-white">
                    {totalStudents.toLocaleString()}
                  </p>
                  <p className="text-xs text-white/50">+12% cette année</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-green-500/20">
                  <GraduationCap className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Total Enseignants</p>
                  <p className="text-2xl font-bold text-white">
                    {totalFaculty}
                  </p>
                  <p className="text-xs text-white/50">+8% cette année</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-purple-500/20">
                  <Building2 className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Unités Actives</p>
                  <p className="text-2xl font-bold text-white">{activeUnits}</p>
                  <p className="text-xs text-white/50">100% opérationnelles</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-orange-500/20">
                  <TrendingUp className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Ratio Étudiant/Prof</p>
                  <p className="text-2xl font-bold text-white">
                    {studentFacultyRatio}:1
                  </p>
                  <p className="text-xs text-white/50">Ratio optimal</p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques détaillées par type */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#b8d070]" />
              Répartition par Type d'Unité
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(statsByType).map(([type, stats]) => {
                const typeLabels = {
                  faculty: "Facultés",
                  department: "Départements",
                  program: "Programmes",
                  institute: "Instituts",
                  school: "Écoles",
                };
                return (
                  <div key={type} className="text-center">
                    <div className="text-2xl font-bold text-[#b8d070] mb-1">
                      {stats.count}
                    </div>
                    <div className="text-sm text-white/70 mb-1">
                      {typeLabels[type as keyof typeof typeLabels]}
                    </div>
                    <div className="text-xs text-white/50">
                      {stats.students.toLocaleString()} étudiants
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Top 3 des unités */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#b8d070]" />
              Top 3 des Unités par Nombre d'Étudiants
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topUnitsByStudents.map((unit, index) => (
                <div
                  key={unit.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#b8d070] to-[#a2c65e] flex items-center justify-center text-[#1d8b93] font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white text-sm truncate">
                      {unit.name}
                    </div>
                    <div className="text-xs text-white/60">
                      {unit.students.toLocaleString()} étudiants
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Informations historiques */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#b8d070]" />
                Unité la Plus Ancienne
              </h4>
              <div className="space-y-2">
                <div className="font-medium text-white">{oldestUnit.name}</div>
                <div className="text-sm text-white/70">
                  Créée en {oldestUnit.established}
                </div>
                <div className="text-xs text-white/50">
                  Il y a{" "}
                  {new Date().getFullYear() - parseInt(oldestUnit.established)}{" "}
                  ans
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#b8d070]" />
                Unité la Plus Récente
              </h4>
              <div className="space-y-2">
                <div className="font-medium text-white">{newestUnit.name}</div>
                <div className="text-sm text-white/70">
                  Créée en {newestUnit.established}
                </div>
                <div className="text-xs text-white/50">
                  Il y a{" "}
                  {new Date().getFullYear() - parseInt(newestUnit.established)}{" "}
                  ans
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Barre de recherche et filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Recherche */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Rechercher une unité..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Filtres */}
            <div className="flex gap-4 items-center">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="all" className="bg-gray-800">
                    Tous les types
                  </option>
                  <option value="faculty" className="bg-gray-800">
                    Facultés
                  </option>
                  <option value="department" className="bg-gray-800">
                    Départements
                  </option>
                  <option value="program" className="bg-gray-800">
                    Programmes
                  </option>
                  <option value="institute" className="bg-gray-800">
                    Instituts
                  </option>
                  <option value="school" className="bg-gray-800">
                    Écoles
                  </option>
                </select>
              </div>

              {/* Boutons de vue */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-lg transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-[#b8d070] text-[#1d8b93]"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-lg transition-all duration-200 ${
                    viewMode === "list"
                      ? "bg-[#b8d070] text-[#1d8b93]"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grille des unités */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {filteredData.map((unit, index) => (
            <div key={unit.id} onClick={() => setSelectedUnit(unit)}>
              <UniversityUnitCard unit={unit} index={index} />
            </div>
          ))}
        </motion.div>

        {/* Modal de détails de l'unité */}
        {selectedUnit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedUnit(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-[#b8d070] to-[#a2c65e] shadow-lg">
                    {selectedUnit.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {selectedUnit.name}
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/20 text-white/80 text-sm font-medium">
                        {selectedUnit.type === "faculty"
                          ? "Faculté"
                          : selectedUnit.type === "department"
                          ? "Département"
                          : selectedUnit.type === "program"
                          ? "Programme"
                          : selectedUnit.type === "institute"
                          ? "Institut"
                          : "École"}
                      </span>
                      <div
                        className={`w-3 h-3 rounded-full ${
                          selectedUnit.status === "active"
                            ? "bg-green-400"
                            : selectedUnit.status === "inactive"
                            ? "bg-red-400"
                            : "bg-yellow-400"
                        }`}
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedUnit(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white/70" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Description
                  </h3>
                  <p className="text-white/70">{selectedUnit.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-white/60 mb-2">
                        Statistiques
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white/70">Étudiants</span>
                          <span className="text-white font-semibold">
                            {selectedUnit.students.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Enseignants</span>
                          <span className="text-white font-semibold">
                            {selectedUnit.faculty}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Ratio</span>
                          <span className="text-white font-semibold">
                            {(
                              selectedUnit.students / selectedUnit.faculty
                            ).toFixed(1)}
                            :1
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-white/60 mb-2">
                        Informations
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-white/50" />
                          <span className="text-white/70">
                            Créé en {selectedUnit.established}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-white/50" />
                          <span className="text-white/70">
                            {selectedUnit.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button className="flex-1 py-3 px-6 bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93] font-semibold rounded-xl hover:shadow-lg transition-all duration-300">
                    Voir les détails
                  </button>
                  <button className="py-3 px-6 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300">
                    Modifier
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Message si aucun résultat */}
        {filteredData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Building2 className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white/70 mb-2">
              Aucune unité trouvée
            </h3>
            <p className="text-white/50">
              Essayez de modifier vos critères de recherche
            </p>
          </motion.div>
        )}

        {/* Bouton d'ajout */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-[#b8d070] to-[#a2c65e] rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group"
        >
          <Plus className="w-6 h-6 text-[#1d8b93] group-hover:rotate-90 transition-transform duration-300" />
        </motion.button>
      </div>
    </div>
  );
};

export default UniversityPage;
