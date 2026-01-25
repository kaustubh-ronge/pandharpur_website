import { client } from "@/sanity/lib/client";
import { getRestaurantBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import RestaurantPageClient from "./_components/RestaurantPageClient"; // Import the Client Component

export const revalidate = 0;
export const dynamic = "force-dynamic";

const fetchOptions = {
    cache: "no-store",
    next: { revalidate: 0 },
};

// This function MUST be in a Server Component
export async function generateMetadata(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) return { title: "Restaurant Not Found" };

    const restaurant = await client.fetch(getRestaurantBySlugQuery, { slug }, fetchOptions);
    if (!restaurant) return { title: "Restaurant Not Found" };
    return {
        title: `${restaurant.name} | Pandharpur Restaurants`,
        description: restaurant.description, // Uses the short description for metadata
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

// This is the main page export, which is also a Server Component
export default async function SingleRestaurantPage(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) {
        notFound();
    }

    const restaurant = await client.fetch(getRestaurantBySlugQuery, { slug }, fetchOptions);

    if (!restaurant) {
        notFound();
    }

    // Pass the fetched server data to the Client Component as a prop
    return <RestaurantPageClient restaurant={restaurant} />;
}