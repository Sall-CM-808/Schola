// Types pour le dashboard parent
export interface ParentChild {
  id: string;
  name: string;
  className: string;
  mainTeacher: string;
  average: number;
  absences30d: number;
  pendingHomework: number;
  profileImage?: string;
  nextClass?: {
    subject: string;
    time: string;
    room: string;
  };
}

export interface ParentHomework {
  id: string;
  childId: string;
  subject: string;
  title: string;
  dueDate: string;
  status: "a_faire" | "en_retard" | "rendu" | "note";
  priority: "high" | "medium" | "low";
  grade?: number;
  max?: number;
  description?: string;
}

export interface ParentMessage {
  id: string;
  childId?: string;
  subject: string;
  from: string;
  fromRole: "teacher" | "admin" | "staff";
  category: "info" | "devoir" | "discipline" | "administratif" | "urgence";
  date: string;
  read: boolean;
  urgent?: boolean;
  preview?: string;
}

export interface ParentInvoice {
  id: string;
  period: string;
  amount: number;
  status: "due" | "paid" | "overdue" | "pending";
  dueDate: string;
  description: string;
  childrenIds: string[];
}

export interface ParentKPI {
  totalChildren: number;
  pendingHomework: number;
  unreadMessages: number;
  pendingPayments: number;
  averageGrade: number;
  totalAbsences: number;
}

export interface ParentEvent {
  id: string;
  title: string;
  date: string;
  type: "meeting" | "exam" | "event" | "vacation";
  childId?: string;
  location?: string;
  description?: string;
}

// Données mock
export const children: ParentChild[] = [
  {
    id: "child_001",
    name: "Marie Camara",
    className: "Terminale S",
    mainTeacher: "M. Diallo",
    average: 15.2,
    absences30d: 2,
    pendingHomework: 3,
    nextClass: {
      subject: "Mathématiques",
      time: "14h30",
      room: "Salle 204",
    },
  },
  {
    id: "child_002",
    name: "Ahmed Camara",
    className: "Première L",
    mainTeacher: "Mme Bah",
    average: 13.8,
    absences30d: 5,
    pendingHomework: 2,
    nextClass: {
      subject: "Histoire",
      time: "10h00",
      room: "Salle 105",
    },
  },
  {
    id: "child_003",
    name: "Fatou Camara",
    className: "Seconde",
    mainTeacher: "M. Konaté",
    average: 16.5,
    absences30d: 0,
    pendingHomework: 2,
    nextClass: {
      subject: "SVT",
      time: "15h00",
      room: "Lab 2",
    },
  },
  {
    id: "child_004",
    name: "Mamadou Camara",
    className: "CM2",
    mainTeacher: "Mme Traoré",
    average: 14.1,
    absences30d: 1,
    pendingHomework: 1,
    nextClass: {
      subject: "Français",
      time: "09h00",
      room: "Salle 12",
    },
  },
];

export const homeworks: ParentHomework[] = [
  {
    id: "hw_001",
    childId: "child_001",
    subject: "Mathématiques",
    title: "Exercices sur les dérivées",
    dueDate: "2024-01-20",
    status: "a_faire",
    priority: "high",
    description: "Chapitre 5, exercices 1 à 15",
  },
  {
    id: "hw_002",
    childId: "child_001",
    subject: "Physique",
    title: "TP Optique géométrique",
    dueDate: "2024-01-18",
    status: "en_retard",
    priority: "high",
    description: "Rapport de TP à rendre",
  },
  {
    id: "hw_003",
    childId: "child_001",
    subject: "Français",
    title: "Dissertation sur Molière",
    dueDate: "2024-01-25",
    status: "rendu",
    priority: "medium",
    grade: 16,
    max: 20,
  },
  {
    id: "hw_004",
    childId: "child_002",
    subject: "Histoire",
    title: "Exposé sur la Renaissance",
    dueDate: "2024-01-22",
    status: "a_faire",
    priority: "medium",
    description: "Présentation 10 minutes",
  },
  {
    id: "hw_005",
    childId: "child_002",
    subject: "Anglais",
    title: "Essay: My Future Plans",
    dueDate: "2024-01-15",
    status: "note",
    priority: "low",
    grade: 14,
    max: 20,
  },
  {
    id: "hw_006",
    childId: "child_003",
    subject: "SVT",
    title: "Recherche sur l'écosystème",
    dueDate: "2024-01-19",
    status: "a_faire",
    priority: "medium",
    description: "Dossier 5 pages minimum",
  },
  {
    id: "hw_007",
    childId: "child_003",
    subject: "Mathématiques",
    title: "Problèmes de géométrie",
    dueDate: "2024-01-21",
    status: "a_faire",
    priority: "high",
  },
  {
    id: "hw_008",
    childId: "child_004",
    subject: "Français",
    title: "Rédaction sur les vacances",
    dueDate: "2024-01-23",
    status: "a_faire",
    priority: "low",
    description: "Une page minimum",
  },
];

