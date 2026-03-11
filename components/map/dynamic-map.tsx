"use client";

import dynamic from "next/dynamic";
import type { MapViewProps } from "./map-view";

const MapView = dynamic(() => import("./map-view"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-nerv-deep-purple">
      <div className="font-mono text-sm tracking-wider text-nerv-green">
        INITIALIZING MAP SYSTEM...
      </div>
    </div>
  ),
});

interface DynamicMapProps extends MapViewProps {
  initialPlaceId?: string | null;
}

export default function DynamicMap({ initialPlaceId, ...props }: DynamicMapProps) {
  return <MapView {...props} initialPlaceId={initialPlaceId} />;
}
