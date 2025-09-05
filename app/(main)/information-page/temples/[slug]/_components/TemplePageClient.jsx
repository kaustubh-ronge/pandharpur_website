
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { PortableText } from "@portabletext/react";
// import { motion } from "framer-motion";
// import { useState, useEffect, useCallback } from "react";

// // ICONS
// import {
//     MapPin, Phone, Clock, CalendarDays, Globe, ChevronRight, Sparkles, Building,
//     ChevronLeft, ChevronRightIcon, Star
// } from "lucide-react";

// // --- SHADCN UI IMPORTS ---
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Separator } from "@/components/ui/separator";

// // --- ANIMATION WRAPPER ---
// function AnimatedSection({ children }) {
//     return (
//         <motion.section
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.2 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//         >
//             {children}
//         </motion.section>
//     );
// }

// // --- ENHANCED GALLERY SLIDER (from hotels page) ---
// function GallerySlider({ images = [], templeName }) {
//     const validImages = images?.filter(img => img && typeof img === 'string' && img.trim() !== '') || [];
//     const [currentIndex, setCurrentIndex] = useState(0);

//     // Auto-rotate images
//     useEffect(() => {
//         if (validImages.length <= 1) return;
        
//         const interval = setInterval(() => {
//             setCurrentIndex((prevIndex) => 
//                 prevIndex === validImages.length - 1 ? 0 : prevIndex + 1
//             );
//         }, 4000);

//         return () => clearInterval(interval);
//     }, [validImages.length]);

//     const goToNext = useCallback(() => {
//         setCurrentIndex(currentIndex === validImages.length - 1 ? 0 : currentIndex + 1);
//     }, [currentIndex, validImages.length]);

//     const goToPrev = useCallback(() => {
//         setCurrentIndex(currentIndex === 0 ? validImages.length - 1 : currentIndex - 1);
//     }, [currentIndex, validImages.length]);

//     const goToImage = (index) => {
//         setCurrentIndex(index);
//     };

//     if (validImages.length === 0) {
//         return (
//             <div className="bg-amber-100/50 rounded-lg flex items-center justify-center text-stone-500 h-full">
//                 <div className="text-center">
//                     <div className="mx-auto bg-amber-200 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-3">
//                         <Sparkles className="h-8 w-8 text-amber-600" />
//                     </div>
//                     <p className="font-medium">No gallery images available</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="relative h-full w-full overflow-hidden rounded-xl group">
//             <div className="relative h-full w-full">
//                 {validImages.map((img, idx) => (
//                     <div
//                         key={idx}
//                         className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === currentIndex ? 'opacity-100' : 'opacity-0'}`}
//                     >
//                         <Image
//                             src={img}
//                             alt={`Gallery image ${idx + 1} of ${templeName}`}
//                             fill
//                             style={{ objectFit: 'cover' }}
//                             sizes="(max-width: 768px) 100vw, 50vw"
//                             priority={idx === 0}
//                         />
//                     </div>
//                 ))}
//             </div>

//             {/* Navigation Arrows */}
//             {validImages.length > 1 && (
//                 <>
//                     <button
//                         onClick={goToPrev}
//                         className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-stone-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 border border-amber-200"
//                         aria-label="Previous image"
//                     >
//                         <ChevronLeft className="h-5 w-5" />
//                     </button>
//                     <button
//                         onClick={goToNext}
//                         className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-stone-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 border border-amber-200"
//                         aria-label="Next image"
//                     >
//                         <ChevronRightIcon className="h-5 w-5" />
//                     </button>
//                 </>
//             )}

//             {/* Dots Indicator */}
//             {validImages.length > 1 && (
//                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
//                     {validImages.map((_, idx) => (
//                         <button
//                             key={idx}
//                             onClick={() => goToImage(idx)}
//                             className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-amber-600' : 'w-2 bg-white/90'}`}
//                             aria-label={`Go to image ${idx + 1}`}
//                         />
//                     ))}
//                 </div>
//             )}

//             {/* Image Counter */}
//             {validImages.length > 1 && (
//                 <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-10">
//                     {currentIndex + 1} / {validImages.length}
//                 </div>
//             )}
//         </div>
//     );
// }

// // --- UI SUB-COMPONENTS ---

