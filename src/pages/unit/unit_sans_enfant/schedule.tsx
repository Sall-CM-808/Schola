"use client";

import { useState, useEffect } from "react";
import { Unit } from "@/types/unit";
import { scheduleData, ScheduleEvent } from "@/examples/scheduleData";
import { Calendar, Clock, MapPin, User, Plus } from "lucide-react";

interface UnitScheduleProps {
  unit: Unit;
}

export default function UnitSchedule({ unit }: UnitScheduleProps) {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>(1); // Lundi par défaut

  useEffect(() => {
    const unitEvents = scheduleData[unit.id] || [];
    setEvents(unitEvents);
  }, [unit.id]);

  const daysOfWeek = [
    { id: 1, name: "Lundi", short: "Lun" },
    { id: 2, name: "Mardi", short: "Mar" },
    { id: 3, name: "Mercredi", short: "Mer" },
    { id: 4, name: "Jeudi", short: "Jeu" },
    { id: 5, name: "Vendredi", short: "Ven" },
    { id: 6, name: "Samedi", short: "Sam" }
  ];

  const getEventsByDay = (dayId: number) => {
    return events
      .filter(event => event.dayOfWeek === dayId)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "course": return "bg-blue-100 text-blue-800 border-blue-200";
      case "exam": return "bg-red-100 text-red-800 border-red-200";
      case "meeting": return "bg-green-100 text-green-800 border-green-200";
      case "event": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "course": return "Cours";
      case "exam": return "Examen";
      case "meeting": return "Réunion";
      case "event": return "Événement";
      default: return type;
    }
  };

  const formatTime = (time: string) => {
    return time.substring(0, 5); // Format HH:MM
  };

  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const diff = end.getTime() - start.getTime();
    return Math.round(diff / (1000 * 60)); // en minutes
  };

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#0d5a61] mb-2">Emploi du temps - {unit.name}</h1>
            <p className="text-gray-600">
              {events.length > 0 
                ? `${events.length} créneaux programmés`
                : "Aucun créneau programmé"
              }
            </p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#0d5a61] text-white rounded-lg hover:bg-[#0a4a50] transition-colors">
            <Plus size={16} />
            <span>Nouveau Créneau</span>
          </button>
        </div>
      </div>

      {/* Statistiques rapides */}
      {events.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold">{events.length}</p>
            <p className="text-sm opacity-90">Total créneaux</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold">
              {Math.round(events.reduce((sum, event) => 
                sum + calculateDuration(event.startTime, event.endTime), 0) / 60)}h
            </p>
            <p className="text-sm opacity-90">Volume hebdo</p>
          </div>
          <div className="bg-purple-500 text-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold">{events.filter(e => e.type === "course").length}</p>
            <p className="text-sm opacity-90">Cours</p>
          </div>
          <div className="bg-orange-500 text-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold">{new Set(events.map(e => e.teacherId)).size}</p>
            <p className="text-sm opacity-90">Enseignants</p>
          </div>
        </div>
      )}

      {/* Navigation par jour */}
      <div className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-4">
        <div className="flex space-x-2 overflow-x-auto">
          {daysOfWeek.map((day) => {
            const dayEvents = getEventsByDay(day.id);
            return (
              <button
                key={day.id}
                onClick={() => setSelectedDay(day.id)}
                className={`flex-shrink-0 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  selectedDay === day.id
                    ? "bg-[#0d5a61] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <div className="text-center">
                  <div>{day.name}</div>
                  <div className="text-xs opacity-75 mt-1">
                    {dayEvents.length} créneau{dayEvents.length > 1 ? 'x' : ''}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Planning du jour sélectionné */}
      <div className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-6">
        <h2 className="text-lg font-semibold text-[#0d5a61] mb-4">
          {daysOfWeek.find(d => d.id === selectedDay)?.name}
        </h2>
        
        {getEventsByDay(selectedDay).length > 0 ? (
          <div className="space-y-3">
            {getEventsByDay(selectedDay).map((event) => (
              <div
                key={event.id}
                className={`p-4 rounded-lg border-l-4 ${getEventTypeColor(event.type)}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <span className="text-xs px-2 py-1 bg-white rounded-full font-medium">
                        {getEventTypeLabel(event.type)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock size={14} className="text-gray-400" />
                        <span>
                          {formatTime(event.startTime)} - {formatTime(event.endTime)}
                          <span className="text-gray-500 ml-1">
                            ({calculateDuration(event.startTime, event.endTime)} min)
                          </span>
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <User size={14} className="text-gray-400" />
                        <span>{event.teacherName}</span>
                      </div>
                      
                      {event.room && (
                        <div className="flex items-center space-x-2">
                          <MapPin size={14} className="text-gray-400" />
                          <span>{event.room}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun créneau</h3>
            <p className="text-gray-500">
              Aucun créneau n'est programmé pour ce jour.
            </p>
          </div>
        )}
      </div>

      {/* Vue hebdomadaire compacte */}
      {events.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-6">
          <h2 className="text-lg font-semibold text-[#0d5a61] mb-4">Vue hebdomadaire</h2>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {daysOfWeek.map((day) => {
              const dayEvents = getEventsByDay(day.id);
              return (
                <div key={day.id} className="border rounded-lg p-3">
                  <h3 className="font-medium text-sm text-gray-900 mb-2 text-center">
                    {day.short}
                  </h3>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className="text-xs p-2 rounded bg-gray-50 border-l-2 border-[#0d5a61]"
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="text-gray-500">
                          {formatTime(event.startTime)}
                        </div>
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-gray-500 text-center py-1">
                        +{dayEvents.length - 3} autre{dayEvents.length - 3 > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
