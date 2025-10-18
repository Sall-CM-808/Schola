"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, User, MessageSquare } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      
      // Reset status après 3 secondes
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "contact@fiinor.com",
      description: "Réponse sous 24h",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Téléphone",
      content: "+224 62 123 45 67",
      description: "Lun-Ven 8h-18h",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Adresse",
      content: "Conakry, Guinée",
      description: "Made in Africa",
    },
  ];

  const subjects = [
    "Demande de démonstration",
    "Information sur les tarifs",
    "Support technique",
    "Partenariat",
    "Autre"
  ];

  return (
    <section
      id="contact"
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
                Notre Équipe
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
            Prêt à transformer votre établissement ? Notre équipe d&apos;experts vous accompagne dans votre transition vers l&apos;excellence éducative.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Informations de contact */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Parlons de votre projet
              </h3>
              <p className="text-gray-200 leading-relaxed mb-8">
                Que vous soyez une école primaire, un lycée, une université ou un centre de formation, 
                nous avons la solution adaptée à vos besoins spécifiques.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl p-6 border border-white/15 backdrop-blur-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] transition-all duration-500 hover:bg-white/[0.12]"
                  style={{
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2), 0 4px 20px rgba(184, 208, 112, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* Ambient Glow Effect */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#b8d070]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <div className="flex items-start space-x-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#b8d070]/40 to-[#b8d070]/15 flex items-center justify-center text-[#b8d070] transition-all duration-500"
                    >
                      {info.icon}
                    </motion.div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">
                        {info.title}
                      </h4>
                      <p className="text-[#b8d070] font-medium mb-1">
                        {info.content}
                      </p>
                      <p className="text-gray-300 text-sm">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Formulaire de contact */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div 
              className="relative rounded-2xl p-8 border border-white/15 backdrop-blur-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] overflow-hidden"
              style={{
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 8px 30px rgba(184, 208, 112, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Bande lumineuse supérieure */}
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, #b8d070 50%, transparent 100%)",
                }}
              />

              {/* Coins décoratifs */}
              <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-[#b8d070]/60 rounded-tr-xl"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white/40 rounded-bl-xl"></div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Nom complet
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
                      placeholder="+224 62 123 45 67"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Sujet
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
                    >
                      <option value="" className="bg-[#1d8b93] text-white">Sélectionnez un sujet</option>
                      {subjects.map((subject, index) => (
                        <option key={index} value={subject} className="bg-[#1d8b93] text-white">
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Décrivez votre projet ou vos besoins..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 rounded-lg bg-gradient-to-r from-[#b8d070] via-[#a8cb64] to-[#a2c65e] text-[#1d8b93] font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-[#1d8b93] border-t-transparent rounded-full"
                      />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </motion.button>

                {/* Message de confirmation */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-[#b8d070]/20 border border-[#b8d070]/30 text-[#b8d070] text-center font-medium"
                  >
                    ✅ Message envoyé avec succès ! Nous vous répondrons sous 24h.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
