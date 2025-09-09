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
} from "lucide-react";

// Types pour les données des facultés
interface Faculty {
  id: string;
  name: string;
  description: string;
  students: number;
  faculty: number;
  departments: number;
  programs: number;
  established: string;
  location: string;
  dean: string;
  email: string;
  phone: string;
  website: string;
  status: "active" | "inactive" | "pending";
  color: string;
  icon: React.ReactNode;
  specialties: string[];
  achievements: string[];
  researchAreas: string[];
}

// Données mockées pour les facultés
const facultiesData: Faculty[] = [
  {
    id: "fac-sciences",
    name: "Faculté des Sciences et Technologies",
    description:
      "Formation et recherche en sciences fondamentales, mathématiques, physique, chimie et sciences de la terre. Centre d'excellence pour l'innovation technologique et la recherche interdisciplinaire.",
    students: 3247,
    faculty: 186,
    departments: 5,
    programs: 12,
    established: "1965",
    location: "Campus Principal - Bâtiment A & B",
    dean: "Prof. Dr. Marie Diallo",
    email: "sciences@univ.edu",
    phone: "+224 123 456 789",
    website: "www.univ.edu/sciences",
    status: "active",
    color: "blue",
    icon: <Building2 className="w-6 h-6" />,
    specialties: [
      "Mathématiques",
      "Physique",
      "Chimie",
      "Biologie",
      "Informatique",
    ],
    achievements: [
      "Accréditation internationale",
      "Prix d'excellence 2023",
      "Centre de recherche reconnu",
    ],
    researchAreas: [
      "IA et Big Data",
      "Nanotechnologies",
      "Énergies renouvelables",
      "Biotechnologies",
    ],
  },
  {
    id: "fac-medecine",
    name: "Faculté de Médecine et Pharmacie",
    description:
      "Formation médicale, pharmaceutique et recherche en santé publique. Partenaire des hôpitaux universitaires et centres de recherche biomédicale. Formation de professionnels de santé de haut niveau.",
    students: 2156,
    faculty: 124,
    departments: 8,
    programs: 15,
    established: "1972",
    location: "Campus Santé - Complexe Médical",
    dean: "Prof. Dr. Ahmed Camara",
    email: "medecine@univ.edu",
    phone: "+224 123 456 790",
    website: "www.univ.edu/medecine",
    status: "active",
    color: "red",
    icon: <Award className="w-6 h-6" />,
    specialties: [
      "Médecine générale",
      "Chirurgie",
      "Pharmacie",
      "Dentisterie",
      "Sage-femme",
    ],
    achievements: [
      "Hôpital universitaire certifié",
      "Programme d'échange international",
      "Recherche clinique avancée",
    ],
    researchAreas: [
      "Médecine tropicale",
      "Pharmacologie",
      "Chirurgie mini-invasive",
      "Santé publique",
    ],
  },
  {
    id: "fac-lettres",
    name: "Faculté des Lettres et Sciences Humaines",
    description:
      "Formation en littérature, histoire, philosophie, langues et sciences sociales. Centre de recherche en humanités et patrimoine culturel. Développement de la pensée critique et de la créativité.",
    students: 1892,
    faculty: 98,
    departments: 6,
    programs: 18,
    established: "1968",
    location: "Campus Central - Bâtiment C",
    dean: "Prof. Dr. Fatoumata Bah",
    email: "lettres@univ.edu",
    phone: "+224 123 456 791",
    website: "www.univ.edu/lettres",
    status: "active",
    color: "purple",
    icon: <BookOpen className="w-6 h-6" />,
    specialties: [
      "Littérature",
      "Histoire",
      "Philosophie",
      "Langues",
      "Sociologie",
    ],
    achievements: [
      "Centre de traduction",
      "Archives historiques",
      "Programme de préservation culturelle",
    ],
    researchAreas: [
      "Littérature africaine",
      "Histoire coloniale",
      "Philosophie éthique",
      "Linguistique",
    ],
  },
  {
    id: "fac-droit",
    name: "Faculté de Droit et Sciences Politiques",
    description:
      "Formation juridique, sciences politiques et administration publique. Partenaire des institutions judiciaires et administratives. Formation de juristes et de leaders politiques compétents.",
    students: 1456,
    faculty: 67,
    departments: 4,
    programs: 10,
    established: "1975",
    location: "Campus Central - Bâtiment D",
    dean: "Prof. Dr. Mamadou Barry",
    email: "droit@univ.edu",
    phone: "+224 123 456 792",
    website: "www.univ.edu/droit",
    status: "active",
    color: "indigo",
    icon: <Shield className="w-6 h-6" />,
    specialties: [
      "Droit civil",
      "Droit pénal",
      "Droit international",
      "Sciences politiques",
      "Administration",
    ],
    achievements: [
      "Clinique juridique",
      "Partenariat avec la Cour suprême",
      "Formation des magistrats",
    ],
    researchAreas: [
      "Droit constitutionnel",
      "Droit des affaires",
      "Droit international",
      "Gouvernance",
    ],
  },
  {
    id: "fac-economie",
    name: "Faculté d'Économie et Gestion",
    description:
      "Formation en économie, gestion d'entreprise, comptabilité et finance. Centre de recherche en développement économique. Formation de managers et d'économistes pour le développement national.",
    students: 2234,
    faculty: 89,
    departments: 5,
    programs: 14,
    established: "1980",
    location: "Campus Central - Bâtiment E",
    dean: "Prof. Dr. Aissatou Diallo",
    email: "economie@univ.edu",
    phone: "+224 123 456 793",
    website: "www.univ.edu/economie",
    status: "active",
    color: "green",
    icon: <TrendingUp className="w-6 h-6" />,
    specialties: [
      "Économie",
      "Gestion",
      "Comptabilité",
      "Finance",
      "Marketing",
    ],
    achievements: [
      "Incubateur d'entreprises",
      "Partenariat avec le secteur privé",
      "Programme MBA international",
    ],
    researchAreas: [
      "Économie du développement",
      "Finance islamique",
      "Entrepreneuriat",
      "Économie numérique",
    ],
  },
];

