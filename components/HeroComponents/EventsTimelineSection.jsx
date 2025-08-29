"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

const EventsTimelineSection = ({ processedEvents, currentEvent, upcomingEvent }) => {
  return (
    <section className="relative py-20 px-6 md:px-12 bg-orange-50 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 border-orange-400 text-orange-600">
            Annual Events
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pandharpur Festival Calendar</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Mark your calendar for these sacred events that happen every year in Pandharpur.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {currentEvent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-l-4 border-orange-500 shadow-lg">
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-orange-500 text-white">
                    Happening Now
                  </Badge>
                  <CardTitle>{currentEvent.title}</CardTitle>
                  <CardDescription className="text-orange-600">
                    {currentEvent.displayDate}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{currentEvent.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    <span className="text-gray-700">{currentEvent.location}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {upcomingEvent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border-l-4 border-blue-500 shadow-lg">
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-blue-500 text-white">
                    Coming Soon
                  </Badge>
                  <CardTitle>{upcomingEvent.title}</CardTitle>
                  <CardDescription className="text-blue-600">
                    {upcomingEvent.displayDate}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{upcomingEvent.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-700">{upcomingEvent.location}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        <div className="relative">
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-orange-200 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          />
          
          <div className="space-y-12">
            {processedEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <motion.div whileHover={{ y: -5 }}>
                    <Card className={`p-6 shadow-md border-l-4 ${event.status === 'current' ? 'border-orange-500' : event.status === 'upcoming' ? 'border-blue-500' : 'border-gray-300'} bg-white/90 backdrop-blur-sm`}>
                      <CardHeader className="p-0 mb-4">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          {event.status === 'current' && (
                            <Badge className="ml-2 bg-orange-100 text-orange-800">Live</Badge>
                          )}
                          {event.status === 'upcoming' && (
                            <Badge className="ml-2 bg-blue-100 text-blue-800">Next</Badge>
                          )}
                        </div>
                        <CardDescription className={`${event.status === 'current' ? 'text-orange-600' : event.status === 'upcoming' ? 'text-blue-600' : 'text-gray-500'}`}>
                          {event.displayDate}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <p className="text-gray-600">{event.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
                <motion.div
                  className={`w-16 h-16 rounded-full ${event.color} border-4 ${event.status === 'current' ? 'border-orange-400' : event.status === 'upcoming' ? 'border-blue-400' : 'border-gray-300'} flex items-center justify-center shadow-lg z-10`}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className={`${event.status === 'current' ? 'text-orange-600' : event.status === 'upcoming' ? 'text-blue-600' : 'text-gray-500'}`}>
                    {event.icon}
                  </div>
                </motion.div>
                <div className={`flex-1 ${index % 2 === 0 ? 'pl-8' : 'pr-8 text-right'}`}>
                  <h3 className="font-semibold text-gray-900">{event.location}</h3>
                  <p className="text-sm text-gray-500">
                    {event.status === 'current' ? 'Happening now' : 
                      event.status === 'upcoming' ? 'Coming soon' : 
                      `Next: ${new Date(`${new Date().getFullYear()}-${event.startDate}`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsTimelineSection;