"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserTypeDistribution } from "@/lib/mocks/adminDashboard";

interface UserTypeChartProps {
  data: UserTypeDistribution;
}

const UserTypeChart: React.FC<UserTypeChartProps> = ({ data }) => {
  const total = Object.values(data).reduce((sum, value) => sum + value, 0);

  const chartData = [
    {
      label: "Étudiants",
      value: data.student,
      color: "#3b82f6",
      percentage: (data.student / total) * 100,
    },
    {
      label: "Enseignants",
      value: data.teacher,
      color: "#10b981",
      percentage: (data.teacher / total) * 100,
    },
    {
      label: "Personnel",
      value: data.staff,
      color: "#f59e0b",
      percentage: (data.staff / total) * 100,
    },
    {
      label: "Administrateurs",
      value: data.admin,
      color: "#ef4444",
      percentage: (data.admin / total) * 100,
    },
  ];

  // Calculate angles for the donut chart
  let currentAngle = -90; // Start from top
  const segments = chartData.map((item) => {
    const angle = (item.percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle += angle;

    return {
      ...item,
      startAngle,
      endAngle,
      angle,
    };
  });

  const createPath = (
    centerX: number,
    centerY: number,
    radius: number,
    startAngle: number,
    endAngle: number
  ) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M",
      centerX,
      centerY,
      "L",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      "Z",
    ].join(" ");
  };

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg p-6"
    >
      <h3 className="text-xl font-semibold text-white mb-6">
        Répartition des utilisateurs
      </h3>

      <div className="flex items-center justify-between">
        {/* Chart */}
        <div className="relative">
          <svg width="200" height="200" className="transform -rotate-90">
            {segments.map((segment, index) => (
              <motion.path
                key={segment.label}
                d={createPath(
                  100,
                  100,
                  80,
                  segment.startAngle,
                  segment.endAngle
                )}
                fill={segment.color}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.8, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="hover:opacity-100 transition-opacity duration-200"
              />
            ))}
            {/* Inner circle for donut effect */}
            <circle cx="100" cy="100" r="50" fill="transparent" />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {total.toLocaleString()}
              </div>
              <div className="text-sm text-white/60">Total</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-4">
          {chartData.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-white">
                  {item.label}
                </div>
                <div className="text-xs text-white/60">
                  {item.value.toLocaleString()} ({item.percentage.toFixed(1)}%)
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default UserTypeChart;
