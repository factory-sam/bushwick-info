"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { places } from "@/data/places";

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_MESSAGES = [
  { text: "> INITIALIZING SYSTEMS...", delay: 0 },
  { text: "> LOADING MAP DATA... OK", delay: 400 },
  { text: `> INDEXING ${places.length} LOCATIONS... OK`, delay: 800 },
  { text: "> ESTABLISHING UPLINK... OK", delay: 1200 },
  { text: "> CALIBRATING DISPLAY... OK", delay: 1600 },
  { text: "> SYSTEM READY", delay: 2000 },
];

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [progress, setProgress] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [showAccessGranted, setShowAccessGranted] = useState(false);

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Message reveal timing
    BOOT_MESSAGES.forEach((_, index) => {
      setTimeout(() => {
        setVisibleMessages(index + 1);
      }, BOOT_MESSAGES[index]?.delay ?? 0);
    });

    // Show ACCESS GRANTED
    setTimeout(() => {
      setShowAccessGranted(true);
    }, 2200);

    // Complete and fade out
    setTimeout(() => {
      onComplete();
    }, 2800);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-nerv-deep-purple"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Scanline effect */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)",
          }}
        />

        {/* Hex grid background */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.03]"
          style={{ pointerEvents: "none" }}
        >
          <defs>
            <pattern id="boot-hex" width="56" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
                fill="none"
                stroke="#58F2A5"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#boot-hex)" />
        </svg>

        {/* Main content */}
        <div className="relative z-20 w-full max-w-md px-6">
          {/* Title */}
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1
              className="font-display text-2xl font-bold uppercase tracking-[0.2em] text-nerv-orange md:text-3xl"
              style={{
                textShadow: "0 0 10px #F0903A, 0 0 20px #F0903A, 0 0 30px #F0903A",
              }}
            >
              BUSHWICK
            </h1>
            <p className="mt-2 font-mono text-xs tracking-wider text-nerv-green/70">
              NEIGHBORHOOD DISCOVERY ENGINE
            </p>
          </motion.div>

          {/* Terminal messages */}
          <div className="mb-6 h-40 overflow-hidden rounded border border-nerv-green/30 bg-black/40 p-3 font-mono text-xs">
            {BOOT_MESSAGES.slice(0, visibleMessages).map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`${
                  msg.text.includes("OK")
                    ? "text-nerv-green"
                    : msg.text.includes("READY")
                      ? "text-nerv-orange"
                      : "text-white/70"
                }`}
              >
                {msg.text}
              </motion.div>
            ))}
            <motion.span
              className="inline-block h-3 w-2 bg-nerv-green"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="mb-1 flex justify-between font-mono text-[10px] text-nerv-green/70">
              <span>LOADING</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-sm border border-nerv-green/30 bg-black/40">
              <motion.div
                className="h-full bg-nerv-green"
                style={{
                  width: `${progress}%`,
                  boxShadow: "0 0 10px #58F2A5, 0 0 20px #58F2A5",
                }}
              />
            </div>
          </div>

          {/* ACCESS GRANTED flash */}
          <AnimatePresence>
            {showAccessGranted && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className="font-display text-lg font-bold uppercase tracking-widest text-nerv-green"
                  style={{
                    textShadow: "0 0 10px #58F2A5, 0 0 20px #58F2A5, 0 0 30px #58F2A5",
                  }}
                >
                  ACCESS GRANTED
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Corner decorations */}
        <div className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-nerv-orange/50" />
        <div className="absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-nerv-orange/50" />
        <div className="absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-nerv-orange/50" />
        <div className="absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-nerv-orange/50" />
      </motion.div>
    </AnimatePresence>
  );
}
