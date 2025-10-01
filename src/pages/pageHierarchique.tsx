"use client";

import { useEffect, useState } from "react";
import type { JSX } from "react";
import { useRouter } from "next/router";
import { UnitProvider } from "@/contexts/UnitContext";
import SideBar from "@/components/layout/sideBar";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Unit } from "@/types/unit";
import {
  ChevronRight,
  BarChart3,
  Users,
  Shield,
  UserCheck,
  BookOpen,
  Calendar,
  FileText,
  UserPlus,
  Clock,
} from "lucide-react";
import { educationStructure } from "@/examples/educationData";
import { usePermissions } from "@/hooks/usePermissions";
import { ShowIfPermission } from "@/components/auth/RequirePermission";
import UnitDashboard from "./unit/dashboard";
import UnitChildren from "./unit/unit_sans_enfant/children";
import UnitRoles from "./unit/roles";
import UnitAttributions from "./unit/attributions";
import UnitMembers from "./unit/unit_sans_enfant/members";
import UnitCourses from "./unit/unit_sans_enfant/courses";
import UnitSchedule from "./unit/unit_sans_enfant/schedule";
import UnitExams from "./unit/unit_sans_enfant/exams";
import UnitAttendance from "./unit/unit_sans_enfant/attendance";
import UnitResources from "./unit/unit_sans_enfant/resources";

type UnitPageType =
  | "dashboard"
  | "children"
  | "roles"
  | "attributions"
  | "members"
  | "courses"
  | "schedule"
  | "exams"
  | "attendance"
  | "resources";

interface NavigationTab {
  key: UnitPageType;
  label: string;
  icon: React.ReactNode;
  permissions: string[];
  badge?: number;
  isParentOnly?: boolean;
  isLeafOnly?: boolean;
}

