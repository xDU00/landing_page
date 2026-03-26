import { useEffect, useRef, useState } from "react";

const RIDDLES = [
  "I have cities, but no houses live there. I have mountains, but no trees grow. I have water, but no fish swim. I have roads, but no cars drive. What am I?",
  "The more you take, the more you leave behind. What am I?",
  "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
];

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

const facts = [
  { icon: "🗂️", title: "8+ Categories", desc: "From Web to Crypto, test your skills across all domains." },
  { icon: "🧩", title: "20+ Challenges", desc: "Riddles disguised as flags. Each one harder than the last." },
  { icon: "🌍", title: "Open to All", desc: "Teams of up to 4. Beginners welcome. Legends expected." },
  { icon: "🏆", title: "Big Prizes", desc: "Cash, swag, and eternal bragging rights await the sharpest minds." },
];

export default function About() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);
  const [riddleIdx, setRiddleIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setRevealed(false);
      setTimeout(() => setRiddleIdx((i) => (i + 1) % RIDDLES.length), 500);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center bg-black overflow-hidden py-32 px-6"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#00ff41 1px, transparent 1px), linear-gradient(90deg, #00ff41 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Left accent bar */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-64 bg-gradient-to-b from-transparent via-[#00ff41] to-transparent" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section header */}
        <div
          className={`flex items-center gap-4 mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="font-mono text-[#00ff41] text-xs tracking-[0.4em] uppercase">01 /</span>
          <h2
            className="text-white font-black uppercase"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            About the{" "}
            <span
              style={{
                color: "#00ff41",
                textShadow: "0 0 30px rgba(0,255,65,0.5)",
              }}
            >
              CTF
            </span>
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#00ff41]/40 to-transparent ml-4" />
        </div>

        {/* Main grid layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — story text */}
          <div
            className={`flex flex-col gap-8 transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="border-l-2 border-[#00ff41] pl-6 flex flex-col gap-5">
              <p className="text-gray-300 leading-relaxed" style={{ fontSize: "1.05rem" }}>
                Gotham's most dangerous intellect has escaped — and he's left his riddles scattered
                across the city's digital infrastructure. Welcome to{" "}
                <span className="text-[#00ff41] font-mono font-bold">Securinets ISGT CTF</span>, a
                Capture-The-Flag competition inspired by the twisted genius of Edward Nygma.
              </p>
              <p className="text-gray-400 leading-relaxed">
                This isn't just a hacking competition. It's a psychological battle. Every challenge
                is a clue. Every flag is an answer to a riddle only the sharpest minds can decode.
                Are you clever enough to outsmart the Riddler?
              </p>
              <p className="text-gray-400 leading-relaxed">
                Compete across Web Exploitation, Forensics, Cryptography, Reverse Engineering, OSINT,
                and more — all wrapped in the dark, noir atmosphere of Gotham City.
              </p>
            </div>

            {/* Riddle card */}
            <div className="relative border border-[#00ff41]/30 p-6 bg-[#00ff41]/[0.03] hover:bg-[#00ff41]/[0.06] transition-all duration-500 group">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[#00ff41] to-transparent" />
              <div className="flex items-start gap-3 mb-4">
                <span
                  className="text-[#00ff41] text-3xl font-black leading-none"
                  style={{ textShadow: "0 0 12px #00ff41" }}
                >
                  ?
                </span>
                <span className="font-mono text-[#00ff41] text-xs tracking-widest uppercase pt-2">
                  Riddler's Challenge
                </span>
              </div>
              <p
                className={`font-mono text-gray-300 text-sm leading-relaxed italic transition-all duration-500 ${
                  revealed ? "opacity-100" : "opacity-100"
                }`}
              >
                "{RIDDLES[riddleIdx]}"
              </p>
              <button
                onClick={() => setRevealed(!revealed)}
                className="mt-4 font-mono text-[#00ff41] text-xs tracking-widest uppercase hover:underline opacity-60 hover:opacity-100 transition-opacity"
              >
                {revealed ? "Hide answer →" : "Can you answer? →"}
              </button>
              {revealed && (
                <p className="mt-2 font-mono text-[#00ff41]/70 text-xs italic">
                  {riddleIdx === 0 && "→ A map."}
                  {riddleIdx === 1 && "→ Footsteps."}
                  {riddleIdx === 2 && "→ An echo."}
                </p>
              )}
              <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-[#00ff41]/30 to-transparent" />
            </div>
          </div>

          {/* Right — fact cards */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            {facts.map((f, i) => (
              <div
                key={f.title}
                className="group relative border border-white/10 p-6 bg-white/[0.02] hover:border-[#00ff41]/50 hover:bg-[#00ff41]/[0.04] transition-all duration-400 cursor-default"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="absolute top-0 left-0 w-0 h-px bg-[#00ff41] group-hover:w-full transition-all duration-500" />
                <span className="text-3xl mb-3 block">{f.icon}</span>
                <h3
                  className="text-white font-black uppercase mb-2"
                  style={{ fontFamily: "'Impact', sans-serif", letterSpacing: "0.05em" }}
                >
                  {f.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                  {f.desc}
                </p>
                <div className="absolute bottom-0 right-0 w-0 h-px bg-[#00ff41] group-hover:w-full transition-all duration-500" />
              </div>
            ))}

            {/* Timeline badge */}
            <div className="sm:col-span-2 border border-[#00ff41]/20 p-5 bg-[#00ff41]/[0.03] flex items-center justify-between gap-4 flex-wrap">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[#00ff41] text-xs tracking-widest uppercase">
                  Event Date
                </span>
                <span
                  className="text-white font-black uppercase text-xl"
                  style={{ fontFamily: "'Impact', sans-serif" }}
                >
                  04.04.2026
                </span>
              </div>
              <div className="h-10 w-px bg-[#00ff41]/20 hidden sm:block" />
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[#00ff41] text-xs tracking-widest uppercase">
                  Format
                </span>
                <span className="text-white font-mono text-sm">On-site · Jeopardy Style</span>
              </div>
              <div className="h-10 w-px bg-[#00ff41]/20 hidden sm:block" />
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[#00ff41] text-xs tracking-widest uppercase">
                  Team Size
                </span>
                <span className="text-white font-mono text-sm">4 members</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff41]/30 to-transparent" />
    </section>
  );
}