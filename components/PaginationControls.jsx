// File: components/PaginationControls.jsx

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PaginationControls({
    currentPage,
    totalPages,
    onPageChange
}) {
    // Don't show anything if there is only one page
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-4 mt-12">
            {/* Previous Button */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1"
            >
                <ChevronLeft className="h-4 w-4" />
                Previous
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => onPageChange(page)}
                        className={`w-9 h-9 p-0 transition-all ${currentPage === page
                            ? 'bg-orange-500 hover:bg-orange-600 shadow-md'
                            : 'hover:border-orange-300'
                            }`}
                    >
                        {page}
                    </Button>
                ))}
            </div>

            {/* Next Button */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1"
            >
                Next
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
