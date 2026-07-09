import React from "react";
import { Waves } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

export default function Footer() {
  const { isAdmin } = useAuth();
  return (
    <footer className="border-t border-primary/10 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="https://media.base44.com/images/public/6a4bfe1f24077d99a17e4331/16e408804_WhatsAppImage2026-07-06at93924PM-Picsart-BackgroundRemover.jpeg"
                alt="Napoleon RedSea Diver logo"
                className="w-12 h-12 object-contain rounded-full"
              />
              <span className="font-display text-xl text-primary tracking-wide">
                NAPOLEON
              </span>
            </div>
            <p className="text-foreground/50 font-body text-sm leading-relaxed max-w-xs">
              The golden standard of underwater exploration. Elite dive guiding across the Red Sea since 2009.
            </p>
            <div className="flex gap-2 mt-5">
              <div className="w-8 h-px bg-primary" />
              <div className="w-8 h-px bg-lagoon" />
              <div className="w-8 h-px bg-primary" />
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-primary font-body mb-5">
              Navigate
            </h4>
            <div className="space-y-3">
              {[
                { label: "Expeditions", href: "#expeditions" },
                { label: "The Vessel", href: "#vessel" },
                { label: "Heritage", href: "#heritage" },
                { label: "Reserve", href: "#reserve" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="block text-sm text-foreground/50 hover:text-primary transition-colors font-body focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-primary font-body mb-5">
              Legal
            </h4>
            <div className="space-y-3">
              {[
                { label: "Privacy Policy", href: "#privacy" },
                { label: "Terms of Service", href: "#terms" },
                { label: "Cookie Policy", href: "#cookies" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="block text-sm text-foreground/50 hover:text-primary transition-colors font-body focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-primary font-body mb-5">
              Contact the Concierge
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:concierge@napoleondiver.com"
                className="block text-sm text-foreground/50 hover:text-primary transition-colors font-body focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
              >
                concierge@napoleondiver.com
              </a>
              <a
                href="tel:+201070222128"
                className="block text-sm text-foreground/50 hover:text-primary transition-colors font-body focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
              >
                +20 107 022 128
              </a>
              <p className="text-sm text-foreground/50 font-body">
                Sharm El Sheikh, South Sinai, Egypt
              </p>
            </div>
            {/* Social */}
            <div className="flex gap-4 mt-6">
              {[
                { label: "Instagram", href: "https://instagram.com/napoleondiver" },
                { label: "YouTube", href: "https://youtube.com/@napoleondiver" },
                { label: "Facebook", href: "https://facebook.com/napoleondiver" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] uppercase tracking-[0.15em] text-foreground/40 hover:text-primary transition-colors font-body focus:outline-none focus:ring-2 focus:ring-primary rounded px-1 py-0.5"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-foreground/30 font-body tracking-wide">
            © {new Date().getFullYear()} Napoleon RedSea Diver. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link
                to="/review-comments"
                className="text-[11px] text-foreground/20 hover:text-primary font-body tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
              >
                Guestbook Review
              </Link>
            )}
            <p className="text-[11px] text-foreground/20 font-body tracking-wide">
              The Golden Standard of Underwater Exploration
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}