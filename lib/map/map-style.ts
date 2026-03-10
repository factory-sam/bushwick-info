/**
 * Custom dark cyberpunk map style for MapLibre GL JS.
 * Based on OpenFreeMap liberty style with EVA/NERV color overrides.
 */

import type { StyleSpecification, LayerSpecification } from "maplibre-gl";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LayerSpec = Record<string, any>;

export const BUSHWICK_CENTER = {
  latitude: 40.6944,
  longitude: -73.9213,
} as const;

export const DEFAULT_VIEW_STATE = {
  latitude: BUSHWICK_CENTER.latitude,
  longitude: BUSHWICK_CENTER.longitude,
  zoom: 15,
  pitch: 50,
  bearing: -15,
} as const;

export const MAP_BOUNDS = {
  minZoom: 12,
  maxZoom: 18,
  /** maxBounds restricts panning to greater Bushwick area. [lng, lat] format. */
  maxBounds: {
    sw: [-73.950, 40.675] as readonly [number, number],
    ne: [-73.885, 40.720] as readonly [number, number],
  },
} as const;

// EVA color palette
const COLORS = {
  deepPurple: "#1D1D3A",
  darkWater: "#001a2c",
  darkGreenPark: "#0a2a1a",
  nervOrange: "#F0903A",
  magiBlue40: "rgba(84, 162, 212, 0.4)",
  magiBlue: "#54A2D4",
  entryPlugGreen: "#58F2A5",
  buildingLow: "#0a0a2e",
  buildingHigh: "#765898",
  darkRoadCasing: "rgba(20, 20, 50, 0.6)",
  dimLabel: "#58F2A5",
  labelHalo: "rgba(29, 29, 58, 0.8)",
  darkLand: "#161630",
  darkLandcover: "#121228",
  waterway: "#002a4c",
  darkBoundary: "rgba(88, 242, 165, 0.3)",
  railColor: "rgba(84, 162, 212, 0.3)",
} as const;

/**
 * Creates a custom dark cyberpunk map style for Bushwick.
 * Modifies OpenFreeMap liberty style with EVA/NERV color palette.
 */
