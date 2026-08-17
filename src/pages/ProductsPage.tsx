import React, { useState } from "react";
import { NavPage } from "../components/Sidebar";
import { FilterState, ProductInsight } from "../types";
import { PROTOTYPE_PRODUCTS } from "../data/prototypeMetrics";
import { REAL_REVIEWS } from "../data/realReviews";
import { PROTOTYPE_REVIEWS } from "../data/prototypeMetrics";
import {
  IceCream,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface ProductsPageProps {
  filters: FilterState;
  onSelectPage: (page: NavPage) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ filters, onSelectPage }) => {
  const [selectedProductId, setSelectedProductId] = useState<string>("prod-01"); // Default: Chocolate Dubai

  const selectedProduct =
    PROTOTYPE_PRODUCTS.find((p) => p.id === selectedProductId) || PROTOTYPE_PRODUCTS[0];

  // Find reviews that mention this product
  const allReviews = [...REAL_REVIEWS, ...PROTOTYPE_REVIEWS];
  const matchingReviews = allReviews.filter((r) =>
    r.text.toLowerCase().includes(selectedProduct.name.split(" ")[0].toLowerCase()) ||
    r.topics.some((t) => t.toLowerCase().includes(selectedProduct.name.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-['Plus_Jakarta_Sans']">
      {/* Header */}
      <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-[#112A23] font-['Outfit']">
              Product & Flavor Intelligence
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Evaluación Sensorial y Demanda
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Análisis profundo de percepción organoléptica, aceptación y fricción por sabor individual.
          </p>
        </div>

        <button
          onClick={() => onSelectPage("decision-lab")}
          className="px-4 py-2 rounded-xl bg-[#1B4D3E] hover:bg-[#143D32] text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5 self-start md:self-auto"
        >
          <span>Evaluar en Decision Lab</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Flavor Selector Carousel */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {PROTOTYPE_PRODUCTS.map((prod) => {
          const isSelected = prod.id === selectedProductId;
          return (
            <button
              key={prod.id}
              onClick={() => setSelectedProductId(prod.id)}
              className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-[#1B4D3E] text-white border-[#143B30] shadow-sm"
                  : "bg-white border-stone-200 text-stone-800 hover:border-stone-300 hover:bg-stone-50"
              }`}
            >
              <div className="space-y-1">
                <span
                  className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    isSelected
                      ? "bg-emerald-800 text-emerald-100"
                      : "bg-stone-100 text-stone-600"
                  }`}
                >
                  {prod.category}
                </span>
                <h4 className="font-bold text-xs leading-snug line-clamp-2 pt-0.5">
                  {prod.name}
                </h4>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] pt-2 border-t border-white/10">
                <span className={isSelected ? "text-emerald-200" : "text-stone-500"}>
                  {prod.volumeMentions} menciones
                </span>
                <span
                  className={`font-black ${
                    isSelected ? "text-[#E6A15C]" : "text-emerald-700 font-bold"
                  }`}
                >
                  {prod.sentimentScore}/100
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Selected Product Dashboard */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-6">
        {/* Product Top Summary */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                {selectedProduct.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-['Outfit']">
                {selectedProduct.name}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {selectedProduct.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center min-w-[100px]">
              <div className="text-[10px] text-emerald-800 font-semibold uppercase">Sentimiento</div>
              <div className="text-xl font-extrabold text-emerald-900 font-['Outfit']">
                {selectedProduct.sentimentScore}%
              </div>
              <div className="text-[9px] text-emerald-700">Favorabilidad</div>
            </div>

            <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-center min-w-[100px]">
              <div className="text-[10px] text-stone-500 font-semibold uppercase">Volumen</div>
              <div className="text-xl font-extrabold text-stone-900 font-['Outfit']">
                {selectedProduct.volumeMentions}
              </div>
              <div className="text-[9px] text-emerald-700 font-semibold flex items-center justify-center">
                <TrendingUp className="w-2.5 h-2.5 mr-0.5" /> +{selectedProduct.trend}%
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column: Drivers and Regional breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Positive vs Friction */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className="font-bold text-stone-900 text-sm font-['Outfit']">
              Evaluación de Percepción del Sabor
            </h4>

            <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950">
                <ThumbsUp className="w-4 h-4 text-emerald-700" />
                <span>Principal Fortaleza Percibida (Positive Driver):</span>
              </div>
              <p className="text-xs text-stone-700 pl-5 leading-relaxed">
                {selectedProduct.topPositiveAspect}
              </p>
            </div>

            <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>Principal Punto de Tensión o Fricción:</span>
              </div>
              <p className="text-xs text-stone-700 pl-5 leading-relaxed">
                {selectedProduct.topFriction}
              </p>
            </div>

            {/* Sentiment bar breakdown */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-semibold text-stone-700">
                <span>Distribución de Opiniones:</span>
                <span className="text-stone-500">
                  {selectedProduct.positiveRatio}% Pos / {selectedProduct.neutralRatio}% Neu / {selectedProduct.negativeRatio}% Neg
                </span>
              </div>
              <div className="h-3 w-full bg-stone-100 rounded-full overflow-hidden flex border border-stone-200">
                <div style={{ width: `${selectedProduct.positiveRatio}%` }} className="bg-emerald-600 h-full" />
                <div style={{ width: `${selectedProduct.neutralRatio}%` }} className="bg-stone-400 h-full" />
                <div style={{ width: `${selectedProduct.negativeRatio}%` }} className="bg-rose-500 h-full" />
              </div>
            </div>
          </div>

          {/* Regional Distribution Chart */}
          <div className="lg:col-span-5 bg-[#FAF9F5] border border-stone-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-stone-900 text-xs font-['Outfit'] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#1B4D3E]" /> Distribución Geográfica de Menciones
              </h4>
              <span className="text-[10px] text-stone-400 font-medium">NEA</span>
            </div>

            <div className="h-44 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={selectedProduct.provincesDistribution}
                  margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="province" stroke="#64748b" fontSize={10} />
                  <YAxis stroke="#64748b" fontSize={10} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#FAF9F5", borderColor: "#e2e8f0", borderRadius: "10px", fontSize: "11px" }}
                  />
                  <Bar dataKey="mentions" fill="#1B4D3E" radius={[4, 4, 0, 0]} name="Menciones" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Verbatim Reviews linked to this product */}
        <div className="space-y-3 pt-4 border-t border-stone-200">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-stone-900 text-sm font-['Outfit']">
              Evidencia Textual Directa ({matchingReviews.length} opiniones vinculadas)
            </h4>
            <span className="text-xs text-stone-500">Muestra observada</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {matchingReviews.slice(0, 4).map((rev) => (
              <div
                key={rev.id}
                className="p-3.5 bg-[#FAF9F5] border border-stone-200 rounded-xl space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                        rev.dataType === "real"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : "bg-blue-100 text-blue-800 border border-blue-200"
                      }`}
                    >
                      {rev.dataType === "real" ? "REAL DATA" : "PROTOTYPE"}
                    </span>
                    <span className="text-[10px] text-stone-500">{rev.source} · {rev.branch || rev.city}</span>
                  </div>
                  <span className="font-bold text-emerald-700">★ {rev.rating || 5}/5</span>
                </div>

                <p className="text-stone-700 italic font-['Newsreader'] leading-relaxed">
                  “{rev.text}”
                </p>

                {rev.sourceUrl && (
                  <a
                    href={rev.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-[#1B4D3E] font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Ver fuente original</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
