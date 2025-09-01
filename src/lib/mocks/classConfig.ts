// Mock data pour la configuration des classes
// Schéma JSON flexible aligné sur le modèle backend UniteStructurelle

export interface ClassConfiguration {
  // Informations de base
  annee_scolaire: string;
  salle: string;
  capacite_max: number;

  // Sections visibles
  show_sections: {
    eleves: boolean;
    profs: boolean;
    cours: boolean;
    emploi_temps: boolean;
    evaluations: boolean;
    statistiques: boolean;
  };

  // Configuration des cours
  cours: {
    matieres: Array<{
      id: string;
      nom: string;
      coefficient: number;
      heures_semaine: number;
      enseignant_id?: string;
      couleur: string;
    }>;
    horaires: {
      debut_journee: string;
      fin_journee: string;
      duree_creneau: number; // en minutes
      pause_dejeuner: string;
    };
  };

  // Configuration de l'emploi du temps
  emploi_temps: {
    jours: string[];
    creneaux: Array<{
      id: string;
      heure_debut: string;
      heure_fin: string;
      matiere_id?: string;
      enseignant_id?: string;
      salle?: string;
      type: "cours" | "pause" | "dejeuner";
    }>;
  };

  // Configuration des évaluations
  evaluations: {
    types: Array<{
      id: string;
      nom: string;
      coefficient: number;
      frequence: "hebdomadaire" | "mensuel" | "trimestriel";
    }>;
    bareme: {
      note_max: number;
      seuil_reussite: number;
    };
  };

  // Métadonnées additionnelles
  metadonnees?: Record<string, unknown>;
}

// Configuration par défaut pour une classe
export const defaultClassConfig: ClassConfiguration = {
  annee_scolaire: "2024-2025",
  salle: "A1",
  capacite_max: 30,

  show_sections: {
    eleves: true,
    profs: true,
    cours: true,
    emploi_temps: true,
    evaluations: true,
    statistiques: true,
  },

  cours: {
    matieres: [
      {
        id: "matiere-1",
        nom: "Français",
        coefficient: 3,
        heures_semaine: 8,
        couleur: "from-blue-400 to-cyan-500",
      },
      {
        id: "matiere-2",
        nom: "Mathématiques",
        coefficient: 4,
        heures_semaine: 8,
        couleur: "from-green-400 to-emerald-500",
      },
      {
        id: "matiere-3",
        nom: "Éveil",
        coefficient: 2,
        heures_semaine: 4,
        couleur: "from-purple-400 to-violet-500",
      },
      {
        id: "matiere-4",
        nom: "Dessin",
        coefficient: 1,
        heures_semaine: 2,
        couleur: "from-orange-400 to-red-500",
      },
      {
        id: "matiere-5",
        nom: "Sport",
        coefficient: 1,
        heures_semaine: 2,
        couleur: "from-pink-400 to-rose-500",
      },
    ],
    horaires: {
      debut_journee: "08:00",
      fin_journee: "17:00",
      duree_creneau: 60,
      pause_dejeuner: "12:00-13:00",
    },
  },

  emploi_temps: {
    jours: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
    creneaux: [
      {
        id: "creneau-1",
        heure_debut: "08:00",
        heure_fin: "09:00",
        type: "cours",
      },
      {
        id: "creneau-2",
        heure_debut: "09:00",
        heure_fin: "10:00",
        type: "cours",
      },
      {
        id: "creneau-3",
        heure_debut: "10:00",
        heure_fin: "10:15",
        type: "pause",
      },
      {
        id: "creneau-4",
        heure_debut: "10:15",
        heure_fin: "11:15",
        type: "cours",
      },
      {
        id: "creneau-5",
        heure_debut: "11:15",
        heure_fin: "12:00",
        type: "cours",
      },
      {
        id: "creneau-6",
        heure_debut: "12:00",
        heure_fin: "13:00",
        type: "dejeuner",
      },
      {
        id: "creneau-7",
        heure_debut: "13:00",
        heure_fin: "14:00",
        type: "cours",
      },
      {
        id: "creneau-8",
        heure_debut: "14:00",
        heure_fin: "15:00",
        type: "cours",
      },
      {
        id: "creneau-9",
        heure_debut: "15:00",
        heure_fin: "15:15",
        type: "pause",
      },
      {
        id: "creneau-10",
        heure_debut: "15:15",
        heure_fin: "16:15",
        type: "cours",
      },
      {
        id: "creneau-11",
        heure_debut: "16:15",
        heure_fin: "17:00",
        type: "cours",
      },
    ],
  },

  evaluations: {
    types: [
      {
        id: "eval-1",
        nom: "Contrôle continu",
        coefficient: 1,
        frequence: "hebdomadaire",
      },
      {
        id: "eval-2",
        nom: "Devoir sur table",
        coefficient: 2,
        frequence: "mensuel",
      },
      {
        id: "eval-3",
        nom: "Examen trimestriel",
        coefficient: 3,
        frequence: "trimestriel",
      },
    ],
    bareme: {
      note_max: 20,
      seuil_reussite: 10,
    },
  },
};

// Configuration spécifique pour la 1ère Année
export const classe1ereConfig: ClassConfiguration = {
  ...defaultClassConfig,
  salle: "A1",
  capacite_max: 28,
  cours: {
    ...defaultClassConfig.cours,
    matieres: [
      {
        id: "matiere-1",
        nom: "Français",
        coefficient: 3,
        heures_semaine: 8,
        couleur: "from-blue-400 to-cyan-500",
      },
      {
        id: "matiere-2",
        nom: "Mathématiques",
        coefficient: 4,
        heures_semaine: 8,
        couleur: "from-green-400 to-emerald-500",
      },
      {
        id: "matiere-3",
        nom: "Éveil",
        coefficient: 2,
        heures_semaine: 4,
        couleur: "from-purple-400 to-violet-500",
      },
      {
        id: "matiere-4",
        nom: "Dessin",
        coefficient: 1,
        heures_semaine: 2,
        couleur: "from-orange-400 to-red-500",
      },
      {
        id: "matiere-5",
        nom: "Sport",
        coefficient: 1,
        heures_semaine: 2,
        couleur: "from-pink-400 to-rose-500",
      },
    ],
  },
};

// Fonctions utilitaires
export const getClassConfig = (classeId: string): ClassConfiguration => {
  // Pour l'instant, retourner la config de la 1ère année
  // Plus tard, on pourra charger depuis une API
  switch (classeId) {
    case "1ere":
      return classe1ereConfig;
    default:
      return defaultClassConfig;
  }
};

export const updateClassConfig = (
  classeId: string,
  config: Partial<ClassConfiguration>
): ClassConfiguration => {
  const currentConfig = getClassConfig(classeId);
  const updatedConfig = { ...currentConfig, ...config };

  // Ici on pourrait sauvegarder dans une API
  console.log(
    `Configuration mise à jour pour la classe ${classeId}:`,
    updatedConfig
  );

  return updatedConfig;
};

export const toggleSection = (
  classeId: string,
  section: keyof ClassConfiguration["show_sections"]
): boolean => {
  const config = getClassConfig(classeId);
  const newValue = !config.show_sections[section];

  updateClassConfig(classeId, {
    show_sections: {
      ...config.show_sections,
      [section]: newValue,
    },
  });

  return newValue;
};