export function createDarkMapStyle(): StyleSpecification {
  const layers: LayerSpec[] = [
    // Background
    {
      id: "background",
      type: "background",
      paint: {
        "background-color": COLORS.deepPurple,
      },
    },

    // Park
    {
      id: "park",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "park",
      paint: {
        "fill-color": COLORS.darkGreenPark,
        "fill-opacity": 0.7,
        "fill-outline-color": "rgba(88, 242, 165, 0.15)",
      },
    },

    // Land use - residential
    {
      id: "landuse_residential",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      maxzoom: 12,
      filter: ["==", ["get", "class"], "residential"],
      paint: {
        "fill-color": COLORS.darkLand,
        "fill-opacity": 0.5,
      },
    },

    // Landcover - wood
    {
      id: "landcover_wood",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      filter: ["==", ["get", "class"], "wood"],
      paint: {
        "fill-antialias": false,
        "fill-color": "#0a2a1a",
        "fill-opacity": 0.5,
      },
    },

    // Landcover - grass
    {
      id: "landcover_grass",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      filter: ["==", ["get", "class"], "grass"],
      paint: {
        "fill-antialias": false,
        "fill-color": "#0a2a1a",
        "fill-opacity": 0.4,
      },
    },

    // Landcover - ice
    {
      id: "landcover_ice",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      filter: ["==", ["get", "class"], "ice"],
      paint: {
        "fill-antialias": false,
        "fill-color": "rgba(30, 40, 80, 0.8)",
        "fill-opacity": 0.8,
      },
    },

    // Land use - pitch
    {
      id: "landuse_pitch",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      filter: ["==", ["get", "class"], "pitch"],
      paint: { "fill-color": "#0a2a1a" },
    },

    // Land use - cemetery
    {
      id: "landuse_cemetery",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      filter: ["==", ["get", "class"], "cemetery"],
      paint: { "fill-color": "#121228" },
    },

    // Land use - hospital
    {
      id: "landuse_hospital",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      filter: ["==", ["get", "class"], "hospital"],
      paint: { "fill-color": "#1a1025" },
    },

    // Land use - school
    {
      id: "landuse_school",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      filter: ["==", ["get", "class"], "school"],
      paint: { "fill-color": "#141430" },
    },

    // Waterway - tunnel
    {
      id: "waterway_tunnel",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      filter: ["==", ["get", "brunnel"], "tunnel"],
      paint: {
        "line-color": COLORS.waterway,
        "line-dasharray": [3, 3],
        "line-gap-width": ["interpolate", ["linear"], ["zoom"], 12, 0, 20, 6],
        "line-opacity": 1,
        "line-width": ["interpolate", ["exponential", 1.4], ["zoom"], 8, 1, 20, 2],
      },
    },

    // Waterway - river
    {
      id: "waterway_river",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      filter: ["all", ["==", ["get", "class"], "river"], ["!=", ["get", "brunnel"], "tunnel"]],
      layout: { "line-cap": "round" },
      paint: {
        "line-color": COLORS.waterway,
        "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 11, 0.5, 20, 6],
      },
    },

    // Waterway - other
    {
      id: "waterway_other",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      filter: ["all", ["!=", ["get", "class"], "river"], ["!=", ["get", "brunnel"], "tunnel"]],
      layout: { "line-cap": "round" },
      paint: {
        "line-color": COLORS.waterway,
        "line-width": ["interpolate", ["exponential", 1.3], ["zoom"], 13, 0.5, 20, 6],
      },
    },

    // Water
    {
      id: "water",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "water",
      filter: ["!=", ["get", "brunnel"], "tunnel"],
      paint: {
        "fill-color": COLORS.darkWater,
      },
    },

    // Aeroway
    {
      id: "aeroway_fill",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "aeroway",
      minzoom: 11,
      filter: ["match", ["geometry-type"], ["MultiPolygon", "Polygon"], true, false],
      paint: {
        "fill-color": "rgba(20, 20, 50, 0.7)",
        "fill-opacity": 0.7,
      },
    },

    // ---- TUNNEL ROADS ----
    ...createTunnelLayers(),

    // ---- REGULAR ROADS ----
    ...createRoadLayers(),

    // ---- BRIDGE ROADS ----
    ...createBridgeLayers(),

    // Rail
    ...createRailLayers(),

    // 2D building footprint (zoomed out)
    {
      id: "building",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "building",
      minzoom: 13,
      maxzoom: 14,
      paint: {
        "fill-color": "#0a0a2e",
        "fill-outline-color": "rgba(118, 88, 152, 0.2)",
      },
    },

    // 3D building fill-extrusion layer
    {
      id: "building-3d-dark",
      type: "fill-extrusion",
      source: "openmaptiles",
      "source-layer": "building",
      minzoom: 14,
      paint: {
        "fill-extrusion-base": ["get", "render_min_height"],
        "fill-extrusion-color": [
          "interpolate",
          ["linear"],
          ["get", "render_height"],
          0,
          COLORS.buildingLow,
          15,
          "#2a1a4e",
          40,
          COLORS.buildingHigh,
        ],
        "fill-extrusion-height": ["get", "render_height"],
        "fill-extrusion-opacity": 0.85,
      },
    },

    // Boundaries
    {
      id: "boundary_3",
      type: "line",
      source: "openmaptiles",
      "source-layer": "boundary",
      minzoom: 5,
      filter: [
        "all",
        [">=", ["get", "admin_level"], 3],
        ["<=", ["get", "admin_level"], 6],
        ["!=", ["get", "maritime"], 1],
        ["!=", ["get", "disputed"], 1],
        ["!", ["has", "claimed_by"]],
      ],
      paint: {
        "line-color": COLORS.darkBoundary,
        "line-dasharray": [1, 1],
        "line-width": ["interpolate", ["linear", 1], ["zoom"], 7, 1, 11, 2],
      },
    },
    {
      id: "boundary_2",
      type: "line",
      source: "openmaptiles",
      "source-layer": "boundary",
      filter: [
        "all",
        ["==", ["get", "admin_level"], 2],
        ["!=", ["get", "maritime"], 1],
        ["!=", ["get", "disputed"], 1],
        ["!", ["has", "claimed_by"]],
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": COLORS.darkBoundary,
        "line-opacity": ["interpolate", ["linear"], ["zoom"], 0, 0.4, 4, 1],
        "line-width": ["interpolate", ["linear"], ["zoom"], 3, 1, 5, 1.2, 12, 3],
      },
    },

    // Labels
    ...createLabelLayers(),
  ];

  return {
    version: 8,
    sources: {
      openmaptiles: {
        type: "vector",
        url: "https://tiles.openfreemap.org/planet",
      },
    },
    sprite: "https://tiles.openfreemap.org/sprites/ofm_f384/ofm",
    glyphs: "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf",
    layers: layers as LayerSpecification[],
  };
}

