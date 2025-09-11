"use client";

import { useState, useEffect } from "react";
import { Unit } from "@/types/unit";
import { examsData, examResultsData, Exam, ExamResult } from "@/examples/examsData";
import { FileText, Plus, Calendar, Clock, Award, BarChart3, Users } from "lucide-react";

interface UnitExamsProps {
  unit: Unit;
}

export default function UnitExams({ unit }: UnitExamsProps) {
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [examResults, setExamResults] = useState<ExamResult[]>([]);

  useEffect(() => {
    const unitExams = examsData[unit.id] || [];
    setExams(unitExams);
  }, [unit.id]);

  useEffect(() => {
    if (selectedExam) {
      const results = examResultsData[selectedExam.id] || [];
      setExamResults(results);
    }
  }, [selectedExam]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planned": return "bg-yellow-100 text-yellow-800";
      case "in_progress": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "graded": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "planned": return "Planifié";
      case "in_progress": return "En cours";
      case "completed": return "Terminé";
      case "graded": return "Noté";
      default: return status;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "quiz": return "Quiz";
      case "midterm": return "Partiel";
      case "final": return "Final";
      case "assignment": return "Devoir";
      case "project": return "Projet";
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "quiz": return "bg-blue-500";
      case "midterm": return "bg-orange-500";
      case "final": return "bg-red-500";
      case "assignment": return "bg-green-500";
      case "project": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const calculateStats = (results: ExamResult[]) => {
    if (results.length === 0) return null;
    
    const scores = results.map(r => r.percentage);
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const min = Math.min(...scores);
    const max = Math.max(...scores);
    
    return { average, min, max, count: results.length };
  };

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#0d5a61] mb-2">Évaluations - {unit.name}</h1>
            <p className="text-gray-600">
              {exams.length > 0 
                ? `${exams.length} évaluation(s) programmée(s)`
                : "Aucune évaluation programmée"
              }
            </p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#0d5a61] text-white rounded-lg hover:bg-[#0a4a50] transition-colors">
            <Plus size={16} />
            <span>Nouvelle Évaluation</span>
          </button>
        </div>
      </div>

      {/* Statistiques */}
      {exams.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold">{exams.length}</p>
            <p className="text-sm opacity-90">Total évaluations</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold">{exams.filter(e => e.status === "graded").length}</p>
            <p className="text-sm opacity-90">Notées</p>
          </div>
          <div className="bg-orange-500 text-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold">{exams.filter(e => e.status === "planned").length}</p>
            <p className="text-sm opacity-90">À venir</p>
          </div>
          <div className="bg-purple-500 text-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold">{new Set(exams.map(e => e.courseId)).size}</p>
            <p className="text-sm opacity-90">Cours concernés</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Liste des évaluations */}
        <div className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-6">
          <h2 className="text-lg font-semibold text-[#0d5a61] mb-4">Liste des Évaluations</h2>
          
          {exams.length > 0 ? (
            <div className="space-y-3">
              {exams.map((exam) => (
                <div
                  key={exam.id}
                  onClick={() => setSelectedExam(exam)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedExam?.id === exam.id
                      ? "border-[#0d5a61] bg-[#f0f9fa]"
                      : "border-gray-200 hover:border-[#0d5a61] hover:bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getTypeColor(exam.type)}`}></div>
                      <h3 className="font-medium text-gray-900">{exam.title}</h3>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                      {getStatusLabel(exam.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <FileText size={14} />
                      <span>{exam.courseName}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{new Date(exam.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{exam.duration > 0 ? `${exam.duration} min` : 'Libre'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award size={14} />
                      <span>{exam.maxScore} pts</span>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                      {getTypeLabel(exam.type)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune évaluation</h3>
              <p className="text-gray-500">
                Aucune évaluation n'a encore été programmée.
              </p>
            </div>
          )}
        </div>

        {/* Détails et résultats */}
        <div className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-6">
          <h2 className="text-lg font-semibold text-[#0d5a61] mb-4">
            {selectedExam ? "Résultats" : "Sélectionnez une évaluation"}
          </h2>
          
          {selectedExam ? (
            <div className="space-y-4">
              {/* Informations de l'évaluation */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">{selectedExam.title}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Cours:</span>
                    <span className="ml-2 font-medium">{selectedExam.courseName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Date:</span>
                    <span className="ml-2 font-medium">{new Date(selectedExam.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Durée:</span>
                    <span className="ml-2 font-medium">{selectedExam.duration > 0 ? `${selectedExam.duration} min` : 'Libre'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Note max:</span>
                    <span className="ml-2 font-medium">{selectedExam.maxScore} pts</span>
                  </div>
                </div>
              </div>

              {/* Statistiques des résultats */}
              {examResults.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <BarChart3 size={16} className="mr-2" />
                    Statistiques
                  </h4>
                  
                  {(() => {
                    const stats = calculateStats(examResults);
                    return stats ? (
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">{stats.average.toFixed(1)}%</p>
                          <p className="text-sm text-gray-600">Moyenne</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{stats.count}</p>
                          <p className="text-sm text-gray-600">Participants</p>
                        </div>
                      </div>
                    ) : null;
                  })()}

                  {/* Liste des résultats */}
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Users size={16} className="mr-2" />
                    Résultats individuels
                  </h4>
                  
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {examResults.map((result) => (
                      <div key={result.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{result.memberName}</p>
                          {result.grade && (
                            <p className="text-xs text-gray-500">{result.grade}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm">{result.score}/{result.maxScore}</p>
                          <p className="text-xs text-gray-500">{result.percentage}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {examResults.length === 0 && selectedExam.status === "graded" && (
                <div className="text-center py-6">
                  <BarChart3 size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">Aucun résultat disponible</p>
                </div>
              )}

              {selectedExam.status !== "graded" && (
                <div className="text-center py-6">
                  <Clock size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">
                    {selectedExam.status === "planned" ? "Évaluation à venir" : "Évaluation en cours"}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <BarChart3 size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">
                Sélectionnez une évaluation pour voir les détails et résultats
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
