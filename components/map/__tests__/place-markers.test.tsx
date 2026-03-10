import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { places, CATEGORIES } from "@/data/places";

// Mock react-map-gl/maplibre
vi.mock("react-map-gl/maplibre", () => ({
  Marker: vi.fn(({ children, longitude, latitude }: Record<string, unknown>) => (
    <div data-testid={`marker-${latitude}-${longitude}`}>
      {children as React.ReactNode}
    </div>
  )),
}));

// Mock CSS imports
vi.mock("../targeting-reticle.css", () => ({}));

import { PlaceMarkers } from "../place-markers";

describe("PlaceMarkers", () => {
  it("renders a marker for each place", () => {
    render(
      <PlaceMarkers onSelectPlace={vi.fn()} selectedPlaceId={null} />
    );
    const markerButtons = screen.getAllByRole("button");
    expect(markerButtons).toHaveLength(places.length);
  });

  it("renders markers with aria-labels containing place name and category", () => {
    render(
      <PlaceMarkers onSelectPlace={vi.fn()} selectedPlaceId={null} />
    );
    const firstPlace = places[0]!;
    const categoryName = CATEGORIES[firstPlace.category].name;
    const label = `${firstPlace.name} - ${categoryName}`;
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it("renders markers at correct coordinates for each place", () => {
    render(
      <PlaceMarkers onSelectPlace={vi.fn()} selectedPlaceId={null} />
    );
    for (const place of places) {
      const marker = screen.getByTestId(`marker-${place.lat}-${place.lng}`);
      expect(marker).toBeInTheDocument();
    }
  });

  it("calls onSelectPlace after lock-on animation timeout when a marker is clicked", () => {
    vi.useFakeTimers();
    const handleSelect = vi.fn();
    render(
      <PlaceMarkers onSelectPlace={handleSelect} selectedPlaceId={null} />
    );
    const firstPlace = places[0]!;
    const categoryName = CATEGORIES[firstPlace.category].name;
    const button = screen.getByLabelText(`${firstPlace.name} - ${categoryName}`);
    fireEvent.click(button);

    // Not called immediately (lock-on animation running)
    expect(handleSelect).not.toHaveBeenCalled();

    // After 800ms timeout, the callback fires
    act(() => {
      vi.advanceTimersByTime(800);
    });
    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(firstPlace);

    vi.useRealTimers();
  });

  it("shows targeting reticle on hover", () => {
    render(
      <PlaceMarkers onSelectPlace={vi.fn()} selectedPlaceId={null} />
    );
    const firstPlace = places[0]!;
    const categoryName = CATEGORIES[firstPlace.category].name;
    const button = screen.getByLabelText(`${firstPlace.name} - ${categoryName}`);

    fireEvent.mouseEnter(button);
    expect(screen.getByTestId("targeting-reticle")).toBeInTheDocument();

    fireEvent.mouseLeave(button);
    expect(screen.queryByTestId("targeting-reticle")).not.toBeInTheDocument();
  });

  it("displays place name and category in reticle on hover", () => {
    render(
      <PlaceMarkers onSelectPlace={vi.fn()} selectedPlaceId={null} />
    );
    const firstPlace = places[0]!;
    const categoryName = CATEGORIES[firstPlace.category].name;
    const button = screen.getByLabelText(`${firstPlace.name} - ${categoryName}`);

    fireEvent.mouseEnter(button);
    expect(screen.getByText(firstPlace.name)).toBeInTheDocument();
    expect(screen.getByText(`[${categoryName.toUpperCase()}]`)).toBeInTheDocument();
  });

  it("shows lock-on text when marker is clicked", () => {
    vi.useFakeTimers();
    render(
      <PlaceMarkers onSelectPlace={vi.fn()} selectedPlaceId={null} />
    );
    const firstPlace = places[0]!;
    const categoryName = CATEGORIES[firstPlace.category].name;
    const button = screen.getByLabelText(`${firstPlace.name} - ${categoryName}`);

    fireEvent.click(button);
    expect(screen.getByText("TARGET LOCKED")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(800);
    });
    vi.useRealTimers();
  });

  it("uses distinct colors per category", () => {
    render(
      <PlaceMarkers onSelectPlace={vi.fn()} selectedPlaceId={null} />
    );
    // Verify each category has the correct marker color in CSS
    const allMarkerDots = document.querySelectorAll(".marker-dot");
    expect(allMarkerDots.length).toBe(places.length);

    // Check that different categories produce different colors
    const colorSet = new Set<string>();
    for (const dot of Array.from(allMarkerDots)) {
      const bg = (dot as HTMLElement).style.backgroundColor;
      colorSet.add(bg);
    }
    // We have 6 categories, so at least 6 unique colors
    expect(colorSet.size).toBeGreaterThanOrEqual(6);
  });
});
