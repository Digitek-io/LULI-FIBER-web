"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

// This genuinely is a sequential process the user follows in order, so
// numbering the steps encodes real information here (unlike a generic
// 01/02/03 treatment elsewhere on the page).
const STEPS = [
  {
    title: "Check Coverage in Your Area",
    body: "Submit your location or contact our team to confirm if Lulifiber service is available in your area.",
  },
  {
    title: "Select Your Preferred Plan",
    body: "Choose from our range of fiber internet plans designed for homes, businesses, streaming, gaming, and remote work.",
  },
  {
    title: "Book Your Installation",
    body: "Our technical team schedules a convenient installation time and prepares your connection setup.",
  },
  {
    title: "Enjoy Fast & Reliable Internet",
    body: "Once installation is completed, you can start streaming, working, gaming, and browsing with stable high-speed fiber connectivity.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1);
  const reduced = useReducedMotion();

  const effectiveStep = reduced ? STEPS.length - 1 : activeStep;

  useEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 65%",
        end: "bottom 55%",
        scrub: 0.6,
        onUpdate: (self) => {
          if (fillRef.current) {
            gsap.set(fillRef.current, { width: `${self.progress * 100}%` });
          }
          setActiveStep(Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length)));
        },
      });

      return () => trigger.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} id="how-it-works" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            Get Connected in 4 Simple Steps
          </h2>
          <p className="mt-4 text-base text-muted">
            From availability check to installation, we make the process fast and
            seamless.
          </p>
        </div>

        {/* Desktop: horizontal timeline, line fill scrubbed to scroll position */}
        <div className="relative mt-20 hidden lg:block">
          <div className="absolute left-0 right-0 top-6 h-0.5 bg-line">
            <div ref={fillRef} className="h-full w-0 bg-signal-gradient" />
          </div>

          <div className="relative grid grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <div key={step.title} className="text-center">
                <div
                  className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 font-mono text-sm font-semibold transition-colors duration-300 ${
                    i <= effectiveStep
                      ? "border-signal bg-brand text-white"
                      : "border-line bg-void text-muted"
                  }`}
                >
                  {i + 1}
                </div>
                <h3 className="mt-4 text-base font-semibold text-fiber">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: simple stacked reveal, no scroll-scrub -- keeps it light */}
        <div className="mt-14 space-y-8 lg:hidden">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex gap-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand font-mono text-sm font-semibold text-white">
                {i + 1}
              </div>
              <div>
                <h3 className="text-base font-semibold text-fiber">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}