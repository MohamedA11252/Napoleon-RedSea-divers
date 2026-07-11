import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "I've dived across six continents and nothing compares. The Thistlegorm expedition was the single most extraordinary dive of my life — and the surface experience rivalled any five-star resort.",
    name: "Alexandra Reinholt",
    title: "PADI Master Scuba Diver, Copenhagen",
  },
  {
    quote: "Napoleon doesn't just show you the reef — they reveal it. The intimacy of a twelve-person group with a guide who knows every crevice of Ras Mohammed is beyond compare.",
    name: "Marcus Ashworth",
    title: "Marine Photographer, London",
  },
  {
    quote: "Without a doubt, I feel I  have been trained by the very best, I very much look forward to contnuting my PADI journey and gaining further certifications. I stronly recommened Napoleon Red Sea Divers to anyone that wishes to adventure the deep and all the wonderful marine life it offers.",
    name: "Yuki Tanaka",
    title: "Technical Diver, Tokyo",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="reviews" className="py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[11px] uppercase tracking-[0.35em] text-primary font-body mb-4">
            From the Logbook
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
            Reviews from the Deep
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <Quote size={24} className="text-lagoon/40 mb-6" strokeWidth={1} />
              <blockquote className="font-display text-lg md:text-xl text-foreground/90 italic leading-relaxed mb-8">
                "{t.quote}"
              </blockquote>
              <div className="border-t border-primary/15 pt-4">
                <p className="text-[13px] text-primary font-body font-medium">
                  {t.name}
                </p>
                <p className="text-[11px] uppercase tracking-[0.15em] text-foreground/40 font-body mt-1">
                  {t.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-24">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>
    </section>
  );
}