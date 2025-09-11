import { ReactNode } from "react";
import { usePermissions } from "@/hooks/usePermissions";
import { Permission } from "@/core/auth/permissions";

interface RequirePermissionProps {
  unitId: string;
  anyOf?: Permission[];
  allOf?: Permission[];
  children: ReactNode;
  fallback?: ReactNode;
  fallbackMessage?: string;
}

/**
 * Composant de garde qui affiche son contenu seulement si l'utilisateur a les permissions requises
 */
export function RequirePermission({ 
  unitId, 
  anyOf = [], 
  allOf = [], 
  children, 
  fallback = null,
  fallbackMessage = "Accès non autorisé"
}: RequirePermissionProps) {
  const { hasAny, hasAll } = usePermissions();
  
  let hasPermission = true;
  
  // Vérifier les permissions "anyOf" (au moins une)
  if (anyOf.length > 0) {
    hasPermission = hasPermission && hasAny(unitId, anyOf);
  }
  
  // Vérifier les permissions "allOf" (toutes)
  if (allOf.length > 0) {
    hasPermission = hasPermission && hasAll(unitId, allOf);
  }
  
  if (!hasPermission) {
    if (fallback !== null) {
      return <>{fallback}</>;
    }
    
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
        <div className="text-red-600 mb-2">🚫</div>
        <p className="text-red-800 font-medium">{fallbackMessage}</p>
        <p className="text-red-600 text-sm mt-1">
          Vous n'avez pas les permissions nécessaires pour accéder à cette section.
        </p>
      </div>
    );
  }
  
  return <>{children}</>;
}

interface ShowIfPermissionProps {
  unitId: string;
  anyOf?: Permission[];
  allOf?: Permission[];
  children: ReactNode;
}

/**
 * Composant simple qui affiche ou masque son contenu selon les permissions
 */
export function ShowIfPermission({ 
  unitId, 
  anyOf = [], 
  allOf = [], 
  children 
}: ShowIfPermissionProps) {
  const { hasAny, hasAll } = usePermissions();
  
  let hasPermission = true;
  
  if (anyOf.length > 0) {
    hasPermission = hasPermission && hasAny(unitId, anyOf);
  }
  
  if (allOf.length > 0) {
    hasPermission = hasPermission && hasAll(unitId, allOf);
  }
  
  if (!hasPermission) {
    return null;
  }
  
  return <>{children}</>;
}