// function Breadcrumbs({ templeName }) {
//     return (
//         <nav className="flex items-center text-sm font-medium text-stone-500">
//             <Link href="/" className="hover:text-orange-600">Home</Link>
//             <ChevronRight className="h-4 w-4 mx-1.5" />
//             <Link href="/temples" className="hover:text-orange-600">Temples</Link>
//             <ChevronRight className="h-4 w-4 mx-1.5" />
//             <span className="text-stone-700 font-semibold">{templeName}</span>
//         </nav>
//     );
// }

// function TempleOverviewSection({ temple }) {
//     return (
//         <div className="mt-12">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 <Card className="bg-white/70 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
//                     <CardHeader>
//                         <CardTitle className="text-2xl font-bold text-stone-800">History & Significance</CardTitle>
//                     </CardHeader>
//                     <CardContent className="h-[28rem] lg:h-auto overflow-y-auto scrollbar-thin scrollbar-thumb-amber-300">
//                         <div className="prose prose-stone max-w-none text-base leading-relaxed">
//                             {temple.historyAndSignificance ? <PortableText value={temple.historyAndSignificance} /> : <p>No detailed history available.</p>}
//                         </div>
//                     </CardContent>
//                 </Card>

//                 <div className="flex flex-col gap-4">
//                     <Card className="flex-1 bg-white/70 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
//                         <CardHeader>
//                             <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
//                                 <Sparkles className="h-5 w-5 text-orange-500" /> Major Festivals
//                             </CardTitle>
//                         </CardHeader>
//                         <CardContent className="space-y-3">
//                             {temple.majorFestivals?.slice(0, 2).map(festival => (
//                                 <div key={festival} className="flex items-center gap-3 text-stone-700 text-sm font-medium">
//                                     <CalendarDays className="h-4 w-4 text-green-600" /> <span>{festival}</span>
//                                 </div>
//                             ))}
//                         </CardContent>
//                     </Card>

//                     <Card className="flex-1 bg-white/70 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
//                         <CardHeader>
//                             <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
//                                 <Building className="h-5 w-5 text-orange-500" /> Key Information
//                             </CardTitle>
//                         </CardHeader>
//                         <CardContent className="space-y-3">
//                             {temple.presidingDeity && (
//                                 <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
//                                     <span className="font-bold w-24">Main Deity:</span> <span>{temple.presidingDeity}</span>
//                                 </div>
//                             )}
//                             {temple.address && (
//                                 <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
//                                     <span className="font-bold w-24">Location:</span> <span>{temple.address}</span>
//                                 </div>
//                             )}
//                         </CardContent>
//                     </Card>

//                     <Card className="flex-1 bg-white/70 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
//                         <CardHeader>
//                             <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
//                                 <Phone className="h-5 w-5 text-orange-500" /> Quick Contact
//                             </CardTitle>
//                         </CardHeader>
//                         <CardContent className="space-y-3">
//                             {temple.phoneNumber && (
//                                 <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
//                                     <Phone className="h-4 w-4 text-stone-500" />
//                                     <a href={`tel:${temple.phoneNumber}`} className="hover:underline">{temple.phoneNumber}</a>
//                                 </div>
//                             )}
//                              {temple.website && (
//                                 <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
//                                     <Globe className="h-4 w-4 text-stone-500" />
//                                     <a href={temple.website} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">Official Website</a>
//                                 </div>
//                             )}
//                         </CardContent>
//                     </Card>
//                 </div>
//             </div>
//         </div>
//     );
// }

// function InfoBar({ temple }) {
//     return (
//         <Card className="mt-10 bg-white/70 backdrop-blur-sm border-amber-200/60">
//             <div className="flex flex-col md:flex-row justify-between items-center p-6 gap-4">
//                 <div>
//                     <h3 className="text-2xl font-bold text-stone-900 flex items-center gap-3"><Clock className="h-6 w-6"/>Darshan Timings</h3>
//                     <p className="text-stone-500 mt-1">Plan your visit to seek blessings.</p>
//                 </div>
//                 {temple.darshanTimings && (
//                     <div className="prose prose-sm text-stone-700 font-semibold text-right">
//                         <PortableText value={temple.darshanTimings} />
//                     </div>
//                 )}
//             </div>
//         </Card>
//     );
// }

