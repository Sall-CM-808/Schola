"use client";
import React from "react";
import { useParams } from "next/navigation";
import { unitsTree, Unit } from "@/lib/mocks/adminUnits";
import Link from "next/link";

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

export default function EstablishmentDetailPage() {
  const params = useParams();
  const id = String(params?.id || "");
  const unit = findUnitById(unitsTree, id);

  if (!unit) {
    return <div className="text-white/80">Établissement introuvable</div>;
  }

  const base = `/admin_school/establishments/${encodeURIComponent(id)}`;

  const cards = [
    { key: "overview", label: "Infos générales", href: `${base}/overview` },
    { key: "structure", label: "Structure interne", href: `${base}/structure` },
    { key: "staff", label: "Personnel & Attributions", href: `${base}/staff` },
    { key: "elements", label: "Éléments", href: `${base}/elements` },
    { key: "reports", label: "Rapports", href: `${base}/reports` },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">{unit.name}</h1>
        <p className="text-white/70 text-sm">Code: {unit.code}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link
            key={c.key}
            href={c.href}
            className="group relative p-5 rounded-2xl border border-white/15 backdrop-blur-xl overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.06) 100%)",
            }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#b8d070]/20 blur-2xl"></div>
              <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[#1d8b93]/20 blur-2xl"></div>
            </div>
            <div className="relative">
              <div className="text-white font-semibold">{c.label}</div>
              <div className="text-white/70 text-sm">Accéder</div>
            </div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-[#b8d070]/10 to-transparent"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
