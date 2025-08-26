import { motion } from 'framer-motion';
import Link from 'next/link';

// Example data structure
const experiences = [
  {
    id: 1,
    role: "Web Developer Intern",
    company: "Regal Rexnord",
    duration: "Present",
    description: "Collaborated with cross-functional teams to create and maintain web applications that enhance user experience and drive business growth.",
    icon: "/rrx.png",
    responsibilities: [
      "Work closely with developers, product managers and other team members and participate in design reviews.",
      "Develop and ensured that the UI is responsive and works seamlessly across different devices and browsers.",
      "Wrote automation scripts to streamline repetitive tasks and improve efficiency in the department.",
    ],
    link: "https://www.regalrexnord.com/"
  },
  {
    id: 2,
    role: "Fullstack Developer",
    company: "J5 Pharmacy",
    duration: "Present",
    description: "Coordinate with a team of developers to design, develop, and maintain web applications for J5 Pharmacy.",
    icon: "/j5.ico",
    responsibilities: [
      "Led the e-commerce initiative with modern web tools such as Next.js, Java SpringBoot and MySQL with the use of SCRUM methodologies.",
      "Coaches and tracks the Team's progress in improving existing Pharmacy management system and e-commerce website",
      "Implemented a QA/UAT environment for the team",
      "Found and addressed vulnerabilities such as client authentication bypass, type malformation and overloading of API requests"
    ],
    link: "https://j5pharmacy.com/"
  },
  {
    id: 3,
    role: "Project Manager",
    company: "Jimirene Maternity Clinic",
    duration: "2024 - 2025",
    description: "Analyzed and design a business solution to streamline patient and inventory management",
    icon: "/jimirene.png",
    responsibilities: [
      "Led a group of 5 members and ensured that the system have proper version control system and environment",
      "Created the application React-Vite, Java Springboot and MySQL as the Database",
      "Converted traditional records into digital one",
      "Analyzed and created patient management system with inventory management system and automated the PhilHealth claims process",
    ]
  },
  {
    id: 4,
    role: "Website Administrator ",
    company: "UCC - Computer Science Website",
    duration: "2024 - 2025",
    description: "Adjusted key features and updated the site's content to University's standard",
    icon: "/ingo.svg",
    responsibilities: [
      "Maintain and update website content to ensure accuracy and relevance.",
      "Implement new features and functionalities to enhance user experience.",
      "Monitor website performance and troubleshoot issues as they arise.",
      "Collaborate with the Alumnis and Professors to ensure website security and compliance with university policies."
    ],
    link: "https://uccingo.vercel.app/"
  },
];

const Experience = () => {
  return (
    <div className="grid grid-cols-4 gap-4 mx-0 md:grid-cols-1 max-sm:grid-cols-1 lg:grid-cols-4 w-full">
      {experiences.map((exp, index) => (
        // Animate each experience item
        <motion.div
          key={exp.id}
          className="p-6 bg-gray-800/50 rounded-lg shadow-md border border-gray-700/50 flex flex-col h-full"
          initial={{ opacity: 0, x: -50 }} // Animate from left
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3, delay: index * 0.15 }} // Stagger animation
          whileHover={{
            // Optional: Add hover effect to each card
            scale: 1.15,
            boxShadow: "0 10px 15px -3px rgba(45, 212, 191, 0.1), 0 4px 6px -2px rgba(45, 212, 191, 0.05)",
            borderColor: 'rgba(45, 212, 191, 0.5)', // Highlight border on hover
            cursor: "pointer"
          }}
        >
          {/* Header section with fixed structure */}
          <div className="flex flex-col mb-4">
            <div className="flex items-center gap-4 mb-2">
              <img
                src={exp.icon}
                alt="Genrey Cristobal"
                className="w-10 h-10 object-cover rounded-full flex-shrink-0"
              />
              <h3 className="text-xl font-semibold text-cyan-400 leading-tight flex-1">{exp.company}</h3>
              {exp.link && (
                <Link
                  href={exp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline text-sm"
                >Visit</Link>

              )}

            </div>
            <p className="text-md font-medium text-white mb-1">{exp.role}</p>
            <p className="text-sm text-gray-400">{exp.duration}</p>
          </div>

          {/* Description section that grows to fill space */}
          <div className="flex flex-col flex-grow">
            <p className="text-gray-300 mb-4">{exp.description}</p>

            {/* Responsibilities pushed to bottom */}
            {exp.responsibilities && (
              <div className="mt-2">
                <ul className="list-disc list-outside ml-4 text-gray-300 space-y-1">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-sm leading-relaxed pl-1">{resp}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Experience;