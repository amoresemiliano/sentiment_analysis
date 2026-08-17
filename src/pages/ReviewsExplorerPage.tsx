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

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-['Plus_Jakarta_Sans']">
      {/* Header */}
      <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-[#112A23] font-['Outfit']">
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
          <span className="font-bold text-[#1B4D3E] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg font-['Outfit']">
            {activeFilteredReviews.length} resultados
          </span>
        </div>
      </div>

      {/* Local Explorer Toolbar */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Sentiment quick toggle */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase text-stone-400 mr-1">Sentimiento:</span>
          {["Todos", "positive", "neutral", "negative"].map((sent) => (
            <button
              key={sent}
              onClick={() => handleSentimentFilter(sent)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedSentimentFilter === sent
                  ? sent === "positive"
                    ? "bg-emerald-700 text-white"
                    : sent === "negative"
                    ? "bg-rose-700 text-white"
                    : "bg-stone-800 text-white"
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
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar en el texto (ej. dubai, fila, posnet)..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-8 pr-16 py-2 bg-[#FAF9F5] border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#1B4D3E]"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#1B4D3E] text-white text-[11px] font-bold rounded-lg cursor-pointer"
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

            return (
              <div
                key={review.id}
                className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-xs hover:border-stone-400 transition-all space-y-3"
              >
                {/* Review Card Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2.5 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-stone-900">{authorName}</span>
                    <span className="text-[10px] text-stone-400">·</span>
                    <span className="text-stone-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      <strong>{branchDisplayName}</strong> ({review.city}, {review.province})
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-stone-100 text-stone-600">
                      {review.brand}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {review.rating && (
                      <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
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
                        className="text-stone-400 hover:text-stone-700 transition-colors"
                        title="Ver review pública original"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Review Verbatim Content */}
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-['Newsreader'] italic">
                  “{review.text}”
                </p>

                {/* Detected Entities Tags Footer */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-stone-100 text-[11px]">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {review.flavor && (
                      <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-950 px-2 py-0.5 rounded-md font-semibold">
                        <IceCream className="w-3 h-3 text-amber-600" />
                        <span>Sabor: {review.flavor}</span>
                      </span>
                    )}

                    {review.topics.map((top) => (
                      <span
                        key={top}
                        className="inline-flex items-center gap-1 bg-stone-100 border border-stone-200 text-stone-700 px-2 py-0.5 rounded-md font-medium"
                      >
                        <Tags className="w-3 h-3 text-stone-400" />
                        <span>{top}</span>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-stone-400">
                    <Calendar className="w-3 h-3" />
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