// // --- Main Client Component ---
// export default function TemplePageClient({ temple }) {
//     return (
//         <div className="bg-[url('/pandharpur-motif.svg')] bg-repeat">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
//                 <AnimatedSection>
//                     <header className="mb-8">
//                         <Breadcrumbs templeName={temple.name} />
//                         <div className="mt-4">
//                             <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight">{temple.name}</h1>
//                             <div className="mt-4 flex items-center flex-wrap gap-x-6 gap-y-2 text-stone-600">
//                                 {temple.presidingDeity && (
//                                     <Badge className="text-base font-bold gap-1.5 py-1 px-3 bg-amber-200/80 text-amber-900 border border-amber-300">
//                                         Deity: {temple.presidingDeity}
//                                     </Badge>
//                                 )}
//                                 <p className="flex items-center gap-2 font-medium"><MapPin className="h-5 w-5 text-stone-400" /> {temple.address}</p>
//                             </div>
//                         </div>
//                     </header>
//                 </AnimatedSection>

//                 <AnimatedSection>
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
//                         <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg">
//                             <Image src={temple.image} alt={`Main image of ${temple.name}`} fill style={{ objectFit: 'cover' }} priority />
//                         </div>
//                         <div className="h-full w-full flex flex-col gap-6">
//                             <div className="flex-1 rounded-xl overflow-hidden shadow-lg">
//                                 <GallerySlider images={temple.gallery} templeName={temple.name} />
//                             </div>
//                             <div className="flex-1 rounded-xl overflow-hidden shadow-lg border border-amber-200/60">
//                                 {temple.googleMapsEmbedUrl ? (
//                                     <iframe src={temple.googleMapsEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
//                                 ) : (
//                                     <div className="bg-amber-100/50 h-full w-full flex items-center justify-center text-stone-400">Map not available</div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </AnimatedSection>

//                 <AnimatedSection>
//                     <InfoBar temple={temple} />
//                 </AnimatedSection>

//                 <AnimatedSection>
//                     <TempleOverviewSection temple={temple} />
//                 </AnimatedSection>

//                 <AnimatedSection>
//                     <div className="mt-12">
//                         <h2 className="text-3xl font-bold text-stone-800">Full Details</h2>
//                         <Tabs defaultValue="timings" className="mt-4">
//                             <TabsList className="bg-amber-200/60">
//                                 <TabsTrigger value="timings">Darshan Timings</TabsTrigger>
//                                 <TabsTrigger value="festivals">Festivals</TabsTrigger>
//                                 <TabsTrigger value="contact">Contact & Location</TabsTrigger>
//                             </TabsList>
//                             <TabsContent value="timings" className="p-6 bg-white/70 backdrop-blur-sm rounded-b-lg rounded-tr-lg border border-amber-200/60 border-t-0 prose prose-stone">
//                                 <PortableText value={temple.darshanTimings} />
//                             </TabsContent>
//                             <TabsContent value="festivals" className="p-0 bg-white/70 backdrop-blur-sm rounded-b-lg rounded-tr-lg border border-amber-200/60 border-t-0">
//                                 <Table>
//                                     <TableHeader className="bg-amber-100/50">
//                                         <TableRow>
//                                             <TableHead className="font-bold text-stone-800">Festival Name</TableHead>
//                                         </TableRow>
//                                     </TableHeader>
//                                     <TableBody>
//                                         {temple.majorFestivals?.map((festival, i) => (
//                                             <TableRow key={i} className="border-amber-200/60">
//                                                 <TableCell className="font-semibold text-stone-800">{festival}</TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </TabsContent>
//                             <TabsContent value="contact" className="p-6 bg-white/70 backdrop-blur-sm rounded-b-lg rounded-tr-lg border border-amber-200/60 border-t-0">
//                                 <div className="space-y-4 text-stone-700">
//                                     {temple.phoneNumber && <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-orange-500" /> <a href={`tel:${temple.phoneNumber}`} className="font-medium hover:underline">{temple.phoneNumber}</a></p>}
//                                     {temple.website && <p className="flex items-center gap-3"><Globe className="h-5 w-5 text-orange-500" /> <a href={temple.website} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">Official Website</a></p>}
//                                     {temple.address && <p className="flex items-center gap-3"><MapPin className="h-5 w-5 text-orange-500" /> <span className="font-medium">{temple.address}</span></p>}
//                                 </div>
//                             </TabsContent>
//                         </Tabs>
//                     </div>
//                 </AnimatedSection>
//             </div>
//         </div>
//     );
// }


