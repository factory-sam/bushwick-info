/**
 * Map boundary constraints and visual fade-out effect for Bushwick area.
 *
 * Creates a graduated dark overlay that fades areas outside the core
 * Bushwick neighborhood, producing a smooth vignette-like boundary effect
 * that blends with the deep purple map background.
 */

/**
 * The highlighted/visible area covering Bushwick + parts of
 * Ridgewood (east), northern Bed-Stuy (south), East Williamsburg (northwest),
 * and the Flushing Ave corridor (north).
 */
export const FADE_AREA = {
  north: 40.715,
  south: 40.680,
  east: -73.890,
  west: -73.945,
} as const;

/**
 * Ring definitions for the graduated fade effect.
 * Each ring is a band around the highlighted area with increasing opacity
 * to create a smooth, gradual fade rather than a hard cutoff.
 * Offset is in degrees from the FADE_AREA edges.
 */
export const FADE_RINGS: ReadonlyArray<{ offset: number; opacity: number }> = [
  { offset: 0.0000, opacity: 0.0 },   // Inner edge (transparent)
  { offset: 0.003, opacity: 0.15 },    // Slight darkening
  { offset: 0.006, opacity: 0.30 },    // More visible
  { offset: 0.010, opacity: 0.50 },    // Medium darkness
  { offset: 0.016, opacity: 0.70 },    // Heavy darkness
  { offset: 0.025, opacity: 0.85 },    // Near-opaque
  { offset: 0.050, opacity: 0.95 },    // Outer region — nearly black
] as const;

interface FadeFeature {
  type: "Feature";
  properties: { ring: number };
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
}

interface FadeFeatureCollection {
  type: "FeatureCollection";
  features: FadeFeature[];
}

/**
 * Creates a rectangular ring (band) polygon between an outer and inner rectangle.
 * The polygon is defined as an outer ring with an inner hole.
 */
function createRingPolygon(
  outerBounds: { north: number; south: number; east: number; west: number },
  innerBounds: { north: number; south: number; east: number; west: number }
): number[][][] {
  // Outer ring (counter-clockwise = fill area)
  const outer = [
    [outerBounds.west, outerBounds.south],
    [outerBounds.east, outerBounds.south],
    [outerBounds.east, outerBounds.north],
    [outerBounds.west, outerBounds.north],
    [outerBounds.west, outerBounds.south],
  ];

  // Inner ring (clockwise = hole)
  const inner = [
    [innerBounds.west, innerBounds.south],
    [innerBounds.west, innerBounds.north],
    [innerBounds.east, innerBounds.north],
    [innerBounds.east, innerBounds.south],
    [innerBounds.west, innerBounds.south],
  ];

  return [outer, inner];
}

/**
 * Creates a GeoJSON FeatureCollection of concentric ring polygons that
 * produce a graduated fade effect around the Bushwick highlighted area.
 *
 * Each ring is a band with a `ring` property (0-based index) that maps
 * to increasing opacity. The rings are rendered as separate fill layers
 * or with data-driven opacity based on the ring property.
 */
export function createBoundaryFadeGeoJSON(): FadeFeatureCollection {
  const features: FadeFeature[] = [];

  for (let i = 0; i < FADE_RINGS.length - 1; i++) {
    const outerRing = FADE_RINGS[i + 1]!;
    const innerRing = FADE_RINGS[i]!;

    const outerBounds = {
      north: FADE_AREA.north + outerRing.offset,
      south: FADE_AREA.south - outerRing.offset,
      east: FADE_AREA.east + outerRing.offset,   // Add to expand east (longitude increases eastward)
      west: FADE_AREA.west - outerRing.offset,    // Subtract to expand west (longitude decreases westward)
    };

    const innerBounds = {
      north: FADE_AREA.north + innerRing.offset,
      south: FADE_AREA.south - innerRing.offset,
      east: FADE_AREA.east + innerRing.offset,
      west: FADE_AREA.west - innerRing.offset,
    };

    features.push({
      type: "Feature",
      properties: { ring: i + 1 },
      geometry: {
        type: "Polygon",
        coordinates: createRingPolygon(outerBounds, innerBounds),
      },
    });
  }

  // Add the outermost ring that extends well beyond maxBounds
  // to cover all visible area outside the fade zone
  const lastRing = FADE_RINGS[FADE_RINGS.length - 1]!;
  const outerEdge = 1.0; // ~1 degree beyond in all directions — well past maxBounds

  features.push({
    type: "Feature",
    properties: { ring: FADE_RINGS.length },
    geometry: {
      type: "Polygon",
      coordinates: createRingPolygon(
        {
          north: FADE_AREA.north + outerEdge,
          south: FADE_AREA.south - outerEdge,
          east: FADE_AREA.east + outerEdge,
          west: FADE_AREA.west - outerEdge,
        },
        {
          north: FADE_AREA.north + lastRing.offset,
          south: FADE_AREA.south - lastRing.offset,
          east: FADE_AREA.east + lastRing.offset,
          west: FADE_AREA.west - lastRing.offset,
        }
      ),
    },
  });

  return {
    type: "FeatureCollection",
    features,
  };
}

/**
 * Returns MapLibre style layers for the boundary fade effect.
 * These layers should be added after building layers but before labels
 * in the map style to create the visual boundary while keeping labels readable.
 */
export function createBoundaryFadeLayers(): Array<{
  id: string;
  type: "fill";
  source: string;
  paint: Record<string, unknown>;
  filter: ["==", unknown, unknown];
}> {
  const layers = [];

  // Create individual layers for each ring band with specific opacity
  for (let i = 1; i <= FADE_RINGS.length; i++) {
    const ringDef = i < FADE_RINGS.length ? FADE_RINGS[i]! : { opacity: 0.95 };

    layers.push({
      id: `boundary-fade-ring-${i}`,
      type: "fill" as const,
      source: "boundary-fade",
      paint: {
        "fill-color": "#0a0a1a", // Very dark purple-black that blends with background
        "fill-opacity": ringDef.opacity,
      },
      filter: ["==", ["get", "ring"], i] as ["==", unknown, unknown],
    });
  }

  return layers;
}
