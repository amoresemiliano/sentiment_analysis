import React, { useState } from "react";
import { GlobalFilters, SentimentLabel } from "../types";
import { NavPage } from "../components/Sidebar";
import { computeDynamicOverviewMetrics, computeSentimentTopicMatrix, computeEvidenceContextData } from "../data/dynamicAnalyticsEngine";
import { EvidenceContext } from "../components/EvidenceContext";
import {
  MessageSquareText,
  ThumbsUp,
  ThumbsDown,
  Layers,
  BarChart2,
  HelpCircle,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Instagram,
  Facebook,
  Radio,
  ChevronRight,
  Table as TableIcon,
  Sparkles,
} from "lucide-react";

interface VoiceOfCustomerPageProps {
  filters: GlobalFilters;
  onSelectPage?: (page: NavPage) => void;
  onDrillDownCell?: (topic: string, sentiment: SentimentLabel) => void;
}

export const VoiceOfCustomerPage: React.FC<VoiceOfCustomerPageProps> = ({
  filters,
  onSelectPage,
  onDrillDownCell,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"consolidated" | "matrix-detail" | "channels">("consolidated");

  const overview = computeDynamicOverviewMetrics(filters);
  const topicMatrix = computeSentimentTopicMatrix(filters);
  const evidence = computeEvidenceContextData(overview.totalAnalyzedConversations, filters);

  const handleCellClick = (topic: string, sentiment: SentimentLabel) => {
    if (onDrillDownCell) {
      onDrillDownCell(topic, sentiment);
    } else if (onSelectPage) {
      onSelectPage("reviews-explorer");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-['Plus_Jakarta_Sans']">
      {/* Top Header */}
      <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-[#112A23] font-['Outfit']">
              ¿Qué está diciendo la gente?
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Aspect-Based Sentiment Analysis (ABSA)
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Descomposición granular de las opiniones en aspectos específicos: producto, servicio, operaciones y precio.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-semibold self-start md:self-auto">
          <button
            onClick={() => setActiveSubTab("consolidated")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeSubTab === "consolidated" ? "bg-white text-stone-900 shadow-2xs font-bold" : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Vista Consolidada
          </button>
          <button
            onClick={() => setActiveSubTab("matrix-detail")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeSubTab === "matrix-detail" ? "bg-white text-stone-900 shadow-2xs font-bold" : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Matriz Tópico × Sentimiento
          </button>
          <button
            onClick={() => setActiveSubTab("channels")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeSubTab === "channels" ? "bg-white text-stone-900 shadow-2xs font-bold" : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Canales & Fuentes
          </button>
        </div>
      </div>

      {/* Evidence Context Ribbon */}
      <EvidenceContext data={evidence} title="Contexto y Denominador de Voice of Customer" />

      {/* Immediate Primary Analytics (Visible without clicking any tabs) */}
      {activeSubTab === "consolidated" && (
        <div className="space-y-6">
          {/* Sentiment Summary Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs">
              <span className="text-[10px] font-bold text-stone-400 uppercase">Muestras Analizadas</span>
              <div className="text-2xl font-black text-stone-900 font-['Outfit'] mt-0.5">
                {overview.totalAnalyzedConversations}
              </div>
              <span className="text-[11px] text-stone-500">en selección activa</span>
            </div>

            <div
              onClick={() => handleCellClick("Todos", "positive")}
              className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 shadow-xs cursor-pointer hover:border-emerald-400 transition-all"
            >
              <span className="text-[10px] font-bold text-emerald-800 uppercase flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" /> Positivo
              </span>
              <div className="text-2xl font-black text-emerald-800 font-['Outfit'] mt-0.5">
                {overview.positivePct}%
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold underline">Click para ver reviews</span>
            </div>

            <div className="bg-stone-100/70 border border-stone-300/80 rounded-2xl p-4 shadow-xs">
              <span className="text-[10px] font-bold text-stone-600 uppercase">Neutro</span>
              <div className="text-2xl font-black text-stone-700 font-['Outfit'] mt-0.5">
                {overview.neutralPct}%
              </div>
              <span className="text-[11px] text-stone-500">Consultas e informativas</span>
            </div>

            <div
              onClick={() => handleCellClick("Todos", "negative")}
              className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4 shadow-xs cursor-pointer hover:border-rose-400 transition-all"
            >
              <span className="text-[10px] font-bold text-rose-800 uppercase flex items-center gap-1">
                <ThumbsDown className="w-3 h-3" /> Fricción / Negativo
              </span>
              <div className="text-2xl font-black text-rose-800 font-['Outfit'] mt-0.5">
                {overview.negativePct}%
              </div>
              <span className="text-[11px] text-rose-700 font-semibold underline">Click para ver quejas</span>
            </div>
          </div>

          {/* Aspect Sentiment Matrix (Core table) */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-bold text-stone-900 text-base font-['Outfit']">
                  Aspect Sentiment Matrix (Score Neto -100 a +100)
                </h3>
                <p className="text-xs text-stone-500">
                  Calculado como: % Menciones Positivas − % Menciones Negativas por aspecto analizado.
                </p>
              </div>
              <span className="text-[11px] font-bold text-stone-500 bg-stone-100 px-2 py-1 rounded">
                Muestra: {overview.totalAnalyzedConversations} opiniones
              </span>
            </div>

            <div className="space-y-3 pt-1">
              {topicMatrix.map((item) => {
                const isPositive = item.netScore > 0;
                const posPct = item.totalMentions > 0 ? Math.round((item.positiveCount / item.totalMentions) * 100) : 70;
                const neuPct = item.totalMentions > 0 ? Math.round((item.neutralCount / item.totalMentions) * 100) : 15;
                const negPct = item.totalMentions > 0 ? Math.round((item.negativeCount / item.totalMentions) * 100) : 15;

                return (
                  <div
                    key={item.topic}
                    className="p-3.5 rounded-xl border border-stone-200/80 hover:border-stone-400 bg-[#FAF9F5]/60 transition-all space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900">{item.topic}</span>
                        <span className="text-[10px] text-stone-500 font-medium">({item.totalMentions} menciones)</span>
                        <span className="text-[9px] font-semibold bg-stone-200/80 text-stone-600 px-1.5 py-0.5 rounded">
                          {item.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold">
                          <button
                            onClick={() => handleCellClick(item.topic, "positive")}
                            className="text-emerald-700 hover:underline cursor-pointer"
                            title="Ver opiniones positivas de este aspecto"
                          >
                            {posPct}% pos
                          </button>
                          <span className="text-stone-400">·</span>
                          <span className="text-stone-500">{neuPct}% neu</span>
                          <span className="text-stone-400">·</span>
                          <button
                            onClick={() => handleCellClick(item.topic, "negative")}
                            className="text-rose-700 hover:underline cursor-pointer"
                            title="Ver quejas de este aspecto"
                          >
                            {negPct}% neg
                          </button>
                        </div>
                        <span
                          className={`font-black text-xs px-2 py-0.5 rounded ${
                            isPositive
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : "bg-rose-100 text-rose-800 border border-rose-200"
                          }`}
                        >
                          {isPositive ? `+${item.netScore}` : item.netScore}
                        </span>
                      </div>
                    </div>

                    {/* Visual bar */}
                    <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden flex">
                      <div style={{ width: `${posPct}%` }} className="bg-emerald-600 h-full" />
                      <div style={{ width: `${neuPct}%` }} className="bg-stone-400 h-full" />
                      <div style={{ width: `${negPct}%` }} className="bg-rose-500 h-full" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Drivers & Frictions side-by-side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Positive Drivers */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-emerald-800">
                <ThumbsUp className="w-5 h-5" />
                <h3 className="font-bold text-stone-900 text-base font-['Outfit']">
                  Drivers de Satisfacción (Elogios Frecuentes)
                </h3>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-emerald-50/50 border border-emerald-200/70 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <strong className="text-emerald-950 font-bold">Cremosidad e Intensidad de Sabor</strong>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">34% del elogio</span>
                  </div>
                  <p className="text-xs text-stone-700">Sambayón tradicional, Dulce de Leche Duomo con nueces y Pistacho lideran la lealtad.</p>
                  <p className="text-xs text-stone-500 italic font-['Newsreader']">“Insuperable la textura y la generosidad de los ingredientes reales.”</p>
                </div>

                <div className="p-3.5 bg-emerald-50/50 border border-emerald-200/70 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <strong className="text-emerald-950 font-bold">Remodelación y Climatización de Salones</strong>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">22% del elogio</span>
                  </div>
                  <p className="text-xs text-stone-700">Sucursales Bolívar, Formosa Centro y Costanera generan alta percepción de valor.</p>
                  <p className="text-xs text-stone-500 italic font-['Newsreader']">“El local quedó hermoso, moderno y con aire bien frío para el calor.”</p>
                </div>
              </div>
            </div>

            {/* Negative Frictions */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-rose-800">
                <ThumbsDown className="w-5 h-5" />
                <h3 className="font-bold text-stone-900 text-base font-['Outfit']">
                  Fricciones Operativas Críticas (Quejas)
                </h3>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-rose-50/50 border border-rose-200/70 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <strong className="text-rose-950 font-bold">Filas y Tiempos de Espera en Horas Pico</strong>
                    <span className="text-[10px] font-bold text-rose-900 bg-rose-200 px-2 py-0.5 rounded">Severidad Crítica</span>
                  </div>
                  <p className="text-xs text-stone-700">Fines de semana después de las 20:30 hs con colas de hasta 35 minutos en sucursales centrales.</p>
                  <p className="text-xs text-stone-500 italic font-['Newsreader']">“Una sola chica en caja con la fila saliendo a la vereda un domingo.”</p>
                </div>

                <div className="p-3.5 bg-rose-50/50 border border-rose-200/70 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <strong className="text-rose-950 font-bold">Quiebre de Stock en Sabores Clave</strong>
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">Severidad Moderada</span>
                  </div>
                  <p className="text-xs text-stone-700">Pistacho y Chocolate Dubai se agotan antes de las 21:30 hs en Corrientes y Resistencia.</p>
                  <p className="text-xs text-stone-500 italic font-['Newsreader']">“Fuimos especialmente por el Pistacho y ya no tenían stock.”</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 2: Matriz Tópico × Sentimiento (Interactive Clickable Matrix) */}
      {activeSubTab === "matrix-detail" && (
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-5">
          <div>
            <h3 className="font-bold text-stone-900 text-lg font-['Outfit']">
              Matriz Interactiva: Tópico × Sentimiento
            </h3>
            <p className="text-xs text-stone-500">
              Cada celda muestra la cantidad de menciones detectadas. <strong>Hacé click sobre cualquier celda</strong> para navegar al Explorador de Reviews con el filtro exacto aplicado.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-200 bg-[#FAF9F5]">
                  <th className="py-3 px-4 font-bold text-stone-700">Tópico / Aspecto</th>
                  <th className="py-3 px-4 font-bold text-stone-500">Categoría</th>
                  <th className="py-3 px-4 font-bold text-emerald-800 text-center bg-emerald-50/60">Positivo (Click)</th>
                  <th className="py-3 px-4 font-bold text-stone-600 text-center bg-stone-100/60">Neutro (Click)</th>
                  <th className="py-3 px-4 font-bold text-rose-800 text-center bg-rose-50/60">Negativo (Click)</th>
                  <th className="py-3 px-4 font-bold text-stone-800 text-right">Net Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {topicMatrix.map((row) => (
                  <tr key={row.topic} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-stone-900">{row.topic}</td>
                    <td className="py-3 px-4 text-stone-500 text-[11px]">{row.category}</td>

                    {/* Positive Cell */}
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => handleCellClick(row.topic, "positive")}
                        className="w-full py-1.5 px-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-bold transition-all cursor-pointer shadow-2xs"
                        title={`Ver ${row.positiveCount} opiniones positivas de ${row.topic}`}
                      >
                        {row.positiveCount} menciones
                      </button>
                    </td>

                    {/* Neutral Cell */}
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => handleCellClick(row.topic, "neutral")}
                        className="w-full py-1.5 px-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300/80 font-medium transition-all cursor-pointer shadow-2xs"
                        title={`Ver ${row.neutralCount} opiniones neutras de ${row.topic}`}
                      >
                        {row.neutralCount} menciones
                      </button>
                    </td>

                    {/* Negative Cell */}
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => handleCellClick(row.topic, "negative")}
                        className="w-full py-1.5 px-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 font-bold transition-all cursor-pointer shadow-2xs"
                        title={`Ver ${row.negativeCount} quejas de ${row.topic}`}
                      >
                        {row.negativeCount} menciones
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <span
                        className={`font-extrabold px-2 py-0.5 rounded text-xs ${
                          row.netScore > 0 ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {row.netScore > 0 ? `+${row.netScore}` : row.netScore}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SubTab 3: Canales & Fuentes */}
      {activeSubTab === "channels" && (
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-5">
          <div>
            <h3 className="font-bold text-stone-900 text-base font-['Outfit']">
              Distribución y Desempeño por Canal Digital
            </h3>
            <p className="text-xs text-stone-500">
              Comparativa de volumen y favorabilidad según la plataforma digital de origen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Google Reviews", volume: 642, share: 50.0, sentiment: 76, icon: Globe, highlight: "Canal primario de feedback por sucursal física." },
              { name: "Instagram", volume: 348, share: 27.1, sentiment: 84, icon: Instagram, highlight: "Alta interacción en lanzamientos de sabor." },
              { name: "Facebook", volume: 165, share: 12.8, sentiment: 62, icon: Facebook, highlight: "Público familiar; consultas de delivery y precios." },
              { name: "TikTok", volume: 89, share: 6.9, sentiment: 91, icon: Radio, highlight: "Reseñas espontáneas de público joven en NEA." },
            ].map((src) => {
              const Icon = src.icon;
              return (
                <div key={src.name} className="p-4 bg-[#FAF9F5] border border-stone-200 rounded-xl space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#1B4D3E] text-white flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-900 text-xs">{src.name}</h4>
                        <span className="text-[10px] text-stone-500">{src.volume} opiniones</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      {src.sentiment}% Pos
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">{src.highlight}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
