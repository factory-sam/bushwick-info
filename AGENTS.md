# AGENTS.md

Instructions for autonomous agents working on this codebase.

## Quick Start

```bash
pnpm install
pnpm dev        # Start dev server on port 3100
```

## Commands

| Command              | Description                            |
| -------------------- | -------------------------------------- |
| `pnpm dev`           | Start development server (port 3100)   |
| `pnpm build`         | Production build                       |
| `pnpm start`         | Start production server                |
| `pnpm test`          | Run Vitest unit tests                  |
| `pnpm test:coverage` | Run tests with coverage report         |
| `pnpm test:e2e`      | Run Playwright E2E tests               |
| `pnpm lint`          | Run ESLint                             |
| `pnpm typecheck`     | Run TypeScript type checking           |
| `pnpm format`        | Format code with Prettier              |
| `pnpm format:check`  | Check formatting without writing       |
| `pnpm knip`          | Detect unused exports and dependencies |

## Project Structure

```
app/                  # Next.js App Router pages
  layout.tsx          # Root layout with fonts and metadata
  page.tsx            # Main map page
  globals.css         # Global styles and Tailwind imports
components/
  map/                # Map-related components (markers, panels, filters)
  ui/                 # UI chrome components (overlays, headers)
data/
  places.ts           # Place data and category definitions
lib/
  map/                # Map utilities (styles, bounds)
  logger/             # Structured logging with pino
.factory/
  skills/             # Droid skills for specialized tasks
  library/            # Architecture docs and design specs
```

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Map:** MapLibre GL JS via react-map-gl/maplibre
- **Styling:** Tailwind CSS v4
- **Animation:** Motion (Framer Motion)
- **Testing:** Vitest + React Testing Library + Playwright
- **Logging:** pino (structured JSON logging)
- **Language:** TypeScript (strict mode)

## Coding Conventions

### TypeScript

- Strict mode enabled with `noUncheckedIndexedAccess`
- Prefix unused parameters with underscore: `_unused`
- Use `@/*` path alias for imports

### Components

- React functional components only
- Use Tailwind classes, avoid inline styles
- Map component uses `next/dynamic` with `ssr: false`
- Decorative overlays must have `pointer-events: none`

### Testing

- Tests live in `__tests__/` directories alongside source
- Use `*.test.ts` or `*.test.tsx` naming
- Run `pnpm test` before committing

### Data

- Places defined in `data/places.ts` as typed array
- Categories: bars, coffee, restaurants, clubs, stores, other
- Coordinates must be within Bushwick bounds (40.68-40.72 lat, -73.89 to -73.95 lng)

### Logging

- Use `lib/logger` for structured logging
- Import pre-configured loggers: `mapLogger`, `dataLogger`, `apiLogger`
- Or create custom: `createLogger({ component: 'my-component' })`
- Sensitive fields (password, token, apiKey) are automatically redacted

## External Dependencies

- **Map tiles:** OpenFreeMap (no API key required)
- **Fonts:** Google Fonts (loaded in layout.tsx)

## Environment Variables

See `.env.example` for required variables. Currently only `ADMIN_PASSWORD` is used for any future admin features.

## Verification Checklist

Before submitting changes:

1. `pnpm typecheck` passes
2. `pnpm lint` passes
3. `pnpm test` passes
4. `pnpm build` succeeds
