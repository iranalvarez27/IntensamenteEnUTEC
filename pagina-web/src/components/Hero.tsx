import React from "react";
import { Github } from "lucide-react";
import Background from "../assets/background.png";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative h-[34rem] flex items-center justify-center overflow-hidden"
    >
      {/* Background with parallax effect */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-major via-major/90 to-major/70"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-major/80" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-[#23bde6]">Intensamente</span> en{" "}
          <span className="text-[#FFD700]">UTEC</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
          Qué tal un corto animado que fusiona las emociones de Intensamente y
          nuestros rincones reales de UTEC
        </p>

        <button
          onClick={() =>
            window.open(
              "https://github.com/iranalvarez27/IntensamenteEnUTEC",
              "_blank"
            )
          }
          className="w-[40%] inline-flex items-center bg-[#FFD700] hover:bg-[#FFA500] text-major font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl justify-center space-x-3"
        >
          <Github className="w-5 h-5" />
          <span>Blending en GitHub</span>
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <span className="w-full text-6xl text-center">↓</span>
      </div>
    </section>
  );
};

export default Hero;
