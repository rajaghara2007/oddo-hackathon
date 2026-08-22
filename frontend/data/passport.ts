export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  unlocked: boolean;
  progress: number;
  total: number;
  category: "adventure" | "food" | "culture" | "nature" | "photo" | "social";
}

export interface TravelLevel {
  title: string;
  emoji: string;
  minTrips: number;
}

export const TRAVEL_LEVELS: TravelLevel[] = [
  { title: "Explorer", emoji: "🌱", minTrips: 0 },
  { title: "Wanderer", emoji: "🧭", minTrips: 5 },
  { title: "Adventurer", emoji: "🏔️", minTrips: 15 },
  { title: "GlobeTrotter", emoji: "🌎", minTrips: 30 },
];

export interface PastTrip {
  id: string;
  destination: string;
  country: string;
  year: number;
  days: number;
  type: string;
  image: string;
  highlights: string[];
}

export interface PassportStats {
  cities: number;
  states: number;
  countries: number;
  adventures: number;
  foodExperiences: number;
  memories: number;
  totalTrips: number;
}

export const MOCK_PASSPORT_STATS: PassportStats = {
  cities: 12,
  states: 8,
  countries: 3,
  adventures: 6,
  foodExperiences: 14,
  memories: 21,
  totalTrips: 18,
};

export const MOCK_BADGES: Badge[] = [
  { id: "b1", name: "Mountain Conqueror", emoji: "🥾", description: "Complete mountain or high-altitude trips.", unlocked: false, progress: 4, total: 5, category: "adventure" },
  { id: "b2", name: "Food Hunter", emoji: "🍜", description: "Try local cuisine in distinct destinations.", unlocked: false, progress: 17, total: 20, category: "food" },
  { id: "b3", name: "Sunrise Chaser", emoji: "🌅", description: "Record sunrise activities on your trips.", unlocked: true, progress: 5, total: 5, category: "nature" },
  { id: "b4", name: "History Seeker", emoji: "🏛️", description: "Visit ancient landmarks and museums.", unlocked: true, progress: 10, total: 10, category: "culture" },
  { id: "b5", name: "Visual Explorer", emoji: "📸", description: "Complete trips with photography focuses.", unlocked: false, progress: 2, total: 5, category: "photo" },
  { id: "b6", name: "Globe Explorer", emoji: "🌎", description: "Travel to different countries.", unlocked: false, progress: 3, total: 10, category: "social" },
];

export const MOCK_PAST_TRIPS: PastTrip[] = [
  {
    id: "t1",
    destination: "Manali",
    country: "India",
    year: 2026,
    days: 5,
    type: "Adventure",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800",
    highlights: ["Solang Valley Trek", "Beas River Rafting"],
  },
  {
    id: "t2",
    destination: "Udaipur",
    country: "India",
    year: 2026,
    days: 3,
    type: "Culture",
    image: "https://images.unsplash.com/photo-1615836245337-f58c70fdb0a6?auto=format&fit=crop&q=80&w=800",
    highlights: ["City Palace", "Lake Pichola Sunset"],
  },
  {
    id: "t3",
    destination: "Goa",
    country: "India",
    year: 2025,
    days: 4,
    type: "Beach + Food",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800",
    highlights: ["Seafood Trail", "Dudhsagar Trek"],
  },
];

export function getCurrentLevel(totalTrips: number): { current: TravelLevel; next: TravelLevel | null; progressPct: number } {
  let current = TRAVEL_LEVELS[0];
  let next: TravelLevel | null = null;
  
  for (let i = 0; i < TRAVEL_LEVELS.length; i++) {
    if (totalTrips >= TRAVEL_LEVELS[i].minTrips) {
      current = TRAVEL_LEVELS[i];
      next = i < TRAVEL_LEVELS.length - 1 ? TRAVEL_LEVELS[i + 1] : null;
    } else {
      break;
    }
  }

  let progressPct = 100;
  if (next) {
    const tripDiff = next.minTrips - current.minTrips;
    const progress = totalTrips - current.minTrips;
    progressPct = (progress / tripDiff) * 100;
  }

  return { current, next, progressPct };
}
