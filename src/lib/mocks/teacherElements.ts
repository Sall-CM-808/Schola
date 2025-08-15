// Mock data for teacher elements management

// Fonction pour simuler un délai de chargement
export const simulateLoading = (delay: number = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export interface TeacherElementRow {
  id: string;
  title: string;
  type: "course" | "assignment" | "resource";
  status: "Publié" | "Brouillon" | "Archivé";
  unitName: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
  studentsCount?: number;
  completionRate?: number;
}

// Mock data with creative elements
export const teacherElements: TeacherElementRow[] = [
  {
    id: "elem_001",
    title: "Introduction à l'Analyse Mathématique",
    type: "course",
    status: "Publié",
    unitName: "Département de Mathématiques",
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    description: "Cours fondamental sur les limites et la continuité",
    studentsCount: 45,
    completionRate: 87,
  },
  {
    id: "elem_002",
    title: "TD Calcul Différentiel",
    type: "assignment",
    status: "Publié",
    unitName: "Département de Mathématiques",
    createdAt: "2024-01-12T14:00:00Z",
    updatedAt: "2024-01-14T16:45:00Z",
    description: "Exercices pratiques sur les dérivées",
    studentsCount: 42,
    completionRate: 73,
  },
  {
    id: "elem_003",
    title: "Formulaire de Dérivées",
    type: "resource",
    status: "Brouillon",
    unitName: "Département de Mathématiques",
    createdAt: "2024-01-13T09:00:00Z",
    updatedAt: "2024-01-14T09:20:00Z",
    description: "Document de référence pour les formules de dérivation",
    studentsCount: 0,
    completionRate: 0,
  },
  {
    id: "elem_004",
    title: "Examen Partiel - Analyse",
    type: "assignment",
    status: "Publié",
    unitName: "Département de Mathématiques",
    createdAt: "2024-01-08T10:00:00Z",
    updatedAt: "2024-01-13T14:15:00Z",
    description: "Évaluation intermédiaire du semestre",
    studentsCount: 48,
    completionRate: 95,
  },
  {
    id: "elem_005",
    title: "Cours Intégrales",
    type: "course",
    status: "Brouillon",
    unitName: "Département de Mathématiques",
    createdAt: "2024-01-11T16:00:00Z",
    updatedAt: "2024-01-12T11:30:00Z",
    description: "Introduction au calcul intégral",
    studentsCount: 0,
    completionRate: 0,
  },
  {
    id: "elem_006",
    title: "Exercices Limites",
    type: "assignment",
    status: "Publié",
    unitName: "Département de Mathématiques",
    createdAt: "2024-01-09T11:00:00Z",
    updatedAt: "2024-01-11T08:45:00Z",
    description: "Série d'exercices sur les limites",
    studentsCount: 44,
    completionRate: 81,
  },
  {
    id: "elem_007",
    title: "Vidéo Explicative - Continuité",
    type: "resource",
    status: "Publié",
    unitName: "Département de Mathématiques",
    createdAt: "2024-01-07T13:00:00Z",
    updatedAt: "2024-01-10T15:20:00Z",
    description: "Tutoriel vidéo sur la notion de continuité",
    studentsCount: 52,
    completionRate: 68,
  },
  {
    id: "elem_008",
    title: "TP Géométrie Analytique",
    type: "assignment",
    status: "Archivé",
    unitName: "Département de Mathématiques",
    createdAt: "2023-12-15T09:00:00Z",
    updatedAt: "2024-01-09T13:10:00Z",
    description: "Travaux pratiques sur les équations de droites",
    studentsCount: 38,
    completionRate: 92,
  },
  {
    id: "elem_009",
    title: "Cours Probabilités",
    type: "course",
    status: "Publié",
    unitName: "Département de Mathématiques",
    createdAt: "2024-01-05T14:00:00Z",
    updatedAt: "2024-01-08T10:00:00Z",
    description: "Introduction aux probabilités discrètes",
    studentsCount: 41,
    completionRate: 76,
  },
  {
    id: "elem_010",
    title: "Annales Examens",
    type: "resource",
    status: "Publié",
    unitName: "Département de Mathématiques",
    createdAt: "2024-01-04T12:00:00Z",
    updatedAt: "2024-01-07T16:30:00Z",
    description: "Collection d'anciens sujets d'examen",
    studentsCount: 67,
    completionRate: 45,
  },
  {
    id: "elem_011",
    title: "Projet Statistiques",
    type: "assignment",
    status: "Brouillon",
    unitName: "Département de Mathématiques",
    createdAt: "2024-01-14T15:00:00Z",
    updatedAt: "2024-01-15T09:45:00Z",
    description: "Projet d'analyse de données réelles",
    studentsCount: 0,
    completionRate: 0,
  },
  {
    id: "elem_012",
    title: "Quiz Fonctions",
    type: "assignment",
    status: "Publié",
    unitName: "Département de Mathématiques",
    createdAt: "2024-01-06T10:30:00Z",
    updatedAt: "2024-01-09T14:20:00Z",
    description: "Évaluation rapide sur les fonctions",
    studentsCount: 43,
    completionRate: 89,
  },
];

// API simulation functions
export async function getTeacherElements(): Promise<TeacherElementRow[]> {
  await simulateLoading();
  return teacherElements;
}

export async function toggleElementStatus(
  elementId: string,
  newStatus: "Publié" | "Brouillon" | "Archivé"
): Promise<TeacherElementRow> {
  await simulateLoading(500); // Shorter delay for status toggle

  const element = teacherElements.find((el) => el.id === elementId);
  if (element) {
    element.status = newStatus;
    element.updatedAt = new Date().toISOString();
  }

  return element!;
}

export async function createNewElement(
  elementData: Partial<TeacherElementRow>
): Promise<TeacherElementRow> {
  await simulateLoading(1000);

  const newElement: TeacherElementRow = {
    id: `elem_${Date.now()}`,
    title: elementData.title || "Nouvel élément",
    type: elementData.type || "course",
    status: "Brouillon",
    unitName: "Département de Mathématiques",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: elementData.description || "",
    studentsCount: 0,
    completionRate: 0,
  };

  teacherElements.unshift(newElement);
  return newElement;
}
