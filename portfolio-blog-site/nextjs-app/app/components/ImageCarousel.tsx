"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils"; // adjust import to match your project

type CarouselImage = {
  _key?: string;
  alt?: string;
  asset?: {
    _ref: string;
    _type: string;
  };
};

type Props = {
  images: CarouselImage[];
  youtubeUrl?: string | null;
};

/** Converts any YouTube URL variant into an embed URL, or returns null. */
function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    let videoId: string | null = null;

    if (u.hostname === "youtu.be") {
      videoId = u.pathname.slice(1);
    } else if (u.hostname.includes("youtube.com")) {
      videoId = u.searchParams.get("v");
    }

    return videoId
      ? `https://www.youtube.com/embed/${videoId}?rel=0`
      : null;
  } catch {
    return null;
  }
}

const AUTOPLAY_DELAY = 5000;
const VIDEO_KEY = "__video__";

export default function ImageCarousel({ images, youtubeUrl }: Props) {
  const embedUrl = youtubeUrl ? toEmbedUrl(youtubeUrl) : null;

  const total = images.length + (embedUrl ? 1 : 0);
  const videoIndex = embedUrl ? total - 1 : -1;

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  // progress bar: 0–100
  const [progress, setProgress] = useState(0);

  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoplayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback(
    (next: number, dir: "left" | "right") => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setProgress(0);
      setTimeout(() => {
        setCurrent(next);
        setAnimating(false);
        setDirection(null);
      }, 350);
    },
    [animating]
  );

  const prev = useCallback(() => {
    setPaused(false);
    go((current - 1 + total) % total, "left");
  }, [current, total, go]);

  const next = useCallback(() => {
    setPaused(false);
    go((current + 1) % total, "right");
  }, [current, total, go]);

  const isVideoSlide = current === videoIndex;

  // Autoplay + progress bar — paused on video slide or when user hovers
  useEffect(() => {
    if (total <= 1 || paused || isVideoSlide) {
      setProgress(0);
      if (progressRef.current) clearInterval(progressRef.current);
      if (autoplayRef.current) clearTimeout(autoplayRef.current);
      return;
    }

    setProgress(0);

    // Tick progress every 50ms → 100 ticks over 5000ms
    const tickMs = 50;
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + (tickMs / AUTOPLAY_DELAY) * 100, 100));
    }, tickMs);

    // Advance slide after delay
    autoplayRef.current = setTimeout(() => {
      go((current + 1) % total, "right");
    }, AUTOPLAY_DELAY);

    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
      if (autoplayRef.current) clearTimeout(autoplayRef.current);
    };
  }, [current, paused, isVideoSlide, total, go]);

  if (total === 0) return null;

  const imageUrl = !isVideoSlide ? urlForImage(images[current])?.url() : null;

  return (
    <div
      className="relative w-full max-w-4xl mx-auto my-10 group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Main slide container */}
      <div className="relative overflow-hidden rounded-xl aspect-video bg-gray-900 shadow-2xl shadow-cyan-900/20 border border-gray-700/50">

        {/* Image slide */}
        {!isVideoSlide && imageUrl && (
          <div
            key={current}
            className={`absolute inset-0 ${
              animating
                ? direction === "right"
                  ? "animate-slide-out-left"
                  : "animate-slide-out-right"
                : "animate-slide-in"
            }`}
          >
            <Image
              src={imageUrl}
              alt={images[current]?.alt || `Image ${current + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {/* Video slide */}
        {isVideoSlide && embedUrl && (
          <div
            key={current}
            className={`absolute inset-0 ${
              animating
                ? direction === "right"
                  ? "animate-slide-out-left"
                  : "animate-slide-out-right"
                : "animate-slide-in"
            }`}
          >
            <iframe
              src={embedUrl}
              title="Project video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        )}

        {/* Nav arrows */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 border border-gray-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-cyan-900/70 hover:border-cyan-500 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 border border-gray-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-cyan-900/70 hover:border-cyan-500 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Counter badge */}
        {total > 1 && (
          <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-black/60 border border-gray-600 text-xs text-gray-300 font-mono tracking-wider">
            {current + 1} / {total}
          </div>
        )}

        {/* Progress bar — hidden on video slide */}
        {total > 1 && !isVideoSlide && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10">
            <div
              className="h-full bg-cyan-400 transition-none"
              style={{ width: `${paused ? progress : progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Dot indicators */}
      {total > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setPaused(false); go(i, i > current ? "right" : "left"); }}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "w-6 h-2 bg-cyan-400"
                  : "w-2 h-2 bg-gray-600 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}

      {/* Thumbnail strip */}
      {total > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-700">
          {images.map((img, i) => {
            const thumbUrl = urlForImage(img)?.width(120).height(80).url();
            return (
              <button
                key={img._key ?? i}
                onClick={() => { setPaused(false); go(i, i > current ? "right" : "left"); }}
                className={`relative flex-shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                  i === current
                    ? "border-cyan-400 opacity-100 scale-105"
                    : "border-gray-700 opacity-50 hover:opacity-80 hover:border-gray-500"
                }`}
              >
                {thumbUrl && (
                  <Image
                    src={thumbUrl}
                    alt={img.alt || `Thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                )}
              </button>
            );
          })}

          {/* Video thumbnail */}
          {embedUrl && (
            <button
              key={VIDEO_KEY}
              onClick={() => { setPaused(false); go(videoIndex, videoIndex > current ? "right" : "left"); }}
              className={`relative flex-shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 transition-all duration-200 bg-gray-900 flex items-center justify-center ${
                current === videoIndex
                  ? "border-cyan-400 opacity-100 scale-105"
                  : "border-gray-700 opacity-50 hover:opacity-80 hover:border-gray-500"
              }`}
            >
              <svg className="w-8 h-8" viewBox="0 0 68 48" fill="none">
                <rect width="68" height="48" rx="8" fill="#FF0000" fillOpacity="0.9" />
                <path d="M27 16l20 8-20 8V16z" fill="white" />
              </svg>
              <span className="absolute bottom-1 left-0 right-0 text-center text-[9px] text-gray-300 font-medium tracking-wide">
                VIDEO
              </span>
            </button>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes slideInRight {
          from { transform: translateX(40px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes slideOutLeft {
          from { transform: translateX(0);    opacity: 1; }
          to   { transform: translateX(-40px); opacity: 0; }
        }
        .animate-slide-in        { animation: slideInRight  0.35s ease forwards; }
        .animate-slide-out-left  { animation: slideOutLeft  0.35s ease forwards; }
        .animate-slide-out-right { animation: slideOutLeft  0.35s ease reverse forwards; }
      `}</style>
    </div>
  );
}