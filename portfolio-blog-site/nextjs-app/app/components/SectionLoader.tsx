"use client";

export function SectionLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      {/* Spinner */}
      <div className="relative w-12 h-12">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20" />
        {/* Spinning arc */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 animate-spin" />
        {/* Inner pulse dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        </div>
      </div>
      <p className="text-sm text-gray-500 tracking-widest uppercase animate-pulse">
        Loading…
      </p>
    </div>
  );
}