function createTunnelLayers(): LayerSpec[] {
  const tunnelBase = {
    source: "openmaptiles",
    "source-layer": "transportation",
  };

  return [
    {
      id: "tunnel_service_track",
      type: "line",
      ...tunnelBase,
      filter: ["all", ["==", ["get", "brunnel"], "tunnel"], ["match", ["get", "class"], ["service", "track"], true, false]],
      layout: { "line-join": "round" },
      paint: {
        "line-color": COLORS.magiBlue40,
        "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 15.5, 0, 16, 2, 20, 7.5],
      },
    },
    {
      id: "tunnel_minor",
      type: "line",
      ...tunnelBase,
      filter: ["all", ["==", ["get", "brunnel"], "tunnel"], ["match", ["get", "class"], ["minor"], true, false]],
      layout: { "line-join": "round" },
      paint: {
        "line-color": COLORS.magiBlue40,
        "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 13.5, 0, 14, 2.5, 20, 11.5],
      },
    },
    {
      id: "tunnel_secondary_tertiary",
      type: "line",
      ...tunnelBase,
      filter: ["all", ["==", ["get", "brunnel"], "tunnel"], ["match", ["get", "class"], ["secondary", "tertiary"], true, false]],
      layout: { "line-join": "round" },
      paint: {
        "line-color": COLORS.magiBlue,
        "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 6.5, 0, 7, 0.5, 20, 10],
      },
    },
    {
      id: "tunnel_trunk_primary",
      type: "line",
      ...tunnelBase,
      filter: ["all", ["==", ["get", "brunnel"], "tunnel"], ["match", ["get", "class"], ["primary", "trunk"], true, false]],
      layout: { "line-join": "round" },
      paint: {
        "line-color": COLORS.nervOrange,
        "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 5, 0, 7, 1, 20, 18],
      },
    },
    {
      id: "tunnel_motorway",
      type: "line",
      ...tunnelBase,
      filter: ["all", ["==", ["get", "class"], "motorway"], ["!=", ["get", "ramp"], 1], ["==", ["get", "brunnel"], "tunnel"]],
      layout: { "line-join": "round" },
      paint: {
        "line-color": COLORS.nervOrange,
        "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 5, 0, 7, 1, 20, 18],
      },
    },
  ];
}

