"use client";

import { useState } from "react";
import TravelsCard from "./TravelsCard";
import { PaginationControls } from "@/components/PaginationControls";

export default function TravelListClient({ travelOptions }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (!travelOptions || travelOptions.length === 0) {
    return <p className="text-center text-gray-600 mt-10">No travel information found. Please check back later.</p>;
  }

  const totalPages = Math.ceil(travelOptions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = travelOptions.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentItems.map((item) => (
          <TravelsCard key={item._id} travel={item} />
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
