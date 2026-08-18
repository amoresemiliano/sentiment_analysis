import React from "react";
import { GlobalFilters } from "../types";
import { getDependentFilterOptions } from "../data/dynamicAnalyticsEngine";
import { Filter, Store, MapPin, Layers, Radio, Calendar, Sparkles, Building2 } from "lucide-react";

interface GlobalFiltersBarProps {
  filters: GlobalFilters;
  onFilterChange: (filters: GlobalFilters) => void;
}

export const GlobalFiltersBar: React.FC<GlobalFiltersBarProps> = ({
  filters,
  onFilterChange,
}) => {
  const options = getDependentFilterOptions(filters);

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

  return (
    <div className="hidden md:block bg-[#FAF9F5] border-b border-stone-200/90 px-4 sm:px-6 py-2.5 transition-all text-xs font-['Plus_Jakarta_Sans'] shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          <div className="flex items-center gap-1 text-stone-500 font-bold uppercase tracking-wider text-[10px] mr-1">
            <Filter className="w-3.5 h-3.5 text-[#1B4D3E]" />
            <span className="hidden sm:inline">Explorador:</span>
          </div>

          {/* 1. Brand */}
          <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-lg px-2 py-1 shadow-2xs hover:border-stone-300 transition-colors">
            <Store className="w-3 h-3 text-[#1B4D3E] shrink-0" />
            <select
              value={filters.brand || "Todas"}
              onChange={(e) => handleBrandChange(e.target.value)}
              className="bg-transparent text-stone-800 font-medium focus:outline-none cursor-pointer text-xs"
            >
              {options.brands.map((b) => (
                <option key={b} value={b}>
                  {b === "Todas" ? "Marca: Todas" : b}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Province (Dependent) */}
          <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-lg px-2 py-1 shadow-2xs hover:border-stone-300 transition-colors">
            <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
            <select
              value={filters.province || "Todas"}
              onChange={(e) => handleProvinceChange(e.target.value)}
              className="bg-transparent text-stone-800 font-medium focus:outline-none cursor-pointer text-xs"
            >
              {options.provinces.map((p) => (
                <option key={p} value={p}>
                  {p === "Todas" ? "Provincia: Todas (NEA)" : p}
                </option>
              ))}
            </select>
          </div>

          {/* 3. City (Dependent) */}
          <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-lg px-2 py-1 shadow-2xs hover:border-stone-300 transition-colors">
            <Building2 className="w-3 h-3 text-stone-400 shrink-0" />
            <select
              value={filters.city || "Todas"}
              onChange={(e) => handleCityChange(e.target.value)}
              className="bg-transparent text-stone-800 font-medium focus:outline-none cursor-pointer text-xs"
            >
              {options.cities.map((c) => (
                <option key={c} value={c}>
                  {c === "Todas" ? "Ciudad: Todas" : c}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Branch (Dependent) */}
          <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-lg px-2 py-1 shadow-2xs hover:border-stone-300 transition-colors max-w-[200px] truncate">
            <Store className="w-3 h-3 text-stone-400 shrink-0" />
            <select
              value={filters.branch || "Todas"}
              onChange={(e) => handleBranchChange(e.target.value)}
              className="bg-transparent text-stone-800 font-medium focus:outline-none cursor-pointer text-xs truncate w-full"
            >
              {options.branches.map((br) => (
                <option key={br.id} value={br.id}>
                  {br.name}
                </option>
              ))}
            </select>
          </div>

          {/* 5. Flavor / Product */}
          <div className="flex items-center gap-1 bg-amber-50/70 border border-amber-200/90 rounded-lg px-2 py-1 shadow-2xs hover:border-amber-300 transition-colors">
            <Sparkles className="w-3 h-3 text-amber-700 shrink-0" />
            <select
              value={filters.flavor || "Todos"}
              onChange={(e) => handleFlavorChange(e.target.value)}
              className="bg-transparent text-amber-950 font-semibold focus:outline-none cursor-pointer text-xs"
            >
              {options.flavors.map((f) => (
                <option key={f} value={f}>
                  {f === "Todos" ? "Sabor: Todos" : f}
                </option>
              ))}
            </select>
          </div>

          {/* 6. Channel / Source */}
          <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-lg px-2 py-1 shadow-2xs hover:border-stone-300 transition-colors">
            <Radio className="w-3 h-3 text-stone-400 shrink-0" />
            <select
              value={filters.source || "Todas"}
              onChange={(e) => handleSourceChange(e.target.value)}
              className="bg-transparent text-stone-800 font-medium focus:outline-none cursor-pointer text-xs"
            >
              {options.sources.map((s) => (
                <option key={s} value={s}>
                  {s === "Todas" ? "Canal: Todos" : s}
                </option>
              ))}
            </select>
          </div>

          {/* 7. Period */}
          <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-lg px-2 py-1 shadow-2xs hover:border-stone-300 transition-colors">
            <Calendar className="w-3 h-3 text-stone-400 shrink-0" />
            <select
              value={filters.period || "Últimos 90 días"}
              onChange={(e) => handlePeriodChange(e.target.value)}
              className="bg-transparent text-stone-800 font-medium focus:outline-none cursor-pointer text-xs"
            >
              <option value="Últimos 30 días">Últimos 30 días</option>
              <option value="Últimos 90 días">Últimos 90 días</option>
              <option value="Últimos 6 meses">Últimos 6 meses</option>
              <option value="Año Móvil">Año Móvil (12 meses)</option>
            </select>
          </div>

          {/* 8. Data Mode / Provenance */}
          <div className="flex items-center gap-1 bg-emerald-50/70 border border-emerald-300/80 rounded-lg px-2 py-1 shadow-2xs hover:border-emerald-400 transition-colors">
            <Layers className="w-3 h-3 text-emerald-700 shrink-0" />
            <select
              value={filters.dataMode || "all"}
              onChange={(e) => onFilterChange({ ...filters, dataMode: e.target.value as any })}
              className="bg-transparent text-emerald-950 font-semibold focus:outline-none cursor-pointer text-xs"
            >
              <option value="all">Modo: Todos los datos (Piloto + Prototipo)</option>
              <option value="real-pilot">🟢 Solo Piloto Real Verificado (104 reseñas / 15 sucursales)</option>
              <option value="prototype">🟡 Solo Corpus Prototipo (Simulado)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
