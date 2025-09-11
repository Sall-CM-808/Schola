"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UnitProvider } from "@/contexts/UnitContext";
import SideBar from "@/components/layout/sideBar";
import { Unit } from "@/types/unit";
import { ChevronRight, BarChart3, Users, Shield, UserCheck, BookOpen, Calendar, FileText, UserPlus, Clock } from "lucide-react";
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


type UnitPageType = "dashboard" | "children" | "roles" | "attributions" | "members" | "courses" | "schedule" | "exams" | "attendance" | "resources";

export default function PageHierarchique() {
  const [units, setUnits] = useState<Unit[]>(educationStructure);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [currentPage, setCurrentPage] = useState<UnitPageType>("dashboard");
  const { getVisibleTabs, canViewUnitSelf, filterVisibleUnits, isAuthenticated } = usePermissions();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

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

  const handleUnitSelect = (unit: Unit) => {
    setSelectedUnit(unit);
    setCurrentPage("dashboard"); // Toujours commencer par le dashboard
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
    const newUnitName = typeof window !== "undefined" ? prompt("Nom de la nouvelle unité:") : null;
    const newUnitType = typeof window !== "undefined" ? prompt("Type d'unité (École, Département, Classe, etc.):") : null;
    if (!newUnitName || !newUnitType) return;

    const newUnitId = Date.now().toString();
    const addUnitToTree = (unitsArray: Unit[], parent: string | null): Unit[] => {
      if (parent === null) {
        return [
          ...unitsArray,
          { id: newUnitId, name: newUnitName, type: newUnitType, path: [newUnitId], children: [] },
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

  // Tant que non monté, ne rien rendre pour éviter l'écart SSR/CSR
  if (!mounted) {
    return null;
  }

  if (isAuthenticated === false) {
    return null;
  }

  return (
    <UnitProvider>
      <div className="flex min-h-screen bg-[#f0f9fa]">
        <SideBar
          units={units}
          onUnitSelect={handleUnitSelect}
          onUnitAdd={handleUnitAdd}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
          className=""
        />
        <main className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'}`}>
          {selectedUnit ? (
            <div className="h-full flex flex-col">
              {/* Navigation horizontale */}
              <div className="bg-white border-b border-[#d9f0f2] px-6 py-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-xl font-bold text-[#0d5a61]">{selectedUnit.name}</h1>
                    <p className="text-sm text-gray-600">{selectedUnit.type} • {selectedUnit.path?.join(" / ")}</p>
                  </div>
                </div>
                
                {/* Boutons de navigation */}
                <div className="flex space-x-1 overflow-x-auto">
                  {/* Dashboard - toujours affiché si on peut voir l'unité */}
                  {canViewUnitSelf(selectedUnit.id) && (
                    <button
                      onClick={() => setCurrentPage("dashboard")}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                        currentPage === "dashboard"
                          ? "bg-[#0d5a61] text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <BarChart3 size={16} />
                      <span>Dashboard</span>
                    </button>
                  )}

                  {/* Onglets pour unités PARENT (avec enfants) */}
                  {!isLeafUnit(selectedUnit) && (
                    <>
                      <ShowIfPermission unitId={selectedUnit.id} anyOf={["unite.view_children"]}>
                        <button
                          onClick={() => setCurrentPage("children")}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                            currentPage === "children"
                              ? "bg-[#0d5a61] text-white"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <Users size={16} />
                          <span>Unités Enfants</span>
                          {selectedUnit.children && selectedUnit.children.length > 0 && (
                            <span className="ml-1 px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full">
                              {selectedUnit.children.length}
                            </span>
                          )}
                        </button>
                      </ShowIfPermission>
                      
                      <ShowIfPermission unitId={selectedUnit.id} anyOf={["role.view_all", "role.view_own"]}>
                        <button
                          onClick={() => setCurrentPage("roles")}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                            currentPage === "roles"
                              ? "bg-[#0d5a61] text-white"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <Shield size={16} />
                          <span>Rôles</span>
                        </button>
                      </ShowIfPermission>
                      
                      <ShowIfPermission unitId={selectedUnit.id} anyOf={["attribution.view_all", "attribution.view_own"]}>
                        <button
                          onClick={() => setCurrentPage("attributions")}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                            currentPage === "attributions"
                              ? "bg-[#0d5a61] text-white"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <UserCheck size={16} />
                          <span>Attributions</span>
                        </button>
                      </ShowIfPermission>
                    </>
                  )}

                  {/* Onglets pour unités FEUILLES (sans enfants) */}
                  {isLeafUnit(selectedUnit) && (
                    <>
                      <ShowIfPermission unitId={selectedUnit.id} anyOf={["members.view_all", "members.view_students"]}>
                        <button
                          onClick={() => setCurrentPage("members")}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                            currentPage === "members"
                              ? "bg-[#0d5a61] text-white"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <UserPlus size={16} />
                          <span>Membres</span>
                        </button>
                      </ShowIfPermission>
                      
                      <ShowIfPermission unitId={selectedUnit.id} anyOf={["courses.view_all", "courses.view_own"]}>
                        <button
                          onClick={() => setCurrentPage("courses")}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                            currentPage === "courses"
                              ? "bg-[#0d5a61] text-white"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <BookOpen size={16} />
                          <span>Cours</span>
                        </button>
                      </ShowIfPermission>
                      
                      <ShowIfPermission unitId={selectedUnit.id} anyOf={["schedule.view"]}>
                        <button
                          onClick={() => setCurrentPage("schedule")}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                            currentPage === "schedule"
                              ? "bg-[#0d5a61] text-white"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <Calendar size={16} />
                          <span>Emploi du temps</span>
                        </button>
                      </ShowIfPermission>
                      
                      <ShowIfPermission unitId={selectedUnit.id} anyOf={["exams.view_all", "exams.view_own"]}>
                        <button
                          onClick={() => setCurrentPage("exams")}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                            currentPage === "exams"
                              ? "bg-[#0d5a61] text-white"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <FileText size={16} />
                          <span>Évaluations</span>
                        </button>
                      </ShowIfPermission>
                      
                      <ShowIfPermission unitId={selectedUnit.id} anyOf={["attendance.view"]}>
                        <button
                          onClick={() => setCurrentPage("attendance")}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                            currentPage === "attendance"
                              ? "bg-[#0d5a61] text-white"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <Clock size={16} />
                          <span>Présences</span>
                        </button>
                      </ShowIfPermission>
                      
                      <ShowIfPermission unitId={selectedUnit.id} anyOf={["resources.view"]}>
                        <button
                          onClick={() => setCurrentPage("resources")}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                            currentPage === "resources"
                              ? "bg-[#0d5a61] text-white"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <FileText size={16} />
                          <span>Ressources</span>
                        </button>
                      </ShowIfPermission>
                    </>
                  )}
                </div>
              </div>
              
              {/* Contenu de la page */}
              <div className="flex-1 overflow-auto bg-[#f0f9fa]">
                {currentPage === "dashboard" && <UnitDashboard unit={selectedUnit} />}
                {currentPage === "children" && <UnitChildren unit={selectedUnit} onSelectChild={handleChildSelect} />}
                {currentPage === "roles" && <UnitRoles unit={selectedUnit} />}
                {currentPage === "attributions" && <UnitAttributions unit={selectedUnit} />}
                {currentPage === "members" && <UnitMembers unit={selectedUnit} />}
                {currentPage === "courses" && <UnitCourses unit={selectedUnit} />}
                {currentPage === "schedule" && <UnitSchedule unit={selectedUnit} />}
                {currentPage === "exams" && <UnitExams unit={selectedUnit} />}
                {currentPage === "attendance" && <UnitAttendance unit={selectedUnit} />}
                {currentPage === "resources" && <UnitResources unit={selectedUnit} />}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-[#4fa8b2]">
              <div className="text-center">
                <ChevronRight size={40} className="mx-auto mb-2 opacity-60" />
                <p>Sélectionnez une unité pour voir ses détails</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </UnitProvider>
  );
}
