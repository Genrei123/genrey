"use client";

import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import { useEffect, useMemo, useState } from "react";

type TestimonyImage = {
  _type?: string;
  asset?: {
    _ref?: string;
  };
  alt?: string;
};

type TestimonyIcon = {
  _type?: string;
  asset?: {
    _ref?: string;
  };
  alt?: string;
};

export type TestimonyItem = {
  _key?: string;
  title: string;
  subtitle?: string;
  subtitleIcon?: TestimonyIcon;
  description?: string;
  images?: TestimonyImage[];
};

export type TestimoniesContent = {
  sectionTitle?: string;
  items?: TestimonyItem[];
};

type DocumentItem = {
  title: string;
  subtitle?: string;
  subtitleIcon?: {
    src: string;
    alt: string;
  };
  description?: string;
  images: Array<{
    src: string;
    alt: string;
  }>;
};

const fallbackDocuments: DocumentItem[] = [
  {
    title: "Bureau of Animal Industry",
    subtitle: "Recommendation Letter",
    description:
      "A formal recommendation letter that can be used to highlight credibility, leadership, and professional character. This slot is ready for your actual BAI document image and copy.",
    images: [
      {
        src: "/logo.jpg",
        alt: "Recommendation letter preview",
      },
      {
        src: "/icon.png",
        alt: "Recommendation letter page 2 preview",
      },
    ],
  },
  {
    title: "Certification / Testimony",
    subtitle: "Supporting Document",
    description:
      "A second document slot for future certifications, testimonies, and supporting letters. You can extend this list with more items as your portfolio grows.",
    images: [
      {
        src: "/icon.png",
        alt: "Supporting document preview",
      },
      {
        src: "/logo.jpg",
        alt: "Supporting document page 2 preview",
      },
    ],
  },
  {
    title: "Reference Material",
    subtitle: "Future Upload",
    description:
      "A placeholder for future government, school, or work-related documents. The component is structured so you can add more cards without changing the UI.",
    images: [
      {
        src: "/logo.jpg",
        alt: "Reference document preview",
      },
    ],
  },
];

export function DocumentCarousel({ data }: { data?: TestimoniesContent | null }) {
  const items = useMemo(() => {
    const mapped =
      data?.items
        ?.map<DocumentItem | null>((item) => {
          if (!item?.title) return null;

          const cmsImages =
            item.images
              ?.map((image, imageIndex) => {
                const src = urlForImage(image)
                  ?.ignoreImageParams()
                  .width(2400)
                  .fit("max")
                  .auto("format")
                  .url();
                if (!src) return null;

                return {
                  src,
                  alt: image.alt || `${item.title} image ${imageIndex + 1}`,
                };
              })
              .filter((image): image is { src: string; alt: string } => Boolean(image)) || [];

          const subtitleIconSrc = item.subtitleIcon
            ? urlForImage(item.subtitleIcon)
                ?.ignoreImageParams()
                .width(64)
                .height(64)
                .fit("max")
                .auto("format")
                .url()
            : undefined;

          return {
            title: item.title,
            subtitle: item.subtitle,
            subtitleIcon: subtitleIconSrc
              ? {
                  src: subtitleIconSrc,
                  alt: item.subtitleIcon?.alt || `${item.title} subtitle icon`,
                }
              : undefined,
            description: item.description,
            images: cmsImages.length > 0 ? cmsImages : [{ src: "/logo.jpg", alt: `${item.title} preview` }],
          };
        })
        .filter((item): item is DocumentItem => item !== null) || [];

    return mapped.length > 0 ? mapped : fallbackDocuments;
  }, [data]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const active = items[activeIndex] ?? items[0] ?? fallbackDocuments[0];
  const activeImages = active?.images?.length
    ? active.images
    : [{ src: "/logo.jpg", alt: "Document preview" }];
  const activeImage = activeImages[imageIndex] || activeImages[0];

  const goNext = () => setActiveIndex((prev) => (prev + 1) % items.length);
  const goPrev = () =>
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);

  const goNextImage = () =>
    setImageIndex((prev) => (prev + 1) % activeImages.length);

  const goPrevImage = () =>
    setImageIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length);

  useEffect(() => {
    setImageIndex(0);
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex((currentIndex) =>
      items.length === 0 ? 0 : Math.min(currentIndex, items.length - 1),
    );
  }, [items.length]);

  useEffect(() => {
    setImageIndex((currentIndex) =>
      activeImages.length === 0 ? 0 : Math.min(currentIndex, activeImages.length - 1),
    );
  }, [activeImages.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="w-full rounded-2xl">
      {isExpanded && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded document image"
          onClick={() => setIsExpanded(false)}
        >
          <div
            className="relative h-[85vh] w-full max-w-6xl overflow-hidden rounded-xl border border-gray-700 bg-transparent"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-lg border border-gray-600 bg-black/70 px-3 py-2">
              <button
                type="button"
                onClick={goPrevImage}
                className="rounded-md border border-gray-600 px-3 py-2 text-xs font-medium text-white hover:bg-gray-800"
                aria-label="Previous image"
              >
                Prev Image
              </button>
              <p className="text-xs text-gray-300">
                Image {imageIndex + 1} / {activeImages.length}
              </p>
              <button
                type="button"
                onClick={goNextImage}
                className="rounded-md border border-gray-600 px-3 py-2 text-xs font-medium text-white hover:bg-gray-800"
                aria-label="Next image"
              >
                Next Image
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="absolute right-5 top-5 rounded-md border border-gray-500 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
            aria-label="Close expanded image"
          >
            Close
          </button>
        </div>
      )}

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-stretch">
        <div className="relative rounded-xl border border-gray-700 p-5 sm:p-6">
          {active.subtitleIcon && (
            <div className="absolute right-4 top-4 sm:right-5 sm:top-5">
              <Image
                src={active.subtitleIcon.src}
                alt={active.subtitleIcon.alt}
                width={56}
                height={56}
                className="h-14 w-14 object-contain sm:h-16 sm:w-16"
              />
            </div>
          )}
          <p className="text-sm text-gray-400">
            {activeIndex + 1} / {items.length}
          </p>
          <h4 className="mt-2 text-2xl font-bold text-white">{active.title}</h4>
          <div className="mt-1 text-sm font-medium text-gray-300">{active.subtitle}</div>
          <p className="mt-4 text-sm leading-7 text-gray-300 sm:text-base">
            {active.description}
          </p>
        </div>

        <div className="rounded-xl border border-gray-700 p-4 sm:p-5">
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="relative block h-[24rem] w-full overflow-hidden rounded-lg border border-gray-700 bg-transparent sm:h-[30rem]"
            aria-label="Expand document image"
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 600px"
              priority={activeIndex === 0}
            />
          </button>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-gray-400">
              Image {imageIndex + 1} / {activeImages.length}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={goPrevImage}
                className="rounded-md border border-gray-600 px-3 py-2 text-xs font-medium text-white hover:bg-gray-800"
                aria-label="Previous image"
              >
                Prev Image
              </button>
              <button
                type="button"
                onClick={goNextImage}
                className="rounded-md border border-gray-600 px-3 py-2 text-xs font-medium text-white hover:bg-gray-800"
                aria-label="Next image"
              >
                Next Image
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-3 border-t border-gray-700 pt-4">
            <button
              type="button"
              onClick={goPrev}
              className="rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              aria-label="Previous document"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={goNext}
              className="rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              aria-label="Next document"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
