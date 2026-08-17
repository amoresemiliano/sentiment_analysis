import React, { useState } from "react";
import { FilterState } from "../types";
import { PROTOTYPE_DECISION_SCENARIOS } from "../data/prototypeMetrics";
import {
  FlaskConical,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Store,
  Factory,
  Swords,
  Layers,
  ArrowRight,
  ClipboardList,
  ShieldCheck,
  Info,
} from "lucide-react";

interface DecisionLabPageProps {
  filters: FilterState;
}

export const DecisionLabPage: React.FC<DecisionLabPageProps> = ({ filters }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("scen-01");

  const currentScenario =
    PROTOTYPE_DECISION_SCENARIOS.find((s) => s.id === selectedScenarioId) ||
    PROTOTYPE_DECISION_SCENARIOS[0];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16 font-['Plus_Jakarta_Sans']">
      {/* Header */}
      <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-[#112A23] font-['Outfit']">
              Decision Lab · Soporte para la Decisión Gerencial
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
              Decision Support System (DSS)
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Cruce de evidencia comercial, operativa, competitiva y percepción del consumidor para guiar las decisiones de Marketing y Dirección.
          </p>
        </div>
      </div>

      {/* Scenario Selector */}
      <div className="space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
          Seleccionar Caso de Decisión:
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PROTOTYPE_DECISION_SCENARIOS.map((scen) => {
            const isSelected = scen.id === selectedScenarioId;
            return (
              <button
                key={scen.id}
                onClick={() => setSelectedScenarioId(scen.id)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#1B4D3E] text-white border-[#143B30] shadow-md"
                    : "bg-white border-stone-200 text-stone-800 hover:border-stone-300 hover:bg-stone-50"
                }`}
              >
                <div>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                      isSelected
                        ? "bg-emerald-800 text-emerald-100"
                        : scen.decisionSignal.color === "emerald"
                        ? "bg-emerald-100 text-emerald-800"
                        : scen.decisionSignal.color === "amber"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {scen.decisionSignal.badge}
                  </span>
                  <h4 className="font-bold text-sm font-['Outfit'] mt-2">{scen.productName}</h4>
                  <p
                    className={`text-[11px] mt-1 line-clamp-2 ${
                      isSelected ? "text-emerald-100/90" : "text-stone-500"
                    }`}
                  >
                    {scen.province} · {scen.timeframe}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 Multi-Dimensional Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Commercial */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-stone-900">
            <Store className="w-4 h-4 text-[#1B4D3E]" />
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500">1. Comercial</h4>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-stone-500">Índice Ventas:</span>
              <span className="font-bold text-stone-900">
                {currentScenario.commercialMetric.salesVolumeIndex}/100
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Nivel de Margen:</span>
              <span className="font-bold text-emerald-700">
                {currentScenario.commercialMetric.marginLevel}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Crecimiento:</span>
              <span className="font-bold text-emerald-700 flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" /> +{currentScenario.commercialMetric.growthRate}%
              </span>
            </div>
          </div>
        </div>

        {/* 2. Consumer */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-stone-900">
            <Sparkles className="w-4 h-4 text-[#1B4D3E]" />
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500">2. Consumidor (NLP)</h4>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-stone-500">Sentimiento:</span>
              <span className="font-bold text-emerald-700">
                {currentScenario.consumerMetric.sentimentScore}% Positivo
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Menciones:</span>
              <span className="font-bold text-stone-900">
                {currentScenario.consumerMetric.volumeMentions} opiniones
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">NPS Proxy Digital:</span>
              <span className="font-bold text-emerald-800">
                +{currentScenario.consumerMetric.npsProxy}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Operational */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-stone-900">
            <Factory className="w-4 h-4 text-[#1B4D3E]" />
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500">3. Operaciones & Planta</h4>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-stone-500">Fricción Stock:</span>
              <span
                className={`font-bold ${
                  currentScenario.operationalMetric.availabilityFrictionPct > 25
                    ? "text-rose-700"
                    : "text-stone-700"
                }`}
              >
                {currentScenario.operationalMetric.availabilityFrictionPct}% quejas
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Estrés Capacidad:</span>
              <span className="font-bold text-amber-700">
                {currentScenario.operationalMetric.productionCapacityStress}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Insumos Críticos:</span>
              <span className="font-bold text-stone-700">
                {currentScenario.operationalMetric.ingredientSourcing}
              </span>
            </div>
          </div>
        </div>

        {/* 4. Competitive */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-stone-900">
            <Swords className="w-4 h-4 text-[#1B4D3E]" />
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500">4. Competencia</h4>
          </div>
          <div className="space-y-2 text-xs">
            <div className="text-stone-600 line-clamp-2 text-[11px]">
              {currentScenario.competitiveMetric.competitorOffering}
            </div>
            <div className="flex justify-between pt-1 border-t border-stone-100">
              <span className="text-stone-500">Posición Precio:</span>
              <span className="font-bold text-stone-800">
                {currentScenario.competitiveMetric.relativePricePosition}
              </span>
            </div>
            <div className="text-[11px] text-emerald-800 font-semibold truncate">
              {currentScenario.competitiveMetric.sentimentAdvantage}
            </div>
          </div>
        </div>
      </div>

      {/* Decision Signal Box */}
      <div className="bg-white border-2 border-[#1B4D3E] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                  currentScenario.decisionSignal.color === "emerald"
                    ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                    : currentScenario.decisionSignal.color === "amber"
                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                    : "bg-rose-100 text-rose-900 border border-rose-300"
                }`}
              >
                Señal DSS: {currentScenario.decisionSignal.badge}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-['Outfit'] pt-1">
              {currentScenario.decisionSignal.signalTitle}
            </h3>
          </div>

          <div className="text-xs text-stone-400 italic">
            * Soporte a la decisión · No constituye mandato automático
          </div>
        </div>

        {/* Narrative Summary */}
        <div className="p-4 bg-[#FAF9F5] border border-stone-200 rounded-xl space-y-2 text-xs sm:text-sm text-stone-700 leading-relaxed font-['Plus_Jakarta_Sans']">
          <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#1B4D3E]" /> Síntesis de Evidencia
          </h4>
          <p>{currentScenario.decisionSignal.narrativeSummary}</p>
        </div>

        {/* Actionable Validation Checklist */}
        <div className="space-y-3">
          <h4 className="font-bold text-stone-900 text-sm font-['Outfit'] flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-[#1B4D3E]" /> Preguntas Clave & Checklist antes de Decidir
            (Marketing / Gerencia)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentScenario.decisionSignal.checklistToValidate.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl flex items-start gap-2.5 text-xs text-stone-700"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
