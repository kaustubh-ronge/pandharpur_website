import { client } from "@/sanity/lib/client";
import { getAttractionBySlugQuery, getAttractionSlugsQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import AttractionPageClient from "./_components/AttractionPageClient";
import { sanityFetch } from "@/sanity/lib/fetch";

/**
 * Attraction Detail Page - Optimized for Performance.
 */

export async function generateStaticParams() {
    const slugs = await client.fetch(getAttractionSlugsQuery);
    return (slugs || []).map((slug) => ({ slug }));
}

// Generate metadata for SEO — uses seoTitle/seoDescription from CMS if set
export async function generateMetadata({ params }) {
    const resolvedParams = await params;

    const item = await sanityFetch({
        query: getAttractionBySlugQuery,
        params: { slug: resolvedParams.slug },
        tags: ['otherAttraction', `otherAttraction:${resolvedParams.slug}`]
    });

    if (!item) return { title: "Attraction Not Found" };
    
    return {
        title: item.seoTitle || `${item.name} | Pandharpur Attractions`,
        description: item.seoDescription || item.description || `Details about ${item.name}, a point of interest in Pandharpur.`,
        keywords: item.seoKeywords || `Pandharpur, ${item.name}, attractions, tourism`,
        openGraph: {
            title: item.seoTitle || `${item.name} | Pandharpur Attractions`,
            description: item.seoDescription || item.description || `Details about ${item.name}, a point of interest in Pandharpur.`,
            url: `/pandharpur-attractions/${resolvedParams.slug}`,
            images: item.image ? [{ url: item.image }] : [],
        },
        alternates: {
            canonical: `/pandharpur-attractions/${resolvedParams.slug}`,
        },
    };
}

export default async function SingleAttractionPage({ params }) {
    const resolvedParams = await params;

    const item = await sanityFetch({
        query: getAttractionBySlugQuery,
        params: { slug: resolvedParams.slug },
        tags: ['otherAttraction', `otherAttraction:${resolvedParams.slug}`]
    });

    if (!item) {
        notFound();
    }

    return <AttractionPageClient item={item} />;
}