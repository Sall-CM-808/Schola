"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const PricingSection = () => {
  const pricingTiers = [
    {
      name: "Starter",
      price: "Gratuit",
      description: "Idéal pour les petites écoles",
      features: [
        "Gestion des élèves",
        "3 enseignants",
        "Support email",
        "1GB stockage",
      ],
      highlight: false,
    },
    {
      name: "Pro",
      price: "€29/mois",
      description: "Pour les établissements moyens",
      features: [
        "Gestion avancée",
        "20 enseignants",
        "Support prioritaire",
        "10GB stockage",
        "Rapports",
      ],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Sur mesure",
      description: "Pour les grands réseaux",
      features: [
        "Gestion complète",
        "Utilisateurs illimités",
        "Support 24/7",
        "Intégrations",
        "Formation",
      ],
      highlight: false,
    },
  ];

  return (
    <section
      id="tarifs"
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: "#1d8b93" }}
    >
      {/* Bulles animées en arrière-plan */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              backgroundColor: "#b8d070",
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 50],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="relative inline-block">
              Nos plans tarifaires
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#b8d070] to-[#a2c65e] transition-all duration-1000 animate-underline"></span>
            </span>
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Choisissez le plan adapté à vos besoins institutionnels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                rotate: index % 2 === 0 ? 1 : -1, // Légère rotation alternée
                boxShadow: "0px 10px 20px rgba(184, 208, 112, 0.3)",
              }}
              className={`relative rounded-xl p-8 bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-300 ${
                tier.highlight ? "border-2 border-[#b8d070]" : ""
              }`}
              style={{ transform: `translateY(${index * 20}px)` }} // Mode escalier
            >
              {tier.highlight && (
                <div className="absolute top-2 left-2 px-3 py-1 text-sm font-semibold rounded-full bg-[#b8d070] text-[#1d8b93] shadow-md">
                  Recommandé
                </div>
              )}

              <h3
                className={`text-2xl font-bold mb-3 ${
                  tier.highlight ? "text-[#b8d070]" : "text-white"
                }`}
              >
                {tier.name}
              </h3>

              <div
                className={`text-4xl font-bold mb-4 ${
                  tier.highlight ? "text-[#b8d070]" : "text-white"
                }`}
              >
                {tier.price}
              </div>

              <p className="text-white/80 text-sm mb-5">{tier.description}</p>

              <ul className="space-y-2 mb-6">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center text-white/90 text-sm"
                  >
                    <CheckCircle
                      className="mr-2"
                      size={18}
                      color={tier.highlight ? "#b8d070" : "#ffffff"}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                  tier.highlight
                    ? "bg-[#b8d070] text-[#1d8b93] hover:bg-[#a2c65e]"
                    : "bg-white/10 text-white hover:bg-white/20"
                } text-base`}
              >
                Sélectionner ce plan
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-10 text-center text-white/80 text-sm"
        >
          <p>
            Besoin d'une solution personnalisée ?{" "}
            <a
              href="#contact"
              className="text-[#b8d070] hover:underline font-medium"
            >
              Contactez-nous
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
