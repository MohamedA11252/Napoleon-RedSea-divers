import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, Waves, ChevronRight, Check } from "lucide-react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function BookingSection({ expedition }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    expedition: expedition?.title || "",
    month: "",
    guests: "2",
    name: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const canAdvance = () => {
    if (step === 1) return form.month !== "";
    if (step === 2) return form.name.trim() !== "" && form.email.trim() !== "";
    return false;
  };

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
    else setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="reserve" className="py-32 md:py-48 border-t border-primary/10">
        <div className="max-w-xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-8">
              <Check size={28} className="text-primary" />
            </div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-primary font-body mb-4">
              Welcome to the Elite
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-6">
              Your Slot is Secured
            </h2>
            <p className="text-foreground/60 font-body text-base leading-relaxed mb-8">
              Thank you, {form.name}. Our concierge team will contact you at {form.email} within 24 hours to finalize your {form.expedition} expedition for {form.month}.
            </p>
            <div className="inline-flex items-center gap-2 border border-primary/20 px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-primary font-body">
              <Waves size={14} />
              Expedition #{Math.floor(2400 + Math.random() * 100)}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="reserve" className="py-32 md:py-48 relative border-t border-primary/10">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-12">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[11px] uppercase tracking-[0.35em] text-primary font-body mb-4">
            The Reservation Vault
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
            Secure Your Slot
          </h2>
          <p className="text-foreground/50 font-body text-sm mt-4">
            {expedition?.title} · {expedition?.category}
          </p>
        </motion.div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-8 mb-16">
          {[
            { num: 1, icon: Calendar, label: "Date", accent: "primary" },
            { num: 2, icon: Users, label: "Details", accent: "lagoon" },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 ${
                  step >= s.num
                    ? s.accent === 'lagoon'
                      ? "border-lagoon bg-lagoon/10 text-lagoon"
                      : "border-primary bg-primary/10 text-primary"
                    : "border-foreground/15 text-foreground/30"
                }`}
              >
                <s.icon size={16} />
              </div>
              <span
                className={`hidden sm:inline text-[11px] uppercase tracking-[0.15em] font-body transition-colors ${
                  step >= s.num ? (s.accent === 'lagoon' ? "text-lagoon" : "text-primary") : "text-foreground/30"
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {MONTHS.map((month) => (
                  <button
                    key={month}
                    onClick={() => setForm({ ...form, month })}
                    className={`px-4 py-4 border text-center transition-all duration-300 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-primary ${
                      form.month === month
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-foreground/10 hover:border-primary/30 text-foreground/70"
                    }`}
                  >
                    <span className="text-[12px] uppercase tracking-[0.1em] font-body">
                      {month.slice(0, 3)}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <label className="text-[11px] uppercase tracking-[0.2em] text-foreground/50 font-body block mb-3">
                  Number of Guests
                </label>
                <select
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  className="w-full bg-transparent border border-foreground/10 text-foreground px-5 py-4 font-body text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary min-h-[48px]"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n} className="bg-background text-foreground">{n} {n === 1 ? "Guest" : "Guests"}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <label className="text-[11px] uppercase tracking-[0.2em] text-foreground/50 font-body block mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full bg-transparent border border-foreground/10 text-foreground px-5 py-4 font-body text-sm placeholder:text-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary min-h-[48px]"
                />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-[0.2em] text-foreground/50 font-body block mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full bg-transparent border border-foreground/10 text-foreground px-5 py-4 font-body text-sm placeholder:text-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary min-h-[48px]"
                />
              </div>
              <div className="border border-primary/10 bg-secondary/20 p-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-body mb-2">
                  Reservation Summary
                </p>
                <p className="text-foreground/70 font-body text-sm">
                  {form.expedition} · {form.month} · {form.guests} {Number(form.guests) === 1 ? "Guest" : "Guests"}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-[12px] uppercase tracking-[0.15em] text-foreground/50 hover:text-primary font-body transition-colors min-h-[48px] px-2 focus:outline-none focus:ring-2 focus:ring-primary rounded"
            >
              Back
            </button>
          ) : (
            <div />
          )}
          <button
            onClick={handleNext}
            disabled={!canAdvance()}
            className="flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-[13px] uppercase tracking-[0.2em] font-body font-semibold hover:bg-primary/90 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed min-h-[48px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            {step === 2 ? "Secure Your Slot" : "Continue"}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}