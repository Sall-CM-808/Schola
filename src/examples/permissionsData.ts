export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // En clair pour les tests, à hasher en prod
  status: "active" | "inactive" | "suspended";
  createdAt: string;
}

export interface UserPermission {
  userId: string;
  unitId: string;
  permissions: string[];
}

/**
 * Liste complète des permissions disponibles dans le système
 */
export const permissionsList: Permission[] = [
  // Permissions sur les unités
  { id: "unite.view_self", name: "Voir l'unité", description: "Voir le dashboard et les informations de l'unité", category: "Unité" },
  { id: "unite.view_children", name: "Voir les sous-unités", description: "Voir les unités enfants directes", category: "Unité" },
  { id: "unite.create", name: "Créer une unité", description: "Créer de nouvelles sous-unités", category: "Unité" },
  { id: "unite.change", name: "Modifier l'unité", description: "Modifier les informations de l'unité", category: "Unité" },
  { id: "unite.delete", name: "Supprimer l'unité", description: "Supprimer l'unité et ses données", category: "Unité" },

  // Permissions sur les rôles
  { id: "role.view_all", name: "Voir tous les rôles", description: "Voir tous les rôles de l'unité", category: "Rôles" },
  { id: "role.view_own", name: "Voir ses rôles", description: "Voir seulement les rôles créés par soi", category: "Rôles" },
  { id: "role.create", name: "Créer un rôle", description: "Créer de nouveaux rôles dans l'unité", category: "Rôles" },
  { id: "role.change", name: "Modifier les rôles", description: "Modifier les rôles existants", category: "Rôles" },
  { id: "role.delete", name: "Supprimer les rôles", description: "Supprimer des rôles", category: "Rôles" },

  // Permissions sur les attributions
  { id: "attribution.view_all", name: "Voir toutes les attributions", description: "Voir toutes les attributions de rôles", category: "Attributions" },
  { id: "attribution.view_own", name: "Voir ses attributions", description: "Voir seulement ses propres attributions", category: "Attributions" },
  { id: "attribution.create", name: "Créer une attribution", description: "Attribuer des rôles aux utilisateurs", category: "Attributions" },
  { id: "attribution.change", name: "Modifier les attributions", description: "Modifier les attributions existantes", category: "Attributions" },
  { id: "attribution.delete", name: "Supprimer les attributions", description: "Retirer des attributions de rôles", category: "Attributions" },

  // Permissions sur les membres
  { id: "members.view_all", name: "Voir tous les membres", description: "Voir tous les membres de l'unité", category: "Membres" },
  { id: "members.view_students", name: "Voir les étudiants", description: "Voir seulement les étudiants/élèves", category: "Membres" },
  { id: "members.create", name: "Ajouter des membres", description: "Ajouter de nouveaux membres à l'unité", category: "Membres" },
  { id: "members.change", name: "Modifier les membres", description: "Modifier les informations des membres", category: "Membres" },
  { id: "members.delete", name: "Supprimer des membres", description: "Retirer des membres de l'unité", category: "Membres" },

  // Permissions sur les cours
  { id: "courses.view_all", name: "Voir tous les cours", description: "Voir tous les cours de l'unité", category: "Cours" },
  { id: "courses.view_own", name: "Voir ses cours", description: "Voir seulement les cours qu'on enseigne", category: "Cours" },
  { id: "courses.create", name: "Créer un cours", description: "Créer de nouveaux cours", category: "Cours" },
  { id: "courses.change", name: "Modifier les cours", description: "Modifier les cours existants", category: "Cours" },
  { id: "courses.delete", name: "Supprimer les cours", description: "Supprimer des cours", category: "Cours" },

  // Permissions sur l'emploi du temps
  { id: "schedule.view", name: "Voir l'emploi du temps", description: "Consulter l'emploi du temps", category: "Emploi du temps" },
  { id: "schedule.create", name: "Créer des créneaux", description: "Ajouter des créneaux à l'emploi du temps", category: "Emploi du temps" },
  { id: "schedule.change", name: "Modifier l'emploi du temps", description: "Modifier les créneaux existants", category: "Emploi du temps" },
  { id: "schedule.delete", name: "Supprimer des créneaux", description: "Supprimer des créneaux", category: "Emploi du temps" },

  // Permissions sur les évaluations
  { id: "exams.view_all", name: "Voir toutes les évaluations", description: "Voir toutes les évaluations de l'unité", category: "Évaluations" },
  { id: "exams.view_own", name: "Voir ses évaluations", description: "Voir seulement ses propres évaluations", category: "Évaluations" },
  { id: "exams.create", name: "Créer une évaluation", description: "Créer de nouvelles évaluations", category: "Évaluations" },
  { id: "exams.change", name: "Modifier les évaluations", description: "Modifier les évaluations existantes", category: "Évaluations" },
  { id: "exams.grade", name: "Noter les évaluations", description: "Saisir et modifier les notes", category: "Évaluations" },
  { id: "exams.view_results", name: "Voir les résultats", description: "Consulter les résultats des évaluations", category: "Évaluations" },

  // Permissions sur les présences
  { id: "attendance.view", name: "Voir les présences", description: "Consulter les registres de présence", category: "Présences" },
  { id: "attendance.create", name: "Faire l'appel", description: "Enregistrer les présences", category: "Présences" },
  { id: "attendance.change", name: "Modifier les présences", description: "Corriger les présences enregistrées", category: "Présences" },
  { id: "attendance.reports", name: "Rapports de présence", description: "Générer des rapports d'assiduité", category: "Présences" },

  // Permissions sur les ressources
  { id: "resources.view", name: "Voir les ressources", description: "Consulter les ressources partagées", category: "Ressources" },
  { id: "resources.download", name: "Télécharger les ressources", description: "Télécharger les fichiers", category: "Ressources" },
  { id: "resources.upload", name: "Ajouter des ressources", description: "Uploader de nouvelles ressources", category: "Ressources" },
  { id: "resources.change", name: "Modifier les ressources", description: "Modifier les ressources existantes", category: "Ressources" },
  { id: "resources.delete", name: "Supprimer les ressources", description: "Supprimer des ressources", category: "Ressources" }
];

