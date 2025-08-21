// Types pour les éléments
import {
  BookOpen,
  FilePen,
  FileText,
  Megaphone,
  ClipboardList,
  Rocket,
} from "lucide-react";

export interface Element {
  id: string;
  title: string;
  type:
    | "course"
    | "assignment"
    | "resource"
    | "announcement"
    | "exam"
    | "project";
  ownerName: string;
  ownerId: string;
  unitName: string;
  unitId: string;
  status: "active" | "inactive" | "draft" | "archived";
  createdAt: string;
  updatedAt: string;
  description?: string;
  tags?: string[];
}

export interface ElementHistory {
  id: string;
  action:
    | "created"
    | "updated"
    | "published"
    | "archived"
    | "deleted"
    | "assigned";
  description: string;
  performedBy: string;
  performedAt: string;
  metadata?: Record<string, any>;
}

export interface ElementPermission {
  id: string;
  type: "read" | "write" | "admin" | "share";
  label: string;
  description: string;
  grantedAt: string;
  grantedBy: string;
}

export interface ElementAttribution {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  role: "owner" | "collaborator" | "viewer" | "editor";
  assignedAt: string;
  assignedBy: string;
  isActive: boolean;
  permissions: string[];
}

export interface ElementDetail {
  element: Element;
  history: ElementHistory[];
  permissions: ElementPermission[];
  attributions: ElementAttribution[];
}

// Configuration des types d'éléments
export const elementTypes = {
  course: {
    label: "Cours",
    color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    icon: BookOpen,
  },
  assignment: {
    label: "Devoir",
    color: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    icon: FilePen,
  },
  resource: {
    label: "Ressource",
    color: "bg-green-500/20 text-green-300 border-green-500/30",
    icon: FileText,
  },
  announcement: {
    label: "Annonce",
    color: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    icon: Megaphone,
  },
  exam: {
    label: "Examen",
    color: "bg-red-500/20 text-red-300 border-red-500/30",
    icon: ClipboardList,
  },
  project: {
    label: "Projet",
    color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    icon: Rocket,
  },
};

export const elementStatuses = {
  active: {
    label: "Actif",
    color: "bg-green-500/20 text-green-300 border-green-500/30",
  },
  inactive: {
    label: "Inactif",
    color: "bg-gray-500/20 text-gray-300 border-gray-500/30",
  },
  draft: {
    label: "Brouillon",
    color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  },
  archived: {
    label: "Archivé",
    color: "bg-red-500/20 text-red-300 border-red-500/30",
  },
};

