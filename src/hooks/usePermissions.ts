import { useMemo } from "react";
import { 
  buildUserPermissions, 
  hasPerm, 
  hasAny, 
  hasAll,
  getUnitPerms,
  canViewUnitSelf,
  canViewChildren,
  canCreateUnit,
  canChangeUnit,
  canViewAllRoles,
  canViewOwnRoles,
  canCreateRole,
  canChangeRole,
  canDeleteRole,
  canViewAllAttributions,
  canViewOwnAttributions,
  canCreateAttribution,
  canChangeAttribution,
  canViewAllMembers,
  canViewStudents,
  canCreateMember,
  canChangeMember,
  canViewAllCourses,
  canViewOwnCourses,
  canCreateCourse,
  canChangeCourse,
  canViewSchedule,
  canCreateSchedule,
  canChangeSchedule,
  canViewAllExams,
  canViewOwnExams,
  canCreateExam,
  canChangeExam,
  canGradeExam,
  canViewExamResults,
  canViewAttendance,
  canCreateAttendance,
  canChangeAttendance,
  canViewResources,
  canDownloadResources,
  canUploadResources,
  canChangeResources,
  filterVisibleUnits,
  getVisibleTabs,
  UserSession,
  Permission
} from "@/core/auth/permissions";

// Mock session pour les tests - à remplacer par NextAuth ou votre système d'auth
import { usersData, userPermissionsData } from "@/examples/permissionsData";
import { rolesData, attributionsData } from "@/examples/rolesData";

// Flag global (local au fichier) pour désactiver temporairement TOUTES les permissions/roles
const DISABLE_PERMISSIONS = true;

function getMockUserId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem("mock_user_id");
  } catch {
    return null;
  }
}

function getMockUserPermissions(userId: string): { unitId: string; perms: string[] }[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem("mock_user_permissions");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Record<string, { unitId: string; perms: string[] }[]>;
    return parsed?.[userId] || null;
  } catch {
    return null;
  }
}

function setMockUserId(userId: string | null) {
  if (typeof window === "undefined") return;
  try {
    if (userId) {
      window.localStorage.setItem("mock_user_id", userId);
    } else {
      window.localStorage.removeItem("mock_user_id");
    }
  } catch {
    // ignore
  }
}

/**
 * Hook pour simuler une session utilisateur (à remplacer par NextAuth)
 */
function useMockSession() {
  // En production, ceci sera remplacé par useSession() de NextAuth
  const mockUserId = getMockUserId();

  if (!mockUserId) {
    return { data: null, status: "unauthenticated" as const };
  }

  const user = usersData.find(u => u.id === mockUserId);
  const overridePerms = getMockUserPermissions(mockUserId);
  
  let userPerms: { unitId: string; perms: string[] }[];
  
  if (overridePerms) {
    userPerms = overridePerms;
  } else {
    // Calculer les permissions depuis les rôles attribués (RBAC)
    userPerms = [];
    
    // Pour chaque unité, chercher les attributions de cet utilisateur
    Object.keys(attributionsData).forEach(unitId => {
      const unitAttributions = attributionsData[unitId] || [];
      const userAttributions = unitAttributions.filter(attr => attr.userId === mockUserId);
      
      if (userAttributions.length > 0) {
        // Collecter toutes les permissions des rôles attribués sur cette unité
        const unitPermissions = new Set<string>();
        
        userAttributions.forEach(attribution => {
          const unitRoles = rolesData[unitId] || [];
          const role = unitRoles.find(r => r.id === attribution.roleId);
          
          if (role && role.isActive) {
            role.permissions.forEach(perm => unitPermissions.add(perm));
          }
        });
        
        if (unitPermissions.size > 0) {
          userPerms.push({
            unitId,
            perms: Array.from(unitPermissions)
          });
        }
      }
    });
    
    // Fallback: si aucune attribution trouvée, utiliser userPermissionsData
    if (userPerms.length === 0) {
      userPerms = userPermissionsData
        .filter(up => up.userId === mockUserId)
        .map(up => ({ unitId: up.unitId, perms: up.permissions }));
    }
  }

  if (!user) {
    return { data: null, status: "unauthenticated" as const };
  }

  const session: UserSession = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    permissions: userPerms,
  };

  return { data: session, status: "authenticated" as const };
}

