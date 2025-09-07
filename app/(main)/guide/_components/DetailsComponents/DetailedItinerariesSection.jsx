// File: app/(main)/guide/_components/DetailedItinerariesSection.jsx

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
// UPDATED: Import the necessary icons
import { ArrowLeft, FilePenLine, Sparkles, Route, Calendar } from "lucide-react";
import ManualTripDetails from './ManualTripDetails';
import AllDetailsList from '../ListComponents/AllDetailsList';
import AiTripDetails from './AiTripDetails';
import AiRouteDetails from './AiRouteDetails';
import AiScheduleDetails from './AiScheduleDetails';

/**
 * DetailedItinerariesSection (Client Component)
 *
 * This component handles the detailed view of a single plan or the
 * list of all plans within a tabbed interface.
 */
function DetailedItinerariesSection({ detailedViewData, onShowAll, refreshTrigger, getManualTrips, getAiTrips, getAiRoutes, getAiSchedules, useFetch, cn, format, ppur_attractions }) {
  const [activeTab, setActiveTab] = useState('manual_trip');

  useEffect(() => {
    if (detailedViewData) {
      setActiveTab(detailedViewData.type);
    }
  }, [detailedViewData]);

  return (
    <Card className="w-full shadow-xl border-2 border-white/50 dark:border-slate-800/50">
      <CardHeader className="flex flex-row items-center justify-between bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-t-lg">
        <div>
          <CardTitle>{detailedViewData ? "Plan Details" : "All Saved Itineraries"}</CardTitle>
          <CardDescription>{detailedViewData ? "Showing details for the selected plan." : "A complete view of all your saved plans."}</CardDescription>
        </div>
        {detailedViewData && <Button variant="outline" size="sm" onClick={onShowAll}><ArrowLeft className="w-4 h-4 mr-2" />Back to All</Button>}
      </CardHeader>
      <CardContent className="pt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* UPDATED: TabsList with responsive icons and text */}
          <TabsList className="grid w-full grid-cols-4 h-12 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <TabsTrigger value="manual_trip">
              <FilePenLine className="h-5 w-5 md:hidden" />
              <span className="hidden md:inline">Manual</span>
            </TabsTrigger>
            <TabsTrigger value="ai_trip">
              <Sparkles className="h-5 w-5 md:hidden" />
              <span className="hidden md:inline">AI Trips</span>
            </TabsTrigger>
            <TabsTrigger value="ai_route">
              <Route className="h-5 w-5 md:hidden" />
              <span className="hidden md:inline">AI Routes</span>
            </TabsTrigger>
            <TabsTrigger value="ai_schedule">
              <Calendar className="h-5 w-5 md:hidden" />
              <span className="hidden md:inline">AI Schedules</span>
            </TabsTrigger>
          </TabsList>
          <div className="mt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + (detailedViewData ? detailedViewData.data.id : 'all')}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent value="manual_trip" forceMount={activeTab === 'manual_trip'}>
                  {detailedViewData && detailedViewData.type === 'manual_trip' ? <ManualTripDetails data={detailedViewData.data} /> : <AllDetailsList fetcher={getManualTrips} type="manual_trip" DetailsComponent={ManualTripDetails} refreshTrigger={refreshTrigger} useFetch={useFetch} cn={cn} format={format} ppur_attractions={ppur_attractions} />}
                </TabsContent>
                <TabsContent value="ai_trip" forceMount={activeTab === 'ai_trip'}>
                  {detailedViewData && detailedViewData.type === 'ai_trip' ? <AiTripDetails data={detailedViewData.data} /> : <AllDetailsList fetcher={getAiTrips} type="ai_trip" DetailsComponent={AiTripDetails} refreshTrigger={refreshTrigger} useFetch={useFetch} cn={cn} format={format} ppur_attractions={ppur_attractions} />}
                </TabsContent>
                <TabsContent value="ai_route" forceMount={activeTab === 'ai_route'}>
                  {detailedViewData && detailedViewData.type === 'ai_route' ? <AiRouteDetails data={detailedViewData.data} /> : <AllDetailsList fetcher={getAiRoutes} type="ai_route" DetailsComponent={AiRouteDetails} refreshTrigger={refreshTrigger} useFetch={useFetch} cn={cn} format={format} ppur_attractions={ppur_attractions} />}
                </TabsContent>
                <TabsContent value="ai_schedule" forceMount={activeTab === 'ai_schedule'}>
                  {detailedViewData && detailedViewData.type === 'ai_schedule' ? <AiScheduleDetails data={detailedViewData.data} /> : <AllDetailsList fetcher={getAiSchedules} type="ai_schedule" DetailsComponent={AiScheduleDetails} refreshTrigger={refreshTrigger} useFetch={useFetch} cn={cn} format={format} ppur_attractions={ppur_attractions} />}
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default DetailedItinerariesSection;