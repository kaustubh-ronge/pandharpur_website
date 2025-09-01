// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { PortableText } from "@portabletext/react";
// import { motion } from "framer-motion";

// // ICONS
// import {
//     MapPin, Phone, Clock, Route, Globe, ChevronRight, Sparkles, Building, Train, Bus
// } from "lucide-react";

// // --- SHADCN UI IMPORTS ---
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
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

// // --- UI SUB-COMPONENTS ---

// function Breadcrumbs({ itemName }) {
//     const travelTypeCapitalized = itemName.charAt(0).toUpperCase() + itemName.slice(1);
//     return (
//         <nav className="flex items-center text-sm font-medium text-stone-500">
//             <Link href="/" className="hover:text-orange-600">Home</Link>
//             <ChevronRight className="h-4 w-4 mx-1.5" />
//             <Link href="/information-page/travels" className="hover:text-orange-600">Travel</Link>
//             <ChevronRight className="h-4 w-4 mx-1.5" />
//             <span className="text-stone-700 font-semibold">{itemName}</span>
//         </nav>
//     );
// }

// function OverviewSection({ item }) {
//     const travelTypeCapitalized = item.travelType ? item.travelType.charAt(0).toUpperCase() + item.travelType.slice(1).replace('-', ' ') : '';

//     return (
//         <div className="mt-12">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 <Card className="bg-white/70 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
//                     <CardHeader>
//                         <CardTitle className="text-2xl font-bold text-stone-800">Details & Travel Tips</CardTitle>
//                     </CardHeader>
//                     <CardContent className="h-[28rem] lg:h-auto overflow-y-auto scrollbar-thin scrollbar-thumb-amber-300">
//                         <div className="prose prose-stone max-w-none text-base leading-relaxed">
//                             {item.detailedDescription ? <PortableText value={item.detailedDescription} /> : <p>{item.description}</p>}
//                         </div>
//                     </CardContent>
//                 </Card>

//                 <div className="flex flex-col gap-4">
//                     <Card className="flex-1 bg-white/70 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
//                         <CardHeader>
//                             <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
//                                 <Route className="h-5 w-5 text-orange-500" /> Key Routes
//                             </CardTitle>
//                         </CardHeader>
//                         <CardContent className="space-y-3">
//                             {item.keyRoutes?.slice(0, 3).map(route => (
//                                 <p key={route} className="text-stone-700 text-sm font-medium">{`• ${route}`}</p>
//                             ))}
//                         </CardContent>
//                     </Card>

//                     <Card className="flex-1 bg-white/70 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
//                         <CardHeader>
//                             <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
//                                 <Bus className="h-5 w-5 text-orange-500" /> Service Info
//                             </CardTitle>
//                         </CardHeader>
//                         <CardContent className="space-y-3">
//                             <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
//                                 <span className="font-bold w-24">Service Type:</span> <span>{travelTypeCapitalized}</span>
//                             </div>
//                         </CardContent>
//                     </Card>

//                     <Card className="flex-1 bg-white/70 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
//                         <CardHeader>
//                             <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
//                                 <Phone className="h-5 w-5 text-orange-500" /> Contact & Website
//                             </CardTitle>
//                         </CardHeader>
//                         <CardContent className="space-y-3">
//                             {item.phoneNumber && (
//                                 <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
//                                     <Phone className="h-4 w-4 text-stone-500" />
//                                     <a href={`tel:${item.phoneNumber}`} className="hover:underline">{item.phoneNumber}</a>
//                                 </div>
//                             )}
//                             {item.website && (
//                                 <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
//                                     <Globe className="h-4 w-4 text-stone-500" />
//                                     <a href={item.website} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">Visit Website</a>
//                                 </div>
//                             )}
//                         </CardContent>
//                     </Card>
//                 </div>
//             </div>
//         </div>
//     );
// }

