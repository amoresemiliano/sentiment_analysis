import React from "react";
import { FilterState, Brand, Province } from "../types";
import { Filter, RotateCcw, Calendar, Store, MapPin, Layers, Radio } from "lucide-react";

interface GlobalFiltersBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
}

export const GlobalFiltersBar: React.FC<GlobalFiltersBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFilteredCount,
}) => {
  const isFiltered =
    filters.period !== "Últimos 90 días" ||
    filters.brand !== "Todas" ||
    filters.province !== "Todas" ||
    filters.branch !== "Todas" ||
    filters.source !== "Todas" ||
    filters.sentiment !== "Todos" ||
    filters.topic !== "Todos" ||
    filters.searchQuery !== "";

  const handleChange = (key: keyof FilterState, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value,
      ...(key === "province" ? { branch: "Todas" } : {}), // Reset branch on province change
    });
  };

  return (
    <div className="bg-[#FAF9F5] border-b border-stone-200/90 px-4 sm:px-6 py-2.5 transition-all text-xs font-['Plus_Jakarta_Sans']">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Controls row */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-1">
          <div className="flex items-center gap-1.5 text-stone-500 font-semibold uppercase tracking-wider text-[10px] mr-1">
            <Filter className="w-3.5 h-3.5 text-[#1B4D3E]" />
            <span className="hidden sm:inline">Filtros:</span>
          </div>

          {/* Period */}
          <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-lg px-2 py-1 shadow-2xs">
            <Calendar className="w-3 h-3 text-stone-400 shrink-0" />
            <select
              value={filters.period}
              onChange={(e) => handleChange("period", e.target.value)}
              className="bg-transparent text-stone-700 font-medium focus:outline-none cursor-pointer text-xs"
            >
              <option value="Últimos 30 días">Últimos 30 días</option>
              <option value="Últimos 90 días">Últimos 90 días</option>
              <option value="Últimos 6 meses">Últimos 6 meses</option>
              <option value="Año Móvil">Año Móvil (12 meses)</option>
            </select>
          </div>

          {/* Brand */}
          <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-lg px-2 py-1 shadow-2xs">
            <Store className="w-3 h-3 text-stone-400 shrink-0" />
            <select
              value={filters.brand}
              onChange={(e) => handleChange("brand", e.target.value as Brand)}
              className="bg-transparent text-stone-700 font-medium focus:outline-none cursor-pointer text-xs"
            >
              <option value="Todas">Marca: Todas</option>
              <option value="Duomo">Duomo Helados</option>
              <option value="Grido">Grido</option>
              <option value="Cremolatti">Cremolatti</option>
            </select>
          </div>

          {/* Province */}
          <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-lg px-2 py-1 shadow-2xs">
            <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
            <select
              value={filters.province}
              onChange={(e) => handleChange("province", e.target.value as Province)}
              className="bg-transparent text-stone-700 font-medium focus:outline-none cursor-pointer text-xs"
            >
              <option value="Todas">Provincia: Todas (NEA)</option>
              <option value="Misiones">Misiones</option>
              <option value="Corrientes">Corrientes</option>
              <option value="Chaco">Chaco</option>
              <option value="Formosa">Formosa</option>
            </select>
          </div>

          {/* Source */}
          <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-lg px-2 py-1 shadow-2xs">
            <Radio className="w-3 h-3 text-stone-400 shrink-0" />
            <select
              value={filters.source}
              onChange={(e) => handleChange("source", e.target.value)}
              className="bg-transparent text-stone-700 font-medium focus:outline-none cursor-pointer text-xs"
            >
              <option value="Todas">Canal: Todos</option>
              <option value="Google">Google Reviews</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="TikTok">TikTok</option>
              <option value="YouTube">YouTube</option>
            </select>
          </div>

          {/* Sentiment */}
          <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-lg px-2 py-1 shadow-2xs">
            <Layers className="w-3 h-3 text-stone-400 shrink-0" />
            <select
              value={filters.sentiment}
              onChange={(e) => handleChange("sentiment", e.target.value)}
              className="bg-transparent text-stone-700 font-medium focus:outline-none cursor-pointer text-xs"
            >
              <option value="Todos">Sentimiento: Todos</option>
              <option value="Positivo">Solo Positivo</option>
              <option value="Neutro">Solo Neutro</option>
              <option value="Negativo">Solo Negativo</option>
            </select>
          </div>
        </div>

        {/* Status / Reset */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-[11px] text-stone-500 font-medium">
            Muestra activa: <span className="font-bold text-stone-800">{totalFilteredCount}</span> opiniones
          </div>

          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 text-[11px] font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100/80 px-2.5 py-1 rounded-lg border border-rose-200 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Limpiar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
