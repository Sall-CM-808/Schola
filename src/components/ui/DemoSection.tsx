"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import DemoModal from "./DemoModal";

const DemoSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-[#1d8b93] to-[#12666d] relative overflow-hidden">
        {/* Effets de fond */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#b8d070]"
            animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-[#b8d070]"
            animate={{ y: [0, -25, 0], x: [0, -15, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Découvrez <span className="text-[#b8d070]">Fiinor</span> en Action
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Une démonstration interactive de notre plateforme éducative flexible, 
              adaptée à tous les contextes académiques.
            </p>
            
            <motion.button
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93] font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Découvrir la démo
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2"
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <DemoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default DemoSection;
