import React from 'react';
import { Play, Users, BookOpen, Coffee, Microscope } from 'lucide-react';

const Videos = () => {
  const videos = [
    {
      title: 'Ansiedad antes de un examen',
      location: 'Biblioteca UTEC',
      thumbnail: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      icon: <BookOpen className="w-6 h-6 text-bg-major" />
    },
    {
      title: 'Sorpresa en clase virtual',
      location: 'Aula Virtual',
      thumbnail: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      icon: <Users className="w-6 h-6 text-bg-major" />
    },
    {
      title: 'Alegría en el laboratorio',
      location: 'Laboratorio de Ingeniería',
      thumbnail: 'https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      icon: <Microscope className="w-6 h-6 text-bg-major" />
    },
    {
      title: 'Relajación en la cafetería',
      location: 'Cafetería Central',
      thumbnail: 'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      icon: <Coffee className="w-6 h-6 text-bg-major" />
    }
  ];

  return (
    <section id="videos" className="py-20 px-40 bg-major2">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestros cortos
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Serie de clips donde nuestras emociones actúan junto a diferentes escenarios universitarios
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {videos.map((video, index) => (
            <div key={index} className="group">
              <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-6">
                {/* Video Thumbnail */}
                <div className="relative flex-shrink-0 w-full lg:w-60 h-48 bg-gray-900 rounded-xl overflow-hidden shadow-xl">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* <button className="bg-[#FFA500] hover:bg-[#FFD700] text-white rounded-full p-4 transform hover:scale-110 transition-all duration-300 shadow-xl">
                      <Play className="w-8 h-8" />
                    </button> */}
                  </div>
                  {/* <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    {video.icon}
                  </div> */}
                </div>

                {/* Video Info */}
                <div className="flex-grow text-center lg:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">{video.title}</h3>
                  <p className="text-lg text-gray-400 mb-4">{video.location}</p>
                  
                  {/* <div className="bg-[#F5F5F5] rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-bg-major mb-2">Captura de Movimiento Unity</h4>
                    <p className="text-gray-600 text-sm">
                      Sistema de tracking facial en tiempo real que captura micro-expresiones y las traduce a animaciones fluidas en Unity 3D.
                    </p>
                  </div> */}

                  {/* <div className="flex items-center justify-center lg:justify-start space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm text-gray-500">Renderizado en Unity</span>
                    </div>
                    <div className="text-sm text-gray-400">5-10 segundos</div>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Videos;