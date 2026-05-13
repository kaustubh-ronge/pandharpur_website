import { getAllTemplesQuery } from "@/sanity/lib/queries";
import HeroSection from "./_components/HeroSection";
import TempleList from "./_components/TempleList";
import FaqSection from "./_components/FaqSection";
import { sanityFetch } from "@/sanity/lib/fetch";
import { Suspense } from "react";
import { ListingSkeleton } from "@/components/ListingSkeleton";

import TempleListClient from "./_components/TempleListClient";

/**
 * Temple Listing Page - Optimized for Performance & Streaming.
 */

export const metadata = {
  title: 'Sacred Temples of Pandharpur | Darshan Timings & History',
  description: 'Explore the holy temples of Pandharpur, including Vitthal Rukmini Mandir, Pundalik Temple, and others. Find complete guides on history, sacred rituals, and darshan timings.',
  keywords: 'Pandharpur Temples, Vitthal Rukmini Mandir, Pundalik Temple, Pandharpur Darshan, Temple Timings',
  alternates: {
    canonical: '/temples',
  },
};

async function TempleListContainer() {
  const temples = await sanityFetch({
    query: getAllTemplesQuery,
    tags: ['temple']
  });

  return <TempleListClient temples={temples} />;
}

export default async function TemplePage() {
  return (
    <div className="mt-[80px]">
      <HeroSection />
      <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16"><ListingSkeleton /></div>}>
        <TempleListContainer />
      </Suspense>
      <FaqSection />
    </div>
  );
}