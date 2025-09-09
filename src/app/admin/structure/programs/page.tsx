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
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
} from "lucide-react";

// Types pour les données des programmes
interface Program {
  id: string;
  name: string;
  type: "licence" | "master" | "doctorat" | "certificat" | "diplome";
  department: string;
  faculty: string;
  description: string;
  students: number;
  faculty_count: number;
  duration: string;
  credits: number;
  established: string;
  location: string;
  coordinator: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "pending" | "suspended";
  color: string;
  icon: React.ReactNode;
  prerequisites: string[];
  courses: string[];
  careerPaths: string[];
  achievements: string[];
  requirements: string[];
}

// Données mockées pour les programmes
const programsData: Program[] = [
  {
    id: "lic-info",
    name: "Licence Informatique",
    type: "licence",
    department: "Département d'Informatique",
    faculty: "Faculté des Sciences et Technologies",
    description:
      "Formation de base en sciences informatiques, programmation, bases de données et systèmes d'information. Préparation aux métiers du numérique et de l'innovation technologique.",
    students: 456,
    faculty_count: 23,
    duration: "3 ans",
    credits: 180,
    established: "1990",
    location: "Département d'Informatique",
    coordinator: "Dr. Ibrahim Diallo",
    email: "lic-info@univ.edu",
    phone: "+224 123 456 900",
    status: "active",
    color: "indigo",
    icon: <BookOpen className="w-6 h-6" />,
    prerequisites: [
      "Baccalauréat scientifique",
      "Mathématiques niveau terminale",
      "Anglais niveau B2",
    ],
    courses: [
      "Programmation",
      "Bases de données",
      "Réseaux",
      "Algorithmique",
      "Mathématiques",
    ],
    careerPaths: ["Développeur", "Analyste", "Chef de projet", "Consultant IT"],
    achievements: [
      "Accréditation internationale",
      "Prix excellence 2023",
      "Taux emploi 95%",
    ],
    requirements: [
      "Projet de fin d'études",
      "Stage obligatoire",
      "Mémoire de licence",
    ],
  },
  {
    id: "lic-math",
    name: "Licence Mathématiques",
    type: "licence",
    department: "Département de Mathématiques",
    faculty: "Faculté des Sciences et Technologies",
    description:
      "Formation en mathématiques pures et appliquées, statistiques et modélisation mathématique. Préparation aux métiers de l'enseignement et de la recherche.",
    students: 234,
    faculty_count: 18,
    duration: "3 ans",
    credits: 180,
    established: "1988",
    location: "Département de Mathématiques",
    coordinator: "Dr. Aminata Camara",
    email: "lic-math@univ.edu",
    phone: "+224 123 456 901",
    status: "active",
    color: "blue",
    icon: <BookOpen className="w-6 h-6" />,
    prerequisites: [
      "Baccalauréat scientifique",
      "Mathématiques niveau terminale",
      "Physique niveau terminale",
    ],
    courses: [
      "Algèbre",
      "Analyse",
      "Statistiques",
      "Probabilités",
      "Géométrie",
    ],
    careerPaths: ["Enseignant", "Statisticien", "Actuaire", "Data Analyst"],
    achievements: [
      "Prix mathématiques",
      "Publication recherche",
      "Taux réussite 98%",
    ],
    requirements: ["Mémoire de licence", "Examen final", "Présentation orale"],
  },
  {
    id: "master-mba",
    name: "Master MBA International",
    type: "master",
    department: "Département de Gestion",
    faculty: "Faculté d'Économie et Gestion",
    description:
      "Formation en management d'entreprise, stratégie et leadership. Programme bilingue français-anglais avec stage international obligatoire.",
    students: 89,
    faculty_count: 25,
    duration: "2 ans",
    credits: 120,
    established: "2005",
    location: "Faculté d'Économie et Gestion",
    coordinator: "Dr. Aissatou Diallo",
    email: "mba@univ.edu",
    phone: "+224 123 456 902",
    status: "active",
    color: "purple",
    icon: <TrendingUp className="w-6 h-6" />,
    prerequisites: [
      "Licence ou équivalent",
      "3 ans d'expérience",
      "TOEFL 550",
      "Entretien",
    ],
    courses: ["Stratégie", "Finance", "Marketing", "Leadership", "Management"],
    careerPaths: [
      "Directeur",
      "Consultant",
      "Entrepreneur",
      "Chef d'entreprise",
    ],
    achievements: [
      "Accréditation AACSB",
      "Prix MBA 2023",
      "Taux placement 100%",
    ],
    requirements: [
      "Mémoire professionnel",
      "Stage international",
      "Projet d'entreprise",
    ],
  },
  {
    id: "lic-medecine",
    name: "Licence Médecine",
    type: "licence",
    department: "Département de Médecine",
    faculty: "Faculté de Médecine et Pharmacie",
    description:
      "Formation médicale de base préparant aux études de spécialisation. Formation théorique et pratique en milieu hospitalier.",
    students: 1456,
    faculty_count: 89,
    duration: "6 ans",
    credits: 360,
    established: "1972",
    location: "Campus Santé",
    coordinator: "Prof. Dr. Mamadou Camara",
    email: "medecine@univ.edu",
    phone: "+224 123 456 903",
    status: "active",
    color: "red",
    icon: <Award className="w-6 h-6" />,
    prerequisites: [
      "Baccalauréat scientifique",
      "Concours d'entrée",
      "Entretien médical",
    ],
    courses: [
      "Anatomie",
      "Physiologie",
      "Pathologie",
      "Pharmacologie",
      "Clinique",
    ],
    careerPaths: [
      "Médecin généraliste",
      "Spécialiste",
      "Chirurgien",
      "Radiologue",
    ],
    achievements: [
      "Accréditation OMS",
      "Hôpital universitaire",
      "Recherche clinique",
    ],
    requirements: [
      "Stages hospitaliers",
      "Examens cliniques",
      "Thèse de doctorat",
    ],
  },
  {
    id: "master-droit",
    name: "Master Droit des Affaires",
    type: "master",
    department: "Département de Droit",
    faculty: "Faculté de Droit et Sciences Politiques",
    description:
      "Formation spécialisée en droit des affaires, droit commercial et droit fiscal. Préparation aux métiers juridiques du secteur privé.",
    students: 156,
    faculty_count: 12,
    duration: "2 ans",
    credits: 120,
    established: "2010",
    location: "Campus Central",
    coordinator: "Dr. Ibrahima Diallo",
    email: "droit-affaires@univ.edu",
    phone: "+224 123 456 904",
    status: "active",
    color: "indigo",
    icon: <Shield className="w-6 h-6" />,
    prerequisites: [
      "Licence en Droit",
      "Moyenne 12/20",
      "Lettre de motivation",
    ],
    courses: [
      "Droit commercial",
      "Droit fiscal",
      "Droit du travail",
      "Droit des sociétés",
    ],
    careerPaths: [
      "Avocat d'affaires",
      "Juriste d'entreprise",
      "Notaire",
      "Magistrat",
    ],
    achievements: ["Partenariat barreau", "Stage cabinet", "Taux réussite 92%"],
    requirements: [
      "Mémoire de master",
      "Stage professionnel",
      "Soutenance orale",
    ],
  },
  {
    id: "doctorat-physique",
    name: "Doctorat en Physique",
    type: "doctorat",
    department: "Département de Physique",
    faculty: "Faculté des Sciences et Technologies",
    description:
      "Formation doctorale en physique fondamentale et appliquée. Recherche avancée et préparation à la carrière académique ou industrielle.",
    students: 45,
    faculty_count: 15,
    duration: "3-4 ans",
    credits: 0,
    established: "1995",
    location: "Campus Recherche",
    coordinator: "Prof. Dr. Mohamed Bah",
    email: "doctorat-physique@univ.edu",
    phone: "+224 123 456 905",
    status: "active",
    color: "cyan",
    icon: <Award className="w-6 h-6" />,
    prerequisites: [
      "Master en Physique",
      "Projet de recherche",
      "Directeur de thèse",
    ],
    courses: [
      "Séminaires de recherche",
      "Méthodologie",
      "Communication scientifique",
    ],
    careerPaths: ["Chercheur", "Professeur", "Ingénieur R&D", "Consultant"],
    achievements: [
      "Publications internationales",
      "Bourses de recherche",
      "Prix thèse",
    ],
    requirements: ["Thèse de doctorat", "Publications", "Soutenance publique"],
  },
  {
    id: "certif-langues",
    name: "Certificat Langues Étrangères",
    type: "certificat",
    department: "Institut des Langues",
    faculty: "Faculté des Lettres et Sciences Humaines",
    description:
      "Formation intensive en langues étrangères (anglais, espagnol, chinois). Préparation aux certifications internationales.",
    students: 234,
    faculty_count: 18,
    duration: "1 an",
    credits: 60,
    established: "2015",
    location: "Institut des Langues",
    coordinator: "Dr. Mariama Bah",
    email: "langues@univ.edu",
    phone: "+224 123 456 906",
    status: "active",
    color: "green",
    icon: <BookOpen className="w-6 h-6" />,
    prerequisites: ["Niveau B1", "Test de placement", "Entretien oral"],
    courses: ["Grammaire", "Conversation", "Culture", "Préparation examens"],
    careerPaths: ["Traducteur", "Interprète", "Enseignant", "Diplomate"],
    achievements: [
      "Certification TOEFL",
      "Partenariat international",
      "Taux réussite 96%",
    ],
    requirements: ["Examen final", "Projet culturel", "Présentation orale"],
  },
  {
    id: "diplome-ingenieur",
    name: "Diplôme d'Ingénieur Informatique",
    type: "diplome",
    department: "Institut de Technologie",
    faculty: "Faculté des Sciences et Technologies",
    description:
      "Formation d'ingénieur en informatique avec spécialisation en développement logiciel et systèmes d'information.",
    students: 123,
    faculty_count: 20,
    duration: "5 ans",
    credits: 300,
    established: "2000",
    location: "Campus Technique",
    coordinator: "Dr. Fatou Diallo",
    email: "ingenieur-info@univ.edu",
    phone: "+224 123 456 907",
    status: "active",
    color: "orange",
    icon: <GraduationCap className="w-6 h-6" />,
    prerequisites: [
      "Baccalauréat scientifique",
      "Concours d'entrée",
      "Mathématiques avancées",
    ],
    courses: [
      "Programmation avancée",
      "Architecture logicielle",
      "Gestion de projet",
      "Innovation",
    ],
    careerPaths: [
      "Ingénieur logiciel",
      "Architecte système",
      "Chef de projet",
      "CTO",
    ],
    achievements: [
      "Accréditation CTI",
      "Partenariat industriel",
      "Taux emploi 98%",
    ],
    requirements: [
      "Projet de fin d'études",
      "Stage industriel",
      "Soutenance technique",
    ],
  },
];

