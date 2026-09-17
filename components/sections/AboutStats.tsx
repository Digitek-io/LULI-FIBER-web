"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const STATS = [
  { value: 7000, suffix: "+", label: "Active Subscribers" },
  { value: 99.9, suffix: "%", label: "Network Uptime", decimals: 1 },
  { value: 25, suffix: "+", label: "Areas Covered" },
];

// Upgraded with premium spring easing to match the Hero section
const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function AboutStats() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-void-radial opacity-60 mix-blend-screen" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative mx-auto max-w-7xl px-6 lg:px-8"
      >
        {/* Split Layout: Intro (Left) & Mission Card (Right) */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Left Column: Hook & Intro */}
          <div className="flex flex-col items-start text-left">
            <motion.p variants={item} className="font-mono text-xs uppercase tracking-[0.25em] text-signal font-semibold">
              About Us
            </motion.p>

            <motion.h2 variants={item} className="mt-5 text-4xl font-bold leading-tight sm:text-5xl text-fiber text-balance">
              Connecting You to What Matters Most
            </motion.h2>

            <motion.p variants={item} className="mt-6 text-lg leading-relaxed text-fiber/90 font-medium">
              Lulifiber is a next-generation Fiber-to-the-Home (FTTH) provider delivering
              ultra-fast, stable, and secure internet across Nigeria. Our advanced fiber
              infrastructure ensures seamless streaming, smooth video calls, online gaming,
              and uninterrupted business operations.
            </motion.p>

            <motion.div variants={item} className="mt-10">
              <Link href="https://lulifiber.com/about/" className="btn-secondary group">
                Read Our Story
                <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1 text-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Mission inside a Glass Card */}
          <motion.div variants={item} className="glass p-8 sm:p-10 rounded-4xl shadow-glow relative overflow-hidden">
            {/* Subtle decorative gradient top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-signal-gradient opacity-50" />
            
            <div className="space-y-6 text-base leading-relaxed text-muted">
              <p>
                Our mission is simple: replace slow, unreliable connections with powerful,
                future-ready broadband built for today&apos;s digital lifestyle. We serve homes,
                estates, SMEs, and corporate organizations with scalable solutions backed by
                responsive 24/7 support and strong uptime reliability.
              </p>
              <p>
                At Lulifiber, we don&apos;t just provide internet — <strong className="text-fiber font-semibold">we power productivity, entertainment, communication, and growth.</strong>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div variants={item} className="relative mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Enhanced "Fiber Strand" connecting line behind the stats */}
          <div
            aria-hidden
            className="absolute left-10 right-10 top-1/2 hidden h-0.5 -translate-y-1/2 bg-signal-gradient opacity-30 blur-[1px] sm:block"
          />
          
          {STATS.map(({ value, suffix, label, decimals }) => (
            <motion.div 
              key={label} 
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="glass group relative rounded-2xl p-8 text-center border border-line/50 hover:border-signal/30 transition-colors shadow-sm hover:shadow-glow"
            >
              <div className="text-4xl font-bold sm:text-5xl tracking-tight">
                {/* Applied Gradient to the numbers */}
                <span className="bg-signal-gradient bg-clip-text text-transparent inline-block">
                  <AnimatedCounter value={value} suffix={suffix} decimals={decimals ?? 0} />
                </span>
              </div>
              <p className="mt-3 text-sm font-semibold text-muted uppercase tracking-wider group-hover:text-fiber transition-colors">{label}</p>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}