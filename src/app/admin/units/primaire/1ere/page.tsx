"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Users,
  Clock,
  GraduationCap,
  User,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
} from "lucide-react";

// Mock data pour la classe 1ère Année avec pagination
const classe1ereData = {
  info: {
    nom: "1ère Année",
    effectifs: 30,
    professeur: "Mme Fatou Diallo",
    salle: "A1",
    annee: "2024-2025",
  },
  eleves: [
    {
      id: 1,
      nom: "Aminata Diallo",
      age: 6,
      sexe: "F",
      moyenne: 15.5,
      numero: "2024001",
    },
    {
      id: 2,
      nom: "Mamadou Bah",
      age: 7,
      sexe: "M",
      moyenne: 14.2,
      numero: "2024002",
    },
    {
      id: 3,
      nom: "Fatoumata Camara",
      age: 6,
      sexe: "F",
      moyenne: 16.8,
      numero: "2024003",
    },
    {
      id: 4,
      nom: "Ibrahim Touré",
      age: 7,
      sexe: "M",
      moyenne: 13.9,
      numero: "2024004",
    },
    {
      id: 5,
      nom: "Aissatou Condé",
      age: 6,
      sexe: "F",
      moyenne: 17.1,
      numero: "2024005",
    },
    {
      id: 6,
      nom: "Ousmane Sylla",
      age: 6,
      sexe: "M",
      moyenne: 14.8,
      numero: "2024006",
    },
    {
      id: 7,
      nom: "Kadiatou Barry",
      age: 7,
      sexe: "F",
      moyenne: 16.2,
      numero: "2024007",
    },
    {
      id: 8,
      nom: "Alpha Baldé",
      age: 6,
      sexe: "M",
      moyenne: 13.5,
      numero: "2024008",
    },
    {
      id: 9,
      nom: "Mariama Keita",
      age: 6,
      sexe: "F",
      moyenne: 15.9,
      numero: "2024009",
    },
    {
      id: 10,
      nom: "Boubacar Diané",
      age: 7,
      sexe: "M",
      moyenne: 14.6,
      numero: "2024010",
    },
    {
      id: 11,
      nom: "Hadja Sow",
      age: 6,
      sexe: "F",
      moyenne: 16.5,
      numero: "2024011",
    },
    {
      id: 12,
      nom: "Mohamed Cissé",
      age: 7,
      sexe: "M",
      moyenne: 13.8,
      numero: "2024012",
    },
    {
      id: 13,
      nom: "Fatimata Traoré",
      age: 6,
      sexe: "F",
      moyenne: 17.3,
      numero: "2024013",
    },
    {
      id: 14,
      nom: "Lansana Conté",
      age: 7,
      sexe: "M",
      moyenne: 15.1,
      numero: "2024014",
    },
    {
      id: 15,
      nom: "Nènè Bangoura",
      age: 6,
      sexe: "F",
      moyenne: 16.7,
      numero: "2024015",
    },
    {
      id: 16,
      nom: "Sékou Doumbouya",
      age: 7,
      sexe: "M",
      moyenne: 14.3,
      numero: "2024016",
    },
    {
      id: 17,
      nom: "Hawa Kourouma",
      age: 6,
      sexe: "F",
      moyenne: 15.6,
      numero: "2024017",
    },
    {
      id: 18,
      nom: "Mamady Kaba",
      age: 7,
      sexe: "M",
      moyenne: 13.7,
      numero: "2024018",
    },
    {
      id: 19,
      nom: "Adama Soumah",
      age: 6,
      sexe: "F",
      moyenne: 16.9,
      numero: "2024019",
    },
    {
      id: 20,
      nom: "Ibrahima Fofana",
      age: 7,
      sexe: "M",
      moyenne: 14.9,
      numero: "2024020",
    },
    {
      id: 21,
      nom: "Djénabou Sidibé",
      age: 6,
      sexe: "F",
      moyenne: 17.0,
      numero: "2024021",
    },
    {
      id: 22,
      nom: "Aboubacar Camara",
      age: 7,
      sexe: "M",
      moyenne: 15.4,
      numero: "2024022",
    },
    {
      id: 23,
      nom: "Ramata Diallo",
      age: 6,
      sexe: "F",
      moyenne: 16.1,
      numero: "2024023",
    },
    {
      id: 24,
      nom: "Thierno Bah",
      age: 7,
      sexe: "M",
      moyenne: 14.0,
      numero: "2024024",
    },
    {
      id: 25,
      nom: "Aminata Koné",
      age: 6,
      sexe: "F",
      moyenne: 16.4,
      numero: "2024025",
    },
    {
      id: 26,
      nom: "Fodé Dioubate",
      age: 7,
      sexe: "M",
      moyenne: 13.6,
      numero: "2024026",
    },
    {
      id: 27,
      nom: "Safiatou Diaby",
      age: 6,
      sexe: "F",
      moyenne: 17.2,
      numero: "2024027",
    },
    {
      id: 28,
      nom: "Alseny Bangoura",
      age: 7,
      sexe: "M",
      moyenne: 15.3,
      numero: "2024028",
    },
    {
      id: 29,
      nom: "Fatoumata Doré",
      age: 6,
      sexe: "F",
      moyenne: 16.6,
      numero: "2024029",
    },
    {
      id: 30,
      nom: "Mamadou Lamarana Diallo",
      age: 7,
      sexe: "M",
      moyenne: 14.7,
      numero: "2024030",
    },
  ],
  cours: [
    {
      id: 1,
      matiere: "Français",
      horaire: "8h00-10h00",
      salle: "A1",
      professeur: "Mme Fatou Diallo",
    },
    {
      id: 2,
      matiere: "Mathématiques",
      horaire: "10h00-12h00",
      salle: "A1",
      professeur: "Mme Fatou Diallo",
    },
    {
      id: 3,
      matiere: "Éveil",
      horaire: "14h00-15h00",
      salle: "A1",
      professeur: "Mme Fatou Diallo",
    },
    {
      id: 4,
      matiere: "Dessin",
      horaire: "15h00-16h00",
      salle: "A2",
      professeur: "M. Amadou Sow",
    },
    {
      id: 5,
      matiere: "Sport",
      horaire: "16h00-17h00",
      salle: "Terrain",
      professeur: "M. Ibrahima Keita",
    },
    {
      id: 6,
      matiere: "Chant",
      horaire: "9h00-10h00",
      salle: "Salle de musique",
      professeur: "Mme Aissatou Bah",
    },
  ],
  emploiTemps: {
    lundi: [
      { heure: "8h00-10h00", matiere: "Français", salle: "A1" },
      { heure: "10h00-12h00", matiere: "Mathématiques", salle: "A1" },
      { heure: "14h00-15h00", matiere: "Éveil", salle: "A1" },
      { heure: "15h00-16h00", matiere: "Sport", salle: "Terrain" },
    ],
    mardi: [
      { heure: "8h00-10h00", matiere: "Mathématiques", salle: "A1" },
      { heure: "10h00-12h00", matiere: "Français", salle: "A1" },
      { heure: "14h00-15h00", matiere: "Dessin", salle: "A2" },
      { heure: "15h00-16h00", matiere: "Lecture", salle: "A1" },
    ],
    mercredi: [
      { heure: "8h00-10h00", matiere: "Français", salle: "A1" },
      { heure: "10h00-12h00", matiere: "Éveil", salle: "A1" },
      { heure: "14h00-15h00", matiere: "Mathématiques", salle: "A1" },
      { heure: "15h00-16h00", matiere: "Chant", salle: "Salle de musique" },
    ],
    jeudi: [
      { heure: "8h00-10h00", matiere: "Mathématiques", salle: "A1" },
      { heure: "10h00-12h00", matiere: "Français", salle: "A1" },
      { heure: "14h00-15h00", matiere: "Dessin", salle: "A2" },
      { heure: "15h00-16h00", matiere: "Sport", salle: "Terrain" },
    ],
    vendredi: [
      { heure: "8h00-10h00", matiere: "Français", salle: "A1" },
      { heure: "10h00-12h00", matiere: "Mathématiques", salle: "A1" },
      { heure: "14h00-15h00", matiere: "Éveil", salle: "A1" },
      { heure: "15h00-16h00", matiere: "Récréation", salle: "Cour" },
    ],
  },
};

