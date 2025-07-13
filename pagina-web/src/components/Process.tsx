import React from 'react';
import { Camera, Blend, Video, ArrowRight } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      number: '01',
      title: 'Captura de Expresiones Faciales',
      description: 'Utilizamos cámaras de alta resolución para capturar las expresiones faciales auténticas de estudiantes en diferentes situaciones emocionales dentro del campus de UTEC.',
      icon: <Camera className="w-12 h-12 text-[#0057B7]" />,
      image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      progress: 100
    },
    {
      number: '02',
      title: 'Integración con Poisson Image Blender',
      description: 'Aplicamos técnicas avanzadas de Poisson Image Blending para integrar perfectamente las expresiones capturadas con los entornos fotorealistas de la universidad.',
      icon: <Blend className="w-12 h-12 text-[#0057B7]" />,
      image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      progress: 85
    },
    {
      number: '03',
      title: 'Grabación y Animación en Unity',
      description: 'Importamos los assets procesados a Unity 3D donde creamos las animaciones finales, añadiendo movimiento corporal y efectos visuales para completar la narrativa emocional.',
      icon: <Video className="w-12 h-12 text-[#0057B7]" />,
      image: 'https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      progress: 70
    }
  ];

  return (
    <section id="process" className="py-20 bg-gradient-to-br from-[#F5F5F5] to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0057B7] mb-4">
            Proceso de Creación
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Detrás de cada emoción hay un proceso técnico meticuloso que combina tecnología de vanguardia con creatividad artística
          </p>
        </div>

        <div className="space-y-12 lg:space-y-0">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className={`flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse lg:space-x-reverse' : ''
              }`}>
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
                    <div className="bg-[#0057B7] text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold">
                      {step.number}
                    </div>
                    <div className="hidden lg:block">
                      {step.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Progreso</span>
                      <span className="text-sm font-medium text-[#0057B7]">{step.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#0057B7] to-[#FFA500] h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${step.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="flex-shrink-0 w-full lg:w-96 h-64 rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <div className="flex justify-center my-8 lg:my-12">
                  <ArrowRight className="w-8 h-8 text-[#FFA500] animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;