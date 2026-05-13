import { getAllKirtankarsQuery } from "@/sanity/lib/queries";
import { Mic } from "lucide-react";
import { BlueBackground } from "@/components/BlueSharedBackGround";
import KirtankarCard from "./_components/KirtankarCard";
import { sanityFetch } from "@/sanity/lib/fetch";
import { Suspense } from "react";
import { ListingSkeleton } from "@/components/ListingSkeleton";

/**
 * Kirtankars Listing Page - Optimized for Performance & Streaming.
 */

import KirtankarListClient from "./_components/KirtankarListClient";

/**
 * Kirtankars Listing Page - Optimized for Performance & Streaming.
 */

function PageHeader({ title, subtitle }) {
    return (
        <div className="text-center mb-16 md:mb-20 mt-[50px]">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-slate-800">{title}</h1>
            <p className="max-w-3xl mx-auto text-lg text-slate-500">{subtitle}</p>
            <div className="mt-6 w-24 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>
    );
}

async function KirtankarList() {
    const kirtankars = await sanityFetch({
        query: getAllKirtankarsQuery,
        tags: ['kirtankar']
    });

    return <KirtankarListClient kirtankars={kirtankars} />;
}

export default async function KirtankarsPage() {
    return (
        <div className="min-h-screen">
            <BlueBackground />
            <div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                    <PageHeader
                        title="Kirtankars of Pandharpur"
                        subtitle="Invite the sacred tradition of Kirtan into your home. Find and inquire with renowned Kirtankars for your events."
                    />
                    <Suspense fallback={<ListingSkeleton />}>
                        <KirtankarList />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}