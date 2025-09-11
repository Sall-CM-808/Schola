export interface Exam {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  unitId: string;
  type: "quiz" | "midterm" | "final" | "assignment" | "project";
  date: string;
  duration: number; // en minutes
  maxScore: number;
  status: "planned" | "in_progress" | "completed" | "graded";
  room?: string;
}

export interface ExamResult {
  id: string;
  examId: string;
  memberId: string;
  memberName: string;
  score: number;
  maxScore: number;
  percentage: number;
  grade?: string;
  submittedAt?: string;
}

/**
 * Données d'exemple pour les évaluations par unité
 */
export const examsData: Record<string, Exam[]> = {
  // Classe CP-A
  "ecole-1-cycle-1-niv-1-classe-1": [
    {
      id: "exam-1",
      title: "Contrôle de Lecture",
      courseId: "course-1",
      courseName: "Lecture et Écriture",
      unitId: "ecole-1-cycle-1-niv-1-classe-1",
      type: "quiz",
      date: "2025-01-15",
      duration: 30,
      maxScore: 20,
      status: "completed",
      room: "Salle CP-A"
    },
    {
      id: "exam-2",
      title: "Évaluation Mathématiques",
      courseId: "course-2",
      courseName: "Mathématiques",
      unitId: "ecole-1-cycle-1-niv-1-classe-1",
      type: "midterm",
      date: "2025-01-20",
      duration: 45,
      maxScore: 30,
      status: "planned",
      room: "Salle CP-A"
    }
  ],

  // Licence Génie Logiciel
  "univ-1-fac-1-dep-1-lic-1": [
    {
      id: "exam-3",
      title: "TP Java - Héritage",
      courseId: "course-4",
      courseName: "Programmation Java",
      unitId: "univ-1-fac-1-dep-1-lic-1",
      type: "assignment",
      date: "2025-01-12",
      duration: 120,
      maxScore: 100,
      status: "graded",
      room: "Salle Info 1"
    },
    {
      id: "exam-4",
      title: "Examen Partiel BDD",
      courseId: "course-5",
      courseName: "Base de Données",
      unitId: "univ-1-fac-1-dep-1-lic-1",
      type: "midterm",
      date: "2025-01-18",
      duration: 90,
      maxScore: 100,
      status: "planned",
      room: "Amphi A"
    },
    {
      id: "exam-5",
      title: "Projet Algorithmes",
      courseId: "course-6",
      courseName: "Algorithmes et Structures de Données",
      unitId: "univ-1-fac-1-dep-1-lic-1",
      type: "project",
      date: "2025-01-25",
      duration: 0,
      maxScore: 100,
      status: "in_progress"
    }
  ]
};

export const examResultsData: Record<string, ExamResult[]> = {
  // Résultats Classe CP-A
  "exam-1": [
    {
      id: "result-1",
      examId: "exam-1",
      memberId: "member-2",
      memberName: "Fatou Diallo",
      score: 18,
      maxScore: 20,
      percentage: 90,
      grade: "Très Bien"
    },
    {
      id: "result-2",
      examId: "exam-1",
      memberId: "member-3",
      memberName: "Moussa Kane",
      score: 15,
      maxScore: 20,
      percentage: 75,
      grade: "Bien"
    },
    {
      id: "result-3",
      examId: "exam-1",
      memberId: "member-4",
      memberName: "Aïssatou Ba",
      score: 16,
      maxScore: 20,
      percentage: 80,
      grade: "Bien"
    }
  ],

  // Résultats Licence GL
  "exam-3": [
    {
      id: "result-4",
      examId: "exam-3",
      memberId: "member-9",
      memberName: "Amadou Diop",
      score: 85,
      maxScore: 100,
      percentage: 85,
      grade: "B+"
    },
    {
      id: "result-5",
      examId: "exam-3",
      memberId: "member-10",
      memberName: "Mariam Fall",
      score: 92,
      maxScore: 100,
      percentage: 92,
      grade: "A-"
    }
  ]
};
