export type Brand = "Duomo" | "Grido" | "Cremolatti" | "Todas";
export type SentimentLabel = "positive" | "neutral" | "negative";
export type DataType = "real" | "prototype" | "real-pilot" | "unverified-seed";
export type Source = "Google" | "Instagram" | "Facebook" | "TikTok" | "YouTube" | "Tripadvisor" | "Todas";
export type Province = "Misiones" | "Corrientes" | "Chaco" | "Formosa" | "Todas";

export interface AspectSentiment {
  name: string;
  sentiment: SentimentLabel;
  confidence: number;
  snippet?: string;
}

export interface Review {
  id: string;
  brand: "Duomo" | "Grido" | "Cremolatti";
  branch?: string;
  branchName?: string;
  branchId?: string;
  city: string;
  province: "Misiones" | "Corrientes" | "Chaco" | "Formosa";
  country: "Argentina";
  source: Source;
  date: string;
  rating?: number;
  text: string;
  author?: string;
  flavor?: string;
  dataType: DataType;
  sourceUrl?: string;
  url?: string;
  collectedAt?: string;
  sentiment: {
    label: SentimentLabel;
    score: number; // -1 to 1
  };
  aspects: AspectSentiment[];
  topics: string[];
}

export interface RealPilotReview {
  id: string;
  brand: "Duomo";
  branchId: string;
  branchName: string;
  city: string;
  province: string;
  source: string;
  rating?: number;
  reviewDate?: string;
  text: string;
  sourceUrl: string;
  collectedAt: string;
  dataType: "real-pilot";
  sentimentLabel?: SentimentLabel;
  sentimentScore?: number;
  topics?: string[];
  flavorMentioned?: string;
}

export interface GlobalFilters {
  brand: string | null;      // "Duomo" | "Grido" | "Cremolatti" | null
  province: string | null;   // "Misiones" | "Corrientes" | "Chaco" | "Formosa" | null
  city: string | null;       // "Posadas" | "Oberá" | "Corrientes" | etc. | null
  branch: string | null;     // Branch ID or name | null
  flavor: string | null;     // "Chocolate Dubai" | "Pistacho" | etc. | null
  topic: string | null;      // "Disponibilidad" | "Atención" | etc. | null
  sentiment: string | null;  // "positive" | "neutral" | "negative" | null
  source: string | null;     // "Google" | "Instagram" | "Facebook" | "TikTok" | null
  period: string | null;     // "Últimos 90 días" | "Últimos 30 días" | "Año Móvil" | null
  searchQuery: string;
  dataMode?: "all" | "prototype" | "real-pilot" | "unverified-seed" | null;
  dataTypeFilter?: "Todas" | "real-pilot" | "prototype" | "unverified-seed" | null;
}

export type FilterState = GlobalFilters;

export interface Branch {
  id: string;
  brand: "Duomo" | "Grido" | "Cremolatti";
  name: string;
  city: string;
  province: "Misiones" | "Corrientes" | "Chaco" | "Formosa";
  address: string;
  reviewsCount?: number;
  sentimentScore?: number;
  topIssue?: string;
  googleProfile?: {
    rating: number;
    totalReviews: number;
    url?: string;
    lastChecked?: string;
    dataType: "real" | "prototype";
  };
  analyzedCorpus: {
    googleReviews: number;
    socialComments: number;
    totalAnalyzed: number;
  };
  sentiment: {
    positivePct: number;
    neutralPct: number;
    negativePct: number;
    netScore: number; // -100 to +100
  };
  topTopic: string;
  mainFriction: string;
  trend: number;
  topFlavorsMentioned: string[];
}

export interface EvidenceContextData {
  mentionCount: number;
  shareOfAnalyzedCorpus: number; // Percentage e.g. 17.5
  analyzedCorpusTotal: number;   // e.g. 80
  publicReviewsTotal?: number;   // e.g. 950 (Google Reviews public count)
  googleRating?: number;         // e.g. 4.7
  sourcesCount: number;          // e.g. 3
  periodLabel: string;           // e.g. "Últimos 90 días"
  signalStrength: "Alta" | "Media" | "Baja / Muestra reducida";
  dataType: "real" | "prototype" | "derived";
}

