
"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader } from "@googlemaps/js-api-loader";

// --- IMPORTANT: Ensure this key is set in your .env.local file ---
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// --- Server Action & Custom Hook Imports ---
import useFetch from '@/hooks/useFetch';
import { createManualTrip, getManualTrips, deleteManualTrip } from '@/actions/manual-trips';
import { generateAiTrip, getAiTrips, deleteAiTrip } from '@/actions/ai-trips';
import { generateAiRoute, getAiRoutes, deleteAiRoute } from '@/actions/ai-routes';
import { generateAiSchedule, getAiSchedules, deleteAiSchedule } from '@/actions/ai-schedules';

// --- ShadCN UI & Component Imports ---
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';

// --- Icon Imports ---
import { CalendarIcon, User, Sparkles, Route, Clock4, Loader2, PlusCircle, Map, History, Trash2, Car, Train, Plane, Wind, Utensils, Wallet, Eye, MapPin, List, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// --- Static Data ---
const PANDHARPUR_ATTRACTIONS = [
    { id: "vitthal_rukmini_temple", label: "Vitthal Rukmini Temple", position: { lat: 17.6744, lng: 75.3235 } },
    { id: "pundalik_temple", label: "Pundalik Temple", position: { lat: 17.6729, lng: 75.3242 } },
    { id: "chandrabhaga_ghat", label: "Chandrabhaga River Ghat", position: { lat: 17.6718, lng: 75.3248 } },
    { id: "iskcon_pandharpur", label: "ISKCON Pandharpur", position: { lat: 17.6653, lng: 75.3340 } },
    { id: "vishnupad_temple", label: "Vishnupad Temple", position: { lat: 17.6681, lng: 75.3262 } },
];

// --- Zod Schemas ---
const manualTripSchema = z.object({
    title: z.string().min(5),
    dateRange: z.object({ from: z.date({ required_error: "A start date is required." }), to: z.date({ required_error: "An end date is required." }) }),
    locations: z.array(z.string()).min(1, "Please select at least one location."),
    preferences: z.string().optional(),
});
const aiTripSchema = z.object({
    prompt: z.string().min(15),
    duration: z.coerce.number().min(1).max(7),
    people: z.coerce.number().min(1),
    budget: z.enum(["Budget", "Mid-Range", "Luxury"]),
});
const aiRouteSchema = z.object({ startLocation: z.string().min(3) });
const aiScheduleSchema = z.object({ prompt: z.string().min(20), date: z.date({ required_error: "A date for the schedule is required." }) });

// --- Main Page Component ---
export default function TripPlannerPage() {
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
        <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-slate-50 to-orange-50/50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 p-4 sm:p-6 lg:p-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-orange-600 via-red-500 to-orange-400 text-transparent bg-clip-text">Advanced Trip Planner</h1>
                <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">Your complete toolkit for planning the perfect pilgrimage to Pandharpur.</p>
            </motion.div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                <div className="lg:col-span-3">
                    <PlannerColumn
                        setMapLocations={setMapLocations}
                        onPlanCreated={(data, type) => {
                            handlePlanChange();
                            showSingleDetail(data, type);
                        }}
                    />
                </div>
                <div className="lg:col-span-2">
                    <DisplayColumn
                        activeTab={activeDisplayTab}
                        setActiveTab={setActiveDisplayTab}
                        mapLocations={mapLocations}
                        refreshTrigger={refreshTrigger}
                        onPlanDeleted={handlePlanChange}
                        onViewDetails={showSingleDetail}
                        onViewOnMap={handleViewOnMap}
                    />
                </div>
            </div>

            <div ref={detailViewRef} className="max-w-7xl mx-auto mt-12">
                <DetailedItinerariesSection
                    detailedViewData={detailedViewData}
                    onShowAll={showAllDetails}
                    refreshTrigger={refreshTrigger}
                />
            </div>
        </div>
    );
}

