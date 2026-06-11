"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "./navbar";
import Footer from "./footer";
import { useCart } from "./cart-context";
import { PRODUCTS, formatINR, type Product } from "../lib/products";
import { ShoppingBag, Truck, RotateCcw, Package, ArrowRight, Star } from "lucide-react";

const SELLING_POINTS: Record<string, string[]> = {
  p1: [
    "240gsm cotton fleece — heavy enough to hold its shape after a hundred washes.",
    "Screen-printed in forest green using water-based ink. The illustration won't crack. It won't peel. It just ages.",
    "Cut oversized — shoulder seam intentionally dropped. Wear it over anything.",
  ],
  p2: [
    "Washed black — not a dye, a process. The faded tone is baked in before it ships.",
    "Full-back photographic print on a 220gsm cotton canvas. The cityscape reads like a still from a film you can't place.",
    "Boxy fit, dropped hem. The kind of oversized that looks chosen, not accidental.",
  ],
  p3: [
    "Off-white base, not stark white — the botanical illustration sits like ink on paper.",
    "Arched type hand-rendered in a single line-art pass. No digital shortcuts.",
    "Relaxed fit, ribbed crew neck. Works equally well as a layer or the only thing you need.",
  ],
  p4: [
    "Navy that reads almost black in low light — the chest print only reveals itself up close.",
    "Block-type embroidered at the left chest. Four words. No back print. The restraint is the point.",
    "Structured shoulders, mid-weight 210gsm jersey. It holds a shape.",
  ],
};

const FALLBACK_POINTS = [
  "Oversized cut, mid-weight cotton. Holds its structure.",
  "Screen-printed graphic — designed to last.",
  "Wears well alone or layered.",
];

