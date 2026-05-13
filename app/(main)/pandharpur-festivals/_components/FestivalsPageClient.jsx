"use client";

import { useFestivals } from '@/lib/Festivals/useFestivals';
import FestivalTabs from './FestivalTabs';
import HighlightsCarousel from './HighlightsCarousel';
import PlanVisitSection from './PlanVisitSection'; // New attractive section
import FestivalDetailsDialog from './FestivalDetailsDialog';
import ShareDialog from './ShareDialog';

export default function FestivalsPageClient({
    majorFestivals,
    monthlyEvents,
    specialRituals,
    dailyRituals,
    festivalHighlights,
}) {
    const {
        likedFestivals,
        sharedFestival,
        isShareDialogOpen,
        selectedFestival,
        isDetailsDialogOpen,
        calendarDownloading,
        scheduleDownloading,
        toggleLike,
        handleShare,
        copyShareLink,
        setIsShareDialogOpen,
        openFestivalDetails,
        setIsDetailsDialogOpen,
        downloadCalendar,
        downloadSchedule,
        contactGuides,
    } = useFestivals(majorFestivals, monthlyEvents);

    return (
        <div className='mt-10'>
            <FestivalTabs
                majorFestivals={majorFestivals}
                monthlyEvents={monthlyEvents}
                specialRituals={specialRituals}
                dailyRituals={dailyRituals}
                likedFestivals={likedFestivals}
                toggleLike={toggleLike}
                handleShare={handleShare}
                openFestivalDetails={openFestivalDetails}
                calendarDownloading={calendarDownloading}
                downloadCalendar={downloadCalendar}
                scheduleDownloading={scheduleDownloading}
                downloadSchedule={downloadSchedule}
                contactGuides={contactGuides}
            />

            <HighlightsCarousel
                highlights={festivalHighlights}
                handleShare={handleShare}
            />

            <PlanVisitSection />

            <FestivalDetailsDialog
                isOpen={isDetailsDialogOpen}
                onOpenChange={setIsDetailsDialogOpen}
                festival={selectedFestival}
            />

            <ShareDialog
                isOpen={isShareDialogOpen}
                onOpenChange={setIsShareDialogOpen}
                festival={sharedFestival}
                copyShareLink={copyShareLink}
            />
        </div>
    );
}