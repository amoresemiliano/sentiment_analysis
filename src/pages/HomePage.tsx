import React from "react";
import { NavPage } from "../components/Sidebar";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  Swords,
  Layers,
  GraduationCap,
  ShieldCheck,
  CheckCircle,
  BarChart3,
  Cpu,
} from "lucide-react";

interface HomePageProps {
  onSelectPage: (page: NavPage) => void;
  onOpenAboutModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectPage, onOpenAboutModal }) => {
  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-16 font-['Plus_Jakarta_Sans']">
      {/* Hero Section */}
      <section className="pt-8 sm:pt-12 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4D3E]/10 border border-[#1B4D3E]/20 text-[#1B4D3E] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#1B4D3E]" />
          <span>Inteligencia Artificial para Estrategia Gastronómica</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#112A23] font-['Outfit'] tracking-tight leading-[1.15] max-w-4xl mx-auto">
          De opiniones a <span className="text-[#1B4D3E] underline decoration-[#E6A15C]/60 decoration-4">decisiones</span>.
        </h1>

        <p className="text-lg sm:text-xl text-stone-600 font-medium max-w-2xl mx-auto leading-relaxed">
          Transformamos la voz digital del consumidor en señales de negocio para producto, marketing y operaciones.
        </p>

        <p className="text-sm text-stone-500 max-w-xl mx-auto italic font-['Newsreader']">
          “Duomo sabe con precisión cuánto vende y produce. Ahora también puede entender, a escala continua, qué piensan sus clientes y por qué.”
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onSelectPage("overview")}
            className="px-6 py-3.5 rounded-xl bg-[#1B4D3E] hover:bg-[#143D32] text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 group cursor-pointer"
          >
            <span>Explorar Consumer Intelligence</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => onSelectPage("ai-methodology")}
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-stone-100/80 text-stone-700 font-semibold text-sm border border-stone-300 transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Cpu className="w-4 h-4 text-stone-500" />
            <span>Ver Metodología AI</span>
          </button>
        </div>
      </section>

      {/* Brand Positioning Spectrum */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">
            Hipótesis de Mercado & Percepción Digital
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-['Outfit']">
            El Triángulo Competitivo en el Litoral (NEA)
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto">
            ¿Cómo se ubica Helados Duomo frente a Grido y Cremolatti en las conversaciones de los clientes?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Duomo */}
          <div className="bg-[#FAF9F5] border-2 border-[#1B4D3E] rounded-xl p-5 relative flex flex-col justify-between shadow-xs">
            <div className="absolute -top-3 left-4 bg-[#1B4D3E] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Nuestra Marca
            </div>
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#1B4D3E] font-['Outfit']">DUOMO</h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Sweet Spot
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Fuerte arraigo identitario misionero y regional. Alta cremosidad y valor percibido.
              </p>
              <div className="space-y-1.5 pt-2 border-t border-stone-200 text-xs">
                <div className="flex justify-between text-stone-700 font-medium">
                  <span>Percepción Producto:</span>
                  <span className="font-bold text-emerald-700">86 / 100</span>
                </div>
                <div className="flex justify-between text-stone-700 font-medium">
                  <span>Percepción Precio:</span>
                  <span className="font-bold text-emerald-700">+54 / 100</span>
                </div>
                <div className="flex justify-between text-stone-700 font-medium">
                  <span>Fricción Principal:</span>
                  <span className="text-amber-700 font-semibold">Stock & Filas pico</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onSelectPage("competition")}
              className="mt-4 text-xs font-semibold text-[#1B4D3E] hover:underline flex items-center gap-1"
            >
              Ver análisis competitivo <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Grido */}
          <div className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-5 flex flex-col justify-between hover:border-blue-300 transition-colors shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-blue-800 font-['Outfit']">GRIDO</h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  Accesibilidad
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Dominio masivo en precio, promociones de Club Grido y cobertura familiar.
              </p>
              <div className="space-y-1.5 pt-2 border-t border-stone-200 text-xs">
                <div className="flex justify-between text-stone-700 font-medium">
                  <span>Percepción Producto:</span>
                  <span className="font-bold text-stone-600">28 / 100</span>
                </div>
                <div className="flex justify-between text-stone-700 font-medium">
                  <span>Percepción Precio:</span>
                  <span className="font-bold text-blue-700">+84 / 100</span>
                </div>
                <div className="flex justify-between text-stone-700 font-medium">
                  <span>Fricción Principal:</span>
                  <span className="text-rose-700 font-semibold">Gusto artificial / Grasa</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onSelectPage("competition")}
              className="mt-4 text-xs font-semibold text-blue-700 hover:underline flex items-center gap-1"
            >
              Ver contraste con Grido <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Cremolatti */}
          <div className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-5 flex flex-col justify-between hover:border-rose-300 transition-colors shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-rose-900 font-['Outfit']">CREMOLATTI</h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                  Gourmet Premium
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Estilo italiano tradicional y ambientación elegante, pero alta fricción de precio en el NEA.
              </p>
              <div className="space-y-1.5 pt-2 border-t border-stone-200 text-xs">
                <div className="flex justify-between text-stone-700 font-medium">
                  <span>Percepción Producto:</span>
                  <span className="font-bold text-emerald-700">89 / 100</span>
                </div>
                <div className="flex justify-between text-stone-700 font-medium">
                  <span>Percepción Precio:</span>
                  <span className="font-bold text-rose-700">-38 / 100</span>
                </div>
                <div className="flex justify-between text-stone-700 font-medium">
                  <span>Fricción Principal:</span>
                  <span className="text-rose-700 font-semibold">Precio por kilo elevado</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onSelectPage("competition")}
              className="mt-4 text-xs font-semibold text-rose-800 hover:underline flex items-center gap-1"
            >
              Ver contraste con Cremolatti <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* DSS Pipeline Concept */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-lg bg-emerald-100 text-[#1B4D3E] flex items-center justify-center font-bold text-sm">
            1
          </div>
          <h4 className="font-bold text-stone-900 text-sm">Escucha Digital</h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Ingesta continua de reseñas en Google Maps, comentarios en Instagram, Facebook y TikTok.
          </p>
        </div>

        <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-lg bg-emerald-100 text-[#1B4D3E] flex items-center justify-center font-bold text-sm">
            2
          </div>
          <h4 className="font-bold text-stone-900 text-sm">Aspect-Based NLP</h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Descomposición de cada opinión en aspectos específicos (Sabor, Atención, Stock, Medios de Pago).
          </p>
        </div>

        <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-lg bg-emerald-100 text-[#1B4D3E] flex items-center justify-center font-bold text-sm">
            3
          </div>
          <h4 className="font-bold text-stone-900 text-sm">Señales & Evidencia</h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Identificación de fricciones operativas y validación empírica de lanzamientos como Chocolate Dubai.
          </p>
        </div>

        <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-lg bg-emerald-100 text-[#1B4D3E] flex items-center justify-center font-bold text-sm">
            4
          </div>
          <h4 className="font-bold text-stone-900 text-sm">Decision Support</h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Soporte estructurado para Marketing y Gerencia sin automatizaciones ciegas.
          </p>
        </div>
      </section>

      {/* Academic Context Banner */}
      <section className="bg-stone-100/90 border border-stone-300/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white border border-stone-300 flex items-center justify-center text-stone-800 shrink-0 shadow-xs">
            <GraduationCap className="w-6 h-6 text-[#1B4D3E]" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#1B4D3E] uppercase tracking-wider">
              Trabajo Práctico · AI for Business
            </div>
            <h3 className="text-base font-bold text-stone-900">
              Master in Business & Technology (Universidad de San Andrés)
            </h3>
            <p className="text-xs text-stone-600">
              Caso de estudio aplicado sobre Helados Duomo (Posadas, Misiones y Litoral Argentino).
            </p>
          </div>
        </div>

        <button
          onClick={() => onSelectPage("academic-report")}
          className="px-4 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-800 text-xs font-bold border border-stone-300 shadow-xs transition-colors shrink-0"
        >
          Leer Informe Académico
        </button>
      </section>
    </div>
  );
};
