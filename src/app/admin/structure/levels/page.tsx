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
} from "lucide-react";

interface Level {
  id: string;
  name: string;
  code: string;
  description: string;
  students: number;
  faculty: number;
  established: string;
  location: string;
  status: "active" | "inactive" | "pending";
  color: string;
  icon: React.ReactNode;
  academicYear: string;
  semester: string;
  program: string;
  department: string;
}

interface Subject {
  id: string;
  name: string;
  code: string;
  credits: number;
  hours: number;
  teacher: string;
  type: "obligatoire" | "optionnel" | "pratique";
  status: "active" | "inactive";
}

interface Evaluation {
  id: string;
  name: string;
  type: "examen" | "devoir" | "projet" | "oral";
  date: string;
  coefficient: number;
  maxPoints: number;
  status: "planned" | "ongoing" | "completed";
  subject: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  status: "enrolled" | "graduated" | "suspended";
  average: number;
  rank: number;
}

const levelsData: Level[] = [
  {
    id: "1",
    name: "Licence 1 Informatique",
    code: "L1-INFO",
    description: "Première année de licence en informatique",
    students: 45,
    faculty: 8,
    established: "2020-09-01",
    location: "Bâtiment A - Salle 101",
    status: "active",
    color: "from-blue-500 to-blue-600",
    icon: <GraduationCap className="w-6 h-6" />,
    academicYear: "2024-2025",
    semester: "S1",
    program: "Licence Informatique",
    department: "Département d'Informatique",
  },
  {
    id: "2",
    name: "Master 1 Génie Logiciel",
    code: "M1-GL",
    description: "Première année de master en génie logiciel",
    students: 28,
    faculty: 6,
    established: "2021-09-01",
    location: "Bâtiment B - Salle 205",
    status: "active",
    color: "from-purple-500 to-purple-600",
    icon: <Award className="w-6 h-6" />,
    academicYear: "2024-2025",
    semester: "S1",
    program: "Master Génie Logiciel",
    department: "Département d'Informatique",
  },
  {
    id: "3",
    name: "Licence 3 Mathématiques",
    code: "L3-MATH",
    description: "Troisième année de licence en mathématiques",
    students: 32,
    faculty: 5,
    established: "2019-09-01",
    location: "Bâtiment C - Salle 301",
    status: "active",
    color: "from-green-500 to-green-600",
    icon: <BookOpen className="w-6 h-6" />,
    academicYear: "2024-2025",
    semester: "S1",
    program: "Licence Mathématiques",
    department: "Département de Mathématiques",
  },
  {
    id: "4",
    name: "Doctorat Physique",
    code: "D-PHYS",
    description: "Programme de doctorat en physique",
    students: 15,
    faculty: 12,
    established: "2018-09-01",
    location: "Bâtiment D - Laboratoire 401",
    status: "active",
    color: "from-red-500 to-red-600",
    icon: <Award className="w-6 h-6" />,
    academicYear: "2024-2025",
    semester: "Annuel",
    program: "Doctorat Physique",
    department: "Département de Physique",
  },
  {
    id: "5",
    name: "Licence 2 Biologie",
    code: "L2-BIO",
    description: "Deuxième année de licence en biologie",
    students: 38,
    faculty: 7,
    established: "2020-09-01",
    location: "Bâtiment E - Salle 201",
    status: "active",
    color: "from-emerald-500 to-emerald-600",
    icon: <GraduationCap className="w-6 h-6" />,
    academicYear: "2024-2025",
    semester: "S1",
    program: "Licence Biologie",
    department: "Département de Biologie",
  },
];

const subjectsData: Subject[] = [
  {
    id: "1",
    name: "Algorithmique et Programmation",
    code: "ALG-PROG",
    credits: 6,
    hours: 60,
    teacher: "Dr. Martin Dubois",
    type: "obligatoire",
    status: "active",
  },
  {
    id: "2",
    name: "Structures de Données",
    code: "STR-DATA",
    credits: 4,
    hours: 40,
    teacher: "Prof. Sarah Chen",
    type: "obligatoire",
    status: "active",
  },
  {
    id: "3",
    name: "Base de Données",
    code: "BDD",
    credits: 5,
    hours: 50,
    teacher: "Dr. Ahmed Hassan",
    type: "obligatoire",
    status: "active",
  },
  {
    id: "4",
    name: "Projet Informatique",
    code: "PROJ-INFO",
    credits: 3,
    hours: 30,
    teacher: "Prof. Marie Leroy",
    type: "pratique",
    status: "active",
  },
  {
    id: "5",
    name: "Anglais Technique",
    code: "ANG-TECH",
    credits: 2,
    hours: 20,
    teacher: "Dr. John Smith",
    type: "optionnel",
    status: "active",
  },
];

