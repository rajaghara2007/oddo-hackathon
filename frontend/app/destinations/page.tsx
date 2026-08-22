import { redirect } from "next/navigation";

export default function DestinationsIndexPage() {
  // Redirect to a default destination or an index page
  redirect("/destinations/kyoto");
}
