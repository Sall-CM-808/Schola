import { Unit } from "@/types/unit";

export interface Role {
  id: string;
  name: string;
  description: string;
  unitId: string;
  permissions: string[];
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  userCount: number;
}

export interface Attribution {
  id: string;
  userId: string;
  userName: string;
  roleId: string;
  roleName: string;
  unitId: string;
  assignedDate: string;
  assignedBy: string;
}

/**
 * Données d'exemple pour les rôles par unité
 */
export const rolesData: Record<string, Role[]> = {
  // Université
  "univ-1": [
    {
      id: "role-super-admin-univ",
      name: "Super Admin",
      description: "Accès complet à toutes les fonctionnalités (démo)",
      permissions: [
        "unite.view_self", "unite.view_children", "unite.create", "unite.change", "unite.delete",
        "role.view_all", "role.view_own", "role.create", "role.change", "role.delete",
        "attribution.view_all", "attribution.view_own", "attribution.create", "attribution.change", "attribution.delete",
        "members.view_all", "members.view_students", "members.create", "members.change", "members.delete",
        "courses.view_all", "courses.view_own", "courses.create", "courses.change", "courses.delete",
        "schedule.view", "schedule.create", "schedule.change", "schedule.delete",
        "exams.view_all", "exams.view_own", "exams.create", "exams.change", "exams.grade", "exams.view_results",
        "attendance.view", "attendance.create", "attendance.change", "attendance.reports",
        "resources.view", "resources.download", "resources.upload", "resources.change", "resources.delete"
      ],
      unitId: "univ-1",
      userCount: 1,
      isActive: true,
      createdAt: "2023-01-01",
      createdBy: "user-admin"
    },
    {
      id: "role-recteur",
      name: "Recteur",
      description: "Direction générale de l'université",
      permissions: ["unite.view_self", "unite.view_children", "unite.create", "unite.change", "unite.delete", "role.view_all", "role.create", "role.change", "role.delete", "attribution.view_all", "attribution.create", "attribution.change", "attribution.delete"],
      unitId: "univ-1",
      userCount: 1,
      isActive: true,
      createdAt: "2023-01-01",
      createdBy: "user-admin"
    },
    {
      id: "role-univ-1-2", 
      name: "Vice-Recteur",
      description: "Assistance à la direction générale",
      permissions: ["unite.view_self", "unite.view_children", "role.view_all", "attribution.view_all"],
      unitId: "univ-1",
      userCount: 2,
      isActive: true,
      createdAt: "2023-01-15",
      createdBy: "user-recteur"
    }
  ],
  
  // Faculté Sciences et Technologies
  "univ-1-fac-1": [
    {
      id: "role-super-admin-fac",
      name: "Super Admin",
      description: "Accès complet (démo)",
      permissions: [
        "unite.view_self", "unite.view_children", "unite.create", "unite.change", "unite.delete",
        "role.view_all", "role.view_own", "role.create", "role.change", "role.delete",
        "attribution.view_all", "attribution.view_own", "attribution.create", "attribution.change", "attribution.delete",
        "members.view_all", "members.view_students", "members.create", "members.change", "members.delete",
        "courses.view_all", "courses.view_own", "courses.create", "courses.change", "courses.delete",
        "schedule.view", "schedule.create", "schedule.change", "schedule.delete",
        "exams.view_all", "exams.view_own", "exams.create", "exams.change", "exams.grade", "exams.view_results",
        "attendance.view", "attendance.create", "attendance.change", "attendance.reports",
        "resources.view", "resources.download", "resources.upload", "resources.change", "resources.delete"
      ],
      unitId: "univ-1-fac-1",
      userCount: 1,
      isActive: true,
      createdAt: "2023-02-01",
      createdBy: "user-admin"
    },
    {
      id: "role-doyen",
      name: "Doyen",
      description: "Direction d'une faculté",
      permissions: ["unite.view_self", "unite.view_children", "unite.create", "unite.change", "role.view_all", "role.create", "role.change", "attribution.view_all", "attribution.create", "attribution.change"],
      unitId: "univ-1-fac-1",
      userCount: 1,
      isActive: true,
      createdAt: "2023-02-01",
      createdBy: "user-recteur"
    },
    {
      id: "role-fac-1-2",
      name: "Vice-Doyen",
      description: "Assistance au doyen",
      permissions: ["unite.view_self", "unite.view_children", "role.view_all", "attribution.view_all"],
      unitId: "univ-1-fac-1", 
      userCount: 1,
      isActive: true,
      createdAt: "2023-02-15",
      createdBy: "user-doyen"
    },
    {
      id: "role-fac-1-3",
      name: "Secrétaire Général",
      description: "Gestion administrative de la faculté",
      permissions: ["unite.view_self", "members.view_all", "members.change"],
      unitId: "univ-1-fac-1",
      userCount: 2,
      isActive: true,
      createdAt: "2023-03-01",
      createdBy: "user-doyen"
    }
  ],

  // Département Informatique
  "univ-1-fac-1-dep-1": [
    {
      id: "role-super-admin-dep",
      name: "Super Admin",
      description: "Accès complet (démo)",
      permissions: [
        "unite.view_self", "unite.view_children", "unite.create", "unite.change", "unite.delete",
        "role.view_all", "role.view_own", "role.create", "role.change", "role.delete",
        "attribution.view_all", "attribution.view_own", "attribution.create", "attribution.change", "attribution.delete",
        "members.view_all", "members.view_students", "members.create", "members.change", "members.delete",
        "courses.view_all", "courses.view_own", "courses.create", "courses.change", "courses.delete",
        "schedule.view", "schedule.create", "schedule.change", "schedule.delete",
        "exams.view_all", "exams.view_own", "exams.create", "exams.change", "exams.grade", "exams.view_results",
        "attendance.view", "attendance.create", "attendance.change", "attendance.reports",
        "resources.view", "resources.download", "resources.upload", "resources.change", "resources.delete"
      ],
      unitId: "univ-1-fac-1-dep-1",
      userCount: 1,
      isActive: true,
      createdAt: "2023-03-01",
      createdBy: "user-admin"
    },
    {
      id: "role-chef-dep",
      name: "Chef de Département",
      description: "Direction d'un département",
      permissions: ["unite.view_self", "unite.view_children", "unite.create", "unite.change", "role.view_all", "role.create", "role.change", "attribution.view_all", "attribution.create", "attribution.change"],
      unitId: "univ-1-fac-1-dep-1",
      userCount: 1,
      isActive: true,
      createdAt: "2023-03-01",
      createdBy: "user-doyen"
    },
    {
      id: "role-professeur",
      name: "Professeur",
      description: "Enseignant universitaire",
      permissions: ["unite.view_self", "members.view_students", "members.change", "courses.view_own", "courses.create", "courses.change", "schedule.view", "schedule.create", "schedule.change", "exams.view_own", "exams.create", "exams.change", "exams.grade", "exams.view_results", "attendance.view", "attendance.create", "attendance.change", "attendance.reports", "resources.view", "resources.download", "resources.upload", "resources.change"],
      unitId: "univ-1-fac-1-dep-1-lic-1",
      userCount: 3,
      isActive: true,
      createdAt: "2023-09-01",
      createdBy: "user-chef-dep"
    },
    {
      id: "role-etudiant",
      name: "Étudiant",
      description: "Étudiant en licence",
      permissions: ["unite.view_self", "courses.view_all", "schedule.view", "exams.view_results", "resources.view", "resources.download"],
      unitId: "univ-1-fac-1-dep-1-lic-1",
      userCount: 25,
      isActive: true,
      createdAt: "2023-09-15",
      createdBy: "user-admin"
    },
    {
      id: "role-super-admin-lic",
      name: "Super Admin",
      description: "Accès complet (démo)",
      permissions: [
        "unite.view_self", "unite.view_children", "unite.create", "unite.change", "unite.delete",
        "role.view_all", "role.view_own", "role.create", "role.change", "role.delete",
        "attribution.view_all", "attribution.view_own", "attribution.create", "attribution.change", "attribution.delete",
        "members.view_all", "members.view_students", "members.create", "members.change", "members.delete",
        "courses.view_all", "courses.view_own", "courses.create", "courses.change", "courses.delete",
        "schedule.view", "schedule.create", "schedule.change", "schedule.delete",
        "exams.view_all", "exams.view_own", "exams.create", "exams.change", "exams.grade", "exams.view_results",
        "attendance.view", "attendance.create", "attendance.change", "attendance.reports",
        "resources.view", "resources.download", "resources.upload", "resources.change", "resources.delete"
      ],
      unitId: "univ-1-fac-1-dep-1-lic-1",
      userCount: 1,
      isActive: true,
      createdAt: "2023-09-01",
      createdBy: "user-admin"
    }
  ],

  // École Primaire
  "ecole-1": [
    {
      id: "role-super-admin-ecole",
      name: "Super Admin",
      description: "Accès complet (démo)",
      permissions: [
        "unite.view_self", "unite.view_children", "unite.create", "unite.change", "unite.delete",
        "role.view_all", "role.view_own", "role.create", "role.change", "role.delete",
        "attribution.view_all", "attribution.view_own", "attribution.create", "attribution.change", "attribution.delete",
        "members.view_all", "members.view_students", "members.create", "members.change", "members.delete",
        "courses.view_all", "courses.view_own", "courses.create", "courses.change", "courses.delete",
        "schedule.view", "schedule.create", "schedule.change", "schedule.delete",
        "exams.view_all", "exams.view_own", "exams.create", "exams.change", "exams.grade", "exams.view_results",
        "attendance.view", "attendance.create", "attendance.change", "attendance.reports",
        "resources.view", "resources.download", "resources.upload", "resources.change", "resources.delete"
      ],
      unitId: "ecole-1",
      userCount: 1,
      isActive: true,
      createdAt: "2023-09-01",
      createdBy: "user-admin"
    },
    {
      id: "role-directeur-ecole",
      name: "Directeur d'École",
      description: "Direction d'une école primaire",
      permissions: ["unite.view_self", "unite.view_children", "unite.create", "unite.change", "role.view_all", "role.create", "role.change", "attribution.view_all", "attribution.create", "attribution.change", "members.view_all", "members.create", "members.change"],
      unitId: "ecole-1",
      userCount: 1,
      isActive: true,
      createdAt: "2023-09-01",
      createdBy: "user-admin"
    },
    {
      id: "role-ecole-1-2",
      name: "Directeur Adjoint",
      description: "Assistance à la direction",
      permissions: ["unite.view_self", "unite.view_children", "members.view_all", "schedule.view", "attendance.view", "attendance.reports"],
      unitId: "ecole-1",
      userCount: 1,
      isActive: true,
      createdAt: "2023-09-15",
      createdBy: "user-directeur-ecole"
    }
  ],

  // Classe CP-A
  "ecole-1-cycle-1-niv-1-classe-1": [
    {
      id: "role-super-admin-classe",
      name: "Super Admin",
      description: "Accès complet (démo)",
      permissions: [
        "unite.view_self", "unite.view_children", "unite.create", "unite.change", "unite.delete",
        "role.view_all", "role.view_own", "role.create", "role.change", "role.delete",
        "attribution.view_all", "attribution.view_own", "attribution.create", "attribution.change", "attribution.delete",
        "members.view_all", "members.view_students", "members.create", "members.change", "members.delete",
        "courses.view_all", "courses.view_own", "courses.create", "courses.change", "courses.delete",
        "schedule.view", "schedule.create", "schedule.change", "schedule.delete",
        "exams.view_all", "exams.view_own", "exams.create", "exams.change", "exams.grade", "exams.view_results",
        "attendance.view", "attendance.create", "attendance.change", "attendance.reports",
        "resources.view", "resources.download", "resources.upload", "resources.change", "resources.delete"
      ],
      unitId: "ecole-1-cycle-1-niv-1-classe-1",
      userCount: 1,
      isActive: true,
      createdAt: "2023-09-01",
      createdBy: "user-admin"
    },
    {
      id: "role-instituteur",
      name: "Instituteur",
      description: "Enseignant du primaire",
      permissions: ["unite.view_self", "members.view_students", "members.change", "courses.view_all", "courses.create", "courses.change", "schedule.view", "schedule.create", "schedule.change", "exams.view_all", "exams.create", "exams.change", "exams.grade", "exams.view_results", "attendance.view", "attendance.create", "attendance.change", "attendance.reports", "resources.view", "resources.download", "resources.upload", "resources.change"],
      unitId: "ecole-1-cycle-1-niv-1-classe-1",
      userCount: 1,
      isActive: true,
      createdAt: "2023-09-01",
      createdBy: "user-directeur-ecole"
    },
    {
      id: "role-classe-1-2",
      name: "Assistant Pédagogique",
      description: "Support pédagogique",
      permissions: ["unite.view_self", "members.view_students", "resources.view", "resources.download"],
      unitId: "ecole-1-cycle-1-niv-1-classe-1",
      userCount: 1,
      isActive: true,
      createdAt: "2023-09-15",
      createdBy: "user-instituteur"
    }
  ]
};

