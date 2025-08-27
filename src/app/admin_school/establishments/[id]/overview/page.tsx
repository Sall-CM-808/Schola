"use client";
import React from "react";
import { useParams } from "next/navigation";
import { unitsTree, Unit } from "@/lib/mocks/adminUnits";

function findUnitById(list: Unit[], id: string): Unit | undefined {
  for (const u of list) {
    if (u.id === id) return u;
    if (u.children) {
      const f = findUnitById(u.children, id);
      if (f) return f;
    }
  }
  return undefined;
}

export default function EstablishmentOverviewPage() {
  const params = useParams();
  const id = String(params?.id || "");
  const unit = findUnitById(unitsTree, id);

  if (!unit)
    return <div className="text-white/80">Établissement introuvable</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Infos générales</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white/10 border border-white/20">
          <div className="text-white/70 text-sm">Nom</div>
          <div className="text-white font-semibold">{unit.name}</div>
        </div>
        <div className="p-4 rounded-2xl bg-white/10 border border-white/20">
          <div className="text-white/70 text-sm">Code</div>
          <div className="text-white font-semibold">{unit.code}</div>
        </div>
        <div className="p-4 rounded-2xl bg-white/10 border border-white/20">
          <div className="text-white/70 text-sm">Type</div>
          <div className="text-white font-semibold">{unit.type}</div>
        </div>
        {unit.location && (
          <div className="p-4 rounded-2xl bg-white/10 border border-white/20">
            <div className="text-white/70 text-sm">Localisation</div>
            <div className="text-white font-semibold">{unit.location}</div>
          </div>
        )}
        {unit.email && (
          <div className="p-4 rounded-2xl bg-white/10 border border-white/20">
            <div className="text-white/70 text-sm">Email</div>
            <div className="text-white font-semibold">{unit.email}</div>
          </div>
        )}
        {unit.phone && (
          <div className="p-4 rounded-2xl bg-white/10 border border-white/20">
            <div className="text-white/70 text-sm">Téléphone</div>
            <div className="text-white font-semibold">{unit.phone}</div>
          </div>
        )}
      </div>
      {unit.description && (
        <div className="p-4 rounded-2xl bg-white/10 border border-white/20">
          <div className="text-white/70 text-sm">Description</div>
          <div className="text-white">{unit.description}</div>
        </div>
      )}
    </div>
  );
}