/**
 * Hook principal pour gérer les permissions utilisateur
 */
export function usePermissions() {
  const { data: session, status } = useMockSession();
  
  const perms = useMemo(() => buildUserPermissions(session), [session]);

  // Mode désactivé: tout est accessible, aucun filtrage
  if (DISABLE_PERMISSIONS) {
    const allow = () => true;
    const identity = (units: any[]) => units;
    const allTabs = (unitId: string, isLeafUnit: boolean) => (
      isLeafUnit
        ? [
            "dashboard",
            "members",
            "courses",
            "schedule",
            "exams",
            "attendance",
            "resources",
          ]
        : [
            "dashboard",
            "children",
            "roles",
            "attributions",
          ]
    );

    return {
      // État de la session simulé comme authentifié
      session: session, // on conserve la session mock si présente
      isAuthenticated: true,
      isLoading: false,

      // Permissions brutes (non utilisées en mode désactivé)
      perms: {},

      // Fonctions utilitaires de base
      hasPerm: allow,
      hasAny: (_unitId: string, _required: Permission[]) => true,
      hasAll: (_unitId: string, _required: Permission[]) => true,
      getUnitPerms: (_unitId: string) => [],

      // Permissions sur les unités
      canViewUnitSelf: allow,
      canViewChildren: allow,
      canCreateUnit: allow,
      canChangeUnit: allow,

      // Permissions sur les rôles
      canViewAllRoles: allow,
      canViewOwnRoles: allow,
      canCreateRole: allow,
      canChangeRole: allow,
      canDeleteRole: allow,

      // Permissions sur les attributions
      canViewAllAttributions: allow,
      canViewOwnAttributions: allow,
      canCreateAttribution: allow,
      canChangeAttribution: allow,

      // Permissions sur les membres
      canViewAllMembers: allow,
      canViewStudents: allow,
      canCreateMember: allow,
      canChangeMember: allow,

      // Permissions sur les cours
      canViewAllCourses: allow,
      canViewOwnCourses: allow,
      canCreateCourse: allow,
      canChangeCourse: allow,

      // Permissions sur l'emploi du temps
      canViewSchedule: allow,
      canCreateSchedule: allow,
      canChangeSchedule: allow,

      // Permissions sur les évaluations
      canViewAllExams: allow,
      canViewOwnExams: allow,
      canCreateExam: allow,
      canChangeExam: allow,
      canGradeExam: allow,
      canViewExamResults: allow,

      // Permissions sur les présences
      canViewAttendance: allow,
      canCreateAttendance: allow,
      canChangeAttendance: allow,

      // Permissions sur les ressources
      canViewResources: allow,
      canDownloadResources: allow,
      canUploadResources: allow,
      canChangeResources: allow,

      // Fonctions utilitaires avancées
      filterVisibleUnits: identity,
      getVisibleTabs: (unitId: string, isLeafUnit: boolean) => allTabs(unitId, isLeafUnit),

      // Helpers mock d'authentification (tests uniquement)
      signInMock: (userId: string) => setMockUserId(userId),
      signOutMock: () => setMockUserId(null),
    } as const;
  }

  return {
    // État de la session
    session,
    isAuthenticated: status === "authenticated",
    isLoading: false, // Pas de loading pour le mock
    
    // Permissions brutes
    perms,
    
    // Fonctions utilitaires de base
    hasPerm: (unitId: string, perm: Permission) => hasPerm(perms, unitId, perm),
    hasAny: (unitId: string, required: Permission[]) => hasAny(perms, unitId, required),
    hasAll: (unitId: string, required: Permission[]) => hasAll(perms, unitId, required),
    getUnitPerms: (unitId: string) => getUnitPerms(perms, unitId),
    
    // Permissions sur les unités
    canViewUnitSelf: (unitId: string) => canViewUnitSelf(perms, unitId),
    canViewChildren: (unitId: string) => canViewChildren(perms, unitId),
    canCreateUnit: (unitId: string) => canCreateUnit(perms, unitId),
    canChangeUnit: (unitId: string) => canChangeUnit(perms, unitId),
    
    // Permissions sur les rôles
    canViewAllRoles: (unitId: string) => canViewAllRoles(perms, unitId),
    canViewOwnRoles: (unitId: string) => canViewOwnRoles(perms, unitId),
    canCreateRole: (unitId: string) => canCreateRole(perms, unitId),
    canChangeRole: (unitId: string) => canChangeRole(perms, unitId),
    canDeleteRole: (unitId: string) => canDeleteRole(perms, unitId),
    
    // Permissions sur les attributions
    canViewAllAttributions: (unitId: string) => canViewAllAttributions(perms, unitId),
    canViewOwnAttributions: (unitId: string) => canViewOwnAttributions(perms, unitId),
    canCreateAttribution: (unitId: string) => canCreateAttribution(perms, unitId),
    canChangeAttribution: (unitId: string) => canChangeAttribution(perms, unitId),
    
    // Permissions sur les membres
    canViewAllMembers: (unitId: string) => canViewAllMembers(perms, unitId),
    canViewStudents: (unitId: string) => canViewStudents(perms, unitId),
    canCreateMember: (unitId: string) => canCreateMember(perms, unitId),
    canChangeMember: (unitId: string) => canChangeMember(perms, unitId),
    
    // Permissions sur les cours
    canViewAllCourses: (unitId: string) => canViewAllCourses(perms, unitId),
    canViewOwnCourses: (unitId: string) => canViewOwnCourses(perms, unitId),
    canCreateCourse: (unitId: string) => canCreateCourse(perms, unitId),
    canChangeCourse: (unitId: string) => canChangeCourse(perms, unitId),
    
    // Permissions sur l'emploi du temps
    canViewSchedule: (unitId: string) => canViewSchedule(perms, unitId),
    canCreateSchedule: (unitId: string) => canCreateSchedule(perms, unitId),
    canChangeSchedule: (unitId: string) => canChangeSchedule(perms, unitId),
    
    // Permissions sur les évaluations
    canViewAllExams: (unitId: string) => canViewAllExams(perms, unitId),
    canViewOwnExams: (unitId: string) => canViewOwnExams(perms, unitId),
    canCreateExam: (unitId: string) => canCreateExam(perms, unitId),
    canChangeExam: (unitId: string) => canChangeExam(perms, unitId),
    canGradeExam: (unitId: string) => canGradeExam(perms, unitId),
    canViewExamResults: (unitId: string) => canViewExamResults(perms, unitId),
    
    // Permissions sur les présences
    canViewAttendance: (unitId: string) => canViewAttendance(perms, unitId),
    canCreateAttendance: (unitId: string) => canCreateAttendance(perms, unitId),
    canChangeAttendance: (unitId: string) => canChangeAttendance(perms, unitId),
    
    // Permissions sur les ressources
    canViewResources: (unitId: string) => canViewResources(perms, unitId),
    canDownloadResources: (unitId: string) => canDownloadResources(perms, unitId),
    canUploadResources: (unitId: string) => canUploadResources(perms, unitId),
    canChangeResources: (unitId: string) => canChangeResources(perms, unitId),
    
    // Fonctions utilitaires avancées
    filterVisibleUnits: (units: any[]) => filterVisibleUnits(units, perms),
    getVisibleTabs: (unitId: string, isLeafUnit: boolean) => getVisibleTabs(unitId, perms, isLeafUnit),

    // Helpers mock d'authentification (tests uniquement)
    signInMock: (userId: string) => setMockUserId(userId),
    signOutMock: () => setMockUserId(null),
  };
}

/**
 * Hook pour changer l'utilisateur simulé (utile pour les tests)
 */
export function useMockUserSwitcher() {
  const availableUsers = usersData.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email
  }));

  // En production, ceci ne sera pas nécessaire
  const switchToUser = (userId: string) => {
    console.log(`Switching to user: ${userId}`);
    // Pour l'instant, il faut modifier manuellement mockUserId dans useMockSession
    // En production, ceci sera géré par NextAuth
  };

  return {
    availableUsers,
    switchToUser
  };
}
