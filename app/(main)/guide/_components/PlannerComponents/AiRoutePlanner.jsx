// File: app/(main)/guide/_components/AiRoutePlanner.jsx

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Route, Loader2 } from "lucide-react";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { aiRouteSchema } from '@/lib/schema';

/**
 * AiRoutePlanner (Client Component)
 *
 * This form allows users to generate AI-powered routes. It handles
 * form state, validation, and submission to the route generation
 * server action.
 */
function AiRoutePlanner({ setMapLocations, onPlanCreated, useFetch, zodResolver, useForm, z, toast, generateAiRoute }) {
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
    <Card className="shadow-lg border-2 border-white/50 dark:border-slate-800/50">
      <CardHeader><CardTitle>AI Route Generator</CardTitle><CardDescription>Find the best routes from your location to Pandharpur.</CardDescription></CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="startLocation" render={({ field }) => <FormItem><FormLabel>Your Starting Location</FormLabel><FormControl><Input placeholder="e.g., Pune, Maharashtra" {...field} /></FormControl><FormMessage /></FormItem>} />
            <Button type="submit" disabled={loading} className="w-full">{loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><Route className="mr-2 h-4 w-4" />Generate Routes</>}</Button>
          </form>
        </Form>
        {loading && <div className="text-center pt-4"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" /></div>}
        {error && <div className="mt-4 text-center text-sm text-destructive">{error.message}</div>}
      </CardContent>
    </Card>
  );
}

export default AiRoutePlanner;