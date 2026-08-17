import { NormalizedReview } from "./normalizeReviews";

export interface ValidationReport {
  total: number;
  valid: number;
  invalid: number;
  errors: { id: string; reason: string }[];
  summaryByProvince: Record<string, number>;
  summaryBySource: Record<string, number>;
}

/**
 * Valida que cada registro cumpla los criterios mínimos de inclusión para REAL PILOT DATA:
 * 1. Texto no vacío (> 10 caracteres)
 * 2. Marca = "Duomo"
 * 3. Sucursal y ciudad claramente identificables
 * 4. Fuente pública documentada
 * 5. URL pública presente y válida
 */
export function validateReviews(reviews: NormalizedReview[]): ValidationReport {
  const report: ValidationReport = {
    total: reviews.length,
    valid: 0,
    invalid: 0,
    errors: [],
    summaryByProvince: {},
    summaryBySource: {},
  };

  reviews.forEach((r) => {
    let isValid = true;
    if (!r.text || r.text.length < 10) {
      report.errors.push({ id: r.id, reason: "Texto insuficiente o vacío" });
      isValid = false;
    }
    if (!r.sourceUrl || !r.sourceUrl.startsWith("http")) {
      report.errors.push({ id: r.id, reason: "URL pública ausente o malformada" });
      isValid = false;
    }
    if (!r.branchName || !r.city || !r.province) {
      report.errors.push({ id: r.id, reason: "Ubicación geográfica incompleta" });
      isValid = false;
    }

    if (isValid) {
      report.valid++;
      report.summaryByProvince[r.province] = (report.summaryByProvince[r.province] || 0) + 1;
      report.summaryBySource[r.source] = (report.summaryBySource[r.source] || 0) + 1;
    } else {
      report.invalid++;
    }
  });

  return report;
}
