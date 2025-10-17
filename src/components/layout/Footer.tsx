"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useClientSideAnimations } from "@/hooks/useClientSideAnimations";
import { Mail, Phone, Facebook, Twitter, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  const isClient = useClientSideAnimations();
  return (
    <footer
      className="relative text-white pt-16 pb-8 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0d5a61 0%, #2a9fa8 100%)", // Dégradé premium
      }}
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="col-span-1"
          >
            <Link href="/" className="flex items-center mb-4">
              <div className="w-10 h-10 mr-3 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#b8d070] to-[#a2c65e] shadow-lg">
                <span className="text-[#1d8b93] font-bold text-lg">F</span>
              </div>
              <span className="text-2xl font-bold text-[#b8d070]">Fiinor</span>
            </Link>
            <p className="text-gray-200 mb-4">
              Plateforme leader dédiée à l&apos;optimisation de la gestion des
              établissements scolaires.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1, color: "#b8d070" }}
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors duration-300"
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, color: "#b8d070" }}
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors duration-300"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, color: "#b8d070" }}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors duration-300"
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-[#b8d070]">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#accueil"
                  className="text-gray-200 hover:text-[#b8d070] transition-colors duration-300"
                >
                  Page d&apos;Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="#fonctionnalites"
                  className="text-gray-200 hover:text-[#b8d070] transition-colors duration-300"
                >
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link
                  href="#equipe"
                  className="text-gray-200 hover:text-[#b8d070] transition-colors duration-300"
                >
                  Notre Équipe
                </Link>
              </li>
              <li>
                <Link
                  href="#tarifs"
                  className="text-gray-200 hover:text-[#b8d070] transition-colors duration-300"
                >
                  Tarifs
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-gray-200 hover:text-[#b8d070] transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-[#b8d070]">
              Informations Juridiques
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-gray-200 hover:text-[#b8d070] transition-colors duration-300"
                >
                  Conditions Générales
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-200 hover:text-[#b8d070] transition-colors duration-300"
                >
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-gray-200 hover:text-[#b8d070] transition-colors duration-300"
                >
                  Gestion des Cookies
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-[#b8d070]">
              Support
            </h3>
            <ul className="space-y-2 text-gray-200">
              <li className="flex items-start">
                <Mail size={20} className="mr-2 text-gray-400" />
                <span>support@schola.com</span>
              </li>
              <li className="flex items-start">
                <Phone size={20} className="mr-2 text-gray-400" />
                <span>+33 1 23 45 67 89</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="pt-8 mt-8 border-t border-[#0d5a61] text-gray-200 text-sm text-center md:flex md:justify-between md:text-left"
        >
          <p>© {new Date().getFullYear()} Fiinor. Tous droits réservés.</p>
          <p className="mt-2 md:mt-0">
            Développé avec passion pour l&apos;excellence éducative.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
