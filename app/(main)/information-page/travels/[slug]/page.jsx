import { client } from "@/sanity/lib/client";
import { getTravelBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import TravelPageClient from "./_components/TravelPageClient"; // Import the Client Component

export async function generateMetadata({ params }) {
    const item = await client.fetch(getTravelBySlugQuery, { slug: params.slug });
    if (!item) return { title: "Travel Info Not Found" };
    return {
        title: `${item.name} | Pandharpur Travel`,
        description: item.description,
    };
}

export default async function SingleTravelPage({ params }) {
    const item = await client.fetch(getTravelBySlugQuery, { slug: params.slug });

    if (!item) {
        notFound();
    }

    return <TravelPageClient item={item} />;
}