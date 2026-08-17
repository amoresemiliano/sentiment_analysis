import React, { useState } from "react";
import { PROTOTYPE_EVALUATION } from "../data/prototypeMetrics";
import {
  Cpu,
  Layers,
  Database,
  Search,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  FileCode,
  Network,
  BarChart2,
  Workflow,
  HelpCircle,
} from "lucide-react";

const PIPELINE_STEPS = [
  {
    step: 1,
    title: "Ingesta & Captura Digital",
    short: "REVIEWS",
    desc: "Extracción programática de opiniones públicas desde Google Business Profiles, Instagram, Facebook y TikTok.",
    tech: "APIs Oficiales, Webhooks & Data Connectors",
  },
  {
    step: 2,
    title: "Limpieza & Normalización",
    short: "CLEANING",
    desc: "Desduplicación de reseñas, eliminación de spam publicitario, normalización de emojis y modismos regionales del NEA.",
    tech: "Regex, Language Detection & Text Preprocessing",
  },
  {
    step: 3,
    title: "Extracción de Entidades (NER)",
    short: "ENTITY NER",
    desc: "Identificación de sucursales específicas, sabores (ej. 'Pistacho', 'Chocolate Dubai'), turnos ('noche', 'mañana') y competidores.",
    tech: "Named Entity Recognition fine-tuned para heladería",
  },
  {
    step: 4,
    title: "Vectorización & Embeddings",
    short: "EMBEDDINGS",
    desc: "Conversión de cada opinión a vectores densos de alta dimensionalidad que preservan el significado semántico profundo.",
    tech: "Sentence-BERT / RoBERTa-Spanish / Gemini Embeddings",
  },
  {
    step: 5,
    title: "Sentiment Analysis Global",
    short: "SENTIMENT",
    desc: "Clasificación de polaridad global a nivel oración (Positivo, Neutro, Negativo) con score de confianza probabilístico.",
    tech: "Transformer-based Classifier",
  },
  {
    step: 6,
    title: "Aspect-Based Sentiment (ABSA)",
    short: "ASPECT ABSA",
    desc: "Descomposición multidimensional: asigna sentimientos independientes a Producto, Atención, Tiempos de Espera y Precio.",
    tech: "Dependency Parsing & Aspect-Level Extraction",
  },
  {
    step: 7,
    title: "Modelado de Tópicos (Topic Modeling)",
    short: "TOPIC MODEL",
    desc: "Descubrimiento no supervisado de tópicos latentes y emergentes sin taxonomías rígidas previas.",
    tech: "BERTopic + UMAP + HDBSCAN clustering",
  },
  {
    step: 8,
    title: "Agregación & Detección de Anomalías",
    short: "AGGREGATION",
    desc: "Consolidación territorial por sucursal y provincia; detección estadística de saltos en quejas operativas o tendencias virales.",
    tech: "Time Series & Anomaly Detection Algorithms",
  },
  {
    step: 9,
    title: "Decision Support System (DSS)",
    short: "DECISION LAB",
    desc: "Transformación de métricas en señales estratégicas cualitativas para el comité de Dirección de Helados Duomo.",
    tech: "Decision Matrix & Strategic Evidence Framework",
  },
];

