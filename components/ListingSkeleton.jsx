import { Skeleton } from "@/components/ui/skeleton";

export function ListingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden h-full flex flex-col shadow-sm">
          {/* Image Placeholder */}
          <Skeleton className="w-full h-52" />
          
          <div className="p-5 flex flex-col flex-grow">
            {/* Category/Badge Placeholder */}
            <Skeleton className="h-4 w-24 mb-3" />
            
            {/* Title Placeholder */}
            <Skeleton className="h-7 w-3/4 mb-4" />
            
            {/* Description Lines */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            
            {/* Footer/Link Placeholder */}
            <div className="mt-auto pt-6">
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