const ITEMS_PER_PAGE = 10;

export default function Classe1erePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"eleves" | "cours" | "emploi">(
    "eleves"
  );

  // Pagination des élèves
  const totalPages = Math.ceil(classe1ereData.eleves.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentEleves = classe1ereData.eleves.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      {/* Header avec retour */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Link
          href="/admin/units/primaire"
          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {classe1ereData.info.nom}
            </h1>
            <p className="text-white/70">
              Année scolaire {classe1ereData.info.annee}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Élèves</p>
              <p className="text-white font-bold text-xl">
                {classe1ereData.info.effectifs}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <User className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Professeur</p>
              <p className="text-white font-bold text-sm">
                {classe1ereData.info.professeur}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <MapPin className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Salle</p>
              <p className="text-white font-bold text-xl">
                {classe1ereData.info.salle}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/20">
              <BookOpen className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Matières</p>
              <p className="text-white font-bold text-xl">
                {classe1ereData.cours.length}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Onglets de navigation */}
      <div className="flex gap-2">
        {[
          { id: "eleves" as const, label: "Élèves", icon: Users },
          { id: "cours" as const, label: "Cours", icon: BookOpen },
          { id: "emploi" as const, label: "Emploi du temps", icon: Calendar },
        ].map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-[#b8d070] text-[#1d8b93] shadow-lg"
                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
              }`}
            >
              <IconComponent className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Contenu selon l'onglet actif */}
      {activeTab === "eleves" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              Liste des Élèves
            </h2>
            <span className="px-3 py-1 bg-[#b8d070]/20 text-[#b8d070] text-sm rounded-full">
              {classe1ereData.eleves.length} élèves au total
            </span>
          </div>

          {/* Liste des élèves */}
          <div className="space-y-3 mb-6">
            {currentEleves.map((eleve) => (
              <div
                key={eleve.id}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {eleve.nom.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{eleve.nom}</p>
                    <p className="text-white/60 text-sm">
                      N° {eleve.numero} • {eleve.age} ans •{" "}
                      {eleve.sexe === "F" ? "Fille" : "Garçon"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[#b8d070] font-semibold">
                    {eleve.moyenne}/20
                  </p>
                  <p className="text-white/60 text-sm">Moyenne</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-white/60 text-sm">
                Affichage de {startIndex + 1} à{" "}
                {Math.min(endIndex, classe1ereData.eleves.length)} sur{" "}
                {classe1ereData.eleves.length} élèves
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-2 bg-white/10 rounded-lg text-white/80 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Précédent
                </button>
                <span className="px-3 py-2 bg-[#b8d070] text-[#1d8b93] rounded-lg font-medium">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-3 py-2 bg-white/10 rounded-lg text-white/80 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suivant
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {activeTab === "cours" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
        >
          <h2 className="text-xl font-semibold text-white mb-6">
            Matières Enseignées
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {classe1ereData.cours.map((cours) => (
              <div
                key={cours.id}
                className="p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-white font-semibold">{cours.matiere}</h3>
                  <span className="px-2 py-1 bg-[#b8d070]/20 text-[#b8d070] text-xs rounded-full">
                    {cours.horaire}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-white/70">
                    <MapPin className="w-4 h-4" />
                    <span>Salle: {cours.salle}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <User className="w-4 h-4" />
                    <span>{cours.professeur}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === "emploi" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
        >
          <h2 className="text-xl font-semibold text-white mb-6">
            Emploi du Temps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {Object.entries(classe1ereData.emploiTemps).map(
              ([jour, horaires]) => (
                <div
                  key={jour}
                  className="bg-white/5 rounded-lg p-4 border border-white/10"
                >
                  <h3 className="text-white font-semibold text-center mb-4 capitalize bg-[#b8d070]/20 py-2 rounded">
                    {jour}
                  </h3>
                  <div className="space-y-3">
                    {horaires.map((slot, index) => (
                      <div key={index} className="text-center">
                        <div className="text-white/60 text-xs mb-1">
                          {slot.heure}
                        </div>
                        <div className="px-2 py-2 bg-white/10 rounded text-white text-xs font-medium">
                          {slot.matiere}
                        </div>
                        <div className="text-white/50 text-xs mt-1">
                          {slot.salle}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

