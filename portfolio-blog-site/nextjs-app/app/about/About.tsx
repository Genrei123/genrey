"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, type Dispatch, type MouseEvent as ReactMouseEvent, type SetStateAction } from "react";
import { urlForImage } from "@/sanity/lib/utils";

export type SanityLink = {
  linkType?: "href" | "page" | "post" | "project";
  href?: string;
  page?: string | null;
  post?: string | null;
  project?: string | null;
  openInNewTab?: boolean;
};

export type AboutTimelineItem = {
  _key?: string;
  date: string;
  title: string;
  impact?: string;
  outcomes?: string[];
  image?: {
    src?: string;
    asset?: {
      _ref?: string;
    };
    alt?: string;
  };
  link?: SanityLink | null;
};

export type AboutContent = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  primaryAction?: {
    label?: string;
    link?: SanityLink | null;
  } | null;
  secondaryAction?: {
    label?: string;
    link?: SanityLink | null;
  } | null;
  socialLinks?: Array<{
    label?: string;
    link?: SanityLink | null;
  }>;
  contactCta?: {
    eyebrow?: string;
    heading?: string;
    text?: string;
    primaryButtonText?: string;
    primaryLink?: SanityLink | null;
    secondaryButtonText?: string;
    secondaryLink?: SanityLink | null;
  } | null;
  timelineTitle?: string;
  timelineItems?: AboutTimelineItem[];
};


interface AboutProps {
  id: string;
  setActiveSection?: Dispatch<SetStateAction<string>>;
  data?: AboutContent | null;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const timelineItemVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const fallbackAboutContent: AboutContent = {
  eyebrow: "Full-Stack Developer • Team Lead • Mentor",
  heading: "Building reliable software that solves real-world problems.",
  description:
    "I'm Genrey, a full-stack developer focused on practical products—from clinic management systems to AI-assisted platforms. I enjoy turning complex requirements into clean, maintainable solutions and helping teams ship with confidence.",
  primaryAction: {
    label: "Let's Have a Talk",
    link: {
      linkType: "href",
      href: "mailto:genreycristobal03@gmail.com",
    },
  },
  secondaryAction: {
    label: "View Resume",
    link: {
      linkType: "href",
      href: "/resume.pdf",
    },
  },
  socialLinks: [
    {
      label: "LinkedIn",
      link: {
        linkType: "href",
        href: "https://www.linkedin.com/in/genrey-cristobal-9b0056267/",
        openInNewTab: true,
      },
    },
    {
      label: "GitHub",
      link: {
        linkType: "href",
        href: "https://github.com/Genrei123",
        openInNewTab: true,
      },
    },
  ],
  timelineTitle: "Projects / Achievements",
  timelineItems: [
    {
      date: "Mar 2026",
      title: "ResCon 2026 Speaker",
      impact:
        "Presented practical software engineering workflows and mentored student developers during community sessions.",
      outcomes: ["Delivered live technical walkthroughs", "Guided peer projects and developer Q&A"],
      image: {
        src: "/logo.jpg",
        alt: "ResCon community session photo",
      },
    },
    {
      date: "Jan 2026",
      title: "Student Tech Leadership Programs",
      impact: "Organized and facilitated programs focused on project-based learning, collaboration, and delivery quality.",
      outcomes: ["Expanded student participation in technical events", "Strengthened mentorship pipeline for juniors"],
      image: {
        src: "/icon.png",
        alt: "Student leadership and workshop photo",
      },
    },
    {
      date: "Sep 2025",
      title: "Clinic Management System Delivery",
      impact: "Co-led development of a clinic workflow platform for operational efficiency and maintainable architecture.",
      outcomes: ["Built core modules for appointments and records", "Applied full-stack practices for long-term reliability"],
      image: {
        src: "/logo.jpg",
        alt: "Clinic management project photo",
      },
    },
    {
      date: "Jun 2025",
      title: "IoT Drowsiness Detection Prototype",
      impact: "Built an end-to-end safety prototype integrating real-time signals, software logic, and hardware interaction.",
      outcomes: ["Implemented real-time detection pipeline", "Validated prototype in classroom and demo settings"],
      image: {
        src: "/icon.png",
        alt: "IoT prototype demo photo",
      },
    },
    {
      date: "Apr 2025",
      title: "Blockchain Compliance Verification Project",
      impact: "Developed a compliance-focused system design with auditability and transparent record validation.",
      outcomes: ["Modeled verifiable transaction workflows", "Presented architecture and implementation approach"],
      image: {
        src: "/logo.jpg",
        alt: "Blockchain compliance project photo",
      },
    },
    {
      date: "2024–Present",
      title: "Full-Stack Engineering Across Stacks",
      impact: "Continuously shipping practical products using React, Node.js, Spring Boot, and PostgreSQL in team environments.",
      outcomes: ["Maintained delivery momentum across projects", "Balanced feature velocity with code quality"],
      image: {
        src: "/icon.png",
        alt: "Full-stack engineering workspace photo",
      },
    },
  ],
};

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

function shouldOpenInNewTab(link?: SanityLink | null): boolean {
  return link?.linkType === "href" ? Boolean(link.openInNewTab) : false;
}

function resolveTimelineImageSrc(item: AboutTimelineItem): string {
  const source = item.image;
  if (source?.src) return source.src;

  const cmsImageUrl = source
    ? urlForImage(source)?.ignoreImageParams().width(1200).fit("max").auto("format").url()
    : undefined;

  return cmsImageUrl || "/logo.jpg";
}

const ResumeViewer = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 px-4">
      <div className="relative h-[90vh] w-full max-w-4xl overflow-hidden rounded-lg bg-gray-900 pt-16">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-white transition-colors hover:text-cyan-400"
          aria-label="Close resume viewer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <iframe src="/resume.pdf" className="h-full w-full" frameBorder="0" title="Resume">
          <p>
            Your browser does not support PDFs. <a href="/resume.pdf">Download the resume</a> instead.
          </p>
        </iframe>
      </div>
    </div>
  );
};

