"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface UnitContextType {
  id: string | null;
  type_unite: string | null;
  nom: string | null;
  path: string[] | null;
  setUnit: (
    unit: {
      id: string;
      type_unite: string;
      nom: string;
      path: string[];
    } | null
  ) => void;
  clearUnit: () => void;
}

const UnitContext = createContext<UnitContextType | undefined>(undefined);

export const useUnitContext = () => {
  const context = useContext(UnitContext);
  if (context === undefined) {
    throw new Error("useUnitContext must be used within a UnitProvider");
  }
  return context;
};

interface UnitProviderProps {
  children: ReactNode;
}

export const UnitProvider: React.FC<UnitProviderProps> = ({ children }) => {
  const [unit, setUnitState] = useState<{
    id: string;
    type_unite: string;
    nom: string;
    path: string[];
  } | null>(null);

  const setUnit = (
    unitData: {
      id: string;
      type_unite: string;
      nom: string;
      path: string[];
    } | null
  ) => {
    setUnitState(unitData);
  };

  const clearUnit = () => {
    setUnitState(null);
  };

  const value: UnitContextType = {
    id: unit?.id || null,
    type_unite: unit?.type_unite || null,
    nom: unit?.nom || null,
    path: unit?.path || null,
    setUnit,
    clearUnit,
  };

  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
};


