import { BusinessInsight, GlobalFilters, Review, TimeSlot } from "../types";
import {
  deriveInsightDataType,
  deriveManagementAttention,
  deriveSignalStrength,
  validateBusinessInsight,
} from "../utils/methodologicalValidation";

/**
 * REPOSITORIO CANÓNICO DE BUSINESS INSIGHTS CON AUDITORÍA METODOLÓGICA (ITERACIÓN 5.1)
 * 
 * Principios Epistemológicos:
 * 1. Hecho Observado (Observed Data): Recuento exacto de menciones y verbatims.
 * 2. Patrón Descriptivo (Pattern): Concentración o recurrencia observacional en el corpus.
 * 3. Hipótesis Explicativa (Exploratory Hypothesis): Línea interpretativa a investigar (no afirmación causal).
 * 4. Validación Requerida (Validation Required): Preguntas y contrastaciones operativas necesarias.
 * 
 * Reglas de Linaje y Matemáticas:
 * - `mentions`: estrictamente igual a `uniqueReviewIds.length`.
 * - `prevalence`: derivado de `(mentions / analyzedCorpus) * 100` con 1 decimal.
 * - `dataType`: derivado de las evidencias reales (nunca verified-public si contiene pilot o proto).
 * - `signalStrength`: graduación observacional transparente sin términos estadísticos opacos.
 * - `managementAttention`: Watch / Attention / High Attention con badge no causal.
 */

interface RawBusinessInsightDefinition {
  id: string;
  type: BusinessInsight["type"];
  title: string;
  observedData: string;
  pattern: string;
  exploratoryHypothesis: string;
  validationRequired: string;
  reviewIds: string[];
  analyzedCorpus: number;
  corpusDescription: string;
  dimensions: BusinessInsight["dimensions"];
  methodologyNote?: string;
  nonCausalDisclaimer?: string;
  isSmallSample?: boolean;
  sourcesDistribution?: { name: string; count: number; pct: number }[];
  contextData?: BusinessInsight["contextData"];
}

