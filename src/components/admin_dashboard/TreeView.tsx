"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronDown,
  Building2,
  GraduationCap,
  Briefcase,
  FlaskConical,
  Target,
  School,
  MapPin,
  Mail,
  Phone,
  User,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Unit, unitTypes } from "@/lib/mocks/adminUnits";

interface TreeViewProps {
  units: Unit[];
  onUnitClick?: (unit: Unit) => void;
  className?: string;
}

interface TreeNodeProps {
  unit: Unit;
  level?: number;
  onUnitClick?: (unit: Unit) => void;
}

const getUnitIcon = (type: Unit["type"]) => {
  const iconClass = "w-4 h-4";
  switch (type) {
    case "university":
      return <School className={iconClass} />;
    case "faculty":
      return <Building2 className={iconClass} />;
    case "department":
      return <GraduationCap className={iconClass} />;
    case "service":
      return <Briefcase className={iconClass} />;
    case "laboratory":
      return <FlaskConical className={iconClass} />;
    case "center":
      return <Target className={iconClass} />;
    default:
      return <Building2 className={iconClass} />;
  }
};

const TreeNode: React.FC<TreeNodeProps> = ({
  unit,
  level = 0,
  onUnitClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(level < 2); // Expand first 2 levels by default
  const hasChildren = unit.children && unit.children.length > 0;

  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleUnitClick = () => {
    onUnitClick?.(unit);
  };

  const typeConfig = unitTypes[unit.type];
  const indentLevel = level * 24;

  return (
    <div className="select-none">
      {/* Node */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: level * 0.05 }}
        className={`flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/10 group ${
          level === 0 ? "bg-white/5" : ""
        }`}
        style={{ marginLeft: `${indentLevel}px` }}
        onClick={handleUnitClick}
      >
        {/* Expand/Collapse Button */}
        <button
          onClick={toggleExpanded}
          className={`flex items-center justify-center w-5 h-5 rounded hover:bg-white/20 transition-colors duration-200 ${
            hasChildren ? "" : "invisible"
          }`}
        >
          {hasChildren && (
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-3 h-3 text-white/60" />
            </motion.div>
          )}
        </button>

        {/* Icon */}
        <div className="text-white/70 group-hover:text-white transition-colors duration-200">
          {getUnitIcon(unit.type)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-white group-hover:text-[#b8d070] transition-colors duration-200 truncate">
              {unit.name}
            </span>
            <span className="text-xs text-white/50 font-mono">
              ({unit.code})
            </span>
            <span
              className={`px-2 py-0.5 rounded text-xs font-medium border ${typeConfig.color}`}
            >
              {typeConfig.label}
            </span>
            {unit.active ? (
              <CheckCircle className="w-3 h-3 text-green-400" />
            ) : (
              <XCircle className="w-3 h-3 text-red-400" />
            )}
          </div>

          {unit.description && (
            <p className="text-xs text-white/60 truncate mb-1">
              {unit.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-white/50">
            {unit.head && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{unit.head}</span>
              </div>
            )}
            {unit.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{unit.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Level indicator */}
        <div className="text-xs text-white/40 font-mono">Niv. {unit.level}</div>
      </motion.div>

      {/* Children */}
      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {unit.children!.map((child) => (
              <TreeNode
                key={child.id}
                unit={child}
                level={level + 1}
                onUnitClick={onUnitClick}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TreeView: React.FC<TreeViewProps> = ({
  units,
  onUnitClick,
  className = "",
}) => {
  return (
    <div
      className={`bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg overflow-hidden ${className}`}
    >
      <div className="p-4 border-b border-white/10">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          Arbre des Unités
        </h3>
        <p className="text-sm text-white/60 mt-1">
          Structure hiérarchique de l'organisation
        </p>
      </div>

      <div className="p-4 max-h-96 overflow-y-auto">
        {units.map((unit) => (
          <TreeNode
            key={unit.id}
            unit={unit}
            level={0}
            onUnitClick={onUnitClick}
          />
        ))}
      </div>
    </div>
  );
};

// Composant skeleton pour le loading
export const TreeViewSkeleton: React.FC = () => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg overflow-hidden animate-pulse">
      <div className="p-4 border-b border-white/10">
        <div className="h-6 bg-white/20 rounded w-48 mb-2"></div>
        <div className="h-4 bg-white/20 rounded w-64"></div>
      </div>

      <div className="p-4 space-y-3">
        {/* Root level */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-white/20 rounded"></div>
          <div className="w-4 h-4 bg-white/20 rounded"></div>
          <div className="h-4 bg-white/20 rounded flex-1"></div>
        </div>

        {/* Level 1 */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2 ml-6">
            <div className="w-5 h-5 bg-white/20 rounded"></div>
            <div className="w-4 h-4 bg-white/20 rounded"></div>
            <div className="h-4 bg-white/20 rounded flex-1"></div>
          </div>
        ))}

        {/* Level 2 */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2 ml-12">
            <div className="w-5 h-5 bg-white/20 rounded"></div>
            <div className="w-4 h-4 bg-white/20 rounded"></div>
            <div className="h-4 bg-white/20 rounded flex-1"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreeView;
