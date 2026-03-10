import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { NervHeader } from "../nerv-header";

// Mock motion to render as regular HTML elements
vi.mock("motion/react", () => ({
  motion: {
    header: ({
      children,
      className,
      style,
      "data-testid": testId,
    }: Record<string, unknown>) => (
      <header className={className as string} style={style as React.CSSProperties} data-testid={testId as string}>
        {children as React.ReactNode}
      </header>
    ),
  },
}));

describe("NervHeader", () => {
  it("renders the header with app title", () => {
    render(<NervHeader />);
    expect(screen.getByText("BUSHWICK // MAP")).toBeInTheDocument();
  });

  it("uses Orbitron display font class", () => {
    render(<NervHeader />);
    const title = screen.getByText("BUSHWICK // MAP");
    expect(title.className).toContain("font-display");
  });

  it("has uppercase text with letter-spacing", () => {
    render(<NervHeader />);
    const title = screen.getByText("BUSHWICK // MAP");
    expect(title.className).toContain("uppercase");
    expect(title.className).toContain("tracking-widest");
  });

  it("renders header element with data-testid", () => {
    render(<NervHeader />);
    const header = screen.getByTestId("nerv-header");
    expect(header).toBeInTheDocument();
  });

  it("has clip-path for angled corners", () => {
    render(<NervHeader />);
    const header = screen.getByTestId("nerv-header");
    expect(header.style.clipPath).toContain("polygon");
  });
});
