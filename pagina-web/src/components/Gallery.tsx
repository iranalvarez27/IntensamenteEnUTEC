import React, { useEffect, useRef } from "react";
import { Frown, Zap, Smile, Angry, Droplet } from "lucide-react";
import Joy from "../images/joy.jpg";
import Sadness from "../images/sadness.jpg";
import Anger from "../images/anger.jpg";

const Gallery = () => {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const galleryItems = galleryRef.current?.querySelectorAll(".gallery-item");
    galleryItems?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const emotions = [
    {
      emotion: "Alegría",
      icon: <Smile className="w-8 h-8 text-[#FFD700]" />,
      image: Joy,
      color: "#FFD700",
      posTaiwind: "col-span-2",
    },
    {
      emotion: "Tristeza",
      icon: <Frown className="w-8 h-8 text-blue-500" />,
      image: Sadness,
      color: "#3B82F6",
      posTaiwind: "col-span-2 col-start-3 row-start-1",
    },
    {
      emotion: "Miedo",
      icon: <Droplet className="w-8 h-8 text-purple-500" />,
      image: "",
      color: "#8B5CF6",
      posTaiwind: "col-span-2 col-start-5 row-start-1",
    },
    {
      emotion: "Enojo",
      icon: <Angry className="w-8 h-8 text-red-500" />,
      image: Anger,
      color: "#EF4444",
      posTaiwind: "col-span-3 col-start-1 row-start-2",
    },
    {
      emotion: "Ansiedad",
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      image: "",
      color: "#ee9e1b",
      posTaiwind: "col-span-3 col-start-4 row-start-2",
    },
  ];

  return (
    <section id="gallery" className="py-20 px-40 bg-major3">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestras Emociones
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Creadas con Poisson Image Blender que capturan cada emoción en los
            espacios icónicos de UTEC
          </p>
        </div>

        <div ref={galleryRef} className="grid grid-cols-6 grid-rows-2 gap-10">
          {emotions.map((item, index) => (
            <div
              key={index}
              className={`gallery-item opacity-0 transform translate-y-8 transition-all duration-700 bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 overflow-hidden ${item.posTaiwind}`}
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.emotion}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3">
                  {item.icon}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {item.emotion}
                </h3>
                <div
                  className="mt-4 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
