// File: app/(main)/guide/_components/DisplayColumn.jsx

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Map, History } from "lucide-react";
import PastItinerariesViewer from "../PastItinerariesViewerComponents/PastItinerariesViewer";
import GoogleMapComponent from "../GoogleMapComponent";

/**
 * DisplayColumn (Client Component)
 *
 * This component contains the tabs for viewing the live map and past
 * itineraries, encapsulating all the display logic.
 */
export default function DisplayColumn({ activeTab, setActiveTab, mapLocations, refreshTrigger, onPlanDeleted, onViewDetails, onViewOnMap, PANDHARPUR_ATTRACTIONS, getManualTrips, deleteManualTrip, getAiTrips, deleteAiTrip, getAiRoutes, deleteAiRoute, getAiSchedules, deleteAiSchedule, useFetch, format, GOOGLE_MAPS_API_KEY }) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-1 rounded-full border">
        <TabsTrigger value="map" className="rounded-full"><Map className="w-4 h-4 mr-2" />Live Map</TabsTrigger>
        <TabsTrigger value="past_itineraries" className="rounded-full"><History className="w-4 h-4 mr-2" />Past Itineraries</TabsTrigger>
      </TabsList>
      <TabsContent value="map" className="pt-4"><Card className="h-[75vh] w-full shadow-lg border-2 border-white/50 dark:border-slate-800/50">
        <GoogleMapComponent locations={mapLocations} GOOGLE_MAPS_API_KEY={GOOGLE_MAPS_API_KEY} /></Card></TabsContent>
      <TabsContent value="past_itineraries" className="pt-4">
        <PastItinerariesViewer
          refreshTrigger={refreshTrigger}
          onPlanDeleted={onPlanDeleted}
          onViewDetails={onViewDetails}
          onViewOnMap={onViewOnMap}
          PANDHARPUR_ATTRACTIONS={PANDHARPUR_ATTRACTIONS}
          getManualTrips={getManualTrips}
          deleteManualTrip={deleteManualTrip}
          getAiTrips={getAiTrips}
          deleteAiTrip={deleteAiTrip}
          getAiRoutes={getAiRoutes}
          deleteAiRoute={deleteAiRoute}
          getAiSchedules={getAiSchedules}
          deleteAiSchedule={deleteAiSchedule}
          useFetch={useFetch}
          format={format}
        />
      </TabsContent>
    </Tabs>
  );
}