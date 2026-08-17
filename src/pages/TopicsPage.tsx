import React, { useState } from "react";
import { FilterState, TopicMetric } from "../types";
import { PROTOTYPE_TOPICS } from "../data/prototypeMetrics";
import {
  Tags,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Layers,
  Search,
  Filter,
  BarChart2,
  Swords,
  MapPin,
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

interface TopicsPageProps {
  filters: FilterState;
}

export const TopicsPage: React.FC<TopicsPageProps> = ({ filters }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [searchTopic, setSearchTopic] = useState<string>("");

  const filteredTopics = PROTOTYPE_TOPICS.filter((t) => {
    const matchesCat = selectedCategory === "Todas" || t.category === selectedCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchTopic.toLowerCase()) ||
      t.topPhrases.some((p) => p.toLowerCase().includes(searchTopic.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const emergingTopics = PROTOTYPE_TOPICS.filter((t) => t.isEmerging);

  const brandComparisonData = PROTOTYPE_TOPICS.slice(0, 6).map((t) => ({
    name: t.name,
    Duomo: t.duomoScore,
    Grido: t.gridoScore,
    Cremolatti: t.cremolattiScore,
  }));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-['Plus_Jakarta_Sans']">
      {/* Header */}
      <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-[#112A23] font-['Outfit']">
              Topic Intelligence
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              BERTopic & Semantic Clustering
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Descubrimiento automático de temas y tópicos latentes en la voz digital del consumidor sin sesgo previo.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar tema o frase..."
              value={searchTopic}
              onChange={(e) => setSearchTopic(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-[#1B4D3E]"
            />
          </div>
        </div>
      </div>

      {/* Emerging Topics Banner */}
      <div className="bg-gradient-to-r from-[#FAF9F5] to-amber-50/50 border border-amber-200/80 rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h3 className="font-bold text-stone-900 text-sm font-['Outfit']">
              Tópicos Emergentes & Tendencias Rápidas
            </h3>
          </div>
          <span className="text-[10px] font-bold text-amber-800 uppercase bg-amber-100 px-2 py-0.5 rounded">
            Detección de Anomalías NLP
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {emergingTopics.map((top) => (
            <div key={top.id} className="p-3 bg-white border border-amber-200/80 rounded-xl space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900">{top.name}</span>
                <span className="text-xs font-bold text-emerald-700 flex items-center">
                  <TrendingUp className="w-3.5 h-3.5" /> +{top.trend}%
                </span>
              </div>
              <p className="text-[11px] text-stone-600">
                {top.sentimentScore > 0 ? "Fuerte tracción positiva." : "Alerta de fricción operativa creciente."}
              </p>
              <div className="text-[10px] text-stone-400 truncate">
                Frases: {top.topPhrases.join(" · ")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {["Todas", "Producto", "Servicio", "Precio", "Operaciones", "Infraestructura"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? "bg-[#1B4D3E] text-white shadow-xs"
                : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Topics Table / Cards */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <h3 className="font-bold text-stone-900 text-sm font-['Outfit']">
            Catálogo de Tópicos Descubiertos ({filteredTopics.length})
          </h3>
          <span className="text-xs text-stone-500 font-medium">Ordenado por volumen de mención</span>
        </div>

        <div className="divide-y divide-stone-100 text-xs">
          {filteredTopics.map((top) => {
            const isPos = top.sentimentScore > 0;
            return (
              <div key={top.id} className="p-4 sm:p-5 hover:bg-stone-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 text-sm">{top.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                      {top.category}
                    </span>
                    {top.isEmerging && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                        Emergente
                      </span>
                    )}
                  </div>
                  <div className="text-stone-500 text-[11px] flex flex-wrap items-center gap-2">
                    <span>Menciones: <strong>{top.mentionsCount}</strong> ({top.percentage}% de la muestra)</span>
                    <span>·</span>
                    <span>Frases clave: <em className="text-stone-700">{top.topPhrases.join(", ")}</em></span>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  {/* Trend */}
                  <div className="text-right">
                    <div className="text-[10px] text-stone-400 font-medium">Evolución</div>
                    <div
                      className={`font-bold flex items-center justify-end ${
                        top.trend > 0 ? "text-emerald-700" : "text-rose-700"
                      }`}
                    >
                      {top.trend > 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                      {top.trend > 0 ? `+${top.trend}%` : `${top.trend}%`}
                    </div>
                  </div>

                  {/* Sentiment Score */}
                  <div className="text-right">
                    <div className="text-[10px] text-stone-400 font-medium">Score Neto</div>
                    <span
                      className={`inline-block font-black px-2.5 py-1 rounded text-xs ${
                        isPos
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : "bg-rose-100 text-rose-800 border border-rose-200"
                      }`}
                    >
                      {isPos ? `+${top.sentimentScore}` : top.sentimentScore}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Topics by Brand Chart */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-stone-900 text-base font-['Outfit']">
              Topic Sentiment Comparativo por Marca (Duomo vs Grido vs Cremolatti)
            </h3>
            <p className="text-xs text-stone-500">
              Score de percepción (-100 a +100) en los 6 tópicos principales.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2 py-1 rounded">
            Evaluación Multimarca
          </span>
        </div>

        <div className="h-72 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={brandComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} angle={-10} textAnchor="end" />
              <YAxis stroke="#64748b" fontSize={11} domain={[-60, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: "#FAF9F5", borderColor: "#e2e8f0", borderRadius: "12px", fontSize: "12px" }}
              />
              <Legend />
              <Bar dataKey="Duomo" fill="#1B4D3E" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Grido" fill="#2563EB" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Cremolatti" fill="#881337" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
