"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
  GripVertical,
} from "lucide-react";
import { usePermissions } from "@/hooks/usePermissions";
import clsx from "clsx";

/**
 * Composant pour afficher un élément d'unité dans l'arborescence
{{ ... }}
 */
type UnitTreeItemLocalProps = UnitTreeItemProps & { collapsed?: boolean };

const UnitTreeItem = ({
  unit,
  level,
  onSelect,
  onToggleExpand,
  onAddChild,
  selectedUnitId,
  expandedUnits,
  collapsed,
}: UnitTreeItemLocalProps) => {
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

  // Icônes: laisser la couleur hériter du parent (currentColor)
  const getUnitIcon = () => {
    switch (unit.type) {
      case "université":
        return <Building2 size={18} />;
      case "école":
        return <School size={18} />;
      case "faculté":
        return <GraduationCap size={18} />;
      case "cycle":
        return <BookOpen size={18} />;
      case "département":
        return <BookOpen size={18} />;
      case "niveau":
        return <BookOpen size={18} />;
      case "licence":
        return <GraduationCap size={18} />;
      case "classe":
        return <Users size={18} />;
      case "semestre":
        return <BookOpen size={18} />;
      case "lycée":
        return <School size={18} />;
      default:
        return <Users size={18} />;
    }
  };

  return (
    <div className="w-full">
      <div
        className={clsx(
          "group grid items-center py-2 px-3 cursor-pointer transition-all duration-200",
          collapsed
            ? "grid-cols-[24px] justify-items-center"
            : "grid-cols-[20px_24px_1fr_24px] gap-2",
          // Hover/Active unifiés si non sélectionné
          !isSelected && "hover:bg-[#f0f9fa]/15 active:bg-[#f0f9fa]/15 hover:text-white active:text-white",
          "rounded-lg mx-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8d070]/40",
          isSelected && "bg-[#b8d070] text-[#1d8b93] shadow-sm"
        )}
        style={{ paddingLeft: collapsed ? undefined : `${level * 20 + 16}px` }}
        data-unit-row
        onClick={() => !collapsed && onSelect(unit)}
      >
        {!collapsed && (
          hasChildren ? (
            <button
              className={clsx(
                "w-5 h-5 flex items-center justify-center rounded transition-colors",
                "hover:bg-[#f0f9fa]/15 active:bg-[#f0f9fa]/20",
                isSelected && "hover:bg-[#1d8b93]/20 active:bg-[#1d8b93]/25"
              ,
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8d070]/40"
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
          ) : (
            <div className="w-5 h-5" />
          )
        )}

        {/* Colonne icône */}
        <span
          className={clsx(
            "w-6 h-6 flex items-center justify-center",
            // Couleur par défaut blanche, teinte brand au survol
            isSelected ? "text-[#1d8b93]" : "text-white group-hover:text-[#b8d070]",
            collapsed && "my-0.5 transition-transform duration-150 motion-reduce:transition-none group-hover:scale-110 active:scale-110"
          )}
          onClick={() => collapsed && onSelect(unit)}
          title={collapsed ? unit.name : undefined}
        >
          {getUnitIcon()}
        </span>

        {!collapsed && (
          <>
            {/* Texte */}
            <span
              onClick={() => onSelect(unit)}
              className={clsx(
                "whitespace-nowrap text-sm font-medium",
                isSelected ? "text-[#1d8b93]" : "text-white"
              )}
              data-unit-text
            >
              {unit.name}
            </span>

            {/* Bouton add */}
            <button
              className={clsx(
                "w-6 h-6 flex items-center justify-center rounded justify-self-end",
                "opacity-0 group-hover:opacity-100 hover:bg-[#f0f9fa]/15 active:bg-[#f0f9fa]/20",
                "transition-colors duration-200",
                isSelected && "hover:bg-[#1d8b93]/20 active:bg-[#1d8b93]/25",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8d070]/40"
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
          </>
        )}
      </div>

      {/* Enfants */}
      {isExpanded && !collapsed && canViewChildren(unit.id) && visibleChildren.length > 0 && (
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
              collapsed={collapsed}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Composant SideBar principal professionnel avec redimensionnement
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
  const [sidebarWidth, setSidebarWidth] = useState(320); // Largeur par défaut
  const [isResizing, setIsResizing] = useState(false);
  const [minWidth, setMinWidth] = useState(200);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const unitContext = useUnitContext();
  const { filterVisibleUnits } = usePermissions();

  // Constantes de redimensionnement
  const MIN_WIDTH = 180;
  const MAX_WIDTH = 600;
  const COLLAPSED_WIDTH = 80;
  const snapPoints = useMemo(() => [280, 220, 180], []);

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

  // Gérer le redimensionnement
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return;

      const newWidth = e.clientX;
      const constrainedWidth = Math.min(
        Math.max(newWidth, MIN_WIDTH),
        MAX_WIDTH
      );

      // Throttle updates to once per animation frame to avoid layout thrash
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(() => {
          setSidebarWidth((prev) => (prev !== constrainedWidth ? constrainedWidth : prev));
          // Mettre à jour la variable CSS dans la même frame pour synchroniser le contenu
          const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
          const widthPx = isDesktop ? constrainedWidth : isMobileOpen ? constrainedWidth : 0;
          document.documentElement.style.setProperty("--sidebar-width", `${widthPx}px`);
          rafRef.current = null;
        });
      }
    },
    [isResizing, isMobileOpen]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    // Si l'utilisateur a tenté d'aller en dessous de la largeur minimale de contenu,
    // on propose une transition nette vers l'état "collapsed" pour permettre une réduction franche
    if (!collapsed && onToggleCollapse) {
      const threshold = Math.max(minWidth - 24, MIN_WIDTH);
      if (sidebarWidth <= threshold) {
        onToggleCollapse();
        if (rafRef.current != null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        return;
      }
    }
    // Snap aux points prédéfinis pour une sensation contrôlée
    if (!collapsed && snapPoints.length) {
      let nearest = snapPoints[0];
      let bestDiff = Math.abs(sidebarWidth - nearest);
      for (const p of snapPoints) {
        const d = Math.abs(sidebarWidth - p);
        if (d < bestDiff) {
          bestDiff = d;
          nearest = p;
        }
      }
      // Snap si on est proche (tolérance 16px)
      if (bestDiff <= 16 && sidebarWidth !== nearest) {
        setSidebarWidth(nearest);
        const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
        const widthPx = isDesktop ? nearest : isMobileOpen ? nearest : 0;
        document.documentElement.style.setProperty("--sidebar-width", `${widthPx}px`);
      }
    }
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, [collapsed, onToggleCollapse, sidebarWidth, minWidth, isMobileOpen, snapPoints]);

  // Event listeners pour le redimensionnement
  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  // Filtrer les unités visibles selon les permissions
  const visibleRootUnits = filterVisibleUnits
    ? filterVisibleUnits(units)
    : units;

  // Filtrer les unités selon la recherche
  const filteredUnits = visibleRootUnits.filter((unit) =>
    unit.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculer la largeur effective
  const effectiveWidth = collapsed ? COLLAPSED_WIDTH : sidebarWidth;

  // Publier la largeur effective via une variable CSS globale pour décaler le contenu
  useEffect(() => {
    const updateCssVar = () => {
      // Déterminer si on est en mode desktop (md: >= 768px)
      const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
      // Sur mobile, si le menu n'est pas ouvert, ne pas réserver d'espace
      const widthPx = isDesktop ? effectiveWidth : isMobileOpen ? effectiveWidth : 0;
      document.documentElement.style.setProperty("--sidebar-width", `${widthPx}px`);
    };

    // Mise à jour immédiate pour réduire la latence perçue
    updateCssVar();

    // Mettre à jour aussi quand la fenêtre change de taille (pour basculer mobile/desktop)
    const handleResize = () => updateCssVar();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
      // Nettoyage de la variable à la désinstallation du composant
      document.documentElement.style.removeProperty("--sidebar-width");
    };
  }, [effectiveWidth, isMobileOpen]);

  // Mesurer le contenu pour déterminer une largeur minimale qui évite toute troncature
  useEffect(() => {
    if (!sidebarRef.current) return;
    if (collapsed) {
      setMinWidth(COLLAPSED_WIDTH);
      return;
    }

    const el = sidebarRef.current;
    let required = MIN_WIDTH;

    // Mesurer la barre de recherche si visible
    const search = el.querySelector<HTMLInputElement>("input[type='text']");
    if (search) {
      // largeur intrinsèque + marges latérales du container
      required = Math.max(required, Math.ceil(search.scrollWidth) + 48);
    }

    // Mesurer chaque ligne unité
    const rows = el.querySelectorAll<HTMLElement>("[data-unit-row]");
    rows.forEach((row) => {
      const style = window.getComputedStyle(row);
      const paddingLeft = parseFloat(style.paddingLeft || "16");
      const text = row.querySelector<HTMLElement>("[data-unit-text]");
      const badge = row.querySelector<HTMLElement>("[data-unit-badge]");

      const textWidth = text ? Math.ceil(text.scrollWidth) : 0;
      const badgeWidth = badge ? Math.ceil(badge.scrollWidth) : 0;

      // expandeur 20 + icône 24 + gaps (≈ 8*3) = 44
      const chrome = 20 + 24 + 24; // 68 total chrome including typical gaps
      const rightPad = 40; // sécurité côté droit
      const needed = paddingLeft + chrome + textWidth + badgeWidth + rightPad;
      if (needed > required) required = needed;
    });

    // bornes
    required = Math.min(Math.max(required, MIN_WIDTH), MAX_WIDTH);
    const rounded = Math.round(required);
    setMinWidth(rounded);
  }, [filteredUnits, searchQuery, collapsed]);

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
        ref={sidebarRef}
        className={clsx(
          "fixed top-0 left-0 z-40 h-screen bg-[#1d8b93] text-white border-r border-[rgba(255,255,255,0.14)]",
          isResizing ? "transition-none" : "transition-all duration-300 ease-in-out",
          isResizing ? "" : "shadow-xl",
          "md:relative md:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          "relative overflow-hidden",
          className
        )}
        style={{
          width: `${effectiveWidth}px`,
          // Autoriser une réduction jusqu'à MIN_WIDTH via le drag;
          // quand on passe sous minWidth, on snap en mode collapsed dans handleMouseUp
          minWidth: `${collapsed ? COLLAPSED_WIDTH : MIN_WIDTH}px`,
          maxWidth: `${MAX_WIDTH}px`,
          willChange: "width",
        }}
      >
        {/* Décor de fond cohérent avec la palette: gradients légers */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            background: `
              radial-gradient(900px 600px at 12% 10%, rgba(184,208,112,0.12) 0%, transparent 60%),
              radial-gradient(800px 700px at 88% 20%, rgba(255,255,255,0.08) 0%, transparent 65%),
              linear-gradient(160deg, #239ca5, #166f76)
            `,
          }}
        />
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
          <div className="flex-1 overflow-auto">
            <div className="p-4">
              {/* Arborescence des unités */}
              <div className={clsx("mb-6", collapsed && "mb-3")}> 
                {!collapsed && (
                  <h3 className="text-xs font-semibold text-[rgba(255,255,255,0.70)] uppercase tracking-wider mb-3">
                    Unités Éducatives
                  </h3>
                )}
                <div className={clsx("space-y-1", collapsed && "space-y-2")}> 
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
                      collapsed={collapsed}
                    />
                  ))}
                </div>
              </div>
            </div>
        </div>
      </div>

      {/* Handle de redimensionnement - seulement sur desktop et quand non collapsed */}
        {!collapsed && (
          <div
            className="absolute top-0 right-0 w-1 h-full bg-transparent hover:bg-[rgba(255,255,255,0.2)] cursor-col-resize group transition-colors duration-200 z-50"
            onMouseDown={handleMouseDown}
          >
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 w-2 h-8 bg-[rgba(184,208,112,0.5)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <GripVertical size={12} className="text-[#1d8b93]" />
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default SideBar;
