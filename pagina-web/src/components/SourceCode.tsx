import React from "react";
import { Github } from "lucide-react";

const SourceCode = () => {
  return (
    <section id="source" className="py-20 px-40 bg-leftmajor/90">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Código Fuente
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Accede a nuestros scripts de blending y documentación técnica del
            proyecto
          </p>
        </div>

        <div className="flex justify-center">
          {/* Repository Info */}
          {/* <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Code className="w-6 h-6 text-[#FFD700]" />
                <h3 className="text-xl font-bold text-white">Repositorio Principal</h3>
              </div>
              <p className="text-blue-100 mb-4">
                Scripts de Poisson Image Blending, controladores de Unity, y assets del proyecto completo.
              </p>
              <div className="flex items-center space-x-4 text-sm text-blue-200">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>124 stars</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-[#FFD700] rounded-full" />
                  <span>C# 68%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-[#FFA500] rounded-full" />
                  <span>Python 32%</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="font-semibold text-white mb-3">Incluye:</h4>
              <ul className="space-y-2 text-blue-100">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#FFD700] rounded-full" />
                  <span>Scripts de Poisson Image Blending</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#FFD700] rounded-full" />
                  <span>Controladores de Unity 3D</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#FFD700] rounded-full" />
                  <span>Assets y materiales fotorealistas</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#FFD700] rounded-full" />
                  <span>Documentación técnica completa</span>
                </li>
              </ul>
            </div>
          </div> */}

          {/* Action Buttons */}
          <div className="text-center space-y-5">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border w-[50rem] border-white/10">
              <Github className="w-16 h-16 text-[#FFD700] mx-auto mb-6" />

              <h3 className="text-2xl font-bold text-white mb-4">
                Repositorio GitHub
              </h3>

              {/* <p className="text-blue-100 mb-8">
                Explora el código fuente completo, contribuye al proyecto y descarga los assets necesarios para tu propia implementación.
              </p> */}

              <div className="space-y-4">
                <button
                  onClick={() =>
                    window.open(
                      "https://github.com/iranalvarez27/IntensamenteEnUTEC",
                      "_blank"
                    )
                  }
                  className="w-full bg-[#FFD700] hover:bg-[#FFA500] text-major font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-3"
                >
                  <Github className="w-5 h-5" />
                  <span>Ver en GitHub</span>
                </button>

                {/* <button className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 border border-white/20 flex items-center justify-center space-x-3">
                  <Download className="w-5 h-5" />
                  <span>Descargar ZIP</span>
                </button> */}
              </div>
            </div>

            {/* <div className="text-center text-blue-200 text-sm">
              <p>Licencia MIT • Documentación incluida • Soporte comunitario</p>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SourceCode;