function createRoadLayers(): LayerSpec[] {
  const roadBase = {
    source: "openmaptiles",
    "source-layer": "transportation",
  };

  return [
    // Road casings (dark, subtle)
    {
      id: "road_service_track_casing",
      type: "line",
      ...roadBase,
      filter: ["all", ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true], ["match", ["get", "class"], ["service", "track"], true, false]],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": COLORS.darkRoadCasing,
        "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 15, 1, 16, 4, 20, 11],
      },
    },
    {
      id: "road_minor_casing",
      type: "line",
      ...roadBase,
      filter: [
        "all",
        ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
        ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
        ["match", ["get", "class"], ["minor"], true, false],
        ["!=", ["get", "ramp"], 1],
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": COLORS.darkRoadCasing,
        "line-opacity": ["interpolate", ["linear"], ["zoom"], 12, 0, 12.5, 1],
        "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 12, 0.5, 13, 1, 14, 4, 20, 20],
      },
    },
    {
      id: "road_secondary_tertiary_casing",
      type: "line",
      ...roadBase,
      filter: [
        "all",
        ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
        ["match", ["get", "class"], ["secondary", "tertiary"], true, false],
        ["!=", ["get", "ramp"], 1],
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": COLORS.darkRoadCasing,
        "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 8, 1.5, 20, 17],
      },
    },
    {
      id: "road_trunk_primary_casing",
      type: "line",
      ...roadBase,
      filter: [
        "all",
        ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
        ["match", ["get", "class"], ["primary", "trunk"], true, false],
      ],
      layout: { "line-join": "round" },
      paint: {
        "line-color": COLORS.darkRoadCasing,
        "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 5, 0.4, 6, 0.7, 7, 1.75, 20, 22],
      },
    },
    {
      id: "road_motorway_casing",
      type: "line",
      ...roadBase,
      minzoom: 5,
      filter: [
        "all",
        ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
        ["==", ["get", "class"], "motorway"],
        ["!=", ["get", "ramp"], 1],
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": COLORS.darkRoadCasing,
        "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 5, 0.4, 6, 0.7, 7, 1.75, 20, 22],
      },
    },

    // Road fills
    {
      id: "road_path_pedestrian",
      type: "line",
      ...roadBase,
      minzoom: 14,
      filter: [
        "all",
        ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
        ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
        ["match", ["get", "class"], ["path", "pedestrian"], true, false],
      ],
      layout: { "line-join": "round" },
      paint: {
        "line-color": "rgba(84, 162, 212, 0.2)",
        "line-dasharray": [1, 0.7],
        "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 14, 1, 20, 10],
      },
    },
    {
      id: "road_service_track",
      type: "line",
      ...roadBase,
      filter: ["all", ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true], ["match", ["get", "class"], ["service", "track"], true, false]],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": COLORS.magiBlue40,
        "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 15.5, 0, 16, 2, 20, 7.5],
      },
    },
    {
      id: "road_link",
      type: "line",
      ...roadBase,
      minzoom: 13,
      filter: [
        "all",
        ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
        ["==", ["get", "ramp"], 1],
        ["match", ["get", "class"], ["motorway", "path", "pedestrian", "service", "track"], false, true],
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": COLORS.magiBlue,
        "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 12.5, 0, 13, 1.5, 14, 2.5, 20, 11.5],
      },
    },
    {
      id: "road_minor",
      type: "line",
      ...roadBase,
      filter: [
        "all",
        ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
        ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
        ["match", ["get", "class"], ["minor"], true, false],
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": COLORS.magiBlue40,
        "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 13.5, 0, 14, 2.5, 20, 18],
      },
    },
    {
      id: "road_secondary_tertiary",
      type: "line",
      ...roadBase,
      filter: [
        "all",
        ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
        ["match", ["get", "class"], ["secondary", "tertiary"], true, false],
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": COLORS.magiBlue,
        "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 6.5, 0, 8, 0.5, 20, 13],
      },
    },
    {
      id: "road_trunk_primary",
      type: "line",
      ...roadBase,
      filter: [
        "all",
        ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
        ["match", ["get", "class"], ["primary", "trunk"], true, false],
      ],
      layout: { "line-join": "round" },
      paint: {
        "line-color": COLORS.nervOrange,
        "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 5, 0, 7, 1, 20, 18],
      },
    },
    {
      id: "road_motorway",
      type: "line",
      ...roadBase,
      minzoom: 5,
      filter: [
        "all",
        ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
        ["==", ["get", "class"], "motorway"],
        ["!=", ["get", "ramp"], 1],
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": COLORS.nervOrange,
        "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 5, 0, 7, 1, 20, 18],
      },
    },
    {
      id: "road_motorway_link",
      type: "line",
      ...roadBase,
      minzoom: 12,
      filter: [
        "all",
        ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
        ["==", ["get", "class"], "motorway"],
        ["==", ["get", "ramp"], 1],
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": COLORS.nervOrange,
        "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 12.5, 0, 13, 1.5, 14, 2.5, 20, 11.5],
      },
    },
  ];
}

