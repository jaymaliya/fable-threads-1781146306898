"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "./cart-context";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-base transition-[border-color] duration-brand ${
          scrolled ? "border-b border-line" : "border-b border-transparent"
        }`}
      >
        {/* Main nav bar */}
        <div className="max-w-[1280px] mx-auto px-6 h-14 md:h-16 flex items-center relative">

          {/* LEFT — flush-left: Collections link (desktop) / Menu (mobile) */}
          <div className="flex-1 flex items-start">
            {/* Desktop left link */}
            <nav className="hidden md:flex items-center">
              <Link
                href="/"
                className="font-body text-[13px] tracking-widest uppercase text-ink hover:text-primary focus-visible:outline-none focus-visible:underline transition-colors duration-brand"
              >
                Collections
              </Link>
            </nav>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 -ml-1 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* CENTRE — brand mark absolutely centred */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Threads — home"
            >
              <img
                src="/logo.png"
                alt="Threads logo mark"
                className="w-8 h-8 object-contain"
              />
              <span
                className="font-display font-bold text-ink tracking-[0.18em] uppercase text-[15px] leading-none select-none"
                style={{ fontVariant: "small-caps" }}
              >
                threads
              </span>
            </Link>
          </div>

          {/* RIGHT — Shop Now CTA + cart */}
          <div className="flex-1 flex items-center justify-end gap-4 md:gap-6">
            {/* Desktop Shop Now */}
            <Link
              href="/shop"
              className="hidden md:inline-block font-body text-[13px] tracking-widest uppercase text-primary border-b border-transparent hover:border-primary focus-visible:outline-none focus-visible:border-primary transition-[border-color] duration-brand"
            >
              Shop Now
            </Link>

            {/* Cart button */}
            <button
              onClick={openCart}
              aria-label={`Open cart — ${count} item${count !== 1 ? "s" : ""}`}
              className="relative flex items-center justify-center w-9 h-9 text-ink hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors duration-brand"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute -top-0.5 -right-0.5 bg-primary text-primary-ink font-body text-[10px] font-medium leading-none w-4 h-4 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {count > 9 ? "9+" : count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Spacer so page content doesn't hide under fixed nav */}
      <div className="h-14 md:h-16" aria-hidden="true" />

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-0 z-[60] bg-ink/60"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.28, ease: [0.32, 0, 0.12, 1] }}
              className="fixed top-0 left-0 bottom-0 z-[70] w-[280px] bg-base border-r border-line flex flex-col"
              role="dialog"
              aria-label="Navigation menu"
              aria-modal="true"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-14 border-b border-line">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Threads — home"
                >
                  <img
                    src="/logo.png"
                    alt="Threads logo mark"
                    className="w-7 h-7 object-contain"
                  />
                  <span
                    className="font-display font-bold text-ink tracking-[0.18em] uppercase text-[14px] leading-none"
                    style={{ fontVariant: "small-caps" }}
                  >
                    threads
                  </span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="flex items-center justify-center w-9 h-9 text-ink hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors duration-brand"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              {/* Drawer nav links */}
              <nav className="flex flex-col px-6 pt-8 gap-0" aria-label="Mobile navigation">
                {[
                  { href: "/", label: "Home" },
                  { href: "/shop", label: "Shop" },
                  { href: "/", label: "Collections" },
                ].map(({ href, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, delay: 0.06 + i * 0.06, ease: "easeOut" }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className="block font-body text-[13px] tracking-widest uppercase text-ink hover:text-primary py-4 border-b border-line focus-visible:outline-none focus-visible:text-primary transition-colors duration-brand"
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer */}
              <div className="mt-auto px-6 pb-8 pt-6">
                <p className="font-body text-[11px] tracking-widest uppercase text-muted">
                  wear what defines you
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}