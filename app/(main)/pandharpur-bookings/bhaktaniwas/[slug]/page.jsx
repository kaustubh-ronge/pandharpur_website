import { client } from "@/sanity/lib/client";
import { getBhaktaniwasBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import BhaktaniwasPageClient from "./_components/BhaktaniwasPageClient";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const fetchOptions = {
    cache: "no-store",
    next: { revalidate: 0 },
};

export async function generateMetadata(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) return { title: "Bhaktaniwas Not Found" };

    const item = await client.fetch(getBhaktaniwasBySlugQuery, { slug }, fetchOptions);
    if (!item) return { title: "Bhaktaniwas Not Found" };
    return {
        title: `${item.name} | Pandharpur Bhaktaniwas`,
        description: `Find details about ${item.name}, a place for devotees to stay in Pandharpur.`,
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

export default async function SingleBhaktaniwasPage(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) {
        notFound();
    }

    const item = await client.fetch(getBhaktaniwasBySlugQuery, { slug }, fetchOptions);

    if (!item) {
        notFound();
    }
    
    return <BhaktaniwasPageClient item={item} />;
}