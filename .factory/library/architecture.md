# Architecture

Architectural decisions, patterns, and conventions discovered during the mission.

**What belongs here:** Tech stack decisions, component patterns, data flow, file structure conventions.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Map:** MapLibre GL JS v5 via react-map-gl v8 (`react-map-gl/maplibre` import path)
- **Tiles:** OpenFreeMap (free, no API key)
  - Vector tile source: `https://tiles.openfreemap.org/planet` (used for custom styles)
  - Pre-built style: `https://tiles.openfreemap.org/styles/liberty` (not used — custom dark cyberpunk style built from scratch)
- **Styling:** Tailwind CSS v4 with EVA color palette
- **Animation:** Framer Motion (`motion` package)
- **Fonts:** Google Fonts (Orbitron, Share Tech Mono, Rajdhani)
- **Data:** TypeScript data files in `/data/` directory (no API routes, no database)
- **Auth:** None — places managed as code, no admin panel
- **Testing:** Vitest + React Testing Library

## Key Patterns

- Map component loaded via `next/dynamic` with `ssr: false` to avoid MapLibre SSR issues
- Places defined as typed TypeScript array in data/places.ts (imported directly, no API)
- No admin panel, no authentication — data managed as code
- EVA theme colors defined in Tailwind config under `nerv.*` namespace
- All decorative overlays (scanlines, vignette, hex grid) use `pointer-events: none`

## Bushwick Coordinates

- Center: lat 40.6944, lng -73.9213
- Visible area: roughly 40.680-40.715 lat, -73.890 to -73.945 lng (includes Bushwick + parts of Ridgewood, N. Bed-Stuy, E. Williamsburg)
- maxBounds (with padding): roughly 40.675-40.720 lat, -73.885 to -73.950 lng
- Areas outside visible area should fade to dark via overlay or fog
