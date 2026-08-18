import React from "react";
import { BusinessInsight } from "../../types";
import { MapPin, IceCream, Tags, Clock, Calendar, Store, Layers } from "lucide-react";

interface InsightContextProps {
  dimensions: BusinessInsight["dimensions"];
}

export const InsightContext: React.FC<InsightContextProps> = ({ dimensions }) => {
  return (
    <div className="flex flex-wrap items-center gap-1.5 text-xs font-['Plus_Jakarta_Sans']">
      {dimensions.brand && (
        <span className="inline-flex items-center gap-1 bg-stone-100 border border-stone-200 text-stone-800 px-2 py-0.5 rounded-md font-semibold text-[11px]">
          <Store className="w-3 h-3 text-stone-500" />
          <span>Marca: {dimensions.brand}</span>
        </span>
      )}

      {dimensions.province && (
        <span className="inline-flex items-center gap-1 bg-stone-100 border border-stone-200 text-stone-800 px-2 py-0.5 rounded-md font-semibold text-[11px]">
          <MapPin className="w-3 h-3 text-stone-500" />
          <span>{dimensions.province}</span>
        </span>
      )}

      {dimensions.city && (
        <span className="inline-flex items-center gap-1 bg-stone-100 border border-stone-200 text-stone-700 px-2 py-0.5 rounded-md text-[11px]">
          <span>{dimensions.city}</span>
        </span>
      )}

      {dimensions.branch && (
        <span className="inline-flex items-center gap-1 bg-stone-100 border border-stone-200 text-stone-800 px-2 py-0.5 rounded-md font-semibold text-[11px]">
          <MapPin className="w-3 h-3 text-emerald-700" />
          <span>Sucursal: {dimensions.branch}</span>
        </span>
      )}

      {dimensions.flavor && (
        <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-950 px-2 py-0.5 rounded-md font-bold text-[11px]">
          <IceCream className="w-3 h-3 text-amber-700" />
          <span>Sabor: {dimensions.flavor}</span>
        </span>
      )}

      {dimensions.topic && (
        <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-900 px-2 py-0.5 rounded-md font-semibold text-[11px]">
          <Tags className="w-3 h-3 text-emerald-700" />
          <span>Tópico: {dimensions.topic}</span>
        </span>
      )}

      {dimensions.timeSlot && (
        <span className="inline-flex items-center gap-1 bg-sky-50 border border-sky-200 text-sky-900 px-2 py-0.5 rounded-md font-semibold text-[11px]">
          <Clock className="w-3 h-3 text-sky-700" />
          <span>Turno: {dimensions.timeSlot === "Night" ? "Noche (20:00+)" : dimensions.timeSlot === "Afternoon" ? "Tarde" : dimensions.timeSlot === "Morning" ? "Mañana" : "Indeterminado"}</span>
        </span>
      )}

      {dimensions.isWeekend && (
        <span className="inline-flex items-center gap-1 bg-purple-50 border border-purple-200 text-purple-900 px-2 py-0.5 rounded-md font-semibold text-[11px]">
          <Calendar className="w-3 h-3 text-purple-700" />
          <span>Fin de semana (Viernes a Domingo)</span>
        </span>
      )}
    </div>
  );
};