"use client";

import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

// ICONS
import {
    MapPin, Phone, Clock, CalendarDays, Globe, ChevronRight, Sparkles, Building,
    ChevronLeft, ChevronRightIcon, Star, Users, Home, CheckCircle
} from "lucide-react";

// --- SHADCN UI IMPORTS ---
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

// --- ANIMATION WRAPPER ---
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

// --- UI SUB-COMPONENTS ---

function Breadcrumbs({ templeName }) {
    return (
        <nav className="flex items-center text-sm font-medium text-stone-500 mb-6">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1.5" />
            <Link href="/temples" className="hover:text-orange-600 transition-colors">Temples</Link>
            <ChevronRight className="h-4 w-4 mx-1.5" />
            <span className="text-stone-700 font-semibold">{templeName}</span>
        </nav>
    );
}

// Enhanced Gallery Slider with dots and auto-slide
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
            <div className="bg-stone-100 rounded-xl flex items-center justify-center text-stone-500 h-full p-8">
                <div className="text-center">
                    <div className="mx-auto bg-stone-200 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-3">
                        <Sparkles className="h-8 w-8 text-stone-400" />
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
                            className="rounded-xl"
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            {validImages.length > 1 && (
                <>
                    <button
                        onClick={goToPrev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-stone-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 border border-stone-200"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-stone-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 border border-stone-200"
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
                            className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-orange-600' : 'w-2 bg-white/90'}`}
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

// Improved Main Image component with responsive sizing
function MainImage({ src, alt }) {
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!src) return;
        
        const img = new window.Image();
        img.src = src;
        img.onload = () => {
            setImageSize({ width: img.width, height: img.height });
            setIsLoading(false);
        };
        img.onerror = () => {
            setIsLoading(false);
        };
    }, [src]);

    // Calculate aspect ratio class
    const getAspectRatioClass = () => {
        if (!imageSize.width || !imageSize.height) return 'aspect-video';
        
        const ratio = imageSize.width / imageSize.height;
        
        if (ratio > 1.5) return 'aspect-video';        // Wide images
        if (ratio > 0.8 && ratio <= 1.5) return 'aspect-square'; // Square-ish images
        return 'aspect-[3/4]';                         // Tall images
    };

    return (
        <div className={`relative w-full ${getAspectRatioClass()} rounded-xl overflow-hidden shadow-md`}>
            {isLoading ? (
                <div className="w-full h-full bg-stone-100 flex items-center justify-center">
                    <div className="animate-pulse text-stone-400">Loading image...</div>
                </div>
            ) : (
                <Image
                    src={src}
                    alt={alt}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="rounded-xl transition-opacity duration-300 opacity-0"
                    onLoadingComplete={(image) => image.classList.remove('opacity-0')}
                    priority
                />
            )}
        </div>
    );
}

