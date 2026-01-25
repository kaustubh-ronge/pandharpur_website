import { client } from "@/sanity/lib/client";
import { getTravelBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import TravelPageClient from "./_components/TravelPageClient"; // Import the Client Component

export const revalidate = 0;
export const dynamic = "force-dynamic";

const fetchOptions = {
    cache: "no-store",
    next: { revalidate: 0 },
};

export async function generateMetadata(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) return { title: "Travel Info Not Found" };

    const item = await client.fetch(getTravelBySlugQuery, { slug }, fetchOptions);
    if (!item) return { title: "Travel Info Not Found" };
    return {
        title: `${item.name} | Pandharpur Travel`,
        description: item.description,
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

export default async function SingleTravelPage(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) {
        notFound();
    }

    const item = await client.fetch(getTravelBySlugQuery, { slug }, fetchOptions);

    if (!item) {
        notFound();
    }

    return <TravelPageClient item={item} />;
}