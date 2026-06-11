"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView, useAnimationFrame } from "framer-motion";
import { ArrowRight, Star, Shirt, Ruler, Droplets, MapPin } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCart } from "../components/cart-context";
import { PRODUCTS, formatINR } from "../lib/products";

// ─── Marquee Ticker ───────────────────────────────────────────────────────────
function MarqueeTicker() {
  const items = [
    "WE SELL STYLE",
    "— THREADS T-SHIRTS —",
    "WE SELL STYLE",
    "— THREADS T-SHIRTS —",
    "WE SELL STYLE",
    "— THREADS T-SHIRTS —",
    "WE SELL STYLE",
    "— THREADS T-SHIRTS —",
    "WE SELL STYLE",
    "— THREADS T-SHIRTS —",
    "WE SELL STYLE",
    "— THREADS T-SHIRTS —",
  ];

  return (
    <div className="bg-primary overflow-hidden w-full" style={{ height: "36px" }}>
      <motion.div
        className="flex items-center h-full whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        style={{ willChange: "transform" }}
      >
        {items.concat(items).map((item, i) => (
          <span
            key={i}
            className="font-body text-primary-ink uppercase tracking-widest mx-8 flex-shrink-0"
            style={{ fontSize: "13px" }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const leftRef = useRef(null);
  const inView = useInView(leftRef, { once: true });

  return (
    <section className="w-full flex flex-col md:flex-row min-h-[92vh] overflow-hidden">
      {/* Left — charcoal panel, 55% */}
      <div
        ref={leftRef}
        className="relative flex flex-col justify-end md:justify-center bg-ink px-8 md:px-14 py-16 md:py-0"
        style={{ flex: "0 0 100%", maxWidth: "100%" }}
      >
        {/* Mobile: stacked; desktop: 55/45 */}
        <style>{`
          @media(min-width:768px){
            .hero-left{ flex: 0 0 55%; max-width: 55%; }
            .hero-right{ flex: 0 0 45%; max-width: 45%; display:flex !important; }
          }
        `}</style>
        <div className="hero-left flex flex-col justify-center h-full relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p
              className="font-body text-primary uppercase tracking-[0.2em] mb-6"
              style={{ fontSize: "13px" }}
            >
              Est. 2024 — Drop 001
            </p>
          </motion.div>

          <div className="overflow-hidden mb-2">
            <motion.h1
              className="font-display font-bold text-base leading-none uppercase tracking-tight"
              style={{
                fontSize: "clamp(48px, 8vw, 88px)",
                lineHeight: 0.92,
                color: "var(--color-bg-base, #F5F0E8)",
              }}
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              WEAR
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-2">
            <motion.h1
              className="font-display font-bold leading-none uppercase tracking-tight text-primary"
              style={{
                fontSize: "clamp(48px, 8vw, 88px)",
                lineHeight: 0.92,
              }}
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
            >
              WHAT
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8 md:mb-12">
            <motion.h1
              className="font-display font-bold text-base leading-none uppercase tracking-tight"
              style={{
                fontSize: "clamp(48px, 8vw, 88px)",
                lineHeight: 0.92,
                color: "var(--color-bg-base, #F5F0E8)",
              }}
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            >
              DEFINES
            </motion.h1>
          </div>

          <motion.p
            className="font-body text-muted mb-10 max-w-xs"
            style={{ fontSize: "16px", lineHeight: 1.5 }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Keep your head in the clouds. The tee handles the rest. Four moods, one rack — worn-in graphics that say it without saying it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.72 }}
          >
            <Link
              href="#shop"
              className="inline-flex items-center gap-3 font-body text-base text-primary-ink border-b border-primary pb-1 group transition-colors duration-brand hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              style={{ fontSize: "16px" }}
              aria-label="Browse all drops"
            >
              <span className="text-primary font-body uppercase tracking-widest" style={{ fontSize: "13px" }}>Browse the drop</span>
              <ArrowRight size={14} className="text-primary transition-transform duration-brand group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Right — product photograph, angled 8deg, hard crop */}
      <div
        className="hero-right hidden bg-surface relative overflow-hidden"
        style={{ minHeight: "420px" }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <img
            src="/product-1.jpg"
            alt="Daydreamer Tee — cream oversized tee with hand-drawn forest illustration"
            className="w-full h-full object-cover"
            style={{
              transform: "rotate(8deg) scale(1.12)",
              transformOrigin: "center center",
            }}
          />
          {/* Subtle paper grain overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
              opacity: 0.04,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── Featured Drop Grid ───────────────────────────────────────────────────────
function FeaturedDropGrid() {
  const { addItem, openCart } = useCart();

  return (
    <section id="shop" className="bg-base py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <Reveal className="mb-10 md:mb-14 flex items-end justify-between gap-4">
          <div>
            <p
              className="font-body text-primary uppercase tracking-[0.2em] mb-2"
              style={{ fontSize: "13px" }}
            >
              Drop 001
            </p>
            <h2
              className="font-display font-bold text-ink leading-none"
              style={{ fontSize: "clamp(28px, 4vw, 40px)" }}
            >
              All four moods. One rack.
            </h2>
          </div>
          <Link
            href="/collections"
            className="hidden md:inline-flex items-center gap-2 font-body text-muted border-b border-line pb-0.5 hover:text-ink transition-colors duration-brand"
            style={{ fontSize: "13px" }}
          >
            View all
            <ArrowRight size={12} />
          </Link>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} addItem={addItem} openCart={openCart} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  index,
  addItem,
  openCart,
}: {
  product: (typeof PRODUCTS)[0];
  index: number;
  addItem: (p: (typeof PRODUCTS)[0]) => void;
  openCart: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className="group flex flex-col"
    >
      <Link href={`/product?id=${product.id}`} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
        <div
          className="relative overflow-hidden bg-surface aspect-[3/4] cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Tag */}
          {product.tag && (
            <div className="absolute top-3 left-3 z-20">
              <span
                className="font-body uppercase tracking-widest bg-primary text-primary-ink px-2 py-1"
                style={{ fontSize: "11px" }}
              >
                {product.tag}
              </span>
            </div>
          )}

          {/* Image */}
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ filter: hovered ? "saturate(0.7)" : "saturate(1)" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ display: "block" }}
          />

          {/* Hover overlay: name + price */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-base px-4 py-4 flex items-center justify-between z-10"
            initial={{ y: "100%" }}
            animate={{ y: hovered ? "0%" : "100%" }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <p className="font-body text-ink" style={{ fontSize: "13px", fontWeight: 500 }}>
                {product.name}
              </p>
              <p className="font-body text-primary" style={{ fontSize: "13px" }}>
                {formatINR(product.price)}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem(product);
                openCart();
              }}
              aria-label={`Add ${product.name} to cart`}
              className="font-body text-ink border border-line px-3 py-1.5 hover:bg-ink hover:text-base transition-colors duration-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em" }}
            >
              Add
            </button>
          </motion.div>
        </div>
      </Link>

      {/* Below image: name + price (always visible) */}
      <div className="mt-3 flex items-baseline justify-between">
        <p className="font-body text-ink" style={{ fontSize: "14px" }}>
          {product.name}
        </p>
        <p className="font-body text-muted" style={{ fontSize: "13px" }}>
          {formatINR(product.price)}
        </p>
      </div>
    </motion.div>
  );
}

// ─── The Label Story ──────────────────────────────────────────────────────────
function LabelStory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section className="bg-base py-16 md:py-24 border-t border-line">
      <div ref={ref} className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-center">
          {/* Left 60% — pull quote */}
          <div className="md:col-span-3">
            <motion.p
              className="font-body text-primary uppercase tracking-[0.2em] mb-6"
              style={{ fontSize: "13px" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              The Label
            </motion.p>

            <div className="overflow-hidden mb-8">
              <motion.blockquote
                className="font-display italic text-ink leading-tight"
                style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.15 }}
                initial={{ y: "105%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              >
                "Four tees. Each one a mood."
              </motion.blockquote>
            </div>

            <motion.p
              className="font-body text-muted mb-8 max-w-sm"
              style={{ fontSize: "16px", lineHeight: 1.6 }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.38 }}
            >
              Not a catalogue. Not a collection. Four intentional graphics on four intentional cuts — each one a different way of moving through the world. Pick your mood. Wear it daily.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.52 }}
            >
              <Link
                href="#shop"
                className="inline-flex items-center gap-2 font-body text-primary border-b border-primary pb-0.5 hover:text-ink hover:border-ink transition-colors duration-brand group"
                style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.12em" }}
              >
                See all four
                <ArrowRight size={12} className="transition-transform duration-brand group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Right 40% — stacked crop shots */}
          <div className="md:col-span-2 flex flex-col gap-2">
            {[
              { src: "/product-1.jpg", alt: "Daydreamer Tee flat-lay — hand-drawn forest illustration on cream" },
              { src: "/product-2.jpg", alt: "Midnight Drive Tee flat-lay — photorealistic cityscape on washed black" },
            ].map((img, i) => (
              <motion.div
                key={img.src}
                className="overflow-hidden aspect-[4/3] bg-surface"
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.14 }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  style={{ display: "block" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Wear What Defines You ────────────────────────────────────────────────────
function WearWhatDefinesYou() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section className="bg-ink py-24 md:py-32">
      <div ref={ref} className="max-w-[640px] mx-auto px-6 md:px-8 text-center">
        <motion.p
          className="font-body text-primary uppercase tracking-[0.25em] mb-6"
          style={{ fontSize: "13px" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Est. 2024
        </motion.p>

        <div className="overflow-hidden mb-8">
          <motion.h2
            className="font-display font-bold text-base leading-tight"
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              lineHeight: 1.05,
              color: "#F5F0E8",
            }}
            initial={{ y: "105%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            Four moods. One rack.
          </motion.h2>
        </div>

        <motion.p
          className="font-body text-muted mb-10"
          style={{ fontSize: "16px", lineHeight: 1.6 }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.38 }}
        >
          Threads started with a simple rule: if the print doesn't mean something to the person wearing it, it doesn't ship. Every drop here passed that filter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.52 }}
        >
          <Link
            href="#shop"
            className="inline-flex items-center gap-2 font-body text-accent border-b border-accent pb-0.5 hover:opacity-80 transition-opacity duration-brand"
            style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.14em" }}
          >
            Shop the drop
            <ArrowRight size={13} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Reviews ──────────────────────────────────────────────────────────────────
const REVIEWS = [
  {
    name: "Devika Nair",
    city: "Kochi",
    rating: 5,
    text: "Wore the Daydreamer to a gig last week. Three people asked where I got it. Didn't tell any of them.",
    product: "Daydreamer Tee",
  },
  {
    name: "Kabir Sood",
    city: "Chandigarh",
    rating: 5,
    text: "Got the Midnight Drive. Layered it under an open shirt for two months straight. The print holds up. Bought the Own Path too.",
    product: "Midnight Drive Tee",
  },
  {
    name: "Tanishka Bhatt",
    city: "Pune",
    rating: 5,
    text: "The Grow Through back print is exactly the kind of graphic I would have drawn in my sketchbook. Except someone already made it a tee.",
    product: "Grow Through Tee",
  },
];

function Reviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section className="bg-surface py-16 md:py-24 border-t border-line">
      <div ref={ref} className="max-w-[1280px] mx-auto px-6 md:px-8">
        <Reveal className="mb-10 md:mb-14">
          <p
            className="font-body text-primary uppercase tracking-[0.2em] mb-2"
            style={{ fontSize: "13px" }}
          >
            Worn & rated
          </p>
          <h2
            className="font-display font-bold text-ink"
            style={{ fontSize: "clamp(24px, 3vw, 32px)" }}
          >
            From people who actually wear it.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.name}
              className="border border-line bg-base p-6 flex flex-col gap-4"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.1 }}
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} size={12} className="text-primary fill-primary" />
                ))}
                <span
                  className="font-body text-muted ml-2"
                  style={{ fontSize: "13px" }}
                >
                  {review.rating}/5
                </span>
              </div>

              <p
                className="font-body text-ink flex-1"
                style={{ fontSize: "14px", lineHeight: 1.6 }}
              >
                "{review.text}"
              </p>

              <div className="border-t border-line pt-4 flex items-baseline justify-between">
                <div>
                  <p
                    className="font-body text-ink"
                    style={{ fontSize: "13px", fontWeight: 500 }}
                  >
                    {review.name}
                  </p>
                  <p
                    className="font-body text-muted"
                    style={{ fontSize: "13px" }}
                  >
                    {review.city}
                  </p>
                </div>
                <span
                  className="font-body text-muted"
                  style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em" }}
                >
                  {review.product}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Sizing & Fabric Strip ────────────────────────────────────────────────────
