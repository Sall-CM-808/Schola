"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  ExternalLink,
  Calendar,
  User,
  BookOpen,
  Upload,
  Plus,
  X,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "pdf" | "video" | "image" | "audio" | "link" | "document";
  subject: string;
  teacher: string;
  uploadDate: string;
  size?: string;
  url: string;
  downloadCount: number;
  isNew?: boolean;
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: "pending" | "submitted" | "late";
  file?: File;
}

// Données simulées pour les ressources
const resourcesData: Resource[] = [
  {
    id: "1",
    title: "Cours de Mathématiques - Chapitre 5",
    description: "Les fonctions exponentielles et logarithmiques",
    type: "pdf",
    subject: "Mathématiques",
    teacher: "M. Diallo",
    uploadDate: "2024-01-15",
    size: "2.5 MB",
    url: "#",
    downloadCount: 45,
    isNew: true
  },
  {
    id: "2",
    title: "Expérience de Chimie - Réactions acide-base",
    description: "Vidéo explicative des réactions en laboratoire",
    type: "video",
    subject: "Physique-Chimie",
    teacher: "Mme Bah",
    uploadDate: "2024-01-14",
    size: "125 MB",
    url: "#",
    downloadCount: 32
  },
  {
    id: "3",
    title: "Cartes historiques - Seconde Guerre Mondiale",
    description: "Collection d'images et cartes de la période 1939-1945",
    type: "image",
    subject: "Histoire-Géographie",
    teacher: "M. Camara",
    uploadDate: "2024-01-13",
    size: "15.8 MB",
    url: "#",
    downloadCount: 28
  },
  {
    id: "4",
    title: "Exercices d'Anglais - Present Perfect",
    description: "Fichiers audio pour la prononciation",
    type: "audio",
    subject: "Anglais",
    teacher: "M. Sylla",
    uploadDate: "2024-01-12",
    size: "45 MB",
    url: "#",
    downloadCount: 67
  },
  {
    id: "5",
    title: "Ressources en ligne - Littérature française",
    description: "Liens vers des analyses d'œuvres classiques",
    type: "link",
    subject: "Français",
    teacher: "Mme Touré",
    uploadDate: "2024-01-11",
    url: "https://example.com",
    downloadCount: 89
  }
];

// Données simulées pour les devoirs à déposer
const assignmentsData: Assignment[] = [
  {
    id: "1",
    title: "Dissertation - L'existentialisme",
    subject: "Philosophie",
    dueDate: "2024-01-20",
    status: "pending"
  },
  {
    id: "2",
    title: "Rapport de TP - Chimie organique",
    subject: "Physique-Chimie",
    dueDate: "2024-01-18",
    status: "submitted"
  },
  {
    id: "3",
    title: "Analyse de texte - Baudelaire",
    subject: "Français",
    dueDate: "2024-01-15",
    status: "late"
  }
];

const getFileIcon = (type: string) => {
  switch (type) {
    case "pdf":
    case "document":
      return FileText;
    case "video":
      return Video;
    case "image":
      return Image;
    case "audio":
      return Music;
    case "link":
      return ExternalLink;
    default:
      return Archive;
  }
};

const getFileTypeLabel = (type: string) => {
  switch (type) {
    case "pdf":
      return "PDF";
    case "video":
      return "Vidéo";
    case "image":
      return "Image";
    case "audio":
      return "Audio";
    case "link":
      return "Lien";
    case "document":
      return "Document";
    default:
      return "Fichier";
  }
};

const getStatusInfo = (status: string) => {
  switch (status) {
    case "pending":
      return { label: "À rendre", color: "text-yellow-400", bgColor: "bg-yellow-400/20", icon: Clock };
    case "submitted":
      return { label: "Rendu", color: "text-green-400", bgColor: "bg-green-400/20", icon: CheckCircle };
    case "late":
      return { label: "En retard", color: "text-red-400", bgColor: "bg-red-400/20", icon: AlertCircle };
    default:
      return { label: "Inconnu", color: "text-gray-400", bgColor: "bg-gray-400/20", icon: Clock };
  }
};

