"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  FileText,
  Users,
  UserPlus,
  Filter,
  CheckCircle,
  Clock,
  BarChart3,
  TrendingUp,
} from "lucide-react";

interface ExportCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  dataCount: number;
  formats: string[];
  lastExport?: string;
}

interface ExportFilters {
  dateFrom: string;
  dateTo: string;
  status: string;
  type: string;
}

const AdminReportsPage: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [filters, setFilters] = useState<ExportFilters>({
    dateFrom: "",
    dateTo: "",
    status: "",
    type: "",
  });

  const exportCards: ExportCard[] = [
    {
      id: "users",
      title: "Utilisateurs",
      description:
        "Exporter la liste complète des utilisateurs avec leurs informations",
      icon: Users,
      color: "bg-blue-500/20 border-blue-500/30 text-blue-300",
      dataCount: 1298,
      formats: ["CSV", "Excel", "PDF"],
      lastExport: "2024-01-15T10:30:00Z",
    },
    {
      id: "elements",
      title: "Éléments",
      description:
        "Exporter tous les éléments pédagogiques (cours, devoirs, ressources)",
      icon: FileText,
      color: "bg-green-500/20 border-green-500/30 text-green-300",
      dataCount: 75,
      formats: ["CSV", "Excel", "JSON"],
      lastExport: "2024-01-14T16:45:00Z",
    },
    {
      id: "attributions",
      title: "Attributions",
      description: "Exporter les attributions de rôles et leurs statuts",
      icon: UserPlus,
      color: "bg-purple-500/20 border-purple-500/30 text-purple-300",
      dataCount: 120,
      formats: ["CSV", "Excel", "PDF"],
      lastExport: "2024-01-13T09:15:00Z",
    },
    {
      id: "roles",
      title: "Rôles & Permissions",
      description: "Exporter la configuration des rôles et leurs permissions",
      icon: CheckCircle,
      color: "bg-orange-500/20 border-orange-500/30 text-orange-300",
      dataCount: 10,
      formats: ["JSON", "CSV", "PDF"],
      lastExport: "2024-01-12T14:20:00Z",
    },
    {
      id: "units",
      title: "Unités Structurelles",
      description: "Exporter la hiérarchie des unités organisationnelles",
      icon: BarChart3,
      color: "bg-cyan-500/20 border-cyan-500/30 text-cyan-300",
      dataCount: 17,
      formats: ["CSV", "JSON", "XML"],
      lastExport: "2024-01-11T11:00:00Z",
    },
    {
      id: "analytics",
      title: "Données Analytiques",
      description: "Exporter les statistiques d'utilisation et métriques",
      icon: TrendingUp,
      color: "bg-pink-500/20 border-pink-500/30 text-pink-300",
      dataCount: 2450,
      formats: ["CSV", "Excel", "JSON"],
    },
  ];

  const handleExport = async (cardId: string, format: string) => {
    setIsExporting(cardId);

    // Simuler le processus d'export
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simuler le téléchargement
    const card = exportCards.find((c) => c.id === cardId);
    if (card) {
      // Créer un nom de fichier
      const timestamp = new Date().toISOString().split("T")[0];
      const filename = `schola-${cardId}-${timestamp}.${format.toLowerCase()}`;

      // Simuler le téléchargement (dans une vraie app, on générerait le fichier)
      console.log(`📥 Téléchargement simulé: ${filename}`);

      // Mettre à jour la date du dernier export
      const cardIndex = exportCards.findIndex((c) => c.id === cardId);
      if (cardIndex !== -1) {
        exportCards[cardIndex].lastExport = new Date().toISOString();
      }

      // Simuler une notification de succès
      alert(
        `✅ Export réussi!\nFichier: ${filename}\nFormat: ${format}\nNombre d'enregistrements: ${card.dataCount}`
      );
    }

    setIsExporting(null);
    setSelectedCard(null);
  };

  const getFilterOptions = (cardId: string) => {
    switch (cardId) {
      case "users":
        return {
          status: [
            { value: "", label: "Tous les statuts" },
            { value: "active", label: "Actif" },
            { value: "inactive", label: "Inactif" },
          ],
          type: [
            { value: "", label: "Tous les types" },
            { value: "admin", label: "Administrateur" },
            { value: "teacher", label: "Enseignant" },
            { value: "student", label: "Étudiant" },
            { value: "staff", label: "Personnel" },
          ],
        };
      case "elements":
        return {
          status: [
            { value: "", label: "Tous les statuts" },
            { value: "active", label: "Actif" },
            { value: "draft", label: "Brouillon" },
            { value: "archived", label: "Archivé" },
          ],
          type: [
            { value: "", label: "Tous les types" },
            { value: "course", label: "Cours" },
            { value: "assignment", label: "Devoir" },
            { value: "resource", label: "Ressource" },
            { value: "exam", label: "Examen" },
          ],
        };
      case "attributions":
        return {
          status: [
            { value: "", label: "Tous les statuts" },
            { value: "active", label: "Active" },
            { value: "pending", label: "En attente" },
            { value: "expired", label: "Expirée" },
            { value: "cancelled", label: "Annulée" },
          ],
          type: [
            { value: "", label: "Toutes les portées" },
            { value: "Element", label: "Élément" },
            { value: "Unit", label: "Unité" },
            { value: "Global", label: "Global" },
          ],
        };
      default:
        return {
          status: [{ value: "", label: "Tous les statuts" }],
          type: [{ value: "", label: "Tous les types" }],
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <BarChart3 className="w-7 h-7 text-[#b8d070]" />
              Rapports & Export
            </h1>
            <p className="text-white/70">
              Exportez vos données dans différents formats pour analyse et
              archivage
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-white/60 text-sm">Exports ce mois</p>
            <p className="text-3xl font-bold text-[#b8d070]">47</p>
            <p className="text-white/60 text-sm">+12% vs mois dernier</p>
          </div>
        </div>
      </motion.div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-white/70 mb-1">
                Exports ce mois
              </h3>
              <div className="text-2xl font-bold text-white">47</div>
            </div>
            <div className="p-3 rounded-lg bg-blue-500/20">
              <Download className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <div className="text-sm text-blue-300">+12% vs mois dernier</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-white/70 mb-1">
                Données totales
              </h3>
              <div className="text-2xl font-bold text-white">3.97K</div>
            </div>
            <div className="p-3 rounded-lg bg-green-500/20">
              <BarChart3 className="w-5 h-5 text-green-400" />
            </div>
          </div>
          <div className="text-sm text-green-300">
            Enregistrements disponibles
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-white/70 mb-1">
                Formats supportés
              </h3>
              <div className="text-2xl font-bold text-white">6</div>
            </div>
            <div className="p-3 rounded-lg bg-purple-500/20">
              <FileText className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div className="text-sm text-purple-300">
            CSV, Excel, PDF, JSON...
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-white/70 mb-1">
                Dernier export
              </h3>
              <div className="text-2xl font-bold text-white">2h</div>
            </div>
            <div className="p-3 rounded-lg bg-orange-500/20">
              <Clock className="w-5 h-5 text-orange-400" />
            </div>
          </div>
          <div className="text-sm text-orange-300">Il y a 2 heures</div>
        </motion.div>
      </div>

      {/* Export Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exportCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg border ${card.color}`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#b8d070] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-white/60">
                      {card.dataCount} enregistrements
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-white/70 mb-4 line-clamp-2">
                {card.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {card.formats.map((format) => (
                  <span
                    key={format}
                    className="px-2 py-1 bg-white/10 text-white/70 rounded text-xs font-medium"
                  >
                    {format}
                  </span>
                ))}
              </div>

              {card.lastExport && (
                <div className="text-xs text-white/50 mb-4">
                  Dernier export:{" "}
                  {new Date(card.lastExport).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              )}

              <button
                onClick={() => setSelectedCard(card.id)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93] font-bold rounded-lg hover:from-[#a2c65e] hover:to-[#b8d070] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Download className="w-4 h-4" />
                Exporter
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Export Modal */}
      {selectedCard && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => !isExporting && setSelectedCard(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-b from-[#1d8b93] to-[#0d5a61] rounded-xl border border-white/10 shadow-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const card = exportCards.find((c) => c.id === selectedCard);
              if (!card) return null;

              const filterOptions = getFilterOptions(selectedCard);

              return (
                <>
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg border ${card.color}`}>
                        <card.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        Exporter {card.title}
                      </h3>
                    </div>
                    <p className="text-white/70 text-sm">
                      {card.dataCount} enregistrements disponibles
                    </p>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Filtres */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        Filtres
                      </h4>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white/80 mb-2">
                            Date de début
                          </label>
                          <input
                            type="date"
                            value={filters.dateFrom}
                            onChange={(e) =>
                              setFilters((prev) => ({
                                ...prev,
                                dateFrom: e.target.value,
                              }))
                            }
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b8d070] text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white/80 mb-2">
                            Date de fin
                          </label>
                          <input
                            type="date"
                            value={filters.dateTo}
                            onChange={(e) =>
                              setFilters((prev) => ({
                                ...prev,
                                dateTo: e.target.value,
                              }))
                            }
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b8d070] text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white/80 mb-2">
                            Statut
                          </label>
                          <select
                            value={filters.status}
                            onChange={(e) =>
                              setFilters((prev) => ({
                                ...prev,
                                status: e.target.value,
                              }))
                            }
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b8d070] text-sm"
                          >
                            {filterOptions.status.map((option) => (
                              <option
                                key={option.value}
                                value={option.value}
                                className="bg-[#1d8b93]"
                              >
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white/80 mb-2">
                            Type
                          </label>
                          <select
                            value={filters.type}
                            onChange={(e) =>
                              setFilters((prev) => ({
                                ...prev,
                                type: e.target.value,
                              }))
                            }
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b8d070] text-sm"
                          >
                            {filterOptions.type.map((option) => (
                              <option
                                key={option.value}
                                value={option.value}
                                className="bg-[#1d8b93]"
                              >
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Format Selection */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Format d&apos;export
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {card.formats.map((format) => (
                          <button
                            key={format}
                            onClick={() => handleExport(card.id, format)}
                            disabled={isExporting === card.id}
                            className={`p-3 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all duration-200 text-sm font-medium ${
                              isExporting === card.id
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:scale-105"
                            }`}
                          >
                            {isExporting === card.id ? (
                              <div className="flex items-center justify-center">
                                <div className="w-4 h-4 border border-current border-t-transparent rounded-full animate-spin"></div>
                              </div>
                            ) : (
                              format
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t border-white/10 flex gap-3">
                    <button
                      onClick={() => setSelectedCard(null)}
                      disabled={isExporting === card.id}
                      className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-colors duration-200 disabled:opacity-50"
                    >
                      Annuler
                    </button>
                  </div>
                </>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AdminReportsPage;
