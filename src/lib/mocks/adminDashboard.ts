// Types pour les données mock
export interface UserRow {
  id: string;
  name: string;
  username: string;
  email: string;
  type: "admin" | "teacher" | "student" | "staff";
  status: "active" | "inactive";
  createdAt: string;
  lastLogin?: string;
}

export interface ElementRow {
  id: string;
  title: string;
  type: "course" | "assignment" | "resource" | "announcement";
  ownerName: string;
  unitName: string;
  status: "active" | "draft" | "archived";
  createdAt: string;
}

export interface KpiData {
  usersTotal: number;
  usersActive: number;
  usersInactive: number;
  unitsTotal: number;
  rolesTotal: number;
  permissionsTotal: number;
  elementsTotal: number;
}

export interface UserTypeDistribution {
  admin: number;
  teacher: number;
  student: number;
  staff: number;
}

// Données mock
export const kpi: KpiData = {
  usersTotal: 1247,
  usersActive: 1089,
  usersInactive: 158,
  unitsTotal: 45,
  rolesTotal: 12,
  permissionsTotal: 67,
  elementsTotal: 3421,
};

export const userTypeDistribution: UserTypeDistribution = {
  admin: 8,
  teacher: 156,
  student: 1067,
  staff: 16,
};

export const recentUsers: UserRow[] = [
  {
    id: "1",
    name: "Marie Dubois",
    username: "marie.dubois",
    email: "marie.dubois@schola.edu",
    type: "teacher",
    status: "active",
    createdAt: "2024-01-15T10:30:00Z",
    lastLogin: "2024-01-15T14:22:00Z",
  },
  {
    id: "2",
    name: "Jean Martin",
    username: "jean.martin",
    email: "jean.martin@schola.edu",
    type: "student",
    status: "active",
    createdAt: "2024-01-15T09:15:00Z",
    lastLogin: "2024-01-15T13:45:00Z",
  },
  {
    id: "3",
    name: "Sophie Laurent",
    username: "sophie.laurent",
    email: "sophie.laurent@schola.edu",
    type: "admin",
    status: "active",
    createdAt: "2024-01-14T16:20:00Z",
    lastLogin: "2024-01-15T08:30:00Z",
  },
  {
    id: "4",
    name: "Pierre Durand",
    username: "pierre.durand",
    email: "pierre.durand@schola.edu",
    type: "teacher",
    status: "active",
    createdAt: "2024-01-14T14:45:00Z",
    lastLogin: "2024-01-14T18:15:00Z",
  },
  {
    id: "5",
    name: "Emma Moreau",
    username: "emma.moreau",
    email: "emma.moreau@schola.edu",
    type: "student",
    status: "active",
    createdAt: "2024-01-14T11:30:00Z",
    lastLogin: "2024-01-15T12:00:00Z",
  },
  {
    id: "6",
    name: "Lucas Bernard",
    username: "lucas.bernard",
    email: "lucas.bernard@schola.edu",
    type: "student",
    status: "inactive",
    createdAt: "2024-01-13T15:10:00Z",
    lastLogin: "2024-01-13T16:30:00Z",
  },
  {
    id: "7",
    name: "Camille Petit",
    username: "camille.petit",
    email: "camille.petit@schola.edu",
    type: "staff",
    status: "active",
    createdAt: "2024-01-13T13:25:00Z",
    lastLogin: "2024-01-15T09:45:00Z",
  },
  {
    id: "8",
    name: "Thomas Roux",
    username: "thomas.roux",
    email: "thomas.roux@schola.edu",
    type: "teacher",
    status: "active",
    createdAt: "2024-01-12T10:15:00Z",
    lastLogin: "2024-01-15T11:20:00Z",
  },
  {
    id: "9",
    name: "Julie Blanc",
    username: "julie.blanc",
    email: "julie.blanc@schola.edu",
    type: "student",
    status: "active",
    createdAt: "2024-01-12T08:40:00Z",
    lastLogin: "2024-01-15T10:10:00Z",
  },
  {
    id: "10",
    name: "Antoine Leroy",
    username: "antoine.leroy",
    email: "antoine.leroy@schola.edu",
    type: "admin",
    status: "active",
    createdAt: "2024-01-11T14:55:00Z",
    lastLogin: "2024-01-15T07:30:00Z",
  },
];

export const recentElements: ElementRow[] = [
  {
    id: "1",
    title: "Cours de Mathématiques - Algèbre Linéaire",
    type: "course",
    ownerName: "Marie Dubois",
    unitName: "Département Mathématiques",
    status: "active",
    createdAt: "2024-01-15T11:30:00Z",
  },
  {
    id: "2",
    title: "Devoir Maison - Analyse Fonctionnelle",
    type: "assignment",
    ownerName: "Pierre Durand",
    unitName: "Département Mathématiques",
    status: "active",
    createdAt: "2024-01-15T10:15:00Z",
  },
  {
    id: "3",
    title: "Ressource - Guide Python Avancé",
    type: "resource",
    ownerName: "Thomas Roux",
    unitName: "Département Informatique",
    status: "active",
    createdAt: "2024-01-15T09:45:00Z",
  },
  {
    id: "4",
    title: "Annonce - Modification Planning Examens",
    type: "announcement",
    ownerName: "Sophie Laurent",
    unitName: "Administration",
    status: "active",
    createdAt: "2024-01-14T16:20:00Z",
  },
  {
    id: "5",
    title: "Cours de Physique - Mécanique Quantique",
    type: "course",
    ownerName: "Marie Dubois",
    unitName: "Département Physique",
    status: "draft",
    createdAt: "2024-01-14T14:30:00Z",
  },
  {
    id: "6",
    title: "TP - Laboratoire de Chimie Organique",
    type: "assignment",
    ownerName: "Pierre Durand",
    unitName: "Département Chimie",
    status: "active",
    createdAt: "2024-01-14T13:10:00Z",
  },
  {
    id: "7",
    title: "Ressource - Bibliographie Histoire Moderne",
    type: "resource",
    ownerName: "Thomas Roux",
    unitName: "Département Histoire",
    status: "active",
    createdAt: "2024-01-14T11:45:00Z",
  },
  {
    id: "8",
    title: "Cours de Littérature - Analyse Textuelle",
    type: "course",
    ownerName: "Marie Dubois",
    unitName: "Département Lettres",
    status: "active",
    createdAt: "2024-01-13T15:20:00Z",
  },
  {
    id: "9",
    title: "Annonce - Nouvelle Procédure Inscription",
    type: "announcement",
    ownerName: "Sophie Laurent",
    unitName: "Administration",
    status: "archived",
    createdAt: "2024-01-13T12:35:00Z",
  },
  {
    id: "10",
    title: "Projet - Application Mobile Étudiante",
    type: "assignment",
    ownerName: "Thomas Roux",
    unitName: "Département Informatique",
    status: "active",
    createdAt: "2024-01-12T16:50:00Z",
  },
];

// Fonction pour simuler un délai de chargement
export const simulateLoading = (delay: number = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
