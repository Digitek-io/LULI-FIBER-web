"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck, FiInfo, FiMapPin, FiArrowRight } from "react-icons/fi";
import { LULI_PLANS, LINKS, COVERAGE_MAP } from "@/lib/constants";

// Define explicit interfaces to handle optional JSON properties
interface Plan {
  plan_name: string;
  speed: string;
  price_per_month: string;
  features: string[];
  terms: string;
  badge?: string;
  additional_perks?: string;
  total_first_time_payment?: string;
}

interface Category {
  name: string;
  subtitle?: string;
  plans: Plan[];
}

// Animation Variants for Coverage Grid
const coverageContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const coverageItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Pricing() {
  const CITIES = LULI_PLANS.locations.map((loc) => loc.city);
  
  const [city, setCity] = useState(CITIES[0]);
  const [tier, setTier] = useState("Promo");

  const activeLocation = LULI_PLANS.locations.find((l) => l.city === city);
  
  // Cast the inferred data to our explicit interfaces
  const activeCategory = activeLocation?.categories.find((c) => c.name === tier) as Category | undefined;
  const plans = (activeCategory?.plans || []) as Plan[];
  const TIERS = activeLocation?.categories.map((c) => c.name) || [];
  
  // Use the imported COVERAGE_MAP
  const activeCoverageAreas = COVERAGE_MAP[city] || [];

  return (
    <section id="pricing" className="relative py-24 lg:py-32 overflow-hidden bg-gray-50/50">
      {/* Background glow to anchor the section */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 h-150 bg-void-radial opacity-20 mix-blend-screen" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold leading-tight sm:text-5xl text-fiber text-balance">
            Power Your World with Reliable Fiber
          </h2>
          <p className="mt-6 text-lg text-muted">
            Fast speeds. Stable connection. Zero interruptions. Pick the plan that fits
            your lifestyle.
          </p>
        </div>

        {/* City Selector */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-signal">
            Select your city
          </span>
          <div className="glass inline-flex rounded-full p-1.5 shadow-sm bg-white border border-gray-200">
            {CITIES.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setCity(c);
                  setTier("Promo"); // Reset tier when city changes
                }}
                className={`rounded-full px-8 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  city === c 
                    ? "bg-brand text-white shadow-md" 
                    : "text-gray-600 hover:text-brand hover:bg-pink-50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Tier Selector */}
        <div className="mt-10 flex justify-center">
          <div className="flex flex-wrap justify-center gap-4 border-b border-gray-200 pb-2">
            {TIERS.map((t) => (
              <button
                key={t}
                onClick={() => setTier(t)}
                className={`relative px-4 py-2 text-base font-semibold transition-colors ${
                  tier === t ? "text-brand" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {t}
                {tier === t && (
                  <motion.div
                    layoutId="tier-underline"
                    className="absolute inset-x-0 -bottom-2.5 h-0.75 rounded-t-full bg-brand"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Optional Subtitle for the active category */}
        {activeCategory?.subtitle && (
          <p className="text-center mt-8 text-sm font-medium text-gray-500 uppercase tracking-widest">
            — {activeCategory.subtitle} —
          </p>
        )}

        {/* Pricing Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${city}-${tier}-plans`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center"
          >
            {plans.map((plan, idx) => {
              const isPopular = !!plan.badge;
              
              return (
                <motion.div
                  key={plan.plan_name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative flex flex-col rounded-3xl p-8 transition-all duration-300 bg-white ${
                    isPopular 
                      ? "border-2 border-brand shadow-xl lg:scale-105 z-10" 
                      : "border border-gray-200 hover:border-brand/30 hover:shadow-lg"
                  }`}
                >
                  {/* Floating Badge */}
                  {isPopular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-signal-gradient px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                      {plan.badge}
                    </span>
                  )}
                  
                  {/* Plan Header */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900">{plan.plan_name}</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-brand">{plan.speed}</span>
                    </div>
                    {plan.additional_perks && (
                      <p className="mt-2 text-xs font-semibold text-brand bg-pink-50 inline-block px-3 py-1 rounded-full border border-pink-100">
                        {plan.additional_perks}
                      </p>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="mb-8 border-b border-gray-100 pb-6">
                    <p className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-gray-900">
                        {plan.price_per_month === "Consult" ? "Custom" : `₦${plan.price_per_month}`}
                      </span>
                      {plan.price_per_month !== "Consult" && (
                        <span className="text-sm font-medium text-gray-500">/month</span>
                      )}
                    </p>
                    
                    {plan.total_first_time_payment && (
                      <p className="mt-3 text-xs font-medium text-gray-600 flex items-center gap-1.5 bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                        <FiInfo className="shrink-0 text-brand" size={14} />
                        First time: ₦{plan.total_first_time_payment}
                      </p>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="flex-1 space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-medium text-gray-700">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pink-50">
                          <FiCheck className="text-brand" size={12} strokeWidth={3} />
                        </div>
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA & Terms */}
                  <div className="mt-auto">
                    <Link
                      href={plan.price_per_month === "Consult" ? "/contact" : LINKS.register}
                      target={plan.price_per_month === "Consult" ? undefined : "_blank"}
                      className={`block w-full text-center py-3.5 rounded-xl font-bold transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                         isPopular 
                      ? "glass border-2 border-signal shadow-glow-brand lg:scale-105 z-10 bg-surface/95" 
                      : "glass border border-line/50 hover:border-signal/30 hover:shadow-glow"
                  }`}
                    >
                      {plan.price_per_month === "Consult" ? "Contact Us" : "Get Plan"}
                    </Link>
                    <p className="mt-4 text-[10px] leading-relaxed text-gray-500 whitespace-pre-line text-center opacity-80">
                      {plan.terms}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Coverage Areas Section */}
        <div className="mt-32 pt-16 border-t border-gray-200">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Coverage Areas in <span className="text-brand">{city}</span>
            </h2>
            <p className="text-lg text-gray-600">
              Lulifiber is rapidly expanding across {city}. Check below to see if our ultra-fast fiber network is currently available in your neighborhood.
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={`${city}-coverage`}
              variants={coverageContainerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
            >
              {activeCoverageAreas.map((area) => (
                <motion.div
                  key={area}
                  variants={coverageItemVariants}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-pink-200 transition-all group"
                >
                  <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-pink-50 text-brand group-hover:scale-110 transition-transform">
                    <FiMapPin size={18} />
                  </div>
                  <span className="font-medium text-sm md:text-base text-gray-800 group-hover:text-brand transition-colors">
                    {area}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {/* Waitlist CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 text-center max-w-4xl mx-auto"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Don&apos;t see your neighborhood?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We are constantly expanding our fiber network across Nigeria. Join our waitlist to be the first to know when Lulifiber arrives in your area!
            </p>
            <div className="flex justify-center">
              <Link 
                href="https://waitlist.lulifiber.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-brand rounded-full shadow-lg hover:shadow-brand/40 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Join the Waitlist
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}