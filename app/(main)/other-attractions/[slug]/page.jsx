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
    const item = await client.fetch(getAttractionBySlugQuery, { slug: params.slug });
    if (!item) return { title: "Attraction Not Found" };
    return {
        title: `${item.name} | Pandharpur Attractions`,
        description: item.description || `Details about ${item.name}, a point of interest in Pandharpur.`,
    };
}

export default async function SingleAttractionPage({ params }) {
    const item = await client.fetch(getAttractionBySlugQuery, { slug: params.slug });

    if (!item) {
        notFound();
    }
    
    return <AttractionPageClient item={item} />;
}