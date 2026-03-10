"use client";

import { useCallback, useState } from "react";
import Map, { NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map-controls.css";
import { createDarkMapStyle, DEFAULT_VIEW_STATE, MAP_BOUNDS } from "@/lib/map/map-style";

export interface MapMoveEvent {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface MapViewProps {
  onMove?: (event: MapMoveEvent) => void;
}

export default function MapView({ onMove }: MapViewProps) {
  const [viewState, setViewState] = useState<{
    latitude: number;
    longitude: number;
    zoom: number;
    pitch: number;
    bearing: number;
  }>({
    ...DEFAULT_VIEW_STATE,
  });

  const mapStyle = createDarkMapStyle();

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

  return (
    <div className="h-full w-full" data-testid="map-container">
      <Map
        {...viewState}
        onMove={handleMove}
        mapStyle={mapStyle}
        minZoom={MAP_BOUNDS.minZoom}
        maxZoom={MAP_BOUNDS.maxZoom}
        maxPitch={85}
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
      >
        <NavigationControl position="bottom-right" showCompass={false} />
      </Map>
    </div>
  );
}
