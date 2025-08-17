"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HelpCircle,
  BookOpen,
  MessageCircle,
  Mail,
  Phone,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const HelpPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"faq" | "tutorials" | "contact">(
    "faq"
  );
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const faqData = [
    {
      id: "1",
      category: "Général",
      question: "Comment accéder à mes cours ?",
      answer:
        "Vous pouvez accéder à vos cours via l'onglet 'Cours' dans le menu principal. Tous vos cours actifs y sont listés avec les dernières mises à jour.",
    },
    {
      id: "2",
      category: "Général",
      question: "Comment soumettre un devoir ?",
      answer:
        "Rendez-vous dans la section 'Devoirs', sélectionnez le devoir concerné, puis utilisez la zone de dépôt pour télécharger votre fichier ou saisir votre réponse directement.",
    },
    {
      id: "3",
      category: "Technique",
      question: "Que faire si je ne peux pas me connecter ?",
      answer:
        "Vérifiez vos identifiants, votre connexion internet, et essayez de vider le cache de votre navigateur. Si le problème persiste, contactez le support technique.",
    },
    {
      id: "4",
      category: "Technique",
      question: "Les vidéos ne se chargent pas, que faire ?",
      answer:
        "Assurez-vous d'avoir une connexion internet stable. Essayez de rafraîchir la page ou de changer de navigateur. Vérifiez aussi que JavaScript est activé.",
    },
    {
      id: "5",
      category: "Évaluations",
      question: "Comment consulter mes notes ?",
      answer:
        "Vos notes sont disponibles dans l'onglet 'Notes' où vous pouvez voir vos résultats par matière, vos moyennes et l'évolution de vos performances.",
    },
    {
      id: "6",
      category: "Évaluations",
      question: "Puis-je contester une note ?",
      answer:
        "Oui, vous pouvez contacter directement votre enseignant via la messagerie interne ou utiliser le formulaire de contact pour signaler un problème.",
    },
  ];

  const tutorialsData = [
    {
      id: "1",
      title: "Prise en main de la plateforme",
      description:
        "Découvrez les fonctionnalités principales et naviguez facilement",
      duration: "5 min",
      type: "Vidéo",
    },
    {
      id: "2",
      title: "Soumettre un devoir",
      description: "Guide étape par étape pour rendre vos devoirs",
      duration: "3 min",
      type: "Vidéo",
    },
    {
      id: "3",
      title: "Utiliser la messagerie",
      description: "Communiquer avec vos enseignants et camarades",
      duration: "4 min",
      type: "Guide",
    },
    {
      id: "4",
      title: "Gérer votre profil",
      description: "Personnaliser vos informations et préférences",
      duration: "2 min",
      type: "Guide",
    },
  ];

  const contactMethods = [
    {
      type: "Support Technique",
      description: "Pour les problèmes de connexion et bugs",
      contact: "support@schola.edu.gn",
      icon: <Mail className="w-5 h-5" />,
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      type: "Support Pédagogique",
      description: "Pour les questions sur les cours et devoirs",
      contact: "pedagogie@schola.edu.gn",
      icon: <BookOpen className="w-5 h-5" />,
      color: "bg-green-500/20 text-green-400",
    },
    {
      type: "Administration",
      description: "Pour les questions administratives",
      contact: "+224 123 456 789",
      icon: <Phone className="w-5 h-5" />,
      color: "bg-purple-500/20 text-purple-400",
    },
    {
      type: "Urgence",
      description: "Support d'urgence 24h/7j",
      contact: "urgence@schola.edu.gn",
      icon: <MessageCircle className="w-5 h-5" />,
      color: "bg-red-500/20 text-red-400",
    },
  ];

  const toggleFaq = (faqId: string) => {
    setOpenFaqId(openFaqId === faqId ? null : faqId);
  };

  const groupedFaqs = faqData.reduce((groups, faq) => {
    if (!groups[faq.category]) {
      groups[faq.category] = [];
    }
    groups[faq.category].push(faq);
    return groups;
  }, {} as Record<string, typeof faqData>);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Centre d&apos;aide
        </h1>
        <p className="text-white/70">
          Trouvez rapidement les réponses à vos questions
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "faq", label: "FAQ", icon: HelpCircle },
          { id: "tutorials", label: "Tutoriels", icon: BookOpen },
          { id: "contact", label: "Contact", icon: MessageCircle },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? "bg-[#1d8b93] text-white"
                : "bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenu FAQ */}
      {activeTab === "faq" && (
        <div className="space-y-6">
          {Object.entries(groupedFaqs).map(([category, faqs]) => (
            <div key={category}>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#b8d070]"></div>
                {category}
              </h2>
              <div className="space-y-3">
                {faqs.map((faq) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors rounded-xl"
                    >
                      <span className="font-medium text-white">
                        {faq.question}
                      </span>
                      {openFaqId === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-white/60" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-white/60" />
                      )}
                    </button>
                    {openFaqId === faq.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-4 pb-4"
                      >
                        <p className="text-white/70 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contenu Tutoriels */}
      {activeTab === "tutorials" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tutorialsData.map((tutorial) => (
            <motion.div
              key={tutorial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 cursor-pointer hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-[#1d8b93]/20">
                  <BookOpen className="w-6 h-6 text-[#b8d070]" />
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    tutorial.type === "Vidéo"
                      ? "bg-red-500/20 text-red-300 border border-red-500/30"
                      : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  }`}
                >
                  {tutorial.type}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {tutorial.title}
              </h3>
              <p className="text-white/70 text-sm mb-4">
                {tutorial.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-white/50 text-sm">
                  {tutorial.duration}
                </span>
                <div className="flex items-center gap-2 text-[#1d8b93] text-sm font-medium">
                  Voir le tutoriel
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Contenu Contact */}
      {activeTab === "contact" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${method.color}`}>
                  {method.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {method.type}
                  </h3>
                  <p className="text-white/60 text-sm mb-3">
                    {method.description}
                  </p>
                  <div className="text-[#b8d070] font-medium">
                    {method.contact}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Formulaire de contact */}
          <div className="lg:col-span-2 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-6">
                Envoyer un message
              </h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#1d8b93] focus:border-transparent"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#1d8b93] focus:border-transparent"
                      placeholder="votre.email@exemple.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Sujet
                  </label>
                  <select className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#1d8b93] focus:border-transparent">
                    <option value="">Sélectionnez un sujet</option>
                    <option value="technique">Problème technique</option>
                    <option value="pedagogique">Question pédagogique</option>
                    <option value="administratif">
                      Question administrative
                    </option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#1d8b93] focus:border-transparent resize-none"
                    placeholder="Décrivez votre problème ou votre question..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-[#1d8b93] to-[#0d5a61] text-white font-medium rounded-lg hover:from-[#0d5a61] hover:to-[#1d8b93] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Envoyer le message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default HelpPage;
