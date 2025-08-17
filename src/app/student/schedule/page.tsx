"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar,
  Clock,
  MapPin,
  User,
  Video,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  BookOpen,
  FileText,
  Users,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ScheduleEvent {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  room: string;
  startTime: string;
  endTime: string;
  type: "course" | "exam" | "event";
  color: string;
  hasVideoLink?: boolean;
  videoLink?: string;
}

interface DaySchedule {
  date: string;
  dayName: string;
  events: ScheduleEvent[];
}

// Données simulées pour l'emploi du temps
const scheduleData: DaySchedule[] = [
  {
    date: "2024-01-15",
    dayName: "Lundi",
    events: [
      {
        id: "1",
        title: "Cours de Mathématiques",
        subject: "Mathématiques",
        teacher: "M. Diallo",
        room: "Salle A12",
        startTime: "08:00",
        endTime: "09:30",
        type: "course",
        color: "from-blue-500 to-blue-600",
        hasVideoLink: true,
        videoLink: "https://meet.google.com/abc-def-ghi"
      },
      {
        id: "2",
        title: "Physique-Chimie",
        subject: "Physique",
        teacher: "Mme Bah",
        room: "Laboratoire 1",
        startTime: "10:00",
        endTime: "11:30",
        type: "course",
        color: "from-green-500 to-green-600"
      },
      {
        id: "3",
        title: "Histoire-Géographie",
        subject: "Histoire",
        teacher: "M. Camara",
        room: "Salle B05",
        startTime: "14:00",
        endTime: "15:30",
        type: "course",
        color: "from-orange-500 to-orange-600"
      }
    ]
  },
  {
    date: "2024-01-16",
    dayName: "Mardi",
    events: [
      {
        id: "4",
        title: "Devoir Surveillé - Français",
        subject: "Français",
        teacher: "Mme Touré",
        room: "Salle C10",
        startTime: "08:00",
        endTime: "10:00",
        type: "exam",
        color: "from-red-500 to-red-600"
      },
      {
        id: "5",
        title: "Anglais",
        subject: "Anglais",
        teacher: "M. Sylla",
        room: "Salle A08",
        startTime: "10:30",
        endTime: "12:00",
        type: "course",
        color: "from-purple-500 to-purple-600",
        hasVideoLink: true
      }
    ]
  },
  {
    date: "2024-01-17",
    dayName: "Mercredi",
    events: [
      {
        id: "6",
        title: "Sport",
        subject: "EPS",
        teacher: "M. Konaté",
        room: "Gymnase",
        startTime: "09:00",
        endTime: "10:30",
        type: "course",
        color: "from-teal-500 to-teal-600"
      },
      {
        id: "7",
        title: "Réunion Parents-Professeurs",
        subject: "Événement",
        teacher: "Équipe pédagogique",
        room: "Amphithéâtre",
        startTime: "18:00",
        endTime: "20:00",
        type: "event",
        color: "from-indigo-500 to-indigo-600"
      }
    ]
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "course":
      return BookOpen;
    case "exam":
      return FileText;
    case "event":
      return Users;
    default:
      return Calendar;
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case "course":
      return "Cours";
    case "exam":
      return "Examen";
    case "event":
      return "Événement";
    default:
      return "Autre";
  }
};