export default function StudentResourcesPage() {
  const [activeTab, setActiveTab] = useState<"resources" | "upload">("resources");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const subjects = ["all", ...Array.from(new Set(resourcesData.map(r => r.subject)))];
  const types = ["all", "pdf", "video", "image", "audio", "link"];

  const filteredResources = resourcesData.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === "all" || resource.subject === selectedSubject;
    const matchesType = selectedType === "all" || resource.type === selectedType;
    return matchesSearch && matchesSubject && matchesType;
  });

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    setUploadFiles(prev => [...prev, ...files]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadFiles(prev => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setUploadFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#1d8b93] to-[#b8d070] bg-clip-text text-transparent">
            Ressources
          </h1>
          <p className="text-white/70 mt-1">
            Accédez à vos documents et déposez vos devoirs
          </p>
        </div>

        {/* Onglets */}
        <div className="flex bg-white/10 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("resources")}
            className={cn(
              "px-6 py-2 rounded-md text-sm font-medium transition-all",
              activeTab === "resources"
                ? "bg-[#1d8b93] text-white"
                : "text-white/70 hover:text-white"
            )}
          >
            Ressources
          </button>
          <button
            onClick={() => setActiveTab("upload")}
            className={cn(
              "px-6 py-2 rounded-md text-sm font-medium transition-all",
              activeTab === "upload"
                ? "bg-[#1d8b93] text-white"
                : "text-white/70 hover:text-white"
            )}
          >
            Dépôt de devoirs
          </button>
        </div>
      </motion.div>

      {activeTab === "resources" && (
        <div className="space-y-6">
          {/* Filtres et recherche */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4"
          >
            {/* Recherche */}
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher des ressources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#1d8b93]/50"
              />
            </div>

            {/* Filtre par matière */}
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#1d8b93]/50"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject === "all" ? "Toutes les matières" : subject}
                </option>
              ))}
            </select>

            {/* Filtre par type */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#1d8b93]/50"
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === "all" ? "Tous les types" : getFileTypeLabel(type)}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Liste des ressources */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => {
              const FileIcon = getFileIcon(resource.type);
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedResource(resource)}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 cursor-pointer hover:bg-white/10 transition-all duration-200 hover:scale-[1.02] relative"
                >
                  {resource.isNew && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-[#b8d070] text-black text-xs font-bold px-2 py-1 rounded-full">
                        NOUVEAU
                      </span>
                    </div>
                  )}

                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-[#1d8b93]/20 border border-[#1d8b93]/30 rounded-lg">
                      <FileIcon className="w-6 h-6 text-[#1d8b93]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-white/10 text-white/70 px-2 py-1 rounded-full">
                          {getFileTypeLabel(resource.type)}
                        </span>
                        {resource.size && (
                          <span className="text-xs text-white/50">{resource.size}</span>
                        )}
                      </div>
                      <h3 className="font-bold text-white mb-2 line-clamp-2">{resource.title}</h3>
                    </div>
                  </div>

                  <p className="text-white/70 text-sm mb-4 line-clamp-2">{resource.description}</p>

                  <div className="space-y-2 text-sm text-white/60">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      {resource.subject}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {resource.teacher}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(resource.uploadDate).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      {resource.downloadCount} téléchargements
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-white/50"
            >
              <Archive className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">Aucune ressource trouvée</p>
              <p className="text-sm">Essayez de modifier vos filtres de recherche</p>
            </motion.div>
          )}
        </div>
      )}

      {activeTab === "upload" && (
        <div className="space-y-6">
          {/* Devoirs à rendre */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4">Devoirs à rendre</h2>
            <div className="space-y-4">
              {assignmentsData.map((assignment, index) => {
                const statusInfo = getStatusInfo(assignment.status);
                const StatusIcon = statusInfo.icon;
                return (
                  <motion.div
                    key={assignment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${statusInfo.bgColor}`}>
                        <StatusIcon className={`w-5 h-5 ${statusInfo.color}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{assignment.title}</h3>
                        <p className="text-white/70 text-sm">{assignment.subject}</p>
                        <p className="text-white/50 text-xs">
                          Échéance: {new Date(assignment.dueDate).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-3 py-1 rounded-full ${statusInfo.bgColor} ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                      {assignment.status === "pending" && (
                        <button className="px-4 py-2 bg-[#1d8b93] hover:bg-[#1d8b93]/80 text-white rounded-lg text-sm transition-colors">
                          Déposer
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Zone de dépôt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4">Déposer des fichiers</h2>
            
            <div
              onDrop={handleFileDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              className={cn(
                "border-2 border-dashed rounded-xl p-8 text-center transition-colors",
                dragOver 
                  ? "border-[#1d8b93] bg-[#1d8b93]/10" 
                  : "border-white/20 hover:border-white/40"
              )}
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-white/50" />
              <p className="text-white text-lg mb-2">
                Glissez-déposez vos fichiers ici
              </p>
              <p className="text-white/70 mb-4">
                ou cliquez pour sélectionner
              </p>
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1d8b93] hover:bg-[#1d8b93]/80 text-white rounded-lg cursor-pointer transition-colors"
              >
                <Plus className="w-5 h-5" />
                Sélectionner des fichiers
              </label>
            </div>

            {/* Fichiers sélectionnés */}
            {uploadFiles.length > 0 && (
              <div className="mt-6">
                <h3 className="text-white font-bold mb-3">Fichiers sélectionnés</h3>
                <div className="space-y-2">
                  {uploadFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[#1d8b93]" />
                        <div>
                          <p className="text-white font-medium">{file.name}</p>
                          <p className="text-white/50 text-sm">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-white/50 hover:text-red-400 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <button className="px-6 py-3 bg-[#b8d070] hover:bg-[#b8d070]/80 text-black font-bold rounded-lg transition-colors">
                    Envoyer les fichiers
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Modal détails ressource */}
      <AnimatePresence>
        {selectedResource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedResource(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0f1c]/95 backdrop-blur-xl border border-white/20 rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Détails de la ressource</h3>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-white text-lg mb-2">{selectedResource.title}</h4>
                  <p className="text-white/70">{selectedResource.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-white/50 mb-1">Matière</div>
                    <div className="text-white">{selectedResource.subject}</div>
                  </div>
                  <div>
                    <div className="text-white/50 mb-1">Professeur</div>
                    <div className="text-white">{selectedResource.teacher}</div>
                  </div>
                  <div>
                    <div className="text-white/50 mb-1">Type</div>
                    <div className="text-white">{getFileTypeLabel(selectedResource.type)}</div>
                  </div>
                  <div>
                    <div className="text-white/50 mb-1">Taille</div>
                    <div className="text-white">{selectedResource.size || "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-white/50 mb-1">Date d'ajout</div>
                    <div className="text-white">
                      {new Date(selectedResource.uploadDate).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <div>
                    <div className="text-white/50 mb-1">Téléchargements</div>
                    <div className="text-white">{selectedResource.downloadCount}</div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#1d8b93] hover:bg-[#1d8b93]/80 text-white rounded-lg transition-colors">
                    <Download className="w-5 h-5" />
                    Télécharger
                  </button>
                  {selectedResource.type !== "link" && (
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg transition-colors">
                      <Eye className="w-5 h-5" />
                      Aperçu
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

