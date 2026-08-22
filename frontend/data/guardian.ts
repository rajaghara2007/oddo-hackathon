export type SafetyStatusType = "safe" | "need_assistance" | "emergency";

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

export interface NearbyService {
  id: string;
  name: string;
  type: "hospital" | "police" | "pharmacy" | "hotel" | "transport";
  distance: string;
  address: string;
  phone?: string;
}

export interface SmartAlert {
  id: string;
  type: "weather" | "activity" | "general";
  icon: string;
  message: string;
}

export interface GuardianState {
  tripStatus: "active" | "planned" | "completed";
  destination: string;
  startDate: string;
  endDate: string;
  travellers: number;
  hotel: string;
  safetyStatus: SafetyStatusType;
  lastCheckIn: string | null;
  emergencyContacts: EmergencyContact[];
  nearbyServices: NearbyService[];
  alerts: SmartAlert[];
}

export const MOCK_GUARDIAN_DATA: GuardianState = {
  tripStatus: "active",
  destination: "Manali, India",
  startDate: "2026-06-12",
  endDate: "2026-06-17",
  travellers: 3,
  hotel: "Himalayan Retreat Resort",
  safetyStatus: "safe",
  lastCheckIn: "2 hours ago",
  emergencyContacts: [
    { id: "c1", name: "Rahul Sharma", relationship: "Brother", phone: "+91 98765 43210" },
    { id: "c2", name: "Priya Desai", relationship: "Spouse", phone: "+91 91234 56789" },
  ],
  nearbyServices: [
    { id: "s1", name: "Manali Civil Hospital", type: "hospital", distance: "1.2 km", address: "Mall Road, Manali", phone: "108" },
    { id: "s2", name: "Manali Police Station", type: "police", distance: "0.8 km", address: "Near Volvo Stand", phone: "100" },
    { id: "s3", name: "Apollo Pharmacy", type: "pharmacy", distance: "0.5 km", address: "Old Manali Road" },
  ],
  alerts: [
    { id: "a1", type: "weather", icon: "🌧️", message: "Heavy rain expected tomorrow afternoon. Plan indoor activities." },
    { id: "a2", type: "activity", icon: "🏔️", message: "Rohtang Pass excursion tomorrow: Carry thermal wear and ID proof." },
  ]
};
