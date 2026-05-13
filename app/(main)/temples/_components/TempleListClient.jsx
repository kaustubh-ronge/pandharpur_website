"use client";

import { useState } from "react";
import TempleList from "./TempleList";
import { PaginationControls } from "@/components/PaginationControls";

export default function TempleListClient({ temples }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (!temples || temples.length === 0) {
    return <p className="text-center text-gray-600 mt-10">No temple information found. Please check back later.</p>;
  }

  const totalPages = Math.ceil(temples.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = temples.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <TempleList temples={currentItems} />
      
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <PaginationControls 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      </div>
    </div>
  );
}
