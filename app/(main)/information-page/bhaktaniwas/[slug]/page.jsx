import { client } from "@/sanity/lib/client";
import { getBhaktaniwasBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import BhaktaniwasPageClient from "./_components/BhaktaniwasPageClient";

export async function generateMetadata({ params }) {
    const item = await client.fetch(getBhaktaniwasBySlugQuery, { slug: params.slug });
    if (!item) return { title: "Bhaktaniwas Not Found" };
    return {
        title: `${item.name} | Pandharpur Bhaktaniwas`,
        description: `Find details about ${item.name}, a place for devotees to stay in Pandharpur.`,
    };
}

export default async function SingleBhaktaniwasPage({ params }) {
    const item = await client.fetch(getBhaktaniwasBySlugQuery, { slug: params.slug });

    if (!item) {
        notFound();
    }
    
    return <BhaktaniwasPageClient item={item} />;
}