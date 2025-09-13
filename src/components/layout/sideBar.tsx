"use client";

import { useState, useEffect } from "react";
import { useUnitContext } from "@/contexts/UnitContext";
import { Unit, UnitTreeItemProps, AdminSidebarProps } from "@/types/unit";
import {
  ChevronDown,
  ChevronRight,
  Building2,
  Users,
  GraduationCap,
  BookOpen,
  School,
  Plus,
  X,
  Menu,
  ChevronLeft,
  Search,
  User,
} from "lucide-react";
import { usePermissions } from "@/hooks/usePermissions";
import clsx from "clsx";

/**
 * Composant pour afficher un élément d'unité dans l'arborescence
 */
const UnitTreeItem = ({
  unit,
  level,
  onSelect,
  onToggleExpand,
  onAddChild,
  selectedUnitId,
  expandedUnits,
}: UnitTreeItemProps) => {
  const { canViewUnitSelf, canViewChildren } = usePermissions();

  // Ne pas afficher l'unité si l'utilisateur n'a pas la permission de la voir
  if (!canViewUnitSelf(unit.id)) {
    return null;
  }

  // Filtrer les enfants selon les permissions
  const visibleChildren = (unit.children || []).filter(
    (child) => canViewUnitSelf(child.id) || canViewChildren(unit.id)
  );
  const isExpanded = expandedUnits.has(unit.id);
  const isSelected = selectedUnitId === unit.id;
  const hasChildren = unit.children && unit.children.length > 0;

  // Icônes par type d'unité éducative
  const getUnitIcon = () => {
    switch (unit.type) {
      case "université":
        return <Building2 size={18} className="text-blue-400" />;
      case "école":
        return <School size={18} className="text-green-400" />;
      case "faculté":
        return <GraduationCap size={18} className="text-purple-400" />;
      case "cycle":
        return <BookOpen size={18} className="text-yellow-400" />;
      case "département":
        return <BookOpen size={18} className="text-orange-400" />;
      case "niveau":
        return <BookOpen size={18} className="text-pink-400" />;
      case "licence":
        return <GraduationCap size={18} className="text-indigo-400" />;
      case "classe":
        return <Users size={18} className="text-cyan-400" />;
      case "semestre":
        return <BookOpen size={18} className="text-emerald-400" />;
      case "lycée":
        return <School size={18} className="text-violet-400" />;
      default:
        return <Users size={18} className="text-[rgba(255,255,255,0.70)]" />;
    }
  };

  return (
    <div className="w-full">
      <div
        className={clsx(
          "group flex items-center py-2 px-3 cursor-pointer transition-all duration-200",
          "hover:bg-[rgba(255,255,255,0.08)] hover:text-white rounded-lg mx-1",
          isSelected && "bg-[#b8d070] text-[#1d8b93] shadow-sm"
        )}
        style={{ paddingLeft: `${level * 20 + 16}px` }}
      >
        {/* Icône d'expansion */}
        {hasChildren && (
          <button
            className={clsx(
              "w-5 h-5 flex items-center justify-center mr-2 rounded",
              "hover:bg-[rgba(255,255,255,0.1)] transition-colors",
              isSelected && "hover:bg-[rgba(29,139,147,0.2)]"
            )}
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(unit.id);
            }}
          >
            {isExpanded ? (
              <ChevronDown
                size={14}
                className={
                  isSelected
                    ? "text-[#1d8b93]"
                    : "text-[rgba(255,255,255,0.70)]"
                }
              />
            ) : (
              <ChevronRight
                size={14}
                className={
                  isSelected
                    ? "text-[#1d8b93]"
                    : "text-[rgba(255,255,255,0.70)]"
                }
              />
            )}
          </button>
        )}

        {/* Espace pour les unités sans enfants */}
        {!hasChildren && <div className="w-6 mr-3" />}

        {/* Contenu de l'unité */}
        <div
          className="flex items-center flex-1 py-1"
          onClick={() => onSelect(unit)}
        >
          <span className="mr-4">{getUnitIcon()}</span>
          <span
            className={clsx(
              "truncate text-sm font-medium",
              isSelected ? "text-[#1d8b93]" : "text-white"
            )}
          >
            {unit.name}
          </span>
        </div>

        {/* Badge compteur à droite */}
        {typeof unit.badge !== "undefined" && (
          <span
            className={clsx(
              "ml-3 px-3 py-1 rounded-full text-xs font-semibold",
              isSelected
                ? "bg-[#1d8b93] text-white"
                : "bg-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.90)]"
            )}
          >
            {unit.badge}
          </span>
        )}

        {/* Bouton d'ajout d'enfant */}
        <button
          className={clsx(
            "w-6 h-6 flex items-center justify-center ml-3 rounded",
            "opacity-0 group-hover:opacity-100 hover:bg-[rgba(255,255,255,0.1)]",
            "transition-all duration-200",
            isSelected && "hover:bg-[rgba(29,139,147,0.2)]"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onAddChild(unit.id);
          }}
        >
          <Plus
            size={14}
            className={
              isSelected ? "text-[#1d8b93]" : "text-[rgba(255,255,255,0.70)]"
            }
          />
        </button>
      </div>

      {/* Afficher les enfants si l'unité est étendue */}
      {isExpanded && canViewChildren(unit.id) && visibleChildren.length > 0 && (
        <div className="ml-3">
          {visibleChildren.map((child) => (
            <UnitTreeItem
              key={child.id}
              unit={child}
              level={level + 1}
              onSelect={onSelect}
              onToggleExpand={onToggleExpand}
              onAddChild={onAddChild}
              selectedUnitId={selectedUnitId}
              expandedUnits={expandedUnits}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Composant SideBar principal professionnel
 */
const SideBar = ({
  units,
  onUnitSelect,
  onUnitAdd,
  className,
  collapsed = false,
  onToggleCollapse,
}: AdminSidebarProps) => {
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const unitContext = useUnitContext();
  const { filterVisibleUnits } = usePermissions();

  // Synchroniser avec le contexte d'unité
  useEffect(() => {
    if (unitContext && unitContext.id) {
      setSelectedUnitId(unitContext.id);
    }
  }, [unitContext]);

  // Gérer la sélection d'une unité
  const handleUnitSelect = (unit: Unit) => {
    setSelectedUnitId(unit.id);
    if (unitContext && typeof unitContext.setUnit === "function") {
      unitContext.setUnit({
        id: unit.id,
        type_unite: unit.type,
        nom: unit.name,
        path: unit.path || [],
      });
    }
    if (onUnitSelect) onUnitSelect(unit);
  };

  // Gérer l'expansion/réduction d'une unité
  const handleToggleExpand = (unitId: string) => {
    setExpandedUnits((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(unitId)) newSet.delete(unitId);
      else newSet.add(unitId);
      return newSet;
    });
  };

  // Gérer l'ajout d'une unité enfant
  const handleAddChild = (parentId: string) => {
    if (onUnitAdd) onUnitAdd(parentId);
  };

  // Filtrer les unités visibles selon les permissions
  const visibleRootUnits = filterVisibleUnits
    ? filterVisibleUnits(units)
    : units;

  // Filtrer les unités selon la recherche
  const filteredUnits = visibleRootUnits.filter((unit) =>
    unit.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Sidebar mobile toggle */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-[#1d8b93] p-2 rounded-lg shadow-lg border border-[rgba(255,255,255,0.14)]"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? (
          <X size={20} className="text-white" />
        ) : (
          <Menu size={20} className="text-white" />
        )}
      </button>

      {/* Overlay mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar principal */}
      <aside
        className={clsx(
          "fixed top-0 left-0 z-40 h-screen bg-[#1d8b93] text-white border-r border-[rgba(255,255,255,0.14)]",
          "transition-all duration-300 ease-in-out shadow-xl",
          "md:relative md:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          collapsed ? "w-20" : "w-80",
          className
        )}
      >
        {/* En-tête */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.05)]">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#b8d070] rounded-lg flex items-center justify-center">
                <School size={20} className="text-[#1d8b93]" />
              </div>
              <span className="text-lg font-bold text-white">Schola</span>
            </div>
          )}

          {/* Bouton de réduction */}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.10)] transition-colors"
            >
              {collapsed ? (
                <ChevronRight size={20} className="text-white" />
              ) : (
                <ChevronLeft size={20} className="text-white" />
              )}
            </button>
          )}
        </div>

        {/* Corps du sidebar */}
        <div className="flex flex-col h-[calc(100vh-4rem)]">
          {/* Barre de recherche */}
          {!collapsed && (
            <div className="p-4 border-b border-[rgba(255,255,255,0.14)]">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgba(255,255,255,0.55)]"
                />
                <input
                  type="text"
                  placeholder="Rechercher une unité..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2.5 pl-10 pr-4 rounded-lg bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.14)] text-sm text-white placeholder-[rgba(255,255,255,0.70)] focus:outline-none focus:border-[#b8d070] focus:ring-1 focus:ring-[#b8d070] transition-all"
                />
              </div>
            </div>
          )}

          {/* Menu principal */}
          <div className="flex-1">
            <div className="p-4">
              {/* Arborescence des unités */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-[rgba(255,255,255,0.70)] uppercase tracking-wider mb-3">
                  Unités Éducatives
                </h3>
                <div className="space-y-1">
                  {filteredUnits.map((unit) => (
                    <UnitTreeItem
                      key={unit.id}
                      unit={unit}
                      level={0}
                      onSelect={handleUnitSelect}
                      onToggleExpand={handleToggleExpand}
                      onAddChild={handleAddChild}
                      selectedUnitId={selectedUnitId}
                      expandedUnits={expandedUnits}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pied de page */}
          <div className="border-t border-[rgba(255,255,255,0.14)] p-4 bg-[rgba(255,255,255,0.05)]">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[rgba(255,255,255,0.1)] rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    Admin User
                  </p>
                  <p className="text-xs text-[rgba(255,255,255,0.70)] truncate">
                    admin@schola.edu
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
