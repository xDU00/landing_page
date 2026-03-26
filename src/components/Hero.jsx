import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";

function useRevealText(text, speed = 60) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    setDisplay("");
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplay(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, 400);
    return () => clearTimeout(timeout);
  }, [text]);

  return display;
}

function FloatingQMark({ style }) {
  return (
    <span
      className="absolute font-black text-[#00ff41] select-none pointer-events-none animate-pulse"
      style={{ opacity: 0.06, ...style }}
    >
      ?
    </span>
  );
}

const qmarks = [
  { fontSize: "12rem", top: "5%", left: "2%", animationDelay: "0s" },
  { fontSize: "6rem", top: "20%", right: "5%", animationDelay: "0.8s" },
  { fontSize: "18rem", bottom: "-4%", right: "-2%", animationDelay: "0.3s" },
  { fontSize: "4rem", top: "60%", left: "8%", animationDelay: "1.2s" },
  { fontSize: "9rem", top: "10%", left: "40%", animationDelay: "0.5s" },
  { fontSize: "3rem", bottom: "20%", left: "25%", animationDelay: "1.8s" },
  { fontSize: "7rem", bottom: "10%", right: "20%", animationDelay: "0.9s" },
];

const SUBTITLE = "Can you solve what I've devised?";

export default function Hero() {
  const title1 = useRevealText("Securinets ISGT");
  const title2 = useRevealText("CTF");
  const canvasRef = useRef(null);

  // Animated grid/rain canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const cols = Math.floor(w / 28);
    const drops = Array(cols).fill(0);
    const chars = "?01ABCDEF#@!<>";

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#00ff4112";
      ctx.font = "14px monospace";
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * 28, y * 18);
        if (y * 18 > h && Math.random() > 0.975) drops[i] = 0;
        else drops[i]++;
      });
    };

    const id = setInterval(draw, 55);
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => { clearInterval(id); window.removeEventListener("resize", onResize); };
  }, []);

  const handleScroll = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Matrix rain canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.7 }}
      />
      {/* Background logo */}
<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
  <img
    src={logo}
    alt="logo"
    className="w-125 md:w-175 opacity-[0.5] blur-[2px] mix-blend-screen"
  />
</div>

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: "70vw",
            height: "70vw",
            background: "radial-gradient(circle, rgba(0,255,65,0.07) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Floating question marks */}
      {qmarks.map((style, i) => (
        <FloatingQMark key={i} style={style} />
      ))}

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.015) 2px, rgba(0,255,65,0.015) 4px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-6">
        {/* Eyebrow */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-px bg-[#00ff41] shadow-[0_0_8px_#00ff41]" />
          <span className="font-mono text-[#00ff41] text-xs tracking-[0.4em] uppercase">
            Securinets.ISGT · 2026
          </span>
          <div className="w-12 h-px bg-[#00ff41] shadow-[0_0_8px_#00ff41]" />
        </div>

        {/* Main title */}
        <div className="flex flex-col items-center leading-none gap-1">
  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white">
    {title1}
  </h1>

  <h1
    className="font-black uppercase select-none"
    style={{
      fontSize: "clamp(1.5rem, 4vw, 3rem)",
      letterSpacing: "0.12em",
      color: "#00ff41",
      textShadow: "0 0 10px rgba(0,255,65,0.3)",
      fontFamily: "'Impact', 'Arial Black', sans-serif",
    }}
  >
    {title2}
  </h1>
</div>

        {/* Subtitle */}
        <p
          className="font-mono text-gray-400 max-w-lg"
          style={{ fontSize: "clamp(0.8rem, 2vw, 1rem)", letterSpacing: "0.06em" }}
        >
          {SUBTITLE}
        </p>

        {/* Divider with ? */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-px" style={{ background: "linear-gradient(to right, transparent, #00ff41)" }} />
          <span className="text-[#00ff41] text-2xl font-black" style={{ textShadow: "0 0 12px #00ff41" }}>?</span>
          <div className="w-20 h-px" style={{ background: "linear-gradient(to left, transparent, #00ff41)" }} />
        </div>

        {/* Stats */}
        <div className="flex gap-10 md:gap-16">
          {[
            { val: "8+", label: "Categories" },
            { val: "20+", label: "Challenges" },
            { val: "∞", label: "Riddles" },
          ].map(({ val, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span
                className="font-black text-white"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                  fontFamily: "'Impact', sans-serif",
                  textShadow: "0 0 20px rgba(0,255,65,0.4)",
                }}
              >
                {val}
              </span>
              <span className="font-mono text-[#00ff41] text-xs tracking-widest uppercase opacity-80">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <button
            onClick={() => handleScroll("#about")}
            className="px-8 py-3.5 bg-[#00ff41] text-black font-black font-mono text-sm uppercase tracking-widest hover:bg-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] active:scale-95"
            style={{ fontFamily: "'Impact', sans-serif", letterSpacing: "0.2em" }}
          >
            Decode Now
          </button>
          <button
            onClick={() => handleScroll("#categories")}
            className="px-8 py-3.5 border border-[#00ff41]/50 text-[#00ff41] font-mono text-sm uppercase tracking-widest hover:border-[#00ff41] hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-all duration-300 active:scale-95"
          >
            View Challenges
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-1 mt-4 opacity-50">
          <span className="font-mono text-[#00ff41] text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#00ff41] to-transparent animate-pulse" />
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff41]/40 to-transparent" />
    </section>
  );
}