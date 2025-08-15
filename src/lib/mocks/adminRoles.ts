// Types pour les rôles et permissions
export interface Role {
  id: string;
  name: string;
  description: string;
  membersCount: number;
  createdAt: string;
  isSystem: boolean;
  color: string;
}

export interface Permission {
  id: string;
  action: string;
  description: string;
}

export interface PermissionCategory {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

export interface ElementLinked {
  id: string;
  title: string;
  type: "course" | "assignment" | "resource" | "announcement";
  unitName: string;
  createdAt: string;
}

export interface Attribution {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userType: "admin" | "teacher" | "student" | "staff";
  assignedAt: string;
  assignedBy: string;
  isActive: boolean;
}

export interface RoleDetail {
  role: Role;
  permissionsByCategory: Record<string, string[]>;
  elementsLinked: ElementLinked[];
  attributions: Attribution[];
}

// Catégories de permissions
export const permissionCategories: PermissionCategory[] = [
  {
    id: "users",
    name: "Gestion des Utilisateurs",
    description: "Permissions liées à la gestion des comptes utilisateurs",
    permissions: [
      {
        id: "users.view",
        action: "users.view",
        description: "Consulter la liste des utilisateurs",
      },
      {
        id: "users.create",
        action: "users.create",
        description: "Créer de nouveaux utilisateurs",
      },
      {
        id: "users.edit",
        action: "users.edit",
        description: "Modifier les profils utilisateurs",
      },
      {
        id: "users.delete",
        action: "users.delete",
        description: "Supprimer des utilisateurs",
      },
      {
        id: "users.manage",
        action: "users.manage",
        description: "Gestion complète des utilisateurs",
      },
      {
        id: "users.impersonate",
        action: "users.impersonate",
        description: "Se connecter en tant qu'autre utilisateur",
      },
    ],
  },
  {
    id: "courses",
    name: "Gestion des Cours",
    description: "Permissions pour la création et gestion des cours",
    permissions: [
      {
        id: "courses.view",
        action: "courses.view",
        description: "Consulter les cours",
      },
      {
        id: "courses.create",
        action: "courses.create",
        description: "Créer de nouveaux cours",
      },
      {
        id: "courses.edit",
        action: "courses.edit",
        description: "Modifier les cours existants",
      },
      {
        id: "courses.delete",
        action: "courses.delete",
        description: "Supprimer des cours",
      },
      {
        id: "courses.manage",
        action: "courses.manage",
        description: "Gestion complète des cours",
      },
      {
        id: "courses.publish",
        action: "courses.publish",
        description: "Publier/dépublier des cours",
      },
    ],
  },
  {
    id: "assignments",
    name: "Gestion des Devoirs",
    description: "Permissions pour les devoirs et évaluations",
    permissions: [
      {
        id: "assignments.view",
        action: "assignments.view",
        description: "Consulter les devoirs",
      },
      {
        id: "assignments.create",
        action: "assignments.create",
        description: "Créer des devoirs",
      },
      {
        id: "assignments.edit",
        action: "assignments.edit",
        description: "Modifier les devoirs",
      },
      {
        id: "assignments.delete",
        action: "assignments.delete",
        description: "Supprimer des devoirs",
      },
      {
        id: "assignments.grade",
        action: "assignments.grade",
        description: "Noter les devoirs",
      },
      {
        id: "assignments.submit",
        action: "assignments.submit",
        description: "Soumettre des devoirs",
      },
    ],
  },
  {
    id: "grades",
    name: "Gestion des Notes",
    description: "Permissions pour la consultation et gestion des notes",
    permissions: [
      {
        id: "grades.view",
        action: "grades.view",
        description: "Consulter les notes",
      },
      {
        id: "grades.edit",
        action: "grades.edit",
        description: "Modifier les notes",
      },
      {
        id: "grades.export",
        action: "grades.export",
        description: "Exporter les relevés de notes",
      },
      {
        id: "grades.manage",
        action: "grades.manage",
        description: "Gestion complète des notes",
      },
    ],
  },
  {
    id: "resources",
    name: "Gestion des Ressources",
    description: "Permissions pour les ressources pédagogiques",
    permissions: [
      {
        id: "resources.view",
        action: "resources.view",
        description: "Consulter les ressources",
      },
      {
        id: "resources.create",
        action: "resources.create",
        description: "Créer des ressources",
      },
      {
        id: "resources.edit",
        action: "resources.edit",
        description: "Modifier les ressources",
      },
      {
        id: "resources.delete",
        action: "resources.delete",
        description: "Supprimer des ressources",
      },
      {
        id: "resources.access",
        action: "resources.access",
        description: "Accéder aux ressources",
      },
    ],
  },
  {
    id: "system",
    name: "Administration Système",
    description: "Permissions d'administration système",
    permissions: [
      {
        id: "system.admin",
        action: "system.admin",
        description: "Administration système complète",
      },
      {
        id: "system.backup",
        action: "system.backup",
        description: "Gérer les sauvegardes",
      },
      {
        id: "system.logs",
        action: "system.logs",
        description: "Consulter les journaux système",
      },
      {
        id: "system.maintenance",
        action: "system.maintenance",
        description: "Mode maintenance",
      },
    ],
  },
  {
    id: "roles",
    name: "Gestion des Rôles",
    description: "Permissions pour la gestion des rôles et permissions",
    permissions: [
      {
        id: "roles.view",
        action: "roles.view",
        description: "Consulter les rôles",
      },
      {
        id: "roles.create",
        action: "roles.create",
        description: "Créer de nouveaux rôles",
      },
      {
        id: "roles.edit",
        action: "roles.edit",
        description: "Modifier les rôles",
      },
      {
        id: "roles.delete",
        action: "roles.delete",
        description: "Supprimer des rôles",
      },
      {
        id: "roles.assign",
        action: "roles.assign",
        description: "Attribuer des rôles aux utilisateurs",
      },
      {
        id: "roles.manage",
        action: "roles.manage",
        description: "Gestion complète des rôles",
      },
    ],
  },
  {
    id: "reports",
    name: "Rapports et Statistiques",
    description: "Permissions pour les rapports et analyses",
    permissions: [
      {
        id: "reports.view",
        action: "reports.view",
        description: "Consulter les rapports",
      },
      {
        id: "reports.create",
        action: "reports.create",
        description: "Créer des rapports",
      },
      {
        id: "reports.export",
        action: "reports.export",
        description: "Exporter des rapports",
      },
      {
        id: "reports.analytics",
        action: "reports.analytics",
        description: "Accès aux analytics avancées",
      },
    ],
  },
];

// Données mock des rôles
export const roles: Role[] = [
  {
    id: "role-1",
    name: "Super Administrateur",
    description: "Accès complet à toutes les fonctionnalités de la plateforme",
    membersCount: 2,
    createdAt: "2020-01-01T00:00:00Z",
    isSystem: true,
    color: "bg-red-500/20 text-red-300 border-red-500/30",
  },
  {
    id: "role-2",
    name: "Administrateur",
    description:
      "Gestion administrative avec restrictions sur certaines fonctions système",
    membersCount: 6,
    createdAt: "2020-01-15T00:00:00Z",
    isSystem: true,
    color: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  },
  {
    id: "role-3",
    name: "Enseignant",
    description:
      "Gestion des cours, devoirs et notes pour les matières assignées",
    membersCount: 156,
    createdAt: "2020-02-01T00:00:00Z",
    isSystem: true,
    color: "bg-green-500/20 text-green-300 border-green-500/30",
  },
  {
    id: "role-4",
    name: "Coordinateur Pédagogique",
    description:
      "Supervision pédagogique et coordination des programmes d'enseignement",
    membersCount: 12,
    createdAt: "2020-03-01T00:00:00Z",
    isSystem: false,
    color: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
  {
    id: "role-5",
    name: "Étudiant",
    description:
      "Accès aux cours, soumission de devoirs et consultation des notes",
    membersCount: 1067,
    createdAt: "2020-02-01T00:00:00Z",
    isSystem: true,
    color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  {
    id: "role-6",
    name: "Personnel Administratif",
    description: "Support administratif et gestion des services",
    membersCount: 16,
    createdAt: "2020-02-15T00:00:00Z",
    isSystem: true,
    color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  },
  {
    id: "role-7",
    name: "Responsable IT",
    description:
      "Gestion de l'infrastructure informatique et support technique",
    membersCount: 4,
    createdAt: "2020-04-01T00:00:00Z",
    isSystem: false,
    color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  },
  {
    id: "role-8",
    name: "Bibliothécaire",
    description:
      "Gestion des ressources documentaires et de la bibliothèque numérique",
    membersCount: 3,
    createdAt: "2020-05-01T00:00:00Z",
    isSystem: false,
    color: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  },
  {
    id: "role-9",
    name: "Tuteur",
    description: "Accompagnement et soutien pédagogique des étudiants",
    membersCount: 24,
    createdAt: "2020-06-01T00:00:00Z",
    isSystem: false,
    color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  },
  {
    id: "role-10",
    name: "Invité",
    description: "Accès limité en lecture seule pour les visiteurs",
    membersCount: 8,
    createdAt: "2020-07-01T00:00:00Z",
    isSystem: false,
    color: "bg-gray-500/20 text-gray-300 border-gray-500/30",
  },
];

// Générateur de détails de rôle
export const generateRoleDetail = (roleId: string): RoleDetail => {
  const role = roles.find((r) => r.id === roleId);
  if (!role) {
    throw new Error(`Role with id ${roleId} not found`);
  }

  // Permissions par rôle
  const rolePermissions: Record<string, string[]> = {
    "role-1": {
      users: [
        "users.view",
        "users.create",
        "users.edit",
        "users.delete",
        "users.manage",
        "users.impersonate",
      ],
      courses: [
        "courses.view",
        "courses.create",
        "courses.edit",
        "courses.delete",
        "courses.manage",
        "courses.publish",
      ],
      assignments: [
        "assignments.view",
        "assignments.create",
        "assignments.edit",
        "assignments.delete",
        "assignments.grade",
      ],
      grades: ["grades.view", "grades.edit", "grades.export", "grades.manage"],
      resources: [
        "resources.view",
        "resources.create",
        "resources.edit",
        "resources.delete",
      ],
      system: [
        "system.admin",
        "system.backup",
        "system.logs",
        "system.maintenance",
      ],
      roles: [
        "roles.view",
        "roles.create",
        "roles.edit",
        "roles.delete",
        "roles.assign",
        "roles.manage",
      ],
      reports: [
        "reports.view",
        "reports.create",
        "reports.export",
        "reports.analytics",
      ],
    },
    "role-2": {
      users: ["users.view", "users.create", "users.edit", "users.manage"],
      courses: [
        "courses.view",
        "courses.create",
        "courses.edit",
        "courses.manage",
      ],
      assignments: [
        "assignments.view",
        "assignments.create",
        "assignments.edit",
      ],
      grades: ["grades.view", "grades.export"],
      resources: ["resources.view", "resources.create", "resources.edit"],
      roles: ["roles.view", "roles.assign"],
      reports: ["reports.view", "reports.create", "reports.export"],
    },
    "role-3": {
      courses: [
        "courses.view",
        "courses.create",
        "courses.edit",
        "courses.publish",
      ],
      assignments: [
        "assignments.view",
        "assignments.create",
        "assignments.edit",
        "assignments.grade",
      ],
      grades: ["grades.view", "grades.edit", "grades.export"],
      resources: ["resources.view", "resources.create", "resources.edit"],
      users: ["users.view"],
    },
    "role-4": {
      courses: ["courses.view", "courses.manage"],
      assignments: ["assignments.view", "assignments.grade"],
      grades: ["grades.view", "grades.export", "grades.manage"],
      resources: ["resources.view", "resources.create", "resources.edit"],
      users: ["users.view"],
      reports: ["reports.view", "reports.create"],
    },
    "role-5": {
      courses: ["courses.view"],
      assignments: ["assignments.view", "assignments.submit"],
      grades: ["grades.view"],
      resources: ["resources.view", "resources.access"],
    },
    "role-6": {
      users: ["users.view"],
      courses: ["courses.view"],
      reports: ["reports.view"],
    },
    "role-7": {
      system: ["system.backup", "system.logs", "system.maintenance"],
      users: ["users.view", "users.edit"],
      reports: ["reports.view"],
    },
    "role-8": {
      resources: [
        "resources.view",
        "resources.create",
        "resources.edit",
        "resources.delete",
      ],
      courses: ["courses.view"],
    },
    "role-9": {
      users: ["users.view"],
      courses: ["courses.view"],
      assignments: ["assignments.view"],
      grades: ["grades.view"],
      resources: ["resources.view", "resources.access"],
    },
    "role-10": {
      courses: ["courses.view"],
      resources: ["resources.view", "resources.access"],
    },
  };

  // Éléments liés (mock)
  const elementsLinked: ElementLinked[] = [];
  const elementCount = Math.floor(Math.random() * 10) + 5;

  for (let i = 0; i < elementCount; i++) {
    const types: ElementLinked["type"][] = [
      "course",
      "assignment",
      "resource",
      "announcement",
    ];
    const units = [
      "Département Mathématiques",
      "Département Physique",
      "Département Informatique",
      "Services Administratifs",
    ];

    elementsLinked.push({
      id: `element-${i}`,
      title: `Élément ${i + 1} - ${role.name}`,
      type: types[Math.floor(Math.random() * types.length)],
      unitName: units[Math.floor(Math.random() * units.length)],
      createdAt: new Date(
        Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
      ).toISOString(),
    });
  }

  // Attributions (mock)
  const attributions: Attribution[] = [];
  const attributionCount = Math.min(role.membersCount, 20); // Limite à 20 pour l'affichage

  const firstNames = [
    "Marie",
    "Jean",
    "Sophie",
    "Pierre",
    "Emma",
    "Lucas",
    "Camille",
    "Thomas",
    "Julie",
    "Antoine",
  ];
  const lastNames = [
    "Dubois",
    "Martin",
    "Laurent",
    "Durand",
    "Moreau",
    "Bernard",
    "Petit",
    "Roux",
    "Blanc",
    "Leroy",
  ];

  for (let i = 0; i < attributionCount; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const userTypes: Attribution["userType"][] = [
      "admin",
      "teacher",
      "student",
      "staff",
    ];

    attributions.push({
      id: `attribution-${i}`,
      userId: `user-${i}`,
      userName: `${firstName} ${lastName}`,
      userEmail: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@schola.edu`,
      userType: userTypes[Math.floor(Math.random() * userTypes.length)],
      assignedAt: new Date(
        Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000
      ).toISOString(),
      assignedBy: "Admin System",
      isActive: Math.random() > 0.1, // 90% actifs
    });
  }

  return {
    role,
    permissionsByCategory: rolePermissions[roleId] || {},
    elementsLinked: elementsLinked.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ),
    attributions: attributions.sort(
      (a, b) =>
        new Date(b.assignedAt).getTime() - new Date(a.assignedAt).getTime()
    ),
  };
};

// Statistiques des rôles
export const rolesStats = {
  total: roles.length,
  system: roles.filter((r) => r.isSystem).length,
  custom: roles.filter((r) => !r.isSystem).length,
  totalMembers: roles.reduce((sum, role) => sum + role.membersCount, 0),
  averageMembers: Math.round(
    roles.reduce((sum, role) => sum + role.membersCount, 0) / roles.length
  ),
};

// Fonction pour simuler un délai de chargement
export const simulateLoading = (delay: number = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
