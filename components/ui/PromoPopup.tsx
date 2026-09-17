"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiZap, FiCheckCircle, FiLoader } from "react-icons/fi";

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Use refs to access the latest state inside our event listeners
  const isOpenRef = useRef(isOpen);
  const hasSubmittedRef = useRef(false);

  // Keep the ref in sync with the state
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    // If they have already submitted the form in this session, don't show the popup at all
    if (sessionStorage.getItem("lulifiber_lead_captured")) {
      hasSubmittedRef.current = true;
      return; 
    }

    // 1. On Arrive: Trigger once after 8 seconds
    const timer = setTimeout(() => {
      if (!isOpenRef.current && !hasSubmittedRef.current) {
        setIsOpen(true);
      }
    }, 8000);

    // 2. On Exit Intent: Trigger anytime the mouse leaves the top of the viewport
    const handleMouseLeave = (e: MouseEvent) => {
      // e.clientY <= 5 detects if the mouse is moving towards the tabs/close button
      if (e.clientY <= 5 && !isOpenRef.current && !hasSubmittedRef.current) {
        setIsOpen(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Prevent scrolling when popup is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "exit-intent-popup",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Submission failed");

      // Mark as successfully submitted so it stops popping up
      setIsSuccess(true);
      hasSubmittedRef.current = true;
      sessionStorage.setItem("lulifiber_lead_captured", "true");

      setTimeout(() => setIsOpen(false), 3000);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isSubmitting && setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
          >
            {!isSubmitting && (
              <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 z-20 p-2 bg-black/10 hover:bg-black/20 text-white rounded-full transition-colors">
                <FiX size={20} />
              </button>
            )}

            <div className="w-full bg-linear-to-r from-[#d91986] to-[#8a2387] pt-10 pb-6 px-8 text-center text-white relative overflow-hidden">
              <div className="absolute -top-6 -right-6 text-white/10">
                <FiZap size={120} />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-1 relative z-10">
                {isSuccess ? "You're on the list!" : "Get Connected Today!"}
              </h2>
              <p className="text-pink-100 text-sm font-medium relative z-10">
                {isSuccess ? "We'll be in touch shortly." : "Experience Truly Unlimited Internet."}
              </p>
            </div>

            <div className="p-6 md:p-8">
              {isSuccess ? (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-4">
                  <FiCheckCircle size={56} className="text-green-500 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You, {formData.name.split(' ')[0]}!</h3>
                  <p className="text-gray-600 text-sm">Your details have been received. A Lulifiber representative will contact you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <p className="text-sm text-gray-600 text-center mb-2">Enter your details below and our team will reach out to get you set up.</p>
                  
                  <input type="text" name="name" required placeholder="Full Name" value={formData.name} onChange={handleChange} disabled={isSubmitting} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d91986]/50 focus:border-[#d91986]" />
                  <input type="email" name="email" required placeholder="Email Address" value={formData.email} onChange={handleChange} disabled={isSubmitting} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d91986]/50 focus:border-[#d91986]" />
                  <input type="tel" name="phone" required placeholder="Phone Number" value={formData.phone} onChange={handleChange} disabled={isSubmitting} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d91986]/50 focus:border-[#d91986]" />

                  {error && <p className="text-red-500 text-xs text-center">{error}</p>}

                  <button type="submit" disabled={isSubmitting} className="w-full mt-2 py-3.5 px-6 text-sm font-bold text-white bg-brand rounded-full shadow-lg hover:shadow-brand/40 transition-all disabled:opacity-70 flex items-center justify-center gap-2">
                    {isSubmitting ? <><FiLoader className="animate-spin" size={18} /> Processing...</> : "Get Connnected"}
                  </button>
                  <button type="button" onClick={() => setIsOpen(false)} disabled={isSubmitting} className="w-full py-2 text-xs font-medium text-gray-400 hover:text-gray-700">
                    No thanks, I&apos;ll browse first
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}