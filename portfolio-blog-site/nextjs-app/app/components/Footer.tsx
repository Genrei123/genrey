// components/Footer.tsx
"use client";

import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-500 py-8">
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} Genrey O. Cristobal. All rights reserved.</p>
        <div className="mt-5 flex justify-center space-x-6">
          {/* Added motion.a and hover effects */}
          <motion.a 
            href="#" 
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            whileHover={{ y: -3, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="sr-only">GitHub</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">{/* SVG path */}</svg>
          </motion.a>
          <motion.a 
            href="#" 
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            whileHover={{ y: -3, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="sr-only">LinkedIn</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">{/* SVG path */}</svg>
          </motion.a>
          <motion.a 
            href="#" 
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            whileHover={{ y: -3, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="sr-only">Twitter</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">{/* SVG path */}</svg>
          </motion.a>
          {/* Add other links similarly */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;