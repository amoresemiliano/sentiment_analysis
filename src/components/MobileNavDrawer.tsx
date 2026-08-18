import React from "react";
import { NavPage, NAV_ITEMS } from "./Sidebar";
import { X, Info, ChevronRight, Sparkles } from "lucide-react";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: NavPage;
  onSelectPage: (page: NavPage) => void;
  onOpenAboutModal: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
  currentPage,
  onSelectPage,
  onOpenAboutModal,
}) => {
  if (!isOpen) return null;

  const categories = ["Principal", "Analytics", "Estrategia", "Datos & Metodología"] as const;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className="relative z-10 w-full max-h-[85vh] bg-[#143D32] text-stone-200 rounded-t-3xl shadow-2xl flex flex-col overflow-hidden font-['Plus_Jakarta_Sans'] border-t border-emerald-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-[#0E3027] border-b border-emerald-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/brand/duomo-emblem.svg"
              alt="Duomo Helados"
              className="w-8 h-8 rounded-lg shadow-sm object-contain"
            />
            <div>
              <div className="font-bold text-sm text-white font-['Outfit']">
                El Sabor de la IA
              </div>
              <div className="text-[10px] text-emerald-300">
                en Duomo Helados · 90 sucursales
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-emerald-800/60 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="overflow-y-auto p-4 space-y-4 max-h-[60vh]">
          {categories.map((category) => {
            const items = NAV_ITEMS.filter((item) => item.category === category);
            return (
              <div key={category} className="space-y-1">
                <div className="px-3 text-[10px] font-bold text-emerald-400/80 uppercase tracking-wider mb-1.5">
                  {category}
                </div>
                <div className="space-y-1">
                  {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectPage(item.id);
                          onClose();
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all min-h-[44px] cursor-pointer ${
                          isActive
                            ? "bg-emerald-700/80 text-white font-semibold shadow-xs"
                            : "text-emerald-100/90 hover:bg-emerald-900/40 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Icon
                            className={`w-4 h-4 shrink-0 ${
                              isActive ? "text-[#E6A15C]" : "text-emerald-300"
                            }`}
                          />
                          <span className="text-xs truncate">{item.label}</span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {item.badge && (
                            <span
                              className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                                item.badge === "Key"
                                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                  : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight
                            className={`w-3.5 h-3.5 ${
                              isActive ? "text-[#E6A15C]" : "text-emerald-500/60"
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer / About link */}
        <div className="p-4 bg-[#0E3027] border-t border-emerald-900/60 flex flex-col gap-2 pb-[max(16px,env(safe-area-inset-bottom))]">
          <button
            onClick={() => {
              onClose();
              onOpenAboutModal();
            }}
            className="w-full min-h-[44px] flex items-center justify-between p-2.5 rounded-xl bg-emerald-900/50 hover:bg-emerald-800/70 text-emerald-200 hover:text-white transition-colors text-xs font-semibold cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Info className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Transparencia & Data Provenance</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
              Piloto Real
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
