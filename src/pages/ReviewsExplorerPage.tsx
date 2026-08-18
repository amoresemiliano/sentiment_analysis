import React, { useState } from "react";
import { GlobalFilters, Review, SentimentLabel } from "../types";
import { getFilteredReviews } from "../data/dynamicAnalyticsEngine";
import {
  Search,
  Star,
  ExternalLink,
  MapPin,
  IceCream,
  Tags,
  Radio,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  Calendar,
  Filter,
  CheckCircle2,
  Share2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface ReviewsExplorerPageProps {
  filters: GlobalFilters;
  onFilterChange: (filters: GlobalFilters) => void;
}

export const ReviewsExplorerPage: React.FC<ReviewsExplorerPageProps> = ({
  filters,
  onFilterChange,
}) => {
  const [localSearch, setLocalSearch] = useState(filters.searchQuery || "");
  const [selectedSentimentFilter, setSelectedSentimentFilter] = useState<string>(
    filters.sentiment || "Todos"
  );
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});

  const activeFilteredReviews = getFilteredReviews({
    ...filters,
    searchQuery: localSearch,
    sentiment: selectedSentimentFilter === "Todos" ? null : selectedSentimentFilter,
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({
      ...filters,
      searchQuery: localSearch,
    });
  };

  const handleSentimentFilter = (sent: string) => {
    setSelectedSentimentFilter(sent);
    onFilterChange({
      ...filters,
      sentiment: sent === "Todos" ? null : sent,
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-['Plus_Jakarta_Sans']">
      {/* Header */}
      <div className="bg-white border border-stone-200 p-4 sm:p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#112A23] font-['Outfit']">
              Explorador de Opiniones & Verbatims
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Capa de Evidencia Analítica
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Lectura directa de los textos originales con etiquetado semántico automático de sabor, tópico y sentimiento.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-500">Opiniones Coincidentes:</span>
          <span className="font-bold text-[#1B4D3E] bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl font-['Outfit'] text-sm">
            {activeFilteredReviews.length.toLocaleString()} opiniones
          </span>
        </div>
      </div>

      {/* Local Explorer Toolbar */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Sentiment quick toggle */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[10px] font-bold uppercase text-stone-400 mr-1 shrink-0">Sentimiento:</span>
          {["Todos", "positive", "neutral", "negative"].map((sent) => (
            <button
              key={sent}
              onClick={() => handleSentimentFilter(sent)}
              className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                selectedSentimentFilter === sent
                  ? sent === "positive"
                    ? "bg-emerald-700 text-white shadow-2xs"
                    : sent === "negative"
                    ? "bg-rose-700 text-white shadow-2xs"
                    : "bg-stone-800 text-white shadow-2xs"
                  : "bg-[#FAF9F5] text-stone-700 border border-stone-200 hover:bg-stone-100"
              }`}
            >
              {sent === "Todos"
                ? "Todos"
                : sent === "positive"
                ? "Positivo"
                : sent === "neutral"
                ? "Neutro"
                : "Negativo"}
            </button>
          ))}
        </div>

        {/* Local Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar en el texto (ej. dubai, fila)..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full min-h-[44px] pl-9 pr-20 py-2 bg-[#FAF9F5] border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#1B4D3E]"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#1B4D3E] text-white text-[11px] font-bold rounded-lg cursor-pointer hover:bg-[#143D32] transition-colors"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* Reviews Feed List */}
      <div className="space-y-3.5">
        {activeFilteredReviews.length > 0 ? (
          activeFilteredReviews.map((review) => {
            const sentLabel =
              typeof review.sentiment === "object" && review.sentiment !== null
                ? review.sentiment.label
                : (review.sentiment as any);
            const isPos = sentLabel === "positive";
            const isNeg = sentLabel === "negative";
            const authorName = review.author || "Cliente verificado";
            const branchDisplayName = review.branchName || review.branch || "Sucursal Duomo";
            const reviewLink = review.url || review.sourceUrl;
            const isLong = review.text.length > 180;
            const isExpanded = !!expandedReviews[review.id];
            const isReal = review.isRealPilot || (review as any).datasetType === "real_pilot" || (review as any).source === "Google Maps";

            return (
              <div
                key={review.id}
                className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-stone-400 transition-all space-y-3"
              >
                {/* Review Card Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2.5 text-xs">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="font-bold text-stone-900">{authorName}</span>
                    <span className="text-[10px] text-stone-400">·</span>
                    <span className="text-stone-600 flex items-center gap-1 text-[11px] sm:text-xs">
                      <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                      <strong>{branchDisplayName}</strong> ({review.city}, {review.province})
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                      {review.brand}
                    </span>
                    {isReal && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        <span>Piloto Real</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {review.rating && (
                      <div className="flex items-center gap-0.5 text-amber-500 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400 shrink-0" />
                        <span>{review.rating}</span>
                      </div>
                    )}

                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${
                        isPos
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : isNeg
                          ? "bg-rose-100 text-rose-800 border border-rose-200"
                          : "bg-stone-200 text-stone-700"
                      }`}
                    >
                      {isPos ? "Positivo" : isNeg ? "Fricción" : "Neutro"}
                    </span>

                    <span className="text-[10px] font-semibold bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                      {review.source}
                    </span>

                    {reviewLink && (
                      <a
                        href={reviewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-400 hover:text-stone-700 transition-colors p-1"
                        title="Ver review pública original"
                        aria-label="Ver review original"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Review Verbatim Content */}
                <div>
                  <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-['Newsreader'] italic">
                    “{isLong && !isExpanded ? `${review.text.slice(0, 180)}...` : review.text}”
                  </p>
                  {isLong && (
                    <button
                      onClick={() => toggleExpand(review.id)}
                      className="mt-1 text-[11px] font-bold text-[#1B4D3E] hover:underline inline-flex items-center gap-0.5 cursor-pointer py-1"
                    >
                      {isExpanded ? (
                        <>
                          <span>Ver menos</span>
                          <ChevronUp className="w-3 h-3" />
                        </>
                      ) : (
                        <>
                          <span>Ver texto completo</span>
                          <ChevronDown className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Detected Entities Tags Footer */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-stone-100 text-[11px]">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {review.flavor && (
                      <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-950 px-2 py-0.5 rounded-md font-semibold">
                        <IceCream className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>Sabor: {review.flavor}</span>
                      </span>
                    )}

                    {review.topics.map((top) => (
                      <span
                        key={top}
                        className="inline-flex items-center gap-1 bg-stone-100 border border-stone-200 text-stone-700 px-2 py-0.5 rounded-md font-medium"
                      >
                        <Tags className="w-3 h-3 text-stone-400 shrink-0" />
                        <span>{top}</span>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-stone-400">
                    <Calendar className="w-3 h-3 shrink-0" />
                    <span>{review.date}</span>
                    <span>·</span>
                    <span className="font-semibold text-stone-500">Verificado</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center space-y-3">
            <Filter className="w-8 h-8 text-stone-300 mx-auto" />
            <h3 className="font-bold text-stone-800 text-sm">No se encontraron opiniones con estos filtros</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              Probá limpiando algunos filtros en la barra superior o ampliando los términos de búsqueda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

