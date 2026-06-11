"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-base border-t border-line">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Left: Brand badge + tagline */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <img
                src="/logo.png"
                alt="Threads logo"
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
              <div className="flex flex-col justify-center">
                <span className="font-display font-bold text-ink text-xl leading-none tracking-tight">
                  THREADS
                </span>
                <span
                  className="font-body text-muted mt-1"
                  style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" }}
                >
                  wear what defines you
                </span>
              </div>
            </div>
            <p
              className="font-body text-muted leading-relaxed max-w-[240px]"
              style={{ fontSize: "13px" }}
            >
              Four moods on a rack. Est. 2024. We don't chase trends — we print what lasts.
            </p>
            <span
              className="font-body text-primary mt-1"
              style={{ fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase" }}
            >
              we sell style
            </span>
          </div>

          {/* Centre: Nav links */}
          <div className="flex flex-col gap-1">
            <span
              className="font-body text-muted mb-3"
              style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase" }}
            >
              Navigate
            </span>
            {[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: "Collections", href: "/shop" },
              { label: "About", href: "/" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-body text-ink hover:text-primary transition-colors duration-brand focus-visible:outline-none focus-visible:underline"
                style={{ fontSize: "13px", lineHeight: "32px" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Handles / contact as plain text */}
          <div className="flex flex-col gap-1">
            <span
              className="font-body text-muted mb-3"
              style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase" }}
            >
              Find Us
            </span>
            {[
              { label: "@threads.wear", href: "#" },
              { label: "@threads.daily", href: "#" },
              { label: "hello@threads.in", href: "mailto:hello@threads.in" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-body text-ink hover:text-primary transition-colors duration-brand focus-visible:outline-none focus-visible:underline inline-flex items-center gap-1 group"
                style={{ fontSize: "13px", lineHeight: "32px" }}
                aria-label={item.label}
              >
                <ArrowRight
                  size={12}
                  className="text-muted group-hover:text-primary transition-colors duration-brand"
                  aria-hidden="true"
                />
                {item.label}
              </a>
            ))}
          </div>

        </div>

        {/* Bottom rule */}
        <div className="mt-16 pt-8 border-t border-line flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <span
            className="font-body text-muted"
            style={{ fontSize: "13px" }}
          >
            © 2024 Threads. All drops reserved.
          </span>
          <span
            className="font-body text-muted"
            style={{ fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            Wear it. Mean it.
          </span>
        </div>
      </div>
    </footer>
  );
}