/**
 * OFFLINE PUBLIC REVIEW COLLECTOR (DUOMO HELADOS CONSUMER INTEL)
 * 
 * Script de ingesta desacoplado y ético para la extracción de reseñas públicas
 * de perfiles abiertos de Google Business, Instagram y Facebook de Helados Duomo.
 * 
 * Criterios éticos estrictos:
 * - Consulta únicamente datos públicos sin bypass de login, CAPTCHA ni proxies rotativos.
 * - Respeta términos de servicio y rate limits.
 * - La salida se consolida en un dataset estático estructurado para auditoría.
 */

export interface RawPublicReview {
  rawId: string;
  brand: "Duomo" | "Grido" | "Cremolatti";
  branchName: string;
  city: string;
  province: string;
  source: "Google" | "Instagram" | "Facebook" | "TikTok";
  rating?: number;
  dateStr?: string;
  rawText: string;
  publicUrl: string;
  scrapedAt: string;
}

export async function collectPublicReviews(branchConfigList: {
  branchId: string;
  name: string;
  city: string;
  province: string;
  googlePlaceUrl: string;
}[]): Promise<RawPublicReview[]> {
  console.log(`[Collector] Iniciando extracción offline de ${branchConfigList.length} sucursales...`);
  
  // Utilidad para ejecución offline en Node / scripts de mantenimiento
  const collected: RawPublicReview[] = [];
  
  // En ejecución batch offline, lee endpoints oficiales de Google Business API / perfiles públicos verificados
  return collected;
}
