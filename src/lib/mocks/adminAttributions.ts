// Types pour les attributions
export interface Attribution {
  id: string;
  userName: string;
  userId: string;
  userEmail: string;
  userType: "admin" | "teacher" | "student" | "staff";
  roleName: string;
  roleId: string;
  scopeType: "Element" | "Unit" | "Global";
  scopeName: string;
  scopeId: string;
  startDate: string;
  endDate?: string;
  status: "active" | "pending" | "expired" | "cancelled";
  requestedBy: string;
  requestedAt: string;
  validatedBy?: string;
  validatedAt?: string;
  reason?: string;
}

export interface AttributionAction {
  id: string;
  type: "validate" | "cancel" | "extend" | "modify";
  label: string;
  description: string;
  requiresConfirmation: boolean;
}

// Configuration des statuts d'attribution
export const attributionStatuses = {
  active: {
    label: "Active",
    color: "bg-green-500/20 text-green-300 border-green-500/30",
  },
  pending: {
    label: "En attente",
    color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  },
  expired: {
    label: "Expirée",
    color: "bg-red-500/20 text-red-300 border-red-500/30",
  },
  cancelled: {
    label: "Annulée",
    color: "bg-gray-500/20 text-gray-300 border-gray-500/30",
  },
};

export const scopeTypes = {
  Element: {
    label: "Élément",
    color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    icon: "📄",
  },
  Unit: {
    label: "Unité",
    color: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    icon: "🏢",
  },
  Global: {
    label: "Global",
    color: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    icon: "🌍",
  },
};

