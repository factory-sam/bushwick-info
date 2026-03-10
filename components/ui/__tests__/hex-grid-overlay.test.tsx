import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { HexGridOverlay } from "../hex-grid-overlay";

describe("HexGridOverlay", () => {
  it("renders an SVG element", () => {
    render(<HexGridOverlay />);
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("has pointer-events-none to allow map interaction", () => {
    const { container } = render(<HexGridOverlay />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("pointer-events-none");
  });

  it("renders hexagon pattern with Entry Plug Green stroke", () => {
    render(<HexGridOverlay />);
    const path = document.querySelector("path");
    expect(path).toBeInTheDocument();
    expect(path?.getAttribute("stroke")).toBe("#58F2A5");
  });

  it("has low opacity for subtle visibility", () => {
    render(<HexGridOverlay />);
    const svg = document.querySelector("svg");
    // Opacity should be between 0.05 and 0.08 (5-8%)
    const opacity = svg?.style.opacity;
    expect(Number(opacity)).toBeGreaterThanOrEqual(0.05);
    expect(Number(opacity)).toBeLessThanOrEqual(0.08);
  });
});
