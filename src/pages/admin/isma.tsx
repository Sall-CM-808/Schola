"use client";

import React, { useMemo } from "react";
import SideBar from "@/components/layout/sideBar";
import { educationStructure } from "@/examples/educationData";
import { Calendar, Award, Users, GraduationCap, ChevronRight } from "lucide-react";

export default function AdminIsmaDashboard() {
  // Données fixes demandées
  const totalEleves = 450;
  const totalEnseignants = 35;
  const nextActivity = {
    title: "Réunion Pédagogique",
    date: "05/10/2025",
  };

  const sexes = {
    garcons: { value: 230, pct: 51 },
    filles: { value: 220, pct: 49 },
  };

  const cycles = [
    { label: "Primaire", value: 150 },
    { label: "Collège", value: 180 },
    { label: "Lycée", value: 120 },
  ];

  const nowText = useMemo(() => {
    const now = new Date();
    // Exemple: Wednesday, October 01, 2025, 03:36 PM GMT
    const datePart = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
    const timePart = now
      .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      .replace(/:/, ":");
    const tz = "GMT"; // Affichage simple GMT
    return `${datePart}, ${timePart} ${tz}`;
  }, []);

  return (
    <div className="min-h-screen bg-[#0f2e33] text-white" style={{
      backgroundImage:
        "radial-gradient(1200px 600px at -10% -10%, rgba(79,168,178,0.18) 0%, transparent 60%)," +
        "radial-gradient(900px 500px at 110% 10%, rgba(184,208,112,0.15) 0%, transparent 60%)," +
        "linear-gradient(180deg, #0c2327 0%, #0f2e33 60%, #0f2e33 100%)",
    }}>
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 z-50">
          <SideBar
            units={educationStructure}
            onUnitSelect={() => {}}
            onUnitAdd={() => {}}
            collapsed={false}
            onToggleCollapse={() => {}}
          />
        </div>

        {/* Contenu */}
        <main className="flex-1" style={{ marginLeft: "var(--sidebar-width, 320px)" }}>
          <div className="p-6 md:p-8 space-y-6">
            {/* En-tête holographique */}
            <div className="relative rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl p-6 overflow-hidden shadow-xl">
              <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-70"
                   style={{
                     background:
                       "conic-gradient(from 180deg at 30% 10%, rgba(79,168,178,0.25), rgba(184,208,112,0.25), rgba(79,168,178,0.25))",
                     filter: "blur(40px)",
                   }}
              />
              <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <span className="inline-flex items-center gap-2 px-2 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      <Award size={14} /> Admin • Institution Sainte‑Marie
                    </span>
                  </div>
                  <h1 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight">Tableau de bord futuriste</h1>
                  <p className="text-white/80 mt-1">{nowText}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="rounded-xl p-4 bg-green-500/20 text-green-300 border border-green-500/30 shadow-lg hover:shadow-emerald-500/10 transition-transform duration-300 hover:scale-[1.01]">
                    <p className="text-xs text-white/80">Élèves</p>
                    <p className="text-3xl font-bold text-white">{totalEleves}</p>
                  </div>
                  <div className="rounded-xl p-4 bg-indigo-600/25 text-indigo-200 border border-indigo-400/40 shadow-lg hover:shadow-indigo-500/10 transition-transform duration-300 hover:scale-[1.01]">
                    <p className="text-xs text-white/80">Enseignants</p>
                    <p className="text-3xl font-bold text-white">{totalEnseignants}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ligne KPI colorées */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl p-5 border border-orange-500/30 bg-orange-500/20 text-orange-300 backdrop-blur-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/85">Prochaine activité</p>
                    <p className="mt-1 text-lg font-semibold text-white flex items-center gap-2">
                      <Calendar size={16} className="opacity-80" /> {nextActivity.title}
                    </p>
                    <p className="text-white/80 text-sm mt-1">{nextActivity.date}</p>
                  </div>
                  <div className="hidden md:block text-white/70">
                    <ChevronRight />
                  </div>
                </div>
              </div>

              <div className="rounded-xl p-5 border border-green-500/30 bg-green-500/20 text-green-300 backdrop-blur-xl shadow-sm">
                <p className="text-sm text-white/85">Sexe • Répartition</p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-lg p-3 bg-white/5 border border-white/10">
                    <p className="text-xs text-white/70">Garçons</p>
                    <p className="text-xl font-bold text-white">{sexes.garcons.value}</p>
                    <p className="text-xs text-white/70">{sexes.garcons.pct}%</p>
                  </div>
                  <div className="rounded-lg p-3 bg-white/5 border border-white/10">
                    <p className="text-xs text-white/70">Filles</p>
                    <p className="text-xl font-bold text-white">{sexes.filles.value}</p>
                    <p className="text-xs text-white/70">{sexes.filles.pct}%</p>
                  </div>
                </div>
                {/* barre empilée */}
                <div className="mt-3 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-blue-500/60" style={{ width: `${sexes.garcons.pct}%` }} />
                  <div className="h-full bg-pink-500/60 -mt-2" style={{ width: `${sexes.filles.pct}%` }} />
                </div>
              </div>

              <div className="rounded-xl p-5 border border-indigo-400/40 bg-indigo-600/25 text-indigo-200 backdrop-blur-xl shadow-sm">
                <p className="text-sm text-white/85">Niveau d&apos;excellence</p>
                <div className="mt-3 flex items-center gap-4">
                  <div className="relative w-20 h-20">
                    {/* anneau holographique */}
                    <svg viewBox="0 0 42 42" className="w-20 h-20">
                      <defs>
                        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#4fa8b2" stopOpacity="0.9"/>
                          <stop offset="100%" stopColor="#b8d070" stopOpacity="0.9"/>
                        </linearGradient>
                      </defs>
                      <circle r="16" cx="21" cy="21" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                      <circle r="16" cx="21" cy="21" fill="transparent" stroke="url(#g1)" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${72} ${100-72}`} transform="rotate(90 21 21)" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-white font-semibold">72%</span>
                  </div>
                  <div>
                    <p className="text-white/80 text-sm">Indice d&apos;excellence global</p>
                    <p className="text-xs text-white/70">Basé sur l&apos;engagement, les résultats et l&apos;activité récente</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Répartition par cycle + cartes d\'ensemble */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="rounded-2xl p-5 border border-white/15 bg-white/10 backdrop-blur-xl lg:col-span-2">
                <p className="text-white font-semibold mb-3">Répartition par cycle</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {cycles.map((c) => (
                    <div key={c.label} className="rounded-xl p-4 bg-white/5 border border-white/10">
                      <p className="text-sm text-white/80">{c.label}</p>
                      <p className="text-2xl font-bold text-white mt-1">{c.value}</p>
                      {/* barres animées */}
                      <div className="mt-3 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-green-500/60 animate-[pulse_2s_ease-in-out_infinite]" style={{ width: `${Math.min(100, (c.value/200)*100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-5 border border-white/15 bg-white/10 backdrop-blur-xl">
                <p className="text-white font-semibold mb-3">Vue d&apos;ensemble</p>
                <div className="space-y-3">
                  <div className="rounded-xl p-4 bg-green-500/20 text-green-300 border border-green-500/30 flex items-center gap-3">
                    <Users size={18} className="opacity-80" />
                    <div>
                      <p className="text-sm text-white/80">Élèves</p>
                      <p className="text-xl font-bold text-white">{totalEleves}</p>
                    </div>
                  </div>
                  <div className="rounded-xl p-4 bg-indigo-600/25 text-indigo-200 border border-indigo-400/40 flex items-center gap-3">
                    <GraduationCap size={18} className="opacity-80" />
                    <div>
                      <p className="text-sm text-white/80">Enseignants</p>
                      <p className="text-xl font-bold text-white">{totalEnseignants}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
