export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  unitId: string;
  teacherId: string;
  teacherName: string;
  hours: number;
  credits?: number;
  status: "active" | "completed" | "planned";
  startDate: string;
  endDate: string;
}

/**
 * Données d'exemple pour les cours par unité
 */
export const coursesData: Record<string, Course[]> = {
  // Classe CP-A
  "ecole-1-cycle-1-niv-1-classe-1": [
    {
      id: "course-1",
      name: "Lecture et Écriture",
      code: "CP-LE-001",
      description: "Apprentissage de la lecture et de l'écriture",
      unitId: "ecole-1-cycle-1-niv-1-classe-1",
      teacherId: "member-1",
      teacherName: "M. Ibrahima Sarr",
      hours: 120,
      status: "active",
      startDate: "2023-09-15",
      endDate: "2024-06-30"
    },
    {
      id: "course-2",
      name: "Mathématiques",
      code: "CP-MA-001",
      description: "Calcul et numération de base",
      unitId: "ecole-1-cycle-1-niv-1-classe-1",
      teacherId: "member-1",
      teacherName: "M. Ibrahima Sarr",
      hours: 100,
      status: "active",
      startDate: "2023-09-15",
      endDate: "2024-06-30"
    },
    {
      id: "course-3",
      name: "Découverte du Monde",
      code: "CP-DM-001",
      description: "Sciences et société",
      unitId: "ecole-1-cycle-1-niv-1-classe-1",
      teacherId: "member-1",
      teacherName: "M. Ibrahima Sarr",
      hours: 60,
      status: "active",
      startDate: "2023-09-15",
      endDate: "2024-06-30"
    }
  ],

  // Licence Génie Logiciel
  "univ-1-fac-1-dep-1-lic-1": [
    {
      id: "course-4",
      name: "Programmation Java",
      code: "GL-PROG-101",
      description: "Introduction à la programmation orientée objet avec Java",
      unitId: "univ-1-fac-1-dep-1-lic-1",
      teacherId: "member-7",
      teacherName: "Prof. Ousmane Ndiaye",
      hours: 60,
      credits: 6,
      status: "active",
      startDate: "2023-09-15",
      endDate: "2024-01-15"
    },
    {
      id: "course-5",
      name: "Base de Données",
      code: "GL-BDD-101",
      description: "Conception et gestion de bases de données relationnelles",
      unitId: "univ-1-fac-1-dep-1-lic-1",
      teacherId: "member-8",
      teacherName: "Dr. Fatou Seck",
      hours: 45,
      credits: 4,
      status: "active",
      startDate: "2023-09-15",
      endDate: "2024-01-15"
    },
    {
      id: "course-6",
      name: "Algorithmes et Structures de Données",
      code: "GL-ALGO-101",
      description: "Algorithmes fondamentaux et structures de données",
      unitId: "univ-1-fac-1-dep-1-lic-1",
      teacherId: "member-7",
      teacherName: "Prof. Ousmane Ndiaye",
      hours: 50,
      credits: 5,
      status: "active",
      startDate: "2023-09-15",
      endDate: "2024-01-15"
    },
    {
      id: "course-7",
      name: "Mathématiques Discrètes",
      code: "GL-MATH-101",
      description: "Logique, ensembles, graphes et combinatoire",
      unitId: "univ-1-fac-1-dep-1-lic-1",
      teacherId: "member-8",
      teacherName: "Dr. Fatou Seck",
      hours: 40,
      credits: 4,
      status: "active",
      startDate: "2023-09-15",
      endDate: "2024-01-15"
    }
  ]
};