const FABRIC_ITEMS = [
  {
    icon: <Shirt size={16} className="text-ink" aria-hidden="true" />,
    label: "Fabric",
    detail: "220 GSM cotton\nboxy oversized",
  },
  {
    icon: <Ruler size={16} className="text-ink" aria-hidden="true" />,
    label: "Fit",
    detail: "Drop shoulder\nS – XXL",
  },
  {
    icon: <Droplets size={16} className="text-ink" aria-hidden="true" />,
    label: "Wash",
    detail: "Cold machine\ninside out",
  },
  {
    icon: <MapPin size={16} className="text-ink" aria-hidden="true" />,
    label: "Origin",
    detail: "Made in India\nsmall batch",
  },
];

function SizingFabricStrip() {
  return (
    <section className="bg-surface border-t border-line border-b">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {FABRIC_ITEMS.map((item, i) => (
            <div
              key={item.label}
              className={`flex flex-col items-center justify-center gap-3 py-10 px-4 text-center ${
                i < FABRIC_ITEMS.length - 1
                  ? "border-r border-line"
                  : ""
              }`}
            >
              {item.icon}
              <div>
                <p
                  className="font-body text-primary uppercase tracking-widest mb-1"
                  style={{ fontSize: "11px" }}
                >
                  {item.label}
                </p>
                <p
                  className="font-body text-ink whitespace-pre-line"
                  style={{ fontSize: "13px", lineHeight: 1.5 }}
                >
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Newsletter Footer Bridge ─────────────────────────────────────────────────
function NewsletterBridge() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section ref={ref} className="bg-primary py-16 md:py-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-16">
          {/* Left headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex-shrink-0"
          >
            <h2
              className="font-display font-bold text-primary-ink leading-tight"
              style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.1 }}
            >
              Drop alerts.
              <br />
              No spam.
            </h2>
            <p
              className="font-body text-primary-ink mt-3 opacity-70"
              style={{ fontSize: "13px" }}
            >
              New tees ship unannounced. Get on the list.
            </p>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
            className="w-full md:max-w-md"
          >
            {submitted ? (
              <p
                className="font-body text-primary-ink border border-primary-ink border-opacity-40 px-6 py-4"
                style={{ fontSize: "14px" }}
              >
                You're on the list. Watch your inbox.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex items-stretch w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-transparent border border-primary-ink text-primary-ink placeholder-primary-ink font-body px-4 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-ink"
                  style={{ fontSize: "14px", opacity: 1 }}
                  aria-label="Email address for drop alerts"
                />
                <button
                  type="submit"
                  className="bg-primary-ink text-primary font-body uppercase tracking-widest px-5 py-3 hover:opacity-90 transition-opacity duration-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-ink"
                  style={{ fontSize: "12px" }}
                  aria-label="Subscribe to drop alerts"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main className="min-h-screen bg-base overflow-x-hidden">
      <Navbar />

      {/* Offset for fixed nav */}
      <div className="pt-14 md:pt-16">
        <MarqueeTicker />
        <Hero />
        <FeaturedDropGrid />
        <LabelStory />
        <WearWhatDefinesYou />
        <Reviews />
        <SizingFabricStrip />
        <NewsletterBridge />
      </div>

      <Footer />
    </main>
  );
}