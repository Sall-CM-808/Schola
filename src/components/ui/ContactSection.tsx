"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

const ContactSection: React.FC = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulation d'envoi
    setTimeout(() => {
      setFormStatus('sent');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 2000);
  };

  return (
    <section
      id="contact"
      className="relative py-20 bg-gradient-to-br from-[#1d8b93] to-[#12666d]"
    >
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-[#b8d070]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#b8d070]/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* En-tête avec style premium */}
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
              Contactez{" "}
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
            Prêt à transformer votre établissement ? Discutons de vos besoins et découvrons ensemble comment Fiinor peut révolutionner votre gestion éducative.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Informations de contact */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Nos Coordonnées</h3>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-center space-x-4"
                  whileHover={{ x: 10, transition: { duration: 0.2 } }}
                >
                  <div className="p-3 bg-[#b8d070] rounded-full">
                    <Mail className="w-6 h-6 text-[#1d8b93]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Email</p>
                    <p className="text-gray-300">contact@fiinor.com</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center space-x-4"
                  whileHover={{ x: 10, transition: { duration: 0.2 } }}
                >
                  <div className="p-3 bg-[#b8d070] rounded-full">
                    <Phone className="w-6 h-6 text-[#1d8b93]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Téléphone</p>
                    <p className="text-gray-300">+221 77 123 45 67</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center space-x-4"
                  whileHover={{ x: 10, transition: { duration: 0.2 } }}
                >
                  <div className="p-3 bg-[#b8d070] rounded-full">
                    <MapPin className="w-6 h-6 text-[#1d8b93]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Adresse</p>
                    <p className="text-gray-300">Dakar, Sénégal</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Horaires */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <h4 className="text-lg font-semibold text-white mb-4">Horaires d&apos;ouverture</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span className="text-[#b8d070]">8h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span className="text-[#b8d070]">9h00 - 14h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span className="text-gray-500">Fermé</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Formulaire de contact */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Envoyez-nous un message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Prénom
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#b8d070] focus:ring-2 focus:ring-[#b8d070]/20 transition-all"
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Nom
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#b8d070] focus:ring-2 focus:ring-[#b8d070]/20 transition-all"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#b8d070] focus:ring-2 focus:ring-[#b8d070]/20 transition-all"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Type d&apos;établissement
                  </label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#b8d070] focus:ring-2 focus:ring-[#b8d070]/20 transition-all">
                    <option value="" className="text-gray-800">Sélectionnez...</option>
                    <option value="ecole-primaire" className="text-gray-800">École primaire</option>
                    <option value="college" className="text-gray-800">Collège</option>
                    <option value="lycee" className="text-gray-800">Lycée</option>
                    <option value="universite" className="text-gray-800">Université</option>
                    <option value="formation" className="text-gray-800">Centre de formation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#b8d070] focus:ring-2 focus:ring-[#b8d070]/20 transition-all resize-none"
                    placeholder="Décrivez vos besoins et vos attentes..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-6 bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93] font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {formStatus === 'sending' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-[#1d8b93] border-t-transparent rounded-full"
                      />
                      <span>Envoi en cours...</span>
                    </>
                  ) : formStatus === 'sent' ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Message envoyé !</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
