import { client } from "@/sanity/lib/client";
import { getKirtankarBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import KirtankarPageClient from "./KirtankarPageClient";
import { sanityFetch } from "@/sanity/lib/fetch";

/**
 * Kirtankar Detail Page - Optimized for Performance.
 */

export async function generateStaticParams() {
    const items = await client.fetch(`*[_type == "kirtankar"]{ "slug": slug.current }`);
    return items.map((item) => ({
        slug: item.slug,
    }));
}

export async function generateMetadata(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) return { title: "Kirtankar Not Found" };

    const kirtankar = await sanityFetch({
        query: getKirtankarBySlugQuery,
        params: { slug },
        tags: ['kirtankar', `kirtankar:${slug}`]
    });
    
    if (!kirtankar) return { title: "Kirtankar Not Found" };
    return {
        title: `${kirtankar.name} | Kirtankars in Pandharpur`,
        description: `Details and booking inquiry for ${kirtankar.name}. ${kirtankar.description}`,
    };
}

export default async function SingleKirtankarPage(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) {
        notFound();
    }

    const kirtankar = await sanityFetch({
        query: getKirtankarBySlugQuery,
        params: { slug },
        tags: ['kirtankar', `kirtankar:${slug}`]
    });

    if (!kirtankar) {
        notFound();
    }

    return <KirtankarPageClient kirtankar={kirtankar} />;
}