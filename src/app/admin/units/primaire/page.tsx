"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Users, GraduationCap, User } from "lucide-react";

// Mock data pour les classes du primaire (système éducatif guinéen)
const classesPrimaire = [
  {
    id: "1ere",
    nom: "1ère Année",
    effectifs: 28,
    professeur: "Mme Fatou Diallo",
    couleur: "from-blue-400 to-cyan-500",
  },
  {
    id: "2eme",
    nom: "2ème Année",
    effectifs: 32,
    professeur: "M. Amadou Bah",
    couleur: "from-green-400 to-emerald-500",
  },
  {
    id: "3eme",
    nom: "3ème Année",
    effectifs: 30,
    professeur: "Mme Aissatou Camara",
    couleur: "from-purple-400 to-violet-500",
  },
  {
    id: "4eme",
    nom: "4ème Année",
    effectifs: 26,
    professeur: "M. Ibrahim Touré",
    couleur: "from-orange-400 to-red-500",
  },
  {
    id: "5eme",
    nom: "5ème Année",
    effectifs: 24,
    professeur: "Mme Mariama Condé",
    couleur: "from-pink-400 to-rose-500",
  },
  {
    id: "6eme",
    nom: "6ème Année",
    effectifs: 22,
    professeur: "M. Mamadou Sylla",
    couleur: "from-indigo-400 to-blue-500",
  },
];

export default function PrimairePage() {
  return (
    <div className="space-y-8">
      {/* Header compact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#b8d070] to-[#a2c65e] flex items-center justify-center shadow-lg">
            <GraduationCap className="w-6 h-6 text-[#1d8b93]" />
          </div>
          <h1 className="text-3xl font-bold text-white">Primaire</h1>
        </div>
        <p className="text-white/70 text-lg">
          Sélectionnez une classe pour voir les détails
        </p>
      </motion.div>

      {/* Grille des classes centrée */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classesPrimaire.map((classe, index) => (
            <motion.div
              key={classe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative"
            >
              <Link
                href={`/admin/units/primaire/${classe.id}`}
                className="block p-8 rounded-2xl border border-white/20 backdrop-blur-2xl overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)`,
                }}
              >
                {/* Effets de lumière */}
                <div className="absolute inset-0 pointer-events-none">
                  <div
                    className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${classe.couleur} opacity-20 rounded-full blur-2xl transition-all duration-300 group-hover:scale-125`}
                  ></div>
                  <div
                    className={`absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br ${classe.couleur} opacity-30 rounded-full blur-xl transition-all duration-300 group-hover:scale-110`}
                  ></div>
                </div>

                <div className="relative text-center">
                  {/* Icône de la classe */}
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${classe.couleur} flex items-center justify-center shadow-xl`}
                  >
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>

                  {/* Nom de la classe */}
                  <h3 className="text-white font-bold text-xl mb-2">
                    {classe.nom}
                  </h3>

                  {/* Statistiques */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-white/60" />
                        <span className="text-white/80">
                          {classe.effectifs} élèves
                        </span>
                      </div>
                    </div>

                    {/* Professeur */}
                    <div className="pt-3 border-t border-white/10">
                      <div className="flex items-center justify-center gap-2">
                        <User className="w-4 h-4 text-white/60" />
                        <span className="text-white/80 text-sm">
                          {classe.professeur}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${classe.couleur} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
                ></div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
