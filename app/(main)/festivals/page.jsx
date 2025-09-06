import { majorFestivals } from '@/data/FestivalsPageData/majorFestivals';
import { monthlyEvents } from '@/data/FestivalsPageData/monthlyEvents';
import { specialRituals } from '@/data/FestivalsPageData/specialRituals';
import { dailyRituals } from '@/data/FestivalsPageData/dailyRituals';
import { festivalHighlights } from '@/data/FestivalsPageData/festivalHighlights';
import FestivalsPageClient from './_components/FestivalsPageClient';

export default function FestivalsPage() {
    return (
        <FestivalsPageClient
            majorFestivals={majorFestivals}
            monthlyEvents={monthlyEvents}
            specialRituals={specialRituals}
            dailyRituals={dailyRituals}
            festivalHighlights={festivalHighlights}
        />
    );
}