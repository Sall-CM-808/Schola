"use client";

import { useState, useEffect } from "react";
import { Unit } from "@/types/unit";
import { attributionsData, Attribution } from "@/examples/rolesData";
import { usePermissions } from "@/hooks/usePermissions";
import { ShowIfPermission } from "@/components/auth/RequirePermission";
import { UserCheck, Plus, Edit, Trash2, User, Shield, Calendar } from "lucide-react";

interface UnitAttributionsProps {
  unit: Unit;
}

export default function UnitAttributions({ unit }: UnitAttributionsProps) {
  const [attributions, setAttributions] = useState<Attribution[]>([]);
  const { canViewAllAttributions, canViewOwnAttributions, canCreateAttribution, canChangeAttribution, session } = usePermissions();

  useEffect(() => {
    // Charger les attributions selon les permissions
    const unitAttributions = attributionsData[unit.id] || [];
    
    if (canViewAllAttributions(unit.id)) {
      setAttributions(unitAttributions);
    } else if (canViewOwnAttributions(unit.id)) {
      // Filtrer seulement les attributions créées par l'utilisateur actuel
      const ownAttributions = unitAttributions.filter(attr => attr.assignedBy === session?.user?.name);
      setAttributions(ownAttributions);
    } else {
      setAttributions([]);
    }
  }, [unit.id, canViewAllAttributions, canViewOwnAttributions, session]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#0d5a61] mb-2">Attributions - {unit.name}</h1>
            <p className="text-gray-600">
              {attributions.length > 0 
                ? `${attributions.length} attribution(s) de rôle(s) dans cette unité`
                : "Aucune attribution de rôle"
              }
            </p>
          </div>
          <ShowIfPermission unitId={unit.id} anyOf={["attribution.create"]}>
            <button className="flex items-center space-x-2 px-4 py-2 bg-[#0d5a61] text-white rounded-lg hover:bg-[#0a4a50] transition-colors">
              <Plus size={16} />
              <span>Nouvelle Attribution</span>
            </button>
          </ShowIfPermission>
        </div>
      </div>

      {/* Liste des attributions */}
      {attributions.length > 0 ? (
        <div className="space-y-4">
          {attributions.map((attribution) => (
            <div key={attribution.id} className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 bg-[#d9f0f2] rounded-full flex items-center justify-center">
                      <User size={20} className="text-[#0d5a61]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{attribution.userName}</h3>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <Shield size={16} className="text-[#0d5a61]" />
                        <span className="text-sm font-medium text-[#0d5a61]">{attribution.roleName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-600">
                          Assigné le {formatDate(attribution.assignedDate)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-xs text-gray-500">
                        Assigné par: {attribution.assignedBy}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <ShowIfPermission unitId={unit.id} anyOf={["attribution.change"]}>
                    <button className="p-2 text-gray-400 hover:text-[#0d5a61] transition-colors">
                      <Edit size={16} />
                    </button>
                  </ShowIfPermission>
                  <ShowIfPermission unitId={unit.id} anyOf={["attribution.delete"]}>
                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </ShowIfPermission>
                </div>
              </div>

              {/* Informations supplémentaires */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">ID Utilisateur:</span>
                    <p className="font-medium">{attribution.userId}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">ID Rôle:</span>
                    <p className="font-medium">{attribution.roleId}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Statut:</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 ml-2">
                      Actif
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-12 text-center">
          <div className="text-gray-400 mb-4">
            <UserCheck size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune attribution</h3>
          <p className="text-gray-500 mb-6">
            Aucun utilisateur n'a encore été assigné à un rôle dans cette unité.
          </p>
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#0d5a61] text-white rounded-lg hover:bg-[#0a4a50] transition-colors mx-auto">
            <Plus size={16} />
            <span>Créer la première attribution</span>
          </button>
        </div>
      )}

      {/* Statistiques des attributions */}
      {attributions.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-6">
          <h2 className="text-lg font-semibold text-[#0d5a61] mb-4">Statistiques des Attributions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#0d5a61]">{attributions.length}</p>
              <p className="text-sm text-gray-600">Total attributions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#0d5a61]">
                {new Set(attributions.map(attr => attr.userId)).size}
              </p>
              <p className="text-sm text-gray-600">Utilisateurs uniques</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#0d5a61]">
                {new Set(attributions.map(attr => attr.roleId)).size}
              </p>
              <p className="text-sm text-gray-600">Rôles assignés</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#0d5a61]">
                {attributions.filter(attr => {
                  const assignedDate = new Date(attr.assignedDate);
                  const oneMonthAgo = new Date();
                  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                  return assignedDate > oneMonthAgo;
                }).length}
              </p>
              <p className="text-sm text-gray-600">Ce mois-ci</p>
            </div>
          </div>
        </div>
      )}

      {/* Répartition par rôle */}
      {attributions.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-6">
          <h2 className="text-lg font-semibold text-[#0d5a61] mb-4">Répartition par Rôle</h2>
          <div className="space-y-3">
            {Object.entries(
              attributions.reduce((acc, attr) => {
                acc[attr.roleName] = (acc[attr.roleName] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
            ).map(([roleName, count]) => (
              <div key={roleName} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield size={16} className="text-[#0d5a61]" />
                  <span className="font-medium">{roleName}</span>
                </div>
                <span className="text-sm font-medium text-[#0d5a61]">
                  {count} attribution{count > 1 ? 's' : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
