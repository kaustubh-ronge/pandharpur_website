"use client";

import { useState } from "react";
import BhaktaniwasCard from "./BhaktaniwasCard";
import { PaginationControls } from "@/components/PaginationControls";

export default function BhaktaniwasListClient({ allBhaktaniwas }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (!allBhaktaniwas || allBhaktaniwas.length === 0) {
    return <p className="text-center text-gray-600 mt-10">No Bhaktaniwas information found. Please check back later.</p>;
  }

  const totalPages = Math.ceil(allBhaktaniwas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = allBhaktaniwas.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentItems.map((item) => (
          <BhaktaniwasCard key={item._id} bhaktaniwas={item} />
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
