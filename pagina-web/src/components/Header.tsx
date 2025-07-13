import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-around">
          {/* Logo */}
          {/* <div className="flex justify-around space-x-2">
            <Play className="w-8 h-8 text-[#0057B7]" />
            <span className="text-2xl font-bold text-[#0057B7]">UTEC</span>
          </div> */}

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-20">
            {[
              { name: "Inicio", id: "hero" },
              { name: "Galería", id: "gallery" },
              { name: "Videos Unity", id: "videos" },
              // { name: "Proceso", id: "process" },
              { name: "Código Fuente", id: "source" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-medium transition-colors hover:text-lightmajor ${
                  isScrolled ? "text-gray-700" : "text-white"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X
                className={`w-6 h-6 ${
                  isScrolled ? "text-gray-700" : "text-white"
                }`}
              />
            ) : (
              <Menu
                className={`w-6 h-6 ${
                  isScrolled ? "text-gray-700" : "text-white"
                }`}
              />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 p-4 bg-white rounded-lg shadow-xl">
            <nav className="flex flex-col space-y-3">
              {[
                { name: "Inicio", id: "hero" },
                { name: "Galería", id: "gallery" },
                { name: "Videos Unity", id: "videos" },
                { name: "Proceso", id: "process" },
                { name: "Código Fuente", id: "source" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 font-medium hover:text-major transition-colors text-left"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
