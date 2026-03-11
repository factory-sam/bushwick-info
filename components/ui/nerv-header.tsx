"use client";

import Link from "next/link";
import { motion } from "motion/react";

/**
 * Cyberpunk-styled header panel with app title and directory link.
 * Features clip-path angled corners, neon glow border,
 * dark semi-transparent background with backdrop-blur.
 * Framer Motion entrance animation (opacity 0→1, translateX -20→0).
 */
export function NervHeader() {
  return (
    <motion.header
      data-testid="nerv-header"
      className="fixed left-4 right-4 top-4 z-20 md:left-6 md:right-auto md:top-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 400, damping: 30 }}
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
      }}
    >
      <div
        className="border border-nerv-orange bg-nerv-deep-purple/80 px-4 py-2.5 backdrop-blur-md md:px-6 md:py-3"
        style={{
          boxShadow: "0 0 5px #F0903A, 0 0 10px #F0903A, inset 0 0 5px rgba(240,144,58,0.3)",
          clipPath:
            "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-display text-sm font-bold uppercase tracking-widest text-nerv-orange md:text-lg">
            BUSHWICK // MAP
          </h1>
          <Link
            href="/places"
            className="font-mono text-[10px] uppercase tracking-wider text-nerv-green transition-colors hover:text-nerv-green/80 md:text-xs"
            style={{
              textShadow: "0 0 7px #58F2A5, 0 0 10px #58F2A5",
            }}
          >
            [DIRECTORY]
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
