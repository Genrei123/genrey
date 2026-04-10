"use client";

import { useState, useEffect, ReactNode } from "react";
import About, { type AboutContent, type SanityLink } from "./about/About";
import { motion } from "framer-motion";
import Header from "./components/Header";

interface ClientPortfolioProps {
  aboutData?: AboutContent | null;
  postsComponent: ReactNode;
  projectsComponent: ReactNode;
  galleryComponent: ReactNode;
  certificatesComponent: ReactNode;
  testimoniesComponent: ReactNode;
  experienceComponent: ReactNode;
  techStackComponent: ReactNode;
}

// --- Section Wrapper (with refined animations) ---
interface SectionWrapperProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string; // Allow passing additional classes
}

const SectionWrapper = ({
  id,
  title,
  children,
  className = "",
}: SectionWrapperProps) => {
  return (
    <section id={id} className={`py-20 sm:py-28 overflow-hidden ${className}`}>
      {" "}
      {/* Added overflow-hidden */}
      <div className="container mx-auto px-4">
        {title && (
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-white mb-10 sm:mb-14 inline-block relative pb-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }} // Trigger when 50% visible
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {title}
            {/* Animated underline for the title */}
            <motion.span
              className="absolute bottom-0 left-0 h-1 bg-cyan-400"
              initial={{ width: 0 }}
              whileInView={{ width: "60%" }} // Animate width
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.6, delay: 0.4 }} // Delay after text appears
            />
          </motion.h2>
        )}
        {/* Animate the content container */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 40 }} // Start slightly lower
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.02 }} // Trigger earlier
          transition={{ duration: 0.6, delay: 0.2 }} // Add small delay
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

