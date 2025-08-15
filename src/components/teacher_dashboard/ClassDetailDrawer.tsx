"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Users,
  Calendar,
  TrendingUp,
  UserCheck,
  BookOpen,
  MessageSquare,
  FileText,
  ExternalLink,
  Star,
  Clock,
  MapPin,
} from "lucide-react";
import { ClassDetail } from "@/lib/mocks/teacherClasses";

interface ClassDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  classDetail: ClassDetail | null;
  isLoading?: boolean;
}

const ClassDetailDrawer: React.FC<ClassDetailDrawerProps> = ({
  isOpen,
  onClose,
  classDetail,
  isLoading = false,
}) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "students" | "schedule" | "links"
  >("overview");

  const tabs = [
    { id: "overview", label: "Vue d'ensemble", icon: TrendingUp },
    { id: "students", label: "Étudiants", icon: Users },
    { id: "schedule", label: "Planning", icon: Calendar },
    { id: "links", label: "Liens rapides", icon: ExternalLink },
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "course":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "td":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "exam":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "meeting":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "course":
        return "Cours";
      case "td":
        return "TD";
      case "exam":
        return "Examen";
      case "meeting":
        return "Réunion";
      default:
        return type;
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons = {
      BookOpen,
      UserCheck,
      MessageSquare,
      FileText,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || FileText;
    return <IconComponent className="w-4 h-4" />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-gradient-to-b from-[#1d8b93] to-[#0d5a61] border-l border-white/10 shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">
                  Détails de la classe
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {classDetail && (
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white">
                    {classDetail.className}
                  </h3>
                  <div className="flex items-center gap-4 text-white/70">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {classDetail.studentsCount} étudiants
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {classDetail.averageGrade}/20
                    </span>
                    <span className="flex items-center gap-1">
                      <UserCheck className="w-4 h-4" />
                      {classDetail.attendanceRate}%
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="px-6 py-4 border-b border-white/10">
              <div className="flex space-x-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-[#b8d070] text-[#1d8b93]"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {isLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-16 bg-white/10 rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                classDetail && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      {activeTab === "overview" && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white/5 rounded-xl p-4">
                              <div className="text-white/70 text-sm mb-1">
                                Moyenne générale
                              </div>
                              <div className="text-2xl font-bold text-white">
                                {classDetail.averageGrade}/20
                              </div>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4">
                              <div className="text-white/70 text-sm mb-1">
                                Taux de présence
                              </div>
                              <div className="text-2xl font-bold text-white">
                                {classDetail.attendanceRate}%
                              </div>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4">
                              <div className="text-white/70 text-sm mb-1">
                                Effectif
                              </div>
                              <div className="text-2xl font-bold text-white">
                                {classDetail.studentsCount}
                              </div>
                            </div>
                          </div>

                          <div className="bg-white/5 rounded-xl p-6">
                            <h4 className="text-lg font-semibold text-white mb-4">
                              Description
                            </h4>
                            <p className="text-white/70">
                              {classDetail.description}
                            </p>
                            <div className="mt-4 flex items-center gap-4 text-sm text-white/60">
                              <span>Niveau: {classDetail.level}</span>
                              <span>•</span>
                              <span>{classDetail.semester}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === "students" && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-semibold text-white">
                              Top 5 étudiants
                            </h4>
                            <span className="text-sm text-white/60">
                              {classDetail.students.length} au total
                            </span>
                          </div>

                          {classDetail.students
                            .slice(0, 5)
                            .map((student, index) => (
                              <motion.div
                                key={student.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/5 rounded-xl p-4 flex items-center justify-between"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#b8d070] to-[#a2c65e] flex items-center justify-center">
                                    <span className="text-[#1d8b93] font-bold text-sm">
                                      {student.name.charAt(0)}
                                    </span>
                                  </div>
                                  <div>
                                    <div className="font-medium text-white">
                                      {student.name}
                                    </div>
                                    <div className="text-sm text-white/60">
                                      {student.email}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4 text-sm">
                                  <div className="text-center">
                                    <div className="text-white font-medium">
                                      {student.averageGrade}/20
                                    </div>
                                    <div className="text-white/60">Moyenne</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-white font-medium">
                                      {student.attendance}%
                                    </div>
                                    <div className="text-white/60">
                                      Présence
                                    </div>
                                  </div>
                                  <Star className="w-4 h-4 text-yellow-400" />
                                </div>
                              </motion.div>
                            ))}
                        </div>
                      )}

                      {activeTab === "schedule" && (
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-white mb-4">
                            Planning à venir
                          </h4>

                          {classDetail.schedule.map((event, index) => (
                            <motion.div
                              key={event.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-white/5 rounded-xl p-4"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h5 className="font-medium text-white mb-2">
                                    {event.title}
                                  </h5>
                                  <div className="flex items-center gap-4 text-sm text-white/70">
                                    <span className="flex items-center gap-1">
                                      <Calendar className="w-3 h-3" />
                                      {new Date(event.date).toLocaleDateString(
                                        "fr-FR"
                                      )}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {event.time}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <MapPin className="w-3 h-3" />
                                      {event.location}
                                    </span>
                                  </div>
                                </div>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium border ${getEventTypeColor(
                                    event.type
                                  )}`}
                                >
                                  {getEventTypeLabel(event.type)}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {activeTab === "links" && (
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-white mb-4">
                            Liens rapides
                          </h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {classDetail.quickLinks.map((link, index) => (
                              <motion.a
                                key={link.href}
                                href={link.href}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all duration-200 block group"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="p-3 rounded-lg bg-[#b8d070]/20 text-[#b8d070] group-hover:bg-[#b8d070]/30 transition-colors duration-200">
                                    {getIconComponent(link.icon)}
                                  </div>
                                  <div>
                                    <div className="font-medium text-white">
                                      {link.label}
                                    </div>
                                    <div className="text-sm text-white/60">
                                      Accéder aux fonctionnalités
                                    </div>
                                  </div>
                                  <ExternalLink className="w-4 h-4 text-white/40 ml-auto group-hover:text-white/70 transition-colors duration-200" />
                                </div>
                              </motion.a>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                )
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ClassDetailDrawer;
