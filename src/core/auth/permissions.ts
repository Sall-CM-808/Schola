export type Permission = string;

export interface UserSession {
  user: {
    id: string;
    name: string;
    email: string;
  };
  permissions: Array<{
    unitId: string;
    perms: Permission[];
  }>;
}

export type UserPermissions = Record<string /* unitId */, Set<Permission>>;

/**
 * Construit un index des permissions par unitId à partir de la session
 */
export function buildUserPermissions(session: UserSession | null): UserPermissions {
  const map: UserPermissions = {};
  
  if (!session?.permissions) {
    return map;
  }

  for (const entry of session.permissions) {
    map[entry.unitId] = new Set(entry.perms || []);
  }
  
  return map;
}

/**
 * Vérifie si l'utilisateur a une permission spécifique sur une unité
 */
export function hasPerm(perms: UserPermissions, unitId: string, perm: Permission): boolean {
  return perms[unitId]?.has(perm) ?? false;
}

/**
 * Vérifie si l'utilisateur a au moins une des permissions requises sur une unité
 */
export function hasAny(perms: UserPermissions, unitId: string, required: Permission[]): boolean {
  const set = perms[unitId];
  if (!set) return false;
  return required.some(p => set.has(p));
}

/**
 * Vérifie si l'utilisateur a toutes les permissions requises sur une unité
 */
export function hasAll(perms: UserPermissions, unitId: string, required: Permission[]): boolean {
  const set = perms[unitId];
  if (!set) return false;
  return required.every(p => set.has(p));
}

/**
 * Retourne toutes les permissions de l'utilisateur sur une unité
 */
export function getUnitPerms(perms: UserPermissions, unitId: string): Permission[] {
  return Array.from(perms[unitId] || []);
}

/**
 * Vérifie si l'utilisateur peut voir l'unité elle-même
 */
export function canViewUnitSelf(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "unite.view_self");
}

/**
 * Vérifie si l'utilisateur peut voir les unités enfants
 */
export function canViewChildren(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "unite.view_children");
}

/**
 * Vérifie si l'utilisateur peut créer des sous-unités
 */
export function canCreateUnit(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "unite.create");
}

/**
 * Vérifie si l'utilisateur peut modifier l'unité
 */
export function canChangeUnit(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "unite.change");
}

/**
 * Vérifie les permissions sur les rôles
 */
export function canViewAllRoles(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "role.view_all");
}

export function canViewOwnRoles(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "role.view_own");
}

export function canCreateRole(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "role.create");
}

export function canChangeRole(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "role.change");
}

export function canDeleteRole(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "role.delete");
}

/**
 * Vérifie les permissions sur les attributions
 */
export function canViewAllAttributions(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "attribution.view_all");
}

export function canViewOwnAttributions(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "attribution.view_own");
}

export function canCreateAttribution(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "attribution.create");
}

export function canChangeAttribution(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "attribution.change");
}

/**
 * Vérifie les permissions sur les membres
 */
export function canViewAllMembers(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "members.view_all");
}

export function canViewStudents(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "members.view_students");
}

export function canCreateMember(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "members.create");
}

export function canChangeMember(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "members.change");
}

/**
 * Vérifie les permissions sur les cours
 */
export function canViewAllCourses(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "courses.view_all");
}

export function canViewOwnCourses(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "courses.view_own");
}

export function canCreateCourse(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "courses.create");
}

export function canChangeCourse(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "courses.change");
}

/**
 * Vérifie les permissions sur l'emploi du temps
 */
export function canViewSchedule(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "schedule.view");
}

export function canCreateSchedule(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "schedule.create");
}

export function canChangeSchedule(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "schedule.change");
}

/**
 * Vérifie les permissions sur les évaluations
 */
export function canViewAllExams(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "exams.view_all");
}

export function canViewOwnExams(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "exams.view_own");
}

export function canCreateExam(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "exams.create");
}

export function canChangeExam(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "exams.change");
}

export function canGradeExam(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "exams.grade");
}

export function canViewExamResults(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "exams.view_results");
}

/**
 * Vérifie les permissions sur les présences
 */
export function canViewAttendance(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "attendance.view");
}

export function canCreateAttendance(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "attendance.create");
}

export function canChangeAttendance(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "attendance.change");
}

/**
 * Vérifie les permissions sur les ressources
 */
export function canViewResources(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "resources.view");
}

export function canDownloadResources(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "resources.download");
}

export function canUploadResources(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "resources.upload");
}

export function canChangeResources(perms: UserPermissions, unitId: string): boolean {
  return hasPerm(perms, unitId, "resources.change");
}

/**
 * Filtre une liste d'unités selon les permissions de l'utilisateur
 */
export function filterVisibleUnits(units: any[], perms: UserPermissions): any[] {
  const deepFilter = (arr: any[]): any[] => {
    return (arr || [])
      .filter((unit) => canViewUnitSelf(perms, unit.id))
      .map((unit) => {
        const canSeeChildren = canViewChildren(perms, unit.id);
        const children = canSeeChildren && unit.children && unit.children.length
          ? deepFilter(unit.children)
          : [];
        return { ...unit, children };
      });
  };
  return deepFilter(units);
}

/**
 * Détermine quels onglets afficher selon les permissions
 */
export function getVisibleTabs(unitId: string, perms: UserPermissions, isLeafUnit: boolean) {
  const tabs = [];

  // Dashboard toujours visible si on peut voir l'unité
  if (canViewUnitSelf(perms, unitId)) {
    tabs.push("dashboard");
  }

  if (isLeafUnit) {
    // Onglets pour unités feuilles
    if (canViewAllMembers(perms, unitId) || canViewStudents(perms, unitId)) {
      tabs.push("members");
    }
    if (canViewAllCourses(perms, unitId) || canViewOwnCourses(perms, unitId)) {
      tabs.push("courses");
    }
    if (canViewSchedule(perms, unitId)) {
      tabs.push("schedule");
    }
    if (canViewAllExams(perms, unitId) || canViewOwnExams(perms, unitId)) {
      tabs.push("exams");
    }
    if (canViewAttendance(perms, unitId)) {
      tabs.push("attendance");
    }
    if (canViewResources(perms, unitId)) {
      tabs.push("resources");
    }
  } else {
    // Onglets pour unités parent
    if (canViewChildren(perms, unitId)) {
      tabs.push("children");
    }
    if (canViewAllRoles(perms, unitId) || canViewOwnRoles(perms, unitId)) {
      tabs.push("roles");
    }
    if (canViewAllAttributions(perms, unitId) || canViewOwnAttributions(perms, unitId)) {
      tabs.push("attributions");
    }
  }

  return tabs;
}
