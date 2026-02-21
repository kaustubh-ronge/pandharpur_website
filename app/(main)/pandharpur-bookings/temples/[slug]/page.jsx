// import { client } from "@/sanity/lib/client";
// import { getTempleBySlugQuery } from "@/sanity/lib/queries";
// import { notFound } from "next/navigation";
// import TemplePageClient from "./_components/TemplePageClient";

// // This function MUST be in a Server Component
// export async function generateMetadata({ params }) {
//     const temple = await client.fetch(getTempleBySlugQuery, { slug: params.slug });
//     if (!temple) return { title: "Temple Not Found" };
//     return {
//         title: `${temple.name} | Pandharpur Temples`,
//         description: `Details about the sacred ${temple.name}, its history, timings, and festivals.`,
//     };
// }

// // This is the main page export, which is also a Server Component
// export default async function SingleTemplePage({ params }) {
//     const temple = await client.fetch(getTempleBySlugQuery, { slug: params.slug });

//     if (!temple) {
//         notFound();
//     }

//     // Pass the fetched server data to the Client Component as a prop
//     return <TemplePageClient temple={temple} />;
// }

// import { client } from "@/sanity/lib/client";
// import { getTempleBySlugQuery } from "@/sanity/lib/queries";
// import { notFound } from "next/navigation";
// import TemplePageClient from "./_components/TemplePageClient";

// // This function MUST be in a Server Component
// export async function generateMetadata({ params }) {
//     const temple = await client.fetch(getTempleBySlugQuery, { slug: params.slug });
//     if (!temple) return { title: "Temple Not Found" };
//     return {
//         title: `${temple.name} | Pandharpur Temples`,
//         description: `Details about the sacred ${temple.name}, its history, timings, and festivals.`,
//         robots: {
//             index: true,
//             follow: true,
//             googleBot: {
//                 index: true,
//                 follow: true,
//             },
//         },
//     };
// }

// // This is the main page export, which is also a Server Component
// export default async function SingleTemplePage({ params }) {
//     const temple = await client.fetch(getTempleBySlugQuery, { slug: params.slug });

//     if (!temple) {
//         notFound();
//     }

//     // Pass the fetched server data to the Client Component as a prop
//     return <TemplePageClient temple={temple} />;
// }

import { client } from "@/sanity/lib/client";
import { getTempleBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import TemplePageClient from "./_components/TemplePageClient";

// This function MUST be in a Server Component
export async function generateMetadata({ params }) {
    // 1. Await the params object first
    const resolvedParams = await params; 
    
    // 2. Access the slug from the resolved params
    const temple = await client.fetch(getTempleBySlugQuery, { slug: resolvedParams.slug });
    
    if (!temple) return { title: "Temple Not Found" };
    
    return {
        title: `${temple.name} | Pandharpur Temples`,
        description: `Details about the sacred ${temple.name}, its history, timings, and festivals.`,
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
export default async function SingleTemplePage({ params }) {
    // 1. Await the params object first
    const resolvedParams = await params; 
    
    // 2. Access the slug from the resolved params
    const temple = await client.fetch(getTempleBySlugQuery, { slug: resolvedParams.slug });

    if (!temple) {
        notFound();
    }

    // Pass the fetched server data to the Client Component as a prop
    return <TemplePageClient temple={temple} />;
}