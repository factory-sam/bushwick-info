"use client";

import { CATEGORIES, type PlaceCategory } from "@/data/places";

export interface CategoryFilterBarProps {
  activeCategories: Set<PlaceCategory>;
  onToggleCategory: (category: PlaceCategory) => void;
}

const CATEGORY_ORDER: PlaceCategory[] = [
  "stores",
  "bars",
  "clubs",
  "coffee",
  "restaurants",
  "other",
];

/**
 * Horizontal row of NERV-styled category filter toggle buttons.
 * Each button shows the category name with its marker color.
 * Active buttons glow with neon color; inactive are dimmed.
 * Scrolls horizontally on mobile.
 */
export function CategoryFilterBar({
  activeCategories,
  onToggleCategory,
}: CategoryFilterBarProps) {
  return (
    <div
      className="pointer-events-auto flex gap-2 overflow-x-auto px-1 py-1 scrollbar-hide"
      data-testid="category-filter-bar"
      role="group"
      aria-label="Category filters"
    >
      {CATEGORY_ORDER.map((category) => {
        const info = CATEGORIES[category];
        const isActive = activeCategories.has(category);

        return (
          <button
            key={category}
            onClick={() => onToggleCategory(category)}
            data-testid={`filter-${category}`}
            aria-pressed={isActive}
            className="relative flex-shrink-0 whitespace-nowrap border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-200"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
              borderColor: isActive ? info.color : `${info.color}30`,
              backgroundColor: isActive
                ? `${info.color}15`
                : "rgba(29, 29, 58, 0.6)",
              color: isActive ? info.color : `${info.color}50`,
              boxShadow: isActive
                ? `0 0 6px ${info.color}40, 0 0 12px ${info.color}20, inset 0 0 6px ${info.color}15`
                : "none",
              textShadow: isActive
                ? `0 0 7px ${info.color}, 0 0 10px ${info.color}`
                : "none",
            }}
          >
            {info.name}
          </button>
        );
      })}
    </div>
  );
}
