
"use client";

import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

// ICONS
import {
  Star, MapPin, Phone, Mail, CheckCircle, ChevronRight, BedDouble, 
  Sparkles, Wallet, Building, Mountain, Train, ChevronLeft, ChevronRightIcon,
  Globe
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

// --- ENHANCED GALLERY SLIDER ---
function GallerySlider({ images = [], hotelName }) {
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
      <div className="bg-gradient-to-br from-amber-100/50 to-orange-100/30 rounded-xl flex items-center justify-center text-stone-500 h-full p-8 border border-amber-200/50">
        <div className="text-center">
          <div className="mx-auto bg-gradient-to-br from-amber-200 to-orange-200 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-3">
            <Sparkles className="h-8 w-8 text-amber-700" />
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
              alt={`Gallery image ${idx + 1} of ${hotelName}`}
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
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-stone-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-stone-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
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
              className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-amber-500' : 'w-2 bg-white/70'}`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {validImages.length > 1 && (
        <div className="absolute top-4 right-4 bg-black/40 text-white text-xs px-2 py-1 rounded-full z-10">
          {currentIndex + 1} / {validImages.length}
        </div>
      )}
    </div>
  );
}

// --- THEMED UI SUB-COMPONENTS ---

function Breadcrumbs({ hotelName }) {
  return (
    <nav className="flex items-center text-sm font-medium text-stone-500">
      <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
      <ChevronRight className="h-4 w-4 mx-1.5" />
      <Link href="/information-page/hotels" className="hover:text-orange-600 transition-colors">Hotels</Link>
      <ChevronRight className="h-4 w-4 mx-1.5" />
      <span className="text-stone-700 font-semibold">{hotelName}</span>
    </nav>
  );
}

