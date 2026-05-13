"use client";

import { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { PaginationControls } from "@/components/PaginationControls";

export default function AttractionListClient({ categories }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (!categories || categories.length === 0) {
    return <p className="text-center text-gray-600 mt-10">No attractions found. Please check back later.</p>;
  }

  // Flatten all attractions across categories to paginate them as a single list
  // Or paginate within categories. Given the current structure, paginating the whole list is better for the user.
  const allAttractions = categories.flatMap(cat => 
    (cat.attractions || []).map(attr => ({ ...attr, categoryTitle: cat.title }))
  );

  const totalPages = Math.ceil(allAttractions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = allAttractions.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map(attraction => (
          <Link 
            href={`/pandharpur-attractions/${attraction.slug}`} 
            key={attraction._id} 
            className="block group transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100">
              <div className="relative h-56 w-full overflow-hidden">
                {attraction.image ? (
                  <Image 
                    src={attraction.image} 
                    alt={attraction.name} 
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No Image Available</span>
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-amber-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-sm z-10">
                  {attraction.categoryTitle}
                </div>
              </div>
              
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors">
                  {attraction.name}
                </h3>
                <p className="text-gray-600 mt-2 line-clamp-3 flex-grow">
                  {attraction.description}
                </p>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <span className="text-amber-600 font-medium inline-flex items-center group-hover:underline">
                    Explore more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
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
