import { useRef, useState } from "react";

// ─── REPLACE these with your actual image filenames ───────────────────────
// Put your images in: src/assets/
// Example: import sponsor1 from "../assets/sponsor1.png";
import sponsor1 from "../assets/logo_ODDO.png";
import sponsor2 from "../assets/logo_4C_ISG.png";
import sponsor3 from "../assets/isg.png";
// ──────────────────────────────────────────────────────────────────────────

const sponsors = [
  { name: "Sponsor One",   img: sponsor1, tier: "Gold"   },
  { name: "Sponsor Two",   img: sponsor2, tier: "Silver" },
  { name: "Sponsor Three", img: sponsor3, tier: "Bronze" },
];

// Duplicate list so the marquee loops seamlessly
const marqueeItems = [...sponsors, ...sponsors, ...sponsors, ...sponsors];

const tierColors = {
  Gold:   { border: "#ffd700", glow: "rgba(255,215,0,0.3)",   label: "#ffd700" },
  Silver: { border: "#c0c0c0", glow: "rgba(192,192,192,0.25)", label: "#c0c0c0" },
  Bronze: { border: "#cd7f32", glow: "rgba(205,127,50,0.25)",  label: "#cd7f32" },
};

function SponsorCard({ sponsor, paused }) {
  const colors = tierColors[sponsor.tier];
  return (
    <div
      className="relative flex-shrink-0 flex flex-col items-center justify-center gap-4 mx-6 group cursor-default"
      style={{ width: "220px" }}
    >
      {/* Card frame */}
      <div
        className="relative w-full flex flex-col items-center justify-center gap-4 p-8 border transition-all duration-500"
        style={{
          borderColor: `${colors.border}30`,
          background: "rgba(0,0,0,0.6)",
        }}
      >
        {/* Top glow line */}
        <div
          className="absolute top-0 left-0 w-0 h-px group-hover:w-full transition-all duration-500"
          style={{ background: colors.border }}
        />

        {/* Tier badge */}
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 font-mono text-xs uppercase tracking-widest border"
          style={{
            color: colors.label,
            borderColor: `${colors.border}50`,
            background: "#000",
            textShadow: `0 0 8px ${colors.label}`,
          }}
        >
          {sponsor.tier}
        </span>

        {/* Sponsor logo image */}
        <div
          className="w-24 h-24 flex items-center justify-center overflow-hidden rounded-sm transition-all duration-500"
          style={{
            filter: "grayscale(60%) brightness(0.85)",
          }}
        >
          <img
            src={sponsor.img}
            alt={sponsor.name}
            className="w-full h-full object-contain group-hover:filter-none transition-all duration-500"
            style={{ transition: "filter 0.5s" }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = "none")}
            onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(60%) brightness(0.85)")}
          />
        </div>

        {/* Sponsor name */}
        <span
          className="font-mono text-xs tracking-widest uppercase"
          style={{ color: colors.label, opacity: 0.8 }}
        >
          {sponsor.name}
        </span>

        {/* Bottom glow line */}
        <div
          className="absolute bottom-0 right-0 w-0 h-px group-hover:w-full transition-all duration-500"
          style={{ background: colors.border }}
        />
      </div>
    </div>
  );
}

export default function Sponsors() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      id="sponsors"
      className="relative py-32 bg-black overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#00ff41 1px, transparent 1px), linear-gradient(90deg, #00ff41 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff41]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 mb-16">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-[#00ff41] text-xs tracking-[0.4em] uppercase">02 /</span>
          <h2
            className="text-white font-black uppercase"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Our{" "}
            <span style={{ color: "#00ff41", textShadow: "0 0 30px rgba(0,255,65,0.5)" }}>
              Sponsors
            </span>
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#00ff41]/40 to-transparent ml-4" />
        </div>
        <p className="font-mono text-gray-500 text-sm tracking-wider max-w-xl">
          The organizations that help make Riddler CTF possible. Without them, Gotham stays dark.
        </p>
      </div>

      {/* ── Infinite scrolling marquee ── */}
      <div
        className="relative w-full overflow-hidden py-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #000 0%, transparent 100%)" }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #000 0%, transparent 100%)" }}
        />

        {/* Marquee track */}
        <div
          className="flex"
          style={{
            animation: "marquee 24s linear infinite",
            animationPlayState: paused ? "paused" : "running",
            width: "max-content",
          }}
        >
          {marqueeItems.map((sponsor, i) => (
            <SponsorCard key={i} sponsor={sponsor} paused={paused} />
          ))}
        </div>
      </div>

      {/* Become a sponsor CTA */}
      <div className="max-w-7xl mx-auto px-6 mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#00ff41]/15 p-8 bg-[#00ff41]/[0.02]">
        <div>
          <h3
            className="text-white font-black uppercase text-2xl mb-1"
            style={{ fontFamily: "'Impact', sans-serif" }}
          >
            Become a Sponsor
          </h3>
          <p className="font-mono text-gray-500 text-sm tracking-wide">
            Join the ranks of Gotham's most powerful allies. Get visibility in front of 500+ hackers.
          </p>
        </div>
        <a
          href="mailto:contact@riddlerctf.com"
          className="flex-shrink-0 px-8 py-3.5 border border-[#00ff41] text-[#00ff41] font-mono text-sm uppercase tracking-widest hover:bg-[#00ff41] hover:text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,65,0.4)]"
        >
          Contact Us →
        </a>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff41]/30 to-transparent" />

      {/* Keyframe for marquee */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}