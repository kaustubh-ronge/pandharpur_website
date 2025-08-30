// File: app/(main)/guide/_components/AllDetailsList.jsx

import { useEffect } from 'react';
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useFetch } from '@/hooks/useFetch';

/**
 * AllDetailsList (Client Component)
 *
 * This is a reusable list component for displaying all saved plans of a certain type.
 * It fetches data using the provided fetcher function and renders a list of cards,
 * each containing a component for displaying detailed information.
 */
function AllDetailsList({ fetcher, DetailsComponent, refreshTrigger, useFetch, cn, format, PANDHARPUR_ATTRACTIONS }) {
  const { data, loading, error, fn: fetchItems } = useFetch(fetcher);

  useEffect(() => {
    fetchItems();
  }, [fetchItems, refreshTrigger]);

  let items = [];
  if (data?.success) { items = data.trips || data.routes || data.schedules || []; }

  if (loading) return <div className="text-center p-12"><Loader2 className="w-8 h-8 animate-spin mx-auto" /></div>;
  if (error) return <p className="text-center text-sm text-destructive p-12">{error.message}</p>;
  if (items.length === 0) return <p className="text-center text-sm text-muted-foreground p-12">No saved plans in this category yet.</p>;

  return (
    <ScrollArea className="h-[60vh]">
      <div className="space-y-6 pr-4">
        {items.map(item => (
          <Card key={item.id} className="bg-background shadow-sm">
            <CardContent className="pt-6">
              <DetailsComponent data={item} cn={cn} format={format} PANDHARPUR_ATTRACTIONS={PANDHARPUR_ATTRACTIONS} />
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}

export default AllDetailsList;