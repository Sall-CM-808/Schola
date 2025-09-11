export interface AttendanceRecord {
  id: string;
  memberId: string;
  memberName: string;
  unitId: string;
  date: string;
  status: "present" | "absent" | "late" | "excused";
  courseId?: string;
  courseName?: string;
  notes?: string;
}

export interface AttendanceStats {
  unitId: string;
  totalSessions: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  excusedCount: number;
  attendanceRate: number;
}

/**
 * Données d'exemple pour les présences par unité
 */
export const attendanceData: Record<string, AttendanceRecord[]> = {
  // Classe CP-A
  "ecole-1-cycle-1-niv-1-classe-1": [
    {
      id: "att-1",
      memberId: "member-2",
      memberName: "Fatou Diallo",
      unitId: "ecole-1-cycle-1-niv-1-classe-1",
      date: "2025-01-10",
      status: "present",
      courseId: "course-1",
      courseName: "Lecture et Écriture"
    },
    {
      id: "att-2",
      memberId: "member-3",
      memberName: "Moussa Kane",
      unitId: "ecole-1-cycle-1-niv-1-classe-1",
      date: "2025-01-10",
      status: "late",
      courseId: "course-1",
      courseName: "Lecture et Écriture",
      notes: "Retard de 15 minutes"
    },
    {
      id: "att-3",
      memberId: "member-4",
      memberName: "Aïssatou Ba",
      unitId: "ecole-1-cycle-1-niv-1-classe-1",
      date: "2025-01-10",
      status: "absent",
      courseId: "course-1",
      courseName: "Lecture et Écriture",
      notes: "Maladie"
    }
  ],

  // Licence Génie Logiciel
  "univ-1-fac-1-dep-1-lic-1": [
    {
      id: "att-4",
      memberId: "member-9",
      memberName: "Amadou Diop",
      unitId: "univ-1-fac-1-dep-1-lic-1",
      date: "2025-01-10",
      status: "present",
      courseId: "course-4",
      courseName: "Programmation Java"
    },
    {
      id: "att-5",
      memberId: "member-10",
      memberName: "Mariam Fall",
      unitId: "univ-1-fac-1-dep-1-lic-1",
      date: "2025-01-10",
      status: "present",
      courseId: "course-4",
      courseName: "Programmation Java"
    }
  ]
};

export const attendanceStatsData: Record<string, AttendanceStats> = {
  "ecole-1-cycle-1-niv-1-classe-1": {
    unitId: "ecole-1-cycle-1-niv-1-classe-1",
    totalSessions: 45,
    presentCount: 120,
    absentCount: 8,
    lateCount: 7,
    excusedCount: 3,
    attendanceRate: 94.2
  },
  "univ-1-fac-1-dep-1-lic-1": {
    unitId: "univ-1-fac-1-dep-1-lic-1",
    totalSessions: 32,
    presentCount: 58,
    absentCount: 4,
    lateCount: 2,
    excusedCount: 0,
    attendanceRate: 90.6
  }
};
