import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Track the last props passed to Map
let lastMapProps: Record<string, unknown> = {};

// Mock react-map-gl/maplibre since it requires WebGL
vi.mock("react-map-gl/maplibre", () => ({
  default: vi.fn(({ children, style, ...props }: Record<string, unknown>) => {
    lastMapProps = props;
    return (
      <div
        data-testid="mock-maplibre"
        data-min-zoom={props.minZoom}
        data-max-zoom={props.maxZoom}
        data-has-max-bounds={props.maxBounds ? "true" : "false"}
        style={style as React.CSSProperties}
      >
        {children as React.ReactNode}
      </div>
    );
  }),
  NavigationControl: vi.fn(() => <div data-testid="nav-control" />),
  Source: vi.fn(({ children, id }: Record<string, unknown>) => (
    <div data-testid={`source-${id}`}>{children as React.ReactNode}</div>
  )),
  Layer: vi.fn(({ id }: Record<string, unknown>) => (
    <div data-testid={`layer-${id}`} />
  )),
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

  it("passes maxBounds to the Map component", () => {
    render(<MapView />);
    const map = screen.getByTestId("mock-maplibre");
    expect(map.dataset.hasMaxBounds).toBe("true");
    // Verify the actual bounds array structure
    expect(lastMapProps.maxBounds).toBeDefined();
    const bounds = lastMapProps.maxBounds as [readonly [number, number], readonly [number, number]];
    expect(bounds[0]).toEqual(MAP_BOUNDS.maxBounds.sw);
    expect(bounds[1]).toEqual(MAP_BOUNDS.maxBounds.ne);
  });

  it("renders NavigationControl", () => {
    render(<MapView />);
    const navControl = screen.getByTestId("nav-control");
    expect(navControl).toBeInTheDocument();
  });

  it("renders boundary fade source and layers", () => {
    render(<MapView />);
    const fadeSource = screen.getByTestId("source-boundary-fade");
    expect(fadeSource).toBeInTheDocument();
    // Should have multiple fade ring layers
    const fadeLayer = screen.getByTestId("layer-boundary-fade-ring-1");
    expect(fadeLayer).toBeInTheDocument();
  });

  it("accepts an onMove callback", () => {
    const mockOnMove = vi.fn();
    render(<MapView onMove={mockOnMove} />);
    // The component should render without error when onMove is provided
    const container = screen.getByTestId("map-container");
    expect(container).toBeInTheDocument();
  });
});
