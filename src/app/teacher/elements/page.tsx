"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdvancedDataTable from "@/components/admin_dashboard/AdvancedDataTable";
import {
  getTeacherElements,
  toggleElementStatus,
  createNewElement,
  type TeacherElementRow,
} from "@/lib/mocks/teacherElements";
import {
  FileText,
  BookOpen,
  FileEdit,
  Archive,
  Plus,
  Eye,
  Users,
  TrendingUp,
  Clock,
  Filter,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";

const TeacherElementsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [elements, setElements] = useState<TeacherElementRow[]>([]);
  const [filteredElements, setFilteredElements] = useState<TeacherElementRow[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getTeacherElements();
        setElements(data);
        setFilteredElements(data);
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
    let filtered = elements;

    if (searchTerm) {
      filtered = filtered.filter(
        (el) =>
          el.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          el.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((el) => el.type === typeFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((el) => el.status === statusFilter);
    }

    setFilteredElements(filtered);
  }, [elements, searchTerm, typeFilter, statusFilter]);

  const handleStatusToggle = async (
    elementId: string,
    currentStatus: string
  ) => {
    const newStatus = currentStatus === "Publié" ? "Archivé" : "Publié";
    try {
      await toggleElementStatus(elementId, newStatus);
      const updatedElements = elements.map((el) =>
        el.id === elementId ? { ...el, status: newStatus } : el
      );
      setElements(updatedElements);
    } catch (error) {
      console.error("Erreur lors du changement de statut:", error);
    }
  };

  const handleCreateNew = async () => {
    setIsCreating(true);
    try {
      const newElement = await createNewElement({
        title: "Nouvel élément",
        type: "course",
        description: "Description à compléter",
      });
      setElements([newElement, ...elements]);
    } catch (error) {
      console.error("Erreur lors de la création:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen className="w-4 h-4" />;
      case "assignment":
        return <FileEdit className="w-4 h-4" />;
      case "resource":
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "course":
        return "Cours";
      case "assignment":
        return "Devoir";
      case "resource":
        return "Ressource";
      default:
        return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Publié":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "Brouillon":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case "Archivé":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    }
  };

  const columns = [
    {
      key: "title",
      header: "Titre",
      render: (element: TeacherElementRow) => (
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-white/10 text-white/70 mt-1">
            {getTypeIcon(element.type)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-white truncate">
              {element.title}
            </div>
            {element.description && (
              <div className="text-sm text-white/60 truncate mt-1">
                {element.description}
              </div>
            )}
            <div className="flex items-center gap-4 mt-2">
              {element.studentsCount! > 0 && (
                <div className="flex items-center gap-1 text-xs text-white/50">
                  <Users className="w-3 h-3" />
                  {element.studentsCount} étudiants
                </div>
              )}
              {element.completionRate! > 0 && (
                <div className="flex items-center gap-1 text-xs text-white/50">
                  <TrendingUp className="w-3 h-3" />
                  {element.completionRate}% complété
                </div>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (element: TeacherElementRow) => (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
          {getTypeLabel(element.type)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Statut",
      render: (element: TeacherElementRow) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            element.status
          )}`}
        >
          {element.status}
        </span>
      ),
    },
    {
      key: "unitName",
      header: "Unité",
      render: (element: TeacherElementRow) => (
        <div className="text-sm text-white/70 max-w-xs truncate">
          {element.unitName}
        </div>
      ),
    },
    {
      key: "updatedAt",
      header: "Modifié le",
      render: (element: TeacherElementRow) => (
        <div className="flex items-center gap-1 text-sm text-white/70">
          <Clock className="w-3 h-3" />
          {new Date(element.updatedAt).toLocaleDateString("fr-FR")}
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (element: TeacherElementRow) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleStatusToggle(element.id, element.status)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
              element.status === "Publié"
                ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                : "bg-green-500/20 text-green-300 hover:bg-green-500/30"
            }`}
          >
            {element.status === "Publié" ? "Archiver" : "Publier"}
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200">
            <Eye className="w-4 h-4 text-white/60" />
          </button>
        </div>
      ),
      sortable: false,
    },
  ];

  const filterOptions = [
    {
      key: "type",
      label: "Type",
      options: [
        { value: "all", label: "Tous les types" },
        { value: "course", label: "Cours" },
        { value: "assignment", label: "Devoirs" },
        { value: "resource", label: "Ressources" },
      ],
    },
    {
      key: "status",
      label: "Statut",
      options: [
        { value: "all", label: "Tous les statuts" },
        { value: "Publié", label: "Publié" },
        { value: "Brouillon", label: "Brouillon" },
        { value: "Archivé", label: "Archivé" },
      ],
    },
  ];

  const stats = {
    total: elements.length,
    published: elements.filter((el) => el.status === "Publié").length,
    drafts: elements.filter((el) => el.status === "Brouillon").length,
    archived: elements.filter((el) => el.status === "Archivé").length,
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Mes éléments</h1>
          <p className="text-white/70">
            Gérez vos cours, devoirs et ressources pédagogiques
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCreateNew}
          disabled={isCreating}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93] font-medium rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50"
        >
          {isCreating ? (
            <div className="w-5 h-5 border-2 border-[#1d8b93]/30 border-t-[#1d8b93] rounded-full animate-spin" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
          {isCreating ? "Création..." : "Nouveau"}
        </motion.button>
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
            <Sparkles className="w-5 h-5 text-blue-400 opacity-50" />
          </div>
          <div className="text-blue-300 text-sm font-medium mb-2">Total</div>
          <div className="text-3xl font-bold text-white">{stats.total}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-xl border border-green-500/30 p-6 relative overflow-hidden"
        >
          <div className="absolute top-2 right-2">
            <Zap className="w-5 h-5 text-green-400 opacity-50" />
          </div>
          <div className="text-green-300 text-sm font-medium mb-2">Publiés</div>
          <div className="text-3xl font-bold text-white">{stats.published}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm rounded-xl border border-orange-500/30 p-6 relative overflow-hidden"
        >
          <div className="absolute top-2 right-2">
            <FileEdit className="w-5 h-5 text-orange-400 opacity-50" />
          </div>
          <div className="text-orange-300 text-sm font-medium mb-2">
            Brouillons
          </div>
          <div className="text-3xl font-bold text-white">{stats.drafts}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-sm rounded-xl border border-red-500/30 p-6 relative overflow-hidden"
        >
          <div className="absolute top-2 right-2">
            <Archive className="w-5 h-5 text-red-400 opacity-50" />
          </div>
          <div className="text-red-300 text-sm font-medium mb-2">Archivés</div>
          <div className="text-3xl font-bold text-white">{stats.archived}</div>
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
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent"
          >
            <option value="all">Tous les types</option>
            <option value="course">Cours</option>
            <option value="assignment">Devoirs</option>
            <option value="resource">Ressources</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent"
          >
            <option value="all">Tous les statuts</option>
            <option value="Publié">Publié</option>
            <option value="Brouillon">Brouillon</option>
            <option value="Archivé">Archivé</option>
          </select>

          <div className="ml-auto text-sm text-white/60">
            {filteredElements.length} résultat
            {filteredElements.length !== 1 ? "s" : ""}
          </div>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <AdvancedDataTable
          columns={columns}
          rows={filteredElements}
          emptyMessage="Aucun élément trouvé"
          pageSize={10}
        />
      </motion.div>
    </motion.div>
  );
};

export default TeacherElementsPage;