const RAW_INSIGHT_DEFINITIONS: RawBusinessInsightDefinition[] = [
  {
    id: "insight-ops-01",
    type: "operations",
    title: "Concentración de demoras y fricción en turno nocturno durante fines de semana",
    observedData: "14 menciones registradas se concentran en demoras de despacho (>20-35 minutos) y filas en el local entre las 20:30 y 23:30 hs de viernes a domingos en sucursales de alta concurrencia.",
    pattern: "Existe una concentración recurrente de fricción por tiempos de espera durante los picos nocturnos de fin de semana dentro del corpus observado.",
    exploratoryHypothesis: "Una hipótesis exploratoria a investigar es que la demanda en mostrador supere la capacidad operativa instalada de cobro y despacho en esos horarios pico.",
    validationRequired: "Contrastar con curvas horarias de tickets emitidos, dotación efectiva por turno y tiempos de transacción en caja.",
    reviewIds: [
      "pilot-duomo-pos-bol-04",
      "pilot-duomo-pos-uru-02",
      "pilot-duomo-pos-cos-03",
      "pilot-duomo-for-cen-04",
      "pilot-duomo-ctes-jun-03",
      "pilot-duomo-res-pea-02",
      "pilot-duomo-pos-qua-03",
      "real-duomo-02",
      "real-duomo-07",
      "real-duomo-12",
      "proto-duomo-05",
      "proto-duomo-18",
      "proto-duomo-29",
      "proto-duomo-42",
    ],
    analyzedCorpus: 104,
    corpusDescription: "14 menciones sobre 104 textos de sucursales Duomo analizados (13.5% del corpus seleccionado)",
    dimensions: {
      brand: "Duomo",
      topic: "Tiempo de espera y filas",
      sentiment: "negative",
      timeSlot: "Night",
      isWeekend: true,
    },
    methodologyNote: "Detección semántica de demoras + filtro temporal de fin de semana noche sobre el corpus estructurado.",
    nonCausalDisclaimer: "Asociación exploratoria · no identifica por sí sola la causa del fenómeno",
    sourcesDistribution: [
      { name: "Google Maps", count: 11, pct: 78.6 },
      { name: "Instagram", count: 2, pct: 14.3 },
      { name: "Facebook", count: 1, pct: 7.1 },
    ],
  },
  {
    id: "insight-prod-01",
    type: "product",
    title: "Chocolate Dubai: Alta favorabilidad organoléptica con tensión de disponibilidad y stock",
    observedData: "15 menciones registradas sobre Chocolate Dubai expresan una valoración favorable sobre sabor y textura kataifi, mientras 4 opiniones reportan quiebre de stock en mostrador en turno tarde/noche.",
    pattern: "El producto presenta una recepción favorable consistente junto a una señal recurrente de fricción vinculada a disponibilidad en mostrador.",
    exploratoryHypothesis: "La demanda del sabor podría estar superando los lotes de reposición asignados a las sucursales de mayor rotación.",
    validationRequired: "Revisar rotación de tachos por sucursal, frecuencia de despacho desde planta y reclamos de mostrador.",
    reviewIds: [
      "pilot-duomo-pos-bol-02",
      "pilot-duomo-pos-uru-04",
      "pilot-duomo-pos-san-02",
      "pilot-duomo-pos-ita-03",
      "pilot-duomo-obe-lib-02",
      "pilot-duomo-ctes-jun-02",
      "pilot-duomo-res-pea-03",
      "pilot-duomo-for-cen-02",
      "real-duomo-03",
      "real-duomo-09",
      "proto-duomo-01",
      "proto-duomo-11",
      "proto-duomo-22",
      "proto-duomo-33",
      "proto-duomo-45",
    ],
    analyzedCorpus: 104,
    corpusDescription: "15 menciones sobre 104 textos analizados (14.4% del corpus)",
    dimensions: {
      brand: "Duomo",
      flavor: "Chocolate Dubai",
      topic: "Disponibilidad y stock",
    },
    methodologyNote: "Descomposición ABSA aislando aspectos de sabor vs disponibilidad en menciones de Chocolate Dubai.",
    nonCausalDisclaimer: "Asociación exploratoria · no implica causalidad",
    sourcesDistribution: [
      { name: "Google Maps", count: 11, pct: 73.3 },
      { name: "Instagram", count: 3, pct: 20.0 },
      { name: "Facebook", count: 1, pct: 6.7 },
    ],
  },
  {
    id: "insight-branch-01",
    type: "branch",
    title: "Remodelación de salones y climatización como factor positivo de experiencia",
    observedData: "14 menciones espontáneas destacan la renovación estética, comodidad, accesibilidad con rampas y aire acondicionado en salones inaugurados o remodelados.",
    pattern: "Se observa una asociación constante entre la modernización de infraestructura y comentarios de alta satisfacción ambiental.",
    exploratoryHypothesis: "En el contexto térmico del NEA, la calidad del espacio físico actúa como un factor diferenciador que fomenta la visita y permanencia.",
    validationRequired: "Contrastar ticket promedio y consumo en salón en sucursales remodeladas vs formato tradicional.",
    reviewIds: [
      "pilot-duomo-pos-bol-01",
      "pilot-duomo-pos-cos-01",
      "pilot-duomo-pos-uru-01",
      "pilot-duomo-pos-san-01",
      "pilot-duomo-pos-tam-01",
      "pilot-duomo-obe-sar-01",
      "pilot-duomo-eld-san-01",
      "pilot-duomo-ctes-jun-01",
      "pilot-duomo-ctes-3ab-01",
      "pilot-duomo-for-cen-01",
      "pilot-duomo-for-25m-01",
      "real-duomo-01",
      "real-duomo-08",
      "real-duomo-14",
    ],
    analyzedCorpus: 104,
    corpusDescription: "14 menciones sobre 104 textos analizados (13.5% del corpus del piloto)",
    dimensions: {
      brand: "Duomo",
      topic: "Infraestructura y remodelación",
      sentiment: "positive",
    },
    methodologyNote: "Aspectos de Infraestructura y Climatización en sucursales remodeladas.",
    nonCausalDisclaimer: "Asociación descriptiva · no implica causalidad",
    sourcesDistribution: [
      { name: "Google Maps", count: 12, pct: 85.7 },
      { name: "Instagram", count: 2, pct: 14.3 },
    ],
  },
  {
    id: "insight-prod-02",
    type: "product",
    title: "Pistacho: Sabor de destino con fricción por agotamiento antes del horario pico",
    observedData: "8 menciones reportan haber concurrido específicamente por el sabor Pistacho y encontrarlo agotado en heladera antes de las 21:00 hs en sucursales de alta concurrencia.",
    pattern: "El sabor genera una conducta de compra con destino específico, cuya no disponibilidad deriva en reseñas con sentimiento negativo directo.",
    exploratoryHypothesis: "La demanda de Pistacho en plazas gastronómicas céntricas podría requerir mayor abastecimiento diario.",
    validationRequired: "Revisar horarios promedio de agotamiento de tachos de Pistacho en Corrientes Junín y Resistencia Peatonal.",
    reviewIds: [
      "pilot-duomo-ctes-jun-04",
      "pilot-duomo-res-pea-04",
      "pilot-duomo-pos-cos-04",
      "pilot-duomo-pos-bol-04",
      "real-duomo-04",
      "proto-duomo-07",
      "proto-duomo-19",
      "proto-duomo-31",
    ],
    analyzedCorpus: 104,
    corpusDescription: "8 menciones sobre 104 textos analizados (7.7% del corpus)",
    dimensions: {
      brand: "Duomo",
      flavor: "Pistacho",
      topic: "Disponibilidad y stock",
      sentiment: "negative",
    },
    methodologyNote: "Patrón cualitativo de viaje motivado por sabor y agotamiento de stock.",
    nonCausalDisclaimer: "Asociación exploratoria · no implica causalidad",
    sourcesDistribution: [
      { name: "Google Maps", count: 6, pct: 75.0 },
      { name: "Instagram", count: 2, pct: 25.0 },
    ],
  },
  {
    id: "insight-time-01",
    type: "time",
    title: "Variabilidad de atención observada entre turno tarde y turno noche",
    observedData: "7 menciones comparan la agilidad del turno tarde (16:00 a 19:30 hs) frente a percepciones de mayor lentitud o menor predisposición en el turno nocturno (20:30 a 00:00 hs).",
    pattern: "Aparece una percepción de heterogeneidad de servicio asociada a franjas horarias en locales con doble turno.",
    exploratoryHypothesis: "La mayor tensión de demanda acumulada en la noche y el desgaste del equipo podrían influir en la percepción del servicio.",
    validationRequired: "Monitorear esquemas de relevo, dotación de cierre e incentivos de pico horario.",
    reviewIds: [
      "pilot-duomo-pos-uru-02",
      "pilot-duomo-pos-tam-03",
      "pilot-duomo-eld-san-02",
      "pilot-duomo-res-lav-02",
      "real-duomo-02",
      "proto-duomo-09",
      "proto-duomo-26",
    ],
    analyzedCorpus: 104,
    corpusDescription: "7 menciones sobre 104 textos analizados (6.7% del corpus)",
    dimensions: {
      brand: "Duomo",
      timeSlot: "Night",
      topic: "Atención al cliente",
    },
    methodologyNote: "Cruce semántico de menciones de turno noche vs turno tarde en calificaciones 2-3 estrellas.",
    nonCausalDisclaimer: "Asociación observacional · no implica causalidad",
    sourcesDistribution: [
      { name: "Google Maps", count: 5, pct: 71.4 },
      { name: "Instagram", count: 2, pct: 28.6 },
    ],
  },
  {
    id: "insight-ops-02",
    type: "operations",
    title: "Medios de pago y conectividad posnet: fricción puntual en horas de alto volumen",
    observedData: "7 menciones reportan demoras en línea de caja atribuidas a intermitencia en terminales Posnet o falta de cambio en efectivo en horarios de alta afluencia.",
    pattern: "La fricción en la instancia transaccional genera demoras en la fila de despacho general.",
    exploratoryHypothesis: "La inestabilidad de redes celulares o terminales de cobro podría ralentizar la velocidad de caja.",
    validationRequired: "Evaluar redundancia de conectividad (Wi-Fi dedicado + backup) en sucursales de alta facturación electrónica.",
    reviewIds: [
      "pilot-duomo-pos-ita-04",
      "pilot-duomo-for-cen-04",
      "pilot-duomo-ctes-3ab-02",
      "real-duomo-02",
      "real-duomo-11",
      "proto-duomo-14",
      "proto-duomo-38",
    ],
    analyzedCorpus: 104,
    corpusDescription: "7 menciones sobre 104 textos analizados (6.7% del corpus)",
    dimensions: {
      brand: "Duomo",
      topic: "Medios de pago y cobro",
      sentiment: "negative",
    },
    methodologyNote: "Tópicos de cobro electrónico, QR y cambio en efectivo.",
    nonCausalDisclaimer: "Asociación observacional · no implica causalidad",
    sourcesDistribution: [
      { name: "Google Maps", count: 6, pct: 85.7 },
      { name: "Facebook", count: 1, pct: 14.3 },
    ],
  },
  {
    id: "insight-comp-01",
    type: "competitive",
    title: "Resiliencia en percepción de calidad artesanal frente a competidores de bajo desembolso",
    observedData: "9 menciones comparativas validan el diferencial de precio de Duomo fundamentado en cremosidad y textura, con mayor sensibilidad al desembolso nominal en plazas periféricas.",
    pattern: "Se observa una percepción favorable del valor artesanal frente a opciones masivas dentro del corpus regional.",
    exploratoryHypothesis: "La propuesta de valor tradicional sostiene un posicionamiento defensivo sólido en el segmento medio.",
    validationRequired: "Analizar elasticidad de demanda por sucursal barrial vs céntrica.",
    reviewIds: [
      "pilot-duomo-res-pea-01",
      "pilot-duomo-res-lav-01",
      "pilot-duomo-obe-lib-01",
      "real-duomo-05",
      "real-duomo-10",
      "proto-duomo-03",
      "proto-duomo-16",
      "proto-duomo-28",
      "proto-duomo-40",
    ],
    analyzedCorpus: 180,
    corpusDescription: "9 menciones comparativas sobre 180 textos regionales analizados (5.0% del corpus)",
    dimensions: {
      brand: "Duomo",
      topic: "Relación Precio/Calidad",
    },
    methodologyNote: "Benchmarking semántico cruzado Duomo vs competidores en el corpus regional.",
    nonCausalDisclaimer: "Asociación comparativa · no infiere cuota de mercado ni causalidad competitiva",
    sourcesDistribution: [
      { name: "Google Maps", count: 6, pct: 66.7 },
      { name: "Instagram", count: 2, pct: 22.2 },
      { name: "Facebook", count: 1, pct: 11.1 },
    ],
  },
  {
    id: "insight-context-01",
    type: "context",
    title: "Asociación exploratoria: Jornadas de alta temperatura y percepción de espera en fila",
    observedData: "7 menciones en jornadas estimadas sobre 34°C reportan mayor incomodidad en la espera exterior frente a jornadas templadas.",
    pattern: "Se registra una correlación exploratoria entre estrés térmico ambiental y propensión a registrar quejas por tiempo de espera.",
    exploratoryHypothesis: "El calor en vereda amplifica el costo psicológico de la espera en fila exterior sin implicar que la temperatura sea la causa única.",
    validationRequired: "Contrastar con registros meteorológicos auditados y tiempos reales de mostrador.",
    reviewIds: [
      "pilot-duomo-pos-bol-04",
      "pilot-duomo-pos-cos-03",
      "pilot-duomo-for-cen-04",
      "pilot-duomo-ctes-jun-03",
      "real-duomo-07",
      "proto-duomo-05",
      "proto-duomo-18",
    ],
    analyzedCorpus: 65,
    corpusDescription: "7 menciones sobre 65 textos contextuales seleccionados (10.8% del subcorpus)",
    dimensions: {
      province: "Misiones",
      topic: "Tiempo de espera y filas",
      timeSlot: "Night",
    },
    methodologyNote: "Asociación estadística preliminar en submuestra térmica. No prueba causalidad unívoca.",
    nonCausalDisclaimer: "Asociación exploratoria · no implica causalidad meteorológica",
    isSmallSample: true,
    sourcesDistribution: [
      { name: "Google Maps", count: 6, pct: 85.7 },
      { name: "Instagram", count: 1, pct: 14.3 },
    ],
    contextData: {
      weather: {
        temperature: 36,
        maxTemperature: 38,
        condition: "Caluroso / Ola de calor",
        precipitation: 0,
        humidity: 68,
        dataSource: "Estación Regional Posadas (Simulado)",
        status: "available",
      },
      calendar: {
        isWeekend: true,
        season: "Verano",
      },
    },
  },
];

