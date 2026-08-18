import React, { useState, useMemo } from "react";
import { BusinessInsight, GlobalFilters, TimeSlot } from "../types";
import { CANONICAL_BUSINESS_INSIGHTS, getFilteredInsights } from "../data/businessInsights";
import { InsightCard } from "../components/insights/InsightCard";
import { TimeSlotBreakdown } from "../components/insights/TimeSlotBreakdown";
import { WeatherReadinessCard } from "../components/insights/WeatherReadinessCard";
import {
  Lightbulb,
  Sparkles,
  Filter,
  Layers,
  Search,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  Clock,
  ArrowUpDown,
  BookOpen,
} from "lucide-react";

interface InsightsPageProps {
  filters: GlobalFilters;
  onUpdateFilters: (newFilters: Partial<GlobalFilters>) => void;
  onNavigateToReviewsWithFilter: (insight: BusinessInsight) => void;
}

export const InsightsPage: React.FC<InsightsPageProps> = ({
  filters,
  onUpdateFilters,
  onNavigateToReviewsWithFilter,
}) => {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedDataOrigin, setSelectedDataOrigin] = useState<string>("all");
  const [localSearch, setLocalSearch] = useState<string>("");

  // Base filtered insights according to global filters
  const baseInsights = useMemo(() => {
    return getFilteredInsights(filters);
  }, [filters]);

  // Refined insights with local selectors
  const refinedInsights = useMemo(() => {
    return baseInsights.filter((ins) => {
      // Type
      if (selectedType !== "all" && ins.type !== selectedType) {
        return false;
      }
      // Level
      if (selectedLevel !== "all" && ins.evidenceLevel !== selectedLevel) {
        return false;
      }
      // Origin
      if (selectedDataOrigin !== "all") {
        if (selectedDataOrigin === "real-pilot" && ins.dataType !== "real-pilot") return false;
        if (selectedDataOrigin === "prototype" && ins.dataType !== "prototype") return false;
      }
      // Search
      if (localSearch.trim() !== "") {
        const q = localSearch.toLowerCase();
        const matchTitle = ins.title.toLowerCase().includes(q);
        const matchObs = ins.observation.toLowerCase().includes(q);
        const matchInterp = ins.interpretation.toLowerCase().includes(q);
        const matchQ = ins.businessQuestion.toLowerCase().includes(q);
        if (!matchTitle && !matchObs && !matchInterp && !matchQ) return false;
      }
      return true;
    });
  }, [baseInsights, selectedType, selectedLevel, selectedDataOrigin, localSearch]);

  // Statistics counters
  const totalCount = baseInsights.length;
  const recurrentCount = baseInsights.filter((i) => i.evidenceLevel === "recurrent").length;
  const emergingCount = baseInsights.filter((i) => i.evidenceLevel === "emerging").length;
  const realPilotCount = baseInsights.filter((i) => i.dataType === "real-pilot").length;

  const handleTimeSlotSelect = (slot: TimeSlot | "Todos") => {
    if (slot === "Todos") {
      onUpdateFilters({ timeSlot: null });
    } else {
      onUpdateFilters({ timeSlot: slot });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-3 sm:px-6 py-4 font-['Plus_Jakarta_Sans'] pb-24 md:pb-12">
      {/* Page Header */}
      <header className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-950 border border-emerald-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#1B4D3E]" />
                <span>Capa Analítica · Iteración 5</span>
              </span>
              <span className="text-xs text-stone-500 font-medium">
                Trazabilidad Review-a-Insight
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#112A23] tracking-tight font-['Outfit']">
              Evidence-Based Business Insights
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
              Transformación de conjuntos de opiniones y señales de clientes en líneas de interpretación empresarial
              fundamentadas. Cada insight expone qué se observó, dónde, cuándo, cuánto sustento existe y qué preguntas
              debería plantearse la dirección antes de actuar.
            </p>
          </div>

          {/* Quick Metrics Badge Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center shrink-0">
            <div className="bg-[#FAF9F5] border border-stone-200/80 p-2.5 rounded-xl">
              <span className="text-[10px] text-stone-400 block font-bold uppercase">Total Insights</span>
              <strong className="text-base font-extrabold text-[#1B4D3E] font-['Outfit']">
                {totalCount}
              </strong>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
              <span className="text-[10px] text-emerald-800 block font-bold uppercase">Recurrentes</span>
              <strong className="text-base font-extrabold text-emerald-950 font-['Outfit']">
                {recurrentCount}
              </strong>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl">
              <span className="text-[10px] text-amber-800 block font-bold uppercase">Emergentes</span>
              <strong className="text-base font-extrabold text-amber-950 font-['Outfit']">
                {emergingCount}
              </strong>
            </div>

            <div className="bg-sky-50 border border-sky-200 p-2.5 rounded-xl">
              <span className="text-[10px] text-sky-800 block font-bold uppercase">Real Pilot</span>
              <strong className="text-base font-extrabold text-sky-950 font-['Outfit']">
                {realPilotCount}
              </strong>
            </div>
          </div>
        </div>

        {/* Epistemological Banner */}
        <div className="bg-[#FAF9F5] border border-stone-200/70 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-600">
          <div className="flex items-start gap-2">
            <BookOpen className="w-4 h-4 text-[#1B4D3E] shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-900 font-bold">Principio de No-Dogmatismo:</strong>
              <span className="ml-1 text-stone-600">
                Una review individual es evidencia anecdótica. Los insights señalan hipótesis a validar mediante datos operativos de ventas, mermas y auditorías presenciales.
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Temporal Dimension Module */}
      <TimeSlotBreakdown
        filters={filters}
        onSelectTimeSlot={handleTimeSlotSelect}
        selectedTimeSlot={filters.timeSlot || "Todos"}
      />

      {/* Filter and Search Bar for Insights */}
      <section className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#1B4D3E]" />
            <h3 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider font-['Outfit']">
              Filtrar Insights por Eje Temático y Nivel de Evidencia
            </h3>
          </div>

          <span className="text-xs text-stone-500">
            Mostrando <strong className="text-stone-900">{refinedInsights.length}</strong> de {totalCount} insights
          </span>
        </div>

        {/* Filter Pills / Selectors */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {/* Type Selectors */}
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-[11px] text-stone-400 font-bold mr-1">Eje:</span>
            {[
              { id: "all", label: "Todos" },
              { id: "operations", label: "Operaciones" },
              { id: "product", label: "Producto" },
              { id: "branch", label: "Sucursal" },
              { id: "time", label: "Turno / Momento" },
              { id: "competitive", label: "Competencia" },
              { id: "context", label: "Contexto" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-all cursor-pointer ${
                  selectedType === t.id
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="h-4 w-[1px] bg-stone-200 hidden md:block mx-1" />

          {/* Level Selectors */}
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-[11px] text-stone-400 font-bold mr-1">Evidencia:</span>
            {[
              { id: "all", label: "Todos los niveles" },
              { id: "recurrent", label: "Patrón Recurrente" },
              { id: "emerging", label: "Señal Emergente" },
              { id: "limited", label: "Evidencia Limitada" },
            ].map((l) => (
              <button
                key={l.id}
                onClick={() => setSelectedLevel(l.id)}
                className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-all cursor-pointer ${
                  selectedLevel === l.id
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="h-4 w-[1px] bg-stone-200 hidden md:block mx-1" />

          {/* Origin Selectors */}
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-[11px] text-stone-400 font-bold mr-1">Dataset:</span>
            {[
              { id: "all", label: "Todos" },
              { id: "real-pilot", label: "Real Pilot (Verificadas)" },
              { id: "prototype", label: "Prototipo" },
            ].map((o) => (
              <button
                key={o.id}
                onClick={() => setSelectedDataOrigin(o.id)}
                className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-all cursor-pointer ${
                  selectedDataOrigin === o.id
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* Local Search input */}
        <div className="relative pt-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Buscar por palabra clave dentro de los insights (ej. Chocolate Dubai, turno noche, demora, climatización)..."
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]/30 focus:bg-white transition-all"
          />
        </div>
      </section>

      {/* Insights List Feed */}
      <section className="space-y-4">
        {refinedInsights.length > 0 ? (
          refinedInsights.map((insight) => (
            <InsightCard
              key={insight.id}
              insight={insight}
              onDrillDown={onNavigateToReviewsWithFilter}
            />
          ))
        ) : (
          <div className="bg-white border border-stone-200/90 rounded-2xl p-10 text-center space-y-3 font-['Plus_Jakarta_Sans']">
            <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-800 font-['Outfit']">
              No se encontraron insights para los filtros seleccionados
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              Intente flexibilizar el filtro de franja horaria, nivel de evidencia o restablecer la búsqueda por texto.
            </p>
            <button
              onClick={() => {
                setSelectedType("all");
                setSelectedLevel("all");
                setSelectedDataOrigin("all");
                setLocalSearch("");
                onUpdateFilters({ timeSlot: null, brand: null, province: null, flavor: null });
              }}
              className="px-4 py-2 bg-[#1B4D3E] text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-[#143D32] transition-colors"
            >
              Restablecer Filtros
            </button>
          </div>
        )}
      </section>

      {/* Weather Readiness / Contextual Enrichment Card */}
      <WeatherReadinessCard />
    </div>
  );
};
