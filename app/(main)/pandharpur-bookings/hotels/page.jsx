

import { client } from "@/sanity/lib/client";
import { getAllHotelsQuery } from "@/sanity/lib/queries";
import { BedDouble } from "lucide-react";
import { BlueBackground } from "@/components/BlueSharedBackGround";
import HotelCard from "./_components/HotelCard";

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
// git
// --- Main Page Component ---
export default async function HotelsPage() {
  const hotels = await client.fetch(getAllHotelsQuery);

  return (
    <div className="min-h-screen">
      <BlueBackground />
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <PageHeader
            title="Accommodations in Pandharpur"
            subtitle="Find the perfect place to stay, from deluxe hotels to budget-friendly lodges, for a comfortable and blessed pilgrimage."
          />

          {hotels && hotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {hotels.map((hotel) => (
                <HotelCard key={hotel._id} hotel={hotel} />
              ))}
            </div>
          ) : (
            <div className="text-center mt-16 text-slate-600 bg-white border border-slate-200 rounded-2xl p-12 max-w-lg mx-auto">
              <BedDouble className="mx-auto h-16 w-16 text-slate-400 mb-4" />
              <h3 className="text-2xl font-semibold text-slate-800">
                No Accommodations Found
              </h3>
              <p className="mt-3 text-slate-500">
                We couldn't find any available places to stay at the moment.
                Please check back again soon as we are constantly updating our
                listings.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
