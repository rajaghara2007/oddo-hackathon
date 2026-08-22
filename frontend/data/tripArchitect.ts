import type { TravelDNA } from "./travelDNA";

// ─── Input ────────────────────────────────────────────────────────────────────
export interface TripInput {
  destination: string;
  origin: string;
  startDate: string;
  endDate: string;
  days: number;
  travelers: number;
  groupType: "solo" | "couple" | "family" | "friends";
  budgetTotal: number;
  currency: string;
  adventure: number;
  food: number;
  culture: number;
  nature: number;
  relaxation: number;
  photography: number;
  nightlife: number;
  pace: number; // 0=slow 100=fast
  surpriseMe: boolean;
}

export const DEFAULT_INPUT: TripInput = {
  destination: "", origin: "", startDate: "", endDate: "",
  days: 5, travelers: 1, groupType: "solo",
  budgetTotal: 40000, currency: "₹",
  adventure: 50, food: 50, culture: 50, nature: 50,
  relaxation: 50, photography: 50, nightlife: 30,
  pace: 50, surpriseMe: false,
};

// ─── Activity ─────────────────────────────────────────────────────────────────
export interface Activity {
  id: string;
  time: string;
  title: string;
  category: "transport" | "hotel" | "food" | "activity" | "landmark" | "nature" | "photo" | "nightlife";
  duration: string;
  cost: number;
  travelTime?: string;
  image: string;
  reason: string;
  lat?: number;
  lng?: number;
}

export interface DayPlan {
  day: number;
  theme: string;
  emoji: string;
  activities: Activity[];
}

export interface BudgetBreakdown {
  accommodation: number;
  transport: number;
  food: number;
  activities: number;
  emergency: number;
  total: number;
  remaining: number;
}

export interface GeneratedTrip {
  id: string;
  destination: string;
  origin: string;
  days: number;
  travelers: number;
  currency: string;
  budgetTotal: number;
  tripScore: number;
  archetype: string;
  archetypeIcon: string;
  coverImage: string;
  tagline: string;
  days_plan: DayPlan[];
  budget: BudgetBreakdown;
  highlights: string[];
}

// ─── Destination Templates ────────────────────────────────────────────────────
const DEST_TEMPLATES: Record<string, {
  cover: string;
  tagline: string;
  themes: Array<{ theme: string; emoji: string }>;
  activities: Activity[][];
}> = {
  default: {
    cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1600",
    tagline: "An unforgettable journey crafted for you",
    themes: [
      { theme: "The Beginning", emoji: "✈️" },
      { theme: "Into the Wild", emoji: "🏔️" },
      { theme: "Culture & Flavours", emoji: "🍜" },
      { theme: "Hidden Gems", emoji: "📸" },
      { theme: "The Grand Finale", emoji: "🌅" },
    ],
    activities: [],
  },
};

