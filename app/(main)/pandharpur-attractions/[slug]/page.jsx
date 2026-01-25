import { client } from "@/sanity/lib/client";
import { getAttractionBySlugQuery, getAttractionSlugsQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import AttractionPageClient from "./_components/AttractionPageClient";

// Statically generate routes at build time
export async function generateStaticParams() {
    const slugs = await client.fetch(getAttractionSlugsQuery);
    return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
    // 1. Await the params object (Fix for Next.js 15)
    const resolvedParams = await params;

    const item = await client.fetch(getAttractionBySlugQuery, { slug: resolvedParams.slug });

    if (!item) return { title: "Attraction Not Found" };
    return {
        title: `${item.name} | Pandharpur Attractions`,
        description: item.description || `Details about ${item.name}, a point of interest in Pandharpur.`,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            },
        },
    };
}

export default async function SingleAttractionPage({ params }) {
    // 2. Await the params object here as well
    const resolvedParams = await params;

    const item = await client.fetch(getAttractionBySlugQuery, { slug: resolvedParams.slug });

    if (!item) {
        notFound();
    }

    return <AttractionPageClient item={item} />;
}