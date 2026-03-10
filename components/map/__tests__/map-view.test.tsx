import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock react-map-gl/maplibre since it requires WebGL
vi.mock("react-map-gl/maplibre", () => ({
  default: vi.fn(({ children, style, ...props }: Record<string, unknown>) => (
    <div
      data-testid="mock-maplibre"
      data-min-zoom={props.minZoom}
      data-max-zoom={props.maxZoom}
      style={style as React.CSSProperties}
    >
      {children as React.ReactNode}
    </div>
  )),
  NavigationControl: vi.fn(() => <div data-testid="nav-control" />),
}));

// Mock CSS imports
vi.mock("maplibre-gl/dist/maplibre-gl.css", () => ({}));
vi.mock("../map-controls.css", () => ({}));

import MapView from "../map-view";
import { MAP_BOUNDS } from "@/lib/map/map-style";

describe("MapView component", () => {
  it("renders the map container", () => {
    render(<MapView />);
    const container = screen.getByTestId("map-container");
    expect(container).toBeInTheDocument();
  });

  it("renders a MapLibre map", () => {
    render(<MapView />);
    const map = screen.getByTestId("mock-maplibre");
    expect(map).toBeInTheDocument();
  });

  it("sets minZoom and maxZoom bounds", () => {
    render(<MapView />);
    const map = screen.getByTestId("mock-maplibre");
    expect(map.dataset.minZoom).toBe(String(MAP_BOUNDS.minZoom));
    expect(map.dataset.maxZoom).toBe(String(MAP_BOUNDS.maxZoom));
  });

  it("renders NavigationControl", () => {
    render(<MapView />);
    const navControl = screen.getByTestId("nav-control");
    expect(navControl).toBeInTheDocument();
  });

  it("accepts an onMove callback", () => {
    const mockOnMove = vi.fn();
    render(<MapView onMove={mockOnMove} />);
    // The component should render without error when onMove is provided
    const container = screen.getByTestId("map-container");
    expect(container).toBeInTheDocument();
  });
});
