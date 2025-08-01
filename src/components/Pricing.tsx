import React, { useEffect, useRef, useState } from "react";
import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
  buttonVariant: "primary" | "secondary";
}

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("early-adopter");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const sectionRef = useRef<HTMLDivElement>(null);

  const plans: PricingPlan[] = [
    {
      id: "early-adopter",
      name: "Adoptante Temprano",
      price: "$2,999",
      originalPrice: "$3,999",
      description: "Para los primeros en adoptar la tecnología del futuro",
      features: [
        "Atlas Robot completamente funcional",
        "Soporte técnico prioritario 24/7",
        "Actualizaciones de software gratuitas",
        "Acceso a comunidad exclusiva",
        "Garantía extendida de 2 años",
        "Sesión de configuración personalizada"
      ],
      popular: true,
      buttonText: "Reservar Ahora",
      buttonVariant: "primary"
    },
    {
      id: "developer",
      name: "Edición Desarrollador",
      price: "$4,999",
      description: "Para desarrolladores que quieren personalizar Atlas",
      features: [
        "Todo lo de Adoptante Temprano",
        "SDK completo para desarrollo",
        "API de acceso completo",
        "Documentación técnica detallada",
        "Soporte para desarrolladores",
        "Acceso a funciones beta"
      ],
      buttonText: "Solicitar Acceso",
      buttonVariant: "secondary"
    },
    {
      id: "enterprise",
      name: "Empresarial",
      price: "Personalizado",
      description: "Soluciones personalizadas para empresas",
      features: [
        "Implementación personalizada",
        "Integración con sistemas existentes",
        "Soporte dedicado",
        "Entrenamiento para equipos",
        "SLA garantizado",
        "Consultoría especializada"
      ],
      buttonText: "Contactar Ventas",
      buttonVariant: "secondary"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-fade-in");
              }, index * 150);
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
    <section className="py-16 sm:py-20 md:py-24 bg-gray-50 relative" id="pricing" ref={sectionRef}>
      <div className="section-container">
        <div className="text-center mb-12 sm:mb-16">
          <div className="pulse-chip mx-auto mb-4 opacity-0 fade-in-element">
            <span>Precios</span>
          </div>
          <h2 className="section-title mb-4 opacity-0 fade-in-element">
            Elige tu Plan de <br className="hidden sm:block" />
            <span className="text-pulse-500">Adopción Temprana</span>
          </h2>
          <p className="section-subtitle mx-auto max-w-2xl opacity-0 fade-in-element">
            Ofertas especiales para los primeros adoptadores. Precios limitados que aumentarán próximamente.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8 opacity-0 fade-in-element">
          <div className="bg-white rounded-full p-1 shadow-lg border">
            <div className="flex">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all",
                  billingCycle === "monthly"
                    ? "bg-pulse-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                Mensual
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all",
                  billingCycle === "yearly"
                    ? "bg-pulse-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                Anual
                <span className="ml-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  -20%
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={cn(
                "relative glass-card p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:shadow-xl",
                "opacity-0 fade-in-element",
                plan.popular && "ring-2 ring-pulse-500 shadow-lg"
              )}
              style={{ animationDelay: `${0.2 * index}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-pulse-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Más Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl sm:text-4xl font-bold text-pulse-500">
                    {plan.price}
                  </span>
                  {plan.originalPrice && (
                    <span className="text-lg text-gray-500 line-through ml-2">
                      {plan.originalPrice}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-pulse-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedPlan(plan.id)}
                className={cn(
                  "w-full py-3 px-6 rounded-full font-medium transition-all duration-200",
                  plan.buttonVariant === "primary"
                    ? "bg-pulse-500 text-white hover:bg-pulse-600 shadow-lg hover:shadow-xl"
                    : "border-2 border-pulse-500 text-pulse-500 hover:bg-pulse-500 hover:text-white"
                )}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 opacity-0 fade-in-element">
          <p className="text-gray-600 text-sm mb-4">
            ¿Necesitas algo personalizado? Contáctanos para discutir tus necesidades específicas.
          </p>
          <a
            href="#contact"
            className="text-pulse-500 hover:text-pulse-600 font-medium underline"
          >
            Hablar con nuestro equipo →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing; 