export default function PageHierarchique() {
  const [units, setUnits] = useState<Unit[]>(educationStructure);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [currentPage, setCurrentPage] = useState<UnitPageType>("dashboard");
  const { canViewUnitSelf, isAuthenticated } = usePermissions();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Configuration des onglets de navigation
  const navigationTabs: NavigationTab[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <BarChart3 size={16} />,
      permissions: ["unite.view_self"],
    },
    {
      key: "children",
      label: "Unités Enfants",
      icon: <Users size={16} />,
      permissions: ["unite.view_children"],
      isParentOnly: true,
      badge: selectedUnit?.children?.length || 0,
    },
    {
      key: "roles",
      label: "Rôles",
      icon: <Shield size={16} />,
      permissions: ["role.view_all", "role.view_own"],
      isParentOnly: true,
    },
    {
      key: "attributions",
      label: "Attributions",
      icon: <UserCheck size={16} />,
      permissions: ["attribution.view_all", "attribution.view_own"],
      isParentOnly: true,
    },
    {
      key: "members",
      label: "Membres",
      icon: <UserPlus size={16} />,
      permissions: ["members.view_all", "members.view_students"],
      isLeafOnly: true,
    },
    {
      key: "courses",
      label: "Cours",
      icon: <BookOpen size={16} />,
      permissions: ["courses.view_all", "courses.view_own"],
      isLeafOnly: true,
    },
    {
      key: "schedule",
      label: "Emploi du temps",
      icon: <Calendar size={16} />,
      permissions: ["schedule.view"],
      isLeafOnly: true,
    },
    {
      key: "exams",
      label: "Évaluations",
      icon: <FileText size={16} />,
      permissions: ["exams.view_all", "exams.view_own"],
      isLeafOnly: true,
    },
    {
      key: "attendance",
      label: "Présences",
      icon: <Clock size={16} />,
      permissions: ["attendance.view"],
      isLeafOnly: true,
    },
    {
      key: "resources",
      label: "Ressources",
      icon: <FileText size={16} />,
      permissions: ["resources.view"],
      isLeafOnly: true,
    },
  ];

  // S'assurer d'un rendu identique SSR/CSR pour éviter le mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirection si non authentifié (effect côté client uniquement)
  useEffect(() => {
    if (!mounted) return;
    if (isAuthenticated === false) {
      router.replace("/login");
    }
  }, [isAuthenticated, router, mounted]);

  // Sélection par défaut: Institution Sainte-Marie ou première unité
  useEffect(() => {
    if (!mounted) return;
    if (selectedUnit) return;
    const preferred = educationStructure.find(u => u.id === "institution-sainte-marie");
    const first = educationStructure[0];
    const target = preferred ?? first ?? null;
    if (target) {
      handleUnitSelect(target);
    }
  }, [mounted, selectedUnit]);

  const handleUnitSelect = (unit: Unit) => {
    setSelectedUnit(unit);
    setCurrentPage("dashboard");
  };

  const handleChildSelect = (child: Unit) => {
    setSelectedUnit(child);
    setCurrentPage("dashboard");
  };

  // Fonction pour déterminer si une unité est une feuille (sans enfants)
  const isLeafUnit = (unit: Unit) => {
    return !unit.children || unit.children.length === 0;
  };

  const handleUnitAdd = (parentId: string | null) => {
    const newUnitName =
      typeof window !== "undefined"
        ? prompt("Nom de la nouvelle unité:")
        : null;
    const newUnitType =
      typeof window !== "undefined"
        ? prompt("Type d'unité (École, Département, Classe, etc.):")
        : null;
    if (!newUnitName || !newUnitType) return;

    const newUnitId = Date.now().toString();
    const addUnitToTree = (
      unitsArray: Unit[],
      parent: string | null
    ): Unit[] => {
      if (parent === null) {
        return [
          ...unitsArray,
          {
            id: newUnitId,
            name: newUnitName,
            type: newUnitType,
            path: [newUnitId],
            children: [],
          },
        ];
      }
      return unitsArray.map((u) => {
        if (u.id === parent) {
          const child: Unit = {
            id: newUnitId,
            name: newUnitName,
            type: newUnitType,
            path: [...(u.path || []), newUnitId],
            parentId: u.id,
          };
          return { ...u, children: [...(u.children || []), child] };
        }
        if (u.children && u.children.length) {
          return { ...u, children: addUnitToTree(u.children, parent) };
        }
        return u;
      });
    };
    setUnits(addUnitToTree(units, parentId));
  };

  // Fonction pour obtenir les onglets visibles pour l'unité sélectionnée
  const getVisibleTabsForUnit = (unit: Unit) => {
    const isLeaf = isLeafUnit(unit);

    return navigationTabs.filter((tab) => {
      // Vérifier si l'onglet est applicable au type d'unité
      if (tab.isParentOnly && isLeaf) return false;
      if (tab.isLeafOnly && !isLeaf) return false;

      // Pour le dashboard, vérifier si l'utilisateur peut voir l'unité
      if (tab.key === "dashboard") {
        return canViewUnitSelf(unit.id);
      }

      // Pour les autres onglets, vérifier via ShowIfPermission
      return true; // La vérification finale sera faite dans le rendu
    });
  };

  // Rendu d'un onglet de navigation
  const renderNavigationTab = (tab: NavigationTab) => {
    if (!selectedUnit) return null;

    const TabButton = (
      <button
        onClick={() => setCurrentPage(tab.key)}
        className={`group relative flex items-center space-x-3 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
          currentPage === tab.key
            ? "bg-white/15 text-white shadow-lg backdrop-blur-sm border border-white/20"
            : "text-white/70 hover:text-white hover:bg-white/8 border border-transparent hover:border-white/10"
        }`}
      >
        <span
          className={`transition-transform duration-200 ${
            currentPage === tab.key ? "scale-110" : "group-hover:scale-105"
          }`}
        >
          {tab.icon}
        </span>
        <span className="font-medium">{tab.label}</span>
        {tab.badge !== undefined && tab.badge > 0 && (
          <span className="ml-2 px-2.5 py-0.5 bg-white/20 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
            {tab.badge}
          </span>
        )}
      </button>
    );

    // Pour le dashboard, pas besoin de ShowIfPermission (ajout d'une key pour éviter l'avertissement React)
    if (tab.key === "dashboard") {
      return canViewUnitSelf(selectedUnit.id) ? (
        <>{TabButton}</>
      ) : null;
    }

    // Pour les autres onglets, utiliser ShowIfPermission
    return (
      <ShowIfPermission
        key={tab.key}
        unitId={selectedUnit.id}
        anyOf={tab.permissions}
      >
        {TabButton}
      </ShowIfPermission>
    );
  };

  // Rendu du contenu de la page
  const renderPageContent = () => {
    if (!selectedUnit) return null;

    const contentMap: Record<UnitPageType, JSX.Element> = {
      dashboard: <UnitDashboard unit={selectedUnit} />,
      children: (
        <UnitChildren unit={selectedUnit} onSelectChild={handleChildSelect} />
      ),
      roles: <UnitRoles unit={selectedUnit} />,
      attributions: <UnitAttributions unit={selectedUnit} />,
      members: <UnitMembers unit={selectedUnit} />,
      courses: <UnitCourses unit={selectedUnit} />,
      schedule: <UnitSchedule unit={selectedUnit} />,
      exams: <UnitExams unit={selectedUnit} />,
      attendance: <UnitAttendance unit={selectedUnit} />,
      resources: <UnitResources unit={selectedUnit} />,
    };

    return contentMap[currentPage] || null;
  };

  // Tant que non monté, ne rien rendre pour éviter l'écart SSR/CSR
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#1d8b93] flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-8 h-8 bg-white/20 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return null;
  }

  return (
    <UnitProvider>
      <div className="min-h-screen bg-[#1d8b93] flex">
        {/* Header spécifique à la page hiérarchique */}
        <DashboardHeader title={selectedUnit?.name || "Schola"} />
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 z-50">
          <SideBar
            units={units}
            onUnitSelect={handleUnitSelect}
            onUnitAdd={handleUnitAdd}
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed(!collapsed)}
          />
        </div>

        {/* Main content area */}
        <div
          className={"flex-1 flex flex-col min-h-screen transition-all duration-300"}
          style={{ paddingLeft: "var(--sidebar-width, 0px)", paddingTop: "64px" }}
        >
          {selectedUnit ? (
            <>
              {/* Navigation Tabs - Sticky sous le header local */}
              <div className="h-20 bg-gradient-to-r from-[#1d8b93] via-[#1d8b93]/98 to-[#1d8b93] backdrop-blur-sm border-b border-white/10 flex-shrink-0 sticky top-16 z-20">
                <div className="h-full px-6 py-4 flex items-center">
                  <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                    <div className="flex space-x-2 min-w-max">
                      {getVisibleTabsForUnit(selectedUnit)
                        .map(renderNavigationTab)
                        .filter(Boolean)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Page Content - Scrollable content area */}
              <div className="flex-1 overflow-auto bg-[#1d8b93]">
                {renderPageContent()}
              </div>
            </>
          ) : (
            /* Empty state */
            <div className="flex-1 flex items-center justify-center min-h-screen">
              <div className="text-center text-white/80">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <ChevronRight size={32} className="opacity-60" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  Aucune unité sélectionnée
                </h3>
                <p className="text-white/60">
                  Sélectionnez une unité dans la sidebar pour voir ses détails
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </UnitProvider>
  );
}
