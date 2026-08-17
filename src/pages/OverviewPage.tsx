import React from "react";
import { NavPage } from "../components/Sidebar";
import { FilterState } from "../types";
import {
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  ArrowRight,
  TrendingDown,
  Info,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

interface OverviewPageProps {
  filters: FilterState;
  onSelectPage: (page: NavPage) => void;
}

const TREND_DATA = [
  { month: "Nov 23", positive: 71, neutral: 19, negative: 10 },
  { month: "Dic 23", positive: 73, neutral: 18, negative: 9 },
  { month: "Ene 24", positive: 70, neutral: 20, negative: 10 },
  { month: "Feb 24", positive: 74, neutral: 17, negative: 9 },
  { month: "Mar 24", positive: 78, neutral: 15, negative: 7 },
  { month: "Abr 24", positive: 76, neutral: 16, negative: 8 },
];

const TOPIC_SHARE_DATA = [
  { name: "Sabor & Calidad", share: 38, sentiment: 84 },
  { name: "Atención al Cliente", share: 27, sentiment: 42 },
  { name: "Precio / Valor", share: 23, sentiment: 28 },
  { name: "Disponibilidad / Stock", share: 15, sentiment: -38 },
  { name: "Chocolate Dubai", share: 14, sentiment: 92 },
  { name: "Tiempos de Espera", share: 13, sentiment: -46 },
  { name: "Ambiente & Salón", share: 11, sentiment: 68 },
];

export const OverviewPage: React.FC<OverviewPageProps> = ({ filters, onSelectPage }) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-['Plus_Jakarta_Sans']">
      {/* Hero Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#112A23] font-['Outfit'] tracking-tight">
              Consumer Pulse
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
              Live Signals
            </span>
          </div>
          <p className="text-sm text-stone-600 mt-1">
            Lo que nuestros clientes están diciendo en el NEA, convertido en señales accionables de negocio.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectPage("decision-lab")}
            className="px-4 py-2 rounded-xl bg-[#1B4D3E] hover:bg-[#143D32] text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5"
          >
            <span>Ir a Decision Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Analyzed */}
        <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-xs">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
            Opiniones Analizadas
          </div>
          <div className="text-2xl font-extrabold text-stone-900 font-['Outfit'] mt-1">1,284</div>
          <div className="text-[10px] text-emerald-700 font-medium flex items-center gap-0.5 mt-1">
            <ArrowUpRight className="w-3 h-3" /> +14% vs trimestre anterior
          </div>
        </div>

        {/* Positive */}
        <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-xl shadow-xs">
          <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
            Sentimiento Positivo
          </div>
          <div className="text-2xl font-extrabold text-emerald-900 font-['Outfit'] mt-1">74%</div>
          <div className="text-[10px] text-emerald-700 font-medium mt-1">950 menciones favorables</div>
        </div>

        {/* Neutral */}
        <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl shadow-xs">
          <div className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider">
            Sentimiento Neutro
          </div>
          <div className="text-2xl font-extrabold text-stone-800 font-['Outfit'] mt-1">17%</div>
          <div className="text-[10px] text-stone-500 font-medium mt-1">218 opiniones mixtas</div>
        </div>

        {/* Negative */}
        <div className="p-4 bg-rose-50/70 border border-rose-200/80 rounded-xl shadow-xs">
          <div className="text-[11px] font-semibold text-rose-800 uppercase tracking-wider">
            Sentimiento Negativo
          </div>
          <div className="text-2xl font-extrabold text-rose-900 font-['Outfit'] mt-1">9%</div>
          <div className="text-[10px] text-rose-700 font-medium mt-1">116 alertas de fricción</div>
        </div>

        {/* Top Topic */}
        <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-xs">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
            Tópico Líder
          </div>
          <div className="text-sm font-bold text-[#1B4D3E] font-['Outfit'] mt-1 truncate">
            Sabor y Cremocidad
          </div>
          <div className="text-[10px] text-stone-600 mt-1 font-medium">Score Neto: +84 / 100</div>
        </div>

        {/* Attention */}
        <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl shadow-xs">
          <div className="text-[11px] font-semibold text-amber-900 uppercase tracking-wider">
            Requiere Atención
          </div>
          <div className="text-sm font-bold text-amber-950 font-['Outfit'] mt-1 truncate">
            Quiebre de Stock
          </div>
          <div className="text-[10px] text-amber-800 mt-1 font-medium">↑ 24.5% menciones</div>
        </div>
      </div>

      {/* Executive Narrative Insight Block */}
      <div className="bg-[#FAF9F5] border border-stone-300/80 rounded-2xl p-5 shadow-xs relative overflow-hidden">
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-[#1B4D3E] text-emerald-200 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
            <Sparkles className="w-5 h-5 text-[#E6A15C]" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-bold text-stone-900 text-sm font-['Outfit'] tracking-wide">
                Executive Synthesis · Síntesis Ejecutiva de la Voz del Consumidor
              </h3>
              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/90 border border-emerald-200 px-2 py-0.5 rounded">
                AI-generated insight · prototype
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              <strong>Producto y sabor</strong> mantienen una percepción unánimemente favorable en todas las provincias (+86 score neto). El lanzamiento de <em>Chocolate Dubai</em> generó un salto del 48% en volumen orgánico sin canibalizar sabores tradicionales. No obstante, se detectan dos tensiones operativas críticas: <strong>tiempos de espera</strong> en sucursales de alta rotación (Posadas Bolívar, Corrientes Junín) y <strong>quiebre de disponibilidad de pistacho</strong> en horarios nocturnos.
            </p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sentiment Trend */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-stone-900 text-base font-['Outfit']">
                Evolución Temporal del Sentimiento
              </h3>
              <p className="text-xs text-stone-500">Tendencia mensual de distribución de opiniones (% del total)</p>
            </div>
            <span className="text-[10px] font-medium text-stone-500 bg-stone-100 px-2 py-1 rounded">
              Semestral
            </span>
          </div>

          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  formatter={(value: any, name: any) => [`${value}%`, name === "positive" ? "Positivo" : name === "neutral" ? "Neutro" : "Negativo"]}
                  contentStyle={{ backgroundColor: "#FAF9F5", borderColor: "#e2e8f0", borderRadius: "12px", fontSize: "12px" }}
                />
                <Legend
                  formatter={(value) => (value === "positive" ? "Positivo" : value === "neutral" ? "Neutro" : "Negativo")}
                />
                <Line type="monotone" dataKey="positive" stroke="#16A34A" strokeWidth={3} dot={{ r: 4 }} name="positive" />
                <Line type="monotone" dataKey="neutral" stroke="#94A3B8" strokeWidth={2} dot={{ r: 3 }} name="neutral" />
                <Line type="monotone" dataKey="negative" stroke="#E11D48" strokeWidth={2} dot={{ r: 3 }} name="negative" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Topic Share Bar Chart */}
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-stone-900 text-base font-['Outfit']">
                Cuota de Conversación por Tópico
              </h3>
              <p className="text-xs text-stone-500">% de menciones totales en el período</p>
            </div>
            <button
              onClick={() => onSelectPage("topics")}
              className="text-xs font-semibold text-[#1B4D3E] hover:underline"
            >
              Ver todos
            </button>
          </div>

          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={TOPIC_SHARE_DATA}
                margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} unit="%" />
                <YAxis dataKey="name" type="category" stroke="#475569" fontSize={11} width={110} />
                <Tooltip
                  formatter={(val: any) => [`${val}% de las menciones`, "Peso"]}
                  contentStyle={{ backgroundColor: "#FAF9F5", borderColor: "#e2e8f0", borderRadius: "12px", fontSize: "12px" }}
                />
                <Bar dataKey="share" fill="#1B4D3E" radius={[0, 6, 6, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Attention Required / Decision Alerts */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-stone-900 text-base font-['Outfit'] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600" /> Señales que Requieren Atención & Monitoreo
          </h3>
          <span className="text-xs text-stone-500">Actualizado semanalmente</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-xs space-y-2 hover:border-amber-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 uppercase">
                Stock & Logística
              </span>
              <span className="text-xs font-bold text-rose-700 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" /> +24.5%
              </span>
            </div>
            <h4 className="font-bold text-stone-900 text-xs">Aumento en menciones de falta de Pistacho</h4>
            <p className="text-xs text-stone-600">
              Concentrado en Corrientes y Chaco a partir de las 20:30 hs. Señal de demanda superior a provisión.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-xs space-y-2 hover:border-amber-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-900 uppercase">
                Servicio en Sucursal
              </span>
              <span className="text-xs font-bold text-rose-700 flex items-center">
                <ArrowDownRight className="w-3.5 h-3.5" /> -11%
              </span>
            </div>
            <h4 className="font-bold text-stone-900 text-xs">Caída de favorabilidad en Suc. Av. Uruguay</h4>
            <p className="text-xs text-stone-600">
              Comentarios refieren a disparidad de atención y velocidad entre turno mañana y turno noche.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-xs space-y-2 hover:border-emerald-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 uppercase">
                Lanzamiento
              </span>
              <span className="text-xs font-bold text-emerald-700 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" /> +48%
              </span>
            </div>
            <h4 className="font-bold text-stone-900 text-xs">Viralización de Chocolate Dubai</h4>
            <p className="text-xs text-stone-600">
              Score neto de 94/100 con alta recurrencia de pedidos de permanencia definitiva en la carta.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-xs space-y-2 hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 uppercase">
                Medios de Pago
              </span>
              <span className="text-xs font-bold text-stone-700">Fricción</span>
            </div>
            <h4 className="font-bold text-stone-900 text-xs">Inestabilidad de QR en horas pico</h4>
            <p className="text-xs text-stone-600">
              Resistencia y Eldorado reportan demoras por caídas de conectividad posnet en horario nocturno.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
