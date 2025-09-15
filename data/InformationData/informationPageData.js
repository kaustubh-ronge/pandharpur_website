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
<<<<<<< HEAD
    link: "/pandharpur-bookings/hotels" // This has a link
=======
    link: "/information-page/hotels" // This has a link
>>>>>>> c6bbd87266ab7631edab901ab8763b39a202dbf5
  },
  {
    id: "temple",
    title: "Temple Information",
    icon: <MapPin className="h-6 w-6" />,
    descriptionTemplate: "Explore all {count} temples",
    color: "bg-red-100 text-red-600",
<<<<<<< HEAD
    link: "/pandharpur-bookings/temples" // This also has a link
=======
    link: "/information-page/temples" // This also has a link
>>>>>>> c6bbd87266ab7631edab901ab8763b39a202dbf5
  },
  {
    id: "bhaktniwas",
    title: "Bhaktaniwas",
    icon: <Home className="h-6 w-6" />,
    description: "Affordable pilgrim accommodations",
    color: "bg-orange-100 text-orange-600",
<<<<<<< HEAD
    link: "/pandharpur-bookings/bhaktaniwas"
=======
    link: "/information-page/bhaktaniwas"
>>>>>>> c6bbd87266ab7631edab901ab8763b39a202dbf5
  },
  {
    id: "restaurant",
    title: "Restaurant",
    icon: <Utensils className="h-6 w-6" />,
    description: "Prasad & Maharashtrian cuisine",
    color: "bg-green-100 text-green-600",
<<<<<<< HEAD
    link:"/pandharpur-bookings/restaurants"
=======
    link:"/information-page/restaurants"
>>>>>>> c6bbd87266ab7631edab901ab8763b39a202dbf5
  },
  {
    id: "travel",
    title: "Travel",
    icon: <Bus className="h-6 w-6" />,
    description: "Buses & taxis to Pandharpur",
    color: "bg-purple-100 text-purple-600",
<<<<<<< HEAD
    link:"/pandharpur-bookings/travel"
=======
    link:"/information-page/travel"
>>>>>>> c6bbd87266ab7631edab901ab8763b39a202dbf5
  },
];

