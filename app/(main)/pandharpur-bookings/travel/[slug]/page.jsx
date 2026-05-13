import { client } from "@/sanity/lib/client";
import { getTravelBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import TravelPageClient from "./_components/TravelPageClient";
import { sanityFetch } from "@/sanity/lib/fetch";

/**
 * Travel Detail Page - Optimized for Performance.
 */

export async function generateStaticParams() {
    const travels = await client.fetch(`*[_type == "travel"]{ "slug": slug.current }`);
    return travels.map((item) => ({
        slug: item.slug,
    }));
}

export async function generateMetadata(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) return { title: "Travel Info Not Found" };

    const item = await sanityFetch({
        query: getTravelBySlugQuery,
        params: { slug },
        tags: ['travel', `travel:${slug}`]
    });
    
    if (!item) return { title: "Travel Info Not Found" };
    return {
        title: `${item.name} | Pandharpur Travel`,
        description: item.description,
    };
}

export default async function SingleTravelPage(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) {
        notFound();
    }

    const item = await sanityFetch({
        query: getTravelBySlugQuery,
        params: { slug },
        tags: ['travel', `travel:${slug}`]
    });

    if (!item) {
        notFound();
    }

    return <TravelPageClient item={item} />;
}