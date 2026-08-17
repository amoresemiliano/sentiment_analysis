import React, { useState } from "react";
import { FilterState } from "../types";
import {
  MessageSquareText,
  ThumbsUp,
  ThumbsDown,
  Layers,
  BarChart2,
  PieChart as PieIcon,
  HelpCircle,
  ArrowUpRight,
  ArrowDownRight,
  Smartphone,
  Globe,
  Instagram,
  Facebook,
  Video,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  PieChart,
  Pie,
} from "recharts";

interface VoiceOfCustomerPageProps {
  filters: FilterState;
}

const ASPECT_MATRIX = [
  { aspect: "Sabor y Receta", score: 88, positivePct: 91, neutralPct: 6, negativePct: 3, volume: 486 },
  { aspect: "Calidad y Textura", score: 82, positivePct: 88, neutralPct: 7, negativePct: 5, volume: 412 },
  { aspect: "Ambiente e Infraestructura", score: 68, positivePct: 78, neutralPct: 14, negativePct: 8, volume: 145 },
  { aspect: "Atención al Cliente", score: 41, positivePct: 64, neutralPct: 18, negativePct: 18, volume: 342 },
  { aspect: "Promociones y Ofertas", score: 35, positivePct: 60, neutralPct: 24, negativePct: 16, volume: 156 },
  { aspect: "Precio y Accesibilidad", score: 18, positivePct: 52, neutralPct: 26, negativePct: 22, volume: 298 },
  { aspect: "Medios de Pago y Cobro", score: -12, positivePct: 38, neutralPct: 24, negativePct: 38, volume: 118 },
  { aspect: "Disponibilidad y Stock", score: -22, positivePct: 32, neutralPct: 16, negativePct: 52, volume: 194 },
  { aspect: "Delivery y Terceros", score: -32, positivePct: 28, neutralPct: 18, negativePct: 54, volume: 92 },
  { aspect: "Tiempos de Espera (Filas)", score: -46, positivePct: 18, neutralPct: 16, negativePct: 66, volume: 162 },
];

const POSITIVE_DRIVERS = [
  {
    title: "Cremosidad e Intensidad de Sabor",
    weight: "34% del sentimiento favorable",
    highlight: "Sambayón tradicional, Dulce de Leche Duomo con nueces y Pistacho son los mayores generadores de deleite.",
    sample: "“Insuperable la textura y la generosidad de los ingredientes reales.”",
  },
  {
    title: "Remodelación de Salones y Climatización",
    weight: "22% del sentimiento favorable",
    highlight: "Locales nuevos y renovados (Bolívar, Formosa, Costanera) generan alta percepción de valor.",
    sample: "“El local quedó hermoso, moderno y con aire bien frío para el calor.”",
  },
  {
    title: "Relación Precio / Calidad Regional",
    weight: "19% del sentimiento favorable",
    highlight: "Se percibe como una marca cercana y justa en precio sin resignar calidad artesanal.",
    sample: "“Cuesta mucho menos que las cadenas porteñas y el helado es superior.”",
  },
];

const NEGATIVE_DRIVERS = [
  {
    title: "Filas y Tiempos de Espera en Horas Pico",
    weight: "41% de las alertas de fricción",
    highlight: "Fines de semana después de las 20:30 hs con colas de hasta 40 minutos en sucursales centrales.",
    severity: "Crítica",
    sample: "“Una sola chica en caja con la fila saliendo a la vereda un domingo.”",
  },
  {
    title: "Quiebre de Stock en Sabores de Alta Demanda",
    weight: "29% de las alertas de fricción",
    highlight: "Pistacho y Chocolate Dubai se agotan antes del cierre en Corrientes y Resistencia.",
    severity: "Moderada",
    sample: "“Fuimos especialmente por el Pistacho y ya no tenían stock.”",
  },
  {
    title: "Fallas de Cobro y Posnet en Turno Noche",
    weight: "18% de las alertas de fricción",
    highlight: "Caídas de conexión en billeteras virtuales y falta de cambio en efectivo.",
    severity: "Operativa",
    sample: "“No me tomaron Mercado Pago por falta de internet y no tenían cambio.”",
  },
];

const SOURCES_DATA = [
  { name: "Google Reviews", volume: 642, share: 50.0, sentiment: 76, icon: Globe, highlight: "Canal primario de feedback por sucursal física." },
  { name: "Instagram", volume: 348, share: 27.1, sentiment: 84, icon: Instagram, highlight: "Canal visual con alta interacción en lanzamientos de sabor." },
  { name: "Facebook", volume: 165, share: 12.8, sentiment: 62, icon: Facebook, highlight: "Público familiar; concentra consultas de promociones y delivery." },
  { name: "TikTok", volume: 89, share: 6.9, sentiment: 91, icon: Video, highlight: "Viralidad y reseñas espontáneas de público joven." },
  { name: "Otros Canales", volume: 40, share: 3.2, sentiment: 70, icon: Smartphone, highlight: "Foros locales y menciones en medios de prensa." },
];

