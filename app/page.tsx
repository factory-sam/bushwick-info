"use client";

import { useCallback, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DynamicMap from "@/components/map/dynamic-map";
import { MapLayout } from "@/components/ui/map-layout";
import { BootSequence } from "@/components/ui/boot-sequence";
import type { MapMoveEvent } from "@/components/map/map-view";
import { DEFAULT_VIEW_STATE } from "@/lib/map/map-style";

function HomeContent() {
  const searchParams = useSearchParams();
  const initialPlaceId = searchParams.get("place");

  const [isBooting, setIsBooting] = useState(true);
  const [mapState, setMapState] = useState<MapMoveEvent>({
    latitude: DEFAULT_VIEW_STATE.latitude,
    longitude: DEFAULT_VIEW_STATE.longitude,
    zoom: DEFAULT_VIEW_STATE.zoom,
  });

  // Check if we should skip boot (returning from directory with place selected)
  useEffect(() => {
    if (initialPlaceId) {
      setIsBooting(false);
    }
  }, [initialPlaceId]);

  const handleMove = useCallback((event: MapMoveEvent) => {
    setMapState(event);
  }, []);

  const handleBootComplete = useCallback(() => {
    setIsBooting(false);
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-nerv-deep-purple">
      {isBooting ? (
        <BootSequence onComplete={handleBootComplete} />
      ) : (
        <MapLayout latitude={mapState.latitude} longitude={mapState.longitude} zoom={mapState.zoom}>
          <DynamicMap onMove={handleMove} initialPlaceId={initialPlaceId} />
        </MapLayout>
      )}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={<main className="relative h-screen w-screen overflow-hidden bg-nerv-deep-purple" />}
    >
      <HomeContent />
    </Suspense>
  );
}
