

import { client } from "@/sanity/lib/client";
import { getHotelBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import HotelPageClient from "./_components/HotelPageClient";

export async function generateMetadata({ params }) {
    const hotel = await client.fetch(getHotelBySlugQuery, { slug: params.slug });
    if (!hotel) return { title: "Hotel Not Found" };
    return {
        title: `${hotel.name} | Pandharpur Hotels`,
        description: `View details and amenities for ${hotel.name}, a hotel in Pandharpur.`,
    };
}

export default async function SingleHotelPage({ params }) {
    const hotel = await client.fetch(getHotelBySlugQuery, { slug: params.slug });
    if (!hotel) {
        notFound();
    }
    // Pass the fetched data to the client component
    return <HotelPageClient hotel={hotel} />;
}