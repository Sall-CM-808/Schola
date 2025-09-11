"use client";

import { useState, useEffect } from "react";
import { Unit } from "@/types/unit";
import { coursesData, Course } from "@/examples/coursesData";
import { BookOpen, Plus, Clock, Award, User, Calendar } from "lucide-react";

interface UnitCoursesProps {
  unit: Unit;
}

export default function UnitCourses({ unit }: UnitCoursesProps) {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const unitCourses = coursesData[unit.id] || [];
    setCourses(unitCourses);
  }, [unit.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "planned": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active": return "En cours";
      case "completed": return "Terminé";
      case "planned": return "Planifié";
      default: return status;
    }
  };

  const totalHours = courses.reduce((sum, course) => sum + course.hours, 0);
  const totalCredits = courses.reduce((sum, course) => sum + (course.credits || 0), 0);

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#0d5a61] mb-2">Cours - {unit.name}</h1>
            <p className="text-gray-600">
              {courses.length > 0 
                ? `${courses.length} cours dans cette unité`
                : "Aucun cours défini"
              }
            </p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#0d5a61] text-white rounded-lg hover:bg-[#0a4a50] transition-colors">
            <Plus size={16} />
            <span>Nouveau Cours</span>
          </button>
        </div>
      </div>

      {/* Statistiques */}
      {courses.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold">{courses.length}</p>
            <p className="text-sm opacity-90">Total cours</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold">{totalHours}h</p>
            <p className="text-sm opacity-90">Volume horaire</p>
          </div>
          {totalCredits > 0 && (
            <div className="bg-purple-500 text-white p-4 rounded-lg shadow-sm text-center">
              <p className="text-2xl font-bold">{totalCredits}</p>
              <p className="text-sm opacity-90">Crédits ECTS</p>
            </div>
          )}
          <div className="bg-orange-500 text-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold">{courses.filter(c => c.status === "active").length}</p>
            <p className="text-sm opacity-90">En cours</p>
          </div>
        </div>
      )}

      {/* Liste des cours */}
      {courses.length > 0 ? (
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <BookOpen size={20} className="text-[#0d5a61]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                      <span className="text-sm font-medium text-gray-500">({course.code})</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                        {getStatusLabel(course.status)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{course.description}</p>
                  </div>
                </div>
              </div>

              {/* Informations du cours */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <User size={16} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Enseignant</p>
                    <p className="text-sm font-medium">{course.teacherName}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock size={16} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Volume horaire</p>
                    <p className="text-sm font-medium">{course.hours}h</p>
                  </div>
                </div>

                {course.credits && (
                  <div className="flex items-center space-x-2">
                    <Award size={16} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Crédits</p>
                      <p className="text-sm font-medium">{course.credits} ECTS</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Calendar size={16} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Période</p>
                    <p className="text-sm font-medium">
                      {new Date(course.startDate).toLocaleDateString('fr-FR')} - {new Date(course.endDate).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Barre de progression (exemple) */}
              <div className="bg-gray-100 rounded-full h-2 mb-2">
                <div 
                  className="bg-[#0d5a61] h-2 rounded-full transition-all duration-300" 
                  style={{ 
                    width: course.status === "completed" ? "100%" : 
                           course.status === "active" ? "65%" : "0%" 
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Progression du cours</span>
                <span>
                  {course.status === "completed" ? "100%" : 
                   course.status === "active" ? "65%" : "0%"}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-12 text-center">
          <div className="text-gray-400 mb-4">
            <BookOpen size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun cours</h3>
          <p className="text-gray-500 mb-6">
            Aucun cours n'a encore été défini pour cette unité.
          </p>
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#0d5a61] text-white rounded-lg hover:bg-[#0a4a50] transition-colors mx-auto">
            <Plus size={16} />
            <span>Créer le premier cours</span>
          </button>
        </div>
      )}
    </div>
  );
}
