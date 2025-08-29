"use client";
import React from "react";
import { getSortedEvents, getEventStatus } from '@/utils/eventUtils';
import HeroBannerSection from './HeroBannerSection';
import PilgrimageInfoSection from './PilgrimageInfoSection';
import EventsTimelineSection from './EventsTimelineSection';
import CtaSection from './CtaSection';
import FaqSection from './FaqSection';

const Hero = () => {
    const processedEvents = getSortedEvents().map(event => {
        const status = getEventStatus(event.startDate, event.endDate);
        return {
            ...event,
            status,
            displayDate: `${new Date(`${new Date().getFullYear()}-${event.startDate}`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(`${new Date().getFullYear()}-${event.endDate}`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
        };
    });

    const currentEvent = processedEvents.find(event => event.status === "current");
    const upcomingEvent = processedEvents.find(event => event.status === "upcoming");

    return (
        <>
            <HeroBannerSection />
            <PilgrimageInfoSection />
            <EventsTimelineSection
                processedEvents={processedEvents}
                currentEvent={currentEvent}
                upcomingEvent={upcomingEvent}
            />
            <CtaSection />
            <FaqSection />
        </>
    );
};

export default Hero;