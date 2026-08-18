import React from "react";
import { BusinessInsight, GlobalFilters } from "../../types";
import { EvidenceLevelBadge } from "./EvidenceLevelBadge";
import { InsightEvidence } from "./InsightEvidence";
import { InsightContext } from "./InsightContext";
import { InsightBusinessQuestion } from "./InsightBusinessQuestion";
import {
  ExternalLink,
  Search,
  ChevronRight,
  TrendingUp,
  Store,
  Clock,
  Layers,
  Sparkles,
  Info,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";

interface InsightCardProps {
  insight: BusinessInsight;
  onDrillDown: (insight: BusinessInsight) => void;
}

export const InsightCard: React.FC<InsightCardProps> = ({ insight, onDrillDown }) => {
  const getCategoryLabel = (type: BusinessInsight["type"]) => {
    switch (type) {
      case "operations":
        return { label: "Operaciones & Servicio", color: "bg-rose-50 text-rose-800 border-rose-200" };
      case "product":
        return { label: "Producto & Recetas", color: "bg-amber-50 text-amber-900 border-amber-200" };
      case "branch":
        return { label: "Sucursal & Salón", color: "bg-emerald-50 text-emerald-900 border-emerald-200" };
      case "time":
        return { label: "Momento & Turno", color: "bg-sky-50 text-sky-900 border-sky-200" };
      case "context":
        return { label: "Contexto & Clima", color: "bg-purple-50 text-purple-900 border-purple-200" };
      case "competitive":
        return { label: "Benchmarking Competitivo", color: "bg-stone-100 text-stone-800 border-stone-300" };
      case "marketing":
      default:
        return { label: "Marketing & Percepción", color: "bg-blue-50 text-blue-900 border-blue-200" };
    }
  };

  const catConfig = getCategoryLabel(insight.type);

  // Management attention configuration
  const getManagementAttentionConfig = () => {
    switch (insight.managementAttention) {
      case "HIGH ATTENTION":
        return {
          label: "HIGH ATTENTION",
          badgeClass: "bg-rose-600 text-white",
          containerClass: "bg-rose-50/80 border-rose-200 text-rose-950",
          icon: AlertTriangle,
        };
      case "ATTENTION":
        return {
          label: "MANAGEMENT ATTENTION",
          badgeClass: "bg-amber-600 text-white",
          containerClass: "bg-amber-50/80 border-amber-200 text-amber-950",
          icon: AlertTriangle,
        };
      case "WATCH":
        return {
          label: "WATCH LIST",
          badgeClass: "bg-blue-600 text-white",
          containerClass: "bg-blue-50/80 border-blue-200 text-blue-950",
          icon: Info,
        };
      default:
        return null;
    }
  };

  const attentionConfig = getManagementAttentionConfig();

  return (
    <article className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 hover:border-stone-400 transition-all font-['Plus_Jakarta_Sans']">
      {/* Management Attention Banner if active */}
      {attentionConfig && (
        <div
          className={`px-3.5 py-2.5 rounded-xl border flex items-start justify-between gap-2.5 text-xs ${attentionConfig.containerClass}`}
        >
          <div className="flex items-start gap-2">
            <attentionConfig.icon className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-black px-1.5 py-0.2 rounded uppercase tracking-wider ${attentionConfig.badgeClass}`}>
                  {attentionConfig.label}
                </span>
                <span className="font-bold text-xs">
                  {insight.managementAttentionReason || "Patrón relevante dentro del corpus observado"}
                </span>
              </div>
              <p className="text-[11px] text-stone-600 mt-0.5">
                Esta alerta indica recurrencia y peso observacional. No identifica por sí sola la causa del fenómeno.
              </p>
            </div>
          </div>

          <span
            title="Asociación observacional · no implica causalidad"
            className="hidden sm:inline-flex text-[9px] font-bold text-stone-500 bg-white/80 px-2 py-0.5 rounded border border-stone-200 shrink-0 self-start cursor-help"
          >
            No Causal
          </span>
        </div>
      )}

      {/* Top Header with Category & Level Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border uppercase tracking-wider ${catConfig.color}`}
          >
            {catConfig.label}
          </span>
          <EvidenceLevelBadge
            signalStrength={insight.signalStrength}
            level={insight.evidenceLevel}
            dataType={insight.dataType}
            managementAttention={insight.managementAttention}
            isSmallSample={insight.isSmallSample}
          />
        </div>

        <span className="text-[11px] font-bold text-stone-400 font-mono">
          ID: {insight.id}
        </span>
      </div>

      {/* Main Title */}
      <div>
        <h3 className="text-base sm:text-lg font-extrabold text-[#112A23] leading-snug font-['Outfit']">
          {insight.title}
        </h3>
      </div>

      {/* 1. HECHO OBSERVADO (WHAT IS RECORDED IN CORPUS) */}
      <div className="space-y-1 bg-stone-50/60 p-3 rounded-xl border border-stone-200/70">
        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-[#1B4D3E]" />
          <span>1. Hecho Observado (Datos en el Corpus)</span>
        </span>
        <p className="text-xs sm:text-sm text-stone-900 leading-relaxed font-normal">
          {insight.observedData || insight.observation}
        </p>
      </div>

      {/* 2. PATRÓN DESCRIPTIVO */}
      {insight.pattern && (
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
            2. Patrón Descriptivo
          </span>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
            {insight.pattern}
          </p>
        </div>
      )}

      {/* Quantitative Evidence Box with Denominator */}
      <InsightEvidence
        evidence={insight.evidence}
        sourcesDistribution={insight.sourcesDistribution}
        nonCausalDisclaimer={insight.nonCausalDisclaimer}
      />

      {/* Context Dimensions */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
          Dimensiones Contextuales
        </span>
        <InsightContext dimensions={insight.dimensions} />
      </div>

      {/* 3. HIPÓTESIS EXPLICATIVA (EXPLORATORY HYPOTHESIS) */}
      <div className="p-3.5 bg-stone-50 border border-stone-200/70 rounded-xl space-y-1">
        <div className="flex items-center justify-between gap-1.5 text-stone-700 text-xs font-bold uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#1B4D3E]" />
            <span>3. Hipótesis Explicativa a Investigar</span>
          </div>
          <span
            title="Asociación exploratoria · no implica causalidad"
            className="text-[9px] font-semibold text-stone-500 bg-white px-1.5 py-0.5 rounded border border-stone-200 cursor-help"
          >
            No Causal
          </span>
        </div>
        <p className="text-xs text-stone-700 leading-relaxed italic font-['Newsreader']">
          “{insight.exploratoryHypothesis || insight.interpretation}”
        </p>
      </div>

      {/* 4. VALIDACIÓN REQUERIDA / BUSINESS QUESTION */}
      <div className="space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
          4. Validación Requerida (Contrastación Gerencial)
        </span>
        <InsightBusinessQuestion question={insight.validationRequired || insight.businessQuestion} />
      </div>

      {/* Non-Causal Guardrail Disclaimer Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-lg bg-stone-50 text-[11px] text-stone-600 border border-stone-200/80">
        <span className="font-semibold text-stone-700 flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span>{insight.nonCausalDisclaimer || "Asociación exploratoria · no implica causalidad"}</span>
        </span>
        <span className="text-[10px] text-stone-400 font-mono">Linaje: {insight.dataType}</span>
      </div>

      {/* CTA Button: Ver Evidencia */}
      <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs text-stone-500">
          Evidencia trazable: <strong className="text-stone-800">{insight.evidence.mentions} verbatims únicos</strong> vinculados a este insight
        </div>

        <button
          onClick={() => onDrillDown(insight)}
          className="min-h-[44px] px-4 py-2 bg-[#1B4D3E] hover:bg-[#143D32] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer self-stretch sm:self-auto"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Ver Evidencia ({insight.evidence.mentions} reviews)</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};
