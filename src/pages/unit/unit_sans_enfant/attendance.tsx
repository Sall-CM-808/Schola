"use client";

import { useState, useEffect } from "react";
import { Unit } from "@/types/unit";
import { attendanceData, attendanceStatsData, AttendanceRecord, AttendanceStats } from "@/examples/attendanceData";
import { UserCheck, Calendar, TrendingUp, AlertTriangle, CheckCircle, X, Clock } from "lucide-react";

interface UnitAttendanceProps {
  unit: Unit;
}

export default function UnitAttendance({ unit }: UnitAttendanceProps) {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [stats, setStats] = useState<AttendanceStats | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const unitRecords = attendanceData[unit.id] || [];
    const unitStats = attendanceStatsData[unit.id] || null;
    setRecords(unitRecords);
    setStats(unitStats);
  }, [unit.id]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present": return <CheckCircle size={16} className="text-green-500" />;
      case "absent": return <X size={16} className="text-red-500" />;
      case "late": return <Clock size={16} className="text-yellow-500" />;
      case "excused": return <AlertTriangle size={16} className="text-blue-500" />;
      default: return <UserCheck size={16} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present": return "bg-green-100 text-green-800";
      case "absent": return "bg-red-100 text-red-800";
      case "late": return "bg-yellow-100 text-yellow-800";
      case "excused": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "present": return "Présent";
      case "absent": return "Absent";
      case "late": return "Retard";
      case "excused": return "Excusé";
      default: return status;
    }
  };

  const recordsByDate = records.filter(record => record.date === selectedDate);

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#0d5a61] mb-2">Présences - {unit.name}</h1>
            <p className="text-gray-600">
              Suivi des présences et assiduité
            </p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#0d5a61] text-white rounded-lg hover:bg-[#0a4a50] transition-colors">
            <UserCheck size={16} />
            <span>Faire l'appel</span>
          </button>
        </div>
      </div>

      {/* Statistiques globales */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold">{stats.attendanceRate}%</p>
            <p className="text-sm opacity-90">Taux d'assiduité</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold">{stats.presentCount}</p>
            <p className="text-sm opacity-90">Présences</p>
          </div>
          <div className="bg-red-500 text-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold">{stats.absentCount}</p>
            <p className="text-sm opacity-90">Absences</p>
          </div>
          <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold">{stats.lateCount}</p>
            <p className="text-sm opacity-90">Retards</p>
          </div>
          <div className="bg-purple-500 text-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold">{stats.totalSessions}</p>
            <p className="text-sm opacity-90">Sessions</p>
          </div>
        </div>
      )}

      {/* Sélection de date */}
      <div className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-4">
        <div className="flex items-center space-x-4">
          <Calendar size={20} className="text-[#0d5a61]" />
          <label htmlFor="date-select" className="font-medium text-gray-700">
            Sélectionner une date:
          </label>
          <input
            id="date-select"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0d5a61]"
          />
          <span className="text-sm text-gray-500">
            {recordsByDate.length} enregistrement(s) pour cette date
          </span>
        </div>
      </div>

      {/* Présences du jour sélectionné */}
      <div className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-6">
        <h2 className="text-lg font-semibold text-[#0d5a61] mb-4">
          Présences du {new Date(selectedDate).toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h2>

        {recordsByDate.length > 0 ? (
          <div className="space-y-3">
            {recordsByDate.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getStatusIcon(record.status)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{record.memberName}</h3>
                    {record.courseName && (
                      <p className="text-sm text-gray-600">{record.courseName}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {record.notes && (
                    <div className="text-sm text-gray-600 max-w-xs">
                      {record.notes}
                    </div>
                  )}
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                    {getStatusLabel(record.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <UserCheck size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune présence enregistrée</h3>
            <p className="text-gray-500">
              Aucune présence n'a été enregistrée pour cette date.
            </p>
          </div>
        )}
      </div>

      {/* Graphique de tendance (simulation) */}
      {stats && (
        <div className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-6">
          <h2 className="text-lg font-semibold text-[#0d5a61] mb-4 flex items-center">
            <TrendingUp size={20} className="mr-2" />
            Tendance d'assiduité
          </h2>
          
          <div className="space-y-4">
            {/* Barre de progression globale */}
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Taux d'assiduité global</span>
                <span>{stats.attendanceRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${stats.attendanceRate}%` }}
                ></div>
              </div>
            </div>

            {/* Répartition par statut */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle size={20} className="text-green-500" />
                </div>
                <p className="text-sm font-medium text-green-700">
                  {Math.round((stats.presentCount / (stats.presentCount + stats.absentCount + stats.lateCount + stats.excusedCount)) * 100)}%
                </p>
                <p className="text-xs text-green-600">Présents</p>
              </div>

              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <X size={20} className="text-red-500" />
                </div>
                <p className="text-sm font-medium text-red-700">
                  {Math.round((stats.absentCount / (stats.presentCount + stats.absentCount + stats.lateCount + stats.excusedCount)) * 100)}%
                </p>
                <p className="text-xs text-red-600">Absents</p>
              </div>

              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Clock size={20} className="text-yellow-500" />
                </div>
                <p className="text-sm font-medium text-yellow-700">
                  {Math.round((stats.lateCount / (stats.presentCount + stats.absentCount + stats.lateCount + stats.excusedCount)) * 100)}%
                </p>
                <p className="text-xs text-yellow-600">Retards</p>
              </div>

              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <AlertTriangle size={20} className="text-blue-500" />
                </div>
                <p className="text-sm font-medium text-blue-700">
                  {Math.round((stats.excusedCount / (stats.presentCount + stats.absentCount + stats.lateCount + stats.excusedCount)) * 100)}%
                </p>
                <p className="text-xs text-blue-600">Excusés</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