export default function StudentSchedulePage() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
  const [viewMode, setViewMode] = useState<"week" | "day">("week");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const filteredSchedule = scheduleData.filter(day => {
    const hasMatchingEvent = day.events.some(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.teacher.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === "all" || event.type === filterType;
      return matchesSearch && matchesFilter;
    });
    return hasMatchingEvent;
  });

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#1d8b93] to-[#b8d070] bg-clip-text text-transparent">
            Emploi du temps
          </h1>
          <p className="text-white/70 mt-1">
            Consultez votre planning de la semaine
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#1d8b93]/50 focus:border-[#1d8b93]/50 w-64"
            />
          </div>

          {/* Filtre par type */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#1d8b93]/50"
          >
            <option value="all">Tous les types</option>
            <option value="course">Cours</option>
            <option value="exam">Examens</option>
            <option value="event">Événements</option>
          </select>

          {/* Mode d'affichage */}
          <div className="flex bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setViewMode("week")}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                viewMode === "week"
                  ? "bg-[#1d8b93] text-white"
                  : "text-white/70 hover:text-white"
              )}
            >
              Semaine
            </button>
            <button
              onClick={() => setViewMode("day")}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                viewMode === "day"
                  ? "bg-[#1d8b93] text-white"
                  : "text-white/70 hover:text-white"
              )}
            >
              Jour
            </button>
          </div>
        </div>
      </motion.div>

      {/* Navigation semaine */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4"
      >
        <button
          onClick={() => setCurrentWeek(prev => prev - 1)}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Semaine précédente
        </button>

        <div className="text-center">
          <h2 className="text-xl font-bold text-white">
            Semaine du 15 - 21 Janvier 2024
          </h2>
          <p className="text-white/70 text-sm">Trimestre 2</p>
        </div>

        <button
          onClick={() => setCurrentWeek(prev => prev + 1)}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
        >
          Semaine suivante
          <ChevronRight className="w-4 h-4" />
        </button>
      </motion.div>

      {/* Emploi du temps */}
      <div className="grid gap-6">
        {filteredSchedule.map((day, dayIndex) => (
          <motion.div
            key={day.date}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: dayIndex * 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden"
          >
            {/* En-tête du jour */}
            <div className="bg-gradient-to-r from-[#1d8b93]/20 to-[#b8d070]/20 p-4 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">{day.dayName}</h3>
              <p className="text-white/70 text-sm">
                {new Date(day.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>

            {/* Événements du jour */}
            <div className="p-4">
              {day.events.length === 0 ? (
                <div className="text-center py-8 text-white/50">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Aucun cours programmé</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {day.events.map((event, eventIndex) => {
                    const TypeIcon = getTypeIcon(event.type);
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: eventIndex * 0.05 }}
                        onClick={() => setSelectedEvent(event)}
                        className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                      >
                        {/* Heure */}
                        <div className="flex flex-col items-center min-w-[80px] text-center">
                          <div className="text-white font-bold text-lg">
                            {event.startTime}
                          </div>
                          <div className="text-white/70 text-sm">
                            {event.endTime}
                          </div>
                        </div>

                        {/* Contenu */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`p-1.5 rounded-lg bg-gradient-to-r ${event.color}`}>
                              <TypeIcon className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xs bg-white/10 text-white/70 px-2 py-1 rounded-full">
                              {getTypeLabel(event.type)}
                            </span>
                          </div>
                          <h4 className="font-bold text-white mb-1">{event.title}</h4>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {event.teacher}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.room}
                            </div>
                            {event.hasVideoLink && (
                              <div className="flex items-center gap-1 text-[#b8d070]">
                                <Video className="w-4 h-4" />
                                Lien visio
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Notification */}
                        <div className="flex items-center">
                          <Bell className="w-5 h-5 text-white/40" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal détails événement */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0f1c]/95 backdrop-blur-xl border border-white/20 rounded-xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Détails du cours</h3>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-white text-lg">{selectedEvent.title}</h4>
                  <p className="text-white/70">{selectedEvent.subject}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-white/50 mb-1">Professeur</div>
                    <div className="text-white">{selectedEvent.teacher}</div>
                  </div>
                  <div>
                    <div className="text-white/50 mb-1">Salle</div>
                    <div className="text-white">{selectedEvent.room}</div>
                  </div>
                  <div>
                    <div className="text-white/50 mb-1">Horaire</div>
                    <div className="text-white">{selectedEvent.startTime} - {selectedEvent.endTime}</div>
                  </div>
                  <div>
                    <div className="text-white/50 mb-1">Type</div>
                    <div className="text-white">{getTypeLabel(selectedEvent.type)}</div>
                  </div>
                </div>

                {selectedEvent.hasVideoLink && (
                  <div className="pt-4 border-t border-white/10">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#1d8b93] hover:bg-[#1d8b93]/80 text-white rounded-lg transition-colors">
                      <Video className="w-5 h-5" />
                      Rejoindre la visioconférence
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

