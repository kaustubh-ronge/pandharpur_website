import { getAllRestaurantsQuery } from "@/sanity/lib/queries";
import { SharedBackground } from "@/components/SharedBackGround";
import { sanityFetch } from "@/sanity/lib/fetch";
import Link from "next/link";
import Image from "next/image";
import { Award, UtensilsIcon } from "lucide-react";
import { Suspense } from "react";
import { ListingSkeleton } from "@/components/ListingSkeleton";
import RestaurantListClient from "./_components/RestaurantListClient";

/**
 * Restaurants Listing Page - Optimized for Performance & Streaming.
 */

function PageHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <div className="inline-block bg-green-100 text-green-700 p-3 rounded-full mb-4">
        <UtensilsIcon className="h-8 w-8" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight text-gray-900">{title}</h1>
      <p className="max-w-3xl mx-auto text-lg text-gray-500">{subtitle}</p>
    </div>
  );
}

async function RestaurantList() {
  const restaurants = await sanityFetch({
    query: getAllRestaurantsQuery,
    tags: ['restaurant']
  });

  return <RestaurantListClient restaurants={restaurants} />;
}

export default async function RestaurantsPage() {
  return (
    <div className="min-h-screen mt-10">
      <SharedBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <PageHeader
          title="Dining in Pandharpur"
          subtitle="From traditional Maharashtrian thalis to quick bites, discover pure vegetarian restaurants for a delicious and sattvic meal."
        />

        <Suspense fallback={<ListingSkeleton />}>
          <RestaurantList />
        </Suspense>
      </div>
    </div>
  );
}