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

export default function DynamicMap(props: MapViewProps) {
  return <MapView {...props} />;
}
