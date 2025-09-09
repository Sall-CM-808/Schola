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
  Star,
  Shield,
  Target,
  Zap,
  Microscope,
  Code,
  Calculator,
  Atom,
  Dna,
} from "lucide-react";

// Types pour les données des départements
interface Department {
  id: string;
  name: string;
  faculty: string;
  description: string;
  students: number;
  faculty_count: number;
  programs: number;
  established: string;
  location: string;
  head: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "pending";
  color: string;
  icon: React.ReactNode;
  specialties: string[];
  researchLabs: string[];
  partnerships: string[];
  achievements: string[];
}

// Données mockées pour les départements
const departmentsData: Department[] = [
  {
    id: "dept-informatique",
    name: "Département d'Informatique",
    faculty: "Faculté des Sciences et Technologies",
    description:
      "Sciences informatiques, intelligence artificielle, cybersécurité et développement logiciel. Laboratoire de recherche en IA et big data. Formation d'ingénieurs et de chercheurs en technologies numériques.",
    students: 1245,
    faculty_count: 67,
    programs: 8,
    established: "1985",
    location: "Faculté des Sciences - 3ème étage",
    head: "Prof. Dr. Ibrahim Diallo",
    email: "informatique@univ.edu",
    phone: "+224 123 456 800",
    status: "active",
    color: "purple",
    icon: <Code className="w-6 h-6" />,
    specialties: [
      "Intelligence Artificielle",
      "Cybersécurité",
      "Développement Web",
      "Base de données",
      "Réseaux",
    ],
    researchLabs: ["Lab IA", "Lab Cybersécurité", "Lab Big Data", "Lab IoT"],
    partnerships: ["Google", "Microsoft", "IBM", "Orange"],
    achievements: [
      "Prix innovation 2023",
      "Brevet logiciel",
      "Partenariat international",
    ],
  },
  {
    id: "dept-mathematiques",
    name: "Département de Mathématiques",
    faculty: "Faculté des Sciences et Technologies",
    description:
      "Mathématiques pures et appliquées, statistiques et probabilités. Centre de recherche en mathématiques financières. Formation de mathématiciens et de statisticiens de haut niveau.",
    students: 892,
    faculty_count: 45,
    programs: 6,
    established: "1978",
    location: "Faculté des Sciences - 2ème étage",
    head: "Prof. Dr. Aminata Camara",
    email: "mathematiques@univ.edu",
    phone: "+224 123 456 801",
    status: "active",
    color: "blue",
    icon: <Calculator className="w-6 h-6" />,
    specialties: [
      "Algèbre",
      "Analyse",
      "Statistiques",
      "Probabilités",
      "Mathématiques financières",
    ],
    researchLabs: [
      "Lab Statistiques",
      "Lab Mathématiques financières",
      "Lab Modélisation",
    ],
    partnerships: ["CNRS", "Université Paris", "Banque Centrale"],
    achievements: [
      "Publication Nature",
      "Prix mathématiques",
      "Conférence internationale",
    ],
  },
  {
    id: "dept-physique",
    name: "Département de Physique",
    faculty: "Faculté des Sciences et Technologies",
    description:
      "Physique fondamentale, physique appliquée et nanotechnologies. Laboratoire de physique des matériaux. Formation de physiciens et d'ingénieurs en physique appliquée.",
    students: 678,
    faculty_count: 34,
    programs: 5,
    established: "1970",
    location: "Faculté des Sciences - 1er étage",
    head: "Prof. Dr. Mohamed Bah",
    email: "physique@univ.edu",
    phone: "+224 123 456 802",
    status: "active",
    color: "cyan",
    icon: <Atom className="w-6 h-6" />,
    specialties: [
      "Physique quantique",
      "Nanotechnologies",
      "Énergies renouvelables",
      "Physique des matériaux",
    ],
    researchLabs: [
      "Lab Nanotechnologies",
      "Lab Physique quantique",
      "Lab Énergies",
    ],
    partnerships: ["CERN", "CEA", "Université MIT"],
    achievements: [
      "Découverte matériau",
      "Prix physique",
      "Publication Science",
    ],
  },
  {
    id: "dept-chimie",
    name: "Département de Chimie",
    faculty: "Faculté des Sciences et Technologies",
    description:
      "Chimie organique, inorganique, analytique et chimie verte. Laboratoire de recherche en chimie des matériaux. Formation de chimistes et d'ingénieurs chimistes.",
    students: 456,
    faculty_count: 28,
    programs: 4,
    established: "1972",
    location: "Faculté des Sciences - Rez-de-chaussée",
    head: "Prof. Dr. Fatou Diallo",
    email: "chimie@univ.edu",
    phone: "+224 123 456 803",
    status: "active",
    color: "orange",
    icon: <Microscope className="w-6 h-6" />,
    specialties: [
      "Chimie organique",
      "Chimie inorganique",
      "Chimie analytique",
      "Chimie verte",
    ],
    researchLabs: [
      "Lab Chimie organique",
      "Lab Chimie analytique",
      "Lab Chimie verte",
    ],
    partnerships: ["Total", "Sanofi", "Université Oxford"],
    achievements: ["Découverte moléculaire", "Prix chimie", "Brevet chimique"],
  },
  {
    id: "dept-biologie",
    name: "Département de Biologie",
    faculty: "Faculté des Sciences et Technologies",
    description:
      "Biologie moléculaire, génétique, écologie et biotechnologies. Centre de recherche en biodiversité. Formation de biologistes et de biotechnologues.",
    students: 789,
    faculty_count: 42,
    programs: 6,
    established: "1978",
    location: "Faculté des Sciences - 4ème étage",
    head: "Prof. Dr. Aissatou Barry",
    email: "biologie@univ.edu",
    phone: "+224 123 456 804",
    status: "active",
    color: "green",
    icon: <Dna className="w-6 h-6" />,
    specialties: [
      "Biologie moléculaire",
      "Génétique",
      "Écologie",
      "Biotechnologies",
      "Microbiologie",
    ],
    researchLabs: [
      "Lab Génétique",
      "Lab Biotechnologies",
      "Lab Écologie",
      "Lab Microbiologie",
    ],
    partnerships: ["Pasteur", "CNRS", "Université Harvard"],
    achievements: ["Découverte génétique", "Prix biologie", "Publication Cell"],
  },
  {
    id: "dept-medecine",
    name: "Département de Médecine",
    faculty: "Faculté de Médecine et Pharmacie",
    description:
      "Formation médicale générale et spécialisée. Partenaire des hôpitaux universitaires. Formation de médecins généralistes et spécialistes.",
    students: 1456,
    faculty_count: 89,
    programs: 12,
    established: "1972",
    location: "Campus Santé - Bâtiment A",
    head: "Prof. Dr. Mamadou Camara",
    email: "medecine@univ.edu",
    phone: "+224 123 456 805",
    status: "active",
    color: "red",
    icon: <Award className="w-6 h-6" />,
    specialties: [
      "Médecine générale",
      "Chirurgie",
      "Cardiologie",
      "Neurologie",
      "Pédiatrie",
    ],
    researchLabs: ["Lab Cardiologie", "Lab Neurologie", "Lab Chirurgie"],
    partnerships: ["Hôpital Principal", "OMS", "Université McGill"],
    achievements: [
      "Accréditation internationale",
      "Prix médecine",
      "Recherche clinique",
    ],
  },
  {
    id: "dept-pharmacie",
    name: "Département de Pharmacie",
    faculty: "Faculté de Médecine et Pharmacie",
    description:
      "Formation pharmaceutique et recherche en pharmacologie. Laboratoire de recherche en médicaments. Formation de pharmaciens et de chercheurs en pharmacologie.",
    students: 567,
    faculty_count: 35,
    programs: 5,
    established: "1980",
    location: "Campus Santé - Bâtiment B",
    head: "Prof. Dr. Mariama Bah",
    email: "pharmacie@univ.edu",
    phone: "+224 123 456 806",
    status: "active",
    color: "indigo",
    icon: <BookOpen className="w-6 h-6" />,
    specialties: [
      "Pharmacologie",
      "Chimie pharmaceutique",
      "Pharmacie clinique",
      "Toxicologie",
    ],
    researchLabs: [
      "Lab Pharmacologie",
      "Lab Chimie pharmaceutique",
      "Lab Toxicologie",
    ],
    partnerships: ["Sanofi", "Pfizer", "Université Paris"],
    achievements: [
      "Découverte médicament",
      "Prix pharmacie",
      "Brevet pharmaceutique",
    ],
  },
  {
    id: "dept-droit",
    name: "Département de Droit",
    faculty: "Faculté de Droit et Sciences Politiques",
    description:
      "Formation juridique et recherche en droit. Partenaire des institutions judiciaires. Formation de juristes et d'avocats.",
    students: 892,
    faculty_count: 45,
    programs: 8,
    established: "1975",
    location: "Campus Central - Bâtiment D",
    head: "Prof. Dr. Ibrahima Diallo",
    email: "droit@univ.edu",
    phone: "+224 123 456 807",
    status: "active",
    color: "purple",
    icon: <Shield className="w-6 h-6" />,
    specialties: [
      "Droit civil",
      "Droit pénal",
      "Droit international",
      "Droit des affaires",
    ],
    researchLabs: [
      "Lab Droit constitutionnel",
      "Lab Droit international",
      "Lab Droit des affaires",
    ],
    partnerships: ["Cour suprême", "Barreau", "Université Sorbonne"],
    achievements: [
      "Réforme juridique",
      "Prix droit",
      "Conférence internationale",
    ],
  },
];

