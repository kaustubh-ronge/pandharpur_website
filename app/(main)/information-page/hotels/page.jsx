import { client } from "@/sanity/lib/sanity";
import { getAllHotelsQuery } from "@/sanity/lib/queries";
import { HotelList } from "./_components/HotelList";
import { PageHeader } from "./_components/PageHeader";

// This is the main Server Component for the page.
export default async function HotelsPage() {
  // 1. All data fetching logic is kept directly in the page file, as you requested.
  const hotels = await client.fetch(getAllHotelsQuery);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* 2. We render small, reusable UI components */}
      <PageHeader title="Our Partner Hotels in Pandharpur" />
      <HotelList hotels={hotels} />
    </div>
  );
}