// Composant Card pour chaque programme
const ProgramCard: React.FC<{ program: Program; index: number }> = ({
  program,
  index,
}) => {
  const colorClasses = {
    indigo: "from-indigo-500/20 to-indigo-600/20 border-indigo-500/30",
    blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
    purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
    red: "from-red-500/20 to-red-600/20 border-red-500/30",
    cyan: "from-cyan-500/20 to-cyan-600/20 border-cyan-500/30",
    green: "from-green-500/20 to-green-600/20 border-green-500/30",
    orange: "from-orange-500/20 to-orange-600/20 border-orange-500/30",
  };

  const iconColors = {
    indigo: "text-indigo-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
    red: "text-red-400",
    cyan: "text-cyan-400",
    green: "text-green-400",
    orange: "text-orange-400",
  };

  const typeLabels = {
    licence: "Licence",
    master: "Master",
    doctorat: "Doctorat",
    certificat: "Certificat",
    diplome: "Diplôme",
  };

  const statusIcons = {
    active: <CheckCircle className="w-4 h-4 text-green-400" />,
    inactive: <Pause className="w-4 h-4 text-red-400" />,
    pending: <Clock className="w-4 h-4 text-yellow-400" />,
    suspended: <AlertCircle className="w-4 h-4 text-orange-400" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`relative p-6 rounded-xl bg-gradient-to-br ${
        colorClasses[program.color]
      } backdrop-blur-sm border ${
        colorClasses[program.color].split(" ")[2]
      } shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group`}
    >
      {/* Header avec icône et informations */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`p-3 rounded-lg bg-white/10 ${
              iconColors[program.color]
            }`}
          >
            {program.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-[#b8d070] transition-colors">
              {program.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs px-2 py-1 rounded-full bg-white/20 text-white/80 font-medium">
                {typeLabels[program.type]}
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
                {program.duration}
              </span>
              <div className="flex items-center gap-1">
                {statusIcons[program.status]}
              </div>
            </div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
      </div>

      {/* Description */}
      <p className="text-white/70 text-sm mb-4 line-clamp-2">
        {program.description}
      </p>

      {/* Statistiques principales */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-white/60" />
          <div>
            <p className="text-xs text-white/60">Étudiants</p>
            <p className="text-sm font-semibold text-white">
              {program.students.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-white/60" />
          <div>
            <p className="text-xs text-white/60">Enseignants</p>
            <p className="text-sm font-semibold text-white">
              {program.faculty_count}
            </p>
          </div>
        </div>
      </div>

      {/* Informations du programme */}
      <div className="space-y-2 text-xs text-white/60 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-3 h-3" />
          <span>Créé en {program.established}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{program.location}</span>
        </div>
        {program.credits > 0 && (
          <div className="flex items-center gap-2">
            <Award className="w-3 h-3" />
            <span>{program.credits} crédits</span>
          </div>
        )}
      </div>

      {/* Indicateur de statut */}
      <div className="absolute top-4 right-4">
        <div
          className={`w-3 h-3 rounded-full ${
            program.status === "active"
              ? "bg-green-400 shadow-lg shadow-green-400/50"
              : program.status === "inactive"
              ? "bg-red-400 shadow-lg shadow-red-400/50"
              : program.status === "pending"
              ? "bg-yellow-400 shadow-lg shadow-yellow-400/50"
              : "bg-orange-400 shadow-lg shadow-orange-400/50"
          }`}
        />
      </div>
    </motion.div>
  );
};

// Composant principal de la page Programmes
const ProgramsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterFaculty, setFilterFaculty] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  // Filtrage des données
  const filteredData = programsData.filter((program) => {
    const matchesSearch = program.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || program.type === filterType;
    const matchesFaculty =
      filterFaculty === "all" || program.faculty === filterFaculty;
    return matchesSearch && matchesType && matchesFaculty;
  });

  // Statistiques globales
  const totalStudents = programsData.reduce(
    (sum, program) => sum + program.students,
    0
  );
  const totalFaculty = programsData.reduce(
    (sum, program) => sum + program.faculty_count,
    0
  );
  const activePrograms = programsData.filter(
    (program) => program.status === "active"
  ).length;

  // Liste des facultés uniques
  const faculties = [
    ...new Set(programsData.map((program) => program.faculty)),
  ];

  // Statistiques par type
  const statsByType = programsData.reduce((acc, program) => {
    if (!acc[program.type]) {
      acc[program.type] = { count: 0, students: 0 };
    }
    acc[program.type].count += 1;
    acc[program.type].students += program.students;
    return acc;
  }, {} as Record<string, { count: number; students: number }>);

  // Top 3 des programmes par nombre d'étudiants
  const topProgramsByStudents = [...programsData]
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
              <BookOpen className="w-8 h-8 text-[#1d8b93]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Programmes de Formation
              </h1>
              <p className="text-white/70">
                Gestion et organisation des programmes universitaires
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
                  <p className="text-xs text-white/50">+20% cette année</p>
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
                  <p className="text-xs text-white/50">+15% cette année</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-purple-500/20">
                  <BookOpen className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Programmes Actifs</p>
                  <p className="text-2xl font-bold text-white">
                    {activePrograms}
                  </p>
                  <p className="text-xs text-white/50">
                    sur {programsData.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-orange-500/20">
                  <Award className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Types de Formation</p>
                  <p className="text-2xl font-bold text-white">5</p>
                  <p className="text-xs text-white/50">Licence à Doctorat</p>
                </div>
              </div>
            </div>
          </div>

          {/* Répartition par type */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#b8d070]" />
              Répartition par Type de Programme
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(statsByType).map(([type, stats]) => {
                const typeLabels = {
                  licence: "Licences",
                  master: "Masters",
                  doctorat: "Doctorats",
                  certificat: "Certificats",
                  diplome: "Diplômes",
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

          {/* Top 3 des programmes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#b8d070]" />
              Top 3 des Programmes par Nombre d'Étudiants
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topProgramsByStudents.map((program, index) => (
                <div
                  key={program.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#b8d070] to-[#a2c65e] flex items-center justify-center text-[#1d8b93] font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white text-sm truncate">
                      {program.name}
                    </div>
                    <div className="text-xs text-white/60">
                      {program.students.toLocaleString()} étudiants
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
                placeholder="Rechercher un programme..."
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
                  <option value="licence" className="bg-gray-800">
                    Licences
                  </option>
                  <option value="master" className="bg-gray-800">
                    Masters
                  </option>
                  <option value="doctorat" className="bg-gray-800">
                    Doctorats
                  </option>
                  <option value="certificat" className="bg-gray-800">
                    Certificats
                  </option>
                  <option value="diplome" className="bg-gray-800">
                    Diplômes
                  </option>
                </select>
              </div>

              <div className="relative">
                <select
                  value={filterFaculty}
                  onChange={(e) => setFilterFaculty(e.target.value)}
                  className="pl-4 pr-8 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="all" className="bg-gray-800">
                    Toutes les facultés
                  </option>
                  {faculties.map((faculty) => (
                    <option
                      key={faculty}
                      value={faculty}
                      className="bg-gray-800"
                    >
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
          </div>
        </motion.div>

        {/* Grille des programmes */}
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
          {filteredData.map((program, index) => (
            <div key={program.id} onClick={() => setSelectedProgram(program)}>
              <ProgramCard program={program} index={index} />
            </div>
          ))}
        </motion.div>

        {/* Modal de détails du programme */}
        {selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProgram(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-[#b8d070] to-[#a2c65e] shadow-lg">
                    {selectedProgram.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {selectedProgram.name}
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/20 text-white/80 text-sm font-medium">
                        {selectedProgram.type === "licence"
                          ? "Licence"
                          : selectedProgram.type === "master"
                          ? "Master"
                          : selectedProgram.type === "doctorat"
                          ? "Doctorat"
                          : selectedProgram.type === "certificat"
                          ? "Certificat"
                          : "Diplôme"}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm">
                        {selectedProgram.duration}
                      </span>
                      <div
                        className={`w-3 h-3 rounded-full ${
                          selectedProgram.status === "active"
                            ? "bg-green-400"
                            : selectedProgram.status === "inactive"
                            ? "bg-red-400"
                            : selectedProgram.status === "pending"
                            ? "bg-yellow-400"
                            : "bg-orange-400"
                        }`}
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProgram(null)}
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
                  <p className="text-white/70">{selectedProgram.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-white/60 mb-2">
                        Informations Générales
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white/70">Étudiants</span>
                          <span className="text-white font-semibold">
                            {selectedProgram.students.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Enseignants</span>
                          <span className="text-white font-semibold">
                            {selectedProgram.faculty_count}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Durée</span>
                          <span className="text-white font-semibold">
                            {selectedProgram.duration}
                          </span>
                        </div>
                        {selectedProgram.credits > 0 && (
                          <div className="flex justify-between">
                            <span className="text-white/70">Crédits</span>
                            <span className="text-white font-semibold">
                              {selectedProgram.credits}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-white/70">Coordinateur</span>
                          <span className="text-white font-semibold">
                            {selectedProgram.coordinator}
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
                            {selectedProgram.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-white/50" />
                          <span className="text-white/70">
                            {selectedProgram.phone}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-white/50" />
                          <span className="text-white/70">
                            {selectedProgram.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-white/50" />
                          <span className="text-white/70">
                            {selectedProgram.faculty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-white/60 mb-2">
                      Prérequis
                    </h4>
                    <div className="space-y-1">
                      {selectedProgram.prerequisites.map((prereq, idx) => (
                        <div
                          key={idx}
                          className="text-xs text-white/70 flex items-center gap-1"
                        >
                          <CheckCircle className="w-3 h-3 text-[#b8d070]" />
                          {prereq}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-white/60 mb-2">
                      Cours Principaux
                    </h4>
                    <div className="space-y-1">
                      {selectedProgram.courses.map((course, idx) => (
                        <div
                          key={idx}
                          className="text-xs text-white/70 flex items-center gap-1"
                        >
                          <BookOpen className="w-3 h-3 text-[#b8d070]" />
                          {course}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-white/60 mb-2">
                      Débouchés Professionnels
                    </h4>
                    <div className="space-y-1">
                      {selectedProgram.careerPaths.map((career, idx) => (
                        <div
                          key={idx}
                          className="text-xs text-white/70 flex items-center gap-1"
                        >
                          <Target className="w-3 h-3 text-[#b8d070]" />
                          {career}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-white/60 mb-2">
                      Réalisations
                    </h4>
                    <div className="space-y-1">
                      {selectedProgram.achievements.map((achievement, idx) => (
                        <div
                          key={idx}
                          className="text-xs text-white/70 flex items-center gap-1"
                        >
                          <Star className="w-3 h-3 text-[#b8d070]" />
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button className="flex-1 py-3 px-6 bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93] font-semibold rounded-xl hover:shadow-lg transition-all duration-300">
                    S'inscrire
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
            <BookOpen className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white/70 mb-2">
              Aucun programme trouvé
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

export default ProgramsPage;
