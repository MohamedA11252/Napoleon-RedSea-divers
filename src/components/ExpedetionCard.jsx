import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function ExpeditionCard({ expedition, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
    >
      <Link
        to={`/expedition/${expedition.slug}`}
        className="group block relative aspect-[4/5] overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
      >
        <img
          src={expedition.image}
          alt={expedition.title}
          className={`w-full h-full ${
            expedition.imageFit === "contain" ? "object-contain" : "object-cover"
          } transition-transform duration-700 group-hover:scale-110`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lagoon via-primary to-lagoon opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-display text-lg text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
            {expedition.title}
          </h3>
          <div className="flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] text-lagoon font-body mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Details
            <ChevronRight size={12} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}