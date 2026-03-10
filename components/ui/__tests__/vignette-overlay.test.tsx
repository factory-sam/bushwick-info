import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { VignetteOverlay } from "../vignette-overlay";

describe("VignetteOverlay", () => {
  it("renders a div with crt-vignette class", () => {
    const { container } = render(<VignetteOverlay />);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeInTheDocument();
    expect(el.className).toContain("crt-vignette");
  });

  it("has pointer-events-none to allow map interaction", () => {
    const { container } = render(<VignetteOverlay />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("pointer-events-none");
  });

  it("is positioned fixed to cover full screen", () => {
    const { container } = render(<VignetteOverlay />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("fixed");
    expect(el.className).toContain("inset-0");
  });
});
