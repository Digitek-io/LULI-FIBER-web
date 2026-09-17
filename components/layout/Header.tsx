"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiChevronDown, FiPhoneCall } from "react-icons/fi";
import { CONTACT, SOCIALS, COMPANY_LINKS, SELF_SERVICE_LINKS, LINKS } from "@/lib/constants";

// Define the type for the sub-links to fix the 'any' ESLint error
interface SubLink {
  name?: string;
  label?: string;
  href: string;
  external?: boolean;
}

// Attach the imported constants directly to the nav links
const NAV_LINKS = [
  { name: "Our Plans", href: LINKS.pricing },
  { name: "Shop", href: LINKS.shop, external: true},
  { name: "Our company", href: "#", subLinks: COMPANY_LINKS as SubLink[] },
  { name: "Self-service", href: "#", subLinks: SELF_SERVICE_LINKS.map(link => ({ ...link, external: true })) as SubLink[] },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileDropdown = (name: string) => {
    setActiveMobileDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-white"}`}>
      {/* Top Social Bar */}
      <div className="w-full border-b border-gray-100 hidden md:block">
        <div className="container mx-auto px-4 md:px-8 max-w-350 h-10 flex items-center justify-end gap-6 text-gray-800">
          <Link
            href={`tel:${CONTACT.phones[0]}`}
            className="flex items-center gap-2 text-sm text-fiber/70 transition-colors hover:text-signal"
          >
            <FiPhoneCall />
            <span className="tabular-nums">{CONTACT.phones[0]}</span>
          </Link>
          {SOCIALS.map(({ Icon, href, label }) => (
            <Link key={label} href={href} aria-label={label} className="text-gray-500 transition-colors hover:text-brand">
              <Icon size={14} />
            </Link>
          ))}
          {/* <ThemeToggle /> */}
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 md:px-8 max-w-350">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image src="/icon.png" alt="Lulifiber Logo" width={70} height={70} className="rounded-full object-cover" />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-900">
                <span className="text-brand leading-none">Luli</span>fiber
              </h1>
              <span className="text-[10px] text-gray-500 font-medium tracking-wide">Truly unlimited</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <div key={link.name} className="relative group">
                <Link 
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-sm font-medium text-gray-800 hover:text-brand transition-colors flex items-center gap-1 py-6"
                >
                  {link.name}
                  {link.subLinks && (
                    <FiChevronDown size={14} className="text-gray-500 transition-transform duration-300 group-hover:rotate-180" />
                  )}
                </Link>

                {/* Desktop Hover Dropdown */}
                {link.subLinks && (
                  <div className="absolute left-0 top-full w-56 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left translate-y-2 group-hover:translate-y-0">
                    <div className="py-2 flex flex-col">
                      {link.subLinks.map((sub: SubLink) => (
                        <Link
                          key={sub.label || sub.name}
                          href={sub.href}
                          target={sub.external ? "_blank" : undefined}
                          rel={sub.external ? "noopener noreferrer" : undefined}
                          className="px-5 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-brand transition-colors"
                        >
                          {sub.label || sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link 
              href={LINKS.register}
              target="blank"
              className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-brand rounded-md shadow-sm hover:shadow-brand/40 transition-all duration-300"
            >
              Get Started
            </Link>
            <button 
              className="lg:hidden text-gray-700 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl absolute w-full"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <div key={link.name} className="flex flex-col">
                  {link.subLinks ? (
                    <>
                      {/* Mobile Accordion Toggle */}
                      <button 
                        onClick={() => toggleMobileDropdown(link.name)}
                        className="flex items-center justify-between w-full py-3 text-base font-medium text-gray-800 hover:text-brand"
                      >
                        {link.name}
                        <FiChevronDown 
                          size={18} 
                          className={`text-gray-500 transition-transform duration-300 ${activeMobileDropdown === link.name ? "rotate-180" : ""}`} 
                        />
                      </button>
                      
                      {/* Mobile Accordion Content */}
                      <AnimatePresence>
                        {activeMobileDropdown === link.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-1 pl-4 pb-2 border-l-2 border-pink-100 ml-2">
                              {link.subLinks.map((sub: SubLink) => (
                                <Link
                                  key={sub.label || sub.name}
                                  href={sub.href}
                                  className="py-2 px-4 text-sm text-gray-600 hover:text-brand transition-colors"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {sub.label || sub.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link 
                      href={link.href}
                      className="block py-3 text-base font-medium text-gray-800 hover:text-brand"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="pt-4 mt-2 border-t border-gray-100">
                <Link 
                  href={LINKS.register}
                  className="inline-flex w-full items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-brand rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}