"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const SolutionIcon = dynamic(() => import("@/components/canvas/SolutionIcon"), {
  ssr: false,
});

const SOLUTIONS = [
  {
    variant: "home" as const,
    title: "Home Fiber Internet",
    body: "Experience ultra-fast, unlimited FTTH connectivity built for seamless streaming, online gaming, video calls, smart homes, and remote work, all powered by Lulifiber's reliable high-speed network.",
  },
  {
    variant: "business" as const,
    title: "Business Fiber Internet",
    body: "Empower your organization with stable, high-capacity broadband designed for productivity, cloud applications, video conferencing, and uninterrupted daily operations.",
  },
  {
    variant: "line" as const,
    title: "Dedicated Leased Line",
    body: "Get enterprise-grade connectivity with a private, symmetrical fiber connection tailored exclusively to your business, delivering guaranteed speed, maximum uptime, enhanced security, and uncompromised performance.",
  },
];

// Upgraded with premium spring easing to match Hero and AboutStats
const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function Solutions() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Subtle top-down ambient glow for depth */}
      <div className="pointer-events-none absolute left-1/2 top-0 w-full max-w-4xl -translate-x-1/2 h-100 bg-void-radial opacity-30 mix-blend-screen" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.h2 variants={item} className="text-4xl font-bold leading-tight sm:text-5xl text-fiber text-balance">
            Our Fiber Internet Solutions
          </motion.h2>
          <motion.p variants={item} className="mt-6 text-lg text-muted text-pretty">
            Reliable, high-speed fiber connectivity built to power homes, businesses,
            and enterprises without interruption.
          </motion.p>
        </motion.div>

        {/* 3D Interactive Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {SOLUTIONS.map(({ variant, title, body }, i) => (
            <motion.div
              key={title}
              variants={item}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="glass group relative overflow-hidden rounded-4xl p-8 transition-colors duration-500 hover:border-signal/40 shadow-sm hover:shadow-glow-brand"
            >
              {/* Subtle top gradient line that reveals on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-signal-gradient opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              {/* Dedicated stage for the 3D Canvas */}
              <div className="relative h-44 w-full mb-8 rounded-2xl bg-linear-to-b from-surface/80 to-transparent border border-line/50 flex items-center justify-center group-hover:border-signal/20 transition-colors">
                <SolutionIcon variant={variant} hovered={hoveredIndex === i} />
              </div>
              
              <h3 className="text-2xl font-bold text-fiber">{title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{body}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 text-center flex justify-center"
        >
          <Link href="#pricing" className="btn-primary group">
            Choose your plan
            <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}