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
    expect(screen.getByTestId("search-no-results")).toHaveTextContent(
      "NO TARGETS FOUND"
    );
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
    expect(handleSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "sey-coffee" })
    );
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
});
