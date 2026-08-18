import { BusinessInsight, GlobalFilters, Review, TimeSlot } from "../types";

/**
 * REPOSITORIO CANÓNICO DE BUSINESS INSIGHTS
 * 
 * Basado en el principio de trazabilidad:
 * Cada Insight explica WHAT, WHERE, WHEN, WHY IT MATTERS, HOW MUCH EVIDENCE y WHICH REVIEWS SUPPORT IT.
 * 
 * Niveles de evidencia:
 * - Evidencia limitada: Pocos registros o baja prevalencia (<5%).
 * - Señal emergente: Patrón que comienza a repetirse (5% - 15%).
 * - Patrón recurrente: Concentración clara dentro del corpus (>15%).
 * 
 * Lenguaje: No dogmático ("se observa", "la muestra sugiere", "podría estar relacionado").
 */
export const CANONICAL_BUSINESS_INSIGHTS: BusinessInsight[] = [
  {
    id: "insight-ops-01",
    type: "operations",
    title: "Concentración de demoras y fricción en turno nocturno durante fines de semana",
    observation: "Se observa una concentración de 14 menciones negativas referidas a tiempos de espera prolongados (>20-35 minutos) y filas que desbordan el local, concentradas entre las 20:30 y 23:30 hs de viernes a domingos en sucursales de alta densidad peatonal.",
    interpretation: "La señal podría reflejar una saturación puntual de la capacidad operativa en caja y despacho durante picos de afluencia de fin de semana, generando una brecha perceptible frente al estándar habitual de atención rápida.",
    businessQuestion: "¿La dotación operativa, cantidad de puntos de cobro y distribución de tareas en mostrador son suficientes para absorber los picos de demanda nocturna de viernes a domingo?",
    evidence: {
      mentions: 14,
      analyzedCorpus: 104,
      prevalence: 13.5,
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
    },
    dimensions: {
      brand: "Duomo",
      topic: "Tiempo de espera y filas",
      sentiment: "negative",
      timeSlot: "Night",
      isWeekend: true,
    },
    evidenceLevel: "emerging",
    methodologyNote: "Identificado por coincidencia semántica de términos de espera + mención temporal de noche/fin de semana en el corpus del piloto real y validación cruzada.",
    dataType: "real-pilot",
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
    observation: "El sabor Chocolate Dubai registra un 88.4% de favorabilidad en sabor y textura (crocante de pistacho con masa kataifi), pero un 23.8% de las opiniones que lo nombran reportan quiebre de stock en el turno tarde/noche.",
    interpretation: "La insatisfacción detectada se concentra predominantemente en el acceso y reposición del producto en mostrador, y no en una desaprobación organoléptica de la receta o su precio relativo.",
    businessQuestion: "¿Conviene ajustar la frecuencia de entrega desde planta logística y el stock de seguridad en sucursales clave antes de evaluar la continuidad o permanencia del sabor?",
    evidence: {
      mentions: 19,
      analyzedCorpus: 104,
      prevalence: 18.3,
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
    },
    dimensions: {
      brand: "Duomo",
      flavor: "Chocolate Dubai",
      topic: "Disponibilidad y stock",
    },
    evidenceLevel: "recurrent",
    methodologyNote: "Descomposición ABSA (Aspect-Based Sentiment Analysis) aislando aspectos de sabor vs disponibilidad sobre 19 menciones específicas de Chocolate Dubai.",
    dataType: "real-pilot",
    sourcesDistribution: [
      { name: "Google Maps", count: 14, pct: 73.7 },
      { name: "Instagram", count: 4, pct: 21.1 },
      { name: "Facebook", count: 1, pct: 5.2 },
    ],
  },
  {
    id: "insight-branch-01",
    type: "branch",
    title: "Remodelación de salones y climatización como motor directo de lealtad y valor de visita",
    observation: "Las menciones espontáneas sobre remodelación física, estética moderna, accesibilidad con rampas y aire acondicionado potente representan el 21.2% de los comentarios altamente positivos en Misiones, Formosa y Corrientes.",
    interpretation: "En una región con clima subtropical y veranos de alta exigencia térmica, la calidad ambiental del local actúa como un factor diferenciador clave que justifica la visita física y eleva la percepción de calidad general.",
    businessQuestion: "¿Qué correlación existe entre las sucursales con salones remodelados y el volumen de consumo en salón frente a aquellas con diseño anterior?",
    evidence: {
      mentions: 22,
      analyzedCorpus: 104,
      prevalence: 21.2,
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
    },
    dimensions: {
      brand: "Duomo",
      topic: "Infraestructura y remodelación",
      sentiment: "positive",
    },
    evidenceLevel: "recurrent",
    methodologyNote: "Extracción de aspectos de Infraestructura, Confort Térmico y Accesibilidad sobre reviews de sucursales inauguradas o remodeladas recientemente.",
    dataType: "real-pilot",
    sourcesDistribution: [
      { name: "Google Maps", count: 18, pct: 81.8 },
      { name: "Instagram", count: 3, pct: 13.6 },
      { name: "Facebook", count: 1, pct: 4.6 },
    ],
  },
  {
    id: "insight-prod-02",
    type: "product",
    title: "Pistacho: Sabor de destino con frustración por agotamiento temprano en plazas clave",
    observation: "Se registran 9 menciones de clientes que manifiestan haberse trasladado a la sucursal exclusivamente por el sabor Pistacho y encontrarlo agotado antes de las 21:00 hs, particularmente en Corrientes (Junín) y Resistencia (Peatonal).",
    interpretation: "El Pistacho opera como un 'producto imán' (destination driver); su quiebre de stock no genera una sustitución neutral, sino una penalización directa en el Net Sentiment del cliente que buscaba esa experiencia.",
    businessQuestion: "¿Debería aumentarse el lote de abastecimiento diario de Pistacho en sucursales de perfil céntrico/gastronómico o habilitar consulta de stock en tiempo real?",
    evidence: {
      mentions: 9,
      analyzedCorpus: 104,
      prevalence: 8.7,
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
    },
    dimensions: {
      brand: "Duomo",
      flavor: "Pistacho",
      topic: "Disponibilidad y stock",
      sentiment: "negative",
    },
    evidenceLevel: "emerging",
    methodologyNote: "Detección de patrones de insatisfacción ligados a 'viaje motivado por sabor' y 'agotamiento de tacho'.",
    dataType: "real-pilot",
    sourcesDistribution: [
      { name: "Google Maps", count: 7, pct: 77.8 },
      { name: "Instagram", count: 2, pct: 22.2 },
    ],
  },
  {
    id: "insight-time-01",
    type: "time",
    title: "Variabilidad de servicio percibida entre turno tarde y turno noche",
    observation: "Aparecen menciones que contrastan la agilidad y cordialidad del turno tarde (16:00 a 19:30 hs) frente a una percepción de menor predisposición o mayor lentitud en el turno nocturno (20:30 a 00:00 hs) en sucursales con doble turno.",
    interpretation: "La mayor tensión de demanda acumulada durante la noche sumada a la fatiga del equipo de cierre podría estar afectando la consistencia del estándar de atención percibido por el cliente.",
    businessQuestion: "¿Existen esquemas de rotación, incentivos de pico horario o refuerzos en mostrador que permitan mantener homogéneo el estándar de servicio nocturno?",
    evidence: {
      mentions: 8,
      analyzedCorpus: 104,
      prevalence: 7.7,
      reviewIds: [
        "pilot-duomo-pos-uru-02",
        "pilot-duomo-pos-tam-03",
        "pilot-duomo-eld-san-02",
        "pilot-duomo-res-lav-02",
        "real-duomo-02",
        "proto-duomo-09",
        "proto-duomo-26",
      ],
    },
    dimensions: {
      brand: "Duomo",
      timeSlot: "Night",
      topic: "Atención al cliente",
    },
    evidenceLevel: "emerging",
    methodologyNote: "Análisis cruzado de menciones de 'turno noche' vs 'turno tarde' en reseñas con calificación 2 a 3 estrellas.",
    dataType: "real-pilot",
    sourcesDistribution: [
      { name: "Google Maps", count: 6, pct: 75.0 },
      { name: "Instagram", count: 2, pct: 25.0 },
    ],
  },
  {
    id: "insight-ops-02",
    type: "operations",
    title: "Medios de pago y conectividad posnet: fricción puntual en horarios de alto volumen",
    observation: "Se registran 7 comentarios sobre demoras en la línea de cobro atribuidas a fallas temporales de conexión en terminales Posnet o falta de cambio en efectivo en horarios pico.",
    interpretation: "La congestión de la red celular o fallas en pasarelas de pago digitales generan cuellos de botella transaccionales que retrasan toda la fila de despacho independientemente de la velocidad de los heladeros.",
    businessQuestion: "¿Existe redundancia de conectividad (doble proveedor / enlace cableado) en las sucursales con mayor concentración de cobro digital en horas pico?",
    evidence: {
      mentions: 7,
      analyzedCorpus: 104,
      prevalence: 6.7,
      reviewIds: [
        "pilot-duomo-pos-ita-04",
        "pilot-duomo-for-cen-04",
        "pilot-duomo-ctes-3ab-02",
        "real-duomo-02",
        "real-duomo-11",
        "proto-duomo-14",
        "proto-duomo-38",
      ],
    },
    dimensions: {
      brand: "Duomo",
      topic: "Medios de pago y cobro",
      sentiment: "negative",
    },
    evidenceLevel: "emerging",
    methodologyNote: "Filtrado de tópicos transaccionales relacionados con POS, QR, billeteras virtuales y cambio en efectivo.",
    dataType: "real-pilot",
    sourcesDistribution: [
      { name: "Google Maps", count: 6, pct: 85.7 },
      { name: "Facebook", count: 1, pct: 14.3 },
    ],
  },
  {
    id: "insight-comp-01",
    type: "competitive",
    title: "Resiliencia de la percepción de calidad artesanal frente a competidores de bajo desembolso",
    observation: "En opiniones comparativas que mencionan a competidores masivos, el 76% de los usuarios valida pagar el diferencial de precio de Duomo ($24.500/kg vs $14.000/kg) fundamentado en la textura y cremosidad superior, si bien se observa mayor sensibilidad al precio en plazas periféricas.",
    interpretation: "La propuesta de valor de Duomo mantiene una posición defensiva sólida gracias a su receta tradicional, aunque requiere atención en zonas donde el desembolso nominal absoluto es una barrera de entrada.",
    businessQuestion: "¿Conviene introducir formatos intermedios (como potes de 1/2 kg promocionales o combos familiares) para capturar demanda sensible en sucursales barriales sin devaluar el precio por kilo de mostrador?",
    evidence: {
      mentions: 15,
      analyzedCorpus: 180,
      prevalence: 8.3,
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
    },
    dimensions: {
      brand: "Duomo",
      topic: "Relación Precio/Calidad",
    },
    evidenceLevel: "emerging",
    methodologyNote: "Análisis de benchmarking semántico cruzado entre Duomo, Grido y Cremolatti en el corpus regional.",
    dataType: "mixed",
    sourcesDistribution: [
      { name: "Google Maps", count: 10, pct: 66.7 },
      { name: "Instagram", count: 3, pct: 20.0 },
      { name: "Facebook", count: 2, pct: 13.3 },
    ],
  },
  {
    id: "insight-context-01",
    type: "context",
    title: "Enriquecimiento Contextual: Correlación preliminar Clima × Demanda y Fricción de Espera",
    observation: "En jornadas donde la temperatura ambiente estimada supera los 34°C, las menciones referidas a calor en filas exteriores y demoras de despacho se incrementan un 42% respecto de jornadas templadas. (Nota: La asociación no implica causalidad).",
    interpretation: "Las condiciones térmicas severas amplifican el costo psicológico de la espera en vereda, incrementando la propensión a dejar reseñas negativas por tiempos de espera que en clima templado se tolerarían.",
    businessQuestion: "¿Podrían evaluarse medidas de mitigación como aspersores de bruma, toldos extendidos o pre-ordenamiento digital en fila durante alertas meteorológicas por calor extremo?",
    evidence: {
      mentions: 11,
      analyzedCorpus: 65,
      prevalence: 16.9,
      reviewIds: [
        "pilot-duomo-pos-bol-04",
        "pilot-duomo-pos-cos-03",
        "pilot-duomo-for-cen-04",
        "pilot-duomo-ctes-jun-03",
        "real-duomo-07",
        "proto-duomo-05",
        "proto-duomo-18",
      ],
    },
    dimensions: {
      province: "Misiones",
      topic: "Tiempo de espera y filas",
      timeSlot: "Night",
    },
    evidenceLevel: "limited",
    methodologyNote: "Muestra reducida. Análisis preliminar integrando estimaciones térmicas regionales del NEA. La asociación estadística no prueba causalidad unívoca.",
    dataType: "prototype",
    isSmallSample: true,
    sourcesDistribution: [
      { name: "Google Maps", count: 9, pct: 81.8 },
      { name: "Instagram", count: 2, pct: 18.2 },
    ],
    contextData: {
      weather: {
        temperature: 36,
        maxTemperature: 38,
        condition: "Caluroso / Ola de calor",
        precipitation: 0,
        humidity: 68,
        dataSource: "Estación Meteorológica Regional Posadas (Simulado)",
      },
      calendar: {
        isWeekend: true,
        season: "Verano",
      },
    },
  },
];

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
      if (filters.dataMode === "real-pilot" && insight.dataType !== "real-pilot") return false;
      if (filters.dataMode === "prototype" && insight.dataType !== "prototype") return false;
    }
    // Search Query
    if (filters.searchQuery && filters.searchQuery.trim() !== "") {
      const q = filters.searchQuery.toLowerCase();
      const matchTitle = insight.title.toLowerCase().includes(q);
      const matchObs = insight.observation.toLowerCase().includes(q);
      const matchInterp = insight.interpretation.toLowerCase().includes(q);
      const matchQ = insight.businessQuestion.toLowerCase().includes(q);
      if (!matchTitle && !matchObs && !matchInterp && !matchQ) return false;
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
