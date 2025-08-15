// Mock data for teacher dashboard

// Fonction pour simuler un délai de chargement
export const simulateLoading = (delay: number = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

// Types for teacher dashboard
export interface TeacherKPI {
  published: number;
  drafts: number;
  archived: number;
  groups: number;
  activeAssignments: number;
}

export interface ElementRow {
  id: string;
  title: string;
  type: "course" | "assignment" | "resource";
  status: "Publié" | "Brouillon" | "Archivé";
  unitName: string;
  updatedAt: string;
}

export interface AssignmentRow {
  id: string;
  scopeName: string;
  roleName: string;
  startDate: string;
  status: "Actif" | "En attente" | "Expiré";
}

export interface ElementTypeDistribution {
  course: number;
  assignment: number;
  resource: number;
}

export interface WeeklyProgression {
  week: string;
  published: number;
}

// Mock data
export const kpi: TeacherKPI = {
  published: 24,
  drafts: 8,
  archived: 12,
  groups: 6,
  activeAssignments: 3,
};

export const recentElements: ElementRow[] = [
  {
    id: "elem_001",
    title: "Introduction à l'Analyse Mathématique",
    type: "course",
    status: "Publié",
    unitName: "Département de Mathématiques",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "elem_002",
    title: "TD Calcul Différentiel",
    type: "assignment",
    status: "Publié",
    unitName: "Département de Mathématiques",
    updatedAt: "2024-01-14T16:45:00Z",
  },
  {
    id: "elem_003",
    title: "Formulaire de Dérivées",
    type: "resource",
    status: "Brouillon",
    unitName: "Département de Mathématiques",
    updatedAt: "2024-01-14T09:20:00Z",
  },
  {
    id: "elem_004",
    title: "Examen Partiel - Analyse",
    type: "assignment",
    status: "Publié",
    unitName: "Département de Mathématiques",
    updatedAt: "2024-01-13T14:15:00Z",
  },
  {
    id: "elem_005",
    title: "Cours Intégrales",
    type: "course",
    status: "Brouillon",
    unitName: "Département de Mathématiques",
    updatedAt: "2024-01-12T11:30:00Z",
  },
  {
    id: "elem_006",
    title: "Exercices Limites",
    type: "assignment",
    status: "Publié",
    unitName: "Département de Mathématiques",
    updatedAt: "2024-01-11T08:45:00Z",
  },
  {
    id: "elem_007",
    title: "Vidéo Explicative - Continuité",
    type: "resource",
    status: "Publié",
    unitName: "Département de Mathématiques",
    updatedAt: "2024-01-10T15:20:00Z",
  },
  {
    id: "elem_008",
    title: "TP Géométrie Analytique",
    type: "assignment",
    status: "Archivé",
    unitName: "Département de Mathématiques",
    updatedAt: "2024-01-09T13:10:00Z",
  },
  {
    id: "elem_009",
    title: "Cours Probabilités",
    type: "course",
    status: "Publié",
    unitName: "Département de Mathématiques",
    updatedAt: "2024-01-08T10:00:00Z",
  },
  {
    id: "elem_010",
    title: "Annales Examens",
    type: "resource",
    status: "Publié",
    unitName: "Département de Mathématiques",
    updatedAt: "2024-01-07T16:30:00Z",
  },
];

export const recentAssignments: AssignmentRow[] = [
  {
    id: "assign_001",
    scopeName: "L2 Mathématiques - Groupe A",
    roleName: "Enseignant Responsable",
    startDate: "2023-09-01T00:00:00Z",
    status: "Actif",
  },
  {
    id: "assign_002",
    scopeName: "L3 Mathématiques - Analyse",
    roleName: "Chargé de TD",
    startDate: "2023-09-15T00:00:00Z",
    status: "Actif",
  },
  {
    id: "assign_003",
    scopeName: "M1 Statistiques",
    roleName: "Intervenant",
    startDate: "2024-01-08T00:00:00Z",
    status: "Actif",
  },
  {
    id: "assign_004",
    scopeName: "L1 Mathématiques - Groupe B",
    roleName: "Tuteur",
    startDate: "2023-10-01T00:00:00Z",
    status: "En attente",
  },
  {
    id: "assign_005",
    scopeName: "Prépa MPSI",
    roleName: "Professeur Principal",
    startDate: "2023-08-28T00:00:00Z",
    status: "Actif",
  },
  {
    id: "assign_006",
    scopeName: "L2 Physique - Mathématiques",
    roleName: "Intervenant",
    startDate: "2023-11-01T00:00:00Z",
    status: "Expiré",
  },
  {
    id: "assign_007",
    scopeName: "Formation Continue",
    roleName: "Formateur",
    startDate: "2024-01-10T00:00:00Z",
    status: "En attente",
  },
  {
    id: "assign_008",
    scopeName: "L3 Informatique - Maths",
    roleName: "Chargé de Cours",
    startDate: "2023-09-01T00:00:00Z",
    status: "Actif",
  },
  {
    id: "assign_009",
    scopeName: "Master Recherche",
    roleName: "Directeur de Mémoire",
    startDate: "2023-10-15T00:00:00Z",
    status: "Actif",
  },
  {
    id: "assign_010",
    scopeName: "Doctorat Mathématiques",
    roleName: "Co-Directeur",
    startDate: "2023-12-01T00:00:00Z",
    status: "En attente",
  },
];

export const elementTypeDistribution: ElementTypeDistribution = {
  course: 14,
  assignment: 7,
  resource: 3,
};

export const weeklyProgression: WeeklyProgression[] = [
  { week: "S48", published: 2 },
  { week: "S49", published: 4 },
  { week: "S50", published: 1 },
  { week: "S51", published: 0 },
  { week: "S52", published: 3 },
  { week: "S01", published: 5 },
  { week: "S02", published: 4 },
  { week: "S03", published: 5 },
];
