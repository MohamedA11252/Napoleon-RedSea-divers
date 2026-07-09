import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Star, MessageSquare, Waves } from "lucide-react";
import { commentsApi } from "@/lib/api";

export default function GuestCommentsSection() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", comment: "", rating: 5 });
  const [success, setSuccess] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      const data = await commentsApi.getAll();
      setComments(Array.isArray(data) ? data : []);
    } catch {
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) return;
    setSubmitting(true);
    try {
      await commentsApi.create({
        name: form.name.trim(),
        comment: form.comment.trim(),
        rating: form.rating,
      });
      setSuccess(true);
      setForm({ name: "", comment: "", rating: 5 });
      setTimeout(() => {
        setSuccess(false);
        setShowForm(false);
      }, 3000);
    } catch {
      // silent — form stays open so user can retry
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="guestbook" className="py-32 md:py-48 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/15 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[11px] uppercase tracking-[0.35em] text-primary font-body mb-4">
            The Guestbook
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
            Impressions from the Deep
          </h2>
          <p className="max-w-xl mx-auto text-foreground/50 font-body text-base leading-relaxed">
            Share your experience or read what others have written after surfacing from the Red Sea.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto mb-20">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center border border-primary/30 bg-secondary/30 backdrop-blur-sm p-10"
              >
                <Waves size={28} className="text-primary mx-auto mb-4" strokeWidth={1.5} />
                <p className="font-display text-2xl text-primary mb-2">Thank You</p>
                <p className="text-foreground/60 font-body text-sm">
                  Your impression has been received and will appear here once reviewed by our concierge.
                </p>
              </motion.div>
            ) : showForm ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6 bg-secondary/20 backdrop-blur-xl border border-primary/15 p-8 md:p-10"
              >
                <div>
                  <label className="text-[11px] uppercase tracking-[0.2em] text-foreground/50 font-body block mb-3">
                    Your Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setForm({ ...form, rating: n })}
                        onMouseEnter={() => setHoverRating(n)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none focus:ring-2 focus:ring-primary rounded p-1"
                        aria-label={`${n} stars`}
                      >
                        <Star
                          size={24}
                          className={(hoverRating || form.rating) >= n ? "text-primary fill-primary" : "text-foreground/20"}
                          strokeWidth={1.5}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-[0.2em] text-foreground/50 font-body block mb-3">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-transparent border border-foreground/10 text-foreground px-5 py-4 font-body text-sm placeholder:text-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary min-h-[48px]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-[0.2em] text-foreground/50 font-body block mb-3">
                    Your Impression
                  </label>
                  <textarea
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    placeholder="Share your experience beneath the waves..."
                    rows={4}
                    className="w-full bg-transparent border border-foreground/10 text-foreground px-5 py-4 font-body text-sm placeholder:text-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="text-[12px] uppercase tracking-[0.15em] text-foreground/50 hover:text-primary font-body transition-colors min-h-[48px] px-2 focus:outline-none focus:ring-2 focus:ring-primary rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !form.name.trim() || !form.comment.trim()}
                    className="flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-[13px] uppercase tracking-[0.2em] font-body font-semibold hover:bg-primary/90 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed min-h-[48px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                  >
                    {submitting ? "Submitting..." : "Submit"}
                    <Send size={14} />
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="toggle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-3 border border-primary/30 text-primary px-8 py-4 text-[13px] uppercase tracking-[0.2em] font-body hover:bg-primary/10 transition-colors min-h-[48px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                >
                  <MessageSquare size={16} />
                  Leave an Impression
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-20" />

        {loading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-16">
            <Waves size={32} className="text-primary/30 mx-auto mb-4" strokeWidth={1} />
            <p className="text-foreground/40 font-body text-sm">
              No impressions yet. Be the first to share.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {comments.map((c, i) => (
              <motion.div
                key={c.id || i}
                className="relative bg-secondary/20 backdrop-blur-sm border border-primary/10 p-8 group hover:border-primary/30 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Waves size={60} className="absolute top-4 right-4 text-primary/5 group-hover:text-primary/10 transition-colors" strokeWidth={1} />

                <div className="flex gap-1 mb-4 relative z-10">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      className={idx < (c.rating || 5) ? (idx % 2 === 0 ? "text-primary fill-primary" : "text-lagoon fill-lagoon") : "text-foreground/10"}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>

                <p className="font-display text-lg text-foreground/90 italic leading-relaxed mb-6 relative z-10">
                  "{c.comment}"
                </p>

                <div className="border-t border-primary/15 pt-4 relative z-10">
                  <p className="text-[13px] text-primary font-body font-medium">
                    {c.name}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/30 font-body mt-1">
                    {c.created_date
                      ? new Date(c.created_date).toLocaleDateString("en-US", { month: "long", year: "numeric" })
                      : "Recently"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
