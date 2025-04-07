// components/Header.tsx
"use client";

import { useEffect, ReactNode } from "react";
import { motion } from "framer-motion";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Header = ({ activeSection, setActiveSection }: HeaderProps) => {
  const sections = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "blog", label: "Blog" }
  ];

  // Keep useEffect for scrollspy as is (it's good)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sectionElements = sections.map(section => ({
        id: section.id,
        offsetTop: document.getElementById(section.id)?.offsetTop || 0
      }));

      let currentSection = sections[0].id; // Default to the first section
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        // Adjust offsetTop calculation for better accuracy with fixed header
        if (scrollPosition >= sectionElements[i].offsetTop - 150) { // Increased offset
          currentSection = sections[i].id;
          break;
        }
      }
       // Only update if the section has actually changed
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check in case the page loads scrolled down
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  // Add activeSection to dependency array if you want useEffect to re-run if it's changed externally
  // But for scroll spying, only setActiveSection is needed.
  }, [setActiveSection, sections, activeSection]); // Added activeSection dependency

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Calculate offset considering the fixed navbar height (approx 60-70px)
      const offsetTop = section.offsetTop - 70; 
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
      // Optionally set active section immediately on click for faster feedback
      // setActiveSection(sectionId); // Keep this if you want immediate visual feedback
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800/50">
      {/* Added transparency and stronger blur */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16"> {/* Fixed height */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-cyan-400 font-bold text-xl tracking-wide"
          >
            Genrey
          </motion.div>
          <ul className="flex space-x-2 sm:space-x-4"> {/* Reduced spacing slightly */}
            {sections.map((section) => (
              <motion.li
                key={section.id}
                className="relative" // Needed for absolute positioning of the underline
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 relative z-10 ${ // Added z-10
                    activeSection === section.id
                      ? "text-white" // Active text bolder/brighter
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {section.label}
                  {activeSection === section.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                      layoutId="underline" // Key for the animation
                      initial={false} // Don't animate initial render of this specific div
                      transition={{ type: "spring", stiffness: 300, damping: 25 }} // Smoother transition
                    />
                  )}
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;