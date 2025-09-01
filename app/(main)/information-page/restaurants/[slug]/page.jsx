import { client } from "@/sanity/lib/client";
import { getRestaurantBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import RestaurantPageClient from "./_components/RestaurantPageClient"; // Import the Client Component

// This function MUST be in a Server Component
export async function generateMetadata({ params }) {
    const restaurant = await client.fetch(getRestaurantBySlugQuery, { slug: params.slug });
    if (!restaurant) return { title: "Restaurant Not Found" };
    return {
        title: `${restaurant.name} | Pandharpur Restaurants`,
        description: restaurant.description, // Uses the short description for metadata
    };
}

// This is the main page export, which is also a Server Component
export default async function SingleRestaurantPage({ params }) {
    const restaurant = await client.fetch(getRestaurantBySlugQuery, { slug: params.slug });

    if (!restaurant) {
        notFound();
    }

    // Pass the fetched server data to the Client Component as a prop
    return <RestaurantPageClient restaurant={restaurant} />;
}