import React from "react";
import { motion } from "framer-motion";

export default function HeritageSection() {
  return (
    <section id="heritage" className="py-32 md:py-48 relative">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8">
          {/* Left column */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[11px] uppercase tracking-[0.35em] text-primary font-body mb-4">
              Our Heritage
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-8">
              The Philosophy
            </h2>
            <div className="w-16 h-px bg-primary/40 mb-8" />
          </motion.div>

          {/* Right column — text */}
          <motion.div
            className="lg:col-span-7 lg:pt-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className="text-foreground/80 font-body text-lg md:text-xl leading-relaxed mb-8">
              Named after the majestic Napoleon Wrasse — the crowned emperor of the reef — our company was founded on a singular belief: that diving is not merely recreation. It is communion with the ancient, silent world beneath the waves.
            </p>
            <p className="text-foreground/60 font-body text-base leading-relaxed mb-12">
              Every expedition we craft is a pilgrimage. We hand-select our dive sites, limit group sizes to twelve, and employ guides with decades of Red Sea cartography. From the moment you step aboard our vessel to the champagne awaiting you on the sun deck, every detail is orchestrated to deliver an experience that transcends the ordinary.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-8 border-t border-primary/15 pt-10">
              {[
                { number: "2,400+", label: "Expeditions Led", accent: "primary" },
                { number: "98%", label: "Return Rate", accent: "lagoon" },
                { number: "40m+", label: "Maximum Depth", accent: "primary" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                >
                  <span className={`font-display text-2xl md:text-3xl ${stat.accent === 'lagoon' ? 'text-lagoon' : 'text-primary'}`}>
                    {stat.number}
                  </span>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-body mt-2">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}