/**
 * Build canonical insights with dynamically derived metrics and strict data lineage
 */
export const CANONICAL_BUSINESS_INSIGHTS: BusinessInsight[] = RAW_INSIGHT_DEFINITIONS.map(
  (def) => {
    const uniqueReviewIds = Array.from(new Set(def.reviewIds));
    const mentions = uniqueReviewIds.length;
    const analyzedCorpus = def.analyzedCorpus;
    const prevalence =
      analyzedCorpus > 0 ? Number(((mentions / analyzedCorpus) * 100).toFixed(1)) : 0;

    const dataType = deriveInsightDataType(uniqueReviewIds);
    const signalStrength = deriveSignalStrength(mentions, analyzedCorpus, prevalence);
    const managementAttention = deriveManagementAttention(
      signalStrength,
      def.dimensions.sentiment,
      def.dimensions.topic
    );

    // Map evidence level for legacy compatibility
    const evidenceLevel: BusinessInsight["evidenceLevel"] =
      signalStrength === "CRITICAL OBSERVATIONAL SIGNAL" ||
      signalStrength === "HIGH PREVALENCE SIGNAL" ||
      signalStrength === "RECURRENT PATTERN"
        ? "recurrent"
        : signalStrength === "EMERGING SIGNAL"
        ? "emerging"
        : "limited";

    return {
      id: def.id,
      type: def.type,
      title: def.title,
      // Structured Epistemological Properties
      observedData: def.observedData,
      pattern: def.pattern,
      exploratoryHypothesis: def.exploratoryHypothesis,
      validationRequired: def.validationRequired,
      // Backward-compat aliases
      observation: def.observedData,
      interpretation: def.exploratoryHypothesis,
      businessQuestion: def.validationRequired,
      evidence: {
        mentions,
        analyzedCorpus,
        prevalence,
        reviewIds: uniqueReviewIds,
        uniqueReviewIds,
        corpusDescription: def.corpusDescription,
      },
      dimensions: def.dimensions,
      evidenceLevel,
      signalStrength,
      managementAttention,
      managementAttentionReason:
        managementAttention === "HIGH ATTENTION"
          ? "Alta concentración observacional en el corpus analizado"
          : managementAttention === "ATTENTION"
          ? "Patrón recurrente observado en múltiples sucursales o franjas horarias"
          : managementAttention === "WATCH"
          ? "Señal emergente en tópicos operacionales con oportunidad de seguimiento"
          : undefined,
      methodologyNote: def.methodologyNote,
      nonCausalDisclaimer: def.nonCausalDisclaimer || "Asociación exploratoria · no implica causalidad",
      dataType,
      isSmallSample: def.isSmallSample,
      sourcesDistribution: def.sourcesDistribution,
      contextData: def.contextData,
    };
  }
);

