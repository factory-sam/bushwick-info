export type PlaceCategory = "stores" | "bars" | "clubs" | "coffee" | "restaurants" | "other";

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
  clubs: { name: "Clubs", color: "#BF00FF" },
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
    id: "bossa-nova-civic-club",
    name: "Bossa Nova Civic Club",
    description:
      "Intimate underground dance club with world-class DJs, a top-tier sound system, and a devoted late-night crowd.",
    category: "clubs",
    address: "1271 Myrtle Ave, Brooklyn, NY 11221",
    lat: 40.6979,
    lng: -73.9279,
    hours: "Thu–Sun 10 PM–4 AM",
    website: "https://www.bossanovacivicclub.com",
  },
  {
    id: "nowadays",
    name: "Nowadays",
    description:
      "Indoor-outdoor dance club with a massive warehouse space, legendary daytime parties, and a vibrant garden.",
    category: "clubs",
    address: "56-06 Cooper Ave, Ridgewood, NY 11385",
    lat: 40.6929,
    lng: -73.902,
    hours: "Fri–Sun varies",
    website: "https://nowadays.nyc",
  },
  {
    id: "h0l0",
    name: "H0L0",
    description:
      "Cutting-edge techno club with immersive visuals, powerful sound system, and a devoted underground crowd.",
    category: "clubs",
    address: "1090 Wyckoff Ave, Ridgewood, NY 11385",
    lat: 40.6949,
    lng: -73.9029,
    hours: "Fri–Sat 11 PM–6 AM",
    website: "https://h0l0.nyc",
  },
  {
    id: "jupiter-disco",
    name: "Jupiter Disco",
    description:
      "Space-themed cocktail bar and dance club with a sci-fi ambiance and vibrant dance floor.",
    category: "clubs",
    address: "1237 Flushing Ave, Brooklyn, NY 11237",
    lat: 40.70804,
    lng: -73.92354,
    hours: "Wed–Sun 7 PM–4 AM",
    website: "https://www.jupiterdisco.com",
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
    lat: 40.69787,
    lng: -73.92675,
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
    lat: 40.70738,
    lng: -73.93971,
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
    lat: 40.6974,
    lng: -73.9317,
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
    lat: 40.70479,
    lng: -73.92335,
    hours: "Mon–Thu 5 PM–2 AM, Fri–Sat 5 PM–4 AM",
    website: "https://www.starrbar.com",
  },
  {
    id: "three-diamond-door",
    name: "Three Diamond Door",
    description:
      "Dimly lit neighborhood bar with craft cocktails, a pool table, and a laid-back Bushwick vibe.",
    category: "bars",
    address: "211 Knickerbocker Ave, Brooklyn, NY 11237",
    lat: 40.7034,
    lng: -73.9263,
    hours: "Daily 2 PM–4 AM",
  },
  {
    id: "ten-bells",
    name: "Ten Bells",
    description:
      "Natural wine bar and tapas spot with a cozy candlelit atmosphere and seasonal small plates.",
    category: "bars",
    address: "65 Irving Ave, Brooklyn, NY 11237",
    lat: 40.7045,
    lng: -73.9239,
    hours: "Daily 5 PM–12 AM",
    website: "https://www.tenbellsbk.com",
  },
  {
    id: "gold-sounds",
    name: "Gold Sounds",
    description:
      "Intimate live music venue and dive bar hosting indie bands, DJs, and eclectic performances.",
    category: "bars",
    address: "44 Wilson Ave, Brooklyn, NY 11237",
    lat: 40.7027,
    lng: -73.9294,
    hours: "Daily 5 PM–4 AM",
    website: "https://www.goldsounds.bar",
  },
  {
    id: "basement",
    name: "Basement",
    description:
      "Subterranean techno club beneath Knockdown Center with a powerful sound system and industrial aesthetic.",
    category: "clubs",
    address: "52-19 Flushing Ave, Maspeth, NY 11378",
    lat: 40.7146,
    lng: -73.9141,
    hours: "Fri–Sat 11 PM–6 AM",
    website: "https://basementny.net",
  },
  {
    id: "pine-box-rock-shop",
    name: "Pine Box Rock Shop",
    description:
      "Converted casket factory turned rock bar with live music, craft beers, and a spacious backyard.",
    category: "bars",
    address: "12 Grattan St, Brooklyn, NY 11206",
    lat: 40.7054,
    lng: -73.9327,
    hours: "Daily 4 PM–4 AM",
    website: "https://www.pineboxrockshop.com",
  },
  {
    id: "the-narrows",
    name: "The Narrows",
    description:
      "Art deco neighborhood bar with craft cocktails, extensive whiskey selection, and a year-round garden.",
    category: "bars",
    address: "1037 Flushing Ave, Brooklyn, NY 11237",
    lat: 40.704,
    lng: -73.931,
    hours: "Daily 6 PM–2 AM",
  },
  {
    id: "fine-time",
    name: "Fine Time",
    description:
      "Cozy neighborhood bar and beer garden with creative cocktails and a welcoming outdoor space.",
    category: "bars",
    address: "84 Central Ave, Brooklyn, NY 11206",
    lat: 40.7007,
    lng: -73.9299,
    hours: "Daily 5 PM–2 AM",
  },
  {
    id: "happyfun-hideaway",
    name: "Happyfun Hideaway",
    description:
      "Colorful queer-friendly dive bar with a dance floor, covered patio, and affordable drinks.",
    category: "bars",
    address: "1211 Myrtle Ave, Brooklyn, NY 11221",
    lat: 40.6974,
    lng: -73.9318,
    hours: "Daily 5 PM–4 AM",
  },
  {
    id: "hart-bar",
    name: "Hart Bar",
    description:
      "Neighborhood favorite with live music, great cocktails, and a friendly queer-welcoming atmosphere.",
    category: "bars",
    address: "538 Hart St, Brooklyn, NY 11221",
    lat: 40.6964,
    lng: -73.9299,
    hours: "Daily 5 PM–2 AM",
    website: "https://www.hartbarnyc.com",
  },
  {
    id: "left-hand-path",
    name: "Left Hand Path",
    description:
      "Cozy neighborhood pub with craft beer, quality cocktails, a backyard, and a friendly local vibe.",
    category: "bars",
    address: "89 Wyckoff Ave, Brooklyn, NY 11237",
    lat: 40.7051,
    lng: -73.9203,
    hours: "Daily 4 PM–2 AM",
    website: "https://www.bushwick.bar",
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
    lat: 40.7049,
    lng: -73.9246,
    hours: "Daily 7 AM–7 PM",
  },
  {
    id: "loveless-coffee",
    name: "Loveless Coffee",
    description:
      "Specialty coffee roastery with excellent cold brew, iced lattes, and quality beans in a cozy Bushwick space.",
    category: "coffee",
    address: "86 Central Ave, Brooklyn, NY 11206",
    lat: 40.7008,
    lng: -73.9298,
    hours: "Daily 8 AM–4 PM",
    website: "https://lovelesscoffees.coffee",
  },
  {
    id: "swallow-cafe",
    name: "Swallow Cafe",
    description:
      "Popular Bushwick coffee shop with spacious seating, quality espresso drinks, and a laid-back vibe.",
    category: "coffee",
    address: "49 Bogart St, Brooklyn, NY 11206",
    lat: 40.7051,
    lng: -73.9333,
    hours: "Daily 7 AM–6 PM",
    website: "https://www.swallowcafe.nyc",
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
    lat: 40.70401,
    lng: -73.9341,
    hours: "Daily 12 PM–10 PM",
    website: "https://bushniwa.foodjoyy.com",
  },
  {
    id: "sobre-masa",
    name: "Sobre Masa",
    description:
      "Acclaimed Mexican tortilleria and restaurant serving handmade tortillas with seasonal, locally sourced ingredients.",
    category: "restaurants",
    address: "52 Harrison Pl, Brooklyn, NY 11237",
    lat: 40.7058,
    lng: -73.9305,
    hours: "Wed–Sun 5 PM–10 PM",
    website: "https://sobremasa.com",
  },
  {
    id: "claras",
    name: "Clara's",
    description:
      "Farm-to-table neighborhood restaurant with seasonal American fare and craft cocktails in a warm setting.",
    category: "restaurants",
    address: "53 Wilson Ave, Brooklyn, NY 11237",
    lat: 40.7026,
    lng: -73.9288,
    hours: "Tue–Sun 5 PM–11 PM",
  },

  // ── STORES ─────────────────────────────────────────────
  {
    id: "brooklyn-vintage-company",
    name: "Brooklyn Vintage Company",
    description:
      "Curated vintage shop with designer clothing, mid-century furniture, and eclectic home decor finds.",
    category: "stores",
    address: "194 Irving Ave, Brooklyn, NY 11237",
    lat: 40.70139,
    lng: -73.91868,
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
    lat: 40.70286,
    lng: -73.92561,
    hours: "Daily 11 AM–7 PM",
    website: "https://www.slopevintage.com",
  },
  {
    id: "left-field-nyc",
    name: "Left Field NYC",
    description:
      "American-made denim and menswear brand with a flagship shop featuring jeans, chinos, and classic workwear.",
    category: "stores",
    address: "657 Woodward Ave, Ridgewood, NY 11385",
    lat: 40.7056,
    lng: -73.9068,
    hours: "Thu–Sun 12 PM–6 PM",
    website: "https://leftfieldnyc.com",
  },

  // ── OTHER ──────────────────────────────────────────────
  {
    id: "ornithology-jazz-club",
    name: "Ornithology Jazz Club",
    description:
      "Bohemian jazz venue with a Bechstein grand piano, nightly live performances, and signature cocktails.",
    category: "bars",
    address: "6 Suydam St, Brooklyn, NY 11221",
    lat: 40.69546,
    lng: -73.93217,
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
    lat: 40.69778,
    lng: -73.90521,
    hours: "Daily 5 PM–4 AM",
    website: "https://tveyenyc.com",
  },
  {
    id: "maria-hernandez-park",
    name: "Maria Hernandez Park",
    description:
      "Beloved 6.87-acre community park with a playground, basketball courts, performance stage, and green space.",
    category: "other",
    address: "Irving Ave & Knickerbocker Ave, Brooklyn, NY 11237",
    lat: 40.7032,
    lng: -73.9239,
    hours: "Daily 6 AM–10 PM",
  },

  {
    id: "wonderville",
    name: "Wonderville",
    description:
      "Independent arcade bar showcasing locally made indie arcade games with live events and a creative community vibe.",
    category: "bars",
    address: "1186 Broadway, Brooklyn, NY 11221",
    lat: 40.69242,
    lng: -73.92732,
    hours: "Mon–Fri 5 PM–2 AM, Sat–Sun 2 PM–4 AM",
    website: "https://www.wonderville.nyc",
  },
  {
    id: "anchored-inn",
    name: "The Anchored Inn",
    description:
      "Nautical-themed dive bar with craft beers, a rustic punk aesthetic, and a welcoming neighborhood vibe.",
    category: "bars",
    address: "57 Waterbury St, Brooklyn, NY 11206",
    lat: 40.7091,
    lng: -73.9371,
    hours: "Daily 4 PM–4 AM",
    website: "https://theanchoredinn.com",
  },
  {
    id: "loves-club",
    name: "Love's Club",
    description:
      "Bar and music venue with billiards, a dance floor, and eclectic programming from house to disco.",
    category: "bars",
    address: "106 Melrose St, Brooklyn, NY 11206",
    lat: 40.6991,
    lng: -73.9338,
    hours: "Daily 4 PM–4 AM",
    website: "https://www.lovesclubnewyork.com",
  },
  {
    id: "101-wilson",
    name: "101 Wilson",
    description:
      "Laid-back dive bar with graffiti-covered walls, cheap beer, hot dogs, and a skater-friendly vibe.",
    category: "bars",
    address: "101 Wilson Ave, Brooklyn, NY 11237",
    lat: 40.7015,
    lng: -73.9271,
    hours: "Daily 2 PM–4 AM",
    website: "https://101wilson.com",
  },
  {
    id: "boobie-trap",
    name: "Boobie Trap",
    description:
      "Playful dive bar with creative cocktails, games, eclectic decor, and a fun, lighthearted atmosphere.",
    category: "bars",
    address: "308 Bleecker St, Brooklyn, NY 11237",
    lat: 40.7003,
    lng: -73.916,
    hours: "Daily 12 PM–4 AM",
    website: "https://boobietrapbrooklyn.com",
  },
  {
    id: "lous-athletic-club",
    name: "Lou's Athletic Club",
    description:
      "Sports bar with vintage decor, large booths, multiple TVs, a giant projector, and a photobooth.",
    category: "bars",
    address: "384 Knickerbocker Ave, Brooklyn, NY 11237",
    lat: 40.7002,
    lng: -73.921,
    hours: "Daily 4 PM–4 AM",
  },
  {
    id: "trans-pecos",
    name: "Trans-Pecos",
    description:
      "All-ages music venue and community space on the Bushwick-Ridgewood border with eclectic live programming.",
    category: "bars",
    address: "915 Wyckoff Ave, Ridgewood, NY 11385",
    lat: 40.6971,
    lng: -73.9067,
    hours: "Varies by event",
    website: "https://www.thetranspecos.com",
  },
  // ── CLUBS (additional) ─────────────────────────────────
  {
    id: "signal",
    name: "Signal",
    description:
      "Underground nightclub and event space with cutting-edge electronic music and an intimate dancefloor.",
    category: "clubs",
    address: "175 Morgan Ave, Brooklyn, NY 11237",
    lat: 40.7101,
    lng: -73.9335,
    hours: "Fri–Sat 10 PM–6 AM",
  },
  {
    id: "the-meadows",
    name: "The Meadows",
    description:
      "Indoor/outdoor club and event space with multiple stages, a relaxed atmosphere, and live entertainment.",
    category: "clubs",
    address: "17 Meadow St, Brooklyn, NY 11206",
    lat: 40.7107,
    lng: -73.9365,
    hours: "Varies by event",
  },
  // ── RESTAURANTS (additional) ───────────────────────────
  {
    id: "eyval",
    name: "Eyval",
    description:
      "Modern Persian restaurant with shareable plates, saffron ice cream, and a trendy open-space atmosphere.",
    category: "restaurants",
    address: "25 Bogart St, Brooklyn, NY 11206",
    lat: 40.7042,
    lng: -73.9331,
    hours: "Tue–Sun 5 PM–11 PM",
    website: "https://www.eyvalnyc.com",
  },
  {
    id: "fukurou",
    name: "Fukurou",
    description:
      "Modern Japanese ramen spot with a cozy speakeasy vibe, fresh noodles, and creative broths.",
    category: "restaurants",
    address: "105 Wilson Ave, Brooklyn, NY 11237",
    lat: 40.7015,
    lng: -73.9269,
    hours: "Daily 12 PM–10 PM",
  },
  {
    id: "la-cantine",
    name: "La Cantine",
    description:
      "French-inspired cafe by day, intimate wine bar by night, with outdoor seating and natural wines.",
    category: "restaurants",
    address: "60 Saint Nicholas Ave, Brooklyn, NY 11237",
    lat: 40.7067,
    lng: -73.9204,
    hours: "Daily 9 AM–4 PM, Thu–Sat 6 PM–11 PM",
    website: "https://lacantinebushwick.com",
  },
  {
    id: "they-say-that",
    name: "They Say That",
    description:
      "Experimental Thai kitchen and wine bar in a converted smoke shop with bold flavors and creative dishes.",
    category: "restaurants",
    address: "615 Wilson Ave, Brooklyn, NY 11207",
    lat: 40.6901,
    lng: -73.9069,
    hours: "Wed–Sun 5 PM–11 PM",
    website: "https://www.theysaythatbushwick.com",
  },
  // ── STORES (additional) ────────────────────────────────
  {
    id: "harlequin-vintage",
    name: "Harlequin Vintage",
    description:
      "Curated vintage clothing shop with unique finds spanning decades of fashion history.",
    category: "stores",
    address: "136 Knickerbocker Ave, Brooklyn, NY 11237",
    lat: 40.7045,
    lng: -73.9286,
    hours: "Daily 12 PM–8 PM",
  },
  {
    id: "fronk",
    name: "Fronk",
    description:
      "Vintage shop featuring curated clothing, art events, and a creative community space.",
    category: "stores",
    address: "87 George St, Brooklyn, NY 11206",
    lat: 40.7025,
    lng: -73.9305,
    hours: "Thu–Sun 12 PM–7 PM",
    website: "https://fronk.nyc",
  },
  // ── OTHER (additional) ─────────────────────────────────
  {
    id: "syndicated",
    name: "Syndicated",
    description:
      "Bar-restaurant-theater combo showing films while you eat and drink in a comfy vintage cinema setting.",
    category: "other",
    address: "40 Bogart St, Brooklyn, NY 11206",
    lat: 40.705,
    lng: -73.9331,
    hours: "Daily 11 AM–12 AM",
    website: "https://syndicatedbk.com",
  },
  {
    id: "skewville",
    name: "Skewville",
    description:
      "Art gallery and studio space showcasing street art, pop surrealism, and underground artists.",
    category: "other",
    address: "237 Starr St, Brooklyn, NY 11237",
    lat: 40.7056,
    lng: -73.9228,
    hours: "Sat–Sun 12 PM–6 PM",
  },
];
