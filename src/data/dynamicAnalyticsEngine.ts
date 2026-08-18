import { GlobalFilters, Review, Branch, EvidenceContextData, DynamicOverviewMetrics, SentimentTopicMatrixRow, TopicMetric, ProductInsight, TimeSlot } from "../types";
import { REAL_REVIEWS } from "./realReviews";
import { REAL_PILOT_REVIEWS } from "./realPilotReviews";
import { CANONICAL_BRANCHES } from "./canonicalBranches";
import { PROTOTYPE_REVIEWS } from "./prototypeMetrics";
import { enrichReviewWithStrictTemporalContext } from "../utils/methodologicalValidation";

const DAYS_ES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

export function enrichReviewTemporal(r: Review): Review {
  let dayOfWeek = r.dayOfWeek;
  let isWeekend = r.isWeekend;

  if (r.date) {
    const d = new Date(r.date + "T12:00:00Z");
    if (!isNaN(d.getTime())) {
      const dayIdx = d.getUTCDay();
      dayOfWeek = DAYS_ES[dayIdx];
      isWeekend = dayIdx === 0 || dayIdx === 6; // Sunday or Saturday
    }
  }

  const reviewWithDays = {
    ...r,
    dayOfWeek,
    isWeekend,
  };

  // Apply strict methodological temporal enrichment & weather eligibility guardrails
  return enrichReviewWithStrictTemporalContext(reviewWithDays);
}

// Complete pool of all reviews including the structured Pilot Dataset
export const ALL_REVIEWS_POOL: Review[] = [
  ...REAL_PILOT_REVIEWS.map(enrichReviewTemporal),
  ...REAL_REVIEWS.map(enrichReviewTemporal),
  ...PROTOTYPE_REVIEWS.map(enrichReviewTemporal),
];

// Helper to filter reviews based on GlobalFilters
export function getFilteredReviews(filters: GlobalFilters): Review[] {
  // If targeted by specific review IDs (from Insight drilldown)
  if (filters.targetReviewIds && filters.targetReviewIds.length > 0) {
    const targetSet = new Set(filters.targetReviewIds);
    return ALL_REVIEWS_POOL.filter((r) => targetSet.has(r.id));
  }

  return ALL_REVIEWS_POOL.filter((r) => {
    // Verification status filter
    if (filters.verificationStatusFilter && filters.verificationStatusFilter !== "Todos") {
      const status = r.provenance?.verificationStatus;
      if (filters.verificationStatusFilter === "verified" && status !== "verified") return false;
      if (filters.verificationStatusFilter === "pending" && status !== "pending") return false;
      if (filters.verificationStatusFilter === "prototype" && r.dataType !== "prototype") return false;
    }
    // Data Mode filter
    if (filters.dataMode && filters.dataMode !== "all") {
      if (filters.dataMode === "unverified-pilot" && r.dataType !== "unverified-pilot") return false;
      if (filters.dataMode === "prototype" && r.dataType !== "prototype") return false;
      if (filters.dataMode === "verified-public" && r.dataType !== "verified-public") return false;
      if (filters.dataMode === "mixed" && r.dataType !== "mixed") return false;
    }
    // Brand
    if (filters.brand && filters.brand !== "Todas" && r.brand !== filters.brand) {
      return false;
    }
    // Province
    if (filters.province && filters.province !== "Todas" && r.province !== filters.province) {
      return false;
    }
    // City
    if (filters.city && filters.city !== "Todas" && r.city !== filters.city) {
      return false;
    }
    // Branch
    if (filters.branch && filters.branch !== "Todas") {
      const matchBranch = r.branchId === filters.branch || r.branch === filters.branch;
      if (!matchBranch) return false;
    }
    // Flavor
    if (filters.flavor && filters.flavor !== "Todos") {
      const hasFlavorInText = r.text.toLowerCase().includes(filters.flavor.toLowerCase());
      const hasFlavorProp = r.flavor?.toLowerCase() === filters.flavor.toLowerCase();
      if (!hasFlavorInText && !hasFlavorProp) return false;
    }
    // Topic
    if (filters.topic && filters.topic !== "Todos" && filters.topic !== "Todos los tópicos") {
      const matchTopic = r.topics.some((t) => t.toLowerCase().includes(filters.topic!.toLowerCase())) ||
        r.text.toLowerCase().includes(filters.topic!.toLowerCase());
      if (!matchTopic) return false;
    }
    // Sentiment
    if (filters.sentiment && filters.sentiment !== "Todos") {
      const norm = filters.sentiment.toLowerCase();
      if (norm === "positivo" || norm === "positive") {
        if (r.sentiment.label !== "positive") return false;
      } else if (norm === "neutro" || norm === "neutral") {
        if (r.sentiment.label !== "neutral") return false;
      } else if (norm === "negativo" || norm === "negative") {
        if (r.sentiment.label !== "negative") return false;
      }
    }
    // Source
    if (filters.source && filters.source !== "Todas" && filters.source !== "Todas las fuentes") {
      if (r.source !== filters.source) return false;
    }
    // TimeSlot
    if (filters.timeSlot && filters.timeSlot !== "Todos") {
      if (r.timeSlot !== filters.timeSlot) return false;
    }
    // Day of week
    if (filters.dayOfWeek && filters.dayOfWeek !== "Todos") {
      if (r.dayOfWeek !== filters.dayOfWeek) return false;
    }
    // Is Weekend
    if (filters.isWeekend !== undefined && filters.isWeekend !== null) {
      if (r.isWeekend !== filters.isWeekend) return false;
    }
    // Search Query
    if (filters.searchQuery && filters.searchQuery.trim() !== "") {
      const query = filters.searchQuery.toLowerCase();
      const matchText = r.text.toLowerCase().includes(query);
      const matchAspect = r.aspects.some((a) => a.name.toLowerCase().includes(query));
      const matchTopic = r.topics.some((t) => t.toLowerCase().includes(query));
      const matchBranch = r.branch?.toLowerCase().includes(query) || false;
      if (!matchText && !matchAspect && !matchTopic && !matchBranch) return false;
    }
    return true;
  });
}

