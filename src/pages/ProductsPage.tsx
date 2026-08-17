import React, { useState } from "react";
import { GlobalFilters } from "../types";
import { NavPage } from "../components/Sidebar";
import { computeFlavorInsight, computeDynamicOverviewMetrics, computeEvidenceContextData } from "../data/dynamicAnalyticsEngine";
import { EvidenceContext } from "../components/EvidenceContext";
import {
  IceCream,
  Sparkles,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  Layers,
  MapPin,
  ChevronRight,
  BarChart3,
  Award,
  AlertCircle,
  Table,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

interface ProductsPageProps {
  filters: GlobalFilters;
  onSelectPage?: (page: NavPage) => void;
  onSelectFlavor?: (flavor: string) => void;
  onDrillDownReview?: (flavor: string, topic?: string) => void;
}

const FLAVORS_CATALOG = [
  "Chocolate Dubai",
  "Pistacho",
  "Dulce de Leche Duomo con nueces",
  "Sambayón con cerezas",
  "Chocolate Amargo 70%",
];

export const ProductsPage: React.FC<ProductsPageProps> = ({
  filters,
  onSelectPage,
  onSelectFlavor,
  onDrillDownReview,
}) => {
  const currentFlavor = filters.flavor || "Chocolate Dubai";
  const insight = computeFlavorInsight(currentFlavor, filters);
  const evidence = computeEvidenceContextData(insight.volumeMentions, filters, currentFlavor);

  const handleFlavorChange = (flavor: string) => {
    if (onSelectFlavor) {
      onSelectFlavor(flavor);
    }
  };

  const handleReviewClick = (topicName?: string) => {
    if (onDrillDownReview) {
      onDrillDownReview(currentFlavor, topicName);
    } else if (onSelectPage) {
      onSelectPage("reviews-explorer");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-['Plus_Jakarta_Sans']">
      {/* Header */}
      <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-[#112A23] font-['Outfit']">
              Flavor & Product Intelligence
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
              Evaluación Sensorial y de Carta
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Análisis profundo de la percepción del cliente sobre recetas, lanzamientos, clásicos y fricciones de stock por sabor.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-500">Sabor Activo:</span>
          <span className="font-bold text-[#1B4D3E] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg font-['Outfit']">
            {currentFlavor}
          </span>
        </div>
      </div>

      {/* Flavor Selection Carousel */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
          Seleccionar Sabor para Diagnóstico:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {FLAVORS_CATALOG.map((flavor) => {
            const isSelected = currentFlavor === flavor;
            return (
              <button
                key={flavor}
                onClick={() => handleFlavorChange(flavor)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E] shadow-sm font-semibold"
                    : "bg-[#FAF9F5] text-stone-800 border-stone-200 hover:border-stone-300 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <IceCream className={`w-3.5 h-3.5 ${isSelected ? "text-[#E6A15C]" : "text-stone-400"}`} />
                  {flavor === "Chocolate Dubai" && (
                    <span className="text-[9px] font-bold bg-amber-400 text-stone-900 px-1 py-0.2 rounded">
                      Nuevo
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold font-['Outfit'] leading-tight">{flavor}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Evidence Context Ribbon */}
      <EvidenceContext data={evidence} title={`Peso de la Señal para ${currentFlavor}`} />

      {/* Main Flavor Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Flavor Card & KPI */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-5 lg:col-span-1">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase">
                {insight.category}
              </span>
              <span className="text-[10px] font-bold text-stone-400">PROTOTYPE DATA</span>
            </div>

            <h3 className="text-2xl font-black text-stone-900 font-['Outfit']">{insight.name}</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-['Plus_Jakarta_Sans']">{insight.description}</p>
          </div>

          {/* Flavor KPIs */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-[#FAF9F5] border border-stone-100 rounded-xl">
              <span className="text-[10px] text-stone-500 font-medium block">Menciones Totales</span>
              <span className="text-xl font-extrabold text-stone-900 font-['Outfit']">
                {insight.volumeMentions} opiniones
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold block">+{insight.trend}% vs mes ant.</span>
            </div>

            <div className="p-3 bg-[#FAF9F5] border border-stone-100 rounded-xl">
              <span className="text-[10px] text-stone-500 font-medium block">Net Sentiment</span>
              <span className="text-xl font-extrabold text-emerald-700 font-['Outfit']">
                +{insight.positiveRatio - insight.negativeRatio}
              </span>
              <span className="text-[10px] text-stone-500 block">{insight.positiveRatio}% positivo</span>
            </div>
          </div>

          {/* Key Drivers */}
          <div className="space-y-3 pt-2">
            <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950">
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-700" />
                <span>Principal Elogio Sensorial</span>
              </div>
              <p className="text-xs text-stone-700 leading-snug">{insight.topPositiveAspect}</p>
            </div>

            <div className="p-3 bg-rose-50/60 border border-rose-200 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-950">
                <ThumbsDown className="w-3.5 h-3.5 text-rose-700" />
                <span>Principal Fricción Operativa</span>
              </div>
              <p className="text-xs text-stone-700 leading-snug">{insight.topFriction}</p>
            </div>
          </div>

          <button
            onClick={() => handleReviewClick()}
            className="w-full py-2.5 px-3 rounded-xl bg-[#1B4D3E] hover:bg-[#143D32] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <span>Ver reviews de {insight.name}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Column: Topics x Flavor Matrix & Regional Distribution */}
        <div className="space-y-6 lg:col-span-2">
          {/* Topics x Flavor Matrix */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-stone-900 text-base font-['Outfit']">
                  Matriz de Tópicos Asociados a {insight.name}
                </h4>
                <p className="text-xs text-stone-500">¿De qué hablan los consumidores cuando opinan sobre este sabor?</p>
              </div>
              <span className="text-[10px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                PROTOTYPE ANALYTICS
              </span>
            </div>

            <div className="space-y-2.5 pt-1">
              {insight.topicsMatrix.map((item) => (
                <div
                  key={item.topic}
                  onClick={() => handleReviewClick(item.topic)}
                  className="p-3 bg-[#FAF9F5] border border-stone-200 rounded-xl hover:border-[#1B4D3E] hover:bg-emerald-50/30 transition-all flex items-center justify-between text-xs cursor-pointer group"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-stone-900 group-hover:text-[#1B4D3E]">{item.topic}</span>
                    <div className="text-[11px] text-stone-500">{item.mentions} menciones en el corpus</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`font-black text-xs px-2 py-0.5 rounded ${
                        item.sentimentScore > 0
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : "bg-rose-100 text-rose-800 border border-rose-200"
                      }`}
                    >
                      {item.sentimentScore > 0 ? `+${item.sentimentScore}` : item.sentimentScore} Net
                    </span>
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#1B4D3E]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Distribution Chart (Flavor x Region) */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-stone-900 text-base font-['Outfit']">
                  Distribución Geográfica de Menciones ({insight.name})
                </h4>
                <p className="text-xs text-stone-500">Concentración territorial de interés en las 4 provincias del NEA.</p>
              </div>
              <MapPin className="w-4 h-4 text-stone-400" />
            </div>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={insight.provincesDistribution} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E5E4" />
                  <XAxis dataKey="province" tick={{ fontSize: 11, fill: "#78716C" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#78716C" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1C1917",
                      borderRadius: "12px",
                      border: "none",
                      color: "#FAF9F5",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="mentions" fill="#1B4D3E" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
