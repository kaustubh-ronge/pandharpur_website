"use client";

import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";

// ICONS
import {
    MapPin, Phone, CheckCircle, Users, Globe, ChevronRight, Sparkles, Building, Train
} from "lucide-react";

// --- SHADCN UI IMPORTS ---
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

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

function Breadcrumbs({ itemName }) {
    return (
        <nav className="flex items-center text-sm font-medium text-stone-500">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1.5" />
            <Link href="/information-page/bhaktaniwas" className="hover:text-orange-600">Bhaktaniwas</Link>
            <ChevronRight className="h-4 w-4 mx-1.5" />
            <span className="text-stone-700 font-semibold">{itemName}</span>
        </nav>
    );
}

function GallerySlider({ images = [], itemName }) {
    const validImages = images?.filter(Boolean) || [];
    if (validImages.length === 0) return <div className="bg-amber-100/50 rounded-lg flex items-center justify-center text-stone-500 h-full">No gallery images</div>;

    return (
        <div className="relative h-full w-full">
            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-full rounded-lg">
                {validImages.map((img, idx) => (
                    <div key={idx} className="flex-shrink-0 w-full snap-center relative">
                        <Image src={img} alt={`Gallery image ${idx + 1} of ${itemName}`} fill style={{ objectFit: 'cover' }} sizes="50vw" />
                    </div>
                ))}
            </div>
        </div>
    );
}

function OverviewSection({ item }) {
    return (
        <div className="mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-white/70 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-stone-800">About this Bhaktaniwas</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[28rem] lg:h-auto overflow-y-auto scrollbar-thin scrollbar-thumb-amber-300">
                        <div className="prose prose-stone max-w-none text-base leading-relaxed">
                            {item.detailedDescription ? <PortableText value={item.detailedDescription} /> : <p>No detailed information available.</p>}
                        </div>
                    </CardContent>
                </Card>

                <div className="flex flex-col gap-4">
                    <Card className="flex-1 bg-white/70 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-orange-500" /> Top Facilities
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {item.facilities?.slice(0, 2).map(facility => (
                                <div key={facility} className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <CheckCircle className="h-4 w-4 text-green-600" /> <span>{facility}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="flex-1 bg-white/70 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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
                        </CardContent>
                    </Card>

                    <Card className="flex-1 bg-white/70 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
                                <Phone className="h-5 w-5 text-orange-500" /> Quick Contact
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {item.phoneNumber && (
                                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                                    <Phone className="h-4 w-4 text-stone-500" />
                                    <a href={`tel:${item.phoneNumber}`} className="hover:underline">{item.phoneNumber}</a>
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
        'online': { text: 'Online Booking Available', color: 'bg-green-100 text-green-800' },
        'offline': { text: 'Offline / On-site Booking Only', color: 'bg-amber-100 text-amber-800' },
        'walk-in': { text: 'First-Come, First-Served', color: 'bg-blue-100 text-blue-800' },
    }[item.bookingType];

    return (
        <Card className="mt-10 bg-white/70 backdrop-blur-sm border-amber-200/60">
            <div className="flex flex-col md:flex-row justify-between items-center p-6 gap-4">
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-stone-900">Booking Information</h3>
                    {bookingInfo && <p className={`mt-1 font-semibold text-lg ${bookingInfo.color.split(' ')[1]}`}>{bookingInfo.text}</p>}
                </div>
                {item.bookingType === 'online' && item.website && (
                    <Button asChild size="lg" className="font-bold bg-orange-600 hover:bg-orange-700 text-white text-base shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40">
                        <a href={item.website} target="_blank" rel="noopener noreferrer">
                            <Globe className="mr-2 h-5 w-5" />
                            Visit Booking Website
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
export default function BhaktaniwasPageClient({ item }) {
    return (
        <div className="bg-amber-50 bg-[url('/pandharpur-motif.svg')] bg-repeat">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <AnimatedSection>
                    <header className="mb-8">
                        <Breadcrumbs itemName={item.name} />
                        <div className="mt-4">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight">{item.name}</h1>
                            <div className="mt-4 flex items-center flex-wrap gap-x-6 gap-y-2 text-stone-600">
                                {item.isFeatured && (
                                    <Badge className="text-base font-bold gap-1.5 py-1 px-3 bg-yellow-400/80 text-yellow-900 border border-yellow-500">
                                        <Sparkles className="h-4 w-4" /> Featured
                                    </Badge>
                                )}
                                {item.managedBy && (
                                    <Badge className="text-base font-bold gap-1.5 py-1 px-3 bg-amber-200/80 text-amber-900 border border-amber-300">
                                        Managed By: {item.managedBy}
                                    </Badge>
                                )}
                                <p className="flex items-center gap-2 font-medium"><MapPin className="h-5 w-5 text-stone-400" /> {item.address}</p>
                            </div>
                        </div>
                    </header>
                </AnimatedSection>

                <AnimatedSection>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
                        <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg">
                            <Image src={item.image} alt={`Main image of ${item.name}`} fill style={{ objectFit: 'cover' }} priority />
                        </div>
                        <div className="h-full w-full flex flex-col gap-6">
                            <div className="flex-1 rounded-xl overflow-hidden shadow-lg">
                                <GallerySlider images={item.gallery} itemName={item.name} />
                            </div>
                            <div className="flex-1 rounded-xl overflow-hidden shadow-lg border border-amber-200/60">
                                {item.googleMapsEmbedUrl ? (
                                    <iframe src={item.googleMapsEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                ) : (
                                    <div className="bg-amber-100/50 h-full w-full flex items-center justify-center text-stone-400">Map not available</div>
                                )}
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection>
                    <BookingBar item={item} />
                </AnimatedSection>

                <AnimatedSection>
                    <OverviewSection item={item} />
                </AnimatedSection>

                <AnimatedSection>
                    <div className="mt-12">
                        <h2 className="text-3xl font-bold text-stone-800">Full Details</h2>
                        <Tabs defaultValue="facilities" className="mt-4">
                            <TabsList className="bg-amber-200/60">
                                <TabsTrigger value="facilities">All Facilities</TabsTrigger>
                                <TabsTrigger value="contact">Contact & Info</TabsTrigger>
                            </TabsList>
                            <TabsContent value="facilities" className="p-6 bg-white/70 backdrop-blur-sm rounded-b-lg rounded-tr-lg border border-amber-200/60 border-t-0">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {item.facilities?.map(facility => (
                                        <div key={facility} className="flex items-center gap-3 text-base font-medium text-stone-700">
                                            <CheckCircle className="h-5 w-5 text-green-600" /> <span>{facility}</span>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="contact" className="p-6 bg-white/70 backdrop-blur-sm rounded-b-lg rounded-tr-lg border border-amber-200/60 border-t-0">
                                <div className="space-y-4 text-stone-700">
                                    {item.phoneNumber && <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-orange-500" /> <a href={`tel:${item.phoneNumber}`} className="font-medium hover:underline">{item.phoneNumber}</a></p>}
                                    {item.website && <p className="flex items-center gap-3"><Globe className="h-5 w-5 text-orange-500" /> <a href={item.website} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">Official Website</a></p>}
                                    {item.address && <p className="flex items-center gap-3"><MapPin className="h-5 w-5 text-orange-500" /> <span className="font-medium">{item.address}</span></p>}
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