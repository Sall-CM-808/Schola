"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Icônes SVG personnalisées
const SchoolIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
  </svg>
);

const DocumentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
    <path d="M8,12H16V14H8V12M8,16H13V18H8V16Z"/>
  </svg>
);

const CalculatorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7,2H17A2,2 0 0,1 19,4V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V4A2,2 0 0,1 7,2M7,4V8H17V4H7M7,10V12H9V10H7M11,10V12H13V10H11M15,10V12H17V10H15M7,14V16H9V14H7M11,14V16H13V14H11M15,14V16H17V14H15M7,18V20H9V18H7M11,18V20H13V18H11M15,18V20H17V18H15Z"/>
  </svg>
);

const UserCrownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M12,4A0.5,0.5 0 0,0 11.5,4.5A0.5,0.5 0 0,0 12,5A0.5,0.5 0 0,0 12.5,4.5A0.5,0.5 0 0,0 12,4Z"/>
  </svg>
);

interface DemoStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  context: string;
  plan: "Plan 1" | "Plan 2";
}

const demoSteps: DemoStep[] = [
  {
    id: 1,
    title: "Création d'une Unité",
    description: "Créez une unité (école, classe, ou cours) en un clic – parfait pour les administrateurs.",
    icon: <SchoolIcon />,
    context: "École publique créant une nouvelle unité",
    plan: "Plan 1"
  },
  {
    id: 2,
    title: "Upload de Médias",
    description: "Ajoutez des vidéos ou PDF avec stockage gratuit – idéal pour les formateurs.",
    icon: <DocumentIcon />,
    context: "Formateur indépendant uploadant un cours PDF",
    plan: "Plan 1"
  },
  {
    id: 3,
    title: "Gestion Financière",
    description: "Gérez vos entrées/sorties d'argent avec flexibilité comptable.",
    icon: <CalculatorIcon />,
    context: "Université suivant ses finances",
    plan: "Plan 1"
  },
  {
    id: 4,
    title: "Configuration de Rôles et Cours",
    description: "Accès total : attribuez des rôles et publiez des cours avec stockage limité.",
    icon: <UserCrownIcon />,
    context: "École privée configurant un professeur",
    plan: "Plan 2"
  }
];

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-progression des étapes
  useEffect(() => {
    if (!isAutoPlaying || !isOpen) return;
    
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % demoSteps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isOpen]);

  // Reset au fermeture
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setIsAutoPlaying(true);
    }
  }, [isOpen]);

  const nextStep = () => {
    setIsAutoPlaying(false);
    setCurrentStep((prev) => (prev + 1) % demoSteps.length);
  };

  const goToStep = (stepIndex: number) => {
    setIsAutoPlaying(false);
    setCurrentStep(stepIndex);
  };

  // Animation pour l'étape 1 - Création d'unité
  const Step1Animation = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
    >
      <div className="space-y-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative"
        >
          <input
            type="text"
            value="Nouvelle Classe X"
            readOnly
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30"
          />
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(184, 208, 112, 0.3)" }}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93] font-semibold"
        >
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            Ajouter l&apos;unité
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );

  // Animation pour l'étape 2 - Upload de médias
  const Step2Animation = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
    >
      <motion.div
        className="border-2 border-dashed border-white/40 rounded-lg p-8 text-center"
        whileHover={{ borderColor: "rgba(184, 208, 112, 0.6)" }}
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-4"
        >
          <div className="w-16 h-20 mx-auto bg-red-500 rounded-lg flex items-center justify-center text-white font-bold">
            PDF
          </div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-green-400 font-semibold"
        >
          ✓ Fichier chargé !
        </motion.p>
      </motion.div>
    </motion.div>
  );

  // Animation pour l'étape 3 - Gestion financière
  const Step3Animation = () => {
    const [revenue, setRevenue] = useState(500);
    const [expense, setExpense] = useState(200);

    useEffect(() => {
      const timer = setTimeout(() => {
        setRevenue(1000);
        setExpense(300);
      }, 1000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-white/70 text-sm mb-2">Entrées</p>
              <motion.p
                key={revenue}
                initial={{ scale: 1.2, color: "#b8d070" }}
                animate={{ scale: 1, color: "#ffffff" }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-white"
              >
                {revenue}€
              </motion.p>
            </div>
            <div className="text-center">
              <p className="text-white/70 text-sm mb-2">Sorties</p>
              <motion.p
                key={expense}
                initial={{ scale: 1.2, color: "#b8d070" }}
                animate={{ scale: 1, color: "#ffffff" }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-white"
              >
                {expense}€
              </motion.p>
            </div>
          </div>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: "rgba(184, 208, 112, 0.2)",
              boxShadow: "0 0 20px rgba(184, 208, 112, 0.4)"
            }}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93] font-semibold"
          >
            Générer Rapport
          </motion.button>
        </div>
      </motion.div>
    );
  };

  // Animation pour l'étape 4 - Configuration des rôles
  const Step4Animation = () => {
    const [selectedRole, setSelectedRole] = useState("");
    const roles = ["Admin", "Prof", "Étudiant"];

    useEffect(() => {
      const timer = setTimeout(() => {
        setSelectedRole("Prof");
      }, 1000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
      >
        <div className="space-y-4">
          <div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30"
            >
              <option value="">Sélectionner un rôle</option>
              {roles.map((role) => (
                <option key={role} value={role} className="text-black">
                  {role}
                </option>
              ))}
            </select>
          </div>

          {selectedRole && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2 text-green-400"
            >
              <span>✓</span>
              <span>Rôle {selectedRole} attribué</span>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="bg-white/5 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs">
                  VID
                </div>
                <span className="text-white text-sm">Cours 101</span>
              </div>
              <span className="text-orange-400 text-xs">Stockage 80% utilisé</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  const getStepAnimation = (stepId: number) => {
    switch (stepId) {
      case 1: return <Step1Animation />;
      case 2: return <Step2Animation />;
      case 3: return <Step3Animation />;
      case 4: return <Step4Animation />;
      default: return null;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-[#1d8b93] to-[#12666d] rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Bouton de fermeture */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
          >
            ✕
          </button>

          <div className="p-8">
            {/* En-tête */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Démonstration <span className="text-[#b8d070]">Interactive</span>
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Explorez les fonctionnalités clés de Fiinor selon vos besoins
              </p>
            </motion.div>

            {/* Barre de progression */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center mb-8"
            >
              <div className="flex space-x-4">
                {demoSteps.map((step, index) => (
                  <motion.button
                    key={step.id}
                    onClick={() => goToStep(index)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      index === currentStep
                        ? "bg-[#b8d070] text-[#1d8b93] scale-110"
                        : index < currentStep
                        ? "bg-[#b8d070]/60 text-white"
                        : "bg-white/20 text-white/60"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {index + 1}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Contenu de l'étape actuelle */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8"
              >
                {/* Informations de l'étape */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-xl bg-[#b8d070] flex items-center justify-center text-[#1d8b93]">
                      {demoSteps[currentStep].icon}
                    </div>
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-[#b8d070]/20 text-[#b8d070] text-sm font-medium mb-2">
                        {demoSteps[currentStep].plan}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold text-white">
                        {demoSteps[currentStep].title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-lg text-white/90 leading-relaxed">
                    {demoSteps[currentStep].description}
                  </p>

                  <div className="bg-white/10 rounded-lg p-4 border-l-4 border-[#b8d070]">
                    <p className="text-white/80 text-sm">
                      <span className="font-semibold text-[#b8d070]">Contexte :</span> {demoSteps[currentStep].context}
                    </p>
                  </div>
                </div>

                {/* Animation de l'étape */}
                <div className="order-first lg:order-last">
                  {getStepAnimation(demoSteps[currentStep].id)}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Contrôles de navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-4"
            >
              <button
                onClick={nextStep}
                className="px-6 py-3 rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                {currentStep === demoSteps.length - 1 ? "Recommencer" : "Étape suivante"}
              </button>

              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="px-6 py-3 rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                {isAutoPlaying ? "Pause" : "Auto"}
              </button>

              {currentStep === demoSteps.length - 1 && (
                <Link
                  href="/pricing"
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93] font-bold hover:scale-105 transition-transform duration-300"
                >
                  Choisir mon plan
                </Link>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DemoModal;
