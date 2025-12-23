

import { client } from "@/sanity/lib/client";
import { getHotelBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import HotelPageClient from "./_components/HotelPageClient";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const fetchOptions = {
    cache: "no-store",
    next: { revalidate: 0 },
};

export async function generateMetadata(props) {
    // In Next.js 15/16 with dynamic routes, params can be a Promise.
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) return { title: "Hotel Not Found" };

    const hotel = await client.fetch(getHotelBySlugQuery, { slug }, fetchOptions);
    if (!hotel) return { title: "Hotel Not Found" };

    return {
        title: `${hotel.name} | Pandharpur Hotels`,
        description: `View details and amenities for ${hotel.name}, a hotel in Pandharpur.`,
    };
}

export default async function SingleHotelPage(props) {
    // In Next.js 15/16 with dynamic routes, params can be a Promise.
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) {
        notFound();
    }

    const hotel = await client.fetch(getHotelBySlugQuery, { slug }, fetchOptions);
    if (!hotel) {
        notFound();
    }

    // Pass the fetched data to the client component
    return <HotelPageClient hotel={hotel} />;
}