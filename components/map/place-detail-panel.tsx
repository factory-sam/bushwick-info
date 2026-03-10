"use client";

import { motion, AnimatePresence } from "motion/react";
import type { Place } from "@/data/places";
import { CATEGORIES } from "@/data/places";

export interface PlaceDetailPanelProps {
  place: Place | null;
  onClose: () => void;
}

/**
 * EVA-styled detail panel showing selected place information.
 * Side panel on desktop (slides from right), bottom sheet on mobile (slides up).
 * Features clip-path angled corners, neon glow border, Framer Motion slide-in.
 */
export function PlaceDetailPanel({ place, onClose }: PlaceDetailPanelProps) {
  return (
    <AnimatePresence>
      {place && (
        <>
          {/* Mobile: bottom sheet sliding up from bottom */}
          <motion.div
            key={`mobile-${place.id}`}
            data-testid="place-detail-panel"
            className="fixed inset-x-0 bottom-0 z-30 md:hidden"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              duration: 0.4,
            }}
          >
            <div
              className="relative max-h-[70vh] border-t border-nerv-orange/60 bg-nerv-deep-purple/95 backdrop-blur-md"
              style={{
                boxShadow:
                  "0 -2px 10px rgba(240,144,58,0.3), 0 -4px 20px rgba(240,144,58,0.15), inset 0 2px 10px rgba(240,144,58,0.1)",
                clipPath:
                  "polygon(0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
              }}
            >
              {/* Drag handle indicator for bottom sheet */}
              <div className="flex justify-center pt-2 pb-1">
                <div className="h-1 w-10 rounded-full bg-nerv-orange/40" />
              </div>

              {/* Top accent line */}
              <div
                className="h-1 w-full"
                style={{
                  background: `linear-gradient(90deg, ${CATEGORIES[place.category].color}, transparent)`,
                }}
              />

              {/* Close button */}
              <button
                onClick={onClose}
                data-testid="detail-panel-close"
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center border border-nerv-orange/40 font-mono text-sm text-nerv-orange transition-colors hover:border-nerv-orange hover:bg-nerv-orange/10"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                }}
                aria-label="Close detail panel"
              >
                ✕
              </button>

              {/* Content */}
              <div className="overflow-y-auto p-4 pt-2" style={{ maxHeight: "calc(70vh - 40px)" }}>
                <DetailContent place={place} />
              </div>
            </div>
          </motion.div>

          {/* Desktop: side panel sliding from right */}
          <motion.div
            key={`desktop-${place.id}`}
            data-testid="place-detail-panel-desktop"
            className="fixed right-0 top-0 z-30 hidden h-full w-96 md:block"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              duration: 0.4,
            }}
          >
            <div
              className="relative h-full border-l border-nerv-orange/60 bg-nerv-deep-purple/95 backdrop-blur-md"
              style={{
                boxShadow:
                  "-2px 0 10px rgba(240,144,58,0.3), -4px 0 20px rgba(240,144,58,0.15), inset 2px 0 10px rgba(240,144,58,0.1)",
                clipPath:
                  "polygon(16px 0, 100% 0, 100% 100%, 0 100%, 0 16px)",
              }}
            >
              {/* Top accent line */}
              <div
                className="h-1 w-full"
                style={{
                  background: `linear-gradient(90deg, ${CATEGORIES[place.category].color}, transparent)`,
                }}
              />

              {/* Close button */}
              <button
                onClick={onClose}
                data-testid="detail-panel-close-desktop"
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center border border-nerv-orange/40 font-mono text-sm text-nerv-orange transition-colors hover:border-nerv-orange hover:bg-nerv-orange/10"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                }}
                aria-label="Close detail panel"
              >
                ✕
              </button>

              {/* Content */}
              <div className="overflow-y-auto p-6 pt-5" style={{ maxHeight: "calc(100vh - 4px)" }}>
                <DetailContent place={place} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/** Shared detail content for both mobile bottom sheet and desktop side panel */
function DetailContent({ place }: { place: Place }) {
  return (
    <>
      {/* Category badge */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span
          className="inline-block border px-2.5 py-0.5 font-mono text-xs uppercase tracking-wider"
          data-testid="detail-category-badge"
          style={{
            color: CATEGORIES[place.category].color,
            borderColor: CATEGORIES[place.category].color,
            boxShadow: `0 0 4px ${CATEGORIES[place.category].color}40`,
            clipPath:
              "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
          }}
        >
          {CATEGORIES[place.category].name}
        </span>
      </motion.div>

      {/* Place name */}
      <motion.h2
        className="mt-3 font-display text-lg font-bold uppercase tracking-wide text-white md:text-2xl"
        data-testid="detail-place-name"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
        style={{
          textShadow: `0 0 10px ${CATEGORIES[place.category].color}60`,
        }}
      >
        {place.name}
      </motion.h2>

      {/* Description */}
      <motion.p
        className="mt-2 font-body text-sm leading-relaxed text-white/80 md:mt-3 md:text-base"
        data-testid="detail-description"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        {place.description}
      </motion.p>

      {/* Divider */}
      <motion.div
        className="my-3 h-px md:my-4"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.25, duration: 0.3 }}
        style={{
          background: `linear-gradient(90deg, ${CATEGORIES[place.category].color}60, transparent)`,
          transformOrigin: "left",
        }}
      />

      {/* Info fields */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* Address */}
        <InfoField
          label="LOCATION"
          value={place.address}
          color={CATEGORIES[place.category].color}
        />

        {/* Hours — only shown when present */}
        {place.hours && (
          <InfoField
            label="HOURS"
            value={place.hours}
            color={CATEGORIES[place.category].color}
          />
        )}

        {/* Website — only shown when present */}
        {place.website && (
          <div>
            <div
              className="font-mono text-xs uppercase tracking-wider"
              style={{ color: `${CATEGORIES[place.category].color}80` }}
            >
              LINK
            </div>
            <a
              href={place.website}
              target="_blank"
              rel="noopener"
              data-testid="detail-website-link"
              className="mt-0.5 block font-body text-sm underline decoration-dotted underline-offset-2 transition-colors hover:decoration-solid"
              style={{
                color: CATEGORIES[place.category].color,
                textDecorationColor: `${CATEGORIES[place.category].color}60`,
              }}
            >
              {formatUrl(place.website)}
            </a>
          </div>
        )}
      </motion.div>

      {/* Bottom coords readout */}
      <motion.div
        className="mt-4 font-mono text-xs tracking-wider md:mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        style={{
          color: `${CATEGORIES[place.category].color}50`,
        }}
      >
        {place.lat.toFixed(4)}°N {Math.abs(place.lng).toFixed(4)}°W
      </motion.div>
    </>
  );
}

function InfoField({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <div
        className="font-mono text-xs uppercase tracking-wider"
        style={{ color: `${color}80` }}
      >
        {label}
      </div>
      <div className="mt-0.5 font-body text-sm text-white/90">{value}</div>
    </div>
  );
}

/** Strip protocol and trailing slash from URL for display */
function formatUrl(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
