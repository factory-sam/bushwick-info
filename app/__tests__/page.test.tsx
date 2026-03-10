import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "../page";

describe("Home page", () => {
  it("renders the BUSHWICK // MAP heading", () => {
    render(<Home />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("BUSHWICK // MAP");
  });

  it("has a dark background container", () => {
    render(<Home />);
    const main = document.querySelector("main");
    expect(main).toBeInTheDocument();
    expect(main?.className).toContain("bg-nerv-deep-purple");
  });
});
