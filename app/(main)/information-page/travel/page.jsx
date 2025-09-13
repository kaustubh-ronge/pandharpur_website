import { client } from "@/sanity/lib/client";
import { getAllTravelsQuery } from "@/sanity/lib/queries";
import { Bus } from "lucide-react";
import { SharedBackground } from "@/components/SharedBackGround";
import TravelsCard from "@/app/(main)/information-page/travel/_components/TravelsCard";

// --- UI Components ---

function PageHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-12 md:mb-16 mt-5 lg:mt-0 md:mt-5">
      <div className="inline-block bg-purple-100 text-purple-700 p-3 rounded-full mb-4">
        <Bus className="h-8 w-8" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight text-gray-900">{title}</h1>
      <p className="max-w-3xl mx-auto text-lg text-gray-500">{subtitle}</p>
    </div>
  );
}


// --- Main Page Component ---

export default async function TravelPage() {
  const travelOptions = await client.fetch(getAllTravelsQuery);

  return (
    <div className="min-h-screen mt-10">
      <SharedBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <PageHeader
          title="Travel & Transport in Pandharpur"
          subtitle="Find information on how to reach Pandharpur and get around the city, from bus services to local rickshaws."
        />
        
        {travelOptions && travelOptions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {travelOptions.map((item) => (
              <TravelsCard key={item._id} travel={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">No travel information found. Please check back later.</p>
        )}
      </div>
    </div>
  );
}