export const AiMethodologyPage: React.FC = () => {
  const [activePipelineStep, setActivePipelineStep] = useState<number>(1);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16 font-['Plus_Jakarta_Sans']">
      {/* Header */}
      <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-[#112A23] font-['Outfit']">
              AI Methodology & NLP Architecture
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
              Pipeline Técnico de IA
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Arquitectura del flujo de procesamiento de lenguaje natural que transforma texto no estructurado en evidencia de negocio.
          </p>
        </div>
      </div>

      {/* 9-Step Interactive Pipeline Diagram */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-6">
        <div>
          <h3 className="font-bold text-stone-900 text-base font-['Outfit'] flex items-center gap-2">
            <Workflow className="w-5 h-5 text-[#1B4D3E]" /> Pipeline de Transformación de Datos: De Reseñas a Decisiones
          </h3>
          <p className="text-xs text-stone-500">
            Haz click en cada fase del pipeline para ver su función técnica, modelos utilizados y salida estructurada.
          </p>
        </div>

        {/* Step Navigation Bar */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-1.5 p-1.5 bg-stone-100 rounded-xl border border-stone-200 text-center">
          {PIPELINE_STEPS.map((s) => {
            const isActive = activePipelineStep === s.step;
            return (
              <button
                key={s.step}
                onClick={() => setActivePipelineStep(s.step)}
                className={`py-2 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#1B4D3E] text-white shadow-xs"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/60"
                }`}
              >
                <div className="text-[9px] opacity-70">Paso {s.step}</div>
                <div className="truncate text-[10px] tracking-tight">{s.short}</div>
              </button>
            );
          })}
        </div>

        {/* Active Step Deep-Dive Card */}
        {(() => {
          const stepData = PIPELINE_STEPS.find((s) => s.step === activePipelineStep) || PIPELINE_STEPS[0];
          return (
            <div className="p-5 bg-[#FAF9F5] border border-stone-300 rounded-xl space-y-3 animate-in fade-in duration-150">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-[#1B4D3E] text-white font-black text-xs flex items-center justify-center">
                    {stepData.step}
                  </span>
                  <h4 className="font-bold text-stone-900 text-sm font-['Outfit']">
                    {stepData.title}
                  </h4>
                </div>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-200">
                  {stepData.tech}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                {stepData.desc}
              </p>
            </div>
          );
        })()}
      </div>

      {/* Machine Learning Concepts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Supervised */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-stone-900">
            <BrainCircuit className="w-5 h-5 text-[#1B4D3E]" />
            <h4 className="font-bold text-sm font-['Outfit']">Supervised Learning</h4>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Modelos entrenados con datos anotados manualmente para clasificar sentimiento (Positivo/Neutro/Negativo) y etiquetar aspectos como <em>Sabor</em>, <em>Atención</em> y <em>Precio</em> con métricas de precisión controladas.
          </p>
        </div>

        {/* Unsupervised */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-stone-900">
            <Network className="w-5 h-5 text-[#1B4D3E]" />
            <h4 className="font-bold text-sm font-['Outfit']">Unsupervised Learning</h4>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Algoritmos de clustering (HDBSCAN y UMAP) que agrupan opiniones por similitud semántica para descubrir tópicos emergentes (como el fenómeno <em>Chocolate Dubai</em>) sin definiciones previas del analista.
          </p>
        </div>

        {/* LLMs & Embeddings */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-stone-900">
            <Sparkles className="w-5 h-5 text-[#1B4D3E]" />
            <h4 className="font-bold text-sm font-['Outfit']">LLMs & Embeddings</h4>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Modelos de lenguaje modernos utilizados para generar resúmenes ejecutivos contextuales, sintetizar la evidencia cualitativa y mapear intenciones complejas en el lenguaje coloquial del Litoral.
          </p>
        </div>
      </div>

      {/* Model Evaluation Prototype Framework */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-stone-900 text-base font-['Outfit']">
              Marco de Evaluación de Modelos (Target Benchmark)
            </h3>
            <p className="text-xs text-stone-500">
              Métricas esperadas del pipeline NLP tras validación cruzada con corpus etiquetado de 1,450 opiniones.
            </p>
          </div>
          <span className="text-[10px] font-bold text-blue-800 bg-blue-100 border border-blue-200 px-2.5 py-1 rounded">
            Expected evaluation framework · Simulated benchmark
          </span>
        </div>

        {/* 4 Macro KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 bg-[#FAF9F5] border border-stone-200 rounded-xl text-center">
            <div className="text-[10px] text-stone-500 font-bold uppercase">Accuracy Global</div>
            <div className="text-2xl font-black text-stone-900 font-['Outfit'] mt-1">
              {(PROTOTYPE_EVALUATION.overallAccuracy * 100).toFixed(1)}%
            </div>
            <div className="text-[9px] text-stone-400">Predicción de clase correcta</div>
          </div>

          <div className="p-4 bg-[#FAF9F5] border border-stone-200 rounded-xl text-center">
            <div className="text-[10px] text-stone-500 font-bold uppercase">Macro Precision</div>
            <div className="text-2xl font-black text-stone-900 font-['Outfit'] mt-1">
              {(PROTOTYPE_EVALUATION.macroPrecision * 100).toFixed(1)}%
            </div>
            <div className="text-[9px] text-stone-400">Bajo ratio de falsos positivos</div>
          </div>

          <div className="p-4 bg-[#FAF9F5] border border-stone-200 rounded-xl text-center">
            <div className="text-[10px] text-stone-500 font-bold uppercase">Macro Recall</div>
            <div className="text-2xl font-black text-stone-900 font-['Outfit'] mt-1">
              {(PROTOTYPE_EVALUATION.macroRecall * 100).toFixed(1)}%
            </div>
            <div className="text-[9px] text-stone-400">Captura de quejas reales</div>
          </div>

          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-center">
            <div className="text-[10px] text-emerald-800 font-bold uppercase">Macro F1-Score</div>
            <div className="text-2xl font-black text-emerald-900 font-['Outfit'] mt-1">
              {(PROTOTYPE_EVALUATION.macroF1 * 100).toFixed(1)}%
            </div>
            <div className="text-[9px] text-emerald-700 font-medium">Balance armónico global</div>
          </div>
        </div>

        {/* Confusion Matrix Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          <div className="lg:col-span-6 space-y-2">
            <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
              Matriz de Confusión (Sentimiento Global)
            </h4>
            <div className="overflow-x-auto border border-stone-200 rounded-xl">
              <table className="w-full text-center text-xs font-['Plus_Jakarta_Sans']">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold text-[10px]">
                  <tr>
                    <th className="p-2.5 text-left">Predicción \ Real</th>
                    <th className="p-2.5 text-emerald-800">Positivo Real</th>
                    <th className="p-2.5 text-stone-700">Neutro Real</th>
                    <th className="p-2.5 text-rose-800">Negativo Real</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {PROTOTYPE_EVALUATION.confusionMatrix.map((row) => (
                    <tr key={row.predicted}>
                      <td className="p-2.5 text-left font-bold text-stone-900 bg-stone-50/50">
                        Predicho {row.predicted}
                      </td>
                      <td className="p-2.5 font-bold text-emerald-800 bg-emerald-50/30">{row.actualPos}</td>
                      <td className="p-2.5 font-semibold text-stone-700">{row.actualNeu}</td>
                      <td className="p-2.5 font-bold text-rose-800 bg-rose-50/30">{row.actualNeg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Aspect F1 Breakdown */}
          <div className="lg:col-span-6 space-y-2">
            <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
              F1-Score por Aspecto Específico (ABSA)
            </h4>
            <div className="space-y-2">
              {PROTOTYPE_EVALUATION.aspectF1Scores.map((asp) => (
                <div
                  key={asp.aspect}
                  className="p-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xl flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-stone-800">{asp.aspect}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-stone-400">Soporte: {asp.support}</span>
                    <span className="font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                      {(asp.f1 * 100).toFixed(1)}% F1
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
