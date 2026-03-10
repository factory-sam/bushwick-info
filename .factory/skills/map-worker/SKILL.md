---
name: map-worker
description: Handles MapLibre GL map setup, 3D buildings, custom dark styles, markers, and map interactions
---

# Map Worker

NOTE: Startup and cleanup are handled by `worker-base`. This skill defines the WORK PROCEDURE.

## When to Use This Skill

Use for features involving:
- MapLibre GL JS setup and configuration
- Custom map styles (dark/cyberpunk theme)
- 3D building extrusions
- Map markers and marker interactions
- Camera controls and animations
- Map-based location picker
- Map performance optimization

## Work Procedure

1. **Read context files first:**
   - Read `.factory/library/architecture.md` for map tech decisions (MapLibre v5, react-map-gl v8, OpenFreeMap)
   - Read `.factory/library/eva-design.md` for EVA color palette and category marker colors
   - Read `.factory/library/environment.md` for external dependencies (OpenFreeMap URLs)
   - Read `.factory/services.yaml` for dev server commands

2. **Write failing tests first (RED):**
   - For map utilities: write Vitest tests for coordinate helpers, data transformations, style utilities
   - For map components: write tests for component rendering (verify map container renders, props are passed)
   - Note: MapLibre GL itself cannot be fully tested in Vitest (requires WebGL). Focus tests on utility functions and component structure.
   - Run `pnpm test` to confirm tests fail

3. **Implement to make tests pass (GREEN):**
   - Use `react-map-gl/maplibre` for the Map component
   - Import `maplibre-gl/dist/maplibre-gl.css`
   - Use `next/dynamic` with `ssr: false` for map components (MapLibre requires DOM/window)
   - OpenFreeMap tiles: `https://tiles.openfreemap.org/styles/liberty` as base style
   - For custom dark style: create a style JSON that modifies the base OpenFreeMap style with EVA colors
   - For 3D buildings: add a `fill-extrusion` layer using the `building` source-layer with `render_height`
   - Bushwick center: lat 40.6944, lng -73.9213
   - For markers: use MapLibre Marker or custom HTML overlay markers with category-specific colors from eva-design.md
   - All decorative overlays must have `pointer-events: none`

4. **MapLibre Style Configuration:**
   - Start from OpenFreeMap liberty style
   - Override colors: background → Deep Purple (#1D1D3A), water → dark blue (#001a2c), roads → neon EVA colors, parks → dark green
   - Add fill-extrusion layer for buildings with height-driven color interpolation
   - Configure light source for 3D building shadows
   - Set initial viewState: center on Bushwick, zoom ~15, pitch ~50, bearing ~-15

5. **Run all checks:**
   - `pnpm test` — all tests pass
   - `pnpm typecheck` — no type errors
   - `pnpm build` — builds successfully

6. **Manual verification with agent-browser:**
   - Start dev server: `PORT=3100 pnpm dev`
   - Wait for healthcheck: `curl -sf http://localhost:3100`
   - Use agent-browser to navigate to http://localhost:3100
   - Take screenshots showing: map loaded, 3D buildings visible, dark theme applied, markers visible
   - Verify map interaction: click a marker, verify detail panel, test zoom
   - Stop dev server after verification

7. **Stop any processes you started:**
   - Kill dev server: `lsof -ti :3100 | xargs kill 2>/dev/null`

## Example Handoff

```json
{
  "salientSummary": "Implemented custom dark cyberpunk map style with 3D building extrusions. MapLibre GL v5 renders Bushwick centered at 40.694/-73.921 with pitch 50°. Buildings use EVA color gradient (deep purple at ground → magenta at height). Roads styled in NERV Orange/MAGI Blue. Verified with agent-browser: 3D buildings visible, dark theme applied, zoom/pan working.",
  "whatWasImplemented": "Custom MapLibre style JSON with: dark background (#1D1D3A), neon road colors (NERV Orange for major, MAGI Blue for minor), dark water (#001a2c), dark green parks. Fill-extrusion layer for buildings using render_height with color interpolation from #0a0a2e (low) to #765898 (tall). Initial viewState: center [40.6944, -73.9213], zoom 15, pitch 50, bearing -15. Zoom bounds: min 12, max 18. MapComponent wrapped in next/dynamic with ssr:false.",
  "whatWasLeftUndone": "",
  "verification": {
    "commandsRun": [
      { "command": "pnpm test", "exitCode": 0, "observation": "4 tests passing: style-util, coordinate-helpers, map-component-render, viewstate-defaults" },
      { "command": "pnpm build", "exitCode": 0, "observation": "Build successful" }
    ],
    "interactiveChecks": [
      { "action": "Navigated to http://localhost:3100 with agent-browser", "observed": "Map loaded with dark purple background, 3D buildings visible at ~50° pitch, Bushwick streets visible with neon orange coloring" },
      { "action": "Scrolled to zoom in to zoom 17", "observed": "Building detail increased, street labels readable in technical font, no tile loading errors" },
      { "action": "Zoomed out to min zoom", "observed": "Map stopped at zoom 12, broader Bushwick area visible" }
    ]
  },
  "tests": {
    "added": [
      { "file": "src/__tests__/utils/map-style.test.ts", "cases": [
        { "name": "creates dark style with EVA colors", "verifies": "style generation uses correct hex values" },
        { "name": "includes fill-extrusion layer for buildings", "verifies": "3D building layer present in style" }
      ]},
      { "file": "src/__tests__/components/MapView.test.tsx", "cases": [
        { "name": "renders map container", "verifies": "map component mounts without errors" },
        { "name": "uses correct default viewState", "verifies": "center on Bushwick with pitch" }
      ]}
    ]
  },
  "discoveredIssues": []
}
```

## When to Return to Orchestrator

- OpenFreeMap tiles are unreachable or returning errors
- MapLibre GL version incompatibility with react-map-gl
- WebGL rendering issues that can't be resolved
- 3D building data (render_height) is missing from OpenFreeMap tiles for Bushwick area
- Map interaction conflicts with UI overlay components
