import { describe, it, expect } from "vitest";
import { places, CATEGORIES, type PlaceCategory } from "../places";

const VALID_CATEGORIES: PlaceCategory[] = [
  "stores",
  "bars",
  "clubs",
  "coffee",
  "restaurants",
  "other",
];

// Expanded Bushwick bounds per architecture docs
const BOUNDS = {
  minLat: 40.68,
  maxLat: 40.72,
  minLng: -73.945,
  maxLng: -73.89,
};

describe("places data", () => {
  it("exports exactly 53 curated places", () => {
    expect(places).toHaveLength(53);
  });

  it("every place has all required fields", () => {
    for (const place of places) {
      expect(place.id).toBeTruthy();
      expect(typeof place.id).toBe("string");

      expect(place.name).toBeTruthy();
      expect(typeof place.name).toBe("string");

      expect(place.description).toBeTruthy();
      expect(typeof place.description).toBe("string");

      expect(VALID_CATEGORIES).toContain(place.category);

      expect(place.address).toBeTruthy();
      expect(typeof place.address).toBe("string");

      expect(typeof place.lat).toBe("number");
      expect(typeof place.lng).toBe("number");
    }
  });

  it("every place has a unique id", () => {
    const ids = places.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("all coordinates are within expanded Bushwick bounds", () => {
    for (const place of places) {
      expect(place.lat).toBeGreaterThanOrEqual(BOUNDS.minLat);
      expect(place.lat).toBeLessThanOrEqual(BOUNDS.maxLat);
      expect(place.lng).toBeGreaterThanOrEqual(BOUNDS.minLng);
      expect(place.lng).toBeLessThanOrEqual(BOUNDS.maxLng);
    }
  });

  it("all 6 categories are represented", () => {
    const categoriesUsed = new Set(places.map((p) => p.category));
    for (const cat of VALID_CATEGORIES) {
      expect(categoriesUsed.has(cat)).toBe(true);
    }
  });

  it("every category value is valid", () => {
    for (const place of places) {
      expect(VALID_CATEGORIES).toContain(place.category);
    }
  });

  it("optional fields are either undefined or non-empty strings", () => {
    for (const place of places) {
      if (place.hours !== undefined) {
        expect(typeof place.hours).toBe("string");
        expect(place.hours.length).toBeGreaterThan(0);
      }
      if (place.website !== undefined) {
        expect(typeof place.website).toBe("string");
        expect(place.website.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("CATEGORIES constant", () => {
  it("has all 6 categories", () => {
    for (const cat of VALID_CATEGORIES) {
      expect(CATEGORIES[cat]).toBeDefined();
    }
  });

  it("each category has a display name and color hex", () => {
    for (const cat of VALID_CATEGORIES) {
      const info = CATEGORIES[cat];
      expect(info.name).toBeTruthy();
      expect(typeof info.name).toBe("string");
      expect(info.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });

  it("has correct color hex values from the EVA design system", () => {
    expect(CATEGORIES.bars.color).toBe("#F0903A");
    expect(CATEGORIES.coffee.color).toBe("#58F2A5");
    expect(CATEGORIES.restaurants.color).toBe("#54A2D4");
    expect(CATEGORIES.clubs.color).toBe("#BF00FF");
    expect(CATEGORIES.stores.color).toBe("#F6E201");
    expect(CATEGORIES.other.color).toBe("#E81900");
  });

  it("has correct display names", () => {
    expect(CATEGORIES.bars.name).toBe("Bars");
    expect(CATEGORIES.coffee.name).toBe("Coffee");
    expect(CATEGORIES.restaurants.name).toBe("Restaurants");
    expect(CATEGORIES.clubs.name).toBe("Clubs");
    expect(CATEGORIES.stores.name).toBe("Stores");
    expect(CATEGORIES.other.name).toBe("Other");
  });
});
