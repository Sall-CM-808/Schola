// Types pour les données utilisateurs
export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  type: "admin" | "teacher" | "student" | "staff";
  status: "active" | "inactive";
  createdAt: string;
  lastLogin?: string;
  avatar?: string;
}

export interface UserRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  assignedAt: string;
}

export interface LastLogin {
  id: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  location: string;
}

export interface UserDetail {
  profile: User;
  roles: UserRole[];
  lastLogins: LastLogin[];
  stats: {
    totalSessions: number;
    averageSessionDuration: string;
    lastActiveDate: string;
    accountAge: string;
  };
}

// Générateur de données utilisateurs
const generateUsers = (count: number): User[] => {
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
    "Léa",
    "Nicolas",
    "Chloé",
    "Alexandre",
    "Manon",
    "Maxime",
    "Sarah",
    "Julien",
    "Laura",
    "Romain",
    "Océane",
    "Quentin",
    "Jade",
    "Florian",
    "Inès",
    "Hugo",
    "Lola",
    "Nathan",
    "Zoé",
    "Théo",
    "Clara",
    "Enzo",
    "Lily",
    "Gabriel",
    "Nina",
    "Louis",
    "Mila",
    "Arthur",
    "Alice",
    "Paul",
    "Rose",
    "Victor",
    "Agathe",
    "Raphaël",
    "Margot",
    "Adam",
    "Juliette",
    "Simon",
    "Anaïs",
  ];

  const lastNames = [
    "Martin",
    "Bernard",
    "Dubois",
    "Thomas",
    "Robert",
    "Richard",
    "Petit",
    "Durand",
    "Leroy",
    "Moreau",
    "Simon",
    "Laurent",
    "Lefebvre",
    "Michel",
    "Garcia",
    "David",
    "Bertrand",
    "Roux",
    "Vincent",
    "Fournier",
    "Morel",
    "Girard",
    "André",
    "Lefèvre",
    "Mercier",
    "Dupont",
    "Lambert",
    "Bonnet",
    "François",
    "Martinez",
    "Legrand",
    "Garnier",
    "Faure",
    "Rousseau",
    "Blanc",
    "Guerin",
    "Muller",
    "Henry",
    "Roussel",
    "Nicolas",
    "Perrin",
    "Morin",
    "Mathieu",
    "Clement",
    "Gauthier",
    "Dumont",
    "Lopez",
    "Fontaine",
  ];

  const types: User["type"][] = ["admin", "teacher", "student", "staff"];
  const typeWeights = [0.02, 0.15, 0.8, 0.03]; // 2% admin, 15% teacher, 80% student, 3% staff

  const getRandomType = (): User["type"] => {
    const rand = Math.random();
    let cumulative = 0;
    for (let i = 0; i < types.length; i++) {
      cumulative += typeWeights[i];
      if (rand < cumulative) return types[i];
    }
    return "student";
  };

  const users: User[] = [];

  for (let i = 1; i <= count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const type = getRandomType();
    const status: User["status"] = Math.random() > 0.85 ? "inactive" : "active";

    // Dates entre il y a 2 ans et maintenant
    const createdAt = new Date(
      Date.now() - Math.random() * 2 * 365 * 24 * 60 * 60 * 1000
    ).toISOString();

    // Dernière connexion (si actif, plus récente)
    const lastLogin =
      status === "active"
        ? new Date(
            Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
          ).toISOString()
        : Math.random() > 0.5
        ? new Date(
            Date.now() - (Math.random() * 90 + 30) * 24 * 60 * 60 * 1000
          ).toISOString()
        : undefined;

    users.push({
      id: `user-${i}`,
      name: `${firstName} ${lastName}`,
      username: `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@schola.edu`,
      type,
      status,
      createdAt,
      lastLogin,
    });
  }

  return users.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

// Données mock des utilisateurs (60 utilisateurs)
export const users: User[] = generateUsers(60);

// Générateur de détails utilisateur
export const generateUserDetail = (userId: string): UserDetail => {
  const user = users.find((u) => u.id === userId);
  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }

  // Rôles selon le type d'utilisateur
  const rolesByType: Record<User["type"], UserRole[]> = {
    admin: [
      {
        id: "role-admin-1",
        name: "Super Administrateur",
        description: "Accès complet à toutes les fonctionnalités",
        permissions: [
          "users.manage",
          "roles.manage",
          "system.admin",
          "reports.view",
          "settings.modify",
        ],
        assignedAt: user.createdAt,
      },
    ],
    teacher: [
      {
        id: "role-teacher-1",
        name: "Enseignant",
        description: "Gestion des cours et étudiants",
        permissions: [
          "courses.manage",
          "students.view",
          "grades.manage",
          "assignments.create",
        ],
        assignedAt: user.createdAt,
      },
      ...(Math.random() > 0.7
        ? [
            {
              id: "role-teacher-2",
              name: "Coordinateur Pédagogique",
              description: "Coordination des programmes d'enseignement",
              permissions: [
                "programs.coordinate",
                "teachers.assist",
                "curriculum.manage",
              ],
              assignedAt: new Date(
                new Date(user.createdAt).getTime() + 30 * 24 * 60 * 60 * 1000
              ).toISOString(),
            },
          ]
        : []),
    ],
    student: [
      {
        id: "role-student-1",
        name: "Étudiant",
        description: "Accès aux cours et ressources pédagogiques",
        permissions: [
          "courses.view",
          "assignments.submit",
          "grades.view",
          "resources.access",
        ],
        assignedAt: user.createdAt,
      },
    ],
    staff: [
      {
        id: "role-staff-1",
        name: "Personnel Administratif",
        description: "Support administratif et technique",
        permissions: ["support.provide", "reports.basic", "users.assist"],
        assignedAt: user.createdAt,
      },
    ],
  };

  // Dernières connexions
  const lastLogins: LastLogin[] = [];
  const loginCount = Math.floor(Math.random() * 10) + 5;

  for (let i = 0; i < loginCount; i++) {
    const timestamp = new Date(
      Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000
    ).toISOString();

    const locations = [
      "Paris, France",
      "Lyon, France",
      "Marseille, France",
      "Toulouse, France",
      "Nice, France",
    ];
    const browsers = [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Safari/537.36",
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Firefox/121.0",
    ];

    lastLogins.push({
      id: `login-${i}`,
      timestamp,
      ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(
        Math.random() * 255
      )}`,
      userAgent: browsers[Math.floor(Math.random() * browsers.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
    });
  }

  lastLogins.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  // Statistiques
  const accountAgeMs = Date.now() - new Date(user.createdAt).getTime();
  const accountAgeDays = Math.floor(accountAgeMs / (24 * 60 * 60 * 1000));

  return {
    profile: user,
    roles: rolesByType[user.type],
    lastLogins: lastLogins.slice(0, 8), // Dernières 8 connexions
    stats: {
      totalSessions: lastLogins.length,
      averageSessionDuration: `${Math.floor(Math.random() * 120 + 30)} min`,
      lastActiveDate: user.lastLogin || "Jamais connecté",
      accountAge:
        accountAgeDays > 365
          ? `${Math.floor(accountAgeDays / 365)} an${
              Math.floor(accountAgeDays / 365) > 1 ? "s" : ""
            }`
          : `${accountAgeDays} jour${accountAgeDays > 1 ? "s" : ""}`,
    },
  };
};

// Fonction pour simuler un délai de chargement
export const simulateLoading = (delay: number = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
