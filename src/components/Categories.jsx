import { useEffect, useRef, useState } from "react";

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

const categories = [
  {
    id: "01",
    name: "Forensics",
    icon: "🔍",
    color: "#00ff41",
    glow: "rgba(0,255,65,0.25)",
    desc: "Dig through corrupted files, memory dumps, and hidden artifacts. The evidence is there — if you know where to look.",
    tags: ["Disk Images", "Memory Dumps", "Steganography", "Log Analysis"],
    difficulty: "Medium",
    challenges: 6,
    riddleHint: "I hide in plain sight, yet no one can see me. What am I?",
  },
  {
    id: "02",
    name: "Web Exploitation",
    icon: "🕸️",
    color: "#ff6b35",
    glow: "rgba(255,107,53,0.25)",
    desc: "Gotham's web is full of vulnerabilities. Inject, bypass, and escalate your way through broken applications.",
    tags: ["SQL Injection", "XSS", "SSRF", "Auth Bypass"],
    difficulty: "Medium",
    challenges: 7,
    riddleHint: "I'm the door that stands open, yet no one knows it. What am I?",
  },
  {
    id: "03",
    name: "Cryptography",
    icon: "🔐",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.25)",
    desc: "The Riddler loves ciphers. Break RSA, decode obscure algorithms, and unravel messages hidden in plain numbers.",
    tags: ["RSA", "AES", "Hash Cracking", "Classical Ciphers"],
    difficulty: "Hard",
    challenges: 5,
    riddleHint: "I lock without a key, I speak without a tongue. What am I?",
  },
  {
    id: "04",
    name: "OSINT",
    icon: "🌐",
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.25)",
    desc: "Every villain leaves a trace. Hunt across the open web, social media, and public records to find the truth.",
    tags: ["Geolocation", "Social Media", "Metadata", "People Search"],
    difficulty: "Easy",
    challenges: 4,
    riddleHint: "I am everywhere and nowhere, seen by all but noticed by none. What am I?",
  },
  {
    id: "05",
    name: "Reverse Engineering",
    icon: "⚙️",
    color: "#facc15",
    glow: "rgba(250,204,21,0.25)",
    desc: "Tear apart binaries and understand what machines think. Find the logic buried beneath layers of compiled chaos.",
    tags: ["Disassembly", "Decompilation", "Anti-Debug", "Obfuscation"],
    difficulty: "Hard",
    challenges: 5,
    riddleHint: "I was built to be used, not to be understood. What am I?",
  },
  {
    id: "06",
    name: "PWN",
    icon: "💣",
    color: "#f43f5e",
    glow: "rgba(244,63,94,0.25)",
    desc: "Exploit memory corruptions, overflow buffers, and take control of running processes. Own the system or go home.",
    tags: ["Buffer Overflow", "ROP Chains", "Heap Exploitation", "Format Strings"],
    difficulty: "Expert",
    challenges: 4,
    riddleHint: "I break what was built to hold. What am I?",
  },
  {
    id: "07",
    name: "Game PWN",
    icon: "🎮",
    color: "#34d399",
    glow: "rgba(52,211,153,0.25)",
    desc: "The Riddler hid secrets inside games. Exploit game logic, cheat engines, and find flags where no one expected them.",
    tags: ["Game Hacking", "Memory Editing", "Cheat Engine", "Logic Bugs"],
    difficulty: "Medium",
    challenges: 3,
    riddleHint: "I play by the rules until the rules become mine. What am I?",
  },
  {
    id: "08",
    name: "Misc",
    icon: "🃏",
    color: "#fb923c",
    glow: "rgba(251,146,60,0.25)",
    desc: "The wildcard. Puzzles that defy categories. If you can't place it anywhere else, it belongs here.",
    tags: ["Puzzles", "Programming", "Trivia", "Anything Goes"],
    difficulty: "Varies",
    challenges: 5,
    riddleHint: "I am the question with no category. What am I?",
  },
];

const difficultyColor = {
  Easy:   "#34d399",
  Medium: "#facc15",
  Hard:   "#f97316",
  Expert: "#f43f5e",
  Varies: "#a855f7",
};