// Dependent filters calculator
export function getDependentFilterOptions(filters: GlobalFilters) {
  // Available Brands
  const brands = ["Todas", "Duomo", "Grido", "Cremolatti"];

  // Available Provinces for selected Brand
  const matchingBranchesByBrand = CANONICAL_BRANCHES.filter((b) => {
    if (filters.brand && filters.brand !== "Todas") {
      return b.brand === filters.brand;
    }
    return true;
  });

  const availableProvinces = ["Todas", ...Array.from(new Set(matchingBranchesByBrand.map((b) => b.province)))];

  // Available Cities for selected Province and Brand
  const matchingBranchesByProv = matchingBranchesByBrand.filter((b) => {
    if (filters.province && filters.province !== "Todas") {
      return b.province === filters.province;
    }
    return true;
  });

  const availableCities = ["Todas", ...Array.from(new Set(matchingBranchesByProv.map((b) => b.city)))];

  // Available Branches for selected City/Province/Brand
  const matchingBranchesByCity = matchingBranchesByProv.filter((b) => {
    if (filters.city && filters.city !== "Todas") {
      return b.city === filters.city;
    }
    return true;
  });

  const availableBranches = [
    { id: "Todas", name: "Todas las sucursales" },
    ...matchingBranchesByCity.map((b) => ({ id: b.id, name: `${b.name} (${b.city})` })),
  ];

  // Available Flavors
  const availableFlavors = [
    "Todos",
    "Chocolate Dubai",
    "Pistacho",
    "Dulce de Leche Duomo con nueces",
    "Sambayón con cerezas",
    "Chocolate Amargo 70%",
    "Tramontana",
  ];

  const availableSources = ["Todas", "Google", "Instagram", "Facebook", "TikTok", "YouTube"];

  return {
    brands,
    provinces: availableProvinces,
    cities: availableCities,
    branches: availableBranches,
    flavors: availableFlavors,
    sources: availableSources,
  };
}

