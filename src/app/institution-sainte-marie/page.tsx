import React from "react";
import SideBar from "@/components/layout/sideBar";
import FlexibleHeader from "@/components/layout/DashboardHeader";
import { educationStructure } from "@/examples/educationData";
import { Unit } from "@/types/unit";

export default function SainteMariePage() {
  // Trouver le noeud racine pour Institution Sainte-Marie
  const root: Unit | undefined = educationStructure.find(
    (u) => u.id === "institution-sainte-marie"
  );

  const units = root ? [root] : [];

  return (
    <div className="min-h-screen bg-[#0f3e42]">
      <FlexibleHeader title="Institution Sainte-Marie" />
      <div className="flex">
        {/* Sidebar: parent + enfants */}
        <SideBar units={units} />

        {/* Contenu principal */}
        <main className="flex-1 pt-20 px-6" style={{ paddingLeft: "var(--sidebar-width, 0px)" }}>
          <section className="max-w-6xl mx-auto">
            <h2 className="text-white text-xl font-semibold mb-4">Aperçu hiérarchique</h2>
            <p className="text-[#b8e2e6] text-sm">
              Cette page présente la hiérarchie: l&apos;école et ses trois cycles (Primaire, Collège, Lycée).
              Sélectionne une unité dans la barre latérale pour continuer.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
