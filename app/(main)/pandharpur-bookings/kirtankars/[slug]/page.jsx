import { client } from "@/sanity/lib/client";
import { getKirtankarBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import KirtankarPageClient from "./KirtankarPageClient";

export async function generateMetadata({ params }) {
    const kirtankar = await client.fetch(getKirtankarBySlugQuery, { slug: params.slug });
    if (!kirtankar) return { title: "Kirtankar Not Found" };
    return {
        title: `${kirtankar.name} | Kirtankars in Pandharpur`,
        description: `Details and booking inquiry for ${kirtankar.name}. ${kirtankar.description}`,
    };
}

export default async function SingleKirtankarPage({ params }) {
    const kirtankar = await client.fetch(getKirtankarBySlugQuery, { slug: params.slug });

    if (!kirtankar) {
        notFound();
    }

    return <KirtankarPageClient kirtankar={kirtankar} />;
}