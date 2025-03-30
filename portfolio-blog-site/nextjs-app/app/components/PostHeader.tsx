// components/PostHeader.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface PostHeaderProps {
  PostTitle?: string;
}

const PostHeader = ({ PostTitle }: PostHeaderProps) => {
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link href="/" className="text-cyan-400 font-bold text-xl tracking-wide mr-6">
              Genrey O. Cristobal
            </Link>
            {PostTitle && (
              <div className="hidden md:block">
                <span className="text-gray-400 mx-2">→</span>
                <span className="text-white font-medium truncate max-w-xs">
                  {PostTitle}
                </span>
              </div>
            )}
          </motion.div>
          
          <nav>
            <motion.ul 
              className="flex space-x-2 sm:space-x-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.li
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/#Posts" 
                  className="text-sm font-medium px-3 py-2 rounded-md text-gray-300 hover:text-white transition-colors duration-200"
                >
                  All Posts
                </Link>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/" 
                  className="text-sm font-medium px-3 py-2 rounded-md text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Home
                </Link>
              </motion.li>
            </motion.ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default PostHeader;