// function HoursBar({ item }) {
//     if (!item.operatingHours) return null;
//     return (
//         <Card className="mt-10 bg-white/70 backdrop-blur-sm border-amber-200/60">
//             <div className="flex flex-col md:flex-row justify-center items-center text-center p-6 gap-4">
//                 <Clock className="h-8 w-8 text-orange-600" />
//                 <div>
//                     <h3 className="text-2xl font-bold text-stone-900">Operating Hours</h3>
//                     <p className="text-stone-600 mt-1 text-xl font-semibold">{item.operatingHours}</p>
//                 </div>
//             </div>
//         </Card>
//     );
// }

// function NearbySites() {
//     const sites = [
//         { name: "Vithoba Temple", distance: "Nearby", icon: <Building className="h-6 w-6 text-orange-500" /> },
//         { name: "Chandrabhaga Ghat", distance: "Nearby", icon: <Sparkles className="h-6 w-6 text-orange-500" /> },
//         { name: "Local Markets", distance: "Nearby", icon: <Train className="h-6 w-6 text-orange-500" /> }
//     ];

//     return (
//         <div className="mt-12">
//             <h2 className="text-3xl font-bold text-stone-800">Access to Nearby Sites</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//                 {sites.map(site => (
//                     <Card key={site.name} className="bg-white/70 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
//                         <CardContent className="flex items-center gap-4 p-6">
//                             {site.icon}
//                             <div>
//                                 <h4 className="font-bold text-stone-800">{site.name}</h4>
//                                 <p className="text-sm text-stone-500">{site.distance}</p>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 ))}
//             </div>
//         </div>
//     );
// }

// // --- Main Client Component ---
// export default function TravelPageClient({ item }) {
//     const travelTypeCapitalized = item.travelType ? item.travelType.charAt(0).toUpperCase() + item.travelType.slice(1).replace('-', ' ') : '';

//     return (
//         <div className="bg-amber-50 bg-[url('/pandharpur-motif.svg')] bg-repeat">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
//                 <AnimatedSection>
//                     <header className="mb-8">
//                         <Breadcrumbs itemName={item.name} />
//                         <div className="mt-4">
//                             <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight">{item.name}</h1>
//                             <div className="mt-4 flex items-center flex-wrap gap-x-6 gap-y-2 text-stone-600">
//                                 <Badge className="text-base font-bold gap-1.5 py-1 px-3 bg-amber-200/80 text-amber-900 border border-amber-300">
//                                     {travelTypeCapitalized}
//                                 </Badge>
//                                 {item.isFeatured && (
//                                     <Badge className="text-base font-bold gap-1.5 py-1 px-3 bg-yellow-400/80 text-yellow-900 border border-yellow-500">
//                                         <Sparkles className="h-4 w-4" /> Featured Hub
//                                     </Badge>
//                                 )}
//                                 {item.address && <p className="flex items-center gap-2 font-medium"><MapPin className="h-5 w-5 text-stone-400" /> {item.address}</p>}
//                             </div>
//                         </div>
//                     </header>
//                 </AnimatedSection>

//                 <AnimatedSection>
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[450px]">
//                         <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg">
//                             <Image src={item.image} alt={`Main image of ${item.name}`} fill style={{ objectFit: 'cover' }} priority />
//                         </div>
//                         <div className="h-full w-full rounded-xl overflow-hidden shadow-lg border border-amber-200/60">
//                             {item.googleMapsEmbedUrl ? (
//                                 <iframe src={item.googleMapsEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
//                             ) : (
//                                 <div className="bg-amber-100/50 h-full w-full flex items-center justify-center text-stone-400">Map not available</div>
//                             )}
//                         </div>
//                     </div>
//                 </AnimatedSection>

//                 <AnimatedSection>
//                     <HoursBar item={item} />
//                 </AnimatedSection>

//                 <AnimatedSection>
//                     <OverviewSection item={item} />
//                 </AnimatedSection>

//                 <AnimatedSection>
//                     <Separator className="my-12 bg-amber-200" />
//                     <NearbySites />
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

// ICONS
import { MapPin, Phone, Clock, Route, Globe, ChevronRight, Sparkles } from "lucide-react";

// --- SHADCN UI IMPORTS ---
import { Badge } from "@/components/ui/badge";

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
            <Link href="/information-page/travels" className="hover:text-orange-600">Travel</Link>
            <ChevronRight className="h-4 w-4 mx-1.5" />
            <span className="text-stone-700 font-semibold">{itemName}</span>
        </nav>
    );
}

