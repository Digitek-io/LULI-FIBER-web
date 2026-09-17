"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import { CONTACT } from "@/lib/constants";

export function FloatingWhatsapp() {
    const [isOpen, setIsOpen] = useState(false);

    const bounceVariants: Variants = {
        initial: { y: 0 },
        animate: { y: [0, -8, 0, -4, 0], transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } },
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/30 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 15 }}
                        transition={{ type: "spring", stiffness: 320, damping: 26 }}
                        className="fixed bottom-24 right-5 z-50 w-80 rounded-2xl overflow-hidden shadow-2xl border border-(--color-border) bg-(--color-bg-card)"
                    >
                        <div className="bg-brand px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                    <FaWhatsapp className="text-brand text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-sm">Chat with Lulifiber</h3>
                                    <p className="text-white/80 text-xs">Typically replies within minutes</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 rounded-full p-1 transition-colors" aria-label="Close">
                                <FaTimes className="text-lg" />
                            </button>
                        </div>
                        <div className="p-4">
                            <a
                                href={CONTACT.whatsappHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block bg-[var(--color-bg-elevated)] rounded-xl p-4 border border-brand hover:border-brand/40 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                                        <FaWhatsapp className="text-white text-2xl" />
                                    </div>
                                    <div>
                                        <p className="text-[var(--color-text-primary)] font-semibold text-sm">Lulifiber Support</p>
                                        <p className="text-brand text-xs font-medium mt-1">Click to chat →</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen((p) => !p)}
                variants={bounceVariants}
                initial="initial"
                animate="animate"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-5 right-5 z-50 bg-[#25D366] rounded-full p-4 shadow-xl hover:brightness-105 transition-all"
                aria-label="WhatsApp chat"
            >
                <FaWhatsapp className="h-5 w-5 text-white" />
            </motion.button>
        </>
    );
}
