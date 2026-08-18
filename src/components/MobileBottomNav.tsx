import React from "react";
import { NavPage } from "./Sidebar";
import {
  LayoutDashboard,
  MessageSquareText,
  Tags,
  Search,
  Grid,
} from "lucide-react";

interface MobileBottomNavProps {
  currentPage: NavPage;
  onSelectPage: (page: NavPage) => void;
  onOpenMoreMenu: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onSelectPage,
  onOpenMoreMenu,
}) => {
  const navItems = [
    { id: "overview" as NavPage, label: "Overview", icon: LayoutDashboard },
    { id: "voice-of-customer" as NavPage, label: "VoC", icon: MessageSquareText },
    { id: "topics" as NavPage, label: "Topics", icon: Tags },
    { id: "reviews-explorer" as NavPage, label: "Reviews", icon: Search },
  ];

  const isMoreActive = !navItems.some((item) => item.id === currentPage);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#143D32] border-t border-[#0D2D24] text-stone-200 shadow-xl md:hidden font-['Plus_Jakarta_Sans'] pb-[env(safe-area-inset-bottom,0px)]"
      aria-label="Navegación móvil"
    >
      <div className="grid grid-cols-5 h-15 items-center justify-around px-1 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectPage(item.id)}
              className={`flex flex-col items-center justify-center h-full min-h-[48px] py-1 transition-all group cursor-pointer ${
                isActive ? "text-[#E6A15C]" : "text-emerald-200/70 hover:text-white"
              }`}
              aria-label={item.label}
            >
              <div
                className={`p-1 rounded-lg transition-colors ${
                  isActive ? "bg-emerald-800/80" : "group-hover:bg-emerald-900/40"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span
                className={`text-[10px] font-medium tracking-tight mt-0.5 ${
                  isActive ? "font-bold text-[#E6A15C]" : "text-emerald-200/80"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}

        {/* 5. "Más" button */}
        <button
          onClick={onOpenMoreMenu}
          className={`flex flex-col items-center justify-center h-full min-h-[48px] py-1 transition-all group cursor-pointer ${
            isMoreActive ? "text-[#E6A15C]" : "text-emerald-200/70 hover:text-white"
          }`}
          aria-label="Más secciones"
        >
          <div
            className={`p-1 rounded-lg transition-colors ${
              isMoreActive ? "bg-emerald-800/80" : "group-hover:bg-emerald-900/40"
            }`}
          >
            <Grid className="w-4 h-4" />
          </div>
          <span
            className={`text-[10px] font-medium tracking-tight mt-0.5 ${
              isMoreActive ? "font-bold text-[#E6A15C]" : "text-emerald-200/80"
            }`}
          >
            Más
          </span>
        </button>
      </div>
    </nav>
  );
};
