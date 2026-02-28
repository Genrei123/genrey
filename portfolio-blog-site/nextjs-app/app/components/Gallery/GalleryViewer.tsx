"use client";

import { useState, useEffect, useCallback, useRef } from "react";

function imgSrc(image: any): string {
  return image?.asset?._ref
    ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${image.asset._ref
        .replace("image-", "")
        .replace(/-(?=jpg|png|webp)/, ".")}`
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
  const image = data[index];

  const touchStartX = useRef<number | null>(null);
  const dragStartX  = useRef<number | null>(null);
  const [dragDelta, setDragDelta] = useState(0);
  const [swiping, setSwiping]     = useState(false);

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

  useEffect(() => { setDragDelta(0); setSwiping(false); }, [index]);

  // touch
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchMove  = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    setDragDelta(e.touches[0].clientX - touchStartX.current);
    setSwiping(true);
  };
  const onTouchEnd = () => {
    if (dragDelta < -60) onNext();
    else if (dragDelta > 60) onPrev();
    setDragDelta(0); setSwiping(false); touchStartX.current = null;
  };

  // mouse drag
  const onMouseDown = (e: React.MouseEvent) => { dragStartX.current = e.clientX; setSwiping(true); };
  const onMouseMove = (e: React.MouseEvent) => {
    if (dragStartX.current === null) return;
    setDragDelta(e.clientX - dragStartX.current);
  };
  const onMouseUp = () => {
    if (dragDelta < -60) onNext();
    else if (dragDelta > 60) onPrev();
    setDragDelta(0); setSwiping(false); dragStartX.current = null;
  };

  const rotation = Math.min(Math.max(dragDelta / 20, -6), 6);
  const opacity  = Math.max(1 - Math.abs(dragDelta) / 400, 0.5);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        style={{ animation: "fadeIn .2s ease" }}
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="relative flex flex-col md:flex-row w-full max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          style={{ animation: "scaleIn .25s cubic-bezier(.34,1.56,.64,1)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image pane */}
          <div
            className="relative flex-1 bg-zinc-950 flex items-center justify-center min-w-0 overflow-hidden select-none"
            style={{ cursor: swiping ? "grabbing" : "grab" }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            <img
              src={imgSrc(image.image)}
              alt={image.alt || "Gallery image"}
              draggable={false}
              className="max-w-full max-h-[90vh] object-contain block pointer-events-none"
              style={{
                transform: `translateX(${dragDelta}px) rotate(${rotation}deg)`,
                opacity,
                transition: swiping ? "none" : "transform .3s ease, opacity .3s ease",
              }}
            />

            {data.length > 1 && (
              <>
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => { e.stopPropagation(); onPrev(); }}
                  aria-label="Previous"
                  style={{ opacity: Math.max(1 - Math.abs(dragDelta) / 120, 0) }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white text-2xl flex items-center justify-center transition-colors backdrop-blur-sm"
                >‹</button>
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => { e.stopPropagation(); onNext(); }}
                  aria-label="Next"
                  style={{ opacity: Math.max(1 - Math.abs(dragDelta) / 120, 0) }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white text-2xl flex items-center justify-center transition-colors backdrop-blur-sm"
                >›</button>
              </>
            )}

            {/* Swipe hint */}
            {data.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 opacity-30 pointer-events-none">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                <span className="text-white text-[10px] tracking-widest uppercase">swipe</span>
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full md:w-80 shrink-0 bg-zinc-900 border-t md:border-t-0 md:border-l border-white/8 flex flex-col p-6 overflow-y-auto">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-zinc-500 mb-4">
              Gallery
            </span>

            {image.title && (
              <h2 className="text-white font-semibold text-lg leading-snug mb-1">{image.title}</h2>
            )}

            {image.description && (
              <>
                <div className="h-px bg-white/8 my-4" />
                <p className="text-zinc-400 text-sm leading-relaxed flex-1 whitespace-pre-wrap">
                  {image.description}
                </p>
              </>
            )}
          </aside>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="fixed top-4 right-5 z-50 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center text-lg transition-all duration-200 hover:scale-110 backdrop-blur-sm"
        >✕</button>
      </div>

      <style>{`
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes scaleIn { from{opacity:0;transform:scale(.93) translateY(14px)} to{opacity:1;transform:scale(1) translateY(0)} }
      `}</style>
    </>
  );
}

export function GalleryViewer({ data }: { data: any[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const prev  = useCallback(
    () => setActiveIndex((i) => (i! === 0 ? data.length - 1 : i! - 1)),
    [data.length]
  );
  const next  = useCallback(
    () => setActiveIndex((i) => (i! === data.length - 1 ? 0 : i! + 1)),
    [data.length]
  );

  return (
    <>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
        {data.map((image: any, index: number) => (
          <div
            key={image.description ?? index}
            className="card bg-base-100 shadow-sm mb-4 break-inside-avoid group relative cursor-zoom-in"
            onClick={() => setActiveIndex(index)}
          >
            <figure className="w-full rounded-sm overflow-hidden">
              <img
                src={imgSrc(image.image)}
                alt={image.alt || "Gallery image"}
                className="object-cover w-full h-auto group-hover:scale-105 transition-transform duration-300"
              />
            </figure>

            {/* Hover overlay */}
            <div className="absolute inset-0 rounded-sm bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-sm rounded-full p-2.5 border border-white/20">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
            </div>
          </div>
        ))}
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