import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { label: "Expeditions", href: "#expeditions" },
  { label: "The Vessel", href: "#vessel" },
  { label: "Heritage", href: "#heritage" },
  { label: "Voices", href: "#voices" },
  { label: "Reserve", href: "#expeditions" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-primary/10"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          <a href="#hero" className="flex items-center gap-3">
            <img
              src="https://media.base44.com/images/public/6a4bfe1f24077d99a17e4331/16e408804_WhatsAppImage2026-07-06at93924PM-Picsart-BackgroundRemover.jpeg"
              alt="Napoleon RedSea Diver logo"
              className="w-12 h-12 object-contain rounded-full"
            />
            <span className="font-display text-xl font-semibold text-primary tracking-wide">
              NAPOLEON
            </span>
          </a>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-10">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[13px] uppercase tracking-[0.15em] text-foreground/70 hover:text-primary transition-colors duration-300 font-body focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm px-1 py-0.5"
              >
                {l.label}
              </a>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="text-foreground p-2 min-h-[48px] min-w-[48px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary rounded"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-6 right-6 text-foreground p-2 min-h-[48px] min-w-[48px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary rounded"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="font-display text-3xl text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}