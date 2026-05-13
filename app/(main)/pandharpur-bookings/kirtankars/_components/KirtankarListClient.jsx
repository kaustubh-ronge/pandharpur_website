"use client";

import { useState } from "react";
import KirtankarCard from "./KirtankarCard";
import { PaginationControls } from "@/components/PaginationControls";
import { Mic } from "lucide-react";

export default function KirtankarListClient({ kirtankars }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    if (!kirtankars || kirtankars.length === 0) {
        return (
            <div className="text-center mt-16 text-slate-600 bg-white border border-slate-200 rounded-2xl p-12 max-w-lg mx-auto">
                <Mic className="mx-auto h-16 w-16 text-slate-400 mb-4" />
                <h3 className="text-2xl font-semibold text-slate-800">No Kirtankars Found</h3>
                <p className="mt-3 text-slate-500">
                    We are currently updating our list of Kirtankars. Please check back again soon.
                </p>
            </div>
        );
    }

    const totalPages = Math.ceil(kirtankars.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = kirtankars.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {currentItems.map((kirtankar) => (
                    <KirtankarCard key={kirtankar._id} kirtankar={kirtankar} />
                ))}
            </div>
            
            <PaginationControls 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
            />
        </div>
    );
}
