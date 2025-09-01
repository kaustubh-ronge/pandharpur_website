"use client";

import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";

// ICONS
import {
    MapPin, Phone, CheckCircle, Utensils, Sparkles, Building, Train, Tag, Soup, ChefHat, ChevronRight
} from "lucide-react";

// --- SHADCN UI IMPORTS ---
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

// --- UI SUB-COMPONENTS ---

function Breadcrumbs({ restaurantName }) {
    return (
        <nav className="flex items-center text-sm font-medium text-stone-500">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1.5" />
            <Link href="/information-page/restaurants" className="hover:text-orange-600">Restaurants</Link>
            <ChevronRight className="h-4 w-4 mx-1.5" />
            <span className="text-stone-700 font-semibold">{restaurantName}</span>
        </nav>
    );
}

function GallerySlider({ images = [], restaurantName }) {
    const validImages = images?.filter(Boolean) || [];
    if (validImages.length === 0) return <div className="bg-amber-100/50 rounded-lg flex items-center justify-center text-stone-500 h-full">No gallery images</div>;

    return (
        <div className="relative h-full w-full">
            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-full rounded-lg">
                {validImages.map((img, idx) => (
                    <div key={idx} className="flex-shrink-0 w-full snap-center relative">
                        <Image src={img} alt={`Gallery image ${idx + 1} of ${restaurantName}`} fill style={{ objectFit: 'cover' }} sizes="50vw" />
                    </div>
                ))}
            </div>
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
                <Card className="bg-white/70 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-stone-800">About the Restaurant</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[28rem] lg:h-auto overflow-y-auto scrollbar-thin scrollbar-thumb-amber-300">
                        <div className="prose prose-stone max-w-none text-base leading-relaxed">
                            {restaurant.detailedDescription ? <PortableText value={restaurant.detailedDescription} /> : <p>{restaurant.description}</p>}
                        </div>
                    </CardContent>
                </Card>

                <div className="flex flex-col gap-4">
                    <Card className="flex-1 bg-white/70 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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

                    <Card className="flex-1 bg-white/70 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
                                <Soup className="h-5 w-5 text-orange-500" /> Meals Served
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {restaurant.mealTypes?.map(meal => (
                                <div key={meal} className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <CheckCircle className="h-4 w-4 text-green-600" /> <span>{meal}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="flex-1 bg-white/70 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
                                <Phone className="h-5 w-5 text-orange-500" /> Quick Contact
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {restaurant.phoneNumber && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <Phone className="h-4 w-4 text-stone-500" />
                                    <a href={`tel:${restaurant.phoneNumber}`} className="hover:underline">{restaurant.phoneNumber}</a>
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
        <Card className="mt-10 bg-white/70 backdrop-blur-sm border-amber-200/60">
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

function NearbySites() {
    const sites = [
        { name: "Vithoba Temple", distance: "Short walk", icon: <Building className="h-6 w-6 text-orange-500" /> },
        { name: "Chandrabhaga Ghat", distance: "5 min walk", icon: <Sparkles className="h-6 w-6 text-orange-500" /> },
        { name: "Pandharpur Station", distance: "10 min drive", icon: <Train className="h-6 w-6 text-orange-500" /> }
    ];

    return (
        <div className="mt-12">
            <h2 className="text-3xl font-bold text-stone-800">Nearby Sites</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {sites.map(site => (
                    <Card key={site.name} className="bg-white/70 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <CardContent className="flex items-center gap-4 p-6">
                            {site.icon}
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

// --- Main Client Component ---
export default function RestaurantPageClient({ restaurant }) {
    const priceMap = { 'budget': '₹', 'mid-range': '₹₹', 'premium': '₹₹₹' };

    return (
        <div className="bg-amber-50 bg-[url('/pandharpur-motif.svg')] bg-repeat">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <AnimatedSection>
                    <header className="mb-8">
                        <Breadcrumbs restaurantName={restaurant.name} />
                        <div className="mt-4">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight">{restaurant.name}</h1>
                            <div className="mt-4 flex items-center flex-wrap gap-x-4 gap-y-2 text-stone-600">
                                {restaurant.isFeatured && (
                                    <Badge className="text-base font-bold gap-1.5 py-1 px-3 bg-yellow-400/80 text-yellow-900 border border-yellow-500">
                                        <Sparkles className="h-4 w-4" /> Featured
                                    </Badge>
                                )}
                                <Badge variant="secondary" className="text-base font-medium gap-1.5 py-1 px-3 bg-amber-200/80 text-amber-900 border border-amber-300">
                                    <Utensils className="h-4 w-4" /> {restaurant.cuisineType}
                                </Badge>
                                <Badge variant="secondary" className="text-base font-medium gap-1.5 py-1 px-3 bg-green-200/80 text-green-900 border border-green-300">
                                    <Tag className="h-4 w-4" /> {priceMap[restaurant.priceIndicator]}
                                </Badge>
                                <p className="flex items-center gap-2 font-medium"><MapPin className="h-5 w-5 text-stone-400" /> {restaurant.address}</p>
                            </div>
                        </div>
                    </header>
                </AnimatedSection>

                <AnimatedSection>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
                        <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg">
                            <Image src={restaurant.image} alt={`Main image of ${restaurant.name}`} fill style={{ objectFit: 'cover' }} priority />
                        </div>
                        <div className="h-full w-full flex flex-col gap-6">
                            <div className="flex-1 rounded-xl overflow-hidden shadow-lg">
                                <GallerySlider images={restaurant.gallery} restaurantName={restaurant.name} />
                            </div>
                            <div className="flex-1 rounded-xl overflow-hidden shadow-lg border border-amber-200/60">
                                {restaurant.googleMapsEmbedUrl ? (
                                    <iframe src={restaurant.googleMapsEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                ) : (
                                    <div className="bg-amber-100/50 h-full w-full flex items-center justify-center text-stone-400">Map not available</div>
                                )}
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection>
                    <SpecialtyBar restaurant={restaurant} />
                </AnimatedSection>

                <AnimatedSection>
                    <OverviewSection restaurant={restaurant} />
                </AnimatedSection>

                <AnimatedSection>
                    <div className="mt-12">
                        <h2 className="text-3xl font-bold text-stone-800">Full Details</h2>
                        <Tabs defaultValue="menu" className="mt-4">
                            <TabsList className="bg-amber-200/60">
                                <TabsTrigger value="menu">Menu Highlights</TabsTrigger>
                                <TabsTrigger value="contact">Contact & Location</TabsTrigger>
                            </TabsList>
                            <TabsContent value="menu" className="p-6 bg-white/70 backdrop-blur-sm rounded-b-lg rounded-tr-lg border border-amber-200/60 border-t-0">
                                <h3 className="text-xl font-bold text-stone-800 mb-4">Specialty Dish</h3>
                                <p className="text-lg text-stone-700 mb-6">{restaurant.specialtyDish || 'Not specified.'}</p>
                                <h3 className="text-xl font-bold text-stone-800 mb-4">Serves</h3>
                                <div className="flex flex-wrap gap-4">
                                    {restaurant.mealTypes?.map(meal => (
                                        <Badge key={meal} variant="secondary" className="text-base py-1 px-3">{meal}</Badge>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="contact" className="p-6 bg-white/70 backdrop-blur-sm rounded-b-lg rounded-tr-lg border border-amber-200/60 border-t-0">
                                <div className="space-y-4 text-stone-700">
                                    {restaurant.phoneNumber && <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-orange-500" /> <a href={`tel:${restaurant.phoneNumber}`} className="font-medium hover:underline">{restaurant.phoneNumber}</a></p>}
                                    {restaurant.address && <p className="flex items-center gap-3"><MapPin className="h-5 w-5 text-orange-500" /> <span className="font-medium">{restaurant.address}</span></p>}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </AnimatedSection>

                <AnimatedSection>
                    <Separator className="my-12 bg-amber-200" />
                    <NearbySites />
                </AnimatedSection>
            </div>
        </div>
    );
}