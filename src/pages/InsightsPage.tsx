import React, { useState, useMemo } from "react";
import { BusinessInsight, GlobalFilters, TimeSlot, SignalStrength } from "../types";
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
  ShieldCheck,
  AlertTriangle,
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
  const [selectedSignalStrength, setSelectedSignalStrength] = useState<string>("all");
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
      // Signal Strength
      if (selectedSignalStrength !== "all" && ins.signalStrength !== selectedSignalStrength) {
        return false;
      }
      // Origin
      if (selectedDataOrigin !== "all") {
        if (selectedDataOrigin === "unverified-pilot" && ins.dataType !== "unverified-pilot") return false;
        if (selectedDataOrigin === "prototype" && ins.dataType !== "prototype") return false;
        if (selectedDataOrigin === "mixed" && ins.dataType !== "mixed") return false;
        if (selectedDataOrigin === "verified-public" && ins.dataType !== "verified-public") return false;
      }
      // Search
      if (localSearch.trim() !== "") {
        const q = localSearch.toLowerCase();
        const matchTitle = ins.title.toLowerCase().includes(q);
        const matchObs = (ins.observedData || ins.observation).toLowerCase().includes(q);
        const matchPattern = (ins.pattern || "").toLowerCase().includes(q);
        const matchInterp = (ins.exploratoryHypothesis || ins.interpretation).toLowerCase().includes(q);
        const matchQ = (ins.validationRequired || ins.businessQuestion).toLowerCase().includes(q);
        if (!matchTitle && !matchObs && !matchPattern && !matchInterp && !matchQ) return false;
      }
      return true;
    });
  }, [baseInsights, selectedType, selectedSignalStrength, selectedDataOrigin, localSearch]);

  // Statistics counters
  const totalCount = baseInsights.length;
  const recurrentCount = baseInsights.filter(
    (i) => i.signalStrength === "RECURRENT PATTERN" || i.signalStrength === "HIGH PREVALENCE SIGNAL"
  ).length;
  const emergingCount = baseInsights.filter((i) => i.signalStrength === "EMERGING SIGNAL").length;
  const unverifiedPilotCount = baseInsights.filter((i) => i.dataType === "unverified-pilot").length;
  const attentionCount = baseInsights.filter(
    (i) => i.managementAttention === "ATTENTION" || i.managementAttention === "HIGH ATTENTION"
  ).length;

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
                <span>Capa Analítica · Iteración 5.1</span>
              </span>
              <span className="text-xs text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md font-bold">
                Linaje: Piloto No Verificado + Prototipo
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#112A23] tracking-tight font-['Outfit']">
              Evidence-Based Business Insights
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
              Transformación de conjuntos de opiniones y señales de clientes en líneas de interpretación empresarial
              trazables. Cada insight distingue estrictamente entre <strong>Hecho Observado</strong>, <strong>Patrón Descriptivo</strong>, <strong>Hipótesis Explicativa</strong> y <strong>Validación Requerida</strong>.
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
              <span className="text-[10px] text-emerald-800 block font-bold uppercase">Patrones Recurrentes</span>
              <strong className="text-base font-extrabold text-emerald-950 font-['Outfit']">
                {recurrentCount}
              </strong>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl">
              <span className="text-[10px] text-amber-800 block font-bold uppercase">Señales Emergentes</span>
              <strong className="text-base font-extrabold text-amber-950 font-['Outfit']">
                {emergingCount}
              </strong>
            </div>

            <div className="bg-rose-50 border border-rose-200 p-2.5 rounded-xl">
              <span className="text-[10px] text-rose-800 block font-bold uppercase">Management Attention</span>
              <strong className="text-base font-extrabold text-rose-950 font-['Outfit']">
                {attentionCount}
              </strong>
            </div>
          </div>
        </div>

        {/* Epistemological Banner */}
        <div className="bg-[#FAF9F5] border border-stone-200/70 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-600">
          <div className="flex items-start gap-2">
            <BookOpen className="w-4 h-4 text-[#1B4D3E] shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-900 font-bold">Principio de No-Dogmatismo & Rigor Epistemológico:</strong>
              <span className="ml-1 text-stone-600">
                “Una opinión puede ser anecdótica. Muchas opiniones coherentes pueden constituir una señal. Una señal fuerte merece atención. Una señal no demuestra por sí sola su causa.”
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
              Filtrar Insights por Eje Temático, Fuerza de Señal y Linaje
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

          {/* Signal Strength Selectors */}
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-[11px] text-stone-400 font-bold mr-1">Señal:</span>
            {[
              { id: "all", label: "Todas" },
              { id: "RECURRENT PATTERN", label: "Patrón Recurrente" },
              { id: "EMERGING SIGNAL", label: "Señal Emergente" },
              { id: "LIMITED EVIDENCE", label: "Evidencia Limitada" },
            ].map((l) => (
              <button
                key={l.id}
                onClick={() => setSelectedSignalStrength(l.id)}
                className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-all cursor-pointer ${
                  selectedSignalStrength === l.id
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
              { id: "unverified-pilot", label: "Piloto (No Verificado)" },
              { id: "mixed", label: "Mixto" },
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
                setSelectedSignalStrength("all");
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
