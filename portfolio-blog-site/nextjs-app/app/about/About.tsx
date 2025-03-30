// ./about/About.tsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer'; // For triggering animations on view

interface AboutProps {
  id: string;
  // Pass setActiveSection if you want this component to potentially update it,
  // though SectionWrapper usually handles this via scroll. Let's keep it simple for now.
  // setActiveSection: (section: string) => void; 
}

// Animation Variants for staggering content
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger delay between children
      delayChildren: 0.3,   // Wait before starting children animations
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" } 
  },
};

const About = ({ id }: AboutProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once
    threshold: 0.2,    // Trigger when 20% of the element is visible
  });

  return (
    // Section container - Apply hover effect here
    <motion.section
      id={id}
      ref={ref} // Attach ref for useInView
      className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center py-20 sm:py-28 overflow-hidden cursor-pointer" // Added cursor-pointer
      initial="hidden"
      animate={inView ? "visible" : "hidden"} // Animate based on inView status
      whileHover={{
        // --- Background Hover Effect ---
        // Option 1: Simple Background Color Change
         // backgroundColor: 'rgba(16, 185, 129, 0.1)', // Example: Subtle green tint
         
        // Option 2: Subtle Gradient Shift (Requires bg-gradient-to-...)
         // backgroundImage: 'linear-gradient(to bottom right, #0a192f, #112240, #0f3460)', // Example shift
         
        // Option 3: Add a pseudo-element overlay (More complex, might need CSS)
        // --- Choose ONE effect ---
      }}
      // Add a transition for the hover effect itself
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{ 
        // Default background - Can be set here or via Tailwind class
        // This ensures the transition works smoothly from the default state
         backgroundColor: '#0a192f', // Match the main background or make slightly different
         // Use background gradients carefully with hover transitions in Framer Motion directly
         // A CSS transition on background might be smoother for gradients
         transition: 'background-color 0.4s ease-in-out' // CSS fallback/enhancement
      }}
    >
       {/* Optional: Add a subtle animated background pattern or shapes */}
       {/* <AnimatedBackgroundShapes /> */}

      <div className="container mx-auto px-4 z-10 relative">
         {/* Use variants for staggered animation */}
         <motion.div 
            className="max-w-4xl mx-auto text-center md:text-left"
            variants={containerVariants} // Apply container variants here
          >
          <motion.h2 
            variants={itemVariants} // Item animation
            className="text-3xl sm:text-4xl font-bold text-white mb-6 inline-block relative pb-2"
          >
            About Me
             {/* Animated underline (similar to SectionWrapper) */}
             <motion.span 
                className="absolute bottom-0 left-0 h-1 bg-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: inView ? '60%' : 0 }} // Animate width based on inView
                transition={{ duration: 0.6, delay: 0.8 }} // Delay after text appears
             />
          </motion.h2>

          {/* Example Layout: Text on Left, Image on Right (Desktop) */}
          <div className="md:flex md:items-center md:space-x-12">
             <motion.div 
                className="md:w-2/3"
                variants={itemVariants} // Item animation
              >
               <p className="text-lg sm:text-xl text-gray-300 mb-4 leading-relaxed">
                 Hi there! I'm Genrey, a passionate Full-Stack Developer specializing in creating modern, interactive web applications. I thrive on turning complex problems into elegant solutions.
               </p>
               <p className="text-lg sm:text-xl text-gray-300 mb-6 leading-relaxed">
                 With experience in React, Next.js, Node.js, and databases like PostgreSQL and MongoDB, I love bringing ideas to life, from concept to deployment. I'm also proficient with Sanity.io for content management.
               </p>
                {/* Optional: Add a call to action button */}
                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, backgroundColor: "#2dd4bf", color: "#0a192f" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-cyan-500 text-gray-900 font-semibold px-6 py-3 rounded-md shadow-lg transition-colors duration-300"
                >
                  View Resume
                </motion.button>
             </motion.div>

             {/* Placeholder for an Image */}
             <motion.div 
                className="md:w-1/3 mt-8 md:mt-0 flex justify-center"
                variants={itemVariants} // Item animation
                whileHover={{ scale: 1.03 }} // Subtle hover scale for the image container
                transition={{ type: 'spring', stiffness: 300 }}
              >
               <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-1 shadow-xl overflow-hidden">
                  {/* Replace with your actual image */}
                  <img 
                    src="/icon.png" // Replace with your image path
                    alt="Genrey Cristobal" 
                    className="w-full h-full object-cover rounded-full" 
                  />
               </div>
             </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;