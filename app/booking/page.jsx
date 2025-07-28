"use client";

import { useState } from "react";
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
    // Handle booking submission logic here
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
            </motion.div>
          ))}
        </div>

        {/* Booking Form Section */}
        <AnimatePresence>
          {activeCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <Card className="bg-white/90 backdrop-blur-md border border-orange-200 shadow-lg">
                <CardHeader className="border-b border-orange-100">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      {bookingCategories.find(c => c.id === activeCategory)?.icon}
                      <CardTitle>
                        {bookingCategories.find(c => c.id === activeCategory)?.title}
                      </CardTitle>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setActiveCategory(null)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleBookingSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Common Fields */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input 
                            id="name" 
                            placeholder="Your name" 
                            required 
                            value={bookingData.name}
                            onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input 
                            id="phone" 
                            type="tel" 
                            placeholder="+91 9876543210" 
                            required 
                            value={bookingData.phone}
                            onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="date">Booking Date *</Label>
                          <Input
                            id="date"
                            type="date"
                            required
                            value={bookingData.date}
                            onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="people">Number of People</Label>
                          <Input 
                            id="people" 
                            type="number" 
                            min="1" 
                            value={bookingData.people}
                            onChange={(e) => setBookingData({...bookingData, people: parseInt(e.target.value) || 1})}
                          />
                        </div>
                      </div>

                      {/* Category-specific Fields */}
                      {activeCategory === 'hotel' && (
                        <div className="md:col-span-2 space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="checkin">Check-in Date</Label>
                              <Input
                                id="checkin"
                                type="date"
                                value={bookingData.checkin || ''}
                                onChange={(e) => setBookingData({...bookingData, checkin: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="checkout">Check-out Date</Label>
                              <Input
                                id="checkout"
                                type="date"
                                value={bookingData.checkout || ''}
                                onChange={(e) => setBookingData({...bookingData, checkout: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Room Preference</Label>
                            <div className="flex flex-wrap gap-2">
                              {['AC', 'Non-AC', 'Deluxe', 'Dormitory'].map(type => (
                                <Button
                                  key={type}
                                  variant="outline"
                                  type="button"
                                  className="text-sm"
                                  onClick={() => setBookingData({...bookingData, roomType: type})}
                                >
                                  {type}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {activeCategory === 'travel' && (
                        <div className="md:col-span-2 space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="from">From</Label>
                              <Input 
                                id="from" 
                                placeholder="Starting location" 
                                value={bookingData.from || ''}
                                onChange={(e) => setBookingData({...bookingData, from: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="to">To</Label>
                              <Input 
                                id="to" 
                                value="Pandharpur" 
                                readOnly 
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Travel Type</Label>
                            <div className="flex flex-wrap gap-2">
                              {['Bus', 'Taxi', 'Private Car', 'Train'].map(type => (
                                <Button
                                  key={type}
                                  variant="outline"
                                  type="button"
                                  className="text-sm"
                                  onClick={() => setBookingData({...bookingData, travelType: type})}
                                >
                                  {type}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {activeCategory === 'restaurant' && (
                        <div className="md:col-span-2 space-y-4">
                          <div className="space-y-2">
                            <Label>Meal Type</Label>
                            <div className="flex flex-wrap gap-2">
                              {['Prasad', 'Thali', 'Maharashtrian', 'South Indian', 'North Indian'].map(type => (
                                <Button
                                  key={type}
                                  variant="outline"
                                  type="button"
                                  className="text-sm"
                                  onClick={() => setBookingData({...bookingData, mealType: type})}
                                >
                                  {type}
                                </Button>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Meal Time</Label>
                            <div className="flex flex-wrap gap-2">
                              {['Breakfast', 'Lunch', 'Dinner'].map(type => (
                                <Button
                                  key={type}
                                  variant="outline"
                                  type="button"
                                  className="text-sm"
                                  onClick={() => setBookingData({...bookingData, mealTime: type})}
                                >
                                  {type}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Special Requests */}
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="requests">Special Requests</Label>
                        <textarea
                          id="requests"
                          rows={3}
                          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Any special requirements or notes..."
                          value={bookingData.specialRequests}
                          onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="md:col-span-2 flex justify-end">
                        <Button 
                          type="submit" 
                          className="bg-orange-600 hover:bg-orange-700 text-white"
                          size="lg"
                        >
                          <Check className="mr-2 h-5 w-5" /> Confirm Booking
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Additional Services Info */}
        {!activeCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Card className="bg-white/90 backdrop-blur-md border border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-orange-500" />
                  <span>Pandharpur Travel Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-full bg-orange-100 mt-1">
                        <Clock className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Best Time to Visit</h4>
                        <p className="text-sm text-gray-600">
                          Ashadhi Ekadashi (June-July) and Kartiki Ekadashi (November) are peak seasons. 
                          For quieter visits, try February-March.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-full bg-blue-100 mt-1">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Pilgrim Facilities</h4>
                        <p className="text-sm text-gray-600">
                          Free food (Annadan), luggage storage, medical aid, and resting places are available throughout the pilgrimage route.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-full bg-green-100 mt-1">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Temple Timings</h4>
                        <p className="text-sm text-gray-600">
                          Vitthal Temple opens at 4:30 AM for Kakad Aarti. Closed 1-3 PM. Evening Aarti at 7 PM.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-full bg-purple-100 mt-1">
                        <Bus className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Local Transport</h4>
                        <p className="text-sm text-gray-600">
                          Electric rikshas available near temple. Shared autos run to all major points in Pandharpur.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BookingSection;