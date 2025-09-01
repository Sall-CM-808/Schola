"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  GraduationCap,
  Settings,
  Plus,
  BookOpen,
  Building2,
  Calendar,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  getClassConfig,
  ClassConfiguration,
  updateClassConfig,
} from "@/lib/mocks/classConfig";
import {
  getEtudiantsByClasse,
  getEnseignantsByClasse,
  countElementsByType,
  Etudiant,
  Enseignant,
} from "@/lib/mocks/elements";
import { useUnitContext } from "@/contexts/UnitContext";
import ClassConfigWizard from "@/components/admin_dashboard/ClassConfigWizard";

interface ClassPageProps {
  params: {
    unitId: string;
  };
}

export default function ClassPage({ params }: ClassPageProps) {
  const { unitId } = params;
  const { setUnit } = useUnitContext();
  const [config, setConfig] = useState<ClassConfiguration | null>(null);
  const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
  const [enseignants, setEnseignants] = useState<Enseignant[]>([]);
  const [showConfigWizard, setShowConfigWizard] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "eleves" | "profs" | "cours" | "emploi" | "evaluations"
  >("eleves");

  useEffect(() => {
    // Charger la configuration de la classe
    const classConfig = getClassConfig(unitId);
    setConfig(classConfig);

    // Charger les éléments (étudiants et enseignants)
    const etudiantsData = getEtudiantsByClasse(unitId);
    const enseignantsData = getEnseignantsByClasse(unitId);

    setEtudiants(etudiantsData);
    setEnseignants(enseignantsData);

    // Mettre à jour le contexte de l'unité
    setUnit({
      id: unitId,
      type_unite: "classe",
      nom: unitId === "1ere" ? "1ère Année" : unitId,
      path: [
        "Groupe Scolaire Sylla Lamine",
        "Primaire",
        unitId === "1ere" ? "1ère Année" : unitId,
      ],
    });
  }, [unitId, setUnit]);

  if (!config) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8d070]"></div>
      </div>
    );
  }

  const stats = countElementsByType(unitId);

  const handleSaveConfig = async (newConfig: ClassConfiguration) => {
    try {
      const updatedConfig = updateClassConfig(unitId, newConfig);
      setConfig(updatedConfig);
      return Promise.resolve();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      return Promise.reject(error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header avec breadcrumb et bouton Configurer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/60">
          <span>Administration</span>
          <span>•</span>
          <span>Structure</span>
          <span>•</span>
          <span className="text-white">Primaire</span>
          <span>•</span>
          <span className="text-white font-medium">
            {unitId === "1ere" ? "1ère Année" : unitId}
          </span>
        </nav>

        {/* Titre et sous-titre */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white/60 uppercase tracking-wider mb-2">
              Classe
            </p>
            <h1 className="text-4xl font-bold text-white mb-3">
              {unitId === "1ere" ? "1ère Année" : unitId}
            </h1>
            <div className="flex items-center gap-4 text-white/60">
              <span>Année scolaire {config.annee_scolaire}</span>
              <span>•</span>
              <span>Salle {config.salle}</span>
              <span>•</span>
              <span>Capacité {config.capacite_max} élèves</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowConfigWizard(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#b8d070] text-[#1d8b93] rounded-xl font-medium hover:bg-[#a1c95a] transition-colors shadow-lg"
          >
            <Settings className="w-5 h-5" />
            Configurer la classe
          </motion.button>
        </div>
      </motion.div>

      {/* KPIs cliquables */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => setActiveTab("eleves")}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all cursor-pointer group"
        >
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-sm text-white/60 mb-1">Élèves</p>
            <p className="text-2xl font-bold text-white">{stats.etudiant}</p>
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => setActiveTab("profs")}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all cursor-pointer group"
        >
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6 text-green-400" />
            </div>
            <p className="text-sm text-white/60 mb-1">Enseignants</p>
            <p className="text-2xl font-bold text-white">{stats.enseignant}</p>
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => setActiveTab("cours")}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all cursor-pointer group"
        >
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6 text-purple-400" />
            </div>
            <p className="text-sm text-white/60 mb-1">Matières</p>
            <p className="text-2xl font-bold text-white">
              {config.cours.matieres.length}
            </p>
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => setActiveTab("emploi")}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all cursor-pointer group"
        >
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/20 mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6 text-yellow-400" />
            </div>
            <p className="text-sm text-white/60 mb-1">Emploi du temps</p>
            <p className="text-2xl font-bold text-white">
              {config.emploi_temps.creneaux.length}
            </p>
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => setActiveTab("evaluations")}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all cursor-pointer group"
        >
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-red-500/20 mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6 text-red-400" />
            </div>
            <p className="text-sm text-white/60 mb-1">Évaluations</p>
            <p className="text-2xl font-bold text-white">
              {config.evaluations.types.length}
            </p>
          </div>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4"
        >
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-orange-500/20 mx-auto mb-3 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-orange-400" />
            </div>
            <p className="text-sm text-white/60 mb-1">Salle</p>
            <p className="text-2xl font-bold text-white">{config.salle}</p>
          </div>
        </motion.div>
      </div>

      {/* Onglets avec badges */}
      <div className="flex gap-2">
        {[
          {
            id: "eleves" as const,
            label: "Élèves",
            icon: Users,
            count: etudiants.length,
          },
          {
            id: "profs" as const,
            label: "Enseignants",
            icon: GraduationCap,
            count: enseignants.length,
          },
          {
            id: "cours" as const,
            label: "Cours",
            icon: BookOpen,
            count: config.cours.matieres.length,
          },
          {
            id: "emploi" as const,
            label: "Emploi du temps",
            icon: Calendar,
            count: config.emploi_temps.creneaux.length,
          },
          {
            id: "evaluations" as const,
            label: "Évaluations",
            icon: Target,
            count: config.evaluations.types.length,
          },
        ].map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-[#b8d070] text-[#1d8b93] shadow-lg"
                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className="text-white/60">·</span>
              <span className="font-semibold">{tab.count}</span>
            </button>
          );
        })}
      </div>

      {/* Contenu selon l'onglet actif */}
      <AnimatePresence mode="wait">
        {activeTab === "eleves" && (
          <motion.div
            key="eleves"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                Liste des Élèves
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#b8d070] text-[#1d8b93] rounded-lg hover:bg-[#a1c95a] transition-colors">
                <Plus className="w-4 h-4" />
                Ajouter un élève
              </button>
            </div>

            <div className="space-y-3">
              {etudiants.length > 0 ? (
                etudiants.map((etudiant) => (
                  <motion.div
                    key={etudiant.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 border-l-4 border-transparent hover:border-[#b8d070]/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {etudiant.objet_str.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {etudiant.objet_str}
                        </p>
                        <p className="text-white/60 text-sm">
                          N° {etudiant.metadonnees.numero} •{" "}
                          {etudiant.metadonnees.age} ans •{" "}
                          {etudiant.metadonnees.sexe === "F"
                            ? "Fille"
                            : "Garçon"}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              etudiant.metadonnees.niveau === "Excellent"
                                ? "bg-green-500/20 text-green-400"
                                : etudiant.metadonnees.niveau === "Très bien"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-orange-500/20 text-orange-400"
                            }`}
                          >
                            {etudiant.metadonnees.niveau}
                          </span>
                          {etudiant.metadonnees.evolution && (
                            <span className="text-green-400 text-xs flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              {etudiant.metadonnees.evolution}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {etudiant.metadonnees.moyenne && (
                        <>
                          <p className="text-[#b8d070] font-semibold">
                            {etudiant.metadonnees.moyenne}/20
                          </p>
                          <p className="text-white/60 text-sm">Moyenne</p>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    Aucun élève inscrit
                  </h3>
                  <p className="text-white/60 mb-6">
                    Commencez par ajouter des élèves à cette classe
                  </p>
                  <button className="px-6 py-3 bg-[#b8d070] text-[#1d8b93] rounded-lg hover:bg-[#a1c95a] transition-colors font-medium">
                    <Plus className="w-4 h-4 inline mr-2" />
                    Ajouter un élève
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === "profs" && (
          <motion.div
            key="profs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                Liste des Enseignants
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#b8d070] text-[#1d8b93] rounded-lg hover:bg-[#a1c95a] transition-colors">
                <Plus className="w-4 h-4" />
                Ajouter un enseignant
              </button>
            </div>

            <div className="space-y-3">
              {enseignants.map((enseignant) => (
                <motion.div
                  key={enseignant.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 border-l-4 border-transparent hover:border-[#b8d070]/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {enseignant.objet_str.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {enseignant.objet_str}
                      </p>
                      <p className="text-white/60 text-sm">
                        {enseignant.metadonnees.specialite} •{" "}
                        {enseignant.metadonnees.experience_annees} ans
                        d&apos;expérience
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-white/60 text-xs">
                          {enseignant.metadonnees.diplome}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[#b8d070] font-semibold">
                      {enseignant.metadonnees.matieres.length} matière(s)
                    </p>
                    <p className="text-white/60 text-sm">Enseignées</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "cours" && (
          <motion.div
            key="cours"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                Programme des Cours
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#b8d070] text-[#1d8b93] rounded-lg hover:bg-[#a1c95a] transition-colors">
                <Plus className="w-4 h-4" />
                Ajouter une matière
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {config.cours.matieres.map((matiere) => (
                <motion.div
                  key={matiere.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-white/5 rounded-lg border border-white/20 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-3 h-3 rounded-full bg-gradient-to-r ${matiere.couleur}`}
                    ></div>
                    <h3 className="font-medium text-white">{matiere.nom}</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-white/60">
                      Coefficient:{" "}
                      <span className="text-white">{matiere.coefficient}</span>
                    </p>
                    <p className="text-white/60">
                      Heures/semaine:{" "}
                      <span className="text-white">
                        {matiere.heures_semaine}h
                      </span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "emploi" && (
          <motion.div
            key="emploi"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                Emploi du Temps
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#b8d070] text-[#1d8b93] rounded-lg hover:bg-[#a1c95a] transition-colors">
                <Plus className="w-4 h-4" />
                Modifier l&apos;emploi du temps
              </button>
            </div>

            <div className="grid grid-cols-5 gap-4">
              {config.emploi_temps.jours.map((jour) => (
                <div key={jour} className="text-center">
                  <h3 className="font-medium text-white mb-3">{jour}</h3>
                  <div className="space-y-2">
                    {config.emploi_temps.creneaux.map((creneau) => (
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                Système d&apos;Évaluation
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#b8d070] text-[#1d8b93] rounded-lg hover:bg-[#a1c95a] transition-colors">
                <Plus className="w-4 h-4" />
                Ajouter un type d&apos;évaluation
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">
                  Types d&apos;Évaluation
                </h3>
                <div className="space-y-3">
                  {config.evaluations.types.map((type) => (
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
                <h3 className="text-lg font-medium text-white mb-4">Barème</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/20">
                    <p className="text-white/60 text-sm">Note maximale</p>
                    <p className="text-white text-xl font-bold">
                      {config.evaluations.bareme.note_max}/20
                    </p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg border border-white/20">
                    <p className="text-white/60 text-sm">Seuil de réussite</p>
                    <p className="text-white text-xl font-bold">
                      {config.evaluations.bareme.seuil_reussite}/20
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wizard de configuration complet */}
      <ClassConfigWizard
        isOpen={showConfigWizard}
        onClose={() => setShowConfigWizard(false)}
        config={config}
        onSave={handleSaveConfig}
      />
    </div>
  );
}