// Dynamic Overview Metrics
export function computeDynamicOverviewMetrics(filters: GlobalFilters): DynamicOverviewMetrics {
  const filteredReviews = getFilteredReviews(filters);
  const totalAnalyzed = filteredReviews.length;

  // Compute public reviews context from canonical branches matching the filter
  const relevantBranches = CANONICAL_BRANCHES.filter((b) => {
    if (filters.brand && filters.brand !== "Todas" && b.brand !== filters.brand) return false;
    if (filters.province && filters.province !== "Todas" && b.province !== filters.province) return false;
    if (filters.city && filters.city !== "Todas" && b.city !== filters.city) return false;
    if (filters.branch && filters.branch !== "Todas" && b.id !== filters.branch) return false;
    return true;
  });

  const publicReviewsContextTotal = relevantBranches.reduce(
    (acc, b) => acc + (b.googleProfile?.totalReviews || 0),
    0
  ) || (totalAnalyzed * 12);

  const posCount = filteredReviews.filter((r) => r.sentiment.label === "positive").length;
  const neuCount = filteredReviews.filter((r) => r.sentiment.label === "neutral").length;
  const negCount = filteredReviews.filter((r) => r.sentiment.label === "negative").length;

  const positivePct = totalAnalyzed > 0 ? Math.round((posCount / totalAnalyzed) * 100) : 74;
  const neutralPct = totalAnalyzed > 0 ? Math.round((neuCount / totalAnalyzed) * 100) : 17;
  const negativePct = totalAnalyzed > 0 ? Math.round((negCount / totalAnalyzed) * 100) : 9;
  const netSentimentScore = positivePct - negativePct;

  const isLowSample = totalAnalyzed < 10;

  // Source breakdown
  const sourceMap: { [key: string]: number } = {};
  filteredReviews.forEach((r) => {
    sourceMap[r.source] = (sourceMap[r.source] || 0) + 1;
  });
  const sourcesBreakdown = Object.entries(sourceMap).map(([name, count]) => ({
    name,
    count,
    pct: totalAnalyzed > 0 ? Math.round((count / totalAnalyzed) * 100) : 0,
  }));

  // Dynamic Top Topic and Friction
  let topTopic = "Sabor y Calidad Artesanal";
  let topFriction = "Filas y Tiempos de Espera en Horas Pico";

  if (filters.flavor === "Chocolate Dubai") {
    topTopic = "Crocancia de masa kataifi y novedad";
    topFriction = "Quiebre de stock nocturno";
  } else if (filters.flavor === "Pistacho") {
    topTopic = "Intensidad y cremosidad natural";
    topFriction = "Disponibilidad limitada a las 21hs";
  } else if (filters.province === "Corrientes") {
    topTopic = "Relación precio-calidad regional";
    topFriction = "Falta de stock nocturno en Peatonal Junín";
  } else if (filters.province === "Chaco") {
    topTopic = "Cobro ágil con QR Mercado Pago";
    topFriction = "Congestión de mesas en domingo";
  } else if (filters.brand === "Grido") {
    topTopic = "Precios económicos y promociones Club Grido";
    topFriction = "Saborizantes artificiales y atención fría";
  } else if (filters.brand === "Cremolatti") {
    topTopic = "Pistacchio di Bronte y ambientación de salón";
    topFriction = "Precio por kilo significativamente elevado";
  }

  // Dynamic Executive Insight Generator
  let contextLabel = "en la red general del NEA (90 sucursales)";
  if (filters.branch && filters.branch !== "Todas") {
    const br = CANONICAL_BRANCHES.find((b) => b.id === filters.branch);
    contextLabel = br ? `en ${br.name} (${br.city})` : `en la sucursal seleccionada`;
  } else if (filters.city && filters.city !== "Todas") {
    contextLabel = `en ${filters.city}`;
  } else if (filters.province && filters.province !== "Todas") {
    contextLabel = `en la provincia de ${filters.province}`;
  }

  let flavorAddon = "";
  if (filters.flavor && filters.flavor !== "Todos") {
    flavorAddon = ` focalizado en ${filters.flavor},`;
  }

  let brandLabel = filters.brand && filters.brand !== "Todas" ? filters.brand : "Duomo Helados";

  let executiveInsight = `Dentro del corpus analizado ${contextLabel}${flavorAddon}, ${brandLabel} sostiene un Net Sentiment de ${netSentimentScore > 0 ? "+" + netSentimentScore : netSentimentScore}. ${topTopic} lidera la favorabilidad, mientras que ${topFriction} concentra la principal señal de fricción operativa.`;

  if (isLowSample) {
    executiveInsight = `[Muestra reducida: ${totalAnalyzed} textos analizados ${contextLabel}]. Los indicadores reflejan tendencias iniciales que deben contextualizarse con el volumen público total (${publicReviewsContextTotal.toLocaleString()} opiniones registradas en Google).`;
  }

  // Timeline (Simulated monthly dynamic curve)
  const baseDuomo = filters.province === "Corrientes" ? 180 : filters.province === "Chaco" ? 140 : 280;
  const timeline = [
    { month: "Nov 2023", Duomo: Math.round(baseDuomo * 0.8), Grido: Math.round(baseDuomo * 0.75), Cremolatti: Math.round(baseDuomo * 0.3) },
    { month: "Dic 2023", Duomo: Math.round(baseDuomo * 1.3), Grido: Math.round(baseDuomo * 1.1), Cremolatti: Math.round(baseDuomo * 0.45) },
    { month: "Ene 2024", Duomo: Math.round(baseDuomo * 1.45), Grido: Math.round(baseDuomo * 1.25), Cremolatti: Math.round(baseDuomo * 0.5) },
    { month: "Feb 2024", Duomo: Math.round(baseDuomo * 1.2), Grido: Math.round(baseDuomo * 1.05), Cremolatti: Math.round(baseDuomo * 0.4) },
    { month: "Mar 2024", Duomo: Math.round(baseDuomo * 1.0), Grido: Math.round(baseDuomo * 0.9), Cremolatti: Math.round(baseDuomo * 0.35) },
    { month: "Abr 2024", Duomo: Math.round(baseDuomo * 0.95), Grido: Math.round(baseDuomo * 0.85), Cremolatti: Math.round(baseDuomo * 0.32) },
  ];

  return {
    totalAnalyzedConversations: totalAnalyzed,
    publicReviewsContextTotal,
    positivePct,
    neutralPct,
    negativePct,
    netSentimentScore,
    isLowSample,
    topTopic,
    topFriction,
    executiveInsight,
    sourcesBreakdown,
    timeline,
  };
}