function RichTextContent({ content }) {
    if (!content) return null;
    return (
        <div className="prose prose-lg max-w-none text-stone-700 leading-relaxed">
            <PortableText value={content} />
        </div>
    );
}

// --- Main Client Component ---
export default function TravelPageClient({ item }) {
    const travelTypeCapitalized = item.travelType ? item.travelType.charAt(0).toUpperCase() + item.travelType.slice(1).replace('-', ' ') : '';

    return (
        <div className="bg-gradient-to-br from-amber-50 via-red-50 to-amber-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                
                <AnimatedSection>
                    <header className="mb-8">
                        <Breadcrumbs itemName={item.name} />
                        <div className="mt-4">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight">{item.name}</h1>
                            <div className="mt-4 flex items-center flex-wrap gap-x-4 gap-y-2 text-stone-600">
                                <Badge className="text-base font-bold gap-1.5 py-1 px-3 bg-amber-200/80 text-amber-900 border border-amber-300">
                                    {travelTypeCapitalized}
                                </Badge>
                                {item.isFeatured && (
                                    <Badge className="text-base font-bold gap-1.5 py-1 px-3 bg-yellow-400/80 text-yellow-900 border border-yellow-500">
                                        <Sparkles className="h-4 w-4" /> Featured Hub
                                    </Badge>
                                )}
                                {item.address && <p className="flex items-center gap-2 font-medium"><MapPin className="h-5 w-5 text-stone-400" /> {item.address}</p>}
                            </div>
                        </div>
                    </header>
                </AnimatedSection>

                <AnimatedSection>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[450px]">
                        <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg border-2 border-amber-200/50">
                            <Image src={item.image} alt={`Main image of ${item.name}`} fill style={{ objectFit: 'cover' }} priority />
                        </div>
                        <div className="h-full w-full rounded-xl overflow-hidden shadow-lg border-2 border-amber-200/50">
                            {item.googleMapsEmbedUrl ? (
                                <iframe src={item.googleMapsEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            ) : (
                                <div className="bg-amber-100/50 h-full w-full flex items-center justify-center text-stone-400">Map not available</div>
                            )}
                        </div>
                    </div>
                </AnimatedSection>
                
                {/* --- SECTIONS BELOW ARE STRUCTURALLY UNCHANGED, ONLY STYLES & ANIMATIONS ADDED --- */}
                <AnimatedSection>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-12">
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-bold text-stone-800 border-b-2 border-amber-300 pb-3 mb-6">Details & Travel Tips</h2>
                            <RichTextContent content={item.detailedDescription} />

                            {item.keyRoutes?.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="text-2xl font-bold text-stone-800 mb-4">Key Routes & Destinations</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {item.keyRoutes.map(route => (
                                            <Badge key={route} className="text-base font-medium bg-amber-100 text-amber-900 border-amber-300/80 py-2 px-4 flex items-center gap-2">
                                                <Route className="h-5 w-5 text-orange-500 flex-shrink-0" /> <span>{route}</span>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-amber-200/60 sticky top-24 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <h3 className="text-2xl font-bold mb-4 text-stone-800">Quick Info</h3>
                                <div className="space-y-4 text-stone-800">
                                    {item.operatingHours && <p className="flex items-start gap-3"><Clock className="h-5 w-5 mt-1 text-orange-500"/> <span><strong>Hours:</strong> {item.operatingHours}</span></p>}
                                    {item.phoneNumber && <p className="flex items-start gap-3"><Phone className="h-5 w-5 mt-1 text-orange-500"/> <a href={`tel:${item.phoneNumber}`} className="hover:underline">{item.phoneNumber}</a></p>}
                                    {item.address && <p className="flex items-start gap-3"><MapPin className="h-5 w-5 mt-1 text-orange-500"/>{item.address}</p>}
                                    {item.website && <a href={item.website} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-orange-700 hover:underline"><Globe className="h-5 w-5 mt-1 text-orange-500"/> Official Website</a>}
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

            </div>
        </div>
    );
}