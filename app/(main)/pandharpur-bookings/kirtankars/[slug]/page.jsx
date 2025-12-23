import { client } from "@/sanity/lib/client";
import { getKirtankarBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import KirtankarPageClient from "./KirtankarPageClient";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const fetchOptions = {
    cache: "no-store",
    next: { revalidate: 0 },
};

export async function generateMetadata(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) return { title: "Kirtankar Not Found" };

    const kirtankar = await client.fetch(getKirtankarBySlugQuery, { slug }, fetchOptions);
    if (!kirtankar) return { title: "Kirtankar Not Found" };
    return {
        title: `${kirtankar.name} | Kirtankars in Pandharpur`,
        description: `Details and booking inquiry for ${kirtankar.name}. ${kirtankar.description}`,
    };
}

export default async function SingleKirtankarPage(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) {
        notFound();
    }

    const kirtankar = await client.fetch(getKirtankarBySlugQuery, { slug }, fetchOptions);

    if (!kirtankar) {
        notFound();
    }

    return <KirtankarPageClient kirtankar={kirtankar} />;
}