export default function ProductView({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const others = PRODUCTS.filter((p) => p.id !== product.id);
  const sellingPoints = SELLING_POINTS[product.id] ?? FALLBACK_POINTS;

  function handleAdd() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    openCart();
  }

  return (
    <div className="min-h-screen bg-base flex flex-col">
      <Navbar />

      <main className="flex-1 pt-14 md:pt-16">
        {/* ── Product Hero ─────────────────────────────────────────── */}
        <section className="max-w-[1280px] mx-auto px-6 md:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-12 lg:gap-16">

            {/* Image panel */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Tag badge */}
              {product.tag && (
                <div className="absolute top-4 left-4 z-10 bg-primary px-3 py-1">
                  <span className="font-body text-text-primary-ink text-[13px] uppercase tracking-widest text-primary-ink">
                    {product.tag}
                  </span>
                </div>
              )}

              <div
                className="w-full overflow-hidden"
                style={{ aspectRatio: "4/5" }}
              >
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  style={{ filter: "none" }}
                  whileHover={{ filter: "saturate(0.7)" }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              {/* Paper grain overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                  opacity: 0.04,
                }}
              />
            </motion.div>

            {/* Details panel */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6 pt-8 md:pt-0 md:justify-center"
            >
              {/* Overline */}
              <span className="font-body text-muted uppercase tracking-[0.18em] text-[13px]">
                threads — drop
              </span>

              {/* Product name */}
              <h1
                className="font-display font-bold text-ink leading-[1.05] tracking-tight"
                style={{ fontSize: "clamp(32px, 5vw, 52px)" }}
              >
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span
                  className="font-display font-bold text-primary"
                  style={{ fontSize: "clamp(28px, 4vw, 40px)" }}
                >
                  {formatINR(product.price)}
                </span>
                <span className="font-body text-muted text-[13px] uppercase tracking-widest">
                  incl. taxes
                </span>
              </div>

              {/* Divider */}
              <div className="border-t border-line" />

              {/* Description */}
              <p className="font-body text-ink text-base leading-relaxed">
                {product.description}
              </p>

              {/* Selling points */}
              <ul className="flex flex-col gap-3">
                {sellingPoints.map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-[6px] w-1.5 h-1.5 flex-shrink-0 bg-primary" />
                    <span className="font-body text-muted text-[14px] leading-relaxed">
                      {point}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Add to cart */}
              <motion.button
                onClick={handleAdd}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="mt-2 w-full flex items-center justify-between gap-4 bg-primary text-primary-ink px-6 py-4 font-body text-[13px] uppercase tracking-[0.2em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label={`Add ${product.name} to cart`}
              >
                <span className="flex items-center gap-3">
                  <ShoppingBag size={16} strokeWidth={1.5} />
                  {added ? "Added to bag" : "Add to cart"}
                </span>
                <ArrowRight size={16} strokeWidth={1.5} />
              </motion.button>

              {/* Trust row */}
              <div className="border border-line grid grid-cols-3 divide-x divide-line mt-2">
                <div className="flex flex-col items-center gap-2 px-3 py-4">
                  <Truck size={16} strokeWidth={1.5} className="text-muted" />
                  <span className="font-body text-muted text-[11px] text-center uppercase tracking-widest leading-tight">
                    Ships in<br />3–5 days
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2 px-3 py-4">
                  <RotateCcw size={16} strokeWidth={1.5} className="text-muted" />
                  <span className="font-body text-muted text-[11px] text-center uppercase tracking-widest leading-tight">
                    7-day<br />returns
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2 px-3 py-4">
                  <Package size={16} strokeWidth={1.5} className="text-muted" />
                  <span className="font-body text-muted text-[11px] text-center uppercase tracking-widest leading-tight">
                    Packed<br />with care
                  </span>
                </div>
              </div>

              {/* Star trust line */}
              <div className="flex items-center gap-2 pt-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    size={12}
                    strokeWidth={0}
                    fill="currentColor"
                    className="text-primary"
                  />
                ))}
                <span className="font-body text-muted text-[13px]">
                  Worn and rated by people who actually bought it.
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Label Notes ──────────────────────────────────────────── */}
        <section className="bg-ink">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-16 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div>
                <span className="font-body text-primary uppercase tracking-[0.2em] text-[13px]">
                  the label
                </span>
                <h2
                  className="font-display italic text-base mt-4 leading-[1.1]"
                  style={{ fontSize: "clamp(28px, 4vw, 40px)" }}
                >
                  <span className="text-primary-ink">
                    Every print has a reason.<br />
                    Every tee earns its place.
                  </span>
                </h2>
              </div>
              <div>
                <p className="font-body text-muted text-base leading-relaxed">
                  threads doesn't do filler drops. Each graphic is chosen because it sits in a specific mood — something worn, something felt, something you don't have to explain to the right person. {product.name} is exactly that.
                </p>
                <p className="font-body text-muted text-base leading-relaxed mt-4">
                  Oversized fit. Intentional print. Daily wear.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── More from threads ────────────────────────────────────── */}
        <section className="bg-base">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-16 md:py-20">

            {/* Section header */}
            <div className="flex items-end justify-between mb-8 md:mb-10">
              <div>
                <span className="font-body text-muted uppercase tracking-[0.2em] text-[13px]">
                  est. 2024
                </span>
                <h2
                  className="font-display font-bold text-ink mt-1 leading-tight"
                  style={{ fontSize: "clamp(24px, 3vw, 32px)" }}
                >
                  More from threads
                </h2>
              </div>
              <Link
                href="/"
                className="hidden md:flex items-center gap-2 font-body text-[13px] text-primary uppercase tracking-widest hover:gap-3 transition-all duration-brand border-b border-primary pb-0.5"
              >
                Full drop <ArrowRight size={12} strokeWidth={2} />
              </Link>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {others.map((p, i) => (
                <OtherProductCard key={p.id} product={p} index={i} />
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="mt-8 md:hidden">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 w-full font-body text-[13px] text-primary uppercase tracking-widest border border-primary py-4"
              >
                Full drop <ArrowRight size={12} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function OtherProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/product?id=${product.id}`}
        className="group block relative overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={`View ${product.name}`}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ filter: hovered ? "saturate(0.7)" : "saturate(1)" }}
            transition={{ duration: 0.2 }}
          />

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-base flex flex-col justify-end p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              initial={{ y: 12 }}
              animate={{ y: hovered ? 0 : 12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-body text-ink text-[13px] leading-tight mb-1 uppercase tracking-wide">
                {product.name}
              </p>
              <p className="font-display font-bold text-primary text-xl leading-none">
                {formatINR(product.price)}
              </p>
            </motion.div>
          </motion.div>

          {/* Tag */}
          {product.tag && (
            <div className="absolute top-3 left-3 bg-primary px-2 py-0.5 z-10">
              <span className="font-body text-primary-ink text-[11px] uppercase tracking-widest">
                {product.tag}
              </span>
            </div>
          )}
        </div>

        {/* Card footer */}
        <div className="pt-3 flex items-center justify-between">
          <div>
            <p className="font-body text-ink text-[13px] uppercase tracking-wide leading-snug">
              {product.name}
            </p>
            <p className="font-display font-bold text-ink text-base leading-tight mt-0.5">
              {formatINR(product.price)}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            aria-label={`Add ${product.name} to cart`}
            className="flex items-center justify-center w-8 h-8 border border-line text-muted hover:border-primary hover:text-primary transition-colors duration-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ShoppingBag size={14} strokeWidth={1.5} />
          </button>
        </div>
      </Link>
    </motion.div>
  );
}