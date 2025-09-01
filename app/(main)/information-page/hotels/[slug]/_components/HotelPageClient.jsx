"use client";

import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";

// ICONS
import {
    Star, MapPin, Phone, Mail, CheckCircle, ChevronRight, BedDouble, Sparkles, Wallet, Building, Mountain, Train
} from "lucide-react";

// --- SHADCN UI IMPORTS ---
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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


// --- THEMED UI SUB-COMPONENTS ---

function Breadcrumbs({ hotelName }) {
    return (
        <nav className="flex items-center text-sm font-medium text-stone-500">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1.5" />
            <Link href="/information-page/hotels" className="hover:text-orange-600">Hotels</Link>
            <ChevronRight className="h-4 w-4 mx-1.5" />
            <span className="text-stone-700 font-semibold">{hotelName}</span>
        </nav>
    );
}

function GallerySlider({ images = [], hotelName }) {
    const validImages = images?.filter(img => img && typeof img === 'string' && img.trim() !== '') || [];
    if (validImages.length === 0) return <div className="bg-amber-100/50 rounded-lg flex items-center justify-center text-stone-500 h-full">No gallery images</div>;

    return (
        <div className="relative h-full w-full">
            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-full rounded-lg">
                {validImages.map((img, idx) => (
                    <div key={idx} className="flex-shrink-0 w-full snap-center relative">
                        <Image src={img} alt={`Gallery image ${idx + 1} of ${hotelName}`} fill style={{ objectFit: 'cover' }} sizes="50vw" />
                    </div>
                ))}
            </div>
        </div>
    );
}

