"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle, Sparkles, Crown, Building2 } from "lucide-react";

const PricingSection: React.FC = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });
  const pricingTiers = [
    {
      name: "Plan 1 - Essentiel",
      price: "Gratuit",
      description: "Pour les administrateurs uniquement",
      features: [
        "Accès administrateur uniquement",
        "Pas d'accès parents, étudiants, profs",
        "Création d'unités (écoles, classes)",
        "Gestion financière de base",
        "Stockage gratuit illimité",
        "Support email",
      ],
      highlight: false,
      buttonText: "Commencer gratuitement",
      icon: <Sparkles className="w-6 h-6" />,
      gradient: "from-[#1d8b93] to-[#2a9ca5]",
    },
    {
      name: "Plan 2 - Complet",
      price: "€49/mois",
      description: "Accès total avec toutes les fonctionnalités",
      features: [
        "Accès total (tous les rôles)",
        "Parents, étudiants et professeurs",
        "Publication de cours",
        "Upload de médias (vidéos, PDF)",
        "Configuration des rôles",
        "Stockage limité (50GB)",
        "Support prioritaire",
      ],
      highlight: true,
      buttonText: "Choisir ce plan",
      icon: <Crown className="w-6 h-6" />,
      gradient: "from-[#b8d070] to-[#a2c65e]",
    },
    {
      name: "Plan 3 - Ministère Public",
      price: "Sur mesure",
      description: "Solution dédiée aux institutions publiques",
      features: [
        "Accès spécialisé ministère",
        "Gestion multi-établissements",
        "Reporting avancé",
        "Intégrations gouvernementales",
        "Formation personnalisée",
        "Support dédié 24/7",
        "Conformité réglementaire",
      ],
      highlight: false,
      buttonText: "Discuter avec nous",
      icon: <Building2 className="w-6 h-6" />,
      gradient: "from-[#1d8b93] to-[#2a9ca5]",
    },
  ];

  return (
    <section
      id="tarifs"
      className="relative py-20"
      style={{ backgroundColor: "#1d8b93" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="mb-16 text-center">
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-2xl"
            style={{
              textShadow: '0 4px 20px rgba(184, 208, 112, 0.3), 0 8px 40px rgba(184, 208, 112, 0.1)'
            }}
          >
            <span className="relative inline-block">
              Choisissez votre plan{" "}
              <span className="text-[#b8d070] bg-gradient-to-r from-[#b8d070] to-[#a2c65e] bg-clip-text">
                Fiinor
              </span>
              <motion.span
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#b8d070] to-[#a2c65e]"
                initial={{ width: "0%" }}
                animate={isInView ? { width: "100%" } : { width: "0%" }}
                transition={{ duration: 1.2, delay: 0.5 }}
              />
            </span>
          </motion.h2>
          <motion.p
            ref={subtitleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light tracking-wide drop-shadow-lg"
            style={{
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
            }}
          >
            Des solutions adaptées à chaque établissement éducatif, de l&apos;école privée à l&apos;université.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative rounded-xl p-6 bg-white/10 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 ${
                tier.highlight ? "border-[#b8d070] bg-[#b8d070]/5" : ""
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold bg-[#b8d070] text-[#1d8b93] rounded-full">
                  Recommandé
                </span>
              )}
              <div className="flex items-center mb-4">
                <div className={`p-2 rounded-full bg-gradient-to-br ${tier.gradient}`}>
                  {tier.icon}
                </div>
                <h3 className={`ml-3 text-xl font-semibold ${tier.highlight ? "text-[#b8d070]" : "text-white"}`}>
                  {tier.name}
                </h3>
              </div>
              <div className={`text-2xl font-bold mb-2 ${tier.highlight ? "text-[#b8d070]" : "text-white"}`}>
                {tier.price}
              </div>
              <p className="text-gray-300 text-sm mb-4">{tier.description}</p>
              <ul className="space-y-2 mb-6">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-200">
                    <CheckCircle className="w-5 h-5 mr-2 text-[#b8d070]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(184, 208, 112, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-2 rounded-lg font-medium transition-all duration-200 ${
                  tier.highlight
                    ? "bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93]"
                    : "bg-gradient-to-r from-[#2a9ca5] to-[#1d8b93] text-white"
                }`}
              >
                {tier.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-10 text-center text-gray-300 text-sm"
        >
          <p>
            Besoin d’une solution personnalisée ?{" "}
            <a href="#contact" className="text-[#b8d070] hover:underline font-medium">
              Contactez-nous
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;