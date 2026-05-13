import { client } from "@/sanity/lib/client";
import { getBhaktaniwasBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import BhaktaniwasPageClient from "./_components/BhaktaniwasPageClient";
import { sanityFetch } from "@/sanity/lib/fetch";

/**
 * Bhaktaniwas Detail Page - Optimized for Performance.
 */

export async function generateStaticParams() {
    const items = await client.fetch(`*[_type == "bhaktaniwas"]{ "slug": slug.current }`);
    return items.map((item) => ({
        slug: item.slug,
    }));
}

export async function generateMetadata(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) return { title: "Bhaktaniwas Not Found" };

    const item = await sanityFetch({
        query: getBhaktaniwasBySlugQuery,
        params: { slug },
        tags: ['bhaktaniwas', `bhaktaniwas:${slug}`]
    });
    
    if (!item) return { title: "Bhaktaniwas Not Found" };
    return {
        title: `${item.name} | Pandharpur Bhaktaniwas`,
        description: `Find details about ${item.name}, a place for devotees to stay in Pandharpur.`,
    };
}

export default async function SingleBhaktaniwasPage(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) {
        notFound();
    }

    const item = await sanityFetch({
        query: getBhaktaniwasBySlugQuery,
        params: { slug },
        tags: ['bhaktaniwas', `bhaktaniwas:${slug}`]
    });

    if (!item) {
        notFound();
    }
    
    return <BhaktaniwasPageClient item={item} />;
}