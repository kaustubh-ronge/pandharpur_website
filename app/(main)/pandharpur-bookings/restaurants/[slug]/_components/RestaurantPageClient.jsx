
"use client";

import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

// ICONS
import {
    MapPin, Phone, CheckCircle, Utensils, Sparkles, Building, Train, Tag, Soup, ChefHat, ChevronRight,
    ChevronLeft, Clock, Globe, Star, Users, Wifi, Car, Coffee, Home
} from "lucide-react";

// --- SHADCN UI IMPORTS ---
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

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

function Breadcrumbs({ restaurantName }) {
    return (
        <nav className="flex items-center text-sm font-medium text-stone-500 mb-6">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1.5" />
            <Link href="/pandharpur-bookings/restaurants" className="hover:text-orange-600 transition-colors">Restaurants</Link>
            <ChevronRight className="h-4 w-4 mx-1.5" />
            <span className="text-stone-700 font-semibold">{restaurantName}</span>
        </nav>
    );
}

function GallerySlider({ images = [], restaurantName }) {
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
        <div className="relative h-full w-full overflow-hidden rounded-xl">
            <div className="relative h-full w-full">
                {validImages.map((img, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <Image
                            src={img}
                            alt={`Gallery image ${idx + 1} of ${restaurantName}`}
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
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-orange-500/80 hover:bg-orange-500 text-white rounded-full p-2 shadow-lg transition-colors z-10"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-orange-500/80 hover:bg-orange-500 text-white rounded-full p-2 shadow-lg transition-colors z-10"
                        aria-label="Next image"
                    >
                        <ChevronRight className="h-6 w-6" />
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

            if (ratio > 2) setAspectRatioClass('aspect-[21/9]');       // Panoramic
            else if (ratio > 1.6) setAspectRatioClass('aspect-video');  // 16:9 Widescreen
            else if (ratio > 1.2) setAspectRatioClass('aspect-[4/3]');  // 4:3 Landscape
            else if (ratio > 0.9) setAspectRatioClass('aspect-square'); // Square-ish
            else if (ratio > 0.7) setAspectRatioClass('aspect-[3/4]');  // 3:4 Portrait
            else setAspectRatioClass('aspect-[9/16]');                 // 9:16 Tall Portrait

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

function OverviewSection({ restaurant }) {
    const priceMap = {
        'budget': '₹ (Budget-friendly)',
        'mid-range': '₹₹ (Mid-range)',
        'premium': '₹₹₹ (Premium)',
    };

    return (
        <div className="mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-white shadow-md border-stone-200 transition-all duration-300 hover:shadow-lg rounded-xl overflow-hidden">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-stone-800 flex items-center gap-2">
                            <Home className="h-6 w-6 text-orange-500" /> About the Restaurant
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[28rem] lg:h-auto overflow-y-auto scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-stone-100">
                        <div className="prose prose-stone max-w-none text-base leading-relaxed">
                            {restaurant.detailedDescription ? <PortableText value={restaurant.detailedDescription} /> : <p className="text-stone-500">{restaurant.description || 'No detailed description available.'}</p>}
                        </div>
                    </CardContent>
                </Card>

                <div className="flex flex-col gap-6">
                    <Card className="bg-white shadow-md border-stone-200 transition-all duration-300 hover:shadow-lg rounded-xl overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
                                <Utensils className="h-5 w-5 text-orange-500" /> Cuisine & Price
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                <span className="font-bold w-24">Cuisine:</span> <span>{restaurant.cuisineType}</span>
                            </div>
                            <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                <span className="font-bold w-24">Price:</span> <span>{priceMap[restaurant.priceIndicator] || 'N/A'}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md border-stone-200 transition-all duration-300 hover:shadow-lg rounded-xl overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
                                <Soup className="h-5 w-5 text-orange-500" /> Meals Served
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {restaurant.mealTypes?.map(meal => (
                                <div key={meal} className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" /> <span>{meal}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md border-stone-200 transition-all duration-300 hover:shadow-lg rounded-xl overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
                                <Phone className="h-5 w-5 text-orange-500" /> Quick Contact
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {restaurant.phoneNumber && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <Phone className="h-4 w-4 text-stone-500 flex-shrink-0" />
                                    <a href={`tel:${restaurant.phoneNumber}`} className="hover:underline hover:text-orange-600 transition-colors">{restaurant.phoneNumber}</a>
                                </div>
                            )}
                            {restaurant.openingHours && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <Clock className="h-4 w-4 text-stone-500 flex-shrink-0" />
                                    <span>{restaurant.openingHours}</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function SpecialtyBar({ restaurant }) {
    if (!restaurant.specialtyDish) return null;
    return (
        <Card className="mt-10 bg-white shadow-md border-stone-200">
            <div className="flex flex-col md:flex-row justify-center items-center text-center p-6 gap-4">
                <ChefHat className="h-8 w-8 text-orange-600" />
                <div>
                    <h3 className="text-2xl font-bold text-stone-900">Don't Miss Our Specialty!</h3>
                    <p className="text-stone-600 mt-1 text-xl font-semibold">{restaurant.specialtyDish}</p>
                </div>
            </div>
        </Card>
    );
}

function NearbyAttractions() {
    const sites = [
        { name: "Vithoba Temple", distance: "Short walk", icon: <Building className="h-6 w-6 text-orange-500" /> },
        { name: "Chandrabhaga Ghat", distance: "5 min walk", icon: <Sparkles className="h-6 w-6 text-orange-500" /> },
        { name: "Pandharpur Station", distance: "10 min drive", icon: <Train className="h-6 w-6 text-orange-500" /> }
    ];

    return (
        <div className="mt-12 bg-stone-50 py-12 px-6 rounded-2xl border border-stone-200">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-stone-800 mb-2 text-center">Nearby Attractions</h2>
                <p className="text-stone-600 mb-8 text-center">Places to visit near this restaurant</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {sites.map((site, index) => (
                        <motion.div
                            key={site.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-white border-stone-200 shadow-md transition-all duration-300 hover:shadow-lg h-full rounded-xl overflow-hidden">
                                <CardContent className="flex items-center gap-4 p-6">
                                    <div className="bg-orange-100 p-3 rounded-full">
                                        {site.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-stone-800">{site.name}</h4>
                                        <p className="text-sm text-stone-600">{site.distance} away</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// --- Main Client Component ---
export default function RestaurantPageClient({ restaurant }) {
    const priceMap = { 'budget': '₹', 'mid-range': '₹₹', 'premium': '₹₹₹' };

    return (
        <div className="min-h-screen mt-[70px]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <AnimatedSection className="mb-10">
                    <header>
                        <Breadcrumbs restaurantName={restaurant.name} />
                        <div className="mt-4">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight">{restaurant.name}</h1>
                            <div className="mt-4 flex items-center flex-wrap gap-x-4 gap-y-2 text-stone-600">
                                {restaurant.isFeatured && (
                                    <Badge className="text-base font-bold gap-1.5 py-1.5 px-3 bg-amber-500 text-white border-none rounded-full">
                                        <Sparkles className="h-4 w-4 text-yellow-200 fill-current" /> Featured
                                    </Badge>
                                )}
                                <Badge variant="outline" className="text-base font-medium gap-1.5 py-1.5 px-3 bg-orange-100 text-orange-800 border-orange-300 rounded-full">
                                    <Utensils className="h-4 w-4" /> {restaurant.cuisineType}
                                </Badge>
                                <Badge variant="outline" className="text-base font-medium gap-1.5 py-1.5 px-3 bg-green-100 text-green-800 border-green-300 rounded-full">
                                    <Tag className="h-4 w-4" /> {priceMap[restaurant.priceIndicator]}
                                </Badge>
                                <p className="flex items-center gap-2 font-medium"><MapPin className="h-5 w-5 text-stone-500" /> {restaurant.address}</p>
                            </div>
                        </div>
                    </header>
                </AnimatedSection>

                <AnimatedSection className="mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="w-full">
                            <MainImage src={restaurant.image} alt={`Main image of ${restaurant.name}`} />
                        </div>

                        <div className="w-full h-full min-h-[400px]">
                            <GallerySlider images={restaurant.gallery} restaurantName={restaurant.name} />
                        </div>
                    </div>

                    <div className="rounded-xl overflow-hidden shadow-md border border-stone-200">
                        {restaurant.googleMapsEmbedUrl ? (
                            <iframe
                                src={restaurant.googleMapsEmbedUrl}
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
                    <SpecialtyBar restaurant={restaurant} />
                </AnimatedSection>

                <AnimatedSection className="mb-12">
                    <OverviewSection restaurant={restaurant} />
                </AnimatedSection>

                <AnimatedSection className="mb-12">
                    <div className="bg-white rounded-xl shadow-md p-6 border border-stone-200">
                        <h2 className="text-3xl font-bold text-stone-800 mb-6">Full Details</h2>
                        <Tabs defaultValue="menu" className="mt-4">
                            
                            <TabsList className="flex h-auto w-full flex-col rounded-lg bg-stone-100 p-1 sm:w-auto sm:flex-row">
                                <TabsTrigger value="menu" className="w-full justify-center py-2 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm sm:w-auto">
                                    Menu Highlights
                                </TabsTrigger>
                                <TabsTrigger value="contact" className="w-full justify-center py-2 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm sm:w-auto">
                                    Contact & Location
                                </TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="menu" className="mt-6 p-6 bg-stone-50 rounded-lg border border-stone-200">
                                <h3 className="text-xl font-bold text-stone-800 mb-4">Specialty Dish</h3>
                                <p className="text-lg text-stone-700 mb-6 bg-white p-4 rounded-lg border border-stone-200">{restaurant.specialtyDish || 'Not specified.'}</p>
                                <h3 className="text-xl font-bold text-stone-800 mb-4">Serves</h3>
                                <div className="flex flex-wrap gap-4">
                                    {restaurant.mealTypes?.map(meal => (
                                        <Badge key={meal} variant="secondary" className="text-base py-1.5 px-3 bg-orange-100 text-orange-800 border-orange-300">{meal}</Badge>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="contact" className="mt-6 p-6 bg-stone-50 rounded-lg border border-stone-200">
                                <div className="space-y-4 text-stone-700">
                                    {restaurant.phoneNumber && (
                                        <p className="flex items-center gap-3 p-3 bg-white rounded-lg border border-stone-200">
                                            <Phone className="h-5 w-5 text-orange-500 flex-shrink-0" />
                                            <a href={`tel:${restaurant.phoneNumber}`} className="font-medium hover:underline hover:text-orange-600 transition-colors">{restaurant.phoneNumber}</a>
                                        </p>
                                    )}
                                    {restaurant.address && (
                                        <p className="flex items-center gap-3 p-3 bg-white rounded-lg border border-stone-200">
                                            <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0" />
                                            <span className="font-medium">{restaurant.address}</span>
                                        </p>
                                    )}
                                    {restaurant.openingHours && (
                                        <p className="flex items-center gap-3 p-3 bg-white rounded-lg border border-stone-200">
                                            <Clock className="h-5 w-5 text-orange-500 flex-shrink-0" />
                                            <span className="font-medium">{restaurant.openingHours}</span>
                                        </p>
                                    )}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </AnimatedSection>

                <AnimatedSection className="mb-12">
                    <Separator className="my-12 bg-stone-200" />
                    <NearbyAttractions />
                </AnimatedSection>
            </div>
        </div>
    );
}