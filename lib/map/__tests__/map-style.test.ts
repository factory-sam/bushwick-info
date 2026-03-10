import { describe, it, expect } from "vitest";
import { createDarkMapStyle, BUSHWICK_CENTER, DEFAULT_VIEW_STATE, MAP_BOUNDS } from "../map-style";

describe("createDarkMapStyle", () => {
  it("returns a valid MapLibre style object", () => {
    const style = createDarkMapStyle();
    expect(style).toBeDefined();
    expect(style.version).toBe(8);
    expect(style.sources).toBeDefined();
    expect(style.layers).toBeDefined();
    expect(Array.isArray(style.layers)).toBe(true);
  });

  it("uses OpenFreeMap sources", () => {
    const style = createDarkMapStyle();
    expect(style.sources).toHaveProperty("openmaptiles");
    const source = style.sources["openmaptiles"] as { type: string; url: string };
    expect(source.type).toBe("vector");
    expect(source.url).toBe("https://tiles.openfreemap.org/planet");
  });

  it("has a deep purple background layer", () => {
    const style = createDarkMapStyle();
    const bgLayer = style.layers.find((l) => l.id === "background");
    expect(bgLayer).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((bgLayer as any).paint["background-color"]).toBe("#1D1D3A");
  });

  it("has dark blue water layer", () => {
    const style = createDarkMapStyle();
    const waterLayer = style.layers.find((l) => l.id === "water");
    expect(waterLayer).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((waterLayer as any).paint["fill-color"]).toBe("#001a2c");
  });

  it("has dark green park layer", () => {
    const style = createDarkMapStyle();
    const parkLayer = style.layers.find((l) => l.id === "park");
    expect(parkLayer).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((parkLayer as any).paint["fill-color"]).toBe("#0a2a1a");
  });

  it("includes 3D building fill-extrusion layer", () => {
    const style = createDarkMapStyle();
    const buildingLayer = style.layers.find((l) => l.id === "building-3d-dark");
    expect(buildingLayer).toBeDefined();
    expect(buildingLayer?.type).toBe("fill-extrusion");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((buildingLayer as any)["source-layer"]).toBe("building");
  });

  it("building layer uses height-driven color interpolation", () => {
    const style = createDarkMapStyle();
    const buildingLayer = style.layers.find((l) => l.id === "building-3d-dark");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const color = (buildingLayer as any).paint["fill-extrusion-color"];
    expect(Array.isArray(color)).toBe(true);
    // Should be an interpolation expression
    expect(color[0]).toBe("interpolate");
  });

  it("building layer has opacity 0.85", () => {
    const style = createDarkMapStyle();
    const buildingLayer = style.layers.find((l) => l.id === "building-3d-dark");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((buildingLayer as any).paint["fill-extrusion-opacity"]).toBe(0.85);
  });

  it("includes major road layers with NERV Orange color", () => {
    const style = createDarkMapStyle();
    const majorRoad = style.layers.find((l) => l.id === "road_trunk_primary");
    expect(majorRoad).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((majorRoad as any).paint["line-color"]).toBe("#F0903A");
  });

  it("includes minor road layers with dim MAGI Blue", () => {
    const style = createDarkMapStyle();
    const minorRoad = style.layers.find((l) => l.id === "road_minor");
    expect(minorRoad).toBeDefined();
    // Should use MAGI Blue at 40% opacity
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((minorRoad as any).paint["line-color"]).toBe("rgba(84, 162, 212, 0.4)");
  });

  it("has glyphs URL for font rendering", () => {
    const style = createDarkMapStyle();
    expect(style.glyphs).toBeDefined();
    expect(style.glyphs).toContain("openfreemap.org");
  });

  it("has sprite URL for symbols", () => {
    const style = createDarkMapStyle();
    expect(style.sprite).toBeDefined();
    expect(String(style.sprite)).toContain("openfreemap.org");
  });
});

describe("BUSHWICK_CENTER", () => {
  it("has correct latitude", () => {
    expect(BUSHWICK_CENTER.latitude).toBe(40.6944);
  });

  it("has correct longitude", () => {
    expect(BUSHWICK_CENTER.longitude).toBe(-73.9213);
  });
});

describe("DEFAULT_VIEW_STATE", () => {
  it("has center on Bushwick", () => {
    expect(DEFAULT_VIEW_STATE.latitude).toBe(40.6944);
    expect(DEFAULT_VIEW_STATE.longitude).toBe(-73.9213);
  });

  it("has zoom level 15", () => {
    expect(DEFAULT_VIEW_STATE.zoom).toBe(15);
  });

  it("has pitch ~50", () => {
    expect(DEFAULT_VIEW_STATE.pitch).toBe(50);
  });

  it("has bearing ~-15", () => {
    expect(DEFAULT_VIEW_STATE.bearing).toBe(-15);
  });
});

describe("MAP_BOUNDS", () => {
  it("has minZoom 12", () => {
    expect(MAP_BOUNDS.minZoom).toBe(12);
  });

  it("has maxZoom 18", () => {
    expect(MAP_BOUNDS.maxZoom).toBe(18);
  });
});
