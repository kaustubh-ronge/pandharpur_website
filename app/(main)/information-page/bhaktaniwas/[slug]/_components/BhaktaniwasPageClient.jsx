
"use client";

import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

// ICONS
import {
    MapPin, Phone, CheckCircle, Users, Globe, ChevronRight, Sparkles, Building, Train,
    Clock, Calendar, Wifi, Car, Utensils, Coffee, Home,
    Bath
} from "lucide-react";

// --- SHADCN UI IMPORTS ---
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

function Breadcrumbs({ itemName }) {
    return (
        <nav className="flex items-center text-sm font-medium text-stone-500 mb-6">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1.5" />
            <Link href="/information-page/bhaktaniwas" className="hover:text-orange-600 transition-colors">Bhaktaniwas</Link>
            <ChevronRight className="h-4 w-4 mx-1.5" />
            <span className="text-stone-700 font-semibold">{itemName}</span>
        </nav>
    );
}

function GallerySlider({ images = [], itemName }) {
    const validImages = images?.filter(Boolean) || [];
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto slide functionality
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
            {/* Slides container */}
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
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="rounded-xl"
                        />
                    </div>
                ))}
            </div>

            {/* Navigation dots */}
            {validImages.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {validImages.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goToSlide(idx)}
                            className={`w-3 h-3 rounded-full transition-all ${idx === currentSlide
                                    ? 'bg-orange-500 scale-110'
                                    : 'bg-white/80 hover:bg-white'
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
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

function OverviewSection({ item }) {
    return (
        <div className="mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-white shadow-md border-stone-200 transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-2xl font-bold text-stone-800 flex items-center gap-2">
                            <Home className="h-6 w-6 text-orange-500" /> About this Bhaktaniwas
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
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-orange-500" /> Top Facilities
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {item.facilities?.slice(0, 4).map(facility => (
                                <div key={facility} className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" /> <span>{facility}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md border-stone-200 transition-all duration-300 hover:shadow-lg">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
                                <Users className="h-5 w-5 text-orange-500" /> Key Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {item.managedBy && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <span className="font-bold w-24">Managed By:</span> <span>{item.managedBy}</span>
                                </div>
                            )}
                            {item.capacity && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <span className="font-bold w-24">Capacity:</span> <span>{item.capacity}</span>
                                </div>
                            )}
                            {item.checkInTime && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <Clock className="h-4 w-4 text-stone-500 flex-shrink-0" />
                                    <span className="font-bold w-20">Check-in:</span> <span>{item.checkInTime}</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md border-stone-200 transition-all duration-300 hover:shadow-lg">
                        <CardHeader className="pb-4">
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
                            {item.email && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <span className="font-bold w-24">Email:</span>
                                    <a href={`mailto:${item.email}`} className="hover:underline hover:text-orange-600 transition-colors">{item.email}</a>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function BookingBar({ item }) {
    const bookingInfo = {
        'online': { text: 'Online Booking Available', color: 'bg-green-100 text-green-800 border-green-200' },
        'offline': { text: 'Offline / On-site Booking Only', color: 'bg-amber-100 text-amber-800 border-amber-200' },
        'walk-in': { text: 'First-Come, First-Served', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    }[item.bookingType];

    return (
        <Card className="mt-10 bg-white shadow-md border-stone-200">
            <div className="flex flex-col md:flex-row justify-between items-center p-6 gap-4">
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-stone-900">Booking Information</h3>
                    {bookingInfo && (
                        <Badge className={`mt-2 font-semibold text-base py-1.5 px-3 ${bookingInfo.color} border`}>
                            {bookingInfo.text}
                        </Badge>
                    )}
                </div>
                {item.bookingType === 'online' && item.website && (
                    <Button asChild size="lg" className="font-bold bg-orange-600 hover:bg-orange-700 text-white text-base shadow-md hover:shadow-lg transition-all">
                        <a href={item.website} target="_blank" rel="noopener noreferrer">
                            <Globe className="mr-2 h-5 w-5" />
                            Visit Booking Website
                        </a>
                    </Button>
                )}
                {(item.bookingType === 'offline' || item.bookingType === 'walk-in') && (
                    <Button asChild size="lg" className="font-bold bg-stone-800 hover:bg-stone-900 text-white text-base shadow-md hover:shadow-lg transition-all">
                        <a href={`tel:${item.phoneNumber}`}>
                            <Phone className="mr-2 h-5 w-5" />
                            Call for Information
                        </a>
                    </Button>
                )}
            </div>
        </Card>
    );
}

function NearbySites() {
    const sites = [
        { name: "Vithoba Temple", distance: "Short walk", icon: <Building className="h-6 w-6 text-orange-500" /> },
        { name: "Chandrabhaga Ghat", distance: "5 min walk", icon: <Sparkles className="h-6 w-6 text-orange-500" /> },
        { name: "Pandharpur Station", distance: "10 min drive", icon: <Train className="h-6 w-6 text-orange-500" /> }
    ];

    return (
        <div className="mt-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Nearby Sites</h2>
            <p className="text-stone-600 mb-6">Popular places near this Bhaktaniwas</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sites.map(site => (
                    <Card key={site.name} className="bg-white shadow-md border-stone-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <CardContent className="flex items-center gap-4 p-6">
                            <div className="bg-orange-100 p-3 rounded-full">
                                {site.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-stone-800">{site.name}</h4>
                                <p className="text-sm text-stone-500">{site.distance} away</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

function FacilityIcons({ facility }) {
    const iconMap = {
        'wifi': <Wifi className="h-5 w-5 text-blue-500" />,
        'parking': <Car className="h-5 w-5 text-green-500" />,
        'food': <Utensils className="h-5 w-5 text-amber-500" />,
        'ac': <Bath className="h-5 w-5 text-purple-500" />,
        'hot water': <Coffee className="h-5 w-5 text-red-500" />,
    };

    const defaultIcon = <CheckCircle className="h-5 w-5 text-green-500" />;

    return iconMap[facility.toLowerCase()] || defaultIcon;
}

// --- Main Client Component ---
export default function BhaktaniwasPageClient({ item }) {
    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <AnimatedSection className="mb-10">
                    <header>
                        <Breadcrumbs itemName={item.name} />
                        <div className="mt-4">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight">{item.name}</h1>
                            <div className="mt-4 flex items-center flex-wrap gap-x-6 gap-y-2 text-stone-600">
                                {item.isFeatured && (
                                    <Badge className="text-base font-bold gap-1.5 py-1.5 px-3 bg-amber-400 text-amber-900 border border-amber-500">
                                        <Sparkles className="h-4 w-4" /> Featured
                                    </Badge>
                                )}
                                {item.managedBy && (
                                    <Badge className="text-base font-bold gap-1.5 py-1.5 px-3 bg-stone-200 text-stone-800 border border-stone-300">
                                        Managed By: {item.managedBy}
                                    </Badge>
                                )}
                                <p className="flex items-center gap-2 font-medium"><MapPin className="h-5 w-5 text-stone-400" /> {item.address}</p>
                            </div>
                        </div>
                    </header>
                </AnimatedSection>

                <AnimatedSection className="mb-12">
                    {/* Updated layout with main image on left, gallery on right, and map below */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* Left column - Main image */}
                        <div className="w-full">
                            <MainImage src={item.image} alt={`Main image of ${item.name}`} />
                        </div>

                        {/* Right column - Gallery slider */}
                        <div className="w-full h-full min-h-[400px]">
                            <GallerySlider images={item.gallery} itemName={item.name} />
                        </div>
                    </div>

                    {/* Map spanning both columns */}
                    <div className="rounded-xl overflow-hidden shadow-md border border-stone-200">
                        {item.googleMapsEmbedUrl ? (
                            <iframe
                                src={item.googleMapsEmbedUrl}
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
                    <BookingBar item={item} />
                </AnimatedSection>

                <AnimatedSection className="mb-12">
                    <OverviewSection item={item} />
                </AnimatedSection>

                <AnimatedSection className="mb-12">
                    <div className="bg-white rounded-xl shadow-md p-6 border border-stone-200">
                        <h2 className="text-3xl font-bold text-stone-800 mb-6">Full Details</h2>
                        <Tabs defaultValue="facilities" className="w-full">
                            <TabsList className="bg-stone-100 p-1 h-auto">
                                <TabsTrigger value="facilities" className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 px-4">All Facilities</TabsTrigger>
                                <TabsTrigger value="contact" className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 px-4">Contact & Info</TabsTrigger>
                                <TabsTrigger value="policies" className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 px-4">Policies</TabsTrigger>
                            </TabsList>
                            <TabsContent value="facilities" className="mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {item.facilities?.map(facility => (
                                        <div key={facility} className="flex items-center gap-3 text-base font-medium text-stone-700 bg-stone-50 p-3 rounded-lg">
                                            <FacilityIcons facility={facility} />
                                            <span>{facility}</span>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="contact" className="mt-6">
                                <div className="space-y-4 text-stone-700">
                                    {item.phoneNumber && <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-orange-500" /> <a href={`tel:${item.phoneNumber}`} className="font-medium hover:underline hover:text-orange-600 transition-colors">{item.phoneNumber}</a></p>}
                                    {item.email && <p className="flex items-center gap-3"><span className="font-medium w-24">Email:</span> <a href={`mailto:${item.email}`} className="font-medium hover:underline hover:text-orange-600 transition-colors">{item.email}</a></p>}
                                    {item.website && <p className="flex items-center gap-3"><Globe className="h-5 w-5 text-orange-500" /> <a href={item.website} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline hover:text-orange-600 transition-colors">Official Website</a></p>}
                                    {item.address && <p className="flex items-center gap-3"><MapPin className="h-5 w-5 text-orange-500" /> <span className="font-medium">{item.address}</span></p>}
                                </div>
                            </TabsContent>
                            <TabsContent value="policies" className="mt-6">
                                <div className="space-y-4 text-stone-700">
                                    <p className="text-stone-500">Policies information will be displayed here.</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </AnimatedSection>

                <AnimatedSection className="mb-12">
                    <Separator className="my-12 bg-stone-200" />
                    <NearbySites />
                </AnimatedSection>
            </div>
        </div>
    );
}