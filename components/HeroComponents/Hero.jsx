"use client";
import { getEventStatus, getSortedEvents } from "@/utils/eventUtils";
import React from "react";
import HeroBannerSection from "./HeroBannerSection";
import EventsTimelineSection from "./EventsTimelineSection";
import CtaSection from "./CtaSection";
import FaqSection from "./FaqSection";
import PilgrimageInfoSection from "./PilGrimageInfoSection";


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
        <div className="mt-20">
            <HeroBannerSection />
            <PilgrimageInfoSection />
            <EventsTimelineSection
                processedEvents={processedEvents}
                currentEvent={currentEvent}
                upcomingEvent={upcomingEvent}
            />
            <CtaSection />
            <FaqSection />
        </div>
    );
};

export default Hero;