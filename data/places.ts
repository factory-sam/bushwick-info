export type PlaceCategory =
  | "stores"
  | "bars"
  | "clubs"
  | "coffee"
  | "restaurants"
  | "other";

export interface Place {
  id: string;
  name: string;
  description: string;
  category: PlaceCategory;
  address: string;
  lat: number;
  lng: number;
  hours?: string;
  website?: string;
}

export interface CategoryInfo {
  name: string;
  color: string;
}

export const CATEGORIES: Record<PlaceCategory, CategoryInfo> = {
  bars: { name: "Bars", color: "#F0903A" },
  coffee: { name: "Coffee", color: "#58F2A5" },
  restaurants: { name: "Restaurants", color: "#54A2D4" },
  clubs: { name: "Clubs", color: "#765898" },
  stores: { name: "Stores", color: "#F6E201" },
  other: { name: "Other", color: "#E81900" },
};

export const places: Place[] = [
  // ── CLUBS ──────────────────────────────────────────────
  {
    id: "house-of-yes",
    name: "House of Yes",
    description:
      "Immersive nightclub and performance venue known for themed parties, aerial acts, and creative nightlife.",
    category: "clubs",
    address: "2 Wyckoff Ave, Brooklyn, NY 11237",
    lat: 40.7068,
    lng: -73.9236,
    hours: "Wed–Sat 7 PM–4 AM",
    website: "https://houseofyes.org",
  },
  {
    id: "jupiter-disco",
    name: "Jupiter Disco",
    description:
      "Space-themed cocktail bar and dance club with a sci-fi ambiance and vibrant dance floor.",
    category: "clubs",
    address: "1237 Flushing Ave, Brooklyn, NY 11237",
    lat: 40.7025,
    lng: -73.927,
    hours: "Wed–Sun 7 PM–4 AM",
    website: "https://www.jupiterdisco.com",
  },
  {
    id: "the-red-pavilion",
    name: "The Red Pavilion",
    description:
      "Intimate nightclub with red-lit ambiance, hosting DJs and late-night dance parties in East Williamsburg.",
    category: "clubs",
    address: "1241 Flushing Ave, Brooklyn, NY 11237",
    lat: 40.7026,
    lng: -73.9268,
    hours: "Fri–Sat 10 PM–4 AM",
    website: "https://www.instagram.com/theredpavilionbk",
  },
  {
    id: "refuge",
    name: "Refuge",
    description:
      "Hi-fi dance club with a serious sound system, indoor-outdoor setup, and dynamic lighting for energetic nights.",
    category: "clubs",
    address: "360 Ten Eyck St, Brooklyn, NY 11206",
    lat: 40.7115,
    lng: -73.9351,
    hours: "Sat 11 PM–6 AM",
    website: "https://ra.co/clubs/169498",
  },

  // ── BARS ───────────────────────────────────────────────
  {
    id: "mood-ring",
    name: "Mood Ring",
    description:
      "Astrology-themed bar with a cozy dance floor, colorful cocktails, and a vibrant late-night crowd.",
    category: "bars",
    address: "1260 Myrtle Ave, Brooklyn, NY 11221",
    lat: 40.6941,
    lng: -73.9291,
    hours: "Daily 6 PM–4 AM",
    website: "https://www.instagram.com/moodringbk",
  },
  {
    id: "sleepwalk",
    name: "Sleepwalk",
    description:
      "Sultry cocktail bar with an intimate back music venue, craft beers on tap, and late-night Asian-inspired bites.",
    category: "bars",
    address: "251 Bushwick Ave, Brooklyn, NY 11206",
    lat: 40.7113,
    lng: -73.9355,
    hours: "Daily 5 PM–4 AM",
    website: "https://sleepwalk.nyc",
  },
  {
    id: "otis",
    name: "Otis",
    description:
      "Contemporary American bistro in a historic 1914 building with an open kitchen, craft cocktails, and a late-night bar.",
    category: "bars",
    address: "18 Harrison Pl, Brooklyn, NY 11237",
    lat: 40.7061,
    lng: -73.9326,
    hours: "Tue–Sun 5 PM–12 AM",
    website: "https://www.opentable.com/r/otis-brooklyn",
  },
  {
    id: "birdys",
    name: "Birdy's",
    description:
      "Laid-back neighborhood dive bar with affordable drinks, board games, and a welcoming late-night vibe.",
    category: "bars",
    address: "1215 Myrtle Ave, Brooklyn, NY 11221",
    lat: 40.6946,
    lng: -73.9318,
    hours: "Daily 2 PM–4 AM",
  },
  {
    id: "cobra-club",
    name: "Cobra Club",
    description:
      "Female-owned indie venue blending a daytime cafe with punk rock nightlife, karaoke, comedy, and burlesque.",
    category: "bars",
    address: "6 Wyckoff Ave, Brooklyn, NY 11237",
    lat: 40.7066,
    lng: -73.9234,
    hours: "Daily 3 PM–12 AM",
    website: "https://www.cobraclubbk.com",
  },
  {
    id: "starr-bar",
    name: "Starr Bar",
    description:
      "Community-driven bar near the Jefferson L hosting DJ sets, live music, comedy, and social justice events.",
    category: "bars",
    address: "214 Starr St, Brooklyn, NY 11237",
    lat: 40.7029,
    lng: -73.9226,
    hours: "Mon–Thu 5 PM–2 AM, Fri–Sat 5 PM–4 AM",
    website: "https://www.starrbar.com",
  },

  // ── COFFEE ─────────────────────────────────────────────
  {
    id: "sey-coffee",
    name: "SEY Coffee",
    description:
      "Acclaimed micro-roastery and cafe serving seasonally sourced, precision-roasted single-origin coffees.",
    category: "coffee",
    address: "18 Grattan St, Brooklyn, NY 11206",
    lat: 40.7053,
    lng: -73.9324,
    hours: "Daily 8 AM–5 PM",
    website: "https://www.seycoffee.com",
  },
  {
    id: "nook",
    name: "Nook",
    description:
      "Spacious cafe with floor-to-ceiling windows, craft beverages, and a community vibe popular with remote workers.",
    category: "coffee",
    address: "45 Irving Ave, Brooklyn, NY 11237",
    lat: 40.7082,
    lng: -73.9275,
    hours: "Daily 7 AM–7 PM",
  },

  // ── RESTAURANTS ────────────────────────────────────────
  {
    id: "ops-pizza",
    name: "Ops Pizza & Wine",
    description:
      "Beloved neighborhood spot serving Neapolitan-style sourdough pizzas and natural wines in a cozy setting.",
    category: "restaurants",
    address: "346 Himrod St, Brooklyn, NY 11237",
    lat: 40.7027,
    lng: -73.9173,
    hours: "Sun–Thu 5 PM–10 PM, Fri–Sat 5 PM–11 PM",
    website: "https://www.opsbk.com",
  },
  {
    id: "gordos-cantina",
    name: "Gordo's Cantina",
    description:
      "Cheerful Mexican eatery known for flavorful shrimp tacos, grilled skirt steak quesadillas, and braised pork tortas.",
    category: "restaurants",
    address: "140 St Nicholas Ave, Brooklyn, NY 11237",
    lat: 40.705,
    lng: -73.9176,
    hours: "Daily 11 AM–11 PM",
    website: "https://gordoscantina.com",
  },
  {
    id: "bushniwa",
    name: "Bushniwa",
    description:
      "Japanese brasserie offering creative sushi, donburi, and craft sake in a casual Bushwick atmosphere.",
    category: "restaurants",
    address: "250 Varet St, Brooklyn, NY 11206",
    lat: 40.708,
    lng: -73.935,
    hours: "Daily 12 PM–10 PM",
    website: "https://bushniwa.foodjoyy.com",
  },

  // ── STORES ─────────────────────────────────────────────
  {
    id: "brooklyn-vintage-company",
    name: "Brooklyn Vintage Company",
    description:
      "Curated vintage shop with designer clothing, mid-century furniture, and eclectic home decor finds.",
    category: "stores",
    address: "194 Irving Ave, Brooklyn, NY 11237",
    lat: 40.7025,
    lng: -73.9275,
    hours: "Mon–Fri 12 PM–8 PM, Sat 11 AM–8 PM, Sun 11 AM–7 PM",
    website: "https://www.instagram.com/brooklynvintagecompany",
  },
  {
    id: "slope-vintage",
    name: "Slope Vintage",
    description:
      "Family-run vintage and consignment store offering well-curated thrift finds and affordable fashion.",
    category: "stores",
    address: "236 Knickerbocker Ave, Brooklyn, NY 11237",
    lat: 40.7009,
    lng: -73.9196,
    hours: "Daily 11 AM–7 PM",
    website: "https://www.slopevintage.com",
  },

  // ── OTHER ──────────────────────────────────────────────
  {
    id: "ornithology-jazz-club",
    name: "Ornithology Jazz Club",
    description:
      "Bohemian jazz venue with a Bechstein grand piano, nightly live performances, and signature cocktails.",
    category: "other",
    address: "6 Suydam St, Brooklyn, NY 11221",
    lat: 40.7022,
    lng: -73.9384,
    hours: "Daily 7 PM–2 AM",
    website: "https://ornithologyjazzclub.com",
  },
  {
    id: "tv-eye",
    name: "TV Eye",
    description:
      "Multi-room performance venue near the Ridgewood border with live music, a gallery, dance club, and courtyard bar.",
    category: "other",
    address: "1647 Weirfield St, Ridgewood, NY 11385",
    lat: 40.6986,
    lng: -73.9059,
    hours: "Daily 5 PM–4 AM",
    website: "https://tveyenyc.com",
  },
  {
    id: "maria-hernandez-park",
    name: "Maria Hernandez Park",
    description:
      "Beloved 6.87-acre community park with a playground, basketball courts, performance stage, and green space.",
    category: "other",
    address: "Knickerbocker Ave & Starr St, Brooklyn, NY 11237",
    lat: 40.7031,
    lng: -73.9239,
    hours: "Daily 6 AM–10 PM",
  },
  {
    id: "wonderville",
    name: "Wonderville",
    description:
      "Independent arcade bar showcasing locally made indie arcade games with live events and a creative community vibe.",
    category: "other",
    address: "1186 Broadway, Brooklyn, NY 11221",
    lat: 40.6932,
    lng: -73.9284,
    hours: "Mon–Fri 5 PM–2 AM, Sat–Sun 2 PM–4 AM",
    website: "https://www.wonderville.nyc",
  },
];
