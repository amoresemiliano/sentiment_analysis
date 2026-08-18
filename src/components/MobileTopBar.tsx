import React from "react";
import { NavPage } from "./Sidebar";
import { Filter, Menu, Sparkles } from "lucide-react";
import { GlobalFilters } from "../types";

interface MobileTopBarProps {
  currentPage: NavPage;
  filters: GlobalFilters;
  onOpenMobileMenu: () => void;
  onOpenFilterDrawer: () => void;
}

export const MobileTopBar: React.FC<MobileTopBarProps> = ({
  currentPage,
  filters,
  onOpenMobileMenu,
  onOpenFilterDrawer,
}) => {
  // Count active filters (excluding defaults)
  let activeCount = 0;
  if (filters.brand && filters.brand !== "Todas") activeCount++;
  if (filters.province && filters.province !== "Todas") activeCount++;
  if (filters.city && filters.city !== "Todas") activeCount++;
  if (filters.branch && filters.branch !== "Todas") activeCount++;
  if (filters.flavor && filters.flavor !== "Todos") activeCount++;
  if (filters.source && filters.source !== "Todas") activeCount++;
  if (filters.topic && filters.topic !== "Todos") activeCount++;
  if (filters.sentiment) activeCount++;
  if (filters.dataMode && filters.dataMode !== "all") activeCount++;
  if (filters.searchQuery && filters.searchQuery.trim().length > 0) activeCount++;

  const isAnalyticalPage =
    currentPage !== "home" &&
    currentPage !== "academic-report" &&
    currentPage !== "ai-methodology";

  return (
    <header className="h-14 bg-[#FAF9F5] border-b border-stone-200/90 px-3 flex items-center justify-between z-30 sticky top-0 md:hidden font-['Plus_Jakarta_Sans'] shadow-2xs">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-2 overflow-hidden pr-2">
        <img
          src="/brand/duomo-emblem.svg"
          alt="Duomo Helados"
          className="w-7 h-7 rounded-lg shadow-2xs shrink-0 object-contain"
        />
        <div className="leading-tight truncate">
          <span className="font-bold text-xs text-stone-900 font-['Outfit'] block truncate">
            El Sabor de la IA
          </span>
          <span className="text-[9px] text-[#1B4D3E] font-semibold block truncate">
            en Duomo Helados · 90 suc.
          </span>
        </div>
      </div>

      {/* Action Buttons (Min 44x44px touch targets) */}
      <div className="flex items-center gap-1.5 shrink-0">
        {isAnalyticalPage && (
          <button
            onClick={onOpenFilterDrawer}
            className={`min-w-[44px] min-h-[44px] px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              activeCount > 0
                ? "bg-[#1B4D3E] text-white shadow-2xs"
                : "bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200/90"
            }`}
            aria-label="Abrir filtros"
            title="Abrir filtros"
          >
            <Filter className="w-3.5 h-3.5" />
            <span className="text-xs">Filtros</span>
            {activeCount > 0 && (
              <span className="bg-[#E6A15C] text-[#2C1810] text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </button>
        )}

        <button
          onClick={onOpenMobileMenu}
          className="min-w-[44px] min-h-[44px] p-2 rounded-xl text-stone-700 hover:text-stone-900 hover:bg-stone-200/70 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Abrir menú de navegación"
          title="Menú"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
