
"use client";

import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

import {
    Star, MapPin, Phone, Mail, CheckCircle, ChevronRight, BedDouble,
    Sparkles, Wallet, Building, Mountain, Train, Globe, Clock, Users, Wifi, 
    Car, Utensils, Coffee, Home, Bath, Gem, ShieldCheck
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

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

function Breadcrumbs({ hotelName }) {
    return (
        <nav className="flex items-center text-sm font-medium text-stone-500 mb-6">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1.5" />
            <Link href="/information-page/hotels" className="hover:text-orange-600 transition-colors">Hotels</Link>
            <ChevronRight className="h-4 w-4 mx-1.5" />
            <span className="text-stone-700 font-semibold">{hotelName}</span>
        </nav>
    );
}

function GallerySlider({ images = [], hotelName }) {
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
                <Sparkles className="h-10 w-10 mx-auto text-stone-400 mb-3" />
                <p>No gallery images</p>
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
                            alt={`Gallery image ${idx + 1} of ${hotelName}`}
                            fill
                            className="object-cover"
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

    if (!src) {
        return (
            <div className="relative w-full aspect-[4/3] rounded-xl bg-stone-100 flex items-center justify-center text-stone-500 shadow-md">
                No Image Available
            </div>
        );
    }
    
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
                    className="object-cover transition-opacity duration-300 opacity-0"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    onLoadingComplete={(image) => image.classList.remove('opacity-0')}
                />
            )}
        </div>
    );
}

