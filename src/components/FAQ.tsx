import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const faqData: FAQItem[] = [
    {
      id: "1",
      question: "¿Qué hace único a Atlas comparado con otros robots?",
      answer: "Atlas combina inteligencia artificial avanzada con movilidad humana natural. Puede aprender de sus interacciones, adaptarse a diferentes entornos y realizar tareas complejas con precisión humana."
    },
    {
      id: "2",
      question: "¿Cuánto tiempo tarda en aprender nuevas tareas?",
      answer: "El tiempo varía según la complejidad. Tareas simples se aprenden en minutos, mientras que habilidades complejas pueden requerir varias horas. Atlas mejora continuamente con cada interacción."
    },
    {
      id: "3",
      question: "¿Es seguro tener Atlas en mi hogar o negocio?",
      answer: "Absolutamente. Atlas cuenta con múltiples capas de seguridad, sensores de proximidad y protocolos de emergencia. Todos los movimientos están limitados para prevenir daños."
    },
    {
      id: "4",
      question: "¿Qué tipo de soporte técnico incluye?",
      answer: "Todos los planes incluyen soporte técnico completo. El plan Adoptante Temprano incluye soporte prioritario 24/7, actualizaciones remotas y mantenimiento preventivo."
    },
    {
      id: "5",
      question: "¿Puedo personalizar Atlas para mis necesidades específicas?",
      answer: "Sí, especialmente con el plan Edición Desarrollador. Proporcionamos SDK completo, APIs y documentación técnica. Para empresas, ofrecemos implementaciones completamente personalizadas."
    },
    {
      id: "6",
      question: "¿Cuál es la garantía y política de devolución?",
      answer: "Ofrecemos garantía extendida de 2 años. Para adoptadores tempranos, incluimos 30 días de prueba sin compromiso. Si no estás satisfecho, procesamos una devolución completa."
    }
  ];

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-fade-in");
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white relative" id="faq" ref={sectionRef}>
      <div className="section-container">
        <div className="text-center mb-12 sm:mb-16">
          <div className="pulse-chip mx-auto mb-4 opacity-0 fade-in-element">
            <span>FAQ</span>
          </div>
          <h2 className="section-title mb-4 opacity-0 fade-in-element">
            Preguntas <br className="hidden sm:block" />
            <span className="text-pulse-500">Frecuentes</span>
          </h2>
          <p className="section-subtitle mx-auto max-w-2xl opacity-0 fade-in-element">
            Resolvemos las dudas más comunes sobre Atlas y nuestra tecnología.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={faq.id}
                className={cn(
                  "glass-card rounded-xl overflow-hidden transition-all duration-300",
                  "opacity-0 fade-in-element hover:shadow-lg"
                )}
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {openItems.includes(faq.id) ? (
                    <ChevronUp className="w-5 h-5 text-pulse-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                {openItems.includes(faq.id) && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12 opacity-0 fade-in-element">
          <p className="text-gray-600 mb-4">
            ¿No encontraste la respuesta que buscabas?
          </p>
          <a
            href="#contact"
            className="text-pulse-500 hover:text-pulse-600 font-medium underline"
          >
            Contáctanos directamente →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 