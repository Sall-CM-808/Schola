// Types pour les paramètres
export interface UserSession {
  id: string;
  deviceName: string;
  browser: string;
  os: string;
  ipAddress: string;
  location: string;
  loginAt: string;
  lastActivity: string;
  isCurrent: boolean;
}

export interface Settings {
  theme: "light" | "dark" | "auto";
  density: "compact" | "comfortable" | "spacious";
  language: "fr" | "en" | "es";
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
    sound: boolean;
  };
  privacy: {
    profileVisible: boolean;
    activityVisible: boolean;
    onlineStatus: boolean;
  };
  accessibility: {
    highContrast: boolean;
    reducedMotion: boolean;
    fontSize: "small" | "normal" | "large";
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
  avatar?: string;
  joinedAt: string;
  lastLogin: string;
  sessionsCount: number;
}

// Données mock du profil utilisateur actuel
export const currentUserProfile: UserProfile = {
  id: "current-user",
  name: "Admin Principal",
  email: "admin@schola.edu",
  username: "admin.principal",
  role: "Super Administrateur",
  joinedAt: "2020-01-01T00:00:00Z",
  lastLogin: new Date().toISOString(),
  sessionsCount: 1247,
};

// Données mock des sessions
export const userSessions: UserSession[] = [
  {
    id: "session-1",
    deviceName: "MacBook Pro",
    browser: "Chrome 120",
    os: "macOS Sonoma",
    ipAddress: "192.168.1.45",
    location: "Paris, France",
    loginAt: new Date().toISOString(),
    lastActivity: new Date().toISOString(),
    isCurrent: true,
  },
  {
    id: "session-2",
    deviceName: "iPhone 15",
    browser: "Safari Mobile",
    os: "iOS 17.2",
    ipAddress: "192.168.1.78",
    location: "Paris, France",
    loginAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    lastActivity: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    isCurrent: false,
  },
  {
    id: "session-3",
    deviceName: "Windows PC",
    browser: "Edge 120",
    os: "Windows 11",
    ipAddress: "10.0.0.156",
    location: "Lyon, France",
    loginAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    lastActivity: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    isCurrent: false,
  },
  {
    id: "session-4",
    deviceName: "iPad Air",
    browser: "Safari",
    os: "iPadOS 17",
    ipAddress: "192.168.1.89",
    location: "Paris, France",
    loginAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    isCurrent: false,
  },
];

// Paramètres par défaut
export const defaultSettings: Settings = {
  theme: "dark",
  density: "comfortable",
  language: "fr",
  notifications: {
    email: true,
    push: true,
    desktop: false,
    sound: true,
  },
  privacy: {
    profileVisible: true,
    activityVisible: true,
    onlineStatus: true,
  },
  accessibility: {
    highContrast: false,
    reducedMotion: false,
    fontSize: "normal",
  },
};

// Fonction pour sauvegarder les paramètres dans le localStorage
export const saveSettings = (settings: Settings): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("schola-admin-settings", JSON.stringify(settings));
  }
};

// Fonction pour charger les paramètres depuis le localStorage
export const loadSettings = (): Settings => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("schola-admin-settings");
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) };
      } catch (error) {
        console.warn("Erreur lors du chargement des paramètres:", error);
      }
    }
  }
  return defaultSettings;
};

// Options disponibles pour les paramètres
export const settingsOptions = {
  theme: [
    { value: "light", label: "Clair", description: "Interface claire" },
    {
      value: "dark",
      label: "Sombre",
      description: "Interface sombre (recommandé)",
    },
    {
      value: "auto",
      label: "Automatique",
      description: "Suit les préférences système",
    },
  ],
  density: [
    {
      value: "compact",
      label: "Compact",
      description: "Interface dense, plus d'informations",
    },
    {
      value: "comfortable",
      label: "Confortable",
      description: "Équilibre entre espace et contenu",
    },
    {
      value: "spacious",
      label: "Spacieux",
      description: "Interface aérée, plus d'espace",
    },
  ],
  language: [
    { value: "fr", label: "Français", flag: "🇫🇷" },
    { value: "en", label: "English", flag: "🇺🇸" },
    { value: "es", label: "Español", flag: "🇪🇸" },
  ],
  fontSize: [
    { value: "small", label: "Petite", description: "Texte plus petit" },
    { value: "normal", label: "Normale", description: "Taille standard" },
    { value: "large", label: "Grande", description: "Texte plus grand" },
  ],
};

// Fonction pour obtenir l'icône du device
export const getDeviceIcon = (deviceName: string, os: string): string => {
  if (
    deviceName.toLowerCase().includes("iphone") ||
    os.toLowerCase().includes("ios")
  ) {
    return "📱";
  }
  if (
    deviceName.toLowerCase().includes("ipad") ||
    os.toLowerCase().includes("ipados")
  ) {
    return "📱";
  }
  if (
    deviceName.toLowerCase().includes("mac") ||
    os.toLowerCase().includes("macos")
  ) {
    return "💻";
  }
  if (os.toLowerCase().includes("windows")) {
    return "🖥️";
  }
  if (os.toLowerCase().includes("android")) {
    return "📱";
  }
  if (os.toLowerCase().includes("linux")) {
    return "🐧";
  }
  return "💻";
};

// Fonction pour obtenir la couleur du statut de session
export const getSessionStatusColor = (lastActivity: string): string => {
  const now = new Date().getTime();
  const lastActivityTime = new Date(lastActivity).getTime();
  const diffInMinutes = (now - lastActivityTime) / (1000 * 60);

  if (diffInMinutes < 5) {
    return "bg-green-500"; // En ligne
  } else if (diffInMinutes < 30) {
    return "bg-yellow-500"; // Récemment actif
  } else {
    return "bg-gray-500"; // Inactif
  }
};

// Fonction pour obtenir le label du statut de session
export const getSessionStatusLabel = (
  lastActivity: string,
  isCurrent: boolean
): string => {
  if (isCurrent) {
    return "Session actuelle";
  }

  const now = new Date().getTime();
  const lastActivityTime = new Date(lastActivity).getTime();
  const diffInMinutes = (now - lastActivityTime) / (1000 * 60);

  if (diffInMinutes < 5) {
    return "En ligne";
  } else if (diffInMinutes < 30) {
    return "Récemment actif";
  } else if (diffInMinutes < 60) {
    return `Inactif depuis ${Math.floor(diffInMinutes)} min`;
  } else if (diffInMinutes < 24 * 60) {
    return `Inactif depuis ${Math.floor(diffInMinutes / 60)}h`;
  } else {
    return `Inactif depuis ${Math.floor(diffInMinutes / (24 * 60))} jour(s)`;
  }
};

// Fonction pour simuler la révocation d'une session
export const revokeSession = async (
  sessionId: string
): Promise<{ success: boolean; message: string }> => {
  // Simuler un délai de traitement
  await new Promise((resolve) => setTimeout(resolve, 800));

  const sessionIndex = userSessions.findIndex((s) => s.id === sessionId);
  if (sessionIndex === -1) {
    return { success: false, message: "Session introuvable" };
  }

  const session = userSessions[sessionIndex];
  if (session.isCurrent) {
    return {
      success: false,
      message: "Impossible de révoquer la session actuelle",
    };
  }

  // Supprimer la session
  userSessions.splice(sessionIndex, 1);

  return { success: true, message: "Session révoquée avec succès" };
};

// Fonction pour simuler un délai de chargement
export const simulateLoading = (delay: number = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
