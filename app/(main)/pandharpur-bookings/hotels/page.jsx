import { getAllHotelsQuery } from "@/sanity/lib/queries";
import { BlueBackground } from "@/components/BlueSharedBackGround";
import { sanityFetch } from "@/sanity/lib/fetch";
import { Suspense } from "react";
import { ListingSkeleton } from "@/components/ListingSkeleton";
import HotelListClient from "./_components/HotelListClient";


function PageHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-16 md:mb-20 mt-[50px]">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-slate-800">
        {title}
      </h1>
      <p className="max-w-3xl mx-auto text-lg text-slate-500">{subtitle}</p>
      <div className="mt-6 w-24 h-1 bg-orange-500 mx-auto rounded-full" />
    </div>
  );
}

// Separate component for the data-fetching part to enable streaming
async function HotelList() {
  const hotels = await sanityFetch({
    query: getAllHotelsQuery,
    tags: ['hotel']
  });

  return <HotelListClient hotels={hotels} />;
}

export default async function HotelsPage() {
  return (
    <div className="min-h-screen">
      <BlueBackground />
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <PageHeader
            title="Accommodations in Pandharpur"
            subtitle="Find the perfect place to stay, from deluxe hotels to budget-friendly lodges, for a comfortable and blessed pilgrimage."
          />

          <Suspense fallback={<ListingSkeleton />}>
            <HotelList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
