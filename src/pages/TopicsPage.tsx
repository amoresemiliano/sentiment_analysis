import React, { useState } from "react";
import { GlobalFilters } from "../types";
import { NavPage } from "../components/Sidebar";
import { computeTopicMetrics, computeDynamicOverviewMetrics, computeEvidenceContextData } from "../data/dynamicAnalyticsEngine";
import { EvidenceContext } from "../components/EvidenceContext";
import {
  Tags,
  Search,
  Sparkles,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Filter,
  Layers,
  ArrowUpRight,
  Radio,
  IceCream,
  Store,
  Info,
} from "lucide-react";

interface TopicsPageProps {
  filters: GlobalFilters;
  onSelectPage?: (page: NavPage) => void;
  onDrillDownTopic?: (topic: string) => void;
}

export const TopicsPage: React.FC<TopicsPageProps> = ({
  filters,
  onSelectPage,
  onDrillDownTopic,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const topics = computeTopicMetrics(filters);
  const overview = computeDynamicOverviewMetrics(filters);

  const filteredTopics = topics.filter((t) => {
    const matchCat = selectedCategory === "Todas" || t.category === selectedCategory;
    const matchSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleTopicClick = (topicName: string) => {
    if (onDrillDownTopic) {
      onDrillDownTopic(topicName);
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
              Topic Intelligence & BERTopic
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Modelado No Supervisado de Temas
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Descubrimiento automático de temas recurrentes, fricciones operativas y demandas emergentes de clientes.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-500">Muestra Activa:</span>
          <span className="font-bold text-stone-900 bg-stone-100 px-2.5 py-1 rounded-lg">
            {overview.totalAnalyzedConversations} opiniones
          </span>
        </div>
      </div>

      {/* Concept Note */}
      <div className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-4 text-xs text-stone-700 leading-relaxed flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#1B4D3E] text-white flex items-center justify-center font-bold shrink-0">
          NLP
        </div>
        <div>
          <strong>¿Cómo funciona el Topic Modeling?</strong> Agrupa semánticamente opiniones similares utilizando embeddings densos y algoritmos de clustering (HDBSCAN), identificando tópicos reales sin necesidad de taxonomías rígidas previas.
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-stone-400 font-bold text-[10px] uppercase mr-1">Categoría:</span>
          {["Todas", "Producto", "Servicio", "Operaciones", "Precio", "Infraestructura"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#1B4D3E] text-white shadow-2xs"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar tópico o palabra..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-[#FAF9F5] border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#1B4D3E]"
          />
        </div>
      </div>

      {/* Topics Grid: Clickable Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTopics.map((topic) => {
          const isPositive = topic.sentimentScore > 0;
          return (
            <button
              key={topic.id}
              onClick={() => handleTopicClick(topic.name)}
              className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-[#1B4D3E] transition-all text-left group cursor-pointer space-y-3.5 relative flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                    {topic.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {topic.isEmerging && (
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300/80 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <Sparkles className="w-2.5 h-2.5" /> Emergente
                      </span>
                    )}
                    <span
                      className={`text-xs font-black px-2 py-0.5 rounded ${
                        isPositive
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : "bg-rose-100 text-rose-800 border border-rose-200"
                      }`}
                    >
                      {isPositive ? `+${topic.sentimentScore}` : topic.sentimentScore} Net
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-stone-900 font-['Outfit'] group-hover:text-[#1B4D3E] transition-colors leading-snug">
                  {topic.name}
                </h3>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-2 bg-[#FAF9F5] border border-stone-100 rounded-lg">
                    <span className="text-[10px] text-stone-400 block font-medium">Menciones</span>
                    <span className="text-sm font-extrabold text-stone-900 font-['Outfit']">
                      {topic.mentionsCount} opiniones
                    </span>
                    <span className="text-[10px] text-stone-500 block">{topic.percentage}% del corpus</span>
                  </div>

                  <div className="p-2 bg-[#FAF9F5] border border-stone-100 rounded-lg">
                    <span className="text-[10px] text-stone-400 block font-medium">Tendencia</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      {topic.trend > 0 ? (
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
                      )}
                      <span className={`text-xs font-bold ${topic.trend > 0 ? "text-emerald-700" : "text-rose-700"}`}>
                        {topic.trend > 0 ? `+${topic.trend}%` : `${topic.trend}%`}
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-400 block">vs período anterior</span>
                  </div>
                </div>

                {/* Sources breakdown */}
                <div className="pt-2 text-[11px] text-stone-500 space-y-1">
                  <div className="flex justify-between font-medium">
                    <span>Origen de las opiniones:</span>
                    <span className="font-semibold text-stone-700">Google 64% · IG 24% · FB 12%</span>
                  </div>
                  <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden flex">
                    <div style={{ width: "64%" }} className="bg-[#1B4D3E] h-full" />
                    <div style={{ width: "24%" }} className="bg-pink-600 h-full" />
                    <div style={{ width: "12%" }} className="bg-blue-600 h-full" />
                  </div>
                </div>
              </div>

              {/* Action drill-down button */}
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#1B4D3E]">
                <span>Ver reviews que sustentan este tópico</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