function createBridgeLayers(): LayerSpec[] {
  const bridgeBase = {
    source: "openmaptiles",
    "source-layer": "transportation",
  };

  return [
    {
      id: "bridge_service_track",
      type: "line",
      ...bridgeBase,
      filter: ["all", ["==", ["get", "brunnel"], "bridge"], ["match", ["get", "class"], ["service", "track"], true, false]],
      layout: { "line-join": "round" },
      paint: {
        "line-color": COLORS.magiBlue40,
        "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 15.5, 0, 16, 2, 20, 7.5],
      },
    },
    {
      id: "bridge_street",
      type: "line",
      ...bridgeBase,
      filter: ["all", ["==", ["get", "brunnel"], "bridge"], ["match", ["get", "class"], ["minor"], true, false]],
      layout: { "line-join": "round" },
      paint: {
        "line-color": COLORS.magiBlue40,
        "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 13.5, 0, 14, 2.5, 20, 18],
      },
    },
    {
      id: "bridge_secondary_tertiary",
      type: "line",
      ...bridgeBase,
      filter: ["all", ["==", ["get", "brunnel"], "bridge"], ["match", ["get", "class"], ["secondary", "tertiary"], true, false]],
      layout: { "line-join": "round" },
      paint: {
        "line-color": COLORS.magiBlue,
        "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 6.5, 0, 7, 0.5, 20, 10],
      },
    },
    {
      id: "bridge_trunk_primary",
      type: "line",
      ...bridgeBase,
      filter: ["all", ["==", ["get", "brunnel"], "bridge"], ["match", ["get", "class"], ["primary", "trunk"], true, false]],
      layout: { "line-join": "round" },
      paint: {
        "line-color": COLORS.nervOrange,
        "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 5, 0, 7, 1, 20, 18],
      },
    },
    {
      id: "bridge_motorway",
      type: "line",
      ...bridgeBase,
      filter: ["all", ["==", ["get", "class"], "motorway"], ["!=", ["get", "ramp"], 1], ["==", ["get", "brunnel"], "bridge"]],
      layout: { "line-join": "round" },
      paint: {
        "line-color": COLORS.nervOrange,
        "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 5, 0, 7, 1, 20, 18],
      },
    },
  ];
}

function createRailLayers(): LayerSpec[] {
  const railBase = {
    source: "openmaptiles",
    "source-layer": "transportation",
  };

  return [
    {
      id: "road_major_rail",
      type: "line",
      ...railBase,
      filter: ["all", ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true], ["==", ["get", "class"], "rail"]],
      paint: {
        "line-color": COLORS.railColor,
        "line-width": ["interpolate", ["exponential", 1.4], ["zoom"], 14, 0.4, 15, 0.75, 20, 2],
      },
    },
    {
      id: "road_major_rail_hatching",
      type: "line",
      ...railBase,
      filter: ["all", ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true], ["==", ["get", "class"], "rail"]],
      paint: {
        "line-color": COLORS.railColor,
        "line-dasharray": [0.2, 8],
        "line-width": ["interpolate", ["exponential", 1.4], ["zoom"], 14.5, 0, 15, 3, 20, 8],
      },
    },
    {
      id: "road_transit_rail",
      type: "line",
      ...railBase,
      filter: ["all", ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true], ["==", ["get", "class"], "transit"]],
      paint: {
        "line-color": COLORS.railColor,
        "line-width": ["interpolate", ["exponential", 1.4], ["zoom"], 14, 0.4, 15, 0.75, 20, 2],
      },
    },
  ];
}