export const VoiceOfCustomerPage: React.FC<VoiceOfCustomerPageProps> = ({ filters }) => {
  const [activeTab, setActiveTab] = useState<"matrix" | "drivers" | "sources">("matrix");

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-['Plus_Jakarta_Sans']">
      {/* Header */}
      <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-[#112A23] font-['Outfit']">
              ¿Qué está diciendo la gente?
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Aspect-Based Sentiment Analysis (ABSA)
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Descomposición granular de las opiniones en aspectos específicos: producto, servicio, operaciones y precio.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-semibold self-start md:self-auto">
          <button
            onClick={() => setActiveTab("matrix")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === "matrix" ? "bg-white text-stone-900 shadow-2xs" : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Matriz de Aspectos
          </button>
          <button
            onClick={() => setActiveTab("drivers")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === "drivers" ? "bg-white text-stone-900 shadow-2xs" : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Drivers & Fricciones
          </button>
          <button
            onClick={() => setActiveTab("sources")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === "sources" ? "bg-white text-stone-900 shadow-2xs" : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Por Canal / Fuente
          </button>
        </div>
      </div>

      {/* Explanatory concept card */}
      <div className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-4 text-xs text-stone-700 leading-relaxed flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#1B4D3E] text-white flex items-center justify-center font-bold shrink-0">
          NLP
        </div>
        <div>
          <strong>Principio de Aspect-Based Sentiment Analysis:</strong> Un cliente puede opinar: <em>“El helado es espectacular pero tardamos 35 minutos y no andaba el QR.”</em> El sistema no asigna una sola etiqueta, sino que evalúa independientemente: <strong>Producto (+1.0)</strong>, <strong>Tiempo de espera (-1.0)</strong> y <strong>Medios de pago (-1.0)</strong>.
        </div>
      </div>

      {activeTab === "matrix" && (
        <div className="space-y-6">
          {/* Visual Matrix Table */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-stone-900 text-base font-['Outfit']">
                  Aspect Sentiment Matrix (Score Neto -100 a +100)
                </h3>
                <p className="text-xs text-stone-500">
                  Calculado como: % Menciones Positivas − % Menciones Negativas por aspecto analizado.
                </p>
              </div>
              <span className="text-[10px] font-bold text-stone-500 uppercase">Muestra: 1,284 opiniones</span>
            </div>

            <div className="space-y-3 pt-2">
              {ASPECT_MATRIX.map((item) => {
                const isPositive = item.score > 0;
                return (
                  <div
                    key={item.aspect}
                    className="p-3.5 rounded-xl border border-stone-200/80 hover:border-stone-300 bg-[#FAF9F5]/50 transition-all space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900">{item.aspect}</span>
                        <span className="text-[10px] text-stone-500 font-medium">({item.volume} menciones)</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold">
                          <span className="text-emerald-700">{item.positivePct}% pos</span>
                          <span className="text-stone-400">·</span>
                          <span className="text-stone-500">{item.neutralPct}% neu</span>
                          <span className="text-stone-400">·</span>
                          <span className="text-rose-700">{item.negativePct}% neg</span>
                        </div>
                        <span
                          className={`font-black text-xs px-2 py-0.5 rounded ${
                            isPositive
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : "bg-rose-100 text-rose-800 border border-rose-200"
                          }`}
                        >
                          {isPositive ? `+${item.score}` : item.score}
                        </span>
                      </div>
                    </div>

                    {/* Visual bar */}
                    <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden flex">
                      <div style={{ width: `${item.positivePct}%` }} className="bg-emerald-600 h-full" />
                      <div style={{ width: `${item.neutralPct}%` }} className="bg-stone-400 h-full" />
                      <div style={{ width: `${item.negativePct}%` }} className="bg-rose-500 h-full" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === "drivers" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Positive Drivers */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-emerald-800">
              <ThumbsUp className="w-5 h-5" />
              <h3 className="font-bold text-stone-900 text-base font-['Outfit']">
                Principales Drivers de Sentimiento Positivo
              </h3>
            </div>

            <div className="space-y-4">
              {POSITIVE_DRIVERS.map((item, idx) => (
                <div key={idx} className="p-4 bg-emerald-50/50 border border-emerald-200/70 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-950">{item.title}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {item.weight}
                    </span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">{item.highlight}</p>
                  <p className="text-xs text-stone-500 italic font-['Newsreader']">{item.sample}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Negative Drivers */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-rose-800">
              <ThumbsDown className="w-5 h-5" />
              <h3 className="font-bold text-stone-900 text-base font-['Outfit']">
                Principales Drivers de Fricción / Negativos
              </h3>
            </div>

            <div className="space-y-4">
              {NEGATIVE_DRIVERS.map((item, idx) => (
                <div key={idx} className="p-4 bg-rose-50/50 border border-rose-200/70 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-rose-950">{item.title}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        item.severity === "Crítica"
                          ? "bg-rose-200 text-rose-900 border border-rose-300"
                          : "bg-amber-100 text-amber-900 border border-amber-200"
                      }`}
                    >
                      Severidad {item.severity}
                    </span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">{item.highlight}</p>
                  <p className="text-xs text-stone-500 italic font-['Newsreader']">{item.sample}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "sources" && (
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-5">
          <div>
            <h3 className="font-bold text-stone-900 text-base font-['Outfit']">
              Distribución y Desempeño por Canal Digital
            </h3>
            <p className="text-xs text-stone-500">
              Comparativa de volumen, favorabilidad y comportamiento del consumidor según la plataforma de origen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SOURCES_DATA.map((src) => {
              const Icon = src.icon;
              return (
                <div key={src.name} className="p-4 bg-[#FAF9F5] border border-stone-200 rounded-xl space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#1B4D3E] text-white flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-900 text-xs">{src.name}</h4>
                        <span className="text-[10px] text-stone-500">{src.volume} opiniones</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      {src.sentiment}% Positivo
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-stone-600 font-medium">
                      <span>Cuota del canal:</span>
                      <span className="font-bold">{src.share}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                      <div style={{ width: `${src.share * 2}%` }} className="h-full bg-[#1B4D3E]" />
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 pt-1 leading-relaxed">{src.highlight}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
