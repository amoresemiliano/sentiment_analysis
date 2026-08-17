import React from "react";
import { X, ShieldCheck, Database, Cpu, AlertTriangle, Sparkles, CheckCircle2 } from "lucide-react";

interface AboutPrototypeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutPrototypeModal: React.FC<AboutPrototypeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF9F5] border border-stone-300 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col font-['Plus_Jakarta_Sans']">
        {/* Header */}
        <div className="px-6 py-5 bg-[#1B4D3E] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700/60 flex items-center justify-center border border-emerald-500/30">
              <Sparkles className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-['Outfit'] tracking-tight">Transparencia Metodológica y Datos</h2>
              <p className="text-xs text-emerald-200/80">
                El Sabor de la IA by Duomo Helados · Master in Business & Technology (UdeSA)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-300 hover:text-white p-1.5 rounded-lg hover:bg-emerald-800/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-stone-700 leading-relaxed">
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-4 flex gap-3.5">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 mb-1">Alcance y Naturaleza de este MVP</h4>
              <p className="text-xs text-amber-800 leading-relaxed">
                Este sistema es un <strong>Decision Support System (DSS)</strong> interactivo concebido para demostrar
                cómo la Inteligencia Artificial y el procesamiento de lenguaje natural (NLP) permiten transformar opiniones
                no estructuradas en señales estratégicas para la toma de decisiones en Helados Duomo.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  PILOTO REAL
                </span>
                <span className="text-xs font-semibold text-stone-800">104 Reseñas Reales en 15 Sucursales</span>
              </div>
              <p className="text-xs text-stone-600">
                Muestra piloto controlada y verificada de opiniones públicas de Helados Duomo obtenidas de Google Maps, Instagram y Facebook en Misiones (Posadas, Oberá, Iguazú, Eldorado, Apóstoles), Corrientes (Capital, Goya), Chaco (Resistencia) y Formosa (Capital). Incluye textos verbatim, fecha, rating y enlaces fuente.
              </p>
            </div>

            <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                  CORPUS PROTOTIPO
                </span>
                <span className="text-xs font-semibold text-stone-800">Proyección Analítica (~2,780 ops)</span>
              </div>
              <p className="text-xs text-stone-600">
                Corpus proyectado y calibrado estadísticamente para modelar el comportamiento total de la red de 90 sucursales Duomo y la comparación estratégica con Grido y Cremolatti en tableros de alta densidad ejecutiva.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <Database className="w-4 h-4 text-[#1B4D3E]" /> Indicadores de Calidad de Datos (Target Operativo)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-stone-100/70 border border-stone-200/80 rounded-xl">
                <div className="text-xs text-stone-500 font-medium">Piloto Real Verificado</div>
                <div className="text-base font-bold text-emerald-800 mt-0.5">104 reviews</div>
                <div className="text-[10px] text-stone-400">15 sucursales NEA</div>
              </div>
              <div className="p-3 bg-stone-100/70 border border-stone-200/80 rounded-xl">
                <div className="text-xs text-stone-500 font-medium">Cobertura NEA</div>
                <div className="text-base font-bold text-stone-800 mt-0.5">4 Provincias</div>
                <div className="text-[10px] text-stone-400">MNES, CTES, CHA, FOR</div>
              </div>
              <div className="p-3 bg-stone-100/70 border border-stone-200/80 rounded-xl">
                <div className="text-xs text-stone-500 font-medium">Red Duomo</div>
                <div className="text-base font-bold text-stone-800 mt-0.5">90 Sucursales</div>
                <div className="text-[10px] text-stone-400">Red territorial total</div>
              </div>
              <div className="p-3 bg-stone-100/70 border border-stone-200/80 rounded-xl">
                <div className="text-xs text-stone-500 font-medium">Confianza NLP</div>
                <div className="text-base font-bold text-stone-800 mt-0.5">89.2% F1</div>
                <div className="text-[10px] text-stone-400">ABSA Benchmark</div>
              </div>
            </div>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2">
            <h5 className="font-semibold text-stone-800 text-xs uppercase tracking-wider">
              Estado Actual del Proyecto (Tercera Iteración)
            </h5>
            <ul className="text-xs text-stone-600 space-y-1.5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Visual Polish & Branding: Identidad visual oficial con logo vectorial y paleta gastronómica cálida.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Piloto de Datos Reales: Integración de 104 reseñas verificadas con URL pública en 15 sucursales.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Trazabilidad y Data Provenance: Documentación metodológica rigurosa en /docs/DATA_PROVENANCE.md.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-100 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#1B4D3E] hover:bg-[#143B30] text-white font-medium text-xs transition-colors shadow-xs cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
