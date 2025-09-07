"use client";

import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

// ICONS (Adapted for Attractions)
import {
    MapPin, Phone, Globe, ChevronRight, Sparkles,
    Clock, Ticket, Landmark, Info
} from "lucide-react";

// --- SHADCN UI IMPORTS ---
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AmberBackground } from "@/components/AmberSharedBackground";

// --- ANIMATION WRAPPER (Re-used) ---
function AnimatedSection({ children, className = "" }) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.section>
    );
}


// --- UI SUB-COMPONENTS (Adapted for Attractions) ---

function Breadcrumbs({ itemName }) {
    return (
        <nav className="flex items-center text-sm font-medium text-stone-500 mb-6">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1.5" />
            <Link href="/other-attractions" className="hover:text-orange-600 transition-colors">Other Attractions</Link>
            <ChevronRight className="h-4 w-4 mx-1.5" />
            <span className="text-stone-700 font-semibold">{itemName}</span>
        </nav>
    );
}

function GallerySlider({ images = [], itemName }) {
    const validImages = images?.filter(Boolean) || [];
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (validImages.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % validImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [validImages.length]);

    const goToSlide = useCallback((index) => {
        setCurrentSlide(index);
    }, []);

    if (validImages.length === 0) return (
        <div className="bg-stone-100 rounded-xl flex items-center justify-center text-stone-500 h-full">
            <div className="text-center p-8">
                <Image src="/placeholder-image.svg" alt="No images" width={80} height={80} className="mx-auto opacity-50" />
                <p className="mt-4">No gallery images available</p>
            </div>
        </div>
    );

    return (
        <div className="relative h-full w-full overflow-hidden rounded-xl shadow-md">
            <div
                className="flex h-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {validImages.map((img, idx) => (
                    <div key={idx} className="flex-shrink-0 w-full relative">
                        <Image
                            src={img}
                            alt={`Gallery image ${idx + 1} of ${itemName}`}
                            fill
                            className="object-cover" // Ensure image covers the area
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                ))}
            </div>
            {validImages.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {validImages.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goToSlide(idx)}
                            className={`w-3 h-3 rounded-full transition-all ${idx === currentSlide ? 'bg-orange-500 scale-110' : 'bg-white/80 hover:bg-white'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// --- ENHANCED MainImage Component ---
// This component has been updated with the more granular aspect ratio conditions.
function MainImage({ src, alt }) {
    const [aspectRatioClass, setAspectRatioClass] = useState('aspect-[4/3]'); // Default aspect ratio
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!src) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        const img = new window.Image();
        img.src = src;

        img.onload = () => {
            const ratio = img.naturalWidth / img.naturalHeight;

            // --- Extended Conditions ---
            if (ratio > 2) setAspectRatioClass('aspect-[21/9]');      // Panoramic
            else if (ratio > 1.6) setAspectRatioClass('aspect-video');   // 16:9 Widescreen
            else if (ratio > 1.2) setAspectRatioClass('aspect-[4/3]');   // 4:3 Landscape
            else if (ratio > 0.9) setAspectRatioClass('aspect-square');  // Square-ish
            else if (ratio > 0.7) setAspectRatioClass('aspect-[3/4]');   // 3:4 Portrait
            else setAspectRatioClass('aspect-[9/16]');                 // 9:16 Tall Portrait

            setIsLoading(false);
        };

        img.onerror = () => {
            // Keep default aspect ratio on error
            setIsLoading(false);
        };

    }, [src]);

    return (
        <div className={`relative w-full ${aspectRatioClass} rounded-xl overflow-hidden shadow-md bg-stone-100`}>
            {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="animate-pulse text-stone-400">Loading image...</div>
                </div>
            ) : (
                <Image
                    src={src}
                    alt={alt}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="transition-opacity duration-300 opacity-0"
                    onLoadingComplete={(image) => image.classList.remove('opacity-0')}
                    priority
                />
            )}
        </div>
    );
}

function OverviewSection({ item }) {
    return (
        <div className="mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-white shadow-md border-stone-200 transition-all duration-300 hover:shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-stone-800 flex items-center gap-2">
                            <Landmark className="h-6 w-6 text-orange-500" /> About this Attraction
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[28rem] lg:h-auto overflow-y-auto scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-stone-100">
                        <div className="prose prose-stone max-w-none text-base leading-relaxed">
                            {item.detailedDescription ? <PortableText value={item.detailedDescription} /> : <p className="text-stone-500">No detailed information available.</p>}
                        </div>
                    </CardContent>
                </Card>
                <div className="flex flex-col gap-6">
                    <Card className="bg-white shadow-md border-stone-200 transition-all duration-300 hover:shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
                                <Info className="h-5 w-5 text-orange-500" /> Key Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {item.timings && (
                                <div className="flex items-start gap-3 text-stone-700 font-medium">
                                    <Clock className="h-5 w-5 text-stone-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <span className="font-bold block">Timings</span>
                                        <span>{item.timings}</span>
                                    </div>
                                </div>
                            )}
                            {item.entryFee && (
                                <div className="flex items-start gap-3 text-stone-700 font-medium">
                                    <Ticket className="h-5 w-5 text-stone-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <span className="font-bold block">Entry Fee</span>
                                        <span>{item.entryFee}</span>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    <Card className="bg-white shadow-md border-stone-200 transition-all duration-300 hover:shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
                                <Phone className="h-5 w-5 text-orange-500" /> Quick Contact
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {item.phoneNumber && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <Phone className="h-4 w-4 text-stone-500 flex-shrink-0" />
                                    <a href={`tel:${item.phoneNumber}`} className="hover:underline hover:text-orange-600 transition-colors">{item.phoneNumber}</a>
                                </div>
                            )}
                            {item.website && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <Globe className="h-4 w-4 text-stone-500 flex-shrink-0" />
                                    <a href={item.website} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-orange-600 transition-colors">Visit Website</a>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

// --- Main Client Component ---
export default function AttractionPageClient({ item }) {
    return (
        <div className="min-h-screen">
            <AmberBackground />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <AnimatedSection className="mb-10">
                    <header>
                        <Breadcrumbs itemName={item.name} />
                        <div className="mt-4">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight">{item.name}</h1>
                            <div className="mt-4 flex items-center flex-wrap gap-x-6 gap-y-2 text-stone-600">
                                {item.isFeatured && (
                                    <Badge className="text-base font-bold gap-1.5 py-1.5 px-3 bg-amber-400 text-amber-900 border border-amber-500">
                                        <Sparkles className="h-4 w-4" /> Featured Spot
                                    </Badge>
                                )}
                                {item.category && (
                                    <Badge className="text-base font-bold gap-1.5 py-1.5 px-3 bg-stone-200 text-stone-800 border border-stone-300">
                                        {item.category}
                                    </Badge>
                                )}
                                {item.address && <p className="flex items-center gap-2 font-medium"><MapPin className="h-5 w-5 text-stone-400" /> {item.address}</p>}
                            </div>
                        </div>
                    </header>
                </AnimatedSection>

                <AnimatedSection className="mb-12">
                    {/* --- UPDATED LAYOUT --- */}
                    {/* The fixed aspect ratio has been removed from the gallery's container to allow for */}
                    {/* dynamic alignment with the new MainImage component. */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="w-full">
                            <MainImage src={item.image} alt={`Main image of ${item.name}`} />
                        </div>

                        <div className="w-full h-full min-h-[300px] md:min-h-[400px] lg:min-h-full">
                            <GallerySlider images={item.gallery} itemName={item.name} />
                        </div>
                    </div>

                    <div className="rounded-xl overflow-hidden shadow-md border border-stone-200 mt-6">
                        {item.googleMapsEmbedUrl ? (
                            <iframe
                                src={item.googleMapsEmbedUrl}
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        ) : (
                            <div className="bg-stone-100 h-96 w-full flex flex-col items-center justify-center text-stone-400">
                                <MapPin className="h-12 w-12 mb-4 opacity-50" />
                                <p>Map not available</p>
                            </div>
                        )}
                    </div>
                </AnimatedSection>

                <AnimatedSection className="mb-12">
                    <OverviewSection item={item} />
                </AnimatedSection>

                <AnimatedSection>
                    <Separator className="my-12 bg-stone-200" />
                </AnimatedSection>
            </div>
        </div>
    );
}