// Dynamic Sentiment x Topic Matrix
export function computeSentimentTopicMatrix(filters: GlobalFilters): SentimentTopicMatrixRow[] {
  const filteredReviews = getFilteredReviews(filters);
  const total = filteredReviews.length || 1;

  // Base raw topics
  const rawTopics = [
    { name: "Sabor y Calidad de Receta", category: "Producto", baseWeight: 0.35, basePos: 0.90, baseNeu: 0.06, baseNeg: 0.04 },
    { name: "Atención al Cliente y Despacho", category: "Servicio", baseWeight: 0.25, basePos: 0.65, baseNeu: 0.18, baseNeg: 0.17 },
    { name: "Disponibilidad y Quiebre de Stock", category: "Operaciones", baseWeight: 0.18, basePos: 0.28, baseNeu: 0.16, baseNeg: 0.56 },
    { name: "Relación Precio / Calidad", category: "Precio", baseWeight: 0.22, basePos: 0.60, baseNeu: 0.22, baseNeg: 0.18 },
    { name: "Tiempos de Espera y Filas", category: "Operaciones", baseWeight: 0.15, basePos: 0.18, baseNeu: 0.16, baseNeg: 0.66 },
    { name: "Medios de Pago y Cobro QR", category: "Operaciones", baseWeight: 0.10, basePos: 0.42, baseNeu: 0.24, baseNeg: 0.34 },
    { name: "Infraestructura y Climatización", category: "Infraestructura", baseWeight: 0.12, basePos: 0.82, baseNeu: 0.12, baseNeg: 0.06 },
    { name: "Delivery y Envíos por Apps", category: "Servicio", baseWeight: 0.08, basePos: 0.32, baseNeu: 0.20, baseNeg: 0.48 },
  ];

  return rawTopics.map((t) => {
    // If we have filtered reviews, calculate directly from review topics
    const matchingReviews = filteredReviews.filter((r) =>
      r.topics.some((rt) => rt.toLowerCase().includes(t.name.toLowerCase().split(" ")[0])) ||
      r.aspects.some((a) => a.name.toLowerCase().includes(t.name.toLowerCase().split(" ")[0]))
    );

    let pos = matchingReviews.filter((r) => r.sentiment.label === "positive").length;
    let neu = matchingReviews.filter((r) => r.sentiment.label === "neutral").length;
    let neg = matchingReviews.filter((r) => r.sentiment.label === "negative").length;

    // If direct count is zero but total reviews exist, extrapolate realistic prototype proportions
    if (matchingReviews.length === 0 && total > 0) {
      const estimatedCount = Math.max(1, Math.round(total * t.baseWeight * 0.4));
      pos = Math.round(estimatedCount * t.basePos);
      neu = Math.round(estimatedCount * t.baseNeu);
      neg = Math.max(0, estimatedCount - pos - neu);
    }

    const mentions = pos + neu + neg;
    const net = mentions > 0 ? Math.round(((pos - neg) / mentions) * 100) : 0;

    return {
      topic: t.name,
      category: t.category,
      positiveCount: pos,
      neutralCount: neu,
      negativeCount: neg,
      totalMentions: mentions,
      netScore: net,
    };
  });
}

