"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Code, Headphones, Palette } from "lucide-react";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  description: string;
  delay: number;
  icon: React.ReactNode;
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  role,
  image,
  description,
  delay,
  icon,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.05,
        rotate: delay % 200 === 0 ? 1 : -1,
        boxShadow: "0px 10px 20px rgba(184, 208, 112, 0.3)",
      }}
      className="relative rounded-xl p-8 bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-[#0d5a61]/30"
    >
      <div className="absolute top-2 right-2 w-12 h-12 border-t-2 border-r-2 border-[#b8d070] rounded-tr-xl opacity-80 animate-border-pulse"></div>
      <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-white rounded-bl-xl opacity-60 animate-border-pulse animation-delay-2000"></div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#b8d070] shadow-lg mx-auto mb-6"
      >
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </motion.div>

      <div className="flex items-center justify-center mb-2">
        <div className="text-[#b8d070] mr-2">{icon}</div>
        <h3 className="text-2xl font-bold text-white text-center">{name}</h3>
      </div>
      <p className="text-[#b8d070] text-sm text-center mb-4">{role}</p>
      <p className="text-gray-200 text-sm text-center">{description}</p>
    </motion.div>
  );
};

const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: "Aïssa Ndiaye",
      role: "Directrice Générale",
      image: "https://randomuser.me/api/portraits/women/85.jpg?nat=sn",
      description:
        "Spécialiste reconnue en optimisation des systèmes éducatifs, avec plus de 15 ans d'expertise stratégique.",
      delay: 100,
      icon: <Briefcase size={20} />,
    },
    {
      name: "Kwame Adjei",
      role: "Directeur Technique",
      image: "https://randomuser.me/api/portraits/men/92.jpg?nat=gh",
      description:
        "Ingénieur de pointe, leader dans le développement de solutions technologiques éducatives innovantes.",
      delay: 200,
      icon: <Code size={20} />,
    },
    {
      name: "Nia Touré",
      role: "Responsable du Support Client",
      image: "https://randomuser.me/api/portraits/women/78.jpg?nat=ml",
      description:
        "Expertise dédiée à la satisfaction client, offrant un service d'assistance de haut niveau.",
      delay: 300,
      icon: <Headphones size={20} />,
    },
    {
      name: "Malik Bah",
      role: "Designer Expérience Utilisateur",
      image: "https://randomuser.me/api/portraits/men/80.jpg?nat=ng",
      description:
        "Créateur d'interfaces élégantes, optimisées pour une expérience utilisateur exceptionnelle.",
      delay: 400,
      icon: <Palette size={20} />,
    },
  ];

  return (
    <section
      id="equipe"
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: "#1d8b93" }}
    >
      {/* Bulles animées en arrière-plan (identiques à FeaturesSection) */}
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
              Notre Équipe d'Experts
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#b8d070] to-[#a2c65e] transition-all duration-1000 animate-underline"></span>
            </span>
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Une équipe de professionnels dévoués à l'excellence en gestion
            éducative.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
