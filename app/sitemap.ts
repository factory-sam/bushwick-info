import type { MetadataRoute } from "next";
import { places } from "@/data/places";

const BASE_URL = "https://bushwick.info";

export default function sitemap(): MetadataRoute.Sitemap {
  const placeUrls = places.map((place) => ({
    url: `${BASE_URL}/places/${place.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/places`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...placeUrls,
  ];
}
