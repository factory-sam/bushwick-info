"use client";

import { useCallback, useState } from "react";
import DynamicMap from "@/components/map/dynamic-map";
import { MapLayout } from "@/components/ui/map-layout";
import type { MapMoveEvent } from "@/components/map/map-view";
import { DEFAULT_VIEW_STATE } from "@/lib/map/map-style";

export default function Home() {
  const [mapState, setMapState] = useState<MapMoveEvent>({
    latitude: DEFAULT_VIEW_STATE.latitude,
    longitude: DEFAULT_VIEW_STATE.longitude,
    zoom: DEFAULT_VIEW_STATE.zoom,
  });

  const handleMove = useCallback((event: MapMoveEvent) => {
    setMapState(event);
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-nerv-deep-purple">
      <MapLayout
        latitude={mapState.latitude}
        longitude={mapState.longitude}
        zoom={mapState.zoom}
      >
        <DynamicMap onMove={handleMove} />
      </MapLayout>
    </main>
  );
}
