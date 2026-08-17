import React from "react";
import { GlobalFilters, SentimentLabel } from "../types";
import { NavPage } from "../components/Sidebar";
import { computeDynamicOverviewMetrics, computeSentimentTopicMatrix } from "../data/dynamicAnalyticsEngine";
import {
  MessageSquare,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  AlertTriangle,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Star,
  Globe,
  Radio,
  Building2,
  Info,
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
  BarChart,
  Bar,
  Cell,
} from "recharts";

interface OverviewPageProps {
  filters: GlobalFilters;
  onSelectPage: (page: NavPage) => void;
  onDrillDownSentiment?: (sentiment: SentimentLabel) => void;
  onDrillDownTopic?: (topic: string) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  filters,
  onSelectPage,
  onDrillDownSentiment,
  onDrillDownTopic,
}) => {
  const metrics = computeDynamicOverviewMetrics(filters);
  const topicMatrix = computeSentimentTopicMatrix(filters);
  const topTopics = topicMatrix.slice(0, 5);

  const handleSentimentClick = (sentiment: SentimentLabel) => {
    if (onDrillDownSentiment) {
      onDrillDownSentiment(sentiment);
    } else {
      onSelectPage("reviews-explorer");
    }
  };

  const handleTopicClick = (topic: string) => {
    if (onDrillDownTopic) {
      onDrillDownTopic(topic);
    } else {
      onSelectPage("reviews-explorer");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-['Plus_Jakarta_Sans']">
      {/* Low Sample Warning Banner if applicable */}
      {metrics.isLowSample && (
        <div className="p-4 bg-amber-50 border border-amber-300/80 rounded-2xl flex items-start gap-3 text-xs text-amber-900 shadow-2xs">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <strong className="font-bold text-amber-950 block">
              Muestra Reducida ({metrics.totalAnalyzedConversations} opiniones analizadas)
            </strong>
            <p className="text-amber-800 leading-relaxed">
              El filtro seleccionado posee un tamaño de muestra acotado. Los porcentajes deben interpretarse como tendencias preliminares dentro del contexto público total de {metrics.publicReviewsContextTotal.toLocaleString()} reseñas en Google.
            </p>
          </div>
        </div>
      )}

      {/* Dynamic Executive Insight Card */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs relative overflow-hidden space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#1B4D3E] text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#E6A15C]" />
            </div>
            <h2 className="font-extrabold text-stone-900 text-sm sm:text-base font-['Outfit']">
              Executive AI Synthesis
            </h2>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
            AI-generated prototype insight
          </span>
        </div>

        <p className="text-xs sm:text-sm text-stone-800 font-medium leading-relaxed font-['Plus_Jakarta_Sans']">
          {metrics.executiveInsight}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] text-stone-500">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Driver Principal: <strong>{metrics.topTopic}</strong></span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>Fricción Crítica: <strong>{metrics.topFriction}</strong></span>
          </div>
        </div>
      </div>

      {/* Primary KPI Ribbon (Fully Dynamic) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* 1. Analyzed Corpus */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Corpus Analizado</span>
            <MessageSquare className="w-4 h-4 text-stone-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-['Outfit']">
            {metrics.totalAnalyzedConversations}
          </div>
          <div className="text-[11px] text-stone-500 leading-tight">
            Denominador activo · <span className="font-semibold text-stone-700">{metrics.publicReviewsContextTotal.toLocaleString()}</span> en Google
          </div>
        </div>

        {/* 2. Positive Ratio */}
        <button
          onClick={() => handleSentimentClick("positive")}
          className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-2 text-left hover:border-emerald-400 transition-all group cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span className="font-semibold uppercase tracking-wider text-[10px] text-emerald-800">Positivo</span>
            <ThumbsUp className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-['Outfit'] flex items-baseline gap-1">
            <span>{metrics.positivePct}%</span>
            <span className="text-xs font-normal text-stone-400">favorabilidad</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-medium group-hover:underline flex items-center gap-0.5">
            <span>Ver opiniones positivas</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </button>

        {/* 3. Negative / Friction */}
        <button
          onClick={() => handleSentimentClick("negative")}
          className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-2 text-left hover:border-rose-400 transition-all group cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span className="font-semibold uppercase tracking-wider text-[10px] text-rose-800">Fricción / Negativo</span>
            <ThumbsDown className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-700 font-['Outfit'] flex items-baseline gap-1">
            <span>{metrics.negativePct}%</span>
            <span className="text-xs font-normal text-stone-400">del corpus</span>
          </div>
          <div className="text-[11px] text-rose-700 font-medium group-hover:underline flex items-center gap-0.5">
            <span>Ver alertas de queja</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </button>

        {/* 4. Net Sentiment Score */}
        <div className="bg-[#FAF9F5] border border-stone-200 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Net Sentiment</span>
            <TrendingUp className="w-4 h-4 text-[#1B4D3E]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#112A23] font-['Outfit']">
            {metrics.netSentimentScore > 0 ? `+${metrics.netSentimentScore}` : metrics.netSentimentScore}
          </div>
          <div className="text-[11px] text-stone-600 leading-tight">
            Escala -100 a +100 · ({metrics.positivePct}% − {metrics.negativePct}%)
          </div>
        </div>
      </div>

      {/* Main Analytical Section: "Lo que explica estas métricas" (Top 5 Topics) */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-stone-900 font-['Outfit']">
              Lo que explica estas métricas (Top 5 Drivers Semánticos)
            </h3>
            <p className="text-xs text-stone-500">
              Desglose de los principales tópicos que construyen el sentimiento de la muestra seleccionada.
            </p>
          </div>
          <button
            onClick={() => onSelectPage("topics")}
            className="text-xs font-semibold text-[#1B4D3E] hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Ver catálogo completo de tópicos</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {topTopics.map((top, idx) => (
            <button
              key={top.topic}
              onClick={() => handleTopicClick(top.topic)}
              className="p-4 rounded-xl border border-stone-200 bg-[#FAF9F5]/70 hover:bg-white hover:border-[#1B4D3E] hover:shadow-xs transition-all text-left group cursor-pointer space-y-2"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[10px] font-bold text-stone-400">#0{idx + 1}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    top.netScore > 0 ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                  }`}
                >
                  {top.netScore > 0 ? `+${top.netScore}` : top.netScore} Net
                </span>
              </div>

              <h4 className="font-bold text-stone-900 text-xs line-clamp-2 font-['Outfit'] group-hover:text-[#1B4D3E]">
                {top.topic}
              </h4>

              <div className="text-[11px] text-stone-500 flex justify-between pt-1 border-t border-stone-200/60">
                <span>{top.totalMentions} menciones</span>
                <span className="font-semibold text-stone-700">{top.category}</span>
              </div>

              <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${top.totalMentions > 0 ? (top.positiveCount / top.totalMentions) * 100 : 70}%` }}
                  className="bg-emerald-600 h-full"
                />
                <div
                  style={{ width: `${top.totalMentions > 0 ? (top.neutralCount / top.totalMentions) * 100 : 15}%` }}
                  className="bg-stone-400 h-full"
                />
                <div
                  style={{ width: `${top.totalMentions > 0 ? (top.negativeCount / top.totalMentions) * 100 : 15}%` }}
                  className="bg-rose-500 h-full"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Visual Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend Recharts */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-stone-900 text-base font-['Outfit']">
                Evolución de Volumen Analizado por Mes
              </h3>
              <p className="text-xs text-stone-500">Menciones agregadas según el filtro territorial activo.</p>
            </div>
            <span className="text-[10px] font-semibold bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
              Semestre Móvil
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.timeline} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E5E4" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#78716C" }} />
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
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                <Line type="monotone" dataKey="Duomo" stroke="#1B4D3E" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Grido" stroke="#E6A15C" strokeWidth={2} strokeDasharray="4 4" />
                <Line type="monotone" dataKey="Cremolatti" stroke="#9333EA" strokeWidth={2} strokeDasharray="2 2" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Channels / Sources Distribution */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-stone-900 text-base font-['Outfit']">
                Distribución por Canal Digital
              </h3>
              <p className="text-xs text-stone-500">Composición de la muestra según plataforma de origen.</p>
            </div>
            <Radio className="w-4 h-4 text-stone-400" />
          </div>

          <div className="space-y-3 pt-2">
            {metrics.sourcesBreakdown.map((src) => (
              <div key={src.name} className="space-y-1.5 p-3 rounded-xl bg-[#FAF9F5] border border-stone-200/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-800">{src.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-stone-500">{src.count} opiniones</span>
                    <span className="font-extrabold text-[#1B4D3E]">{src.pct}%</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden">
                  <div style={{ width: `${src.pct}%` }} className="h-full bg-[#1B4D3E] rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
