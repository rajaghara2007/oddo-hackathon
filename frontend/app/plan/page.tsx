import PlannerClient from "@/components/trek/PlannerClient";

export const metadata = {
  title: "AI Trip Architect | Global Trotter",
  description: "Tell GlobeTrotter what kind of journey you want. It designs the trip around you.",
};

export default function PlanPage() {
  return <PlannerClient />;
}
