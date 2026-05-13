"use client";

import { useState } from "react";
import HotelCard from "./HotelCard";
import { PaginationControls } from "@/components/PaginationControls";
import { BedDouble } from "lucide-react";

export default function HotelListClient({ hotels }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (!hotels || hotels.length === 0) {
    return (
      <div className="text-center mt-16 text-slate-600 bg-white border border-slate-200 rounded-2xl p-12 max-w-lg mx-auto">
        <BedDouble className="mx-auto h-16 w-16 text-slate-400 mb-4" />
        <h3 className="text-2xl font-semibold text-slate-800">
          No Accommodations Found
        </h3>
        <p className="mt-3 text-slate-500">
          We couldn&apos;t find any available places to stay at the moment.
          Please check back again soon as we are constantly updating our
          listings.
        </p>
      </div>
    );
  }

  const totalPages = Math.ceil(hotels.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = hotels.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {currentItems.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
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
