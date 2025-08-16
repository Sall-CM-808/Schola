import React from "react";
import { cn } from "@/lib/utils";

interface DashboardGridProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Grille maître 12 colonnes pour les dashboards
 * Utilise des gaps responsifs pour un espacement cohérent
 */
export default function DashboardGrid({
  children,
  className,
}: DashboardGridProps) {
  return (
    <div className={cn("grid grid-cols-12 gap-4 sm:gap-5 lg:gap-6", className)}>
      {children}
    </div>
  );
}
