import { describe, it, expect } from "vitest";
import {
  MAP_BOUNDS,
  BUSHWICK_CENTER,
} from "../map-style";
import {
  FADE_AREA,
  createBoundaryFadeGeoJSON,
  FADE_RINGS,
} from "../map-bounds";

describe("MAP_BOUNDS maxBounds", () => {
  it("has maxBounds defined with sw and ne corners", () => {
    expect(MAP_BOUNDS.maxBounds).toBeDefined();
    expect(MAP_BOUNDS.maxBounds).toHaveProperty("sw");
    expect(MAP_BOUNDS.maxBounds).toHaveProperty("ne");
  });

  it("maxBounds sw corner is south-west of Bushwick center", () => {
    expect(MAP_BOUNDS.maxBounds.sw[0]).toBeLessThan(BUSHWICK_CENTER.longitude);
    expect(MAP_BOUNDS.maxBounds.sw[1]).toBeLessThan(BUSHWICK_CENTER.latitude);
  });

  it("maxBounds ne corner is north-east of Bushwick center", () => {
    expect(MAP_BOUNDS.maxBounds.ne[0]).toBeGreaterThan(BUSHWICK_CENTER.longitude);
    expect(MAP_BOUNDS.maxBounds.ne[1]).toBeGreaterThan(BUSHWICK_CENTER.latitude);
  });

  it("maxBounds covers approximately North ~40.720, South ~40.675, East ~-73.885, West ~-73.950", () => {
    const { sw, ne } = MAP_BOUNDS.maxBounds;
    // SW: [lng, lat]
    expect(sw[1]).toBeCloseTo(40.675, 1); // South ~40.675
    expect(sw[0]).toBeCloseTo(-73.950, 1); // West ~-73.950
    // NE: [lng, lat]
    expect(ne[1]).toBeCloseTo(40.720, 1); // North ~40.720
    expect(ne[0]).toBeCloseTo(-73.885, 1); // East ~-73.885
  });
});

describe("FADE_AREA", () => {
  it("defines the highlighted area bounds", () => {
    expect(FADE_AREA).toBeDefined();
    expect(FADE_AREA).toHaveProperty("north");
    expect(FADE_AREA).toHaveProperty("south");
    expect(FADE_AREA).toHaveProperty("east");
    expect(FADE_AREA).toHaveProperty("west");
  });

  it("highlighted area covers Bushwick + neighboring areas", () => {
    expect(FADE_AREA.north).toBeCloseTo(40.715, 2);
    expect(FADE_AREA.south).toBeCloseTo(40.680, 2);
    expect(FADE_AREA.east).toBeCloseTo(-73.890, 2);
    expect(FADE_AREA.west).toBeCloseTo(-73.945, 2);
  });

  it("highlighted area is within maxBounds", () => {
    const { sw, ne } = MAP_BOUNDS.maxBounds;
    expect(FADE_AREA.south).toBeGreaterThan(sw[1]);
    expect(FADE_AREA.north).toBeLessThan(ne[1]);
    expect(FADE_AREA.west).toBeGreaterThan(sw[0]);
    expect(FADE_AREA.east).toBeLessThan(ne[0]);
  });
});

describe("createBoundaryFadeGeoJSON", () => {
  it("returns a valid GeoJSON FeatureCollection", () => {
    const geojson = createBoundaryFadeGeoJSON();
    expect(geojson.type).toBe("FeatureCollection");
    expect(Array.isArray(geojson.features)).toBe(true);
    expect(geojson.features.length).toBeGreaterThan(0);
  });

  it("contains polygon features for the fade overlay", () => {
    const geojson = createBoundaryFadeGeoJSON();
    for (const feature of geojson.features) {
      expect(feature.type).toBe("Feature");
      expect(feature.geometry.type).toBe("Polygon");
      expect(Array.isArray(feature.geometry.coordinates)).toBe(true);
    }
  });

  it("each feature has a ring property for graduated opacity", () => {
    const geojson = createBoundaryFadeGeoJSON();
    for (const feature of geojson.features) {
      expect(feature.properties).toHaveProperty("ring");
      expect(typeof feature.properties.ring).toBe("number");
    }
  });
});

describe("FADE_RINGS", () => {
  it("defines ring configurations for graduated fade", () => {
    expect(Array.isArray(FADE_RINGS)).toBe(true);
    expect(FADE_RINGS.length).toBeGreaterThanOrEqual(3);
  });

  it("each ring has offset and opacity", () => {
    for (const ring of FADE_RINGS) {
      expect(ring).toHaveProperty("offset");
      expect(ring).toHaveProperty("opacity");
      expect(typeof ring.offset).toBe("number");
      expect(typeof ring.opacity).toBe("number");
    }
  });

  it("opacity increases with ring offset (more opaque further out)", () => {
    for (let i = 1; i < FADE_RINGS.length; i++) {
      expect(FADE_RINGS[i]!.opacity).toBeGreaterThanOrEqual(FADE_RINGS[i - 1]!.opacity);
    }
  });
});
