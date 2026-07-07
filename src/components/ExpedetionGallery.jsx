import React from "react";
import { motion } from "framer-motion";
import ExpeditionCard from "@/components/ExpedetionCard";
import { activities, categoryOrder } from "@/data/expedetions";

export default function ExpeditionGallery() {
  return (
    <section id="expeditions" className="py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[11px] uppercase tracking-[0.35em] text-primary font-body mb-4">
            Curated Expeditions
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
            The Gallery
          </h2>
        </motion.div>
      </div>

      {categoryOrder.map((cat) => {
        const catActivities = activities.filter((a) => a.category === cat);
        if (catActivities.length === 0) return null;
        return (
          <div key={cat} className="max-w-7xl mx-auto px-6 lg:px-12 mb-20 last:mb-0">
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-display text-xl md:text-2xl text-foreground whitespace-nowrap">
                {cat}
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
              <span className="text-[11px] uppercase tracking-[0.15em] text-primary/40 font-body hidden sm:block">
                {catActivities.length} {catActivities.length === 1 ? "Activity" : "Activities"}
              </span>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {catActivities.map((act, i) => (
                <ExpeditionCard key={act.slug} expedition={act} index={i} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}