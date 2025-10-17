"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface TestimonialProps {
  name: string;
  role: string;
  image: string;
  text: string;
}

const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials: TestimonialProps[] = [
    {
      name: "Aminata Sow",
      role: "Directrice d'école",
      text: "Fiinor a transformé notre gestion. Interface intuitive et communication améliorée.",
      image: "https://randomuser.me/api/portraits/women/72.jpg?nat=ng",
    },
    {
      name: "Kofi Mensah",
      role: "Professeur de sciences",
      text: "La gestion des notes est simple. Suivi des élèves et rapports détaillés facilités.",
      image: "https://randomuser.me/api/portraits/men/88.jpg?nat=gh",
    },
    {
      name: "Fatou Diop",
      role: "Parent d'élève",
      text: "Transparence appréciable. Suivi des progrès et communication facile avec les professeurs.",
      image: "https://randomuser.me/api/portraits/women/90.jpg?nat=sn",
    },
  ];

  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 7000);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section
      id="testimonials"
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: "#1d8b93" }}
    >
      {/* Orbes flottants subtils */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full"
          style={{
            background: "radial-gradient(circle, #b8d070 0%, transparent 70%)",
          }}
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, #b8d070 0%, transparent 70%)",
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Lignes de scan horizontales */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, #b8d070 0px, transparent 2px, transparent 4px)",
        }}
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* En-tête avec soulignement animé */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-3">
            <span className="text-white">Témoignages </span>
            <span className="relative inline-block">
              <span className="text-[#b8d070]">Authentiques</span>
              <motion.span
                className="absolute -bottom-1 left-0 h-1 bg-[#b8d070]"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light tracking-wide drop-shadow-lg"
            style={{
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
            }}
          >
            Découvrez comment Fiinor transforme concrètement la vie des établissements scolaires à travers l&apos;Afrique 
          </motion.p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Coins décoratifs avec effet de profondeur */}
          <div className="absolute inset-0 -m-6 pointer-events-none">
            <motion.div
              className="absolute top-0 left-0 w-16 h-16"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 0.5, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-[#b8d070]" />
              <div className="absolute top-0 left-0 w-0.5 h-full bg-[#b8d070]" />
            </motion.div>
            <motion.div
              className="absolute top-0 right-0 w-16 h-16"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 0.5, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="absolute top-0 right-0 w-full h-0.5 bg-[#b8d070]" />
              <div className="absolute top-0 right-0 w-0.5 h-full bg-[#b8d070]" />
            </motion.div>
            <motion.div
              className="absolute bottom-0 left-0 w-16 h-16"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 0.5, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b8d070]" />
              <div className="absolute bottom-0 left-0 w-0.5 h-full bg-[#b8d070]" />
            </motion.div>
            <motion.div
              className="absolute bottom-0 right-0 w-16 h-16"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 0.5, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="absolute bottom-0 right-0 w-full h-0.5 bg-[#b8d070]" />
              <div className="absolute bottom-0 right-0 w-0.5 h-full bg-[#b8d070]" />
            </motion.div>
          </div>

          <div className="relative min-h-[350px] flex items-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 260, damping: 25 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                }}
                className="w-full"
              >
                {/* Carte avec background équilibré comme les fonctionnalités */}
                <div 
                  className="relative rounded-xl p-10 md:p-12 shadow-2xl overflow-hidden"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                  }}
                >
                  {/* Bande lumineuse supérieure */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{
                      background: "linear-gradient(90deg, transparent 0%, #b8d070 50%, transparent 100%)",
                    }}
                  />

                  <div className="flex flex-col items-center text-center space-y-6">
                    {/* Avatar avec halo lumineux */}
                    <div className="relative">
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: "radial-gradient(circle, rgba(184, 208, 112, 0.3) 0%, transparent 70%)",
                        }}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <div 
                        className="relative w-20 h-20 rounded-full overflow-hidden"
                        style={{
                          border: "2px solid rgba(184, 208, 112, 0.4)",
                          boxShadow: "0 0 20px rgba(184, 208, 112, 0.2)",
                        }}
                      >
                        <Image
                          src={testimonials[activeIndex].image}
                          alt={testimonials[activeIndex].name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Citation */}
                    <div className="space-y-5 max-w-2xl">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <p className="text-lg md:text-xl text-white font-light leading-relaxed italic">
                          {testimonials[activeIndex].text}
                        </p>
                      </motion.div>

                      <motion.div
                        className="pt-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h4 className="text-xl font-semibold text-white mb-1">
                          {testimonials[activeIndex].name}
                        </h4>
                        <p className="text-[#b8d070] text-sm font-medium tracking-wide uppercase">
                          {testimonials[activeIndex].role}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation élégante */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <motion.button
              whileHover={{ scale: 1.08, backgroundColor: "rgba(184, 208, 112, 0.15)" }}
              whileTap={{ scale: 0.95 }}
              onClick={prevTestimonial}
              className="w-11 h-11 rounded-full flex items-center justify-center text-white transition-all duration-300"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
              aria-label="Précédent"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </motion.button>

            {/* Indicateurs avec style moderne */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className="relative overflow-hidden rounded-full transition-all duration-300"
                  style={{
                    width: activeIndex === index ? "40px" : "10px",
                    height: "10px",
                    backgroundColor: activeIndex === index ? "#b8d070" : "rgba(255, 255, 255, 0.25)",
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: activeIndex === index ? "#b8d070" : "rgba(255, 255, 255, 0.4)"
                  }}
                  aria-label={`Témoignage ${index + 1}`}
                >
                  {activeIndex === index && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                      }}
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.08, backgroundColor: "rgba(184, 208, 112, 0.15)" }}
              whileTap={{ scale: 0.95 }}
              onClick={nextTestimonial}
              className="w-11 h-11 rounded-full flex items-center justify-center text-white transition-all duration-300"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
              aria-label="Suivant"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;