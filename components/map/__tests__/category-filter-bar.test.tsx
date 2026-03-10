import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CATEGORIES, type PlaceCategory } from "@/data/places";

import { CategoryFilterBar } from "../category-filter-bar";

const ALL_CATEGORIES: PlaceCategory[] = [
  "stores",
  "bars",
  "clubs",
  "coffee",
  "restaurants",
  "other",
];

describe("CategoryFilterBar", () => {
  it("renders a button for each category", () => {
    const activeCategories = new Set(ALL_CATEGORIES);
    render(
      <CategoryFilterBar
        activeCategories={activeCategories}
        onToggleCategory={vi.fn()}
      />
    );
    for (const category of ALL_CATEGORIES) {
      const button = screen.getByTestId(`filter-${category}`);
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(CATEGORIES[category].name);
    }
  });

  it("renders the filter bar container with role group", () => {
    render(
      <CategoryFilterBar
        activeCategories={new Set(ALL_CATEGORIES)}
        onToggleCategory={vi.fn()}
      />
    );
    const bar = screen.getByTestId("category-filter-bar");
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveAttribute("role", "group");
  });

  it("marks active categories with aria-pressed=true", () => {
    const activeCategories = new Set<PlaceCategory>(["bars", "coffee"]);
    render(
      <CategoryFilterBar
        activeCategories={activeCategories}
        onToggleCategory={vi.fn()}
      />
    );

    expect(screen.getByTestId("filter-bars")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("filter-coffee")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("filter-stores")).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByTestId("filter-clubs")).toHaveAttribute("aria-pressed", "false");
  });

  it("calls onToggleCategory with correct category when clicked", () => {
    const handleToggle = vi.fn();
    render(
      <CategoryFilterBar
        activeCategories={new Set(ALL_CATEGORIES)}
        onToggleCategory={handleToggle}
      />
    );

    fireEvent.click(screen.getByTestId("filter-bars"));
    expect(handleToggle).toHaveBeenCalledWith("bars");

    fireEvent.click(screen.getByTestId("filter-coffee"));
    expect(handleToggle).toHaveBeenCalledWith("coffee");
  });

  it("uses distinct colors per category from CATEGORIES", () => {
    render(
      <CategoryFilterBar
        activeCategories={new Set(ALL_CATEGORIES)}
        onToggleCategory={vi.fn()}
      />
    );

    // Verify each category button has a unique border color
    const borderColors = new Set<string>();
    for (const category of ALL_CATEGORIES) {
      const button = screen.getByTestId(`filter-${category}`);
      // Browser converts hex to rgb, so just check that borderColor is set
      expect(button.style.borderColor).toBeTruthy();
      borderColors.add(button.style.borderColor);
    }
    // All 6 categories should produce distinct colors
    expect(borderColors.size).toBe(6);
  });

  it("renders all 6 category buttons", () => {
    render(
      <CategoryFilterBar
        activeCategories={new Set(ALL_CATEGORIES)}
        onToggleCategory={vi.fn()}
      />
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(6);
  });

  it("dimmed buttons have reduced opacity color when inactive", () => {
    const activeCategories = new Set<PlaceCategory>(["bars"]);
    render(
      <CategoryFilterBar
        activeCategories={activeCategories}
        onToggleCategory={vi.fn()}
      />
    );

    const inactiveButton = screen.getByTestId("filter-stores");
    const activeButton = screen.getByTestId("filter-bars");
    // Inactive button should have a different (dimmed) border than active
    expect(inactiveButton.style.borderColor).toBeTruthy();
    expect(activeButton.style.borderColor).toBeTruthy();
    expect(inactiveButton.style.borderColor).not.toBe(activeButton.style.borderColor);
    // Inactive should have aria-pressed=false
    expect(inactiveButton).toHaveAttribute("aria-pressed", "false");
  });
});
