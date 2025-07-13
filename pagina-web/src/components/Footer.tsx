import React from "react";
import { Play } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-40 py-12">
      <div className="container mx-auto px-10">
        <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mx-auto">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Play className="w-8 h-8 text-[#FFD700]" />
              <span className="text-2xl font-bold">Intensamente en UTEC</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Un proyecto aplicando metodologías de Computación Gráfica para
              crear experiencias audiovisuales únicas en el entorno
              universitario.
            </p>
            {/* <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div> */}
          </div>

          {/* Quick Links */}
          <div className="pl-10">
            <h4 className="font-semibold mb-4 text-[#FFD700]">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="hover:text-white transition-colors"
                >
                  Galería
                </a>
              </li>
              <li>
                <a
                  href="#videos"
                  className="hover:text-white transition-colors"
                >
                  Videos
                </a>
              </li>
              {/* <li><a href="#process" className="hover:text-white transition-colors">Proceso</a></li> */}
            </ul>
          </div>

          {/* Technical Info */}
          <div>
            <h4 className="font-semibold mb-4 text-[#FFD700]">Tecnologías</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Unity 3D</li>
              <li>OpenCV</li>
              <li>Numpy</li>
              {/* <li>Computer Vision</li> */}
              {/* <li>Motion Capture</li> */}
            </ul>
            
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[#FFD700]">Herramientas</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Poisson Image Blending</li>
              <li>Color Transfer between images</li>
              {/* <li>Computer Vision</li> */}
              {/* <li>Motion Capture</li> */}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-2 flex flex-col md:flex-row justify-between items-center">
          {/* <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 UTEC - Universidad de Ingeniería y Tecnología. Todos los derechos reservados.
          </p> */}
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>Hecho en el curso de Computación Gráfica en UTEC</span>
            {/* <Heart className="w-4 h-4 text-red-500 animate-pulse" /> */}
            {/* <span>por estudiantes UTEC</span> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
