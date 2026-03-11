import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DataReadout } from "../data-readout";

describe("DataReadout", () => {
  const defaultProps = {
    latitude: 40.6944,
    longitude: -73.9213,
    zoom: 15,
  };

  it("renders the data readout panel", () => {
    render(<DataReadout {...defaultProps} />);
    const panel = screen.getByTestId("data-readout");
    expect(panel).toBeInTheDocument();
  });

  it("displays latitude value", () => {
    render(<DataReadout {...defaultProps} />);
    expect(screen.getByText(/40\.6944/)).toBeInTheDocument();
  });

  it("displays longitude value", () => {
    render(<DataReadout {...defaultProps} />);
    expect(screen.getByText(/-73\.9213/)).toBeInTheDocument();
  });

  it("displays zoom level", () => {
    render(<DataReadout {...defaultProps} />);
    expect(screen.getByText(/15\.00/)).toBeInTheDocument();
  });

  it("uses Share Tech Mono font class", () => {
    render(<DataReadout {...defaultProps} />);
    const panel = screen.getByTestId("data-readout");
    expect(panel.className).toContain("font-mono");
  });

  it("updates when props change", () => {
    const { rerender } = render(<DataReadout {...defaultProps} />);
    expect(screen.getByText(/40\.6944/)).toBeInTheDocument();

    rerender(<DataReadout latitude={40.7} longitude={-73.93} zoom={16} />);
    expect(screen.getByText(/40\.7000/)).toBeInTheDocument();
    expect(screen.getByText(/-73\.9300/)).toBeInTheDocument();
    expect(screen.getByText(/16\.00/)).toBeInTheDocument();
  });

  it("has clip-path for angled corners", () => {
    render(<DataReadout {...defaultProps} />);
    const panel = screen.getByTestId("data-readout");
    expect(panel.style.clipPath).toContain("polygon");
  });
});
