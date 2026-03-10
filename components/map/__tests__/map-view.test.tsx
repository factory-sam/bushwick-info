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
        data-attribution-control={
          props.attributionControl !== false && props.attributionControl !== undefined
            ? "enabled"
            : "disabled"
        }
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
  Layer: vi.fn(({ id, beforeId }: Record<string, unknown>) => (
    <div data-testid={`layer-${id}`} data-before-id={beforeId ?? ""} />
  )),
  Marker: vi.fn(({ children, longitude, latitude }: Record<string, unknown>) => (
    <div data-testid={`marker-${longitude}-${latitude}`}>{children as React.ReactNode}</div>
  )),
}));

// Mock CSS imports
vi.mock("maplibre-gl/dist/maplibre-gl.css", () => ({}));
vi.mock("../map-controls.css", () => ({}));
vi.mock("../targeting-reticle.css", () => ({}));

// Mock motion/react to avoid Framer Motion issues in tests
vi.mock("motion/react", () => ({
  motion: {
    div: vi.fn(({ children, ...props }: Record<string, unknown>) => (
      <div {...filterMotionProps(props)}>{children as React.ReactNode}</div>
    )),
    header: vi.fn(({ children, ...props }: Record<string, unknown>) => (
      <header {...filterMotionProps(props)}>{children as React.ReactNode}</header>
    )),
    h2: vi.fn(({ children, ...props }: Record<string, unknown>) => (
      <h2 {...filterMotionProps(props)}>{children as React.ReactNode}</h2>
    )),
    p: vi.fn(({ children, ...props }: Record<string, unknown>) => (
      <p {...filterMotionProps(props)}>{children as React.ReactNode}</p>
    )),
  },
  AnimatePresence: vi.fn(({ children }: Record<string, unknown>) => (
    <>{children as React.ReactNode}</>
  )),
}));

function filterMotionProps(props: Record<string, unknown>): Record<string, unknown> {
  const filtered: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    if (!["initial", "animate", "exit", "transition", "whileHover", "whileTap", "key"].includes(key)) {
      filtered[key] = value;
    }
  }
  return filtered;
}

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

  it("enables attribution control for ODbL license compliance", () => {
    render(<MapView />);
    const map = screen.getByTestId("mock-maplibre");
    expect(map.dataset.attributionControl).toBe("enabled");
    // Verify it's an options object (compact mode), not just true
    expect(lastMapProps.attributionControl).toEqual({ compact: true });
  });

  it("renders place markers for all places", () => {
    render(<MapView />);
    // Markers should be rendered inside the map
    const map = screen.getByTestId("mock-maplibre");
    expect(map).toBeInTheDocument();
    // Each place should have a marker with aria-label
    // Filter buttons (6) + marker buttons (21) = at least 27 total buttons
    const markerButtons = screen.getAllByRole("button");
    expect(markerButtons.length).toBeGreaterThanOrEqual(21 + 6);
  });

  it("renders the category filter bar", () => {
    render(<MapView />);
    expect(screen.getByTestId("category-filter-bar")).toBeInTheDocument();
  });

  it("renders the search bar", () => {
    render(<MapView />);
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
  });

  it("positions fade layers below text labels via beforeId", () => {
    render(<MapView />);
    const fadeLayer = screen.getByTestId("layer-boundary-fade-ring-1");
    expect(fadeLayer).toBeInTheDocument();
    expect(fadeLayer.dataset.beforeId).toBe("water_name_point_label");
  });
});
