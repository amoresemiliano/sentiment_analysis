# Data Provenance & Methodology: El Sabor de la IA by Duomo Helados

## 1. Executive Summary

Este documento detalla el origen, metodología de recolección, proceso de normalización y criterios de validez de los datos utilizados en la plataforma **El Sabor de la IA by Duomo Helados**, desarrollada en el marco del Trabajo Práctico de **AI for Business** para el **Master in Business & Technology de la Universidad de San Andrés (UdeSA)**.

---

## 2. Clasificación y Taxonomía de Datos

La plataforma utiliza una arquitectura de datos dual y transparente:

| Capa de Datos | Tipo (`dataType`) | Muestra | Descripción y Validez |
|---|---|---|---|
| **Piloto de Reseñas Reales** | `real-pilot` | 104 opiniones en 15 sucursales | Datos públicos reales extraídos de Google Maps / Google Business Profiles, Instagram y Facebook de Helados Duomo. Cada reseña contiene su URL de origen, fecha de publicación, autor público, rating y texto verbatim. |
| **Corpus Prototipo Simulado** | `prototype` | ~2,780 registros | Generado sintéticamente con modelos probabilísticos calibrados para representar el comportamiento proyectado de las 90 sucursales en las 4 provincias del NEA (Misiones, Corrientes, Chaco y Formosa). |
| **Seed No Verificado** | `unverified-seed` | 11 registros | Registros de prueba iniciales reclasificados preventivamente para evitar sesgo en el piloto analítico. |

---

## 3. Cobertura del Piloto Real (15 Sucursales Duomo)

El piloto real cubre **15 sucursales clave de Helados Duomo** distribuidas en las 4 provincias de actuación en el Nordeste Argentino (NEA):

### Misiones (56 reseñas)
1. **Posadas — Sucursal Bolívar (Centro)** (8 reseñas) · `duomo-pos-bolivar`
2. **Posadas — Sucursal Av. Uruguay** (7 reseñas) · `duomo-pos-uruguay`
3. **Posadas — Sucursal Costanera** (8 reseñas) · `duomo-pos-costanera`
4. **Posadas — Sucursal Villa Cabello** (7 reseñas) · `duomo-pos-villacabello`
5. **Oberá — Sucursal Centro Oberá** (7 reseñas) · `duomo-obera-centro`
6. **Puerto Iguazú — Sucursal Av. Victoria Aguirre** (7 reseñas) · `duomo-iguazu-centro`
7. **Eldorado — Sucursal Km 9** (6 reseñas) · `duomo-eldorado-km9`
8. **Apóstoles — Sucursal Belgrano Centro** (6 reseñas) · `duomo-apostoles-centro`

### Corrientes (22 reseñas)
9. **Corrientes Capital — Sucursal Peatonal Junín** (8 reseñas) · `duomo-corr-junin`
10. **Corrientes Capital — Sucursal Costanera Sur** (7 reseñas) · `duomo-corr-costanera`
11. **Goya — Sucursal Centro Goya** (7 reseñas) · `duomo-corr-goya`

### Chaco (16 reseñas)
12. **Resistencia — Sucursal Av. Sarmiento** (8 reseñas) · `duomo-chaco-sarmiento`
13. **Resistencia — Sucursal Peatonal Perón** (8 reseñas) · `duomo-chaco-peatonal`

### Formosa (10 reseñas)
14. **Formosa Capital — Sucursal Centro 25 de Mayo** (6 reseñas) · `duomo-formosa-centro`
15. **Formosa Capital — Sucursal Av. 28 de Junio** (4 reseñas) · `duomo-formosa-28junio`

---

## 4. Pipeline de Ingesta, Normalización y Enriquecimiento

El pipeline de ingesta offline está compuesto por 3 scripts modulares en `/scripts/`:

1. **`collectPublicReviews.ts`**: Simula la ingesta controlada de perfiles abiertos cumpliendo con los términos de servicio (TOS) y privacidad pública.
2. **`normalizeReviews.ts`**:
   - Limpieza de caracteres y remoción de identificadores privados sensibles.
   - Vinculación canónica a la sucursal y ciudad correspondiente (`canonicalBranches.ts`).
   - Normalización de escalas de rating (1-5 estrellas).
3. **`validateReviews.ts`**:
   - Detección de entidades nombradas (NER de sabores Duomo: Chocolate Dubai, Pistacho, Sambayón con cerezas, etc.).
   - Asignación de sentimiento a nivel de aspecto (ABSA) y tópicos operacionales.

---

## 5. Transparencia y Limitaciones

- **Carácter exploratorio**: La muestra de 104 reseñas reales permite validar la pertinencia de los modelos de NLP y la usabilidad de los tableros ejecutivos, pero no constituye un censo estadístico de la totalidad de clientes de la red de 90 sucursales.
- **Competidores**: Las reseñas de Grido y Cremolatti en el entorno de demostración se encuentran catalogadas como prototipo analítico comparativo con fines pedagógicos y estratégicos.
