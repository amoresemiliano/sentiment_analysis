# Data Provenance, Lineage & Methodological Guardrails: El Sabor de la IA by Duomo Helados

## 1. Resumen Ejecutivo & Marco Epistemológico (Iteración 5.1)

Este documento describe la arquitectura de linaje, auditoría de evidencia y salvaguardas metodológicas de la plataforma **El Sabor de la IA by Duomo Helados**, desarrollada en el marco del Trabajo Práctico de **AI for Business** para el **Master in Business & Technology de la Universidad de San Andrés (UdeSA)**.

### Principio Rector
> *"Una opinión puede ser anecdótica. Muchas opiniones coherentes pueden constituir una señal. Una señal fuerte merece atención. Una señal no demuestra por sí sola su causa."*

El sistema distingue cuatro niveles epistemológicos:
1. **Hecho Observado (`observedData`)**: Recuento empírico exacto de verbatims y menciones en el corpus estructurado.
2. **Patrón Descriptivo (`pattern`)**: Concentración observacional, recurrencia temática o polaridad relativa.
3. **Hipótesis Explicativa (`exploratoryHypothesis`)**: Interpretación probabilística sugerida para investigación (nunca presentada como causa probada).
4. **Validación Requerida (`validationRequired`)**: Preguntas operativas y contrastaciones gerenciales (ventas, mermas, dotación de personal) requeridas antes de tomar decisiones de inversión o reestructuración.

---

## 2. Taxonomía de Linaje de Datos (`dataType`)

| Capa de Datos | Tipo (`dataType`) | Estado de Verificación | Registros | Criterios y Restricciones de Uso |
|---|---|---|---|---|
| **Piloto de Reseñas de Campo** | `unverified-pilot` | `pending` (Auditado en formato) | 104 opiniones en 15 sucursales | Corpus estructurado con URL de perfil, autor público, timestamp, rating y texto verbatim. **No se promueve automáticamente a `verified-public`** sin proceso de verificación y hashing criptográfico. |
| **Corpus Prototipo Simulado** | `prototype` | `prototype` | ~2,780 registros | Generado sintéticamente con modelos probabilísticos calibrados para representar el comportamiento proyectado de las 90 sucursales en las 4 provincias del NEA. |
| **Evidencia Mixta** | `mixed` | Variable | Variable | Insights que integran verbatims del piloto (`unverified-pilot`) junto a registros de referencia (`prototype`). |
| **Público Verificado** | `verified-public` | `verified` | 0 (En proceso de ingesta auditada) | Reservado exclusivamente para opiniones con firma de recolección y verificación criptográfica/humana completa. |

---

## 3. Cobertura del Piloto de 15 Sucursales Duomo (104 Registros)

El dataset de 104 opiniones cubre 15 sucursales estratégicas de Duomo Helados en el Nordeste Argentino:

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

## 4. Reglas Metodológicas de Validación de Insights

1. **Derivación Matemática Estricta**:
   - `mentions = uniqueReviewIds.length` (recuento deduplicado).
   - `prevalence = (mentions / analyzedCorpus) * 100` (con un decimal).
   - `analyzedCorpus >= mentions` (invariante fundamental).

2. **Graduación de Fuerza de Señal (`signalStrength`)**:
   - `CRITICAL OBSERVATIONAL SIGNAL`: Prevalencia observada $\ge 60\%$ con persistencia multicanal.
   - `HIGH PREVALENCE SIGNAL`: Prevalencia observada $\ge 40\%$ o concentración temática severa.
   - `RECURRENT PATTERN`: Prevalencia observada entre $12\%$ y $39.9\%$.
   - `EMERGING SIGNAL`: Prevalencia observada entre $6\%$ y $11.9\%$.
   - `LIMITED EVIDENCE`: Prevalencia observada $< 6\%$ o muestra exploratoria reducida ($< 6$ menciones).

3. **Niveles de Atención Gerencial (`managementAttention`)**:
   - `HIGH ATTENTION`: Señales con sentimiento negativo concentrado en tópicos críticos (demora, calidad sanitaria, quiebre masivo).
   - `ATTENTION`: Patrones recurrentes operacionales o de producto con impacto directo en experiencia.
   - `WATCH`: Señales emergentes de seguimiento en turno o plaza específica.
   - *Nota de salvaguarda*: Toda alerta incluye un badge informativo: *"Esta alerta indica recurrencia y peso observacional dentro del corpus seleccionado. No identifica por sí sola la causa del fenómeno."*

4. **Inferencia Temporal y Meteorológica Restrictiva**:
   - La fecha de publicación de una review no determina la hora de consumo.
   - El atributo `timeSlot` (`Morning`, `Afternoon`, `Night`) **sólo se infiere si el texto verbatim contiene marcadores explícitos** (ej. "fui a la noche", "a las 22hs", "merienda", "desayuno"). Si no existen marcadores, se registra como `Unknown`.
   - La vinculación con datos climáticos se cataloga como `weatherEligibility: "ineligible"` para reseñas con `timeSlot: "Unknown"`, evitando correlaciones espurias de temperatura diurna con visitas nocturnas.
