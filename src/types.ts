export type Brand = "Duomo" | "Grido" | "Cremolatti" | "Todas";
export type SentimentLabel = "positive" | "neutral" | "negative";
export type DataType = "real" | "prototype";
export type Source = "Google" | "Instagram" | "Facebook" | "TikTok" | "YouTube" | "Tripadvisor" | "Other";
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
  city: string;
  province: "Misiones" | "Corrientes" | "Chaco" | "Formosa";
  country: "Argentina";
  source: Source;
  date: string;
  rating?: number;
  text: string;
  dataType: DataType;
  sourceUrl?: string;
  sentiment: {
    label: SentimentLabel;
    score: number; // -1 to 1
  };
  aspects: AspectSentiment[];
  topics: string[];
}

export interface FilterState {
  period: string;
  brand: Brand;
  province: Province;
  branch: string;
  source: string;
  sentiment: string;
  topic: string;
  searchQuery: string;
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
  branches: {
    name: string;
    city: string;
    reviewsCount: number;
    sentimentScore: number;
    trend: number;
    topIssue: string;
  }[];
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
  status: "Supported" | "Mixed" | "Not Supported";
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
