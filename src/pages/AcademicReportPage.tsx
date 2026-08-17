import React from "react";
import { GraduationCap, BookOpen, Download, Share2, CheckCircle2, FileText, ArrowRight } from "lucide-react";

export const AcademicReportPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto pb-24 font-['Plus_Jakarta_Sans'] space-y-10 text-stone-800">
      {/* Editorial Header */}
      <header className="pt-6 sm:pt-10 pb-8 border-b border-stone-300 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-semibold text-[#1B4D3E]">
            <GraduationCap className="w-4 h-4" />
            <span>UNIVERSIDAD DE SAN ANDRÉS · MASTER IN BUSINESS & TECHNOLOGY</span>
          </div>
          <span className="text-stone-500 font-medium">Materia: AI for Business</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Outfit'] text-stone-900 tracking-tight leading-[1.2]">
          Duomo Consumer Intelligence: Transformación de la Voz Digital del Consumidor en Señales Estratégicas mediante NLP y Aspect-Based Sentiment Analysis
        </h1>

        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-stone-600 pt-2 font-medium">
          <div>
            <strong>Autores:</strong> Alumnos MBT (Caso de Aplicación Empresarial)
          </div>
          <div>
            <strong>Organización Objeto:</strong> Helados Duomo (Posadas, Misiones / NEA)
          </div>
          <div>
            <strong>Fecha:</strong> Período Académico 2024 / 2026
          </div>
        </div>
      </header>

      {/* Article Body */}
      <article className="space-y-10 text-sm sm:text-base leading-relaxed text-stone-700 font-['Newsreader']">
        {/* Section 1: Abstract */}
        <section id="abstract" className="bg-stone-100/80 border-l-4 border-[#1B4D3E] p-6 rounded-r-2xl space-y-2">
          <h2 className="text-xs font-bold text-[#1B4D3E] uppercase tracking-widest font-['Plus_Jakarta_Sans']">
            1. Abstract / Resumen Ejecutivo
          </h2>
          <p className="italic leading-relaxed text-stone-800">
            La industria gastronómica y de retail heladero dispone de abundantes sistemas transaccionales (ERP, CRM, POS) que explican con precisión <em>qué</em> y <em>cuánto</em> se vende por punto de venta, pero carecen de visibilidad sistemática sobre <em>por qué</em> los consumidores eligen, recomiendan o abandonan una marca. Este trabajo presenta el diseño, arquitectura y validación de <strong>Duomo Consumer Intelligence</strong>, un <em>Decision Support System (DSS)</em> basado en Inteligencia Artificial y Procesamiento de Lenguaje Natural (NLP). El sistema ingesta reseñas públicas no estructuradas de Google Business Profiles, Instagram, Facebook y TikTok en el Nordeste Argentino (Misiones, Corrientes, Chaco y Formosa), aplicando <strong>Aspect-Based Sentiment Analysis (ABSA)</strong> y <strong>Topic Modeling</strong> no supervisado para contrastar empíricamente hipótesis competitivas frente a Grido y Cremolatti. Se demuestra cómo transformar texto libre en señales de toma de decisión para la formulación de productos, gestión de disponibilidad y asignación de recursos operativos.
          </p>
        </section>

        {/* Section 2: Problem Definition */}
        <section id="problem" className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-['Outfit'] tracking-tight">
            2. Introducción y Definición del Problema de Negocio
          </h2>
          <p>
            Helados Duomo es la cadena líder de heladerías artesanales del Nordeste Argentino (NEA), con una red de aproximadamente 90 puntos de venta distribuidos entre Misiones, Corrientes, Chaco y Formosa. La compañía opera con una planta central de producción en Posadas, Misiones, abasteciendo a locales propios y franquicias con un esquema logístico de frío intensivo.
          </p>
          <p>
            Históricamente, la toma de decisiones sobre desarrollo de nuevos sabores, promociones, horarios de atención y reformas de infraestructura se ha apoyado en métricas de venta bruta, rotación de inventario y el criterio empírico de la gerencia. Sin embargo, este enfoque presenta tres limitaciones críticas:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-['Plus_Jakarta_Sans'] text-sm">
            <li>
              <strong>Asimetría explicativa:</strong> Una caída transaccional en una sucursal puede originarse por demoras en la caja, fallas en medios de pago o un quiebre de stock puntual, factores invisibles en el reporte contable agregado.
            </li>
            <li>
              <strong>Ceguera competitiva externa:</strong> Los datos transaccionales internos no capturan qué atributos están valorando los clientes en competidores directos como Grido (líder en accesibilidad y volumen) o Cremolatti (posicionado en el segmento gourmet premium).
            </li>
            <li>
              <strong>Sobrecarga y sesgo en la lectura manual de redes:</strong> El volumen continuo de comentarios dispersos en Google Maps y redes sociales excede la capacidad de análisis manual del área de Marketing, resultando en respuestas reactivas e impresiones anecdóticas.
            </li>
          </ul>
        </section>

        {/* Section 3: AI Conceptual Framework */}
        <section id="framework" className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-['Outfit'] tracking-tight">
            3. Marco Conceptual de Inteligencia Artificial
          </h2>
          <p>
            El sistema se estructura bajo el paradigma de <strong>Decision Support System (DSS)</strong> asistido por IA, rechazando deliberadamente la automatización ciega de decisiones comerciales. El flujo metodológico integra las siguientes disciplinas de IA y Machine Learning:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-['Plus_Jakarta_Sans'] text-xs">
            <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-1">
              <h4 className="font-bold text-[#1B4D3E]">Aspect-Based Sentiment Analysis (ABSA)</h4>
              <p className="text-stone-600 leading-relaxed">
                Supera el análisis de sentimiento binario (positivo/negativo global) descomponiendo el texto en tuplas de <em>(Aspecto, Polaridad, Confianza)</em> para aislar variables independientes de producto, servicio, precio y logística.
              </p>
            </div>
            <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-1">
              <h4 className="font-bold text-[#1B4D3E]">Topic Modeling No Supervisado (BERTopic)</h4>
              <p className="text-stone-600 leading-relaxed">
                Combina embeddings de Sentence-Transformers con reducción de dimensionalidad (UMAP) y clustering denso (HDBSCAN) para descubrir temas emergentes y patrones de conversación espontáneos sin supervisión humana previa.
              </p>
            </div>
            <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-1">
              <h4 className="font-bold text-[#1B4D3E]">Extracción de Entidades Nombradas (NER)</h4>
              <p className="text-stone-600 leading-relaxed">
                Identifica sucursales específicas, ciudades, sabores puntuales y turnos horarios en lenguaje coloquial propio de la región litoral argentina.
              </p>
            </div>
            <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-1">
              <h4 className="font-bold text-[#1B4D3E]">Inferencia y Contrafácticos</h4>
              <p className="text-stone-600 leading-relaxed">
                Marco conceptual para contrastar promociones comerciales mediante sucursales de control, distinguiendo correlaciones temporales de causalidad de negocio.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Expected Business Impact */}
        <section id="impact" className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-['Outfit'] tracking-tight">
            4. Impacto y Beneficio Esperado para Helados Duomo
          </h2>
          <p>
            La implementación operativa de la plataforma proyecta beneficios cuantificables y estratégicos en tres áreas clave de la organización:
          </p>
          <div className="space-y-3 font-['Plus_Jakarta_Sans'] text-xs">
            <div className="p-4 bg-[#FAF9F5] border border-stone-200 rounded-xl space-y-1.5">
              <div className="font-bold text-stone-900 text-sm">A. Innovación y Gestión del Portafolio de Sabores</div>
              <p className="text-stone-600 leading-relaxed">
                Validación temprana de lanzamientos (ej. <em>Chocolate Dubai</em>, <em>Pistacho Puro Tostado</em>) reduciendo el tiempo de prueba de 6 meses a semanas, con métricas de aceptación de producto desvinculadas del quiebre de stock logístico.
              </p>
            </div>

            <div className="p-4 bg-[#FAF9F5] border border-stone-200 rounded-xl space-y-1.5">
              <div className="font-bold text-stone-900 text-sm">B. Eficiencia Operativa y Retención de Clientes</div>
              <p className="text-stone-600 leading-relaxed">
                Detección oportuna de cuellos de botella en turnos específicos (fines de semana 19:00 a 24:00 hs) y fallas recurrentes de infraestructura de pago digital (POS/QR) antes de que impacten en el churn o pérdida de lealtad.
              </p>
            </div>

            <div className="p-4 bg-[#FAF9F5] border border-stone-200 rounded-xl space-y-1.5">
              <div className="font-bold text-stone-900 text-sm">C. Inteligencia de Posicionamiento Competitivo</div>
              <p className="text-stone-600 leading-relaxed">
                Monitoreo continuo de la propuesta de valor relativa: Duomo consolida su <em>sweet spot</em> combinando calidad organoléptica comparable a Cremolatti con un nivel de accesibilidad económica y cobertura territorial superior.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Implementation Architecture */}
        <section id="implementation" className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-['Outfit'] tracking-tight">
            5. Arquitectura de Implementación de Modelos
          </h2>
          <p>
            El pipeline se estructura de forma desacoplada y escalable, garantizando trazabilidad y gobierno de datos:
          </p>
          <p>
            <strong>Capa de Ingesta & Almacenamiento:</strong> Conectores programáticos que consultan las APIs públicas de Google Business Profiles para las 90 sucursales, complementados con webhooks de menciones en Meta Graph API y TikTok for Developers. Los textos brutos se almacenan en un Data Lake inmutable con metadatos de fecha, autor anonimizado, sucursal y geolocalización.
          </p>
          <p>
            <strong>Capa de Procesamiento NLP:</strong> Modelos Transformers basados en arquitecturas BERT en español fine-tuneados con un dataset de dominio gastronómico regional. El pipeline calcula embeddings de 768 dimensiones, ejecuta clasificación por aspecto con F1-score objetivo de 89.2% y extrae clusters semánticos mediante HDBSCAN.
          </p>
          <p>
            <strong>Capa de Presentación y DSS:</strong> Dashboard ejecutivo construido en React / TypeScript con visualizaciones de Recharts, filtros multidimensionales y el módulo <em>Decision Lab</em> para la interacción de los comités de decisión.
          </p>
        </section>

        {/* Section 6: Conclusions & Limitations */}
        <section id="conclusions" className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-['Outfit'] tracking-tight">
            6. Conclusiones, Limitaciones y Consideraciones Éticas
          </h2>
          <p>
            <strong>Conclusiones:</strong> La integración de la voz digital del consumidor mediante NLP estructurado proporciona a Helados Duomo una ventaja analítica diferencial, cerrando la brecha entre los datos transaccionales de venta y la experiencia real del cliente.
          </p>
          <p>
            <strong>Limitaciones Metodológicas:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-1.5 font-['Plus_Jakarta_Sans'] text-xs text-stone-700">
            <li>
              <em>Sesgo de auto-selección:</em> Los usuarios que publican reseñas suelen representar los extremos de máxima satisfacción o profunda frustración.
            </li>
            <li>
              <em>Penetración digital diferencial:</em> Las sucursales en centros urbanos principales (Posadas, Corrientes) registran mayor densidad de opiniones que localidades menores del interior de Misiones o Chaco.
            </li>
            <li>
              <em>Doble sentido e ironía:</em> Modismos locales del Litoral requieren continuo refinamiento del diccionario de embeddings.
            </li>
          </ul>
          <p>
            <strong>Privacidad y Ética:</strong> El sistema opera estrictamente sobre opiniones públicas, sin almacenar datos personales identificables (PII) de los usuarios ni realizar perfilamiento individual.
          </p>
        </section>

        {/* Section 7: References */}
        <section id="references" className="space-y-3 pt-6 border-t border-stone-200 text-xs font-['Plus_Jakarta_Sans']">
          <h3 className="font-bold text-stone-900 text-sm font-['Outfit'] uppercase tracking-wider">
            7. Referencias Bibliográficas
          </h3>
          <ol className="list-decimal pl-5 space-y-1.5 text-stone-600">
            <li>
              Pontiki, M., et al. (2016). <em>SemEval-2016 Task 5: Aspect Based Sentiment Analysis</em>. Proceedings of the 10th International Workshop on Semantic Evaluation.
            </li>
            <li>
              Grootendorst, M. (2022). <em>BERTopic: Neural topic modeling with a class-based TF-IDF procedure</em>. arXiv preprint arXiv:2203.05794.
            </li>
            <li>
              Devlin, J., et al. (2019). <em>BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding</em>. NAACL-HLT.
            </li>
            <li>
              Davenport, T., & Ronanki, R. (2018). <em>Artificial Intelligence for the Real World</em>. Harvard Business Review, 96(1), 108-116.
            </li>
            <li>
              Helados Duomo (2024). <em>Portal Institucional y Red de Sucursales</em>. https://www.duomohelados.com.ar/
            </li>
          </ol>
        </section>
      </article>
    </div>
  );
};
