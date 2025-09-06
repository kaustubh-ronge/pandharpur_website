import { client } from "@/sanity/lib/client";
import { getAllTemplesQuery } from "@/sanity/lib/queries";

import HeroSection from "./_components/HeroSection";
import TempleList from "./_components/TempleList";
import FaqSection from "./_components/FaqSection";

export default async function TemplePage() {
    // Fetch data directly on the server. No more useEffect or useState for data fetching here.
    const temples = await client.fetch(getAllTemplesQuery);

    return (
        <div>
            <HeroSection />

            <TempleList temples={temples} />

            <FaqSection />
        </div>
    );
}