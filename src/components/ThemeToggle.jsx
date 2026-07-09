import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  try {
    return localStorage.getItem("theme") === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore persistence errors */
    }
  }, [theme]);

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={isLight}
      className={`relative flex items-center justify-center h-10 w-10 rounded-full border border-primary/30 text-primary bg-primary/5 hover:bg-primary/15 hover:border-primary/60 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          {isLight ? <Moon size={18} /> : <Sun size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
