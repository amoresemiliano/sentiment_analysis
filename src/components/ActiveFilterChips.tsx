import React from "react";
import { GlobalFilters } from "../types";
import { X, RotateCcw, Filter, CheckCircle2 } from "lucide-react";

interface ActiveFilterChipsProps {
  filters: GlobalFilters;
  onRemoveFilter: (key: keyof GlobalFilters) => void;
  onResetFilters: () => void;
  filteredCount: number;
}

export const ActiveFilterChips: React.FC<ActiveFilterChipsProps> = ({
  filters,
  onRemoveFilter,
  onResetFilters,
  filteredCount,
}) => {
  const activeChips: { key: keyof GlobalFilters; label: string; value: string }[] = [];

  if (filters.brand && filters.brand !== "Todas") {
    activeChips.push({ key: "brand", label: "Marca", value: filters.brand });
  }
  if (filters.province && filters.province !== "Todas") {
    activeChips.push({ key: "province", label: "Provincia", value: filters.province });
  }
  if (filters.city && filters.city !== "Todas") {
    activeChips.push({ key: "city", label: "Ciudad", value: filters.city });
  }
  if (filters.branch && filters.branch !== "Todas") {
    activeChips.push({ key: "branch", label: "Sucursal", value: filters.branch });
  }
  if (filters.flavor && filters.flavor !== "Todos") {
    activeChips.push({ key: "flavor", label: "Sabor", value: filters.flavor });
  }
  if (filters.topic && filters.topic !== "Todos" && filters.topic !== "Todos los tópicos") {
    activeChips.push({ key: "topic", label: "Tópico", value: filters.topic });
  }
  if (filters.sentiment && filters.sentiment !== "Todos") {
    activeChips.push({ key: "sentiment", label: "Sentimiento", value: filters.sentiment });
  }
  if (filters.source && filters.source !== "Todas" && filters.source !== "Todas las fuentes") {
    activeChips.push({ key: "source", label: "Canal", value: filters.source });
  }
  if (filters.searchQuery && filters.searchQuery.trim() !== "") {
    activeChips.push({ key: "searchQuery", label: "Búsqueda", value: `"${filters.searchQuery}"` });
  }

  if (activeChips.length === 0) {
    return (
      <div className="bg-[#F5F3EC] border-b border-stone-200/80 px-4 sm:px-6 py-2 flex items-center justify-between text-xs text-stone-600 font-['Plus_Jakarta_Sans']">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4D3E]" />
          <span>Mostrando universo completo: <strong className="text-stone-900">{filteredCount} opiniones</strong> analizadas en el NEA (90 sucursales)</span>
        </div>
        <span className="text-[10px] text-stone-400 font-medium hidden sm:inline">Sin filtros restrictivos</span>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F5] border-b border-stone-200 px-4 sm:px-6 py-2.5 transition-all text-xs font-['Plus_Jakarta_Sans']">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          <div className="flex items-center gap-1 text-stone-500 font-bold uppercase tracking-wider text-[10px] mr-1">
            <Filter className="w-3 h-3 text-[#1B4D3E]" />
            <span>Filtros activos:</span>
          </div>

          {activeChips.map((chip) => (
            <span
              key={chip.key}
              className="inline-flex items-center gap-1.5 bg-white border border-stone-300/90 text-stone-800 px-2.5 py-1 rounded-lg text-xs font-medium shadow-2xs hover:border-stone-400 transition-all"
            >
              <span className="text-stone-400 text-[10px] font-semibold">{chip.label}:</span>
              <strong className="text-[#112A23]">{chip.value}</strong>
              <button
                onClick={() => onRemoveFilter(chip.key)}
                className="text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded p-0.5 transition-colors cursor-pointer"
                title={`Eliminar filtro ${chip.label}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          <div className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg ml-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span><strong>{filteredCount} opiniones</strong> coinciden con esta selección</span>
          </div>
        </div>

        <button
          onClick={onResetFilters}
          className="flex items-center gap-1 text-[11px] font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100/90 px-3 py-1 rounded-lg border border-rose-200/90 transition-colors shadow-2xs cursor-pointer shrink-0"
        >
          <RotateCcw className="w-3 h-3" />
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};
