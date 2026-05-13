import { majorFestivals } from '@/data/FestivalsPageData/majorFestivals';
import { monthlyEvents } from '@/data/FestivalsPageData/monthlyEvents';
import { specialRituals } from '@/data/FestivalsPageData/specialRituals';
import { dailyRituals } from '@/data/FestivalsPageData/dailyRituals';
import { festivalHighlights } from '@/data/FestivalsPageData/festivalHighlights';
import FestivalsPageClient from './_components/FestivalsPageClient';

export const metadata = {
  title: 'Pandharpur Festivals & Yatra Guide | Important Events',
  description: 'Explore the vibrant festivals of Pandharpur, including Ashadhi Ekadashi, Kartiki Ekadashi, daily rituals, and major celebrations of Lord Vitthal.',
  openGraph: {
    title: 'Pandharpur Festivals & Yatra Guide | Important Events',
    description: 'Explore the vibrant festivals of Pandharpur, including Ashadhi Ekadashi, Kartiki Ekadashi, and major celebrations.',
    url: '/pandharpur-festivals',
  },
  alternates: {
    canonical: '/pandharpur-festivals',
  },
};

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