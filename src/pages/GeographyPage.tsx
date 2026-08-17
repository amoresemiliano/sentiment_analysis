import React, { useState } from "react";
import { GlobalFilters, Branch } from "../types";
import { CANONICAL_BRANCHES } from "../data/canonicalBranches";
import { NavPage } from "../components/Sidebar";
import {
  MapPin,
  Building2,
  Store,
  Star,
  Layers,
  ThumbsUp,
  ThumbsDown,
  TrendingUp,
  ExternalLink,
  ChevronRight,
  Filter,
  Search,
  Sparkles,
  Info,
  CheckCircle2,
} from "lucide-react";

interface GeographyPageProps {
  filters: GlobalFilters;
  onSelectPage?: (page: NavPage) => void;
  onSelectBranch?: (branchId: string) => void;
  onSelectProvince?: (province: string) => void;
}

export const GeographyPage: React.FC<GeographyPageProps> = ({
  filters,
  onSelectPage,
  onSelectBranch,
  onSelectProvince,
}) => {
  const [selectedBranchDetail, setSelectedBranchDetail] = useState<Branch | null>(
    CANONICAL_BRANCHES[0]
  );
  const [activeProvinceTab, setActiveProvinceTab] = useState<string>(
    filters.province && filters.province !== "Todas" ? filters.province : "Misiones"
  );
  const [branchSearch, setBranchSearch] = useState<string>("");

  const provinces = ["Misiones", "Corrientes", "Chaco", "Formosa"];

  const branchesInProvince = CANONICAL_BRANCHES.filter((b) => {
    const matchProv = b.province === activeProvinceTab;
    const matchBrand = !filters.brand || filters.brand === "Todas" || b.brand === filters.brand;
    const matchSearch =
      b.name.toLowerCase().includes(branchSearch.toLowerCase()) ||
      b.city.toLowerCase().includes(branchSearch.toLowerCase());
    return matchProv && matchBrand && matchSearch;
  });

  const handleBranchClick = (branch: Branch) => {
    setSelectedBranchDetail(branch);
    if (onSelectBranch) {
      onSelectBranch(branch.id);
    }
  };

  const handleProvinceTabChange = (prov: string) => {
    setActiveProvinceTab(prov);
    if (onSelectProvince) {
      onSelectProvince(prov);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-['Plus_Jakarta_Sans']">
      {/* Header */}
      <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-[#112A23] font-['Outfit']">
              Regional & Branch Intelligence (NEA)
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Red de 90 Sucursales
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Diagnóstico territorial continuo a nivel Provincia → Ciudad → Sucursal con telemetría de Google Maps y redes sociales.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-500">Presencia Duomo:</span>
          <span className="font-bold text-stone-900 bg-stone-100 px-2.5 py-1 rounded-lg">
            90 sucursales activas
          </span>
        </div>
      </div>

      {/* Province Tabs Bar */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-stone-400 font-bold text-[10px] uppercase mr-1">Provincia:</span>
          {provinces.map((prov) => (
            <button
              key={prov}
              onClick={() => handleProvinceTabChange(prov)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeProvinceTab === prov
                  ? "bg-[#1B4D3E] text-white shadow-xs"
                  : "bg-[#FAF9F5] text-stone-700 hover:bg-stone-100 border border-stone-200/80"
              }`}
            >
              {prov}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar sucursal o ciudad..."
            value={branchSearch}
            onChange={(e) => setBranchSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-[#FAF9F5] border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#1B4D3E]"
          />
        </div>
      </div>

      {/* Main Split View: Branch Table (Left) + Ficha de Sucursal (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Branch List (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-stone-900 text-base font-['Outfit']">
              Sucursales en {activeProvinceTab} ({branchesInProvince.length})
            </h3>
            <span className="text-[10px] text-stone-500 font-medium">Hacé click para ver la ficha completa</span>
          </div>

          <div className="space-y-3">
            {branchesInProvince.map((branch) => {
              const isSelected = selectedBranchDetail?.id === branch.id;
              return (
                <div
                  key={branch.id}
                  onClick={() => handleBranchClick(branch)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2.5 ${
                    isSelected
                      ? "border-[#1B4D3E] bg-emerald-50/40 shadow-xs"
                      : "border-stone-200 bg-[#FAF9F5]/70 hover:border-stone-300 hover:bg-white"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-stone-900 text-sm font-['Outfit']">{branch.name}</h4>
                        <span className="text-[10px] font-semibold px-2 py-0.2 rounded bg-stone-200 text-stone-700">
                          {branch.city}
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-stone-100 text-stone-600">
                          {branch.brand}
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-500">{branch.address}</span>
                    </div>

                    {/* Google Rating Badge */}
                    {branch.googleProfile && (
                      <div className="flex items-center gap-1.5 bg-white border border-stone-200 px-2.5 py-1 rounded-lg shadow-2xs">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                        <span className="font-extrabold text-stone-900 text-xs">{branch.googleProfile.rating}</span>
                        <span className="text-[10px] text-stone-400">({branch.googleProfile.totalReviews.toLocaleString()})</span>
                      </div>
                    )}
                  </div>

                  {/* KPIs row */}
                  <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
                    <div className="bg-white/80 p-2 rounded-lg border border-stone-100">
                      <span className="text-stone-400 block text-[10px]">Corpus Analizado</span>
                      <strong className="text-[#1B4D3E] font-bold">{branch.analyzedCorpus.totalAnalyzed} textos</strong>
                    </div>
                    <div className="bg-white/80 p-2 rounded-lg border border-stone-100">
                      <span className="text-stone-400 block text-[10px]">Net Sentiment</span>
                      <strong className="text-emerald-700 font-bold">+{branch.sentiment.netScore}</strong>
                    </div>
                    <div className="bg-white/80 p-2 rounded-lg border border-stone-100">
                      <span className="text-stone-400 block text-[10px]">Fricción Principal</span>
                      <span className="text-rose-700 font-semibold truncate block" title={branch.mainFriction}>
                        {branch.mainFriction}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Ficha de Sucursal (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-5 lg:sticky lg:top-24 self-start">
          {selectedBranchDetail ? (
            <div className="space-y-4">
              <div className="space-y-1 border-b border-stone-100 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase">
                    Ficha de Sucursal
                  </span>
                  {selectedBranchDetail.googleProfile?.url && (
                    <a
                      href={selectedBranchDetail.googleProfile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-stone-500 hover:text-stone-900 flex items-center gap-1"
                    >
                      <span>Ver en Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <h3 className="text-xl font-black text-stone-900 font-['Outfit']">
                  {selectedBranchDetail.name}
                </h3>
                <p className="text-xs text-stone-500">
                  {selectedBranchDetail.city} · Provincia de {selectedBranchDetail.province}
                </p>
              </div>

              {/* Google Profile & Corpus Split */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl space-y-0.5">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-900">
                    <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-400" />
                    Google Profile
                  </div>
                  <div className="text-lg font-black text-amber-950 font-['Outfit']">
                    ★ {selectedBranchDetail.googleProfile?.rating}
                  </div>
                  <div className="text-[10px] text-stone-600">
                    {selectedBranchDetail.googleProfile?.totalReviews.toLocaleString()} reseñas públicas
                  </div>
                </div>

                <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-0.5">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-900">
                    <Layers className="w-3.5 h-3.5 text-emerald-700" />
                    Corpus Analizado
                  </div>
                  <div className="text-lg font-black text-emerald-950 font-['Outfit']">
                    {selectedBranchDetail.analyzedCorpus.totalAnalyzed}
                  </div>
                  <div className="text-[10px] text-stone-600">
                    Google {selectedBranchDetail.analyzedCorpus.googleReviews} · Social {selectedBranchDetail.analyzedCorpus.socialComments}
                  </div>
                </div>
              </div>

              {/* Sentiment breakdown */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between text-xs font-bold">
                  <span>Sentiment Breakdown:</span>
                  <span className="text-emerald-700 font-extrabold">+{selectedBranchDetail.sentiment.netScore} Net</span>
                </div>
                <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden flex">
                  <div style={{ width: `${selectedBranchDetail.sentiment.positivePct}%` }} className="bg-emerald-600 h-full" />
                  <div style={{ width: `${selectedBranchDetail.sentiment.neutralPct}%` }} className="bg-stone-400 h-full" />
                  <div style={{ width: `${selectedBranchDetail.sentiment.negativePct}%` }} className="bg-rose-500 h-full" />
                </div>
                <div className="flex justify-between text-[10px] text-stone-500">
                  <span className="text-emerald-700">{selectedBranchDetail.sentiment.positivePct}% Positivo</span>
                  <span>{selectedBranchDetail.sentiment.neutralPct}% Neutro</span>
                  <span className="text-rose-700">{selectedBranchDetail.sentiment.negativePct}% Fricción</span>
                </div>
              </div>

              {/* Top Topic & Top Sabores */}
              <div className="space-y-2 pt-1 text-xs">
                <div className="p-3 bg-[#FAF9F5] border border-stone-200 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-stone-400 uppercase">Tópico Dominante</span>
                  <p className="font-bold text-stone-900">{selectedBranchDetail.topTopic}</p>
                </div>

                <div className="p-3 bg-[#FAF9F5] border border-stone-200 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-stone-400 uppercase">Sabores Más Mencionados</span>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {selectedBranchDetail.topFlavorsMentioned.map((f) => (
                      <span key={f} className="text-[11px] font-semibold bg-white border border-stone-200 px-2 py-0.5 rounded-md text-stone-800">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action: Set Global Branch Filter & Navigate */}
              <button
                onClick={() => {
                  if (onSelectPage) onSelectPage("reviews-explorer");
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-[#1B4D3E] hover:bg-[#143D32] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <span>Ver reviews de esta sucursal</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-stone-400">
              Seleccioná una sucursal para ver el diagnóstico detallado.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
