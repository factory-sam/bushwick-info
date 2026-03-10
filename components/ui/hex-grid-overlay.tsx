/**
 * SVG hexagonal grid pattern overlay.
 * Renders at 5-8% opacity in Entry Plug Green (#58F2A5).
 * pointer-events: none ensures the map remains interactive.
 */
export function HexGridOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10" aria-hidden="true">
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0, opacity: 0.06 }}
      >
        <defs>
          <pattern
            id="hexagons"
            width="56"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
              fill="none"
              stroke="#58F2A5"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    </div>
  );
}