const ACTIVITY_POOLS: Record<string, Activity[][]> = {
  manali: [
    // Day 1
    [
      { id: "a1", time: "11:00 AM", title: "Arrive at Bhuntar Airport", category: "transport", duration: "1h", cost: 0, image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600", reason: "Gateway to Manali — scenic Kullu Valley drive ahead.", travelTime: "2.5h to hotel" },
      { id: "a2", time: "2:00 PM", title: "Check-in: Himalayan View Resort", category: "hotel", duration: "30min", cost: 2400, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600", reason: "Panoramic valley views match your Photography score (87%)." },
      { id: "a3", time: "4:00 PM", title: "Old Manali Village Walk", category: "landmark", duration: "2h", cost: 0, image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=600", reason: "High Culture score — charming wooden temples and cafés." },
      { id: "a4", time: "7:00 PM", title: "Rooftop Dinner at Café 1947", category: "food", duration: "1.5h", cost: 800, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600", reason: "Top-rated local cuisine — matches your Food DNA (91%)." },
    ],
    // Day 2
    [
      { id: "b1", time: "7:00 AM", title: "Solang Valley Sunrise Trek", category: "nature", duration: "3h", cost: 500, image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600", reason: "Adventure DNA (82%) + Nature (81%) = perfect morning.", travelTime: "30min drive" },
      { id: "b2", time: "11:00 AM", title: "Paragliding over Solang", category: "activity", duration: "1h", cost: 2500, image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=600", reason: "Your highest trait is Adventure. This is the peak moment." },
      { id: "b3", time: "1:00 PM", title: "Dhabha Lunch — Himachali Siddu", category: "food", duration: "1h", cost: 400, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=600", reason: "Authentic mountain food — budget-friendly, high rating." },
      { id: "b4", time: "4:00 PM", title: "Rohtang Pass Photo Expedition", category: "photo", duration: "3h", cost: 1200, image: "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?auto=format&fit=crop&q=80&w=600", reason: "Photography DNA triggered — iconic snow-clad vistas." },
    ],
    // Day 3
    [
      { id: "c1", time: "8:00 AM", title: "Hadimba Temple & Forest Walk", category: "landmark", duration: "2h", cost: 100, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600", reason: "Culture score activated — mystical cedar forest temple." },
      { id: "c2", time: "11:00 AM", title: "Beas River Rafting", category: "activity", duration: "2h", cost: 1800, image: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&q=80&w=600", reason: "Adventure DNA — Grade 3-4 rapids, perfect challenge level." },
      { id: "c3", time: "2:00 PM", title: "Tibetan Market Cultural Tour", category: "landmark", duration: "1.5h", cost: 600, image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=600", reason: "Culture + Food combo — local crafts, momos, thukpa." },
      { id: "c4", time: "7:30 PM", title: "Campfire Dinner under Stars", category: "nightlife", duration: "2h", cost: 1200, image: "https://images.unsplash.com/photo-1478827536114-da961b7f86d2?auto=format&fit=crop&q=80&w=600", reason: "Social + Relaxation balance — evening stories by fire." },
    ],
    // Day 4
    [
      { id: "d1", time: "6:30 AM", title: "Chandrakhani Pass Hike", category: "nature", duration: "5h", cost: 800, image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=600", reason: "Full day adventure — remote trail, waterfall, alpine meadows." },
      { id: "d2", time: "1:00 PM", title: "Kasol Village Lunch", category: "food", duration: "1.5h", cost: 500, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600", reason: "Israeli-Himachali fusion — unique flavour your Food score will love." },
      { id: "d3", time: "4:00 PM", title: "Parvati River Sunset Photography", category: "photo", duration: "2h", cost: 0, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600", reason: "Golden hour + photography DNA (87%) = perfect session." },
    ],
    // Day 5
    [
      { id: "e1", time: "9:00 AM", title: "Manu Temple Morning Visit", category: "landmark", duration: "1h", cost: 50, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600", reason: "Peaceful cultural close — ancient temple for Lord Manu." },
      { id: "e2", time: "11:00 AM", title: "Mountain Café Farewell Brunch", category: "food", duration: "1.5h", cost: 700, image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600", reason: "Your best-rated café in Manali — end on a high note." },
      { id: "e3", time: "2:00 PM", title: "Depart — Drive to Chandigarh", category: "transport", duration: "8h", cost: 1500, image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600", reason: "Scenic Beas valley highway — last views of the Himalayas." },
    ],
  ],
};

const COVER_IMAGES: Record<string, string> = {
  manali: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1600",
  kyoto: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1600",
  santorini: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=1600",
  bangkok: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=1600",
  queenstown: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&q=80&w=1600",
  goa: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=1600",
  default: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1600",
};

const THEMES_BY_DEST: Record<string, Array<{ theme: string; emoji: string }>> = {
  manali: [
    { theme: "The Arrival", emoji: "✈️" },
    { theme: "Into the Mountains", emoji: "🏔️" },
    { theme: "Culture & Rivers", emoji: "🏛️" },
    { theme: "Deep Wilderness", emoji: "🌿" },
    { theme: "The Farewell", emoji: "🌅" },
  ],
  kyoto: [
    { theme: "Ancient Gates", emoji: "⛩️" },
    { theme: "Temple Trails", emoji: "🏯" },
    { theme: "Tea & Tradition", emoji: "🍵" },
    { theme: "Forest & Bamboo", emoji: "🎋" },
    { theme: "Geisha District", emoji: "🌸" },
  ],
  default: [
    { theme: "The Arrival", emoji: "✈️" },
    { theme: "Discovery Day", emoji: "🗺️" },
    { theme: "Culture & Flavours", emoji: "🍜" },
    { theme: "Hidden Gems", emoji: "📸" },
    { theme: "The Farewell", emoji: "🌅" },
  ],
};

function scoreTrip(input: TripInput, dna: TravelDNA | null): number {
  const traits = [input.adventure, input.food, input.culture, input.nature, input.photography];
  const avg = traits.reduce((a, b) => a + b, 0) / traits.length;
  const base = 70 + (avg / 100) * 25;
  return Math.min(99, Math.round(base + (dna ? 3 : 0)));
}

function buildBudget(input: TripInput): BudgetBreakdown {
  const total = input.budgetTotal;
  const accommodation = Math.round(total * 0.31);
  const transport = Math.round(total * 0.25);
  const food = Math.round(total * 0.16);
  const activities = Math.round(total * 0.18);
  const emergency = Math.round(total * 0.07);
  const used = accommodation + transport + food + activities + emergency;
  return { accommodation, transport, food, activities, emergency, total, remaining: total - used };
}

function getActivityPool(dest: string, dayIdx: number): Activity[] {
  const key = dest.toLowerCase().trim();
  const pool = ACTIVITY_POOLS[key] ?? ACTIVITY_POOLS["manali"];
  return pool[dayIdx] ?? pool[pool.length - 1] ?? [];
}

function getThemes(dest: string) {
  const key = dest.toLowerCase().trim();
  return THEMES_BY_DEST[key] ?? THEMES_BY_DEST["default"];
}

function getCover(dest: string) {
  const key = dest.toLowerCase().trim();
  return COVER_IMAGES[key] ?? COVER_IMAGES["default"];
}

export function generateTrip(input: TripInput, dna: TravelDNA | null): GeneratedTrip {
  const themes = getThemes(input.destination);
  const days_plan: DayPlan[] = Array.from({ length: input.days }, (_, i) => ({
    day: i + 1,
    theme: themes[i]?.theme ?? `Day ${i + 1}`,
    emoji: themes[i]?.emoji ?? "🗺️",
    activities: getActivityPool(input.destination, i),
  }));

  const highlights = [
    input.adventure > 60 ? "🏔️ High-altitude adventure" : null,
    input.food > 60 ? "🍜 Authentic culinary experiences" : null,
    input.photography > 60 ? "📸 Prime photography spots" : null,
    input.nature > 60 ? "🌿 Immersive nature trails" : null,
    input.culture > 60 ? "🏛️ Deep cultural immersion" : null,
  ].filter(Boolean) as string[];

  const archetype = dna?.archetype ?? (input.adventure > 70 ? "Adventure Seeker" : input.food > 70 ? "Culinary Explorer" : "World Explorer");
  const archetypeIcon = dna?.archetypeIcon ?? (input.adventure > 70 ? "🏔️" : input.food > 70 ? "🍜" : "🌍");

  return {
    id: `trip_${Date.now()}`,
    destination: input.destination,
    origin: input.origin,
    days: input.days,
    travelers: input.travelers,
    currency: input.currency,
    budgetTotal: input.budgetTotal,
    tripScore: scoreTrip(input, dna),
    archetype,
    archetypeIcon,
    coverImage: getCover(input.destination),
    tagline: `A ${input.days}-day ${archetype.toLowerCase()} journey crafted around your Travel DNA.`,
    days_plan,
    budget: buildBudget(input),
    highlights,
  };
}

export const OPTIMIZE_OPTIONS = [
  { id: "cheaper", emoji: "💰", label: "Make it cheaper" },
  { id: "faster", emoji: "⚡", label: "Make it faster" },
  { id: "adventurous", emoji: "🏔️", label: "More adventurous" },
  { id: "relaxing", emoji: "😌", label: "More relaxing" },
  { id: "food", emoji: "🍜", label: "More food-focused" },
  { id: "photogenic", emoji: "📸", label: "More photogenic" },
  { id: "romantic", emoji: "❤️", label: "More romantic" },
];

export const ADAPT_SCENARIOS = [
  { id: "rain", emoji: "☔", label: "Weather changes (rain)" },
  { id: "budget_cut", emoji: "💰", label: "Reduce budget by 20%" },
  { id: "extra_day", emoji: "➕", label: "Add an extra day" },
  { id: "remove_day", emoji: "➖", label: "Remove a day" },
  { id: "more_rest", emoji: "😌", label: "Need more rest tomorrow" },
];

export const POPULAR_DESTINATIONS = [
  "Manali", "Goa", "Kyoto", "Bangkok", "Santorini",
  "Queenstown", "Bali", "Paris", "New York", "Cape Town",
];
