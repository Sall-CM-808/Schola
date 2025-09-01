"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Save,
  Info,
  Users,
  BookOpen,
  Calendar,
  Target,
  Plus,
  Trash2,
} from "lucide-react";
import { ClassConfiguration } from "@/lib/mocks/classConfig";

interface ClassConfigWizardProps {
  isOpen: boolean;
  onClose: () => void;
  config: ClassConfiguration;
  onSave: (config: ClassConfiguration) => void;
}

type TabType = "infos" | "sections" | "cours" | "emploi" | "evaluations";

export default function ClassConfigWizard({
  isOpen,
  onClose,
  config,
  onSave,
}: ClassConfigWizardProps) {
  const [activeTab, setActiveTab] = useState<TabType>("infos");
  const [localConfig, setLocalConfig] = useState<ClassConfiguration>(config);
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: "infos" as const, label: "Infos", icon: Info },
    { id: "sections" as const, label: "Sections", icon: Users },
    { id: "cours" as const, label: "Cours", icon: BookOpen },
    { id: "emploi" as const, label: "Emploi du temps", icon: Calendar },
    { id: "evaluations" as const, label: "Évaluations", icon: Target },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(localConfig);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateConfig = (updates: Partial<ClassConfiguration>) => {
    setLocalConfig((prev) => ({ ...prev, ...updates }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <h2 className="text-2xl font-bold text-white">
            Configurer la Classe
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation des onglets */}
        <div className="flex border-b border-white/20">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#b8d070] text-[#1d8b93]"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Contenu des onglets */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <AnimatePresence mode="wait">
            {activeTab === "infos" && (
              <motion.div
                key="infos"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  Informations de base
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Année scolaire
                    </label>
                    <input
                      type="text"
                      value={localConfig.annee_scolaire}
                      onChange={(e) =>
                        updateConfig({ annee_scolaire: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#b8d070]"
                      placeholder="2024-2025"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Salle
                    </label>
                    <input
                      type="text"
                      value={localConfig.salle}
                      onChange={(e) => updateConfig({ salle: e.target.value })}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#b8d070]"
                      placeholder="A1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Capacité maximale
                    </label>
                    <input
                      type="number"
                      value={localConfig.capacite_max}
                      onChange={(e) =>
                        updateConfig({
                          capacite_max: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#b8d070]"
                      placeholder="30"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "sections" && (
              <motion.div
                key="sections"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  Sections visibles
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(localConfig.show_sections).map(
                    ([key, value]) => (
                      <label
                        key={key}
                        className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) =>
                            updateConfig({
                              show_sections: {
                                ...localConfig.show_sections,
                                [key]: e.target.checked,
                              },
                            })
                          }
                          className="w-4 h-4 text-[#b8d070] bg-white/10 border-white/20 rounded focus:ring-[#b8d070]"
                        />
                        <span className="text-white capitalize">
                          {key === "eleves"
                            ? "Élèves"
                            : key === "profs"
                            ? "Enseignants"
                            : key === "cours"
                            ? "Cours"
                            : key === "emploi_temps"
                            ? "Emploi du temps"
                            : key === "evaluations"
                            ? "Évaluations"
                            : key === "statistiques"
                            ? "Statistiques"
                            : key}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "cours" && (
              <motion.div
                key="cours"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">
                    Programme des cours
                  </h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#b8d070] text-[#1d8b93] rounded-lg hover:bg-[#a1c95a] transition-colors">
                    <Plus className="w-4 h-4" />
                    Ajouter une matière
                  </button>
                </div>

                <div className="space-y-4">
                  {localConfig.cours.matieres.map((matiere, index) => (
                    <div
                      key={matiere.id}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/20"
                    >
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                          type="text"
                          value={matiere.nom}
                          onChange={(e) => {
                            const newMatieres = [...localConfig.cours.matieres];
                            newMatieres[index].nom = e.target.value;
                            updateConfig({
                              cours: {
                                ...localConfig.cours,
                                matieres: newMatieres,
                              },
                            });
                          }}
                          className="px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#b8d070]"
                          placeholder="Nom de la matière"
                        />
                        <input
                          type="number"
                          value={matiere.coefficient}
                          onChange={(e) => {
                            const newMatieres = [...localConfig.cours.matieres];
                            newMatieres[index].coefficient =
                              parseInt(e.target.value) || 0;
                            updateConfig({
                              cours: {
                                ...localConfig.cours,
                                matieres: newMatieres,
                              },
                            });
                          }}
                          className="px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#b8d070]"
                          placeholder="Coefficient"
                        />
                        <input
                          type="number"
                          value={matiere.heures_semaine}
                          onChange={(e) => {
                            const newMatieres = [...localConfig.cours.matieres];
                            newMatieres[index].heures_semaine =
                              parseInt(e.target.value) || 0;
                            updateConfig({
                              cours: {
                                ...localConfig.cours,
                                matieres: newMatieres,
                              },
                            });
                          }}
                          className="px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#b8d070]"
                          placeholder="Heures/semaine"
                        />
                      </div>
                      <button
                        onClick={() => {
                          const newMatieres = localConfig.cours.matieres.filter(
                            (_, i) => i !== index
                          );
                          updateConfig({
                            cours: {
                              ...localConfig.cours,
                              matieres: newMatieres,
                            },
                          });
                        }}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "emploi" && (
              <motion.div
                key="emploi"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">
                    Emploi du temps
                  </h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#b8d070] text-[#1d8b93] rounded-lg hover:bg-[#a1c95a] transition-colors">
                    <Plus className="w-4 h-4" />
                    Ajouter un créneau
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-4">
                  {localConfig.emploi_temps.jours.map((jour) => (
                    <div key={jour} className="text-center">
                      <h4 className="font-medium text-white mb-3">{jour}</h4>
                      <div className="space-y-2">
                        {localConfig.emploi_temps.creneaux.map((creneau) => (
                          <div
                            key={creneau.id}
                            className={`p-2 rounded text-xs text-center ${
                              creneau.type === "cours"
                                ? "bg-blue-500/20 text-blue-400"
                                : creneau.type === "pause"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-orange-500/20 text-orange-400"
                            }`}
                          >
                            {creneau.heure_debut}-{creneau.heure_fin}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "evaluations" && (
              <motion.div
                key="evaluations"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">
                    Système d&apos;évaluation
                  </h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#b8d070] text-[#1d8b93] rounded-lg hover:bg-[#a1c95a] transition-colors">
                    <Plus className="w-4 h-4" />
                    Ajouter un type
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-white mb-4">
                      Types d&apos;évaluation
                    </h4>
                    <div className="space-y-3">
                      {localConfig.evaluations.types.map((type) => (
                        <div
                          key={type.id}
                          className="p-3 bg-white/5 rounded-lg border border-white/20"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-white font-medium">
                              {type.nom}
                            </span>
                            <span className="text-[#b8d070] font-semibold">
                              Coef. {type.coefficient}
                            </span>
                          </div>
                          <p className="text-white/60 text-sm mt-1">
                            {type.frequence}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-white mb-4">
                      Barème
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-white/5 rounded-lg border border-white/20">
                        <p className="text-white/60 text-sm">Note maximale</p>
                        <p className="text-white text-xl font-bold">
                          {localConfig.evaluations.bareme.note_max}/20
                        </p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg border border-white/20">
                        <p className="text-white/60 text-sm">
                          Seuil de réussite
                        </p>
                        <p className="text-white text-xl font-bold">
                          {localConfig.evaluations.bareme.seuil_reussite}/20
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer avec boutons */}
        <div className="flex items-center justify-between p-6 border-t border-white/20">
          <div className="flex gap-2">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#b8d070] text-[#1d8b93]"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2 bg-[#b8d070] text-[#1d8b93] rounded-lg hover:bg-[#a1c95a] transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Sauvegarde..." : "Sauvegarder"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
