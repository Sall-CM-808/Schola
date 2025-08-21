"use client";

import React from "react";
import { motion } from "framer-motion";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string }>;
  color?:
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "purple"
    | "brand"
    | "blue"
    | "green"
    | "orange"
    | "red";
  delta?: number;
  trend?: "up" | "down" | "stable";
  // Legacy props for backward compatibility
  label?: string;
  caption?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color = "primary",
  delta,
  trend,
  // Legacy props for backward compatibility
  label,
  caption,
}) => {
  // Use new props or fallback to legacy props
  const displayTitle = title || label || "";
  const displaySubtitle = subtitle || caption || "";

  const colorClasses = {
    primary: {
      bg: "from-blue-500/20 to-blue-600/20",
      border: "border-blue-500/30",
      icon: "text-blue-400",
      iconBg: "bg-blue-500/20 border-blue-500/30",
      text: "text-blue-300",
    },
    success: {
      bg: "from-green-500/20 to-green-600/20",
      border: "border-green-500/30",
      icon: "text-green-400",
      iconBg: "bg-green-500/20 border-green-500/30",
      text: "text-green-300",
    },
    warning: {
      bg: "from-orange-500/20 to-orange-600/20",
      border: "border-orange-500/30",
      icon: "text-orange-400",
      iconBg: "bg-orange-500/20 border-orange-500/30",
      text: "text-orange-300",
    },
    danger: {
      bg: "from-red-500/20 to-red-600/20",
      border: "border-red-500/30",
      icon: "text-red-400",
      iconBg: "bg-red-500/20 border-red-500/30",
      text: "text-red-300",
    },
    purple: {
      bg: "from-purple-500/20 to-purple-600/20",
      border: "border-purple-500/30",
      icon: "text-purple-400",
      iconBg: "bg-purple-500/20 border-purple-500/30",
      text: "text-purple-300",
    },
    brand: {
      bg: "from-[#1d8b93]/20 to-[#0d5a61]/20",
      border: "border-[#1d8b93]/30",
      icon: "text-[#b8d070]",
      iconBg: "bg-[#1d8b93]/20 border-[#1d8b93]/30",
      text: "text-[#b8d070]",
    },
    // Legacy colors for backward compatibility
    blue: {
      bg: "from-blue-500/20 to-blue-600/20",
      border: "border-blue-500/30",
      icon: "text-blue-400",
      iconBg: "bg-blue-500/20 border-blue-500/30",
      text: "text-blue-300",
    },
    green: {
      bg: "from-green-500/20 to-green-600/20",
      border: "border-green-500/30",
      icon: "text-green-400",
      iconBg: "bg-green-500/20 border-green-500/30",
      text: "text-green-300",
    },
    orange: {
      bg: "from-orange-500/20 to-orange-600/20",
      border: "border-orange-500/30",
      icon: "text-orange-400",
      iconBg: "bg-orange-500/20 border-orange-500/30",
      text: "text-orange-300",
    },
    red: {
      bg: "from-red-500/20 to-red-600/20",
      border: "border-red-500/30",
      icon: "text-red-400",
      iconBg: "bg-red-500/20 border-red-500/30",
      text: "text-red-300",
    },
  };

  const colorClass = colorClasses[color];

  // Trend icon component
  const getTrendIcon = () => {
    if (!trend) return null;

    switch (trend) {
      case "up":
        return <span className="text-green-400">↗</span>;
      case "down":
        return <span className="text-red-400">↘</span>;
      case "stable":
        return <span className="text-yellow-400">→</span>;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`relative p-6 rounded-xl bg-gradient-to-br ${colorClass.bg} backdrop-blur-sm border ${colorClass.border} shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      {/* Background decoration */}
      <div className="absolute top-2 right-2 w-12 h-12 border-t-2 border-r-2 border-white/10 rounded-tr-xl opacity-50"></div>
      <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-white/10 rounded-bl-xl opacity-30"></div>

      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-white/70 mb-1">
            {displayTitle}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">
              {typeof value === "number" ? value.toLocaleString() : value}
            </span>
            {delta !== undefined && (
              <span
                className={`text-sm font-medium flex items-center gap-1 ${
                  delta > 0
                    ? "text-green-400"
                    : delta < 0
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >
                {getTrendIcon()}
                {delta > 0 ? "+" : ""}
                {delta}%
              </span>
            )}
          </div>
        </div>

        {icon && (
          <div
            className={`p-4 rounded-xl border ${colorClass.iconBg} shadow-lg`}
          >
            {React.createElement(icon, {
              className: `w-8 h-8 ${colorClass.icon}`,
            })}
          </div>
        )}
      </div>

      {displaySubtitle && (
        <p className={`text-sm ${colorClass.text}`}>{displaySubtitle}</p>
      )}
    </motion.div>
  );
};

// Composant skeleton pour le loading
export const KpiCardSkeleton: React.FC = () => {
  return (
    <div className="relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="h-4 bg-white/20 rounded w-24 mb-2"></div>
          <div className="h-8 bg-white/20 rounded w-16"></div>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-lg"></div>
      </div>
      <div className="h-3 bg-white/20 rounded w-32"></div>
    </div>
  );
};
export default KpiCard;
