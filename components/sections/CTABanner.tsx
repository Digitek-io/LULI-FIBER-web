"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { LINKS } from "@/lib/constants";
import Image from "next/image";

interface CTABannerProps {
  heading?: string;
  body?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string } | null;
}

export default function CTABanner({
  heading = "Ready to experience better internet connectivity?",
  body = "Join thousands of homes and businesses already connected to Lulifiber's ultra-fast fiber network.",
  primaryCta = { label: "Get Started", href: LINKS.register },
  secondaryCta = { label: "View Plans", href: LINKS.pricing },
}: CTABannerProps) {
  return (
    <section className="px-5 py-24 lg:px-8 lg:py-32 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#1A1220] shadow-glow-brand border border-signal/20"
      >
        {/* Abstract radial glow behind the text */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_100%_at_0%_50%,rgba(184,34,184,0.15),transparent_50%)]"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-112.5">
          
          {/* Left Column: Copy & Actions */}
          <div className="relative z-10 flex flex-col justify-center p-10 sm:p-16 lg:p-20 text-left">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl leading-tight text-balance"
            >
              {heading}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 max-w-xl text-lg text-white/80"
            >
              {body}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href={primaryCta.href}
                target="blank"
                className="inline-flex items-center gap-2 rounded-full bg-signal-gradient px-8 py-4 text-sm font-bold text-white shadow-[0_0_20px_rgba(184,34,184,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,135,0,0.6)] active:scale-[0.98]"
              >
                {primaryCta.label}
                <FiArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
              </Link>
              
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/40"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </motion.div>
          </div>

          {/* Right Column: 3D Interactive Fiber Core */}
          <div className="relative h-105 sm:h-130 lg:h-auto lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-1/2 overflow-hidden">
  {/* Fade into the dark background */}
  <div className="absolute inset-0 bg-linear-to-t from-[#1A1220] via-transparent to-transparent lg:bg-inear-to-l z-10 pointer-events-none" />
  <div className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#B822B8]/20 blur-[120px]" />
<div className="absolute bottom-0 right-10 h-[280px] w-[280px] rounded-full bg-[#FF8700]/15 blur-[90px]" />
  <Image
    src="/technician.png"
    alt="LuliFiber field technician carrying fiber optic cable"
    fill
    priority
    className="object-cover object-[center_28%]"
  />
</div>

        </div>
      </motion.div>
    </section>
  );
}