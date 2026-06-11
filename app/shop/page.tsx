"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ShoppingBag, Plus } from "lucide-react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { useCart } from "../../components/cart-context";
import { PRODUCTS, formatINR } from "../../lib/products";

function RevealText({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function ProductCard({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const { addItem, openCart } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
    openCart();
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
    >
      <Link
        href={`/product?id=${product.id}`}
        className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image container */}
        <div className="relative overflow-hidden bg-bg-surface" style={{ aspectRatio: "4/5" }}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            style={{
              filter: hovered ? "saturate(0.7)" : "saturate(1)",
              transition: "filter 0.2s linear",
            }}
          />

          {/* Tag badge */}
          {product.tag && (
            <div className="absolute top-0 left-0 bg-primary px-3 py-1">
              <span className="font-body text-text-primary-ink text-[11px] uppercase tracking-widest font-medium">
                {product.tag}
              </span>
            </div>
          )}

          {/* Hover overlay — name + price slide up */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: hovered ? "0%" : "100%" }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 bottom-0 bg-base px-4 py-4 flex items-center justify-between border-t border-line"
          >
            <div>
              <p className="font-display font-bold text-ink text-base leading-tight">{product.name}</p>
              <p className="font-body text-text-muted text-[13px] mt-0.5">{formatINR(product.price)}</p>
            </div>
            <button
              onClick={handleAdd}
              aria-label={`Add ${product.name} to cart`}
              className="w-9 h-9 bg-primary flex items-center justify-center text-text-primary-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-opacity hover:opacity-80"
            >
              {added ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                >
                  <ShoppingBag size={15} />
                </motion.div>
              ) : (
                <Plus size={15} />
              )}
            </button>
          </motion.div>
        </div>

        {/* Card info — below image */}
        <div className="pt-3 pb-1 flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display font-bold text-ink text-[17px] leading-tight group-hover:text-primary transition-colors duration-200">
              {product.name}
            </h3>
            <p className="font-body text-text-muted text-[13px] mt-1 leading-relaxed line-clamp-2">
              {product.description}
            </p>
          </div>
          <span className="font-display font-bold text-ink text-[17px] whitespace-nowrap pt-0.5">
            {formatINR(product.price)}
          </span>
        </div>
      </Link>

      {/* Add to cart — below the card, always visible */}
      <button
        onClick={handleAdd}
        aria-label={`Add ${product.name} to cart`}
        className="mt-3 w-full border border-line font-body text-[13px] text-ink uppercase tracking-widest py-2.5 flex items-center justify-center gap-2 hover:bg-primary hover:text-text-primary-ink hover:border-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {added ? (
          <>
            <ShoppingBag size={13} />
            <span>Added</span>
          </>
        ) : (
          <>
            <Plus size={13} />
            <span>Quick Add</span>
          </>
        )}
      </button>
    </motion.div>
  );
}