const evaluationsData: Evaluation[] = [
  {
    id: "1",
    name: "Examen Final Algorithmique",
    type: "examen",
    date: "2024-12-15",
    coefficient: 0.4,
    maxPoints: 20,
    status: "planned",
    subject: "Algorithmique et Programmation",
  },
  {
    id: "2",
    name: "Devoir Maison Structures",
    type: "devoir",
    date: "2024-11-20",
    coefficient: 0.2,
    maxPoints: 20,
    status: "completed",
    subject: "Structures de Données",
  },
  {
    id: "3",
    name: "Projet Base de Données",
    type: "projet",
    date: "2024-12-01",
    coefficient: 0.3,
    maxPoints: 20,
    status: "ongoing",
    subject: "Base de Données",
  },
  {
    id: "4",
    name: "Présentation Projet",
    type: "oral",
    date: "2024-12-10",
    coefficient: 0.1,
    maxPoints: 20,
    status: "planned",
    subject: "Projet Informatique",
  },
];

const studentsData: Student[] = [
  {
    id: "1",
    name: "Alice Martin",
    email: "alice.martin@univ.edu",
    studentId: "2024001",
    status: "enrolled",
    average: 15.2,
    rank: 1,
  },
  {
    id: "2",
    name: "Bob Dupont",
    email: "bob.dupont@univ.edu",
    studentId: "2024002",
    status: "enrolled",
    average: 14.8,
    rank: 2,
  },
  {
    id: "3",
    name: "Claire Bernard",
    email: "claire.bernard@univ.edu",
    studentId: "2024003",
    status: "enrolled",
    average: 14.5,
    rank: 3,
  },
  {
    id: "4",
    name: "David Leroy",
    email: "david.leroy@univ.edu",
    studentId: "2024004",
    status: "enrolled",
    average: 13.9,
    rank: 4,
  },
  {
    id: "5",
    name: "Emma Rousseau",
    email: "emma.rousseau@univ.edu",
    studentId: "2024005",
    status: "enrolled",
    average: 13.2,
    rank: 5,
  },
];

const LevelCard: React.FC<{ level: Level; index: number }> = ({
  level,
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
          className={`p-3 rounded-xl bg-gradient-to-r ${level.color} text-white`}
        >
          {level.icon}
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              level.status === "active"
                ? "bg-green-100 text-green-800"
                : level.status === "inactive"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {level.status === "active"
              ? "Actif"
              : level.status === "inactive"
              ? "Inactif"
              : "En attente"}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
          {level.name}
        </h3>
        <p className="text-white/70 text-sm mb-2">{level.description}</p>
        <div className="flex items-center text-white/60 text-sm mb-1">
          <MapPin className="w-4 h-4 mr-2" />
          {level.location}
        </div>
        <div className="flex items-center text-white/60 text-sm">
          <Calendar className="w-4 h-4 mr-2" />
          Année académique {level.academicYear} - {level.semester}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{level.students}</div>
          <div className="text-white/60 text-sm">Étudiants</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{level.faculty}</div>
          <div className="text-white/60 text-sm">Enseignants</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-white/60 text-sm">{level.program}</div>
        <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
      </div>
    </motion.div>
  );
};

const LevelsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [activeTab, setActiveTab] = useState<
    "subjects" | "evaluations" | "grades" | "enrollments" | "schedule" | "rules"
  >("subjects");

  const filteredLevels = levelsData.filter((level) => {
    const matchesSearch =
      level.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      level.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      level.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || level.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalStudents = levelsData.reduce(
    (sum, level) => sum + level.students,
    0
  );
  const totalFaculty = levelsData.reduce(
    (sum, level) => sum + level.faculty,
    0
  );
  const activeLevels = levelsData.filter(
    (level) => level.status === "active"
  ).length;

  const tabs = [
    {
      id: "subjects",
      label: "Matières",
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: "evaluations",
      label: "Évaluations",
      icon: <CheckSquare className="w-4 h-4" />,
    },
    { id: "grades", label: "Notes", icon: <Calculator className="w-4 h-4" /> },
    {
      id: "enrollments",
      label: "Inscriptions",
      icon: <UserPlus className="w-4 h-4" />,
    },
    {
      id: "schedule",
      label: "Emploi du temps",
      icon: <Clock className="w-4 h-4" />,
    },
    { id: "rules", label: "Règles", icon: <Settings className="w-4 h-4" /> },
  ];

  const renderTabContent = () => {
    if (!selectedLevel) return null;

    switch (activeTab) {
      case "subjects":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">
                Matières de {selectedLevel.name}
              </h3>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Ajouter une matière</span>
              </button>
            </div>
            <div className="grid gap-4">
              {subjectsData.map((subject) => (
                <div
                  key={subject.id}
                  className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-white">
                        {subject.name}
                      </h4>
                      <p className="text-white/70 text-sm">
                        {subject.code} • {subject.credits} crédits •{" "}
                        {subject.hours}h
                      </p>
                      <p className="text-white/60 text-sm">
                        Enseignant: {subject.teacher}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          subject.type === "obligatoire"
                            ? "bg-blue-100 text-blue-800"
                            : subject.type === "optionnel"
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {subject.type}
                      </span>
                      <button className="p-1 hover:bg-white/20 rounded">
                        <MoreVertical className="w-4 h-4 text-white/60" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "evaluations":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">
                Évaluations de {selectedLevel.name}
              </h3>
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Nouvelle évaluation</span>
              </button>
            </div>
            <div className="grid gap-4">
              {evaluationsData.map((evaluation) => (
                <div
                  key={evaluation.id}
                  className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-white">
                        {evaluation.name}
                      </h4>
                      <p className="text-white/70 text-sm">
                        {evaluation.subject} • {evaluation.type}
                      </p>
                      <p className="text-white/60 text-sm">
                        Date: {evaluation.date} • Coeff:{" "}
                        {evaluation.coefficient} • Max: {evaluation.maxPoints}{" "}
                        pts
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          evaluation.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : evaluation.status === "ongoing"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {evaluation.status === "completed"
                          ? "Terminé"
                          : evaluation.status === "ongoing"
                          ? "En cours"
                          : "Planifié"}
                      </span>
                      <button className="p-1 hover:bg-white/20 rounded">
                        <MoreVertical className="w-4 h-4 text-white/60" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "grades":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">
                Gestion des notes - {selectedLevel.name}
              </h3>
              <div className="flex space-x-2">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Importer</span>
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Exporter</span>
                </button>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <p className="text-white/70">
                Interface de saisie et gestion des notes sera implémentée ici
              </p>
            </div>
          </div>
        );

      case "enrollments":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">
                Inscriptions - {selectedLevel.name}
              </h3>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <UserPlus className="w-4 h-4" />
                <span>Nouvelle inscription</span>
              </button>
            </div>
            <div className="grid gap-4">
              {studentsData.map((student) => (
                <div
                  key={student.id}
                  className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-white">
                        {student.name}
                      </h4>
                      <p className="text-white/70 text-sm">
                        {student.email} • {student.studentId}
                      </p>
                      <p className="text-white/60 text-sm">
                        Moyenne: {student.average}/20 • Rang: {student.rank}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          student.status === "enrolled"
                            ? "bg-green-100 text-green-800"
                            : student.status === "graduated"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {student.status === "enrolled"
                          ? "Inscrit"
                          : student.status === "graduated"
                          ? "Diplômé"
                          : "Suspendu"}
                      </span>
                      <button className="p-1 hover:bg-white/20 rounded">
                        <MoreVertical className="w-4 h-4 text-white/60" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "schedule":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">
                Emploi du temps - {selectedLevel.name}
              </h3>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Nouveau créneau</span>
              </button>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <p className="text-white/70">
                Interface de gestion de l'emploi du temps sera implémentée ici
              </p>
            </div>
          </div>
        );

      case "rules":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">
                Règles et paramètres - {selectedLevel.name}
              </h3>
              <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Modifier les règles</span>
              </button>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <p className="text-white/70">
                Interface de gestion des règles d'admission et de propagation
                sera implémentée ici
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
            <span className="text-white">Niveaux</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Gestion des Niveaux
          </h1>
          <p className="text-white/70">
            Gérez les classes, niveaux et promotions de l'université
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
                <p className="text-white/60 text-sm">Total Niveaux</p>
                <p className="text-3xl font-bold text-white">
                  {levelsData.length}
                </p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Award className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Étudiants</p>
                <p className="text-3xl font-bold text-white">{totalStudents}</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-xl">
                <Users className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Enseignants</p>
                <p className="text-3xl font-bold text-white">{totalFaculty}</p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <GraduationCap className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Niveaux Actifs</p>
                <p className="text-3xl font-bold text-white">{activeLevels}</p>
              </div>
              <div className="p-3 bg-orange-500/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-orange-400" />
              </div>
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
                  placeholder="Rechercher un niveau..."
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
                  Actif
                </option>
                <option value="inactive" className="bg-gray-800">
                  Inactif
                </option>
                <option value="pending" className="bg-gray-800">
                  En attente
                </option>
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

        {/* Levels Grid */}
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
          {filteredLevels.map((level, index) => (
            <div key={level.id} onClick={() => setSelectedLevel(level)}>
              <LevelCard level={level} index={index} />
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
        {selectedLevel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedLevel(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 w-full max-w-6xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedLevel.name}
                    </h2>
                    <p className="text-white/70">{selectedLevel.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-white/60 text-sm">
                      <span>Année: {selectedLevel.academicYear}</span>
                      <span>•</span>
                      <span>Semestre: {selectedLevel.semester}</span>
                      <span>•</span>
                      <span>{selectedLevel.students} étudiants</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedLevel(null)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-white/60" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-white/20">
                <div className="flex overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? "border-blue-500 text-blue-400 bg-blue-500/10"
                          : "border-transparent text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6 max-h-96 overflow-y-auto">
                {renderTabContent()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LevelsPage;
