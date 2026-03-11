# Cyberpunk Design System

Design tokens, CSS patterns, and visual reference for the cyberpunk theme.

---

## Color Palette

| Name           | Hex       | Usage                             |
| -------------- | --------- | --------------------------------- |
| Orange         | `#F0903A` | Primary accent, borders, warnings |
| Green          | `#58F2A5` | HUD data, active states, readouts |
| Purple         | `#765898` | Secondary accents                 |
| Deep Purple    | `#1D1D3A` | Primary background                |
| Red            | `#E81900` | Alerts, danger, errors            |
| Blue           | `#54A2D4` | Info displays, secondary data     |
| Terminal Black | `#000053` | Deep panel backgrounds            |
| Yellow         | `#F6E201` | Warning stripes, caution          |

## Tailwind Config Colors

```js
nerv: {
  orange: '#F0903A',
  green: '#58F2A5',
  purple: '#765898',
  'deep-purple': '#1D1D3A',
  red: '#E81900',
  blue: '#54A2D4',
  black: '#000053',
  yellow: '#F6E201',
}
```

## Fonts

| Font            | Usage                      | Tailwind Key   |
| --------------- | -------------------------- | -------------- |
| Orbitron        | Headings, titles           | `font-display` |
| Share Tech Mono | Data readouts, coordinates | `font-mono`    |
| Rajdhani        | Body text, labels          | `font-body`    |

Import: `https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap`

## CSS Patterns

### Scanlines

```css
.scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15) 0px,
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
  z-index: 10;
}
```

### CRT Vignette

```css
.crt-vignette::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 60%, rgba(0, 0, 83, 0.6) 100%);
  pointer-events: none;
}
```

### Panel Clipped Corners

```css
clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
```

### Neon Glow (Box)

```css
border: 1px solid #f0903a;
box-shadow:
  0 0 5px #f0903a,
  0 0 10px #f0903a,
  inset 0 0 5px rgba(240, 144, 58, 0.3);
```

### Neon Glow (Text)

```css
color: #58f2a5;
text-shadow:
  0 0 7px #58f2a5,
  0 0 10px #58f2a5,
  0 0 21px #58f2a5;
```

### Warning Stripes

```css
background: repeating-linear-gradient(
  -45deg,
  #f6e201 0px,
  #f6e201 10px,
  #1d1d3a 10px,
  #1d1d3a 20px
);
height: 4px;
```

### Hex Grid SVG Pattern

```html
<svg width="100%" height="100%" style="position:absolute;inset:0;pointer-events:none;opacity:0.06">
  <defs>
    <pattern id="hexagons" width="56" height="100" patternUnits="userSpaceOnUse">
      <path
        d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
        fill="none"
        stroke="#58F2A5"
        stroke-width="0.5"
      />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#hexagons)" />
</svg>
```

## Key Visual Elements

1. Scanline overlay (horizontal lines, pointer-events: none)
2. CRT vignette (darkened edges)
3. Clipped/angled corners on panels (clip-path polygon)
4. Neon glow borders (box-shadow)
5. Hex grid background pattern (SVG, very low opacity)
6. Warning stripes (diagonal yellow/black)
7. Data readouts in Share Tech Mono, Entry Plug Green
8. Orbitron headings, uppercase, letter-spacing: 0.1em

## Animation

- Use `motion` package (Framer Motion for React)
- Panel entrance: opacity 0→1, translateX -20→0, 0.4s
- Data stagger: staggerChildren 0.05s
- Neon pulse: 2s ease-in-out infinite alternate on box-shadow
- Spring motion: stiffness 400, damping 30

## Category Marker Colors

| Category    | Color            | Hex       |
| ----------- | ---------------- | --------- |
| Bars        | NERV Orange      | `#F0903A` |
| Coffee      | Entry Plug Green | `#58F2A5` |
| Restaurants | MAGI Blue        | `#54A2D4` |
| Clubs       | Electric Violet  | `#BF00FF` |
| Stores      | Eva Yellow       | `#F6E201` |
| Other       | NERV Red         | `#E81900` |
