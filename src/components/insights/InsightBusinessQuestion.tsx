import React from "react";
import { HelpCircle, Sparkles } from "lucide-react";

interface InsightBusinessQuestionProps {
  question: string;
}

export const InsightBusinessQuestion: React.FC<InsightBusinessQuestionProps> = ({ question }) => {
  return (
    <div className="bg-[#FAF9F5] border border-amber-300/80 rounded-xl p-3.5 space-y-1.5 font-['Plus_Jakarta_Sans'] shadow-2xs">
      <div className="flex items-center gap-1.5 text-amber-900 text-xs font-bold uppercase tracking-wider">
        <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
        <span>Pregunta Clave para Dirección / Operaciones / Marketing</span>
      </div>
      <p className="text-xs sm:text-sm font-semibold text-stone-900 leading-snug pl-5 font-['Outfit']">
        {question}
      </p>
      <span className="text-[10px] text-stone-500 pl-5 block italic">
        Eje de investigación sugerido para validar antes de tomar acciones de política comercial o dotación.
      </span>
    </div>
  );
};
