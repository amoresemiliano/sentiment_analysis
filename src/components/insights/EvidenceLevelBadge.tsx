import React from "react";
import { BusinessInsight } from "../../types";
import { ShieldCheck, AlertCircle, Sparkles, Database } from "lucide-react";

interface EvidenceLevelBadgeProps {
  level: BusinessInsight["evidenceLevel"];
  dataType: BusinessInsight["dataType"];
  isSmallSample?: boolean;
}

export const EvidenceLevelBadge: React.FC<EvidenceLevelBadgeProps> = ({
  level,
  dataType,
  isSmallSample,
}) => {
  const getLevelConfig = () => {
    switch (level) {
      case "recurrent":
        return {
          label: "Patrón Recurrente",
          classes: "bg-emerald-100 text-emerald-900 border-emerald-300",
          desc: "Concentración clara dentro del corpus analizado",
        };
      case "emerging":
        return {
          label: "Señal Emergente",
          classes: "bg-amber-100 text-amber-900 border-amber-300",
          desc: "Patrón con repetición incipiente en sucursales",
        };
      case "limited":
      default:
        return {
          label: "Evidencia Limitada",
          classes: "bg-stone-100 text-stone-700 border-stone-300",
          desc: "Pocos registros o baja prevalencia relativa",
        };
    }
  };

  const getDataTypeConfig = () => {
    switch (dataType) {
      case "real-pilot":
        return {
          label: "REAL PILOT INSIGHT",
          dot: "bg-emerald-500",
          classes: "bg-emerald-50 text-emerald-800 border-emerald-200",
        };
      case "mixed":
        return {
          label: "MIXED INSIGHT",
          dot: "bg-sky-500",
          classes: "bg-sky-50 text-sky-800 border-sky-200",
        };
      case "prototype":
      default:
        return {
          label: "PROTOTYPE INSIGHT",
          dot: "bg-amber-500",
          classes: "bg-amber-50 text-amber-800 border-amber-200",
        };
    }
  };

  const levelConfig = getLevelConfig();
  const dataConfig = getDataTypeConfig();

  return (
    <div className="flex flex-wrap items-center gap-1.5 font-['Plus_Jakarta_Sans']">
      {/* Evidence Level Badge */}
      <span
        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border uppercase tracking-wider ${levelConfig.classes}`}
        title={levelConfig.desc}
      >
        {levelConfig.label}
      </span>

      {/* Dataset Type Badge */}
      <span
        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 ${dataConfig.classes}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${dataConfig.dot}`} />
        <span>{dataConfig.label}</span>
      </span>

      {/* Small Sample Warning */}
      {isSmallSample && (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200 flex items-center gap-0.5">
          <AlertCircle className="w-3 h-3 text-amber-600 shrink-0" />
          <span>Muestra reducida</span>
        </span>
      )}
    </div>
  );
};
