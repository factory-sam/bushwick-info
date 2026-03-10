"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Map, { NavigationControl, Source, Layer } from "react-map-gl/maplibre";
import type { MapRef } from "react-map-gl/maplibre";
import type { LngLatBoundsLike, FilterSpecification, FillLayerSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map-controls.css";
import { createDarkMapStyle, DEFAULT_VIEW_STATE, MAP_BOUNDS } from "@/lib/map/map-style";
import { createBoundaryFadeGeoJSON, createBoundaryFadeLayers } from "@/lib/map/map-bounds";
import { PlaceMarkers } from "./place-markers";
import { PlaceDetailPanel } from "./place-detail-panel";
import { CategoryFilterBar } from "./category-filter-bar";
import { SearchBar } from "./search-bar";
import { EmptyStateMessage } from "./empty-state-message";
import { places, type Place, type PlaceCategory } from "@/data/places";

export interface MapMoveEvent {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface MapViewProps {
  onMove?: (event: MapMoveEvent) => void;
}

const ALL_CATEGORIES: PlaceCategory[] = [
  "stores",
  "bars",
  "clubs",
  "coffee",
  "restaurants",
  "other",
];

export default function MapView({ onMove }: MapViewProps) {
  const mapRef = useRef<MapRef>(null);
  const zoomRef = useRef<number>(DEFAULT_VIEW_STATE.zoom);
  const [viewState, setViewState] = useState<{
    latitude: number;
    longitude: number;
    zoom: number;
    pitch: number;
    bearing: number;
  }>({
    ...DEFAULT_VIEW_STATE,
  });

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [activeCategories, setActiveCategories] = useState<Set<PlaceCategory>>(
    () => new Set(ALL_CATEGORIES)
  );

  // Filter places by active categories
  const visiblePlaces = useMemo(
    () => places.filter((p) => activeCategories.has(p.category)),
    [activeCategories]
  );

  const allFiltered = activeCategories.size === 0;

  // Close detail panel if selected place's category is filtered out
  useEffect(() => {
    if (selectedPlace && !activeCategories.has(selectedPlace.category)) {
      setSelectedPlace(null);
    }
  }, [activeCategories, selectedPlace]);

  const mapStyle = useMemo(() => createDarkMapStyle(), []);
  const fadeGeoJSON = useMemo(() => createBoundaryFadeGeoJSON(), []);
  const fadeLayers = useMemo(() => createBoundaryFadeLayers(), []);

  const maxBounds: LngLatBoundsLike = useMemo(
    () => [
      [MAP_BOUNDS.maxBounds.sw[0], MAP_BOUNDS.maxBounds.sw[1]] as [number, number],
      [MAP_BOUNDS.maxBounds.ne[0], MAP_BOUNDS.maxBounds.ne[1]] as [number, number],
    ],
    []
  );

  const handleMove = useCallback(
    (evt: { viewState: { latitude: number; longitude: number; zoom: number; pitch: number; bearing: number } }) => {
      setViewState(evt.viewState);
      zoomRef.current = evt.viewState.zoom;
      onMove?.({
        latitude: evt.viewState.latitude,
        longitude: evt.viewState.longitude,
        zoom: evt.viewState.zoom,
      });
    },
    [onMove]
  );

  const handleSelectPlace = useCallback((place: Place) => {
    setSelectedPlace(place);

    // Fly camera to selected marker — read zoom from ref to keep callback stable
    mapRef.current?.flyTo({
      center: [place.lng, place.lat],
      zoom: Math.max(zoomRef.current, 16),
      duration: 1200,
      essential: true,
    });
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedPlace(null);
  }, []);

  const handleMapClick = useCallback(
    (evt: { originalEvent: MouseEvent }) => {
      // Close panel when clicking empty map area (not a marker)
      const target = evt.originalEvent.target as HTMLElement;
      // If the click target is the map canvas itself, close the panel
      if (target.tagName === "CANVAS" && selectedPlace) {
        setSelectedPlace(null);
      }
    },
    [selectedPlace]
  );

  const handleToggleCategory = useCallback((category: PlaceCategory) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }, []);

  return (
    <div className="h-full w-full" data-testid="map-container">
      <Map
        ref={mapRef}
        {...viewState}
        onMove={handleMove}
        onClick={handleMapClick}
        mapStyle={mapStyle}
        minZoom={MAP_BOUNDS.minZoom}
        maxZoom={MAP_BOUNDS.maxZoom}
        maxBounds={maxBounds}
        maxPitch={85}
        style={{ width: "100%", height: "100%" }}
        attributionControl={{ compact: true }}
      >
        <NavigationControl position="bottom-right" showCompass={false} />

        {/* Boundary fade overlay — dark vignette outside Bushwick area
             beforeId positions fade layers below the first label/text layer
             so labels remain readable in the fade zone */}
        <Source id="boundary-fade" type="geojson" data={fadeGeoJSON}>
          {fadeLayers.map((layer) => (
            <Layer
              key={layer.id}
              id={layer.id}
              type={"fill" satisfies FillLayerSpecification["type"]}
              source="boundary-fade"
              paint={layer.paint as FillLayerSpecification["paint"]}
              filter={layer.filter as FilterSpecification}
              beforeId="water_name_point_label"
            />
          ))}
        </Source>

        {/* Place markers with NGE targeting reticle — only visible categories */}
        <PlaceMarkers
          onSelectPlace={handleSelectPlace}
          selectedPlaceId={selectedPlace?.id ?? null}
          visiblePlaces={visiblePlaces}
        />
      </Map>

      {/* Category filter bar and search — positioned top-right over the map */}
      <div className="pointer-events-none absolute right-0 top-16 z-20 flex w-full flex-col gap-1.5 px-3 md:top-14 md:w-96 md:gap-2 md:px-4">
        <SearchBar
          places={places}
          activeCategories={activeCategories}
          onSelectPlace={handleSelectPlace}
        />
        <CategoryFilterBar
          activeCategories={activeCategories}
          onToggleCategory={handleToggleCategory}
        />
      </div>

      {/* Empty state when all categories are filtered out */}
      {allFiltered && <EmptyStateMessage />}

      {/* Detail panel — rendered outside Map to overlay properly */}
      <PlaceDetailPanel place={selectedPlace} onClose={handleClosePanel} />
    </div>
  );
}