// --- Left Column: Planner ---
function PlannerColumn({ setMapLocations, onPlanCreated }) {
    return (
        <Tabs defaultValue="ai_trip" className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-1 rounded-full border">
                <TabsTrigger value="manual_trip" className="flex-1 text-xs md:text-sm rounded-full"><User className="w-4 h-4 mr-1 md:mr-2" /><span className="hidden md:inline">Manual</span></TabsTrigger>
                <TabsTrigger value="ai_trip" className="flex-1 text-xs md:text-sm rounded-full"><Sparkles className="w-4 h-4 mr-1 md:mr-2" /><span className="hidden md:inline">AI Trip</span></TabsTrigger>
                <TabsTrigger value="ai_route" className="flex-1 text-xs md:text-sm rounded-full"><Route className="w-4 h-4 mr-1 md:mr-2" /><span className="hidden md:inline">AI Route</span></TabsTrigger>
                <TabsTrigger value="ai_schedule" className="flex-1 text-xs md:text-sm rounded-full"><Clock4 className="w-4 h-4 mr-1 md:mr-2" /><span className="hidden md:inline">AI Schedule</span></TabsTrigger>
            </TabsList>
            <TabsContent value="manual_trip" className="pt-4"><ManualTripPlanner setMapLocations={setMapLocations} onPlanCreated={onPlanCreated} /></TabsContent>
            <TabsContent value="ai_trip" className="pt-4"><AiTripPlanner setMapLocations={setMapLocations} onPlanCreated={onPlanCreated} /></TabsContent>
            <TabsContent value="ai_route" className="pt-4"><AiRoutePlanner setMapLocations={setMapLocations} onPlanCreated={onPlanCreated} /></TabsContent>
            <TabsContent value="ai_schedule" className="pt-4"><AiSchedulePlanner setMapLocations={setMapLocations} onPlanCreated={onPlanCreated} /></TabsContent>
        </Tabs>
    );
}

// --- Right Column: Display ---
function DisplayColumn({ activeTab, setActiveTab, mapLocations, refreshTrigger, onPlanDeleted, onViewDetails, onViewOnMap }) {
    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-1 rounded-full border">
                <TabsTrigger value="map" className="rounded-full"><Map className="w-4 h-4 mr-2" />Live Map</TabsTrigger>
                <TabsTrigger value="past_itineraries" className="rounded-full"><History className="w-4 h-4 mr-2" />Past Itineraries</TabsTrigger>
            </TabsList>
            <TabsContent value="map" className="pt-4"><Card className="h-[75vh] w-full shadow-lg border-2 border-white/50 dark:border-slate-800/50"><GoogleMapComponent locations={mapLocations} /></Card></TabsContent>
            <TabsContent value="past_itineraries" className="pt-4">
                <PastItinerariesViewer
                    refreshTrigger={refreshTrigger}
                    onPlanDeleted={onPlanDeleted}
                    onViewDetails={onViewDetails}
                    onViewOnMap={onViewOnMap}
                />
            </TabsContent>
        </Tabs>
    );
}

// --- Planner Components ---

