// Mock data for teacher assignments management

// Fonction pour simuler un délai de chargement
export const simulateLoading = (delay: number = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export interface TeacherAssignmentRow {
  id: string;
  roleName: string;
  scopeType: "class" | "department" | "university" | "project";
  scopeName: string;
  startDate: string;
  endDate: string;
  status: "Actif" | "En attente" | "Expiré" | "Suspendu";
  description?: string;
  permissions?: string[];
  workload?: number; // heures par semaine
}

export interface AssignmentAction {
  id: string;
  label: string;
  type: "primary" | "secondary" | "danger";
  icon: string;
}

// Mock data
export const teacherAssignments: TeacherAssignmentRow[] = [
  {
    id: "assign_001",
    roleName: "Enseignant Responsable",
    scopeType: "class",
    scopeName: "L2 Mathématiques - Groupe A",
    startDate: "2023-09-01T00:00:00Z",
    endDate: "2024-06-30T00:00:00Z",
    status: "Actif",
    description: "Responsable pédagogique du groupe A de L2 Mathématiques",
    permissions: ["Création contenu", "Évaluation", "Gestion étudiants"],
    workload: 8,
  },
  {
    id: "assign_002",
    roleName: "Chargé de TD",
    scopeType: "class",
    scopeName: "L3 Mathématiques - Analyse",
    startDate: "2023-09-15T00:00:00Z",
    endDate: "2024-01-31T00:00:00Z",
    status: "Actif",
    description: "Encadrement des travaux dirigés d'analyse",
    permissions: ["Évaluation", "Suivi étudiants"],
    workload: 4,
  },
  {
    id: "assign_003",
    roleName: "Intervenant",
    scopeType: "class",
    scopeName: "M1 Statistiques",
    startDate: "2024-01-08T00:00:00Z",
    endDate: "2024-05-31T00:00:00Z",
    status: "Actif",
    description: "Intervention sur les statistiques avancées",
    permissions: ["Création contenu"],
    workload: 3,
  },
  {
    id: "assign_004",
    roleName: "Tuteur",
    scopeType: "class",
    scopeName: "L1 Mathématiques - Groupe B",
    startDate: "2023-10-01T00:00:00Z",
    endDate: "2024-03-31T00:00:00Z",
    status: "En attente",
    description: "Tutorat pour étudiants en difficulté",
    permissions: ["Suivi étudiants"],
    workload: 2,
  },
  {
    id: "assign_005",
    roleName: "Professeur Principal",
    scopeType: "class",
    scopeName: "Prépa MPSI",
    startDate: "2023-08-28T00:00:00Z",
    endDate: "2024-07-15T00:00:00Z",
    status: "Actif",
    description: "Professeur principal de la classe préparatoire MPSI",
    permissions: [
      "Création contenu",
      "Évaluation",
      "Gestion étudiants",
      "Coordination",
    ],
    workload: 12,
  },
  {
    id: "assign_006",
    roleName: "Intervenant",
    scopeType: "department",
    scopeName: "L2 Physique - Mathématiques",
    startDate: "2023-11-01T00:00:00Z",
    endDate: "2024-02-28T00:00:00Z",
    status: "Expiré",
    description: "Cours de mathématiques pour physiciens",
    permissions: ["Création contenu", "Évaluation"],
    workload: 6,
  },
  {
    id: "assign_007",
    roleName: "Formateur",
    scopeType: "university",
    scopeName: "Formation Continue",
    startDate: "2024-01-10T00:00:00Z",
    endDate: "2024-12-31T00:00:00Z",
    status: "En attente",
    description: "Formation continue pour professionnels",
    permissions: ["Création contenu", "Évaluation"],
    workload: 5,
  },
  {
    id: "assign_008",
    roleName: "Chargé de Cours",
    scopeType: "class",
    scopeName: "L3 Informatique - Maths",
    startDate: "2023-09-01T00:00:00Z",
    endDate: "2024-06-30T00:00:00Z",
    status: "Actif",
    description: "Cours de mathématiques appliquées à l'informatique",
    permissions: ["Création contenu", "Évaluation"],
    workload: 6,
  },
  {
    id: "assign_009",
    roleName: "Directeur de Mémoire",
    scopeType: "project",
    scopeName: "Master Recherche",
    startDate: "2023-10-15T00:00:00Z",
    endDate: "2024-09-30T00:00:00Z",
    status: "Actif",
    description: "Direction de mémoires de recherche en mathématiques",
    permissions: ["Suivi étudiants", "Évaluation"],
    workload: 4,
  },
  {
    id: "assign_010",
    roleName: "Co-Directeur",
    scopeType: "project",
    scopeName: "Doctorat Mathématiques",
    startDate: "2023-12-01T00:00:00Z",
    endDate: "2026-12-01T00:00:00Z",
    status: "Suspendu",
    description: "Co-direction de thèse de doctorat",
    permissions: ["Suivi étudiants", "Recherche"],
    workload: 3,
  },
];

// API simulation functions
export async function getTeacherAssignments(): Promise<TeacherAssignmentRow[]> {
  await simulateLoading();
  return teacherAssignments;
}

export function getAvailableActions(
  assignment: TeacherAssignmentRow
): AssignmentAction[] {
  const actions: AssignmentAction[] = [];

  switch (assignment.status) {
    case "Actif":
      actions.push(
        {
          id: "suspend",
          label: "Suspendre",
          type: "danger",
          icon: "Pause",
        },
        {
          id: "modify",
          label: "Modifier",
          type: "secondary",
          icon: "Edit",
        }
      );
      break;
    case "En attente":
      actions.push(
        {
          id: "accept",
          label: "Accepter",
          type: "primary",
          icon: "Check",
        },
        {
          id: "decline",
          label: "Refuser",
          type: "danger",
          icon: "X",
        }
      );
      break;
    case "Suspendu":
      actions.push({
        id: "reactivate",
        label: "Réactiver",
        type: "primary",
        icon: "Play",
      });
      break;
    case "Expiré":
      actions.push({
        id: "renew",
        label: "Renouveler",
        type: "primary",
        icon: "RefreshCw",
      });
      break;
  }

  return actions;
}

export async function performAssignmentAction(
  assignmentId: string,
  actionId: string
): Promise<TeacherAssignmentRow> {
  await simulateLoading(800);

  const assignment = teacherAssignments.find((a) => a.id === assignmentId);
  if (!assignment) {
    throw new Error("Attribution non trouvée");
  }

  // Simulate status changes based on action
  switch (actionId) {
    case "accept":
      assignment.status = "Actif";
      break;
    case "decline":
      assignment.status = "Expiré";
      break;
    case "suspend":
      assignment.status = "Suspendu";
      break;
    case "reactivate":
      assignment.status = "Actif";
      break;
    case "renew":
      assignment.status = "En attente";
      assignment.startDate = new Date().toISOString();
      assignment.endDate = new Date(
        Date.now() + 365 * 24 * 60 * 60 * 1000
      ).toISOString();
      break;
  }

  return assignment;
}

export async function requestNewRole(roleData: {
  roleName: string;
  scopeType: string;
  scopeName: string;
  justification: string;
}): Promise<TeacherAssignmentRow> {
  await simulateLoading(1200);

  const newAssignment: TeacherAssignmentRow = {
    id: `assign_${Date.now()}`,
    roleName: roleData.roleName,
    scopeType: roleData.scopeType as any,
    scopeName: roleData.scopeName,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    status: "En attente",
    description: roleData.justification,
    permissions: ["En cours de définition"],
    workload: 0,
  };

  teacherAssignments.unshift(newAssignment);
  return newAssignment;
}
