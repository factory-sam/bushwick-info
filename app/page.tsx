"use client";

import { useCallback, useState } from "react";
import DynamicMap from "@/components/map/dynamic-map";
import type { MapMoveEvent } from "@/components/map/map-view";

export default function Home() {
  const [_mapState, setMapState] = useState<MapMoveEvent | null>(null);

  const handleMove = useCallback((event: MapMoveEvent) => {
    setMapState(event);
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-nerv-deep-purple">
      <DynamicMap onMove={handleMove} />
    </main>
  );
}
