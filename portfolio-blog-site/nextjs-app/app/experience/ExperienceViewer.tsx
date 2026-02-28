"use client";

import { motion } from "framer-motion";
import { Image } from "next-sanity/image";
import Link from "next/link";

interface ExperienceProps {
  experiences: {
    id: number;
    role: string;
    company: string;
    duration: string;
    description: string;
    icon: {
      asset: {
        _type: string;
        _ref: string;
      };
    };
    responsibilities?: string[];
    link?: string;
  }[];
}

/* Build a valid Sanity CDN URL from an asset _ref
   e.g. "image-abc123-200x200-png" → "https://cdn.sanity.io/images/<project>/<dataset>/abc123-200x200.png" */
function sanityImageUrl(ref: string): string {
  const cleaned = ref
    .replace(/^image-/, "")          // strip leading "image-"
    .replace(/-(\w+)$/, ".$1");      // replace last "-ext" with ".ext"

  return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${cleaned}`;
}

export const ExperienceViewer = (props: ExperienceProps) => {
  const { experiences } = props;

  return (
    <div className="grid grid-cols-4 gap-4 mx-0 md:grid-cols-1 max-sm:grid-cols-1 lg:grid-cols-4 w-full">
      {experiences.map((exp, index) => (
        <motion.div
          key={`exp-${exp.id}`}
          className="p-6 bg-gray-800/50 rounded-lg shadow-md border border-gray-700/50 flex flex-col h-full"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3, delay: index * 0.15 }}
          whileHover={{
            scale: 1.15,
            boxShadow: "0 10px 15px -3px rgba(45, 212, 191, 0.1), 0 4px 6px -2px rgba(45, 212, 191, 0.05)",
            borderColor: "rgba(45, 212, 191, 0.5)",
            cursor: "pointer",
          }}
        >
          <div className="flex flex-col mb-4">
            <div className="flex items-center gap-4 mb-2">
              <Image
                src={sanityImageUrl(exp.icon.asset._ref)}
                alt={exp.company}
                width={40}
                height={40}
                className="w-10 h-10 object-cover rounded-full flex-shrink-0"
              />
              <h3 className="text-xl font-semibold text-cyan-400 leading-tight flex-1">
                {exp.company}
              </h3>
              {exp.link && (
                <Link
                  href={exp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline text-sm"
                >
                  Visit
                </Link>
              )}
            </div>
            <p className="text-md font-medium text-white mb-1">{exp.role}</p>
            <p className="text-sm text-gray-400">{exp.duration}</p>
          </div>

          <div className="flex flex-col flex-grow">
            <p className="text-gray-300 mb-4">{exp.description}</p>

            {exp.responsibilities && (
              <div className="mt-2">
                <ul className="list-disc list-outside ml-4 text-gray-300 space-y-1">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={`resp-${exp.id}-${idx}`} className="text-sm leading-relaxed pl-1">
                      {resp}
                    </li>
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