function CategoryCard({ cat, index, inView }) {
  const [hovered, setHovered] = useState(false);
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative cursor-pointer"
      style={{
        perspective: "1000px",
        transitionDelay: `${index * 70}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setFlipped(false); }}
    >
      {/* Entrance animation wrapper */}
      <div
        className="transition-all duration-700"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(40px)",
          transitionDelay: `${index * 70}ms`,
        }}
      >
        {/* Flip container */}
        <div
          className="relative w-full"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            minHeight: "260px",
          }}
        >
          {/* ── FRONT ── */}
          <div
            className="absolute inset-0 w-full h-full border p-6 flex flex-col gap-4 transition-all duration-400"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              borderColor: hovered ? `${cat.color}60` : "rgba(255,255,255,0.07)",
              background: hovered
                ? `linear-gradient(135deg, ${cat.glow} 0%, rgba(0,0,0,0.9) 60%)`
                : "rgba(255,255,255,0.02)",
              boxShadow: hovered ? `0 0 40px ${cat.glow}, inset 0 0 40px ${cat.glow}` : "none",
            }}
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <span className="text-4xl">{cat.icon}</span>
              <span
                className="font-mono text-xs tracking-widest opacity-40"
                style={{ color: cat.color }}
              >
                {cat.id}
              </span>
            </div>

            {/* Name */}
            <h3
              className="font-black uppercase text-white text-xl leading-tight"
              style={{
                fontFamily: "'Impact', 'Arial Black', sans-serif",
                textShadow: hovered ? `0 0 20px ${cat.color}60` : "none",
                letterSpacing: "0.03em",
              }}
            >
              {cat.name}
            </h3>

            {/* Desc */}
            <p className="text-gray-500 text-sm leading-relaxed flex-1">
              {cat.desc}
            </p>

            {/* Footer row */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: difficultyColor[cat.difficulty], boxShadow: `0 0 6px ${difficultyColor[cat.difficulty]}` }}
                />
                <span
                  className="font-mono text-xs uppercase tracking-widest"
                  style={{ color: difficultyColor[cat.difficulty] }}
                >
                  
                </span>
              </div>
              <span className="font-mono text-xs text-gray-600 uppercase tracking-widest">
                {cat.challenges} challenges
              </span>
            </div>

            {/* Hover hint */}
            <p
              className="font-mono text-xs tracking-widest uppercase transition-opacity duration-300"
              style={{ color: cat.color, opacity: hovered ? 0.5 : 0 }}
            >
            </p>

            {/* Corner accent */}
            <div
              className="absolute top-0 left-0 w-0 h-px transition-all duration-500"
              style={{ background: cat.color, width: hovered ? "100%" : "0%" }}
            />
            <div
              className="absolute bottom-0 right-0 h-px transition-all duration-500"
              style={{ background: cat.color, width: hovered ? "100%" : "0%" }}
            />
          </div>

          {/* ── BACK ── */}
          <div
            className="absolute inset-0 w-full h-full border p-6 flex flex-col gap-4"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderColor: `${cat.color}60`,
              background: `linear-gradient(135deg, ${cat.glow} 0%, rgba(0,0,0,0.95) 70%)`,
              boxShadow: `0 0 40px ${cat.glow}`,
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-2xl font-black leading-none"
                style={{ color: cat.color, textShadow: `0 0 12px ${cat.color}` }}
              >
                ?
              </span>
              <span className="font-mono text-xs tracking-widest uppercase" style={{ color: cat.color }}>
                Riddler's Hint
              </span>
            </div>
            <p className="font-mono text-gray-300 text-sm italic leading-relaxed flex-1">
              "{cat.riddleHint}"
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {cat.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 font-mono text-xs uppercase tracking-wider border"
                  style={{
                    borderColor: `${cat.color}40`,
                    color: cat.color,
                    background: `${cat.color}10`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="font-mono text-xs uppercase tracking-widest opacity-30 mt-2" style={{ color: cat.color }}>
              Click to flip back
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Categories() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);

  return (
    <section
      id="categories"
      ref={sectionRef}
      className="relative py-32 bg-black overflow-hidden px-6"
    >
      {/* Background noise dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(#00ff41 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Glow blob */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
        style={{
          width: "80vw",
          height: "60vw",
          background: "radial-gradient(circle, rgba(0,255,65,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div
          className={`flex items-center gap-4 mb-6 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="font-mono text-[#00ff41] text-xs tracking-[0.4em] uppercase">03 /</span>
          <h2
            className="text-white font-black uppercase"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Challenge{" "}
            <span style={{ color: "#00ff41", textShadow: "0 0 30px rgba(0,255,65,0.5)" }}>
              Categories
            </span>
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#00ff41]/40 to-transparent ml-4" />
        </div>

        <p
          className={`font-mono text-gray-500 text-sm tracking-wider max-w-xl mb-16 transition-all duration-700 delay-100 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          8 domains of chaos. Each category holds a piece of the Riddler's master plan.{" "}
          <span className="text-[#00ff41] opacity-70">Click any card to reveal his riddle.</span>
        </p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={i} inView={inView} />
          ))}
        </div>

        {/* Total counter */}
        <div
          className={`mt-16 flex flex-wrap gap-6 items-center justify-center border-t border-white/5 pt-10 transition-all duration-700 delay-500 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          {[
            { val: "8", label: "Categories" },
            { val: "39", label: "Total Challenges" },
            { val: "4", label: "Difficulty Tiers" },
          ].map(({ val, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 px-8">
              <span
                className="font-black text-white"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontFamily: "'Impact', sans-serif",
                  textShadow: "0 0 30px rgba(0,255,65,0.3)",
                }}
              >
                {val}
              </span>
              <span className="font-mono text-[#00ff41] text-xs tracking-widest uppercase opacity-60">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff41]/30 to-transparent" />
    </section>
  );
}