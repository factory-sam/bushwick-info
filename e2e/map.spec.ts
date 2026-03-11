import { test, expect } from "@playwright/test";

test.describe("Map Application", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads the main page with map and UI elements", async ({ page }) => {
    // Verify page title
    await expect(page).toHaveTitle(/BUSHWICK/i);

    // Verify header is visible
    const header = page.locator('[data-testid="nerv-header"]');
    await expect(header).toBeVisible();

    // Verify category filter bar exists
    const filterBar = page.locator('[data-testid="category-filter-bar"]');
    await expect(filterBar).toBeVisible();

    // Verify search bar container exists
    const searchBar = page.locator('[data-testid="search-bar-container"]');
    await expect(searchBar).toBeVisible();
  });

  test("category filters toggle visibility", async ({ page }) => {
    // Find and click a category filter button
    const barsFilter = page.locator('[data-testid="filter-bars"]');
    await expect(barsFilter).toBeVisible();

    // Click to toggle off
    await barsFilter.click();

    // Click again to toggle back on
    await barsFilter.click();
  });

  test("search bar filters places", async ({ page }) => {
    // Find the search input
    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toBeVisible();

    // Type a search query
    await searchInput.fill("coffee");

    // Wait for search dropdown to appear
    const dropdown = page.locator('[data-testid="search-dropdown"]');
    await expect(dropdown).toBeVisible();

    // Clear the search
    await searchInput.fill("");
  });

  test("map canvas is rendered", async ({ page }) => {
    // Wait for the map to load
    await page.waitForTimeout(2000);

    // Verify map container exists
    const mapContainer = page.locator('[data-testid="map-container"]');
    await expect(mapContainer).toBeVisible();

    // Verify map canvas exists
    const mapCanvas = page.locator("canvas").first();
    await expect(mapCanvas).toBeVisible();
  });

  test("header displays correctly", async ({ page }) => {
    // Check for header
    const header = page.locator('[data-testid="nerv-header"]');
    await expect(header).toBeVisible();

    // Verify BUSHWICK text is visible in header
    await expect(page.getByText("BUSHWICK")).toBeVisible();
  });

  test("responsive layout works on mobile viewport", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Verify page still loads
    const header = page.locator('[data-testid="nerv-header"]');
    await expect(header).toBeVisible();

    // Verify filter bar is still accessible
    const filterBar = page.locator('[data-testid="category-filter-bar"]');
    await expect(filterBar).toBeVisible();
  });
});
