/**
 * Interface représentant une unité éducative (école, département, classe, etc.)
 */
export interface Unit {
  id: string;
  name: string;
  type: string; // ex: "menu", "École", "Département", etc.
  children?: Unit[];
  path?: string[];
  expanded?: boolean;
  parentId?: string | null;
  // Adaptation design: badge et style
  badge?: number | string; // ex: compteur (1247)
  accentColor?: string; // ex: "#a1c95a" pour une puce ou un halo
  iconName?: string; // optionnel si vous voulez forcer une icône
}

/**
 * Types d'unités disponibles dans le système
 */
export enum UnitType {
  SCHOOL = "École",
  DEPARTMENT = "Département",
  CLASS = "Classe",
  GROUP = "Groupe",
  CUSTOM = "Personnalisé",
}

/**
 * Interface pour les actions sur les unités
 */
export interface UnitAction {
  type: "add" | "edit" | "delete" | "move";
  payload: Partial<Unit>;
}

/**
 * Interface pour les props du composant UnitTreeItem
 */
export interface UnitTreeItemProps {
  unit: Unit;
  level: number;
  onSelect: (unit: Unit) => void;
  onToggleExpand: (unitId: string) => void;
  onAddChild: (parentId: string) => void;
  selectedUnitId: string | null;
  expandedUnits: Set<string>;
}

/**
 * Interface pour les props du composant AdminSidebar
 */
export interface AdminSidebarProps {
  units: Unit[];
  onUnitSelect?: (unit: Unit) => void;
  onUnitAdd?: (parentId: string | null) => void;
  className?: string;
  title?: string;
  logo?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}
