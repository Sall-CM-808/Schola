"use client";

import React from "react";
import { motion } from "framer-motion";

interface KpiCardProps {
  label: string;
  value: string | number;
  caption?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "blue" | "green" | "purple" | "orange" | "red";
}

const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  caption,
  icon,
  trend,
  color = "blue",
}) => {
  const colorClasses = {
    blue: {
      bg: "from-blue-500/20 to-blue-600/20",
      border: "border-blue-500/30",
      icon: "text-blue-400",
      text: "text-blue-300",
    },
    green: {
      bg: "from-green-500/20 to-green-600/20",
      border: "border-green-500/30",
      icon: "text-green-400",
      text: "text-green-300",
    },
    purple: {
      bg: "from-purple-500/20 to-purple-600/20",
      border: "border-purple-500/30",
      icon: "text-purple-400",
      text: "text-purple-300",
    },
    orange: {
      bg: "from-orange-500/20 to-orange-600/20",
      border: "border-orange-500/30",
      icon: "text-orange-400",
      text: "text-orange-300",
    },
    red: {
      bg: "from-red-500/20 to-red-600/20",
      border: "border-red-500/30",
      icon: "text-red-400",
      text: "text-red-300",
    },
  };

  const colorClass = colorClasses[color];

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
          <h3 className="text-sm font-medium text-white/70 mb-1">{label}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">
              {typeof value === "number" ? value.toLocaleString() : value}
            </span>
            {trend && (
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? "text-green-400" : "text-red-400"
                }`}
              >
                {trend.isPositive ? "+" : ""}
                {trend.value}%
              </span>
            )}
          </div>
        </div>

        {icon && (
          <div className={`p-3 rounded-lg bg-white/10 ${colorClass.icon}`}>
            {icon}
          </div>
        )}
      </div>

      {caption && <p className={`text-sm ${colorClass.text}`}>{caption}</p>}
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
