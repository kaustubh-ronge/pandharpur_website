// File: app/(main)/guide/_components/PastItinerariesViewer.jsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ppur_attractions } from "@/data/guidePageData/pandharpurAttractions";
import PastList from "../ListComponents/PastList";


/**
 * PastItinerariesViewer (Client Component)
 *
 * This component manages the tabbed view for all past itineraries.
 * It fetches the data from the server actions and passes it to the
 * reusable PastList component for rendering.
 */
function PastItinerariesViewer({
    refreshTrigger,
    onPlanDeleted,
    onViewDetails,
    onViewOnMap,
    getManualTrips, deleteManualTrip,
    getAiTrips, deleteAiTrip,
    getAiRoutes, deleteAiRoute,
    getAiSchedules, deleteAiSchedule,
    useFetch,
    format,
}) {
    return (
        <Card className="h-[75vh] overflow-y-scroll shadow-lg border-2 border-white/50 dark:border-slate-800/50">
            <CardHeader>
                <CardTitle>Past Itineraries</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="manual_trip" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 h-12 text-xs px-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <TabsTrigger value="manual_trip">Manual</TabsTrigger>
                        <TabsTrigger value="ai_trip">AI Trips</TabsTrigger>
                        <TabsTrigger value="ai_route">AI Routes</TabsTrigger>
                        <TabsTrigger value="ai_schedule">AI Schedules</TabsTrigger>
                    </TabsList>
                    <ScrollArea className="h-[60vh] mt-4">
                        <TabsContent value="manual_trip">
                            <PastList
                                fetcher={getManualTrips}
                                deleter={deleteManualTrip}
                                type="manual_trip"
                                refreshTrigger={refreshTrigger}
                                onDeleted={onPlanDeleted}
                                onViewDetails={onViewDetails}
                                onViewOnMap={onViewOnMap}
                                ppur_attractions={ppur_attractions}
                                useFetch={useFetch}
                                format={format}
                            />
                        </TabsContent>
                        <TabsContent value="ai_trip">
                            <PastList
                                fetcher={getAiTrips}
                                deleter={deleteAiTrip}
                                type="ai_trip"
                                refreshTrigger={refreshTrigger}
                                onDeleted={onPlanDeleted}
                                onViewDetails={onViewDetails}
                                onViewOnMap={onViewOnMap}
                                ppur_attractions={ppur_attractions}
                                useFetch={useFetch}
                                format={format}
                            />
                        </TabsContent>
                        <TabsContent value="ai_route">
                            <PastList
                                fetcher={getAiRoutes}
                                deleter={deleteAiRoute}
                                type="ai_route"
                                refreshTrigger={refreshTrigger}
                                onDeleted={onPlanDeleted}
                                onViewDetails={onViewDetails}
                                onViewOnMap={onViewOnMap}
                                ppur_attractions={ppur_attractions}
                                useFetch={useFetch}
                                format={format}
                            />
                        </TabsContent>
                        <TabsContent value="ai_schedule">
                            <PastList
                                fetcher={getAiSchedules}
                                deleter={deleteAiSchedule}
                                type="ai_schedule"
                                refreshTrigger={refreshTrigger}
                                onDeleted={onPlanDeleted}
                                onViewDetails={onViewDetails}
                                onViewOnMap={onViewOnMap}
                                ppur_attractions={ppur_attractions}
                                useFetch={useFetch}
                                format={format}
                            />
                        </TabsContent>
                    </ScrollArea>
                </Tabs>
            </CardContent>
        </Card>
    );
}

export default PastItinerariesViewer;