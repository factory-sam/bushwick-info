import type { Metadata } from "next";
import Link from "next/link";
import { places, CATEGORIES, type PlaceCategory } from "@/data/places";
import { ScanlineOverlay } from "@/components/ui/scanline-overlay";
import { VignetteOverlay } from "@/components/ui/vignette-overlay";

export const metadata: Metadata = {
  title: "Directory | Bushwick Map",
  description:
    "Explore 50+ curated places in Bushwick, Brooklyn — bars, restaurants, coffee shops, clubs, and stores.",
  openGraph: {
    title: "Bushwick Directory",
    description: "Explore 50+ curated places in Bushwick, Brooklyn.",
    url: "https://bushwick.info/places",
  },
};

const CATEGORY_ORDER: PlaceCategory[] = [
  "bars",
  "restaurants",
  "coffee",
  "clubs",
  "stores",
  "other",
];

function groupPlacesByCategory() {
  const grouped: Record<PlaceCategory, typeof places> = {
    bars: [],
    coffee: [],
    restaurants: [],
    clubs: [],
    stores: [],
    other: [],
  };

  for (const place of places) {
    grouped[place.category].push(place);
  }

  // Sort each category alphabetically
  for (const category of CATEGORY_ORDER) {
    grouped[category].sort((a, b) => a.name.localeCompare(b.name));
  }

  return grouped;
}

export default function PlacesDirectory() {
  const grouped = groupPlacesByCategory();

  return (
    <main className="relative min-h-screen bg-nerv-deep-purple">
      <ScanlineOverlay />
      <VignetteOverlay />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-nerv-green transition-colors hover:text-nerv-green/80"
          >
            <span>←</span>
            <span>Back to Map</span>
          </Link>

          <div
            className="border border-nerv-orange bg-nerv-deep-purple/80 px-6 py-4 backdrop-blur-md"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
              boxShadow: "0 0 5px #F0903A, 0 0 10px #F0903A, inset 0 0 5px rgba(240,144,58,0.3)",
            }}
          >
            <h1 className="font-display text-xl font-bold uppercase tracking-widest text-nerv-orange md:text-2xl">
              BUSHWICK // DIRECTORY
            </h1>
            <p className="mt-1 font-mono text-xs text-nerv-green">
              {places.length} LOCATIONS INDEXED
            </p>
          </div>
        </header>

        {/* Category Sections */}
        <div className="space-y-6">
          {CATEGORY_ORDER.map((category) => {
            const categoryPlaces = grouped[category];
            if (categoryPlaces.length === 0) return null;

            const info = CATEGORIES[category];

            return (
              <section key={category}>
                {/* Category Header */}
                <div
                  className="mb-3 flex items-center gap-3 border-b pb-2"
                  style={{ borderColor: `${info.color}40` }}
                >
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: info.color,
                      boxShadow: `0 0 8px ${info.color}`,
                    }}
                  />
                  <h2
                    className="font-display text-sm font-bold uppercase tracking-wider"
                    style={{ color: info.color }}
                  >
                    {info.name}
                  </h2>
                  <span className="font-mono text-xs text-white/40">({categoryPlaces.length})</span>
                </div>

                {/* Places List */}
                <ul className="space-y-2">
                  {categoryPlaces.map((place) => (
                    <li key={place.id}>
                      <Link
                        href={`/places/${place.id}`}
                        className="group block rounded border border-white/10 bg-nerv-deep-purple/50 px-4 py-3 transition-all hover:border-nerv-orange/40 hover:bg-nerv-deep-purple/80"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white group-hover:text-nerv-orange">
                              {place.name}
                            </h3>
                            <p className="mt-0.5 font-mono text-xs text-white/50">
                              {place.address}
                            </p>
                            {place.hours && (
                              <p className="mt-1 font-body text-xs text-nerv-green/70">
                                {place.hours}
                              </p>
                            )}
                          </div>
                          <span className="font-mono text-xs text-nerv-orange opacity-0 transition-opacity group-hover:opacity-100">
                            VIEW →
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-white/10 pt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-nerv-green transition-colors hover:text-nerv-green/80"
          >
            <span>←</span>
            <span>Return to Map</span>
          </Link>
        </footer>
      </div>
    </main>
  );
}
