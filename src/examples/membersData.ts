export interface Member {
  id: string;
  name: string;
  email: string;
  type: "student" | "teacher" | "staff";
  unitId: string;
  status: "active" | "inactive" | "suspended";
  joinDate: string;
  avatar?: string;
  phone?: string;
  studentNumber?: string;
  grade?: string;
}

/**
 * Données d'exemple pour les membres par unité
 */
export const membersData: Record<string, Member[]> = {
  // Classe CP-A
  "ecole-1-cycle-1-niv-1-classe-1": [
    {
      id: "member-1",
      name: "M. Ibrahima Sarr",
      email: "ibrahima.sarr@ecole.sn",
      type: "teacher",
      unitId: "ecole-1-cycle-1-niv-1-classe-1",
      status: "active",
      joinDate: "2023-09-01"
    },
    {
      id: "member-2",
      name: "Fatou Diallo",
      email: "fatou.diallo@parent.sn",
      type: "student",
      unitId: "ecole-1-cycle-1-niv-1-classe-1",
      status: "active",
      joinDate: "2023-09-15",
      studentNumber: "CP-A-001",
      grade: "CP"
    },
    {
      id: "member-3",
      name: "Moussa Kane",
      email: "moussa.kane@parent.sn",
      type: "student",
      unitId: "ecole-1-cycle-1-niv-1-classe-1",
      status: "active",
      joinDate: "2023-09-15",
      studentNumber: "CP-A-002",
      grade: "CP"
    },
    {
      id: "member-4",
      name: "Aïssatou Ba",
      email: "aissatou.ba@parent.sn",
      type: "student",
      unitId: "ecole-1-cycle-1-niv-1-classe-1",
      status: "active",
      joinDate: "2023-09-15",
      studentNumber: "CP-A-003",
      grade: "CP"
    }
  ],

  // Classe CP-B
  "ecole-1-cycle-1-niv-1-classe-2": [
    {
      id: "member-5",
      name: "Mme Aminata Sow",
      email: "aminata.sow@ecole.sn",
      type: "teacher",
      unitId: "ecole-1-cycle-1-niv-1-classe-2",
      status: "active",
      joinDate: "2023-09-01"
    },
    {
      id: "member-6",
      name: "Omar Ndiaye",
      email: "omar.ndiaye@parent.sn",
      type: "student",
      unitId: "ecole-1-cycle-1-niv-1-classe-2",
      status: "active",
      joinDate: "2023-09-15",
      studentNumber: "CP-B-001",
      grade: "CP"
    }
  ],

  // Licence Génie Logiciel
  "univ-1-fac-1-dep-1-lic-1": [
    {
      id: "member-7",
      name: "Prof. Ousmane Ndiaye",
      email: "ousmane.ndiaye@ucad.sn",
      type: "teacher",
      unitId: "univ-1-fac-1-dep-1-lic-1",
      status: "active",
      joinDate: "2020-09-01"
    },
    {
      id: "member-8",
      name: "Dr. Fatou Seck",
      email: "fatou.seck@ucad.sn",
      type: "teacher",
      unitId: "univ-1-fac-1-dep-1-lic-1",
      status: "active",
      joinDate: "2021-09-01"
    },
    {
      id: "member-9",
      name: "Amadou Diop",
      email: "amadou.diop@etudiant.ucad.sn",
      type: "student",
      unitId: "univ-1-fac-1-dep-1-lic-1",
      status: "active",
      joinDate: "2023-09-15",
      studentNumber: "GL-2023-001",
      grade: "L1"
    },
    {
      id: "member-10",
      name: "Mariam Fall",
      email: "mariam.fall@etudiant.ucad.sn",
      type: "student",
      unitId: "univ-1-fac-1-dep-1-lic-1",
      status: "active",
      joinDate: "2023-09-15",
      studentNumber: "GL-2023-002",
      grade: "L1"
    }
  ]
};
