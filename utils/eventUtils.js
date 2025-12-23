import { pandharpurEvents } from '@/data/HeroData/eventsData';

export const getEventStatus = (startDate, endDate) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const nextYear = currentYear + 1;
  const eventStart = new Date(`${currentYear}-${startDate}`);
  const eventEnd = new Date(`${currentYear}-${endDate}`);
  const eventStartPrevYear = new Date(`${currentYear-1}-${startDate}`);
  const eventEndPrevYear = new Date(`${currentYear-1}-${endDate}`);
  if (today >= eventStart && today <= eventEnd) {
    return "current";
  }
  if (eventStart.getMonth() < eventEnd.getMonth() && today >= eventStartPrevYear && today <= eventEndPrevYear) {
    return "current";
  }
  let nextOccurrence = eventStart;
  if (today > eventEnd) {
    nextOccurrence = new Date(`${nextYear}-${startDate}`);
  }
  const daysUntilNext = Math.ceil((nextOccurrence - today) / (1000 * 60 * 60 * 24));
  const nextEventThreshold = 30;
  if (daysUntilNext <= nextEventThreshold && daysUntilNext > 0) {
    return "upcoming";
  }
  return "future";
};

export const getSortedEvents = () => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  return [...pandharpurEvents].sort((a, b) => {
    const aMonth = parseInt(a.startDate.split('-')[0]);
    const bMonth = parseInt(b.startDate.split('-')[0]);
    const aAdjustedMonth = aMonth < currentMonth ? aMonth + 12 : aMonth;
    const bAdjustedMonth = bMonth < currentMonth ? bMonth + 12 : bMonth;
    if (aAdjustedMonth !== bAdjustedMonth) {
      return aAdjustedMonth - bAdjustedMonth;
    }
    const aDay = parseInt(a.startDate.split('-')[1]);
    const bDay = parseInt(b.startDate.split('-')[1]);
    return aDay - bDay;
  });
};