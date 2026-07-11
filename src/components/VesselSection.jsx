import React from "react";
import { motion } from "framer-motion";
import { Wind, Shield, Gauge, Waves, Anchor, Star } from "lucide-react";

const YACHT_IMAGE = "https://media.base44.com/images/public/6a4bfe1f24077d99a17e4331/3eb6ed8dc_generated_c7391f13.png";

const specs = [
  { icon: Gauge, label: "Nitrox", value: "32% & 36% EANx Available", accent: "lagoon" },
  { icon: Shield, label: "Equipment", value: "Scubapro & Aqualung Premium", accent: "primary" },
  { icon: Wind, label: "Vessel", value: "28m Teak-Finished Motor Yacht", accent: "lagoon" },
  { icon: Waves, label: "Capacity", value: "12 Divers Maximum", accent: "primary" },
  { icon: Anchor, label: "Navigation", value: "Full GPS & Sonar Array", accent: "lagoon" },
  { icon: Star, label: "Surface", value: "Champagne, Chef, Sun Deck", accent: "primary" },
];

export default function VesselSection() {
  return (
    <section id="marinelife" className="py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — specs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[11px] uppercase tracking-[0.35em] text-primary font-body mb-4">
              Technical Reassurance
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
              The Logbook
            </h2>
            <p className="text-foreground/60 font-body text-base mb-12 max-w-md">
              Every detail, curated. From the air you breathe to the teak beneath your feet — nothing is left to chance.
            </p>

            <div className="space-y-0">
              {specs.map((spec, i) => (
                <motion.div
                  key={spec.label}
                  className="flex items-center gap-5 py-5 border-b border-primary/10"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                >
                  <spec.icon size={18} className={`flex-shrink-0 ${spec.accent === 'lagoon' ? 'text-lagoon' : 'text-primary'}`} strokeWidth={1.5} />
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-foreground/50 font-body">
                      {spec.label}
                    </span>
                    <span className="text-[14px] text-foreground font-body">
                      {spec.value}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden">
              <img
                src={YACHT_IMAGE}
                alt="Luxury dive yacht at golden hour with polished teak deck and champagne service"
                className="w-full h-auto object-cover"
              />
              {/* Glass overlay accent */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-4 lg:-left-8 bg-secondary/90 backdrop-blur-xl border border-primary/20 p-6 max-w-[200px]">
              <span className="font-display text-3xl text-primary">15+</span>
              <p className="text-[11px] uppercase tracking-[0.15em] text-foreground/60 font-body mt-1">
                Years of Red Sea Mastery
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}