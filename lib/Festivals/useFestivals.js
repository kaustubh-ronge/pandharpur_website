"use client";

import { useState } from "react";
import { toast } from "sonner";
import { saveAs } from "file-saver";

export const useFestivals = (majorFestivalsData, monthlyEventsData) => {
  const [likedFestivals, setLikedFestivals] = useState({});
  const [sharedFestival, setSharedFestival] = useState(null);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [selectedFestival, setSelectedFestival] = useState(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [calendarDownloading, setCalendarDownloading] = useState(false);
  const [scheduleDownloading, setScheduleDownloading] = useState(false);

  const toggleLike = (festivalId) => {
    setLikedFestivals((prev) => ({ ...prev, [festivalId]: !prev[festivalId] }));
    if (!likedFestivals[festivalId]) toast.success("Added to your favorites");
  };

  const handleShare = (festival) => {
    const festivalName = festival.name || festival.title;
    setSharedFestival(festival);
    if (navigator.share) {
      navigator
        .share({
          title: festivalName,
          text: `Check out this festival in Pandharpur: ${festivalName}`,
          url: window.location.href,
        })
        .catch(() => setIsShareDialogOpen(true));
    } else {
      setIsShareDialogOpen(true);
    }
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
    setIsShareDialogOpen(false);
  };

  const openFestivalDetails = (festival) => {
    setSelectedFestival(festival);
    setIsDetailsDialogOpen(true);
  };

  const generateCalendarContent = () => {
    let content =
      "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Pandharpur Festivals//EN\n";
    majorFestivalsData.forEach((festival) => {
      content += `BEGIN:VEVENT\nSUMMARY:${festival.name}\nDESCRIPTION:${festival.description}\nDTSTART:20250706T000000\nDTEND:20250708T235959\nLOCATION:${festival.location || "Vitthal Temple, Pandharpur"}\nEND:VEVENT\n`;
    });
    content += "END:VCALENDAR";
    return content;
  };

  const downloadCalendar = () => {
    setCalendarDownloading(true);
    setTimeout(() => {
      const blob = new Blob([generateCalendarContent()], {
        type: "text/calendar;charset=utf-8",
      });
      saveAs(blob, "pandharpur-festivals-calendar.ics");
      toast.success("Calendar downloaded successfully");
      setCalendarDownloading(false);
    }, 1000);
  };

  const generateScheduleContent = () => {
    let content = "Pandharpur Festivals Schedule\n\n";
    content += "Major Festivals:\n";
    content += majorFestivalsData
      .map((fest) => `- ${fest.name}: ${fest.date}`)
      .join("\n");
    content += "\n\nMonthly Events:\n";
    content += monthlyEventsData
      .map((event) => `- ${event.name}: ${event.time}`)
      .join("\n");
    return content;
  };

  const downloadSchedule = () => {
    setScheduleDownloading(true);
    setTimeout(() => {
      const blob = new Blob([generateScheduleContent()], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, "pandharpur-festivals-schedule.txt");
      toast.success("Schedule downloaded successfully");
      setScheduleDownloading(false);
    }, 1000);
  };

  const contactGuides = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(() => resolve({}), 1500)),
      {
        loading: "Connecting you with our guides...",
        success: "Our guide team will contact you shortly!",
        error: "Failed to connect. Please try again.",
      }
    );
  };

  return {
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
  };
};
