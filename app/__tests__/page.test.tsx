import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// Mock next/dynamic to avoid MapLibre GL requiring WebGL in tests
vi.mock("next/dynamic", () => ({
  default: () => {
    const MockMap = () => (
      <div data-testid="map-container">INITIALIZING MAP SYSTEM...</div>
    );
    MockMap.displayName = "DynamicMap";
    return MockMap;
  },
}));

import Home from "../page";

describe("Home page", () => {
  it("renders the main container with dark background", () => {
    render(<Home />);
    const main = document.querySelector("main");
    expect(main).toBeInTheDocument();
    expect(main?.className).toContain("bg-nerv-deep-purple");
  });

  it("renders the map container", () => {
    render(<Home />);
    const mapContainer = screen.getByTestId("map-container");
    expect(mapContainer).toBeInTheDocument();
  });

  it("has a full screen layout", () => {
    render(<Home />);
    const main = document.querySelector("main");
    expect(main?.className).toContain("h-screen");
    expect(main?.className).toContain("w-screen");
  });
});
