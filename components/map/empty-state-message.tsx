"use client";

/**
 * Displayed when all category filters are toggled off.
 * Cyberpunk-styled centered message over the map.
 */
export function EmptyStateMessage() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
      data-testid="empty-state-message"
    >
      <div
        className="border border-nerv-orange/40 bg-nerv-deep-purple/80 px-6 py-4 text-center backdrop-blur-sm"
        style={{
          clipPath:
            "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
          boxShadow: "0 0 8px rgba(240, 144, 58, 0.2), 0 0 16px rgba(240, 144, 58, 0.1)",
        }}
      >
        <div className="font-mono text-sm uppercase tracking-widest text-nerv-orange">
          NO TARGETS IN RANGE
        </div>
        <div className="mt-1 font-mono text-xs tracking-wider text-nerv-orange/50">
          ENABLE CATEGORY FILTERS TO DISPLAY
        </div>
      </div>
    </div>
  );
}
