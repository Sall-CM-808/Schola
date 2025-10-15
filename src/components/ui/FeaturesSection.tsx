"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Feature: React.FC<FeatureProps> = ({
  icon,
  title,
  description,
  delay,
}) => {
  const featureRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (featureRef.current) {
      observer.observe(featureRef.current);
    }

    return () => {
      if (featureRef.current) {
        observer.unobserve(featureRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={featureRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
      transition={{
        duration: 0.6,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden rounded-2xl p-7 border border-white/15 backdrop-blur-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] transition-all duration-500"
      style={{
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2), 0 4px 20px rgba(184, 208, 112, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
      whileHover={{
        y: -8,
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 8px 30px rgba(184, 208, 112, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        transition: { duration: 0.3 }
      }}
    >
      {/* Ambient Glow Effect */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#b8d070]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#b8d070]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 delay-100"></div>

      {/* Decorative Corners */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: (delay + 300) / 1000, duration: 0.4 }}
        className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-[#b8d070]/60 rounded-tr-xl transition-all duration-500 group-hover:border-[#b8d070] group-hover:w-12 group-hover:h-12"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: (delay + 350) / 1000, duration: 0.4 }}
        className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white/40 rounded-bl-xl transition-all duration-500 group-hover:border-white/60"
      ></motion.div>

      {/* Icon Container */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{
          delay: (delay + 100) / 1000,
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{ scale: 1.08, rotate: 3 }}
        className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#b8d070]/40 to-[#b8d070]/15 flex items-center justify-center mb-5 shadow-md group-hover:shadow-lg transition-all duration-500"
      >
        <div className="text-[#b8d070] transition-transform duration-500">{icon}</div>
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{
          delay: (delay + 150) / 1000,
          duration: 0.5,
          ease: "easeOut",
        }}
        className="text-lg font-bold text-white mb-3 tracking-tight transition-colors duration-500 group-hover:text-[#b8d070]"
      >
        {title}
      </motion.h3>

      {/* Description - Enhanced Typography */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{
          delay: (delay + 200) / 1000,
          duration: 0.5,
          ease: "easeOut",
        }}
        className="text-gray-300 text-sm leading-relaxed font-light tracking-wide mb-5 transition-colors duration-500 group-hover:text-gray-100 line-clamp-3"
      >
        {description}
      </motion.p>

      {/* Button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{
          delay: (delay + 250) / 1000,
          duration: 0.5,
          ease: "easeOut",
        }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#b8d070] via-[#a8cb64] to-[#a2c65e] text-[#1d8b93] font-bold text-sm shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        Explorer
      </motion.button>

      {/* Border Glow on Hover */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_20px_rgba(184,208,112,0.1)]"></div>
    </motion.div>
  );
};

const FeaturesSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [isInView, setIsInView] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const el = titleRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      title: "Gestion des Utilisateurs et Rôles",
      description: "Créez des comptes sécurisés pour admins, profs et parents avec des accès adaptés à chaque profil.",
      delay: 100,
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
        </svg>
      ),
      title: "Organisation des Structures Scolaires",
      description: "Structurez vos écoles, classes et niveaux dans une hiérarchie flexible et entièrement personnalisable.",
      delay: 150,
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
        </svg>
      ),
      title: "Suivi des Assiduités",
      description: "Enregistrez les présences en temps réel avec des rapports détaillés et des statistiques précises.",
      delay: 200,
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      title: "Gestion des Devoirs et Notes",
      description: "Attribuez devoirs et notes avec calcul automatique des moyennes et suivis académiques.",
      delay: 250,
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0018 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
        </svg>
      ),
      title: "Communication (Alertes et Annonces)",
      description: "Envoyez des alertes texto, emails et annonces instantanées en temps réel à tous les acteurs.",
      delay: 300,
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0121 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
        </svg>
      ),
      title: "Planning Collaboratif (Emploi du Temps)",
      description: "Planifiez sans conflits et synchronisez en temps réel avec tous les établissements et acteurs.",
      delay: 350,
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Gestion des Inscriptions et Admissions",
      description: "Simplifiez les inscriptions pour écoles, universités, centres de formation et formateurs indépendants.",
      delay: 400,
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
      title: "Rapports et Statistiques Analytiques",
      description: "Générez des rapports détaillés avec statistiques avancées, adaptés à chaque type d'utilisateur.",
      delay: 450,
    },
  ];

  return (
    <section id="fonctionnalites" className="relative py-20 bg-[#1d8b93] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#b8d070]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#b8d070]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
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
              Fonctionnalités{" "}
              <span className="text-[#b8d070] bg-gradient-to-r from-[#b8d070] to-[#a2c65e] bg-clip-text text-transparent">
                Essentielles
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
            Découvrez les outils puissants qui transformeront la gestion de votre établissement en une expérience fluide, moderne et entièrement maîtrisée.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;