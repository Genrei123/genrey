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
                            className="text-3xl sm:text-2xl font-bold text-white mb-6 inline-block relative pb-2"
                        >
                            About Me
                            <motion.span
                                className="absolute bottom-0 left-0 h-1 bg-cyan-400"
                                initial={{ width: 0 }}
                                animate={{ width: inView ? '60%' : 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            />
                        </motion.h2>

                        <div className="md:flex md:items-center md:space-x-12 md:justify-center">
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

                                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                                    <motion.button
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05, backgroundColor: "#2dd4bf", color: "#0a192f" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-cyan-500 text-gray-900 font-semibold px-6 py-3 rounded-md shadow-lg transition-colors duration-300 w-48"
                                        onClick={() => window.open("https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=genreycristobal03@gmail.com")}
                                    >
                                        Let&apos;s have a talk!
                                    </motion.button>

                                    <motion.button
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05, backgroundColor: "#2dd4bf", color: "#0a192f" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="mr-0 mb-2 bg-cyan-500 text-gray-900 font-semibold px-6 py-3 rounded-md shadow-lg transition-colors duration-300 w-48 "
                                        onClick={() => setShowResume(true)}
                                    >
                                        View Resume
                                    </motion.button>
                                </div>

                                <div className="flex justify-center md:justify-start mt-4 space-x-4">
                                    <motion.button
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.5, color: "#0a192f" }}
                                        whileTap={{ scale: 1.5 }}
                                        onClick={() => window.open("https://www.linkedin.com/in/genrey-cristobal-9b0056267/")}
                                    >
                                        <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#0077b5]">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">

                                                <path
                                                    d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                                            </svg>
                                        </span>
                                    </motion.button>

                                    <motion.button
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.5, color: "#f2f2f3" }}
                                        whileTap={{ scale: 1.5 }}
                                        onClick={() => window.open("https://github.com/Genrei123")}
                                    >
                                        <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#e4dddd]">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">

                                                <path
                                                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                                            </svg>
                                        </span>
                                    </motion.button>
                                </div>


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