function TempleOverviewSection({ temple }) {
    return (
        <div className="mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-white shadow-md border-stone-200 transition-all duration-300 hover:shadow-lg rounded-xl overflow-hidden">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-2xl font-bold text-stone-800 flex items-center gap-2">
                            <Home className="h-6 w-6 text-orange-500" /> History & Significance
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[28rem] lg:h-auto overflow-y-auto scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-stone-100 p-6">
                        <div className="prose prose-stone max-w-none text-base leading-relaxed">
                            {temple.historyAndSignificance ? <PortableText value={temple.historyAndSignificance} /> : <p className="text-stone-500">No detailed history available.</p>}
                        </div>
                    </CardContent>
                </Card>

                <div className="flex flex-col gap-6">
                    <Card className="bg-white shadow-md border-stone-200 transition-all duration-300 hover:shadow-lg rounded-xl overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-orange-500" /> Major Festivals
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {temple.majorFestivals?.slice(0, 4).map(festival => (
                                <div key={festival} className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <CalendarDays className="h-4 w-4 text-green-600 flex-shrink-0" /> <span>{festival}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md border-stone-200 transition-all duration-300 hover:shadow-lg rounded-xl overflow-hidden">
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
                            {temple.architectureStyle && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <span className="font-bold w-24">Architecture:</span> <span>{temple.architectureStyle}</span>
                                </div>
                            )}
                            {temple.establishedYear && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <span className="font-bold w-24">Established:</span> <span>{temple.establishedYear}</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md border-stone-200 transition-all duration-300 hover:shadow-lg rounded-xl overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
                                <Phone className="h-5 w-5 text-orange-500" /> Quick Contact
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {temple.phoneNumber && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <Phone className="h-4 w-4 text-stone-500 flex-shrink-0" />
                                    <a href={`tel:${temple.phoneNumber}`} className="hover:underline hover:text-orange-600 transition-colors">{temple.phoneNumber}</a>
                                </div>
                            )}
                             {temple.website && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <Globe className="h-4 w-4 text-stone-500 flex-shrink-0" />
                                    <a href={temple.website} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-orange-600 transition-colors truncate">Official Website</a>
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
        <Card className="mt-10 bg-white shadow-md border-stone-200">
            <div className="flex flex-col md:flex-row justify-between items-center p-6 gap-4">
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-stone-900 flex items-center gap-3"><Clock className="h-6 w-6 text-orange-500"/> Darshan Timings</h3>
                    <p className="text-stone-600 mt-1">Plan your visit to seek blessings</p>
                </div>
                {temple.darshanTimings && (
                    <div className="prose prose-sm text-stone-700 font-semibold text-right bg-stone-50 p-4 rounded-lg border border-stone-200">
                        <PortableText value={temple.darshanTimings} />
                    </div>
                )}
            </div>
        </Card>
    );
}

function NearbyTemples() {
    const temples = [
        { name: "Vithoba Temple", distance: "1 km", deity: "Lord Vithoba" },
        { name: "Pundalik Temple", distance: "2 km", deity: "Saint Pundalik" },
        { name: "Vitthal-Rukmini Temple", distance: "3 km", deity: "Lord Vitthal and Goddess Rukmini" }
    ];

    return (
        <div className="mt-12 bg-stone-50 py-12 px-6 rounded-2xl border border-stone-200">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-stone-800 mb-2 text-center">Nearby Sacred Sites</h2>
                <p className="text-stone-600 mb-8 text-center">Other temples and spiritual places in the area</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {temples.map((temple, index) => (
                        <motion.div
                            key={temple.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-white border-stone-200 shadow-md transition-all duration-300 hover:shadow-lg h-full rounded-xl overflow-hidden">
                                <CardContent className="flex flex-col gap-4 p-6">
                                    <div className="bg-orange-100 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                                        <Building className="h-6 w-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-stone-800">{temple.name}</h4>
                                        <p className="text-sm text-stone-600">{temple.deity}</p>
                                        <p className="text-sm text-stone-500 mt-1">{temple.distance} away</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// --- Main Client Component ---
export default function TemplePageClient({ temple }) {
    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <AnimatedSection className="mb-10">
                    <header>
                        <Breadcrumbs templeName={temple.name} />
                        <div className="mt-4">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight">{temple.name}</h1>
                            <div className="mt-4 flex items-center flex-wrap gap-x-6 gap-y-2 text-stone-600">
                                {temple.presidingDeity && (
                                    <Badge className="text-base font-bold gap-1.5 py-1.5 px-3 bg-orange-500 text-white border-none rounded-full">
                                        Deity: {temple.presidingDeity}
                                    </Badge>
                                )}
                                {temple.architectureStyle && (
                                    <Badge variant="outline" className="text-stone-600 border-stone-400 rounded-full">
                                        {temple.architectureStyle} Architecture
                                    </Badge>
                                )}
                                <p className="flex items-center gap-2 font-medium"><MapPin className="h-5 w-5 text-stone-500" /> {temple.address}</p>
                            </div>
                        </div>
                    </header>
                </AnimatedSection>

                <AnimatedSection className="mb-12">
                    {/* Updated layout with main image on left, gallery on right, and map below */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* Left column - Main image */}
                        <div className="w-full">
                            <MainImage src={temple.image} alt={`Main image of ${temple.name}`} />
                        </div>
                        
                        {/* Right column - Gallery slider */}
                        <div className="w-full h-full min-h-[400px]">
                            <GallerySlider images={temple.gallery} templeName={temple.name} />
                        </div>
                    </div>
                    
                    {/* Map spanning both columns */}
                    <div className="rounded-xl overflow-hidden shadow-md border border-stone-200">
                        {temple.googleMapsEmbedUrl ? (
                            <iframe 
                                src={temple.googleMapsEmbedUrl} 
                                width="100%" 
                                height="400" 
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full"
                            ></iframe>
                        ) : (
                            <div className="bg-stone-100 h-96 w-full flex flex-col items-center justify-center text-stone-400">
                                <MapPin className="h-12 w-12 mb-4 opacity-50" />
                                <p>Map not available</p>
                            </div>
                        )}
                    </div>
                </AnimatedSection>

                <AnimatedSection className="mb-12">
                    <InfoBar temple={temple} />
                </AnimatedSection>

                <AnimatedSection className="mb-12">
                    <TempleOverviewSection temple={temple} />
                </AnimatedSection>

                <AnimatedSection className="mb-12">
                    <div className="bg-white rounded-xl shadow-md p-6 border border-stone-200">
                        <h2 className="text-3xl font-bold text-stone-800 mb-6">Full Details</h2>
                        <Tabs defaultValue="timings" className="mt-4">
                            <TabsList className="bg-stone-100 p-1 h-auto">
                                <TabsTrigger value="timings" className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 px-4">Darshan Timings</TabsTrigger>
                                <TabsTrigger value="festivals" className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 px-4">Festivals</TabsTrigger>
                                <TabsTrigger value="contact" className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 px-4">Contact & Location</TabsTrigger>
                            </TabsList>
                            <TabsContent value="timings" className="mt-6 p-6 bg-stone-50 rounded-lg border border-stone-200 prose prose-stone">
                                <PortableText value={temple.darshanTimings} />
                            </TabsContent>
                            <TabsContent value="festivals" className="mt-6 p-0 bg-stone-50 rounded-lg border border-stone-200">
                                <Table>
                                    <TableHeader className="bg-stone-100">
                                        <TableRow>
                                            <TableHead className="font-bold text-stone-800">Festival Name</TableHead>
                                            <TableHead className="font-bold text-stone-800">Time of Year</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {temple.majorFestivals?.map((festival, i) => (
                                            <TableRow key={i} className="border-stone-200 hover:bg-stone-50/50 transition-colors">
                                                <TableCell className="font-semibold text-stone-800">{festival}</TableCell>
                                                <TableCell className="text-stone-600">Varies annually</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                            <TabsContent value="contact" className="mt-6 p-6 bg-stone-50 rounded-lg border border-stone-200">
                                <div className="space-y-4 text-stone-700">
                                    {temple.phoneNumber && (
                                        <p className="flex items-center gap-3 p-3 bg-white rounded-lg border border-stone-200">
                                            <Phone className="h-5 w-5 text-orange-500 flex-shrink-0" /> 
                                            <a href={`tel:${temple.phoneNumber}`} className="font-medium hover:underline hover:text-orange-600 transition-colors">{temple.phoneNumber}</a>
                                        </p>
                                    )}
                                    {temple.website && (
                                        <p className="flex items-center gap-3 p-3 bg-white rounded-lg border border-stone-200">
                                            <Globe className="h-5 w-5 text-orange-500 flex-shrink-0" /> 
                                            <a href={temple.website} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline hover:text-orange-600 transition-colors">
                                                Official Website
                                            </a>
                                        </p>
                                    )}
                                    {temple.address && (
                                        <p className="flex items-center gap-3 p-3 bg-white rounded-lg border border-stone-200">
                                            <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0" /> 
                                            <span className="font-medium">{temple.address}</span>
                                        </p>
                                    )}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </AnimatedSection>

                <AnimatedSection className="mb-12">
                    <Separator className="my-12 bg-stone-200" />
                    <NearbyTemples />
                </AnimatedSection>
            </div>
        </div>
    );
}