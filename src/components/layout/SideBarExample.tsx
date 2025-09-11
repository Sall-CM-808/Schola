"use client";

import { useState } from "react";
import SideBar from "./sideBar";
import { Unit } from "@/types/unit";
import { UnitProvider } from "@/contexts/UnitContext";

// Données d'exemple pour la démonstration
const sampleUnits: Unit[] = [
  {
    id: "1",
    name: "École Supérieure de Technologie",
    type: "École",
    path: ["1"],
    children: [
      {
        id: "1-1",
        name: "Département Informatique",
        type: "Département",
        path: ["1", "1-1"],
        children: [
          {
            id: "1-1-1",
            name: "Classe L1 Informatique",
            type: "Classe",
            path: ["1", "1-1", "1-1-1"],
          },
          {
            id: "1-1-2",
            name: "Classe L2 Informatique",
            type: "Classe",
            path: ["1", "1-1", "1-1-2"],
          }
        ]
      },
      {
        id: "1-2",
        name: "Département Mathématiques",
        type: "Département",
        path: ["1", "1-2"],
        children: [
          {
            id: "1-2-1",
            name: "Classe L1 Mathématiques",
            type: "Classe",
            path: ["1", "1-2", "1-2-1"],
          }
        ]
      }
    ]
  },
  {
    id: "2",
    name: "École de Commerce",
    type: "École",
    path: ["2"],
    children: [
      {
        id: "2-1",
        name: "Département Marketing",
        type: "Département",
        path: ["2", "2-1"],
      }
    ]
  }
];

export default function SideBarExample() {
  const [units, setUnits] = useState<Unit[]>(sampleUnits);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  // Gérer la sélection d'une unité
  const handleUnitSelect = (unit: Unit) => {
    console.log("Unité sélectionnée:", unit);
    setSelectedUnit(unit);
  };

  // Gérer l'ajout d'une nouvelle unité
  const handleUnitAdd = (parentId: string | null) => {
    // Dans une application réelle, ouvrir un modal/formulaire pour créer une nouvelle unité
    console.log("Ajouter une unité sous le parent:", parentId);
    
    // Exemple simple d'ajout d'unité (à remplacer par un modal dans une vraie application)
    const newUnitName = prompt("Nom de la nouvelle unité:");
    const newUnitType = prompt("Type d'unité (École, Département, Classe, etc.):");
    
    if (newUnitName && newUnitType) {
      const newUnitId = Date.now().toString();
      
      // Fonction récursive pour ajouter une unité à n'importe quel niveau
      const addUnitToTree = (unitsArray: Unit[], parentId: string | null): Unit[] => {
        if (parentId === null) {
          // Ajouter à la racine
          return [
            ...unitsArray,
            {
              id: newUnitId,
              name: newUnitName,
              type: newUnitType,
              path: [newUnitId],
              children: []
            }
          ];
        }
        
        return unitsArray.map(unit => {
          if (unit.id === parentId) {
            // Ajouter comme enfant de cette unité
            const newChild: Unit = {
              id: newUnitId,
              name: newUnitName,
              type: newUnitType,
              path: [...(unit.path || []), newUnitId],
              parentId: unit.id
            };
            
            return {
              ...unit,
              children: [...(unit.children || []), newChild]
            };
          }
          
          // Continuer la recherche récursive si cette unité a des enfants
          if (unit.children && unit.children.length > 0) {
            return {
              ...unit,
              children: addUnitToTree(unit.children, parentId)
            };
          }
          
          return unit;
        });
      };
      
      setUnits(addUnitToTree(units, parentId));
    }
  };

  return (
    <UnitProvider>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <SideBar
          units={units}
          onUnitSelect={handleUnitSelect}
          onUnitAdd={handleUnitAdd}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
        />
        
        {/* Contenu principal */}
        <main className={`flex-1 p-8 transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'}`}>
          <h1 className="text-2xl font-bold mb-6">Structure Hiérarchique</h1>
          
          {selectedUnit ? (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Détails de l'unité sélectionnée</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">ID</p>
                  <p>{selectedUnit.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Nom</p>
                  <p>{selectedUnit.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
                  <p>{selectedUnit.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Chemin</p>
                  <p>{selectedUnit.path?.join(" > ")}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <p>Sélectionnez une unité dans le sidebar pour voir ses détails.</p>
            </div>
          )}
        </main>
      </div>
    </UnitProvider>
  );
}
