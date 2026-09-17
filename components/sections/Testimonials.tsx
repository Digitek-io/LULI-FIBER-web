"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const REVIEW_SLIDES = [
  { id: 1, src: "/review1.jpg", alt: "Lulifiber customer review 1" },
  { id: 2, src: "/review2.jpg", alt: "Lulifiber customer review 2" },
  { id: 3, src: "/review3.jpg", alt: "Lulifiber customer review 3" },
  { id: 4, src: "/review4.jpg", alt: "Lulifiber customer review 4" },
  { id: 5, src: "/review5.jpg", alt: "Lulifiber customer review 5" },
  { id: 6, src: "/review6.jpg", alt: "Lulifiber customer review 6" },
  { id: 7, src: "/review7.jpg", alt: "Lulifiber customer review 7" },
];

// Custom variants for directional sliding
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
  }),
};

export default function Testimonials() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = REVIEW_SLIDES.length;
  // Wrap index to always stay within bounds safely
  const index = ((page % total) + total) % total;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    if (reduced || paused) return;
    timerRef.current = setInterval(() => paginate(1), 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, paused, page]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) paginate(1);
    else if (info.offset.x > swipeThreshold) paginate(-1);
  };

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 h-125 bg-void-radial opacity-30 mix-blend-screen" />

      <div className="mx-auto max-w-5xl px-5 text-center lg:px-8 relative z-10">
        
        {/* Scroll-Revealed Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-signal font-semibold mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl font-bold leading-tight sm:text-5xl text-fiber text-balance">
            Trusted by Homes &amp; Businesses Across Nigeria
          </h2>
          <p className="mt-6 text-lg text-muted text-pretty">
            See what our customers are saying about their Lulifiber experience.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-16 mx-auto max-w-4xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Outer Glass Frame */}
          <div className="glass rounded-4xl p-2 sm:p-4 shadow-glow relative">
            <div className="relative aspect-960/560 w-full overflow-hidden rounded-xl bg-surface/50 border border-line/40">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={page}
                  custom={direction}
                  variants={reduced ? {} : slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.4 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={handleDragEnd}
                  className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
                >
                  <Image
                    src={REVIEW_SLIDES[index].src}
                    alt={REVIEW_SLIDES[index].alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="pointer-events-none object-cover"
                    draggable={false}
                    priority={index === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous review"
              className="glass absolute left-0 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-fiber/80 transition-all duration-300 hover:text-signal hover:scale-110 hover:shadow-glow-brand z-20 sm:flex"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={() => paginate(1)}
              aria-label="Next review"
              className="glass absolute right-0 top-1/2 flex h-12 w-12 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-fiber/80 transition-all duration-300 hover:text-signal hover:scale-110 hover:shadow-glow-brand z-20 sm:flex"
            >
              <FiChevronRight size={24} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="mt-8 flex justify-center gap-2.5">
            {REVIEW_SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                // Calculate shortest path to clicked dot
                onClick={() => {
                  const newDirection = i > index ? 1 : -1;
                  setPage([page + (i - index), newDirection]);
                }}
                aria-label={`Go to review ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ease-out ${
                  i === index ? "w-8 bg-signal-gradient shadow-md" : "w-2 bg-line hover:bg-signal/50"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}