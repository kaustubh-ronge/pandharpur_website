import { client } from "@/sanity/lib/client";
import { getTempleBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import TemplePageClient from "./_components/TemplePageClient";
import { sanityFetch } from "@/sanity/lib/fetch";

/**
 * Temple Detail Page - Optimized for Performance.
 */

export async function generateStaticParams() {
    const items = await client.fetch(`*[_type == "temple"]{ "slug": slug.current }`);
    return items.map((item) => ({
        slug: item.slug,
    }));
}

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const temple = await sanityFetch({
        query: getTempleBySlugQuery,
        params: { slug: resolvedParams.slug },
        tags: ['temple', `temple:${resolvedParams.slug}`]
    });

    if (!temple) return { title: "Temple Not Found" };

    return {
        title: `${temple.name} | Pandharpur Temples`,
        description: `Details about the sacred ${temple.name}, its history, timings, and festivals.`,
        alternates: {
            canonical: `/temples/${resolvedParams.slug}`,
        },
        openGraph: {
            title: `${temple.name} | Pandharpur Temples`,
            description: `Explore ${temple.name}: History, Darshan timings, and spiritual significance.`,
            images: [temple.image],
            type: 'website',
        },
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

export default async function SingleTemplePage({ params }) {
    const resolvedParams = await params;
    const temple = await sanityFetch({
        query: getTempleBySlugQuery,
        params: { slug: resolvedParams.slug },
        tags: ['temple', `temple:${resolvedParams.slug}`]
    });

    if (!temple) {
        notFound();
    }

    return <TemplePageClient temple={temple} />;
}