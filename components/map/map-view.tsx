"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Map, { NavigationControl, Source, Layer } from "react-map-gl/maplibre";
import type { MapRef } from "react-map-gl/maplibre";
import type { LngLatBoundsLike, FilterSpecification, FillLayerSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map-controls.css";
import { createDarkMapStyle, DEFAULT_VIEW_STATE, MAP_BOUNDS } from "@/lib/map/map-style";
import { createBoundaryFadeGeoJSON, createBoundaryFadeLayers } from "@/lib/map/map-bounds";
import { PlaceMarkers } from "./place-markers";
import { PlaceDetailPanel } from "./place-detail-panel";
import type { Place } from "@/data/places";

export interface MapMoveEvent {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface MapViewProps {
  onMove?: (event: MapMoveEvent) => void;
}

export default function MapView({ onMove }: MapViewProps) {
  const mapRef = useRef<MapRef>(null);
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

    // Fly camera to selected marker
    mapRef.current?.flyTo({
      center: [place.lng, place.lat],
      zoom: Math.max(viewState.zoom, 16),
      duration: 1200,
      essential: true,
    });
  }, [viewState.zoom]);

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

        {/* Boundary fade overlay — dark vignette outside Bushwick area */}
        <Source id="boundary-fade" type="geojson" data={fadeGeoJSON}>
          {fadeLayers.map((layer) => (
            <Layer
              key={layer.id}
              id={layer.id}
              type={"fill" satisfies FillLayerSpecification["type"]}
              source="boundary-fade"
              paint={layer.paint as FillLayerSpecification["paint"]}
              filter={layer.filter as FilterSpecification}
            />
          ))}
        </Source>

        {/* Place markers with NGE targeting reticle */}
        <PlaceMarkers
          onSelectPlace={handleSelectPlace}
          selectedPlaceId={selectedPlace?.id ?? null}
        />
      </Map>

      {/* Detail panel — rendered outside Map to overlay properly */}
      <PlaceDetailPanel place={selectedPlace} onClose={handleClosePanel} />
    </div>
  );
}
