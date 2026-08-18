import React from "react";
import { GlobalFilters } from "../types";
import { X, RotateCcw, Filter, CheckCircle2, SlidersHorizontal } from "lucide-react";

interface ActiveFilterChipsProps {
  filters: GlobalFilters;
  onRemoveFilter: (key: keyof GlobalFilters) => void;
  onResetFilters: () => void;
  filteredCount: number;
  onOpenFilterDrawer?: () => void;
}

export const ActiveFilterChips: React.FC<ActiveFilterChipsProps> = ({
  filters,
  onRemoveFilter,
  onResetFilters,
  filteredCount,
  onOpenFilterDrawer,
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
  if (filters.dataMode && filters.dataMode !== "all") {
    activeChips.push({
      key: "dataMode",
      label: "Datos",
      value: filters.dataMode === "real-pilot" ? "🟢 Piloto Real (104 ops)" : "🟡 Prototipo",
    });
  }
  if (filters.searchQuery && filters.searchQuery.trim() !== "") {
    activeChips.push({ key: "searchQuery", label: "Búsqueda", value: `"${filters.searchQuery}"` });
  }

  if (activeChips.length === 0) {
    return (
      <div className="bg-[#F5F3EC] border-b border-stone-200/80 px-3 sm:px-6 py-2 flex items-center justify-between text-xs text-stone-600 font-['Plus_Jakarta_Sans'] overflow-x-auto">
        <div className="flex items-center gap-2 shrink-0">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4D3E] shrink-0" />
          <span className="text-xs">
            Mostrando universo completo: <strong className="text-stone-900">{filteredCount.toLocaleString()} opiniones</strong> en el NEA (90 sucursales)
          </span>
        </div>
        {onOpenFilterDrawer && (
          <button
            onClick={onOpenFilterDrawer}
            className="md:hidden flex items-center gap-1 text-[11px] font-bold text-[#1B4D3E] bg-white border border-stone-300 px-2 py-1 rounded-lg shrink-0 ml-2"
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>Filtrar</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F5] border-b border-stone-200 px-3 sm:px-6 py-2 transition-all text-xs font-['Plus_Jakarta_Sans']">
      <div className="flex items-center justify-between gap-2 overflow-x-auto py-0.5">
        <div className="flex items-center gap-1.5 shrink-0 flex-nowrap">
          <div className="flex items-center gap-1 text-stone-500 font-bold uppercase tracking-wider text-[10px] mr-0.5 shrink-0">
            <Filter className="w-3 h-3 text-[#1B4D3E]" />
            <span className="hidden sm:inline">Filtros:</span>
          </div>

          {activeChips.map((chip) => (
            <span
              key={chip.key}
              className="inline-flex items-center gap-1.5 bg-white border border-stone-300/90 text-stone-800 px-2.5 py-1 rounded-lg text-xs font-medium shadow-2xs hover:border-stone-400 transition-all shrink-0"
            >
              <span className="text-stone-400 text-[10px] font-semibold">{chip.label}:</span>
              <strong className="text-[#112A23]">{chip.value}</strong>
              <button
                onClick={() => onRemoveFilter(chip.key)}
                className="text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded p-1 transition-colors cursor-pointer"
                title={`Eliminar filtro ${chip.label}`}
                aria-label={`Eliminar filtro ${chip.label}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}

          <div className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span><strong>{filteredCount.toLocaleString()}</strong> opiniones</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {onOpenFilterDrawer && (
            <button
              onClick={onOpenFilterDrawer}
              className="md:hidden flex items-center gap-1 text-[11px] font-bold text-[#1B4D3E] bg-white border border-stone-300 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Editar</span>
            </button>
          )}

          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-[11px] font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100/90 px-2.5 py-1 rounded-lg border border-rose-200/90 transition-colors shadow-2xs cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Limpiar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

