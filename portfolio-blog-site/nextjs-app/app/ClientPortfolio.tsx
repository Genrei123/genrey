"use client";

import { useState, useEffect, ReactNode } from "react";
import About from "./about/About";
import Experience from "./experience/Experience";
import { motion } from "framer-motion";

interface ClientPortfolioProps {
  postsComponent: ReactNode;
  projectsComponent: ReactNode;
}

// Navigation component
interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation = ({ activeSection, setActiveSection }: NavigationProps) => {
  const sections = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "blog", label: "Blog" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Find the current section based on scroll position
      const sectionElements = sections.map(section => ({
        id: section.id,
        offsetTop: document.getElementById(section.id)?.offsetTop || 0
      }));
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        if (scrollPosition >= sectionElements[i].offsetTop - 100) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setActiveSection]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth"
      });
      setActiveSection(sectionId);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-90 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-cyan-400 font-bold text-xl"
          >
            Portfolio
          </motion.div>
          <ul className="flex space-x-6">
            {sections.map((section) => (
              <motion.li 
                key={section.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`text-sm font-medium px-2 py-1 rounded transition-colors duration-300 ${
                    activeSection === section.id 
                      ? "text-cyan-400 border-b-2 border-cyan-400" 
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {section.label}
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

// Section wrapper component with animations
interface SectionWrapperProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const SectionWrapper = ({ id, title, children }: SectionWrapperProps) => {
  return (
    <section id={id} className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-12 inline-block border-b-2 border-cyan-400 pb-2">{title}</h2>
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default function ClientPortfolio({ postsComponent, projectsComponent }: ClientPortfolioProps) {
  const [activeSection, setActiveSection] = useState<string>("about");

  return (
    <>
      <div className="bg-gradient-to-br from-gray-900 to-gray-950 text-gray-200 min-h-screen">
        <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <div className="pt-16">
          <SectionWrapper id="about" title="About Me">
            <About />
          </SectionWrapper>

          <div className="bg-gray-900 bg-opacity-50">
            <SectionWrapper id="experience" title="Experience">
              <Experience />
            </SectionWrapper>
          </div>
          
          <SectionWrapper id="projects" title="Projects">
            {projectsComponent || (
              <div className="flex justify-center items-center h-40">
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-gray-700 h-12 w-12"></div>
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SectionWrapper>
          
          <div className="bg-gray-900 bg-opacity-50">
            <SectionWrapper id="blog" title="Blog">
              {postsComponent || (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-gray-700 h-12 w-12"></div>
                    <div className="flex-1 space-y-4 py-1">
                      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-700 rounded"></div>
                        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </SectionWrapper>
          </div>

          <footer className="bg-gray-950 text-gray-400 py-8">
            <div className="container mx-auto px-4 text-center">
              <p>© {new Date().getFullYear()} - Portfolio Website</p>
              <div className="mt-4 flex justify-center space-x-4">
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}