---
name: ui-worker
description: Handles EVA UI chrome, styling, animations, responsive design, and visual polish
---

# UI Worker

NOTE: Startup and cleanup are handled by `worker-base`. This skill defines the WORK PROCEDURE.

## When to Use This Skill

Use for features involving:
- EVA/NERV UI chrome components (scanlines, vignette, header, panels)
- Tailwind CSS configuration with EVA theme
- Framer Motion animations
- Responsive design and mobile adaptation
- Visual polish and post-processing effects
- Component styling and theming
- Search and filter UI components

## Work Procedure

1. **Read context files first:**
   - Read `.factory/library/eva-design.md` — this is your PRIMARY reference. It contains all color values, CSS patterns, font specifications, and visual element definitions. Follow it closely.
   - Read `.factory/library/architecture.md` for component patterns and conventions
   - Read `.factory/services.yaml` for dev server commands

2. **Write failing tests first (RED):**
   - For UI components: write React Testing Library tests verifying:
     - Component renders without errors
     - Key elements present (correct class names, aria labels, text content)
     - Interactive behavior (click handlers fire, state changes)
   - For utility functions: write Vitest tests
   - Run `pnpm test` to confirm tests fail

3. **Implement to make tests pass (GREEN):**
   - Use Tailwind CSS with the `nerv.*` color namespace from tailwind.config
   - Import Google Fonts via CSS `@import` or `next/font`
   - Use `motion` package (Framer Motion) for animations
   - All decorative overlays (scanlines, vignette, hex grid) MUST have `pointer-events: none`
   - Panels use `clip-path: polygon(...)` for angled corners — NOT border-radius
   - Neon glow via `box-shadow` and `text-shadow` (not CSS filters)
   - Data readouts in Share Tech Mono, Entry Plug Green (#58F2A5)
   - Headings in Orbitron, uppercase, letter-spacing: 0.1em
   - Body text in Rajdhani

4. **EVA Design Checklist — verify each feature includes:**
   - [ ] Correct EVA palette colors (no off-theme colors like bright white or default blue)
   - [ ] Clipped corners on panels (clip-path polygon)
   - [ ] Neon glow on borders/accents
   - [ ] Correct font family per element type
   - [ ] Dark backgrounds (Deep Purple or Terminal Black)
   - [ ] pointer-events: none on decorative overlays
   - [ ] Responsive behavior (test at 375px, 768px, 1024px)

5. **Run all checks:**
   - `pnpm test` — all tests pass
   - `pnpm typecheck` — no type errors
   - `pnpm lint` — no lint errors
   - `pnpm build` — builds successfully

6. **Manual verification with agent-browser:**
   - Start dev server: `PORT=3100 pnpm dev`
   - Wait for healthcheck: `curl -sf http://localhost:3100`
   - Use agent-browser to verify:
     - Visual elements render correctly (screenshots)
     - Correct colors and fonts visible
     - Interactions work (click through overlays to map, filter toggles, search input)
     - Test at mobile viewport (375px) for responsive design
   - Stop dev server after verification

7. **Stop any processes you started:**
   - Kill dev server: `lsof -ti :3100 | xargs kill 2>/dev/null`

## Example Handoff

```json
{
  "salientSummary": "Built EVA UI chrome layer: scanline overlay, CRT vignette, NERV header panel with Orbitron title, and coordinate/zoom data readout panel. All overlays pass pointer events through to map. Verified with agent-browser at desktop and 375px mobile: scanlines visible, vignette darkens edges, header shows app title with neon glow, readouts update with map movement.",
  "whatWasImplemented": "ScanlineOverlay component with ::after pseudo-element (repeating-linear-gradient, pointer-events:none, z-10). VignetteOverlay with radial-gradient darkening edges. NervHeader panel with clip-path angled corners, NERV Orange border glow, Orbitron title 'BUSHWICK // MAP'. DataReadout component showing lat/lng and zoom in Share Tech Mono, Entry Plug Green, updates via map onMove callback. All components responsive: header collapses on mobile, readout repositions.",
  "whatWasLeftUndone": "",
  "verification": {
    "commandsRun": [
      { "command": "pnpm test", "exitCode": 0, "observation": "8 tests passing: scanline-render, vignette-render, header-render, header-has-title, readout-render, readout-updates, pointer-events-none-scanline, pointer-events-none-vignette" },
      { "command": "pnpm build", "exitCode": 0, "observation": "Build successful" }
    ],
    "interactiveChecks": [
      { "action": "Navigated to http://localhost:3100 with agent-browser at 1280x800", "observed": "Scanlines visible as subtle horizontal lines. Vignette darkens screen edges. Header panel at top with 'BUSHWICK // MAP' in Orbitron, orange neon glow border, clipped corners. Readout panel in bottom-left showing coordinates and zoom level in green monospace." },
      { "action": "Clicked and dragged the map through the scanline overlay", "observed": "Map panned successfully — pointer events pass through scanlines and vignette." },
      { "action": "Resized viewport to 375px width", "observed": "Header panel compressed to single line. Readout panel moved to bottom center with smaller font. Map still fills viewport." }
    ]
  },
  "tests": {
    "added": [
      { "file": "src/__tests__/components/ScanlineOverlay.test.tsx", "cases": [
        { "name": "renders scanline overlay", "verifies": "component mounts" },
        { "name": "has pointer-events-none", "verifies": "overlay doesn't block interaction" }
      ]},
      { "file": "src/__tests__/components/NervHeader.test.tsx", "cases": [
        { "name": "renders header with title", "verifies": "title text present" },
        { "name": "uses Orbitron font class", "verifies": "correct font applied" }
      ]}
    ]
  },
  "discoveredIssues": []
}
```

## When to Return to Orchestrator

- Map component not yet available (needed for interactive checks)
- Tailwind config not set up with EVA colors
- Animation library (motion) not installed
- Design ambiguity — unclear which EVA color to use for a specific element
- Responsive breakpoints conflict with existing layout
