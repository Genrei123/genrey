// ./experience/Experience.tsx
import { motion } from 'framer-motion';

// Example data structure
const experiences = [
  { id: 1, role: "Web Developer Intern", company: "Regal Rexnord", duration: "Present", description: "Gained hands-on experiece on how the web works" },
  { id: 2, role: "Project Manager", company: "Jimirene Maternity Clinic", duration: "2024 - Present", description: "Analyzed and design a business solution to streamline patient and inventory management" },
  { id: 3, role: "Fullstack Developer", company: "Jimirene Maternity Clinic", duration: "Present", description: "Developed competitive price monitoring for the business to competitively price in the market" },
  { id: 4, role: "Website Administrator, UCC-INGO ", company: "University's Computer Science Website", duration: "Present", description: "Adjusted key features and updated the site's content to University's standard" },
  
  
];

const Experience = () => {
  return (
    <div className="space-y-12 max-w-3xl mx-auto"> 
      {experiences.map((exp, index) => (
        // Animate each experience item
        <motion.div
          key={exp.id}
          className="p-6 bg-gray-800/50 rounded-lg shadow-md border border-gray-700/50"
          initial={{ opacity: 0, x: -50 }} // Animate from left
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: index * 0.15 }} // Stagger animation
          whileHover={{ 
             // Optional: Add hover effect to each card
             // scale: 1.02, 
             // boxShadow: "0 10px 15px -3px rgba(45, 212, 191, 0.1), 0 4px 6px -2px rgba(45, 212, 191, 0.05)",
             borderColor: 'rgba(45, 212, 191, 0.5)' // Highlight border on hover
           }} 
        >
          <h3 className="text-xl font-semibold text-cyan-400 mb-1">{exp.role}</h3>
          <p className="text-md font-medium text-white mb-1">{exp.company}</p>
          <p className="text-sm text-gray-400 mb-3">{exp.duration}</p>
          <p className="text-gray-300">{exp.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Experience;