function HotelOverviewSection({ hotel }) {
    return (
        <div className="mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-white shadow-md border-stone-200 transition-all duration-300 hover:shadow-lg rounded-xl overflow-hidden">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                            <Home className="h-6 w-6 text-orange-500" /> About this Stay
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[28rem] lg:h-auto overflow-y-auto scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-stone-100">
                        <div className="prose prose-stone max-w-none text-base leading-relaxed">
                            {hotel.detailedDescription ? <PortableText value={hotel.detailedDescription} /> : <p className="text-stone-500">No detailed information available.</p>}
                        </div>
                    </CardContent>
                </Card>

                <div className="flex flex-col gap-6">
                    <Card className="bg-white shadow-md border-stone-200 transition-all duration-300 hover:shadow-lg rounded-xl overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-orange-500" /> Top Amenities
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {hotel.facilities?.slice(0, 5).map(facility => (
                                <div key={facility} className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" /> <span>{facility}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md border-stone-200 transition-all duration-300 hover:shadow-lg rounded-xl overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
                                <BedDouble className="h-5 w-5 text-orange-500" /> Accommodation
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {hotel.roomTypes?.length > 0 && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" /> <span>{hotel.roomTypes.length} Room Type(s)</span>
                                </div>
                            )}
                            {hotel.priceRange && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <Wallet className="h-4 w-4 text-green-600 flex-shrink-0" /> <span>Starts from {hotel.priceRange.split('-')[0].trim()}</span>
                                </div>
                            )}
                            {hotel.checkInTime && hotel.checkOutTime && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <Clock className="h-4 w-4 text-green-600 flex-shrink-0" />
                                    <span>Check-in: {hotel.checkInTime}, Check-out: {hotel.checkOutTime}</span>
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
                            {hotel.phoneNumber && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <Phone className="h-4 w-4 text-stone-500 flex-shrink-0" />
                                    <a href={`tel:${hotel.phoneNumber}`} className="hover:underline hover:text-orange-600 transition-colors">{hotel.phoneNumber}</a>
                                </div>
                            )}
                            {hotel.email && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <Mail className="h-4 w-4 text-stone-500 flex-shrink-0" />
                                    <a href={`mailto:${hotel.email}`} className="hover:underline sm:text-sm hover:text-orange-600 transition-colors truncate">{hotel.email}</a>
                                </div>
                            )}
                            {hotel.website && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <Globe className="h-4 w-4 text-stone-500 flex-shrink-0" />
                                    <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-orange-600 transition-colors truncate">
                                        Visit Website
                                    </a>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function BookingBar({ hotel }) {
    const price = hotel.priceRange?.split('-')[0].trim();
    return (
        <Card className="mt-10 bg-white shadow-md border-stone-200">
            <div className="flex flex-col md:flex-row justify-between items-center p-6 gap-4">
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-stone-900">Book Your Stay</h3>
                    <p className="text-stone-600 mt-1">Secure the best rates for your visit</p>
                </div>
                <div className="flex items-center gap-4">
                    {price && <p className="text-2xl font-bold text-stone-900">{price}<span className="text-base font-medium text-stone-600">/night</span></p>}
                </div>
            </div>
        </Card>
    );
}

function NearbyAttractions({ nearbyAttractions }) {
    const attractions = nearbyAttractions && nearbyAttractions.length > 0
        ? nearbyAttractions
        : [
            { name: "Vithoba Temple", distance: "2 km", icon: <Building className="h-6 w-6 text-orange-500" /> },
            { name: "Pundalik Temple", distance: "3 km", icon: <Mountain className="h-6 w-6 text-orange-500" /> },
            { name: "Pandharpur Station", distance: "4 km", icon: <Train className="h-6 w-6 text-orange-500" /> }
        ];

    return (
        <div className="mt-12 bg-stone-50 py-12 px-6 rounded-2xl border border-stone-200">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-stone-800 mb-2 text-center">Nearby Attractions</h2>
                <p className="text-stone-600 mb-8 text-center">Places of interest near this accommodation</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {attractions.map((attraction, index) => (
                        <motion.div
                            key={attraction.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-white border-stone-200 shadow-md transition-all duration-300 hover:shadow-lg h-full rounded-xl overflow-hidden">
                                <CardContent className="flex items-center gap-4 p-6">
                                    <div className="bg-orange-100 p-3 rounded-full">
                                        {attraction.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-stone-800">{attraction.name}</h4>
                                        <p className="text-sm text-stone-600">{attraction.distance} away</p>
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

export default function HotelPageClient({ hotel }) {
    if (!hotel) {
        return <div className="flex items-center justify-center min-h-screen bg-white text-stone-700">Hotel not found.</div>;
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <AnimatedSection className="mb-10">
                    <header>
                        <Breadcrumbs hotelName={hotel.name} />
                        <div className="mt-4">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight">
                                {hotel.name}
                            </h1>
                            <div className="mt-4 flex items-center flex-wrap gap-x-6 gap-y-3 text-stone-600">
                                <SubscriptionBadgeHeader plan={hotel.subscriptionPlan} />
                                {hotel.rating && (
                                    <Badge className="text-base font-bold gap-1.5 py-1.5 px-3 bg-amber-500 text-white border-none rounded-full">
                                        <Star className="h-5 w-5 text-yellow-200 fill-current" /> {hotel.rating}.0
                                    </Badge>
                                )}
                                {hotel.category && (
                                    <Badge variant="outline" className="text-stone-600 border-stone-400 rounded-full">
                                        {hotel.category}
                                    </Badge>
                                )}
                                <p className="flex items-center gap-2 font-medium">
                                    <MapPin className="h-5 w-5 text-stone-500" /> {hotel.address}
                                </p>
                            </div>
                        </div>
                    </header>
                </AnimatedSection>

                <AnimatedSection className="mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="w-full">
                            <MainImage src={hotel.image} alt={`Main image of ${hotel.name}`} />
                        </div>
                        <div className="w-full h-full min-h-[300px] md:min-h-[400px] lg:min-h-full">
                            <GallerySlider images={hotel.gallery} hotelName={hotel.name} />
                        </div>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-md border border-stone-200">
                        {hotel.googleMapsEmbedUrl ? (
                            <iframe
                                src={hotel.googleMapsEmbedUrl}
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
                    <BookingBar hotel={hotel} />
                </AnimatedSection>

                <AnimatedSection className="mb-12">
                    <HotelOverviewSection hotel={hotel} />
                </AnimatedSection>

                <AnimatedSection className="mb-12">
                    <div className="bg-white rounded-xl shadow-md p-6 border border-stone-200">
                        <h2 className="text-3xl font-bold text-stone-800 mb-6">Full Details</h2>
                        <Tabs defaultValue="amenities" className="w-full">
                            <TabsList className="flex h-auto w-full flex-col rounded-lg bg-stone-100 p-1 sm:w-auto sm:flex-row">
                                <TabsTrigger 
                                    value="amenities" 
                                    className="w-full justify-center py-2 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm sm:w-auto"
                                >
                                    Amenities
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="rooms" 
                                    className="w-full justify-center py-2 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm sm:w-auto"
                                >
                                    Rooms
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="contact" 
                                    className="w-full justify-center py-2 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm sm:w-auto"
                                >
                                    Contact & Info
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="amenities" className="mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {hotel.facilities?.map(facility => (
                                        <div key={facility} className="flex items-center gap-3 text-base font-medium text-stone-700 bg-stone-50 p-3 rounded-lg border border-stone-200">
                                            <FacilityIcons facility={facility} />
                                            <span>{facility}</span>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="rooms" className="mt-6">
                                <Table>
                                    <TableHeader className="bg-stone-100">
                                        <TableRow>
                                            <TableHead className="font-bold text-stone-800">Room Type</TableHead>
                                            <TableHead className="font-bold text-stone-800">Amenities</TableHead>
                                            <TableHead className="text-right font-bold text-stone-800">Price per Night</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {hotel.roomTypes?.map((room, i) => (
                                            <TableRow key={i} className="border-stone-200 hover:bg-stone-50/50 transition-colors">
                                                <TableCell className="font-semibold text-stone-800">{room.typeName}</TableCell>
                                                <TableCell className="text-stone-600 text-sm">
                                                    <div className="flex flex-wrap gap-1">
                                                        {room.amenities?.slice(0, 3).map((am, idx) => (
                                                            <span key={idx} className="bg-stone-100 text-stone-800 px-2 py-1 rounded-md text-xs">
                                                                {am}
                                                            </span>
                                                        ))}
                                                        {room.amenities?.length > 3 && (
                                                            <span className="bg-stone-200 text-stone-900 px-2 py-1 rounded-md text-xs">
                                                                +{room.amenities.length - 3} more
                                                            </span>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right font-bold text-stone-800">{room.price ? `₹${room.price}` : 'N/A'}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                            <TabsContent value="contact" className="mt-6">
                                <div className="space-y-4 text-stone-700">
                                    {hotel.phoneNumber && (
                                        <p className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg border border-stone-200">
                                            <Phone className="h-5 w-5 text-orange-500 flex-shrink-0" />
                                            <a href={`tel:${hotel.phoneNumber}`} className="font-medium hover:underline hover:text-orange-600 transition-colors">{hotel.phoneNumber}</a>
                                        </p>
                                    )}
                                    {hotel.email && (
                                        <p className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg border border-stone-200">
                                            <Mail className="h-5 w-5 text-orange-500 flex-shrink-0" />
                                            <a href={`mailto:${hotel.email}`} className="font-medium hover:underline hover:text-orange-600 transition-colors">{hotel.email}</a>
                                        </p>
                                    )}
                                    {hotel.website && (
                                        <p className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg border border-stone-200">
                                            <Globe className="h-5 w-5 text-orange-500 flex-shrink-0" />
                                            <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline hover:text-orange-600 transition-colors">
                                                Visit Website
                                            </a>
                                        </p>
                                    )}
                                    {hotel.policies && (
                                        <div className="mt-6">
                                            <h4 className="font-bold text-stone-800 mb-2">Hotel Policies</h4>
                                            <div className="prose prose-sm prose-stone bg-stone-50 p-4 rounded-lg border border-stone-200">
                                                <PortableText value={hotel.policies} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </AnimatedSection>

                <AnimatedSection className="mb-12">
                    <Separator className="my-12 bg-stone-200" />
                    <NearbyAttractions nearbyAttractions={hotel.nearbyAttractions} />
                </AnimatedSection>
            </div>
        </div>
    );
}