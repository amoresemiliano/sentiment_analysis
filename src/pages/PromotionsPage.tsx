import React, { useState } from "react";
import { FilterState } from "../types";
import { PROTOTYPE_PROMOTIONS } from "../data/prototypeMetrics";
import {
  BadgePercent,
  Calendar,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Info,
  CheckCircle2,
  Layers,
  BarChart2,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface PromotionsPageProps {
  filters: FilterState;
}

export const PromotionsPage: React.FC<PromotionsPageProps> = ({ filters }) => {
  const [selectedPromoId, setSelectedPromoId] = useState<string>("promo-01");

  const selectedPromo =
    PROTOTYPE_PROMOTIONS.find((p) => p.id === selectedPromoId) || PROTOTYPE_PROMOTIONS[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-['Plus_Jakarta_Sans']">
      {/* Header */}
      <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-[#112A23] font-['Outfit']">
              Promotion Intelligence & Event Impact
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Monitoreo de Campañas
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Evaluación del eco digital, favorabilidad e impacto de promociones comerciales antes, durante y después del evento.
          </p>
        </div>
      </div>

      {/* Promotion Selector */}
      <div className="flex flex-wrap gap-3">
        {PROTOTYPE_PROMOTIONS.map((promo) => {
          const isSelected = promo.id === selectedPromoId;
          return (
            <button
              key={promo.id}
              onClick={() => setSelectedPromoId(promo.id)}
              className={`p-4 rounded-xl text-left border transition-all cursor-pointer min-w-[280px] flex-1 ${
                isSelected
                  ? "bg-[#1B4D3E] text-white border-[#143B30] shadow-sm"
                  : "bg-white border-stone-200 text-stone-800 hover:border-stone-300 hover:bg-stone-50"
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span
                  className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                    isSelected ? "bg-emerald-800 text-emerald-100" : "bg-stone-100 text-stone-600"
                  }`}
                >
                  {promo.brand} · {promo.status}
                </span>
                <span className={isSelected ? "text-emerald-200" : "text-stone-400"}>
                  {promo.dates}
                </span>
              </div>
              <h4 className="font-bold text-sm mt-2 font-['Outfit']">{promo.title}</h4>
            </button>
          );
        })}
      </div>

      {/* Before / During / After Comparison Grid */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-6">
        <div>
          <h3 className="font-bold text-stone-900 text-base font-['Outfit']">
            Impacto Temporal: {selectedPromo.title}
          </h3>
          <p className="text-xs text-stone-500">{selectedPromo.keyTakeaway}</p>
        </div>

        {/* 3-Stage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Before */}
          <div className="p-4 bg-[#FAF9F5] border border-stone-200 rounded-xl space-y-2 text-center">
            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
              1. PRE-CAMPAÑA (BEFORE)
            </div>
            <div className="text-2xl font-extrabold text-stone-800 font-['Outfit']">
              {selectedPromo.beforeVolume} <span className="text-xs font-normal text-stone-500">menciones</span>
            </div>
            <div className="text-xs font-semibold text-emerald-700">
              Sentimiento: {selectedPromo.beforeSentiment}%
            </div>
          </div>

          {/* During */}
          <div className="p-4 bg-emerald-50/80 border-2 border-emerald-500/50 rounded-xl space-y-2 text-center">
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-900">
              2. VIGENCIA DE PROMO (DURING)
            </div>
            <div className="text-3xl font-black text-emerald-950 font-['Outfit']">
              {selectedPromo.duringVolume} <span className="text-xs font-normal text-emerald-800">menciones</span>
            </div>
            <div className="text-xs font-bold text-emerald-800 flex items-center justify-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Sentimiento: {selectedPromo.duringSentiment}% (+16 pts)
            </div>
          </div>

          {/* After */}
          <div className="p-4 bg-[#FAF9F5] border border-stone-200 rounded-xl space-y-2 text-center">
            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
              3. POST-CAMPAÑA (AFTER)
            </div>
            <div className="text-2xl font-extrabold text-stone-800 font-['Outfit']">
              {selectedPromo.afterVolume} <span className="text-xs font-normal text-stone-500">menciones</span>
            </div>
            <div className="text-xs font-semibold text-emerald-700">
              Sentimiento residual: {selectedPromo.afterSentiment}%
            </div>
          </div>
        </div>

        {/* Integrated Commercial Impact Badge */}
        <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-900">Impacto en Ventas Estimado (Uplift):</span>
            <span className="font-black text-emerald-800 text-sm">+{selectedPromo.salesImpactIndex}%</span>
          </div>
          <span className="text-[10px] font-semibold text-blue-800 bg-blue-100 border border-blue-200 px-2 py-0.5 rounded">
            Prototype Integration · Requiere cruce con ERP
          </span>
        </div>

        {/* Timeline Chart with Events */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-stone-900 text-sm font-['Outfit']">
              Curva Temporal de Menciones y Sentimiento con Hitos de Campaña
            </h4>
            <span className="text-xs text-stone-400">Evolución diaria</span>
          </div>

          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={selectedPromo.timeline} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const dataPoint = payload[0].payload;
                      return (
                        <div className="p-3 bg-[#FAF9F5] border border-stone-300 rounded-xl shadow-lg text-xs space-y-1">
                          <div className="font-bold text-stone-900">{label}</div>
                          <div className="text-[#1B4D3E] font-semibold">Volumen: {dataPoint.volume} menciones</div>
                          <div className="text-emerald-700 font-semibold">Sentimiento: {dataPoint.sentiment}%</div>
                          {dataPoint.event && (
                            <div className="text-[11px] text-amber-900 bg-amber-100 px-2 py-0.5 rounded mt-1 font-medium">
                              ★ Hito: {dataPoint.event}
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="volume" stroke="#1B4D3E" strokeWidth={3} dot={{ r: 4 }} name="Volumen Menciones" />
                <Line type="monotone" dataKey="sentiment" stroke="#16A34A" strokeWidth={2} dot={{ r: 3 }} name="Sentimiento Positivo (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Causal Inference Educational Disclaimer Block */}
      <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-5 shadow-xs flex items-start gap-3.5 text-xs text-amber-950 font-['Plus_Jakarta_Sans']">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1 leading-relaxed">
          <h4 className="font-bold text-amber-900 text-sm font-['Outfit']">
            Rigurosidad Analítica: Correlación vs Causalidad
          </h4>
          <p>
            <strong>Una coincidencia temporal no implica causalidad estricta.</strong> El incremento de menciones o ventas durante una promoción puede responder a estacionalidad climática (olas de calor en el NEA), feriados o eventos concurrentes.
          </p>
          <p className="text-amber-900/80">
            Para estimar el impacto causal neto del marketing digital sobre las ventas reales de Duomo, la arquitectura futura contempla modelos de <strong>Synthetic Controls</strong> y <strong>Difference-in-Differences (DiD)</strong> utilizando sucursales testigo no expuestas a la campaña como grupo de control contrafáctico.
          </p>
        </div>
      </div>
    </div>
  );
};