// Composant Card pour chaque faculté
const FacultyCard: React.FC<{ faculty: Faculty; index: number }> = ({
  faculty,
  index,
}) => {
  const colorClasses = {
    blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
    red: "from-red-500/20 to-red-600/20 border-red-500/30",
    purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
    indigo: "from-indigo-500/20 to-indigo-600/20 border-indigo-500/30",
    green: "from-green-500/20 to-green-600/20 border-green-500/30",
  };

  const iconColors = {
    blue: "text-blue-400",
    red: "text-red-400",
    purple: "text-purple-400",
    indigo: "text-indigo-400",
    green: "text-green-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`relative p-6 rounded-xl bg-gradient-to-br ${
        colorClasses[faculty.color]
      } backdrop-blur-sm border ${
        colorClasses[faculty.color].split(" ")[2]
      } shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group`}
    >
      {/* Header avec icône et informations */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`p-3 rounded-lg bg-white/10 ${
              iconColors[faculty.color]
            }`}
          >
            {faculty.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-[#b8d070] transition-colors">
              {faculty.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs px-2 py-1 rounded-full bg-white/20 text-white/80 font-medium">
                Doyen: {faculty.dean}
              </span>
              <div
                className={`w-2 h-2 rounded-full ${
                  faculty.status === "active"
                    ? "bg-green-400"
                    : faculty.status === "inactive"
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
        {faculty.description}
      </p>

      {/* Statistiques principales */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-white/60" />
          <div>
            <p className="text-xs text-white/60">Étudiants</p>
            <p className="text-sm font-semibold text-white">
              {faculty.students.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-white/60" />
          <div>
            <p className="text-xs text-white/60">Enseignants</p>
            <p className="text-sm font-semibold text-white">
              {faculty.faculty}
            </p>
          </div>
        </div>
      </div>

      {/* Spécialités */}
      <div className="mb-4">
        <p className="text-xs text-white/60 mb-2">Spécialités principales</p>
        <div className="flex flex-wrap gap-1">
          {faculty.specialties.slice(0, 3).map((specialty, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/80"
            >
              {specialty}
            </span>
          ))}
          {faculty.specialties.length > 3 && (
            <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/80">
              +{faculty.specialties.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Informations supplémentaires */}
      <div className="space-y-2 text-xs text-white/60">
        <div className="flex items-center gap-2">
          <Calendar className="w-3 h-3" />
          <span>Créée en {faculty.established}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{faculty.location}</span>
        </div>
      </div>

      {/* Indicateur de statut */}
      <div className="absolute top-4 right-4">
        <div
          className={`w-3 h-3 rounded-full ${
            faculty.status === "active"
              ? "bg-green-400 shadow-lg shadow-green-400/50"
              : faculty.status === "inactive"
              ? "bg-red-400 shadow-lg shadow-red-400/50"
              : "bg-yellow-400 shadow-lg shadow-yellow-400/50"
          }`}
        />
      </div>
    </motion.div>
  );
};

// Composant principal de la page Facultés
const FacultiesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);

  // Filtrage des données
  const filteredData = facultiesData.filter((faculty) => {
    const matchesSearch = faculty.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Statistiques globales
  const totalStudents = facultiesData.reduce(
    (sum, faculty) => sum + faculty.students,
    0
  );
  const totalFaculty = facultiesData.reduce(
    (sum, faculty) => sum + faculty.faculty,
    0
  );
  const totalDepartments = facultiesData.reduce(
    (sum, faculty) => sum + faculty.departments,
    0
  );
  const totalPrograms = facultiesData.reduce(
    (sum, faculty) => sum + faculty.programs,
    0
  );

  // Ratio étudiants/enseignants
  const studentFacultyRatio =
    totalFaculty > 0 ? (totalStudents / totalFaculty).toFixed(1) : "0";

  // Top 3 des facultés par nombre d'étudiants
  const topFacultiesByStudents = [...facultiesData]
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
                Facultés de l'Université
              </h1>
              <p className="text-white/70">
                Gestion et organisation des facultés universitaires
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
                  <p className="text-xs text-white/50">+15% cette année</p>
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
                  <p className="text-xs text-white/50">+10% cette année</p>
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
                    {totalDepartments}
                  </p>
                  <p className="text-xs text-white/50">28 programmes</p>
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

          {/* Top 3 des facultés */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#b8d070]" />
              Top 3 des Facultés par Nombre d'Étudiants
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topFacultiesByStudents.map((faculty, index) => (
                <div
                  key={faculty.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#b8d070] to-[#a2c65e] flex items-center justify-center text-[#1d8b93] font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white text-sm truncate">
                      {faculty.name}
                    </div>
                    <div className="text-xs text-white/60">
                      {faculty.students.toLocaleString()} étudiants
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
                placeholder="Rechercher une faculté..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
              />
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

        {/* Grille des facultés */}
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
          {filteredData.map((faculty, index) => (
            <div key={faculty.id} onClick={() => setSelectedFaculty(faculty)}>
              <FacultyCard faculty={faculty} index={index} />
            </div>
          ))}
        </motion.div>

        {/* Modal de détails de la faculté */}
        {selectedFaculty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedFaculty(null)}
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
                    {selectedFaculty.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {selectedFaculty.name}
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/20 text-white/80 text-sm font-medium">
                        Doyen: {selectedFaculty.dean}
                      </span>
                      <div
                        className={`w-3 h-3 rounded-full ${
                          selectedFaculty.status === "active"
                            ? "bg-green-400"
                            : selectedFaculty.status === "inactive"
                            ? "bg-red-400"
                            : "bg-yellow-400"
                        }`}
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFaculty(null)}
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
                  <p className="text-white/70">{selectedFaculty.description}</p>
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
                            {selectedFaculty.students.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Enseignants</span>
                          <span className="text-white font-semibold">
                            {selectedFaculty.faculty}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Départements</span>
                          <span className="text-white font-semibold">
                            {selectedFaculty.departments}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Programmes</span>
                          <span className="text-white font-semibold">
                            {selectedFaculty.programs}
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
                            {selectedFaculty.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-white/50" />
                          <span className="text-white/70">
                            {selectedFaculty.phone}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-white/50" />
                          <span className="text-white/70">
                            {selectedFaculty.website}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-white/50" />
                          <span className="text-white/70">
                            {selectedFaculty.location}
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
                      {selectedFaculty.specialties.map((specialty, idx) => (
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
                      Réalisations
                    </h4>
                    <div className="space-y-1">
                      {selectedFaculty.achievements.map((achievement, idx) => (
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

                  <div>
                    <h4 className="text-sm font-medium text-white/60 mb-2">
                      Domaines de Recherche
                    </h4>
                    <div className="space-y-1">
                      {selectedFaculty.researchAreas.map((area, idx) => (
                        <div
                          key={idx}
                          className="text-xs text-white/70 flex items-center gap-1"
                        >
                          <Target className="w-3 h-3 text-[#b8d070]" />
                          {area}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button className="flex-1 py-3 px-6 bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93] font-semibold rounded-xl hover:shadow-lg transition-all duration-300">
                    Voir les départements
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
              Aucune faculté trouvée
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

export default FacultiesPage;
