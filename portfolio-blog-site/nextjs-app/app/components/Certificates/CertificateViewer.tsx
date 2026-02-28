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

const SCATTER: [number, number, number, number][] = [
  [-200, -160,  -18, 0.88],
  [ 210, -140,   14, 0.85],
  [-180,  150,   12, 0.82],
  [ 190,  160,  -16, 0.80],
  [   0, -200,   -6, 0.86],
  [   0,  200,    8, 0.83],
  [-240,    0,  -20, 0.79],
  [ 240,    0,   18, 0.81],
];

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

  const rotation = Math.min(Math.max(dragDelta / 20, -8), 8);
  const opacity  = Math.max(1 - Math.abs(dragDelta) / 400, 0.5);

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
        style={{ animation: "fadeIn .2s ease" }}
        onClick={onClose}
      >
        <div
          className="relative flex flex-col md:flex-row w-full max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          style={{ animation: "scaleIn .25s cubic-bezier(.34,1.56,.64,1)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="relative flex-1 bg-zinc-950 flex items-center justify-center min-w-0 overflow-hidden select-none"
            style={{ cursor: swiping ? "grabbing" : "grab" }}
            onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
          >
            <img
              src={imgSrc(cert)}
              alt={cert.title ?? "Certificate"}
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
                <button onMouseDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); onPrev(); }}
                  aria-label="Previous"
                  style={{ opacity: Math.max(1 - Math.abs(dragDelta) / 120, 0) }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white text-2xl flex items-center justify-center transition-colors backdrop-blur-sm"
                >‹</button>
                <button onMouseDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); onNext(); }}
                  aria-label="Next"
                  style={{ opacity: Math.max(1 - Math.abs(dragDelta) / 120, 0) }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white text-2xl flex items-center justify-center transition-colors backdrop-blur-sm"
                >›</button>
              </>
            )}
            {data.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 opacity-40 pointer-events-none">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                <span className="text-white text-[10px] tracking-widest uppercase">swipe</span>
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </div>
            )}
          </div>

          <aside className="w-full md:w-72 shrink-0 bg-zinc-900 border-t md:border-t-0 md:border-l border-white/8 flex flex-col p-7 overflow-y-auto">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-zinc-500 mb-4">Certificate</span>
            {cert.title    && <h2 className="text-white font-semibold text-xl leading-snug mb-1">{cert.title}</h2>}
            {cert.issuer   && <p className="text-sky-400 text-sm font-medium mb-1">{cert.issuer}</p>}
            {cert.date     && <p className="text-zinc-500 text-xs mb-5">Issued {cert.date}</p>}
            <div className="h-px bg-white/8 mb-5" />
            {cert.description && <p className="text-zinc-400 text-sm leading-relaxed flex-1 whitespace-pre-wrap">{cert.description}</p>}
            {data.length > 1 && (
              <div className="mt-auto pt-6 flex items-center gap-2 flex-wrap">
                {data.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const diff = i - index;
                      if (diff > 0) for (let x = 0; x < diff; x++) onNext();
                      else for (let x = 0; x < -diff; x++) onPrev();
                    }}
                    className={`rounded-full transition-all duration-300 ${i === index ? "w-5 h-1.5 bg-sky-500" : "w-1.5 h-1.5 bg-zinc-600 hover:bg-zinc-400"}`}
                  />
                ))}
                <span className="ml-auto text-zinc-600 text-xs tabular-nums">{index + 1}/{data.length}</span>
              </div>
            )}
          </aside>
        </div>

        <button onClick={onClose} aria-label="Close"
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

