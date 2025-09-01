// Mock data pour les éléments (étudiants et enseignants)
// Aligné sur le modèle backend UniteStructurelle

export interface Element {
  id: string;
  type_element: "etudiant" | "enseignant" | "classe" | "cours";
  unite: string; // ID de l'unité structurelle
  unite_nom: string; // Nom de l'unité pour affichage
  content_type: number;
  object_id: string;
  objet_str: string; // Nom affiché
  statut: "actif" | "inactif" | "suspendu";
  actif: boolean;
  date_debut: string;
  date_fin?: string;
  date_creation: string;
  metadonnees?: Record<string, any>;
}

export interface Etudiant extends Element {
  type_element: "etudiant";
  metadonnees: {
    age: number;
    sexe: "M" | "F";
    moyenne?: number;
    niveau?: "Excellent" | "Très bien" | "Bien" | "Assez bien" | "Passable";
    evolution?: string;
    numero: string;
    classe_id: string;
  };
}

export interface Enseignant extends Element {
  type_element: "enseignant";
  metadonnees: {
    specialite: string;
    diplome: string;
    experience_annees: number;
    matieres: string[];
    classe_id: string;
  };
}

// Mock data pour les étudiants
export const etudiantsMock: Etudiant[] = [
  {
    id: "etudiant-1",
    type_element: "etudiant",
    unite: "classe-1ere",
    unite_nom: "1ère Année",
    content_type: 12,
    object_id: "user-1",
    objet_str: "Aminata Diallo",
    statut: "actif",
    actif: true,
    date_debut: "2024-09-01",
    date_creation: "2024-08-15T10:00:00Z",
    metadonnees: {
      age: 6,
      sexe: "F",
      moyenne: 15.5,
      niveau: "Très bien",
      evolution: "+0.3",
      numero: "2024001",
      classe_id: "classe-1ere",
    },
  },
  {
    id: "etudiant-2",
    type_element: "etudiant",
    unite: "classe-1ere",
    unite_nom: "1ère Année",
    content_type: 12,
    object_id: "user-2",
    objet_str: "Mamadou Bah",
    statut: "actif",
    actif: true,
    date_debut: "2024-09-01",
    date_creation: "2024-08-15T10:00:00Z",
    metadonnees: {
      age: 7,
      sexe: "M",
      moyenne: 14.2,
      niveau: "Bien",
      evolution: "+0.1",
      numero: "2024002",
      classe_id: "classe-1ere",
    },
  },
  {
    id: "etudiant-3",
    type_element: "etudiant",
    unite: "classe-1ere",
    unite_nom: "1ère Année",
    content_type: 12,
    object_id: "user-3",
    objet_str: "Fatoumata Camara",
    statut: "actif",
    actif: true,
    date_debut: "2024-09-01",
    date_creation: "2024-08-15T10:00:00Z",
    metadonnees: {
      age: 6,
      sexe: "F",
      moyenne: 16.8,
      niveau: "Excellent",
      evolution: "+0.8",
      numero: "2024003",
      classe_id: "classe-1ere",
    },
  },
];

// Mock data pour les enseignants
export const enseignantsMock: Enseignant[] = [
  {
    id: "enseignant-1",
    type_element: "enseignant",
    unite: "classe-1ere",
    unite_nom: "1ère Année",
    content_type: 13,
    object_id: "user-101",
    objet_str: "Mme Fatou Diallo",
    statut: "actif",
    actif: true,
    date_debut: "2024-09-01",
    date_creation: "2024-08-01T09:00:00Z",
    metadonnees: {
      specialite: "Enseignement Primaire",
      diplome: "Master en Sciences de l'Éducation",
      experience_annees: 8,
      matieres: ["Français", "Mathématiques", "Éveil"],
      classe_id: "classe-1ere",
    },
  },
  {
    id: "enseignant-2",
    type_element: "enseignant",
    unite: "classe-1ere",
    unite_nom: "1ère Année",
    content_type: 13,
    object_id: "user-102",
    objet_str: "M. Amadou Sow",
    statut: "actif",
    actif: true,
    date_debut: "2024-09-01",
    date_creation: "2024-08-01T09:00:00Z",
    metadonnees: {
      specialite: "Arts Plastiques",
      diplome: "Licence en Arts",
      experience_annees: 5,
      matieres: ["Dessin", "Peinture"],
      classe_id: "classe-1ere",
    },
  },
];

// Fonctions pour récupérer les éléments par unité
export const getElementsByUnite = (
  uniteId: string,
  type_element?: string
): Element[] => {
  let elements: Element[] = [];

  // Ajouter les étudiants
  if (!type_element || type_element === "etudiant") {
    elements.push(...etudiantsMock.filter((e) => e.unite === uniteId));
  }

  // Ajouter les enseignants
  if (!type_element || type_element === "enseignant") {
    elements.push(...enseignantsMock.filter((e) => e.unite === uniteId));
  }

  return elements;
};

export const getEtudiantsByClasse = (classeId: string): Etudiant[] => {
  return etudiantsMock.filter((e) => e.metadonnees.classe_id === classeId);
};

export const getEnseignantsByClasse = (classeId: string): Enseignant[] => {
  return enseignantsMock.filter((e) => e.metadonnees.classe_id === classeId);
};

export const countElementsByType = (
  uniteId: string
): Record<string, number> => {
  const etudiants = etudiantsMock.filter((e) => e.unite === uniteId).length;
  const enseignants = enseignantsMock.filter((e) => e.unite === uniteId).length;

  return {
    etudiant: etudiants,
    enseignant: enseignants,
    total: etudiants + enseignants,
  };
};


