// File: app/(main)/guide/_components/PastList.jsx

"use client";

import { useEffect } from 'react';
import { format } from "date-fns";
import { Loader2, Trash2, Eye, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from "sonner";
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import DeleteConfirmation from '../DeleteConfirmation';

/**
 * PastList (Client Component)
 *
 * This is a reusable component for displaying a list of past plans.
 * It handles data fetching, loading states, and calls the appropriate
 * delete and view functions passed from the parent.
 */
function PastList({
  fetcher,
  deleter,
  type,
  refreshTrigger,
  onDeleted,
  onViewDetails,
  onViewOnMap,
  ppur_attractions,
  useFetch,
  format,
}) {
  const { data, loading, error, fn: fetchItems } = useFetch(fetcher);

  useEffect(() => {
    fetchItems();
  }, [fetchItems, refreshTrigger]);

  let items = [];
  if (data?.success) { items = data.trips || data.routes || data.schedules || []; }

  const handleDelete = async (id) => { toast.promise(deleter(id), { loading: 'Deleting...', success: () => { onDeleted(); return 'Plan deleted!'; }, error: (err) => err.message || 'Failed to delete.' }); };

  const handleViewOnMapClick = (item) => {
    let locations = [];
    const response = item.response;
    if (type === 'manual_trip') {
      locations = ppur_attractions.filter(attr => item.locations.includes(attr.label)).map(attr => ({ title: attr.label, position: attr.position }));
    } else if (response?.itinerary) {
      locations = response.itinerary.flatMap(d => d.activities.map(a => ({ position: a.coordinates, title: a.locationName })));
    } else if (response?.routes) {
      locations = response.routes.flatMap(r => r.steps.map(s => ({ position: s.coordinates, title: s.instruction })));
    } else if (response?.timeSlots) {
      locations = response.timeSlots.filter(ts => ts.coordinates?.lat).map(ts => ({ position: ts.coordinates, title: ts.location }));
    }
    onViewOnMap(locations);
  };

  if (loading) return <Loader2 className="w-6 h-6 animate-spin mx-auto mt-8" />;
  if (error) return <p className="text-center text-sm text-destructive pt-8">{error.message}</p>;
  if (items.length === 0) return <p className="text-center text-sm text-muted-foreground pt-8">No plans found.</p>;

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

export default PastList;