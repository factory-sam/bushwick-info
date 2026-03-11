# BUSHWICK // MAP

An interactive 3D map of Bushwick, Brooklyn built with Next.js and MapLibre GL. The interface features a dark cyberpunk aesthetic with scanline overlays, CRT vignette, neon glows, targeting reticles, and a custom dark map style. Curated places across six categories are plotted on tilted 3D buildings with full search, filtering, and animated detail panels.

<!-- Screenshot: add a screenshot or screen recording here -->

## Features

- 3D extruded buildings with height-based color interpolation
- Cyberpunk UI chrome: scanlines, CRT vignette, hex grid, neon glow borders
- 50+ curated Bushwick places across 6 categories (bars, coffee, restaurants, clubs, stores, other)
- Targeting reticle on marker hover with lock-on animation on click
- Category filter toggles with neon active/dimmed states
- Search bar with real-time filtering and keyboard navigation
- Boundary fade rings that darken the map outside Bushwick
- Responsive layout with mobile bottom sheet and desktop side panel
- Animated detail panels with place info, hours, and external links

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Map:** MapLibre GL JS via react-map-gl
- **Tiles:** OpenFreeMap (no API key required)
- **Styling:** Tailwind CSS v4
- **Animation:** Motion (Framer Motion)
- **Fonts:** Orbitron, Share Tech Mono, Rajdhani (Google Fonts)
- **Testing:** Vitest + React Testing Library
- **Language:** TypeScript

## Setup

```bash
pnpm install
```

Copy the example environment file (if one exists) and add your configuration:

```bash
cp .env.example .env.local
```

Start the development server on port 3100:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Run tests:

```bash
pnpm test
```

## Adding and Editing Places

All place data lives in `data/places.ts`. Each place is a typed object with the following fields:

- `id` -- unique string identifier
- `name` -- display name
- `description` -- short description
- `category` -- one of: `bars`, `coffee`, `restaurants`, `clubs`, `stores`, `other`
- `address` -- street address
- `lat`, `lng` -- coordinates (must be within the Bushwick area)
- `hours` -- opening hours (optional)
- `website` -- external URL (optional)

Add a new entry to the `places` array, or edit existing entries directly. Category colors and display names are defined in the `CATEGORIES` record at the top of the same file.

## Deploy to Vercel

This is a standard Next.js application. Deploy with Vercel:

1. Push the repository to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js -- no special configuration needed
4. Set any required environment variables in the Vercel dashboard
5. Deploy

The project uses OpenFreeMap tiles which require no API key, so the map works out of the box.

## Documentation

- [AGENTS.md](./AGENTS.md) - Instructions for autonomous agents
- [Architecture](./docs/architecture.md) - System diagrams and design decisions
