// File: app/(main)/guide/_components/ManualTripPlanner.jsx

"use client";

import { useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, PlusCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { manualTripSchema } from '@/lib/schema';
import { ppur_attractions } from '@/data/guidePageData/pandharpurAttractions';

/**
 * ManualTripPlanner (Client Component)
 *
 * This component provides the form for users to manually create a trip.
 * It handles form state, validation, and submission to the server action.
 */
function ManualTripPlanner({ setMapLocations, onPlanCreated, ppur_attractions, useFetch, zodResolver, useForm, z, format, cn, toast, createManualTrip }) {
  const { fn: create, loading } = useFetch(createManualTrip);
  const form = useForm({ resolver: zodResolver(manualTripSchema), defaultValues: { title: "", locations: [] } });
  const watchedLocations = form.watch('locations');

  useEffect(() => {
    const locationsWithCoords = ppur_attractions.filter(attr => watchedLocations.includes(attr.label)).map(attr => ({ title: attr.label, position: attr.position }));
    setMapLocations(locationsWithCoords);
  }, [watchedLocations, setMapLocations, ppur_attractions]);

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
    <Card className="shadow-lg border-2 border-white/50 dark:border-slate-800/50">
      <CardHeader><CardTitle>Manual Trip Builder</CardTitle></CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="title" render={({ field }) => <FormItem><FormLabel>Trip Title</FormLabel><FormControl><Input placeholder="e.g., Annual Family Visit" {...field} /></FormControl><FormMessage /></FormItem>} />
            <FormField control={form.control} name="dateRange" render={({ field }) => <FormItem className="flex flex-col"><FormLabel>Trip Dates</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value?.from && "text-muted-foreground")}><CalendarIcon className="w-4 h-4 mr-2" />{field.value?.from ? (field.value.to ? <>{format(field.value.from, "LLL dd, y")} - {format(field.value.to, "LLL dd, y")}</> : format(field.value.from, "LLL dd, y")) : <span>Pick dates</span>}</Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0">
              <Calendar
                mode="range"
                selected={field.value}
                onSelect={field.onChange}
                numberOfMonths={1}
                disabled={(date) => date < new Date(new Date().toDateString())}
              />
            </PopoverContent></Popover><FormMessage /></FormItem>} />
            <FormField control={form.control} name="locations" render={() => (<FormItem><FormLabel>Select Locations</FormLabel><ScrollArea className="h-40 w-full rounded-md border p-4">{ppur_attractions.map((item) => (<FormField key={item.id} control={form.control} name="locations" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-2"><FormControl><Checkbox checked={field.value?.includes(item.label)} onCheckedChange={(checked) => { return checked ? field.onChange([...field.value, item.label]) : field.onChange(field.value?.filter((value) => value !== item.label)); }} /></FormControl><FormLabel className="font-normal">{item.label}</FormLabel></FormItem>)} />))}</ScrollArea><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="preferences" render={({ field }) => <FormItem><FormLabel>Preferences</FormLabel><FormControl><Textarea placeholder="Any special requests or notes..." {...field} /></FormControl><FormMessage /></FormItem>} />
            <Button type="submit" disabled={loading} className="w-full">{loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : <><PlusCircle className="mr-2 h-4 w-4" />Save Manual Trip</>}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default ManualTripPlanner;