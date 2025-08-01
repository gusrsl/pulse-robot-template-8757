
import React from "react";
import { Mail, Phone, MapPin, Twitter, Linkedin, Github, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-white py-12 sm:py-16">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-pulse-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold">Atlas</span>
            </div>
            <p className="text-gray-400 text-sm">
              El compañero humanoide que aprende y se adapta junto a ti.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pulse-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pulse-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pulse-500 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pulse-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Producto</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#features" className="hover:text-pulse-500 transition-colors">Características</a></li>
              <li><a href="#pricing" className="hover:text-pulse-500 transition-colors">Precios</a></li>
              <li><a href="#especificaciones" className="hover:text-pulse-500 transition-colors">Especificaciones</a></li>
              <li><a href="#faq" className="hover:text-pulse-500 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Empresa</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#about" className="hover:text-pulse-500 transition-colors">Sobre nosotros</a></li>
              <li><a href="#contact" className="hover:text-pulse-500 transition-colors">Contacto</a></li>
              <li><a href="#" className="hover:text-pulse-500 transition-colors">Carreras</a></li>
              <li><a href="#" className="hover:text-pulse-500 transition-colors">Prensa</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Soporte</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-pulse-500 transition-colors">Centro de ayuda</a></li>
              <li><a href="#" className="hover:text-pulse-500 transition-colors">Documentación</a></li>
              <li><a href="#" className="hover:text-pulse-500 transition-colors">Comunidad</a></li>
              <li><a href="#" className="hover:text-pulse-500 transition-colors">Estado del servicio</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Atlas Robot. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-pulse-500 transition-colors">Privacidad</a>
              <a href="#" className="hover:text-pulse-500 transition-colors">Términos</a>
              <a href="#" className="hover:text-pulse-500 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
