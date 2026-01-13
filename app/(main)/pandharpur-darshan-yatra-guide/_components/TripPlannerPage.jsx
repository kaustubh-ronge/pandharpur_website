"use client";

import React, { useState, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import useFetch from '@/hooks/useFetch';
import { getManualTrips, deleteManualTrip, createManualTrip } from '@/actions/manual-trips';
import { generateAiTrip, getAiTrips, deleteAiTrip } from '@/actions/ai-trips';
import { generateAiRoute, getAiRoutes, deleteAiRoute } from '@/actions/ai-routes';
import { generateAiSchedule, getAiSchedules, deleteAiSchedule } from '@/actions/ai-schedules';
import { toast } from "sonner";
import {Loader2} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import PlannerColumn from './ColumnComponents/PlannerColumn';
import DisplayColumn from './ColumnComponents/DisplayColumn';
import DetailedItinerariesSection from './DetailsComponents/DetailedItinerariesSection';
import { BlueBackground } from '@/components/BlueSharedBackGround';

/**
 * TripPlannerPage (Client Component)
 *
 * This component acts as the main container for all client-side logic.
 * It manages the global state (map locations, refresh triggers, etc.)
 * and orchestrates the rendering of the planner and display columns.
 */
export default function TripPlannerPage({ GOOGLE_MAPS_API_KEY, ppur_attractions }) {
  const { user, isLoaded } = useUser();
  const [mapLocations, setMapLocations] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [detailedViewData, setDetailedViewData] = useState(null);
  const [activeDisplayTab, setActiveDisplayTab] = useState('map');
  const detailViewRef = useRef(null);

  const handlePlanChange = () => setRefreshTrigger(prev => prev + 1);

  const showSingleDetail = (data, type) => {
    setDetailedViewData({ data, type });
    setTimeout(() => detailViewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const showAllDetails = () => setDetailedViewData(null);

  const handleViewOnMap = (locations) => {
    setMapLocations(locations);
    setActiveDisplayTab('map');
  };

  if (!isLoaded) return <div className="flex items-center justify-center h-screen bg-orange-50/50 dark:bg-slate-900"><Loader2 className="w-8 h-8 animate-spin text-orange-500" /></div>;
  if (!user) return <div className="p-8 text-center text-muted-foreground">Please sign in to access the Trip Planner.</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3">
          <PlannerColumn
            setMapLocations={setMapLocations}
            onPlanCreated={(data, type) => {
              handlePlanChange();
              showSingleDetail(data, type);
            }}
            ppur_attractions={ppur_attractions}
            useFetch={useFetch}
            zodResolver={zodResolver}
            useForm={useForm}
            z={z}
            format={format}
            cn={cn}
            toast={toast}
            createManualTrip={createManualTrip}
            generateAiTrip={generateAiTrip}
            generateAiRoute={generateAiRoute}
            generateAiSchedule={generateAiSchedule}
          />
        </div>
        <div className="lg:col-span-2">
          <BlueBackground />
          <DisplayColumn
            activeTab={activeDisplayTab}
            setActiveTab={setActiveDisplayTab}
            mapLocations={mapLocations}
            refreshTrigger={refreshTrigger}
            onPlanDeleted={handlePlanChange}
            onViewDetails={showSingleDetail}
            onViewOnMap={handleViewOnMap}
            ppur_attractions={ppur_attractions}
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
            GOOGLE_MAPS_API_KEY={GOOGLE_MAPS_API_KEY}
          />
        </div>
      </div>

      <div ref={detailViewRef} className="max-w-7xl mx-auto mt-12">
        <DetailedItinerariesSection
          detailedViewData={detailedViewData}
          onShowAll={showAllDetails}
          refreshTrigger={refreshTrigger}
          getManualTrips={getManualTrips}
          getAiTrips={getAiTrips}
          getAiRoutes={getAiRoutes}
          getAiSchedules={getAiSchedules}
          useFetch={useFetch}
          cn={cn}
          format={format}
          ppur_attractions={ppur_attractions}
        />
      </div>
    </div>
  );
}