
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
    Bath, Gem, ShieldCheck, ChevronLeft
} from "lucide-react";

// --- SHADCN UI IMPORTS ---
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { InquiryDrawer } from "@/components/InquiryForms/InquiryDrawer";

// --- (All sub-components like AnimatedSection, Breadcrumbs, etc. remain the same) ---

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

const SubscriptionBadgeHeader = ({ plan }) => {
    if (plan === 'premium') {
        return (
            <Badge className="text-base font-bold gap-1.5 py-1.5 px-3 bg-gradient-to-r from-amber-500 to-yellow-400 text-white border-none rounded-full shadow-lg shadow-yellow-500/30">
                <Gem className="h-5 w-5" /> PREMIUM LISTING
            </Badge>
        );
    }
    if (plan === 'standard') {
        return (
            <Badge className="text-base font-bold gap-1.5 py-1.5 px-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-none rounded-full shadow-md shadow-blue-500/20">
                <ShieldCheck className="h-5 w-5" /> STANDARD LISTING
            </Badge>
        );
    }
    return null;
};

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

    // Handlers for the arrow buttons
    const prevSlide = () => {
        const isFirstSlide = currentSlide === 0;
        const newIndex = isFirstSlide ? validImages.length - 1 : currentSlide - 1;
        setCurrentSlide(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentSlide === validImages.length - 1;
        const newIndex = isLastSlide ? 0 : currentSlide + 1;
        setCurrentSlide(newIndex);
    };

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
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="rounded-xl"
                        />
                    </div>
                ))}
            </div>

            {validImages.length > 1 && (
                <>
                    {/* =========== BUTTONS UPDATED WITH ORANGE BG AND HOVER EFFECT =========== */}
                    <button
                        onClick={prevSlide}
                        aria-label="Previous image"
                        className="absolute cursor-pointer top-1/2 left-3 -translate-y-1/2 z-10 p-2 bg-orange-500/80 text-white rounded-full hover:bg-orange-500 transition-colors"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        aria-label="Next image"
                        className="absolute cursor-pointer top-1/2 right-3 -translate-y-1/2 z-10 p-2 bg-orange-500/80 text-white rounded-full hover:bg-orange-500 transition-colors"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                    {/* ======================================================================= */}
                    
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
                </>
            )}
        </div>
    );
}

function MainImage({ src, alt }) {
    const [aspectRatioClass, setAspectRatioClass] = useState('aspect-[4/3]');
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
            if (ratio > 2) setAspectRatioClass('aspect-[21/9]');
            else if (ratio > 1.6) setAspectRatioClass('aspect-video');
            else if (ratio > 1.2) setAspectRatioClass('aspect-[4/3]');
            else if (ratio > 0.9) setAspectRatioClass('aspect-square');
            else if (ratio > 0.7) setAspectRatioClass('aspect-[3/4]');
            else setAspectRatioClass('aspect-[9/16]');
            setIsLoading(false);
        };
        img.onerror = () => {
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
                        <CardHeader>
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
                        <CardHeader>
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
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
                                <Phone className="h-5 w-5 text-orange-500" /> Quick Contact
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            
                            {/* ======================= FIX #1 APPLIED HERE ======================= */}
                            {item.contactNumbers && item.contactNumbers.length > 0 && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <Phone className="h-4 w-4 text-stone-500 flex-shrink-0" />
                                    <a href={`tel:${item.contactNumbers[0]}`} className="hover:underline hover:text-orange-600 transition-colors">{item.contactNumbers.join(' / ')}</a>
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
            <div className="flex flex-col md:flex-row justify-between items-center p-6 gap-6 md:gap-4">
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-stone-900">Interested in this Bhaktaniwas?</h3>
                    <p className="text-stone-600 mt-1">Send an inquiry directly to the management.</p>
                    {bookingInfo && (
                        <Badge className={`mt-2 font-semibold text-base py-1.5 px-3 ${bookingInfo.color} border`}>
                            {bookingInfo.text}
                        </Badge>
                    )}
                </div>
                <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row md:items-center">
                    {item.whatsappNumber ? (
                        <InquiryDrawer type="bhaktaniwas" data={item}>
                            <DialogTrigger asChild>
                                <Button size="lg" className="font-bold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-lg shadow-xl shadow-green-500/40 hover:shadow-2xl hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300 px-8 py-4">
                                    <img 
                                        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                                        alt="WhatsApp" 
                                        className="h-6 w-6 mr-3" 
                                    />
                                    Inquire Now on WhatsApp
                                </Button>
                            </DialogTrigger>
                        </InquiryDrawer>
                    ) : (
                        <Button 
                            disabled
                            size="lg"
                            className="font-bold bg-gray-300 text-gray-500 cursor-not-allowed text-lg px-8 py-4"
                        >
                            WhatsApp Inquiry Unavailable
                        </Button>
                    )}
                    
                    {item.bookingType === 'online' && item.website && (
                        <Button asChild size="lg" className="font-bold bg-orange-600 hover:bg-orange-700 text-white text-base shadow-md hover:shadow-lg transition-all">
                            <a href={item.website} target="_blank" rel="noopener noreferrer">
                                <Globe className="mr-2 h-5 w-5" />
                                Visit Website
                            </a>
                        </Button>
                    )}
                    
                    {/* ======================= FIX #2 APPLIED HERE ======================= */}
                    {(item.bookingType === 'offline' || item.bookingType === 'walk-in') && item.contactNumbers && item.contactNumbers.length > 0 && (
                        <Button asChild size="lg" className="font-bold bg-stone-800 hover:bg-stone-900 text-white text-base shadow-md hover:shadow-lg transition-all">
                            <a href={`tel:${item.contactNumbers[0]}`}>
                                <Phone className="mr-2 h-5 w-5" />
                                Call for Booking
                            </a>
                        </Button>
                    )}
                </div>
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
        <div className="min-h-screen mt-[70px]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <AnimatedSection className="mb-10">
                    <header>
                        <Breadcrumbs itemName={item.name} />
                        <div className="mt-4">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight">{item.name}</h1>
                            <div className="mt-4 flex items-center flex-wrap gap-x-6 gap-y-3 text-stone-600">
                                <SubscriptionBadgeHeader plan={item.subscriptionPlan} />
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="w-full">
                            <MainImage src={item.image} alt={`Main image of ${item.name}`} />
                        </div>
                        <div className="w-full h-full min-h-[300px] md:min-h-[400px] lg:min-h-full">
                            <GallerySlider images={item.gallery} itemName={item.name} />
                        </div>
                    </div>
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
                            
                            <TabsList className="flex h-auto w-full flex-col rounded-lg bg-stone-100 p-1 sm:w-auto sm:flex-row">
                                <TabsTrigger value="facilities" className="w-full justify-center py-2 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm sm:w-auto">
                                    All Facilities
                                </TabsTrigger>
                                <TabsTrigger value="contact" className="w-full justify-center py-2 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm sm:w-auto">
                                    Contact & Info
                                </TabsTrigger>
                                <TabsTrigger value="policies" className="w-full justify-center py-2 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm sm:w-auto">
                                    Policies
                                </TabsTrigger>
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

                                    {/* ======================= FIX #3 APPLIED HERE ======================= */}
                                    {item.contactNumbers && item.contactNumbers.length > 0 && (
                                        <p className="flex items-center gap-3">
                                            <Phone className="h-5 w-5 text-orange-500" />
                                            <a href={`tel:${item.contactNumbers[0]}`} className="font-medium hover:underline hover:text-orange-600 transition-colors">
                                                {item.contactNumbers.join(' / ')}
                                            </a>
                                        </p>
                                    )}

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