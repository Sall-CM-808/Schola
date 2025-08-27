"use client";
import React from "react";
import { unitsTree, Unit } from "@/lib/mocks/adminUnits";
import Link from "next/link";
import {
  Building2,
  BarChart3,
  Users,
  Shield,
  Grid3X3,
  GitBranch,
  Search,
  FileBarChart,
  Settings,
} from "lucide-react";

const getEstablishments = (): Unit[] => {
  // Interpréter "Établissements" comme les racines (level 0) ou types de plus haut niveau
  return unitsTree; // racines
};

export default function EstablishmentsPage() {
  const data = getEstablishments();

  // Si un seul établissement, on affiche directement ses cards (sans liste)
  if (data.length === 1) {
    const est = data[0];

    // Ordre demandé avec icônes, couleurs et descriptions
    const cards = [
      {
        key: "dashboard",
        label: "Dashboard",
        description: "Tableau de bord et statistiques",
        href: `/admin_school/dashboard`,
        icon: BarChart3,
        gradient: "from-purple-500/20 to-pink-500/20",
        iconColor: "text-purple-300",
        glowColor: "bg-purple-500/25",
      },
      {
        key: "users",
        label: "Utilisateurs",
        description: "Gestion des comptes utilisateurs",
        href: `/admin_school/users`,
        icon: Users,
        gradient: "from-blue-500/20 to-cyan-500/20",
        iconColor: "text-blue-300",
        glowColor: "bg-blue-500/25",
      },
      {
        key: "roles",
        label: "Rôles & Permissions",
        description: "Gestion des droits d'accès",
        href: `/admin_school/roles-permissions`,
        icon: Shield,
        gradient: "from-emerald-500/20 to-teal-500/20",
        iconColor: "text-emerald-300",
        glowColor: "bg-emerald-500/25",
      },
      {
        key: "elements",
        label: "Éléments",
        description: "Ressources pédagogiques",
        href: `/admin_school/elements`,
        icon: Grid3X3,
        gradient: "from-orange-500/20 to-red-500/20",
        iconColor: "text-orange-300",
        glowColor: "bg-orange-500/25",
      },
      {
        key: "attributions",
        label: "Attributions",
        description: "Affectations et responsabilités",
        href: `/admin_school/attributions`,
        icon: GitBranch,
        gradient: "from-violet-500/20 to-purple-500/20",
        iconColor: "text-violet-300",
        glowColor: "bg-violet-500/25",
      },
      {
        key: "search",
        label: "Recherche avancée",
        description: "Outils de recherche et filtres",
        href: `/admin_school/search`,
        icon: Search,
        gradient: "from-indigo-500/20 to-blue-500/20",
        iconColor: "text-indigo-300",
        glowColor: "bg-indigo-500/25",
      },
      {
        key: "reports",
        label: "Rapports & Export",
        description: "Génération de rapports",
        href: `/admin_school/reports`,
        icon: FileBarChart,
        gradient: "from-pink-500/20 to-rose-500/20",
        iconColor: "text-pink-300",
        glowColor: "bg-pink-500/25",
      },
      {
        key: "settings",
        label: "Paramètres",
        description: "Configuration du système",
        href: `/admin_school/settings`,
        icon: Settings,
        gradient: "from-slate-500/20 to-gray-500/20",
        iconColor: "text-slate-300",
        glowColor: "bg-slate-500/25",
      },
    ];

    return (
      <div className="space-y-12">
        {/* En-tête stylée compacte */}
        <div className="relative overflow-hidden rounded-2xl border border-white/25 bg-white/12 backdrop-blur-xl p-5 shadow-lg">
          <div className="absolute -top-10 -right-8 w-32 h-32 rounded-full bg-[#b8d070]/15 blur-2xl"></div>
          <div className="absolute -bottom-10 -left-8 w-36 h-36 rounded-full bg-[#1d8b93]/15 blur-2xl"></div>
          <div className="relative flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#b8d070] to-[#a2c65e] flex items-center justify-center shadow-lg border border-white/20">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{est.name}</h1>
              <p className="text-white/70 text-sm">Code: {est.code}</p>
            </div>
          </div>
        </div>

        {/* Grille des cards - 4 par rangée sur 2 rangées */}
        <div className="grid grid-cols-4 gap-6">
          {cards.map((card) => {
            const IconComponent = card.icon;
            return (
              <Link
                key={card.key}
                href={card.href}
                className="group relative p-5 rounded-xl border border-white/20 backdrop-blur-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)`,
                }}
              >
                {/* Effets de lumière animés */}
                <div className="absolute inset-0 pointer-events-none">
                  <div
                    className={`absolute -top-8 -right-8 w-24 h-24 rounded-full ${card.glowColor} blur-xl transition-all duration-300 group-hover:scale-125`}
                  ></div>
                </div>

                {/* Gradient overlay au hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-50 transition-all duration-300 rounded-xl`}
                ></div>

                {/* Contenu de la card */}
                <div className="relative flex flex-col items-center gap-4 py-2">
                  <div
                    className={`w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:scale-105 border border-white/20`}
                  >
                    <IconComponent
                      className={`w-6 h-6 ${card.iconColor} transition-colors duration-300`}
                    />
                  </div>

                  <div className="text-center space-y-1">
                    <div className="text-white font-medium text-sm leading-tight transition-all duration-300 group-hover:text-white/90">
                      {card.label}
                    </div>
                    <div className="text-white/60 text-xs leading-tight">
                      {card.description}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  // Sinon, liste des établissements
  return (
    <div className="space-y-8">
      {/* En-tête stylée compacte */}
      <div className="relative overflow-hidden rounded-2xl border border-white/25 bg-white/12 backdrop-blur-xl p-5 shadow-lg">
        <div className="absolute -top-10 -right-8 w-32 h-32 rounded-full bg-[#b8d070]/15 blur-2xl"></div>
        <div className="absolute -bottom-10 -left-8 w-36 h-36 rounded-full bg-[#1d8b93]/15 blur-2xl"></div>
        <div className="relative flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#b8d070] to-[#a2c65e] flex items-center justify-center shadow-lg border border-white/20">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Établissements</h1>
            <p className="text-white/70 text-sm">
              Gestion des établissements et sections clés
            </p>
          </div>
        </div>
      </div>

      {/* Grille des établissements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((est, idx) => (
          <Link
            key={est.id}
            href={`/admin_school/establishments/${encodeURIComponent(est.id)}`}
            className="group relative p-6 rounded-2xl border border-white/20 backdrop-blur-2xl overflow-hidden transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-1"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)`,
            }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div
                className={`absolute -top-12 -right-12 w-40 h-40 rounded-full blur-2xl transition-all duration-500 group-hover:scale-125 ${
                  [
                    "bg-purple-500/25",
                    "bg-blue-500/25",
                    "bg-emerald-500/25",
                    "bg-orange-500/25",
                  ][idx % 4]
                }`}
              ></div>
              <div
                className={`absolute -bottom-8 -left-8 w-32 h-32 rounded-full blur-xl opacity-60 transition-all duration-500 group-hover:scale-110 ${
                  [
                    "bg-pink-500/20",
                    "bg-cyan-500/20",
                    "bg-teal-500/20",
                    "bg-red-500/20",
                  ][idx % 4]
                }`}
              ></div>
            </div>

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                    [
                      "from-purple-500/30 to-pink-500/30",
                      "from-blue-500/30 to-cyan-500/30",
                      "from-emerald-500/30 to-teal-500/30",
                      "from-orange-500/30 to-red-500/30",
                    ][idx % 4]
                  } flex items-center justify-center backdrop-blur-sm border border-white/20`}
                >
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold text-lg">
                    {est.name}
                  </div>
                  <div className="text-white/70 text-sm">Code: {est.code}</div>
                </div>
              </div>
              <span
                className={`px-3 py-1.5 text-xs rounded-full border ${
                  [
                    "bg-purple-500/20 text-purple-200 border-purple-500/40",
                    "bg-blue-500/20 text-blue-200 border-blue-500/40",
                    "bg-emerald-500/20 text-emerald-200 border-emerald-500/40",
                    "bg-orange-500/20 text-orange-200 border-orange-500/40",
                  ][idx % 4]
                }`}
              >
                Établissement
              </span>
            </div>

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${
                  [
                    "from-purple-500/10 to-transparent",
                    "from-blue-500/10 to-transparent",
                    "from-emerald-500/10 to-transparent",
                    "from-orange-500/10 to-transparent",
                  ][idx % 4]
                } rounded-2xl`}
              ></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
