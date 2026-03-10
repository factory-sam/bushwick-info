"use client";

import { useCallback, useState, useRef, useEffect } from "react";
import { Marker } from "react-map-gl/maplibre";
import { places, CATEGORIES, type Place } from "@/data/places";
import { TargetingReticle } from "./targeting-reticle";
import "./targeting-reticle.css";

export interface PlaceMarkersProps {
  onSelectPlace: (place: Place) => void;
  selectedPlaceId: string | null;
}

export function PlaceMarkers({ onSelectPlace, selectedPlaceId }: PlaceMarkersProps) {
  const [hoveredPlaceId, setHoveredPlaceId] = useState<string | null>(null);
  const [lockingPlaceId, setLockingPlaceId] = useState<string | null>(null);
  const lockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (lockTimeoutRef.current) {
        clearTimeout(lockTimeoutRef.current);
      }
    };
  }, []);

  const handleMarkerClick = useCallback(
    (place: Place) => {
      if (lockingPlaceId) return;

      setLockingPlaceId(place.id);
      setHoveredPlaceId(null);

      // After lock-on animation completes, open detail panel
      lockTimeoutRef.current = setTimeout(() => {
        setLockingPlaceId(null);
        onSelectPlace(place);
      }, 800);
    },
    [onSelectPlace, lockingPlaceId]
  );

  const handleMouseEnter = useCallback(
    (placeId: string) => {
      if (lockingPlaceId || selectedPlaceId === placeId) return;
      setHoveredPlaceId(placeId);
    },
    [lockingPlaceId, selectedPlaceId]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredPlaceId(null);
  }, []);

  return (
    <>
      {places.map((place) => {
        const categoryInfo = CATEGORIES[place.category];
        const isHovered = hoveredPlaceId === place.id;
        const isLocking = lockingPlaceId === place.id;
        const isSelected = selectedPlaceId === place.id;

        return (
          <Marker
            key={place.id}
            longitude={place.lng}
            latitude={place.lat}
            anchor="center"
            style={{ zIndex: isHovered || isLocking || isSelected ? 100 : 10 }}
          >
            <div
              className="relative flex items-center justify-center"
              onMouseEnter={() => handleMouseEnter(place.id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleMarkerClick(place)}
              role="button"
              tabIndex={0}
              aria-label={`${place.name} - ${categoryInfo.name}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleMarkerClick(place);
                }
              }}
            >
              {/* Targeting reticle — shown on hover or lock-on */}
              {(isHovered || isLocking) && (
                <TargetingReticle
                  place={place}
                  color={categoryInfo.color}
                  isLocking={isLocking}
                />
              )}

              {/* Selected indicator ring */}
              {isSelected && (
                <div
                  className="absolute h-8 w-8 rounded-full"
                  style={{
                    border: `2px solid ${categoryInfo.color}`,
                    boxShadow: `0 0 8px ${categoryInfo.color}, 0 0 16px ${categoryInfo.color}`,
                  }}
                />
              )}

              {/* Marker dot */}
              <div
                className="marker-dot relative h-3.5 w-3.5 cursor-pointer rounded-full"
                style={
                  {
                    backgroundColor: categoryInfo.color,
                    "--marker-color": categoryInfo.color,
                    boxShadow: `0 0 4px ${categoryInfo.color}, 0 0 8px ${categoryInfo.color}`,
                  } as React.CSSProperties
                }
              />
            </div>
          </Marker>
        );
      })}
    </>
  );
}
