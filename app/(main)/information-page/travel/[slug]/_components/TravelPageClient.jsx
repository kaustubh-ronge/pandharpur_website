

"use client";

import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

// ICONS
import {
    MapPin, Phone, Clock, Route, Globe, ChevronRight, ChevronLeft, Sparkles
} from "lucide-react";

// --- SHADCN UI IMPORTS ---
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { InquiryDrawer } from "@/components/InquiryForms/InquiryDrawer";

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
        <nav className="flex items-center text-sm font-medium text-stone-500">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1.5" />
            <Link href="/information-page/travel" className="hover:text-orange-600">Travel</Link>
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
            
            {/* Navigation Arrows */}
            {validImages.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        aria-label="Previous image"
                        className="absolute top-1/2 left-3 -translate-y-1/2 z-10 p-2 bg-orange-500/80 text-white rounded-full hover:bg-orange-500 transition-colors shadow-lg"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        aria-label="Next image"
                        className="absolute top-1/2 right-3 -translate-y-1/2 z-10 p-2 bg-orange-500/80 text-white rounded-full hover:bg-orange-500 transition-colors shadow-lg"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </>
            )}

            {/* Dot indicators */}
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
        <div className={`relative w-full ${aspectRatioClass} rounded-xl overflow-hidden shadow-lg bg-stone-100 border-2 border-amber-200/50`}>
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

function RichTextContent({ content }) {
    if (!content) return null;
    return (
        <div className="prose prose-lg max-w-none text-stone-700 leading-relaxed">
            <PortableText value={content} />
        </div>
    );
}

// --- MAIN CLIENT COMPONENT ---
export default function TravelPageClient({ item }) {
    
    // FIX: Handle both old string data and new array data
    const travelTypes = Array.isArray(item.travelType)
      ? item.travelType
      : (item.travelType ? [item.travelType] : []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 mt-[60px]">

            <AnimatedSection>
                <header className="mb-8">
                    <Breadcrumbs itemName={item.name} />
                    <div className="mt-4">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight">{item.name}</h1>
                        <div className="mt-4 flex items-center flex-wrap gap-x-4 gap-y-2 text-stone-600">
                            {travelTypes.map(type => (
                                <Badge key={type} className="text-base font-bold gap-1.5 py-1 px-3 bg-amber-200/80 text-amber-900 border border-amber-300">
                                    {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                                </Badge>
                            ))}
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

            <AnimatedSection>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-12">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-stone-800 border-b-2 border-amber-300 pb-3 mb-6">Details & Travel Tips</h2>
                        <RichTextContent content={item.detailedDescription} />

                        {item.keyRoutes?.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-2xl font-bold text-stone-800 mb-4">Key Routes & Destinations</h3>
                                <div className="flex flex-wrap gap-2 sm:gap-3">
                                    {item.keyRoutes.map(route => (
                                        <Badge key={route} className="text-sm sm:text-base font-medium bg-amber-100 text-amber-900 border-amber-300/80 py-1.5 sm:py-2 px-3 flex items-center gap-1.5 sm:gap-2">
                                            <Route className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 flex-shrink-0" />
                                            <span>{route}</span>
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-amber-200/60 lg:sticky top-24 shadow-lg transition-all duration-300 hover:shadow-xl lg:hover:-translate-y-1">
                            <h3 className="text-2xl font-bold mb-4 text-stone-800">Quick Info</h3>
                            <div className="space-y-4 text-stone-800">
                                {item.operatingHours && <p className="flex items-start gap-3"><Clock className="h-5 w-5 mt-1 text-orange-500" /> <span><strong>Hours:</strong> {item.operatingHours}</span></p>}
                                
                                {item.contactNumbers && item.contactNumbers.length > 0 && (
                                    <p className="flex items-start gap-3">
                                        <Phone className="h-5 w-5 mt-1 text-orange-500" />
                                        <a href={`tel:${item.contactNumbers[0]}`} className="hover:underline">
                                            {item.contactNumbers.join(' / ')}
                                        </a>
                                    </p>
                                )}

                                {item.address && <p className="flex items-start gap-3"><MapPin className="h-5 w-5 mt-1 text-orange-500" />{item.address}</p>}
                                {item.website && <a href={item.website} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-orange-700 hover:underline"><Globe className="h-5 w-5 mt-1 text-orange-500" /> Official Website</a>}
                            </div>
                            
                            <div className="mt-6 pt-6 border-t border-amber-200/60">
                                <h4 className="text-lg font-bold mb-3 text-stone-800">Need Help?</h4>
                                {item.whatsappNumber ? (
                                    <InquiryDrawer type="travel" data={item}>
                                        <DialogTrigger asChild>
                                            <Button className="w-full font-bold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-xl shadow-green-500/40 hover:shadow-2xl hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300 py-3 text-base sm:py-4 sm:text-lg">
                                                <img 
                                                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                                                    alt="WhatsApp" 
                                                    className="h-6 w-6 mr-3" 
                                                />
                                                Inquire on WhatsApp
                                            </Button>
                                        </DialogTrigger>
                                    </InquiryDrawer>
                                ) : (
                                    <Button 
                                        disabled
                                        className="w-full font-bold bg-gray-300 text-gray-500 cursor-not-allowed py-3 text-base sm:py-4 sm:text-lg"
                                    >
                                        WhatsApp Inquiry Unavailable
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedSection>

        </div>
    );
}