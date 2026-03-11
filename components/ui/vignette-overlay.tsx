/**
 * CRT vignette overlay that darkens screen edges.
 * Uses a radial-gradient from transparent center to dark Terminal Black edges.
 * pointer-events: none ensures the map remains interactive.
 */
export function VignetteOverlay() {
  return <div className="crt-vignette pointer-events-none fixed inset-0 z-10" aria-hidden="true" />;
}