function createLabelLayers(): LayerSpec[] {
  const labelFont = ["Share Tech Mono Regular", "Noto Sans Regular"];
  const labelColor = COLORS.entryPlugGreen;
  const haloColor = COLORS.labelHalo;

  return [
    // Water labels
    {
      id: "water_name_point_label",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "water_name",
      filter: ["match", ["geometry-type"], ["MultiPoint", "Point"], true, false],
      layout: {
        "text-field": ["coalesce", ["get", "name_en"], ["get", "name"]],
        "text-font": labelFont,
        "text-letter-spacing": 0.2,
        "text-max-width": 5,
        "text-size": ["interpolate", ["linear"], ["zoom"], 0, 10, 6, 14],
      },
      paint: {
        "text-color": COLORS.magiBlue,
        "text-halo-color": haloColor,
        "text-halo-width": 1,
      },
    },

    // Road name labels
    {
      id: "highway-name-minor",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation_name",
      minzoom: 15,
      filter: [
        "all",
        ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
        ["match", ["get", "class"], ["minor", "service", "track"], true, false],
      ],
      layout: {
        "symbol-placement": "line",
        "text-field": ["coalesce", ["get", "name_en"], ["get", "name"]],
        "text-font": labelFont,
        "text-rotation-alignment": "map",
        "text-size": ["interpolate", ["linear"], ["zoom"], 13, 10, 14, 11],
      },
      paint: {
        "text-color": labelColor,
        "text-halo-color": haloColor,
        "text-halo-blur": 0.5,
        "text-halo-width": 1,
      },
    },
    {
      id: "highway-name-major",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation_name",
      minzoom: 12.2,
      filter: ["match", ["get", "class"], ["primary", "secondary", "tertiary", "trunk"], true, false],
      layout: {
        "symbol-placement": "line",
        "text-field": ["coalesce", ["get", "name_en"], ["get", "name"]],
        "text-font": labelFont,
        "text-rotation-alignment": "map",
        "text-size": ["interpolate", ["linear"], ["zoom"], 13, 11, 14, 12],
      },
      paint: {
        "text-color": labelColor,
        "text-halo-color": haloColor,
        "text-halo-blur": 0.5,
        "text-halo-width": 1,
      },
    },

    // Place labels
    {
      id: "label_other",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      minzoom: 8,
      filter: ["match", ["get", "class"], ["city", "continent", "country", "state", "town", "village"], false, true],
      layout: {
        "text-field": ["coalesce", ["get", "name_en"], ["get", "name"]],
        "text-font": labelFont,
        "text-letter-spacing": 0.1,
        "text-max-width": 9,
        "text-size": ["interpolate", ["linear"], ["zoom"], 8, 9, 12, 10],
        "text-transform": "uppercase",
      },
      paint: {
        "text-color": labelColor,
        "text-halo-blur": 1,
        "text-halo-color": haloColor,
        "text-halo-width": 1,
      },
    },
    {
      id: "label_city",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      minzoom: 3,
      filter: ["all", ["==", ["get", "class"], "city"]],
      layout: {
        "text-field": ["coalesce", ["get", "name_en"], ["get", "name"]],
        "text-font": labelFont,
        "text-max-width": 8,
        "text-size": ["interpolate", ["exponential", 1.2], ["zoom"], 4, 11, 7, 13, 11, 18],
      },
      paint: {
        "text-color": labelColor,
        "text-halo-blur": 1,
        "text-halo-color": haloColor,
        "text-halo-width": 1,
      },
    },
  ];
}