// Dynamic Topic Metrics for TopicsPage
export function computeTopicMetrics(filters: GlobalFilters): TopicMetric[] {
  const matrix = computeSentimentTopicMatrix(filters);
  const totalAnalyzed = getFilteredReviews(filters).length || 1;

  return matrix.map((m, idx) => ({
    id: `topic-${idx + 1}`,
    name: m.topic,
    category: m.category as any,
    mentionsCount: m.totalMentions,
    percentage: Math.min(100, Math.round((m.totalMentions / totalAnalyzed) * 100)),
    sentimentScore: m.netScore,
    trend: (idx % 2 === 0 ? 1 : -1) * (4 + (idx * 2)),
    isEmerging: m.topic.includes("Stock") || m.topic.includes("Dubai"),
    duomoScore: m.netScore,
    gridoScore: m.category === "Precio" ? 82 : m.netScore - 25,
    cremolattiScore: m.category === "Precio" ? -38 : m.netScore + 10,
    topPhrases: [
      `“${m.topic} es uno de los temas más comentados en la muestra.”`,
      `“Se registran opiniones en Google y redes sociales.”`,
    ],
    sourcesDistribution: [
      { name: "Google Reviews", pct: 64 },
      { name: "Instagram", pct: 24 },
      { name: "Facebook", pct: 12 },
    ],
    topFlavor: filters.flavor || "Dulce de Leche Duomo / Pistacho",
    topBranch: filters.branch ? "Sucursal seleccionada" : "Sucursal Bolívar / Peatonal Junín",
  }));
}

