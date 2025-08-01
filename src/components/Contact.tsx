import React, { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
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
    <section className="py-16 sm:py-20 md:py-24 bg-gray-50 relative" id="contact" ref={sectionRef}>
      <div className="section-container">
        <div className="text-center mb-12 sm:mb-16">
          <div className="pulse-chip mx-auto mb-4 opacity-0 fade-in-element">
            <span>Contacto</span>
          </div>
          <h2 className="section-title mb-4 opacity-0 fade-in-element">
            Hablemos sobre tu <br className="hidden sm:block" />
            <span className="text-pulse-500">Proyecto</span>
          </h2>
          <p className="section-subtitle mx-auto max-w-2xl opacity-0 fade-in-element">
            ¿Listo para llevar Atlas a tu hogar o negocio? Nuestro equipo está aquí para ayudarte.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-8 opacity-0 fade-in-element">
            <div>
              <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
              <p className="text-gray-600 mb-8">
                Nuestro equipo de expertos está listo para responder todas tus preguntas.
              </p>
            </div>

            <div className="space-y-6">
              <a
                href="mailto:hola@atlas-robot.com"
                className="flex items-center p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-pulse-200 transition-colors">
                  <Mail className="w-6 h-6 text-pulse-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">hola@atlas-robot.com</p>
                </div>
              </a>

              <a
                href="tel:+15551234567"
                className="flex items-center p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-pulse-200 transition-colors">
                  <Phone className="w-6 h-6 text-pulse-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Teléfono</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </a>

              <div className="flex items-center p-4 rounded-xl bg-white shadow-sm">
                <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center mr-4">
                  <MapPin className="w-6 h-6 text-pulse-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Oficina</h4>
                  <p className="text-gray-600">Ciudad de México, MX</p>
                </div>
              </div>
            </div>
          </div>

          <div className="opacity-0 fade-in-element" style={{ animationDelay: "0.2s" }}>
            {isSubmitted ? (
              <div className="glass-card p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">¡Mensaje Enviado!</h3>
                <p className="text-gray-600">
                  Gracias por contactarnos. Nos pondremos en contacto contigo pronto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pulse-500 focus:border-transparent transition-colors"
                      placeholder="Tu nombre"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pulse-500 focus:border-transparent transition-colors"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pulse-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Cuéntanos sobre tu proyecto o pregunta..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-pulse-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                      isSubmitting
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-pulse-600 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Mensaje
                        <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 