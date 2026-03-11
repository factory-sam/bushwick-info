"use client";

import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { CATEGORIES, type Place, type PlaceCategory } from "@/data/places";

export interface SearchBarProps {
  places: Place[];
  activeCategories: Set<PlaceCategory>;
  onSelectPlace: (place: Place) => void;
}

/**
 * Cyberpunk-styled search bar with typeahead dropdown.
 * Case-insensitive substring match on place name.
 * Results scoped to active category filters.
 * Clicking a result selects that place (opens detail panel, flies to marker).
 * Clear button (X) restores all markers.
 */
export function SearchBar({ places, activeCategories, onSelectPlace }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredResults = useMemo(
    () =>
      query.trim().length > 0
        ? places.filter(
            (place) =>
              activeCategories.has(place.category) &&
              place.name.toLowerCase().includes(query.toLowerCase())
          )
        : [],
    [query, places, activeCategories]
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
    setHighlightedIndex(-1);
  }, []);

  const handleClear = useCallback(() => {
    setQuery("");
    setIsOpen(false);
    setHighlightedIndex(-1);
  }, []);

  const handleSelectResult = useCallback(
    (place: Place) => {
      setQuery("");
      setIsOpen(false);
      setHighlightedIndex(-1);
      onSelectPlace(place);
    },
    [onSelectPlace]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen || filteredResults.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filteredResults.length - 1));
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < filteredResults.length) {
            handleSelectResult(filteredResults[highlightedIndex]!);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
      }
    },
    [isOpen, filteredResults, highlightedIndex, handleSelectResult]
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showDropdown = isOpen && query.trim().length > 0;

  return (
    <div
      ref={containerRef}
      className="pointer-events-auto relative w-full"
      data-testid="search-bar-container"
    >
      {/* Search input */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim().length > 0 && setIsOpen(true)}
          placeholder="SEARCH TARGETS..."
          data-testid="search-input"
          role="combobox"
          aria-controls="search-listbox"
          aria-expanded={showDropdown}
          aria-activedescendant={
            highlightedIndex >= 0 && filteredResults[highlightedIndex]
              ? `search-option-${filteredResults[highlightedIndex]!.id}`
              : undefined
          }
          className="w-full border bg-nerv-black/60 px-3 py-2 font-mono text-sm tracking-wider text-nerv-green placeholder-nerv-green/30 outline-none backdrop-blur-sm transition-colors focus:border-nerv-green"
          style={{
            borderColor: "rgba(88, 242, 165, 0.4)",
            clipPath:
              "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
            boxShadow: "0 0 6px rgba(88, 242, 165, 0.1)",
          }}
        />
        {query.length > 0 && (
          <button
            onClick={handleClear}
            data-testid="search-clear"
            className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-sm text-nerv-green/60 transition-colors hover:text-nerv-green"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Dropdown results */}
      {showDropdown && (
        <div
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-64 overflow-y-auto border border-nerv-green/30 bg-nerv-deep-purple/95 backdrop-blur-md"
          data-testid="search-dropdown"
          id="search-listbox"
          role="listbox"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
            boxShadow: "0 0 8px rgba(88, 242, 165, 0.15), 0 4px 20px rgba(0, 0, 0, 0.4)",
          }}
        >
          {filteredResults.length > 0 ? (
            filteredResults.map((place, index) => {
              const categoryInfo = CATEGORIES[place.category];
              const isHighlighted = index === highlightedIndex;
              return (
                <button
                  key={place.id}
                  id={`search-option-${place.id}`}
                  onClick={() => handleSelectResult(place)}
                  data-testid={`search-result-${place.id}`}
                  role="option"
                  aria-selected={isHighlighted}
                  className={`flex w-full items-center gap-2 border-b border-nerv-green/10 px-3 py-2 text-left transition-colors hover:bg-nerv-green/10 ${
                    isHighlighted ? "bg-nerv-green/15" : ""
                  }`}
                >
                  {/* Category color dot */}
                  <span
                    className="h-2 w-2 flex-shrink-0 rounded-full"
                    style={{
                      backgroundColor: categoryInfo.color,
                      boxShadow: `0 0 4px ${categoryInfo.color}`,
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-mono text-xs uppercase tracking-wider text-white/90">
                      {place.name}
                    </div>
                    <div
                      className="font-mono text-xs"
                      style={{ color: `${categoryInfo.color}80`, fontSize: "10px" }}
                    >
                      [{categoryInfo.name.toUpperCase()}]
                    </div>
                  </div>
                </button>
              );
            })
          ) : (
            <div
              className="px-3 py-4 text-center font-mono text-xs uppercase tracking-widest text-nerv-green/50"
              data-testid="search-no-results"
            >
              NO TARGETS FOUND
            </div>
          )}
        </div>
      )}
    </div>
  );
}
