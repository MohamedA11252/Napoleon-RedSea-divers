import React from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getActivityBySlug } from "@/data/expedetions";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";

export default function ActivityDetail() {
  const { slug } = useParams();
  const activity = getActivityBySlug(slug);

  if (!activity) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center px-6">
        <p className="text-[11px] uppercase tracking-[0.35em] text-primary font-body mb-4">Not Found</p>
        <h1 className="font-display text-4xl text-foreground mb-6">Activity Unavailable</h1>
        <p className="text-foreground/50 font-body text-sm mb-8">This activity could not be located.</p>
        <Link to="/#expeditions" className="text-primary hover:text-lagoon transition-colors text-[13px] uppercase tracking-[0.15em] font-body">
          Return to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Back bar */}
      <div className="border-b border-primary/10 sticky top-0 bg-background/95 backdrop-blur-xl z-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          <Link
            to="/#expeditions"
            className="flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors text-[12px] uppercase tracking-[0.15em] font-body min-h-[48px] focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
          >
            <ArrowLeft size={16} />
            Back to Gallery
          </Link>
          <img
            src="https://media.base44.com/images/public/6a4bfe1f24077d99a17e4331/16e408804_WhatsAppImage2026-07-06at93924PM-Picsart-BackgroundRemover.jpeg"
            alt="Napoleon RedSea Diver logo"
            className="w-9 h-9 object-contain rounded-full"
          />
        </div>
      </div>

      {/* Hero image */}
      <motion.div
        className="relative h-[50vh] md:h-[60vh] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/40" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-5xl mx-auto px-6 lg:px-12 pb-12">
            <p className="text-[11px] uppercase tracking-[0.35em] text-lagoon font-body mb-3">
              {activity.category}
            </p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-foreground">
              {activity.title}
            </h1>
          </div>
        </div>
      </motion.div>

      {/* Stats bar */}
      {activity.stats && activity.stats.length > 0 && (
        <div className="border-y border-primary/10 bg-secondary/20">
          <div className="max-w-5xl mx-auto px-6 lg:px-12 py-6 flex flex-wrap gap-8 md:gap-16">
            {activity.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-body mb-1">
                  {stat.label}
                </p>
                <p className="font-display text-xl text-primary">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      <div className="max-w-3xl mx-auto px-6 lg:px-12 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[11px] uppercase tracking-[0.35em] text-primary font-body mb-4">
            {activity.diveSites ? "The Safari" : "The Experience"}
          </p>
          <p className="font-display text-2xl md:text-3xl text-foreground/90 italic leading-relaxed mb-12">
            {activity.tagline}
          </p>
          <div className="space-y-6">
            {activity.description.map((para, i) => (
              <p key={i} className="text-foreground/70 font-body text-base md:text-lg leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Dive sites (for liveaboards) */}
      {activity.diveSites && activity.diveSites.length > 0 && (
        <div className="max-w-3xl mx-auto px-6 lg:px-12 pb-20">
          <div className="border-t border-primary/10 pt-12">
            <p className="text-[11px] uppercase tracking-[0.35em] text-lagoon font-body mb-6">
              Dive Sites on This Safari
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activity.diveSites.map((site, i) => (
                <div key={i} className="flex items-center gap-3 border border-primary/10 bg-secondary/20 px-5 py-4">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] text-primary font-body font-medium">{i + 1}</span>
                  </div>
                  <span className="text-foreground/80 font-body text-sm">{site}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Price */}
      <div className="border-t border-primary/10 py-16 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-[11px] uppercase tracking-[0.35em] text-primary font-body mb-4">
            Price
          </p>
          <p className="font-display text-5xl md:text-6xl text-foreground">
            {activity.price}
          </p>
          <p className="text-foreground/40 font-body text-sm mt-3">per person</p>
        </div>
      </div>

      {/* Booking */}
      <BookingSection expedition={activity} />

      <Footer />
    </div>
  );
}