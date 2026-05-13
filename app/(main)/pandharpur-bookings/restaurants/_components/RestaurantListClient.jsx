"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Award, UtensilsCrossed } from "lucide-react";
import { PaginationControls } from "@/components/PaginationControls";

function RestaurantCard({ restaurant }) {
  const priceMap = {
    'budget': '₹',
    'mid-range': '₹₹',
    'premium': '₹₹₹',
  };
  return (
    <Link href={`/pandharpur-bookings/restaurants/${restaurant.slug}`} className="block group">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
        <div className="relative w-full h-52">
          <Image
            src={restaurant.image || 'https://placehold.co/600x400/22C55E/FFFFFF?text=Restaurant'}
            alt={`Image of ${restaurant.name}`}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={!!restaurant.image}
          />
          {restaurant.isFeatured && (
            <div className="absolute top-3 left-3 bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
              <Award className="h-4 w-4" />
              <span>FEATURED</span>
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div>
            <div className="flex justify-between items-start">
              <p className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-1">{restaurant.cuisineType?.replace('-', ' ')}</p>
              {restaurant.priceIndicator && <p className="font-bold text-gray-700">{priceMap[restaurant.priceIndicator]}</p>}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{restaurant.name}</h3>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{restaurant.description}</p>
          </div>
          <div className="mt-auto pt-4">
            <div className="inline-flex items-center gap-2 font-semibold text-orange-600 group-hover:underline">
              View Menu &amp; Details
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function RestaurantListClient({ restaurants }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (!restaurants || restaurants.length === 0) {
    return <p className="text-center text-gray-600 mt-10">No restaurant information found. Please check back later.</p>;
  }

  const totalPages = Math.ceil(restaurants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = restaurants.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentItems.map((item) => (
          <RestaurantCard key={item._id} restaurant={item} />
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
