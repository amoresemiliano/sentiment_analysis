import React from "react";
import { EvidenceContextData } from "../types";
import { Info, Star, MessageSquare, Layers, Radio, ShieldCheck } from "lucide-react";

interface EvidenceContextProps {
  data: EvidenceContextData;
  title?: string;
  className?: string;
  compact?: boolean;
}

export const EvidenceContext: React.FC<EvidenceContextProps> = ({
  data,
  title = "Peso de la Señal (Evidence Context)",
  className = "",
  compact = false,
}) => {
  return (
    <div
      className={`bg-stone-50/80 border border-stone-200/90 rounded-xl p-3.5 sm:p-4 text-xs font-['Plus_Jakarta_Sans'] transition-all ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-stone-200/70">
        <div className="flex items-center gap-1.5 font-bold text-stone-800">
          <Layers className="w-3.5 h-3.5 text-[#1B4D3E]" />
          <span>{title}</span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
              data.signalStrength === "Alta"
                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                : data.signalStrength === "Media"
                ? "bg-amber-100 text-amber-800 border border-amber-200"
                : "bg-rose-100 text-rose-800 border border-rose-200"
            }`}
          >
            Fuerza de Señal: {data.signalStrength}
          </span>
          <span className="text-[10px] font-semibold bg-stone-200/80 text-stone-700 px-1.5 py-0.5 rounded">
            PROTOTYPE ANALYTICS
          </span>
        </div>
      </div>

      <div className={`grid ${compact ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-4"} gap-3`}>
        {/* Menciones */}
        <div className="space-y-0.5">
          <div className="text-[11px] text-stone-500 font-medium flex items-center gap-1">
            <MessageSquare className="w-3 h-3 text-stone-400" />
            Menciones
          </div>
          <div className="text-base font-extrabold text-stone-900 font-['Outfit']">
            {data.mentionCount}
          </div>
          <div className="text-[10px] text-stone-500">
            <strong className="text-stone-800">{data.shareOfAnalyzedCorpus}%</strong> del corpus analizado
          </div>
        </div>

        {/* Corpus Analizado */}
        <div className="space-y-0.5">
          <div className="text-[11px] text-stone-500 font-medium flex items-center gap-1">
            <Layers className="w-3 h-3 text-[#1B4D3E]" />
            Corpus Analizado
          </div>
          <div className="text-base font-extrabold text-[#1B4D3E] font-['Outfit']">
            {data.analyzedCorpusTotal}
          </div>
          <div className="text-[10px] text-stone-500">Denominador analítico activo</div>
        </div>

        {/* Public Reviews Context */}
        {data.publicReviewsTotal !== undefined && (
          <div className="space-y-0.5">
            <div className="text-[11px] text-stone-500 font-medium flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
              Contexto Público
            </div>
            <div className="text-base font-extrabold text-stone-900 font-['Outfit']">
              {data.publicReviewsTotal.toLocaleString()}
            </div>
            <div className="text-[10px] text-stone-500">
              {data.googleRating ? `★ ${data.googleRating} en Google` : "Opiniones públicas registradas"}
            </div>
          </div>
        )}

        {/* Sources & Period */}
        <div className="space-y-0.5">
          <div className="text-[11px] text-stone-500 font-medium flex items-center gap-1">
            <Radio className="w-3 h-3 text-stone-400" />
            Fuentes & Período
          </div>
          <div className="text-xs font-bold text-stone-800 font-['Outfit'] pt-0.5">
            {data.sourcesCount} canales digitales
          </div>
          <div className="text-[10px] text-stone-500">{data.periodLabel}</div>
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex items-start gap-1.5 text-[10px] text-stone-500 leading-snug">
        <Info className="w-3 h-3 text-stone-400 shrink-0 mt-0.5" />
        <span>
          <strong>Regla metodológica:</strong> Las {data.mentionCount} menciones representan el {data.shareOfAnalyzedCorpus}% de los {data.analyzedCorpusTotal} textos efectivamente analizados (no del total de {data.publicReviewsTotal?.toLocaleString()} reseñas públicas acumuladas).
        </span>
      </div>
    </div>
  );
};