// Dynamic Flavor Detail for ProductsPage
export function computeFlavorInsight(flavorName: string, filters: GlobalFilters): ProductInsight {
  const filteredReviews = getFilteredReviews({ ...filters, flavor: flavorName });
  const count = filteredReviews.length;

  const pos = filteredReviews.filter((r) => r.sentiment.label === "positive").length;
  const neu = filteredReviews.filter((r) => r.sentiment.label === "neutral").length;
  const neg = filteredReviews.filter((r) => r.sentiment.label === "negative").length;

  const total = count > 0 ? count : 24;
  const posRatio = count > 0 ? Math.round((pos / total) * 100) : 85;
  const neuRatio = count > 0 ? Math.round((neu / total) * 100) : 8;
  const negRatio = count > 0 ? Math.round((neg / total) * 100) : 7;
  const netScore = posRatio - negRatio;

  const flavorDescriptions: Record<string, { desc: string; topPos: string; topFric: string; category: any }> = {
    "Chocolate Dubai": {
      desc: "Lanzamiento innovador con chocolate belga semi-amargo, relleno cremoso de pistacho puro y masa filo kataifi tostada crocante.",
      topPos: "Contraste de textura crujiente del kataifi y generosidad de la pasta de pistacho.",
      topFric: "Quiebre de stock prematuro antes de las 21:00 hs en Corrientes y Resistencia.",
      category: "Lanzamiento / Temporal",
    },
    "Pistacho": {
      desc: "Elaborado con pistachos importados seleccionados sin esencias artificiales ni colorantes agregados.",
      topPos: "Sabor auténtico y cremosidad superior comparado con heladerías industriales.",
      topFric: "Disponibilidad limitada en presentaciones de 1/4 y 1/2 kilo en horas pico.",
      category: "Artesanal Especial",
    },
    "Dulce de Leche Duomo con nueces": {
      desc: "Emblema tradicional de la casa con dulce de leche artesanal de campo y nueces mariposa seleccionadas.",
      topPos: "Generosidad en el sembrado de nueces crocantes y punto justo de dulzor.",
      topFric: "Variabilidad en el tamaño de trozos de nuez entre lotes de producción.",
      category: "Clásico",
    },
    "Sambayón con cerezas": {
      desc: "Receta tradicional italiana al oporto y vino marsala con yemas pasteurizadas y cerezas maceradas.",
      topPos: "Intensidad y equilibrio licoroso inigualable en la región del NEA.",
      topFric: "Preferido por público mayor; menor penetración en segmento joven.",
      category: "Clásico",
    },
    "Chocolate Amargo 70%": {
      desc: "Cacao fino de aroma al 70% de pureza con notas tostadas y bajo contenido de azúcar.",
      topPos: "Intensidad amarga real sin retrogusto graso.",
      topFric: "Textura más densa que dificulta el servido en cucurucho simple.",
      category: "Artesanal Especial",
    },
  };

  const info = flavorDescriptions[flavorName] || {
    desc: `Sabor destacado de Helados Duomo analizado a través de la voz del consumidor.`,
    topPos: "Calidad de ingredientes y consistencia artesanal.",
    topFric: "Disponibilidad en sucursales en fines de semana.",
    category: "Clásico",
  };

  return {
    id: `prod-${flavorName.toLowerCase().replace(/\s+/g, "-")}`,
    name: flavorName,
    category: info.category,
    volumeMentions: total,
    sentimentScore: Math.max(0, Math.min(100, Math.round((netScore + 100) / 2))),
    positiveRatio: posRatio,
    neutralRatio: neuRatio,
    negativeRatio: negRatio,
    trend: 14,
    topPositiveAspect: info.topPos,
    topFriction: info.topFric,
    salesIndex: 88,
    description: info.desc,
    provincesDistribution: [
      { province: "Misiones", mentions: Math.round(total * 0.45) },
      { province: "Corrientes", mentions: Math.round(total * 0.28) },
      { province: "Chaco", mentions: Math.round(total * 0.18) },
      { province: "Formosa", mentions: Math.round(total * 0.09) },
    ],
    topicsMatrix: [
      { topic: "Sabor y Receta", mentions: Math.round(total * 0.65), sentimentScore: 92 },
      { topic: "Disponibilidad / Stock", mentions: Math.round(total * 0.45), sentimentScore: -34 },
      { topic: "Relación Precio / Calidad", mentions: Math.round(total * 0.35), sentimentScore: 78 },
      { topic: "Presentación y Envase", mentions: Math.round(total * 0.20), sentimentScore: 65 },
    ],
  };
}

// Compute Evidence Context Data
export function computeEvidenceContextData(
  mentionCount: number,
  filters: GlobalFilters,
  customTopic?: string
): EvidenceContextData {
  const filteredReviews = getFilteredReviews(filters);
  const totalAnalyzed = filteredReviews.length || 1;
  const share = Math.min(100, Number(((mentionCount / totalAnalyzed) * 100).toFixed(1)));

  const overview = computeDynamicOverviewMetrics(filters);

  let signalStrength: "Alta" | "Media" | "Baja / Muestra reducida" = "Alta";
  if (totalAnalyzed < 10 || mentionCount < 4) {
    signalStrength = "Baja / Muestra reducida";
  } else if (totalAnalyzed < 30 || mentionCount < 10) {
    signalStrength = "Media";
  }

  return {
    mentionCount,
    shareOfAnalyzedCorpus: share,
    analyzedCorpusTotal: totalAnalyzed,
    publicReviewsTotal: overview.publicReviewsContextTotal,
    googleRating: 4.6,
    sourcesCount: overview.sourcesBreakdown.length || 3,
    periodLabel: filters.period || "Últimos 90 días",
    signalStrength,
    dataType: "prototype",
  };
}

