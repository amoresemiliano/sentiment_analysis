import React from "react";
import { BusinessInsight, DataType, ManagementAttentionLevel, SignalStrength } from "../../types";
import { ShieldCheck, AlertCircle, Sparkles, Database, Eye, AlertTriangle } from "lucide-react";

interface EvidenceLevelBadgeProps {
  signalStrength?: SignalStrength;
  level?: BusinessInsight["evidenceLevel"];
  dataType: DataType;
  managementAttention?: ManagementAttentionLevel;
  isSmallSample?: boolean;
}

export const EvidenceLevelBadge: React.FC<EvidenceLevelBadgeProps> = ({
  signalStrength,
  level,
  dataType,
  managementAttention,
  isSmallSample,
}) => {
  const getSignalStrengthConfig = () => {
    switch (signalStrength) {
      case "CRITICAL OBSERVATIONAL SIGNAL":
        return {
          label: "Señal Observacional Crítica",
          classes: "bg-rose-100 text-rose-900 border-rose-300",
          desc: "Concentración observacional >=60% con persistencia multicanal",
        };
      case "HIGH PREVALENCE SIGNAL":
        return {
          label: "Alta Prevalencia Observada",
          classes: "bg-purple-100 text-purple-900 border-purple-300",
          desc: "Alta concentración de menciones dentro del corpus seleccionado",
        };
      case "RECURRENT PATTERN":
        return {
          label: "Patrón Recurrente",
          classes: "bg-emerald-100 text-emerald-900 border-emerald-300",
          desc: "Concentración clara observada en el corpus analizado",
        };
      case "EMERGING SIGNAL":
        return {
          label: "Señal Emergente",
          classes: "bg-amber-100 text-amber-900 border-amber-300",
          desc: "Patrón con repetición incipiente en sucursales",
        };
      case "LIMITED EVIDENCE":
      default:
        return {
          label: "Evidencia Limitada",
          classes: "bg-stone-100 text-stone-700 border-stone-300",
          desc: "Pocos registros o submuestra exploratoria",
        };
    }
  };

  const getDataTypeConfig = () => {
    switch (dataType) {
      case "verified-public":
        return {
          label: "VERIFIED PUBLIC INSIGHT",
          dot: "bg-emerald-500",
          classes: "bg-emerald-50 text-emerald-800 border-emerald-200",
        };
      case "unverified-pilot":
        return {
          label: "PILOT DATA — PENDING VERIFICATION",
          dot: "bg-amber-500",
          classes: "bg-amber-50 text-amber-800 border-amber-200",
        };
      case "mixed":
        return {
          label: "MIXED EVIDENCE",
          dot: "bg-sky-500",
          classes: "bg-sky-50 text-sky-800 border-sky-200",
        };
      case "prototype":
      default:
        return {
          label: "PROTOTYPE INSIGHT",
          dot: "bg-stone-400",
          classes: "bg-stone-100 text-stone-700 border-stone-200",
        };
    }
  };

  const signalConfig = getSignalStrengthConfig();
  const dataConfig = getDataTypeConfig();

  return (
    <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold">
      {/* Signal Strength Badge */}
      <span
        title={signalConfig.desc}
        className={`px-2 py-0.5 rounded-md border font-extrabold flex items-center gap-1 ${signalConfig.classes}`}
      >
        <Sparkles className="w-2.5 h-2.5 shrink-0" />
        <span>{signalConfig.label}</span>
      </span>

      {/* Data Lineage Badge */}
      <span
        title={`Origen metodológico: ${dataConfig.label}`}
        className={`px-2 py-0.5 rounded-md border flex items-center gap-1.5 font-bold tracking-tight ${dataConfig.classes}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${dataConfig.dot} shrink-0 animate-pulse`} />
        <span>{dataConfig.label}</span>
      </span>

      {/* Small sample warning */}
      {isSmallSample && (
        <span
          title="Muestra menor a 15 opiniones. Interpretar con cautela exploratoria."
          className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200 text-[9px] flex items-center gap-0.5"
        >
          <AlertCircle className="w-2.5 h-2.5 text-stone-400" />
          <span>Muestra Reducida</span>
        </span>
      )}
    </div>
  );
};
