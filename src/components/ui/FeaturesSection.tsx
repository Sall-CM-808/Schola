"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useClientSideAnimations } from "@/hooks/useClientSideAnimations";

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-in");
            }, delay);
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
  }, [delay]);

  return (
    <motion.div
      ref={featureRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.05,
        rotate: delay % 200 === 0 ? 1 : -1,
        boxShadow: "0px 10px 20px rgba(184, 208, 112, 0.3)",
      }}
      className="relative bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-[#0d5a61]/30 hover:-translate-y-2 opacity-0 translate-y-8"
    >
      <div className="absolute top-2 right-2 w-12 h-12 border-t-2 border-r-2 border-[#b8d070] rounded-tr-xl opacity-80 animate-border-pulse"></div>
      <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-white rounded-bl-xl opacity-60 animate-border-pulse animation-delay-2000"></div>

      <div className="w-16 h-16 rounded-lg bg-[#b8d070]/20 flex items-center justify-center mb-6 transition-all duration-300 hover:bg-[#b8d070]/30">
        <div className="text-[#b8d070] transition-transform duration-300 hover:scale-110">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-4 transition-all duration-300 hover:text-[#b8d070]">
        {title}
      </h3>
      <p className="text-gray-200 text-sm transition-all duration-300 hover:text-gray-100">
        {description}
      </p>
    </motion.div>
  );
};

const FeaturesSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const isClient = useClientSideAnimations();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (subtitleRef.current) observer.observe(subtitleRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (subtitleRef.current) observer.unobserve(subtitleRef.current);
    };
  }, []);

  const features = [
    {
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      title: "Gestion des Utilisateurs",
      description: "Gérez les rôles et interfaces adaptées.",
      delay: 100,
    },
    {
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
      title: "Évaluations et Notes",
      description: "Suivez les performances et statistiques.",
      delay: 200,
    },
    {
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Planification et Emplois",
      description: "Créez des emplois du temps et notifications.",
      delay: 300,
    },
    {
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
          />
        </svg>
      ),
      title: "Communication Intégrée",
      description: "Facilitez les échanges et notifications.",
      delay: 400,
    },
  ];

  return (
    <section
      id="fonctionnalites"
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: "#1d8b93" }}
    >
      {isClient && (
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
      )}

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
              Fonctionnalités clés
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#b8d070] to-[#a2c65e] transition-all duration-1000 animate-underline"></span>
            </span>
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Transformez la gestion de votre établissement.
          </p>
        </motion.div>

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
