import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const HERO_IMAGE = "https://media.base44.com/images/public/6a4bfe1f24077d99a17e4331/9d3c72443_generated_4935caf5.png";

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const prefersReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleMouseMove = useCallback((e) => {
    if (prefersReduced) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  }, [prefersReduced]);

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-end overflow-hidden"
    >
      {/* Background Image with parallax */}
      <motion.div
        className="absolute inset-0"
        animate={prefersReduced ? {} : { x: mousePos.x, y: mousePos.y }}
        transition={{ type: "tween", duration: 0.6, ease: "easeOut" }}
      >
        <img
          src={HERO_IMAGE}
          alt="Lone diver silhouetted in a cathedral of light within a deep sea cave"
          className="w-full h-full object-cover scale-110"
        />
      </motion.div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-24 md:pb-32 pt-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <p className="text-[11px] uppercase tracking-[0.35em] text-lagoon font-body mb-6">
            The Golden Standard of Underwater Exploration
          </p>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-foreground leading-[0.9] mb-8">
            Napoleon
            <br />
            <span className="text-lagoon">Red</span><span className="text-primary">Sea</span>
            <br />
            Diver
          </h1>
          <p className="max-w-xl text-foreground/70 text-base md:text-lg font-body leading-relaxed mb-10">
            Elite dive guiding with premium, luxury service across the Red Sea's most breathtaking reefs and iconic wrecks. Discover the deep blue with unmatched elegance.
          </p>
          <a
            href="#reserve"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-[13px] uppercase tracking-[0.2em] font-body font-semibold hover:bg-primary/90 transition-colors duration-300 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            Begin Your Descent
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5">
              <path d="M8 2L8 14M8 14L3 9M8 14L13 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Horizontal rule divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
}