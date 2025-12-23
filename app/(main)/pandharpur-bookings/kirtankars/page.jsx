import { client } from "@/sanity/lib/client";
import { getAllKirtankarsQuery } from "@/sanity/lib/queries";
import { Mic } from "lucide-react";
import { BlueBackground } from "@/components/BlueSharedBackGround";
import KirtankarCard from "./_components/KirtankarCard";

function PageHeader({ title, subtitle }) {
    return (
        <div className="text-center mb-16 md:mb-20 mt-[50px]">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-slate-800">{title}</h1>
            <p className="max-w-3xl mx-auto text-lg text-slate-500">{subtitle}</p>
            <div className="mt-6 w-24 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>
    );
}

export const revalidate = 60; // Revalidate at most every 60 seconds

export default async function KirtankarsPage() {
    const kirtankars = await client.fetch(getAllKirtankarsQuery);

    return (
        <div className="min-h-screen">
            <BlueBackground />
            <div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                    <PageHeader
                        title="Kirtankars of Pandharpur"
                        subtitle="Invite the sacred tradition of Kirtan into your home. Find and inquire with renowned Kirtankars for your events."
                    />
                    {kirtankars && kirtankars.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                            {kirtankars.map((kirtankar) => (
                                <KirtankarCard key={kirtankar._id} kirtankar={kirtankar} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center mt-16 text-slate-600 bg-white border border-slate-200 rounded-2xl p-12 max-w-lg mx-auto">
                            <Mic className="mx-auto h-16 w-16 text-slate-400 mb-4" />
                            <h3 className="text-2xl font-semibold text-slate-800">No Kirtankars Found</h3>
                            <p className="mt-3 text-slate-500">
                                We are currently updating our list of Kirtankars. Please check back again soon.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}