const About = ({ id, data }: AboutProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [showResume, setShowResume] = useState(false);
  const [hoveredTimelineIndex, setHoveredTimelineIndex] = useState<number | null>(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const [expandedTimelineImage, setExpandedTimelineImage] = useState<AboutTimelineItem | null>(null);

  const content = data ?? fallbackAboutContent;
  const timelineItems = content.timelineItems?.length ? content.timelineItems : fallbackAboutContent.timelineItems || [];
  const hoveredTimelineItem =
    hoveredTimelineIndex !== null && timelineItems[hoveredTimelineIndex]
      ? timelineItems[hoveredTimelineIndex]
      : null;

  const updatePreviewPosition = (event: ReactMouseEvent<HTMLElement>) => {
    const offset = 18;
    setPreviewPosition({
      x: event.clientX + offset,
      y: event.clientY + offset,
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowResume(false);
        setExpandedTimelineImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {showResume && <ResumeViewer onClose={() => setShowResume(false)} />}
      {expandedTimelineImage && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded timeline image"
          onClick={() => setExpandedTimelineImage(null)}
        >
          <div
            className="relative h-[88vh] w-full max-w-6xl overflow-hidden rounded-xl border border-gray-700 bg-black"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={resolveTimelineImageSrc(expandedTimelineImage)}
              alt={expandedTimelineImage.image?.alt || expandedTimelineImage.title || "Timeline image"}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
          <button
            type="button"
            onClick={() => setExpandedTimelineImage(null)}
            className="absolute right-5 top-5 rounded-md border border-gray-500 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
            aria-label="Close expanded image"
          >
            Close
          </button>
        </div>
      )}

      <motion.section
        id={id}
        ref={ref}
        className="relative flex min-h-[70vh] items-center overflow-hidden py-20 sm:min-h-[90vh] sm:py-28"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {hoveredTimelineItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="pointer-events-none fixed z-[60] hidden w-72 overflow-hidden rounded-lg border border-cyan-400/40 bg-gray-900/95 shadow-2xl lg:block"
            style={{ left: previewPosition.x, top: previewPosition.y }}
            aria-hidden="true"
          >
            <div className="relative aspect-[16/10] w-full bg-gray-800/70">
              <Image
                src={resolveTimelineImageSrc(hoveredTimelineItem)}
                alt={hoveredTimelineItem.image?.alt || hoveredTimelineItem.title || "Timeline preview"}
                fill
                className="object-cover"
                sizes="288px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
            </div>
            <div className="p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-cyan-300">{hoveredTimelineItem.date}</p>
              <p className="mt-1 line-clamp-2 text-sm font-semibold text-white">{hoveredTimelineItem.title}</p>
              <p className="mt-1 text-xs text-gray-300">
                {resolveLinkHref(hoveredTimelineItem.link || null) ? "Click to open link" : "Preview only"}
              </p>
            </div>
          </motion.div>
        )}

        <div className="container relative z-10 mx-auto px-4">
          <motion.div className="mx-auto max-w-6xl" variants={containerVariants}>
            <motion.div variants={itemVariants} className="mb-6 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">{content.eyebrow || fallbackAboutContent.eyebrow}</p>
            </motion.div>

            <div className="mt-2 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
              <div>
                <motion.h1 variants={itemVariants} className="max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                  {content.heading || fallbackAboutContent.heading}
                </motion.h1>

                <motion.p variants={itemVariants} className="mt-6 max-w-3xl text-lg leading-8 text-gray-300 sm:text-xl">
                  {content.description || fallbackAboutContent.description}
                </motion.p>

                <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-4">
                  {(() => {
                    const primaryHref = resolveLinkHref(content.primaryAction?.link || fallbackAboutContent.primaryAction?.link || null);
                    const primaryNewTab = shouldOpenInNewTab(content.primaryAction?.link || fallbackAboutContent.primaryAction?.link || null);

                    return primaryHref ? (
                      <a
                        className="rounded-md bg-cyan-500 px-6 py-3 font-semibold text-gray-900 shadow-lg transition-colors duration-300 hover:bg-cyan-400"
                        href={primaryHref}
                        target={primaryNewTab ? "_blank" : undefined}
                        rel={primaryNewTab ? "noreferrer noopener" : undefined}
                      >
                        {content.primaryAction?.label || fallbackAboutContent.primaryAction?.label}
                      </a>
                    ) : null;
                  })()}

                  {(() => {
                    const secondaryHref = resolveLinkHref(content.secondaryAction?.link || fallbackAboutContent.secondaryAction?.link || null);
                    const secondaryNewTab = shouldOpenInNewTab(content.secondaryAction?.link || fallbackAboutContent.secondaryAction?.link || null);

                    return secondaryHref ? (
                      <a
                        className="rounded-md border border-cyan-400/50 bg-cyan-400/10 px-6 py-3 font-semibold text-cyan-300 transition-colors duration-300 hover:bg-cyan-400/20"
                        href={secondaryHref}
                        target={secondaryNewTab ? "_blank" : undefined}
                        rel={secondaryNewTab ? "noreferrer noopener" : undefined}
                      >
                        {content.secondaryAction?.label || fallbackAboutContent.secondaryAction?.label}
                      </a>
                    ) : null;
                  })()}
                </motion.div>

                <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-5">
                  {(content.socialLinks?.length ? content.socialLinks : fallbackAboutContent.socialLinks || []).map((link) => {
                    const href = resolveLinkHref(link.link || null);
                    const openNewTab = shouldOpenInNewTab(link.link || null);

                    if (!href) return null;

                    return (
                      <a
                        key={link.label}
                        className="text-sm font-medium text-gray-300 underline decoration-cyan-400/60 underline-offset-4 transition-colors hover:text-cyan-300"
                        href={href}
                        target={openNewTab ? "_blank" : undefined}
                        rel={openNewTab ? "noreferrer noopener" : undefined}
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </motion.div>
              </div>

              <motion.aside variants={itemVariants} className="h-full rounded-xl p-4 lg:p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-cyan-300">
                  {content.timelineTitle || fallbackAboutContent.timelineTitle}
                </p>

                <div className="grid gap-4 lg:items-start">
                  <div className="timeline-scrollbar-hide h-[560px] overflow-y-auto pr-1 scroll-smooth lg:h-[720px]" aria-label="Vertical scrollable impact timeline">
                    <div className="relative pl-6">
                      <div className="absolute left-2 top-0 h-full w-px bg-cyan-300/30" aria-hidden="true" />
                      <div className="space-y-4 snap-y snap-mandatory">
                        {timelineItems.map((item, index) => {
                          const href = resolveLinkHref(item.link || null);
                          const openNewTab = shouldOpenInNewTab(item.link || null);

                          const card = (
                            <>
                              <span className="absolute -left-[22px] top-5 h-3 w-3 rounded-full border-2 border-cyan-300 bg-[#0a192f] shadow-[0_0_0_6px_rgba(34,211,238,0.08)]" aria-hidden="true" />
                              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">{item.date}</p>
                              <h3 className="mt-1 text-base font-bold text-white">{item.title}</h3>
                              <p className="mt-2 text-sm leading-6 text-gray-300">{item.impact}</p>
                              <ul className="mt-3 space-y-1.5 text-sm text-gray-300">
                                {item.outcomes?.map((outcome) => (
                                  <li key={outcome} className="flex items-start gap-2">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" aria-hidden="true" />
                                    <span>{outcome}</span>
                                  </li>
                                ))}
                              </ul>
                            </>
                          );

                          const sharedProps = {
                            variants: timelineItemVariants,
                            initial: "hidden" as const,
                            whileInView: "visible" as const,
                            viewport: { once: false, amount: 0.35 },
                            className:
                              "relative block snap-start rounded-lg border border-gray-700 bg-gray-800/70 p-4 no-underline outline-none transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:border-cyan-400/60 focus:border-cyan-400/60 cursor-pointer",
                            onHoverStart: () => setHoveredTimelineIndex(index),
                            onHoverEnd: () => setHoveredTimelineIndex((current) => (current === index ? null : current)),
                            onFocus: () => setHoveredTimelineIndex(index),
                            onBlur: () => setHoveredTimelineIndex((current) => (current === index ? null : current)),
                            onMouseMove: updatePreviewPosition,
                          } as const;

                          if (href) {
                            return (
                              <motion.a
                                key={`${item.date}-${item.title}`}
                                href={href}
                                target={openNewTab ? "_blank" : undefined}
                                rel={openNewTab ? "noreferrer noopener" : undefined}
                                aria-label={`${item.title} (${item.date})`}
                                {...sharedProps}
                              >
                                {card}
                              </motion.a>
                            );
                          }

                          return (
                            <motion.article
                              key={`${item.date}-${item.title}`}
                              onClick={() => setExpandedTimelineImage(item)}
                              {...sharedProps}
                            >
                              {card}
                            </motion.article>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.aside>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <style>{`
        .timeline-scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .timeline-scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default About;
