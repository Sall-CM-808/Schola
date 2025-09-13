"use client";

import { useState, useEffect } from "react";
import { Unit } from "@/types/unit";
import { rolesData, Role } from "@/examples/rolesData";
import { usePermissions } from "@/hooks/usePermissions";
import { ShowIfPermission } from "@/components/auth/RequirePermission";
import { Shield, Plus, Edit, Trash2, Users } from "lucide-react";

interface UnitRolesProps {
  unit: Unit;
}

export default function UnitRoles({ unit }: UnitRolesProps) {
  const [roles, setRoles] = useState<Role[]>([]);
  const {
    canViewAllRoles,
    canViewOwnRoles,
    canCreateRole,
    canChangeRole,
    canDeleteRole,
    session,
  } = usePermissions();

  useEffect(() => {
    // Charger les rôles de l'unité selon les permissions
    const unitRoles = rolesData[unit.id] || [];

    if (canViewAllRoles(unit.id)) {
      setRoles(unitRoles);
    } else if (canViewOwnRoles(unit.id)) {
      // Filtrer seulement les rôles créés par l'utilisateur actuel
      const ownRoles = unitRoles.filter(
        (role) => role.createdBy === session?.user?.id
      );
      setRoles(ownRoles);
    } else {
      setRoles([]);
    }
  }, [unit.id, canViewAllRoles, canViewOwnRoles, session]);

  const getPermissionBadgeColor = (permission: string) => {
    const colors: Record<string, string> = {
      gestion_complete: "bg-red-100 text-red-800",
      gestion_faculte: "bg-blue-100 text-blue-800",
      gestion_departement: "bg-green-100 text-green-800",
      gestion_ecole: "bg-purple-100 text-purple-800",
      enseignement: "bg-yellow-100 text-yellow-800",
      evaluation: "bg-orange-100 text-orange-800",
      default: "bg-gray-100 text-gray-800",
    };

    return colors[permission] || colors.default;
  };

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="bg-[rgba(255,255,255,0.06)] rounded-lg shadow-sm border border-[rgba(255,255,255,0.14)] p-6 backdrop-blur-sm">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Rôles - {unit.name}
            </h1>
            <p className="text-[rgba(255,255,255,0.70)]">
              {roles.length > 0
                ? `${roles.length} rôle(s) défini(s) pour cette unité`
                : "Aucun rôle défini"}
            </p>
          </div>
          <ShowIfPermission unitId={unit.id} anyOf={["role.create"]}>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93] rounded-lg hover:from-[#a2c65e] hover:to-[#8fb650] transition-all duration-200 shadow-lg">
              <Plus size={16} />
              <span>Nouveau Rôle</span>
            </button>
          </ShowIfPermission>
        </div>
      </div>

      {/* Liste des rôles */}
      {roles.length > 0 ? (
        <div className="space-y-4">
          {roles.map((role) => (
            <div
              key={role.id}
              className="bg-[rgba(255,255,255,0.06)] rounded-lg shadow-sm border border-[rgba(255,255,255,0.14)] p-6 backdrop-blur-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <Shield size={20} className="text-[#b8d070]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {role.name}
                    </h3>
                    <p className="text-[rgba(255,255,255,0.70)] mt-1">
                      {role.description}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <ShowIfPermission unitId={unit.id} anyOf={["role.change"]}>
                    <button className="p-2 text-[rgba(255,255,255,0.70)] hover:text-[#b8d070] transition-colors">
                      <Edit size={16} />
                    </button>
                  </ShowIfPermission>
                  <ShowIfPermission unitId={unit.id} anyOf={["role.delete"]}>
                    <button className="p-2 text-[rgba(255,255,255,0.70)] hover:text-[#ef6b6b] transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </ShowIfPermission>
                </div>
              </div>

              {/* Statistiques du rôle */}
              <div className="flex items-center space-x-6 mb-4">
                <div className="flex items-center space-x-2">
                  <Users size={16} className="text-[#b8d070]" />
                  <span className="text-sm text-[rgba(255,255,255,0.70)]">
                    {role.userCount} utilisateur(s)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield size={16} className="text-[#b8d070]" />
                  <span className="text-sm text-[rgba(255,255,255,0.70)]">
                    {role.permissions.length} permission(s)
                  </span>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <h4 className="text-sm font-medium text-white mb-2">
                  Permissions
                </h4>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[rgba(184,208,112,0.2)] text-[#b8d070] border border-[rgba(184,208,112,0.3)]"
                    >
                      {permission.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[rgba(255,255,255,0.06)] rounded-lg shadow-sm border border-[rgba(255,255,255,0.14)] p-12 text-center backdrop-blur-sm">
          <div className="text-[rgba(255,255,255,0.70)] mb-4">
            <Shield size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            Aucun rôle défini
          </h3>
          <p className="text-[rgba(255,255,255,0.70)] mb-6">
            Commencez par créer des rôles pour organiser les permissions dans
            cette unité.
          </p>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93] rounded-lg hover:from-[#a2c65e] hover:to-[#8fb650] transition-all duration-200 shadow-lg mx-auto">
            <Plus size={16} />
            <span>Créer le premier rôle</span>
          </button>
        </div>
      )}

      {/* Statistiques des rôles */}
      {roles.length > 0 && (
        <div className="bg-[rgba(255,255,255,0.06)] rounded-lg shadow-sm border border-[rgba(255,255,255,0.14)] p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-4">
            Statistiques des Rôles
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#b8d070]">
                {roles.length}
              </p>
              <p className="text-sm text-[rgba(255,255,255,0.70)]">
                Total rôles
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#b8d070]">
                {roles.reduce((sum, role) => sum + role.userCount, 0)}
              </p>
              <p className="text-sm text-[rgba(255,255,255,0.70)]">
                Utilisateurs assignés
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#b8d070]">
                {new Set(roles.flatMap((role) => role.permissions)).size}
              </p>
              <p className="text-sm text-[rgba(255,255,255,0.70)]">
                Permissions uniques
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#b8d070]">
                {Math.round(
                  roles.reduce((sum, role) => sum + role.userCount, 0) /
                    roles.length
                )}
              </p>
              <p className="text-sm text-[rgba(255,255,255,0.70)]">
                Moy. utilisateurs/rôle
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