/**
 * Données d'exemple pour les attributions par unité
 */
export const attributionsData: Record<string, Attribution[]> = {
  "univ-1": [
    {
      id: "attr-1",
      userId: "user-recteur",
      userName: "Dr. Amadou Diallo",
      roleId: "role-recteur",
      roleName: "Recteur",
      unitId: "univ-1",
      assignedDate: "2023-01-15",
      assignedBy: "Ministère de l'Enseignement Supérieur"
    },
    {
      id: "attr-super-admin-univ",
      userId: "user-admin",
      userName: "Administrateur Système",
      roleId: "role-super-admin-univ",
      roleName: "Super Admin",
      unitId: "univ-1",
      assignedDate: "2023-01-02",
      assignedBy: "Système"
    }
  ],
  
  "univ-1-fac-1": [
    {
      id: "attr-2",
      userId: "user-doyen", 
      userName: "Prof. Fatou Sow",
      roleId: "role-doyen",
      roleName: "Doyen",
      unitId: "univ-1-fac-1",
      assignedDate: "2023-02-01",
      assignedBy: "Dr. Amadou Diallo"
    },
    {
      id: "attr-3",
      userId: "user-coordo-dep",
      userName: "Coordo Département",
      roleId: "role-fac-1-2", 
      roleName: "Vice-Doyen",
      unitId: "univ-1-fac-1",
      assignedDate: "2023-02-15",
      assignedBy: "Prof. Fatou Sow"
    },
    {
      id: "attr-super-admin-fac",
      userId: "user-admin",
      userName: "Administrateur Système",
      roleId: "role-super-admin-fac",
      roleName: "Super Admin",
      unitId: "univ-1-fac-1",
      assignedDate: "2023-02-02",
      assignedBy: "Système"
    }
  ],

  "univ-1-fac-1-dep-1": [
    {
      id: "attr-4",
      userId: "user-chef-dep",
      userName: "Dr. Ousmane Ndiaye",
      roleId: "role-chef-dep",
      roleName: "Chef de Département",
      unitId: "univ-1-fac-1-dep-1",
      assignedDate: "2023-03-01",
      assignedBy: "Prof. Fatou Sow"
    },
    {
      id: "attr-super-admin-dep",
      userId: "user-admin",
      userName: "Administrateur Système",
      roleId: "role-super-admin-dep",
      roleName: "Super Admin",
      unitId: "univ-1-fac-1-dep-1",
      assignedDate: "2023-03-02",
      assignedBy: "Système"
    }
  ],

  "univ-1-fac-1-dep-1-lic-1": [
    {
      id: "attr-prof-1",
      userId: "user-prof-java",
      userName: "Prof. Moussa Kane",
      roleId: "role-professeur",
      roleName: "Professeur",
      unitId: "univ-1-fac-1-dep-1-lic-1",
      assignedDate: "2023-09-01",
      assignedBy: "Dr. Ousmane Ndiaye"
    },
    {
      id: "attr-etud-1",
      userId: "user-etudiant",
      userName: "Amadou Diop",
      roleId: "role-etudiant",
      roleName: "Étudiant",
      unitId: "univ-1-fac-1-dep-1-lic-1",
      assignedDate: "2023-09-15",
      assignedBy: "Secrétariat"
    },
    {
      id: "attr-super-admin-lic",
      userId: "user-admin",
      userName: "Administrateur Système",
      roleId: "role-super-admin-lic",
      roleName: "Super Admin",
      unitId: "univ-1-fac-1-dep-1-lic-1",
      assignedDate: "2023-09-02",
      assignedBy: "Système"
    }
  ],

  "ecole-1": [
    {
      id: "attr-5",
      userId: "user-directeur-ecole",
      userName: "Mme Aïssatou Ba",
      roleId: "role-directeur-ecole",
      roleName: "Directeur d'École",
      unitId: "ecole-1",
      assignedDate: "2023-09-01",
      assignedBy: "Inspection Académique"
    },
    {
      id: "attr-surveillant-1",
      userId: "user-surveillant",
      userName: "M. Pape Surv",
      roleId: "role-ecole-1-2",
      roleName: "Directeur Adjoint",
      unitId: "ecole-1",
      assignedDate: "2023-10-01",
      assignedBy: "Mme Aïssatou Ba"
    },
    {
      id: "attr-super-admin-ecole",
      userId: "user-admin",
      userName: "Administrateur Système",
      roleId: "role-super-admin-ecole",
      roleName: "Super Admin",
      unitId: "ecole-1",
      assignedDate: "2023-09-02",
      assignedBy: "Système"
    }
  ],

  "ecole-1-cycle-1-niv-1-classe-1": [
    {
      id: "attr-6",
      userId: "user-instituteur",
      userName: "M. Ibrahima Sarr",
      roleId: "role-instituteur",
      roleName: "Instituteur",
      unitId: "ecole-1-cycle-1-niv-1-classe-1",
      assignedDate: "2023-09-01",
      assignedBy: "Mme Aïssatou Ba"
    },
    {
      id: "attr-assistant-1",
      userId: "user-assistant",
      userName: "Mme Ndeye Assist",
      roleId: "role-classe-1-2",
      roleName: "Assistant Pédagogique",
      unitId: "ecole-1-cycle-1-niv-1-classe-1",
      assignedDate: "2023-10-02",
      assignedBy: "M. Ibrahima Sarr"
    },
    {
      id: "attr-super-admin-classe",
      userId: "user-admin",
      userName: "Administrateur Système",
      roleId: "role-super-admin-classe",
      roleName: "Super Admin",
      unitId: "ecole-1-cycle-1-niv-1-classe-1",
      assignedDate: "2023-09-02",
      assignedBy: "Système"
    }
  ]
};
