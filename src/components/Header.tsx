import React from "react";
import { NavPage, NAV_ITEMS } from "./Sidebar";
import { Sparkles, Menu, Info, Search, GraduationCap } from "lucide-react";

interface HeaderProps {
  currentPage: NavPage;
  onSelectPage: (page: NavPage) => void;
  onToggleMobileMenu: () => void;
  onOpenAboutModal: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onSelectPage,
  onToggleMobileMenu,
  onOpenAboutModal,
  searchQuery,
  onSearchChange,
}) => {
  const currentItem = NAV_ITEMS.find((item) => item.id === currentPage);

  return (
    <header className="h-16 bg-[#FAF9F5] border-b border-stone-200/90 px-4 sm:px-6 flex items-center justify-between gap-4 z-20 shrink-0 font-['Plus_Jakarta_Sans']">
      {/* Left: Mobile trigger & Page title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 md:hidden transition-colors"
          aria-label="Abrir menú"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="text-stone-400 font-medium text-xs hidden sm:inline">
            Duomo Consumer Intelligence /
          </div>
          <h1 className="text-base sm:text-lg font-bold text-stone-900 font-['Outfit'] tracking-tight">
            {currentItem?.label || "Consumer Intelligence"}
          </h1>
        </div>
      </div>

      {/* Center/Right: Badges & Quick Search & Info */}
      <div className="flex items-center gap-3">
        {/* Quick Search */}
        <div className="relative hidden lg:block w-64">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por sabor, sucursal, queja..."
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
              if (currentPage !== "reviews-explorer" && e.target.value.trim().length > 0) {
                onSelectPage("reviews-explorer");
              }
            }}
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#1B4D3E] focus:ring-1 focus:ring-[#1B4D3E]/20 transition-all shadow-2xs"
          />
        </div>

        {/* Prototype Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-[#14532D] border border-emerald-200/80 text-[11px] font-semibold">
          <Sparkles className="w-3 h-3 text-[#15803D]" />
          <span>AI Business Intelligence Prototype</span>
        </div>

        {/* Academic Badge */}
        <button
          onClick={() => onSelectPage("academic-report")}
          className="hidden xl:flex items-center gap-1 px-2 py-1 rounded-lg bg-stone-100 hover:bg-stone-200/80 text-stone-700 border border-stone-200 text-[11px] font-medium transition-colors"
          title="Ver entrega académica para Universidad de San Andrés"
        >
          <GraduationCap className="w-3.5 h-3.5 text-stone-500" />
          <span>UdeSA · MBT</span>
        </button>

        {/* Info button */}
        <button
          onClick={onOpenAboutModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold border border-stone-200/80 transition-colors shadow-2xs"
        >
          <Info className="w-3.5 h-3.5 text-[#1B4D3E]" />
          <span className="hidden md:inline">Transparencia</span>
        </button>
      </div>
    </header>
  );
};
