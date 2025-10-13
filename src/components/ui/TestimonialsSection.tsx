"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useClientSideAnimations } from "@/hooks/useClientSideAnimations";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialProps {
  name: string;
  role: string;
  image: string;
  text: string;
}

const TestimonialsSection: React.FC = () => {
  const isClient = useClientSideAnimations();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials: TestimonialProps[] = [
    {
      name: "Aminata Sow",
      role: "Directrice d'école",
      text: "Schola a transformé notre gestion. Interface intuitive et communication améliorée.",
      image: "https://randomuser.me/api/portraits/women/72.jpg?nat=ng", // Femme noire jeune
    },
    {
      name: "Kofi Mensah",
      role: "Professeur de sciences",
      text: "La gestion des notes est simple. Suivi des élèves et rapports détaillés facilités.",
      image: "https://randomuser.me/api/portraits/men/88.jpg?nat=gh", // Homme noir jeune
    },
    {
      name: "Fatou Diop",
      role: "Parent d'élève",
      text: "Transparence appréciable. Suivi des progrès et communication facile avec les professeurs.",
      image: "https://randomuser.me/api/portraits/women/90.jpg?nat=sn", // Femme noire jeune
    },
  ];

  // Fonction pour passer au témoignage suivant
  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Fonction pour passer au témoignage précédent
  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Changement automatique des témoignages
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

  return (
    <section
      id="testimonials"
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: "#1d8b93" }}
    >
      {/* Bulles animées en arrière-plan */}
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
              Ce que disent nos utilisateurs
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#b8d070] to-[#a2c65e] transition-all duration-1000 animate-underline"></span>
            </span>
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Découvrez les retours de ceux qui utilisent notre plateforme.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-xl p-8 bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-300"
          >
            <div className="absolute top-2 right-2 w-12 h-12 border-t-2 border-r-2 border-[#b8d070] rounded-tr-xl opacity-80 animate-border-pulse"></div>
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-white rounded-bl-xl opacity-60 animate-border-pulse animation-delay-2000"></div>

            <div className="flex flex-col md:flex-row items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex-shrink-0 w-20 h-20 rounded-full overflow-hidden border-4 border-[#b8d070] shadow-lg"
              >
                <img
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-lg text-gray-100 italic mb-6">
                  "{testimonials[activeIndex].text}"
                </p>
                <h4 className="text-lg font-semibold text-white">
                  {testimonials[activeIndex].name}
                </h4>
                <p className="text-[#b8d070]">
                  {testimonials[activeIndex].role}
                </p>
              </div>
            </div>

            {/* Navigation avec icônes */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.98 }}
                onClick={prevTestimonial}
                className="w-8 h-8 rounded-full bg-white/20 border border-white/20 flex items-center justify-center text-white hover:bg-[#b8d070] hover:text-[#1d8b93] transition-colors duration-300"
                aria-label="Témoignage précédent"
              >
                <ChevronLeft size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.98 }}
                onClick={nextTestimonial}
                className="w-8 h-8 rounded-full bg-white/20 border border-white/20 flex items-center justify-center text-white hover:bg-[#b8d070] hover:text-[#1d8b93] transition-colors duration-300"
                aria-label="Témoignage suivant"
              >
                <ChevronRight size={16} />
              </motion.button>
            </div>
          </motion.div>

          {/* Indicateurs */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-[#b8d070] w-6"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