export interface DynamicOverviewMetrics {
  totalAnalyzedConversations: number;
  publicReviewsContextTotal: number;
  positivePct: number;
  neutralPct: number;
  negativePct: number;
  netSentimentScore: number; // -100 to +100
  isLowSample: boolean;
  topTopic: string;
  topFriction: string;
  executiveInsight: string;
  sourcesBreakdown: { name: string; count: number; pct: number }[];
  timeline: { month: string; Duomo: number; Grido: number; Cremolatti: number }[];
}

export interface TopicMetric {
  id: string;
  name: string;
  category: "Producto" | "Servicio" | "Precio" | "Operaciones" | "Infraestructura";
  mentionsCount: number;
  percentage: number;
  sentimentScore: number; // -100 to +100
  trend: number; // % change
  isEmerging?: boolean;
  duomoScore: number;
  gridoScore: number;
  cremolattiScore: number;
  topPhrases: string[];
  sourcesDistribution?: { name: string; pct: number }[];
  topFlavor?: string;
  topBranch?: string;
}

export interface SentimentTopicMatrixRow {
  topic: string;
  category: string;
  positiveCount: number;
  neutralCount: number;
  negativeCount: number;
  totalMentions: number;
  netScore: number;
}

export interface ProductInsight {
  id: string;
  name: string;
  category: "Artesanal Especial" | "Clásico" | "Lanzamiento / Temporal" | "Postres";
  volumeMentions: number;
  sentimentScore: number; // 0 to 100
  positiveRatio: number;
  neutralRatio: number;
  negativeRatio: number;
  trend: number;
  topPositiveAspect: string;
  topFriction: string;
  provincesDistribution: { province: string; mentions: number }[];
  salesIndex: number; // Simulated commercial metric
  description: string;
  topicsMatrix?: { topic: string; mentions: number; sentimentScore: number }[];
}

export interface RegionalBranchSummary {
  name: string;
  city: string;
  reviewsCount: number;
  sentimentScore: number;
  trend: number;
  topIssue: string;
}

export interface RegionalMetric {
  province: "Misiones" | "Corrientes" | "Chaco" | "Formosa";
  totalReviews: number;
  branchesCount: number;
  positivePct: number;
  neutralPct: number;
  negativePct: number;
  mainStrength: string;
  mainFriction: string;
  sentimentIndex: number;
  topTopics: string[];
  branches: RegionalBranchSummary[];
}

export interface PromotionMetric {
  id: string;
  title: string;
  brand: "Duomo" | "Grido" | "Cremolatti";
  dates: string;
  status: "Finalizada" | "Activa" | "Planificada";
  beforeVolume: number;
  duringVolume: number;
  afterVolume: number;
  beforeSentiment: number;
  duringSentiment: number;
  afterSentiment: number;
  promotionMentions: number;
  salesImpactIndex: number; // Simulated
  keyTakeaway: string;
  timeline: {
    day: string;
    volume: number;
    sentiment: number;
    event?: string;
  }[];
}

export interface CompetitiveHypothesis {
  id: string;
  title: string;
  brandFocus: "Grido" | "Cremolatti" | "Duomo";
  hypothesisText: string;
  status: "Supported" | "Mixed" | "Not Conclusive";
  statusDescription: string;
  priceMentionsPct: number;
  promotionMentionsPct: number;
  qualityMentionsPct: number;
  sentimentDelta: string;
  evidenceSummary: string;
}

export interface DecisionScenario {
  id: string;
  productName: string;
  province: string;
  timeframe: string;
  commercialMetric: {
    salesVolumeIndex: number; // 1-100
    marginLevel: "Alto" | "Medio" | "Bajo";
    growthRate: number;
  };
  consumerMetric: {
    sentimentScore: number;
    positiveRatio: number;
    volumeMentions: number;
    npsProxy: number;
  };
  operationalMetric: {
    availabilityFrictionPct: number;
    productionCapacityStress: "Normal" | "Moderado" | "Crítico";
    ingredientSourcing: "Estable" | "Tensión en insumo";
  };
  competitiveMetric: {
    competitorOffering: string;
    relativePricePosition: "Similar" | "Más accesible" | "Premium";
    sentimentAdvantage: string;
  };
  decisionSignal: {
    badge: "SEÑAL POSITIVA DESTACADA" | "SEÑAL A MONITOREAR" | "REVISIÓN REQUERIDA" | "EXPLORAR PERMANENCIA";
    color: "emerald" | "amber" | "rose" | "blue";
    signalTitle: string;
    narrativeSummary: string;
    checklistToValidate: string[];
  };
}
