import { redirect } from "next/navigation";

export default function TripsIndexPage() {
  // Redirect to a default trip or an index page
  redirect("/trips/kyoto");
}
