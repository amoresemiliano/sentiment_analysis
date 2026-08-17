import React from "react";
import {
  LayoutDashboard,
  MessageSquareText,
  Tags,
  IceCream,
  MapPin,
  Swords,
  BadgePercent,
  FlaskConical,
  Search,
  Cpu,
  GraduationCap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Home,
  Info,
} from "lucide-react";

export type NavPage =
  | "home"
  | "overview"
  | "voice-of-customer"
  | "topics"
  | "products"
  | "geography"
  | "competition"
  | "promotions"
  | "decision-lab"
  | "reviews-explorer"
  | "ai-methodology"
  | "academic-report";

interface SidebarProps {
  currentPage: NavPage;
  onSelectPage: (page: NavPage) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenAboutModal: () => void;
}

interface NavItem {
  id: NavPage;
  label: string;
  category: "Principal" | "Analytics" | "Estrategia" | "Datos & Metodología";
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Inicio / Visión", category: "Principal", icon: Home },
  { id: "overview", label: "Overview Ejecutivo", category: "Principal", icon: LayoutDashboard },
  { id: "voice-of-customer", label: "Voice of Customer", category: "Analytics", icon: MessageSquareText },
  { id: "topics", label: "Topic Intelligence", category: "Analytics", icon: Tags },
  { id: "products", label: "Product Intelligence", category: "Analytics", icon: IceCream },
  { id: "geography", label: "Geografía (NEA)", category: "Analytics", icon: MapPin },
  { id: "competition", label: "Competencia", category: "Estrategia", icon: Swords, badge: "Key" },
  { id: "promotions", label: "Promociones", category: "Estrategia", icon: BadgePercent },
  { id: "decision-lab", label: "Decision Lab", category: "Estrategia", icon: FlaskConical, badge: "DSS" },
  { id: "reviews-explorer", label: "Review Explorer", category: "Datos & Metodología", icon: Search },
  { id: "ai-methodology", label: "AI Methodology", category: "Datos & Metodología", icon: Cpu },
  { id: "academic-report", label: "Informe Académico", category: "Datos & Metodología", icon: GraduationCap },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onSelectPage,
  isCollapsed,
  onToggleCollapse,
  onOpenAboutModal,
}) => {
  const categories = ["Principal", "Analytics", "Estrategia", "Datos & Metodología"] as const;

  return (
    <aside
      className={`bg-[#143D32] text-stone-200 flex flex-col border-r border-[#0D2D24] transition-all duration-300 select-none z-30 shrink-0 ${
        isCollapsed ? "w-18" : "w-68"
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-emerald-900/50 bg-[#0E3027]">
        {!isCollapsed ? (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-[#E6A15C] text-[#2C1810] flex items-center justify-center font-black font-['Outfit'] shadow-xs shrink-0">
              D
            </div>
            <div className="leading-tight truncate">
              <span className="font-bold text-sm text-white font-['Outfit'] tracking-wide">
                DUOMO
              </span>
              <span className="text-[10px] block text-emerald-300 font-medium">Consumer Intelligence</span>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 mx-auto rounded-lg bg-[#E6A15C] text-[#2C1810] flex items-center justify-center font-black font-['Outfit'] shadow-xs">
            D
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="p-1 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-800/50 transition-colors hidden md:flex items-center justify-center"
          title={isCollapsed ? "Expandir menú" : "Colapsar menú"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4 text-xs">
        {categories.map((category) => {
          const items = NAV_ITEMS.filter((item) => item.category === category);
          return (
            <div key={category} className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 text-[10px] font-semibold text-emerald-400/70 uppercase tracking-wider mb-1">
                  {category}
                </div>
              )}
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectPage(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all group relative ${
                      isActive
                        ? "bg-emerald-700/80 text-white font-semibold shadow-xs"
                        : "text-emerald-100/80 hover:bg-emerald-900/40 hover:text-white"
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                        isActive ? "text-[#E6A15C]" : "text-emerald-300/80 group-hover:text-white"
                      }`}
                    />
                    {!isCollapsed && (
                      <span className="truncate flex-1 font-['Plus_Jakarta_Sans']">{item.label}</span>
                    )}
                    {!isCollapsed && item.badge && (
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
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Footer / Transparency link */}
      <div className="p-3 border-t border-emerald-900/50 bg-[#0E3027]">
        <button
          onClick={onOpenAboutModal}
          className="w-full flex items-center gap-2.5 p-2 rounded-xl bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-200 hover:text-white transition-colors text-left"
        >
          <Info className="w-4 h-4 text-emerald-400 shrink-0" />
          {!isCollapsed && (
            <div className="text-[11px] leading-tight truncate">
              <span className="font-semibold block text-stone-200">About this prototype</span>
              <span className="text-[10px] text-emerald-400">Datos Reales vs Simulados</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};
