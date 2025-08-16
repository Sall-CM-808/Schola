import React from "react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "dense" | "loose";
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

/**
 * Carte standard pour les sections de dashboard
 * Variants: dense (p-4), default (p-4 sm:p-5 lg:p-6), loose (p-6)
 */
export function SectionCard({
  children,
  className,
  variant = "default",
}: SectionCardProps) {
  const paddingClasses = {
    dense: "p-4",
    default: "p-4 sm:p-5 lg:p-6",
    loose: "p-6",
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-white shadow-sm",
        paddingClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Header de section avec titre à gauche et actions à droite
 */
export function SectionHeader({
  title,
  subtitle,
  actions,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between mb-6", className)}>
      <div className="space-y-1">
        <h2 className="text-base font-semibold tracking-tight text-white">
          {title}
        </h2>
        {subtitle && <p className="text-sm text-white/60">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export default SectionCard;
