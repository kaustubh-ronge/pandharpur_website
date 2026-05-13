import { getAllBhaktaniwasQuery } from "@/sanity/lib/queries";
import { Home } from "lucide-react";
import { SharedBackground } from "@/components/SharedBackGround";
import { sanityFetch } from "@/sanity/lib/fetch";
import { Suspense } from "react";
import { ListingSkeleton } from "@/components/ListingSkeleton";
import BhaktaniwasListClient from "./_components/BhaktaniwasListClient";

/**
 * Bhaktaniwas Listing Page - Optimized for Performance & Streaming.
 */

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

async function BhaktaniwasList() {
  const allBhaktaniwas = await sanityFetch({
    query: getAllBhaktaniwasQuery,
    tags: ['bhaktaniwas']
  });

  return <BhaktaniwasListClient allBhaktaniwas={allBhaktaniwas} />;
}

export default async function BhaktaniwasPage() {
  return (
    <div className="min-h-screen">
      <SharedBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <PageHeader
          title="Bhaktaniwas in Pandharpur"
          subtitle="Find affordable and convenient accommodations managed by various trusts, offering a peaceful stay for pilgrims."
        />

        <Suspense fallback={<ListingSkeleton />}>
          <BhaktaniwasList />
        </Suspense>
      </div>
    </div>
  );
}