import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: () => null,
  }),
}));

// Mock next/dynamic to avoid MapLibre GL requiring WebGL in tests
vi.mock("next/dynamic", () => ({
  default: () => {
    const MockMap = () => <div data-testid="map-container">INITIALIZING MAP SYSTEM...</div>;
    MockMap.displayName = "DynamicMap";
    return MockMap;
  },
}));

// Mock boot sequence to skip animation in tests
vi.mock("@/components/ui/boot-sequence", () => ({
  BootSequence: ({ onComplete }: { onComplete: () => void }) => {
    // Immediately complete boot in tests
    onComplete();
    return null;
  },
}));

import Home from "../page";

describe("Home page", () => {
  it("renders the main container with dark background", async () => {
    render(<Home />);
    await waitFor(() => {
      const main = document.querySelector("main");
      expect(main).toBeInTheDocument();
      expect(main?.className).toContain("bg-nerv-deep-purple");
    });
  });

  it("renders the map container", async () => {
    render(<Home />);
    await waitFor(() => {
      const mapContainer = screen.getByTestId("map-container");
      expect(mapContainer).toBeInTheDocument();
    });
  });

  it("has a full screen layout", async () => {
    render(<Home />);
    await waitFor(() => {
      const main = document.querySelector("main");
      expect(main?.className).toContain("h-screen");
      expect(main?.className).toContain("w-screen");
    });
  });
});
