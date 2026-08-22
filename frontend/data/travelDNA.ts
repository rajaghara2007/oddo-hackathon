export interface TravelDNA {
  adventure: number;
  food: number;
  culture: number;
  nature: number;
  relaxation: number;
  photography: number;
  social: number;
  budget: number;
  pace: number; // 0=slow, 100=fast
  groupType: "solo" | "couple" | "family" | "friends";
  archetype: string;
  archetypeIcon: string;
  summary: string;
}

export const DEFAULT_DNA: TravelDNA = {
  adventure: 0, food: 0, culture: 0, nature: 0,
  relaxation: 0, photography: 0, social: 0, budget: 0,
  pace: 50, groupType: "solo",
  archetype: "", archetypeIcon: "", summary: "",
};

export function calcArchetype(dna: Omit<TravelDNA, "archetype" | "archetypeIcon" | "summary">): Pick<TravelDNA, "archetype" | "archetypeIcon" | "summary"> {
  const scores = [
    { key: "adventure", v: dna.adventure },
    { key: "food", v: dna.food },
    { key: "culture", v: dna.culture },
    { key: "nature", v: dna.nature },
    { key: "photography", v: dna.photography },
    { key: "social", v: dna.social },
  ];
  const top = scores.sort((a, b) => b.v - a.v)[0].key;

  const map: Record<string, { archetype: string; icon: string; summary: string }> = {
    adventure: {
      archetype: "The Adventure Seeker",
      icon: "🏔️",
      summary: "You crave the rush of new heights and uncharted territories. Every trip is a quest, and every destination is a new chapter in your epic story.",
    },
    food: {
      archetype: "The Culinary Explorer",
      icon: "🍜",
      summary: "Your travel is led by your palate. From street-food stalls to Michelin stars, you eat your way through cultures and come home with recipes, not souvenirs.",
    },
    culture: {
      archetype: "The Culture Connoisseur",
      icon: "🏛️",
      summary: "You travel to understand humanity. Museums, temples, festivals, and locals' stories fuel your journeys more than any beach or mountain.",
    },
    nature: {
      archetype: "The Nature Wanderer",
      icon: "🌿",
      summary: "Forests, coastlines, and starlit skies — you seek the Earth in its most raw, untouched form. Nature is your temple.",
    },
    photography: {
      archetype: "The Visual Storyteller",
      icon: "📸",
      summary: "You see the world through a lens, chasing golden hour, symmetry, and candid moments. Every frame is a memory you can share.",
    },
    social: {
      archetype: "The Social Traveller",
      icon: "🎉",
      summary: "People make your travels. Hostels, pub crawls, festivals — you collect friends across continents and turn strangers into family.",
    },
  };

  return {
    archetype: map[top].archetype,
    archetypeIcon: map[top].icon,
    summary: map[top].summary,
  } ?? map["adventure"];
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  budget: string;
  tags: string[];
  dnaWeights: Partial<Record<keyof Omit<TravelDNA, "archetype" | "archetypeIcon" | "summary" | "groupType">, number>>;
}

export const DESTINATIONS: Destination[] = [
  {
    id: "manali",
    name: "Manali",
    country: "India",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800",
    budget: "$30–80/day",
    tags: ["Adventure", "Nature", "Photography"],
    dnaWeights: { adventure: 0.35, nature: 0.30, photography: 0.20, food: 0.15 },
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800",
    budget: "$80–150/day",
    tags: ["Culture", "Photography", "Food"],
    dnaWeights: { culture: 0.35, photography: 0.30, food: 0.25, relaxation: 0.10 },
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800",
    budget: "$120–200/day",
    tags: ["Photography", "Relaxation", "Food"],
    dnaWeights: { photography: 0.35, relaxation: 0.30, food: 0.20, social: 0.15 },
  },
  {
    id: "bangkok",
    name: "Bangkok",
    country: "Thailand",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=800",
    budget: "$40–90/day",
    tags: ["Food", "Culture", "Nightlife"],
    dnaWeights: { food: 0.35, culture: 0.25, social: 0.25, budget: 0.15 },
  },
  {
    id: "queenstown",
    name: "Queenstown",
    country: "New Zealand",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&q=80&w=800",
    budget: "$100–180/day",
    tags: ["Adventure", "Nature", "Photography"],
    dnaWeights: { adventure: 0.40, nature: 0.30, photography: 0.20, relaxation: 0.10 },
  },
  {
    id: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8f22986?auto=format&fit=crop&q=80&w=800",
    budget: "$50–100/day",
    tags: ["Culture", "Food", "Photography"],
    dnaWeights: { culture: 0.35, food: 0.30, photography: 0.20, social: 0.15 },
  },
];

export function matchDestinations(dna: TravelDNA): Array<Destination & { matchPct: number }> {
  return DESTINATIONS.map((dest) => {
    let score = 0;
    for (const [key, weight] of Object.entries(dest.dnaWeights)) {
      const dnaVal = dna[key as keyof TravelDNA];
      if (typeof dnaVal === "number") {
        score += (dnaVal / 100) * (weight as number);
      }
    }
    return { ...dest, matchPct: Math.round(score * 100) };
  }).sort((a, b) => b.matchPct - a.matchPct);
}
