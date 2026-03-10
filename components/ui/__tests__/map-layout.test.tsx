import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MapLayout } from "../map-layout";

// Mock all child components
vi.mock("../scanline-overlay", () => ({
  ScanlineOverlay: () => <div data-testid="scanline-overlay" />,
}));
vi.mock("../vignette-overlay", () => ({
  VignetteOverlay: () => <div data-testid="vignette-overlay" />,
}));
vi.mock("../hex-grid-overlay", () => ({
  HexGridOverlay: () => <div data-testid="hex-grid-overlay" />,
}));
vi.mock("../nerv-header", () => ({
  NervHeader: () => <header data-testid="nerv-header" />,
}));
vi.mock("../data-readout", () => ({
  DataReadout: (props: { latitude: number; longitude: number; zoom: number }) => (
    <div data-testid="data-readout" data-lat={props.latitude} data-lng={props.longitude} data-zoom={props.zoom} />
  ),
}));

describe("MapLayout", () => {
  it("renders children (map)", () => {
    render(
      <MapLayout latitude={40.6944} longitude={-73.9213} zoom={15}>
        <div data-testid="map-child">Map</div>
      </MapLayout>
    );
    expect(screen.getByTestId("map-child")).toBeInTheDocument();
  });

  it("renders ScanlineOverlay", () => {
    render(
      <MapLayout latitude={40.6944} longitude={-73.9213} zoom={15}>
        <div>Map</div>
      </MapLayout>
    );
    expect(screen.getByTestId("scanline-overlay")).toBeInTheDocument();
  });

  it("renders VignetteOverlay", () => {
    render(
      <MapLayout latitude={40.6944} longitude={-73.9213} zoom={15}>
        <div>Map</div>
      </MapLayout>
    );
    expect(screen.getByTestId("vignette-overlay")).toBeInTheDocument();
  });

  it("renders HexGridOverlay", () => {
    render(
      <MapLayout latitude={40.6944} longitude={-73.9213} zoom={15}>
        <div>Map</div>
      </MapLayout>
    );
    expect(screen.getByTestId("hex-grid-overlay")).toBeInTheDocument();
  });

  it("renders NervHeader", () => {
    render(
      <MapLayout latitude={40.6944} longitude={-73.9213} zoom={15}>
        <div>Map</div>
      </MapLayout>
    );
    expect(screen.getByTestId("nerv-header")).toBeInTheDocument();
  });

  it("renders DataReadout with correct props", () => {
    render(
      <MapLayout latitude={40.6944} longitude={-73.9213} zoom={15}>
        <div>Map</div>
      </MapLayout>
    );
    const readout = screen.getByTestId("data-readout");
    expect(readout).toBeInTheDocument();
    expect(readout.dataset.lat).toBe("40.6944");
    expect(readout.dataset.lng).toBe("-73.9213");
    expect(readout.dataset.zoom).toBe("15");
  });
});
