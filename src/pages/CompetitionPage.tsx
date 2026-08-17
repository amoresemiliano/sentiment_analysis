import React from "react";
import { FilterState } from "../types";
import {
  PERCEPTUAL_MATRIX_DATA,
  BRAND_ASSOCIATIONS,
  COMPETITIVE_HYPOTHESES,
} from "../data/prototypeMetrics";
import {
  Swords,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Scale,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface CompetitionPageProps {
  filters: FilterState;
}

const SHARE_OF_VOICE_DATA = [
  { brand: "Duomo", volume: 1284, share: 44.5, positive: 74, neutral: 17, negative: 9, color: "#1B4D3E" },
  { brand: "Grido", volume: 1140, share: 39.5, positive: 58, neutral: 22, negative: 20, color: "#2563EB" },
  { brand: "Cremolatti", volume: 460, share: 16.0, positive: 68, neutral: 16, negative: 16, color: "#881337" },
];

export const CompetitionPage: React.FC<CompetitionPageProps> = ({ filters }) => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16 font-['Plus_Jakarta_Sans']">
      {/* Header */}
      <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-[#112A23] font-['Outfit']">
              Competitive Consumer Intelligence
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
              Benchmark Estratégico
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            ¿Qué está diciendo el consumidor sobre Duomo frente a Grido y Cremolatti en el territorio?
          </p>
        </div>
      </div>

      {/* 3 Brand Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* DUOMO */}
        <div className="bg-[#FAF9F5] border-2 border-[#1B4D3E] rounded-2xl p-5 shadow-xs space-y-4 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#1B4D3E] text-white flex items-center justify-center font-black font-['Outfit']">
                D
              </div>
              <div>
                <h3 className="font-extrabold text-stone-900 text-lg font-['Outfit']">DUOMO</h3>
                <span className="text-[10px] text-emerald-800 font-semibold">Líder Regional NEA</span>
              </div>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              74% Positivo
            </span>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            Percepción de calidad artesanal noble, cremosidad y cercanía comunitaria a precio accesible.
          </p>

          <div className="space-y-1.5 pt-2 border-t border-stone-200 text-xs">
            <div className="flex justify-between font-medium text-stone-700">
              <span>Menciones analizadas:</span>
              <span className="font-bold text-stone-900">1,284 (44.5%)</span>
            </div>
            <div className="flex justify-between font-medium text-stone-700">
              <span>Fortaleza clave:</span>
              <span className="font-bold text-emerald-700">Sabor & Dulce de Leche</span>
            </div>
            <div className="flex justify-between font-medium text-stone-700">
              <span>Principal fricción:</span>
              <span className="font-bold text-amber-700">Stock & Demoras pico</span>
            </div>
          </div>

          <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden flex">
            <div style={{ width: "74%" }} className="bg-emerald-600 h-full" />
            <div style={{ width: "17%" }} className="bg-stone-400 h-full" />
            <div style={{ width: "9%" }} className="bg-rose-500 h-full" />
          </div>
        </div>

        {/* GRIDO */}
        <div className="bg-[#FAF9F5] border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4 hover:border-blue-300 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-black font-['Outfit']">
                G
              </div>
              <div>
                <h3 className="font-extrabold text-blue-900 text-lg font-['Outfit']">GRIDO</h3>
                <span className="text-[10px] text-blue-700 font-semibold">Líder en Cobertura / Precio</span>
              </div>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              58% Positivo
            </span>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            Asociado masivamente al ahorro familiar, promociones de Club Grido y productos de impulso.
          </p>

          <div className="space-y-1.5 pt-2 border-t border-stone-200 text-xs">
            <div className="flex justify-between font-medium text-stone-700">
              <span>Menciones analizadas:</span>
              <span className="font-bold text-stone-900">1,140 (39.5%)</span>
            </div>
            <div className="flex justify-between font-medium text-stone-700">
              <span>Fortaleza clave:</span>
              <span className="font-bold text-blue-700">Precio & Promociones</span>
            </div>
            <div className="flex justify-between font-medium text-stone-700">
              <span>Principal fricción:</span>
              <span className="font-bold text-rose-700">Calidad & Sabor artificial</span>
            </div>
          </div>

          <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden flex">
            <div style={{ width: "58%" }} className="bg-blue-600 h-full" />
            <div style={{ width: "22%" }} className="bg-stone-400 h-full" />
            <div style={{ width: "20%" }} className="bg-rose-500 h-full" />
          </div>
        </div>

        {/* CREMOLATTI */}
        <div className="bg-[#FAF9F5] border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4 hover:border-rose-300 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#881337] text-white flex items-center justify-center font-black font-['Outfit']">
                C
              </div>
              <div>
                <h3 className="font-extrabold text-rose-950 text-lg font-['Outfit']">CREMOLATTI</h3>
                <span className="text-[10px] text-rose-800 font-semibold">Gourmet Tradicional</span>
              </div>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
              68% Positivo
            </span>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            Alta valoración en estética de salón y sabores premium, con fuerte barrera de precio en el NEA.
          </p>

          <div className="space-y-1.5 pt-2 border-t border-stone-200 text-xs">
            <div className="flex justify-between font-medium text-stone-700">
              <span>Menciones analizadas:</span>
              <span className="font-bold text-stone-900">460 (16.0%)</span>
            </div>
            <div className="flex justify-between font-medium text-stone-700">
              <span>Fortaleza clave:</span>
              <span className="font-bold text-rose-800">Ambientación & Variedad</span>
            </div>
            <div className="flex justify-between font-medium text-stone-700">
              <span>Principal fricción:</span>
              <span className="font-bold text-rose-700">Precio elevado por kilo</span>
            </div>
          </div>

          <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden flex">
            <div style={{ width: "68%" }} className="bg-[#881337] h-full" />
            <div style={{ width: "16%" }} className="bg-stone-400 h-full" />
            <div style={{ width: "16%" }} className="bg-rose-500 h-full" />
          </div>
        </div>
      </div>

      {/* Share of Voice Disclaimer & Chart */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-stone-900 text-base font-['Outfit']">
              Cuota de Conversación Relativa en la Muestra Analizada
            </h3>
            <p className="text-xs text-stone-500 italic">
              * Nota metodológica: Muestra representativa de menciones públicas digitales en el NEA. No insinúa cuota de mercado en volumen comercial físico.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {SHARE_OF_VOICE_DATA.map((b) => (
            <div key={b.brand} className="p-4 bg-[#FAF9F5] border border-stone-200 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-stone-800">
                <span>{b.brand}</span>
                <span>{b.share}% del volumen</span>
              </div>
              <div className="text-2xl font-extrabold text-stone-900 font-['Outfit']">{b.volume}</div>
              <div className="text-[11px] text-stone-500 font-medium">opiniones monitoreadas</div>
            </div>
          ))}
        </div>
      </div>

      {/* Perceptual Matrix (-100 to +100 across 8 dimensions) */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div>
          <h3 className="font-bold text-stone-900 text-base font-['Outfit']">
            Matriz Perceptual Competitiva (Net Sentiment Score por Atributo)
          </h3>
          <p className="text-xs text-stone-500">
            Escala normalizada de -100 (rechazo total) a +100 (máxima favorabilidad).
          </p>
        </div>

        <div className="overflow-x-auto border border-stone-200 rounded-xl">
          <table className="w-full text-left text-xs font-['Plus_Jakarta_Sans']">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Dimensión de Percepción</th>
                <th className="px-4 py-3 text-center text-[#1B4D3E] font-bold">Duomo Helados</th>
                <th className="px-4 py-3 text-center text-blue-800 font-bold">Grido</th>
                <th className="px-4 py-3 text-center text-rose-900 font-bold">Cremolatti</th>
                <th className="px-4 py-3">Diagnóstico Competitivo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {PERCEPTUAL_MATRIX_DATA.map((row) => (
                <tr key={row.aspect} className="hover:bg-stone-50/70 transition-colors">
                  <td className="px-4 py-3 font-bold text-stone-900">{row.aspect}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-black text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded text-[11px]">
                      {row.duomo > 0 ? `+${row.duomo}` : row.duomo}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`font-black px-2 py-0.5 rounded text-[11px] ${
                        row.grido > 0 ? "text-blue-800 bg-blue-100/80" : "text-rose-800 bg-rose-100"
                      }`}
                    >
                      {row.grido > 0 ? `+${row.grido}` : row.grido}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`font-black px-2 py-0.5 rounded text-[11px] ${
                        row.cremolatti > 0 ? "text-rose-950 bg-rose-100/80" : "text-rose-800 bg-rose-100"
                      }`}
                    >
                      {row.cremolatti > 0 ? `+${row.cremolatti}` : row.cremolatti}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-stone-600 text-[11px]">
                    {row.aspect === "Producto / Sabor" && "Duomo empata en calidad gourmet con Cremolatti superando a Grido por +58 pts."}
                    {row.aspect === "Precio y Accesibilidad" && "Grido lidera en precio bajo; Duomo mantiene balance positivo (+54) y Cremolatti genera tensión (-38)."}
                    {row.aspect === "Disponibilidad / Stock" && "Principal vulnerabilidad de Duomo frente a la cobertura industrial de Grido."}
                    {row.aspect === "Experiencia en Local" && "Remodelaciones de Duomo reducen la brecha histórica frente al salón de Cremolatti."}
                    {row.aspect !== "Producto / Sabor" && row.aspect !== "Precio y Accesibilidad" && row.aspect !== "Disponibilidad / Stock" && row.aspect !== "Experiencia en Local" && "Comportamiento alineado a las identidades de marca observadas."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Brand Associations (Semantic Lists) */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div>
          <h3 className="font-bold text-stone-900 text-base font-['Outfit']">
            Asociaciones Semánticas & Clusters Conceptuales
          </h3>
          <p className="text-xs text-stone-500">
            Términos más fuertemente correlacionados con cada marca en los embeddings semánticos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Duomo */}
          <div className="p-4 bg-[#FAF9F5] border border-stone-200 rounded-xl space-y-2.5">
            <h4 className="font-bold text-stone-900 text-xs font-['Outfit'] uppercase tracking-wider text-[#1B4D3E]">
              Duomo Helados
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {BRAND_ASSOCIATIONS.Duomo.map((item) => (
                <span
                  key={item.text}
                  className={`text-[11px] font-medium px-2 py-1 rounded-lg border ${
                    item.isNegative
                      ? "bg-rose-50 text-rose-800 border-rose-200"
                      : "bg-emerald-50 text-emerald-900 border-emerald-200"
                  }`}
                >
                  {item.text}
                </span>
              ))}
            </div>
          </div>

          {/* Grido */}
          <div className="p-4 bg-[#FAF9F5] border border-stone-200 rounded-xl space-y-2.5">
            <h4 className="font-bold text-stone-900 text-xs font-['Outfit'] uppercase tracking-wider text-blue-800">
              Grido
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {BRAND_ASSOCIATIONS.Grido.map((item) => (
                <span
                  key={item.text}
                  className={`text-[11px] font-medium px-2 py-1 rounded-lg border ${
                    item.isNegative
                      ? "bg-rose-50 text-rose-800 border-rose-200"
                      : "bg-blue-50 text-blue-900 border-blue-200"
                  }`}
                >
                  {item.text}
                </span>
              ))}
            </div>
          </div>

          {/* Cremolatti */}
          <div className="p-4 bg-[#FAF9F5] border border-stone-200 rounded-xl space-y-2.5">
            <h4 className="font-bold text-stone-900 text-xs font-['Outfit'] uppercase tracking-wider text-rose-900">
              Cremolatti
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {BRAND_ASSOCIATIONS.Cremolatti.map((item) => (
                <span
                  key={item.text}
                  className={`text-[11px] font-medium px-2 py-1 rounded-lg border ${
                    item.isNegative
                      ? "bg-rose-50 text-rose-800 border-rose-200"
                      : "bg-rose-50 text-rose-900 border-rose-200"
                  }`}
                >
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hypothesis vs Evidence Testing Module */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-stone-900 text-base font-['Outfit'] flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#1B4D3E]" /> Contrastación Empírica: Hipótesis de Negocio vs Evidencia
            </h3>
            <p className="text-xs text-stone-500">
              Metodología científica aplicada: validación de supuestos de posicionamiento mediante evidencia de datos no estructurados.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {COMPETITIVE_HYPOTHESES.map((hypo) => (
            <div
              key={hypo.id}
              className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="font-bold text-stone-900 text-sm font-['Outfit']">{hypo.title}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Estado: {hypo.status}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs text-stone-700 font-medium">
                <span className="text-stone-500 font-semibold">Hipótesis Planteada: </span>
                “{hypo.hypothesisText}”
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
                <div className="p-3 bg-[#FAF9F5] border border-stone-200 rounded-xl">
                  <div className="text-[10px] text-stone-500 font-medium uppercase">Menciones de Precio</div>
                  <div className="text-lg font-bold text-stone-900 mt-0.5">{hypo.priceMentionsPct}%</div>
                </div>
                <div className="p-3 bg-[#FAF9F5] border border-stone-200 rounded-xl">
                  <div className="text-[10px] text-stone-500 font-medium uppercase">Menciones de Calidad</div>
                  <div className="text-lg font-bold text-stone-900 mt-0.5">{hypo.qualityMentionsPct}%</div>
                </div>
                <div className="p-3 bg-[#FAF9F5] border border-stone-200 rounded-xl">
                  <div className="text-[10px] text-stone-500 font-medium uppercase">Delta de Sentimiento</div>
                  <div className="text-xs font-bold text-emerald-700 mt-1.5">{hypo.sentimentDelta}</div>
                </div>
              </div>

              <div className="text-xs text-stone-600 leading-relaxed pt-1">
                <strong>Evidencia y Conclusión: </strong>
                {hypo.statusDescription}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
