import React from "react";
import { GlobalFilters } from "../types";
import { getDependentFilterOptions, getFilteredReviews } from "../data/dynamicAnalyticsEngine";
import {
  X,
  Filter,
  RotateCcw,
  Check,
  Store,
  MapPin,
  Building2,
  Sparkles,
  Radio,
  Calendar,
  Layers,
  Tags,
  Smile,
} from "lucide-react";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: GlobalFilters;
  onFilterChange: (filters: GlobalFilters) => void;
  onResetFilters: () => void;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  if (!isOpen) return null;

  const options = getDependentFilterOptions(filters);
  const filteredCount = getFilteredReviews(filters).length;

  const handleBrandChange = (brand: string) => {
    onFilterChange({
      ...filters,
      brand: brand === "Todas" ? null : brand,
      province: null,
      city: null,
      branch: null,
    });
  };

  const handleProvinceChange = (province: string) => {
    onFilterChange({
      ...filters,
      province: province === "Todas" ? null : province,
      city: null,
      branch: null,
    });
  };

  const handleCityChange = (city: string) => {
    onFilterChange({
      ...filters,
      city: city === "Todas" ? null : city,
      branch: null,
    });
  };

  const handleBranchChange = (branch: string) => {
    onFilterChange({
      ...filters,
      branch: branch === "Todas" ? null : branch,
    });
  };

  const handleFlavorChange = (flavor: string) => {
    onFilterChange({
      ...filters,
      flavor: flavor === "Todos" ? null : flavor,
    });
  };

  const handleSourceChange = (source: string) => {
    onFilterChange({
      ...filters,
      source: source === "Todas" ? null : source,
    });
  };

  const handlePeriodChange = (period: string) => {
    onFilterChange({
      ...filters,
      period,
    });
  };

  const handleDataModeChange = (dataMode: any) => {
    onFilterChange({
      ...filters,
      dataMode,
    });
  };

  const handleTopicChange = (topic: string) => {
    onFilterChange({
      ...filters,
      topic: topic === "Todos" ? null : topic,
    });
  };

  const handleSentimentChange = (sentiment: string) => {
    onFilterChange({
      ...filters,
      sentiment: sentiment === "Todos" ? null : (sentiment as any),
    });
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className="relative z-10 w-full max-h-[90vh] bg-[#FAF9F5] text-stone-900 rounded-t-3xl shadow-2xl flex flex-col overflow-hidden font-['Plus_Jakarta_Sans'] border-t border-stone-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-white border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#1B4D3E] flex items-center justify-center">
              <Filter className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-900 font-['Outfit']">
                Filtros de Exploración
              </h3>
              <p className="text-[11px] text-stone-500">
                Segmentá el corpus y los tableros analíticos
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar filtros"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters Scrollable Content */}
        <div className="overflow-y-auto p-5 space-y-4 max-h-[60vh] text-xs">
          {/* 1. Marca */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-[#1B4D3E]" />
              Marca
            </label>
            <select
              value={filters.brand || "Todas"}
              onChange={(e) => handleBrandChange(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-800 font-medium focus:outline-none focus:border-[#1B4D3E]"
            >
              {options.brands.map((b) => (
                <option key={b} value={b}>
                  {b === "Todas" ? "Todas las marcas (Duomo / Grido / Crem.)" : b}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Provincia (Dependent) */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stone-500" />
              Provincia
            </label>
            <select
              value={filters.province || "Todas"}
              onChange={(e) => handleProvinceChange(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-800 font-medium focus:outline-none focus:border-[#1B4D3E]"
            >
              {options.provinces.map((p) => (
                <option key={p} value={p}>
                  {p === "Todas" ? "Todas las provincias (NEA)" : p}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Ciudad (Dependent) */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-stone-500" />
              Ciudad
            </label>
            <select
              value={filters.city || "Todas"}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-800 font-medium focus:outline-none focus:border-[#1B4D3E]"
            >
              {options.cities.map((c) => (
                <option key={c} value={c}>
                  {c === "Todas" ? "Todas las ciudades" : c}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Sucursal (Dependent) */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-stone-500" />
              Sucursal
            </label>
            <select
              value={filters.branch || "Todas"}
              onChange={(e) => handleBranchChange(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-800 font-medium focus:outline-none focus:border-[#1B4D3E]"
            >
              {options.branches.map((br) => (
                <option key={br.id} value={br.id}>
                  {br.name}
                </option>
              ))}
            </select>
          </div>

          {/* 5. Sabor */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              Sabor
            </label>
            <select
              value={filters.flavor || "Todos"}
              onChange={(e) => handleFlavorChange(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2.5 bg-amber-50/70 border border-amber-300 rounded-xl text-xs text-amber-950 font-semibold focus:outline-none focus:border-amber-600"
            >
              {options.flavors.map((f) => (
                <option key={f} value={f}>
                  {f === "Todos" ? "Todos los sabores" : f}
                </option>
              ))}
            </select>
          </div>

          {/* 6. Canal / Fuente */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-stone-500" />
              Canal de Origen
            </label>
            <select
              value={filters.source || "Todas"}
              onChange={(e) => handleSourceChange(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-800 font-medium focus:outline-none focus:border-[#1B4D3E]"
            >
              {options.sources.map((s) => (
                <option key={s} value={s}>
                  {s === "Todas" ? "Todos los canales" : s}
                </option>
              ))}
            </select>
          </div>

          {/* 7. Período */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-stone-500" />
              Período Temporal
            </label>
            <select
              value={filters.period || "Últimos 90 días"}
              onChange={(e) => handlePeriodChange(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-800 font-medium focus:outline-none focus:border-[#1B4D3E]"
            >
              <option value="Últimos 30 días">Últimos 30 días</option>
              <option value="Últimos 90 días">Últimos 90 días</option>
              <option value="Últimos 6 meses">Últimos 6 meses</option>
              <option value="Año Móvil">Año Móvil (12 meses)</option>
            </select>
          </div>

          {/* 8. Data Mode */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              Modo de Datos / Procedencia
            </label>
            <select
              value={filters.dataMode || "all"}
              onChange={(e) => handleDataModeChange(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2.5 bg-emerald-50/70 border border-emerald-300 rounded-xl text-xs text-emerald-950 font-semibold focus:outline-none focus:border-emerald-600"
            >
              <option value="all">Todos los datos (Piloto Real + Prototipo)</option>
              <option value="real-pilot">🟢 Solo Piloto Real Verificado (104 reviews / 15 suc.)</option>
              <option value="prototype">🟡 Solo Corpus Prototipo (Simulado)</option>
            </select>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="p-4 bg-white border-t border-stone-200 flex flex-col gap-3 pb-[max(16px,env(safe-area-inset-bottom))]">
          {/* Live Corpus Count Badge */}
          <div className="flex items-center justify-between text-xs px-3 py-2 bg-[#FAF9F5] rounded-xl border border-stone-200">
            <span className="text-stone-600 font-medium">Volumen coincidente:</span>
            <span className="font-extrabold text-[#1B4D3E] font-['Outfit'] text-sm">
              {filteredCount.toLocaleString()} opiniones en esta selección
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={onResetFilters}
              className="min-h-[44px] px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
              <span>Limpiar</span>
            </button>

            <button
              onClick={onClose}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#1B4D3E] hover:bg-[#143D32] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Aplicar filtros</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