export function CertificateViewer({ data }: { data: any[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visible,     setVisible]     = useState(false);
  const [exploded,    setExploded]    = useState(false);
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

  const stackCount = Math.min(data.length, 4);

  const stackStyle = (i: number): React.CSSProperties => {
    const offsets   = [0, 8, 14, 18];
    const scales    = [1, 0.95, 0.91, 0.87];
    const rotations = [-1.5, 3, -2.5, 2];
    const sideShift = [0, -10, 10, -6];
    return {
      position:  i === 0 ? "relative" : "absolute",
      top:       i === 0 ? 0 : `${-offsets[i]}px`,
      left:      `${sideShift[i]}px`,
      transform: `scale(${scales[i]}) rotate(${rotations[i]}deg)`,
      zIndex:    stackCount - i,
    };
  };

  const explodedStyle = (i: number): React.CSSProperties => {
    const [tx, ty, rot, sc] = SCATTER[i % SCATTER.length];
    return {
      position:  i === 0 ? "relative" : "absolute",
      top:       "150px",
      left:      "150px",
      transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${sc})`,
      zIndex:    stackCount - i,
    };
  };

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
        {/* Outer container — needs overflow visible for scatter */}
        <div
          className="relative w-fit mx-auto"
          style={{
            paddingTop: `${(stackCount - 1) * 8}px`,
            // Extra padding so scattered cards don't clip
            padding: exploded ? "160px 220px" : `${(stackCount - 1) * 8}px 0 0 0`,
            transition: "padding .5s cubic-bezier(.34,1.56,.64,1)",
          }}
          onMouseEnter={() => setExploded(true)}
          onMouseLeave={() => setExploded(false)}
        >
          {/* Cards rendered back-to-front */}
          {Array.from({ length: stackCount })
            .map((_, i) => data[stackCount - 1 - i])
            .map((cert, stackPos) => {
              const cardIndex = stackCount - 1 - stackPos; // 0 = top
              const isTop     = cardIndex === 0;
              const delay     = visible
                ? exploded
                  ? `${cardIndex * 40}ms`   // stagger explosion outward
                  : `${(stackCount - 1 - cardIndex) * 40}ms` // stagger collapse inward
                : "0ms";

              const currentStyle = exploded
                ? explodedStyle(cardIndex)
                : stackStyle(cardIndex);

              return (
                <div
                  key={cert.description ?? stackPos}
                  className="rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl cursor-pointer"
                  style={{
                    ...currentStyle,
                    transition: `transform .45s cubic-bezier(.34,1.56,.64,1) ${delay}, box-shadow .3s ease, opacity .3s ease`,
                    // Top card lifts extra on explode
                    boxShadow: exploded && isTop
                      ? "0 32px 64px rgba(0,0,0,0.7)"
                      : "0 8px 32px rgba(0,0,0,0.4)",
                  }}
                  onClick={() => setActiveIndex(cardIndex)}
                  title={cert.title ?? "Open certificate"}
                >
                  <img
                    src={imgSrc(cert)}
                    alt={cert.title ?? "Certificate"}
                    className="block w-[380px] max-w-[70vw] aspect-[4/3] object-cover"
                    style={{
                      filter: exploded
                        ? "brightness(0.9)"
                        : cardIndex > 0 ? "brightness(0.55)" : undefined,
                      transition: "filter .35s ease",
                    }}
                  />

                  {/* Per-card label that fades in on explosion */}
                  <div
                    className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent"
                    style={{
                      opacity:    exploded ? 1 : 0,
                      transition: `opacity .3s ease ${delay}`,
                    }}
                  >
                    {cert.title && (
                      <p className="text-white text-xs font-semibold truncate">{cert.title}</p>
                    )}
                    {cert.issuer && (
                      <p className="text-sky-400 text-[10px] truncate">{cert.issuer}</p>
                    )}
                  </div>
                </div>
              );
            })}

          {/* Count badge — hides on explode */}
          {data.length > 1 && (
            <div
              className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-sky-500 text-white text-xs font-bold flex items-center justify-center shadow-lg z-20 ring-2 ring-zinc-950"
              style={{
                opacity:    exploded ? 0 : 1,
                transition: "opacity .2s ease",
                // reposition relative to the un-padded corner
                top:    exploded ? "157px" : undefined,
                right:  exploded ? "217px" : undefined,
              }}
            >
              {data.length}
            </div>
          )}

          {/* "Click a card" hint on explode */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
            style={{
              opacity:    exploded ? 1 : 0,
              transition: "opacity .3s ease .2s",
            }}
          >
            <div className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold tracking-widest uppercase px-4 py-2 rounded-full border border-white/15">
              Click to open
            </div>
          </div>
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