"use client";

function TechPill({ title, description, imageSrc }: { title: string; description: string; imageSrc: string }) {
  return (
    <div
      className="flex items-center gap-2.5 px-5 py-3 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.09] hover:border-white/20 transition-all duration-300 cursor-default group shrink-0"
      style={{ backdropFilter: "blur(8px)" }}
      title={description}
    >
      <img
        src={imageSrc}
        alt={title}
        className="w-5 h-5 shrink-0 object-contain transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
      />
      <span
        className="text-sm font-medium whitespace-nowrap"
        style={{ color: "rgba(226,232,240,0.85)", fontFamily: "'DM Mono', 'Fira Mono', monospace" }}
      >
        {title}
      </span>
    </div>
  );
}

function Track({
  items,
  direction = "left",
  speed = 35,
}: {
  items: { title: string; description: string; imageSrc: string }[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const tripled  = [...items, ...items, ...items];
  const animName = direction === "left" ? "scroll-left" : "scroll-right";

  return (
    <div className="relative overflow-hidden w-full">
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0a0a0f, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0a0a0f, transparent)" }}
      />

      <div
        className="flex gap-3 w-max"
        style={{ animation: `${animName} ${speed}s linear infinite`, willChange: "transform" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "paused")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "running")}
      >
        {tripled.map((tech, i) => (
          <TechPill key={`${tech.title}-${i}`} {...tech} />
        ))}
      </div>
    </div>
  );
}

export function TechStackViewer({
  items,
}: {
  items: { title: string; description: string; imageSrc: string }[];
}) {
  // Split items evenly across two rows
  const mid  = Math.ceil(items.length / 2);
  const row1 = items.slice(0, mid);
  const row2 = items.slice(mid);

  return (
    <section className="bg-black bg-opacity-10 w-full py-16 overflow-hidden">
      <div className="flex flex-col gap-4">
        <Track items={row1} direction="left"  speed={40} />
        {row2.length > 0 && <Track items={row2} direction="right" speed={34} />}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap');

        @keyframes scroll-left {
          0%   { transform: translateX(0) }
          100% { transform: translateX(calc(-100% / 3)) }
        }
        @keyframes scroll-right {
          0%   { transform: translateX(calc(-100% / 3)) }
          100% { transform: translateX(0) }
        }
      `}</style>
    </section>
  );
}