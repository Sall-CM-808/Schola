"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Users,
  Calendar,
  BarChart3,
  Plus,
  Search,
  Eye,
  Edit,
  Phone,
  Mail,
  ChevronRight,
  Home,
  School,
  FileText,
  CheckCircle,
  Clock,
  MapPin,
  User,
  GraduationCap,
} from "lucide-react";

interface Student {
  id: string;
  matricule: string;
  firstName: string;
  lastName: string;
  performance: number;
  attendance: number;
  lastActivity: string;
}

interface Schedule {
  time: string;
  monday: { subject: string; teacher: string; room: string } | null;
  tuesday: { subject: string; teacher: string; room: string } | null;
  wednesday: { subject: string; teacher: string; room: string } | null;
  thursday: { subject: string; teacher: string; room: string } | null;
  friday: { subject: string; teacher: string; room: string } | null;
}

interface Evaluation {
  id: string;
  subject: string;
  date: string;
  type: "Devoir" | "Test" | "Contrôle" | "Examen";
  teacher: string;
  status: "À venir" | "En attente de correction" | "Publiée";
}

const ClassDetailPage: React.FC<{ params: { level: string } }> = ({
  params,
}) => {
  const level = parseInt(params.level);
  const [activeTab, setActiveTab] = useState<
    "overview" | "students" | "schedule" | "evaluations"
  >("overview");

  const students: Student[] = [
    {
      id: "1",
      matricule: "PRI001",
      firstName: "Alice",
      lastName: "Martin",
      performance: 92,
      attendance: 96,
      lastActivity: "Devoir de français - 15/09",
    },
    {
      id: "2",
      matricule: "PRI002",
      firstName: "Lucas",
      lastName: "Dupont",
      performance: 88,
      attendance: 94,
      lastActivity: "Test de mathématiques - 12/09",
    },
    {
      id: "3",
      matricule: "PRI003",
      firstName: "Emma",
      lastName: "Bernard",
      performance: 95,
      attendance: 98,
      lastActivity: "Contrôle d'éveil - 10/09",
    },
    {
      id: "4",
      matricule: "PRI004",
      firstName: "Noah",
      lastName: "Petit",
      performance: 87,
      attendance: 93,
      lastActivity: "Devoir d'arts - 08/09",
    },
    {
      id: "5",
      matricule: "PRI005",
      firstName: "Léa",
      lastName: "Moreau",
      performance: 91,
      attendance: 95,
      lastActivity: "Test de français - 14/09",
    },
  ];

  const schedule: Schedule[] = [
    {
      time: "08:00 - 09:00",
      monday: {
        subject: "Français",
        teacher: "Mme. Dubois",
        room: "Salle 101",
      },
      tuesday: {
        subject: "Mathématiques",
        teacher: "M. Leroy",
        room: "Salle 101",
      },
      wednesday: {
        subject: "Français",
        teacher: "Mme. Dubois",
        room: "Salle 101",
      },
      thursday: {
        subject: "Mathématiques",
        teacher: "M. Leroy",
        room: "Salle 101",
      },
      friday: {
        subject: "Français",
        teacher: "Mme. Dubois",
        room: "Salle 101",
      },
    },
    {
      time: "09:00 - 10:00",
      monday: {
        subject: "Mathématiques",
        teacher: "M. Leroy",
        room: "Salle 101",
      },
      tuesday: { subject: "Éveil", teacher: "Mme. Martin", room: "Salle 101" },
      wednesday: {
        subject: "Mathématiques",
        teacher: "M. Leroy",
        room: "Salle 101",
      },
      thursday: { subject: "Éveil", teacher: "Mme. Martin", room: "Salle 101" },
      friday: {
        subject: "Mathématiques",
        teacher: "M. Leroy",
        room: "Salle 101",
      },
    },
    {
      time: "10:15 - 11:15",
      monday: { subject: "Éveil", teacher: "Mme. Martin", room: "Salle 101" },
      tuesday: {
        subject: "Français",
        teacher: "Mme. Dubois",
        room: "Salle 101",
      },
      wednesday: {
        subject: "Éveil",
        teacher: "Mme. Martin",
        room: "Salle 101",
      },
      thursday: {
        subject: "Français",
        teacher: "Mme. Dubois",
        room: "Salle 101",
      },
      friday: { subject: "Éveil", teacher: "Mme. Martin", room: "Salle 101" },
    },
    {
      time: "11:15 - 12:15",
      monday: {
        subject: "Arts plastiques",
        teacher: "M. Bernard",
        room: "Salle 101",
      },
      tuesday: {
        subject: "Arts plastiques",
        teacher: "M. Bernard",
        room: "Salle 101",
      },
      wednesday: {
        subject: "Arts plastiques",
        teacher: "M. Bernard",
        room: "Salle 101",
      },
      thursday: {
        subject: "Arts plastiques",
        teacher: "M. Bernard",
        room: "Salle 101",
      },
      friday: {
        subject: "Arts plastiques",
        teacher: "M. Bernard",
        room: "Salle 101",
      },
    },
  ];

  const evaluations: Evaluation[] = [
    {
      id: "1",
      subject: "Français",
      date: "20/09/2024",
      type: "Devoir",
      teacher: "Mme. Dubois",
      status: "À venir",
    },
    {
      id: "2",
      subject: "Mathématiques",
      date: "18/09/2024",
      type: "Test",
      teacher: "M. Leroy",
      status: "En attente de correction",
    },
    {
      id: "3",
      subject: "Éveil",
      date: "15/09/2024",
      type: "Contrôle",
      teacher: "Mme. Martin",
      status: "Publiée",
    },
    {
      id: "4",
      subject: "Arts plastiques",
      date: "25/09/2024",
      type: "Devoir",
      teacher: "M. Bernard",
      status: "À venir",
    },
  ];

  const tabs = [
    {
      id: "overview",
      label: "Vue d'ensemble",
      icon: <BarChart3 className="w-4 h-4" />,
    },
    { id: "students", label: "Élèves", icon: <Users className="w-4 h-4" /> },
    {
      id: "schedule",
      label: "Emploi du temps",
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      id: "evaluations",
      label: "Évaluations",
      icon: <FileText className="w-4 h-4" />,
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      Nombre d'élèves
                    </p>
                    <p className="text-3xl font-bold text-[#1d8b93]">
                      {students.length}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-[#1d8b93]" />
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      Performance moyenne
                    </p>
                    <p className="text-3xl font-bold text-[#1d8b93]">
                      {Math.round(
                        students.reduce((sum, s) => sum + s.performance, 0) /
                          students.length
                      )}
                      %
                    </p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-[#1d8b93]" />
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      Taux de présence
                    </p>
                    <p className="text-3xl font-bold text-[#1d8b93]">
                      {Math.round(
                        students.reduce((sum, s) => sum + s.attendance, 0) /
                          students.length
                      )}
                      %
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-[#1d8b93]" />
                </div>
              </div>
            </div>

            {/* Activités récentes */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Activités récentes
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#b8d070] rounded-full"></div>
                    <span className="text-gray-900">
                      Devoir de français - 15/09
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">Mme. Dubois</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#1d8b93] rounded-full"></div>
                    <span className="text-gray-900">
                      Test de mathématiques - 12/09
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">M. Leroy</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#b8d070] rounded-full"></div>
                    <span className="text-gray-900">
                      Contrôle d'éveil - 10/09
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">Mme. Martin</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "students":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Liste des élèves
              </h3>
              <button className="bg-[#1d8b93] hover:bg-[#0d5a61] text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Ajouter un élève</span>
              </button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nom complet
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Matricule
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Présence
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dernière activité
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {student.firstName} {student.lastName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {student.matricule}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {student.performance}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {student.attendance}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {student.lastActivity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-[#1d8b93] hover:text-[#0d5a61]">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-[#1d8b93] hover:text-[#0d5a61]">
                            <Phone className="w-4 h-4" />
                          </button>
                          <button className="text-[#1d8b93] hover:text-[#0d5a61]">
                            <Mail className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "schedule":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Emploi du temps
            </h3>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Heure
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lundi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mardi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mercredi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jeudi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vendredi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {schedule.map((row, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {row.time}
                      </td>
                      {[
                        row.monday,
                        row.tuesday,
                        row.wednesday,
                        row.thursday,
                        row.friday,
                      ].map((day, dayIndex) => (
                        <td
                          key={dayIndex}
                          className="px-6 py-4 whitespace-nowrap"
                        >
                          {day ? (
                            <div className="text-sm">
                              <div className="font-medium text-gray-900">
                                {day.subject}
                              </div>
                              <div className="text-gray-500">{day.teacher}</div>
                              <div className="text-gray-500">{day.room}</div>
                            </div>
                          ) : (
                            <div className="text-sm text-gray-400">-</div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "evaluations":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Planning d'évaluations
              </h3>
              <button className="bg-[#1d8b93] hover:bg-[#0d5a61] text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Nouvelle évaluation</span>
              </button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Matière
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enseignant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {evaluations.map((evaluation) => (
                    <tr key={evaluation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {evaluation.subject}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {evaluation.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {evaluation.type}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {evaluation.teacher}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            evaluation.status === "À venir"
                              ? "bg-blue-100 text-blue-800"
                              : evaluation.status === "En attente de correction"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {evaluation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-gray-600 mb-4">
            <Home className="w-4 h-4" />
            <span>Admin</span>
            <ChevronRight className="w-4 h-4" />
            <School className="w-4 h-4" />
            <span>Éducation</span>
            <ChevronRight className="w-4 h-4" />
            <span>Primaire</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{level}ème Année</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {level}ème Année
              </h1>
              <p className="text-gray-600 text-lg">
                Classe de {level}ème année du primaire
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg p-1 border border-gray-200 shadow-sm mb-8">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#1d8b93] text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div>{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default ClassDetailPage;
