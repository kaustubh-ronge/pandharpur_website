


"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hotel, Utensils, Bus, Home, Bike, MapPin, User, Clock, Check, X } from "lucide-react";

const BookingSection = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    date: "",
    people: 1,
    specialRequests: ""
  });

  const bookingCategories = [
    {
      id: "hotel",
      title: "Hotel Booking",
      icon: <Hotel className="h-6 w-6" />,
      description: "Comfortable stays near Vitthal Temple",
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: "bhaktniwas",
      title: "Bhaktniwas",
      icon: <Home className="h-6 w-6" />,
      description: "Affordable pilgrim accommodations",
      color: "bg-orange-100 text-orange-600"
    },
    {
      id: "restaurant",
      title: "Restaurant",
      icon: <Utensils className="h-6 w-6" />,
      description: "Prasad & Maharashtrian cuisine",
      color: "bg-green-100 text-green-600"
    },
    {
      id: "travel",
      title: "Travel",
      icon: <Bus className="h-6 w-6" />,
      description: "Buses & taxis to Pandharpur",
      color: "bg-purple-100 text-purple-600"
    },
    {
      id: "riksha",
      title: "Riksha",
      icon: <Bike className="h-6 w-6" />,
      description: "Local transport in Pandharpur",
      color: "bg-yellow-100 text-yellow-600"
    }
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert(`Booking submitted for ${activeCategory}!\nDetails: ${JSON.stringify(bookingData, null, 2)}`);
    setActiveCategory(null);
  };

  return (
    <section className="relative py-20 px-6 md:px-12 bg-gradient-to-t from-orange-100 via-white to-orange-50 overflow-hidden">
      {/* Background floating circles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className={`absolute ${i === 1 ? 'top-10 left-10 w-24 h-24 bg-orange-200' : 
              i === 2 ? 'bottom-20 right-20 w-20 h-20 bg-orange-300' :
              i === 3 ? 'top-20 left-60 w-32 h-32 bg-orange-400' :
              i === 4 ? 'bottom-40 left-24 w-28 h-28 bg-orange-500' :
              'top-40 right-10 w-36 h-36 bg-orange-600'} rounded-full opacity-${i === 1 ? 30 : i === 2 ? 20 : i === 3 ? 25 : i === 4 ? 15 : 10}`}
            animate={{ 
              y: i <= 3 ? [0, i === 1 ? 20 : i === 2 ? -20 : 25, 0] : undefined,
              x: i >= 4 ? [0, i === 4 ? 30 : -30, 0] : undefined
            }}
            transition={{ 
              repeat: Infinity, 
              duration: i === 1 ? 6 : i === 2 ? 5 : i === 3 ? 7 : i === 4 ? 6.5 : 8 
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 border-orange-400 text-orange-600">
            Pilgrim Services
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Book Your Pilgrimage Essentials</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Arrange all your travel needs for a comfortable spiritual journey to Pandharpur
          </p>
        </motion.div>

        {/* Booking Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {bookingCategories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              {category.id === "hotel" ? (
                <Link href="/hotels" className="block">
                  <Card className="cursor-pointer hover:shadow-lg transition-all">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className={`p-3 rounded-full ${category.color}`}>
                        {category.icon}
                      </div>
                      <div>
                        <CardTitle>{category.title}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ) : (
                <Card
                  className={`cursor-pointer transition-all ${activeCategory === category.id ? 'ring-2 ring-orange-500' : 'hover:shadow-lg'}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className={`p-3 rounded-full ${category.color}`}>
                      {category.icon}
                    </div>
                    <div>
                      <CardTitle>{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              )}
            </motion.div>
          ))}
        </div>

        {/* Everything below remains unchanged (form, extra info) */}
        {/* You can paste your remaining JSX (forms and tips) here — it's unchanged from your previous version */}
      </div>
    </section>
  );
};

export default BookingSection;
