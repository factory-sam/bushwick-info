# Architecture

## Overview

Bushwick Maps is a client-side rendered Next.js application that displays an interactive 3D map of Bushwick, Brooklyn. The application has no backend services - all data is bundled at build time.

## System Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Client Browser                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────────┐  │
│  │   Next.js    │    │   MapLibre   │    │   React Components   │  │
│  │  App Router  │───▶│   GL JS      │───▶│   (UI Chrome)        │  │
│  └──────────────┘    └──────────────┘    └──────────────────────┘  │
│         │                   │                                        │
│         ▼                   ▼                                        │
│  ┌──────────────┐    ┌──────────────┐                               │
│  │ places.ts    │    │ OpenFreeMap  │                               │
│  │ (bundled)    │    │ Tile Server  │                               │
│  └──────────────┘    └──────────────┘                               │
│                            │                                         │
└────────────────────────────┼─────────────────────────────────────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   OpenFreeMap    │
                    │   CDN (tiles)    │
                    │ tiles.openfreemap│
                    │      .org        │
                    └──────────────────┘
```

## Data Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   User      │     │  Category   │     │   Search    │     │   Detail    │
│   Action    │────▶│   Filter    │────▶│   Filter    │────▶│   Panel     │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                          │                   │
                          ▼                   ▼
                    ┌─────────────────────────────┐
                    │      Filtered Places        │
                    │   (derived from places.ts)  │
                    └─────────────────────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────────┐
                    │      Map Markers            │
                    │   (PlaceMarkers component)  │
                    └─────────────────────────────┘
```

## Component Architecture

```
app/page.tsx
    │
    └── components/map/MapView.tsx (dynamic import, ssr: false)
            │
            ├── Map (react-map-gl/maplibre)
            │     └── Custom dark style from lib/map/map-style.ts
            │
            ├── components/map/PlaceMarkers.tsx
            │     └── Renders markers with category colors
            │
            ├── components/map/CategoryFilterBar.tsx
            │     └── Toggle buttons for 6 categories
            │
            ├── components/map/SearchBar.tsx
            │     └── Real-time search with keyboard nav
            │
            ├── components/map/PlaceDetailPanel.tsx
            │     └── Desktop side panel + mobile bottom sheet
            │
            └── components/ui/ (UI Chrome)
                  ├── ScanlineOverlay.tsx
                  ├── VignetteOverlay.tsx
                  ├── HexGridOverlay.tsx
                  └── Header.tsx
```

## External Services

| Service      | URL                   | Purpose            | Auth             |
| ------------ | --------------------- | ------------------ | ---------------- |
| OpenFreeMap  | tiles.openfreemap.org | Vector map tiles   | None required    |
| Google Fonts | fonts.googleapis.com  | Web fonts          | None required    |
| Vercel       | vercel.com            | Hosting (optional) | Account required |

## Key Design Decisions

1. **No Backend**: All place data is bundled at build time in `data/places.ts`. No API routes, no database.

2. **Client-Side Rendering for Map**: MapLibre GL requires browser APIs, so the map component uses `next/dynamic` with `ssr: false`.

3. **OpenFreeMap**: Free vector tiles with no API key requirement. Custom dark cyberpunk style built from scratch using their tile schema.

4. **Dual Panel Pattern**: Detail panel renders both mobile (bottom sheet) and desktop (side panel) variants simultaneously, with CSS controlling visibility.

5. **TypeScript Strict Mode**: Enables `strict`, `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters` for maximum type safety.
