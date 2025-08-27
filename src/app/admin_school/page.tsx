"use client";
import React from "react";
import Link from "next/link";
import {
  Building2,
  BarChart3,
  Users,
  Shield,
  FileText,
  Settings,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const primaryCards = [
  {
    href: "/admin_school/establishments",
    label: "Établissements",
    description: "Gérer les structures éducatives",
    icon: Building2,
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    glowColor: "emerald-500",
    size: "large",
  },
  {
    href: "/admin_school/dashboard",
    label: "Analytics",
    description: "Tableau de bord et statistiques",
    icon: BarChart3,
    gradient: "from-violet-400 via-purple-500 to-indigo-600",
    glowColor: "purple-500",
    size: "medium",
  },
  {
    href: "/admin_school/users",
    label: "Utilisateurs",
    description: "Gestion des comptes",
    icon: Users,
    gradient: "from-blue-400 via-sky-500 to-cyan-600",
    glowColor: "blue-500",
    size: "medium",
  },
];

const secondaryCards = [
  {
    href: "/admin_school/roles-permissions",
    label: "Permissions",
    icon: Shield,
    gradient: "from-orange-400 to-red-500",
    glowColor: "orange-500",
  },
  {
    href: "/admin_school/reports",
    label: "Rapports",
    icon: FileText,
    gradient: "from-pink-400 to-rose-500",
    glowColor: "pink-500",
  },
  {
    href: "/admin_school/settings",
    label: "Paramètres",
    icon: Settings,
    gradient: "from-slate-400 to-gray-500",
    glowColor: "slate-500",
  },
];

export default function AdminSchoolHome() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#b8d070]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-1/3 w-80 h-80 bg-[#1d8b93]/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 space-y-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 py-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm">
            <Sparkles className="w-4 h-4" />
            Administration Scolaire
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            <span className="bg-gradient-to-r from-white via-[#b8d070] to-white bg-clip-text text-transparent">
              Tableau de Bord
            </span>
          </h1>

          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Gérez efficacement votre écosystème éducatif avec des outils
            modernes et intuitifs
          </p>
        </motion.div>

        {/* Primary Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4"
        >
          {/* Large Card */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="lg:col-span-2"
          >
            <Link
              href={primaryCards[0].href}
              className="group relative block h-80 rounded-3xl border border-white/20 backdrop-blur-2xl overflow-hidden transition-all duration-700 shadow-2xl hover:shadow-emerald-500/25"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)`,
              }}
            >
              {/* Animated background */}
              <div className="absolute inset-0">
                <div
                  className={`absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br ${primaryCards[0].gradient} opacity-20 rounded-full blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:opacity-30`}
                ></div>
                <div
                  className={`absolute -bottom-16 -left-16 w-64 h-64 bg-${primaryCards[0].glowColor}/20 rounded-full blur-2xl transition-all duration-700 group-hover:scale-110`}
                ></div>
              </div>

              <div className="relative h-full flex flex-col justify-between p-8">
                <div className="flex items-start justify-between">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${primaryCards[0].gradient} flex items-center justify-center shadow-xl`}
                  >
                    {React.createElement(primaryCards[0].icon, {
                      className: "w-8 h-8 text-white",
                    })}
                  </div>
                  <ChevronRight className="w-6 h-6 text-white/60 transition-all duration-300 group-hover:text-white group-hover:translate-x-1" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-3xl font-bold text-white">
                    {primaryCards[0].label}
                  </h3>
                  <p className="text-white/70 text-lg">
                    {primaryCards[0].description}
                  </p>
                </div>
              </div>

              {/* Hover overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${primaryCards[0].gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}
              ></div>
            </Link>
          </motion.div>

          {/* Medium Cards */}
          <div className="space-y-6">
            {primaryCards.slice(1).map((card, idx) => (
              <motion.div
                key={card.href}
                whileHover={{ y: -4, scale: 1.02 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
              >
                <Link
                  href={card.href}
                  className="group relative block h-36 rounded-2xl border border-white/20 backdrop-blur-2xl overflow-hidden transition-all duration-500 shadow-xl hover:shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)`,
                  }}
                >
                  <div className="absolute inset-0">
                    <div
                      className={`absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br ${card.gradient} opacity-25 rounded-full blur-2xl transition-all duration-500 group-hover:scale-125`}
                    ></div>
                  </div>

                  <div className="relative h-full flex flex-col justify-between p-6">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg`}
                      >
                        {React.createElement(card.icon, {
                          className: "w-6 h-6 text-white",
                        })}
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/60 transition-all duration-300 group-hover:text-white group-hover:translate-x-1" />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {card.label}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Secondary Actions */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="px-4"
        >
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Actions rapides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {secondaryCards.map((card, idx) => (
              <motion.div
                key={card.href}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
              >
                <Link
                  href={card.href}
                  className="group relative block p-6 rounded-xl border border-white/15 backdrop-blur-xl overflow-hidden transition-all duration-400 shadow-lg hover:shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)`,
                  }}
                >
                  <div className="absolute inset-0">
                    <div
                      className={`absolute -top-4 -right-4 w-20 h-20 bg-${card.glowColor}/20 rounded-full blur-xl transition-all duration-400 group-hover:scale-125`}
                    ></div>
                  </div>

                  <div className="relative flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-md`}
                    >
                      {React.createElement(card.icon, {
                        className: "w-5 h-5 text-white",
                      })}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{card.label}</h3>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/50 transition-all duration-300 group-hover:text-white group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
