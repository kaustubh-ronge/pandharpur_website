// File: app/(main)/guide/_components/AiTripPlanner.jsx

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Sparkles, Loader2 } from "lucide-react";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from "sonner";
import { aiTripSchema } from '@/lib/schema';

/**
 * AiTripPlanner (Client Component)
 *
 * This component handles the form for generating a trip with AI.
 * It manages form state, validation, and communicates with the AI
 * generation server action.
 */
function AiTripPlanner({ setMapLocations, onPlanCreated, useFetch, zodResolver, useForm, z, toast, generateAiTrip }) {
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
    <Card className="shadow-lg border-2 border-white/50 dark:border-slate-800/50">
      <CardHeader><CardTitle>AI Trip Planner</CardTitle><CardDescription>Generate a detailed day-by-day itinerary for your stay.</CardDescription></CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="prompt" render={({ field }) => <FormItem><FormLabel>What kind of trip are you looking for?</FormLabel><FormControl><Textarea placeholder="e.g., A spiritual trip for my elderly parents, focused on darshan and comfort." {...field} rows={3} /></FormControl><FormMessage /></FormItem>} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField control={form.control} name="duration" render={({ field }) => <FormItem><FormLabel>Days</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="people" render={({ field }) => <FormItem><FormLabel>People</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="budget" render={({ field }) => <FormItem><FormLabel>Budget</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="Budget">Budget</SelectItem><SelectItem value="Mid-Range">Mid-Range</SelectItem><SelectItem value="Luxury">Luxury</SelectItem></SelectContent></Select><FormMessage /></FormItem>} />
            </div>
            <Button type="submit" disabled={loading} className="w-full">{loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><Sparkles className="mr-2 h-4 w-4" />Generate AI Trip</>}</Button>
          </form>
        </Form>
        {loading && <div className="text-center pt-4"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" /></div>}
        {error && <div className="mt-4 text-center text-sm text-destructive">{error.message}</div>}
      </CardContent>
    </Card>
  );
}

export default AiTripPlanner;