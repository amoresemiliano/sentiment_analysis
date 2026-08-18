import React from "react";
import { BusinessInsight } from "../../types";
import { MessageSquare, BarChart2, Globe, ShieldAlert } from "lucide-react";

interface InsightEvidenceProps {
  evidence: BusinessInsight["evidence"];
  sourcesDistribution?: BusinessInsight["sourcesDistribution"];
  nonCausalDisclaimer?: string;
}

export const InsightEvidence: React.FC<InsightEvidenceProps> = ({
  evidence,
  sourcesDistribution,
  nonCausalDisclaimer,
}) => {
  return (
    <div className="bg-[#FAF9F5] border border-stone-200/90 rounded-xl p-3.5 space-y-2.5 font-['Plus_Jakarta_Sans']">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1">
          <BarChart2 className="w-3.5 h-3.5 text-[#1B4D3E]" />
          <span>Sustento Cuantitativo & Denominador Contextual</span>
        </span>
        <span className="text-[11px] font-extrabold text-[#1B4D3E] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg">
          {evidence.prevalence}% de prevalencia contextual
        </span>
      </div>

      {/* Explicit contextual denominator */}
      {evidence.corpusDescription && (
        <div className="text-xs font-semibold text-stone-700 bg-white p-2 rounded-lg border border-stone-200/80">
          <span className="text-stone-500 font-normal">Denominador: </span>
          <strong className="text-stone-900">{evidence.corpusDescription}</strong>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
        <div className="bg-white p-2.5 rounded-lg border border-stone-200/70">
          <span className="text-[10px] text-stone-400 block font-semibold">Menciones que sustentan</span>
          <strong className="text-sm font-extrabold text-stone-900 font-['Outfit']">
            {evidence.mentions} menciones únicas
          </strong>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-stone-200/70">
          <span className="text-[10px] text-stone-400 block font-semibold">Corpus analizado</span>
          <strong className="text-sm font-extrabold text-stone-900 font-['Outfit']">
            {evidence.analyzedCorpus} textos
          </strong>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-white p-2.5 rounded-lg border border-stone-200/70">
          <span className="text-[10px] text-stone-400 block font-semibold">Prevalencia observada</span>
          <strong className="text-xs font-bold text-emerald-800">
            {evidence.mentions} de {evidence.analyzedCorpus} ({evidence.prevalence}%)
          </strong>
        </div>
      </div>

      {/* Sources Distribution Breakdown */}
      {sourcesDistribution && sourcesDistribution.length > 0 && (
        <div className="pt-1 border-t border-stone-200/60 flex flex-wrap items-center gap-2 text-[11px] text-stone-500">
          <span className="text-[10px] font-bold text-stone-400 flex items-center gap-0.5">
            <Globe className="w-3 h-3 text-stone-400" />
            <span>Fuentes:</span>
          </span>
          {sourcesDistribution.map((src) => (
            <span
              key={src.name}
              className="bg-stone-100 px-2 py-0.5 rounded text-[10px] font-semibold text-stone-700"
            >
              {src.name}: {src.count} ({src.pct}%)
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
