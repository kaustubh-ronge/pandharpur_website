import { client } from "@/sanity/lib/client";
import { getAllBhaktaniwasQuery } from "@/sanity/lib/queries";
import { Home } from "lucide-react";
import { SharedBackground } from "@/components/SharedBackGround";
import BhaktaniwasCard from "@/app/(main)/pandharpur-bookings/bhaktaniwas/_components/BhaktaniwasCard";

// --- UI Components ---

function PageHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-12 md:mb-16 mt-15 lg:mt-10 md:mt-10">
      <div className="inline-block bg-orange-100 text-orange-700 p-3 rounded-full mb-4">
        <Home className="h-8 w-8" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight text-gray-900">{title}</h1>
      <p className="max-w-3xl mx-auto text-lg text-gray-500">{subtitle}</p>
    </div>
  );
}


// --- Main Page Component ---

export default async function BhaktaniwasPage() {
  const allBhaktaniwas = await client.fetch(getAllBhaktaniwasQuery);

  return (
    <div className="min-h-screen">
      <SharedBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <PageHeader
          title="Bhaktaniwas in Pandharpur"
          subtitle="Find affordable and convenient accommodations managed by various trusts, offering a peaceful stay for pilgrims."
        />
        
        {allBhaktaniwas && allBhaktaniwas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allBhaktaniwas.map((item) => (
              <BhaktaniwasCard key={item._id} bhaktaniwas={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">No Bhaktaniwas information found. Please check back later.</p>
        )}
      </div>
    </div>
  );
}