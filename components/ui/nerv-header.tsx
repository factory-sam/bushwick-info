"use client";

import { motion } from "motion/react";

/**
 * NERV-styled header panel with app title.
 * Features clip-path angled corners, NERV Orange neon glow border,
 * dark semi-transparent background with backdrop-blur.
 * Framer Motion entrance animation (opacity 0→1, translateX -20→0).
 */
export function NervHeader() {
  return (
    <motion.header
      data-testid="nerv-header"
      className="fixed top-4 left-4 right-4 z-20 md:left-6 md:right-auto md:top-6"
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
          boxShadow:
            "0 0 5px #F0903A, 0 0 10px #F0903A, inset 0 0 5px rgba(240,144,58,0.3)",
          clipPath:
            "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
        }}
      >
        <h1 className="font-display text-sm font-bold uppercase tracking-widest text-nerv-orange md:text-lg">
          BUSHWICK // MAP
        </h1>
      </div>
    </motion.header>
  );
}