// Générateur de données d'éléments
const generateElements = (count: number): Element[] => {
  const titles = [
    "Introduction aux Mathématiques",
    "Algèbre Linéaire Avancée",
    "Calcul Différentiel",
    "Physique Quantique",
    "Mécanique des Fluides",
    "Thermodynamique",
    "Programmation Python",
    "Structures de Données",
    "Intelligence Artificielle",
    "Histoire de France",
    "Littérature du 19e siècle",
    "Philosophie Moderne",
    "Chimie Organique",
    "Biologie Moléculaire",
    "Écologie",
    "Économie Macroéconomique",
    "Gestion de Projet",
    "Marketing Digital",
    "Devoir Maison #1",
    "Examen Final",
    "Projet de Recherche",
    "TP Laboratoire",
    "Présentation Orale",
    "Rapport de Stage",
  ];

  const owners = [
    { name: "Dr. Marie Dubois", id: "teacher-1" },
    { name: "Prof. Jean Martin", id: "teacher-2" },
    { name: "Dr. Sophie Laurent", id: "teacher-3" },
    { name: "Prof. Pierre Durand", id: "teacher-4" },
    { name: "Dr. Emma Moreau", id: "teacher-5" },
    { name: "Prof. Lucas Bernard", id: "teacher-6" },
    { name: "Dr. Camille Petit", id: "teacher-7" },
    { name: "Prof. Thomas Roux", id: "teacher-8" },
  ];

  const units = [
    { name: "Département Mathématiques", id: "unit-math" },
    { name: "Département Physique", id: "unit-physics" },
    { name: "Département Informatique", id: "unit-cs" },
    { name: "Département Littérature", id: "unit-lit" },
    { name: "Département Histoire", id: "unit-history" },
    { name: "Département Chimie", id: "unit-chemistry" },
    { name: "Département Biologie", id: "unit-biology" },
    { name: "Département Économie", id: "unit-economics" },
  ];

  const types = Object.keys(elementTypes) as Element["type"][];
  const statuses = Object.keys(elementStatuses) as Element["status"][];

  const elements: Element[] = [];

  for (let i = 1; i <= count; i++) {
    const title = titles[Math.floor(Math.random() * titles.length)];
    const owner = owners[Math.floor(Math.random() * owners.length)];
    const unit = units[Math.floor(Math.random() * units.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    const createdAt = new Date(
      Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
    ).toISOString();

    const updatedAt = new Date(
      new Date(createdAt).getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toISOString();

    elements.push({
      id: `element-${i}`,
      title: `${title} ${i > titles.length ? `(${i})` : ""}`,
      type,
      ownerName: owner.name,
      ownerId: owner.id,
      unitName: unit.name,
      unitId: unit.id,
      status,
      createdAt,
      updatedAt,
      description: `Description détaillée de ${title}. Cet élément fait partie du programme pédagogique.`,
      tags: [`tag-${type}`, `unit-${unit.id.split("-")[1]}`, status],
    });
  }

  return elements.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

// Données mock des éléments
export const elements: Element[] = generateElements(75);

// Générateur de détails d'élément
export const generateElementDetail = (elementId: string): ElementDetail => {
  const element = elements.find((e) => e.id === elementId);
  if (!element) {
    throw new Error(`Element with id ${elementId} not found`);
  }

  // Historique
  const history: ElementHistory[] = [
    {
      id: "history-1",
      action: "created",
      description: `Élément créé par ${element.ownerName}`,
      performedBy: element.ownerName,
      performedAt: element.createdAt,
      metadata: { type: element.type, unit: element.unitName },
    },
    {
      id: "history-2",
      action: "updated",
      description: "Mise à jour des informations générales",
      performedBy: element.ownerName,
      performedAt: element.updatedAt,
      metadata: { changes: ["title", "description"] },
    },
  ];

  // Ajouter des événements selon le statut
  if (element.status === "active") {
    history.push({
      id: "history-3",
      action: "published",
      description: "Élément publié et rendu accessible",
      performedBy: element.ownerName,
      performedAt: new Date(
        new Date(element.updatedAt).getTime() + 24 * 60 * 60 * 1000
      ).toISOString(),
      metadata: { visibility: "public" },
    });
  }

  if (element.status === "archived") {
    history.push({
      id: "history-4",
      action: "archived",
      description: "Élément archivé",
      performedBy: "Admin System",
      performedAt: new Date().toISOString(),
      metadata: { reason: "End of semester" },
    });
  }

  // Permissions
  const permissions: ElementPermission[] = [
    {
      id: "perm-1",
      type: "read",
      label: "Lecture",
      description: "Accès en lecture à l'élément",
      grantedAt: element.createdAt,
      grantedBy: element.ownerName,
    },
    {
      id: "perm-2",
      type: "write",
      label: "Écriture",
      description: "Modification du contenu",
      grantedAt: element.createdAt,
      grantedBy: element.ownerName,
    },
  ];

  if (element.type === "course" || element.type === "project") {
    permissions.push({
      id: "perm-3",
      type: "admin",
      label: "Administration",
      description: "Gestion complète de l'élément",
      grantedAt: element.createdAt,
      grantedBy: element.ownerName,
    });
  }

  permissions.push({
    id: "perm-4",
    type: "share",
    label: "Partage",
    description: "Partage avec d'autres utilisateurs",
    grantedAt: element.updatedAt,
    grantedBy: element.ownerName,
  });

  // Attributions
  const attributions: ElementAttribution[] = [
    {
      id: "attr-1",
      userId: element.ownerId,
      userName: element.ownerName,
      userEmail: `${element.ownerName
        .toLowerCase()
        .replace(/\s+/g, ".")}@schola.edu`,
      role: "owner",
      assignedAt: element.createdAt,
      assignedBy: "System",
      isActive: true,
      permissions: ["read", "write", "admin", "share"],
    },
  ];

  // Ajouter quelques collaborateurs
  const collaborators = [
    "Dr. Assistant Recherche",
    "Prof. Co-Enseignant",
    "Dr. Superviseur",
  ];

  collaborators.forEach((name, index) => {
    if (Math.random() > 0.4) {
      // 60% de chance d'avoir ce collaborateur
      attributions.push({
        id: `attr-${index + 2}`,
        userId: `collab-${index + 1}`,
        userName: name,
        userEmail: `${name.toLowerCase().replace(/\s+/g, ".")}@schola.edu`,
        role: Math.random() > 0.5 ? "collaborator" : "editor",
        assignedAt: new Date(
          new Date(element.createdAt).getTime() +
            (index + 1) * 7 * 24 * 60 * 60 * 1000
        ).toISOString(),
        assignedBy: element.ownerName,
        isActive: Math.random() > 0.1, // 90% actifs
        permissions: Math.random() > 0.5 ? ["read", "write"] : ["read"],
      });
    }
  });

  return {
    element,
    history: history.sort(
      (a, b) =>
        new Date(b.performedAt).getTime() - new Date(a.performedAt).getTime()
    ),
    permissions,
    attributions,
  };
};

// Statistiques des éléments
export const elementsStats = {
  total: elements.length,
  active: elements.filter((e) => e.status === "active").length,
  draft: elements.filter((e) => e.status === "draft").length,
  archived: elements.filter((e) => e.status === "archived").length,
  byType: {
    course: elements.filter((e) => e.type === "course").length,
    assignment: elements.filter((e) => e.type === "assignment").length,
    resource: elements.filter((e) => e.type === "resource").length,
    announcement: elements.filter((e) => e.type === "announcement").length,
    exam: elements.filter((e) => e.type === "exam").length,
    project: elements.filter((e) => e.type === "project").length,
  },
};

// Fonction pour simuler un délai de chargement
export const simulateLoading = (delay: number = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
