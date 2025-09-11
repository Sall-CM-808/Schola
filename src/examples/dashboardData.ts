import { Unit } from "@/types/unit";

export interface DashboardStats {
  unitId: string;
  totalStudents?: number;
  totalTeachers?: number;
  totalClasses?: number;
  totalSubUnits?: number;
  budget?: number;
  performance?: number;
  attendance?: number;
}

export interface DashboardActivity {
  id: string;
  unitId: string;
  type: "inscription" | "evaluation" | "reunion" | "evenement";
  title: string;
  description: string;
  date: string;
  status: "completed" | "in_progress" | "planned";
}

/**
 * Données d'exemple pour les statistiques du dashboard par unité
 */
export const dashboardStatsData: Record<string, DashboardStats> = {
  "univ-1": {
    unitId: "univ-1",
    totalStudents: 15420,
    totalTeachers: 890,
    totalClasses: 245,
    totalSubUnits: 8,
    budget: 2500000000,
    performance: 85,
    attendance: 92
  },
  
  "univ-1-fac-1": {
    unitId: "univ-1-fac-1",
    totalStudents: 3240,
    totalTeachers: 156,
    totalClasses: 68,
    totalSubUnits: 3,
    budget: 450000000,
    performance: 88,
    attendance: 94
  },

  "univ-1-fac-1-dep-1": {
    unitId: "univ-1-fac-1-dep-1",
    totalStudents: 1205,
    totalTeachers: 45,
    totalClasses: 28,
    totalSubUnits: 2,
    budget: 125000000,
    performance: 91,
    attendance: 96
  },

  "univ-1-fac-1-dep-1-lic-1": {
    unitId: "univ-1-fac-1-dep-1-lic-1",
    totalStudents: 180,
    totalTeachers: 12,
    totalClasses: 8,
    totalSubUnits: 2,
    performance: 89,
    attendance: 95
  },

  "ecole-1": {
    unitId: "ecole-1",
    totalStudents: 420,
    totalTeachers: 18,
    totalClasses: 14,
    totalSubUnits: 2,
    budget: 25000000,
    performance: 87,
    attendance: 98
  },

  "ecole-1-cycle-1": {
    unitId: "ecole-1-cycle-1",
    totalStudents: 245,
    totalTeachers: 10,
    totalClasses: 8,
    totalSubUnits: 2,
    performance: 86,
    attendance: 97
  },

  "ecole-1-cycle-1-niv-1": {
    unitId: "ecole-1-cycle-1-niv-1",
    totalStudents: 58,
    totalTeachers: 3,
    totalClasses: 2,
    totalSubUnits: 2,
    performance: 88,
    attendance: 99
  },

  "ecole-1-cycle-1-niv-1-classe-1": {
    unitId: "ecole-1-cycle-1-niv-1-classe-1",
    totalStudents: 28,
    totalTeachers: 2,
    totalClasses: 1,
    totalSubUnits: 0,
    performance: 90,
    attendance: 100
  }
};

/**
 * Données d'exemple pour les activités récentes par unité
 */
export const dashboardActivitiesData: Record<string, DashboardActivity[]> = {
  "univ-1": [
    {
      id: "act-univ-1-1",
      unitId: "univ-1",
      type: "reunion",
      title: "Conseil d'Administration",
      description: "Réunion mensuelle du conseil d'administration",
      date: "2025-01-15",
      status: "planned"
    },
    {
      id: "act-univ-1-2",
      unitId: "univ-1",
      type: "evenement",
      title: "Journée Portes Ouvertes",
      description: "Présentation des formations aux futurs étudiants",
      date: "2025-01-20",
      status: "planned"
    }
  ],

  "univ-1-fac-1": [
    {
      id: "act-fac-1-1",
      unitId: "univ-1-fac-1",
      type: "evaluation",
      title: "Évaluations Semestrielles",
      description: "Période d'examens du premier semestre",
      date: "2025-01-10",
      status: "in_progress"
    },
    {
      id: "act-fac-1-2",
      unitId: "univ-1-fac-1",
      type: "reunion",
      title: "Conseil de Faculté",
      description: "Réunion du conseil de faculté",
      date: "2025-01-08",
      status: "completed"
    }
  ],

  "univ-1-fac-1-dep-1": [
    {
      id: "act-dep-1-1",
      unitId: "univ-1-fac-1-dep-1",
      type: "evaluation",
      title: "Soutenances de Projets",
      description: "Soutenances des projets de fin d'études",
      date: "2025-01-12",
      status: "in_progress"
    }
  ],

  "ecole-1": [
    {
      id: "act-ecole-1-1",
      unitId: "ecole-1",
      type: "inscription",
      title: "Inscriptions Nouvelles",
      description: "Période d'inscription des nouveaux élèves",
      date: "2025-01-05",
      status: "completed"
    },
    {
      id: "act-ecole-1-2",
      unitId: "ecole-1",
      type: "evenement",
      title: "Fête de l'École",
      description: "Célébration annuelle de l'école",
      date: "2025-01-25",
      status: "planned"
    }
  ],

  "ecole-1-cycle-1-niv-1-classe-1": [
    {
      id: "act-classe-1-1",
      unitId: "ecole-1-cycle-1-niv-1-classe-1",
      type: "evaluation",
      title: "Évaluation Mensuelle",
      description: "Contrôle des connaissances du mois",
      date: "2025-01-18",
      status: "planned"
    }
  ]
};
