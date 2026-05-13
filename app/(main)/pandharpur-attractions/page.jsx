import Link from 'next/link';
import Image from 'next/image';
import { getAttractionsByCategoryQuery } from '@/sanity/lib/queries';
import { BlueBackground } from '@/components/BlueSharedBackGround';
import { sanityFetch } from '@/sanity/lib/fetch';
import { Suspense } from 'react';
import { ListingSkeleton } from '@/components/ListingSkeleton';

import AttractionListClient from "./_components/AttractionListClient";

/**
 * Attractions Listing Page - Optimized for Performance & Streaming.
 */

export const metadata = {
  title: 'Pandharpur Attractions | Explore Places to Visit',
  description: 'Discover the top attractions and places to visit in Pandharpur beyond the main pilgrimage sites. Plan your trip with our detailed guide.',
  openGraph: {
    title: 'Pandharpur Attractions | Explore Places to Visit',
    description: 'Discover the top attractions and places to visit in Pandharpur beyond the main pilgrimage sites.',
    url: '/pandharpur-attractions',
  },
  alternates: {
    canonical: '/pandharpur-attractions',
  },
};

async function AttractionList() {
  const categories = await sanityFetch({
    query: getAttractionsByCategoryQuery,
    tags: ['otherAttraction', 'otherAttractionCategory']
  });

  return <AttractionListClient categories={categories} />;
}

export default async function OtherAttractionsPage() {
  return (
    <div className="container mx-auto px-10 py-8 mt-20">
      <BlueBackground />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Other Attractions</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover more of what Pandharpur has to offer beyond the main pilgrimage sites.
        </p>
      </div>

      <Suspense fallback={<ListingSkeleton />}>
        <AttractionList />
      </Suspense>
    </div>
  );
}