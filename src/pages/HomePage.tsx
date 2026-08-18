import React from "react";
import { NavPage } from "../components/Sidebar";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Store,
  MessageSquare,
  ShieldCheck,
  Zap,
  Target,
  BarChart3,
  Layers,
  GraduationCap,
  ChevronRight,
  Award,
  CheckCircle2,
} from "lucide-react";

interface HomePageProps {
  onSelectPage: (page: NavPage) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectPage }) => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 font-['Plus_Jakarta_Sans']">
      {/* Hero Section */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xs relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-50/60 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-50/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#1B4D3E]" />
              <span>AI CONSUMER INTELLIGENCE · HELADOS DUOMO</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-bold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>PILOTO REAL: 15 SUCURSALES / 104 REVIEWS</span>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-1">
            <img
              src="/brand/duomo-logo.svg"
              alt="Duomo Helados"
              className="h-12 sm:h-14 w-auto object-contain shrink-0"
            />
            <div className="h-10 w-px bg-stone-200 hidden sm:block" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#112A23] font-['Outfit'] tracking-tight leading-[1.15]">
              El Sabor de la IA <br className="hidden sm:inline" />
              <span className="text-[#1B4D3E] text-xl sm:text-2xl font-bold">en Duomo Helados</span>
            </h1>
          </div>

          <p className="text-lg sm:text-xl font-semibold text-stone-800 leading-snug">
            Transformamos la voz digital del consumidor en señales de negocio para producto, marketing y operaciones.
          </p>

          <blockquote className="border-l-4 border-[#E6A15C] pl-4 py-1 text-sm sm:text-base text-stone-600 italic font-['Newsreader'] leading-relaxed bg-[#FAF9F5] rounded-r-xl pr-4">
            “Duomo sabe con precisión cuánto vende y produce. Ahora también puede entender, a escala continua, qué piensan sus clientes y por qué.”
          </blockquote>

          {/* Core Stat Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 bg-[#FAF9F5] border border-stone-200 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-stone-500 block">Red Territorial</span>
              <span className="text-xl font-extrabold text-[#112A23] font-['Outfit']">90 sucursales</span>
              <span className="text-[10px] text-stone-500 block">Misiones, Ctes, Chaco, Formosa</span>
            </div>
            <div className="p-3 bg-[#FAF9F5] border border-stone-200 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-stone-500 block">Corpus Analítico</span>
              <span className="text-xl font-extrabold text-[#1B4D3E] font-['Outfit']">2,884 opiniones</span>
              <span className="text-[10px] text-stone-500 block">Google, IG, FB, TikTok</span>
            </div>
            <div className="p-3 bg-[#FAF9F5] border border-stone-200 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-stone-500 block">Net Sentiment</span>
              <span className="text-xl font-extrabold text-emerald-700 font-['Outfit']">+68.4 pts</span>
              <span className="text-[10px] text-stone-500 block">Frente a +36 Grido / +52 Crem.</span>
            </div>
            <div className="p-3 bg-[#FAF9F5] border border-stone-200 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-stone-500 block">Framework AI</span>
              <span className="text-xl font-extrabold text-stone-800 font-['Outfit']">ABSA + NER</span>
              <span className="text-[10px] text-stone-500 block">Topic Modeling & DSS</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelectPage("overview")}
              className="inline-flex items-center gap-2 bg-[#1B4D3E] hover:bg-[#143D32] text-white px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <span>Explorar Overview Ejecutivo</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onSelectPage("products")}
              className="inline-flex items-center gap-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer"
            >
              <span>Flavor Intelligence</span>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>

            <button
              onClick={() => onSelectPage("reviews-explorer")}
              className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer"
            >
              <span>Explorador de Reviews</span>
            </button>
          </div>
        </div>
      </div>

      {/* Connected Architecture Flow */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/70 pb-4">
          <div>
            <h2 className="text-xl font-bold text-stone-900 font-['Outfit']">
              La Cadena de Consumer Intelligence Conectada
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Navegación jerárquica y reactiva desde la marca hasta las opiniones que sustentan cada señal de negocio.
            </p>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg self-start sm:self-auto">
            7 Niveles de Drill-Down
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-center">
          {[
            { step: "1. Marca", desc: "Duomo / Grido / Crem.", page: "competition" as NavPage },
            { step: "2. Provincia", desc: "4 Provincias NEA", page: "geography" as NavPage },
            { step: "3. Ciudad", desc: "Posadas, Ctes, etc.", page: "geography" as NavPage },
            { step: "4. Sucursal", desc: "90 sucursales", page: "geography" as NavPage },
            { step: "5. Sabor", desc: "Dubai, Pistacho...", page: "products" as NavPage },
            { step: "6. Tópico", desc: "Stock, Atención...", page: "topics" as NavPage },
            { step: "7. Reviews", desc: "Verbatims con URL", page: "reviews-explorer" as NavPage },
          ].map((item, idx) => (
            <button
              key={item.step}
              onClick={() => onSelectPage(item.page)}
              className="p-3 bg-[#FAF9F5] border border-stone-200 rounded-xl hover:border-[#1B4D3E] hover:bg-emerald-50/40 transition-all text-left group cursor-pointer"
            >
              <div className="text-[10px] font-bold text-[#1B4D3E] uppercase tracking-wider">{item.step}</div>
              <div className="text-xs font-extrabold text-stone-900 font-['Outfit'] mt-1 truncate">{item.desc}</div>
              <div className="text-[10px] text-stone-400 group-hover:text-[#1B4D3E] flex items-center gap-0.5 mt-2">
                <span>Ver vista</span>
                <ChevronRight className="w-2.5 h-2.5" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 3 Executive Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#1B4D3E] flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-stone-900 text-base font-['Outfit']">
            Monitoreo en Tiempo Casi Real
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Detección temprana de quiebres de stock nocturnos, fallas en posnets o variaciones en la atención antes de que impacten en la venta del mes.
          </p>
          <button
            onClick={() => onSelectPage("voice-of-customer")}
            className="text-xs font-semibold text-[#1B4D3E] hover:underline flex items-center gap-1 pt-1 cursor-pointer"
          >
            <span>Ver Voice of Customer</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-stone-900 text-base font-['Outfit']">
            Flavor & Launch Intelligence
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Evaluación continua del rendimiento sensorial y operativo de nuevos lanzamientos como Chocolate Dubai frente a clásicos regionales consolidados.
          </p>
          <button
            onClick={() => onSelectPage("products")}
            className="text-xs font-semibold text-amber-900 hover:underline flex items-center gap-1 pt-1 cursor-pointer"
          >
            <span>Ver Flavor Intelligence</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-stone-900 text-base font-['Outfit']">
            Decision Support System (DSS)
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Cruce de 4 dimensiones objetivas (ventas, satisfacción, operaciones y competencia) para respaldar decisiones de carta y marketing sin automatismos ciegos.
          </p>
          <button
            onClick={() => onSelectPage("decision-lab")}
            className="text-xs font-semibold text-blue-900 hover:underline flex items-center gap-1 pt-1 cursor-pointer"
          >
            <span>Ver Decision Lab</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Academic Note Footer */}
      <div className="p-4 bg-stone-100 border border-stone-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-600">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-stone-500 shrink-0" />
          <span>
            Desarrollado para el Trabajo Práctico de <strong>AI for Business — Universidad de San Andrés (UdeSA)</strong>.
          </span>
        </div>
        <button
          onClick={() => onSelectPage("academic-report")}
          className="font-bold text-[#1B4D3E] hover:underline shrink-0 cursor-pointer"
        >
          Leer Paper Académico →
        </button>
      </div>
    </div>
  );
};
