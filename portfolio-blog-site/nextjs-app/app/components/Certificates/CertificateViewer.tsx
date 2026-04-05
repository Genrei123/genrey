"use client";

import { useState, useEffect, useCallback, useRef } from "react";

function imgSrc(cert: any) {
  return cert.image?.asset
    ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${cert.image.asset._ref
        .replace("image-", "")
        .replace("-jpg", ".jpg")
        .replace("-png", ".png")
        .replace("-webp", ".webp")}`
    : "/placeholder.svg";
}

function Lightbox({
  data,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  data: any[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const cert = data[index];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative grid w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl md:grid-cols-[minmax(0,1fr)_320px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative flex min-h-[300px] items-center justify-center bg-zinc-950 p-4 sm:p-6">
          <img
            src={imgSrc(cert)}
            alt={cert.title ?? "Certificate"}
            className="max-h-[75vh] w-auto max-w-full object-contain"
          />

          {data.length > 1 && (
            <>
              <button
                onClick={onPrev}
                aria-label="Previous"
                className="absolute left-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 text-xl text-white transition-colors hover:bg-black/60"
              >
                ‹
              </button>
              <button
                onClick={onNext}
                aria-label="Next"
                className="absolute right-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 text-xl text-white transition-colors hover:bg-black/60"
              >
                ›
              </button>
            </>
          )}
        </div>

        <aside className="flex max-h-[75vh] flex-col overflow-y-auto border-t border-white/10 bg-zinc-900 p-6 md:border-l md:border-t-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Certificate</p>
          {cert.title && <h2 className="mt-2 text-xl font-semibold text-white">{cert.title}</h2>}
          {cert.issuer && <p className="mt-2 text-sm font-medium text-cyan-300">{cert.issuer}</p>}
          {cert.date && <p className="mt-1 text-xs text-zinc-500">Issued {cert.date}</p>}
          {cert.description && (
            <p className="mt-5 text-sm leading-relaxed text-zinc-300 whitespace-pre-wrap">{cert.description}</p>
          )}

          <div className="mt-auto pt-6">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-500">{index + 1} of {data.length}</span>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-md border border-white/20 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function CertificateViewer({ data }: { data: any[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visible,     setVisible]     = useState(false);
  const containerRef                  = useRef<HTMLDivElement>(null);

  // Scroll-triggered entrance
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const close = useCallback(() => setActiveIndex(null), []);
  const prev  = useCallback(() => setActiveIndex((i) => (i! === 0 ? data.length - 1 : i! - 1)), [data.length]);
  const next  = useCallback(() => setActiveIndex((i) => (i! === data.length - 1 ? 0 : i! + 1)), [data.length]);

  return (
    <>
      {/* Scroll-triggered entrance */}
      <div className="w-full flex justify-center items-center">
        <div
          ref={containerRef}
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0) scale(1)" : "translateY(48px) scale(0.94)",
            transition: "opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.34,1.56,.64,1)",
          }}
        >
        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((cert, itemIndex) => (
            <button
              key={cert._id ?? cert.title ?? itemIndex}
              type="button"
              onClick={() => setActiveIndex(itemIndex)}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 text-left shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
              title={cert.title ?? "Open certificate"}
            >
              <img
                src={imgSrc(cert)}
                alt={cert.title ?? "Certificate"}
                className="block w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="border-t border-white/10 px-4 py-3">
                {cert.title && <p className="truncate text-sm font-semibold text-white">{cert.title}</p>}
                {cert.issuer && <p className="truncate text-xs text-cyan-300">{cert.issuer}</p>}
              </div>
            </button>
          ))}
        </div>
      </div>
      </div>

      {activeIndex !== null && (
        <Lightbox
          data={data}
          index={activeIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}