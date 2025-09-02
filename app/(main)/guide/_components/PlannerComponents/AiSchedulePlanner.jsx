// File: app/(main)/guide/_components/AiSchedulePlanner.jsx

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Clock4, Loader2, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { aiScheduleSchema } from '@/lib/schema';
import { format } from "date-fns";

/**
 * AiSchedulePlanner (Client Component)
 *
 * This form allows users to generate a daily schedule with AI.
 * It manages form state, validation, and communicates with the
 * AI schedule generation server action.
 */
function AiSchedulePlanner({
  setMapLocations,
  onPlanCreated,
  useFetch,
  zodResolver,
  useForm,
  z,
  toast,
  generateAiSchedule
}) {
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
    <Card className="shadow-lg border-2 border-white/50 dark:border-slate-800/50">
      <CardHeader><CardTitle>AI Daily Scheduler</CardTitle><CardDescription>Plan a single day's schedule with the help of AI.</CardDescription></CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="date" render={({ field }) => <FormItem className="flex flex-col"><FormLabel>Date for Schedule</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}</Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
                disabled={(date) => date < new Date(new Date().toDateString())}
              />
            </PopoverContent></Popover><FormMessage /></FormItem>} />
            <FormField control={form.control} name="prompt" render={({ field }) => <FormItem><FormLabel>What do you need to schedule?</FormLabel><FormControl><Textarea placeholder="e.g., I need to visit the main temple for morning darshan, then go shopping for religious items, and have lunch at a good vegetarian restaurant." {...field} rows={3} /></FormControl><FormMessage /></FormItem>} />
            <Button type="submit" disabled={loading} className="w-full">{loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><Clock4 className="mr-2 h-4 w-4" />Generate Schedule</>}</Button>
          </form>
        </Form>
        {loading && <div className="text-center pt-4"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" /></div>}
        {error && <div className="mt-4 text-center text-sm text-destructive">{error.message}</div>}
      </CardContent>
    </Card>
  );
}

export default AiSchedulePlanner;