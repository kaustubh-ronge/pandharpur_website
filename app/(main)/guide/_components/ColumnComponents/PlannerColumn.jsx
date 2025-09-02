// File: app/(main)/guide/_components/PlannerColumn.jsx

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Sparkles, Route, Clock4 } from "lucide-react";
import ManualTripPlanner from "../PlannerComponents/ManualTripPlanner";
import AiTripPlanner from "../PlannerComponents/AiTripPlanner";
import AiRoutePlanner from "../PlannerComponents/AiRoutePlanner";
import AiSchedulePlanner from "../PlannerComponents/AiSchedulePlanner";

/**
 * PlannerColumn (Client Component)
 *
 * This component encapsulates the tabbed interface for the different
 * trip planning forms (manual and AI-powered).
 */
export default function PlannerColumn({ setMapLocations, onPlanCreated, ppur_attractions, useFetch, zodResolver, useForm, z, format, cn, toast, createManualTrip, generateAiTrip, generateAiRoute, generateAiSchedule }) {
  return (
    <Tabs defaultValue="ai_trip" className="w-full">
      <TabsList className="grid w-full grid-cols-4 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm over p-1 rounded-full border">
        <TabsTrigger value="manual_trip" className="flex-1 text-xs md:text-sm rounded-full">
          <User className="w-4 h-4 mr-1 md:mr-2" />
          <span className="hidden md:inline">Manual</span>
        </TabsTrigger>
        <TabsTrigger value="ai_trip" className="flex-1 text-xs md:text-sm rounded-full">
          <Sparkles className="w-4 h-4 mr-1 md:mr-2" />
          <span className="hidden md:inline">
            AI Trip
          </span>
        </TabsTrigger>
        <TabsTrigger value="ai_route" className="flex-1 text-xs md:text-sm rounded-full">
          <Route className="w-4 h-4 mr-1 md:mr-2" />
          <span className="hidden md:inline">
            AI Route
          </span>
        </TabsTrigger>
        <TabsTrigger value="ai_schedule" className="flex-1 text-xs md:text-sm rounded-full"><Clock4 className="w-4 h-4 mr-1 md:mr-2" /><span className="hidden md:inline">AI Schedule</span></TabsTrigger>
      </TabsList>
      <TabsContent value="manual_trip" className="pt-4"><ManualTripPlanner setMapLocations={setMapLocations} onPlanCreated={onPlanCreated} ppur_attractions={ppur_attractions} useFetch={useFetch} zodResolver={zodResolver} useForm={useForm} z={z} format={format} cn={cn} toast={toast} createManualTrip={createManualTrip} /></TabsContent>
      <TabsContent value="ai_trip" className="pt-4"><AiTripPlanner setMapLocations={setMapLocations} onPlanCreated={onPlanCreated} useFetch={useFetch} zodResolver={zodResolver} useForm={useForm} z={z} toast={toast} generateAiTrip={generateAiTrip} /></TabsContent>
      <TabsContent value="ai_route" className="pt-4"><AiRoutePlanner setMapLocations={setMapLocations} onPlanCreated={onPlanCreated} useFetch={useFetch} zodResolver={zodResolver} useForm={useForm} z={z} toast={toast} generateAiRoute={generateAiRoute} /></TabsContent>
      <TabsContent value="ai_schedule" className="pt-4"><AiSchedulePlanner setMapLocations={setMapLocations} onPlanCreated={onPlanCreated} useFetch={useFetch} zodResolver={zodResolver} useForm={useForm} z={z} format={format} cn={cn} toast={toast} generateAiSchedule={generateAiSchedule} /></TabsContent>
    </Tabs>
  );
}