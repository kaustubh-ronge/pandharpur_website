"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Users, Music, Utensils, Droplets, ChevronRight, Download, Share2, Heart, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Icon map for client-side rendering
const iconMap = {
    Droplets,
    Music,
    Clock,
    Utensils,
    Users
};

export default function FestivalTabs({
    majorFestivals,
    monthlyEvents,
    specialRituals,
    dailyRituals,
    likedFestivals,
    toggleLike,
    handleShare,
    openFestivalDetails,
    calendarDownloading,
    downloadCalendar,
    scheduleDownloading,
    downloadSchedule,
    contactGuides,
}) {
    return (
        <section className="relative py-20 px-6 md:px-12 bg-gradient-to-t from-orange-100 via-white to-orange-50 overflow-hidden">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div className="absolute top-10 left-10 w-24 h-24 bg-orange-300 rounded-full opacity-30" animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 6 }} />
                <motion.div className="absolute bottom-20 right-20 w-20 h-20 bg-orange-300 rounded-full opacity-20" animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 5 }} />
                <motion.div className="absolute top-20 left-60 w-32 h-32 bg-orange-400 rounded-full opacity-25" animate={{ y: [0, 25, 0] }} transition={{ repeat: Infinity, duration: 7 }} />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
                    <Badge variant="outline" className="mb-4 border-orange-400 text-orange-600 px-4 py-1.5">
                        <Music className="h-4 w-4 mr-2" /> Sacred Celebrations
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                        Pandharpur Festivals & Events
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-600">
                        Experience the divine energy of Pandharpur through its vibrant festivals and sacred rituals.
                    </p>
                </motion.div>

                <Tabs defaultValue="major" className="w-full mb-12">
                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="relative">
                        <TabsList className="grid w-full grid-cols-3 relative">
                            <TabsTrigger value="major">Major Festivals</TabsTrigger>
                            <TabsTrigger value="monthly">Monthly Events</TabsTrigger>
                            <TabsTrigger value="special">Special Rituals</TabsTrigger>
                        </TabsList>
                    </motion.div>

                    {/* CORRECTED: Content for Major Festivals Tab */}
                    <TabsContent value="major">
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            {majorFestivals.map((festival, index) => (
                                <motion.div key={index} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                                    <Card className="h-full border border-orange-200 bg-white/90 backdrop-blur-sm overflow-hidden group">
                                        <div className="relative h-48 overflow-hidden">
                                            <Image src={festival.image} alt={festival.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-between">
                                                <div className="flex justify-end">
                                                    <Button variant="ghost" size="icon" className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30" onClick={() => toggleLike(festival.id)}>
                                                        <Heart className={`h-4 w-4 ${likedFestivals[festival.id] ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                                                    </Button>
                                                </div>
                                                <div>
                                                    <h3 className="text-white font-semibold text-lg">{festival.name}</h3>
                                                    <p className="text-orange-200 text-sm">{festival.dateRange}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <CardContent className="p-6">
                                            <div className="flex items-center gap-3 mb-3">
                                                <Badge variant="secondary" className="bg-orange-100 text-orange-600"><Calendar className="h-3 w-3 mr-1" />{festival.date}</Badge>
                                                <Badge variant="outline" className="border-orange-200">{festival.duration}</Badge>
                                            </div>
                                            <p className="text-gray-600 mb-4 line-clamp-2">{festival.description}</p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {festival.highlights.map((highlight, i) => (<Badge key={i} variant="outline" className="text-xs">{highlight}</Badge>))}
                                            </div>
                                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-orange-100">
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={festival.organizer.avatar} />
                                                        <AvatarFallback>{festival.organizer.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm text-gray-600">{festival.organizer.name}</span>
                                                </div>
                                                <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700" onClick={() => openFestivalDetails(festival)}>
                                                    Details <ChevronRight className="h-4 w-4 ml-1" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </TabsContent>

                    {/* CORRECTED: Content for Monthly Events Tab */}
                    <TabsContent value="monthly">
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mt-8">
                            <Card className="border border-orange-200 bg-white/90 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <CardTitle>Monthly Ekadashi Celebrations</CardTitle>
                                            <CardDescription>Every eleventh day of the lunar cycle is specially celebrated</CardDescription>
                                        </div>
                                        <Button variant="outline" size="sm" className="text-orange-600 border-orange-300" onClick={downloadCalendar} disabled={calendarDownloading}>
                                            {calendarDownloading ? 'Downloading...' : <><Download className="h-4 w-4 mr-2" /> Monthly Calendar</>}
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {monthlyEvents.map((event, index) => {
                                            const IconComponent = iconMap[event.icon];
                                            return (
                                                <motion.div key={index} initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                                                    <Card className="hover:shadow-md transition-shadow">
                                                        <CardContent className="p-4 flex gap-4 items-start">
                                                            <div className="bg-orange-100 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0 mt-1">
                                                                {IconComponent && <IconComponent className="h-5 w-5 text-orange-600" />}
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="flex justify-between items-start">
                                                                    <h4 className="font-semibold mb-1">{event.name}</h4>
                                                                    <Badge variant="outline" className="text-xs border-orange-200">{event.frequency}</Badge>
                                                                </div>
                                                                <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                                                                <div className="flex items-center text-sm text-gray-500">
                                                                    <Clock className="h-4 w-4 mr-1" /> {event.time}
                                                                    {event.location && (<><span className="mx-2">•</span><MapPin className="h-4 w-4 mr-1" />{event.location}</>)}
                                                                </div>
                                                                {event.upcomingDates && (
                                                                    <div className="mt-3">
                                                                        <p className="text-xs text-gray-500 mb-1">Upcoming dates:</p>
                                                                        <div className="flex flex-wrap gap-2">
                                                                            {event.upcomingDates.map((date, i) => (<Badge key={i} variant="outline" className="text-xs">{date}</Badge>))}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </TabsContent>

                    {/* CORRECTED: Content for Special Rituals Tab */}
                    <TabsContent value="special">
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mt-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                {specialRituals.map((ritual, index) => {
                                    const IconComponent = iconMap[ritual.icon];
                                    return (
                                        <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                                            <Card className="h-full border border-orange-200 bg-white/90 backdrop-blur-sm group hover:shadow-md">
                                                <CardHeader className="pb-4">
                                                    <CardTitle className="flex items-center gap-3">
                                                        <div className="bg-orange-100 p-2 rounded-full group-hover:bg-orange-200 transition-colors">
                                                            {IconComponent && <IconComponent className="h-5 w-5 text-orange-600" />}
                                                        </div>
                                                        <div>
                                                            {ritual.name}
                                                            <span className="block text-sm font-normal text-gray-500 mt-1">{ritual.season}</span>
                                                        </div>
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-gray-600 mb-4">{ritual.description}</p>
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {ritual.tags.map((tag, i) => (<Badge key={i} variant="outline" className="text-xs">{tag}</Badge>))}
                                                    </div>
                                                    {ritual.note && (
                                                        <div className="mt-4 p-3 bg-orange-50 rounded-md text-sm text-orange-800 flex items-start gap-2">
                                                            <span className="bg-orange-100 p-1 rounded-full"><Plus className="h-3 w-3 text-orange-600" /></span>
                                                            <span>{ritual.note}</span>
                                                        </div>
                                                    )}
                                                </CardContent>
                                                <CardFooter className="pt-4 flex justify-between">
                                                    <div className="text-sm text-gray-500">{ritual.frequency}</div>
                                                    <Button variant="outline" size="sm" className="text-orange-600 border-orange-300" onClick={() => handleShare(ritual)}>
                                                        <Share2 className="h-4 w-4 mr-2" /> Share
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        </motion.div>
                                    );
                                })}
                            </div>
                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} className="mt-8">
                                <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-3"><Music className="h-6 w-6 text-orange-600" /><span>Daily Temple Rituals</span></CardTitle>
                                        <CardDescription>The temple follows a strict schedule of rituals throughout the day</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            {dailyRituals.map((ritual, i) => (
                                                <div key={i} className="p-3 bg-white/50 rounded-lg border border-orange-100">
                                                    <div className="font-medium text-orange-700">{ritual.time}</div>
                                                    <div className="text-sm text-gray-600">{ritual.name}</div>
                                                    {ritual.description && (<div className="text-xs text-gray-500 mt-1">{ritual.description}</div>)}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </motion.div>
                    </TabsContent>
                </Tabs>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mt-12">
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                         <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white shadow-md" onClick={downloadSchedule} disabled={scheduleDownloading}>
                            {scheduleDownloading ? (
                                <><svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Downloading...</>
                            ) : (
                                <>Download Full Schedule <Download className="ml-2 h-5 w-5" /></>
                            )}
                        </Button>
                         <Button variant="link" className="text-orange-600 p-0 h-auto self-center" onClick={contactGuides}>
                            Contact Guides <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}