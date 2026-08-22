import PlannerClient from "@/components/trek/PlannerClient";

export const metadata = {
  title: "AI Trip Architect | Tripora",
  description: "Tell GlobeTrotter what kind of journey you want. It designs the trip around you.",
};

export default function PlanPage() {
  return <PlannerClient />;
}
