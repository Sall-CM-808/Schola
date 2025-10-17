"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";
import Link from "next/link";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-t from-[#0d5a61] to-[#1d8b93] text-white">
      {/* Bouton retour en haut */}
      <motion.button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-[#b8d070] to-[#a2c65e] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowUp className="w-6 h-6 text-[#1d8b93]" />
      </motion.button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo et description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-[#b8d070] to-[#a2c65e] rounded-lg flex items-center justify-center">
                <span className="text-[#1d8b93] font-bold text-xl">F</span>
              </div>
              <span className="text-2xl font-bold">
                <span className="text-white">Fii</span>
                <span className="text-[#b8d070]">nor</span>
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              La plateforme éducative qui transforme la gestion scolaire en Afrique. 
              Moderne, intuitive et adaptée aux besoins locaux.
            </p>
            <div className="flex space-x-4">
              {/* Réseaux sociaux */}
              {[
                { name: 'LinkedIn', href: '#' },
                { name: 'Twitter', href: '#' },
                { name: 'Facebook', href: '#' }
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#b8d070] hover:text-[#1d8b93] transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-sm font-semibold">
                    {social.name.charAt(0)}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Liens rapides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-3">
              {[
                { name: 'Accueil', href: '#accueil' },
                { name: 'Fonctionnalités', href: '#fonctionnalites' },
                { name: 'Tarifs', href: '#tarifs' },
                { name: 'Équipe', href: '#equipe' },
                { name: 'Contact', href: '#contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#b8d070] transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#b8d070] transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-3">
              {[
                { name: 'Centre d\'aide', href: '#' },
                { name: 'Documentation', href: '#' },
                { name: 'Tutoriels', href: '#' },
                { name: 'FAQ', href: '#' },
                { name: 'Statut système', href: '#' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#b8d070] transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#b8d070] transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Séparateur */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"
        />

        {/* Copyright et mentions légales */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-2 text-gray-300">
            <span>© {currentYear} Fiinor. Fait avec</span>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-4 h-4 text-red-400 fill-current" />
            </motion.div>
            <span>en Afrique</span>
          </div>
          
          <div className="flex space-x-6 text-sm">
            {[
              { name: 'Politique de confidentialité', href: '#' },
              { name: 'Conditions d\'utilisation', href: '#' },
              { name: 'Mentions légales', href: '#' }
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-[#b8d070] transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Badge "Made in Africa" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-center"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#b8d070]/20 to-[#a2c65e]/20 rounded-full border border-[#b8d070]/30">
            <span className="text-2xl">🌍</span>
            <span className="text-[#b8d070] font-semibold text-sm">
              Proudly Made in Africa
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