export default function ShopPage() {
  const [filter, setFilter] = useState<string>("all");

  const filters = [
    { key: "all", label: "All Drops" },
    { key: "new", label: "New Drop" },
    { key: "fan", label: "Fan Favourite" },
  ];

  const filtered = PRODUCTS.filter((p) => {
    if (filter === "all") return true;
    if (filter === "new") return p.tag === "New Drop";
    if (filter === "fan") return p.tag === "Fan Favourite";
    return true;
  });

  return (
    <div className="bg-base min-h-screen font-body">
      <Navbar />

      {/* ── Shop Header ── */}
      <section className="pt-14 md:pt-16 border-b border-line">
        {/* Dark panel header */}
        <div className="bg-ink">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-end">
              {/* Left: Headline */}
              <div>
                <RevealText>
                  <p className="font-body text-primary text-[11px] uppercase tracking-[0.2em] mb-4">
                    Est. 2024 · All Drops
                  </p>
                </RevealText>
                <RevealText delay={0.05}>
                  <h1
                    className="font-display font-bold text-bg-primary-soft leading-[1.0] tracking-tight"
                    style={{ fontSize: "clamp(48px, 8vw, 88px)" }}
                  >
                    The Full
                    <br />
                    <span className="text-primary italic">Rack.</span>
                  </h1>
                </RevealText>
              </div>

              {/* Right: Descriptor */}
              <div className="md:pb-3">
                <RevealText delay={0.12}>
                  <p className="font-body text-text-muted text-base leading-relaxed mb-6" style={{ fontSize: "16px" }}>
                    Four tees. Four moods. Each one intentional — no filler, no restock notice, no endless colourways to scroll through. Pick the mood. Wear it.
                  </p>
                </RevealText>
                <RevealText delay={0.18}>
                  <div className="flex items-center gap-2 font-body text-[13px] text-text-muted uppercase tracking-widest">
                    <span>{PRODUCTS.length} pieces in this drop</span>
                    <ArrowRight size={12} />
                  </div>
                </RevealText>
              </div>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-base border-t border-line">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
            <div className="flex items-center gap-0 overflow-x-auto">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`font-body text-[12px] uppercase tracking-widest px-5 py-4 border-r border-line whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary ${
                    filter === f.key
                      ? "bg-primary text-text-primary-ink"
                      : "text-text-muted hover:text-ink hover:bg-bg-surface"
                  }`}
                >
                  {f.label}
                  {f.key !== "all" && (
                    <span className="ml-2 opacity-60">
                      ({PRODUCTS.filter((p) => f.key === "new" ? p.tag === "New Drop" : p.tag === "Fan Favourite").length})
                    </span>
                  )}
                  {f.key === "all" && (
                    <span className="ml-2 opacity-60">({PRODUCTS.length})</span>
                  )}
                </button>
              ))}
              <div className="ml-auto hidden md:flex items-center pl-5 gap-2 text-[12px] font-body text-text-muted uppercase tracking-widest">
                <span>Limited run</span>
                <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                <span>Ships in 3–5 days</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="bg-base">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-12 md:py-16">

          {/* Grid: 2 cols mobile, 4 cols desktop */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="font-display italic text-text-muted text-2xl">Nothing in this filter.</p>
              <button
                onClick={() => setFilter("all")}
                className="mt-6 font-body text-[13px] text-ink uppercase tracking-widest underline underline-offset-4 hover:text-primary transition-colors"
              >
                See all drops
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Editorial Band ── */}
      <section className="bg-bg-surface border-t border-b border-line">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-10 md:py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-body text-[11px] uppercase tracking-[0.2em] text-primary">
                How it works
              </span>
              <p className="font-display font-bold text-ink text-xl md:text-2xl">
                One drop at a time.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-line flex-1 md:ml-16">
              {[
                { step: "01", label: "Pick your mood" },
                { step: "02", label: "One size runs oversized" },
                { step: "03", label: "Add to bag" },
                { step: "04", label: "Ships in 3–5 days" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`px-4 py-4 ${i < 3 ? "border-r border-line" : ""} ${i < 2 ? "border-b md:border-b-0 border-line" : ""}`}
                >
                  <p className="font-body text-[11px] text-primary uppercase tracking-widest mb-1">{item.step}</p>
                  <p className="font-body text-ink text-[13px] leading-snug">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Promise Strip ── */}
      <section className="bg-ink">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <RevealText>
              <h2
                className="font-display font-bold text-bg-primary-soft leading-tight"
                style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
              >
                Worn-in from day one.<br />
                <span className="text-primary italic">No break-in required.</span>
              </h2>
            </RevealText>
            <div className="flex flex-col gap-4 md:max-w-xs">
              <p className="font-body text-text-muted text-[15px] leading-relaxed">
                Every graphic is screen-printed, not sublimated. The washes are pre-washed. The oversize is intentional — it's in the pattern, not just the size.
              </p>
              <Link
                href="/#sizing"
                className="inline-flex items-center gap-2 font-body text-[12px] uppercase tracking-widest text-primary border-b border-primary pb-0.5 hover:opacity-70 transition-opacity w-fit"
              >
                Sizing guide <ArrowRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}