import React from 'react';
import { client } from "@/sanity/lib/sanity";
import { Hotel, Utensils, Bus, Home, MapPin } from "lucide-react";

// This is the FINAL list of categories for your page.
export const categories = [
  {
    id: "hotel",
    title: "Hotel Information",
    icon: <Hotel className="h-6 w-6" />,
    descriptionTemplate: "View our {count} partner hotels",
    color: "bg-blue-100 text-blue-600",
    link: "/pandharpur-bookings/hotels" // This has a link
  },
  {
    id: "temple",
    title: "Temple Information",
    icon: <MapPin className="h-6 w-6" />,
    descriptionTemplate: "Explore all {count} temples",
    color: "bg-red-100 text-red-600",
    link: "/pandharpur-bookings/temples" // This also has a link
  },
  {
    id: "bhaktniwas",
    title: "Bhaktaniwas",
    icon: <Home className="h-6 w-6" />,
    description: "Affordable pilgrim accommodations",
    color: "bg-orange-100 text-orange-600",
    link: "/pandharpur-bookings/bhaktaniwas"
  },
  {
    id: "restaurant",
    title: "Restaurant",
    icon: <Utensils className="h-6 w-6" />,
    description: "Prasad & Maharashtrian cuisine",
    color: "bg-green-100 text-green-600",
    link:"/pandharpur-bookings/restaurants"
  },
  {
    id: "travel",
    title: "Travel",
    icon: <Bus className="h-6 w-6" />,
    description: "Buses & taxis to Pandharpur",
    color: "bg-purple-100 text-purple-600",
    link:"/pandharpur-bookings/travel"
  },
];

