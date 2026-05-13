import { client } from "@/sanity/lib/client";
import { getRestaurantBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import RestaurantPageClient from "./_components/RestaurantPageClient";
import { sanityFetch } from "@/sanity/lib/fetch";

/**
 * Restaurant Detail Page - Optimized for Performance.
 */

export async function generateStaticParams() {
    const restaurants = await client.fetch(`*[_type == "restaurant"]{ "slug": slug.current }`);
    return restaurants.map((item) => ({
        slug: item.slug,
    }));
}

export async function generateMetadata(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) return { title: "Restaurant Not Found" };

    const restaurant = await sanityFetch({
        query: getRestaurantBySlugQuery,
        params: { slug },
        tags: ['restaurant', `restaurant:${slug}`]
    });
    
    if (!restaurant) return { title: "Restaurant Not Found" };
    return {
        title: `${restaurant.name} | Pandharpur Restaurants`,
        description: restaurant.description,
    };
}

export default async function SingleRestaurantPage(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) {
        notFound();
    }

    const restaurant = await sanityFetch({
        query: getRestaurantBySlugQuery,
        params: { slug },
        tags: ['restaurant', `restaurant:${slug}`]
    });

    if (!restaurant) {
        notFound();
    }

    return <RestaurantPageClient restaurant={restaurant} />;
}