/**
 * Utilisateurs de test
 */
export const usersData: User[] = [
  {
    id: "user-admin",
    name: "Administrateur Système",
    email: "admin@schola.sn",
    password: "admin123",
    status: "active",
    createdAt: "2023-01-01"
  },
  {
    id: "user-recteur",
    name: "Dr. Amadou Diallo",
    email: "recteur@ucad.sn",
    password: "recteur123",
    status: "active",
    createdAt: "2023-01-15"
  },
  {
    id: "user-doyen",
    name: "Prof. Fatou Sow",
    email: "doyen@fst.ucad.sn",
    password: "doyen123",
    status: "active",
    createdAt: "2023-02-01"
  },
  {
    id: "user-chef-dep",
    name: "Dr. Ousmane Ndiaye",
    email: "chef.info@fst.ucad.sn",
    password: "chef123",
    status: "active",
    createdAt: "2023-03-01"
  },
  {
    id: "user-prof-java",
    name: "Prof. Moussa Kane",
    email: "moussa.kane@fst.ucad.sn",
    password: "prof123",
    status: "active",
    createdAt: "2023-09-01"
  },
  {
    id: "user-directeur-ecole",
    name: "Mme Aïssatou Ba",
    email: "directeur@ecole-senghor.sn",
    password: "directeur123",
    status: "active",
    createdAt: "2023-09-01"
  },
  {
    id: "user-instituteur",
    name: "M. Ibrahima Sarr",
    email: "ibrahima.sarr@ecole-senghor.sn",
    password: "instituteur123",
    status: "active",
    createdAt: "2023-09-01"
  },
  {
    id: "user-etudiant",
    name: "Amadou Diop",
    email: "amadou.diop@etudiant.ucad.sn",
    password: "etudiant123",
    status: "active",
    createdAt: "2023-09-15"
  },
  {
    id: "user-parent",
    name: "Mme Fatou Diallo",
    email: "fatou.diallo@parent.sn",
    password: "parent123",
    status: "active",
    createdAt: "2023-09-15"
  },
  // Utilisateurs supplémentaires pour tests
  {
    id: "user-surveillant",
    name: "M. Pape Surv",
    email: "pape.surv@ecole-senghor.sn",
    password: "surv123",
    status: "active",
    createdAt: "2023-10-01"
  },
  {
    id: "user-assistant",
    name: "Mme Ndeye Assist",
    email: "ndeye.assist@ecole-senghor.sn",
    password: "assist123",
    status: "active",
    createdAt: "2023-10-02"
  },
  {
    id: "user-coordo-dep",
    name: "Coordo Département",
    email: "coordo@dep.ucad.sn",
    password: "coordo123",
    status: "active",
    createdAt: "2023-10-10"
  },
  {
    id: "user-invite",
    name: "Utilisateur Invité",
    email: "invite@schola.sn",
    password: "invite123",
    status: "active",
    createdAt: "2023-11-01"
  }
];

/**
 * Permissions par utilisateur et par unité
 */