/**
 * Filter insights dynamically based on active filters
 */
export function getFilteredInsights(filters: GlobalFilters): BusinessInsight[] {
  return CANONICAL_BUSINESS_INSIGHTS.filter((insight) => {
    // Brand
    if (filters.brand && filters.brand !== "Todas") {
      if (insight.dimensions.brand && insight.dimensions.brand !== filters.brand) {
        return false;
      }
    }
    // Province
    if (filters.province && filters.province !== "Todas") {
      if (insight.dimensions.province && insight.dimensions.province !== filters.province) {
        return false;
      }
    }
    // Flavor
    if (filters.flavor && filters.flavor !== "Todos") {
      if (insight.dimensions.flavor && insight.dimensions.flavor.toLowerCase() !== filters.flavor.toLowerCase()) {
        return false;
      }
    }
    // Topic
    if (filters.topic && filters.topic !== "Todos" && filters.topic !== "Todos los tópicos") {
      if (insight.dimensions.topic && !insight.dimensions.topic.toLowerCase().includes(filters.topic.toLowerCase())) {
        return false;
      }
    }
    // TimeSlot
    if (filters.timeSlot && filters.timeSlot !== "Todos" && filters.timeSlot !== "Unknown") {
      if (insight.dimensions.timeSlot && insight.dimensions.timeSlot !== filters.timeSlot) {
        return false;
      }
    }
    // Weekend
    if (filters.isWeekend !== undefined && filters.isWeekend !== null) {
      if (insight.dimensions.isWeekend !== undefined && insight.dimensions.isWeekend !== filters.isWeekend) {
        return false;
      }
    }
    // Data Mode
    if (filters.dataMode && filters.dataMode !== "all") {
      if (filters.dataMode === "unverified-pilot" && insight.dataType !== "unverified-pilot") return false;
      if (filters.dataMode === "prototype" && insight.dataType !== "prototype") return false;
      if (filters.dataMode === "verified-public" && insight.dataType !== "verified-public") return false;
      if (filters.dataMode === "mixed" && insight.dataType !== "mixed") return false;
    }
    // Search Query
    if (filters.searchQuery && filters.searchQuery.trim() !== "") {
      const q = filters.searchQuery.toLowerCase();
      const matchTitle = insight.title.toLowerCase().includes(q);
      const matchObs = (insight.observedData || insight.observation).toLowerCase().includes(q);
      const matchPattern = (insight.pattern || "").toLowerCase().includes(q);
      const matchInterp = (insight.exploratoryHypothesis || insight.interpretation).toLowerCase().includes(q);
      const matchQ = (insight.validationRequired || insight.businessQuestion).toLowerCase().includes(q);
      if (!matchTitle && !matchObs && !matchPattern && !matchInterp && !matchQ) return false;
    }
    return true;
  });
}

