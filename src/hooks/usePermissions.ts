"use client";

import { useState, useEffect } from 'react';

// Type pour les permissions
export type Permission = string;

interface User {
  id: string;
  name: string;
  email: string;
  permissions: Permission[];
}

export const usePermissions = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler la récupération des permissions utilisateur
    const mockUser: User = {
      id: "1",
      name: "Utilisateur Test",
      email: "test@fiinor.com",
      permissions: [
        "view_dashboard",
        "manage_users",
        "edit_content",
        "view_reports",
        "manage_units"
      ]
    };
    
    setUser(mockUser);
    setIsLoading(false);
  }, []);

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return permissions.some(permission => user.permissions.includes(permission));
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return permissions.every(permission => user.permissions.includes(permission));
  };

  return {
    user,
    isLoading,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
};
