"use client";

import { useState, useEffect } from "react";
import { Unit } from "@/types/unit";
import { membersData, Member } from "@/examples/membersData";
import { Users, UserPlus, Mail, Phone, Search, Filter } from "lucide-react";

interface UnitMembersProps {
  unit: Unit;
}

export default function UnitMembers({ unit }: UnitMembersProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "student" | "teacher" | "staff">("all");

  useEffect(() => {
    const unitMembers = membersData[unit.id] || [];
    setMembers(unitMembers);
    setFilteredMembers(unitMembers);
  }, [unit.id]);

  useEffect(() => {
    let filtered = members;

    // Filtrer par type
    if (filterType !== "all") {
      filtered = filtered.filter(member => member.type === filterType);
    }

    // Filtrer par recherche
    if (searchTerm) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (member.studentNumber && member.studentNumber.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredMembers(filtered);
  }, [members, searchTerm, filterType]);

  const getMemberTypeIcon = (type: string) => {
    switch (type) {
      case "teacher": return "👨‍🏫";
      case "student": return "👨‍🎓";
      case "staff": return "👨‍💼";
      default: return "👤";
    }
  };

  const getMemberTypeLabel = (type: string) => {
    switch (type) {
      case "teacher": return "Enseignant";
      case "student": return "Étudiant/Élève";
      case "staff": return "Personnel";
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      case "suspended": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const memberStats = {
    total: members.length,
    students: members.filter(m => m.type === "student").length,
    teachers: members.filter(m => m.type === "teacher").length,
    staff: members.filter(m => m.type === "staff").length,
    active: members.filter(m => m.status === "active").length
  };

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#0d5a61] mb-2">Membres - {unit.name}</h1>
            <p className="text-gray-600">
              {members.length > 0 
                ? `${members.length} membre(s) dans cette unité`
                : "Aucun membre"
              }
            </p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#0d5a61] text-white rounded-lg hover:bg-[#0a4a50] transition-colors">
            <UserPlus size={16} />
            <span>Ajouter Membre</span>
          </button>
        </div>
      </div>

      {/* Statistiques */}
      {members.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold">{memberStats.total}</p>
            <p className="text-sm opacity-90">Total</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold">{memberStats.students}</p>
            <p className="text-sm opacity-90">Étudiants</p>
          </div>
          <div className="bg-purple-500 text-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold">{memberStats.teachers}</p>
            <p className="text-sm opacity-90">Enseignants</p>
          </div>
          <div className="bg-orange-500 text-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold">{memberStats.staff}</p>
            <p className="text-sm opacity-90">Personnel</p>
          </div>
          <div className="bg-teal-500 text-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold">{memberStats.active}</p>
            <p className="text-sm opacity-90">Actifs</p>
          </div>
        </div>
      )}

      {/* Filtres et recherche */}
      {members.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Barre de recherche */}
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, email ou numéro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0d5a61]"
              />
            </div>
            
            {/* Filtre par type */}
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0d5a61]"
              >
                <option value="all">Tous</option>
                <option value="student">Étudiants</option>
                <option value="teacher">Enseignants</option>
                <option value="staff">Personnel</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Liste des membres */}
      {filteredMembers.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Membre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Inscription
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">
                          {getMemberTypeIcon(member.type)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {member.name}
                          </div>
                          {member.studentNumber && (
                            <div className="text-sm text-gray-500">
                              {member.studentNumber}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {getMemberTypeLabel(member.type)}
                      </span>
                      {member.grade && (
                        <div className="text-xs text-gray-500">{member.grade}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center text-sm text-gray-900">
                          <Mail size={14} className="mr-1" />
                          {member.email}
                        </div>
                        {member.phone && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Phone size={14} className="mr-1" />
                            {member.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(member.joinDate).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : members.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun résultat</h3>
          <p className="text-gray-500">
            Aucun membre ne correspond à vos critères de recherche.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Users size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun membre</h3>
          <p className="text-gray-500 mb-6">
            Cette unité ne contient aucun membre pour le moment.
          </p>
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#0d5a61] text-white rounded-lg hover:bg-[#0a4a50] transition-colors mx-auto">
            <UserPlus size={16} />
            <span>Ajouter le premier membre</span>
          </button>
        </div>
      )}
    </div>
  );
}
