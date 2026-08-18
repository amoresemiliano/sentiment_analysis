import React from "react";
import { GlobalFilters, TimeSlot } from "../../types";
import { computeTimeSlotAnalytics } from "../../data/dynamicAnalyticsEngine";
import { Clock, Sun, Sunset, Moon, HelpCircle, Calendar, AlertTriangle } from "lucide-react";

interface TimeSlotBreakdownProps {
  filters: GlobalFilters;
  onSelectTimeSlot: (slot: TimeSlot | "Todos") => void;
  selectedTimeSlot?: TimeSlot | "Todos" | null;
}

export const TimeSlotBreakdown: React.FC<TimeSlotBreakdownProps> = ({
  filters,
  onSelectTimeSlot,
  selectedTimeSlot = "Todos",
}) => {
  const { slots, weekendVsWeekday } = computeTimeSlotAnalytics(filters);

  const getSlotIcon = (slot: TimeSlot) => {
    switch (slot) {
      case "Morning":
        return <Sun className="w-4 h-4 text-amber-500" />;
      case "Afternoon":
        return <Sunset className="w-4 h-4 text-orange-500" />;
      case "Night":
        return <Moon className="w-4 h-4 text-indigo-500" />;
      case "Unknown":
      default:
        return <HelpCircle className="w-4 h-4 text-stone-400" />;
    }
  };

  return (
    <section className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 space-y-5 font-['Plus_Jakarta_Sans'] shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#1B4D3E]" />
            <h3 className="text-base font-extrabold text-[#112A23] font-['Outfit']">
              Dimensión Temporal: ¿Cuándo Ocurren las Fricciones?
            </h3>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Análisis de distribución de opiniones y sentimiento por franja horaria y fin de semana vs días hábiles.
          </p>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <span className="text-[11px] font-bold text-stone-400">Filtro Rápido:</span>
          <button
            onClick={() => onSelectTimeSlot("Todos")}
            className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-all cursor-pointer ${
              selectedTimeSlot === "Todos" || !selectedTimeSlot
                ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
            }`}
          >
            Todos
          </button>
        </div>
      </div>

      {/* Time Slots 4-column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {slots.map((slot) => {
          const isSelected = selectedTimeSlot === slot.timeSlot;
          const isNight = slot.timeSlot === "Night";

          return (
            <div
              key={slot.timeSlot}
              onClick={() => onSelectTimeSlot(isSelected ? "Todos" : slot.timeSlot)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2.5 ${
                isSelected
                  ? "bg-emerald-50/70 border-[#1B4D3E] ring-2 ring-[#1B4D3E]/20"
                  : isNight
                  ? "bg-rose-50/30 border-rose-200/80 hover:border-rose-300"
                  : "bg-[#FAF9F5] border-stone-200/80 hover:border-stone-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {getSlotIcon(slot.timeSlot)}
                  <span className="text-xs font-extrabold text-stone-900 font-['Outfit']">
                    {slot.timeSlot === "Morning"
                      ? "Mañana"
                      : slot.timeSlot === "Afternoon"
                      ? "Tarde"
                      : slot.timeSlot === "Night"
                      ? "Noche / Cierre"
                      : "Sin Horario"}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white text-stone-700 border border-stone-200">
                  {slot.pctOfCorpus}%
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-[11px] text-stone-500">Muestras:</span>
                  <strong className="text-xs font-bold text-stone-900">{slot.count} reviews</strong>
                </div>

                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-[11px] text-stone-500">Net Sentiment:</span>
                  <strong
                    className={`text-xs font-extrabold ${
                      slot.netScore > 0 ? "text-emerald-700" : slot.netScore < 0 ? "text-rose-700" : "text-stone-600"
                    }`}
                  >
                    {slot.netScore > 0 ? `+${slot.netScore}` : slot.netScore}%
                  </strong>
                </div>

                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-[11px] text-stone-500">Tasa Negativa:</span>
                  <strong
                    className={`text-xs font-bold ${
                      slot.negativePct > 15 ? "text-rose-600 font-extrabold" : "text-stone-600"
                    }`}
                  >
                    {slot.negativePct}%
                  </strong>
                </div>
              </div>

              {/* Top Friction snippet */}
              <div className="pt-1.5 border-t border-stone-200/60 text-[10px] text-stone-600 space-y-0.5">
                <span className="font-bold text-stone-400 block uppercase tracking-wider text-[9px]">
                  Fricción Típica:
                </span>
                <span className="line-clamp-2 italic">“{slot.topFriction}”</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekend vs Weekday Comparative Strip */}
      <div className="bg-[#FAF9F5] border border-stone-200/80 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
              Contraste: Fin de Semana vs Días Hábiles
            </h4>
            <p className="text-xs text-stone-600">
              La fricción de tiempos de espera y quiebre de stock se multiplica por 2.4× entre viernes y domingo.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end text-xs">
          <div className="bg-white px-3 py-2 rounded-lg border border-stone-200 text-center">
            <span className="text-[10px] text-stone-400 block font-semibold">Fin de Semana (Vie-Dom)</span>
            <span className="font-extrabold text-stone-900">{weekendVsWeekday.weekendCount} reviews</span>
            <span className="text-[10px] text-rose-600 font-bold block">
              {weekendVsWeekday.weekendNegativePct}% fricción
            </span>
          </div>

          <div className="bg-white px-3 py-2 rounded-lg border border-stone-200 text-center">
            <span className="text-[10px] text-stone-400 block font-semibold">Días Hábiles (Lun-Jue)</span>
            <span className="font-extrabold text-stone-900">{weekendVsWeekday.weekdayCount} reviews</span>
            <span className="text-[10px] text-emerald-700 font-bold block">
              {weekendVsWeekday.weekdayNegativePct}% fricción
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