function HotelOverviewSection({ hotel }) {
    return (
        <div className="mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side: About Card */}
                <Card className="bg-white/70 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-stone-800">About this Stay</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[28rem] lg:h-auto overflow-y-auto scrollbar-thin scrollbar-thumb-amber-300">
                        <div className="prose prose-stone max-w-none text-base leading-relaxed">
                            {hotel.detailedDescription ? <PortableText value={hotel.detailedDescription} /> : <p>{hotel.description}</p>}
                        </div>
                    </CardContent>
                </Card>

                {/* Right Side: THREE Info Cards */}
                <div className="flex flex-col gap-4">
                    <Card className="flex-1 bg-white/70 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-orange-500" /> Top Amenities
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {hotel.facilities?.slice(0, 2).map(facility => (
                                <div key={facility} className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <CheckCircle className="h-4 w-4 text-green-600" /> <span>{facility}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="flex-1 bg-white/70 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
                                <BedDouble className="h-5 w-5 text-orange-500" /> Accommodation
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {hotel.roomTypes?.length > 0 && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <CheckCircle className="h-4 w-4 text-green-600" /> <span>{hotel.roomTypes.length} Room Type(s)</span>
                                </div>
                            )}
                            {hotel.priceRange && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <Wallet className="h-4 w-4 text-green-600" /> <span>Starts from {hotel.priceRange.split('-')[0].trim()}</span>
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
                            {hotel.phoneNumber && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <Phone className="h-4 w-4 text-stone-500" />
                                    <a href={`tel:${hotel.phoneNumber}`} className="hover:underline">{hotel.phoneNumber}</a>
                                </div>
                            )}
                            {hotel.email && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <Mail className="h-4 w-4 text-stone-500" />
                                    <a href={`mailto:${hotel.email}`} className="hover:underline truncate">{hotel.email}</a>
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
        <Card className="mt-10 bg-white/70 backdrop-blur-sm border-amber-200/60">
            <div className="flex flex-col md:flex-row justify-between items-center p-6 gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-stone-900">Book Your Divine Stay</h3>
                    <p className="text-stone-500 mt-1">Secure the best rates for a blessed experience.</p>
                </div>
                <div className="flex items-center gap-4">
                    {price && <p className="text-2xl font-bold text-stone-800">{price}<span className="text-base font-medium text-stone-500">/night</span></p>}
                    <Button size="lg" className="font-bold bg-orange-600 hover:bg-orange-700 text-white text-base shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40">
                        Book Now
                    </Button>
                </div>
            </div>
        </Card>
    );
}

function NearbyAttractions() {
    const attractions = [
        { name: "Vithoba Temple", distance: "2 km", icon: <Building className="h-6 w-6 text-orange-500" /> },
        { name: "Pundalik Temple", distance: "3 km", icon: <Mountain className="h-6 w-6 text-orange-500" /> },
        { name: "Pandharpur Station", distance: "4 km", icon: <Train className="h-6 w-6 text-orange-500" /> }
    ];

    return (
        <div className="mt-12">
            <h2 className="text-3xl font-bold text-stone-800">Nearby Sacred Sites</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {attractions.map(attraction => (
                    <Card key={attraction.name} className="bg-white/70 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <CardContent className="flex items-center gap-4 p-6">
                            {attraction.icon}
                            <div>
                                <h4 className="font-bold text-stone-800">{attraction.name}</h4>
                                <p className="text-sm text-stone-500">{attraction.distance} away</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

// --- MAIN PAGE COMPONENT ---
export default function HotelPageClient({ hotel }) {
    // Data fetching logic is removed from here. The 'hotel' object is now received as a prop.

    if (!hotel) {
        // This is a fallback, but the server `notFound()` should handle it primarily.
        return <div className="flex items-center justify-center min-h-screen bg-amber-50 text-stone-700">Hotel not found.</div>;
    }

    return (
        <div className="bg-amber-50 bg-[url('/pandharpur-motif.svg')] bg-repeat">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <AnimatedSection>
                    <header className="mb-8">
                        <Breadcrumbs hotelName={hotel.name} />
                        <div className="mt-4">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight">{hotel.name}</h1>
                            <div className="mt-4 flex items-center flex-wrap gap-x-6 gap-y-2 text-stone-600">
                                {hotel.rating && (
                                    <Badge className="text-base font-bold gap-1.5 py-1 px-3 bg-amber-200/80 text-amber-900 border border-amber-300">
                                        <Star className="h-5 w-5 text-yellow-600 fill-current" /> {hotel.rating}.0
                                    </Badge>
                                )}
                                <p className="flex items-center gap-2 font-medium"><MapPin className="h-5 w-5 text-stone-400" /> {hotel.address}</p>
                            </div>
                        </div>
                    </header>
                </AnimatedSection>

                <AnimatedSection>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
                        <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg">
                            <Image src={hotel.image} alt={`Main image of ${hotel.name}`} fill style={{ objectFit: 'cover' }} priority />
                        </div>
                        <div className="h-full w-full flex flex-col gap-6">
                            <div className="flex-1 rounded-xl overflow-hidden shadow-lg">
                                <GallerySlider images={hotel.gallery} hotelName={hotel.name} />
                            </div>
                            <div className="flex-1 rounded-xl overflow-hidden shadow-lg border border-amber-200/60">
                                {hotel.googleMapsEmbedUrl ? (
                                    <iframe src={hotel.googleMapsEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                ) : (
                                    <div className="bg-amber-100/50 h-full w-full flex items-center justify-center text-stone-400">Map not available</div>
                                )}
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection>
                    <BookingBar hotel={hotel} />
                </AnimatedSection>

                <AnimatedSection>
                    <HotelOverviewSection hotel={hotel} />
                </AnimatedSection>

                <AnimatedSection>
                    <div className="mt-12">
                        <h2 className="text-3xl font-bold text-stone-800">Full Details</h2>
                        <Tabs defaultValue="amenities" className="mt-4">
                            <TabsList className="bg-amber-200/60">
                                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                                <TabsTrigger value="rooms">Rooms</TabsTrigger>
                                <TabsTrigger value="contact">Contact & Info</TabsTrigger>
                            </TabsList>
                            <TabsContent value="amenities" className="p-6 bg-white/70 backdrop-blur-sm rounded-b-lg rounded-tr-lg border border-amber-200/60 border-t-0">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {hotel.facilities?.map(facility => (
                                        <div key={facility} className="flex items-center gap-3 text-base font-medium text-stone-700">
                                            <CheckCircle className="h-5 w-5 text-green-600" /> <span>{facility}</span>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="rooms" className="p-0 bg-white/70 backdrop-blur-sm rounded-b-lg rounded-tr-lg border border-amber-200/60 border-t-0">
                                <Table>
                                    <TableHeader className="bg-amber-100/50">
                                        <TableRow>
                                            <TableHead className="font-bold text-stone-800">Room Type</TableHead>
                                            <TableHead className="font-bold text-stone-800">Amenities</TableHead>
                                            <TableHead className="text-right font-bold text-stone-800">Price per Night</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {hotel.roomTypes?.map((room, i) => (
                                            <TableRow key={i} className="border-amber-200/60">
                                                <TableCell className="font-semibold text-stone-800">{room.typeName}</TableCell>
                                                <TableCell className="text-stone-600 text-sm">{room.amenities?.join(', ')}</TableCell>
                                                <TableCell className="text-right font-bold text-stone-800">{room.price ? `₹${room.price}` : 'N/A'}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                            <TabsContent value="contact" className="p-6 bg-white/70 backdrop-blur-sm rounded-b-lg rounded-tr-lg border border-amber-200/60 border-t-0">
                                <div className="space-y-4 text-stone-700">
                                    {hotel.phoneNumber && <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-orange-500" /> <a href={`tel:${hotel.phoneNumber}`} className="font-medium hover:underline">{hotel.phoneNumber}</a></p>}
                                    {hotel.email && <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-orange-500" /> <a href={`mailto:${hotel.email}`} className="font-medium hover:underline">{hotel.email}</a></p>}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </AnimatedSection>

                <AnimatedSection>
                    <Separator className="my-12 bg-amber-200" />
                    <NearbyAttractions />
                </AnimatedSection>
            </div>
        </div>
    );
}