export const messages: ParentMessage[] = [
  {
    id: "msg_001",
    childId: "child_001",
    subject: "Absence justifiée - Marie",
    from: "M. Diallo",
    fromRole: "teacher",
    category: "administratif",
    date: "2024-01-15T10:30:00Z",
    read: false,
    preview: "Votre fille était absente aujourd'hui...",
  },
  {
    id: "msg_002",
    childId: "child_001",
    subject: "Excellent travail en mathématiques",
    from: "Mme Keita",
    fromRole: "teacher",
    category: "info",
    date: "2024-01-14T14:20:00Z",
    read: true,
    preview: "Marie a obtenu une excellente note...",
  },
  {
    id: "msg_003",
    childId: "child_002",
    subject: "Devoir non rendu - Ahmed",
    from: "M. Johnson",
    fromRole: "teacher",
    category: "devoir",
    date: "2024-01-13T16:45:00Z",
    read: false,
    urgent: true,
    preview: "Ahmed n'a pas rendu son devoir d'anglais...",
  },
  {
    id: "msg_004",
    subject: "Réunion parents-professeurs",
    from: "Direction",
    fromRole: "admin",
    category: "administratif",
    date: "2024-01-12T09:00:00Z",
    read: true,
    preview: "La réunion aura lieu le 25 janvier...",
  },
  {
    id: "msg_005",
    childId: "child_003",
    subject: "Comportement exemplaire - Fatou",
    from: "M. Konaté",
    fromRole: "teacher",
    category: "discipline",
    date: "2024-01-11T11:15:00Z",
    read: true,
    preview: "Fatou a montré un excellent comportement...",
  },
  {
    id: "msg_006",
    subject: "Nouvelle procédure cantine",
    from: "Administration",
    fromRole: "admin",
    category: "administratif",
    date: "2024-01-08T12:00:00Z",
    read: false,
    preview: "À partir du 15 janvier, nouvelle procédure...",
  },
];

export const invoices: ParentInvoice[] = [
  {
    id: "inv_001",
    period: "Janvier 2024",
    amount: 1800000,
    status: "overdue",
    dueDate: "2024-01-10",
    description: "Frais de scolarité - 4 enfants",
    childrenIds: ["child_001", "child_002", "child_003", "child_004"],
  },
  {
    id: "inv_002",
    period: "Février 2024",
    amount: 1800000,
    status: "due",
    dueDate: "2024-02-10",
    description: "Frais de scolarité - 4 enfants",
    childrenIds: ["child_001", "child_002", "child_003", "child_004"],
  },
  {
    id: "inv_003",
    period: "Décembre 2023",
    amount: 1800000,
    status: "paid",
    dueDate: "2023-12-10",
    description: "Frais de scolarité - 4 enfants",
    childrenIds: ["child_001", "child_002", "child_003", "child_004"],
  },
];

export const events: ParentEvent[] = [
  {
    id: "event_001",
    title: "Réunion parents-professeurs",
    date: "2024-01-25",
    type: "meeting",
    location: "Salle polyvalente",
    description: "Rencontre avec tous les enseignants",
  },
  {
    id: "event_002",
    title: "Contrôle de Mathématiques - Marie",
    date: "2024-01-22",
    type: "exam",
    childId: "child_001",
    location: "Salle 204",
  },
  {
    id: "event_003",
    title: "Sortie pédagogique SVT - Fatou",
    date: "2024-01-28",
    type: "event",
    childId: "child_003",
    location: "Jardin Botanique",
  },
  {
    id: "event_004",
    title: "Vacances scolaires",
    date: "2024-02-15",
    type: "vacation",
    description: "Début des vacances de février",
  },
];

// KPI calculés
export const getParentKPI = (): ParentKPI => {
  const pendingHomework = homeworks.filter(
    (hw) => hw.status === "a_faire" || hw.status === "en_retard"
  ).length;

  const unreadMessages = messages.filter((msg) => !msg.read).length;

  const pendingPayments = invoices.filter(
    (inv) => inv.status === "due" || inv.status === "overdue"
  ).length;

  const averageGrade =
    children.reduce((sum, child) => sum + child.average, 0) / children.length;

  const totalAbsences = children.reduce(
    (sum, child) => sum + child.absences30d,
    0
  );

  return {
    totalChildren: children.length,
    pendingHomework,
    unreadMessages,
    pendingPayments,
    averageGrade: Math.round(averageGrade * 10) / 10,
    totalAbsences,
  };
};

// Fonction pour simuler un délai de chargement
export const simulateLoading = (delay: number = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
