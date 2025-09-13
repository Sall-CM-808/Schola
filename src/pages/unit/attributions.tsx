"use client";

import { useState, useEffect } from "react";
import { Unit } from "@/types/unit";
import { attributionsData, Attribution } from "@/examples/rolesData";
import { usePermissions } from "@/hooks/usePermissions";
import { ShowIfPermission } from "@/components/auth/RequirePermission";
import {
  UserCheck,
  Plus,
  Edit,
  Trash2,
  User,
  Shield,
  Calendar,
} from "lucide-react";

interface UnitAttributionsProps {
  unit: Unit;
}

export default function UnitAttributions({ unit }: UnitAttributionsProps) {
  const [attributions, setAttributions] = useState<Attribution[]>([]);
  const {
    canViewAllAttributions,
    canViewOwnAttributions,
    canCreateAttribution,
    canChangeAttribution,
    session,
  } = usePermissions();

  useEffect(() => {
    // Charger les attributions selon les permissions
    const unitAttributions = attributionsData[unit.id] || [];

    if (canViewAllAttributions(unit.id)) {
      setAttributions(unitAttributions);
    } else if (canViewOwnAttributions(unit.id)) {
      // Filtrer seulement les attributions créées par l'utilisateur actuel
      const ownAttributions = unitAttributions.filter(
        (attr) => attr.assignedBy === session?.user?.name
      );
      setAttributions(ownAttributions);
    } else {
      setAttributions([]);
    }
  }, [unit.id, canViewAllAttributions, canViewOwnAttributions, session]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="bg-[rgba(255,255,255,0.06)] rounded-lg shadow-sm border border-[rgba(255,255,255,0.14)] p-6 backdrop-blur-sm">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Attributions - {unit.name}
            </h1>
            <p className="text-[rgba(255,255,255,0.70)]">
              {attributions.length > 0
                ? `${attributions.length} attribution(s) de rôle(s) dans cette unité`
                : "Aucune attribution de rôle"}
            </p>
          </div>
          <ShowIfPermission unitId={unit.id} anyOf={["attribution.create"]}>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93] rounded-lg hover:from-[#a2c65e] hover:to-[#8fb650] transition-all duration-200 shadow-lg">
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
            <div
              key={attribution.id}
              className="bg-[rgba(255,255,255,0.06)] rounded-lg shadow-sm border border-[rgba(255,255,255,0.14)] p-6 backdrop-blur-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#b8d070] to-[#a2c65e] rounded-full flex items-center justify-center shadow-lg">
                      <User size={20} className="text-[#1d8b93]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">
                      {attribution.userName}
                    </h3>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <Shield size={16} className="text-[#b8d070]" />
                        <span className="text-sm font-medium text-[#b8d070]">
                          {attribution.roleName}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar
                          size={16}
                          className="text-[rgba(255,255,255,0.70)]"
                        />
                        <span className="text-sm text-[rgba(255,255,255,0.70)]">
                          Assigné le {formatDate(attribution.assignedDate)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-xs text-[rgba(255,255,255,0.55)]">
                        Assigné par: {attribution.assignedBy}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <ShowIfPermission
                    unitId={unit.id}
                    anyOf={["attribution.change"]}
                  >
                    <button className="p-2 text-[rgba(255,255,255,0.70)] hover:text-[#b8d070] transition-colors">
                      <Edit size={16} />
                    </button>
                  </ShowIfPermission>
                  <ShowIfPermission
                    unitId={unit.id}
                    anyOf={["attribution.delete"]}
                  >
                    <button className="p-2 text-[rgba(255,255,255,0.70)] hover:text-[#ef6b6b] transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </ShowIfPermission>
                </div>
              </div>

              {/* Informations supplémentaires */}
              <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-4 border border-[rgba(255,255,255,0.10)]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-[rgba(255,255,255,0.70)]">
                      ID Utilisateur:
                    </span>
                    <p className="font-medium text-white">
                      {attribution.userId}
                    </p>
                  </div>
                  <div>
                    <span className="text-[rgba(255,255,255,0.70)]">
                      ID Rôle:
                    </span>
                    <p className="font-medium text-white">
                      {attribution.roleId}
                    </p>
                  </div>
                  <div>
                    <span className="text-[rgba(255,255,255,0.70)]">
                      Statut:
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[rgba(64,201,139,0.2)] text-[#40c98b] border border-[rgba(64,201,139,0.3)] ml-2">
                      Actif
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[rgba(255,255,255,0.06)] rounded-lg shadow-sm border border-[rgba(255,255,255,0.14)] p-12 text-center backdrop-blur-sm">
          <div className="text-[rgba(255,255,255,0.70)] mb-4">
            <UserCheck size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            Aucune attribution
          </h3>
          <p className="text-[rgba(255,255,255,0.70)] mb-6">
            Aucun utilisateur n'a encore été assigné à un rôle dans cette unité.
          </p>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93] rounded-lg hover:from-[#a2c65e] hover:to-[#8fb650] transition-all duration-200 shadow-lg mx-auto">
            <Plus size={16} />
            <span>Créer la première attribution</span>
          </button>
        </div>
      )}

      {/* Statistiques des attributions */}
      {attributions.length > 0 && (
        <div className="bg-[rgba(255,255,255,0.06)] rounded-lg shadow-sm border border-[rgba(255,255,255,0.14)] p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-4">
            Statistiques des Attributions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#b8d070]">
                {attributions.length}
              </p>
              <p className="text-sm text-[rgba(255,255,255,0.70)]">
                Total attributions
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#b8d070]">
                {new Set(attributions.map((attr) => attr.userId)).size}
              </p>
              <p className="text-sm text-[rgba(255,255,255,0.70)]">
                Utilisateurs uniques
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#b8d070]">
                {new Set(attributions.map((attr) => attr.roleId)).size}
              </p>
              <p className="text-sm text-[rgba(255,255,255,0.70)]">
                Rôles assignés
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#b8d070]">
                {
                  attributions.filter((attr) => {
                    const assignedDate = new Date(attr.assignedDate);
                    const oneMonthAgo = new Date();
                    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                    return assignedDate > oneMonthAgo;
                  }).length
                }
              </p>
              <p className="text-sm text-[rgba(255,255,255,0.70)]">
                Ce mois-ci
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Répartition par rôle */}
      {attributions.length > 0 && (
        <div className="bg-[rgba(255,255,255,0.06)] rounded-lg shadow-sm border border-[rgba(255,255,255,0.14)] p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-4">
            Répartition par Rôle
          </h2>
          <div className="space-y-3">
            {Object.entries(
              attributions.reduce((acc, attr) => {
                acc[attr.roleName] = (acc[attr.roleName] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
            ).map(([roleName, count]) => (
              <div
                key={roleName}
                className="flex items-center justify-between p-3 bg-[rgba(255,255,255,0.05)] rounded-lg border border-[rgba(255,255,255,0.10)]"
              >
                <div className="flex items-center space-x-3">
                  <Shield size={16} className="text-[#b8d070]" />
                  <span className="font-medium text-white">{roleName}</span>
                </div>
                <span className="text-sm font-medium text-[#b8d070]">
                  {count} attribution{count > 1 ? "s" : ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
