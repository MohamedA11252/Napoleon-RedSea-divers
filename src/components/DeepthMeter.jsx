import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function DepthMeter() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollPercent(pct);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const depth = Math.round((scrollPercent / 100) * 40);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-2">
      <span className="text-[10px] uppercase tracking-[0.2em] text-lagoon font-body">
        Surface
      </span>
      <div className="relative w-[2px] h-48 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-lagoon to-primary rounded-full"
          style={{ height: `${scrollPercent}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <span className="text-[10px] uppercase tracking-[0.2em] text-lagoon font-body font-medium">
        {depth}m
      </span>
    </div>
  );
}