export const userPermissionsData: UserPermission[] = [
  // Administrateur système - accès complet partout
  {
    userId: "user-admin",
    unitId: "univ-1",
    permissions: [
      "unite.view_self", "unite.view_children", "unite.create", "unite.change", "unite.delete",
      "role.view_all", "role.create", "role.change", "role.delete",
      "attribution.view_all", "attribution.create", "attribution.change", "attribution.delete"
    ]
  },
  {
    userId: "user-admin",
    unitId: "ecole-1",
    permissions: [
      "unite.view_self", "unite.view_children", "unite.create", "unite.change", "unite.delete",
      "role.view_all", "role.create", "role.change", "role.delete",
      "attribution.view_all", "attribution.create", "attribution.change", "attribution.delete"
    ]
  },

  // Recteur - gestion de l'université
  {
    userId: "user-recteur",
    unitId: "univ-1",
    permissions: [
      "unite.view_self", "unite.view_children", "unite.create", "unite.change",
      "role.view_all", "role.create", "role.change",
      "attribution.view_all", "attribution.create", "attribution.change"
    ]
  },

  // Doyen - gestion de la faculté
  {
    userId: "user-doyen",
    unitId: "univ-1-fac-1",
    permissions: [
      "unite.view_self", "unite.view_children", "unite.create", "unite.change",
      "role.view_all", "role.create", "role.change",
      "attribution.view_all", "attribution.create", "attribution.change"
    ]
  },

  // Chef de département - gestion du département
  {
    userId: "user-chef-dep",
    unitId: "univ-1-fac-1-dep-1",
    permissions: [
      "unite.view_self", "unite.view_children", "unite.create", "unite.change",
      "role.view_all", "role.create", "role.change",
      "attribution.view_all", "attribution.create", "attribution.change"
    ]
  },

  // Professeur - accès à sa licence et ses cours
  {
    userId: "user-prof-java",
    unitId: "univ-1-fac-1-dep-1-lic-1",
    permissions: [
      "unite.view_self",
      "members.view_students", "members.change",
      "courses.view_own", "courses.create", "courses.change",
      "schedule.view", "schedule.create", "schedule.change",
      "exams.view_own", "exams.create", "exams.change", "exams.grade", "exams.view_results",
      "attendance.view", "attendance.create", "attendance.change", "attendance.reports",
      "resources.view", "resources.download", "resources.upload", "resources.change"
    ]
  },

  // Directeur d'école - gestion complète de l'école
  {
    userId: "user-directeur-ecole",
    unitId: "ecole-1",
    permissions: [
      "unite.view_self", "unite.view_children", "unite.create", "unite.change",
      "role.view_all", "role.create", "role.change",
      "attribution.view_all", "attribution.create", "attribution.change",
      "members.view_all", "members.create", "members.change"
    ]
  },

  // Instituteur - accès à sa classe
  {
    userId: "user-instituteur",
    unitId: "ecole-1-cycle-1-niv-1-classe-1",
    permissions: [
      "unite.view_self",
      "members.view_students", "members.change",
      "courses.view_all", "courses.create", "courses.change",
      "schedule.view", "schedule.create", "schedule.change",
      "exams.view_all", "exams.create", "exams.change", "exams.grade", "exams.view_results",
      "attendance.view", "attendance.create", "attendance.change", "attendance.reports",
      "resources.view", "resources.download", "resources.upload", "resources.change"
    ]
  },

  // Étudiant - accès limité en lecture
  {
    userId: "user-etudiant",
    unitId: "univ-1-fac-1-dep-1-lic-1",
    permissions: [
      "unite.view_self",
      "courses.view_all",
      "schedule.view",
      "exams.view_results",
      "resources.view", "resources.download"
    ]
  },

  // Parent - accès limité à la classe de son enfant
  {
    userId: "user-parent",
    unitId: "ecole-1-cycle-1-niv-1-classe-1",
    permissions: [
      "unite.view_self",
      "schedule.view",
      "attendance.view",
      "resources.view", "resources.download"
    ]
  },
  // Surveillant: accès présences et planning sur l'école
  {
    userId: "user-surveillant",
    unitId: "ecole-1",
    permissions: [
      "unite.view_self", "unite.view_children",
      "attendance.view", "attendance.reports",
      "schedule.view"
    ]
  },
  // Assistant pédagogique: lecture membres et ressources sur la classe
  {
    userId: "user-assistant",
    unitId: "ecole-1-cycle-1-niv-1-classe-1",
    permissions: [
      "unite.view_self",
      "members.view_students",
      "resources.view", "resources.download"
    ]
  },
  // Coordinateur de département: peut voir enfants et rôles en lecture
  {
    userId: "user-coordo-dep",
    unitId: "univ-1-fac-1-dep-1",
    permissions: [
      "unite.view_self", "unite.view_children",
      "role.view_all",
      "attribution.view_all"
    ]
  },
  // Invité: aucun droit -> ne doit rien voir et être redirigé
  {
    userId: "user-invite",
    unitId: "univ-1",
    permissions: [
    ]
  }
];
