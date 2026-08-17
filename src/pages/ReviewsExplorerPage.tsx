import React, { useState, useMemo } from "react";
import { FilterState, Review, Brand, SentimentLabel } from "../types";
import { REAL_REVIEWS } from "../data/realReviews";
import { PROTOTYPE_REVIEWS } from "../data/prototypeMetrics";
import {
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Filter,
  CheckCircle2,
  AlertCircle,
  Tag,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";

interface ReviewsExplorerPageProps {
  filters: FilterState;
}

export const ReviewsExplorerPage: React.FC<ReviewsExplorerPageProps> = ({ filters }) => {
  const [searchQuery, setSearchQuery] = useState<string>(filters.searchQuery || "");
  const [selectedBrand, setSelectedBrand] = useState<string>(filters.brand || "Todas");
  const [selectedSentiment, setSelectedSentiment] = useState<string>(filters.sentiment || "Todos");
  const [selectedType, setSelectedType] = useState<"all" | "real" | "prototype">("all");
  const [expandedReviewId, setExpandedReviewId] = useState<string | null>(null);

  const allReviews: Review[] = useMemo(() => {
    return [...REAL_REVIEWS, ...PROTOTYPE_REVIEWS];
  }, []);

  const filteredReviews = useMemo(() => {
    return allReviews.filter((rev) => {
      // Brand filter
      if (selectedBrand !== "Todas" && rev.brand !== selectedBrand) return false;

      // Sentiment filter
      if (selectedSentiment === "Positivo" && rev.sentiment.label !== "positive") return false;
      if (selectedSentiment === "Neutro" && rev.sentiment.label !== "neutral") return false;
      if (selectedSentiment === "Negativo" && rev.sentiment.label !== "negative") return false;

      // Data type filter
      if (selectedType === "real" && rev.dataType !== "real") return false;
      if (selectedType === "prototype" && rev.dataType !== "prototype") return false;

      // Search query
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const matchesText = rev.text.toLowerCase().includes(q);
        const matchesBranch = rev.branch ? rev.branch.toLowerCase().includes(q) : false;
        const matchesCity = rev.city.toLowerCase().includes(q);
        const matchesProvince = rev.province.toLowerCase().includes(q);
        const matchesTopic = rev.topics.some((t) => t.toLowerCase().includes(q));
        const matchesAspect = rev.aspects.some((a) => a.name.toLowerCase().includes(q));

        if (!matchesText && !matchesBranch && !matchesCity && !matchesProvince && !matchesTopic && !matchesAspect) {
          return false;
        }
      }

      return true;
    });
  }, [allReviews, selectedBrand, selectedSentiment, selectedType, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedReviewId(expandedReviewId === id ? null : id);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-['Plus_Jakarta_Sans']">
      {/* Header */}
      <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-[#112A23] font-['Outfit']">
              Review Explorer & Verbatim Feed
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Explorador de Opiniones
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Explora el corpus completo de opiniones con trazabilidad de procedencia, aspectos detectados por NLP y enlaces directos.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
            {REAL_REVIEWS.length} Reales Trazables
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 border border-blue-200">
            {PROTOTYPE_REVIEWS.length} Sintéticas
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        {/* Search row */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar en el texto (ej. 'pistacho', 'filas', 'bolívar', 'grido', 'posnet')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FAF9F5] border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#1B4D3E] focus:ring-1 focus:ring-[#1B4D3E]/20"
          />
        </div>

        {/* Quick Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-stone-400 font-semibold text-[11px] uppercase tracking-wider">Marca:</span>
            {["Todas", "Duomo", "Grido", "Cremolatti"].map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBrand(b)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  selectedBrand === b
                    ? "bg-[#1B4D3E] text-white shadow-2xs"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                {b}
              </button>
            ))}

            <span className="text-stone-400 font-semibold text-[11px] uppercase tracking-wider ml-2">Sentimiento:</span>
            {["Todos", "Positivo", "Neutro", "Negativo"].map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSentiment(s)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  selectedSentiment === s
                    ? "bg-stone-800 text-white shadow-2xs"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                {s}
              </button>
            ))}

            <span className="text-stone-400 font-semibold text-[11px] uppercase tracking-wider ml-2">Tipo:</span>
            <button
              onClick={() => setSelectedType("all")}
              className={`px-2.5 py-1 rounded-lg font-medium ${
                selectedType === "all" ? "bg-stone-800 text-white" : "bg-stone-100 text-stone-700"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedType("real")}
              className={`px-2.5 py-1 rounded-lg font-medium ${
                selectedType === "real"
                  ? "bg-emerald-700 text-white"
                  : "bg-emerald-50 text-emerald-800 border border-emerald-200"
              }`}
            >
              Solo Real Data
            </button>
            <button
              onClick={() => setSelectedType("prototype")}
              className={`px-2.5 py-1 rounded-lg font-medium ${
                selectedType === "prototype"
                  ? "bg-blue-700 text-white"
                  : "bg-blue-50 text-blue-800 border border-blue-200"
              }`}
            >
              Solo Prototype
            </button>
          </div>

          <div className="text-stone-500 text-xs font-medium">
            Mostrando <strong>{filteredReviews.length}</strong> de {allReviews.length}
          </div>
        </div>
      </div>

      {/* Reviews Table / Feed */}
      <div className="space-y-3">
        {filteredReviews.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center space-y-2 text-stone-500">
            <p className="font-semibold text-sm">No se encontraron opiniones para los filtros seleccionados.</p>
            <p className="text-xs">Prueba ajustando los términos de búsqueda o limpiando los filtros.</p>
          </div>
        ) : (
          filteredReviews.map((rev) => {
            const isExpanded = expandedReviewId === rev.id;
            const isPos = rev.sentiment.label === "positive";
            const isNeu = rev.sentiment.label === "neutral";

            return (
              <div
                key={rev.id}
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-stone-300 transition-all shadow-xs"
              >
                {/* Collapsed Top Row */}
                <div
                  onClick={() => toggleExpand(rev.id)}
                  className="p-4 sm:p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/50"
                >
                  <div className="flex items-start sm:items-center gap-3 flex-1">
                    {/* Sentiment icon badge */}
                    <span
                      className={`px-2.5 py-1 rounded-lg font-black text-xs shrink-0 ${
                        isPos
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : isNeu
                          ? "bg-stone-100 text-stone-700 border border-stone-200"
                          : "bg-rose-100 text-rose-800 border border-rose-200"
                      }`}
                    >
                      {isPos ? "Positivo" : isNeu ? "Neutro" : "Negativo"}
                    </span>

                    {/* Brand Pill */}
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded shrink-0 ${
                        rev.brand === "Duomo"
                          ? "bg-[#1B4D3E]/10 text-[#1B4D3E]"
                          : rev.brand === "Grido"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-rose-100 text-rose-900"
                      }`}
                    >
                      {rev.brand}
                    </span>

                    {/* Verbatim quote snippet */}
                    <p className="text-xs text-stone-800 font-medium line-clamp-1 italic font-['Newsreader'] flex-1">
                      “{rev.text}”
                    </p>
                  </div>

                  {/* Metadata and Badge */}
                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto text-xs">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        rev.dataType === "real"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : "bg-blue-100 text-blue-800 border border-blue-200"
                      }`}
                    >
                      {rev.dataType === "real" ? "REAL DATA" : "PROTOTYPE"}
                    </span>

                    <span className="text-stone-400 text-[11px] hidden md:inline">
                      {rev.source} · {rev.city} ({rev.province})
                    </span>

                    <div className="text-stone-400 p-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details Pane */}
                {isExpanded && (
                  <div className="p-5 bg-[#FAF9F5] border-t border-stone-200 space-y-4 text-xs animate-in fade-in duration-150">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                        Texto Original Completo:
                      </span>
                      <p className="text-stone-900 text-sm italic font-['Newsreader'] leading-relaxed bg-white p-3.5 rounded-xl border border-stone-200">
                        “{rev.text}”
                      </p>
                    </div>

                    {/* Detected Aspects with Sentiment */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-[#1B4D3E]" /> Aspect-Based Sentiment Analysis Detectado:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {rev.aspects.map((asp, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 bg-white border border-stone-200 rounded-xl space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-stone-900">{asp.name}</span>
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                  asp.sentiment === "positive"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : asp.sentiment === "neutral"
                                    ? "bg-stone-100 text-stone-700"
                                    : "bg-rose-100 text-rose-800"
                                }`}
                              >
                                {asp.sentiment} ({(asp.confidence * 100).toFixed(0)}%)
                              </span>
                            </div>
                            {asp.snippet && (
                              <p className="text-[11px] text-stone-500 italic">“{asp.snippet}”</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Topics and Meta */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-200 text-stone-600">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-stone-400" />
                        <span className="font-semibold text-stone-700">Tópicos:</span>
                        {rev.topics.map((top) => (
                          <span key={top} className="px-2 py-0.5 rounded bg-white border border-stone-200 text-[10px] text-stone-700">
                            {top}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-[11px]">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-stone-400" />
                          {rev.branch || rev.city}, {rev.province}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-stone-400" />
                          {rev.date}
                        </span>
                        {rev.sourceUrl && (
                          <a
                            href={rev.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#1B4D3E] font-bold hover:underline inline-flex items-center gap-1"
                          >
                            <span>Ver fuente</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
