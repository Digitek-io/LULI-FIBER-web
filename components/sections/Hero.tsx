"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiWifi, FiHeadphones, FiShield, FiArrowRight } from "react-icons/fi";
import { LINKS } from "@/lib/constants";

const CAROUSEL_IMAGES = [
  "/hero.jpeg", // Replace with your actual image paths
  "/panoramicHero.jpeg",
];

const FEATURES = [
  {
    Icon: FiWifi,
    title: "Premium FTTH Provider",
  },
  {
    Icon: FiHeadphones,
    title: "24/7 Dedicated Support",
  },
  {
    Icon: FiShield,
    title: "Built for Maximum Uptime",
  },
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cycle images every 5 seconds for the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white flex flex-col items-center pt-30 overflow-hidden">
      
      {/* Main Hero Section */}
      <section className="relative w-full max-w-300 mx-auto px-4 md:px-8 pt-8 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Text & CTAs */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 text-center lg:text-left z-10"
        > 
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            Ultra-Fast Fiber Internet for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#d91986] to-[#8a2387]">
              Homes &amp; Businesses
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
            Experience reliable, high-speed fiber internet across Nigeria. Stream, game,
            work, and connect seamlessly with truly unlimited data.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-4">
            <Link 
              href={LINKS.register} 
              target="blank"
              className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-brand rounded-full shadow-lg hover:shadow-brand/40 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Get Started
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              href={LINKS.pricing} 
              className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors text-center"
            >
              View Plans
            </Link>
          </div>
        </motion.div>

        {/* Right Column: Image Carousel & Floating Badges */}
        <div className="max-md:hidden relative w-full h-100 md:h-125 flex items-center justify-center mt-10 lg:mt-0">
          
          {/* Main Image Carousel Container */}
          <div className="relative w-full max-w-md md:max-w-lg h-full rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl z-10 bg-gray-100">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 h-full w-full"
              >
                <Image
                  src={CAROUSEL_IMAGES[currentImageIndex]}
                  alt={`Lulifiber Users ${currentImageIndex + 1}`}
                  fill
                  priority
                  className="object-cover object-center"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- Floating Animated Badges --- */}

          {/* Badge 1: Super Clear Streaming (Bottom Left) */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -left-4 md:left-2 lg:-left-25 bottom-16 z-20"
          >
            <div className="relative bg-brand-light text-white rounded-full py-3 px-6 shadow-xl border-4 border-white">
              <span className="block text-sm md:text-base font-medium leading-none text-center">super clear</span>
              <span className="block text-xl md:text-2xl font-black leading-tight text-center">Streaming</span>
              {/* Speech Bubble Tail */}
              <div className="absolute -bottom-4 right-10 w-0 h-0 border-t-20 border-brand-light border-l-15 border-l-transparent border-r-15 border-r-transparent transform rotate-12 drop-shadow-sm"></div>
            </div>
          </motion.div>

          {/* Badge 2: Unlimited Enough (Top Right) */}
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute -right-2 md:-right-10 lg:-right-30 top-12 z-20"
          >
            <div className="relative bg-linear-to-r from-[#d91986] to-brand text-white rounded-full py-4 px-8 shadow-xl border-4 border-white">
              <span className="block text-lg md:text-2xl font-black leading-none text-center tracking-wide">unlimited enough</span>
              <span className="block text-sm md:text-base font-light leading-tight text-center">for Everyone</span>
              {/* Speech Bubble Tail */}
              <div className="absolute -bottom-5 left-12 w-0 h-0 border-t-25 border-t-[#d91986] border-l-15 border-l-transparent border-r-15 border-r-transparent transform -rotate-12 drop-shadow-sm"></div>
            </div>
          </motion.div>

          {/* Badge 3: No Data Cap (Circular, Top Left) */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
            className="absolute left-6 md:left-7 lg:-left-8 top-10 z-20"
          >
            <div className="flex flex-col items-center justify-center w-24 h-24 md:w-28 md:h-28 bg-[#8a2387] text-white rounded-full shadow-lg border-4 border-white">
              <span className="text-base md:text-lg font-bold leading-none">No</span>
              <span className="text-base md:text-lg font-bold leading-none">Data</span>
              <span className="text-base md:text-lg font-bold leading-none">Cap</span>
            </div>
          </motion.div>

          {/* Badge 4: WiFi-6 (Circular, Top Right) */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-2 -right-2 md:right-8 lg:-right-10 z-20"
          >
            <div className="flex flex-col items-center justify-center w-24 h-24 md:w-28 md:h-28 bg-brand-light text-white rounded-full shadow-lg border-4 border-white">
              <span className="text-base md:text-lg font-bold leading-none">Wi-FI 6</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Features Row */}
      <section className="w-full py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Why Choose Lulifiber Broadband
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map(({ Icon, title }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-pink-50 text-brand">
                  <Icon size={26} strokeWidth={1.5} />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-gray-800">
                  {title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}