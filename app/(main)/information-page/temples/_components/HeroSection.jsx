
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState, useEffect } from "react";

// Static data for the slider
const sliderImages = [
    "/mandirpandharpur.jpg",
    "/pandharpurmandir2.webp",
    "/pandharpurtemple1.jpg",
];

export default function HeroSection() {
    const [api, setApi] = useState();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        // Set initial slide and listen for changes
        setCurrent(api.selectedScrollSnap());

        const onSelect = () => {
            setCurrent(api.selectedScrollSnap());
        };
        api.on("select", onSelect);
        
        // Autoplay interval
        const interval = setInterval(() => {
            if (api.canScrollNext()) {
                api.scrollNext();
            } else {
                api.scrollTo(0);
            }
        }, 4000);

        return () => {
            api.off("select", onSelect);
            clearInterval(interval);
        };
    }, [api]);

    return (
        <section className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 gap-8 bg-gradient-to-t from-orange-100 to-orange-50 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div className="absolute top-10 left-10 w-24 h-24 bg-orange-200 rounded-full opacity-30" animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 6 }} />
                <motion.div className="absolute bottom-20 right-20 w-20 h-20 bg-orange-300 rounded-full opacity-20" animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 5 }} />
                <motion.div className="absolute top-20 left-60 w-32 h-32 bg-orange-400 rounded-full opacity-25" animate={{ y: [0, 25, 0] }} transition={{ repeat: Infinity, duration: 7 }} />
            </div>

            {/* Text content */}
            <div className="md:w-1/2 text-left z-10">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Shri Vitthal Rukmini Mandir</h1>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
                    <h2 className="text-lg text-orange-600 font-semibold mb-3">
                        The heart of Pandharpur&apos;s spiritual life.
                    </h2>
                    <div className="text-gray-700 mb-4">
                        The Vitthal-Rukmini Temple, located in Pandharpur, Maharashtra, is a prominent Hindu pilgrimage site dedicated to Lord Vitthal (a form of Lord Krishna) and his consort Rukmini.
                    </div>
                </motion.div>
            </div>

            {/* Image Carousel */}
            <div className="md:w-1/2 z-10 w-full max-w-lg mx-auto">
                <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
                    <CarouselContent>
                        {sliderImages.map((image, index) => (
                            <CarouselItem key={index}>
                                {/* Removed the 'p-1' from this div */}
                                <div> 
                                    <Card className="overflow-hidden rounded-xl shadow-lg">
                                        <CardContent className="relative flex aspect-video items-center justify-center p-0">
                                            <Image
                                                src={image}
                                                alt={`Temple image ${index + 1}`}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                priority={index === 0}
                                            />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2 bg-orange-500/80 hover:bg-orange-500 text-white border-none" />
                    <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2 bg-orange-500/80 hover:bg-orange-500 text-white border-none" />
                </Carousel>
                
                {/* Dot Indicators */}
                <div className="flex justify-center gap-2 mt-4">
                    {sliderImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => api?.scrollTo(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${index === current ? 'w-6 bg-orange-500' : 'w-2 bg-orange-200'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}