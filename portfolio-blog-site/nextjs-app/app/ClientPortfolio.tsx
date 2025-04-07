"use client";

import { useState, useEffect, ReactNode } from "react";
import About from "./about/About"; 
import Experience from "./experience/Experience";
import { motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Certificates from "./components/Certificates";

interface ClientPortfolioProps {
  postsComponent: ReactNode;
  projectsComponent: ReactNode;
}

// --- Section Wrapper (with refined animations) ---
interface SectionWrapperProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string; // Allow passing additional classes
}

const SectionWrapper = ({ id, title, children, className = "" }: SectionWrapperProps) => {
  return (
    <section id={id} className={`py-20 sm:py-28 overflow-hidden ${className}`}> {/* Added overflow-hidden */}
      <div className="container mx-auto px-4">
         {/* Animate the title separately */}
         <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-white mb-10 sm:mb-14 inline-block relative pb-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }} // Trigger when 50% visible
            transition={{ duration: 0.5, delay: 0.1 }}
         >
            {title}
            {/* Animated underline for the title */}
            <motion.span 
               className="absolute bottom-0 left-0 h-1 bg-cyan-400"
               initial={{ width: 0 }}
               whileInView={{ width: '60%' }} // Animate width
               viewport={{ once: true, amount: 0.5 }}
               transition={{ duration: 0.6, delay: 0.4 }} // Delay after text appears
            />
         </motion.h2>
         {/* Animate the content container */}
         <motion.div
            initial={{ opacity: 0, y: 40 }} // Start slightly lower
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} // Trigger earlier
            transition={{ duration: 0.6, delay: 0.2 }} // Add small delay
         >
            {children}
         </motion.div>
      </div>
    </section>
  );
};


// --- Main Portfolio Component ---
export default function ClientPortfolio({ postsComponent, projectsComponent }: ClientPortfolioProps) {
  const [activeSection, setActiveSection] = useState<string>("about");

  return (
    <>
      {/* Using a slightly different gradient and ensuring text contrasts */}
      <div className="bg-gradient-to-b from-[#0a192f] via-[#0a192f] to-gray-900 text-gray-300 min-h-screen">
        <Header activeSection={activeSection} setActiveSection={setActiveSection} />

        {/* Added pt-16 for fixed navbar height */}
        <main className="pt-16"> 
          {/* About section gets its own wrapper for the hover effect */}
          {/* We won't use SectionWrapper for About IF About implements its own container + animations */}
          <About id="about" setActiveSection={setActiveSection} /> 

          <SectionWrapper id="experience" title="Certificates & Qualifications" className="bg-black bg-opacity-10">
            <Certificates />
            {/* TODO: Add animations inside the Experience component for timeline items */}
          </SectionWrapper>

          {/* Use SectionWrapper for the rest */}
          <SectionWrapper id="experience" title="Experience" className="bg-black bg-opacity-10">
            <Experience />
            {/* TODO: Add animations inside the Experience component for timeline items */}
          </SectionWrapper>

          <SectionWrapper id="projects" title="">
            {/* Suggestion: Wrap each project card in motion.div */}
             {/* Example: */}
             {/* <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} > */}
             {/*   <ProjectCard ... /> */}
             {/* </motion.div> */}
            {projectsComponent || <LoadingPlaceholder />}
          </SectionWrapper>

          <SectionWrapper id="blog" title="Blog" className="bg-black bg-opacity-10">
            {/* Suggestion: Wrap each blog post card in motion.div (similar to projects) */}
            {postsComponent || <LoadingPlaceholder />}
          </SectionWrapper>
        </main>

      </div>
    </>
  );
}

// --- Loading Placeholder Component ---
const LoadingPlaceholder = () => (
  <div className="flex justify-center items-center h-40 opacity-50">
    <div className="animate-pulse flex space-x-4 w-full max-w-md">
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
);