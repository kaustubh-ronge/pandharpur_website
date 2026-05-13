import { client } from "@/sanity/lib/client";
import { getHotelBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import HotelPageClient from "./_components/HotelPageClient";
import { sanityFetch } from "@/sanity/lib/fetch";


export async function generateStaticParams() {
    const hotels = await client.fetch(`*[_type == "hotel"]{ "slug": slug.current }`);
    return hotels.map((hotel) => ({
        slug: hotel.slug,
    }));
}

export async function generateMetadata(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) return { title: "Hotel Not Found" };

    const hotel = await sanityFetch({
        query: getHotelBySlugQuery,
        params: { slug },
        tags: ['hotel', `hotel:${slug}`]
    });

    if (!hotel) return { title: "Hotel Not Found" };

    return {
        title: `${hotel.name} | Pandharpur Hotels`,
        description: `View details and amenities for ${hotel.name}, a hotel in Pandharpur.`,
    };
}

export default async function SingleHotelPage(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) {
        notFound();
    }

    const hotel = await sanityFetch({
        query: getHotelBySlugQuery,
        params: { slug },
        tags: ['hotel', `hotel:${slug}`]
    });

    if (!hotel) {
        notFound();
    }

    return <HotelPageClient hotel={hotel} />;
}