import { allExperienceQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "../../sanity/lib/live";
import { ExperienceViewer } from "./ExperienceViewer";

export const Experience = async () => {
  const { data } = await sanityFetch({
    query: allExperienceQuery,
  });

  if (!data || data.length === 0) {
    return <div>No experience available.</div>;
  }

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

console.log("Experience data:", data);

  return (
    <div className="w-full h-full">
      <ExperienceViewer experiences={data} />
    </div>
  );
};

export default Experience;