// --- Main Portfolio Component ---
export default function ClientPortfolio({
  aboutData,
  postsComponent,
  projectsComponent,
  galleryComponent,
  certificatesComponent,
  testimoniesComponent,
  experienceComponent,
  techStackComponent,
}: ClientPortfolioProps) {
  const [activeSection, setActiveSection] = useState<string>("about");

  const contactCta = aboutData?.contactCta;
  const primaryContactLink =
    resolveLinkHref(contactCta?.primaryLink) ||
    resolveLinkHref(aboutData?.primaryAction?.link) ||
    "mailto:genreycristobal03@gmail.com";
  const secondaryContactLink =
    resolveLinkHref(contactCta?.secondaryLink) ||
    resolveLinkHref(aboutData?.socialLinks?.find((link) => link?.label?.toLowerCase().includes("linkedin"))?.link) ||
    "https://www.linkedin.com/in/genrey-cristobal-9b0056267/";
  const ctaEyebrow = contactCta?.eyebrow || "Let's collaborate";
  const ctaHeading = contactCta?.heading || "Interested in working together?";
  const ctaText =
    contactCta?.text ||
    "If my background and certifications align with your needs, let’s connect and discuss your project.";
  const primaryButtonText = contactCta?.primaryButtonText || "Contact Me";
  const secondaryButtonText = contactCta?.secondaryButtonText || "View LinkedIn";

  return (
    <>
      {/* Using a slightly different gradient and ensuring text contrasts */}
      <div className="bg-gradient-to-b from-[#0a192f] via-[#0a192f] to-gray-900 text-gray-300 min-h-screen">
        <Header
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Added pt-16 for fixed navbar height */}
        <main className="pt-16">
          {/* About section gets its own wrapper for the hover effect */}
          {/* We won't use SectionWrapper for About IF About implements its own container + animations */}
          <About
            id="about"
            setActiveSection={setActiveSection}
            data={aboutData}
          />

          <SectionWrapper
            id="experience"
            title="Experience"
            className="bg-black bg-opacity-10"
          >
            {experienceComponent || <LoadingPlaceholder />}
            {/* TODO: Add animations inside the Experience component for timeline items */}
          </SectionWrapper>

          <SectionWrapper
            id="testimonies"
            title="Testimonies & Supporting Documents"
            className="bg-black bg-opacity-10"
          >
            {testimoniesComponent || <LoadingPlaceholder />}
          </SectionWrapper>

          <SectionWrapper
            id="certificates"
            title="Certificates & Qualifications"
            className="bg-black bg-opacity-10"
          >
            {certificatesComponent || <LoadingPlaceholder />}
            <ContactCTA
              primaryLink={primaryContactLink}
              secondaryLink={secondaryContactLink}
              eyebrow={ctaEyebrow}
              heading={ctaHeading}
              text={ctaText}
              primaryButtonText={primaryButtonText}
              secondaryButtonText={secondaryButtonText}
            />
            {/* TODO: Add animations inside the Experience component for timeline items */}
          </SectionWrapper>

          {techStackComponent || <LoadingPlaceholder />}

          {/* Use SectionWrapper for the rest */}
          <SectionWrapper id="projects" title="">
            {/* Suggestion: Wrap each project card in motion.div */}
            {/* Example: */}
            {/* <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} > */}
            {/*   <ProjectCard ... /> */}
            {/* </motion.div> */}
            {projectsComponent || <LoadingPlaceholder />}
          </SectionWrapper>

          <SectionWrapper id="blog" title="">
            {/* Suggestion: Wrap each blog post card in motion.div (similar to projects) */}
            {postsComponent || <LoadingPlaceholder />}
          </SectionWrapper>

          <SectionWrapper
            id="gallery"
            title="Gallery"
            className="bg-black bg-opacity-10"
          >
            {/* Suggestion: Wrap each gallery item in motion.div (similar to projects) */}
            {galleryComponent || <LoadingPlaceholder />}
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

function resolveLinkHref(link?: SanityLink | null): string | null {
  if (!link) return null;

  switch (link.linkType) {
    case "page":
      return link.page ? `/${link.page}` : null;
    case "post":
      return link.post ? `/posts/${link.post}` : null;
    case "project":
      return link.project ? `/${link.project}` : null;
    case "href":
      return link.href || null;
    default:
      return null;
  }
}

const ContactCTA = ({
  primaryLink,
  secondaryLink,
  eyebrow,
  heading,
  text,
  primaryButtonText,
  secondaryButtonText,
}: {
  primaryLink: string;
  secondaryLink: string;
  eyebrow: string;
  heading: string;
  text: string;
  primaryButtonText: string;
  secondaryButtonText: string;
}) => {
  const openPrimaryInNewTab = !primaryLink.startsWith("/") && !primaryLink.startsWith("#") && !primaryLink.startsWith("mailto:");
  const openSecondaryInNewTab = !secondaryLink.startsWith("/") && !secondaryLink.startsWith("#") && !secondaryLink.startsWith("mailto:");

  return (
    <motion.div
      className="mt-10 sm:mt-14 rounded-2xl border border-cyan-400/30 bg-gradient-to-r from-gray-900/90 to-gray-800/80 p-6 sm:p-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-cyan-300 text-sm font-semibold tracking-wide uppercase mb-2">{eyebrow}</p>
          <h3 className="text-white text-2xl sm:text-3xl font-bold">{heading}</h3>
          <p className="text-gray-300 mt-2 max-w-xl">{text}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:shrink-0">
          <motion.a
            href={primaryLink}
            target={openPrimaryInNewTab ? "_blank" : undefined}
            rel={openPrimaryInNewTab ? "noreferrer" : undefined}
            className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-gray-950 hover:bg-cyan-300 transition-colors"
            whileHover={{
              x: [0, -2, 2, -1, 1, 0],
              y: [0, -1, 1, -1, 1, 0],
              transition: { duration: 0.35, ease: "easeInOut" },
            }}
          >
            {primaryButtonText}
          </motion.a>
          <motion.a
            href={secondaryLink}
            target={openSecondaryInNewTab ? "_blank" : undefined}
            rel={openSecondaryInNewTab ? "noreferrer" : undefined}
            className="inline-flex items-center justify-center rounded-full border border-cyan-300/60 px-6 py-3 text-sm font-semibold text-cyan-100 hover:bg-cyan-400/10 transition-colors"
            whileHover={{
              x: [0, 2, -2, 1, -1, 0],
              transition: { duration: 0.35, ease: "easeInOut" },
            }}
          >
            {secondaryButtonText}
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};
