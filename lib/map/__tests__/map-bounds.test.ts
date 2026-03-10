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

describe("createBoundaryFadeGeoJSON ring geometry expands outward", () => {
  it("each ring band outer bounds expand beyond inner bounds in all directions", () => {
    const geojson = createBoundaryFadeGeoJSON();

    // For each ring feature (except the outermost catch-all), verify
    // the outer rectangle is strictly larger than the inner rectangle.
    // Each polygon has coordinates[0] = outer ring, coordinates[1] = inner hole.
    for (const feature of geojson.features) {
      const [outerCoords, innerCoords] = feature.geometry.coordinates;

      // Extract bounding box from coordinate arrays
      // Outer ring coords: [west,south], [east,south], [east,north], [west,north], [west,south]
      const outerWest = outerCoords![0]![0]!;
      const outerSouth = outerCoords![0]![1]!;
      const outerEast = outerCoords![1]![0]!;
      const outerNorth = outerCoords![2]![1]!;

      // Inner ring coords: [west,south], [west,north], [east,north], [east,south], [west,south]
      const innerWest = innerCoords![0]![0]!;
      const innerSouth = innerCoords![0]![1]!;
      const innerEast = innerCoords![2]![0]!;
      const innerNorth = innerCoords![1]![1]!;

      // Outer east must be greater than inner east (expanding eastward)
      expect(outerEast).toBeGreaterThan(innerEast);
      // Outer west must be less than inner west (expanding westward)
      expect(outerWest).toBeLessThan(innerWest);
      // Outer north must be greater than inner north (expanding northward)
      expect(outerNorth).toBeGreaterThan(innerNorth);
      // Outer south must be less than inner south (expanding southward)
      expect(outerSouth).toBeLessThan(innerSouth);
    }
  });

  it("fade rings expand concentrically (each ring wider than the previous)", () => {
    const geojson = createBoundaryFadeGeoJSON();
    const features = geojson.features;

    for (let i = 1; i < features.length; i++) {
      const prevOuter = features[i - 1]!.geometry.coordinates[0]!;
      const currOuter = features[i]!.geometry.coordinates[0]!;

      // Current outer east >= previous outer east
      expect(currOuter[1]![0]!).toBeGreaterThanOrEqual(prevOuter[1]![0]!);
      // Current outer west <= previous outer west
      expect(currOuter[0]![0]!).toBeLessThanOrEqual(prevOuter[0]![0]!);
      // Current outer north >= previous outer north
      expect(currOuter[2]![1]!).toBeGreaterThanOrEqual(prevOuter[2]![1]!);
      // Current outer south <= previous outer south
      expect(currOuter[0]![1]!).toBeLessThanOrEqual(prevOuter[0]![1]!);
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