function HotelOverviewSection({ hotel }) {
  return (
    <div className="mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: About Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50/70 pb-4">
            <CardTitle className="text-2xl font-bold text-stone-800 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-orange-500" /> About this Stay
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[28rem] lg:h-auto overflow-y-auto scrollbar-thin scrollbar-thumb-amber-300 p-6">
            <div className="prose prose-stone max-w-none text-base leading-relaxed">
              {hotel.detailedDescription ? <PortableText value={hotel.detailedDescription} /> : <p>{hotel.description}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Right Side: THREE Info Cards */}
        <div className="flex flex-col gap-4">
          <Card className="flex-1 bg-white/80 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 rounded-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50/70 pb-4">
              <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-orange-500" /> Top Amenities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-6">
              {hotel.facilities?.slice(0, 5).map(facility => (
                <div key={facility} className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" /> <span>{facility}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="flex-1 bg-white/80 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 rounded-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50/70 pb-4">
              <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
                <BedDouble className="h-5 w-5 text-orange-500" /> Accommodation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-6">
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
            </CardContent>
          </Card>

          <Card className="flex-1 bg-white/80 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 rounded-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50/70 pb-4">
              <CardTitle className="text-lg font-bold text-stone-800 flex items-center gap-2">
                <Phone className="h-5 w-5 text-orange-500" /> Quick Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-6">
              {hotel.phoneNumber && (
                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                  <Phone className="h-4 w-4 text-stone-500 flex-shrink-0" />
                  <a href={`tel:${hotel.phoneNumber}`} className="hover:underline hover:text-orange-600 transition-colors">{hotel.phoneNumber}</a>
                </div>
              )}
              {hotel.email && (
                <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                  <Mail className="h-4 w-4 text-stone-500 flex-shrink-0" />
                  <a href={`mailto:${hotel.email}`} className="hover:underline hover:text-orange-600 transition-colors truncate">{hotel.email}</a>
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
    <Card className="mt-10 bg-gradient-to-r from-amber-50 to-orange-50/70 backdrop-blur-sm border-amber-200/60 rounded-xl overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center p-6 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-stone-900">Book Your Divine Stay</h3>
          <p className="text-stone-500 mt-1">Secure the best rates for a blessed experience.</p>
        </div>
        <div className="flex items-center gap-4">
          {price && <p className="text-2xl font-bold text-stone-800">{price}<span className="text-base font-medium text-stone-500">/night</span></p>}
          <Button size="lg" className="font-bold bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-base shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all">
            Book Now
          </Button>
        </div>
      </div>
    </Card>
  );
}

function NearbyAttractions({ nearbyAttractions }) {
  // Use provided attractions or fallback to default ones
  const attractions = nearbyAttractions && nearbyAttractions.length > 0 
    ? nearbyAttractions 
    : [
        { name: "Vithoba Temple", distance: "2 km", icon: <Building className="h-6 w-6 text-orange-500" /> },
        { name: "Pundalik Temple", distance: "3 km", icon: <Mountain className="h-6 w-6 text-orange-500" /> },
        { name: "Pandharpur Station", distance: "4 km", icon: <Train className="h-6 w-6 text-orange-500" /> }
      ];

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-stone-800 mb-2">Nearby Sacred Sites</h2>
      <p className="text-stone-500 mb-6">Places of spiritual significance near this accommodation</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {attractions.map((attraction, index) => (
          <motion.div
            key={attraction.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-amber-200/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full rounded-xl overflow-hidden">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="bg-amber-100 p-3 rounded-full">
                  {attraction.icon}
                </div>
                <div>
                  <h4 className="font-bold text-stone-800">{attraction.name}</h4>
                  <p className="text-sm text-stone-500">{attraction.distance} away</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function HotelPageClient({ hotel }) {
  if (!hotel) {
    return <div className="flex items-center justify-center min-h-screen bg-amber-50 text-stone-700">Hotel not found.</div>;
  }

  return (
    <div className="bg-amber-50 bg-[url('/pandharpur-motif.svg')] bg-repeat min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <AnimatedSection>
          <header className="mb-8">
            <Breadcrumbs hotelName={hotel.name} />
            <div className="mt-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight bg-gradient-to-br from-stone-800 to-amber-700 bg-clip-text text-transparent">
                {hotel.name}
              </h1>
              <div className="mt-4 flex items-center flex-wrap gap-x-6 gap-y-2 text-stone-600">
                {hotel.rating && (
                  <Badge className="text-base font-bold gap-1.5 py-1 px-3 bg-amber-200/80 text-amber-900 border border-amber-300 rounded-full">
                    <Star className="h-5 w-5 text-yellow-600 fill-current" /> {hotel.rating}.0
                  </Badge>
                )}
                {hotel.category && (
                  <Badge variant="outline" className="text-stone-600 border-amber-300 rounded-full">
                    {hotel.category}
                  </Badge>
                )}
                <p className="flex items-center gap-2 font-medium">
                  <MapPin className="h-5 w-5 text-stone-400" /> {hotel.address}
                </p>
              </div>
            </div>
          </header>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
            <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg border border-amber-200/50">
              <Image 
                src={hotel.image} 
                alt={`Main image of ${hotel.name}`} 
                fill 
                style={{ objectFit: 'cover' }} 
                priority 
                className="transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="h-full w-full flex flex-col gap-6">
              <div className="flex-1 rounded-xl overflow-hidden shadow-lg border border-amber-200/50">
                <GallerySlider images={hotel.gallery} hotelName={hotel.name} />
              </div>
              <div className="flex-1 rounded-xl overflow-hidden shadow-lg border border-amber-200/50">
                {hotel.googleMapsEmbedUrl ? (
                  <iframe 
                    src={hotel.googleMapsEmbedUrl} 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl"
                  ></iframe>
                ) : (
                  <div className="bg-gradient-to-br from-amber-100/50 to-orange-100/30 h-full w-full flex items-center justify-center text-stone-400 rounded-xl p-8">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 mx-auto text-amber-400 mb-3" />
                      <p className="font-medium">Map not available</p>
                    </div>
                  </div>
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
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Full Details</h2>
            <p className="text-stone-500 mb-6">Explore all amenities, room options, and contact information</p>
            
            <Tabs defaultValue="amenities" className="mt-4">
              <TabsList className="bg-amber-200/60 rounded-xl p-1">
                <TabsTrigger value="amenities" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-amber-700 data-[state=active]:shadow-sm">Amenities</TabsTrigger>
                <TabsTrigger value="rooms" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-amber-700 data-[state=active]:shadow-sm">Rooms</TabsTrigger>
                <TabsTrigger value="contact" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-amber-700 data-[state=active]:shadow-sm">Contact & Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="amenities" className="p-6 bg-white/70 backdrop-blur-sm rounded-b-xl rounded-tr-xl border border-amber-200/60 border-t-0 mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {hotel.facilities?.map(facility => (
                    <div key={facility} className="flex items-center gap-3 text-base font-medium text-stone-700 p-3 bg-amber-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" /> <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="rooms" className="p-0 bg-white/70 backdrop-blur-sm rounded-b-xl rounded-tr-xl border border-amber-200/60 border-t-0 mt-0">
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
                      <TableRow key={i} className="border-amber-200/60 hover:bg-amber-50/50 transition-colors">
                        <TableCell className="font-semibold text-stone-800">{room.typeName}</TableCell>
                        <TableCell className="text-stone-600 text-sm">
                          <div className="flex flex-wrap gap-1">
                            {room.amenities?.slice(0, 3).map((am, idx) => (
                              <span key={idx} className="bg-amber-100 text-amber-800 px-2 py-1 rounded-md text-xs">
                                {am}
                              </span>
                            ))}
                            {room.amenities?.length > 3 && (
                              <span className="bg-amber-200 text-amber-900 px-2 py-1 rounded-md text-xs">
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
              
              <TabsContent value="contact" className="p-6 bg-white/70 backdrop-blur-sm rounded-b-xl rounded-tr-xl border border-amber-200/60 border-t-0 mt-0">
                <div className="space-y-4 text-stone-700">
                  {hotel.phoneNumber && (
                    <p className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                      <Phone className="h-5 w-5 text-orange-500 flex-shrink-0" /> 
                      <a href={`tel:${hotel.phoneNumber}`} className="font-medium hover:underline hover:text-orange-600 transition-colors">{hotel.phoneNumber}</a>
                    </p>
                  )}
                  {hotel.email && (
                    <p className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                      <Mail className="h-5 w-5 text-orange-500 flex-shrink-0" /> 
                      <a href={`mailto:${hotel.email}`} className="font-medium hover:underline hover:text-orange-600 transition-colors">{hotel.email}</a>
                    </p>
                  )}
                  {hotel.website && (
                    <p className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                      <Globe className="h-5 w-5 text-orange-500 flex-shrink-0" /> 
                      <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline hover:text-orange-600 transition-colors">
                        Visit Website
                      </a>
                    </p>
                  )}
                  {hotel.policies && (
                    <div className="mt-6">
                      <h4 className="font-bold text-stone-800 mb-2">Hotel Policies</h4>
                      <div className="prose prose-sm prose-stone bg-amber-50 p-4 rounded-lg">
                        <PortableText value={hotel.policies} />
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <Separator className="my-12 bg-gradient-to-r from-transparent via-amber-300 to-transparent h-0.5" />
          <NearbyAttractions nearbyAttractions={hotel.nearbyAttractions} />
        </AnimatedSection>
      </div>
    </div>
  );
}