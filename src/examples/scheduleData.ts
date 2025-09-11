export interface ScheduleEvent {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  unitId: string;
  teacherId: string;
  teacherName: string;
  dayOfWeek: number; // 0 = Dimanche, 1 = Lundi, etc.
  startTime: string;
  endTime: string;
  room?: string;
  type: "course" | "exam" | "meeting" | "event";
}

/**
 * Données d'exemple pour les emplois du temps par unité
 */
export const scheduleData: Record<string, ScheduleEvent[]> = {
  // Classe CP-A
  "ecole-1-cycle-1-niv-1-classe-1": [
    {
      id: "schedule-1",
      title: "Lecture et Écriture",
      courseId: "course-1",
      courseName: "Lecture et Écriture",
      unitId: "ecole-1-cycle-1-niv-1-classe-1",
      teacherId: "member-1",
      teacherName: "M. Ibrahima Sarr",
      dayOfWeek: 1, // Lundi
      startTime: "08:00",
      endTime: "10:00",
      room: "Salle CP-A",
      type: "course"
    },
    {
      id: "schedule-2",
      title: "Mathématiques",
      courseId: "course-2",
      courseName: "Mathématiques",
      unitId: "ecole-1-cycle-1-niv-1-classe-1",
      teacherId: "member-1",
      teacherName: "M. Ibrahima Sarr",
      dayOfWeek: 1, // Lundi
      startTime: "10:30",
      endTime: "12:00",
      room: "Salle CP-A",
      type: "course"
    },
    {
      id: "schedule-3",
      title: "Lecture et Écriture",
      courseId: "course-1",
      courseName: "Lecture et Écriture",
      unitId: "ecole-1-cycle-1-niv-1-classe-1",
      teacherId: "member-1",
      teacherName: "M. Ibrahima Sarr",
      dayOfWeek: 2, // Mardi
      startTime: "08:00",
      endTime: "10:00",
      room: "Salle CP-A",
      type: "course"
    },
    {
      id: "schedule-4",
      title: "Découverte du Monde",
      courseId: "course-3",
      courseName: "Découverte du Monde",
      unitId: "ecole-1-cycle-1-niv-1-classe-1",
      teacherId: "member-1",
      teacherName: "M. Ibrahima Sarr",
      dayOfWeek: 3, // Mercredi
      startTime: "08:00",
      endTime: "09:30",
      room: "Salle CP-A",
      type: "course"
    }
  ],

  // Licence Génie Logiciel
  "univ-1-fac-1-dep-1-lic-1": [
    {
      id: "schedule-5",
      title: "Programmation Java",
      courseId: "course-4",
      courseName: "Programmation Java",
      unitId: "univ-1-fac-1-dep-1-lic-1",
      teacherId: "member-7",
      teacherName: "Prof. Ousmane Ndiaye",
      dayOfWeek: 1, // Lundi
      startTime: "08:00",
      endTime: "10:00",
      room: "Amphi A",
      type: "course"
    },
    {
      id: "schedule-6",
      title: "Base de Données",
      courseId: "course-5",
      courseName: "Base de Données",
      unitId: "univ-1-fac-1-dep-1-lic-1",
      teacherId: "member-8",
      teacherName: "Dr. Fatou Seck",
      dayOfWeek: 1, // Lundi
      startTime: "10:30",
      endTime: "12:00",
      room: "Salle Info 1",
      type: "course"
    },
    {
      id: "schedule-7",
      title: "Algorithmes et Structures de Données",
      courseId: "course-6",
      courseName: "Algorithmes et Structures de Données",
      unitId: "univ-1-fac-1-dep-1-lic-1",
      teacherId: "member-7",
      teacherName: "Prof. Ousmane Ndiaye",
      dayOfWeek: 2, // Mardi
      startTime: "14:00",
      endTime: "16:00",
      room: "Amphi B",
      type: "course"
    },
    {
      id: "schedule-8",
      title: "Mathématiques Discrètes",
      courseId: "course-7",
      courseName: "Mathématiques Discrètes",
      unitId: "univ-1-fac-1-dep-1-lic-1",
      teacherId: "member-8",
      teacherName: "Dr. Fatou Seck",
      dayOfWeek: 3, // Mercredi
      startTime: "08:00",
      endTime: "10:00",
      room: "Salle Math 2",
      type: "course"
    }
  ]
};
