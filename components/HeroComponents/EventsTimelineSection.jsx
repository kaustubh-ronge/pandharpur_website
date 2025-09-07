"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

// Helper component to avoid repeating the icon code
const TimelineIcon = ({ event }) => (
  <motion.div
    className={`w-12 h-12 rounded-full ${event.color} border-4 ${event.status === 'current' ? 'border-orange-400' : event.status === 'upcoming' ? 'border-blue-400' : 'border-gray-300'} flex items-center justify-center shadow-lg z-10`}
    whileHover={{ scale: 1.1 }}
  >
    <div className="text-gray-600">{event.icon}</div>
  </motion.div>
);

const EventsTimelineSection = ({ processedEvents, currentEvent, upcomingEvent }) => {
  return (
    <section className="relative py-20 px-4 sm:px-6 md:px-12 bg-orange-50 overflow-hidden">
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

        {/* Current and Upcoming Events Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {currentEvent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-l-4 border-orange-500 shadow-lg h-full">
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
              <Card className="border-l-4 border-blue-500 shadow-lg h-full">
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

        {/* Main Timeline */}
        <div className="relative">
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 h-full w-1 bg-orange-200 origin-top transform md:-translate-x-1/2"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          />
          
          <div className="space-y-12">
            {processedEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row md:items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Mobile-only Icon (absolutely positioned) */}
                <div className="absolute left-4 top-6 transform -translate-x-1/2 -translate-y-1/2 md:hidden">
                  <TimelineIcon event={event} />
                </div>
                
                {/* CONTAINER 1: Holds Card and Desktop Icon */}
                <div className="w-full md:w-1/2">
                  <div className="pl-14 md:pl-0">
                    <div className={`md:flex items-center ${index % 2 === 0 ? 'md:justify-end md:pr-8' : 'md:pl-8'}`}>
                      {index % 2 !== 0 && (
                        <div className="hidden md:block mr-4 flex-shrink-0">
                          <TimelineIcon event={event} />
                        </div>
                      )}

                      {/* Card Container - EDITED: Removed max-w-sm to restore original size */}
                      <div className="w-full">
                        <motion.div whileHover={{ y: -5 }} className="h-full">
                          <Card className={`p-6 shadow-md border-l-4 ${event.status === 'current' ? 'border-orange-500' : event.status === 'upcoming' ? 'border-blue-500' : 'border-gray-300'} bg-white/90 backdrop-blur-sm h-full text-left`}>
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
                              <p className="text-gray-600 mb-4">{event.description}</p>
                              <div className="flex items-center gap-2 text-sm pt-2 border-t border-gray-200">
                                <MapPin className={`h-4 w-4 ${event.status === 'current' ? 'text-orange-500' : event.status === 'upcoming' ? 'text-blue-500' : 'text-gray-500'}`} />
                                <span className="text-gray-700">{event.location}</span>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </div>
                      
                      {index % 2 === 0 && (
                        <div className="hidden md:block ml-4 flex-shrink-0">
                          <TimelineIcon event={event} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* CONTAINER 2: Spacer for the other half */}
                <div className="hidden md:block w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsTimelineSection;