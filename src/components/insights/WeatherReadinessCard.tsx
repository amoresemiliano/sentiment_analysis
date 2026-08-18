import React from "react";
import { CloudSun, Thermometer, ShieldAlert, Sparkles, ArrowRight } from "lucide-react";

export const WeatherReadinessCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-stone-50 via-[#FAF9F5] to-amber-50/40 border border-stone-200/90 rounded-2xl p-5 sm:p-6 space-y-3 font-['Plus_Jakarta_Sans']">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center">
            <CloudSun className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-200 inline-block">
              Módulo de Enriquecimiento Contextual
            </span>
            <h4 className="text-sm font-bold text-stone-900 font-['Outfit'] mt-0.5">
              Cruce Exógeno: Clima, Olas de Calor y Demanda
            </h4>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-stone-500 italic">
          Capacidad de Integración API Meteorológica
        </span>
      </div>

      <p className="text-xs text-stone-700 leading-relaxed">
        Los datos meteorológicos del NEA (temperatura máxima diaria, sensación térmica &gt;35°C y alertas climáticas) pueden integrarse a nivel de sucursal para contextualizar picos de demanda, tiempos de espera percibidos en vereda y rotación de stock de sabores pesados vs frutales.
      </p>

      {/* Epistemological & Methodological Note */}
      <div className="bg-white/80 border border-amber-200/70 rounded-xl p-3 flex items-start gap-2.5 text-xs text-stone-600">
        <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="text-stone-900 font-bold block text-[11px]">
            Principio Metodológico: Asociación vs Causalidad
          </strong>
          <span className="text-[11px] leading-normal text-stone-600">
            La asociación estadística entre factores meteorológicos y volumen de fricción es de naturaleza exploratoria. No debe interpretarse como causalidad unívoca sin contrastar con variables de dotación de personal, afluencia vehicular y eventos locales.
          </span>
        </div>
      </div>
    </div>
  );
};
