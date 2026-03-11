import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { Place } from "@/data/places";

// Mock motion/react to avoid Framer Motion in tests
vi.mock("motion/react", () => ({
  motion: {
    div: vi.fn(({ children, ...props }: Record<string, unknown>) => {
      const filtered: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(props)) {
        if (!["initial", "animate", "exit", "transition", "whileHover", "whileTap"].includes(key)) {
          filtered[key] = value;
        }
      }
      return <div {...filtered}>{children as React.ReactNode}</div>;
    }),
    h2: vi.fn(({ children, ...props }: Record<string, unknown>) => {
      const filtered: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(props)) {
        if (!["initial", "animate", "exit", "transition"].includes(key)) {
          filtered[key] = value;
        }
      }
      return <h2 {...filtered}>{children as React.ReactNode}</h2>;
    }),
    p: vi.fn(({ children, ...props }: Record<string, unknown>) => {
      const filtered: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(props)) {
        if (!["initial", "animate", "exit", "transition"].includes(key)) {
          filtered[key] = value;
        }
      }
      return <p {...filtered}>{children as React.ReactNode}</p>;
    }),
  },
  AnimatePresence: vi.fn(({ children }: Record<string, unknown>) => (
    <>{children as React.ReactNode}</>
  )),
}));

import { PlaceDetailPanel } from "../place-detail-panel";

const fullPlace: Place = {
  id: "test-place",
  name: "Test Venue",
  description: "A great place to visit in Bushwick.",
  category: "bars",
  address: "123 Test St, Brooklyn, NY 11237",
  lat: 40.7,
  lng: -73.92,
  hours: "Mon-Fri 5 PM-12 AM",
  website: "https://example.com",
};

const minimalPlace: Place = {
  id: "minimal-place",
  name: "Minimal Spot",
  description: "A simple place.",
  category: "coffee",
  address: "456 Coffee Lane, Brooklyn, NY 11206",
  lat: 40.705,
  lng: -73.93,
};

describe("PlaceDetailPanel", () => {
  it("renders nothing when place is null", () => {
    render(<PlaceDetailPanel place={null} onClose={vi.fn()} />);
    expect(screen.queryByTestId("place-detail-panel")).not.toBeInTheDocument();
  });

  it("renders the detail panel when a place is provided", () => {
    render(<PlaceDetailPanel place={fullPlace} onClose={vi.fn()} />);
    expect(screen.getByTestId("place-detail-panel")).toBeInTheDocument();
  });

  it("displays the place name", () => {
    render(<PlaceDetailPanel place={fullPlace} onClose={vi.fn()} />);
    // Both mobile and desktop panels render in DOM (CSS hides one) — check first match
    const names = screen.getAllByTestId("detail-place-name");
    expect(names.length).toBeGreaterThanOrEqual(1);
    expect(names[0]).toHaveTextContent("Test Venue");
  });

  it("displays the description", () => {
    render(<PlaceDetailPanel place={fullPlace} onClose={vi.fn()} />);
    const descriptions = screen.getAllByTestId("detail-description");
    expect(descriptions.length).toBeGreaterThanOrEqual(1);
    expect(descriptions[0]).toHaveTextContent("A great place to visit in Bushwick.");
  });

  it("displays the category badge", () => {
    render(<PlaceDetailPanel place={fullPlace} onClose={vi.fn()} />);
    const badges = screen.getAllByTestId("detail-category-badge");
    expect(badges.length).toBeGreaterThanOrEqual(1);
    expect(badges[0]).toHaveTextContent("Bars");
  });

  it("displays address", () => {
    render(<PlaceDetailPanel place={fullPlace} onClose={vi.fn()} />);
    const addresses = screen.getAllByText("123 Test St, Brooklyn, NY 11237");
    expect(addresses.length).toBeGreaterThanOrEqual(1);
    expect(addresses[0]).toBeInTheDocument();
  });

  it("displays hours when present", () => {
    render(<PlaceDetailPanel place={fullPlace} onClose={vi.fn()} />);
    const hours = screen.getAllByText("Mon-Fri 5 PM-12 AM");
    expect(hours.length).toBeGreaterThanOrEqual(1);
    expect(hours[0]).toBeInTheDocument();
  });

  it("omits hours when not present", () => {
    render(<PlaceDetailPanel place={minimalPlace} onClose={vi.fn()} />);
    expect(screen.queryByText("HOURS")).not.toBeInTheDocument();
  });

  it("displays website link when present with correct attributes", () => {
    render(<PlaceDetailPanel place={fullPlace} onClose={vi.fn()} />);
    // Both mobile and desktop panels have the link — check first match
    const links = screen.getAllByTestId("detail-website-link");
    expect(links.length).toBeGreaterThanOrEqual(1);
    const link = links[0]!;
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener");
  });

  it("omits website link when not present", () => {
    render(<PlaceDetailPanel place={minimalPlace} onClose={vi.fn()} />);
    expect(screen.queryByTestId("detail-website-link")).not.toBeInTheDocument();
  });

  it("calls onClose when X button is clicked", () => {
    const handleClose = vi.fn();
    render(<PlaceDetailPanel place={fullPlace} onClose={handleClose} />);
    const closeButton = screen.getByTestId("detail-panel-close");
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("displays formatted URL (without protocol)", () => {
    render(<PlaceDetailPanel place={fullPlace} onClose={vi.fn()} />);
    const links = screen.getAllByTestId("detail-website-link");
    expect(links.length).toBeGreaterThanOrEqual(1);
    expect(links[0]).toHaveTextContent("example.com");
  });
});
