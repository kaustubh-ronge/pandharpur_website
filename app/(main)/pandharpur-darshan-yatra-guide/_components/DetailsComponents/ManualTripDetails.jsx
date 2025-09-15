// File: app/(main)/pandharpur-darshan-yatra-guide/_components/details/ManualTripDetails.jsx

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

/**
 * ManualTripDetails (Client Component)
 *
 * This component displays the detailed information for a manually
 * created trip, including dates, locations, and preferences.
 */
function ManualTripDetails({ data }) {
  const locations = typeof data.locations === 'string' ? JSON.parse(data.locations) : data.locations;

  return (
    <div className="p-2">
      <h3 className="font-bold text-lg mb-2 text-primary">{data.title}</h3>
      <div className="text-sm text-muted-foreground flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2"><CalendarIcon className="w-4 h-4" /><span>{format(new Date(data.startDate), "PPP")} to {format(new Date(data.endDate), "PPP")}</span></div>
      </div>
      <Separator className="my-4" />
      <h4 className="text-md font-semibold mb-2">Selected Locations</h4>
      <div className="flex flex-wrap gap-2">
        {locations.map((loc, i) => <span key={i} className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded-full">{loc}</span>)}
      </div>
      {data.preferences && <><Separator className="my-4" /><h4 className="text-md font-semibold mb-2">Notes & Preferences</h4><p className="text-sm text-muted-foreground">{data.preferences}</p></>}
    </div>
  );
}

export default ManualTripDetails;