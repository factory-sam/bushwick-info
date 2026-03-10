/**
 * Data readout panel showing lat/lng and zoom level from map.
 * Uses Share Tech Mono font, Entry Plug Green (#58F2A5) text with neon text-shadow.
 * Updates continuously during map movement.
 * Clip-path angled corners with dark panel styling.
 */

export interface DataReadoutProps {
  latitude: number;
  longitude: number;
  zoom: number;
}

export function DataReadout({ latitude, longitude, zoom }: DataReadoutProps) {
  return (
    <div
      data-testid="data-readout"
      className="fixed bottom-4 left-4 z-20 font-mono md:bottom-6 md:left-6"
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
      }}
    >
      <div
        className="border border-nerv-green/40 bg-nerv-deep-purple/80 px-3 py-2 backdrop-blur-md md:px-4 md:py-2.5"
        style={{
          boxShadow:
            "0 0 5px rgba(88,242,165,0.3), 0 0 10px rgba(88,242,165,0.15), inset 0 0 5px rgba(88,242,165,0.1)",
          clipPath:
            "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
        }}
      >
        <div className="space-y-0.5 text-xs text-nerv-green md:text-sm">
          <div
            style={{
              textShadow: "0 0 7px #58F2A5, 0 0 10px #58F2A5, 0 0 21px #58F2A5",
            }}
          >
            <span className="text-nerv-green/60">LAT </span>
            <span>{latitude.toFixed(4)}</span>
          </div>
          <div
            style={{
              textShadow: "0 0 7px #58F2A5, 0 0 10px #58F2A5, 0 0 21px #58F2A5",
            }}
          >
            <span className="text-nerv-green/60">LNG </span>
            <span>{longitude.toFixed(4)}</span>
          </div>
          <div
            style={{
              textShadow: "0 0 7px #58F2A5, 0 0 10px #58F2A5, 0 0 21px #58F2A5",
            }}
          >
            <span className="text-nerv-green/60">ZOOM </span>
            <span>{zoom.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