// Composant Card pour chaque département
const DepartmentCard: React.FC<{ department: Department; index: number }> = ({
  department,
  index,
}) => {
  const colorClasses = {
    purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
    blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
    cyan: "from-cyan-500/20 to-cyan-600/20 border-cyan-500/30",
    orange: "from-orange-500/20 to-orange-600/20 border-orange-500/30",
    green: "from-green-500/20 to-green-600/20 border-green-500/30",
    red: "from-red-500/20 to-red-600/20 border-red-500/30",
    indigo: "from-indigo-500/20 to-indigo-600/20 border-indigo-500/30",
  };

  const iconColors = {
    purple: "text-purple-400",
    blue: "text-blue-400",
    cyan: "text-cyan-400",
    orange: "text-orange-400",
    green: "text-green-400",
    red: "text-red-400",
    indigo: "text-indigo-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`relative p-6 rounded-xl bg-gradient-to-br ${
        colorClasses[department.color]
      } backdrop-blur-sm border ${
        colorClasses[department.color].split(" ")[2]
      } shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group`}
    >
      {/* Header avec icône et informations */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`p-3 rounded-lg bg-white/10 ${
              iconColors[department.color]
            }`}
          >
            {department.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-[#b8d070] transition-colors">
              {department.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs px-2 py-1 rounded-full bg-white/20 text-white/80 font-medium">
                {department.faculty}
              </span>
              <div
                className={`w-2 h-2 rounded-full ${
                  department.status === "active"
                    ? "bg-green-400"
                    : department.status === "inactive"
                    ? "bg-red-400"
                    : "bg-yellow-400"
                }`}
              />
            </div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
      </div>

      {/* Description */}
      <p className="text-white/70 text-sm mb-4 line-clamp-2">
        {department.description}
      </p>

      {/* Statistiques principales */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-white/60" />
          <div>
            <p className="text-xs text-white/60">Étudiants</p>
            <p className="text-sm font-semibold text-white">
              {department.students.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-white/60" />
          <div>
            <p className="text-xs text-white/60">Enseignants</p>
            <p className="text-sm font-semibold text-white">
              {department.faculty_count}
            </p>
          </div>
        </div>
      </div>

      {/* Spécialités */}
      <div className="mb-4">
        <p className="text-xs text-white/60 mb-2">Spécialités</p>
        <div className="flex flex-wrap gap-1">
          {department.specialties.slice(0, 3).map((specialty, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/80"
            >
              {specialty}
            </span>
          ))}
          {department.specialties.length > 3 && (
            <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/80">
              +{department.specialties.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Informations supplémentaires */}
      <div className="space-y-2 text-xs text-white/60">
        <div className="flex items-center gap-2">
          <Calendar className="w-3 h-3" />
          <span>Créé en {department.established}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{department.location}</span>
        </div>
      </div>

      {/* Indicateur de statut */}
      <div className="absolute top-4 right-4">
        <div
          className={`w-3 h-3 rounded-full ${
            department.status === "active"
              ? "bg-green-400 shadow-lg shadow-green-400/50"
              : department.status === "inactive"
              ? "bg-red-400 shadow-lg shadow-red-400/50"
              : "bg-yellow-400 shadow-lg shadow-yellow-400/50"
          }`}
        />
      </div>
    </motion.div>
  );
};

// Composant principal de la page Départements
const DepartmentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFaculty, setFilterFaculty] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);

  // Filtrage des données
  const filteredData = departmentsData.filter((department) => {
    const matchesSearch = department.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFaculty =
      filterFaculty === "all" || department.faculty === filterFaculty;
    return matchesSearch && matchesFaculty;
  });

  // Statistiques globales
  const totalStudents = departmentsData.reduce(
    (sum, dept) => sum + dept.students,
    0
  );
  const totalFaculty = departmentsData.reduce(
    (sum, dept) => sum + dept.faculty_count,
    0
  );
  const totalPrograms = departmentsData.reduce(
    (sum, dept) => sum + dept.programs,
    0
  );

  // Liste des facultés uniques
  const faculties = [...new Set(departmentsData.map((dept) => dept.faculty))];

  // Top 3 des départements par nombre d'étudiants
  const topDepartmentsByStudents = [...departmentsData]
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
              <GraduationCap className="w-8 h-8 text-[#1d8b93]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Départements de l'Université
              </h1>
              <p className="text-white/70">
                Gestion et organisation des départements universitaires
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
                  <p className="text-xs text-white/50">+18% cette année</p>
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
                  <p className="text-xs text-white/50">+12% cette année</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-purple-500/20">
                  <Building2 className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Départements</p>
                  <p className="text-2xl font-bold text-white">
                    {departmentsData.length}
                  </p>
                  <p className="text-xs text-white/50">8 facultés</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-orange-500/20">
                  <BookOpen className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Programmes</p>
                  <p className="text-2xl font-bold text-white">
                    {totalPrograms}
                  </p>
                  <p className="text-xs text-white/50">Formations actives</p>
                </div>
              </div>
            </div>
          </div>

          {/* Top 3 des départements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#b8d070]" />
              Top 3 des Départements par Nombre d'Étudiants
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topDepartmentsByStudents.map((department, index) => (
                <div
                  key={department.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#b8d070] to-[#a2c65e] flex items-center justify-center text-[#1d8b93] font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white text-sm truncate">
                      {department.name}
                    </div>
                    <div className="text-xs text-white/60">
                      {department.students.toLocaleString()} étudiants
                    </div>
                  </div>
                </div>
              ))}
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
                placeholder="Rechercher un département..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Filtre par faculté */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
              <select
                value={filterFaculty}
                onChange={(e) => setFilterFaculty(e.target.value)}
                className="pl-10 pr-8 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="all" className="bg-gray-800">
                  Toutes les facultés
                </option>
                {faculties.map((faculty) => (
                  <option key={faculty} value={faculty} className="bg-gray-800">
                    {faculty}
                  </option>
                ))}
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
        </motion.div>

        {/* Grille des départements */}
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
          {filteredData.map((department, index) => (
            <div
              key={department.id}
              onClick={() => setSelectedDepartment(department)}
            >
              <DepartmentCard department={department} index={index} />
            </div>
          ))}
        </motion.div>

        {/* Modal de détails du département */}
        {selectedDepartment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDepartment(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-[#b8d070] to-[#a2c65e] shadow-lg">
                    {selectedDepartment.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {selectedDepartment.name}
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/20 text-white/80 text-sm font-medium">
                        {selectedDepartment.faculty}
                      </span>
                      <div
                        className={`w-3 h-3 rounded-full ${
                          selectedDepartment.status === "active"
                            ? "bg-green-400"
                            : selectedDepartment.status === "inactive"
                            ? "bg-red-400"
                            : "bg-yellow-400"
                        }`}
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDepartment(null)}
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
                  <p className="text-white/70">
                    {selectedDepartment.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-white/60 mb-2">
                        Statistiques
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white/70">Étudiants</span>
                          <span className="text-white font-semibold">
                            {selectedDepartment.students.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Enseignants</span>
                          <span className="text-white font-semibold">
                            {selectedDepartment.faculty_count}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Programmes</span>
                          <span className="text-white font-semibold">
                            {selectedDepartment.programs}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">
                            Chef de département
                          </span>
                          <span className="text-white font-semibold">
                            {selectedDepartment.head}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-white/60 mb-2">
                        Contact
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-white/50" />
                          <span className="text-white/70">
                            {selectedDepartment.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-white/50" />
                          <span className="text-white/70">
                            {selectedDepartment.phone}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-white/50" />
                          <span className="text-white/70">
                            {selectedDepartment.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-white/60 mb-2">
                      Spécialités
                    </h4>
                    <div className="space-y-1">
                      {selectedDepartment.specialties.map((specialty, idx) => (
                        <div
                          key={idx}
                          className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/80 inline-block mr-1 mb-1"
                        >
                          {specialty}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-white/60 mb-2">
                      Laboratoires
                    </h4>
                    <div className="space-y-1">
                      {selectedDepartment.researchLabs.map((lab, idx) => (
                        <div
                          key={idx}
                          className="text-xs text-white/70 flex items-center gap-1"
                        >
                          <Microscope className="w-3 h-3 text-[#b8d070]" />
                          {lab}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-white/60 mb-2">
                      Partenariats
                    </h4>
                    <div className="space-y-1">
                      {selectedDepartment.partnerships.map((partner, idx) => (
                        <div
                          key={idx}
                          className="text-xs text-white/70 flex items-center gap-1"
                        >
                          <Target className="w-3 h-3 text-[#b8d070]" />
                          {partner}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button className="flex-1 py-3 px-6 bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93] font-semibold rounded-xl hover:shadow-lg transition-all duration-300">
                    Voir les programmes
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
            <GraduationCap className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white/70 mb-2">
              Aucun département trouvé
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

export default DepartmentsPage;
