"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Plane, Hotel, HandHeart, MapPin } from "lucide-react";
import visitInfo from "@/data/FestivalsPageData/visit";



export default function PlanVisitSection() {
    return (
        <section className="relative py-20 px-6 md:px-12 bg-blue-50/50">
            <div className="relative z-10 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <Badge variant="outline" className="mb-4 border-blue-400 text-blue-600 px-4 py-1.5">
                        <MapPin className="h-4 w-4 mr-2" />
                        Visitor Guide
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                        Plan Your Sacred Journey
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-600">
                        Essential information to help you plan a smooth and spiritually fulfilling visit to Pandharpur.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {visitInfo.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3">
                                        <div className="bg-blue-100 p-3 rounded-full">
                                            <item.icon className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <span>{item.title}</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">{item.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}