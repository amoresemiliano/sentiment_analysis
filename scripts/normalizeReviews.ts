import { RawPublicReview } from "./collectPublicReviews";

export interface NormalizedReview {
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
}

/**
 * Normaliza textos brutos, anonimiza nombres de clientes y estandariza fechas.
 */
export function normalizeReviews(rawReviews: RawPublicReview[]): NormalizedReview[] {
  return rawReviews.map((r, idx) => ({
    id: `pilot-${r.brand.toLowerCase()}-${r.city.toLowerCase().replace(/\s+/g, "")}-${idx + 1}`,
    brand: "Duomo",
    branchId: r.rawId,
    branchName: r.branchName,
    city: r.city,
    province: r.province,
    source: r.source,
    rating: r.rating,
    reviewDate: r.dateStr,
    text: r.rawText.trim(),
    sourceUrl: r.publicUrl,
    collectedAt: r.scrapedAt || new Date().toISOString().split("T")[0],
    dataType: "real-pilot",
  }));
}
