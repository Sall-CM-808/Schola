"use client";

import { useState, useEffect } from "react";
import { useUnitContext } from "@/contexts/UnitContext";
import { Unit, UnitTreeItemProps, AdminSidebarProps } from "@/types/unit";
import { ChevronDown, ChevronRight, Home, Building2, Users, GraduationCap, BookOpen, School, Plus, X, Menu, ChevronLeft } from "lucide-react";
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
  // Si l'utilisateur peut voir les enfants d'une unité, on affiche les enfants même
  // s'il n'a pas explicitement "unite.view_self" sur chaque enfant.
  const visibleChildren = (unit.children || []).filter(child =>
    canViewUnitSelf(child.id) || canViewChildren(unit.id)
  );
  const isExpanded = expandedUnits.has(unit.id);
  const isSelected = selectedUnitId === unit.id;
  const hasChildren = unit.children && unit.children.length > 0;
  
  // Icônes par type d'unité éducative
  const getUnitIcon = () => {
    switch (unit.type) {
      case "université":
      case "école":
        return <School size={16} className="text-blue-500" />;
      case "faculté":
      case "cycle":
        return <BookOpen size={16} className="text-green-500" />;
      case "département":
      case "niveau":
        return <BookOpen size={16} className="text-yellow-500" />;
      case "licence":
      case "classe":
        return <GraduationCap size={16} className="text-purple-500" />;
      case "semestre":
        return <BookOpen size={16} className="text-orange-500" />;
      default:
        return <Users size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="w-full">
      <div 
        className={clsx(
          "group flex items-center py-1 px-2 cursor-pointer transition-colors",
          "hover:bg-[#0a4a50] hover:text-white",
          isSelected && "bg-[#d9f0f2] text-[#0d5a61]"
        )}
        style={{ paddingLeft: `${(level * 12) + 8}px` }}
      >
        {/* Icône d'expansion */}
        <button 
          className={clsx(
            "w-4 h-4 flex items-center justify-center mr-1",
            "hover:bg-transparent transition-colors",
            hasChildren ? "visible" : "invisible"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onToggleExpand(unit.id);
          }}
        >
          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        
        {/* Contenu de l'unité */}
        <div 
          className="flex items-center flex-1 py-1"
          onClick={() => onSelect(unit)}
        >
          <span className="mr-2 text-[#cccccc]">
            {getUnitIcon()}
          </span>
          <span className="truncate text-sm">{unit.name}</span>
        </div>
        {/* Badge compteur à droite */}
        {typeof unit.badge !== "undefined" && (
          <span
            className={clsx(
              "ml-2 px-1.5 py-0.5 rounded-sm text-[10px]",
              "bg-[#4d4d4d] text-[#cccccc]"
            )}
          >
            {unit.badge}
          </span>
        )}
        
        {/* Bouton d'ajout d'enfant */}
        <button
          className={clsx(
            "w-5 h-5 flex items-center justify-center",
            "opacity-0 group-hover:opacity-100 hover:bg-[#3c3c3c]",
            "transition-all"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onAddChild(unit.id);
          }}
        >
          <Plus size={14} />
        </button>
      </div>
      
      {/* Afficher les enfants si l'unité est étendue et si on peut les voir */}
      {isExpanded && canViewChildren(unit.id) && visibleChildren.length > 0 && (
        <div className="ml-4">
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
 * Composant SideBar principal (anciennement AdminSidebar)
 */
const SideBar = ({
  units,
  onUnitSelect,
  onUnitAdd,
  className,
  title = "EXPLORER",
  logo,
  collapsed = false,
  onToggleCollapse,
}: AdminSidebarProps) => {
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const unitContext = useUnitContext();
  const { filterVisibleUnits } = usePermissions();

  // Synchroniser avec le contexte d'unité
  useEffect(() => {
    // Si un contexte d'unité existe, synchroniser la sélection
    // @ts-ignore - le contexte peut avoir une forme libre selon votre implémentation
    if (unitContext && unitContext.id) {
      // @ts-ignore
      setSelectedUnitId(unitContext.id);
    }
  }, [unitContext]);

  // Gérer la sélection d'une unité
  const handleUnitSelect = (unit: Unit) => {
    setSelectedUnitId(unit.id);
    // Mettre à jour le contexte d'unité si disponible
    // @ts-ignore
    if (unitContext && typeof unitContext.setUnit === "function") {
      // @ts-ignore
      unitContext.setUnit({
        id: unit.id,
        type_unite: unit.type,
        nom: unit.name,
        path: unit.path || [],
      });
    }
    // Callback externe si fourni
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

  // Gérer l'ajout d'une unité racine
  const handleAddRoot = () => {
    if (onUnitAdd) onUnitAdd(null);
  };

  // Filtrer les unités visibles selon les permissions
  const visibleRootUnits = filterVisibleUnits ? filterVisibleUnits(units) : units;

  return (
    <>
      {/* Sidebar mobile toggle */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-white dark:bg-gray-800 p-2 rounded-md shadow-md"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      {/* Sidebar principal */}
      <aside
        className={clsx(
          "fixed top-0 left-0 z-40 h-screen bg-[#0d5a61] text-white border-r border-[#0a4a50]",
          "transition-all duration-300 ease-in-out",
          "md:relative md:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          collapsed ? "w-20" : "w-64",
          className
        )}
      >
        {/* En-tête */}
        <div className="flex items-center justify-between h-10 px-4 border-b border-[#0a4a50]">
          <div className="flex items-center">
            <span className="text-sm font-medium text-white uppercase">{title}</span>
          </div>
          
          {/* Bouton de réduction */}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="p-1 rounded-md hover:bg-[#0a4a50]"
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          )}
        </div>
        
        {/* Corps du sidebar */}
        <div className="p-4 overflow-y-auto h-[calc(100vh-4rem)]">
          {/* Barre de recherche */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Rechercher une unité..."
              className={clsx(
                "w-full py-1.5 pl-8 pr-2 rounded-sm",
                "bg-[#0a4a50] border border-[#094146]",
                "text-sm text-white placeholder-gray-300 focus:outline-none focus:border-[#a1c95a]"
              )}
            />
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
          
          {/* Arborescence des unités */}
          <div className="space-y-1">
            {visibleRootUnits.map((unit) => (
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
      </aside>
    </>
  );
};

export default SideBar;