// Générateur de données d'attributions
const generateAttributions = (count: number): Attribution[] => {
  const users = [
    {
      name: "Marie Dubois",
      id: "user-1",
      email: "marie.dubois@schola.edu",
      type: "teacher" as const,
    },
    {
      name: "Jean Martin",
      id: "user-2",
      email: "jean.martin@schola.edu",
      type: "teacher" as const,
    },
    {
      name: "Sophie Laurent",
      id: "user-3",
      email: "sophie.laurent@schola.edu",
      type: "admin" as const,
    },
    {
      name: "Pierre Durand",
      id: "user-4",
      email: "pierre.durand@schola.edu",
      type: "teacher" as const,
    },
    {
      name: "Emma Moreau",
      id: "user-5",
      email: "emma.moreau@schola.edu",
      type: "staff" as const,
    },
    {
      name: "Lucas Bernard",
      id: "user-6",
      email: "lucas.bernard@schola.edu",
      type: "teacher" as const,
    },
    {
      name: "Camille Petit",
      id: "user-7",
      email: "camille.petit@schola.edu",
      type: "student" as const,
    },
    {
      name: "Thomas Roux",
      id: "user-8",
      email: "thomas.roux@schola.edu",
      type: "student" as const,
    },
    {
      name: "Julie Vincent",
      id: "user-9",
      email: "julie.vincent@schola.edu",
      type: "teacher" as const,
    },
    {
      name: "Antoine Fournier",
      id: "user-10",
      email: "antoine.fournier@schola.edu",
      type: "staff" as const,
    },
  ];

  const roles = [
    { name: "Enseignant", id: "role-teacher" },
    { name: "Coordinateur Pédagogique", id: "role-coordinator" },
    { name: "Administrateur", id: "role-admin" },
    { name: "Tuteur", id: "role-tutor" },
    { name: "Responsable IT", id: "role-it" },
    { name: "Bibliothécaire", id: "role-librarian" },
    { name: "Étudiant", id: "role-student" },
  ];

  const scopes = [
    // Éléments
    {
      type: "Element" as const,
      name: "Cours de Mathématiques",
      id: "element-1",
    },
    { type: "Element" as const, name: "Projet IA", id: "element-2" },
    { type: "Element" as const, name: "Examen Physique", id: "element-3" },
    { type: "Element" as const, name: "TP Chimie", id: "element-4" },
    // Unités
    {
      type: "Unit" as const,
      name: "Département Mathématiques",
      id: "unit-math",
    },
    { type: "Unit" as const, name: "Département Informatique", id: "unit-cs" },
    {
      type: "Unit" as const,
      name: "Faculté des Sciences",
      id: "unit-sciences",
    },
    {
      type: "Unit" as const,
      name: "Services Administratifs",
      id: "unit-admin",
    },
    // Global
    {
      type: "Global" as const,
      name: "Plateforme Fiinor",
      id: "global-platform",
    },
    {
      type: "Global" as const,
      name: "Système de Gestion",
      id: "global-system",
    },
  ];

  const requesters = [
    "Dr. Directeur Pédagogique",
    "Admin System",
    "Prof. Responsable",
    "Service RH",
  ];

  const statuses = Object.keys(attributionStatuses) as Attribution["status"][];

  const attributions: Attribution[] = [];

  for (let i = 1; i <= count; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];
    const scope = scopes[Math.floor(Math.random() * scopes.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const requester = requesters[Math.floor(Math.random() * requesters.length)];

    const requestedAt = new Date(
      Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000
    ).toISOString();

    const startDate = new Date(
      new Date(requestedAt).getTime() + Math.random() * 14 * 24 * 60 * 60 * 1000
    ).toISOString();

    let endDate: string | undefined;
    let validatedBy: string | undefined;
    let validatedAt: string | undefined;

    // Définir les dates de fin selon le type de scope et le rôle
    if (scope.type === "Element" || Math.random() > 0.3) {
      endDate = new Date(
        new Date(startDate).getTime() +
          (30 + Math.random() * 335) * 24 * 60 * 60 * 1000
      ).toISOString();
    }

    // Si l'attribution est active ou expirée, elle a été validée
    if (status === "active" || status === "expired") {
      validatedBy = "Admin System";
      validatedAt = new Date(
        new Date(requestedAt).getTime() +
          Math.random() * 7 * 24 * 60 * 60 * 1000
      ).toISOString();
    }

    attributions.push({
      id: `attribution-${i}`,
      userName: user.name,
      userId: user.id,
      userEmail: user.email,
      userType: user.type,
      roleName: role.name,
      roleId: role.id,
      scopeType: scope.type,
      scopeName: scope.name,
      scopeId: scope.id,
      startDate,
      endDate,
      status,
      requestedBy: requester,
      requestedAt,
      validatedBy,
      validatedAt,
      reason: `Attribution ${role.name} pour ${scope.name}`,
    });
  }

  return attributions.sort(
    (a, b) =>
      new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime()
  );
};

// Données mock des attributions
export const attributions: Attribution[] = generateAttributions(120);

// Actions disponibles pour les attributions
export const attributionActions: AttributionAction[] = [
  {
    id: "validate",
    type: "validate",
    label: "Valider",
    description: "Approuver cette attribution",
    requiresConfirmation: false,
  },
  {
    id: "cancel",
    type: "cancel",
    label: "Annuler",
    description: "Rejeter ou annuler cette attribution",
    requiresConfirmation: true,
  },
  {
    id: "extend",
    type: "extend",
    label: "Prolonger",
    description: "Étendre la période d'attribution",
    requiresConfirmation: false,
  },
  {
    id: "modify",
    type: "modify",
    label: "Modifier",
    description: "Modifier les détails de l'attribution",
    requiresConfirmation: false,
  },
];

// Fonction pour obtenir les actions disponibles selon le statut
export const getAvailableActions = (
  status: Attribution["status"]
): AttributionAction[] => {
  switch (status) {
    case "pending":
      return attributionActions.filter(
        (a) => a.type === "validate" || a.type === "cancel"
      );
    case "active":
      return attributionActions.filter(
        (a) => a.type === "extend" || a.type === "cancel" || a.type === "modify"
      );
    case "expired":
      return attributionActions.filter((a) => a.type === "extend");
    case "cancelled":
      return [];
    default:
      return [];
  }
};

// Statistiques des attributions
export const attributionsStats = {
  total: attributions.length,
  active: attributions.filter((a) => a.status === "active").length,
  pending: attributions.filter((a) => a.status === "pending").length,
  expired: attributions.filter((a) => a.status === "expired").length,
  cancelled: attributions.filter((a) => a.status === "cancelled").length,
  byScopeType: {
    Element: attributions.filter((a) => a.scopeType === "Element").length,
    Unit: attributions.filter((a) => a.scopeType === "Unit").length,
    Global: attributions.filter((a) => a.scopeType === "Global").length,
  },
  byUserType: {
    admin: attributions.filter((a) => a.userType === "admin").length,
    teacher: attributions.filter((a) => a.userType === "teacher").length,
    student: attributions.filter((a) => a.userType === "student").length,
    staff: attributions.filter((a) => a.userType === "staff").length,
  },
};

// Fonction pour simuler une action sur une attribution
export const performAttributionAction = async (
  attributionId: string,
  actionType: AttributionAction["type"]
): Promise<{ success: boolean; message: string }> => {
  // Simuler un délai de traitement
  await new Promise((resolve) => setTimeout(resolve, 800));

  const attribution = attributions.find((a) => a.id === attributionId);
  if (!attribution) {
    return { success: false, message: "Attribution introuvable" };
  }

  switch (actionType) {
    case "validate":
      if (attribution.status === "pending") {
        attribution.status = "active";
        attribution.validatedBy = "Admin System";
        attribution.validatedAt = new Date().toISOString();
        return { success: true, message: "Attribution validée avec succès" };
      }
      return {
        success: false,
        message: "Cette attribution ne peut pas être validée",
      };

    case "cancel":
      if (attribution.status !== "cancelled") {
        attribution.status = "cancelled";
        return { success: true, message: "Attribution annulée avec succès" };
      }
      return { success: false, message: "Cette attribution est déjà annulée" };

    case "extend":
      if (attribution.endDate) {
        const currentEndDate = new Date(attribution.endDate);
        const newEndDate = new Date(
          currentEndDate.getTime() + 90 * 24 * 60 * 60 * 1000
        );
        attribution.endDate = newEndDate.toISOString();
        if (attribution.status === "expired") {
          attribution.status = "active";
        }
        return { success: true, message: "Attribution prolongée de 3 mois" };
      }
      return {
        success: false,
        message: "Cette attribution n'a pas de date de fin",
      };

    case "modify":
      return {
        success: true,
        message: "Modification enregistrée (fonctionnalité à implémenter)",
      };

    default:
      return { success: false, message: "Action non reconnue" };
  }
};

// Fonction pour simuler un délai de chargement
export const simulateLoading = (delay: number = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
