// Mock data for teacher settings

// Fonction pour simuler un délai de chargement
export const simulateLoading = (delay: number = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export interface TeacherSettings {
  theme: "dark" | "light" | "auto";
  density: "compact" | "comfortable" | "spacious";
  language: "fr" | "en" | "es";
  fontSize: "small" | "medium" | "large";
  notifications: {
    email: boolean;
    push: boolean;
    assignments: boolean;
    grades: boolean;
    messages: boolean;
  };
  privacy: {
    profileVisible: boolean;
    emailVisible: boolean;
    statusVisible: boolean;
  };
  accessibility: {
    highContrast: boolean;
    reducedMotion: boolean;
    screenReader: boolean;
  };
}

export interface TeacherProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  title: string;
  department: string;
  office: string;
  phone: string;
  specializations: string[];
  bio: string;
}

// Storage keys
const SETTINGS_KEY = "teacher_settings";
const PROFILE_KEY = "teacher_profile";

// Default settings
const defaultTeacherSettings: TeacherSettings = {
  theme: "dark",
  density: "comfortable",
  language: "fr",
  fontSize: "medium",
  notifications: {
    email: true,
    push: true,
    assignments: true,
    grades: true,
    messages: true,
  },
  privacy: {
    profileVisible: true,
    emailVisible: false,
    statusVisible: true,
  },
  accessibility: {
    highContrast: false,
    reducedMotion: false,
    screenReader: false,
  },
};

// Default profile
const defaultTeacherProfile: TeacherProfile = {
  name: "Dr. Marie Dupont",
  email: "marie.dupont@univ-schola.fr",
  title: "Professeure de Mathématiques",
  department: "Département de Mathématiques",
  office: "Bureau 205, Bâtiment Sciences",
  phone: "+33 1 23 45 67 89",
  specializations: ["Analyse Mathématique", "Topologie", "Statistiques"],
  bio: "Professeure de mathématiques avec 15 ans d'expérience dans l'enseignement supérieur. Spécialisée en analyse mathématique et topologie, j'encadre également des projets de recherche en statistiques appliquées.",
};

// API simulation functions
export async function getTeacherSettings(): Promise<TeacherSettings> {
  await simulateLoading();

  const savedSettings = localStorage.getItem(SETTINGS_KEY);
  if (savedSettings) {
    try {
      return { ...defaultTeacherSettings, ...JSON.parse(savedSettings) };
    } catch {
      return defaultTeacherSettings;
    }
  }

  return defaultTeacherSettings;
}

export async function saveTeacherSettings(
  settings: TeacherSettings
): Promise<void> {
  await simulateLoading(500);
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export async function getTeacherProfile(): Promise<TeacherProfile> {
  await simulateLoading();

  const savedProfile = localStorage.getItem(PROFILE_KEY);
  if (savedProfile) {
    try {
      return { ...defaultTeacherProfile, ...JSON.parse(savedProfile) };
    } catch {
      return defaultTeacherProfile;
    }
  }

  return defaultTeacherProfile;
}

export async function updateTeacherProfile(
  updates: Partial<TeacherProfile>
): Promise<TeacherProfile> {
  await simulateLoading(800);

  const currentProfile = await getTeacherProfile();
  const updatedProfile = { ...currentProfile, ...updates };

  localStorage.setItem(PROFILE_KEY, JSON.stringify(updatedProfile));
  return updatedProfile;
}

export async function resetTeacherSettings(): Promise<TeacherSettings> {
  await simulateLoading(300);
  localStorage.removeItem(SETTINGS_KEY);
  return defaultTeacherSettings;
}

// Helper functions
export const getThemeLabel = (theme: string): string => {
  const labels: Record<string, string> = {
    dark: "Sombre",
    light: "Clair",
    auto: "Automatique",
  };
  return labels[theme] || theme;
};

export const getDensityLabel = (density: string): string => {
  const labels: Record<string, string> = {
    compact: "Compact",
    comfortable: "Confortable",
    spacious: "Spacieux",
  };
  return labels[density] || density;
};

export const getLanguageLabel = (language: string): string => {
  const labels: Record<string, string> = {
    fr: "Français",
    en: "English",
    es: "Español",
  };
  return labels[language] || language;
};

export const getFontSizeLabel = (fontSize: string): string => {
  const labels: Record<string, string> = {
    small: "Petite",
    medium: "Moyenne",
    large: "Grande",
  };
  return labels[fontSize] || fontSize;
};
