import { ScanlineOverlay } from "./scanline-overlay";
import { VignetteOverlay } from "./vignette-overlay";
import { HexGridOverlay } from "./hex-grid-overlay";
import { NervHeader } from "./nerv-header";
import { DataReadout } from "./data-readout";

export interface MapLayoutProps {
  children: React.ReactNode;
  latitude: number;
  longitude: number;
  zoom: number;
}

/**
 * Composes all UI chrome overlays + header + data readout
 * around the map view. All decorative overlays use pointer-events:none
 * so the map remains fully interactive beneath them.
 */
export function MapLayout({ children, latitude, longitude, zoom }: MapLayoutProps) {
  return (
    <>
      {children}
      <ScanlineOverlay />
      <VignetteOverlay />
      <HexGridOverlay />
      <NervHeader />
      <DataReadout latitude={latitude} longitude={longitude} zoom={zoom} />
    </>
  );
}
