// Mock data for teacher classes management

// Fonction pour simuler un délai de chargement
export const simulateLoading = (delay: number = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  averageGrade?: number;
  attendance?: number;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "course" | "td" | "exam" | "meeting";
  location: string;
}

export interface ClassRow {
  id: string;
  className: string;
  level: string;
  studentsCount: number;
  nextEvent?: ScheduleEvent;
  description: string;
  semester: string;
  averageGrade: number;
  attendanceRate: number;
}

export interface ClassDetail {
  id: string;
  className: string;
  level: string;
  description: string;
  semester: string;
  studentsCount: number;
  averageGrade: number;
  attendanceRate: number;
  students: Student[];
  schedule: ScheduleEvent[];
  quickLinks: Array<{
    label: string;
    href: string;
    icon: string;
  }>;
}

// Mock data
export const teacherClasses: ClassRow[] = [
  {
    id: "class_001",
    className: "L2 Mathématiques - Groupe A",
    level: "L2",
    studentsCount: 45,
    description: "Cours d'analyse mathématique pour étudiants de L2",
    semester: "Semestre 3",
    averageGrade: 13.2,
    attendanceRate: 87,
    nextEvent: {
      id: "event_001",
      title: "Cours Intégrales",
      date: "2024-01-16",
      time: "08:00",
      type: "course",
      location: "Amphi A",
    },
  },
  {
    id: "class_002",
    className: "L3 Mathématiques - Analyse",
    level: "L3",
    studentsCount: 38,
    description: "Analyse avancée et topologie",
    semester: "Semestre 5",
    averageGrade: 14.8,
    attendanceRate: 92,
    nextEvent: {
      id: "event_002",
      title: "TD Topologie",
      date: "2024-01-16",
      time: "14:00",
      type: "td",
      location: "Salle B12",
    },
  },
  {
    id: "class_003",
    className: "M1 Statistiques",
    level: "M1",
    studentsCount: 22,
    description: "Statistiques inférentielles et modélisation",
    semester: "Semestre 7",
    averageGrade: 15.6,
    attendanceRate: 95,
    nextEvent: {
      id: "event_003",
      title: "Examen Partiel",
      date: "2024-01-18",
      time: "09:00",
      type: "exam",
      location: "Amphi C",
    },
  },
  {
    id: "class_004",
    className: "L1 Mathématiques - Groupe B",
    level: "L1",
    studentsCount: 52,
    description: "Mathématiques fondamentales",
    semester: "Semestre 1",
    averageGrade: 11.4,
    attendanceRate: 78,
    nextEvent: {
      id: "event_004",
      title: "Cours Fonctions",
      date: "2024-01-17",
      time: "10:00",
      type: "course",
      location: "Amphi D",
    },
  },
  {
    id: "class_005",
    className: "Prépa MPSI",
    level: "Prépa",
    studentsCount: 35,
    description: "Mathématiques pour classes préparatoires",
    semester: "Année 1",
    averageGrade: 16.2,
    attendanceRate: 98,
    nextEvent: {
      id: "event_005",
      title: "Colle Mathématiques",
      date: "2024-01-16",
      time: "16:00",
      type: "meeting",
      location: "Bureau 205",
    },
  },
  {
    id: "class_006",
    className: "L3 Informatique - Maths",
    level: "L3",
    studentsCount: 28,
    description: "Mathématiques appliquées à l'informatique",
    semester: "Semestre 6",
    averageGrade: 13.9,
    attendanceRate: 84,
    nextEvent: {
      id: "event_006",
      title: "TP Algorithmes",
      date: "2024-01-19",
      time: "13:30",
      type: "td",
      location: "Salle Info 3",
    },
  },
];

// Mock detailed data
const mockStudents: Student[] = [
  {
    id: "student_001",
    name: "Marie Dubois",
    email: "marie.dubois@univ.fr",
    averageGrade: 16.5,
    attendance: 95,
  },
  {
    id: "student_002",
    name: "Pierre Martin",
    email: "pierre.martin@univ.fr",
    averageGrade: 14.2,
    attendance: 88,
  },
  {
    id: "student_003",
    name: "Sophie Bernard",
    email: "sophie.bernard@univ.fr",
    averageGrade: 15.8,
    attendance: 92,
  },
  {
    id: "student_004",
    name: "Lucas Petit",
    email: "lucas.petit@univ.fr",
    averageGrade: 13.1,
    attendance: 85,
  },
  {
    id: "student_005",
    name: "Emma Moreau",
    email: "emma.moreau@univ.fr",
    averageGrade: 17.2,
    attendance: 98,
  },
];

const mockSchedule: ScheduleEvent[] = [
  {
    id: "schedule_001",
    title: "Cours Intégrales",
    date: "2024-01-16",
    time: "08:00",
    type: "course",
    location: "Amphi A",
  },
  {
    id: "schedule_002",
    title: "TD Calcul",
    date: "2024-01-17",
    time: "14:00",
    type: "td",
    location: "Salle B12",
  },
  {
    id: "schedule_003",
    title: "Examen Partiel",
    date: "2024-01-18",
    time: "09:00",
    type: "exam",
    location: "Amphi C",
  },
  {
    id: "schedule_004",
    title: "Réunion Parents",
    date: "2024-01-19",
    time: "16:00",
    type: "meeting",
    location: "Bureau 205",
  },
];

// API simulation functions
export async function getTeacherClasses(): Promise<ClassRow[]> {
  await simulateLoading();
  return teacherClasses;
}

export async function getClassDetail(classId: string): Promise<ClassDetail> {
  await simulateLoading();

  const classRow = teacherClasses.find((c) => c.id === classId);
  if (!classRow) {
    throw new Error("Classe non trouvée");
  }

  return {
    ...classRow,
    students: mockStudents,
    schedule: mockSchedule,
    quickLinks: [
      {
        label: "Carnet de notes",
        href: `/teacher/grades/${classId}`,
        icon: "BookOpen",
      },
      {
        label: "Présences",
        href: `/teacher/attendance/${classId}`,
        icon: "UserCheck",
      },
      {
        label: "Messages",
        href: `/teacher/messages/${classId}`,
        icon: "MessageSquare",
      },
      {
        label: "Documents",
        href: `/teacher/documents/${classId}`,
        icon: "FileText",
      },
    ],
  };
}

export async function getClassStudents(classId: string): Promise<Student[]> {
  await simulateLoading();

  const classRow = teacherClasses.find((c) => c.id === classId);
  if (!classRow) {
    throw new Error("Classe non trouvée");
  }

  return mockStudents;
}
