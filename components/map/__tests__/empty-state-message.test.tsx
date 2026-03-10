import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { EmptyStateMessage } from "../empty-state-message";

describe("EmptyStateMessage", () => {
  it("renders the empty state message", () => {
    render(<EmptyStateMessage />);
    expect(screen.getByTestId("empty-state-message")).toBeInTheDocument();
  });

  it("displays NO TARGETS IN RANGE text", () => {
    render(<EmptyStateMessage />);
    expect(screen.getByText("NO TARGETS IN RANGE")).toBeInTheDocument();
  });

  it("has pointer-events-none so it does not block map interaction", () => {
    render(<EmptyStateMessage />);
    const container = screen.getByTestId("empty-state-message");
    expect(container.className).toContain("pointer-events-none");
  });
});
