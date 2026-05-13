"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, Share2 } from "lucide-react";

export default function HighlightsCarousel({ highlights, handleShare }) {
    return (
        <section className="relative py-16 px-6 md:px-12 bg-gradient-to-b from-amber-50 to-white overflow-hidden">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div className="absolute top-1/4 left-1/4 w-32 h-32 bg-amber-200 rounded-full opacity-20" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} />
                <motion.div className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-amber-300 rounded-full opacity-15" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 7, delay: 0.5 }} />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-12">
                    <Badge variant="outline" className="mb-4 border-amber-400 text-amber-600 px-4 py-1.5">
                        <Star className="h-4 w-4 mr-2" /> Festival Highlights
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                        Moments of Divine Joy
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-600">
                        Witness the most beautiful and sacred moments from Pandharpur's festivals
                    </p>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                    <Carousel className="w-full">
                        <CarouselContent>
                            {highlights.map((highlight, index) => (
                                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                    <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }} className="p-1">
                                        <Card className="overflow-hidden border-amber-200 group">
                                            <div className="relative aspect-video overflow-hidden">
                                                <Image src={highlight.image} alt={highlight.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 flex flex-col justify-end">
                                                    <h3 className="text-white font-semibold text-lg">{highlight.title}</h3>
                                                    <p className="text-amber-200 text-sm">{highlight.event}</p>
                                                </div>
                                            </div>
                                            <CardContent className="p-4">
                                                <p className="text-gray-600 text-sm line-clamp-2 mb-3">{highlight.description}</p>
                                                <div className="flex items-center justify-between">
                                                    <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700" onClick={() => handleShare(highlight)}>
                                                        <Share2 className="h-4 w-4 mr-1" /> Share
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-2" />
                        <CarouselNext className="right-2" />
                    </Carousel>
                </motion.div>
            </div>
        </section>
    );
}