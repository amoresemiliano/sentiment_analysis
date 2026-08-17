import React from "react";
import { GlobalFilters } from "../types";
import { NavPage } from "../components/Sidebar";
import {
  Swords,
  TrendingUp,
  Star,
  Store,
  Layers,
  Award,
  ChevronRight,
  ShieldCheck,
  Zap,
  BarChart3,
  ThumbsUp,
  ThumbsDown,
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

interface CompetitionPageProps {
  filters: GlobalFilters;
  onSelectPage?: (page: NavPage) => void;
  onSelectBrand?: (brand: string) => void;
}

const BENCHMARK_DATA = [
  {
    brand: "Duomo Helados",
    isLeader: true,
    tagline: "Líder regional indiscutido en el NEA",
    storesNEA: "90 sucursales",
    priceKg: "$24.500",
    googleRating: "4.6",
    totalAnalyzed: "1,820",
    netSentiment: "+68.4",
    posRatio: 78,
    neuRatio: 12,
    negRatio: 10,
    strengths: "Cremosidad superior, recetas tradicionales, remodelación de salones con aire acondicionado.",
    frictions: "Filas y tiempos de espera los fines de semana de 20 a 22 hs.",
  },
  {
    brand: "Grido",
    isLeader: false,
    tagline: "Competidor masivo por precio y cercanía",
    storesNEA: "115 sucursales",
    priceKg: "$14.000",
    googleRating: "4.1",
    totalAnalyzed: "640",
    netSentiment: "+36.2",
    posRatio: 52,
    neuRatio: 32,
    negRatio: 16,
    strengths: "Precio accesible, alta capilaridad en barrios periféricos, promociones constantes.",
    frictions: "Textura con cristales de hielo, menor intensidad de sabor, quejas en postres congelados.",
  },
  {
    brand: "Cremolatti",
    isLeader: false,
    tagline: "Competidor artesanal premium",
    storesNEA: "18 sucursales",
    priceKg: "$28.000",
    googleRating: "4.4",
    totalAnalyzed: "424",
    netSentiment: "+52.1",
    posRatio: 66,
    neuRatio: 20,
    negRatio: 14,
    strengths: "Presentación elegante, sabores gourmet sofisticados, packaging premium.",
    frictions: "Precio elevado por kilo, baja cobertura territorial fuera de Posadas y Corrientes.",
  },
];

const RADAR_METRICS = [
  { aspect: "Cremosidad & Sabor", Duomo: 94, Grido: 58, Cremolatti: 88 },
  { aspect: "Relación Precio/Calidad", Duomo: 88, Grido: 82, Cremolatti: 64 },
  { aspect: "Experiencia en Local", Duomo: 84, Grido: 62, Cremolatti: 86 },
  { aspect: "Velocidad de Atención", Duomo: 70, Grido: 74, Cremolatti: 78 },
  { aspect: "Capilaridad NEA (90 suc)", Duomo: 96, Grido: 92, Cremolatti: 40 },
  { aspect: "Variedad de Carta", Duomo: 86, Grido: 76, Cremolatti: 84 },
];

export const CompetitionPage: React.FC<CompetitionPageProps> = ({
  filters,
  onSelectPage,
  onSelectBrand,
}) => {
  const handleBrandSelect = (brandName: string) => {
    if (onSelectBrand) {
      onSelectBrand(brandName.startsWith("Duomo") ? "Duomo" : brandName);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-['Plus_Jakarta_Sans']">
      {/* Header */}
      <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-[#112A23] font-['Outfit']">
              Competitive Intelligence (NEA Benchmark)
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Duomo vs Grido vs Cremolatti
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Comparación continua de posicionamiento de marca, sentimiento neto y percepciones competitivas en el NEA.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-500">Muestra Comparativa:</span>
          <span className="font-bold text-stone-900 bg-stone-100 px-2.5 py-1 rounded-lg">
            2,884 opiniones analizadas
          </span>
        </div>
      </div>

      {/* Brand Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {BENCHMARK_DATA.map((item) => (
          <div
            key={item.brand}
            onClick={() => handleBrandSelect(item.brand)}
            className={`bg-white border rounded-2xl p-6 shadow-xs space-y-4 cursor-pointer transition-all ${
              item.isLeader
                ? "border-[#1B4D3E] ring-1 ring-[#1B4D3E]/30 bg-gradient-to-b from-emerald-50/20 to-white"
                : "border-stone-200 hover:border-stone-400"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-stone-900 font-['Outfit']">{item.brand}</span>
                {item.isLeader && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1B4D3E] text-white">
                    LÍDER NEA
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs font-extrabold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">
                <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
                <span>★ {item.googleRating}</span>
              </div>
            </div>

            <p className="text-xs text-stone-500 font-medium">{item.tagline}</p>

            <div className="grid grid-cols-3 gap-2 py-2 border-y border-stone-100 text-center">
              <div>
                <span className="text-[10px] text-stone-400 block font-semibold">Red NEA</span>
                <strong className="text-xs font-bold text-stone-900">{item.storesNEA}</strong>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block font-semibold">Precio / kg</span>
                <strong className="text-xs font-bold text-stone-900">{item.priceKg}</strong>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block font-semibold">Net Sentiment</span>
                <strong className="text-xs font-bold text-emerald-700">{item.netSentiment}</strong>
              </div>
            </div>

            {/* Sentiment bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-semibold">
                <span className="text-emerald-700">{item.posRatio}% Pos</span>
                <span className="text-stone-500">{item.neuRatio}% Neu</span>
                <span className="text-rose-700">{item.negRatio}% Neg</span>
              </div>
              <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden flex">
                <div style={{ width: `${item.posRatio}%` }} className="bg-emerald-600 h-full" />
                <div style={{ width: `${item.neuRatio}%` }} className="bg-stone-400 h-full" />
                <div style={{ width: `${item.negRatio}%` }} className="bg-rose-500 h-full" />
              </div>
            </div>

            <div className="space-y-2 pt-1 text-xs">
              <div className="p-2.5 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-0.5">
                <span className="text-[10px] font-bold text-emerald-800 uppercase flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3" /> Fuerte
                </span>
                <p className="text-stone-700 leading-snug">{item.strengths}</p>
              </div>

              <div className="p-2.5 bg-rose-50/50 border border-rose-100 rounded-xl space-y-0.5">
                <span className="text-[10px] font-bold text-rose-800 uppercase flex items-center gap-1">
                  <ThumbsDown className="w-3 h-3" /> Fricción
                </span>
                <p className="text-stone-700 leading-snug">{item.frictions}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Radar Comparative Chart */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-stone-900 text-base font-['Outfit']">
              Evaluación Multidimensional de Marca (Radar de Percepción)
            </h3>
            <p className="text-xs text-stone-500">Escala normalizada 0-100 derivada de análisis de sentimiento por aspecto.</p>
          </div>
          <span className="text-[10px] font-semibold bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
            6 Dimensiones Clave
          </span>
        </div>

        <div className="h-80 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_METRICS}>
              <PolarGrid stroke="#E7E5E4" />
              <PolarAngleAxis dataKey="aspect" tick={{ fill: "#44403C", fontSize: 11, fontWeight: 600 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#A8A29E" />
              <Radar name="Duomo Helados" dataKey="Duomo" stroke="#1B4D3E" fill="#1B4D3E" fillOpacity={0.4} />
              <Radar name="Grido" dataKey="Grido" stroke="#E6A15C" fill="#E6A15C" fillOpacity={0.2} />
              <Radar name="Cremolatti" dataKey="Cremolatti" stroke="#9333EA" fill="#9333EA" fillOpacity={0.2} />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