function ManualTripPlanner({ setMapLocations, onPlanCreated }) {
    const { fn: create, loading } = useFetch(createManualTrip);
    const form = useForm({ resolver: zodResolver(manualTripSchema), defaultValues: { title: "", locations: [] } });
    const watchedLocations = form.watch('locations');

    useEffect(() => {
        const locationsWithCoords = PANDHARPUR_ATTRACTIONS.filter(attr => watchedLocations.includes(attr.label)).map(attr => ({ title: attr.label, position: attr.position }));
        setMapLocations(locationsWithCoords);
    }, [watchedLocations, setMapLocations]);

    const onSubmit = async (values) => {
        const result = await create(values);
        if (result.success) {
            toast.success("Manual trip saved! Viewing details below.");
            onPlanCreated(result.trip, 'manual_trip');
            form.reset();
            setMapLocations([]);
        }
    };

    return (
        <Card className="shadow-lg border-2 border-white/50 dark:border-slate-800/50"><CardHeader><CardTitle>Manual Trip Builder</CardTitle></CardHeader><CardContent><Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="title" render={({ field }) => <FormItem><FormLabel>Trip Title</FormLabel><FormControl><Input placeholder="e.g., Annual Family Visit" {...field} /></FormControl><FormMessage /></FormItem>} />
            <FormField control={form.control} name="dateRange" render={({ field }) => <FormItem className="flex flex-col"><FormLabel>Trip Dates</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value?.from && "text-muted-foreground")}><CalendarIcon className="w-4 h-4 mr-2" />{field.value?.from ? (field.value.to ? <>{format(field.value.from, "LLL dd, y")} - {format(field.value.to, "LLL dd, y")}</> : format(field.value.from, "LLL dd, y")) : <span>Pick dates</span>}</Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0">
                {/* --- MODIFICATION START --- */}
                <Calendar
                    mode="range"
                    selected={field.value}
                    onSelect={field.onChange}
                    numberOfMonths={1}
                    disabled={(date) => date < new Date(new Date().toDateString())}
                />
                {/* --- MODIFICATION END --- */}
            </PopoverContent></Popover><FormMessage /></FormItem>} />
            <FormField control={form.control} name="locations" render={() => (<FormItem><FormLabel>Select Locations</FormLabel><ScrollArea className="h-40 w-full rounded-md border p-4">{PANDHARPUR_ATTRACTIONS.map((item) => (<FormField key={item.id} control={form.control} name="locations" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-2"><FormControl><Checkbox checked={field.value?.includes(item.label)} onCheckedChange={(checked) => { return checked ? field.onChange([...field.value, item.label]) : field.onChange(field.value?.filter((value) => value !== item.label)); }} /></FormControl><FormLabel className="font-normal">{item.label}</FormLabel></FormItem>)} />))}</ScrollArea><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="preferences" render={({ field }) => <FormItem><FormLabel>Preferences</FormLabel><FormControl><Textarea placeholder="Any special requests or notes..." {...field} /></FormControl><FormMessage /></FormItem>} />
            <Button type="submit" disabled={loading} className="w-full">{loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : <><PlusCircle className="mr-2 h-4 w-4" />Save Manual Trip</>}</Button>
        </form></Form></CardContent></Card>
    );
}

function AiTripPlanner({ setMapLocations, onPlanCreated }) {
    const { fn: generate, loading, error } = useFetch(generateAiTrip);
    const form = useForm({ resolver: zodResolver(aiTripSchema), defaultValues: { prompt: "", duration: 2, people: 2, budget: "Mid-Range" } });

    const onSubmit = async (values) => {
        const result = await generate(values);
        if (result?.success) {
            toast.success("AI Trip generated successfully! Viewing details below.");
            const locs = result.trip.response.itinerary.flatMap(d => d.activities.map(a => ({ position: a.coordinates, title: a.locationName })));
            setMapLocations(locs);
            onPlanCreated(result.trip, 'ai_trip');
            form.reset({ prompt: "", duration: 2, people: 2, budget: "Mid-Range" });
        }
    };

    return (
        <Card className="shadow-lg border-2 border-white/50 dark:border-slate-800/50"><CardHeader><CardTitle>AI Trip Planner</CardTitle><CardDescription>Generate a detailed day-by-day itinerary for your stay.</CardDescription></CardHeader><CardContent>
            <Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="prompt" render={({ field }) => <FormItem><FormLabel>What kind of trip are you looking for?</FormLabel><FormControl><Textarea placeholder="e.g., A spiritual trip for my elderly parents, focused on darshan and comfort." {...field} rows={3} /></FormControl><FormMessage /></FormItem>} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField control={form.control} name="duration" render={({ field }) => <FormItem><FormLabel>Days</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>} />
                    <FormField control={form.control} name="people" render={({ field }) => <FormItem><FormLabel>People</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>} />
                    <FormField control={form.control} name="budget" render={({ field }) => <FormItem><FormLabel>Budget</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="Budget">Budget</SelectItem><SelectItem value="Mid-Range">Mid-Range</SelectItem><SelectItem value="Luxury">Luxury</SelectItem></SelectContent></Select><FormMessage /></FormItem>} />
                </div>
                <Button type="submit" disabled={loading} className="w-full">{loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><Sparkles className="mr-2 h-4 w-4" />Generate AI Trip</>}</Button>
            </form></Form>
            {loading && <div className="text-center pt-4"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" /></div>}
            {error && <div className="mt-4 text-center text-sm text-destructive">{error.message}</div>}
        </CardContent></Card>
    );
}

function AiRoutePlanner({ setMapLocations, onPlanCreated }) {
    const { fn: generate, loading, error } = useFetch(generateAiRoute);
    const form = useForm({ resolver: zodResolver(aiRouteSchema), defaultValues: { startLocation: "" } });

    const onSubmit = async (values) => {
        const result = await generate(values);
        if (result?.success) {
            toast.success("AI Routes generated successfully! Viewing details below.");
            const locs = result.route.response.routes.flatMap(r => r.steps.map(s => ({ position: s.coordinates, title: s.instruction })));
            setMapLocations(locs);
            onPlanCreated(result.route, 'ai_route');
            form.reset();
        }
    };

    return (
        <Card className="shadow-lg border-2 border-white/50 dark:border-slate-800/50"><CardHeader><CardTitle>AI Route Generator</CardTitle><CardDescription>Find the best routes from your location to Pandharpur.</CardDescription></CardHeader><CardContent>
            <Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="startLocation" render={({ field }) => <FormItem><FormLabel>Your Starting Location</FormLabel><FormControl><Input placeholder="e.g., Pune, Maharashtra" {...field} /></FormControl><FormMessage /></FormItem>} />
                <Button type="submit" disabled={loading} className="w-full">{loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><Route className="mr-2 h-4 w-4" />Generate Routes</>}</Button>
            </form></Form>
            {loading && <div className="text-center pt-4"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" /></div>}
            {error && <div className="mt-4 text-center text-sm text-destructive">{error.message}</div>}
        </CardContent></Card>
    );
}

function AiSchedulePlanner({ setMapLocations, onPlanCreated }) {
    const { fn: generate, loading, error } = useFetch(generateAiSchedule);
    const form = useForm({ resolver: zodResolver(aiScheduleSchema) });

    const onSubmit = async (values) => {
        const result = await generate(values);
        if (result?.success) {
            toast.success("AI Schedule generated successfully! Viewing details below.");
            const locs = result.schedule.response.timeSlots.filter(ts => ts.coordinates?.lat).map(ts => ({ position: ts.coordinates, title: ts.location }));
            setMapLocations(locs);
            onPlanCreated(result.schedule, 'ai_schedule');
            form.reset();
        }
    };

    return (
        <Card className="shadow-lg border-2 border-white/50 dark:border-slate-800/50"><CardHeader><CardTitle>AI Daily Scheduler</CardTitle><CardDescription>Plan a single day's schedule with the help of AI.</CardDescription></CardHeader><CardContent>
            <Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="date" render={({ field }) => <FormItem className="flex flex-col"><FormLabel>Date for Schedule</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}</Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0">
                    {/* --- MODIFICATION START --- */}
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        disabled={(date) => date < new Date(new Date().toDateString())}
                    />
                    {/* --- MODIFICATION END --- */}
                </PopoverContent></Popover><FormMessage /></FormItem>} />
                <FormField control={form.control} name="prompt" render={({ field }) => <FormItem><FormLabel>What do you need to schedule?</FormLabel><FormControl><Textarea placeholder="e.g., I need to visit the main temple for morning darshan, then go shopping for religious items, and have lunch at a good vegetarian restaurant." {...field} rows={3} /></FormControl><FormMessage /></FormItem>} />
                <Button type="submit" disabled={loading} className="w-full">{loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><Clock4 className="mr-2 h-4 w-4" />Generate Schedule</>}</Button>
            </form></Form>
            {loading && <div className="text-center pt-4"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" /></div>}
            {error && <div className="mt-4 text-center text-sm text-destructive">{error.message}</div>}
        </CardContent></Card>
    );
}

// --- Past Itineraries Viewer ---
function PastItinerariesViewer({ refreshTrigger, onPlanDeleted, onViewDetails, onViewOnMap }) {
    return (
        <Card className="h-[75vh] overflow-y-scroll shadow-lg border-2 border-white/50 dark:border-slate-800/50">
            <CardHeader><CardTitle>Past Itineraries</CardTitle></CardHeader>
            <CardContent>
                <Tabs defaultValue="manual_trip" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 h-12 text-xs px-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <TabsTrigger value="manual_trip">Manual</TabsTrigger>
                        <TabsTrigger value="ai_trip">AI Trips</TabsTrigger>
                        <TabsTrigger value="ai_route">AI Routes</TabsTrigger>
                        <TabsTrigger value="ai_schedule">AI Schedules</TabsTrigger>
                    </TabsList>
                    <ScrollArea className="h-[60vh] mt-4">
                        <TabsContent value="manual_trip"><PastList fetcher={getManualTrips} deleter={deleteManualTrip} type="manual_trip" refreshTrigger={refreshTrigger} onDeleted={onPlanDeleted} onViewDetails={onViewDetails} onViewOnMap={onViewOnMap} /></TabsContent>
                        <TabsContent value="ai_trip"><PastList fetcher={getAiTrips} deleter={deleteAiTrip} type="ai_trip" refreshTrigger={refreshTrigger} onDeleted={onPlanDeleted} onViewDetails={onViewDetails} onViewOnMap={onViewOnMap} /></TabsContent>
                        <TabsContent value="ai_route"><PastList fetcher={getAiRoutes} deleter={deleteAiRoute} type="ai_route" refreshTrigger={refreshTrigger} onDeleted={onPlanDeleted} onViewDetails={onViewDetails} onViewOnMap={onViewOnMap} /></TabsContent>
                        <TabsContent value="ai_schedule"><PastList fetcher={getAiSchedules} deleter={deleteAiSchedule} type="ai_schedule" refreshTrigger={refreshTrigger} onDeleted={onPlanDeleted} onViewDetails={onViewDetails} onViewOnMap={onViewOnMap} /></TabsContent>
                    </ScrollArea>
                </Tabs>
            </CardContent>
        </Card>
    );
}

function PastList({ fetcher, deleter, type, refreshTrigger, onDeleted, onViewDetails, onViewOnMap }) {
    const { data, loading, error, fn: fetchItems } = useFetch(fetcher);
    useEffect(() => { fetchItems(); }, [fetchItems, refreshTrigger]);

    let items = [];
    if (data?.success) { items = data.trips || data.routes || data.schedules || []; }

    const handleDelete = async (id) => { toast.promise(deleter(id), { loading: 'Deleting...', success: () => { onDeleted(); return 'Plan deleted!'; }, error: (err) => err.message || 'Failed to delete.' }); };

    const handleViewOnMapClick = (item) => {
        let locations = [];
        const response = item.response;
        if (type === 'manual_trip') {
            locations = PANDHARPUR_ATTRACTIONS.filter(attr => item.locations.includes(attr.label)).map(attr => ({ title: attr.label, position: attr.position }));
        } else if (response?.itinerary) {
            locations = response.itinerary.flatMap(d => d.activities.map(a => ({ position: a.coordinates, title: a.locationName })));
        } else if (response?.routes) {
            locations = response.routes.flatMap(r => r.steps.map(s => ({ position: s.coordinates, title: s.instruction })));
        } else if (response?.timeSlots) {
            locations = response.timeSlots.filter(ts => ts.coordinates?.lat).map(ts => ({ position: ts.coordinates, title: ts.location }));
        }
        onViewOnMap(locations);
    };

    if (loading) return <Loader2 className="w-6 h-6 animate-spin mx-auto mt-8" />
    if (error) return <p className="text-center text-sm text-destructive pt-8">{error.message}</p>
    if (items.length === 0) return <p className="text-center text-sm text-muted-foreground pt-8">No plans found.</p>

    return (
        <div className="space-y-2 pr-2">
            {items.map(item => (
                <div key={item.id} className="p-3 border rounded-lg bg-background hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="flex justify-between items-start">
                        <div className="flex-1 mr-2">
                            <p className="font-semibold truncate">{item.title || item.startLocation || item.response?.scheduleTitle || item.response?.title || "Untitled"}</p>
                            <p className="text-xs text-muted-foreground">Created: {format(new Date(item.createdAt), "dd MMM yyyy")}</p>
                        </div>
                        <div className="flex items-center">
                            <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleViewOnMapClick(item)}><MapPin className="w-4 h-4" /></Button></TooltipTrigger><TooltipContent><p>View on Map</p></TooltipContent></Tooltip></TooltipProvider>
                            <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onViewDetails(item, type)}><Eye className="w-4 h-4" /></Button></TooltipTrigger><TooltipContent><p>View Details</p></TooltipContent></Tooltip></TooltipProvider>
                            <DeleteConfirmation onConfirm={() => handleDelete(item.id)} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// --- Detailed View Section ---
function DetailedItinerariesSection({ detailedViewData, onShowAll, refreshTrigger }) {
    const [activeTab, setActiveTab] = useState('manual_trip');

    useEffect(() => {
        if (detailedViewData) { setActiveTab(detailedViewData.type); }
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
                    <TabsList className="grid w-full grid-cols-4 h-12 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                        <TabsTrigger value="manual_trip">Manual</TabsTrigger>
                        <TabsTrigger value="ai_trip">AI Trips</TabsTrigger>
                        <TabsTrigger value="ai_route">AI Routes</TabsTrigger>
                        <TabsTrigger value="ai_schedule">AI Schedules</TabsTrigger>
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
                                    {detailedViewData && detailedViewData.type === 'manual_trip' ? <ManualTripDetails data={detailedViewData.data} /> : <AllDetailsList fetcher={getManualTrips} type="manual_trip" DetailsComponent={ManualTripDetails} refreshTrigger={refreshTrigger} />}
                                </TabsContent>
                                <TabsContent value="ai_trip" forceMount={activeTab === 'ai_trip'}>
                                    {detailedViewData && detailedViewData.type === 'ai_trip' ? <AiTripDetails data={detailedViewData.data} /> : <AllDetailsList fetcher={getAiTrips} type="ai_trip" DetailsComponent={AiTripDetails} refreshTrigger={refreshTrigger} />}
                                </TabsContent>
                                <TabsContent value="ai_route" forceMount={activeTab === 'ai_route'}>
                                    {detailedViewData && detailedViewData.type === 'ai_route' ? <AiRouteDetails data={detailedViewData.data} /> : <AllDetailsList fetcher={getAiRoutes} type="ai_route" DetailsComponent={AiRouteDetails} refreshTrigger={refreshTrigger} />}
                                </TabsContent>
                                <TabsContent value="ai_schedule" forceMount={activeTab === 'ai_schedule'}>
                                    {detailedViewData && detailedViewData.type === 'ai_schedule' ? <AiScheduleDetails data={detailedViewData.data} /> : <AllDetailsList fetcher={getAiSchedules} type="ai_schedule" DetailsComponent={AiScheduleDetails} refreshTrigger={refreshTrigger} />}
                                </TabsContent>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </Tabs>
            </CardContent>
        </Card>
    );
}

function AllDetailsList({ fetcher, DetailsComponent, refreshTrigger }) {
    const { data, loading, error, fn: fetchItems } = useFetch(fetcher);
    useEffect(() => { fetchItems(); }, [fetchItems, refreshTrigger]);

    let items = [];
    if (data?.success) { items = data.trips || data.routes || data.schedules || []; }

    if (loading) return <div className="text-center p-12"><Loader2 className="w-8 h-8 animate-spin mx-auto" /></div>
    if (error) return <p className="text-center text-sm text-destructive p-12">{error.message}</p>
    if (items.length === 0) return <p className="text-center text-sm text-muted-foreground p-12">No saved plans in this category yet.</p>

    return (
        <ScrollArea className="h-[60vh]">
            <div className="space-y-6 pr-4">
                {items.map(item => (
                    <Card key={item.id} className="bg-background shadow-sm">
                        <CardContent className="pt-6">
                            <DetailsComponent data={item} />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </ScrollArea>
    );
}

// --- Detail View Components ---
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

function AiTripDetails({ data }) {
    const response = typeof data.response === 'string' ? JSON.parse(data.response) : data.response;
    return (
        <div className="p-2">
            <h3 className="font-bold text-lg mb-2 text-primary">{data.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{data.summary}</p>
            <Separator />
            <ScrollArea className="h-96 pr-4 mt-4">
                {response.itinerary.map(day => (
                    <div key={day.day} className="mb-6">
                        <h4 className="font-semibold text-md sticky top-0 bg-background py-1">Day {day.day}: {day.title}</h4>
                        <div className="relative border-l-2 border-orange-200 dark:border-orange-900 pl-8 space-y-4 mt-2">
                            {day.activities.map((act, i) => (
                                <div key={i} className="relative">
                                    <div className="absolute -left-[43px] top-1 bg-orange-500 h-4 w-4 rounded-full border-4 border-background"></div>
                                    <p className="font-semibold">{act.locationName}</p>
                                    <p className="text-xs text-muted-foreground">{act.time}</p>
                                    <p className="text-sm mt-1">{act.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </ScrollArea>
        </div>
    );
}

function AiRouteDetails({ data }) {
    const response = typeof data.response === 'string' ? JSON.parse(data.response) : data.response;

    return (
        <div className="p-2">
            <h3 className="font-bold text-lg mb-4">Routes from {data.startLocation} to Pandharpur</h3>
            <ScrollArea className="h-[55vh]"><div className="space-y-4 pr-4">
                {response.routes.map((route, index) => (
                    <Card key={index} className={cn(route.isCheapest && "border-green-500 bg-green-50/50 dark:bg-green-900/20")}>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between text-base">{route.routeName}{route.isCheapest && <span className="text-xs font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/50 px-2 py-1 rounded-full">Cheapest</span>}</CardTitle>
                            <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                                <span className="flex items-center gap-1.5">{route.transportMethod === 'Car' ? <Car className="w-4 h-4" /> : route.transportMethod === 'Train' ? <Train className="w-4 h-4" /> : <Plane className="w-4 h-4" />}{route.transportMethod}</span>
                                <span className="flex items-center gap-1.5"><Clock4 className="w-4 h-4" />{route.duration}</span>
                                <span className="flex items-center gap-1.5"><Wallet className="w-4 h-4" />{route.estimatedCost}</span>
                                <span className="flex items-center gap-1.5"><Wind className="w-4 h-4" />{route.weatherAdvisory}</span>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div></ScrollArea>
        </div>
    );
}

function AiScheduleDetails({ data }) {
    const response = typeof data.response === 'string' ? JSON.parse(data.response) : data.response;
    return (
        <div className="p-2">
            <h3 className="font-bold text-lg mb-2 text-primary">{response.scheduleTitle}</h3>
            <p className="text-sm text-muted-foreground mb-4">For {format(new Date(response.scheduleDate), "PPP")}</p>
            <ScrollArea className="h-60 pr-4">
                <div className="relative border-l-2 border-orange-200 dark:border-orange-900 pl-8 space-y-6">
                    {response.timeSlots.map((slot, index) => (
                        <div key={index} className="relative">
                            <div className="absolute -left-[43px] top-1 bg-orange-500 h-4 w-4 rounded-full border-4 border-background"></div>
                            <p className="font-semibold text-sm">{slot.startTime} - {slot.endTime}</p>
                            <p className="text-base">{slot.activity}</p>
                            {slot.location && <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1"><MapPin className="w-3 h-3" />{slot.location}</p>}
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}

// --- Other Components ---
function DeleteConfirmation({ onConfirm }) {
    return (
        <AlertDialog><AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><Trash2 className="w-4 h-4 text-destructive" /></Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone. This will permanently delete this plan.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    );
}

function GoogleMapComponent({ locations }) {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const markers = useRef([]);
    const polyline = useRef(null);

    const initMap = useCallback(async () => {
        if (!GOOGLE_MAPS_API_KEY) { console.error("Google Maps API Key is missing."); return; }
        try {
            const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY, version: "weekly", libraries: ["marker", "maps"] });
            const google = await loader.load();
            mapInstance.current = new google.maps.Map(mapRef.current, { center: { lat: 17.6744, lng: 75.3235 }, zoom: 14, mapId: 'TRIP_PLANNER_MAP_VFINAL', mapTypeControl: false, streetViewControl: false, styles: [{ "featureType": "poi", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }] });
            polyline.current = new google.maps.Polyline({ strokeColor: "#ea580c", strokeOpacity: 0.8, strokeWeight: 4, map: mapInstance.current });
        } catch (e) { console.error("Error loading Google Maps:", e); }
    }, []);

    useEffect(() => { initMap(); }, [initMap]);

    useEffect(() => {
        if (!mapInstance.current || !window.google) return;

        markers.current.forEach(marker => marker.map = null);
        markers.current = [];

        if (!locations || locations.length === 0) {
            polyline.current.setPath([]);
            mapInstance.current.setCenter({ lat: 17.6744, lng: 75.3235 });
            mapInstance.current.setZoom(14);
            return;
        }

        const bounds = new window.google.maps.LatLngBounds();
        const path = [];
        locations.forEach(({ position, title }, index) => {
            if (position?.lat && position?.lng) {
                const pinElement = new window.google.maps.marker.PinElement({ glyph: `${index + 1}`, background: "#f97316", borderColor: "#c2410c", glyphColor: "#ffffff" });
                const marker = new window.google.maps.marker.AdvancedMarkerElement({ map: mapInstance.current, position, title, content: pinElement.element });
                markers.current.push(marker);
                bounds.extend(position);
                path.push(position);
            }
        });

        polyline.current.setPath(path.length > 1 ? path : []);
        if (locations.length > 0) mapInstance.current.fitBounds(bounds);
    }, [locations]);

    if (!GOOGLE_MAPS_API_KEY) { return <div className="flex items-center justify-center h-full bg-muted rounded-lg"><div className="text-center p-4"><p className="font-semibold text-destructive">API Key Missing</p></div></div>; }
    return <div ref={mapRef} className="w-full h-full rounded-lg" />;
}