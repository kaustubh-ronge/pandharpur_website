
"use client";

import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

// ICONS
import {
    MapPin, Phone, Clock, CalendarDays, Globe, ChevronRight, Sparkles, Building,
    ChevronLeft, ChevronRightIcon, Star
} from "lucide-react";

// --- SHADCN UI IMPORTS ---
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

// --- ANIMATION WRAPPER ---
function AnimatedSection({ children }) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {children}
        </motion.section>
    );
}

// --- ENHANCED GALLERY SLIDER (from hotels page) ---
function GallerySlider({ images = [], templeName }) {
    const validImages = images?.filter(img => img && typeof img === 'string' && img.trim() !== '') || [];
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-rotate images
    useEffect(() => {
        if (validImages.length <= 1) return;
        
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === validImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000);

        return () => clearInterval(interval);
    }, [validImages.length]);

    const goToNext = useCallback(() => {
        setCurrentIndex(currentIndex === validImages.length - 1 ? 0 : currentIndex + 1);
    }, [currentIndex, validImages.length]);

    const goToPrev = useCallback(() => {
        setCurrentIndex(currentIndex === 0 ? validImages.length - 1 : currentIndex - 1);
    }, [currentIndex, validImages.length]);

    const goToImage = (index) => {
        setCurrentIndex(index);
    };

    if (validImages.length === 0) {
        return (
            <div className="bg-amber-100/50 rounded-lg flex items-center justify-center text-stone-500 h-full">
                <div className="text-center">
                    <div className="mx-auto bg-amber-200 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-3">
                        <Sparkles className="h-8 w-8 text-amber-600" />
                    </div>
                    <p className="font-medium">No gallery images available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-full w-full overflow-hidden rounded-xl group">
            <div className="relative h-full w-full">
                {validImages.map((img, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <Image
                            src={img}
                            alt={`Gallery image ${idx + 1} of ${templeName}`}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={idx === 0}
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            {validImages.length > 1 && (
                <>
                    <button
                        onClick={goToPrev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-stone-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 border border-amber-200"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-stone-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 border border-amber-200"
                        aria-label="Next image"
                    >
                        <ChevronRightIcon className="h-5 w-5" />
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {validImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                    {validImages.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goToImage(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-amber-600' : 'w-2 bg-white/90'}`}
                            aria-label={`Go to image ${idx + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Image Counter */}
            {validImages.length > 1 && (
                <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-10">
                    {currentIndex + 1} / {validImages.length}
                </div>
            )}
        </div>
    );
}

// --- UI SUB-COMPONENTS ---

function Breadcrumbs({ templeName }) {
    return (
        <nav className="flex items-center text-sm font-medium text-stone-500">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1.5" />
            <Link href="/temples" className="hover:text-orange-600">Temples</Link>
            <ChevronRight className="h-4 w-4 mx-1.5" />
            <span className="text-stone-700 font-semibold">{templeName}</span>
        </nav>
    );
}

function TempleOverviewSection({ temple }) {
    return (
        <div className="mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-white/70 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-stone-800">History & Significance</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[28rem] lg:h-auto overflow-y-auto scrollbar-thin scrollbar-thumb-amber-300">
                        <div className="prose prose-stone max-w-none text-base leading-relaxed">
                            {temple.historyAndSignificance ? <PortableText value={temple.historyAndSignificance} /> : <p>No detailed history available.</p>}
                        </div>
                    </CardContent>
                </Card>

                <div className="flex flex-col gap-4">
                    <Card className="flex-1 bg-white/70 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-orange-500" /> Major Festivals
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {temple.majorFestivals?.slice(0, 2).map(festival => (
                                <div key={festival} className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <CalendarDays className="h-4 w-4 text-green-600" /> <span>{festival}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="flex-1 bg-white/70 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
                                <Building className="h-5 w-5 text-orange-500" /> Key Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {temple.presidingDeity && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <span className="font-bold w-24">Main Deity:</span> <span>{temple.presidingDeity}</span>
                                </div>
                            )}
                            {temple.address && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <span className="font-bold w-24">Location:</span> <span>{temple.address}</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="flex-1 bg-white/70 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
                                <Phone className="h-5 w-5 text-orange-500" /> Quick Contact
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {temple.phoneNumber && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <Phone className="h-4 w-4 text-stone-500" />
                                    <a href={`tel:${temple.phoneNumber}`} className="hover:underline">{temple.phoneNumber}</a>
                                </div>
                            )}
                             {temple.website && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <Globe className="h-4 w-4 text-stone-500" />
                                    <a href={temple.website} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">Official Website</a>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function InfoBar({ temple }) {
    return (
        <Card className="mt-10 bg-white/70 backdrop-blur-sm border-amber-200/60">
            <div className="flex flex-col md:flex-row justify-between items-center p-6 gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-stone-900 flex items-center gap-3"><Clock className="h-6 w-6"/>Darshan Timings</h3>
                    <p className="text-stone-500 mt-1">Plan your visit to seek blessings.</p>
                </div>
                {temple.darshanTimings && (
                    <div className="prose prose-sm text-stone-700 font-semibold text-right">
                        <PortableText value={temple.darshanTimings} />
                    </div>
                )}
            </div>
        </Card>
    );
}

// --- Main Client Component ---
export default function TemplePageClient({ temple }) {
    return (
        <div className="bg-amber-50 bg-[url('/pandharpur-motif.svg')] bg-repeat">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <AnimatedSection>
                    <header className="mb-8">
                        <Breadcrumbs templeName={temple.name} />
                        <div className="mt-4">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight">{temple.name}</h1>
                            <div className="mt-4 flex items-center flex-wrap gap-x-6 gap-y-2 text-stone-600">
                                {temple.presidingDeity && (
                                    <Badge className="text-base font-bold gap-1.5 py-1 px-3 bg-amber-200/80 text-amber-900 border border-amber-300">
                                        Deity: {temple.presidingDeity}
                                    </Badge>
                                )}
                                <p className="flex items-center gap-2 font-medium"><MapPin className="h-5 w-5 text-stone-400" /> {temple.address}</p>
                            </div>
                        </div>
                    </header>
                </AnimatedSection>

                <AnimatedSection>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
                        <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg">
                            <Image src={temple.image} alt={`Main image of ${temple.name}`} fill style={{ objectFit: 'cover' }} priority />
                        </div>
                        <div className="h-full w-full flex flex-col gap-6">
                            <div className="flex-1 rounded-xl overflow-hidden shadow-lg">
                                <GallerySlider images={temple.gallery} templeName={temple.name} />
                            </div>
                            <div className="flex-1 rounded-xl overflow-hidden shadow-lg border border-amber-200/60">
                                {temple.googleMapsEmbedUrl ? (
                                    <iframe src={temple.googleMapsEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                ) : (
                                    <div className="bg-amber-100/50 h-full w-full flex items-center justify-center text-stone-400">Map not available</div>
                                )}
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection>
                    <InfoBar temple={temple} />
                </AnimatedSection>

                <AnimatedSection>
                    <TempleOverviewSection temple={temple} />
                </AnimatedSection>

                <AnimatedSection>
                    <div className="mt-12">
                        <h2 className="text-3xl font-bold text-stone-800">Full Details</h2>
                        <Tabs defaultValue="timings" className="mt-4">
                            <TabsList className="bg-amber-200/60">
                                <TabsTrigger value="timings">Darshan Timings</TabsTrigger>
                                <TabsTrigger value="festivals">Festivals</TabsTrigger>
                                <TabsTrigger value="contact">Contact & Location</TabsTrigger>
                            </TabsList>
                            <TabsContent value="timings" className="p-6 bg-white/70 backdrop-blur-sm rounded-b-lg rounded-tr-lg border border-amber-200/60 border-t-0 prose prose-stone">
                                <PortableText value={temple.darshanTimings} />
                            </TabsContent>
                            <TabsContent value="festivals" className="p-0 bg-white/70 backdrop-blur-sm rounded-b-lg rounded-tr-lg border border-amber-200/60 border-t-0">
                                <Table>
                                    <TableHeader className="bg-amber-100/50">
                                        <TableRow>
                                            <TableHead className="font-bold text-stone-800">Festival Name</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {temple.majorFestivals?.map((festival, i) => (
                                            <TableRow key={i} className="border-amber-200/60">
                                                <TableCell className="font-semibold text-stone-800">{festival}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                            <TabsContent value="contact" className="p-6 bg-white/70 backdrop-blur-sm rounded-b-lg rounded-tr-lg border border-amber-200/60 border-t-0">
                                <div className="space-y-4 text-stone-700">
                                    {temple.phoneNumber && <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-orange-500" /> <a href={`tel:${temple.phoneNumber}`} className="font-medium hover:underline">{temple.phoneNumber}</a></p>}
                                    {temple.website && <p className="flex items-center gap-3"><Globe className="h-5 w-5 text-orange-500" /> <a href={temple.website} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">Official Website</a></p>}
                                    {temple.address && <p className="flex items-center gap-3"><MapPin className="h-5 w-5 text-orange-500" /> <span className="font-medium">{temple.address}</span></p>}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
}