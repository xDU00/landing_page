import { useState, useEffect } from "react";
import logo from "../assets/logo.png";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Categories", href: "#categories" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-[#00ff41]/20 shadow-[0_0_30px_rgba(0,255,65,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNav(e, "#hero")}
          className="flex items-center gap-3 group"
        >
          <img
            src={logo}
            alt="logo"
            className="w-20 h-15 object-contain transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_6px_#00ff41]"
            />
          <div className="flex flex-col leading-none">
            <span className="text-white font-black text-base tracking-widest uppercase">
              SECURINETS ISGT
            </span>
            <span className="text-[#00ff41] text-xs tracking-[0.3em] uppercase font-mono">
              CTF
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="relative text-gray-400 hover:text-[#00ff41] font-mono text-sm uppercase tracking-widest transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#00ff41] group-hover:w-full transition-all duration-300 shadow-[0_0_6px_#00ff41]" />
              </a>
            </li>
          ))}
          <li>
            <a
              href="#categories"
              onClick={(e) => handleNav(e, "#categories")}
              className="px-5 py-2 border border-[#00ff41] text-[#00ff41] font-mono text-sm uppercase tracking-widest hover:bg-[#00ff41] hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,65,0.5)]"
            >
              Join Now
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 group"
        >
          <span className={`w-6 h-0.5 bg-[#00ff41] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-[#00ff41] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-[#00ff41] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-400 overflow-hidden ${
          menuOpen ? "max-h-64 border-t border-[#00ff41]/20" : "max-h-0"
        } bg-black/95 backdrop-blur-md`}
      >
        <ul className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="text-gray-400 hover:text-[#00ff41] font-mono text-sm uppercase tracking-widest transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#categories"
              onClick={(e) => handleNav(e, "#categories")}
              className="inline-block px-5 py-2 border border-[#00ff41] text-[#00ff41] font-mono text-sm uppercase tracking-widest hover:bg-[#00ff41] hover:text-black transition-all duration-300"
            >
              Join Now
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}