export interface TimeSlotAnalysis {
  timeSlot: TimeSlot;
  label: string;
  count: number;
  pctOfCorpus: number;
  positivePct: number;
  neutralPct: number;
  negativePct: number;
  netScore: number;
  topTopic: string;
  topFriction: string;
}

export function computeTimeSlotAnalytics(filters: GlobalFilters): {
  slots: TimeSlotAnalysis[];
  weekendVsWeekday: {
    weekendCount: number;
    weekendNetScore: number;
    weekendNegativePct: number;
    weekdayCount: number;
    weekdayNetScore: number;
    weekdayNegativePct: number;
  };
} {
  const reviews = getFilteredReviews(filters);
  const total = reviews.length || 1;

  const slotLabels: Record<TimeSlot, string> = {
    Morning: "Turno Mañana (08:00 - 12:00)",
    Afternoon: "Turno Tarde / Siesta (12:00 - 19:30)",
    Night: "Turno Noche / Cierre (20:00 - 00:00+)",
    Unknown: "Sin horario explícito",
  };

  const slotDefaults: Record<TimeSlot, { topTopic: string; topFriction: string }> = {
    Morning: { topTopic: "Atención al cliente", topFriction: "Apertura puntual de local" },
    Afternoon: { topTopic: "Sabores clásicos & Merienda", topFriction: "Disponibilidad de cambio" },
    Night: { topTopic: "Tiempo de espera y filas", topFriction: "Demoras en caja y stock de Pistacho" },
    Unknown: { topTopic: "Calidad de producto general", topFriction: "Fricciones generales" },
  };

  const slotsOrder: TimeSlot[] = ["Morning", "Afternoon", "Night", "Unknown"];

  const slots: TimeSlotAnalysis[] = slotsOrder.map((slot) => {
    const subset = reviews.filter((r) => r.timeSlot === slot);
    const count = subset.length;
    const pctOfCorpus = Number(((count / total) * 100).toFixed(1));

    const posCount = subset.filter((r) => r.sentiment.label === "positive").length;
    const neuCount = subset.filter((r) => r.sentiment.label === "neutral").length;
    const negCount = subset.filter((r) => r.sentiment.label === "negative").length;

    const subTotal = count || 1;
    const positivePct = Math.round((posCount / subTotal) * 100);
    const neutralPct = Math.round((neuCount / subTotal) * 100);
    const negativePct = Math.round((negCount / subTotal) * 100);
    const netScore = positivePct - negativePct;

    return {
      timeSlot: slot,
      label: slotLabels[slot],
      count,
      pctOfCorpus,
      positivePct,
      neutralPct,
      negativePct,
      netScore,
      topTopic: slotDefaults[slot].topTopic,
      topFriction: slotDefaults[slot].topFriction,
    };
  });

  // Weekend vs Weekday
  const weekendSubset = reviews.filter((r) => r.isWeekend);
  const weekdaySubset = reviews.filter((r) => !r.isWeekend);

  const wPos = weekendSubset.filter((r) => r.sentiment.label === "positive").length;
  const wNeg = weekendSubset.filter((r) => r.sentiment.label === "negative").length;
  const wTotal = weekendSubset.length || 1;
  const weekendNetScore = Math.round(((wPos - wNeg) / wTotal) * 100);
  const weekendNegativePct = Math.round((wNeg / wTotal) * 100);

  const dPos = weekdaySubset.filter((r) => r.sentiment.label === "positive").length;
  const dNeg = weekdaySubset.filter((r) => r.sentiment.label === "negative").length;
  const dTotal = weekdaySubset.length || 1;
  const weekdayNetScore = Math.round(((dPos - dNeg) / dTotal) * 100);
  const weekdayNegativePct = Math.round((dNeg / dTotal) * 100);

  return {
    slots,
    weekendVsWeekday: {
      weekendCount: weekendSubset.length,
      weekendNetScore,
      weekendNegativePct,
      weekdayCount: weekdaySubset.length,
      weekdayNetScore,
      weekdayNegativePct,
    },
  };
}

