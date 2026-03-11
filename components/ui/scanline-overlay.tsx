/**
 * Fullscreen scanline overlay effect.
 * Creates horizontal CRT-style scan lines across the viewport.
 * Uses CSS ::after pseudo-element with repeating-linear-gradient.
 * pointer-events: none ensures the map remains interactive.
 */
export function ScanlineOverlay() {
  return <div className="scanlines pointer-events-none fixed inset-0 z-10" aria-hidden="true" />;
}