/**
 * Get top insights for a specific branch
 */
export function getTopInsightsForBranch(branchId: string, limit = 3): BusinessInsight[] {
  return CANONICAL_BUSINESS_INSIGHTS.filter((ins) => {
    return (
      ins.type === "branch" ||
      ins.type === "operations" ||
      ins.type === "time" ||
      ins.dimensions.branch === branchId ||
      ins.dimensions.brand === "Duomo"
    );
  }).slice(0, limit);
}

/**
 * Get top insights for a specific flavor
 */
export function getTopInsightsForFlavor(flavor: string, limit = 3): BusinessInsight[] {
  const norm = flavor.toLowerCase();
  const directMatches = CANONICAL_BUSINESS_INSIGHTS.filter(
    (ins) => ins.dimensions.flavor?.toLowerCase() === norm || ins.title.toLowerCase().includes(norm)
  );
  if (directMatches.length >= limit) return directMatches.slice(0, limit);

  const productInsights = CANONICAL_BUSINESS_INSIGHTS.filter(
    (ins) => ins.type === "product" && !directMatches.some((dm) => dm.id === ins.id)
  );
  return [...directMatches, ...productInsights].slice(0, limit);
}

/**
 * Find which insights are supported by a given review ID
 */
export function getInsightsSupportingReview(reviewId: string): BusinessInsight[] {
  return CANONICAL_BUSINESS_INSIGHTS.filter((ins) => ins.evidence.reviewIds.includes(reviewId));
}
