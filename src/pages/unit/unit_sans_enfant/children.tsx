"use client";

import { useState, useEffect } from "react";
import { Unit } from "@/types/unit";
import {
  GraduationCap,
  School,
  BookOpen,
  Users,
  ChevronRight,
} from "lucide-react";

interface UnitChildrenProps {
  unit: Unit;
  onSelectChild: (child: Unit) => void;
}

export default function UnitChildren({
  unit,
  onSelectChild,
}: UnitChildrenProps) {
  const [children, setChildren] = useState<Unit[]>([]);

  useEffect(() => {
    // Charger les unités enfants directes
    setChildren(unit.children || []);
  }, [unit]);

  const getUnitIcon = (unitType: string) => {
    switch (unitType) {
      case "université":
      case "école":
        return <School size={20} className="text-blue-400" />;
      case "faculté":
      case "cycle":
        return <BookOpen size={20} className="text-green-400" />;
      case "département":
      case "niveau":
        return <BookOpen size={20} className="text-yellow-400" />;
      case "licence":
      case "classe":
        return <GraduationCap size={20} className="text-purple-400" />;
      case "semestre":
        return <BookOpen size={20} className="text-orange-400" />;
      case "lycée":
        return <School size={20} className="text-indigo-400" />;
      default:
        return <Users size={20} className="text-[rgba(255,255,255,0.70)]" />;
    }
  };

  const getUnitTypeLabel = (unitType: string) => {
    const labels: Record<string, string> = {
      université: "Université",
      école: "École",
      faculté: "Faculté",
      cycle: "Cycle",
      département: "Département",
      niveau: "Niveau",
      licence: "Licence",
      classe: "Classe",
      semestre: "Semestre",
    };
    return labels[unitType] || unitType;
  };

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="bg-[rgba(255,255,255,0.06)] rounded-lg shadow-sm border border-[rgba(255,255,255,0.14)] p-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          Unités Enfants - {unit.name}
        </h1>
        <p className="text-[rgba(255,255,255,0.70)]">
          {children.length > 0
            ? `${children.length} unité(s) enfant(s) directe(s)`
            : "Aucune unité enfant"}
        </p>
      </div>

      {/* Liste des unités enfants */}
      {children.length > 0 ? (
        <div className="bg-[rgba(255,255,255,0.06)] rounded-lg shadow-sm border border-[rgba(255,255,255,0.14)] p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Liste des Unités
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {children.map((child) => (
              <div
                key={child.id}
                onClick={() => onSelectChild(child)}
                className="p-4 border border-[rgba(255,255,255,0.14)] rounded-lg hover:border-[#b8d070] hover:shadow-md cursor-pointer transition-all group bg-[rgba(255,255,255,0.05)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="flex-shrink-0 mt-1">
                      {getUnitIcon(child.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-white group-hover:text-[#b8d070] transition-colors">
                        {child.name}
                      </h3>
                      <p className="text-xs text-[rgba(255,255,255,0.70)] mt-1">
                        {getUnitTypeLabel(child.type)}
                      </p>
                      {child.badge && (
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#b8d070] text-[#1d8b93]">
                            {child.badge}{" "}
                            {child.type === "classe" ? "élèves" : "éléments"}
                          </span>
                        </div>
                      )}
                      {child.children && child.children.length > 0 && (
                        <p className="text-xs text-[rgba(255,255,255,0.55)] mt-1">
                          {child.children.length} sous-unité(s)
                        </p>
                      )}
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-[rgba(255,255,255,0.70)] group-hover:text-[#b8d070] transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-[rgba(255,255,255,0.06)] rounded-lg shadow-sm border border-[rgba(255,255,255,0.14)] p-12 text-center">
          <div className="text-[rgba(255,255,255,0.70)] mb-4">
            <Users size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            Aucune unité enfant
          </h3>
          <p className="text-[rgba(255,255,255,0.70)]">
            Cette unité ne contient pas d'unités enfants directes.
          </p>
        </div>
      )}

      {/* Statistiques rapides */}
      {children.length > 0 && (
        <div className="bg-[rgba(255,255,255,0.06)] rounded-lg shadow-sm border border-[rgba(255,255,255,0.14)] p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Statistiques
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{children.length}</p>
              <p className="text-sm text-[rgba(255,255,255,0.70)]">
                Total unités
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">
                {children.reduce(
                  (sum, child) => sum + (child.children?.length || 0),
                  0
                )}
              </p>
              <p className="text-sm text-[rgba(255,255,255,0.70)]">
                Sous-unités
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">
                {children.reduce(
                  (sum, child) =>
                    sum + (typeof child.badge === "number" ? child.badge : 0),
                  0
                )}
              </p>
              <p className="text-sm text-[rgba(255,255,255,0.70)]">
                Total éléments
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">
                {new Set(children.map((child) => child.type)).size}
              </p>
              <p className="text-sm text-[rgba(255,255,255,0.70)]">
                Types différents
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
