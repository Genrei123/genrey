// ./about/About.tsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { useEffect } from 'react';

interface AboutProps {
    id: string;
    setActiveSection?: React.Dispatch<React.SetStateAction<string>>;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
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

// Resume Viewer Component
const ResumeViewer = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <div className="relative w-full max-w-4xl h-[90vh] bg-gray-900 rounded-lg overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 text-white hover:text-cyan-400 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <iframe
                    src="/resume.pdf"
                    className="w-full h-full"
                    frameBorder="0"
                    title="Resume"
                >
                    <p>Your browser does not support PDFs. <a href="/resume.pdf">Download the resume</a> instead.</p>
                </iframe>
            </div>
        </div>
    );
};

const About = ({ id }: AboutProps) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });
    const [showResume, setShowResume] = useState(false);

    // Close resume viewer when pressing Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setShowResume(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            {showResume && <ResumeViewer onClose={() => setShowResume(false)} />}

            <motion.section
                id={id}
                ref={ref}
                className="relative min-h-[70vh] sm:min-h-[90vh] flex items-center py-20 sm:py-28 overflow-hidden cursor-pointer"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{
                    backgroundColor: '#0a192f',
                    transition: 'background-color 0.4s ease-in-out'
                }}
            >
                <div className="container mx-auto px-4 z-10 relative">
                    <motion.div
                        className="max-w-4xl mx-auto text-center md:text-left"
                        variants={containerVariants}
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl sm:text-4xl font-bold text-white mb-6 inline-block relative pb-2"
                        >
                            About Me
                            <motion.span
                                className="absolute bottom-0 left-0 h-1 bg-cyan-400"
                                initial={{ width: 0 }}
                                animate={{ width: inView ? '60%' : 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            />
                        </motion.h2>

                        <div className="md:flex md:items-center md:space-x-12">
                            <motion.div
                                className="md:w-2/3"
                                variants={itemVariants}
                            >
                                <p className="text-lg sm:text-xl text-gray-300 mb-4 leading-relaxed">
                                    Hey there! I&apos;m Genrey – a full-stack developer passionate about building impactful software. I&apos;ve led teams developing clinic management systems, AI-driven game engines, and other real-world solutions using React, Node.js, Java Spring Boot, and PostgreSQL.
                                </p>
                                <p className="text-lg sm:text-xl text-gray-300 mb-6 leading-relaxed">
                                    Beyond coding, I organize workshops empowering 1,000+ students in tech. Whether it&apos;s optimizing systems or mentoring others, I thrive on creating solutions that make a difference.
                                </p>
                                <motion.button
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05, backgroundColor: "#2dd4bf", color: "#0a192f" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mr-2 mb-2 bg-cyan-500 text-gray-900 font-semibold px-6 py-3 rounded-md shadow-lg transition-colors duration-300"
                                    onClick={() => setShowResume(true)}
                                >
                                    View Resume
                                </motion.button>

                                <motion.button
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05, backgroundColor: "#2dd4bf", color: "#0a192f" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-cyan-500 text-gray-900 font-semibold px-6 py-3 rounded-md shadow-lg transition-colors duration-300"
                                    onClick = {() => window.open("https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=genreycristobal03@gmail.com") }
                                >
                                    Let&apos;ms have a talk!
                                </motion.button>

                                
                            </motion.div>

                            

                            <motion.div
                                className="md:w-1/3 mt-8 md:mt-0 flex justify-center"
                                variants={itemVariants}
                                whileHover={{ scale: 1.03 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-1 shadow-xl overflow-hidden">
                                    <img
                                        src="/icon.png"
                                        alt="Genrey Cristobal"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>
        </>
    );
};

export default About;