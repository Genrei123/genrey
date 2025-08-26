// components/Header.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Header = ({ activeSection, setActiveSection }: HeaderProps) => {
  const [isClient, setIsClient] = useState(false);
  
  const sections = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "blog", label: "Blog" },
    { id: "gallery", label: "Gallery" },
  ];

  // Ensure we're on client before doing any scroll-related operations
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sectionElements = sections.map(section => {
        const element = document.getElementById(section.id);
        return {
          id: section.id,
          offsetTop: element?.offsetTop || 0
        };
      });

      let currentSection = sections[0].id;
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        if (scrollPosition >= sectionElements[i].offsetTop - 150) {
          currentSection = sections[i].id;
          break;
        }
      }
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClient, setActiveSection, activeSection]);

  const scrollToSection = (sectionId: string) => {
    if (!isClient) return;
    
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  // Render a consistent initial state for both server and client
  if (!isClient) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="text-cyan-400 font-bold text-xl tracking-wide">
              Genrey
            </div>
            <ul className="hidden lg:md:flex space-x-2">
              {sections.map((section) => (
                <li key={section.id} className="relative md:text-cyan-400">
                  <button
                    className="text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 relative z-10 text-gray-300 hover:text-white"
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
            <details className="block md:hidden dropdown dropdown-end">
              <summary className="btn m-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                  <path d="M4 6h16" />
                </svg>
              </summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button className="text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 relative z-10 text-gray-300 hover:text-white">
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-cyan-400 font-bold text-xl tracking-wide"
          >
            Genrey
          </motion.div>
          
          <ul className="hidden lg:md:flex space-x-2">
            {activeSection !== "gallery" && sections.map((section) => (
              <motion.li
                key={section.id}
                className="relative md:text-cyan-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 relative z-10 ${
                    activeSection === section.id
                      ? "text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {section.label}
                  {activeSection === section.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                      layoutId="underline"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </button>
              </motion.li>
            ))}

            {activeSection === "gallery" && (
              <>
                <motion.li
                  key="about-home"
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 relative z-10 text-gray-300 hover:text-white"
                  >
                    Home
                  </button>
                </motion.li>

                <motion.li
                  key="gallery-active"
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => scrollToSection("gallery")}
                    className="text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 relative z-10 text-white"
                  >
                    Gallery
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                      layoutId="underline"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  </button>
                </motion.li>
              </>
            )}
          </ul>

          <details className="block md:hidden dropdown dropdown-end">
            <summary className="btn m-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12h16" />
                <path d="M4 18h16" />
                <path d="M4 6h16" />
              </svg>
            </summary>
            
            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
              {activeSection !== "gallery" && sections.map((section) => (
                <li key={section.id}>
                  <motion.button
                    onClick={() => scrollToSection(section.id)}
                    className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 relative z-10 ${
                      activeSection === section.id
                        ? "text-white"
                        : "text-gray-300 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {section.label}
                    {activeSection === section.id && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                        layoutId="underline-mobile"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                  </motion.button>
                </li>
              ))}

              {activeSection === "gallery" && (
                <>
                  <li key="mobile-home">
                    <motion.button
                      onClick={() => scrollToSection("about")}
                      className="text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 relative z-10 text-gray-300 hover:text-white"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Home
                    </motion.button>
                  </li>
                  
                  <li key="mobile-gallery">
                    <motion.button
                      onClick={() => scrollToSection("gallery")}
                      className="text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 relative z-10 text-white"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Gallery
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                        layoutId="underline-mobile"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    </motion.button>
                  </li>
                </>
              )}
            </ul>
          </details>
        </div>
      </div>
    </nav>
  );
};

export default Header;