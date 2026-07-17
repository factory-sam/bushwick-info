import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { places, CATEGORIES, type PlaceCategory } from "@/data/places";

const BASE_URL = "https://bushwick.info";

const SCHEMA_TYPES: Record<PlaceCategory, string> = {
  bars: "BarOrPub",
  coffee: "CafeOrCoffeeShop",
  restaurants: "Restaurant",
  clubs: "NightClub",
  stores: "Store",
  other: "LocalBusiness",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return places.map((place) => ({
    id: place.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const place = places.find((p) => p.id === id);

  if (!place) {
    return {
      title: "Place Not Found | Bushwick Map",
    };
  }

  const title = `${place.name} | Bushwick Map`;
  const description = `${place.description} Located at ${place.address} in Bushwick, Brooklyn.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/places/${place.id}`,
      siteName: "Bushwick Map",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: `${BASE_URL}/places/${place.id}`,
    },
  };
}

function generateJsonLd(place: (typeof places)[0]) {
  const schemaType = SCHEMA_TYPES[place.category];

  return {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: place.name,
    description: place.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: place.address,
      addressLocality: "Brooklyn",
      addressRegion: "NY",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: place.lat,
      longitude: place.lng,
    },
    ...(place.hours && { openingHours: place.hours }),
    ...(place.website && { url: place.website }),
  };
}

export default async function PlacePage({ params }: PageProps) {
  const { id } = await params;
  const place = places.find((p) => p.id === id);

  if (!place) {
    notFound();
  }

  const categoryInfo = CATEGORIES[place.category];
  const jsonLd = generateJsonLd(place);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="relative min-h-screen bg-nerv-deep-purple">
        <div className="relative z-10 mx-auto max-w-2xl px-4 py-8">
          {/* Navigation */}
          <nav className="mb-6 flex items-center gap-4">
            <Link
              href="/places"
              className="font-mono text-xs uppercase tracking-wider text-nerv-green transition-colors hover:text-nerv-green/80"
            >
              ← Directory
            </Link>
            <Link
              href={`/?place=${place.id}`}
              className="font-mono text-xs uppercase tracking-wider text-nerv-orange transition-colors hover:text-nerv-orange/80"
            >
              View on Map →
            </Link>
          </nav>

          {/* Place Card */}
          <article
            className="border border-nerv-orange bg-nerv-deep-purple/80 px-6 py-6 backdrop-blur-md"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
              boxShadow: "0 0 5px #F0903A, 0 0 10px #F0903A, inset 0 0 5px rgba(240,144,58,0.3)",
            }}
          >
            {/* Category Badge */}
            <div className="mb-4 flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: categoryInfo.color,
                  boxShadow: `0 0 8px ${categoryInfo.color}`,
                }}
              />
              <span
                className="font-mono text-xs uppercase tracking-wider"
                style={{ color: categoryInfo.color }}
              >
                {categoryInfo.name}
              </span>
            </div>

            {/* Name */}
            <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-white md:text-3xl">
              {place.name}
            </h1>

            {/* Address */}
            <p className="mt-2 font-mono text-sm text-white/60">{place.address}</p>

            {/* Description */}
            <p className="mt-4 font-body text-base leading-relaxed text-white/80">
              {place.description}
            </p>

            {/* Hours */}
            {place.hours && (
              <div className="mt-4 border-t border-white/10 pt-4">
                <span className="font-mono text-xs uppercase tracking-wider text-nerv-green/70">
                  Hours:{" "}
                </span>
                <span className="font-body text-sm text-nerv-green">{place.hours}</span>
              </div>
            )}

            {/* Website */}
            {place.website && (
              <div className="mt-4">
                <a
                  href={place.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-sm text-nerv-orange transition-colors hover:text-nerv-orange/80"
                >
                  Visit Website
                  <span>↗</span>
                </a>
              </div>
            )}
          </article>

          {/* Map Link CTA */}
          <div className="mt-6 text-center">
            <Link
              href={`/?place=${place.id}`}
              className="inline-block border border-nerv-green bg-nerv-green/10 px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-nerv-green transition-colors hover:bg-nerv-green/20"
              style={{
                clipPath:
                  "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
              }}
            >
              Explore on Map
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
