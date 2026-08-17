import React, { useState } from "react";
import { FilterState, RegionalMetric } from "../types";
import { PROTOTYPE_REGIONAL } from "../data/prototypeMetrics";
import {
  MapPin,
  Building,
  ThumbsUp,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Layers,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface GeographyPageProps {
  filters: FilterState;
}

export const GeographyPage: React.FC<GeographyPageProps> = ({ filters }) => {
  const [selectedProvinceName, setSelectedProvinceName] = useState<
    "Misiones" | "Corrientes" | "Chaco" | "Formosa"
  >("Misiones");

  const selectedRegion =
    PROTOTYPE_REGIONAL.find((r) => r.province === selectedProvinceName) || PROTOTYPE_REGIONAL[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-['Plus_Jakarta_Sans']">
      {/* Header */}
      <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-[#112A23] font-['Outfit']">
              Regional Consumer Intelligence (NEA)
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Red de ~90 Sucursales
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Monitoreo territorial de satisfacción, quejas y diferencias operativas entre plazas del Litoral argentino.
          </p>
        </div>
      </div>

      {/* 4 Province Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PROTOTYPE_REGIONAL.map((reg) => {
          const isSelected = reg.province === selectedProvinceName;
          return (
            <button
              key={reg.province}
              onClick={() => setSelectedProvinceName(reg.province)}
              className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-[#1B4D3E] text-white border-[#143B30] shadow-md"
                  : "bg-white border-stone-200 text-stone-800 hover:border-stone-300 hover:bg-stone-50"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-['Outfit']">{reg.province}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isSelected
                        ? "bg-emerald-800 text-emerald-100"
                        : "bg-emerald-50 text-emerald-800"
                    }`}
                  >
                    Score {reg.sentimentIndex}
                  </span>
                </div>
                <div className={`text-[11px] ${isSelected ? "text-emerald-200" : "text-stone-500"}`}>
                  {reg.branchesCount} sucursales · {reg.totalReviews} opiniones
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className={isSelected ? "text-emerald-200" : "text-stone-500"}>Favorabilidad:</span>
                  <span className="font-bold">{reg.positivePct}% Positivo</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Province Deep Dive */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#1B4D3E]" />
              <h3 className="text-xl font-extrabold text-stone-900 font-['Outfit']">
                Diagnóstico Territorial: {selectedRegion.province}
              </h3>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Análisis consolidado sobre {selectedRegion.totalReviews} reseñas en {selectedRegion.branchesCount} sucursales de la provincia.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200">
              {selectedRegion.positivePct}% Positivas
            </span>
            <span className="px-3 py-1 bg-stone-50 text-stone-700 rounded-lg border border-stone-200">
              {selectedRegion.neutralPct}% Neutras
            </span>
            <span className="px-3 py-1 bg-rose-50 text-rose-800 rounded-lg border border-rose-200">
              {selectedRegion.negativePct}% Negativas
            </span>
          </div>
        </div>

        {/* Strength & Friction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-xl space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-emerald-950">
              <ThumbsUp className="w-4 h-4 text-emerald-700" />
              <span>Fortaleza Territorial Diferencial:</span>
            </div>
            <p className="text-stone-700 pl-5 leading-relaxed">{selectedRegion.mainStrength}</p>
          </div>

          <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-xl space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-amber-950">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>Principal Fricción Operativa en la Provincia:</span>
            </div>
            <p className="text-stone-700 pl-5 leading-relaxed">{selectedRegion.mainFriction}</p>
          </div>
        </div>

        {/* Branch Ranking Table */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-stone-900 text-sm font-['Outfit']">
              Ranking y Estado por Sucursal en {selectedRegion.province}
            </h4>
            <span className="text-xs text-stone-400">Muestra de puntos de venta</span>
          </div>

          <div className="overflow-x-auto border border-stone-200 rounded-xl">
            <table className="w-full text-left text-xs font-['Plus_Jakarta_Sans']">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-4 py-3">Sucursal / Punto de Venta</th>
                  <th className="px-4 py-3">Ciudad</th>
                  <th className="px-4 py-3 text-center">Opiniones</th>
                  <th className="px-4 py-3 text-center">Score Sentimiento</th>
                  <th className="px-4 py-3 text-center">Evolución</th>
                  <th className="px-4 py-3">Fricción / Issue Principal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {selectedRegion.branches.map((b) => (
                  <tr key={b.name} className="hover:bg-stone-50/80 transition-colors">
                    <td className="px-4 py-3 font-bold text-stone-900 flex items-center gap-2">
                      <Building className="w-3.5 h-3.5 text-[#1B4D3E]" />
                      <span>{b.name}</span>
                    </td>
                    <td className="px-4 py-3 text-stone-600">{b.city}</td>
                    <td className="px-4 py-3 text-center font-semibold text-stone-700">{b.reviewsCount}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded font-black text-[11px] ${
                          b.sentimentScore >= 75
                            ? "bg-emerald-100 text-emerald-800"
                            : b.sentimentScore >= 60
                            ? "bg-amber-100 text-amber-900"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {b.sentimentScore}/100
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`font-semibold flex items-center justify-center text-[11px] ${
                          b.trend >= 0 ? "text-emerald-700" : "text-rose-700"
                        }`}
                      >
                        {b.trend >= 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                        {b.trend >= 0 ? `+${b.trend}%` : `${b.trend}%`}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-stone-600">
                      <span className="bg-stone-100 px-2 py-0.5 rounded text-[11px] text-stone-700 border border-stone-200">
                        {b.topIssue}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
