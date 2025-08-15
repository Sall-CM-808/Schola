"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Search, Filter, X } from "lucide-react";

interface Column {
  key: string;
  header: string;
  render?: (row: any) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface FilterOption {
  key: string;
  label: string;
  type: "select" | "search" | "date";
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface AdvancedDataTableProps {
  columns: Column[];
  rows: any[];
  emptyMessage?: string;
  title?: string;
  pageSize?: number;
  filters?: FilterOption[];
  onRowClick?: (row: any) => void;
}

const AdvancedDataTable: React.FC<AdvancedDataTableProps> = ({
  columns,
  rows,
  emptyMessage = "Aucune donnée disponible",
  title,
  pageSize = 15,
  filters = [],
  onRowClick,
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {}
  );
  const [showFilters, setShowFilters] = useState(false);

  // Application des filtres
  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      return Object.entries(activeFilters).every(([filterKey, filterValue]) => {
        if (!filterValue) return true;

        const filter = filters.find((f) => f.key === filterKey);
        if (!filter) return true;

        const rowValue = row[filterKey];

        switch (filter.type) {
          case "search":
            if (typeof rowValue === "string") {
              return rowValue.toLowerCase().includes(filterValue.toLowerCase());
            }
            // Recherche dans plusieurs champs si c'est un filtre de recherche générale
            if (filterKey === "search") {
              return columns.some((column) => {
                const value = row[column.key];
                if (typeof value === "string") {
                  return value
                    .toLowerCase()
                    .includes(filterValue.toLowerCase());
                }
                return false;
              });
            }
            return false;

          case "select":
            return rowValue === filterValue;

          case "date":
            // Implémentation basique pour les dates
            return true;

          default:
            return true;
        }
      });
    });
  }, [rows, activeFilters, filters, columns]);

  // Tri des données
  const sortedRows = useMemo(() => {
    if (!sortConfig) return filteredRows;

    return [...filteredRows].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredRows, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedRows.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRows = sortedRows.slice(startIndex, startIndex + pageSize);

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        return {
          key,
          direction: current.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  const handleFilterChange = (filterKey: string, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }));
    setCurrentPage(1); // Reset à la première page
  };

  const clearFilter = (filterKey: string) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[filterKey];
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    setCurrentPage(1);
  };

  const formatValue = (row: any, column: Column) => {
    if (column.render) {
      return column.render(row);
    }

    const value = row[column.key];

    // Format dates
    if (column.key.includes("At") && value) {
      return new Date(value).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return value;
  };

  const activeFilterCount = Object.values(activeFilters).filter(Boolean).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${
                showFilters || activeFilterCount > 0
                  ? "bg-[#b8d070]/20 border-[#b8d070]/30 text-[#b8d070]"
                  : "bg-white/10 hover:bg-white/20 border-white/20 text-white/70 hover:text-white"
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">
                Filtres {activeFilterCount > 0 && `(${activeFilterCount})`}
              </span>
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 p-4 bg-white/5 rounded-lg border border-white/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {filters.map((filter) => (
                <div key={filter.key}>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    {filter.label}
                  </label>

                  {filter.type === "search" && (
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                      <input
                        type="text"
                        placeholder={filter.placeholder || "Rechercher..."}
                        value={activeFilters[filter.key] || ""}
                        onChange={(e) =>
                          handleFilterChange(filter.key, e.target.value)
                        }
                        className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent text-sm"
                      />
                    </div>
                  )}

                  {filter.type === "select" && (
                    <select
                      value={activeFilters[filter.key] || ""}
                      onChange={(e) =>
                        handleFilterChange(filter.key, e.target.value)
                      }
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent text-sm appearance-none"
                    >
                      <option value="" className="bg-[#1d8b93] text-white">
                        Tous
                      </option>
                      {filter.options?.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                          className="bg-[#1d8b93] text-white"
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>

            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-white/60">Filtres actifs:</span>
                {Object.entries(activeFilters).map(([key, value]) => {
                  if (!value) return null;
                  const filter = filters.find((f) => f.key === key);
                  const label =
                    filter?.options?.find((o) => o.value === value)?.label ||
                    value;

                  return (
                    <span
                      key={key}
                      className="flex items-center gap-1 px-2 py-1 bg-[#b8d070]/20 text-[#b8d070] rounded text-xs font-medium"
                    >
                      {filter?.label}: {label}
                      <button
                        onClick={() => clearFilter(key)}
                        className="hover:bg-[#b8d070]/30 rounded p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })}
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-white/60 hover:text-white underline"
                >
                  Tout effacer
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Results count */}
        <p className="text-sm text-white/60">
          {filteredRows.length} résultat{filteredRows.length !== 1 ? "s" : ""}
          {activeFilterCount > 0 &&
            ` (filtré${activeFilterCount > 1 ? "s" : ""})`}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5 sticky top-0">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-left text-sm font-medium text-white/80 ${
                    column.sortable !== false
                      ? "cursor-pointer hover:text-white"
                      : ""
                  } ${column.width || ""}`}
                  onClick={() =>
                    column.sortable !== false && handleSort(column.key)
                  }
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable !== false &&
                      sortConfig?.key === column.key && (
                        <span className="text-[#b8d070]">
                          {sortConfig.direction === "asc" ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </span>
                      )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row, index) => (
                <motion.tr
                  key={row.id || index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`border-t border-white/5 hover:bg-white/5 transition-colors duration-200 ${
                    onRowClick ? "cursor-pointer" : ""
                  }`}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 text-sm text-white/90"
                    >
                      {formatValue(row, column)}
                    </td>
                  ))}
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <div className="text-white/60">
                    <p className="text-lg font-medium mb-2">{emptyMessage}</p>
                    <p className="text-sm">
                      {activeFilterCount > 0
                        ? "Aucun résultat ne correspond à vos critères de recherche"
                        : "Aucune donnée à afficher pour le moment"}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-6 border-t border-white/10 flex items-center justify-between">
          <div className="text-sm text-white/60">
            Page {currentPage} sur {totalPages} • {filteredRows.length} résultat
            {filteredRows.length !== 1 ? "s" : ""}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 rounded-lg text-white text-sm transition-colors duration-200"
            >
              Précédent
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-sm transition-colors duration-200 ${
                      currentPage === pageNum
                        ? "bg-[#b8d070] text-[#1d8b93] font-medium"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 rounded-lg text-white text-sm transition-colors duration-200"
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Composant skeleton pour le loading
export const AdvancedDataTableSkeleton: React.FC<{
  rows?: number;
  columns?: number;
}> = ({ rows = 10, columns = 5 }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg overflow-hidden animate-pulse">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-white/20 rounded w-48"></div>
          <div className="h-10 bg-white/20 rounded w-24"></div>
        </div>
        <div className="h-4 bg-white/20 rounded w-32"></div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="px-6 py-4">
                  <div className="h-4 bg-white/20 rounded w-20"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, i) => (
              <tr key={i} className="border-t border-white/5">
                {Array.from({ length: columns }).map((_, j) => (
                  <td key={j} className="px-6 py-4">
                    <div className="h-4 bg-white/20 rounded w-24"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvancedDataTable;
