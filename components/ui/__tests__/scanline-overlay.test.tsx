import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ScanlineOverlay } from "../scanline-overlay";

describe("ScanlineOverlay", () => {
  it("renders a div with scanlines class", () => {
    const { container } = render(<ScanlineOverlay />);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeInTheDocument();
    expect(el.className).toContain("scanlines");
  });

  it("has pointer-events-none to allow map interaction", () => {
    const { container } = render(<ScanlineOverlay />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("pointer-events-none");
  });

  it("is positioned fixed to cover full screen", () => {
    const { container } = render(<ScanlineOverlay />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("fixed");
    expect(el.className).toContain("inset-0");
  });

  it("has z-10 stacking order", () => {
    const { container } = render(<ScanlineOverlay />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("z-10");
  });
});
