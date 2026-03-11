import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { places, type PlaceCategory } from "@/data/places";

import { SearchBar } from "../search-bar";

const ALL_CATEGORIES: PlaceCategory[] = [
  "stores",
  "bars",
  "clubs",
  "coffee",
  "restaurants",
  "other",
];

describe("SearchBar", () => {
  it("renders the search input with correct placeholder", () => {
    render(
      <SearchBar
        places={places}
        activeCategories={new Set(ALL_CATEGORIES)}
        onSelectPlace={vi.fn()}
      />
    );
    const input = screen.getByTestId("search-input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "SEARCH TARGETS...");
  });

  it("does not show dropdown when input is empty", () => {
    render(
      <SearchBar
        places={places}
        activeCategories={new Set(ALL_CATEGORIES)}
        onSelectPlace={vi.fn()}
      />
    );
    expect(screen.queryByTestId("search-dropdown")).not.toBeInTheDocument();
  });

  it("shows dropdown with results when typing a matching query", () => {
    render(
      <SearchBar
        places={places}
        activeCategories={new Set(ALL_CATEGORIES)}
        onSelectPlace={vi.fn()}
      />
    );
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "sey" } });
    expect(screen.getByTestId("search-dropdown")).toBeInTheDocument();
    expect(screen.getByTestId("search-result-sey-coffee")).toBeInTheDocument();
  });

  it("performs case-insensitive search", () => {
    render(
      <SearchBar
        places={places}
        activeCategories={new Set(ALL_CATEGORIES)}
        onSelectPlace={vi.fn()}
      />
    );
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "SEY" } });
    expect(screen.getByTestId("search-result-sey-coffee")).toBeInTheDocument();
  });

  it("shows NO TARGETS FOUND when query matches nothing", () => {
    render(
      <SearchBar
        places={places}
        activeCategories={new Set(ALL_CATEGORIES)}
        onSelectPlace={vi.fn()}
      />
    );
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "zzznonexistent" } });
    expect(screen.getByTestId("search-no-results")).toBeInTheDocument();
    expect(screen.getByTestId("search-no-results")).toHaveTextContent("NO TARGETS FOUND");
  });

  it("scopes search results to active categories only", () => {
    // Only coffee active
    render(
      <SearchBar
        places={places}
        activeCategories={new Set<PlaceCategory>(["coffee"])}
        onSelectPlace={vi.fn()}
      />
    );
    const input = screen.getByTestId("search-input");
    // "mood ring" is a bar, should not appear when only coffee is active
    fireEvent.change(input, { target: { value: "mood" } });
    expect(screen.queryByTestId("search-result-mood-ring")).not.toBeInTheDocument();
    expect(screen.getByTestId("search-no-results")).toBeInTheDocument();
  });

  it("calls onSelectPlace when a result is clicked", () => {
    const handleSelect = vi.fn();
    render(
      <SearchBar
        places={places}
        activeCategories={new Set(ALL_CATEGORIES)}
        onSelectPlace={handleSelect}
      />
    );
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "sey" } });
    fireEvent.click(screen.getByTestId("search-result-sey-coffee"));
    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "sey-coffee" }));
  });

  it("clears input and closes dropdown when result is selected", () => {
    render(
      <SearchBar
        places={places}
        activeCategories={new Set(ALL_CATEGORIES)}
        onSelectPlace={vi.fn()}
      />
    );
    const input = screen.getByTestId("search-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "sey" } });
    fireEvent.click(screen.getByTestId("search-result-sey-coffee"));
    expect(input.value).toBe("");
    expect(screen.queryByTestId("search-dropdown")).not.toBeInTheDocument();
  });

  it("shows clear button when there is text and clears on click", () => {
    render(
      <SearchBar
        places={places}
        activeCategories={new Set(ALL_CATEGORIES)}
        onSelectPlace={vi.fn()}
      />
    );
    const input = screen.getByTestId("search-input") as HTMLInputElement;

    // No clear button when empty
    expect(screen.queryByTestId("search-clear")).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: "test" } });
    const clearButton = screen.getByTestId("search-clear");
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(input.value).toBe("");
    expect(screen.queryByTestId("search-dropdown")).not.toBeInTheDocument();
  });

  it("shows multiple matching results", () => {
    render(
      <SearchBar
        places={places}
        activeCategories={new Set(ALL_CATEGORIES)}
        onSelectPlace={vi.fn()}
      />
    );
    const input = screen.getByTestId("search-input");
    // "bar" should match "Starr Bar" and "Birdy's" etc (via substring)
    fireEvent.change(input, { target: { value: "bar" } });
    const dropdown = screen.getByTestId("search-dropdown");
    expect(dropdown).toBeInTheDocument();
    // At minimum, "Starr Bar" should be there
    expect(screen.getByTestId("search-result-starr-bar")).toBeInTheDocument();
  });

  describe("arrow-key keyboard navigation", () => {
    it("ArrowDown highlights the first result", () => {
      render(
        <SearchBar
          places={places}
          activeCategories={new Set(ALL_CATEGORIES)}
          onSelectPlace={vi.fn()}
        />
      );
      const input = screen.getByTestId("search-input");
      fireEvent.change(input, { target: { value: "sey" } });
      fireEvent.keyDown(input, { key: "ArrowDown" });
      const result = screen.getByTestId("search-result-sey-coffee");
      expect(result).toHaveAttribute("aria-selected", "true");
    });

    it("ArrowDown wraps from last to first result", () => {
      render(
        <SearchBar
          places={places}
          activeCategories={new Set(ALL_CATEGORIES)}
          onSelectPlace={vi.fn()}
        />
      );
      const input = screen.getByTestId("search-input");
      // Search for something with exactly one result
      fireEvent.change(input, { target: { value: "sey" } });
      // Press down once to highlight index 0, then again to wrap to 0
      fireEvent.keyDown(input, { key: "ArrowDown" });
      fireEvent.keyDown(input, { key: "ArrowDown" });
      // With only one result, wrapping back to 0
      const result = screen.getByTestId("search-result-sey-coffee");
      expect(result).toHaveAttribute("aria-selected", "true");
    });

    it("ArrowUp from first result wraps to last result", () => {
      render(
        <SearchBar
          places={places}
          activeCategories={new Set(ALL_CATEGORIES)}
          onSelectPlace={vi.fn()}
        />
      );
      const input = screen.getByTestId("search-input");
      fireEvent.change(input, { target: { value: "sey" } });
      // First go down to select index 0
      fireEvent.keyDown(input, { key: "ArrowDown" });
      // Then up should wrap to last (which is also 0 for single result)
      fireEvent.keyDown(input, { key: "ArrowUp" });
      const result = screen.getByTestId("search-result-sey-coffee");
      expect(result).toHaveAttribute("aria-selected", "true");
    });

    it("Enter selects the highlighted result", () => {
      const handleSelect = vi.fn();
      render(
        <SearchBar
          places={places}
          activeCategories={new Set(ALL_CATEGORIES)}
          onSelectPlace={handleSelect}
        />
      );
      const input = screen.getByTestId("search-input");
      fireEvent.change(input, { target: { value: "sey" } });
      fireEvent.keyDown(input, { key: "ArrowDown" });
      fireEvent.keyDown(input, { key: "Enter" });
      expect(handleSelect).toHaveBeenCalledTimes(1);
      expect(handleSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "sey-coffee" }));
    });

    it("Enter does nothing when no result is highlighted", () => {
      const handleSelect = vi.fn();
      render(
        <SearchBar
          places={places}
          activeCategories={new Set(ALL_CATEGORIES)}
          onSelectPlace={handleSelect}
        />
      );
      const input = screen.getByTestId("search-input");
      fireEvent.change(input, { target: { value: "sey" } });
      // Press Enter without pressing ArrowDown first
      fireEvent.keyDown(input, { key: "Enter" });
      expect(handleSelect).not.toHaveBeenCalled();
    });

    it("Escape closes the dropdown and resets highlight", () => {
      render(
        <SearchBar
          places={places}
          activeCategories={new Set(ALL_CATEGORIES)}
          onSelectPlace={vi.fn()}
        />
      );
      const input = screen.getByTestId("search-input");
      fireEvent.change(input, { target: { value: "sey" } });
      expect(screen.getByTestId("search-dropdown")).toBeInTheDocument();
      fireEvent.keyDown(input, { key: "Escape" });
      expect(screen.queryByTestId("search-dropdown")).not.toBeInTheDocument();
    });

    it("typing resets the highlighted index", () => {
      const handleSelect = vi.fn();
      render(
        <SearchBar
          places={places}
          activeCategories={new Set(ALL_CATEGORIES)}
          onSelectPlace={handleSelect}
        />
      );
      const input = screen.getByTestId("search-input");
      fireEvent.change(input, { target: { value: "sey" } });
      fireEvent.keyDown(input, { key: "ArrowDown" });
      // Now type more, which should reset highlight
      fireEvent.change(input, { target: { value: "sey c" } });
      // Enter should do nothing since highlight was reset
      fireEvent.keyDown(input, { key: "Enter" });
      expect(handleSelect).not.toHaveBeenCalled();
    });

    it("search input has combobox role and aria attributes", () => {
      render(
        <SearchBar
          places={places}
          activeCategories={new Set(ALL_CATEGORIES)}
          onSelectPlace={vi.fn()}
        />
      );
      const input = screen.getByTestId("search-input");
      expect(input).toHaveAttribute("role", "combobox");
      expect(input).toHaveAttribute("aria-expanded", "false");

      fireEvent.change(input, { target: { value: "sey" } });
      expect(input).toHaveAttribute("aria-expanded", "true");
    });

    it("dropdown has listbox role and results have option role", () => {
      render(
        <SearchBar
          places={places}
          activeCategories={new Set(ALL_CATEGORIES)}
          onSelectPlace={vi.fn()}
        />
      );
      const input = screen.getByTestId("search-input");
      fireEvent.change(input, { target: { value: "sey" } });
      const dropdown = screen.getByTestId("search-dropdown");
      expect(dropdown).toHaveAttribute("role", "listbox");
      const result = screen.getByTestId("search-result-sey-coffee");
      expect(result).toHaveAttribute("role", "option");
    });
  });
});
